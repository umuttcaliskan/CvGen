import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, SafeAreaView, Platform, Alert } from 'react-native';
import { Stack } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import PersonalInfoModal from '../../components/CreateCV/PersonalInfoModal';
import AboutMeModal from '../../components/CreateCV/AboutMeModal';
import EducationModal from '../../components/CreateCV/EducationModal';
import CertificatesModal from '../../components/CreateCV/CertificatesModal';
import ExperienceModal from '../../components/CreateCV/ExperienceModal';
import SkillsModal from '../../components/CreateCV/SkillsModal';
import LanguagesModal from '../../components/CreateCV/LanguagesModal';
import ReferencesModal from '../../components/CreateCV/ReferencesModal';
import { firebase, firestore } from '../../firebase.config';

interface CVSection {
  id: string;
  title: string;
  icon: string;
  description: string;
  completed: boolean;
}

interface CVData {
  personal: {
    fullName: string;
    email: string;
    phone: string;
    birthDate: string;
    address: string;
    // diğer kişisel bilgiler...
  } | null;
  about: string | null;
  education: Array<{
    id: string;
    schoolName: string;
    department: string;
    startDate: string;
    endDate: string;
  }> | null;
  certificates: Array<{
    id: string;
    name: string;
    institution: string;
    date: string;
  }> | null;
  experience: Array<{
    id: string;
    companyName: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }> | null;
  skills: Array<{
    id: string;
    name: string;
    level: string;
  }> | null;
  languages: Array<{
    id: string;
    name: string;
    level: string;
  }> | null;
  references: Array<{
    id: string;
    fullName: string;
    company: string;
    position: string;
    phone: string;
    email: string;
  }> | null;
}

