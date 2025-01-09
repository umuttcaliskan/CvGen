import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { useAuth } from '../../context/AuthContext';

const HomeScreen: React.FC = () => {
  const { userData } = useAuth();

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 items-center justify-center p-6">
        <Text className="text-2xl font-bold text-gray-800 mb-2">
          Hoşgeldiniz,
        </Text>
        <Text className="text-xl text-blue-600">
          {userData?.fullName || 'Kullanıcı'}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
