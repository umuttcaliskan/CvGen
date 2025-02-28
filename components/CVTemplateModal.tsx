import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
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
    { id: 'corporate', name: 'İş Dünyası', image: require('../assets/images/corporate.png'), icon: require('../assets/images/icon.png') },
    { id: 'atsMinimal', name: 'Dijital Geçiş', image: require('../assets/images/atsUyumlu.png'), icon: require('../assets/images/icon.png') },
    { id: 'minimalist', name: 'Öz ve Net', image: require('../assets/images/minimalist.png'), icon: require('../assets/images/icon.png') },
    { id: 'twoColumn', name: 'Nova', image: require('../assets/images/whiteTwoColumn.png'), icon: require('../assets/images/icon.png') },
    { id: 'darkModern', name: 'Gece Mavisi', image: require('../assets/images/darkmodern.png'), icon: require('../assets/images/icon.png') },
    { id: 'greenModern', name: 'Bahar Esintisi', image: require('../assets/images/greenModern.png'), icon: require('../assets/images/icon.png') },
    { id: 'brownElegant', name: 'Toprak Tonu', image: require('../assets/images/elite.png'), icon: require('../assets/images/icon.png') },
    { id: 'professional', name: 'Kariyer Odaklı', image: require('../assets/images/professional.png'), icon: require('../assets/images/icon.png') },
    { id: 'modern', name: 'Mavi Ufuklar', image: require('../assets/images/modern.png'), icon: require('../assets/images/icon.png') },
    { id: 'elegant', name: 'İnce Detay', image: require('../assets/images/elegant.png'), icon: require('../assets/images/icon.png') },
    { id: 'feminine', name: 'Yalın Zarafet', image: require('../assets/images/feminine.png'), icon: require('../assets/images/icon.png') },
    { id: 'crystalClear', name: 'Kristal Netlik', image: require('../assets/images/crystal.png'), icon: require('../assets/images/icon.png') },
  ];

  const [selectedId, setSelectedId] = useState<TemplateId>('modern');
  const windowWidth = Dimensions.get('window').width;
  
  const selectedTemplate = templates.find(t => t.id === selectedId);
  
  const handleSelectTemplate = (id: TemplateId) => {
    setSelectedId(id);
  }

  const renderTemplateItem = (template: Template) => (
    <TouchableOpacity 
      key={template.id}
      onPress={() => handleSelectTemplate(template.id as TemplateId)}
      className={`items-center mx-2 ${selectedId === template.id ? 'transform scale-110' : ''}`}
      style={{ width: 90 }}
    >
      <View
        className={`w-22 h-22 rounded-xl bg-white items-center justify-center border-2 overflow-hidden shadow-md
          ${selectedId === template.id ? 'border-blue-500' : 'border-gray-200'}`}
        style={{ 
          width: 80, 
          height: 80,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          elevation: 3
        }}
      >
        <Image
          source={template.image}
          style={{ width: 80, height: 80 }}
          resizeMode="cover"
        />
      </View>
      <Text
        className={`mt-3 text-sm ${
          selectedId === template.id ? 'text-blue-600 font-bold' : 'text-gray-600'
        }`}
      >
        {template.name}
      </Text>
      {selectedId === template.id && (
        <View className="h-1 w-12 bg-blue-500 rounded-full mt-1" />
      )}
    </TouchableOpacity>
  );

  const handleSelect = () => {
    onSelectTemplate(selectedId);
    onClose();
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={{ margin: 0, justifyContent: 'flex-end' }}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropTransitionOutTiming={0}
      backdropOpacity={0.5}
      statusBarTranslucent
    >
      <View className="bg-white rounded-t-3xl">
        <View className="w-12 h-1 bg-gray-300 rounded-full mx-auto mt-3" />
        
        <View className="flex-row justify-between items-center px-6 pt-5 pb-3">
          <Text className="text-2xl font-bold text-gray-800">CV Şablonu Seçin</Text>
          <TouchableOpacity 
            onPress={onClose}
            className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center"
          >
            <Feather name="x" size={22} color="#666" />
          </TouchableOpacity>
        </View>
        
        <View className="px-4 pb-8">
          <View className="bg-gray-50 rounded-xl p-2 mb-5">
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 10 }}
              className="flex-row"
              decelerationRate="fast"
              snapToInterval={90}
            >
              {templates.map(renderTemplateItem)}
            </ScrollView>
          </View>
          
          <View className="mt-2">
            <View 
              className="w-full bg-gray-50 rounded-2xl items-center justify-center overflow-hidden shadow-sm"
              style={{ 
                height: 340,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.1,
                shadowRadius: 5,
                elevation: 2
              }}
            >
              {selectedTemplate && (
                <Image
                  source={selectedTemplate.image}
                  className="w-full h-full"
                  resizeMode="contain"
                />
              )}
              
              <View className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-100 to-transparent opacity-70" />
            </View>
            
            <TouchableOpacity
              className="mt-6 bg-blue-600 py-4 rounded-xl items-center flex-row justify-center space-x-2 shadow-md"
              style={{ 
                shadowColor: "#2563EB",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 5,
                elevation: 4
              }}
              onPress={handleSelect}
            >
              <Feather name="download" size={20} color="white" />
              <Text className="text-white font-bold text-lg">Bu Şablonu Kullan</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CVTemplateModal;