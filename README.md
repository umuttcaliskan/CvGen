# CvGen - Profesyonel CV Oluşturma Uygulaması

CvGen, kullanıcıların kolayca profesyonel özgeçmişler oluşturmasını, düzenlemesini ve paylaşmasını sağlayan bir mobil uygulamadır. Modern ve kullanıcı dostu arayüzü ile CV oluşturma sürecini basitleştirir ve çeşitli şablonlar sunar.

![CvGen Logo](./assets/images/logo/cvgen.png)

## 🌟 Özellikler

- **Kolay CV Oluşturma**: Adım adım rehberlik ile hızlı ve kolay CV oluşturma
- **Çoklu Şablonlar**: Farklı iş pozisyonları için uyarlanmış profesyonel şablonlar
- **PDF Dışa Aktarma**: Oluşturulan CV'leri PDF formatında dışa aktarma ve paylaşma
- **Kullanıcı Hesapları**: CV'lerinizi kaydetmek ve yönetmek için kullanıcı hesapları
- **Kişiselleştirme**: CV'nizi kişiselleştirmek için geniş seçenekler:
  - Kişisel bilgiler
  - Eğitim geçmişi
  - İş deneyimi
  - Beceriler
  - Dil yetkinlikleri
  - Referanslar
  - Sosyal medya profilleri
  - Projeler
  - Sertifikalar
- **Kariyer İpuçları**: CV'nizi geliştirmek için profesyonel ipuçları
- **Blog**: Kariyer gelişimi hakkında bilgilendirici makaleler

## 📱 Desteklenen Platformlar

- iOS
- Android

## 🚀 Başlangıç

### Ön Koşullar

- Node.js (v14 veya üzeri)
- npm veya yarn
- Expo CLI
- iOS için Xcode (iOS geliştirmesi için)
- Android için Android Studio (Android geliştirmesi için)

### Kurulum

1. Repoyu klonlayın:
   ```bash
   git clone https://github.com/kullaniciadi/cvgen.git
   cd cvgen
   ```

2. Bağımlılıkları yükleyin:
   ```bash
   npm install
   # veya
   yarn install
   ```

3. Firebase yapılandırması:
   - `config.example.js` dosyasını `config.js` olarak kopyalayın
   - Firebase projesi oluşturun ve kimlik bilgilerinizi `config.js` dosyasına ekleyin

4. Uygulamayı başlatın:
   ```bash
   npm start
   # veya
   yarn start
   ```

## 🛠️ Geliştirme

### Proje Yapısı

```
cvgen/
├── app/                    # Expo Router tabanlı uygulama ekranları
│   ├── (auth)/             # Kimlik doğrulama ekranları
│   ├── (screens)/          # Diğer ekranlar
│   └── (tabs)/             # Ana sekme ekranları
├── assets/                 # Resimler, fontlar ve diğer statik dosyalar
├── components/             # Yeniden kullanılabilir bileşenler
├── context/                # React Context API ile durum yönetimi
├── hooks/                  # Özel React hooks
├── lib/                    # Yardımcı kütüphaneler
├── utils/                  # Yardımcı fonksiyonlar
└── ...
```

### Kullanılan Teknolojiler

- **React Native**: Mobil uygulama geliştirme
- **Expo**: Geliştirme araçları ve kütüphaneleri
- **Firebase**: Kimlik doğrulama ve veritabanı
- **NativeWind**: Tailwind CSS benzeri stil sistemi
- **Expo Router**: Navigasyon sistemi

## 📄 Lisans

Bu proje [MIT Lisansı](LICENSE) altında lisanslanmıştır.

## 📞 İletişim

Sorularınız veya geri bildirimleriniz için:
- Email: [destek@cvgen.com.tr](mailto:destek@cvgen.com.tr)
- Web: [www.cvgen.com.tr](https://www.cvgen.com)

---

Geliştirici: Umut Çalışkan (https://github.com/umuttcaliskan) 