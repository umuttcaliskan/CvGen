import React, { useState } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

interface Education {
  id: string;
  schoolName: string;
  department: string;
  startDate: string;
  endDate: string;
}

interface EducationModalProps {
  onClose: () => void;
  onSave: (data: Education[]) => void;
  initialData: Education[] | null;
}

const EducationModal: React.FC<EducationModalProps> = ({ onClose, onSave, initialData }) => {
  const [educations, setEducations] = useState<Education[]>(initialData || [{
    id: '1',
    schoolName: '',
    department: '',
    startDate: '',
    endDate: ''
  }]);

  const [activeDatePicker, setActiveDatePicker] = useState<{
    index: number;
    type: 'start' | 'end';
  } | null>(null);

  const handleAddEducation = () => {
    setEducations([
      ...educations,
      {
        id: Date.now().toString(),
        schoolName: '',
        department: '',
        startDate: '',
        endDate: ''
      }
    ]);
  };

  const handleRemoveEducation = (id: string) => {
    if (educations.length > 1) {
      setEducations(educations.filter(edu => edu.id !== id));
    }
  };

  const handleDateConfirm = (date: Date) => {
    if (activeDatePicker) {
      const { index, type } = activeDatePicker;
      const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
      
      const updatedEducations = [...educations];
      updatedEducations[index] = {
        ...updatedEducations[index],
        [type === 'start' ? 'startDate' : 'endDate']: formattedDate
      };
      
      setEducations(updatedEducations);
      setActiveDatePicker(null);
    }
  };

  const updateEducation = (index: number, field: keyof Education, value: string) => {
    const updatedEducations = [...educations];
    updatedEducations[index] = {
      ...updatedEducations[index],
      [field]: value
    };
    setEducations(updatedEducations);
  };

  const handleSave = () => {
    onSave(educations);
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
          <Text className="text-lg font-semibold">Eğitim Bilgileri</Text>
          <TouchableOpacity onPress={handleSave}>
            <Text className="text-blue-600 font-semibold">Kaydet</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="flex-1 p-4">
          {educations.map((education, index) => (
            <View key={education.id} className="mb-6 bg-gray-50 p-4 rounded-lg">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-lg font-semibold text-gray-900">
                  {index + 1}. Eğitim Bilgisi
                </Text>
                {educations.length > 1 && (
                  <TouchableOpacity 
                    onPress={() => handleRemoveEducation(education.id)}
                    className="bg-red-100 p-2 rounded-full"
                  >
                    <Feather name="trash-2" size={20} color="#EF4444" />
                  </TouchableOpacity>
                )}
              </View>

              <View className="space-y-4">
                <View>
                  <Text className="text-sm font-medium text-gray-700 mb-2 ">Okul Adı</Text>
                  <TextInput
                    className="border border-gray-300 rounded-lg px-4 py-3 bg-white"
                    value={education.schoolName}
                    onChangeText={(text) => updateEducation(index, 'schoolName', text)}
                    placeholder="Okul adını girin"
                  />
                </View>

                <View>
                  <Text className="text-sm font-medium text-gray-700 mb-2 mt-4">Bölüm</Text>
                  <TextInput
                    className="border border-gray-300 rounded-lg px-4 py-3 bg-white"
                    value={education.department}
                    onChangeText={(text) => updateEducation(index, 'department', text)}
                    placeholder="Bölüm adını girin"
                  />
                </View>

                <View className="flex-row space-x-2">
                  <View className="flex-1">
                    <Text className="text-sm font-medium text-gray-700 mb-2 mt-4">Başlangıç Tarihi</Text>
                    <TouchableOpacity 
                      onPress={() => setActiveDatePicker({ index, type: 'start' })}
                      className="border border-gray-300 rounded-lg px-4 py-3 bg-white"
                    >
                      <Text>{education.startDate || 'Tarih Seçin'}</Text>
                    </TouchableOpacity>
                  </View>

                  <View className="flex-1">
                    <Text className="text-sm font-medium text-gray-700 mb-2 mt-4">Bitiş Tarihi</Text>
                    <TouchableOpacity 
                      onPress={() => setActiveDatePicker({ index, type: 'end' })}
                      className="border border-gray-300 rounded-lg px-4 py-3 bg-white"
                    >
                      <Text>{education.endDate || 'Tarih Seçin'}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          ))}

          <TouchableOpacity
            onPress={handleAddEducation}
            className="flex-row items-center justify-center bg-blue-50 p-4 rounded-lg mb-4"
          >
            <Feather name="plus" size={20} color="#2563EB" />
            <Text className="ml-2 text-blue-600 font-semibold">Yeni Eğitim Ekle</Text>
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

export default EducationModal; 