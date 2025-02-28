import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';

const NotFoundScreen = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push('../../(tabs)/home');
    }, 3000);
  }, []);

  return (
    <View className="flex-1 justify-center items-center bg-gray-100 p-6">
      <Text className="text-2xl font-bold text-gray-800 mb-4">
        Aradığınız Sayfa Bulunamadı.
      </Text>
      <Text className="text-base text-gray-600 mb-8 text-center">
        Üzgünüz, ama aradığınız sayfa mevcut değil. Anasayfaya yönlendiriliyorsunuz...
      </Text>
      
      <View className="bg-blue-500 py-3 px-6 rounded-xl shadow-md mb-6">
        <Text className="text-white text-lg text-center">Anasayfaya Git</Text>
      </View>

      <Text className="text-xs text-gray-500 text-center">
        Eğer yönlendirme yapılmazsa, manuel olarak <Text className="text-blue-500" onPress={() => router.push('../../(tabs)/home')}>buraya tıklayarak</Text> anasayfaya gidebilirsiniz.
      </Text>
    </View>
  );
};

export default NotFoundScreen;
