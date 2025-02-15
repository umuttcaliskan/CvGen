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
        }
        .container {
          display: flex;
          min-height: 100vh;
        }
        .sidebar {
          width: 35%;
          background: #1e3a8a;
          color: white;
          padding: 40px 20px;
        }
        .profile-section {
          text-align: center;
          margin-bottom: 40px;
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
          padding: 40px;
        }
        .content-section {
          margin-bottom: 30px;
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
            </div>
          </div>

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
              ${cv.languages.map((lang: any) => `
                <div style="margin-bottom: 15px;">
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
          ` : ''}
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

          ${cv.education?.length > 0 ? `
            <div class="content-section">
              <h2 class="content-title">Eğitim</h2>
              ${cv.education.map((edu: any) => `
                <div class="education-item">
                  <div class="item-title">${edu.schoolName}</div>
                  <div class="item-subtitle">${edu.department}</div>
                  <div class="item-date">${edu.startDate} - ${edu.endDate}</div>
                </div>
              `).join('')}
            </div>
          ` : ''}

          ${cv.certificates?.length > 0 ? `
            <div class="content-section">
              <h2 class="content-title">Sertifikalar</h2>
              ${cv.certificates.map((cert: any) => `
                <div class="education-item">
                  <div class="item-title">${cert.name}</div>
                  <div class="item-subtitle">${cert.institution}</div>
                  <div class="item-date">${cert.date}</div>
                </div>
              `).join('')}
            </div>
          ` : ''}

          ${cv.references?.length > 0 ? `
            <div class="content-section">
              <h2 class="content-title">Referanslar</h2>
              ${cv.references.map((ref: any) => `
                <div class="education-item">
                  <div class="item-title">${ref.fullName}</div>
                  <div class="item-subtitle">${ref.position} - ${ref.company}</div>
                  <div class="contact-info">
                    ${ref.email ? `<div>📧 ${ref.email}</div>` : ''}
                    ${ref.phone ? `<div>📱 ${ref.phone}</div>` : ''}
                  </div>
                </div>
              `).join('')}
            </div>
          ` : ''}
        </div>
      </div>
    </body>
    </html>
  `
}; 