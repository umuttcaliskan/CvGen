import React from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { Stack } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

const HomeScreen = () => {
  const { userData } = useAuth();

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <Stack.Screen
        options={{
          title: "Ana Sayfa",
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerShadowVisible: false,
        }}
      />

      <ScrollView className="flex-1 px-4 py-6">
        {/* Hoş Geldin Mesajı */}
        <View className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <Text className="text-lg font-semibold text-gray-900 mb-2">
            Hoş Geldin, {userData?.fullName}!
          </Text>
          <Text className="text-gray-600">
            Daha önce oluşturduğun CV'leri görüntüleyebilir, düzenleyebilir ve indirebilirsin.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
