import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, Image, StyleSheet, Animated } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { getAuth, signOut } from 'firebase/auth';
import 'firebase/compat/firestore';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileButton from '../../components/ProfileComponents/ProfileButton';
import ProfileSwitch from '../../components/ProfileComponents/ProfileSwitch';
import Preference from '../../components/ProfileComponents/Preference';
import { useAuth } from '../../context/AuthContext';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { LinearGradient } from 'expo-linear-gradient';

const Profile = () => {
  const { user, userData } = useAuth();
  const router = useRouter();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (user?.uid) {
      loadProfileImage();
    }

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [user?.uid]);

  const loadProfileImage = async () => {
    try {
      if (!user?.uid) return;
      
      // Firebase Storage'dan profil resmini al
      const storage = getStorage();
      const storageRef = ref(storage, `profile_images/${user.uid}`);
      
      try {
        const downloadURL = await getDownloadURL(storageRef);
        setProfileImage(downloadURL);
        // Performans için URL'i önbelleğe al
        await AsyncStorage.setItem(`profileImage_${user.uid}`, downloadURL);
      } catch (error: any) {
        if (error.code === 'storage/object-not-found') {
          // Profil resmi henüz yüklenmemiş, önbellekte var mı diye kontrol et
          const cachedImage = await AsyncStorage.getItem(`profileImage_${user.uid}`);
          if (cachedImage) {
            setProfileImage(cachedImage);
          }
          return;
        }
        throw error;
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
        
        // Uri'den blob oluştur
        const response = await fetch(imageUri);
        const blob = await response.blob();

        // Storage referansını oluştur
        const storage = getStorage();
        const storageRef = ref(storage, `profile_images/${user.uid}`);

        // Resmi yükle
        await uploadBytes(storageRef, blob);

        // Download URL'ini al
        const downloadURL = await getDownloadURL(storageRef);

        // State ve AsyncStorage'ı güncelle
        setProfileImage(downloadURL);
        await AsyncStorage.setItem(`profileImage_${user.uid}`, downloadURL);
      }
    } catch (error) {
      console.error('Resim yüklenirken hata:', error);
      alert('Resim yüklenirken bir hata oluştu.');
    }
  };

  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      setProfileImage(null);
      await AsyncStorage.removeItem(`profileImage_${user?.uid}`);
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
      <Animated.View style={{ opacity: fadeAnim, flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Profil Resmi alanı */}
          <LinearGradient
            colors={['#1e40af', '#2563eb', '#3b82f6']}
            className="pt-12 pb-16 rounded-b-3xl"
          >
            <View className="items-center">
              <TouchableOpacity 
                onPress={handleImagePick} 
                className="relative"
                style={styles.profileImageContainer}
              >
                {profileImage ? (
                  <Image 
                    source={{ uri: profileImage }} 
                    className="w-28 h-28 rounded-full border-4 border-white"
                    resizeMode="cover"
                  />
                ) : (
                  <View className="w-28 h-28 rounded-full border-4 border-white bg-blue-800 justify-center items-center">
                    <Text className="text-5xl text-white font-bold">{nameFirstLetter}</Text>
                  </View>
                )}
                <View className="absolute bottom-1 right-1 bg-white p-2 rounded-full shadow-lg">
                  <Feather name="camera" size={18} color="#2563eb" />
                </View>
              </TouchableOpacity>
              
              <Text className="text-2xl font-bold text-white mt-4">{userData.fullName}</Text>
              <Text className="text-white opacity-80">{user.email}</Text>
            </View>
          </LinearGradient>

          <View className="px-6 -mt-8">
            {/* Profil Düzenleme Kartı */}
            <TouchableOpacity 
              onPress={() => router.push('/(screens)/editProfile')}
              className="bg-white rounded-2xl p-5 mb-6 shadow-md flex-row items-center"
              style={styles.card}
            >
              <View className="p-3 rounded-full bg-blue-100 mr-4">
                <Feather name="edit-2" size={22} color="#2563eb" />
              </View>
              <View className="flex-1">
                <Text className="text-lg font-semibold text-gray-800">Profili Düzenle</Text>
                <Text className="text-gray-500">Hesap bilgilerinizi güncelleyin</Text>
              </View>
              <Feather name="chevron-right" size={22} color="#a0aec0" />
            </TouchableOpacity>

            {/* Tercihler Bölümü */}
            <View className="mb-6">
              <Text className="text-sm uppercase font-semibold text-gray-600 ml-2 mb-3">Tercihler</Text>
              <View className="bg-white rounded-2xl p-2 shadow-md" style={styles.card}>
                <Preference title="Dil" description="Türkçe" icon="globe" />
                <View className="h-[1px] bg-gray-100 my-2" />
                <ProfileSwitch title="E-Posta Bildirimleri" icon="mail" type="emailNotifications" />
                <View className="h-[1px] bg-gray-100 my-2" />
                <ProfileSwitch title="Anlık Bildirimler" icon="bell" type="pushNotifications" />
              </View>
            </View>

            {/* Kaynaklar Bölümü */}
            <View className="mb-6">
              <Text className="text-sm uppercase font-semibold text-gray-600 ml-2 mb-3">Kaynaklar</Text>
              <View className="bg-white rounded-2xl p-2 shadow-md" style={styles.card}>
                <ProfileButton title="İletişime Geç" route="../(screens)/contact" icon="phone" />
                <View className="h-[1px] bg-gray-100 my-2" />
                <ProfileButton title="Hata Bildir" route="../(screens)/report" icon="alert-triangle" />
                <View className="h-[1px] bg-gray-100 my-2" />
                <ProfileButton title="Uygulamayı Değerlendir" route="./home" icon="star" />
                <View className="h-[1px] bg-gray-100 my-2" />
                <ProfileButton title="Şartlar ve Koşullar" route="../(screens)/terms" icon="file-text" />
              </View>
            </View>

            {/* Çıkış Yap Butonu */}
            <TouchableOpacity 
              onPress={handleLogout}
              className="bg-white border border-red-100 rounded-2xl p-5 mb-8 items-center shadow-sm"
              style={styles.logoutButton}
            >
              <View className="flex-row items-center">
                <Feather name="log-out" size={22} color="#ef4444" className="mr-2" />
                <Text className="text-red-500 font-bold text-lg ml-2">Çıkış Yap</Text>
              </View>
            </TouchableOpacity>

            {/* Alt Bilgi */}
            <View className="mb-8 items-center">
              <Text className="text-xs text-gray-400">Powered by PickSoSo</Text>
              <Text className="text-[8px] text-gray-400 mt-1">Version 1.0.0</Text>
            </View>
          </View>
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  profileImageContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutButton: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  }
});

export default Profile;
