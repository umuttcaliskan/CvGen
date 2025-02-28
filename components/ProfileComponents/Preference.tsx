import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

type FeatherIcon = React.ComponentProps<typeof Feather>['name'];

interface PreferenceProps {
  title: string;
  description: string;
  icon: FeatherIcon; 
}

const Preference = ({ title, description, icon }: PreferenceProps) => {
  return (
    <TouchableOpacity className="flex-row items-center bg-white p-4 rounded-lg mb-1">
      <View className="w-9 h-9 rounded-full bg-blue-50 justify-center items-center mr-3">
        <Feather name={icon} size={18} color="#2563eb" />
      </View>
      <View className="flex-1">
        <Text className="text-base font-medium text-gray-800">{title}</Text>
        <Text className="text-sm text-gray-500">{description}</Text>
      </View>
      <Feather color="#a0aec0" name="chevron-right" size={20} />
    </TouchableOpacity>
  );
};

export default Preference;
