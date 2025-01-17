import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { getAuth, signOut } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileButton from '../../components/ProfileComponents/ProfileButton';
import ProfileSwitch from '../../components/ProfileComponents/ProfileSwitch';
import Preference from '../../components/ProfileComponents/Preference';
import { useAuth } from '../../context/AuthContext';

const Profile = () => {
  const { user, userData } = useAuth();
  const router = useRouter();
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    if (user?.uid) {
      loadProfileImage();
    }
  }, [user?.uid]);

  const loadProfileImage = async () => {
    try {
      if (!user?.uid) return;
      const storedImage = await AsyncStorage.getItem(`profileImage_${user.uid}`);
      if (storedImage) {
        setProfileImage(storedImage);
      }
    } catch (error) {
      console.error('Profil resmi yüklenirken hata:', error);
    }
  };

  const handleImagePick = async () => {
    try {
      if (!user?.uid) {
        alert('Oturum açmanız gerekiyor!');
        return;
      }

      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (!permissionResult.granted) {
        alert('Galeriye erişim izni gereklidir!');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });

      if (!result.canceled) {
        const imageUri = result.assets[0].uri;
        setProfileImage(imageUri);
        await AsyncStorage.setItem(`profileImage_${user.uid}`, imageUri);
      }
    } catch (error) {
      console.error('Resim seçilirken hata:', error);
      alert('Resim seçilirken bir hata oluştu.');
    }
  };

  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      setProfileImage(null);
      router.replace("/(auth)/signIn");
    } catch (error) {
      console.error("Çıkış yaparken hata:", error);
    }
  };

  if (!user || !userData) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg text-gray-600">Yükleniyor...</Text>
      </View>
    );
  }

  const nameFirstLetter = userData?.fullName?.charAt(0).toUpperCase() || 'U';

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className="px-6">
        {/* Profil Resmi */}
        <TouchableOpacity onPress={handleImagePick} className="items-center mt-12 mb-8">
          <View className="w-20 h-20 border border-secondary rounded-lg flex justify-center items-center bg-blue-900 overflow-hidden">
            {profileImage ? (
              <Image 
                source={{ uri: profileImage }} 
                className="w-full h-full"
                resizeMode="cover"
              />
            ) : (
              <Text className="text-4xl text-white font-semibold">{nameFirstLetter}</Text>
            )}
          </View>
          <Text className="text-blue-600 mt-2 text-sm">Fotoğrafı Değiştir</Text>
        </TouchableOpacity>

        {/* Hesap Bilgileri */}
        <View className="py-4">
          <Text className="text-xs uppercase text-gray-500 ml-3 mb-2">Hesabım</Text>
          <TouchableOpacity 
            onPress={() => router.push('/(screens)/editProfile')}
            className="flex-row items-center bg-white rounded-xl p-4 shadow-sm"
          >
            <View className="flex-grow">
              <Text className="text-lg font-semibold text-gray-900">{userData.fullName}</Text>
              <Text className="text-gray-500">{user.email}</Text>
            </View>
            <Feather name="chevron-right" size={18} color="black" />
          </TouchableOpacity>
        </View>

        <View className="py-4">
          <Text className="text-xs uppercase text-gray-500 ml-3 mb-2">Tercihler</Text>
          <View className="space-y-3">
            <Preference title="Dil" description="Türkçe" icon={"globe"} />
            <Preference title="Konum" description="İstanbul, Türkiye" icon={"map-pin"} />
            <ProfileSwitch 
              title="E-Posta Bildirimleri" 
              icon="mail" 
              type="emailNotifications" 
            />
            <ProfileSwitch 
              title="Anlık Bildirimler" 
              icon="bell" 
              type="pushNotifications" 
            />
          </View>
        </View>

        <View className="py-4">
          <Text className="text-xs uppercase text-gray-500 ml-3 mb-2">Kaynaklar</Text>
          <View className="space-y-3">
            <ProfileButton title="İletişime Geç" route="../(screens)/contact" icon={"phone"} />
            <ProfileButton title="Hata Bildir" route="../(screens)/report" icon={"alert-triangle"} />
            <ProfileButton title="Uygulamayı Değerlendir" route="./home" icon={"star"} />
            <ProfileButton title="Şartlar ve Koşullar" route="../(screens)/terms" icon={"file-text"} />
          </View>
        </View>

        <View className="py-6">
          <TouchableOpacity onPress={handleLogout}>
            <View className="flex-row justify-center bg-white p-4 rounded-xl border shadow-sm">
              <Text className="text-lg text-red-600 font-bold">Çıkış Yap</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View className="mt-6">
          <Text className="text-xs text-gray-400 text-center">Powered by PickSoSo</Text>
          <Text className="text-[8px] text-gray-400 text-center mt-1">Version 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