const CreateScreen = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [cvSections, setCvSections] = useState<CVSection[]>([
    {
      id: 'personal',
      title: 'Kişisel Bilgiler',
      icon: 'user',
      description: 'Ad, soyad, iletişim bilgileri ve diğer kişisel detaylar',
      completed: false
    },
    {
      id: 'about',
      title: 'Hakkımda',
      icon: 'file-text',
      description: 'Kendinizi tanıtan kısa bir özet',
      completed: false
    },
    {
      id: 'education',
      title: 'Eğitim Bilgilerim',
      icon: 'book',
      description: 'Eğitim geçmişiniz ve akademik başarılarınız',
      completed: false
    },
    {
      id: 'certificates',
      title: 'Sertifikalarım',
      icon: 'award',
      description: 'Aldığınız sertifikalar ve başarı belgeleri',
      completed: false
    },
    {
      id: 'experience',
      title: 'İş Deneyimlerim',
      icon: 'briefcase',
      description: 'Geçmiş iş deneyimleriniz ve başarılarınız',
      completed: false
    },
    {
      id: 'skills',
      title: 'Beceriler',
      icon: 'star',
      description: 'Teknik ve kişisel becerileriniz',
      completed: false
    },
    {
      id: 'languages',
      title: 'Diller',
      icon: 'globe',
      description: 'Bildiğiniz yabancı diller ve seviyeleri',
      completed: false
    },
    {
      id: 'references',
      title: 'Referanslar',
      icon: 'users',
      description: 'Referans olarak gösterebileceğiniz kişiler',
      completed: false
    }
  ]);

  const [cvData, setCvData] = useState<CVData>({
    personal: null,
    about: null,
    education: null,
    certificates: null,
    experience: null,
    skills: null,
    languages: null,
    references: null
  });

  const handleSaveSection = (sectionId: string, data: CVData[keyof CVData]) => {
    setCvData(prev => ({
      ...prev,
      [sectionId]: data
    }));

    const updatedSections = cvSections.map(section => 
      section.id === sectionId ? { ...section, completed: true } : section
    );
    setCvSections(updatedSections);
  };

  const handleCreateCV = async () => {
    try {
      const currentUser = firebase.auth().currentUser;
      
      if (!currentUser) {
        Alert.alert('Hata', 'Lütfen önce giriş yapın.');
        return;
      }

      const cvRef = await firestore.collection('cvs').add({
        userId: currentUser.uid,
        ...cvData,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });

      console.log('CV başarıyla oluşturuldu:', cvRef.id);
      Alert.alert('Başarılı', 'CV\'niz başarıyla oluşturuldu!');
      
      setCvData({
        personal: null,
        about: null,
        education: null,
        certificates: null,
        experience: null,
        skills: null,
        languages: null,
        references: null
      });

      const resetSections = cvSections.map(section => ({
        ...section,
        completed: false
      }));
      setCvSections(resetSections);

    } catch (error) {
      console.error('CV oluşturulurken hata:', error);
      Alert.alert('Hata', 'CV oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  const renderModal = () => {
    switch (activeModal) {
      case 'personal':
        return (
          <PersonalInfoModal 
            onClose={() => setActiveModal(null)}
            onSave={(data) => handleSaveSection('personal', data)}
            initialData={cvData.personal}
          />
        );
      case 'about':
        return (
          <AboutMeModal 
            onClose={() => setActiveModal(null)}
            onSave={(data) => handleSaveSection('about', data)}
            initialData={cvData.about}
          />
        );
      case 'education':
        return (
          <EducationModal 
            onClose={() => setActiveModal(null)}
            onSave={(data) => handleSaveSection('education', data)}
            initialData={cvData.education}
          />
        );
      case 'certificates':
        return (
          <CertificatesModal 
            onClose={() => setActiveModal(null)}
            onSave={(data) => handleSaveSection('certificates', data)}
            initialData={cvData.certificates}
          />
        );
      case 'experience':
        return (
          <ExperienceModal 
            onClose={() => setActiveModal(null)}
            onSave={(data) => handleSaveSection('experience', data)}
            initialData={cvData.experience}
          />
        );
      case 'skills':
        return (
          <SkillsModal 
            onClose={() => setActiveModal(null)}
            onSave={(data) => handleSaveSection('skills', data)}
            initialData={cvData.skills}
          />
        );
      case 'languages':
        return (
          <LanguagesModal 
            onClose={() => setActiveModal(null)}
            onSave={(data) => handleSaveSection('languages', data)}
            initialData={cvData.languages}
          />
        );
      case 'references':
        return (
          <ReferencesModal 
            onClose={() => setActiveModal(null)}
            onSave={(data) => handleSaveSection('references', data)}
            initialData={cvData.references}
          />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <Stack.Screen
        options={{
          title: "CV Oluştur",
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerShadowVisible: false,
        }}
      />

      <ScrollView 
        className="flex-1 px-4 py-6"
        contentContainerStyle={{ paddingBottom: Platform.OS === 'ios' ? 140 : 120 }}
      >
        {cvSections.map((section) => (
          <TouchableOpacity
            key={section.id}
            onPress={() => setActiveModal(section.id)}
            className="bg-white rounded-xl p-4 mb-4 shadow-sm flex-row items-center"
          >
            <View className="bg-blue-50 p-3 rounded-lg">
              <Feather name={section.icon} size={24} color="#2563EB" />
            </View>
            <View className="flex-1 ml-4">
              <Text className="text-lg font-semibold text-gray-900">
                {section.title}
              </Text>
              <Text className="text-sm text-gray-500">
                {section.description}
              </Text>
            </View>
            <View className="flex-row items-center">
              {section.completed && (
                <View className="mr-2">
                  <Feather name="check-circle" size={20} color="#10B981" />
                </View>
              )}
              <Feather name="chevron-right" size={20} color="#9CA3AF" />
            </View>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          className="bg-blue-600 rounded-xl py-4 px-6 mt-4 shadow-sm"
          onPress={handleCreateCV}
        >
          <View className="flex-row items-center justify-center">
            <Feather name="file-plus" size={24} color="#fff" className="mr-2" />
            <Text className="text-white font-semibold text-lg ml-2">
              CV Oluştur
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
      

      {activeModal && renderModal()}
    </SafeAreaView>
  );
};

export default CreateScreen;