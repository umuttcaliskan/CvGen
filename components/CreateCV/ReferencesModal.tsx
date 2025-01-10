import React, { useState } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface Reference {
  id: string;
  fullName: string;
  company: string;
  position: string;
  phone: string;
  email: string;
}

interface ReferencesModalProps {
  onClose: () => void;
  onSave: (data: Reference[]) => void;
  initialData: Reference[] | null;
}

const ReferencesModal: React.FC<ReferencesModalProps> = ({ onClose, onSave, initialData }) => {
  const [references, setReferences] = useState<Reference[]>(initialData || [{
    id: '1',
    fullName: '',
    company: '',
    position: '',
    phone: '',
    email: ''
  }]);

  const handleAddReference = () => {
    setReferences([
      ...references,
      {
        id: Date.now().toString(),
        fullName: '',
        company: '',
        position: '',
        phone: '',
        email: ''
      }
    ]);
  };

  const handleRemoveReference = (id: string) => {
    if (references.length > 1) {
      setReferences(references.filter(ref => ref.id !== id));
    }
  };

  const updateReference = (index: number, field: keyof Reference, value: string) => {
    const updatedReferences = [...references];
    updatedReferences[index] = {
      ...updatedReferences[index],
      [field]: value
    };
    setReferences(updatedReferences);
  };

  const handleSave = () => {
    onSave(references);
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
          <Text className="text-lg font-semibold">Referanslar</Text>
          <TouchableOpacity onPress={handleSave}>
            <Text className="text-blue-600 font-semibold">Kaydet</Text>
          </TouchableOpacity>
        </View>

        <ScrollView 
          className="flex-1 px-4"
          contentContainerStyle={{ paddingTop: 16, paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
        >
          {references.map((reference, index) => (
            <View key={reference.id} className="mb-6 bg-gray-50 p-4 rounded-lg">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-lg font-semibold text-gray-900">
                  {index + 1}. Referans
                </Text>
                {references.length > 1 && (
                  <TouchableOpacity 
                    onPress={() => handleRemoveReference(reference.id)}
                    className="bg-red-100 p-2 rounded-full"
                  >
                    <Feather name="trash-2" size={20} color="#EF4444" />
                  </TouchableOpacity>
                )}
              </View>

              <View className="space-y-4">
                <View>
                  <Text className="text-sm font-medium text-gray-700 mb-2">Ad Soyad</Text>
                  <TextInput
                    className="border border-gray-300 rounded-lg px-4 py-3 bg-white"
                    value={reference.fullName}
                    onChangeText={(text) => updateReference(index, 'fullName', text)}
                    placeholder="Referans kişinin adı soyadı"
                  />
                </View>

                <View>
                  <Text className="text-sm font-medium text-gray-700 mb-2">Şirket</Text>
                  <TextInput
                    className="border border-gray-300 rounded-lg px-4 py-3 bg-white"
                    value={reference.company}
                    onChangeText={(text) => updateReference(index, 'company', text)}
                    placeholder="Çalıştığı şirket"
                  />
                </View>

                <View>
                  <Text className="text-sm font-medium text-gray-700 mb-2">Pozisyon</Text>
                  <TextInput
                    className="border border-gray-300 rounded-lg px-4 py-3 bg-white"
                    value={reference.position}
                    onChangeText={(text) => updateReference(index, 'position', text)}
                    placeholder="Çalıştığı pozisyon"
                  />
                </View>

                <View>
                  <Text className="text-sm font-medium text-gray-700 mb-2">Telefon</Text>
                  <TextInput
                    className="border border-gray-300 rounded-lg px-4 py-3 bg-white"
                    value={reference.phone}
                    onChangeText={(text) => updateReference(index, 'phone', text)}
                    placeholder="İletişim telefonu"
                    keyboardType="phone-pad"
                  />
                </View>

                <View>
                  <Text className="text-sm font-medium text-gray-700 mb-2">E-posta</Text>
                  <TextInput
                    className="border border-gray-300 rounded-lg px-4 py-3 bg-white"
                    value={reference.email}
                    onChangeText={(text) => updateReference(index, 'email', text)}
                    placeholder="E-posta adresi"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>
            </View>
          ))}

          <TouchableOpacity
            onPress={handleAddReference}
            className="flex-row items-center justify-center bg-blue-50 p-4 rounded-lg mb-4"
          >
            <Feather name="plus" size={20} color="#2563EB" />
            <Text className="ml-2 text-blue-600 font-semibold">Yeni Referans Ekle</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

export default ReferencesModal; 