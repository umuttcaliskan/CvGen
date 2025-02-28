import { View, Text, Switch } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import firebase from 'firebase/compat/app';
import { useAuth } from '../../context/AuthContext';

type FeatherIcon = React.ComponentProps<typeof Feather>['name'];

interface ProfileSwitchProps {
  title: string;
  icon: FeatherIcon;
  type: string;
}

const ProfileSwitch: React.FC<ProfileSwitchProps> = ({ title, icon, type }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const { user } = useAuth();

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
      setIsEnabled(!newValue);
    }
  };

  return (
    <View className="flex-row items-center justify-between bg-white p-4 rounded-lg mb-1">
      <View className="flex-row items-center">
        <View className="w-9 h-9 rounded-full bg-blue-50 justify-center items-center mr-3">
          <Feather name={icon} size={18} color="#2563eb" />
        </View>
        <Text className="text-base font-medium text-gray-800">{title}</Text>
      </View>
      <Switch
        trackColor={{ false: '#e2e8f0', true: '#bfdbfe' }}
        thumbColor={isEnabled ? '#2563eb' : '#a0aec0'}
        ios_backgroundColor="#e2e8f0"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

export default ProfileSwitch;
