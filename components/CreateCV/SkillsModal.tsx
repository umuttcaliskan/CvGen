import React, { useState } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

interface Skill {
  id: string;
  name: string;
  level: string;
}

interface SkillsModalProps {
  onClose: () => void;
  onSave: (data: Skill[]) => void;
  initialData: Skill[] | null;
}

const SkillsModal: React.FC<SkillsModalProps> = ({ onClose, onSave, initialData }) => {
  const [skills, setSkills] = useState<Skill[]>(initialData || [{
    id: '1',
    name: '',
    level: 'beginner'
  }]);

  const levels = [
    { label: 'Başlangıç', value: 'beginner' },
    { label: 'Orta', value: 'intermediate' },
    { label: 'İleri', value: 'advanced' },
    { label: 'Uzman', value: 'expert' }
  ];

  const handleAddSkill = () => {
    setSkills([
      ...skills,
      {
        id: Date.now().toString(),
        name: '',
        level: 'beginner'
      }
    ]);
  };

  const handleRemoveSkill = (id: string) => {
    if (skills.length > 1) {
      setSkills(skills.filter(skill => skill.id !== id));
    }
  };

  const updateSkill = (index: number, field: keyof Skill, value: string) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = {
      ...updatedSkills[index],
      [field]: value
    };
    setSkills(updatedSkills);
  };

  const handleSave = () => {
    onSave(skills);
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
          <Text className="text-lg font-semibold">Beceriler</Text>
          <TouchableOpacity onPress={handleSave}>
            <Text className="text-blue-600 font-semibold">Kaydet</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="flex-1 p-4">
          {skills.map((skill, index) => (
            <View key={skill.id} className="mb-6 bg-gray-50 p-4 rounded-lg">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-lg font-semibold text-gray-900">
                  {index + 1}. Beceri
                </Text>
                {skills.length > 1 && (
                  <TouchableOpacity 
                    onPress={() => handleRemoveSkill(skill.id)}
                    className="bg-red-100 p-2 rounded-full"
                  >
                    <Feather name="trash-2" size={20} color="#EF4444" />
                  </TouchableOpacity>
                )}
              </View>

              <View className="space-y-4">
                <View>
                  <Text className="text-sm font-medium text-gray-700 mb-2">Beceri Adı</Text>
                  <TextInput
                    className="border border-gray-300 rounded-lg px-4 py-3 bg-white"
                    value={skill.name}
                    onChangeText={(text) => updateSkill(index, 'name', text)}
                    placeholder="Beceri adını girin"
                  />
                </View>

                <View>
                  <Text className="text-sm font-medium text-gray-700 mb-2 mt-4">Seviye</Text>
                  <View className="border border-gray-300 rounded-lg bg-white">
                    <Picker
                      selectedValue={skill.level}
                      onValueChange={(value) => updateSkill(index, 'level', value)}
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
            onPress={handleAddSkill}
            className="flex-row items-center justify-center bg-blue-50 p-4 rounded-lg mb-4"
          >
            <Feather name="plus" size={20} color="#2563EB" />
            <Text className="ml-2 text-blue-600 font-semibold">Yeni Beceri Ekle</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

export default SkillsModal; 