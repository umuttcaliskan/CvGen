import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, TextInput, Modal } from 'react-native';
import { Feather } from '@expo/vector-icons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';

interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string;
  startDate: string;
  endDate: string;
  projectUrl: string;
}

interface ProjectsModalProps {
  onClose: () => void;
  onSave: (data: Project[]) => void;
  initialData: Project[] | null;
}

const ProjectsModal: React.FC<ProjectsModalProps> = ({ onClose, onSave, initialData }) => {
  const [projects, setProjects] = useState<Project[]>(initialData || [{
    id: '1',
    name: '',
    description: '',
    technologies: '',
    startDate: '',
    endDate: '',
    projectUrl: ''
  }]);

  const [activeDatePicker, setActiveDatePicker] = useState<{
    index: number;
    field: 'startDate' | 'endDate';
  } | null>(null);

  const handleAddProject = () => {
    setProjects([
      ...projects,
      {
        id: Date.now().toString(),
        name: '',
        description: '',
        technologies: '',
        startDate: '',
        endDate: '',
        projectUrl: ''
      }
    ]);
  };

  const handleRemoveProject = (id: string) => {
    if (projects.length > 1) {
      setProjects(projects.filter(project => project.id !== id));
    }
  };

  const updateProject = (index: number, field: keyof Project, value: string) => {
    const updatedProjects = [...projects];
    updatedProjects[index] = {
      ...updatedProjects[index],
      [field]: value
    };
    setProjects(updatedProjects);
  };

  const handleDateConfirm = (date: Date) => {
    if (activeDatePicker) {
      const formattedDate = moment(date).format('MM/YYYY');
      updateProject(activeDatePicker.index, activeDatePicker.field, formattedDate);
    }
    setActiveDatePicker(null);
  };

  const handleSave = () => {
    onSave(projects);
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
          <Text className="text-lg font-semibold">Projelerim</Text>
          <TouchableOpacity onPress={handleSave}>
            <Text className="text-blue-600 font-semibold">Kaydet</Text>
          </TouchableOpacity>
        </View>

        <ScrollView 
          className="flex-1 p-4"
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {projects.map((project, index) => (
            <View key={project.id} className="mb-6 bg-gray-50 p-4 rounded-lg">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-lg font-semibold text-gray-900">
                  {index + 1}. Proje
                </Text>
                {projects.length > 1 && (
                  <TouchableOpacity 
                    onPress={() => handleRemoveProject(project.id)}
                    className="bg-red-100 p-2 rounded-full"
                  >
                    <Feather name="trash-2" size={20} color="#EF4444" />
                  </TouchableOpacity>
                )}
              </View>

              <View className="space-y-4">
                <View>
                  <Text className="text-sm font-medium text-gray-700 mb-2">Proje Adı</Text>
                  <TextInput
                    className="border border-gray-300 rounded-lg px-4 py-3 bg-white"
                    value={project.name}
                    onChangeText={(text) => updateProject(index, 'name', text)}
                    placeholder="Projenin adını girin"
                  />
                </View>

                <View>
                  <Text className="text-sm font-medium text-gray-700 mb-2 mt-4">Açıklama</Text>
                  <TextInput
                    className="border border-gray-300 rounded-lg px-4 py-3 bg-white"
                    value={project.description}
                    onChangeText={(text) => updateProject(index, 'description', text)}
                    placeholder="Projenin detaylarını yazın"
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                  />
                </View>

                <View>
                  <Text className="text-sm font-medium text-gray-700 mb-2 mt-4">Kullanılan Teknolojiler</Text>
                  <TextInput
                    className="border border-gray-300 rounded-lg px-4 py-3 bg-white"
                    value={project.technologies}
                    onChangeText={(text) => updateProject(index, 'technologies', text)}
                    placeholder="React, Node.js, MongoDB vb."
                  />
                </View>

                <View>
                  <Text className="text-sm font-medium text-gray-700 mb-2 mt-4">Başlangıç Tarihi</Text>
                  <TouchableOpacity 
                    onPress={() => setActiveDatePicker({index, field: 'startDate'})}
                    className="border border-gray-300 rounded-lg px-4 py-3 bg-white"
                  >
                    <Text>{project.startDate || 'Tarih Seçin'}</Text>
                  </TouchableOpacity>
                </View>

                <View>
                  <Text className="text-sm font-medium text-gray-700 mb-2 mt-4">Bitiş Tarihi</Text>
                  <TouchableOpacity 
                    onPress={() => setActiveDatePicker({index, field: 'endDate'})}
                    className="border border-gray-300 rounded-lg px-4 py-3 bg-white"
                  >
                    <Text>{project.endDate || 'Tarih Seçin'}</Text>
                  </TouchableOpacity>
                </View>

                <View>
                  <Text className="text-sm font-medium text-gray-700 mb-2 mt-4">Proje URL</Text>
                  <TextInput
                    className="border border-gray-300 rounded-lg px-4 py-3 bg-white"
                    value={project.projectUrl}
                    onChangeText={(text) => updateProject(index, 'projectUrl', text)}
                    placeholder="https://..."
                    keyboardType="url"
                    autoCapitalize="none"
                  />
                </View>
              </View>
            </View>
          ))}

          <TouchableOpacity
            onPress={handleAddProject}
            className="flex-row items-center justify-center bg-blue-50 p-4 rounded-lg mb-4"
          >
            <Feather name="plus" size={20} color="#2563EB" />
            <Text className="ml-2 text-blue-600 font-semibold">Yeni Proje Ekle</Text>
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

export default ProjectsModal; 