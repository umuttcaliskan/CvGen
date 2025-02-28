import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface CareerTipsProps {
  onTipPress: (type: 'cv' | 'interview' | 'career', title: string) => void;
}

const CareerTips: React.FC<CareerTipsProps> = ({ onTipPress }) => {
  return (
    <View className="bg-white py-6 px-4 mt-4 rounded-xl">
      <Text className="text-lg font-semibold text-gray-900 mb-4 px-2">
        Kariyer İpuçları
      </Text>
      
      <View className="space-y-4">
        <TouchableOpacity 
          className="bg-blue-50 rounded-xl p-4 mt-2"
          onPress={() => onTipPress('cv', 'Etkili CV Hazırlama')}
        >
          <View className="bg-blue-100 rounded-lg p-3 w-12 h-12 items-center justify-center mb-3">
            <Feather name="file-text" size={24} color="#2563EB" />
          </View>
          <Text className="text-lg font-semibold text-gray-900 mb-2">
            Etkili CV Hazırlama
          </Text>
          <Text className="text-gray-600 text-sm">
            İş verenlerinin dikkatini çekecek bir CV nasıl hazırlanır? Önemli ipuçları ve püf noktaları.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          className="bg-purple-50 rounded-xl p-4 mt-4"
          onPress={() => onTipPress('interview', 'Mülakat Teknikleri')}
        >
          <View className="bg-purple-100 rounded-lg p-3 w-12 h-12 items-center justify-center mb-3">
            <Feather name="users" size={24} color="#7C3AED" />
          </View>
          <Text className="text-lg font-semibold text-gray-900 mb-2">
            Mülakat Teknikleri
          </Text>
          <Text className="text-gray-600 text-sm">
            İş görüşmelerinde başarılı olmanın yolları ve sık sorulan sorulara hazırlık.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          className="bg-green-50 rounded-xl p-4 mt-4"
          onPress={() => onTipPress('career', 'Kariyer Gelişimi')}
        >
          <View className="bg-green-100 rounded-lg p-3 w-12 h-12 items-center justify-center mb-3">
            <Feather name="trending-up" size={24} color="#059669" />
          </View>
          <Text className="text-lg font-semibold text-gray-900 mb-2">
            Kariyer Gelişimi
          </Text>
          <Text className="text-gray-600 text-sm">
            Kariyerinizi bir üst seviyeye taşımak için öneriler ve stratejiler.
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CareerTips; 