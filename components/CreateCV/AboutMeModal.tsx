import React, { useState } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface AboutMeModalProps {
  onClose: () => void;
  onSave: (data: string) => void;
  initialData: string | null;
}

const AboutMeModal: React.FC<AboutMeModalProps> = ({ onClose, onSave, initialData }) => {
  const [about, setAbout] = useState(initialData || '');

  const handleSave = () => {
    onSave(about);
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={onClose}
    >
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
          <TouchableOpacity onPress={onClose}>
            <Feather name="x" size={24} color="#4B5563" />
          </TouchableOpacity>
          <Text className="text-lg font-semibold">Hakkımda</Text>
          <TouchableOpacity onPress={handleSave}>
            <Text className="text-blue-600 font-semibold">Kaydet</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-1 p-4">
          <TextInput
            className="flex-1 border border-gray-300 rounded-lg p-4 text-base"
            multiline
            textAlignVertical="top"
            placeholder="Kendinizi tanıtın..."
            value={about}
            onChangeText={setAbout}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default AboutMeModal; 