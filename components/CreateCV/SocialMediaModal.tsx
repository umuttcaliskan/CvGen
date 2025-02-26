import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, TextInput, Modal, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

interface SocialMedia {
  id: string;
  platform: string;
  username: string;
  url: string;
}

interface SocialMediaModalProps {
  onClose: () => void;
  onSave: (data: SocialMedia[]) => void;
  initialData: SocialMedia[] | null;
}

const SocialMediaModal: React.FC<SocialMediaModalProps> = ({ onClose, onSave, initialData }) => {
  const [socialMedia, setSocialMedia] = useState<SocialMedia[]>(initialData || [{
    id: '1',
    platform: 'linkedin',
    username: '',
    url: ''
  }]);

  const platforms = [
    { label: 'LinkedIn', value: 'linkedin' },
    { label: 'GitHub', value: 'github' },
    { label: 'Twitter', value: 'twitter' },
    { label: 'Instagram', value: 'instagram' },
    { label: 'Facebook', value: 'facebook' },
    { label: 'Portfolio/Web Sitesi', value: 'website' },
    { label: 'YouTube', value: 'youtube' },
    { label: 'Dribbble', value: 'dribbble' },
    { label: 'Behance', value: 'behance' },
    { label: 'Medium', value: 'medium' },
    { label: 'Diğer', value: 'other' }
  ];

  const handleAddSocialMedia = () => {
    setSocialMedia([
      ...socialMedia,
      {
        id: Date.now().toString(),
        platform: 'linkedin',
        username: '',
        url: ''
      }
    ]);
  };

  const handleRemoveSocialMedia = (id: string) => {
    if (socialMedia.length > 1) {
      setSocialMedia(socialMedia.filter(item => item.id !== id));
    }
  };

  const updateSocialMedia = (index: number, field: keyof SocialMedia, value: string) => {
    const updatedSocialMedia = [...socialMedia];
    updatedSocialMedia[index] = {
      ...updatedSocialMedia[index],
      [field]: value
    };
    setSocialMedia(updatedSocialMedia);
  };

  const handleSave = () => {
    onSave(socialMedia);
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
          <Text className="text-lg font-semibold">Sosyal Medya Hesaplarım</Text>
          <TouchableOpacity onPress={handleSave}>
            <Text className="text-blue-600 font-semibold">Kaydet</Text>
          </TouchableOpacity>
        </View>

        <ScrollView 
          className="flex-1 p-4"
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {socialMedia.map((item, index) => (
            <View key={item.id} className="mb-6 bg-gray-50 p-4 rounded-lg">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-lg font-semibold text-gray-900">
                  {index + 1}. Sosyal Medya
                </Text>
                {socialMedia.length > 1 && (
                  <TouchableOpacity 
                    onPress={() => handleRemoveSocialMedia(item.id)}
                    className="bg-red-100 p-2 rounded-full"
                  >
                    <Feather name="trash-2" size={20} color="#EF4444" />
                  </TouchableOpacity>
                )}
              </View>

              <View className="space-y-4">
                <View>
                  <Text className="text-sm font-medium text-gray-700 mb-2">Platform</Text>
                  <View className="border border-gray-300 rounded-lg bg-white">
                    <Picker
                      selectedValue={item.platform}
                      onValueChange={(value) => updateSocialMedia(index, 'platform', value)}
                      style={Platform.OS === 'ios' ? { height: 150 } : {}}
                      itemStyle={Platform.OS === 'ios' ? { height: 150 } : {}}
                    >
                      {platforms.map((platform) => (
                        <Picker.Item 
                          key={platform.value} 
                          label={platform.label} 
                          value={platform.value} 
                        />
                      ))}
                    </Picker>
                  </View>
                </View>

                <View>
                  <Text className="text-sm font-medium text-gray-700 mb-2 mt-4">Kullanıcı Adı</Text>
                  <TextInput
                    className="border border-gray-300 rounded-lg px-4 py-3 bg-white"
                    value={item.username}
                    onChangeText={(text) => updateSocialMedia(index, 'username', text)}
                    placeholder="Kullanıcı adınızı girin"
                  />
                </View>

                <View>
                  <Text className="text-sm font-medium text-gray-700 mb-2 mt-4">URL</Text>
                  <TextInput
                    className="border border-gray-300 rounded-lg px-4 py-3 bg-white"
                    value={item.url}
                    onChangeText={(text) => updateSocialMedia(index, 'url', text)}
                    placeholder="https://..."
                    keyboardType="url"
                    autoCapitalize="none"
                  />
                </View>
              </View>
            </View>
          ))}

          <TouchableOpacity
            onPress={handleAddSocialMedia}
            className="flex-row items-center justify-center bg-blue-50 p-4 rounded-lg mb-4"
          >
            <Feather name="plus" size={20} color="#2563EB" />
            <Text className="ml-2 text-blue-600 font-semibold">Yeni Sosyal Medya Ekle</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

export default SocialMediaModal; 