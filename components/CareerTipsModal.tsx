import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import Modal from 'react-native-modal';
import { Feather } from '@expo/vector-icons';

interface CareerTipsModalProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  type: 'cv' | 'interview' | 'career';
}

const CareerTipsModal: React.FC<CareerTipsModalProps> = ({ isVisible, onClose, title, type }) => {
  const getTips = () => {
    switch (type) {
      case 'cv':
        return [
          {
            title: 'Öne Çıkan Başarıları Vurgulayın',
            description: 'Her deneyiminizde somut başarılarınızı ve katkılarınızı sayısal verilerle destekleyerek anlatın.',
            details: [
              'Başarılarınızı STAR metoduyla anlatın:',
              '• Durum: Karşılaştığınız zorluklar',
              '• Görev: Sorumluluklarınız',
              '• Eylem: Aldığınız aksiyonlar',
              '• Sonuç: Elde ettiğiniz sonuçlar',
              '',
              'Örnek: "Satış ekibinin verimliliğini %30 artırmak için yeni bir CRM sistemi kurdum ve ekibi eğittim."'
            ],
            icon: 'award',
            color: 'blue'
          },
          {
            title: 'ATS Uyumlu Format',
            description: 'İş ilanındaki önemli kelimeleri CV\'nizde kullanarak ATS sistemlerinde öne çıkın.',
            details: [
              'ATS Optimizasyonu İçin:',
              '• Anahtar kelimeleri kullanın',
              '• Standart yazı tipleri seçin',
              '• Karmaşık tasarımlardan kaçının',
              '• PDF formatını tercih edin',
              '• Standart bölüm başlıkları kullanın'
            ],
            icon: 'search',
            color: 'purple'
          },
          {
            title: 'Profesyonel Görünüm',
            description: 'Tutarlı yazı tipleri ve boyutları kullanarak, temiz ve düzenli bir görünüm elde edin.',
            details: [
              'Tasarım İpuçları:',
              '• En fazla 2 yazı tipi kullanın',
              '• 2-3 renk ile sınırlı kalın',
              '• Yeterli sayfa kenar boşluğu bırakın',
              '• 1-2 sayfa uzunluğunda tutun',
              '• Sol tarafa hizalı metin kullanın'
            ],
            icon: 'layout',
            color: 'green'
          },
          {
            title: 'Eğitim Bölümünü Etkili Kullanın',
            description: 'Eğitim geçmişinizi işverenler için anlamlı hale getirin.',
            details: [
              'Eğitim Bölümü İpuçları:',
              '• En yüksek dereceden başlayarak sıralayın',
              '• İlgili kurs ve sertifikaları ekleyin',
              '• Önemli projeleri ve başarıları belirtin',
              '• GPA\'nizi ekleyin (eğer 3.0 üzerindeyse)',
              '• Aldığınız ödül ve bursları belirtin'
            ],
            icon: 'book',
            color: 'blue'
          },
          {
            title: 'Deneyim Bölümünü Zenginleştirin',
            description: 'İş deneyimlerinizi etkileyici bir şekilde sunun.',
            details: [
              'Deneyim Yazma İpuçları:',
              '• Eylem fiilleriyle başlayın (geliştirdi, yönetti, artırdı)',
              '• Sayısal veriler kullanın (%20 artış, 50 kişilik ekip)',
              '• Kronolojik sıralama yapın',
              '• Güncel pozisyonu şimdiki zamanda yazın',
              '• Eski pozisyonları geçmiş zamanda yazın',
              '',
              'Örnek: "5 kişilik yazılım ekibini yöneterek projeyi %15 erken tamamladım"'
            ],
            icon: 'briefcase',
            color: 'purple'
          },
          {
            title: 'Beceriler Bölümünü Optimize Edin',
            description: 'Becerilerinizi stratejik olarak öne çıkarın.',
            details: [
              'Beceri Bölümü Stratejileri:',
              '• İlan ile eşleşen becerileri öne çıkarın',
              '• Teknik ve soft becerileri dengeleyin',
              '• Seviye belirtmeyi unutmayın',
              '• Güncel teknolojileri vurgulayın',
              '• Endüstri standartlarını ekleyin'
            ],
            icon: 'star',
            color: 'green'
          }
        ];
      case 'interview':
        return [
          {
            title: 'STAR Tekniği',
            description: 'Mülakat sorularını yapılandırılmış bir şekilde cevaplayın.',
            details: [
              'STAR Tekniği Adımları:',
              '• Situation (Durum)',
              '• Task (Görev)',
              '• Action (Eylem)',
              '• Result (Sonuç)',
              '',
              'Her cevabınızı bu formatta yapılandırın.'
            ],
            icon: 'target',
            color: 'blue'
          },
          {
            title: 'Beden Dili',
            description: 'Etkili beden dili ile profesyonel bir izlenim bırakın.',
            details: [
              'Önemli Noktalar:',
              '• Göz teması kurun',
              '• Dik duruş sergileyin',
              '• Doğal gülümseyin',
              '• Ellerinizi rahat tutun',
              '• Net ve anlaşılır konuşun'
            ],
            icon: 'user',
            color: 'purple'
          },
          {
            title: 'Güçlü Sorular Hazırlayın',
            description: 'Görüşme sonunda soracağınız sorularla fark yaratın.',
            details: [
              'Soru Hazırlama Stratejileri:',
              '• Şirketin büyüme planları hakkında sorular',
              '• Pozisyonun gelişim fırsatları',
              '• Ekip kültürü ve çalışma ortamı',
              '• Başarı kriterleri',
              '• Şirketin gelecek vizyonu',
              '',
              'Kaçınılması Gerekenler:',
              '• Maaş ve yan haklar (ilk görüşmede)',
              '• Basit, araştırılabilir bilgiler',
              '• Çok kişisel sorular'
            ],
            icon: 'help-circle',
            color: 'blue'
          },
          {
            title: 'Zor Sorulara Hazırlık',
            description: 'Sık sorulan zor soruları profesyonelce yanıtlayın.',
            details: [
              'Hazırlık İpuçları:',
              '• "En büyük zayıf yönünüz nedir?"',
              '  - Gerçek bir zayıf yön belirtin',
              '  - Geliştirmek için yaptıklarınızı anlatın',
              '',
              '• "Neden iş değiştirmek istiyorsunuz?"',
              '  - Pozitif yaklaşın',
              '  - Gelişim odaklı cevap verin',
              '',
              '• "Kendinizi 5 yıl sonra nerede görüyorsunuz?"',
              '  - Gerçekçi hedefler belirtin',
              '  - Şirketle uyumlu planlar sunun'
            ],
            icon: 'shield',
            color: 'purple'
          }
        ];
      case 'career':
        return [
          {
            title: 'Sürekli Gelişim',
            description: 'Kendinizi sürekli geliştirerek kariyer fırsatlarını artırın.',
            details: [
              'Gelişim Stratejileri:',
              '• Online eğitimler alın',
              '• Sertifikalar edinin',
              '• Network oluşturun',
              '• Sektör etkinliklerine katılın',
              '• Mentorluk alın/verin'
            ],
            icon: 'trending-up',
            color: 'green'
          },
          {
            title: 'Network Geliştirme',
            description: 'Profesyonel ağınızı etkili şekilde genişletin.',
            details: [
              'Networking Stratejileri:',
              '• LinkedIn profilinizi optimize edin',
              '• Sektör etkinliklerine katılın',
              '• Profesyonel gruplara üye olun',
              '• İlham veren kişileri takip edin',
              '• Düzenli içerik paylaşın',
              '',
              'Online Networking:',
              '• Webinarlara katılın',
              '• Çevrimiçi topluluklar oluşturun',
              '• Profesyonel bloglar yazın'
            ],
            icon: 'users',
            color: 'blue'
          },
          {
            title: 'Kişisel Marka Oluşturma',
            description: 'Profesyonel kimliğinizi güçlendirin.',
            details: [
              'Marka Oluşturma Adımları:',
              '• Uzmanlık alanınızı belirleyin',
              '• Online varlığınızı profesyonelleştirin',
              '• Düzenli içerik üretin',
              '• Portföy oluşturun',
              '• Referanslar toplayın',
              '',
              'Platform Önerileri:',
              '• LinkedIn',
              '• Medium',
              '• GitHub',
              '• Kişisel web sitesi'
            ],
            icon: 'bookmark',
            color: 'purple'
          },
          {
            title: 'Gelişim Planlaması',
            description: 'Kariyerinizi stratejik olarak planlayın.',
            details: [
              'Kariyer Planlama:',
              '• Kısa ve uzun vadeli hedefler belirleyin',
              '• Beceri analizi yapın',
              '• Pazar araştırması yapın',
              '• Mentorluk fırsatları arayın',
              '',
              'Eylem Planı:',
              '• Aylık hedefler belirleyin',
              '• İlerlemenizi takip edin',
              '• Geri bildirim alın',
              '• Planınızı güncelleyin'
            ],
            icon: 'compass',
            color: 'green'
          }
        ];
      default:
        return [];
    }
  };

  const getColorClass = (color: string) => {
    switch (color) {
      case 'blue':
        return {
          bg: 'bg-blue-50',
          icon: 'bg-blue-100',
          iconColor: '#2563EB'
        };
      case 'purple':
        return {
          bg: 'bg-purple-50',
          icon: 'bg-purple-100',
          iconColor: '#7C3AED'
        };
      case 'green':
        return {
          bg: 'bg-green-50',
          icon: 'bg-green-100',
          iconColor: '#059669'
        };
      default:
        return {
          bg: 'bg-gray-50',
          icon: 'bg-gray-100',
          iconColor: '#4B5563'
        };
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={{ margin: 0 }}
      animationIn="slideInUp"
      animationOut="slideOutDown"
    >
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
          <TouchableOpacity onPress={onClose}>
            <Feather name="x" size={24} color="#666" />
          </TouchableOpacity>
          <Text className="text-lg font-semibold">{title}</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView 
          className="flex-1 p-4"
          showsVerticalScrollIndicator={false}
        >
          {getTips().map((tip, index) => {
            const colors = getColorClass(tip.color);
            return (
              <View 
                key={index} 
                className={`${colors.bg} rounded-xl p-6 mb-4`}
              >
                <View className="flex-row items-start">
                  <View className={`${colors.icon} rounded-xl p-3 mr-4`}>
                    <Feather name={tip.icon as any} size={24} color={colors.iconColor} />
                  </View>
                  <View className="flex-1">
                    <Text className="text-xl font-bold text-gray-900 mb-2">
                      {tip.title}
                    </Text>
                    <Text className="text-gray-600 text-base mb-4">
                      {tip.description}
                    </Text>
                  </View>
                </View>

                <View className="ml-14">
                  {tip.details.map((detail, detailIndex) => (
                    <Text 
                      key={detailIndex} 
                      className={`text-gray-700 ${detail ? 'mb-1' : 'mb-3'}`}
                    >
                      {detail}
                    </Text>
                  ))}
                </View>
              </View>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

export default CareerTipsModal; 