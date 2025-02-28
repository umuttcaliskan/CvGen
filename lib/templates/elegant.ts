export const elegantTemplate = {
  id: 'elegant',
  name: 'Elegant',
  styles: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#ffffff',
    primaryColor: '#1e3a8a',
    secondaryColor: '#64748b'
  },
  generateHTML: (cv: any, profileImageBase64: string | null) => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>${cv.personal?.fullName || 'CV'}</title>
      <style>
        @page {
          margin: 0;
          size: A4;
        }
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          color: #1f2937;
          display: flex;
          min-height: 100vh;
        }
        /* Sayfa başı için margin tanımı */
        @page {
          margin-top: 30px;
        }
        .container {
          display: flex;
          width: 100%;
        }
        .sidebar {
          width: 35%;
          background: #1e3a8a;
          color: white;
          padding: 40px 20px;
          min-height: 100vh;
        }
        .sidebar-content {
          position: sticky;
          top: 40px;
        }
        .section {
          break-inside: avoid;
          page-break-inside: avoid;
        }
        .profile-section {
          text-align: center;
          margin-bottom: 40px;
          break-inside: avoid;
          page-break-inside: avoid;
        }
        .profile-image {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          border: 4px solid white;
          margin: 0 auto 20px;
          object-fit: cover;
        }
        .profile-initial {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          border: 4px solid white;
          margin: 0 auto 20px;
          background: #2563eb;
          color: white;
          font-size: 64px;
          line-height: 150px;
          text-align: center;
        }
        .section-title {
          font-size: 20px;
          font-weight: bold;
          margin: 30px 0 15px;
          padding-bottom: 10px;
          border-bottom: 2px solid white;
        }
        .content {
          width: 65%;
          padding: 60px 40px 40px;
        }
        /* Sayfa kırılması sonrası içerik */
        .content > div {
          margin-top: 20px;
        }
        .content-section {
          margin-bottom: 30px;
          break-inside: avoid;
          page-break-inside: avoid;
          padding-top: 20px; /* Her bölümün üstüne padding ekle */
        }
        .content-section:first-child {
          padding-top: 0; /* İlk bölümde fazladan padding olmasın */
        }
        /* Yeni sayfada başlayan bölümler için */
        .content-section[style*="page-break-before"] {
          padding-top: 40px;
        }
        .content-title {
          font-size: 24px;
          color: #1e3a8a;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 2px solid #1e3a8a;
        }
        .experience-item, .education-item {
          margin-bottom: 20px;
          break-inside: avoid;
          page-break-inside: avoid;
        }
        .item-title {
          font-size: 18px;
          font-weight: bold;
          color: #1e3a8a;
          margin-bottom: 5px;
        }
        .item-subtitle {
          font-size: 16px;
          color: #64748b;
          margin-bottom: 5px;
        }
        .item-date {
          font-size: 14px;
          color: #64748b;
          margin-bottom: 10px;
        }
        .contact-info {
          margin-top: 20px;
          font-size: 14px;
        }
        .contact-item {
          margin: 10px 0;
          display: flex;
          align-items: center;
        }
        .skills-bar {
          background: rgba(255, 255, 255, 0.2);
          height: 6px;
          border-radius: 3px;
          margin: 8px 0 15px;
        }
        .skills-bar .fill {
          background: white;
          height: 100%;
          border-radius: 3px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="sidebar">
          <div class="sidebar-content">
            <div class="profile-section">
              ${profileImageBase64 ? 
                `<img src="${profileImageBase64}" class="profile-image" alt="Profile">` : 
                `<div class="profile-initial">${cv.personal?.fullName?.charAt(0).toUpperCase() || 'U'}</div>`
              }
              <h1 style="font-size: 24px; margin: 0;">${cv.personal?.fullName || 'İsimsiz'}</h1>
              ${cv.experience?.[0]?.position ? 
                `<p style="color: #e2e8f0; margin: 10px 0;">${cv.experience[0].position}</p>` : ''
              }
            </div>

            <div class="section">
              <h2 class="section-title">İletişim</h2>
              <div class="contact-info">
                ${cv.personal?.email ? `<div class="contact-item">📧 ${cv.personal.email}</div>` : ''}
                ${cv.personal?.phone ? `<div class="contact-item">📱 ${cv.personal.phone}</div>` : ''}
                ${cv.personal?.address ? `<div class="contact-item">📍 ${cv.personal.address}</div>` : ''}
                ${cv.personal?.birthDate ? `<div class="contact-item">🎂 ${cv.personal.birthDate}</div>` : ''}
                ${cv.personal?.drivingLicense ? `<div class="contact-item">🚗 ${cv.personal.drivingLicense}</div>` : ''}
                ${cv.personal?.maritalStatus ? `<div class="contact-item">💍 ${cv.personal.maritalStatus}</div>` : ''}
                ${cv.personal?.militaryStatus ? `<div class="contact-item">🛡️ ${cv.personal.militaryStatus}</div>` : ''}
              </div>
            </div>

            ${cv.socialMedia?.length > 0 ? `
              <div class="section">
                <h2 class="section-title">Sosyal Medya</h2>
                <div class="contact-info">
                  ${cv.socialMedia.map((social: any) => `
                    <div class="contact-item">🔗 ${getPlatformName(social.platform)}: ${social.username}</div>
                  `).join('')}
                </div>
              </div>
            ` : ''}

            ${cv.skills?.length > 0 ? `
              <div class="section">
                <h2 class="section-title">Beceriler</h2>
                ${cv.skills.map((skill: any) => `
                  <div style="margin-bottom: 15px;">
                    <div style="display: flex; justify-content: space-between;">
                      <span>${skill.name}</span>
                      <span>${skill.level}</span>
                    </div>
                    <div class="skills-bar">
                      <div class="fill" style="width: ${
                        skill.level === 'Başlangıç' ? '25%' :
                        skill.level === 'Orta' ? '50%' :
                        skill.level === 'İleri' ? '75%' :
                        '100%'
                      };"></div>
                    </div>
                  </div>
                `).join('')}
              </div>
            ` : ''}

            ${cv.languages?.length > 0 ? `
              <div class="section">
                <h2 class="section-title">Yabancı Diller</h2>
                <div style="break-inside: avoid; page-break-inside: avoid;">
                ${cv.languages.map((lang: any) => `
                  <div style="margin-bottom: 15px; break-inside: avoid; page-break-inside: avoid;">
                    <div style="display: flex; justify-content: space-between;">
                      <span>${lang.name}</span>
                      <span>${lang.level}</span>
                    </div>
                    <div class="skills-bar">
                      <div class="fill" style="width: ${
                        lang.level === 'Başlangıç' ? '25%' :
                        lang.level === 'Orta' ? '50%' :
                        lang.level === 'İleri' ? '75%' :
                        '100%'
                      };"></div>
                    </div>
                  </div>
                `).join('')}
                </div>
              </div>
            ` : ''}

            ${cv.references?.length > 0 ? `
              <div class="section">
                <h2 class="section-title">Referanslar</h2>
                ${cv.references.map((ref: any) => `
                  <div style="margin-bottom: 15px;">
                    <div style="font-weight: bold;">${ref.fullName}</div>
                    <div style="font-size: 14px;">${ref.position} - ${ref.company}</div>
                    <div>
                      ${ref.email ? `<div>📧 ${ref.email}</div>` : ''}
                      ${ref.phone ? `<div>📱 ${ref.phone}</div>` : ''}
                    </div>
                  </div>
                `).join('')}
              </div>
            ` : ''}
          </div>
        </div>

        <div class="content">
          ${cv.about ? `
            <div class="content-section">
              <h2 class="content-title">Hakkımda</h2>
              <p>${cv.about}</p>
            </div>
          ` : ''}

          ${cv.experience?.length > 0 ? `
            <div class="content-section">
              <h2 class="content-title">İş Deneyimi</h2>
              ${cv.experience.map((exp: any) => `
                <div class="experience-item">
                  <div class="item-title">${exp.position}</div>
                  <div class="item-subtitle">${exp.companyName}</div>
                  <div class="item-date">${exp.startDate} - ${exp.endDate}</div>
                  <p>${exp.description}</p>
                </div>
              `).join('')}
            </div>
          ` : ''}

          ${cv.projects?.length > 0 ? `
            <div class="content-section">
              <h2 class="content-title">Projeler</h2>
              ${cv.projects.map((project: any) => `
                <div class="experience-item">
                  <div class="item-title">${project.name}</div>
                  <div class="item-date">${project.startDate} - ${project.endDate}</div>
                  ${project.description ? `<p>${project.description}</p>` : ''}
                  ${project.technologies ? `<p><strong>Teknolojiler:</strong> ${project.technologies}</p>` : ''}
                  ${project.projectUrl ? `<p><strong>URL:</strong> ${project.projectUrl}</p>` : ''}
                </div>
              `).join('')}
            </div>
          ` : ''}

          ${cv.education?.length > 0 ? `
            <div class="content-section">
              <h2 class="content-title">Eğitim</h2>
              <div style="display: flex; flex-wrap: wrap; justify-content: space-between;">
                ${cv.education.map((edu: any) => `
                  <div class="education-item" style="width: 48%; margin-bottom: 20px;">
                    <div class="item-title">${edu.schoolName}</div>
                    <div class="item-subtitle">${edu.department}</div>
                    <div class="item-date">${edu.startDate} - ${edu.endDate}</div>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}

          ${cv.certificates?.length > 0 ? `
            <div class="content-section">
              <h2 class="content-title">Sertifikalar</h2>
              <div style="display: flex; flex-wrap: wrap; justify-content: space-between;">
                ${cv.certificates.map((cert: any) => `
                  <div class="education-item" style="width: 48%; margin-bottom: 20px;">
                    <div class="item-title">${cert.name}</div>
                    <div class="item-subtitle">${cert.institution}</div>
                    <div class="item-date">${cert.date}</div>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}
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