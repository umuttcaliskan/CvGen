import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, ActivityIndicator, Alert, RefreshControl, Image, Modal as RNModal, Dimensions, StyleSheet, Platform } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { Feather } from '@expo/vector-icons';
import { firebase } from '../../firebase.config';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import WebView from 'react-native-webview';
import CVTemplateModal from '../../components/CVTemplateModal';
import { generateCVHtml } from '../../utils/generateCVHtml';
import { TemplateId } from '../../lib/templates';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import CareerTipsModal from '../../components/CareerTipsModal';

interface CVData {
  id: string;
  userId: string;
  personal?: {
    fullName: string;
    email: string;
    phone: string;
    birthDate: string;
    address: string;
    gender?: string;
    maritalStatus?: string;
    drivingLicense?: string;
    militaryStatus?: string;
  };
  about?: string;
  education?: Array<{
    id: string;
    schoolName: string;
    department: string;
    startDate: string;
    endDate: string;
  }>;
  experience?: Array<{
    id: string;
    companyName: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  skills?: Array<{
    id: string;
    name: string;
    level: string;
  }>;
  languages?: Array<{
    id: string;
    name: string;
    level: string;
  }>;
  references?: Array<{
    id: string;
    fullName: string;
    company: string;
    position: string;
    phone: string;
    email: string;
  }>;
  socialMedia?: Array<{
    platform: string;
    username: string;
    url?: string;
  }>;
  projects?: Array<{
    name: string;
    startDate: string;
    endDate: string;
    description: string;
    technologies?: string;
    projectUrl?: string;
  }>;
  certificates?: Array<{
    name: string;
    institution: string;
    date: string;
  }>;
  createdAt: firebase.firestore.Timestamp;
}

interface CVModalProps {
  isVisible: boolean;
  onClose: () => void;
  cv: CVData | null;
}

const CVModal: React.FC<CVModalProps> = React.memo(({ isVisible, onClose, cv }) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showTemplateModal, setShowTemplateModal] = useState(false);

  useEffect(() => {
    const loadProfileImage = async () => {
      try {
        const currentUser = firebase.auth().currentUser;
        if (currentUser?.uid && cv?.userId) {
          const storage = getStorage();
          const storageRef = ref(storage, `profile_images/${cv.userId}`);
          
          try {
            const downloadURL = await getDownloadURL(storageRef);
            setProfileImage(downloadURL);
            await AsyncStorage.setItem(`profileImage_${cv.userId}`, downloadURL);
          } catch (error: any) {
            if (error.code === 'storage/object-not-found') {
              const cachedImage = await AsyncStorage.getItem(`profileImage_${cv.userId}`);
              if (cachedImage) {
                setProfileImage(cachedImage);
              }
            } else {
              throw error;
            }
          }
        }
      } catch (error) {
        console.error('Profil resmi yüklenirken hata:', error);
      }
    };

    if (cv) loadProfileImage();
  }, [cv]);

  useEffect(() => {
    if (!isVisible) {
      setShowTemplateModal(false);
    }
  }, [isVisible]);

  const handleEditCV = (cv: CVData) => {
    onClose();
    
    setTimeout(() => {
      router.push({
        pathname: "/(tabs)/create",
        params: { editMode: "true", cvData: JSON.stringify(cv) }
      });
    }, 300);
  };

  const handleSelectTemplate = (templateId: TemplateId) => {
    if (!cv) return;
    
    setShowTemplateModal(false);
    
    setTimeout(async () => {
      try {
        const storage = getStorage();
        const storageRef = ref(storage, `profile_images/${cv.userId}`);
        
        let profileImageUrl = null;
        try {
          profileImageUrl = await getDownloadURL(storageRef);
        } catch (error: any) {
          if (error.code === 'storage/object-not-found') {
            profileImageUrl = await AsyncStorage.getItem(`profileImage_${cv.userId}`);
          } else {
            console.error('Profil resmi alınırken hata:', error);
          }
        }

        const html = await generateCVHtml(cv, profileImageUrl, 'modern');
        
        const { uri } = await Print.printToFileAsync({
          html,
          base64: false
        });
        
        if (!(await Sharing.isAvailableAsync())) {
          Alert.alert('Hata', 'Paylaşım bu cihazda kullanılamıyor');
          return;
        }
        
        await Sharing.shareAsync(uri, {
          mimeType: 'application/pdf',
          dialogTitle: 'CV\'yi İndir'
        });
      } catch (error) {
        console.error('PDF indirme hatası:', error);
        Alert.alert('Hata', 'PDF indirme sırasında bir hata oluştu.');
      }
    }, 300);
  };

