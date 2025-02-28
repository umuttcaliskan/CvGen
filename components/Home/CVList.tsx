import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Image, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { CVData } from '../../src/types/cv';

interface CVListProps {
  loading: boolean;
  cvList: CVData[];
  profileImage: string | null;
  onViewCV: (cv: CVData) => void;
  onDownloadCV: (cv: CVData) => void;
  onEditCV: (cv: CVData) => void;
  onDeleteCV: (id: string) => void;
  formatDate: (timestamp: any) => string;
}

const CVList: React.FC<CVListProps> = ({
  loading,
  cvList,
  profileImage,
  onViewCV,
  onDownloadCV,
  onEditCV,
  onDeleteCV,
  formatDate
}) => {
  return (
    <>
      <Text className="text-lg font-semibold text-gray-900 mb-4 px-2">
        Kayıtlı CV'lerim
      </Text>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 2 }}
      >
        {loading ? (
          <View className="flex items-center justify-center w-72 h-48">
            <ActivityIndicator size="large" color="#2563EB" />
          </View>
        ) : cvList.length > 0 ? (
          cvList.map((cv) => (
            <View 
              key={`cv-${cv.id}`} 
              className="bg-white rounded-xl shadow-sm mr-4 w-72 p-4"
            >
              <View className="flex-row items-center justify-between mb-4">
                <View className="flex-row items-center flex-1">
                  <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center overflow-hidden">
                    {profileImage ? (
                      <Image 
                        source={{ uri: profileImage }} 
                        className="w-full h-full"
                        resizeMode="cover"
                      />
                    ) : (
                      <Feather name="user" size={24} color="#2563EB" />
                    )}
                  </View>
                  <View className="ml-3">
                    <Text className="text-lg font-semibold text-gray-900">
                      {cv.personal?.fullName || 'İsimsiz CV'}
                    </Text>
                    <Text style={styles.date}>{formatDate(cv.createdAt)}</Text>
                  </View>
                </View>
                <TouchableOpacity 
                  onPress={() => onDeleteCV(cv.id)}
                  className="p-2"
                >
                  <Feather name="trash-2" size={20} color="#EF4444" />
                </TouchableOpacity>
              </View>

              <View className="flex-row justify-between mt-4">
                <TouchableOpacity 
                  onPress={() => onViewCV(cv)}
                  className="flex-1 items-center mr-2"
                >
                  <View className="bg-blue-50 p-2 rounded-lg w-full items-center">
                    <Feather name="eye" size={18} color="#2563EB" />
                    <Text className="text-xs text-blue-600 mt-1">Görüntüle</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity 
                  onPress={() => onDownloadCV(cv)}
                  className="flex-1 items-center mx-2"
                >
                  <View className="bg-green-50 p-2 rounded-lg w-full items-center">
                    <Feather name="download" size={18} color="#059669" />
                    <Text className="text-xs text-green-600 mt-1">İndir</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity 
                  onPress={() => onEditCV(cv)}
                  className="flex-1 items-center ml-2"
                >
                  <View className="bg-purple-50 p-2 rounded-lg w-full items-center">
                    <Feather name="edit" size={18} color="#7C3AED" />
                    <Text className="text-xs text-purple-600 mt-1">Düzenle</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <View className="flex items-center justify-center w-full py-8">
            <Text className="text-gray-500">Henüz CV oluşturmadınız.</Text>
          </View>
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  date: {
    fontSize: 12,
    color: '#6B7280',
  }
});

export default CVList; 