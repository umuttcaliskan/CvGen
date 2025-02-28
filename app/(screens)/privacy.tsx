import React from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { Stack } from 'expo-router';

const PrivacyScreen: React.FC = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <Stack.Screen 
        options={{
          title: "Gizlilik Sözleşmesi",
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
          Gizlilik Sözleşmesi
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
    content: "Bu Gizlilik Sözleşmesi, CvGen CV Oluşturucu uygulamasını ('Uygulama') kullanırken toplanan, işlenen ve saklanan kişisel verilerinizle ilgili uygulamalarımızı açıklar. Gizliliğinize saygı duyuyor ve kişisel verilerinizin korunmasını önemsiyoruz."
  },
  {
    title: "2. Toplanan Bilgiler",
    content: [
      "2.1. Hesap Bilgileri: Ad-soyad, e-posta adresi gibi hesap oluşturma sırasında sağladığınız bilgiler.",
      "2.2. CV İçeriği: Uygulamada oluşturduğunuz CV'lerde yer alan tüm kişisel ve profesyonel bilgiler.",
      "2.3. Kullanım Verileri: Uygulama kullanımınızla ilgili istatistikler ve tercihler.",
      "2.4. Cihaz Bilgileri: Cihaz modeli, işletim sistemi ve IP adresi gibi teknik bilgiler."
    ]
  },
  {
    title: "3. Bilgilerin Kullanımı",
    content: [
      "3.1. Hizmet Sağlama: CV oluşturma ve yönetme hizmetlerini sunmak için.",
      "3.2. Kişiselleştirme: Deneyiminizi iyileştirmek ve kişiselleştirmek için.",
      "3.3. İletişim: Güncellemeler, bildirimler ve destek sağlamak amacıyla sizinle iletişim kurmak için.",
      "3.4. Analiz: Uygulamamızı geliştirmek ve kullanıcı deneyimini iyileştirmek için."
    ]
  },
  {
    title: "4. Bilgi Paylaşımı",
    content: [
      "4.1. Üçüncü Taraf Hizmet Sağlayıcılar: Uygulamamızı destekleyen hizmetleri sağlayan güvenilir üçüncü taraflarla sınırlı bilgi paylaşımı yapabiliriz.",
      "4.2. Yasal Gereklilikler: Yasal bir yükümlülüğe uymak veya haklarımızı korumak için bilgi paylaşabiliriz.",
      "4.3. İş Transferleri: Şirket birleşmesi veya satın alma durumunda bilgileriniz aktarılabilir.",
      "4.4. İzninizle: Açık izniniz olduğunda bilgilerinizi paylaşabiliriz."
    ]
  },
  {
    title: "5. Veri Güvenliği",
    content: [
      "5.1. Güvenlik Önlemleri: Kişisel verilerinizi korumak için teknik ve organizasyonel önlemler uyguluyoruz.",
      "5.2. Veri Saklama: Verilerinizi yalnızca gerekli olduğu sürece saklıyoruz.",
      "5.3. Veri İhlalleri: Veri ihlali durumunda, yürürlükteki yasalara uygun olarak sizi bilgilendireceğiz.",
      "5.4. Şifreleme: Hassas bilgilerinizi korumak için şifreleme teknolojileri kullanıyoruz."
    ]
  },
  {
    title: "6. Kullanıcı Hakları",
    content: [
      "6.1. Erişim ve Düzeltme: Kişisel verilerinize erişme ve düzeltme hakkına sahipsiniz.",
      "6.2. Silme: Kişisel verilerinizin silinmesini talep edebilirsiniz.",
      "6.3. İşleme Sınırlaması: Verilerinizin işlenmesini sınırlandırma hakkına sahipsiniz.",
      "6.4. Veri Taşınabilirliği: Verilerinizi yapılandırılmış bir formatta alma hakkına sahipsiniz."
    ]
  },
  {
    title: "7. Çerezler ve İzleme Teknolojileri",
    content: [
      "7.1. Çerezler: Uygulamada deneyiminizi geliştirmek için çerezler ve benzer teknolojiler kullanıyoruz.",
      "7.2. Analitik: Kullanım istatistiklerini toplamak için analitik araçlar kullanıyoruz.",
      "7.3. Çerez Tercihleri: Çerez tercihlerinizi cihaz ayarlarınızdan yönetebilirsiniz.",
      "7.4. İzleme Reddi: Belirli izleme teknolojilerini reddetme seçeneğine sahipsiniz."
    ]
  },
  {
    title: "8. CV Verilerinizin Korunması",
    content: "CV'nizde yer alan bilgiler sizin kontrolünüzdedir. Bu bilgileri yalnızca sizin izin verdiğiniz şekilde kullanır ve paylaşırız. CV'leriniz, hesabınızda güvenli bir şekilde saklanır ve yalnızca siz erişebilirsiniz. CV'lerinizi istediğiniz zaman düzenleyebilir veya silebilirsiniz."
  },
  {
    title: "9. Uluslararası Veri Transferleri",
    content: "Verileriniz, sunucularımızın ve hizmet sağlayıcılarımızın bulunduğu ülkelere aktarılabilir. Bu ülkelerdeki veri koruma yasaları, kendi ülkenizdekilerden farklı olabilir. Verilerinizi aktarırken uygun güvenlik önlemlerini alıyoruz."
  },
  {
    title: "10. Gizlilik Politikası Değişiklikleri",
    content: [
      "10.1. Güncelleme Bildirimleri: Bu gizlilik politikasında yapılan önemli değişiklikler hakkında sizi bilgilendireceğiz.",
      "10.2. Gözden Geçirme: Bu politikayı düzenli olarak gözden geçirmenizi öneririz.",
      "10.3. Yürürlük Tarihi: Değişiklikler, bu politikada belirtilen tarihte yürürlüğe girer.",
      "10.4. İtiraz: Değişikliklere itiraz ediyorsanız, uygulamayı kullanmayı bırakmalısınız."
    ]
  }
];

export default PrivacyScreen; 