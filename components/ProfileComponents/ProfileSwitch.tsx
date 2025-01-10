import { View, Text, Switch } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { firebase } from '../../firebaseConfig';
import { useAuth } from '../../context/AuthContext';

interface ProfileSwitchProps {
  title: string;
  icon: string;
  type: 'emailNotifications' | 'pushNotifications';
}

const ProfileSwitch: React.FC<ProfileSwitchProps> = ({ title, icon, type }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const { user } = useAuth();

  // Başlangıçta mevcut ayarları getir
  useEffect(() => {
    const fetchNotificationSettings = async () => {
      if (user?.uid) {
        try {
          const userDoc = await firebase.firestore()
            .collection('users')
            .doc(user.uid)
            .get();

          if (userDoc.exists) {
            const userData = userDoc.data();
            setIsEnabled(userData?.[type] || false);
          }
        } catch (error) {
          console.error('Ayarlar getirilirken hata:', error);
        }
      }
    };

    fetchNotificationSettings();
  }, [user, type]);

  const toggleSwitch = async () => {
    if (!user?.uid) return;

    const newValue = !isEnabled;
    setIsEnabled(newValue);

    try {
      await firebase.firestore()
        .collection('users')
        .doc(user.uid)
        .update({
          [type]: newValue
        });
    } catch (error) {
      console.error('Ayar güncellenirken hata:', error);
      // Hata durumunda switch'i eski haline getir
      setIsEnabled(!newValue);
    }
  };

  return (
    <View className="flex-row items-center bg-white p-4 rounded-lg shadow-sm mb-2">
      <Feather name={icon as any} size={20} color="#4A4A4A" className="mr-3" />
      <Text className="text-base text-black flex-grow ml-3">{title}</Text>
      <Switch
        onValueChange={toggleSwitch}
        value={isEnabled}
        style={{ transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }] }}
      />
    </View>
  );
};

export default ProfileSwitch; 