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
      <Stack.Screen 
        name="contact" 
        options={{
          headerShown: true,
          title: 'İletişim',
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
      <Stack.Screen 
        name="report" 
        options={{
          headerShown: true,
          title: 'Hata Bildir',
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
      <Stack.Screen 
        name="terms" 
        options={{
          headerShown: true,
          title: 'Şartlar ve Koşullar',
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
      <Stack.Screen 
        name="editProfile" 
        options={{
          headerShown: true,
          title: 'Profili Düzenle',
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
    </Stack>
  );
};

export default ScreensLayout;
