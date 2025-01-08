import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Button } from 'react-native';
import { Link, router } from 'expo-router';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const SignUpScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);
  const [secureConfirmTextEntry, setSecureConfirmTextEntry] = useState<boolean>(true);

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Hata', 'Şifreler uyuşmuyor');
      return;
    }

    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      Alert.alert('Başarılı', `Hesabınız başarıyla oluşturuldu, Hoşgeldiniz, ${email}!`);
      router.push('/(tabs)/home');
    } catch (error) {
      Alert.alert('Hata', 'Hata');
    }
  };

  return (
    <View className="flex-1 justify-center px-6 bg-gray-100">
      <Text className="text-4xl font-bold text-center text-blue-600 mb-12">Kayıt Ol</Text>

      <TextInput
        className="h-14 border-2 border-gray-300 rounded-lg px-4 mb-5 bg-white"
        placeholder="E-posta"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        className="h-14 border-2 border-gray-300 rounded-lg px-4 mb-5 bg-white"
        placeholder="Şifre"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={secureTextEntry}
      />

      <TextInput
        className="h-14 border-2 border-gray-300 rounded-lg px-4 mb-5 bg-white"
        placeholder="Şifreyi Doğrula"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={secureConfirmTextEntry}
      />

      <Button title="Kayıt Ol" onPress={handleSignUp} />

      <View className="flex-row justify-center mt-4">
        <Text className="text-gray-600 mr-2">Zaten hesabınız var mı?</Text>
        <Link href="/(auth)/signIn" className="text-blue-600">
          Giriş Yap
        </Link>
      </View>

      <View className="absolute bottom-4 left-0 right-0">
        <Text className="text-center text-xs text-gray-600">Powered by PickSoSo</Text>
      </View>
    </View>
  );
};

export default SignUpScreen;
