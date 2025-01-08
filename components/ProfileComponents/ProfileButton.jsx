import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';

const ProfileButton = ({ title, route, icon }) => {
  const router = useRouter();

  const profileRouter = () => {
    router.push(route);
  };

  return (
    <TouchableOpacity
      onPress={profileRouter}
      className="flex-row items-center bg-white p-4 rounded-lg shadow-sm mb-2"
    >
      <Feather color="#4A4A4A" name={icon} size={19} className="mr-3" />
      <Text className="text-base text-black flex-grow ml-3">{title}</Text>
      <Feather color="#B0B0B0" name="chevron-right" size={18} />
    </TouchableOpacity>
  );
};

export default ProfileButton;
