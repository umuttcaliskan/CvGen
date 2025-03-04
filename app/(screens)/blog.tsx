import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, SafeAreaView, Image, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { firebase } from '../../firebaseConfig';
import { LinearGradient } from 'expo-linear-gradient';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  topic: string;
  createdAt: any;
  authorName?: string;
}

const BlogScreen: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const router = useRouter();
  
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        let query;
        
        if (selectedTopic) {
          // Konu filtrelemesi varsa, önce tüm blogları çek ve JavaScript tarafında filtrele
          query = firebase.firestore().collection('blogs').orderBy('createdAt', 'desc');
          const snapshot = await query.get();
          
          const posts: BlogPost[] = [];
          snapshot.forEach(doc => {
            const data = doc.data() as Omit<BlogPost, 'id'>;
            // JavaScript tarafında filtreleme yap
            if (data.topic === selectedTopic) {
              posts.push({
                id: doc.id,
                ...data
              });
            }
          });
          
          setBlogPosts(posts);
          setFilteredPosts(posts);
        } else {
          // Konu filtrelemesi yoksa normal sorgu yap
          query = firebase.firestore().collection('blogs').orderBy('createdAt', 'desc');
          const snapshot = await query.get();
          
          const posts: BlogPost[] = [];
          snapshot.forEach(doc => {
            posts.push({
              id: doc.id,
              ...doc.data() as Omit<BlogPost, 'id'>
            });
          });
          
          setBlogPosts(posts);
          setFilteredPosts(posts);
        }
      } catch (error) {
        console.error('Blog yazıları yüklenirken hata:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlogPosts();
  }, [selectedTopic]);
  
  // Arama işlevi
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredPosts(blogPosts);
    } else {
      const lowercaseQuery = searchQuery.toLowerCase();
      const filtered = blogPosts.filter(post => 
        post.title.toLowerCase().includes(lowercaseQuery) || 
        post.content.toLowerCase().includes(lowercaseQuery) ||
        (post.topic && post.topic.toLowerCase().includes(lowercaseQuery)) ||
        (post.authorName && post.authorName.toLowerCase().includes(lowercaseQuery))
      );
      setFilteredPosts(filtered);
    }
  }, [searchQuery, blogPosts]);
  
  const formatDate = (timestamp: any) => {
    if (!timestamp) return '';
    
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };
  
  const getTopics = () => {
    const topics = new Set<string>();
    blogPosts.forEach(post => {
      if (post.topic) topics.add(post.topic);
    });
    return Array.from(topics);
  };
  
  const handleTopicSelect = (topic: string) => {
    setSelectedTopic(selectedTopic === topic ? null : topic);
  };
  
  const handleBlogPress = (blog: BlogPost) => {
    router.push({
      pathname: '/(screens)/blogDetail',
      params: { blogId: blog.id }
    });
  };
  
  const handleClearSearch = () => {
    setSearchQuery('');
  };
  
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <Stack.Screen 
        options={{
          title: "Blog",
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerShadowVisible: false,
          headerTitleStyle: {
            color: '#1f2937',
            fontSize: 16,
          },
          headerTintColor: '#1f2937',
        }}
      />
      
      <ScrollView className="flex-1">
        {/* Başlık Alanı */}
        <LinearGradient
          colors={['#1e40af', '#2563eb', '#3b82f6']}
          className="pt-8 pb-12 px-6"
        >
          <Text className="text-3xl font-bold text-white mb-2">CvGen Blog</Text>
          <Text className="text-white text-opacity-90">
            Kariyer gelişiminiz için faydalı içerikler ve ipuçları
          </Text>
        </LinearGradient>
        
        {/* Arama Alanı */}
        <View className="px-4 -mt-6 mb-4">
          <View 
            className="bg-white rounded-full px-4 py-2 flex-row items-center"
            style={{ 
              shadowColor: '#000', 
              shadowOffset: { width: 0, height: 2 }, 
              shadowOpacity: 0.1, 
              shadowRadius: 3, 
              elevation: 3 
            }}
          >
            <Feather name="search" size={18} color="#6b7280" />
            <TextInput
              className="flex-1 ml-2 text-gray-700"
              placeholder="Blog yazılarında ara..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={handleClearSearch}>
                <Feather name="x" size={18} color="#6b7280" />
              </TouchableOpacity>
            )}
          </View>
        </View>
        
        {/* Konular (Yatay Kaydırma) */}
        <View className="px-4 mb-4">
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 4, paddingBottom: 8 }}
          >
            <TouchableOpacity 
              onPress={() => setSelectedTopic(null)}
              className={`mr-2 px-4 py-2 rounded-full ${!selectedTopic ? 'bg-blue-600' : 'bg-white'}`}
              style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 }}
            >
              <Text className={`font-medium ${!selectedTopic ? 'text-white' : 'text-gray-700'}`}>Tümü</Text>
            </TouchableOpacity>
            
            {getTopics().map(topic => (
              <TouchableOpacity 
                key={topic}
                onPress={() => handleTopicSelect(topic)}
                className={`mr-2 px-4 py-2 rounded-full ${selectedTopic === topic ? 'bg-blue-600' : 'bg-white'}`}
                style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 }}
              >
                <Text className={`font-medium ${selectedTopic === topic ? 'text-white' : 'text-gray-700'}`}>{topic}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        
        {/* Blog Yazıları */}
        <View className="px-4 pb-8">
          {loading ? (
            <View className="items-center justify-center py-12">
              <ActivityIndicator size="large" color="#2563eb" />
              <Text className="text-gray-500 mt-4">Blog yazıları yükleniyor...</Text>
            </View>
          ) : filteredPosts.length === 0 ? (
            <View className="items-center justify-center py-12 bg-white rounded-xl p-6 shadow-sm">
              <Feather name="file-text" size={48} color="#d1d5db" />
              <Text className="text-gray-500 mt-4 text-center">
                {searchQuery 
                  ? `"${searchQuery}" ile ilgili blog yazısı bulunamadı.`
                  : selectedTopic 
                    ? `"${selectedTopic}" konusunda henüz blog yazısı bulunmuyor.` 
                    : 'Henüz blog yazısı bulunmuyor.'}
              </Text>
            </View>
          ) : (
            filteredPosts.map(blog => (
              <TouchableOpacity 
                key={blog.id}
                className="bg-white rounded-xl overflow-hidden mb-4 shadow-sm"
                style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 3, elevation: 2 }}
                onPress={() => handleBlogPress(blog)}
              >
                {blog.imageUrl && (
                  <Image 
                    source={{ uri: blog.imageUrl }} 
                    className="w-full h-48"
                    resizeMode="cover"
                  />
                )}
                <View className="p-4">
                  {blog.topic && (
                    <View className="bg-blue-50 self-start px-3 py-1 rounded-full mb-2">
                      <Text className="text-blue-600 text-xs font-medium">{blog.topic}</Text>
                    </View>
                  )}
                  <Text className="text-xl font-bold text-gray-800 mb-2">{blog.title}</Text>
                  <Text className="text-gray-600 mb-3" numberOfLines={2}>
                    {blog.content.substring(0, 120)}
                    {blog.content.length > 120 ? '...' : ''}
                  </Text>
                  <View className="flex-row justify-between items-center">
                    <View className="flex-row items-center">
                      {blog.authorName && (
                        <Text className="text-gray-500 text-xs mr-2">
                          <Feather name="user" size={10} color="#6b7280" /> {blog.authorName}
                        </Text>
                      )}
                      <Text className="text-gray-500 text-xs">
                        <Feather name="calendar" size={10} color="#6b7280" /> {formatDate(blog.createdAt)}
                      </Text>
                    </View>
                    <View className="flex-row items-center">
                      <Text className="text-blue-600 mr-1">Devamını Oku</Text>
                      <Feather name="chevron-right" size={16} color="#2563eb" />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BlogScreen; 