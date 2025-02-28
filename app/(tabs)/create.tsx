import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Platform, Alert, ActivityIndicator, TextInput } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';
import PersonalInfoModal from '../../components/CreateCV/PersonalInfoModal';
import AboutMeModal from '../../components/CreateCV/AboutMeModal';
import EducationModal from '../../components/CreateCV/EducationModal';
import CertificatesModal from '../../components/CreateCV/CertificatesModal';
import ExperienceModal from '../../components/CreateCV/ExperienceModal';
import SkillsModal from '../../components/CreateCV/SkillsModal';
import LanguagesModal from '../../components/CreateCV/LanguagesModal';
import ReferencesModal from '../../components/CreateCV/ReferencesModal';
import SocialMediaModal from '../../components/CreateCV/SocialMediaModal';
import ProjectsModal from '../../components/CreateCV/ProjectsModal';
import { firebase, firestore } from '../../firebaseConfig';

interface CVSection {
  id: string;
  title: string;
  icon: keyof typeof Feather.glyphMap;
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
  socialMedia: Array<{
    id: string;
    platform: string;
    username: string;
    url: string;
  }> | null;
  projects: Array<{
    id: string;
    name: string;
    description: string;
    technologies: string;
    startDate: string;
    endDate: string;
    projectUrl: string;
  }> | null;
  title: string | null;
}

const initialCVData = {
  personal: null,
  about: null,
  education: null,
  certificates: null,
  experience: null,
  skills: null,
  languages: null,
  references: null,
  socialMedia: null,
  projects: null,
  title: null
};

