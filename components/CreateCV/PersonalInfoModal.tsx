import React, { useState } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Picker } from '@react-native-picker/picker';

interface PersonalInfoModalProps {
  onClose: () => void;
  onSave: (data: any) => void;
  initialData?: any;
}

const PersonalInfoModal: React.FC<PersonalInfoModalProps> = ({ onClose, onSave, initialData }) => {
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [formData, setFormData] = useState(initialData || {
    fullName: '',
    email: '',
    phone: '',
    birthDate: '',
    address: '',
    city: '',
    district: '',
    postalCode: '',
    drivingLicense: '',
    gender: '',
    militaryStatus: '',
    maritalStatus: ''
  });

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const handleConfirm = (date: Date) => {
    setDatePickerVisible(false);
    setFormData({
      ...formData,
      birthDate: date.toLocaleDateString('tr-TR')
    });
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
          <Text className="text-lg font-semibold">Kişisel Bilgiler</Text>
          <TouchableOpacity onPress={handleSave}>
            <Text className="text-blue-600 font-semibold">Kaydet</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="flex-1 p-4">
          <View className="space-y-4">
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-2">Ad Soyad</Text>
              <TextInput
                className="border border-gray-300 rounded-lg px-4 py-3"
                value={formData.fullName}
                onChangeText={(text) => setFormData({ ...formData, fullName: text })}
                placeholder="Ad Soyad"
              />
            </View>

            <View>
              <Text className="text-sm font-medium text-gray-700 mb-2 mt-4">E-posta</Text>
              <TextInput
                className="border border-gray-300 rounded-lg px-4 py-3"
                value={formData.email}
                onChangeText={(text) => setFormData({ ...formData, email: text })}
                placeholder="E-posta"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View>
              <Text className="text-sm font-medium text-gray-700 mb-2 mt-4">Doğum Tarihi</Text>
              <TouchableOpacity 
                onPress={() => setDatePickerVisible(true)}
                className="border border-gray-300 rounded-lg px-4 py-3"
              >
                <Text>{formData.birthDate || 'Doğum Tarihi Seçin'}</Text>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={() => setDatePickerVisible(false)}
              />
            </View>

            <View>
              <Text className="text-sm font-medium text-gray-700 mb-2 mt-4">Telefon</Text>
              <TextInput
                className="border border-gray-300 rounded-lg px-4 py-3"
                value={formData.phone}
                onChangeText={(text) => setFormData({ ...formData, phone: text })}
                placeholder="Telefon"
                keyboardType="phone-pad"
              />
            </View>

            <View>
              <Text className="text-sm font-medium text-gray-700 mb-2 mt-4">Adres</Text>
              <TextInput
                className="border border-gray-300 rounded-lg px-4 py-3"
                value={formData.address}
                onChangeText={(text) => setFormData({ ...formData, address: text })}
                placeholder="Adres"
                multiline
              />
            </View>

            <View className="flex-row space-x-2">
              <View className="flex-1">
                <Text className="text-sm font-medium text-gray-700 mb-2 mt-4">Şehir</Text>
                <TextInput
                  className="border border-gray-300 rounded-lg px-4 py-3"
                  value={formData.city}
                  onChangeText={(text) => setFormData({ ...formData, city: text })}
                  placeholder="Şehir"
                />
              </View>
              <View className="flex-1">
                <Text className="text-sm font-medium text-gray-700 mb-2 mt-4">İlçe</Text>
                <TextInput
                  className="border border-gray-300 rounded-lg px-4 py-3"
                  value={formData.district}
                  onChangeText={(text) => setFormData({ ...formData, district: text })}
                  placeholder="İlçe"
                />
              </View>
            </View>

            <View>
              <Text className="text-sm font-medium text-gray-700 mb-2 mt-4">Posta Kodu</Text>
              <TextInput
                className="border border-gray-300 rounded-lg px-4 py-3"
                value={formData.postalCode}
                onChangeText={(text) => setFormData({ ...formData, postalCode: text })}
                placeholder="Posta Kodu"
                keyboardType="numeric"
              />
            </View>

            <View>
              <Text className="text-sm font-medium text-gray-700 mb-2 mt-4">Ehliyet</Text>
              <TextInput
                className="border border-gray-300 rounded-lg px-4 py-3"
                value={formData.drivingLicense}
                onChangeText={(text) => setFormData({ ...formData, drivingLicense: text })}
                placeholder="Ehliyet Bilgisi"
              />
            </View>

            <View>
              <Text className="text-sm font-medium text-gray-700 mb-2 mt-4">Cinsiyet</Text>
              <View className="border border-gray-300 rounded-lg bg-white">
                <Picker
                  selectedValue={formData.gender}
                  onValueChange={(value: string) => setFormData({ ...formData, gender: value })}
                  style={Platform.OS === 'ios' ? { height: 150 } : {}}
                  itemStyle={Platform.OS === 'ios' ? { height: 150 } : {}}
                >
                  <Picker.Item label="Seçiniz" value="" />
                  <Picker.Item label="Erkek" value="male" />
                  <Picker.Item label="Kadın" value="female" />
                </Picker>
              </View>
            </View>

            <View>
              <Text className="text-sm font-medium text-gray-700 mb-2 mt-4">Askerlik Durumu</Text>
              <View className="border border-gray-300 rounded-lg bg-white">
                <Picker
                  selectedValue={formData.militaryStatus}
                  onValueChange={(value: string) => setFormData({ ...formData, militaryStatus: value })}
                  style={Platform.OS === 'ios' ? { height: 150 } : {}}
                  itemStyle={Platform.OS === 'ios' ? { height: 150 } : {}}
                >
                  <Picker.Item label="Seçiniz" value="" />
                  <Picker.Item label="Yapıldı" value="completed" />
                  <Picker.Item label="Muaf" value="exempt" />
                  <Picker.Item label="Tecilli" value="delayed" />
                </Picker>
              </View>
            </View>

            <View className="mb-8">
              <Text className="text-sm font-medium text-gray-700 mb-2 mt-4">Medeni Durum</Text>
              <View className="border border-gray-300 rounded-lg bg-white">
                <Picker
                  selectedValue={formData.maritalStatus}
                  onValueChange={(value: string) => setFormData({ ...formData, maritalStatus: value })}
                  style={Platform.OS === 'ios' ? { height: 150 } : {}}
                  itemStyle={Platform.OS === 'ios' ? { height: 150 } : {}}
                >
                  <Picker.Item label="Seçiniz" value="" />
                  <Picker.Item label="Bekar" value="single" />
                  <Picker.Item label="Evli" value="married" />
                </Picker>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

export default PersonalInfoModal; 