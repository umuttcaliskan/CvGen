import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import Modal from 'react-native-modal';
import { Feather } from '@expo/vector-icons';
import { TemplateId } from '../lib/templates';

interface CVTemplateModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSelectTemplate: (templateId: TemplateId) => void;
}

interface Template {
  id: string;
  name: string;
  image: any;
  icon: any;
}

const CVTemplateModal: React.FC<CVTemplateModalProps> = ({ isVisible, onClose, onSelectTemplate }) => {
  const templates = [
    { id: 'modern', name: 'Modern', image: require('../assets/images/cv.png'), icon: require('../assets/images/icon.png') },
    { id: 'professional', name: 'Profesyonel', image: require('../assets/images/cv1.png'), icon: require('../assets/images/icon.png') },
    { id: 'elegant', name: 'Elegant', image: require('../assets/images/cv2.png'), icon: require('../assets/images/icon.png') },
    { id: 'feminine', name: 'Feminine', image: require('../assets/images/cv3.png'), icon: require('../assets/images/icon.png') },
    { id: 'darkModern', name: 'Dark Modern', image: require('../assets/images/cv4.png'), icon: require('../assets/images/icon.png') },
    { id: 'minimalist', name: 'Minimalist', image: require('../assets/images/cv5.png'), icon: require('../assets/images/icon.png') },
  ];

  const [selectedId, setSelectedId] = useState<TemplateId>('modern');
  
  const selectedTemplate = templates.find(t => t.id === selectedId);
  
  const renderTemplateItem = (template: Template) => (
    <TouchableOpacity 
      key={template.id}
      onPress={() => setSelectedId(template.id as TemplateId)}
      className="items-center px-2"
    >
      <View
        className={`w-20 h-20 rounded-full bg-gray-100 items-center justify-center border-2
          ${selectedId === template.id ? 'border-blue-500' : 'border-gray-300'}`}
      >
        <Image
          source={template.icon}
          style={{ width: 56, height: 56 }}
          resizeMode="cover"
        />
      </View>
      <Text
        className={`mt-2 text-sm ${
          selectedId === template.id ? 'text-blue-500 font-medium' : 'text-gray-600'
        }`}
      >
        {template.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={{ margin: 0 }}
      animationIn="slideInUp"
      animationOut="slideOutDown"
    >
      <View className="bg-white rounded-t-3xl mt-20">
        <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
          <Text className="text-2xl font-semibold">CV Şablonu Seçin</Text>
          <TouchableOpacity onPress={onClose}>
            <Feather name="x" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View className="p-4">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 4 }}
            className="flex-row space-x-8 h-32"
          >
            {templates.map(renderTemplateItem)}
          </ScrollView>
          <View className="mt-4">
            <View style={{ height: 297 }} className="w-full bg-gray-50 rounded-lg items-center justify-center shadow-sm">
              {selectedTemplate && (
                <Image
                  source={selectedTemplate.image}
                  className="w-full h-full"
                  resizeMode="contain"
                />
              )}
            </View>
            <TouchableOpacity
              className="mt-4 bg-blue-500 py-3 rounded-lg items-center flex-row justify-center space-x-2"
              onPress={() => {
                if (selectedId) {
                  onSelectTemplate(selectedId);
                }
              }}
            >
              <Feather name="download" size={20} color="white" />
              <Text className="text-white font-semibold text-lg">İndir</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CVTemplateModal;