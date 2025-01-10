import React, { useState } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

interface Certificate {
  id: string;
  name: string;
  institution: string;
  date: string;
}

interface CertificatesModalProps {
  onClose: () => void;
  onSave: (data: Certificate[]) => void;
  initialData: Certificate[] | null;
}

const CertificatesModal: React.FC<CertificatesModalProps> = ({ onClose, onSave, initialData }) => {
  const [certificates, setCertificates] = useState<Certificate[]>(initialData || [{
    id: '1',
    name: '',
    institution: '',
    date: ''
  }]);

  const [activeDatePickerIndex, setActiveDatePickerIndex] = useState<number | null>(null);

  const handleAddCertificate = () => {
    setCertificates([
      ...certificates,
      {
        id: Date.now().toString(),
        name: '',
        institution: '',
        date: ''
      }
    ]);
  };

  const handleRemoveCertificate = (id: string) => {
    if (certificates.length > 1) {
      setCertificates(certificates.filter(cert => cert.id !== id));
    }
  };

  const handleDateConfirm = (date: Date) => {
    if (activeDatePickerIndex !== null) {
      const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
      const updatedCertificates = [...certificates];
      updatedCertificates[activeDatePickerIndex] = {
        ...updatedCertificates[activeDatePickerIndex],
        date: formattedDate
      };
      setCertificates(updatedCertificates);
      setActiveDatePickerIndex(null);
    }
  };

  const updateCertificate = (index: number, field: keyof Certificate, value: string) => {
    const updatedCertificates = [...certificates];
    updatedCertificates[index] = {
      ...updatedCertificates[index],
      [field]: value
    };
    setCertificates(updatedCertificates);
  };

  const handleSave = () => {
    onSave(certificates);
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
          <Text className="text-lg font-semibold">Sertifikalar</Text>
          <TouchableOpacity onPress={handleSave}>
            <Text className="text-blue-600 font-semibold">Kaydet</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="flex-1 p-4">
          {certificates.map((certificate, index) => (
            <View key={certificate.id} className="mb-6 bg-gray-50 p-4 rounded-lg">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-lg font-semibold text-gray-900">
                  {index + 1}. Sertifika
                </Text>
                {certificates.length > 1 && (
                  <TouchableOpacity 
                    onPress={() => handleRemoveCertificate(certificate.id)}
                    className="bg-red-100 p-2 rounded-full"
                  >
                    <Feather name="trash-2" size={20} color="#EF4444" />
                  </TouchableOpacity>
                )}
              </View>

              <View className="space-y-4">
                <View>
                  <Text className="text-sm font-medium text-gray-700 mb-2">Sertifika Adı</Text>
                  <TextInput
                    className="border border-gray-300 rounded-lg px-4 py-3 bg-white"
                    value={certificate.name}
                    onChangeText={(text) => updateCertificate(index, 'name', text)}
                    placeholder="Sertifika adını girin"
                  />
                </View>

                <View>
                  <Text className="text-sm font-medium text-gray-700 mb-2 mt-4">Kurum</Text>
                  <TextInput
                    className="border border-gray-300 rounded-lg px-4 py-3 bg-white"
                    value={certificate.institution}
                    onChangeText={(text) => updateCertificate(index, 'institution', text)}
                    placeholder="Kurumu girin"
                  />
                </View>

                <View>
                  <Text className="text-sm font-medium text-gray-700 mb-2 mt-4">Alınma Tarihi</Text>
                  <TouchableOpacity 
                    onPress={() => setActiveDatePickerIndex(index)}
                    className="border border-gray-300 rounded-lg px-4 py-3 bg-white"
                  >
                    <Text>{certificate.date || 'Tarih Seçin'}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}

          <TouchableOpacity
            onPress={handleAddCertificate}
            className="flex-row items-center justify-center bg-blue-50 p-4 rounded-lg mb-4"
          >
            <Feather name="plus" size={20} color="#2563EB" />
            <Text className="ml-2 text-blue-600 font-semibold">Yeni Sertifika Ekle</Text>
          </TouchableOpacity>
        </ScrollView>

        <DateTimePickerModal
          isVisible={activeDatePickerIndex !== null}
          mode="date"
          onConfirm={handleDateConfirm}
          onCancel={() => setActiveDatePickerIndex(null)}
        />
      </SafeAreaView>
    </Modal>
  );
};

export default CertificatesModal; 