import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, SafeAreaView, Image, ActivityIndicator, Share, TouchableOpacity, Alert } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { firebase } from '../../firebaseConfig';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  topic: string;
  createdAt: any;
  authorName?: string;
}

const BlogDetailScreen: React.FC = () => {
  const { blogId } = useLocalSearchParams();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        if (!blogId) return;
        
        const docRef = firebase.firestore().collection('blogs').doc(blogId as string);
        const doc = await docRef.get();
        
        if (doc.exists) {
          setBlog({
            id: doc.id,
            ...doc.data() as Omit<BlogPost, 'id'>
          });
        } else {
          console.log('Blog yazısı bulunamadı');
        }
      } catch (error) {
        console.error('Blog detayı yüklenirken hata:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlogDetail();
  }, [blogId]);
  
  const formatDate = (timestamp: any) => {
    if (!timestamp) return '';
    
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };
  
  const handleShare = async () => {
    if (!blog) return;
    
    try {
      const result = await Share.share(
        {
          message: `${blog.title}\n\n${blog.content.substring(0, 100)}...\n\nCvGen uygulamasından paylaşıldı.`,
          title: blog.title,
          url: blog.imageUrl // Eğer varsa resmi de paylaşabilirsiniz
        },
        {
          // Android için diyalog başlığı
          dialogTitle: 'Blog Yazısını Paylaş',
          // iOS için paylaşım seçenekleri
          subject: blog.title
        }
      );
      
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // iOS'ta paylaşıldı
          console.log('Paylaşıldı via:', result.activityType);
        } else {
          // Android'de paylaşıldı
          console.log('Paylaşıldı');
        }
      } else if (result.action === Share.dismissedAction) {
        // Paylaşım iptal edildi
        console.log('Paylaşım iptal edildi');
      }
    } catch (error) {
      console.error('Paylaşım hatası:', error);
      Alert.alert('Hata', 'Blog yazısı paylaşılırken bir hata oluştu.');
    }
  };
  
  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <ActivityIndicator size="large" color="#2563eb" />
        <Text className="text-gray-500 mt-4">Blog yazısı yükleniyor...</Text>
      </SafeAreaView>
    );
  }
  
  if (!blog) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <Feather name="file-text" size={48} color="#d1d5db" />
        <Text className="text-gray-500 mt-4">Blog yazısı bulunamadı.</Text>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Stack.Screen 
        options={{
          title: "Blog Detayı",
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerShadowVisible: false,
          headerTitleStyle: {
            color: '#1f2937',
            fontSize: 16,
          },
          headerTintColor: '#1f2937',
          headerRight: () => (
            <TouchableOpacity onPress={handleShare} className="mr-2">
              <Feather name="share-2" size={20} color="#1f2937" />
            </TouchableOpacity>
          ),
        }}
      />
      
      <ScrollView className="flex-1">
        {blog.imageUrl && (
          <Image 
            source={{ uri: blog.imageUrl }} 
            className="w-full h-56"
            resizeMode="cover"
          />
        )}
        
        <View className="p-6">
          {blog.topic && (
            <View className="bg-blue-50 self-start px-3 py-1 rounded-full mb-3">
              <Text className="text-blue-600 text-xs font-medium">{blog.topic}</Text>
            </View>
          )}
          
          <Text className="text-2xl font-bold text-gray-800 mb-2">{blog.title}</Text>
          <View className="flex-row items-center mb-6">
            {blog.authorName && (
              <View className="flex-row items-center mr-3">
                <Feather name="user" size={14} color="#6b7280" />
                <Text className="text-gray-500 text-sm ml-1">{blog.authorName}</Text>
              </View>
            )}
            <View className="flex-row items-center">
              <Feather name="calendar" size={14} color="#6b7280" />
              <Text className="text-gray-500 text-sm ml-1">{formatDate(blog.createdAt)}</Text>
            </View>
          </View>
          
          <Text className="text-gray-700 leading-7" style={{ lineHeight: 24 }}>
            {blog.content}
          </Text>
          
          <View className="mt-8 pt-6 border-t border-gray-100">
            <TouchableOpacity 
              onPress={handleShare}
              className="flex-row items-center justify-center bg-blue-50 py-3 px-4 rounded-lg"
            >
              <Feather name="share-2" size={18} color="#2563eb" />
              <Text className="text-blue-600 font-medium ml-2">Bu Yazıyı Paylaş</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BlogDetailScreen; 