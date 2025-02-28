export const crystalClearTemplate = {
  id: 'crystalClear',
  name: 'Kristal Netlik',
  styles: {
    fontFamily: 'Montserrat, sans-serif',
    backgroundColor: '#ffffff',
    primaryColor: '#3a86ff',
    secondaryColor: '#f0f7ff'
  },
  generateHTML: (cv: any, profileImageBase64: string | null) => `
    <!DOCTYPE html>
    <html lang="tr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${cv.personal?.fullName || 'CV'}</title>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet">
      <style>
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        
        body {
          font-family: 'Montserrat', sans-serif;
          background-color: #f8fafc;
          color: #333;
          line-height: 1.6;
          margin: 0;
          padding: 20px;
        }
        
        .container {
          max-width: 210mm;
          margin: 0 auto;
          background: white;
          box-shadow: 0 10px 30px rgba(58, 134, 255, 0.1);
          border-radius: 12px;
          overflow: hidden;
          position: relative;
        }
        
        .header {
          position: relative;
          padding: 40px 50px;
          background: linear-gradient(135deg, #3a86ff 0%, #63a4ff 100%);
          color: white;
          border-bottom: 3px solid rgba(255, 255, 255, 0.2);
        }
        
        .header-content {
          display: flex;
          align-items: center;
          position: relative;
          z-index: 2;
        }
        
        .name-title {
          flex: 1;
        }
        
        .profile-image-container {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          border: 4px solid rgba(255, 255, 255, 0.8);
          overflow: hidden;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          margin-right: 30px;
          background: white;
        }
        
        .profile-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .profile-initial {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 48px;
          font-weight: 600;
          color: #3a86ff;
          background: white;
        }
        
        .header h1 {
          font-size: 36px;
          font-weight: 700;
          margin-bottom: 10px;
          letter-spacing: 0.5px;
        }
        
        .header h2 {
          font-size: 20px;
          font-weight: 400;
          opacity: 0.95;
          margin-bottom: 15px;
        }
        
        .header-pattern {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          opacity: 0.05;
          background: 
            linear-gradient(45deg, transparent 48%, white 49%, white 51%, transparent 52%) 0 0/20px 20px,
            linear-gradient(-45deg, transparent 48%, white 49%, white 51%, transparent 52%) 0 0/20px 20px;
          z-index: 1;
        }
        
        .content {
          display: flex;
          background: white;
        }
        
        .left-column {
          width: 35%;
          background: #f0f7ff;
          padding: 30px;
        }
        
        .right-column {
          width: 65%;
          padding: 30px 40px;
        }
        
        .section {
          margin-bottom: 30px;
          position: relative;
        }
        
        .section:last-child {
          margin-bottom: 0;
        }
        
        .section-title {
          font-size: 18px;
          font-weight: 600;
          color: #3a86ff;
          margin-bottom: 15px;
          padding-bottom: 8px;
          border-bottom: 2px solid #d4e5ff;
          position: relative;
        }
        
        .section-title::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -2px;
          width: 40px;
          height: 2px;
          background: #3a86ff;
        }
        
        .about-text {
          font-size: 14px;
          line-height: 1.7;
          color: #444;
          margin-bottom: 20px;
        }
        
        .info-item {
          margin-bottom: 12px;
          display: flex;
          align-items: flex-start;
        }
        
        .info-icon {
          color: #3a86ff;
          width: 20px;
          margin-right: 10px;
          font-size: 14px;
        }
        
        .info-content {
          flex: 1;
          font-size: 14px;
          line-height: 1.5;
        }
        
        .info-label {
          font-weight: 500;
          display: block;
          color: #555;
          margin-bottom: 2px;
        }
        
        .info-value {
          color: #333;
        }
        
        .skills-list {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        
        .skill-item {
          background: white;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 500;
          color: #3a86ff;
          border: 1px solid #d4e5ff;
        }
        
        .languages-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .language-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        
        .language-name {
          font-weight: 500;
          font-size: 14px;
        }
        
        .language-level {
          font-size: 13px;
          color: #3a86ff;
          font-weight: 500;
        }
        
        .timeline-item {
          margin-bottom: 25px;
          position: relative;
          padding-left: 20px;
          border-left: 2px solid #d4e5ff;
        }
        
        .timeline-item:last-child {
          margin-bottom: 0;
        }
        
        .timeline-item::before {
          content: '';
          position: absolute;
          left: -6px;
          top: 0;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #3a86ff;
          border: 2px solid white;
        }
        
        .timeline-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 8px;
        }
        
        .timeline-title {
          font-weight: 600;
          font-size: 16px;
          color: #333;
          margin: 0;
        }
        
        .timeline-subtitle {
          font-size: 14px;
          color: #555;
          margin-bottom: 5px;
        }
        
        .timeline-period {
          font-size: 13px;
          color: #3a86ff;
          font-weight: 500;
          white-space: nowrap;
        }
        
        .timeline-content {
          font-size: 14px;
          color: #555;
          line-height: 1.6;
        }
        
        .education-grid, .certificate-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-gap: 20px;
        }
        
        .education-item, .certificate-item {
          background: #f8fafc;
          border-radius: 8px;
          padding: 15px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .education-item:hover, .certificate-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
        }
        
        .education-title, .certificate-title {
          font-weight: 600;
          font-size: 15px;
          color: #333;
          margin-bottom: 5px;
        }
        
        .education-subtitle, .certificate-issuer {
          font-size: 14px;
          color: #555;
          margin-bottom: 5px;
        }
        
        .education-period, .certificate-date {
          font-size: 13px;
          color: #3a86ff;
          font-weight: 500;
        }
        
        .references-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          grid-gap: 20px;
        }
        
        .reference-item {
          background: #f8fafc;
          border-radius: 8px;
          padding: 15px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
        }
        
        .reference-name {
          font-weight: 600;
          font-size: 15px;
          color: #333;
          margin-bottom: 5px;
        }
        
        .reference-title {
          font-size: 14px;
          color: #555;
          margin-bottom: 2px;
        }
        
        .reference-company {
          font-size: 14px;
          color: #666;
          margin-bottom: 8px;
        }
        
        .reference-contact {
          font-size: 13px;
          color: #444;
        }
        
        .reference-contact div {
          margin-bottom: 3px;
        }
        
        .social-links {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        
        .social-link {
          display: inline-flex;
          align-items: center;
          background: white;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 13px;
          color: #3a86ff;
          border: 1px solid #d4e5ff;
          text-decoration: none;
        }
        
        .social-link i {
          margin-right: 5px;
        }
        
        @media print {
          body {
            margin: 0;
            padding: 0;
            background: white;
          }
          
          .container {
            width: 100%;
            max-width: 100%;
            box-shadow: none;
            margin: 0;
            border-radius: 0;
          }
          
          .header {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .left-column {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .timeline-item::before {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .section-title::after {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .section {
            page-break-inside: avoid;
          }
          
          .content {
            display: flex !important;
          }
          
          .timeline-item, .education-item, .certificate-item, .reference-item {
            page-break-inside: avoid;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="header-pattern"></div>
          <div class="header-content">
            <div class="profile-image-container">
              ${profileImageBase64 ? 
                `<img src="${profileImageBase64}" class="profile-image" alt="Profile">` : 
                `<div class="profile-initial">${cv.personal?.fullName?.charAt(0).toUpperCase() || 'U'}</div>`
              }
            </div>
            <div class="name-title">
              <h1>${cv.personal?.fullName || 'AD SOYAD'}</h1>
              <h2>${cv.experience?.[0]?.position || 'MESLEK / POZİSYON'}</h2>
            </div>
          </div>
        </div>
        
        <div class="content">
          <div class="left-column">
            <!-- Kişisel Bilgiler -->
            <div class="section">
              <h3 class="section-title">Kişisel Bilgiler</h3>
              
              ${cv.personal?.email ? `
              <div class="info-item">
                <div class="info-icon">✉</div>
                <div class="info-content">
                  <span class="info-label">E-posta</span>
                  <span class="info-value">${cv.personal.email}</span>
                </div>
              </div>` : ''}
              
              ${cv.personal?.phone ? `
              <div class="info-item">
                <div class="info-icon">☎</div>
                <div class="info-content">
                  <span class="info-label">Telefon</span>
                  <span class="info-value">${cv.personal.phone}</span>
                </div>
              </div>` : ''}
              
              ${cv.personal?.address ? `
              <div class="info-item">
                <div class="info-icon">🏠</div>
                <div class="info-content">
                  <span class="info-label">Adres</span>
                  <span class="info-value">${cv.personal.address}</span>
                </div>
              </div>` : ''}
              
              ${cv.personal?.birthDate ? `
              <div class="info-item">
                <div class="info-icon">📅</div>
                <div class="info-content">
                  <span class="info-label">Doğum Tarihi</span>
                  <span class="info-value">${cv.personal.birthDate}</span>
                </div>
              </div>` : ''}
              
              ${cv.personal?.drivingLicense ? `
              <div class="info-item">
                <div class="info-icon">🚗</div>
                <div class="info-content">
                  <span class="info-label">Ehliyet</span>
                  <span class="info-value">${cv.personal.drivingLicense}</span>
                </div>
              </div>` : ''}
              
              ${cv.personal?.maritalStatus ? `
              <div class="info-item">
                <div class="info-icon">💍</div>
                <div class="info-content">
                  <span class="info-label">Medeni Durum</span>
                  <span class="info-value">${cv.personal.maritalStatus}</span>
                </div>
              </div>` : ''}
              
              ${cv.personal?.militaryStatus ? `
              <div class="info-item">
                <div class="info-icon">🪖</div>
                <div class="info-content">
                  <span class="info-label">Askerlik Durumu</span>
                  <span class="info-value">${cv.personal.militaryStatus}</span>
                </div>
              </div>` : ''}
              
              ${cv.personal?.nationality ? `
              <div class="info-item">
                <div class="info-icon">🌍</div>
                <div class="info-content">
                  <span class="info-label">Uyruk</span>
                  <span class="info-value">${cv.personal.nationality}</span>
                </div>
              </div>` : ''}
            </div>
            
            <!-- Beceriler -->
            ${cv.skills && cv.skills.length > 0 ? `
            <div class="section">
              <h3 class="section-title">Beceriler</h3>
              <div class="skills-list">
                ${cv.skills.map((skill: any) => `
                  <div class="skill-item">${skill.name}</div>
                `).join('')}
              </div>
            </div>` : ''}
            
            <!-- Diller -->
            ${cv.languages && cv.languages.length > 0 ? `
            <div class="section">
              <h3 class="section-title">Diller</h3>
              <div class="languages-list">
                ${cv.languages.map((language: any) => `
                  <div class="language-item">
                    <div class="language-name">${language.name}</div>
                    <div class="language-level">${language.level}</div>
                  </div>
                `).join('')}
              </div>
            </div>` : ''}
            
            <!-- Sosyal Medya -->
            ${cv.socialMedia && cv.socialMedia.length > 0 ? `
            <div class="section">
              <h3 class="section-title">Sosyal Medya</h3>
              <div class="social-links">
                ${cv.socialMedia.map((social: any) => `
                  <a href="${social.url}" class="social-link" target="_blank">
                    ${getPlatformName(social.platform)}${social.username ? `: ${social.username}` : ''}
                  </a>
                `).join('')}
              </div>
            </div>` : ''}
            
            <!-- Referanslar -->
            ${cv.references && cv.references.length > 0 ? `
            <div class="section">
              <h3 class="section-title">Referanslar</h3>
              <div class="references-list" style="display: flex; flex-direction: column; gap: 12px;">
                ${cv.references.map((ref: any) => `
                  <div class="reference-item" style="background: white; padding: 10px; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                    <div class="reference-name" style="font-weight: 600; margin-bottom: 3px;">${ref.fullName || ref.name || 'İsim'}</div>
                    <div class="reference-title" style="font-size: 13px; color: #555;">${ref.position || 'Pozisyon'}</div>
                    <div class="reference-company" style="font-size: 13px; color: #666; margin-bottom: 6px;">${ref.company || ''}</div>
                    ${ref.email ? `<div style="font-size: 12px;">E-posta: ${ref.email}</div>` : ''}
                    ${ref.phone ? `<div style="font-size: 12px;">Telefon: ${ref.phone}</div>` : ''}
                  </div>
                `).join('')}
              </div>
            </div>` : ''}
          </div>
          
          <div class="right-column">
            <!-- Hakkında -->
            ${cv.about ? `
            <div class="section">
              <h3 class="section-title">Hakkımda</h3>
              <div class="about-text">${cv.about}</div>
            </div>` : ''}
            
            <!-- İş Deneyimi -->
            ${cv.experience && cv.experience.length > 0 ? `
            <div class="section">
              <h3 class="section-title">İş Deneyimi</h3>
              <div class="timeline">
                ${cv.experience.map((exp: any) => `
                  <div class="timeline-item">
                    <div class="timeline-header">
                      <div>
                        <h4 class="timeline-title">${exp.position}</h4>
                        <div class="timeline-subtitle">${exp.company}</div>
                      </div>
                      <div class="timeline-period">${exp.startDate} - ${exp.endDate || 'Devam Ediyor'}</div>
                    </div>
                    <div class="timeline-content">${exp.description || ''}</div>
                  </div>
                `).join('')}
              </div>
            </div>` : ''}
            
            <!-- Eğitim -->
            ${cv.education && cv.education.length > 0 ? `
            <div class="section">
              <h3 class="section-title">Eğitim</h3>
              <div class="education-grid">
                ${cv.education.map((edu: any) => `
                  <div class="education-item">
                    <div class="education-title">${edu.department || edu.degree || 'Bölüm'}</div>
                    <div class="education-subtitle">${edu.schoolName || edu.school || 'Okul'}</div>
                    <div class="education-period">${edu.startDate || ''} - ${edu.endDate || 'Devam Ediyor'}</div>
                  </div>
                `).join('')}
              </div>
            </div>` : ''}
            
            <!-- Sertifikalar -->
            ${cv.certificates && cv.certificates.length > 0 ? `
            <div class="section">
              <h3 class="section-title">Sertifikalar</h3>
              <div class="certificate-grid">
                ${cv.certificates.map((cert: any) => `
                  <div class="certificate-item">
                    <div class="certificate-title">${cert.name || cert.title || 'Sertifika'}</div>
                    <div class="certificate-issuer">${cert.institution || cert.issuer || ''}</div>
                    <div class="certificate-date">${cert.date || ''}</div>
                  </div>
                `).join('')}
              </div>
            </div>` : ''}
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

// Platform için simge alma yardımcı fonksiyonu
function getPlatformIcon(platform: string): string {
  const platform_lc = platform.toLowerCase();
  if (platform_lc.includes('linkedin')) return '💼';
  if (platform_lc.includes('github')) return '💻';
  if (platform_lc.includes('twitter') || platform_lc.includes('x')) return '🐦';
  if (platform_lc.includes('facebook')) return '📘';
  if (platform_lc.includes('instagram')) return '📷';
  if (platform_lc.includes('youtube')) return '🎬';
  if (platform_lc.includes('medium')) return '📝';
  if (platform_lc.includes('stackoverflow')) return '🔍';
  if (platform_lc.includes('behance')) return '🎨';
  if (platform_lc.includes('dribbble')) return '🏀';
  if (platform_lc.includes('pinterest')) return '📌';
  if (platform_lc.includes('website')) return '🌐';
  
  return '🔗';
} 