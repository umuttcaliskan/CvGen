import { router } from 'expo-router';
import React from 'react';
import { SafeAreaView, View, Text, Image, ActivityIndicator } from 'react-native';

const Index = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      router.push('/(auth)/signIn');
    }, 1400);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return null;
};

const SplashScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-blue-900">
      <View className="flex-1 justify-center items-center">
      
        <Image
          source={require('../assets/images/logo/splash_logo.png')}
          className="w-[400px] h-[120px]"
          resizeMode="contain"
        />
        
        <Text className="text-lg text-gray-200 mt-2">
          Senin için en iyi cv şablonları oluşturuluyor...
        </Text>
        <ActivityIndicator size="large" color="#fff" className="mt-10" />
      </View>
    </SafeAreaView>
  );
};

export default Index;
