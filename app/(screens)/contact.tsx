import React from 'react';
import { View, Text, Linking, TouchableOpacity, Image } from 'react-native';

const Contact = () => {
  return (
    <View className="flex-1 bg-gray-100 justify-center items-center px-4 py-8">
      <View className="w-full max-w-md bg-white rounded-xl shadow-md p-6">
        <Image
          source={require('../../assets/images/logo/cvgen.png')}
          className="mx-auto w-[250px] h-[60px] mb-12"
        />

        <Text className="text-center text-gray-600 text-sm mb-6">
          Geleceği inşa eden yazılım çözümleriyle her zaman yanınızdayız. İhtiyaçlarınızı karşılamak ve sorularınızı yanıtlamak için aşağıdaki iletişim kanallarından bize ulaşabilirsiniz.
        </Text>

        <TouchableOpacity
          onPress={() => Linking.openURL('mailto:destek@cvgen.com.tr')}
          className="flex-row items-center justify-between mb-4 bg-gray-100 rounded-lg p-4"
        >
          <Text className="text-gray-800 font-medium">Destek Maili:</Text>
          <Text className="text-blue-600 font-semibold">destek@cvgen.com.tr</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => Linking.openURL('https://www.cvgen.com.tr')}
          className="flex-row items-center justify-between bg-gray-100 rounded-lg p-4 mb-4"
        >
          <Text className="text-gray-800 font-medium">Web Sitesi:</Text>
          <Text className="text-blue-600 font-semibold">www.cvgen.com.tr</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => Linking.openURL('tel:05353698689')}
          className="bg-gray-100 rounded-lg p-4 mb-4"
        >
          <View className="flex-row items-center justify-between">
            <Text className="text-gray-800 font-medium">Telefon:</Text>
            <Text className="text-blue-600 font-semibold">0506 593 70 34</Text>
          </View>
          <Text className="text-gray-500 text-xs text-center mt-2">
            (Haftaiçi 09.00 - 17.00 arasında)
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

export default Contact;
