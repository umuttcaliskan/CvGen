import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';

interface ProfileButtonProps {
  title: string;
  route: string;
  icon: React.ComponentProps<typeof Feather>["name"];
}

const ProfileButton: React.FC<ProfileButtonProps> = ({ title, route, icon }) => {
  const router = useRouter();

  const profileRouter = () => {
    router.push(route as any);
  };

  return (
    <TouchableOpacity
      onPress={profileRouter}
      className="flex-row items-center bg-white p-4 rounded-lg mb-1"
    >
      <View className="w-9 h-9 rounded-full bg-blue-50 justify-center items-center mr-3">
        <Feather name={icon as any} size={18} color="#2563eb" />
      </View>
      <View className="flex-1">
        <Text className="text-base font-medium text-gray-800">{title}</Text>
      </View>
      <Feather color="#a0aec0" name="chevron-right" size={20} />
    </TouchableOpacity>
  );
};

export default ProfileButton;