  if (!cv) return null;

  return (
    <>
      <Modal
        isVisible={isVisible}
        onBackdropPress={onClose}
        style={{ margin: 0 }}
        backdropOpacity={0.6}
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}
        statusBarTranslucent
        propagateSwipe={true}
      >
        <View className="bg-white rounded-t-3xl h-[92%] mt-auto">
          <View className="px-6 pt-5 pb-3 border-b border-gray-100 flex-row justify-between items-center">
            <TouchableOpacity 
              onPress={onClose}
              className="w-10 h-10 items-center justify-center rounded-full bg-gray-50"
            >
              <Feather name="x" size={20} color="#666" />
            </TouchableOpacity>
            <Text className="text-xl font-bold text-gray-800">CV Görüntüle</Text>
            <View className="w-10" />
          </View>
          
          <ScrollView 
            className="flex-1 px-6 pt-3"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 120 }}
          >
            {/* Profil ve İsim Başlık */}
            <View className="items-center mb-8">
              <View className="w-28 h-28 rounded-full bg-blue-500 mb-4 overflow-hidden shadow-md">
                {profileImage ? (
                  <Image 
                    source={{ uri: profileImage }} 
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                ) : (
                  <View className="w-full h-full items-center justify-center">
                    <Text className="text-white text-4xl font-bold">
                      {cv.personal?.fullName?.charAt(0).toUpperCase() || 'U'}
                    </Text>
                  </View>
                )}
              </View>
              
              <Text className="text-2xl font-bold text-gray-800">
                {cv.personal?.fullName || 'İsimsiz'}
              </Text>
              
              {cv.experience?.[0]?.position && (
                <Text className="text-gray-500 mt-1 text-lg">
                  {cv.experience[0].position}
                </Text>
              )}
              
              {cv.experience?.[0]?.companyName && (
                <Text className="text-blue-500 mt-1">
                  {cv.experience[0].companyName}
                </Text>
              )}
            </View>
            
            {/* Hakkımda Bölümü */}
            {cv.about && (
              <View className="mb-8">
                <View className="flex-row items-center mb-3">
                  <View className="w-8 h-8 rounded-full bg-blue-100 items-center justify-center mr-2">
                    <Feather name="user" size={16} color="#3b82f6" />
                  </View>
                  <Text className="text-lg font-bold text-gray-800">Hakkımda</Text>
                </View>
                
                <View className="bg-gray-50 rounded-xl p-4">
                  <Text className="text-gray-700 leading-relaxed">{cv.about}</Text>
                </View>
              </View>
            )}
            
            {/* Kişisel Bilgiler */}
            {cv.personal && (
              <View className="mb-8">
                <View className="flex-row items-center mb-3">
                  <View className="w-8 h-8 rounded-full bg-purple-100 items-center justify-center mr-2">
                    <Feather name="info" size={16} color="#8b5cf6" />
                  </View>
                  <Text className="text-lg font-bold text-gray-800">Kişisel Bilgiler</Text>
                </View>
                
                <View className="bg-gray-50 rounded-xl p-4 space-y-3">
                  {cv.personal.email && (
                    <View className="flex-row items-center">
                      <Feather name="mail" size={16} color="#8b5cf6" className="mr-3" />
                      <Text className="ml-3 text-gray-700">{cv.personal.email}</Text>
                    </View>
                  )}
                  
                  {cv.personal.phone && (
                    <View className="flex-row items-center">
                      <Feather name="phone" size={16} color="#8b5cf6" className="mr-3" />
                      <Text className="ml-3 text-gray-700">{cv.personal.phone}</Text>
                    </View>
                  )}
                  
                  {cv.personal.address && (
                    <View className="flex-row items-center">
                      <Feather name="map-pin" size={16} color="#8b5cf6" className="mr-3" />
                      <Text className="ml-3 text-gray-700">{cv.personal.address}</Text>
                    </View>
                  )}
                  
                  {cv.personal.birthDate && (
                    <View className="flex-row items-center">
                      <Feather name="calendar" size={16} color="#8b5cf6" className="mr-3" />
                      <Text className="ml-3 text-gray-700">{cv.personal.birthDate}</Text>
                    </View>
                  )}
                  
                  {cv.personal.gender && (
                    <View className="flex-row items-center">
                      <Feather name="user" size={16} color="#8b5cf6" className="mr-3" />
                      <Text className="ml-3 text-gray-700">Cinsiyet: {cv.personal.gender}</Text>
                    </View>
                  )}
                  
                  {cv.personal.maritalStatus && (
                    <View className="flex-row items-center">
                      <Feather name="heart" size={16} color="#8b5cf6" className="mr-3" />
                      <Text className="ml-3 text-gray-700">Medeni Durum: {cv.personal.maritalStatus}</Text>
                    </View>
                  )}
                  
                  {cv.personal.drivingLicense && (
                    <View className="flex-row items-center">
                      <Feather name="truck" size={16} color="#8b5cf6" className="mr-3" />
                      <Text className="ml-3 text-gray-700">Ehliyet: {cv.personal.drivingLicense}</Text>
                    </View>
                  )}
                  
                  {cv.personal.militaryStatus && (
                    <View className="flex-row items-center">
                      <Feather name="shield" size={16} color="#8b5cf6" className="mr-3" />
                      <Text className="ml-3 text-gray-700">Askerlik: {cv.personal.militaryStatus}</Text>
                    </View>
                  )}
                </View>
              </View>
            )}
            
            {/* Eğitim */}
            {cv.education && cv.education.length > 0 && (
              <View className="mb-8">
                <View className="flex-row items-center mb-3">
                  <View className="w-8 h-8 rounded-full bg-green-100 items-center justify-center mr-2">
                    <Feather name="book" size={16} color="#10b981" />
                  </View>
                  <Text className="text-lg font-bold text-gray-800">Eğitim</Text>
                </View>
                
                {cv.education.map((edu) => (
                  <View key={edu.id} className="bg-gray-50 rounded-xl p-4 mb-3">
                    <View className="flex-row justify-between items-start">
                      <View className="flex-1">
                        <Text className="text-gray-800 font-bold">{edu.schoolName}</Text>
                        <Text className="text-gray-600 mt-1">{edu.department}</Text>
                      </View>
                      <View className="bg-green-100 px-3 py-1 rounded-full">
                        <Text className="text-green-700 text-xs">{edu.startDate} - {edu.endDate}</Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            )}
            
            {/* İş Deneyimi */}
            {cv.experience && cv.experience.length > 0 && (
              <View className="mb-8">
                <View className="flex-row items-center mb-3">
                  <View className="w-8 h-8 rounded-full bg-orange-100 items-center justify-center mr-2">
                    <Feather name="briefcase" size={16} color="#f59e0b" />
                  </View>
                  <Text className="text-lg font-bold text-gray-800">İş Deneyimi</Text>
                </View>
                
                {cv.experience.map((exp) => (
                  <View key={exp.id} className="bg-gray-50 rounded-xl p-4 mb-3">
                    <View className="flex-row justify-between items-start">
                      <View className="flex-1">
                        <Text className="text-gray-800 font-bold">{exp.position}</Text>
                        <Text className="text-gray-600 mt-1">{exp.companyName}</Text>
                      </View>
                      <View className="bg-orange-100 px-3 py-1 rounded-full">
                        <Text className="text-orange-700 text-xs">{exp.startDate} - {exp.endDate}</Text>
                      </View>
                    </View>
                    {exp.description && (
                      <Text className="text-gray-700 mt-3">{exp.description}</Text>
                    )}
                  </View>
                ))}
              </View>
            )}
            
            {/* Projeler */}
            {cv.projects && cv.projects.length > 0 && (
              <View className="mb-8">
                <View className="flex-row items-center mb-3">
                  <View className="w-8 h-8 rounded-full bg-indigo-100 items-center justify-center mr-2">
                    <Feather name="code" size={16} color="#6366f1" />
                  </View>
                  <Text className="text-lg font-bold text-gray-800">Projeler</Text>
                </View>
                
                {cv.projects.map((project, index) => (
                  <View key={index} className="bg-gray-50 rounded-xl p-4 mb-3">
                    <View className="flex-row justify-between items-start">
                      <View className="flex-1">
                        <Text className="text-gray-800 font-bold">{project.name}</Text>
                      </View>
                      <View className="bg-indigo-100 px-3 py-1 rounded-full">
                        <Text className="text-indigo-700 text-xs">{project.startDate} - {project.endDate}</Text>
                      </View>
                    </View>
                    {project.description && (
                      <Text className="text-gray-700 mt-3">{project.description}</Text>
                    )}
                    {project.technologies && (
                      <View className="mt-3 flex-row flex-wrap">
                        <Text className="text-gray-700 font-bold mr-1">Teknolojiler:</Text>
                        <Text className="text-gray-700">{project.technologies}</Text>
                      </View>
                    )}
                    {project.projectUrl && (
                      <View className="mt-2">
                        <Text className="text-blue-500">{project.projectUrl}</Text>
                      </View>
                    )}
                  </View>
                ))}
              </View>
            )}
            
            {/* Beceriler */}
            {cv.skills && cv.skills.length > 0 && (
              <View className="mb-8">
                <View className="flex-row items-center mb-3">
                  <View className="w-8 h-8 rounded-full bg-red-100 items-center justify-center mr-2">
                    <Feather name="star" size={16} color="#ef4444" />
                  </View>
                  <Text className="text-lg font-bold text-gray-800">Beceriler</Text>
                </View>
                
                <View className="bg-gray-50 rounded-xl p-4">
                  <View className="flex-row flex-wrap">
                    {cv.skills.map((skill) => (
                      <View key={skill.id} className="bg-white rounded-lg px-3 py-2 m-1 flex-row items-center">
                        <Text className="text-gray-800">{skill.name}</Text>
                        <View className="ml-2 px-2 py-1 bg-red-100 rounded-full">
                          <Text className="text-red-600 text-xs">{skill.level}</Text>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            )}
            
            {/* Diller */}
            {cv.languages && cv.languages.length > 0 && (
              <View className="mb-8">
                <View className="flex-row items-center mb-3">
                  <View className="w-8 h-8 rounded-full bg-teal-100 items-center justify-center mr-2">
                    <Feather name="globe" size={16} color="#14b8a6" />
                  </View>
                  <Text className="text-lg font-bold text-gray-800">Diller</Text>
                </View>
                
                <View className="bg-gray-50 rounded-xl p-4">
                  {cv.languages.map((lang) => (
                    <View key={lang.id} className="flex-row justify-between items-center mb-3 last:mb-0">
                      <Text className="text-gray-800 font-medium">{lang.name}</Text>
                      <View className="px-3 py-1 bg-teal-100 rounded-full">
                        <Text className="text-teal-700">{lang.level}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            )}
            
            {/* Sertifikalar */}
            {cv.certificates && cv.certificates.length > 0 && (
              <View className="mb-8">
                <View className="flex-row items-center mb-3">
                  <View className="w-8 h-8 rounded-full bg-yellow-100 items-center justify-center mr-2">
                    <Feather name="award" size={16} color="#f59e0b" />
                  </View>
                  <Text className="text-lg font-bold text-gray-800">Sertifikalar</Text>
                </View>
                
                {cv.certificates.map((cert, index) => (
                  <View key={index} className="bg-gray-50 rounded-xl p-4 mb-3">
                    <View className="flex-row justify-between items-start">
                      <View className="flex-1">
                        <Text className="text-gray-800 font-bold">{cert.name}</Text>
                        <Text className="text-gray-600 mt-1">{cert.institution}</Text>
                      </View>
                      <View className="bg-yellow-100 px-3 py-1 rounded-full">
                        <Text className="text-yellow-700 text-xs">{cert.date}</Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            )}
            
            {/* Sosyal Medya */}
            {cv.socialMedia && cv.socialMedia.length > 0 && (
              <View className="mb-8">
                <View className="flex-row items-center mb-3">
                  <View className="w-8 h-8 rounded-full bg-pink-100 items-center justify-center mr-2">
                    <Feather name="link" size={16} color="#ec4899" />
                  </View>
                  <Text className="text-lg font-bold text-gray-800">Sosyal Medya</Text>
                </View>
                
                <View className="bg-gray-50 rounded-xl p-4">
                  {cv.socialMedia.map((social, index) => (
                    <View key={index} className="mb-3 last:mb-0">
                      <View className="flex-row items-center">
                        <Feather 
                          name={social.platform === 'linkedin' ? 'linkedin' : 
                                social.platform === 'github' ? 'github' : 
                                social.platform === 'twitter' ? 'twitter' : 
                                social.platform === 'instagram' ? 'instagram' : 
                                social.platform === 'facebook' ? 'facebook' : 
                                social.platform === 'youtube' ? 'youtube' : 'link'} 
                          size={16} 
                          color="#ec4899" 
                          className="mr-3" 
                        />
                        <Text className="ml-2 font-medium text-gray-800 capitalize">{social.platform}</Text>
                      </View>
                      <Text className="text-gray-600 mt-1 ml-6">{social.username}</Text>
                      {social.url && <Text className="text-blue-500 mt-1 ml-6">{social.url}</Text>}
                    </View>
                  ))}
                </View>
              </View>
            )}
            
            {/* Referanslar */}
            {cv.references && cv.references.length > 0 && (
              <View className="mb-8">
                <View className="flex-row items-center mb-3">
                  <View className="w-8 h-8 rounded-full bg-cyan-100 items-center justify-center mr-2">
                    <Feather name="users" size={16} color="#0ea5e9" />
                  </View>
                  <Text className="text-lg font-bold text-gray-800">Referanslar</Text>
                </View>
                
                {cv.references.map((ref) => (
                  <View key={ref.id} className="bg-gray-50 rounded-xl p-4 mb-3">
                    <Text className="text-gray-800 font-bold">{ref.fullName}</Text>
                    <Text className="text-gray-600 mt-1">{ref.position} - {ref.company}</Text>
                    <View className="flex-row items-center mt-2">
                      <Feather name="phone" size={14} color="#0ea5e9" />
                      <Text className="text-gray-700 ml-2">{ref.phone}</Text>
                    </View>
                    <View className="flex-row items-center mt-1">
                      <Feather name="mail" size={14} color="#0ea5e9" />
                      <Text className="text-gray-700 ml-2">{ref.email}</Text>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </ScrollView>
          
          {/* Sabit İndir/Düzenle Butonları */}
          <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-4 flex-row justify-between">
            <TouchableOpacity 
              className="bg-blue-500 rounded-xl py-3 flex-1 mr-2 items-center flex-row justify-center"
              onPress={() => setShowTemplateModal(true)}
            >
              <Feather name="download" size={18} color="#fff" />
              <Text className="text-white font-semibold ml-2">İndir</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              className="bg-purple-500 rounded-xl py-3 flex-1 ml-2 items-center flex-row justify-center"
              onPress={() => handleEditCV(cv)}
            >
              <Feather name="edit-2" size={18} color="#fff" />
              <Text className="text-white font-semibold ml-2">Düzenle</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      
      <CVTemplateModal
        isVisible={showTemplateModal}
        onClose={() => setShowTemplateModal(false)}
        onSelectTemplate={handleSelectTemplate}
      />
    </>
  );
});

const formatDate = (timestamp: any) => {
  if (!timestamp || typeof timestamp.toDate !== 'function') {
    return 'Tarih yok';
  }
  try {
    const date = timestamp.toDate();
    return date.toLocaleDateString('tr-TR');
  } catch (error) {
    console.error('Tarih formatlanırken hata:', error);
    return 'Tarih yok';
  }
};

interface CVCardProps {
  cv: CVData;
  onPress: () => void;
}

const CVCard: React.FC<CVCardProps> = ({ cv, onPress }) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [pdfUri, setPdfUri] = useState<string | null>(null);
  const [showPDF, setShowPDF] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);

  useEffect(() => {
    loadProfileImage();
  }, []);

  const loadProfileImage = async () => {
    try {
      const storage = getStorage();
      const storageRef = ref(storage, `profile_images/${cv.userId}`);
      
      try {
        const downloadURL = await getDownloadURL(storageRef);
        setProfileImage(downloadURL);
        await AsyncStorage.setItem(`profileImage_${cv.userId}`, downloadURL);
      } catch (error: any) {
        if (error.code === 'storage/object-not-found') {
          // Profil resmi henüz yüklenmemiş, önbellekte var mı diye kontrol et
          const cachedImage = await AsyncStorage.getItem(`profileImage_${cv.userId}`);
          if (cachedImage) {
            setProfileImage(cachedImage);
          }
        } else {
          throw error;
        }
      }
    } catch (error) {
      console.error('Profil resmi yüklenirken hata:', error);
    }
  };

  const handleTemplateSelect = async (templateId: TemplateId, cv: CVData) => {
    setShowTemplateModal(false);
    
    try {
      // Profil resmini Firebase Storage'dan al
      const storage = getStorage();
      const storageRef = ref(storage, `profile_images/${cv.userId}`);
      
      let profileImageUrl = null;
      try {
        profileImageUrl = await getDownloadURL(storageRef);
      } catch (error: any) {
        if (error.code === 'storage/object-not-found') {
          // Profil resmi yoksa önbellekten kontrol et
          profileImageUrl = await AsyncStorage.getItem(`profileImage_${cv.userId}`);
        } else {
          console.error('Profil resmi alınırken hata:', error);
        }
      }

      // CV HTML'ini oluştur ve profil resmini gönder
      const html = await generateCVHtml(cv, profileImageUrl, 'modern');
      
      const { uri } = await Print.printToFileAsync({
        html,
        base64: false
      });
      
      if (!(await Sharing.isAvailableAsync())) {
        Alert.alert('Hata', 'Paylaşım bu cihazda kullanılamıyor');
        return;
      }
      
      await Sharing.shareAsync(uri, {
        mimeType: 'application/pdf',
        dialogTitle: 'CV\'yi İndir'
      });
    } catch (error) {
      console.error('PDF indirme hatası:', error);
      Alert.alert('Hata', 'PDF indirme sırasında bir hata oluştu.');
    }
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={onPress} style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.name}>{cv.personal?.fullName || 'İsimsiz'}</Text>
          <Text style={styles.date}>{formatDate(cv.createdAt)}</Text>
        </View>
        <View style={styles.cardBody}>
          <Text style={styles.position}>{cv.experience?.[0]?.position || 'Pozisyon belirtilmemiş'}</Text>
          <Text style={styles.company}>{cv.experience?.[0]?.companyName || 'Şirket belirtilmemiş'}</Text>
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.pdfButton} 
        onPress={() => {
          if (!cv) {
            Alert.alert('Hata', 'CV bulunamadı.');
            return;
          }
          setShowTemplateModal(true);
        }}
      >
        <Feather name="file-text" size={20} color="#fff" />
        <Text style={styles.pdfButtonText}>PDF olarak görüntüle</Text>
      </TouchableOpacity>

      <CVTemplateModal
        isVisible={showTemplateModal}
        onClose={() => setShowTemplateModal(false)}
        onSelectTemplate={(templateId) => handleTemplateSelect(templateId, cv)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardBody: {
    marginTop: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
  position: {
    fontSize: 16,
    color: '#2196F3',
    marginBottom: 4,
  },
  company: {
    fontSize: 14,
    color: '#666',
  },
  pdfButton: {
    backgroundColor: '#2196F3',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  pdfButtonText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
  },
  modal: {
    margin: 0,
  },
  pdfContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  pdfHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  webview: {
    flex: 1,
  },
  closeButton: {
    padding: 8,
  },
  shareButton: {
    padding: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  modalScroll: {
    maxHeight: '85%',
    paddingHorizontal: 16,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  profileImage: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#1e40af',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  profileInitial: {
    fontSize: 36,
    color: 'white',
    fontWeight: '600',
  },
});

const HomeScreen = () => {
  const { userData } = useAuth();
  const [cvList, setCvList] = useState<CVData[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCV, setSelectedCV] = useState<CVData | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [pdfUri, setPdfUri] = useState<string | null>(null);
  const [showPDF, setShowPDF] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showTipsModal, setShowTipsModal] = useState(false);
  const [activeTipType, setActiveTipType] = useState<'cv' | 'interview' | 'career' | null>(null);
  const [activeTipTitle, setActiveTipTitle] = useState('');

  useEffect(() => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser?.uid) {
      loadProfileImage(currentUser.uid);
    }
  }, []);

  const loadProfileImage = async (userId: string) => {
    try {
      const storage = getStorage();
      const storageRef = ref(storage, `profile_images/${userId}`);
      
      try {
        const downloadURL = await getDownloadURL(storageRef);
        setProfileImage(downloadURL);
        await AsyncStorage.setItem(`profileImage_${userId}`, downloadURL);
      } catch (error: any) {
        if (error.code === 'storage/object-not-found') {
          // Profil resmi henüz yüklenmemiş, önbellekte var mı diye kontrol et
          const cachedImage = await AsyncStorage.getItem(`profileImage_${userId}`);
          if (cachedImage) {
            setProfileImage(cachedImage);
          }
        } else {
          throw error;
        }
      }
    } catch (error) {
      console.error('Profil resmi yüklenirken hata:', error);
    }
  };

  const fetchCVs = async () => {
    try {
      const currentUser = firebase.auth().currentUser;
      if (!currentUser) {
        setLoading(false);
        return;
      }

      const unsubscribe = firebase.firestore()
        .collection('cvs')
        .where('userId', '==', currentUser.uid)
        .onSnapshot((snapshot) => {
          // Duplicate kontrolü için Set kullan
          const uniqueIds = new Set();
          const cvs = snapshot.docs
            .filter(doc => {
              if (uniqueIds.has(doc.id)) {
                return false;
              }
              uniqueIds.add(doc.id);
              return true;
            })
            .map(doc => ({
              id: doc.id,
              ...doc.data()
            } as CVData))
            .sort((a, b) => {
              if (!a.createdAt || !a.createdAt.toDate) return 1;
              if (!b.createdAt || !b.createdAt.toDate) return -1;
              return b.createdAt.toDate().getTime() - a.createdAt.toDate().getTime();
            });
          
          setCvList(cvs);
          setLoading(false);
          setRefreshing(false);
        }, (error) => {
          console.error('CVler yüklenirken hata:', error);
          setLoading(false);
          setRefreshing(false);
        });

      return () => unsubscribe();
    } catch (error) {
      console.error('CVler yüklenirken hata:', error);
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchCVs();
  }, []);

  useEffect(() => {
    const unsubscribePromise = fetchCVs();
    return () => {
      unsubscribePromise.then(unsubscribe => unsubscribe?.());
    };
  }, []);

  const handleViewCV = useCallback((cv: CVData) => {
    if (!cv) return;
    setSelectedCV(cv);
    setIsModalVisible(true);
  }, []);

  const handleDeleteCV = (cvId: string) => {
    Alert.alert(
      "CV'yi Sil",
      "Bu CV'yi silmek istediğinizden emin misiniz?",
      [
        { text: "İptal", style: "cancel" },
        {
          text: "Sil",
          style: "destructive",
          onPress: async () => {
            try {
              await firebase.firestore()
                .collection('cvs')
                .doc(cvId)
                .delete();
            } catch (error) {
              console.error('CV silinirken hata:', error);
              Alert.alert("Hata", "CV silinirken bir hata oluştu.");
            }
          }
        }
      ]
    );
  };

  const handleViewPDF = async (cv: CVData) => {
    try {
      // Profil resmini Firebase Storage'dan al
      const storage = getStorage();
      const storageRef = ref(storage, `profile_images/${cv.userId}`);
      
      let profileImageUrl = null;
      try {
        profileImageUrl = await getDownloadURL(storageRef);
      } catch (error: any) {
        if (error.code === 'storage/object-not-found') {
          // Profil resmi yoksa önbellekten kontrol et
          profileImageUrl = await AsyncStorage.getItem(`profileImage_${cv.userId}`);
        } else {
          console.error('Profil resmi alınırken hata:', error);
        }
      }

      const html = await generateCVHtml(cv, profileImageUrl, 'modern');
      
      const { uri } = await Print.printToFileAsync({
        html,
        base64: false
      });
      
      setPdfUri(uri);
      setShowPDF(true);
    } catch (error) {
      console.error('PDF görüntüleme hatası:', error);
      Alert.alert('Hata', 'PDF görüntüleme sırasında bir hata oluştu.');
    }
  };

  const handleEditCV = (cv: CVData) => {
    router.push({
      pathname: "/(tabs)/create",
      params: { editMode: "true", cvData: JSON.stringify(cv) }
    });
  };

  const handleTemplateSelect = async (templateId: TemplateId, cv: CVData) => {
    setShowTemplateModal(false);
    
    try {
      // Profil resmini Firebase Storage'dan al
      const storage = getStorage();
      const storageRef = ref(storage, `profile_images/${cv.userId}`);
      
      let profileImageUrl = null;
      try {
        profileImageUrl = await getDownloadURL(storageRef);
      } catch (error: any) {
        if (error.code === 'storage/object-not-found') {
          // Profil resmi yoksa önbellekten kontrol et
          profileImageUrl = await AsyncStorage.getItem(`profileImage_${cv.userId}`);
        } else {
          console.error('Profil resmi alınırken hata:', error);
        }
      }

      // CV HTML'ini oluştur ve profil resmini gönder
      const html = await generateCVHtml(cv, profileImageUrl, 'modern');
      
      const { uri } = await Print.printToFileAsync({
        html,
        base64: false
      });
      
      if (!(await Sharing.isAvailableAsync())) {
        Alert.alert('Hata', 'Paylaşım bu cihazda kullanılamıyor');
        return;
      }
      
      await Sharing.shareAsync(uri, {
        mimeType: 'application/pdf',
        dialogTitle: 'CV\'yi İndir'
      });
    } catch (error) {
      console.error('PDF indirme hatası:', error);
      Alert.alert('Hata', 'PDF indirme sırasında bir hata oluştu.');
    }
  };

  const closeModal = useCallback(() => {
    setIsModalVisible(false);
    // Modalı kapattıktan 300ms sonra selectedCV'yi null yap
    setTimeout(() => {
      setSelectedCV(null);
    }, 300);
  }, []);

  const openCVModal = useCallback((cv: CVData) => {
    setSelectedCV(cv);
    setIsModalVisible(true);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView 
        className="flex-1 px-4 py-6"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#2563EB"
            colors={['#2563EB']}
          />
        }
        contentContainerStyle={{ paddingBottom: Platform.OS === 'ios' ? 40 : 38 }}
      >
        {/* Hoş Geldin Mesajı */}
        <View className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <Text className="text-lg font-semibold text-gray-900 mb-2">
            Hoş Geldin, {userData?.fullName}!
          </Text>
          <Text className="text-gray-600">
            CV'lerini görüntüleyebilir, düzenleyebilir ve indirebilirsin.
          </Text>
        </View>

        <Text className="text-lg font-semibold text-gray-900 mb-4 px-2">
          Kayıtlı CV'lerim
        </Text>

        {/* Yatay Kaydırılabilir CV Kartları */}
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
                    onPress={() => handleDeleteCV(cv.id)}
                    className="p-2"
                  >
                    <Feather name="trash-2" size={20} color="#EF4444" />
                  </TouchableOpacity>
                </View>

                <View className="flex-row justify-between mt-4">
                  <TouchableOpacity 
                    onPress={() => handleViewCV(cv)}
                    className="flex-1 items-center mr-2"
                  >
                    <View className="bg-blue-50 p-2 rounded-lg w-full items-center">
                      <Feather name="eye" size={18} color="#2563EB" />
                      <Text className="text-xs text-blue-600 mt-1">Görüntüle</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    onPress={() => {
                      setSelectedCV(cv);
                      setShowTemplateModal(true);
                    }}
                    className="flex-1 items-center mx-2"
                  >
                    <View className="bg-green-50 p-2 rounded-lg w-full items-center">
                      <Feather name="download" size={18} color="#059669" />
                      <Text className="text-xs text-green-600 mt-1">İndir</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    onPress={() => handleEditCV(cv)}
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

        {/* Kariyer İpuçları Bölümü */}
        <View className="bg-white py-6 px-4 mt-4 rounded-xl">
          <Text className="text-lg font-semibold text-gray-900 mb-4 px-2">
            Kariyer İpuçları
          </Text>
          
          <View className="space-y-4">
            <TouchableOpacity 
              className="bg-blue-50 rounded-xl p-4 mt-2"
              onPress={() => {
                setActiveTipType('cv');
                setActiveTipTitle('Etkili CV Hazırlama');
                setShowTipsModal(true);
              }}
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
              onPress={() => {
                setActiveTipType('interview');
                setActiveTipTitle('Mülakat Teknikleri');
                setShowTipsModal(true);
              }}
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
              onPress={() => {
                setActiveTipType('career');
                setActiveTipTitle('Kariyer Gelişimi');
                setShowTipsModal(true);
              }}
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

      </ScrollView>

      {/* PDF Modal */}
      <Modal
        isVisible={showPDF}
        onBackdropPress={() => setShowPDF(false)}
        style={{ margin: 0 }}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}
      >
        <SafeAreaView className="flex-1 bg-white">
          <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
            <TouchableOpacity onPress={() => setShowPDF(false)}>
              <Feather name="x" size={24} color="#666" />
            </TouchableOpacity>
            <Text className="text-lg font-semibold">CV Önizleme</Text>
            <TouchableOpacity onPress={() => selectedCV && handleViewPDF(selectedCV)}>
              <Feather name="share-2" size={24} color="#2196F3" />
            </TouchableOpacity>
          </View>

          {pdfUri && (
            <WebView
              source={{ uri: `file://${pdfUri}` }}
              style={{ flex: 1 }}
              originWhitelist={['*']}
              mixedContentMode="always"
              allowFileAccess={true}
              allowUniversalAccessFromFileURLs={true}
            />
          )}
        </SafeAreaView>
      </Modal>

      {/* Çıkış CV Modal */}
      {selectedCV && (
        <CVModal
          isVisible={isModalVisible}
          onClose={closeModal}
          cv={selectedCV}
        />
      )}

      <CVTemplateModal
        isVisible={showTemplateModal}
        onClose={() => setShowTemplateModal(false)}
        onSelectTemplate={(templateId) => {
          if (selectedCV) {
            handleTemplateSelect(templateId, selectedCV);
          } else {
            Alert.alert('Hata', 'CV bulunamadı.');
          }
        }}
      />

      <CareerTipsModal
        isVisible={showTipsModal}
        onClose={() => setShowTipsModal(false)}
        title={activeTipTitle}
        type={activeTipType || 'cv'}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
