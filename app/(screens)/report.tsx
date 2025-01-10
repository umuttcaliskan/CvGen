import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, SafeAreaView } from 'react-native';
import { Stack } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { firebase } from '../../firebase.config';
import { useAuth } from '../../context/AuthContext';

const ReportScreen: React.FC = () => {
  const { userData } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [device, setDevice] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert('Hata', 'Lütfen başlık ve açıklama alanlarını doldurun.');
      return;
    }

    setLoading(true);
    try {
      const currentUser = firebase.auth().currentUser;
      
      if (!currentUser) {
        Alert.alert('Hata', 'Lütfen önce giriş yapın.');
        return;
      }

      // Firestore'a rapor verilerini kaydet
      await firebase.firestore().collection('reports').add({
        userId: currentUser.uid,
        title: title.trim(),
        description: description.trim(),
        device: device.trim(),
        userEmail: userData?.email || currentUser.email,
        userName: userData?.fullName,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        status: 'pending',
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });

      Alert.alert(
        'Başarılı',
        'Hata bildiriminiz başarıyla gönderildi. En kısa sürede incelenecektir.',
        [{ 
          text: 'Tamam', 
          onPress: () => {
            setTitle('');
            setDescription('');
            setDevice('');
          }
        }]
      );
    } catch (error) {
      console.error('Hata bildirimi gönderilirken hata:', error);
      Alert.alert('Hata', 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <Stack.Screen
        options={{
          title: "Hata Bildir",
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
        <View className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <Text className="text-gray-600 text-sm mb-6">
            Uygulamada karşılaştığınız sorunları bize bildirerek daha iyi bir deneyim sunmamıza yardımcı olabilirsiniz.
          </Text>

          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Hata Başlığı
            </Text>
            <TextInput
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700"
              placeholder="Örn: Sayfa yüklenmiyor"
              value={title}
              onChangeText={setTitle}
              maxLength={50}
            />
          </View>

          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Hata Açıklaması
            </Text>
            <TextInput
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700"
              placeholder="Hatayı detaylı bir şekilde açıklayın"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              maxLength={500}
            />
          </View>

          <View className="mb-6">
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Cihaz Modeli (Opsiyonel)
            </Text>
            <TextInput
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700"
              placeholder="Örn: iPhone 13 Pro"
              value={device}
              onChangeText={setDevice}
            />
          </View>

          <TouchableOpacity
            onPress={handleSubmit}
            disabled={loading}
            className={`flex-row items-center justify-center bg-blue-600 rounded-lg py-4 ${loading ? 'opacity-50' : ''}`}
          >
            {loading ? (
              <Text className="text-white font-semibold">Gönderiliyor...</Text>
            ) : (
              <>
                <Feather name="send" size={20} color="white" />
                <Text className="text-white font-semibold ml-2">Gönder</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        <View className="bg-blue-50 rounded-xl p-4">
          <Text className="text-sm text-blue-800">
            Not: Hata bildiriminiz ekibimiz tarafından incelenecek ve gerekli düzeltmeler yapılacaktır. Bildiriminizle ilgili gelişmeler e-posta adresinize iletilecektir.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReportScreen; 