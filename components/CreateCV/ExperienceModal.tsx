import React, { useState } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

interface Experience {
  id: string;
  companyName: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface ExperienceModalProps {
  onClose: () => void;
  onSave: (data: Experience[]) => void;
  initialData: Experience[] | null;
}

const ExperienceModal: React.FC<ExperienceModalProps> = ({ onClose, onSave, initialData }) => {
  const [experiences, setExperiences] = useState<Experience[]>(initialData || [{
    id: '1',
    companyName: '',
    position: '',
    startDate: '',
    endDate: '',
    description: ''
  }]);

  const [activeDatePicker, setActiveDatePicker] = useState<{
    index: number;
    type: 'start' | 'end';
  } | null>(null);

  const handleAddExperience = () => {
    setExperiences([
      ...experiences,
      {
        id: Date.now().toString(),
        companyName: '',
        position: '',
        startDate: '',
        endDate: '',
        description: ''
      }
    ]);
  };

  const handleRemoveExperience = (id: string) => {
    if (experiences.length > 1) {
      setExperiences(experiences.filter(exp => exp.id !== id));
    }
  };

  const handleDateConfirm = (date: Date) => {
    if (activeDatePicker) {
      const { index, type } = activeDatePicker;
      const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
      
      const updatedExperiences = [...experiences];
      updatedExperiences[index] = {
        ...updatedExperiences[index],
        [type === 'start' ? 'startDate' : 'endDate']: formattedDate
      };
      
      setExperiences(updatedExperiences);
      setActiveDatePicker(null);
    }
  };

  const updateExperience = (index: number, field: keyof Experience, value: string) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index] = {
      ...updatedExperiences[index],
      [field]: value
    };
    setExperiences(updatedExperiences);
  };

  const handleSave = () => {
    onSave(experiences);
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
          <Text className="text-lg font-semibold">İş Deneyimleri</Text>
          <TouchableOpacity onPress={handleSave}>
            <Text className="text-blue-600 font-semibold">Kaydet</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="flex-1 p-4">
          {experiences.map((experience, index) => (
            <View key={experience.id} className="mb-6 bg-gray-50 p-4 rounded-lg">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-lg font-semibold text-gray-900">
                  {index + 1}. İş Deneyimi
                </Text>
                {experiences.length > 1 && (
                  <TouchableOpacity 
                    onPress={() => handleRemoveExperience(experience.id)}
                    className="bg-red-100 p-2 rounded-full"
                  >
                    <Feather name="trash-2" size={20} color="#EF4444" />
                  </TouchableOpacity>
                )}
              </View>

              <View className="space-y-4">
                <View>
                  <Text className="text-sm font-medium text-gray-700 mb-2">Şirket Adı</Text>
                  <TextInput
                    className="border border-gray-300 rounded-lg px-4 py-3 bg-white"
                    value={experience.companyName}
                    onChangeText={(text) => updateExperience(index, 'companyName', text)}
                    placeholder="Şirket adını girin"
                  />
                </View>

                <View>
                  <Text className="text-sm font-medium text-gray-700 mb-2 mt-4">Pozisyon</Text>
                  <TextInput
                    className="border border-gray-300 rounded-lg px-4 py-3 bg-white"
                    value={experience.position}
                    onChangeText={(text) => updateExperience(index, 'position', text)}
                    placeholder="Pozisyonunuzu girin"
                  />
                </View>

                <View className="flex-row space-x-2">
                  <View className="flex-1">
                    <Text className="text-sm font-medium text-gray-700 mb-2 mt-4">Başlangıç Tarihi</Text>
                    <TouchableOpacity 
                      onPress={() => setActiveDatePicker({ index, type: 'start' })}
                      className="border border-gray-300 rounded-lg px-4 py-3 bg-white"
                    >
                      <Text>{experience.startDate || 'Tarih Seçin'}</Text>
                    </TouchableOpacity>
                  </View>

                  <View className="flex-1">
                    <Text className="text-sm font-medium text-gray-700 mb-2 mt-4">Bitiş Tarihi</Text>
                    <TouchableOpacity 
                      onPress={() => setActiveDatePicker({ index, type: 'end' })}
                      className="border border-gray-300 rounded-lg px-4 py-3 bg-white"
                    >
                      <Text>{experience.endDate || 'Tarih Seçin'}</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View>
                  <Text className="text-sm font-medium text-gray-700 mb-2 mt-4">Görev Tanımı</Text>
                  <TextInput
                    className="border border-gray-300 rounded-lg px-4 py-3 bg-white"
                    value={experience.description}
                    onChangeText={(text) => updateExperience(index, 'description', text)}
                    placeholder="Görev tanımınızı girin"
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                  />
                </View>
              </View>
            </View>
          ))}

          <TouchableOpacity
            onPress={handleAddExperience}
            className="flex-row items-center justify-center bg-blue-50 p-4 rounded-lg mb-4"
          >
            <Feather name="plus" size={20} color="#2563EB" />
            <Text className="ml-2 text-blue-600 font-semibold">Yeni İş Deneyimi Ekle</Text>
          </TouchableOpacity>
        </ScrollView>

        <DateTimePickerModal
          isVisible={activeDatePicker !== null}
          mode="date"
          onConfirm={handleDateConfirm}
          onCancel={() => setActiveDatePicker(null)}
        />
      </SafeAreaView>
    </Modal>
  );
};

export default ExperienceModal; 