import { Link, Tabs } from 'expo-router';
import React from 'react';
import { Platform, Image, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: true,
        tabBarStyle: Platform.select({
          ios: {
            marginHorizontal: 16,
            marginBottom: 16,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: '#ccc',
            backgroundColor: "white",
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            position: 'absolute',
            bottom: 0,
          },
          android: {
            marginHorizontal: 16,
            marginBottom: 16,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: '#ccc',
            backgroundColor: "white",
            elevation: 4,
          }
        }),
      }}>
      <Tabs.Screen
        name="home"
        options={{
          headerTitle: '',
          headerLeft: () => (
            <Image
              source={require('../../assets/images/splash-icon.png')} 
              style={{ width: 150, height: 30, marginLeft: 10 }}
            />
          ),
          headerRight: () => (
            <Link href={'/(screens)/notifications'} className='mr-4'>
              <Feather name="bell" size={18} color="black" />
            </Link>
          ),
          tabBarIcon: ({ focused, color }) => (
            <Feather
              name="home"
              size={18}
              color={focused ? '#0a7ea4' : 'black'}
            />
          ),
          title: 'Anasayfa'
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          headerTitle: '',
          headerLeft: () => (
            <Image
              source={require('../../assets/images/splash-icon.png')}
              style={{ width: 150, height: 30, marginLeft: 10 }}
            />
          ),
          tabBarIcon: ({ focused, color }) => (
            <Feather
              name="plus-circle"
              size={18}
              color={focused ? '#0a7ea4' : 'black'}
            />
          ),
          title: 'CV Oluştur'
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          headerTitle: '',
          headerLeft: () => (
            <Image
              source={require('../../assets/images/splash-icon.png')}
              style={{ width: 150, height: 30, marginLeft: 10 }}
            />
          ),
          tabBarIcon: ({ focused, color }) => (
            <Feather
              name="user"
              size={18}
              color={focused ? '#0a7ea4' : 'black'}
            />
          ),
          title: 'Hesabım'
        }}
      />
    </Tabs>
  );
}
