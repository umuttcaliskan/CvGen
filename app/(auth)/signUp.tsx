import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Button } from 'react-native';
import { Link, router } from 'expo-router';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import DateTimePickerModal from 'react-native-modal-datetime-picker'; // Takvim modülünü import et

const SignUpScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [birthDate, setBirthDate] = useState<string>('');
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);
  const [secureConfirmTextEntry, setSecureConfirmTextEntry] = useState<boolean>(true);
  const [isDatePickerVisible, setDatePickerVisible] = useState<boolean>(false); // Takvim görünürlüğünü kontrol et

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword || !fullName || !birthDate) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Hata', 'Şifreler uyuşmuyor');
      return;
    }

    try {
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      // Firestore'a kullanıcı bilgilerini ekleyelim
      await firebase.firestore().collection('users').doc(user?.uid).set({
        fullName,
        birthDate,
        email,
      });

      Alert.alert('Başarılı', `Hesabınız başarıyla oluşturuldu, Hoşgeldiniz, ${email}!`);
      router.push('/(tabs)/home');
    } catch (error) {
      Alert.alert('Hata', 'Bir hata oluştu, lütfen tekrar deneyin.');
    }
  };

  // Tarih seçici açma
  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  // Tarih seçildikten sonra
  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  // Tarih formatını güncelle
  const handleConfirm = (date: Date) => {
    const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
    setBirthDate(formattedDate);
    hideDatePicker();
  };

  return (
    <View className="flex-1 justify-center px-6 bg-gray-100">
      <Text className="text-4xl font-bold text-center text-blue-600 mb-12">Kayıt Ol</Text>

      <TextInput
        className="h-14 border-2 border-gray-300 rounded-lg px-4 mb-5 bg-white"
        placeholder="Ad Soyad"
        value={fullName}
        onChangeText={setFullName}
        keyboardType="default"
      />

      {/* Doğum Tarihi Seçimi */}
      <TouchableOpacity onPress={showDatePicker}>
        <View className="h-14 border-2 border-gray-300 rounded-lg px-4 mb-5 bg-white justify-center">
          <Text className="text-gray-500">{birthDate || 'Doğum Tarihini Seçin (GG-AA-YYYY)'}</Text>
        </View>
      </TouchableOpacity>

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

      {/* Date Picker Modal */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        date={new Date()}
        maximumDate={new Date()}
      />
    </View>
  );
};

export default SignUpScreen;
