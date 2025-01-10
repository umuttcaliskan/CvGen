import React, { useState } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

interface Language {
  id: string;
  name: string;
  level: string;
}

interface LanguagesModalProps {
  onClose: () => void;
  onSave: (data: Language[]) => void;
  initialData: Language[] | null;
}

const LanguagesModal: React.FC<LanguagesModalProps> = ({ onClose, onSave, initialData }) => {
  const [languages, setLanguages] = useState<Language[]>(initialData || [{
    id: '1',
    name: '',
    level: 'A1'
  }]);

  const levels = [
    { label: 'A1 - Başlangıç', value: 'A1' },
    { label: 'A2 - Temel', value: 'A2' },
    { label: 'B1 - Orta', value: 'B1' },
    { label: 'B2 - İyi', value: 'B2' },
    { label: 'C1 - İleri', value: 'C1' },
    { label: 'C2 - Uzman', value: 'C2' },
    { label: 'Anadil', value: 'native' }
  ];

  const handleAddLanguage = () => {
    setLanguages([
      ...languages,
      {
        id: Date.now().toString(),
        name: '',
        level: 'A1'
      }
    ]);
  };

  const handleRemoveLanguage = (id: string) => {
    if (languages.length > 1) {
      setLanguages(languages.filter(lang => lang.id !== id));
    }
  };

  const updateLanguage = (index: number, field: keyof Language, value: string) => {
    const updatedLanguages = [...languages];
    updatedLanguages[index] = {
      ...updatedLanguages[index],
      [field]: value
    };
    setLanguages(updatedLanguages);
  };

  const handleSave = () => {
    onSave(languages);
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
          <Text className="text-lg font-semibold">Yabancı Diller</Text>
          <TouchableOpacity onPress={handleSave}>
            <Text className="text-blue-600 font-semibold">Kaydet</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="flex-1 p-4">
          {languages.map((language, index) => (
            <View key={language.id} className="mb-6 bg-gray-50 p-4 rounded-lg">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-lg font-semibold text-gray-900">
                  {index + 1}. Dil
                </Text>
                {languages.length > 1 && (
                  <TouchableOpacity 
                    onPress={() => handleRemoveLanguage(language.id)}
                    className="bg-red-100 p-2 rounded-full"
                  >
                    <Feather name="trash-2" size={20} color="#EF4444" />
                  </TouchableOpacity>
                )}
              </View>

              <View className="space-y-4">
                <View>
                  <Text className="text-sm font-medium text-gray-700 mb-2">Dil</Text>
                  <TextInput
                    className="border border-gray-300 rounded-lg px-4 py-3 bg-white"
                    value={language.name}
                    onChangeText={(text) => updateLanguage(index, 'name', text)}
                    placeholder="Dil adını girin"
                  />
                </View>

                <View>
                  <Text className="text-sm font-medium text-gray-700 mb-2 mt-4">Seviye</Text>
                  <View className="border border-gray-300 rounded-lg bg-white">
                    <Picker
                      selectedValue={language.level}
                      onValueChange={(value: string) => updateLanguage(index, 'level', value)}
                    >
                      {levels.map((level) => (
                        <Picker.Item 
                          key={level.value} 
                          label={level.label} 
                          value={level.value} 
                        />
                      ))}
                    </Picker>
                  </View>
                </View>
              </View>
            </View>
          ))}

          <TouchableOpacity
            onPress={handleAddLanguage}
            className="flex-row items-center justify-center bg-blue-50 p-4 rounded-lg mb-4"
          >
            <Feather name="plus" size={20} color="#2563EB" />
            <Text className="ml-2 text-blue-600 font-semibold">Yeni Dil Ekle</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

export default LanguagesModal; 