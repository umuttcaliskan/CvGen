import { View, Text, Switch } from 'react-native';
import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';

const ProfileSwitch = ({ title, icon }) => {
  const [form, setForm] = useState({
    emailNotifications: true,
    pushNotifications: false,
  });

  return (
    <View className="flex-row items-center bg-white p-4 rounded-lg shadow-sm mb-2">
      <Feather name={icon} size={20} color="#4A4A4A" className="mr-3" />
      <Text className="text-base text-black flex-grow ml-3">{title}</Text>
      <Switch
        onValueChange={(pushNotifications) => setForm({ ...form, pushNotifications })}
        value={form.pushNotifications}
        style={{ transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }] }}
      />
    </View>
  );
};

export default ProfileSwitch;
