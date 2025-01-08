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
        tabBarStyle: [
          Platform.select({
            ios: {
              position: 'absolute',
            },
            default: {},
          }),
          styles.tabBar,
        ],
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
              color={focused ? '#0a7ea4' : 'black'} // Aktif olduğunda mavi olacak
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
              color={focused ? '#0a7ea4' : 'black'} // Aktif olduğunda mavi olacak
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
              color={focused ? '#0a7ea4' : 'black'} // Aktif olduğunda mavi olacak
            />
          ),
          title: 'Hesabım'
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    marginHorizontal: 16, // Sağdan ve soldan boşluk
    marginBottom: 16, // Alttan boşluk
    borderRadius: 16, // Yuvarlak köşeler
    borderWidth: 1, // Sınır genişliği
    borderColor: '#ccc', // Sınır rengi
    backgroundColor: "white", // Arkaplan rengi
    elevation: 4, // Android için gölge efekti
    shadowColor: '#000', // iOS için gölge rengi
    shadowOffset: { width: 0, height: 4 }, // iOS için gölge konumu
    shadowOpacity: 0.1, // iOS için gölge opaklığı
    shadowRadius: 4, // iOS için gölge yarıçapı
  },
});
