import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, ActivityIndicator, Alert, RefreshControl, Image, Modal as RNModal, Dimensions, StyleSheet } from 'react-native';
import { Stack, router } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { Feather } from '@expo/vector-icons';
import { firebase } from '../../firebase.config';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { generateCVHtml } from '../utils/generateCVHtml';
import WebView from 'react-native-webview';

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
  createdAt: {
    toDate: () => Date;
  };
}

interface CVModalProps {
  isVisible: boolean;
  onClose: () => void;
  cv: CVData | null;
}

const CVModal: React.FC<CVModalProps> = React.memo(({ isVisible, onClose, cv }) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    const loadProfileImage = async () => {
      try {
        const currentUser = firebase.auth().currentUser;
        if (currentUser?.uid) {
          const storedImage = await AsyncStorage.getItem(`profileImage_${currentUser.uid}`);
          if (storedImage) {
            setProfileImage(storedImage);
          }
        }
      } catch (error) {
        console.error('Profil resmi yüklenirken hata:', error);
      }
    };

    loadProfileImage();
  }, []);

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection={['down']}
      style={{ margin: 0 }}
      useNativeDriver={true}
      hideModalContentWhileAnimating={true}
    >
      <View className="bg-white rounded-t-3xl" style={{ height: '90%', marginTop: 'auto' }}>
        <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
          <Text className="text-xl font-semibold">CV Detayları</Text>
          <TouchableOpacity onPress={onClose}>
            <Feather name="x" size={24} color="#666" />
          </TouchableOpacity>
        </View>

        <ScrollView 
          className="flex-1"
          showsVerticalScrollIndicator={true}
          bounces={true}
          contentContainerStyle={{ padding: 16 }}
        >
          {cv && (
            <View>
              {/* Profil Resmi */}
              <View className="items-center mb-6">
                <View className="w-24 h-24 border border-gray-200 rounded-full overflow-hidden bg-blue-900 justify-center items-center">
                  {profileImage ? (
                    <Image 
                      source={{ uri: profileImage }} 
                      className="w-full h-full"
                      resizeMode="cover"
                    />
                  ) : (
                    <Text className="text-4xl text-white font-semibold">
                      {cv.personal?.fullName?.charAt(0).toUpperCase() || 'U'}
                    </Text>
                  )}
                </View>
              </View>

              {/* Kişisel Bilgiler */}
              {cv.personal && (
                <View className="mb-6">
                  <Text className="text-lg font-semibold text-blue-600 mb-3">Kişisel Bilgiler</Text>
                  <View className="bg-gray-50 rounded-xl p-4">
                    <Text className="text-gray-800 font-medium mb-1">{cv.personal.fullName}</Text>
                    <Text className="text-gray-600">{cv.personal.email}</Text>
                    <Text className="text-gray-600">{cv.personal.phone}</Text>
                    <Text className="text-gray-600">{cv.personal.address}</Text>
                    <Text className="text-gray-600">{cv.personal.birthDate}</Text>
                  </View>
                </View>
              )}

              {/* Hakkımda */}
              {cv.about && (
                <View className="mb-6">
                  <Text className="text-lg font-semibold text-blue-600 mb-3">Hakkımda</Text>
                  <View className="bg-gray-50 rounded-xl p-4">
                    <Text className="text-gray-600">{cv.about}</Text>
                  </View>
                </View>
              )}

              {/* Eğitim */}
              {cv.education && cv.education.length > 0 && (
                <View className="mb-6">
                  <Text className="text-lg font-semibold text-blue-600 mb-3">Eğitim</Text>
                  {cv.education.map((edu) => (
                    <View key={edu.id} className="bg-gray-50 rounded-xl p-4 mb-2">
                      <Text className="text-gray-800 font-medium">{edu.schoolName}</Text>
                      <Text className="text-gray-700">{edu.department}</Text>
                      <Text className="text-gray-600">{edu.startDate} - {edu.endDate}</Text>
                    </View>
                  ))}
                </View>
              )}

              {/* Deneyim */}
              {cv.experience && cv.experience.length > 0 && (
                <View className="mb-6">
                  <Text className="text-lg font-semibold text-blue-600 mb-3">İş Deneyimi</Text>
                  {cv.experience.map((exp: any) => (
                    <View key={exp.id} className="bg-gray-50 rounded-xl p-4 mb-2">
                      <Text className="text-gray-800 font-medium">{exp.companyName}</Text>
                      <Text className="text-gray-700">{exp.position}</Text>
                      <Text className="text-gray-500 text-sm">{exp.startDate} - {exp.endDate}</Text>
                      <Text className="text-gray-600 mt-2">{exp.description}</Text>
                    </View>
                  ))}
                </View>
              )}

              {/* Beceriler */}
              {cv.skills && cv.skills.length > 0 && (
                <View className="mb-6">
                  <Text className="text-lg font-semibold text-blue-600 mb-3">Beceriler</Text>
                  <View className="bg-gray-50 rounded-xl p-4">
                    {cv.skills.map((skill: any) => (
                      <View key={skill.id} className="flex-row justify-between items-center mb-2">
                        <Text className="text-gray-800">{skill.name}</Text>
                        <Text className="text-gray-600">{skill.level}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              {/* Diller */}
              {cv.languages && cv.languages.length > 0 && (
                <View className="mb-6">
                  <Text className="text-lg font-semibold text-blue-600 mb-3">Yabancı Diller</Text>
                  <View className="bg-gray-50 rounded-xl p-4">
                    {cv.languages.map((lang: any) => (
                      <View key={lang.id} className="flex-row justify-between items-center mb-2">
                        <Text className="text-gray-800">{lang.name}</Text>
                        <Text className="text-gray-600">{lang.level}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              {/* Referanslar */}
              {cv.references && cv.references.length > 0 && (
                <View className="mb-6">
                  <Text className="text-lg font-semibold text-blue-600 mb-3">Referanslar</Text>
                  {cv.references.map((ref: any) => (
                    <View key={ref.id} className="bg-gray-50 rounded-xl p-4 mb-2">
                      <Text className="text-gray-800 font-medium">{ref.fullName}</Text>
                      <Text className="text-gray-700">{ref.position} - {ref.company}</Text>
                      <Text className="text-gray-600">{ref.phone}</Text>
                      <Text className="text-gray-600">{ref.email}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          )}
        </ScrollView>
      </View>
    </Modal>
  );
});

interface CVCardProps {
  cv: CVData;
  onPress: () => void;
}

const CVCard: React.FC<CVCardProps> = ({ cv, onPress }) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [pdfUri, setPdfUri] = useState<string | null>(null);
  const [showPDF, setShowPDF] = useState(false);

  useEffect(() => {
    loadProfileImage();
  }, []);

  const loadProfileImage = async () => {
    try {
      const storedImage = await AsyncStorage.getItem(`profileImage_${cv.userId}`);
      if (storedImage) {
        setProfileImage(storedImage);
      }
    } catch (error) {
      console.error('Profil resmi yüklenirken hata:', error);
    }
  };

  const handleViewPDF = async () => {
    try {
      const html = generateCVHtml(cv, profileImage);
      
      // PDF'i oluştur
      const { uri } = await Print.printToFileAsync({
        html,
        base64: false
      });
      
      setPdfUri(uri);
      setShowPDF(true);

    } catch (error) {
      console.error('PDF oluşturulurken hata:', error);
      Alert.alert('Hata', 'PDF oluşturulurken bir hata oluştu.');
    }
  };

  const handleSharePDF = async () => {
    try {
      if (pdfUri) {
        await Sharing.shareAsync(pdfUri);
      }
    } catch (error) {
      console.error('PDF paylaşılırken hata:', error);
      Alert.alert('Hata', 'PDF paylaşılırken bir hata oluştu.');
    }
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={onPress} style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.name}>{cv.personal?.fullName || 'İsimsiz'}</Text>
          <Text style={styles.date}>{cv.createdAt?.toDate().toLocaleDateString()}</Text>
        </View>
        <View style={styles.cardBody}>
          <Text style={styles.position}>{cv.experience?.[0]?.position || 'Pozisyon belirtilmemiş'}</Text>
          <Text style={styles.company}>{cv.experience?.[0]?.companyName || 'Şirket belirtilmemiş'}</Text>
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.pdfButton} onPress={handleViewPDF}>
        <Feather name="file-text" size={20} color="#fff" />
        <Text style={styles.pdfButtonText}>PDF olarak görüntüle</Text>
      </TouchableOpacity>

      <Modal 
        isVisible={showPDF}
        onBackdropPress={() => setShowPDF(false)}
        style={styles.modal}
      >
        <View style={styles.pdfContainer}>
          <View style={styles.pdfHeader}>
            <TouchableOpacity 
              style={styles.closeButton} 
              onPress={() => setShowPDF(false)}
            >
              <Feather name="x" size={24} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.shareButton} 
              onPress={handleSharePDF}
            >
              <Feather name="share-2" size={24} color="#2196F3" />
            </TouchableOpacity>
          </View>
          {pdfUri && (
            <WebView
              source={{ uri: pdfUri }}
              style={styles.webview}
            />
          )}
        </View>
      </Modal>
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
  const [isPdfModalVisible, setIsPdfModalVisible] = useState(false);

  useEffect(() => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser?.uid) {
      loadProfileImage(currentUser.uid);
    }
  }, []);

  const loadProfileImage = async (userId: string) => {
    try {
      const storedImage = await AsyncStorage.getItem(`profileImage_${userId}`);
      if (storedImage) {
        setProfileImage(storedImage);
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
          const cvs = snapshot.docs
            .map(doc => ({
              id: doc.id,
              ...doc.data()
            } as CVData))
            .sort((a, b) => {
              const dateA = a.createdAt?.toDate?.() || new Date(0);
              const dateB = b.createdAt?.toDate?.() || new Date(0);
              return dateB.getTime() - dateA.getTime();
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
      const html = generateCVHtml(cv, profileImage);
      const options = {
        html,
        fileName: `CV_${cv.personal?.fullName || 'Untitled'}_${Date.now()}`,
        directory: 'Documents',
      };

      const file = await RNHTMLtoPDF.convert(options);
      if (file.filePath) {
        setPdfUri(file.filePath);
        setIsPdfModalVisible(true);
      }
    } catch (error) {
      console.error('PDF oluşturulurken hata:', error);
      alert('PDF oluşturulurken bir hata oluştu.');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">


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
                key={cv.id} 
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
                      <Text className="text-sm text-gray-500">
                        {new Date(cv.createdAt?.toDate()).toLocaleDateString('tr-TR')}
                      </Text>
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
                    onPress={() => {/* İndirme fonksiyonu */}}
                    className="flex-1 items-center mx-2"
                  >
                    <View className="bg-green-50 p-2 rounded-lg w-full items-center">
                      <Feather name="download" size={18} color="#059669" />
                      <Text className="text-xs text-green-600 mt-1">İndir</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    onPress={() => {/*indirme fonksiyonu */}}
                    className="flex-1 items-center ml-2"
                  >
                    <View className="bg-purple-50 p-2 rounded-lg w-full items-center">
                      <Feather name="edit" size={18} color="#7C3AED" />
                      <Text className="text-xs text-purple-600 mt-1">Düzenle</Text>
                    </View>
                  </TouchableOpacity>
                </View>

                {/* PDF Görüntüleme Butonu */}
                <TouchableOpacity 
                  onPress={() => handleViewPDF(cv)}
                  className="mt-3"
                >
                  <View className="bg-orange-50 p-2 rounded-lg w-full items-center flex-row justify-center">
                    <Feather name="file-text" size={18} color="#EA580C" />
                    <Text className="text-xs text-orange-600 ml-2">PDF Olarak Görüntüle</Text>
                  </View>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <View className="flex items-center justify-center w-full py-8">
              <Text className="text-gray-500">Henüz CV oluşturmadınız.</Text>
            </View>
          )}
        </ScrollView>
      </ScrollView>

      {/* PDF Modal */}
      <RNModal
        visible={isPdfModalVisible}
        onRequestClose={() => setIsPdfModalVisible(false)}
        animationType="slide"
      >
        <SafeAreaView className="flex-1 bg-white">
          <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
            <Text className="text-lg font-semibold">CV Önizleme</Text>
            <TouchableOpacity 
              onPress={() => setIsPdfModalVisible(false)}
              className="p-2"
            >
              <Feather name="x" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          {pdfUri && (
            <View className="flex-1">
              <WebView
                source={{ uri: pdfUri }}
                style={{ flex: 1 }}
                onError={(error) => {
                  console.error('PDF görüntülenirken hata:', error);
                  alert('PDF görüntülenirken bir hata oluştu.');
                }}
              />
            </View>
          )}
        </SafeAreaView>
      </RNModal>

      {/* Existing CV Modal */}
      <CVModal 
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        cv={selectedCV}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