const CreateScreen = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
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
      id: 'projects',
      title: 'Projelerim',
      icon: 'code',
      description: 'Kişisel ve profesyonel projeleriniz',
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
    },
    {
      id: 'socialMedia',
      title: 'Sosyal Medya Hesaplarım',
      icon: 'link',
      description: 'LinkedIn, GitHub, Twitter ve diğer sosyal medya hesaplarınız',
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
    references: null,
    socialMedia: null,
    projects: null,
    title: null
  });

  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const completionPercentage = useMemo(() => {
    const completedSections = cvSections.filter(section => section.completed).length;
    return completedSections / cvSections.length;
  }, [cvSections]);

  useEffect(() => {
    
    if (params.editMode === "true" && params.cvData) {
      try {
        const parsedCV = JSON.parse(params.cvData as string);
        
        setCvData(parsedCV);
        setIsEditMode(true);
        
        const updatedSections = cvSections.map(section => ({
          ...section,
          completed: Boolean(parsedCV[section.id])
        }));
        setCvSections(updatedSections);
        
      } catch (error) {
        console.error('CV verisi yüklenirken hata:', error);
        Alert.alert('Hata', 'CV verisi yüklenirken bir hata oluştu.');
        resetFormCompletely();
      }
    } else {
      resetFormCompletely();
      setIsEditMode(false);
    }
  }, [params.editMode, params.cvData]);

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

  const navigateToHomeAndClearParams = () => {
    resetFormCompletely();
    setIsEditMode(false);
    
    router.replace({
      pathname: '/(tabs)/home'
    });
    
    setTimeout(() => {
      router.setParams({});
    }, 100);
  };

  const handleCreateCV = async () => {
    try {
      setLoading(true);
      const currentUser = firebase.auth().currentUser;
      
      if (!currentUser) {
        Alert.alert('Hata', 'Lütfen önce giriş yapın.');
        setLoading(false);
        return;
      }

      const cvTitle = cvData.title || `CV ${new Date().toLocaleDateString('tr-TR')}`;
      const updatedCvData = {
        ...cvData,
        title: cvTitle
      };

      if (isEditMode && params.cvData) {
        try {
          const parsedCV = JSON.parse(params.cvData as string);
          
          const cvSnapshot = await firestore.collection('cvs').doc(parsedCV.id).get();
          const existingCVData = cvSnapshot.data();

          const newCVData = {
            userId: currentUser.uid,
            ...updatedCvData, 
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            createdAt: existingCVData?.createdAt || firebase.firestore.FieldValue.serverTimestamp()
          };
          
          await firestore.collection('cvs').doc(parsedCV.id).update(newCVData);
          
          setIsEditMode(false);
          navigateToHomeAndClearParams();
          
          setTimeout(() => {
            Alert.alert('Başarılı', 'CV başarıyla güncellendi!');
          }, 500);
          
        } catch (error: any) {
          setLoading(false);
          console.error('CV güncelleme hatası:', error);
          throw error;
        }
      } else {
        const newCVData = {
          userId: currentUser.uid,
          ...updatedCvData, 
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        };
        
        await firestore.collection('cvs').add(newCVData);
        
        setIsEditMode(false);
        navigateToHomeAndClearParams();
        
        setTimeout(() => {
          Alert.alert('Başarılı', 'CV başarıyla oluşturuldu!');
        }, 500);
      }

    } catch (error) {
      console.error('CV işlemi sırasında hata:', error);
      Alert.alert('Hata', 'İşlem sırasında bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  const resetFormCompletely = () => {
    setCvData({...initialCVData});
    
    const resetSections = cvSections.map(section => ({
      ...section,
      completed: false
    }));
    setCvSections(resetSections);
    
    setActiveModal(null);
    setIsEditMode(false);
  };

  const renderModal = () => {
    switch (activeModal) {
      case 'personal':
        return (
          <PersonalInfoModal 
            isVisible={true}
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
      case 'projects':
        return (
          <ProjectsModal
            onClose={() => setActiveModal(null)}
            onSave={(data) => handleSaveSection('projects', data)}
            initialData={cvData.projects}
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
      case 'socialMedia':
        return (
          <SocialMediaModal
            onClose={() => setActiveModal(null)}
            onSave={(data) => handleSaveSection('socialMedia', data)}
            initialData={cvData.socialMedia}
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
        contentContainerStyle={{ paddingBottom: Platform.OS === 'ios' ? 80 : 60 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="bg-white rounded-xl p-5 mb-6 shadow-sm">
          <Text className="text-xl font-bold text-gray-800 mb-2">
            {isEditMode ? "CV'nizi Düzenleyin" : "Profesyonel Bir CV Oluşturun"}
          </Text>
          <Text className="text-gray-500 mb-4">
            İş başvurularınızda sizi öne çıkaracak etkileyici bir CV hazırlamak için aşağıdaki bölümleri doldurun.
          </Text>
          
          <View className="mb-1 flex-row justify-between">
            <Text className="text-sm text-gray-500">Tamamlanma Oranı</Text>
            <Text className="text-sm font-medium text-blue-500">
              %{Math.round(completionPercentage * 100)}
            </Text>
          </View>
          <Progress.Bar
            progress={completionPercentage}
            width={null}
            height={8}
            color="#2563EB"
            unfilledColor="#E5E7EB"
            borderWidth={0}
            borderRadius={4}
          />
        </View>
        
        <View className="mb-6">
          <Text className="text-gray-700 font-medium mb-2">CV Başlığı</Text>
          <View className="flex-row items-center border border-gray-300 rounded-xl bg-white overflow-hidden">
            <View className="pl-4 pr-2">
              <Feather name="file-text" size={20} color="#4B5563" />
            </View>
            <TextInput
              className="flex-1 py-3 px-2"
              placeholder="CV'nize bir isim verin (Ana CV, Yazılım Başvurusu vb.)"
              value={cvData.title || ''}
              onChangeText={(text) => setCvData(prev => ({ ...prev, title: text }))}
            />
          </View>
        </View>
        
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-4 px-1">
            Temel Bilgiler
          </Text>
          
          <View className="flex-row mb-4 gap-3">
            <TouchableOpacity
              onPress={() => setActiveModal('personal')}
              className={`flex-1 p-4 rounded-xl shadow-sm ${cvData.personal ? 'bg-blue-50 border border-blue-100' : 'bg-white'}`}
              style={{ elevation: 1 }}
            >
              <View className="items-center">
                <View className={`p-3 rounded-full mb-2 ${cvData.personal ? 'bg-blue-100' : 'bg-gray-100'}`}>
                  <Feather name="user" size={24} color={cvData.personal ? "#2563EB" : "#6B7280"} />
                </View>
                <Text className={`text-base font-medium mb-1 ${cvData.personal ? 'text-blue-700' : 'text-gray-800'}`}>
                  Kişisel Bilgiler
                </Text>
                <View className="items-center justify-center">
                  {cvData.personal ? (
                    <Feather name="check-circle" size={16} color="#10B981" />
                  ) : (
                    <Text className="text-xs text-gray-400 text-center">Zorunlu</Text>
                  )}
                </View>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={() => setActiveModal('about')}
              className={`flex-1 p-4 rounded-xl shadow-sm ${cvData.about ? 'bg-blue-50 border border-blue-100' : 'bg-white'}`}
              style={{ elevation: 1 }}
            >
              <View className="items-center">
                <View className={`p-3 rounded-full mb-2 ${cvData.about ? 'bg-blue-100' : 'bg-gray-100'}`}>
                  <Feather name="file-text" size={24} color={cvData.about ? "#2563EB" : "#6B7280"} />
                </View>
                <Text className={`text-base font-medium mb-1 ${cvData.about ? 'text-blue-700' : 'text-gray-800'}`}>
                  Hakkımda
                </Text>
                <View className="items-center justify-center">
                  {cvData.about ? (
                    <Feather name="check-circle" size={16} color="#10B981" />
                  ) : (
                    <Text className="text-xs text-gray-400 text-center">Önerilen</Text>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          </View>
          
          <Text className="text-lg font-semibold text-gray-800 mb-4 mt-8 px-1">
            Kariyer Detayları
          </Text>
          
          <View className="flex-row mb-4 gap-3">
            <TouchableOpacity
              onPress={() => setActiveModal('education')}
              className={`flex-1 p-4 rounded-xl shadow-sm ${cvData.education ? 'bg-blue-50 border border-blue-100' : 'bg-white'}`}
              style={{ elevation: 1 }}
            >
              <View className="items-center">
                <View className={`p-3 rounded-full mb-2 ${cvData.education ? 'bg-blue-100' : 'bg-gray-100'}`}>
                  <Feather name="book" size={24} color={cvData.education ? "#2563EB" : "#6B7280"} />
                </View>
                <Text className={`text-base font-medium mb-1 ${cvData.education ? 'text-blue-700' : 'text-gray-800'}`}>
                  Eğitim
                </Text>
                <View className="items-center justify-center">
                  {cvData.education ? (
                    <Feather name="check-circle" size={16} color="#10B981" />
                  ) : (
                    <Text className="text-xs text-gray-400 text-center">Zorunlu</Text>
                  )}
                </View>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={() => setActiveModal('experience')}
              className={`flex-1 p-4 rounded-xl shadow-sm ${cvData.experience ? 'bg-blue-50 border border-blue-100' : 'bg-white'}`}
              style={{ elevation: 1 }}
            >
              <View className="items-center">
                <View className={`p-3 rounded-full mb-2 ${cvData.experience ? 'bg-blue-100' : 'bg-gray-100'}`}>
                  <Feather name="briefcase" size={24} color={cvData.experience ? "#2563EB" : "#6B7280"} />
                </View>
                <Text className={`text-base font-medium mb-1 ${cvData.experience ? 'text-blue-700' : 'text-gray-800'}`}>
                  İş Deneyimi
                </Text>
                <View className="items-center justify-center">
                  {cvData.experience ? (
                    <Feather name="check-circle" size={16} color="#10B981" />
                  ) : (
                    <Text className="text-xs text-gray-400 text-center">Önerilen</Text>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          </View>
          
          <View className="flex-row mb-4 gap-3">
            <TouchableOpacity
              onPress={() => setActiveModal('skills')}
              className={`flex-1 p-4 rounded-xl shadow-sm ${cvData.skills ? 'bg-blue-50 border border-blue-100' : 'bg-white'}`}
              style={{ elevation: 1 }}
            >
              <View className="items-center">
                <View className={`p-3 rounded-full mb-2 ${cvData.skills ? 'bg-blue-100' : 'bg-gray-100'}`}>
                  <Feather name="star" size={24} color={cvData.skills ? "#2563EB" : "#6B7280"} />
                </View>
                <Text className={`text-base font-medium mb-1 ${cvData.skills ? 'text-blue-700' : 'text-gray-800'}`}>
                  Beceriler
                </Text>
                <View className="items-center justify-center">
                  {cvData.skills ? (
                    <Feather name="check-circle" size={16} color="#10B981" />
                  ) : (
                    <Text className="text-xs text-gray-400 text-center">Önerilen</Text>
                  )}
                </View>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={() => setActiveModal('projects')}
              className={`flex-1 p-4 rounded-xl shadow-sm ${cvData.projects ? 'bg-blue-50 border border-blue-100' : 'bg-white'}`}
              style={{ elevation: 1 }}
            >
              <View className="items-center">
                <View className={`p-3 rounded-full mb-2 ${cvData.projects ? 'bg-blue-100' : 'bg-gray-100'}`}>
                  <Feather name="code" size={24} color={cvData.projects ? "#2563EB" : "#6B7280"} />
                </View>
                <Text className={`text-base font-medium mb-1 ${cvData.projects ? 'text-blue-700' : 'text-gray-800'}`}>
                  Projeler
                </Text>
                <View className="items-center justify-center">
                  {cvData.projects ? (
                    <Feather name="check-circle" size={16} color="#10B981" />
                  ) : (
                    <Text className="text-xs text-gray-400 text-center">İsteğe Bağlı</Text>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          </View>
          
          <View className="flex-row mb-4 gap-3">
            <TouchableOpacity
              onPress={() => setActiveModal('certificates')}
              className={`flex-1 p-4 rounded-xl shadow-sm ${cvData.certificates ? 'bg-blue-50 border border-blue-100' : 'bg-white'}`}
              style={{ elevation: 1 }}
            >
              <View className="items-center">
                <View className={`p-3 rounded-full mb-2 ${cvData.certificates ? 'bg-blue-100' : 'bg-gray-100'}`}>
                  <Feather name="award" size={24} color={cvData.certificates ? "#2563EB" : "#6B7280"} />
                </View>
                <Text className={`text-base font-medium mb-1 ${cvData.certificates ? 'text-blue-700' : 'text-gray-800'}`}>
                  Sertifikalar
                </Text>
                <View className="items-center justify-center">
                  {cvData.certificates ? (
                    <Feather name="check-circle" size={16} color="#10B981" />
                  ) : (
                    <Text className="text-xs text-gray-400 text-center">İsteğe Bağlı</Text>
                  )}
                </View>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={() => setActiveModal('languages')}
              className={`flex-1 p-4 rounded-xl shadow-sm ${cvData.languages ? 'bg-blue-50 border border-blue-100' : 'bg-white'}`}
              style={{ elevation: 1 }}
            >
              <View className="items-center">
                <View className={`p-3 rounded-full mb-2 ${cvData.languages ? 'bg-blue-100' : 'bg-gray-100'}`}>
                  <Feather name="globe" size={24} color={cvData.languages ? "#2563EB" : "#6B7280"} />
                </View>
                <Text className={`text-base font-medium mb-1 ${cvData.languages ? 'text-blue-700' : 'text-gray-800'}`}>
                  Yabancı Diller
                </Text>
                <View className="items-center justify-center">
                  {cvData.languages ? (
                    <Feather name="check-circle" size={16} color="#10B981" />
                  ) : (
                    <Text className="text-xs text-gray-400 text-center">İsteğe Bağlı</Text>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          </View>
          
          <View className="flex-row mb-4 gap-3">
            <TouchableOpacity
              onPress={() => setActiveModal('references')}
              className={`flex-1 p-4 rounded-xl shadow-sm ${cvData.references ? 'bg-blue-50 border border-blue-100' : 'bg-white'}`}
              style={{ elevation: 1 }}
            >
              <View className="items-center">
                <View className={`p-3 rounded-full mb-2 ${cvData.references ? 'bg-blue-100' : 'bg-gray-100'}`}>
                  <Feather name="users" size={24} color={cvData.references ? "#2563EB" : "#6B7280"} />
                </View>
                <Text className={`text-base font-medium mb-1 ${cvData.references ? 'text-blue-700' : 'text-gray-800'}`}>
                  Referanslar
                </Text>
                <View className="items-center justify-center">
                  {cvData.references ? (
                    <Feather name="check-circle" size={16} color="#10B981" />
                  ) : (
                    <Text className="text-xs text-gray-400 text-center">İsteğe Bağlı</Text>
                  )}
                </View>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={() => setActiveModal('socialMedia')}
              className={`flex-1 p-4 rounded-xl shadow-sm ${cvData.socialMedia ? 'bg-blue-50 border border-blue-100' : 'bg-white'}`}
              style={{ elevation: 1 }}
            >
              <View className="items-center">
                <View className={`p-3 rounded-full mb-2 ${cvData.socialMedia ? 'bg-blue-100' : 'bg-gray-100'}`}>
                  <Feather name="link" size={24} color={cvData.socialMedia ? "#2563EB" : "#6B7280"} />
                </View>
                <Text className={`text-base font-medium mb-1 ${cvData.socialMedia ? 'text-blue-700' : 'text-gray-800'}`}>
                  Sosyal Medya
                </Text>
                <View className="items-center justify-center">
                  {cvData.socialMedia ? (
                    <Feather name="check-circle" size={16} color="#10B981" />
                  ) : (
                    <Text className="text-xs text-gray-400 text-center">İsteğe Bağlı</Text>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          </View>
          
          <View className="bg-amber-50 border border-amber-100 rounded-xl p-4 mt-6 mb-8">
            <View className="flex-row items-start">
              <Feather name="info" size={20} color="#F59E0B" style={{ marginTop: 2, marginRight: 10 }} />
              <View className="flex-1">
                <Text className="text-amber-800 font-medium mb-1">CV Hazırlama İpucu</Text>
                <Text className="text-amber-700 text-sm">
                  Zorunlu alanları doldurduktan sonra, diğer bölümleri de olabildiğince eksiksiz doldurmak işe alım sürecinde size avantaj sağlayacaktır.
                </Text>
              </View>
            </View>
          </View>
        </View>
        
        <View className="mb-10">
          <TouchableOpacity
            className={`${loading ? 'bg-blue-400' : 'bg-blue-600'} rounded-xl py-4 shadow-md`}
            onPress={handleCreateCV}
            disabled={loading}
          >
            <View className="flex-row items-center justify-center">
              {loading ? (
                <>
                  <ActivityIndicator color="#FFFFFF" size="small" style={{ marginRight: 10 }} />
                  <Text className="text-white font-bold text-lg">
                    {isEditMode ? 'Güncelleniyor...' : 'Oluşturuluyor...'}
                  </Text>
                </>
              ) : (
                <>
                  <Feather name={isEditMode ? "save" : "check-circle"} size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
                  <Text className="text-white font-bold text-lg">
                    {isEditMode ? 'CV Güncelle' : 'CV Oluştur'}
                  </Text>
                </>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {activeModal && renderModal()}
    </SafeAreaView>
  );
};

export default CreateScreen;