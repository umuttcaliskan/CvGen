import React from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { Stack } from 'expo-router';

const TermsScreen: React.FC = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <Stack.Screen 
        options={{
          title: "Şartlar ve Koşullar",
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
      
      <ScrollView className="flex-1 px-4 py-6">
        <Text className="text-2xl font-bold text-gray-900 mb-8 px-2">
          Şartlar ve Koşullar
        </Text>

        <View className="space-y-8">
          {sections.map((section, index) => (
            <View key={index} className="bg-white rounded-xl p-4 shadow-sm">
              <Text className="text-lg font-semibold text-gray-800 mb-3">
                {section.title}
              </Text>
              {Array.isArray(section.content) ? (
                <View className="space-y-3">
                  {section.content.map((item, idx) => (
                    <Text key={idx} className="text-gray-600 leading-6">
                      {item}
                    </Text>
                  ))}
                </View>
              ) : (
                <Text className="text-gray-600 leading-6">
                  {section.content}
                </Text>
              )}
            </View>
          ))}
        </View>

        <View className="mt-8 mb-6 px-2">
          <Text className="text-xs text-gray-500 text-center">
            Son güncelleme: {new Date().toLocaleDateString()}
          </Text>
          <Text className="text-xs text-gray-400 text-center mt-2 mb-1">
             CvGen CV Oluşturucu © 2024. Tüm hakları saklıdır.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const sections = [
  {
    title: "1. Giriş",
    content: "Bu Şartlar ve Koşullar, CvGen CV Oluşturucu uygulamasını ('Uygulama') kullanımınızı düzenler. Uygulamayı kullanarak bu şartları kabul etmiş olursunuz. Bu şartları kabul etmiyorsanız, lütfen uygulamayı kullanmayın."
  },
  {
    title: "2. Hesap Oluşturma ve Güvenlik",
    content: [
      "2.1. Hesap oluştururken doğru ve güncel bilgiler sağlamakla yükümlüsünüz.",
      "2.2. Hesap güvenliğinizden yalnızca siz sorumlusunuz. Şifrenizi güvende tutun ve başkalarıyla paylaşmayın.",
      "2.3. Hesabınızda gerçekleşen tüm aktivitelerden siz sorumlusunuz.",
      "2.4. Hesabınızda yetkisiz bir erişim fark ederseniz, derhal bize bildirmelisiniz."
    ]
  },
  {
    title: "3. Kullanım Koşulları",
    content: [
      "3.1. Uygulamayı yalnızca yasal amaçlar için kullanabilirsiniz.",
      "3.2. Uygulamayı veya sistemlerimizi engelleyecek, aksatacak veya zarar verecek şekilde kullanamazsınız.",
      "3.3. Diğer kullanıcıların haklarını ihlal edemezsiniz.",
      "3.4. Uygulama üzerinden yasa dışı, tehditkar, taciz edici, iftira niteliğinde içerik paylaşamazsınız."
    ]
  },
  {
    title: "4. CV Oluşturma ve İçerik",
    content: [
      "4.1. CV'nizde yer alan tüm bilgilerin doğruluğundan siz sorumlusunuz.",
      "4.2. Başkalarının kişisel bilgilerini izinsiz kullanamazsınız.",
      "4.3. Telif hakkı ihlali içeren içerikler kullanamazsınız.",
      "4.4. CV'nizde uygunsuz, yanıltıcı veya sahte bilgiler kullanamazsınız."
    ]
  },
  {
    title: "5. Gizlilik ve Veri Koruma",
    content: [
      "5.1. Kişisel verileriniz gizlilik politikamıza uygun olarak işlenir.",
      "5.2. Verileriniz güvenli bir şekilde saklanır ve korunur.",
      "5.3. Verileriniz üçüncü taraflarla izniniz olmadan paylaşılmaz.",
      "5.4. İstediğiniz zaman verilerinizin silinmesini talep edebilirsiniz."
    ]
  },
  {
    title: "6. Premium Özellikler ve Ödeme",
    content: [
      "6.1. Premium özelliklere erişim için ödeme yapmanız gerekebilir.",
      "6.2. Ödemeler güvenli ödeme sistemleri üzerinden gerçekleştirilir.",
      "6.3. Abonelikler, ayarlarınızda aksi belirtilmedikçe otomatik olarak yenilenir.",
      "6.4. İade politikamız yasal düzenlemelere uygundur ve uygulama içinde belirtilmiştir."
    ]
  },
  {
    title: "7. Fikri Mülkiyet Hakları",
    content: [
      "7.1. CvGen CV Oluşturucu uygulaması ve içeriğinin tüm hakları bize aittir.",
      "7.2. CV şablonları ve tasarımlar lisans altında korunmaktadır.",
      "7.3. Kendi oluşturduğunuz CV içerikleri hariç hiçbir içeriği kopyalayamaz veya değiştiremezsiniz.",
      "7.4. Logo ve markamızı izinsiz kullanamazsınız."
    ]
  },
  {
    title: "8. Sorumluluk Sınırlaması",
    content: [
      "8.1. Uygulama 'olduğu gibi' sunulmaktadır.",
      "8.2. Kesintisiz veya hatasız çalışma garantisi vermiyoruz.",
      "8.3. CV'lerinizin içeriğinden ve bunların kullanımından doğabilecek sonuçlardan sorumlu değiliz.",
      "8.4. Üçüncü taraf hizmetlerinden kaynaklanan sorunlardan sorumlu değiliz."
    ]
  },
  {
    title: "9. Uyuşmazlık Çözümü",
    content: [
      "9.1. Uyuşmazlıklar öncelikle dostane yollarla çözülmeye çalışılır.",
      "9.2. Çözülemeyen uyuşmazlıklarda Türkiye Cumhuriyeti mahkemeleri yetkilidir.",
      "9.3. Bu şartlar Türk hukukuna tabidir.",
      "9.4. Arabuluculuk ve tahkim yolları saklıdır."
    ]
  },
  {
    title: "10. Değişiklikler ve Güncellemeler",
    content: [
      "10.1. Bu şartları dilediğimiz zaman değiştirebiliriz.",
      "10.2. Önemli değişiklikler uygulama içi bildirimler veya e-posta ile bildirilir.",
      "10.3. Değişiklikler yayınlandığı tarihte yürürlüğe girer.",
      "10.4. Değişiklikleri kabul etmiyorsanız uygulamayı kullanmayı bırakmalısınız."
    ]
  }
];

export default TermsScreen; 