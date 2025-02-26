import { Link, Tabs } from 'expo-router';
import React from 'react';
import { Platform, Image, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import logo_home from '../../assets/images/logo/cvgen.png';

export default function TabLayout() {
  // Sabit "light" teması kullanıyoruz
  const colorScheme = 'light';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
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
            marginHorizontal: 0,
            marginBottom: 0,
            borderColor: '#ccc',
            backgroundColor: "white",
            elevation: 4,
          }
        }),
      }}>
      <Tabs.Screen
        name="home"
        options={{
          headerTitle: () => (
            <Image
              source={logo_home} 
              style={{ width: 150, height: 30 }}
            />
          ),
          headerTitleAlign: 'center',
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
          headerTitle: () => (
            <Image
              source={logo_home}
              style={{ width: 150, height: 30 }}
            />
          ),
          headerTitleAlign: 'center',
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
          headerTitle: () => (
            <Image
              source={logo_home}
              style={{ width: 150, height: 30 }}
            />
          ),
          headerTitleAlign: 'center',
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
