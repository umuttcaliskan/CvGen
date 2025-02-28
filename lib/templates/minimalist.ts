export const minimalistTemplate = {
  id: 'minimalist',
  name: 'Minimalist',
  styles: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#ffffff',
    primaryColor: '#8B7355',
    secondaryColor: '#4A4A4A'
  },
  generateHTML: (cv: any, profileImageBase64: string | null) => `
    <!DOCTYPE html>
    <html lang="tr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${cv.personal?.fullName || 'CV'}</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                font-family: Arial, sans-serif;
            }
            
            body {
                background-color: #f5f5f5;
                color: #333;
                line-height: 1.6;
                min-height: 100vh;
            }
            
            .container {
                max-width: 800px;
                margin: 0 auto;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                position: relative;
                min-height: 100vh;
                background-color: white;
            }
            
            .content-wrapper {
                display: flex;
                position: relative;
                min-height: 100vh;
            }
            
            /* Sol kolon sabit arka planı - Tam yükseklik */
            .left-column-bg {
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                width: 300px;
                background-color: #4A4A4A;
                min-height: 100vh;
                z-index: 0;
            }
            
            .left-column {
                width: 300px;
                color: white;
                padding: 40px;
                position: relative;
                z-index: 1;
                min-height: 100vh;
                background-color: transparent;  /* Arkaplanı transparan yap */
            }
            
            .right-column {
                width: calc(100% - 300px);
                background-color: white;
                padding: 40px;
                position: relative;
                z-index: 1;
                min-height: 100vh;
            }
            
            .profile-section {
                text-align: center;
                margin-bottom: 30px;
            }
            
            .profile-image {
                width: 200px;
                height: 200px;
                border-radius: 50%;
                object-fit: cover;
                border: 5px solid #8B7355;
                margin: 0 auto;
                display: block;
            }
            
            .profile-initial {
                width: 200px;
                height: 200px;
                border-radius: 50%;
                background-color: #8B7355;
                color: white;
                font-size: 64px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 20px;
            }
            
            .section {
                margin-bottom: 30px;
            }
            
            .section-title {
                color: #fff;
                margin-bottom: 15px;
                font-size: 20px;
                text-transform: uppercase;
                border-bottom: 2px solid #8B7355;
                padding-bottom: 5px;
            }
            
            .info-item {
                margin: 10px 0;
                display: flex;
                align-items: center;
            }
            
            .info-item i {
                width: 20px;
                margin-right: 10px;
                color: #8B7355;
            }
            
            .skill-item, .language-item {
                margin-bottom: 10px;
            }
            
            .skill-name, .language-name {
                margin: 0;
                font-size: 16px;
                font-weight: bold;
            }
            
            .skill-level, .language-level {
                margin: 2px 0;
                font-size: 14px;
                color: #ccc;
            }
            
            .reference-item {
                margin-bottom: 15px;
                page-break-inside: avoid;
                break-inside: avoid;
            }
            
            .reference-name {
                margin: 0;
                font-size: 16px;
                font-weight: bold;
            }
            
            .reference-details {
                margin: 2px 0;
                font-size: 14px;
            }
            
            .right-title {
                color: #8B7355;
                margin-bottom: 15px;
                font-size: 20px;
                text-transform: uppercase;
                border-bottom: 2px solid #8B7355;
                padding-bottom: 5px;
            }
            
            .right-section {
                margin-bottom: 30px;
                page-break-inside: avoid;
                break-inside: avoid;
            }
            
            .name-title {
                margin-bottom: 30px;
                page-break-inside: avoid;
                break-inside: avoid;
            }
            
            .full-name {
                color: #8B7355;
                margin: 0;
                font-size: 32px;
                text-transform: uppercase;
            }
            
            .position {
                color: #8B7355;
                margin: 5px 0 20px;
                font-size: 20px;
            }
            
            .experience-item {
                margin-bottom: 20px;
                page-break-inside: avoid;
                break-inside: avoid;
            }
            
            .experience-position {
                color: #8B7355;
                margin: 0;
                font-size: 18px;
                font-weight: bold;
            }
            
            .experience-company {
                color: #4A4A4A;
                margin: 5px 0;
                font-size: 16px;
            }
            
            .experience-date {
                color: #666;
                margin: 2px 0;
                font-size: 14px;
            }
            
            .experience-description {
                margin: 5px 0;
                line-height: 1.5;
                color: #555;
            }
            
            .education-item, .certificate-item, .project-item {
                margin-bottom: 15px;
                page-break-inside: avoid;
                break-inside: avoid;
            }
            
            .education-school, .certificate-name, .project-name {
                color: #8B7355;
                margin: 0;
                font-size: 18px;
                font-weight: bold;
            }
            
            .education-dept, .certificate-institution {
                color: #4A4A4A;
                margin: 5px 0;
                font-size: 16px;
            }
            
            .education-date, .certificate-date, .project-date {
                color: #666;
                margin: 2px 0;
                font-size: 14px;
            }
            
            .project-description, .project-tech {
                margin: 5px 0;
                font-size: 14px;
                color: #555;
            }
            
            .project-link {
                margin: 5px 0;
            }
            
            .project-link a {
                color: #8B7355;
                text-decoration: none;
            }
            
            .social-item {
                margin: 8px 0;
                display: flex;
                align-items: center;
            }
            
            .social-item i {
                width: 20px;
                margin-right: 10px;
                color: #8B7355;
            }
            
            .social-item a {
                color: white;
                text-decoration: none;
            }
            
            /* Eğitim ve sertifika grid düzeni */
            .education-grid, .certificate-grid {
                display: flex;
                flex-wrap: wrap;
                margin: 0 -10px; /* Negatif margin ile taşma sağlama */
            }
            
            .education-item, .certificate-item {
                flex: 0 0 calc(50% - 20px); /* Genişliğin yarısı ve padding için hesaplama */
                margin: 0 10px 20px 10px;
                box-sizing: border-box;
            }
            
            /* Mobil cihazlar için tek sütun */
            @media (max-width: 600px) {
                .education-item, .certificate-item {
                    flex: 0 0 calc(100% - 20px);
                }
            }
            
            /* Sayfa geçişlerinde düzenleme */
            @page {
                margin: 0; /* Sayfa marjını sıfırla */
            }
            
            @media print {
                body {
                    -webkit-print-color-adjust: exact;
                    print-color-adjust: exact;
                    background-color: white;
                }
                
                .container {
                    box-shadow: none;
                    width: 100%;
                    max-width: none;
                    min-height: auto;
                }
                
                .content-wrapper {
                    min-height: auto;
                }
                
                /* Bölümlerin bölünmesine izin ver */
                .section, .right-section {
                    page-break-inside: auto;
                    break-inside: auto;
                }
                
                /* Başlıklar sonrasında sayfa kesimi olmasın */
                .right-title, .section-title {
                    page-break-after: avoid;
                }
                
                /* Her bir öğenin kendi içinde bölünmemesini sağla */
                .experience-item, .education-item, .certificate-item, .project-item, .reference-item, .skill-item, .language-item {
                    page-break-inside: avoid;
                    break-inside: avoid;
                }
                
                /* Sol kolon yazdırma ayarı - Her sayfada görünmesi için */
                .left-column-bg {
                    position: fixed;
                    height: 100%;
                    min-height: 100%;
                    top: 0;
                    left: 0;
                    -webkit-print-color-adjust: exact;
                    print-color-adjust: exact;
                }
                
                .left-column {
                    background-color: transparent;
                }
                
                .right-column {
                    background-color: white;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <!-- Sol kolon arka planı -->
            <div class="left-column-bg"></div>
            
            <div class="content-wrapper">
                <div class="left-column">
                    <div class="profile-section">
                        ${profileImageBase64 ? `
                            <img src="${profileImageBase64}" alt="Profil Fotoğrafı" class="profile-image" />
                        ` : `
                            <div class="profile-initial">
                                ${cv.personal?.fullName?.charAt(0).toUpperCase() || 'U'}
                            </div>
                        `}
                    </div>

                    <h2 class="section-title">KİŞİSEL BİLGİLER</h2>
            
                    <div class="contact-info">
                        ${cv.personal?.address ? `
                            <div class="info-item">
                                <i class="fas fa-map-marker-alt">📍</i> ${cv.personal.address}
                            </div>
                        ` : ''}
                        
                        ${cv.personal?.phone ? `
                            <div class="info-item">
                                <i class="fas fa-phone">📱</i> ${cv.personal.phone}
                            </div>
                        ` : ''}
                        
                        ${cv.personal?.email ? `
                            <div class="info-item">
                                <i class="fas fa-envelope">📧</i> ${cv.personal.email}
                            </div>
                        ` : ''}
                        
                        ${cv.personal?.birthDate ? `
                            <div class="info-item">
                                <i class="fas fa-calendar">📅</i> ${cv.personal.birthDate}
                            </div>
                        ` : ''}
                        
                        ${cv.personal?.drivingLicense ? `
                            <div class="info-item">
                                <i class="fas fa-id-card">🚗</i> ${cv.personal.drivingLicense}
                            </div>
                        ` : ''}
                        
                        ${cv.personal?.maritalStatus ? `
                            <div class="info-item">
                                <i class="fas fa-ring">💍</i> ${cv.personal.maritalStatus}
                            </div>
                        ` : ''}
                        
                        ${cv.personal?.militaryStatus ? `
                            <div class="info-item">
                                <i class="fas fa-shield-alt">🪖</i> ${cv.personal.militaryStatus}
                            </div>
                        ` : ''}
                        
                        ${cv.personal?.nationality ? `
                            <div class="info-item">
                                <i class="fas fa-flag">🏳️</i> ${cv.personal.nationality}
                            </div>
                        ` : ''}
                    </div>
            
                    ${cv.socialMedia?.length > 0 ? `
                        <div class="section">
                            <h2 class="section-title">Sosyal Medya</h2>
                            ${cv.socialMedia.map((social: any) => `
                                <div class="social-item">
                                    <i class="fab fa-${social.platform.toLowerCase()}">🔗</i>
                                    <a href="${social.url}" target="_blank">${getPlatformName(social.platform)}: ${social.username}</a>
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
            
                    ${cv.languages?.length > 0 ? `
                        <div class="section">
                            <h2 class="section-title">Yabancı Dil</h2>
                            ${cv.languages.map((lang: any) => `
                                <div class="language-item">
                                    <h3 class="language-name">${lang.name}</h3>
                                    <p class="language-level">${lang.level}</p>
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
            
                    ${cv.skills?.length > 0 ? `
                        <div class="section">
                            <h2 class="section-title">Beceriler</h2>
                            ${cv.skills.map((skill: any) => `
                                <div class="skill-item">
                                    <h3 class="skill-name">${skill.name}</h3>
                                    <p class="skill-level">${skill.level}</p>
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
            
                    ${cv.references?.length > 0 ? `
                        <div class="section">
                            <h2 class="section-title">Referanslar</h2>
                            ${cv.references.map((ref: any) => `
                                <div class="reference-item">
                                    <h3 class="reference-name">${ref.fullName}</h3>
                                    <p class="reference-details">${ref.position} - ${ref.company}</p>
                                    <p class="reference-details">📱 ${ref.phone}</p>
                                    <p class="reference-details">📧 ${ref.email}</p>
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
            
                <div class="right-column">
                    <div class="name-title">
                        <h1 class="full-name">${cv.personal?.fullName || 'Ad Soyad'}</h1>
                        ${cv.experience?.[0] ? `
                            <h2 class="position">${cv.experience[0].position || 'Pozisyon'}</h2>
                        ` : ''}
                    </div>
            
                    ${cv.about ? `
                        <div class="right-section">
                            <h2 class="right-title">Hakkımda</h2>
                            <p style="line-height: 1.5;">${cv.about}</p>
                        </div>
                    ` : ''}
                    
                    ${cv.education?.length > 0 ? `
                        <div class="right-section">
                            <h2 class="right-title">Eğitim</h2>
                            <div class="education-grid">
                                ${cv.education.map((edu: any) => `
                                    <div class="education-item">
                                        <h3 class="education-school">${edu.schoolName}</h3>
                                        <h4 class="education-dept">${edu.department}</h4>
                                        <p class="education-date">${edu.startDate} - ${edu.endDate}</p>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
            
                    ${cv.experience?.length > 0 ? `
                        <div class="right-section">
                            <h2 class="right-title">İş Geçmişi</h2>
                            ${cv.experience.map((exp: any) => `
                                <div class="experience-item">
                                    <h3 class="experience-position">${exp.position}</h3>
                                    <h4 class="experience-company">${exp.companyName}</h4>
                                    <p class="experience-date">${exp.startDate} - ${exp.endDate}</p>
                                    <p class="experience-description">${exp.description}</p>
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
            
                    ${cv.projects?.length > 0 ? `
                        <div class="right-section">
                            <h2 class="right-title">Projeler</h2>
                            ${cv.projects.map((project: any) => `
                                <div class="project-item">
                                    <h3 class="project-name">${project.name}</h3>
                                    <p class="project-date">${project.startDate || ''} ${project.startDate && project.endDate ? '-' : ''} ${project.endDate || ''}</p>
                                    ${project.description ? `<p class="project-description">${project.description}</p>` : ''}
                                    ${project.technologies ? `<p class="project-tech"><strong>Teknolojiler:</strong> ${project.technologies}</p>` : ''}
                                    ${project.projectUrl ? `
                                        <p class="project-link"><a href="${project.projectUrl}" target="_blank">Proje Bağlantısı →</a></p>
                                    ` : ''}
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
            
                    ${cv.certificates?.length > 0 ? `
                        <div class="right-section">
                            <h2 class="right-title">Sertifikalar</h2>
                            <div class="certificate-grid">
                                ${cv.certificates.map((cert: any) => `
                                    <div class="certificate-item">
                                        <h3 class="certificate-name">${cert.name}</h3>
                                        <h4 class="certificate-institution">${cert.institution}</h4>
                                        <p class="certificate-date">${cert.date}</p>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                </div>
            </div>
        </div>
    </body>
    </html>
  `
}; 

// Sosyal medya platformu adını düzgün formatta almak için yardımcı fonksiyon
function getPlatformName(platform: string): string {
  const platform_lc = platform.toLowerCase();
  if (platform_lc.includes('linkedin')) return 'LinkedIn';
  if (platform_lc.includes('github')) return 'GitHub';
  if (platform_lc.includes('twitter')) return 'Twitter';
  if (platform_lc.includes('x')) return 'X';
  if (platform_lc.includes('facebook')) return 'Facebook';
  if (platform_lc.includes('instagram')) return 'Instagram';
  if (platform_lc.includes('youtube')) return 'YouTube';
  if (platform_lc.includes('medium')) return 'Medium';
  if (platform_lc.includes('stackoverflow')) return 'Stack Overflow';
  if (platform_lc.includes('behance')) return 'Behance';
  if (platform_lc.includes('dribbble')) return 'Dribbble';
  if (platform_lc.includes('pinterest')) return 'Pinterest';
  if (platform_lc.includes('website')) return 'Web Sitesi';
  
  // Platform adı bulunamadıysa, girilenin ilk harfini büyük yaparak göster
  return platform.charAt(0).toUpperCase() + platform.slice(1);
}