import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, SafeAreaView, ScrollView } from 'react-native';
import { Stack, router } from 'expo-router';
import { firebase } from '../../firebaseConfig';
import { useAuth } from '../../context/AuthContext';
import { Feather } from '@expo/vector-icons';
import { EmailAuthProvider } from 'firebase/auth';

const EditProfileScreen: React.FC = () => {
  const { userData, user, refreshUserData } = useAuth();
  const [fullName, setFullName] = useState(userData?.fullName || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleUpdate = async () => {
    if (!fullName.trim()) {
      Alert.alert('Hata', 'Lütfen ad soyad alanını doldurun.');
      return;
    }

    setLoading(true);
    try {
      await firebase.firestore()
        .collection('users')
        .doc(user?.uid)
        .update({
          fullName: fullName.trim()
        });

      await refreshUserData();
      Alert.alert('Başarılı', 'Profil bilgileriniz güncellendi.');
      
      // Şifre değişikliği varsa
      if (currentPassword && newPassword && confirmPassword) {
        await handlePasswordChange();
      } else {
        setLoading(false);
      }
    } catch (error) {
      Alert.alert('Hata', 'Güncelleme sırasında bir hata oluştu.');
      setLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Hata', 'Yeni şifreler eşleşmiyor.');
      setLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert('Hata', 'Yeni şifre en az 6 karakter olmalıdır.');
      setLoading(false);
      return;
    }

    try {
      if (!user) {
        throw new Error('Kullanıcı oturumu bulunamadı');
      }

      // Kullanıcıyı yeniden kimlik doğrulaması
      const credential = EmailAuthProvider.credential(
        user.email || '',
        currentPassword
      );

      try {
        await firebase.auth().currentUser?.reauthenticateWithCredential(credential);
      } catch (error: any) {
        if (error.code === 'auth/wrong-password') {
          Alert.alert(
            'Hata',
            'Mevcut şifreniz yanlış girilmiştir. Lütfen kontrol edip tekrar deneyiniz.',
            [{ text: 'Tamam' }]
          );
          setCurrentPassword('');
          setLoading(false);
          return;
        }
        throw error;
      }

      // Şifre güncelleme
      await firebase.auth().currentUser?.updatePassword(newPassword);

      Alert.alert(
        'Başarılı', 
        'Şifreniz başarıyla güncellendi. Güvenliğiniz için tekrar giriş yapmanız gerekmektedir.',
        [
          { 
            text: 'Tamam', 
            onPress: async () => {
              try {
                await firebase.auth().signOut();
                router.replace('/(auth)/signIn');
              } catch (error) {
                console.error('Çıkış yapılırken hata:', error);
              }
            }
          }
        ]
      );
    } catch (error: any) {
      if (error.code === 'auth/requires-recent-login') {
        Alert.alert(
          'Hata',
          'Bu işlem için yakın zamanda giriş yapmış olmanız gerekmektedir. Lütfen tekrar giriş yapın.'
        );
      } else {
        Alert.alert('Hata', 'Şifre güncellenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <Stack.Screen
        options={{
          title: "Profili Düzenle",
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerShadowVisible: false,
          headerTitleStyle: {
            color: '#1f2937',
            fontSize: 16,
          },
          headerTintColor: '#1f2937',
        }}
      />

      <ScrollView className="flex-1 px-4 py-6">
        {/* Profil Bilgileri Kartı */}
        <View className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <Text className="text-lg font-semibold text-gray-900 mb-4">
            Profil Bilgileri
          </Text>

          {/* Ad Soyad Input */}
          <View className="mb-6">
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Ad Soyad
            </Text>
            <TextInput
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700"
              placeholder="Ad Soyad"
              value={fullName}
              onChangeText={setFullName}
            />
          </View>

          {/* Email (Devre dışı) */}
          <View className="mb-6">
            <Text className="text-sm font-medium text-gray-700 mb-2">
              E-posta
            </Text>
            <TextInput
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-400 bg-gray-50"
              value={user?.email || ''}
              editable={false}
            />
            <Text className="text-xs text-gray-500 mt-1">
              E-posta adresi değiştirilemez
            </Text>
          </View>
        </View>

        {/* Şifre Değiştirme Kartı */}
        <View className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <Text className="text-lg font-semibold text-gray-900 mb-4">
            Şifre Değiştir
          </Text>

          {/* Mevcut Şifre */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Mevcut Şifre
            </Text>
            <View className="relative">
              <TextInput
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 pr-12"
                placeholder="Mevcut şifreniz"
                value={currentPassword}
                onChangeText={setCurrentPassword}
                secureTextEntry={!showCurrentPassword}
              />
              <TouchableOpacity 
                className="absolute right-4 top-3"
                onPress={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                <Feather 
                  name={showCurrentPassword ? "eye-off" : "eye"} 
                  size={20} 
                  color="gray" 
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Yeni Şifre */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Yeni Şifre
            </Text>
            <View className="relative">
              <TextInput
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 pr-12"
                placeholder="Yeni şifreniz"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry={!showNewPassword}
              />
              <TouchableOpacity 
                className="absolute right-4 top-3"
                onPress={() => setShowNewPassword(!showNewPassword)}
              >
                <Feather 
                  name={showNewPassword ? "eye-off" : "eye"} 
                  size={20} 
                  color="gray" 
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Yeni Şifre Tekrar */}
          <View className="mb-6">
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Yeni Şifre Tekrar
            </Text>
            <View className="relative">
              <TextInput
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 pr-12"
                placeholder="Yeni şifrenizi tekrar girin"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity 
                className="absolute right-4 top-3"
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Feather 
                  name={showConfirmPassword ? "eye-off" : "eye"} 
                  size={20} 
                  color="gray" 
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Kaydet Butonu */}
        <TouchableOpacity
          onPress={handleUpdate}
          disabled={loading}
          className={`bg-blue-600 rounded-lg py-4 ${loading ? 'opacity-50' : ''}`}
        >
          <Text className="text-white font-semibold text-center">
            {loading ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfileScreen; 