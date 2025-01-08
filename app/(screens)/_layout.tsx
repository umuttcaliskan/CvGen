import { View, Text } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';

const ScreensLayout = () => {
  return (
    <Stack>
      <Stack.Screen 
        name="notifications" 
        options={{
          headerShown: true,
          title: 'Bildirimler',
          headerTitleAlign: 'center', // Başlığı ortalamak için bu satırı ekleyin
        }} 
      />
      <Stack.Screen 
        name="contact" 
        options={{
          headerShown: true,
          title: 'İletişim',
          headerTitleAlign: 'center', // Başlığı ortalamak için bu satırı ekleyin
        }} 
      />
    </Stack>
  );
};

export default ScreensLayout;
