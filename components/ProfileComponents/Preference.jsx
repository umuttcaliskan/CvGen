import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons';

const Preference = ({ title, description, icon }) => {
  return (
    <TouchableOpacity className="flex-row items-center bg-white p-4 rounded-lg shadow-sm mb-2">
      <Feather name={icon} size={20} color="#4A4A4A" className="mr-3" />
      <Text className="text-base text-black flex-grow ml-3">{title}</Text>
      <Text className="text-sm text-gray-500 mr-2">{description}</Text>
      <Feather color="#B0B0B0" name="chevron-right" size={18} />
    </TouchableOpacity>
  );
};

export default Preference;
