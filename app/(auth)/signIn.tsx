import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Button } from 'react-native';
import { Link, router } from 'expo-router';
import {firebase} from '../../firebaseConfig';
import { useAuth } from '../../context/AuthContext';

const LoginScreen: React.FC = () => {
  const { user } = useAuth();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  useEffect(() => {
    if (user) {
      router.replace('/(tabs)/home');
    }
  }, [user]);

  const handleLogin = async () => {
    try {
      const response = await firebase.auth().signInWithEmailAndPassword(email, password);
      Alert.alert('Hoşgeldiniz', 'Giriş başarıyla yapıldı');
      router.push('/(tabs)/home');
    } catch (error: any) {
      console.log('Firebase hata detayları:', error);
      console.log('Hata kodu:', error.code);
      
      let errorMessage = 'Giriş yaparken bir hata oluştu';
      
      if (error && error.code) {
        switch(error.code) {
          case 'auth/invalid-credential':
          case 'auth/wrong-password':
            errorMessage = 'Şifre hatalı. Lütfen tekrar deneyin.';
            break;
          case 'auth/user-not-found':
            errorMessage = 'Bu e-posta adresiyle kayıtlı bir hesap bulunamadı.';
            break;
          case 'auth/too-many-requests':
            errorMessage = 'Çok fazla hatalı deneme yaptınız. Hesabınız geçici olarak kilitlendi. Lütfen daha sonra tekrar deneyin veya şifrenizi sıfırlayın.';
            break;
          case 'auth/user-disabled':
            errorMessage = 'Bu hesap devre dışı bırakılmış. Lütfen destek ekibiyle iletişime geçin.';
            break;
          case 'auth/invalid-email':
            errorMessage = 'Geçersiz e-posta formatı. Lütfen kontrol edip tekrar deneyin.';
            break;
          default:
            errorMessage = `Giriş hatası: ${error.code}`;
            break;
        }
      }
      
      Alert.alert('Hata', errorMessage);
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      Alert.alert('Hata', 'Lütfen e-posta adresinizi girin');
      return;
    }

    try {
      await firebase.auth().sendPasswordResetEmail(email);
      Alert.alert('Başarılı', 'Şifre sıfırlama bağlantısı e-posta adresinize gönderildi');
    } catch (error) {
      Alert.alert('Hata', 'E-posta adresi bulunamadı');
    }
  };

  return (
    <View className="flex-1 justify-center px-6 bg-gray-100">
      <Text className="text-4xl font-bold text-center text-blue-600 mb-12">Giriş Yap</Text>
      
      <TextInput
        className="h-14 border-2 border-gray-300 rounded-lg px-4 mb-5 bg-white"
        placeholder="E-posta"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      
      <TextInput
        className="h-14 border-2 border-gray-300 rounded-lg px-4 mb-5 bg-white"
        placeholder="Şifre"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Giriş Yap" onPress={handleLogin} />

      <TouchableOpacity onPress={handlePasswordReset} className="mt-5">
        <Text className="text-blue-600 text-center">Şifrenizi mi unuttunuz?</Text>
      </TouchableOpacity>

      <View className="mt-5 flex-row justify-center items-center">
        <Text className="text-black">Hesabınız yok mu ? </Text>
        <Link href="/(auth)/signUp">
          <Text className="text-blue-600">Kayıt Ol</Text>
        </Link>
      </View>

      <View className="absolute bottom-4 left-0 right-0">
        <Text className="text-center text-xs text-gray-600">Powered by PickSoSo</Text>
      </View>
    </View>
  );
};

export default LoginScreen;
