export const twoColumnTemplate = {
    id: 'twoColumn',
    name: 'İki Sütunlu',
    styles: {
      fontFamily: 'Roboto, sans-serif',
      backgroundColor: '#ffffff',
      primaryColor: '#2e5c8a',
      secondaryColor: '#e8edf3'
    },
    generateHTML: (cv: any, profileImageBase64: string | null) => `
      <!DOCTYPE html>
      <html lang="tr">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${cv.personal?.fullName || 'CV'}</title>
          <style>
              @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
              
              * {
                  margin: 0;
                  padding: 0;
                  box-sizing: border-box;
                  font-family: 'Roboto', sans-serif;
              }
              
              body {
                  background-color: #f5f5f5;
                  color: #333;
                  line-height: 1.4;
                  min-height: 100vh;
              }
              
              .container {
                  max-width: 900px;
                  margin: 0 auto;
                  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.1);
                  position: relative;
                  min-height: 100vh;
                  background-color: white;
              }
              
              .content-wrapper {
                  display: flex;
                  position: relative;
                  min-height: 100vh;
              }
              
              .left-column {
                  width: 40%;
                  padding: 20px;
                  position: relative;
              }
              
              .right-column {
                  width: 60%;
                  background-color: white;
                  padding: 20px;
                  position: relative;
              }
              
              .section-title, .right-section-title {
                  font-size: 18px;
                  margin-bottom: 15px;
                  color: #2e5c8a;
                  font-weight: 700;
                  text-transform: uppercase;
                  letter-spacing: 0.5px;
                  position: relative;
                  padding-bottom: 10px;
              }
              
              .section {
                  margin-top: 5px;
                  margin-bottom: 20px;
                  page-break-inside: avoid;
              }
              
              /* Sol kolon arka planı için ayrı bir katman */
              .left-column-bg {
                  position: absolute;
                  left: 0;
                  top: 0;
                  width: 35%;
                  height: 100%;
                  min-height: 100vh;
                  background-color: #f7f9fc;
                  z-index: 0;
              }
              
              /* Left column */
              .left-column {
                  width: 35%;
                  padding: 40px 25px;
                  position: relative;
                  z-index: 1;
              }
              
              /* Right column */
              .right-column {
                  width: 65%;
                  background-color: white;
                  padding: 40px 30px;
                  position: relative;
                  z-index: 1;
              }
              
              /* Sayfa geçişleri için düzenleme */
              .page-break {
                  page-break-before: always;
                  padding-top: 20px; /* İlk sayfa için üstten boşluk */
              }
              
              /* Profile image styling */
              .profile-section {
                  text-align: center;
                  margin-bottom: 40px;
              }
              
              .profile-image {
                  width: 150px;
                  height: 150px;
                  border-radius: 50%;
                  border: 4px solid white;
                  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                  margin: 0 auto 20px;
                  display: block;
                  object-fit: cover;
              }
              
              .profile-initial {
                  width: 150px;
                  height: 150px;
                  border-radius: 50%;
                  background: linear-gradient(135deg, #2e5c8a 0%, #1a3a5f 100%);
                  color: white;
                  font-size: 64px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  margin: 0 auto 20px;
                  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
              }
              
              .name {
                  font-size: 24px;
                  font-weight: 700;
                  margin-bottom: 5px;
                  color: #2e5c8a;
              }
              
              .title {
                  font-size: 16px;
                  color: #555;
                  margin-bottom: 20px;
                  font-weight: 400;
              }
              
              /* Section styling */
              .section-title::after {
                  content: '';
                  position: absolute;
                  bottom: 0;
                  left: 0;
                  width: 100px;
                  height: 4px;
                  background: #2e5c8a;
                  border-radius: 2px;
              }
              
              .right-section-title::after {
                  content: '';
                  position: absolute;
                  bottom: 0;
                  left: 0;
                  width: 120px;
                  height: 4px;
                  background: #2e5c8a;
                  border-radius: 2px;
              }
              
              /* Content items styling */
              .contact-item {
                  margin-bottom: 15px;
                  display: flex;
                  align-items: center;
              }
              
              .contact-item i {
                  width: 25px;
                  margin-right: 10px;
                  text-align: center;
                  color: #2e5c8a;
              }
              
              .education-item, .experience-item, .certificate-item {
                  margin-bottom: 30px;
                  page-break-inside: avoid;
                  position: relative;
                  padding-left: 20px;
              }
              
              .education-item::before, .experience-item::before, .certificate-item::before {
                  content: '';
                  position: absolute;
                  left: 0;
                  top: 8px;
                  width: 8px;
                  height: 8px;
                  border-radius: 50%;
                  background: #2e5c8a;
              }
              
              .item-title {
                  font-weight: 600;
                  font-size: 18px;
                  margin-bottom: 5px;
                  color: #333;
              }
              
              .item-subtitle {
                  font-weight: 500;
                  color: #2e5c8a;
                  margin-bottom: 5px;
              }
              
              .item-date {
                  color: #777;
                  font-size: 14px;
                  margin-bottom: 8px;
                  font-weight: 400;
                  display: inline-block;
                  background-color: #f7f9fc;
                  padding: 2px 10px;
                  border-radius: 15px;
              }
              
              .item-description {
                  color: #555;
                  line-height: 1.5;
              }
              
              /* Skill and language styling */
              .skill-item {
                  margin-bottom: 15px;
              }
              
              .skill-name {
                  margin-bottom: 5px;
                  display: block;
                  font-weight: 500;
              }
              
              .skill-level {
                  height: 6px;
                  background-color: #e1e7ed;
                  border-radius: 3px;
                  overflow: hidden;
              }
              
              .skill-level-inner {
                  height: 100%;
                  background: linear-gradient(to right, #2e5c8a, #5b8cba);
              }
              
              .language-item {
                  margin-bottom: 15px;
              }
              
              /* Grid layouts */
              .certificates-grid {
                  display: grid;
                  grid-template-columns: 1fr 1fr;
                  gap: 20px;
              }
              
              /* Sections */
              .left-section {
                  margin-bottom: 35px;
                  page-break-inside: avoid;
              }
              
              /* About section */
              .about-text {
                  color: #555;
                  line-height: 1.6;
                  margin-bottom: 20px;
              }
              
              /* Print optimization */
              @page {
                  margin: 0;
              }
              
              /* İlk sayfa için özel kenar boşluğu */
              @page :first {
                  margin-top: 0;
              }
              
              /* İkinci ve sonraki sayfalar için özel kenar boşluğu */
              @page :not(:first) {
                  margin-top: 40px;
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
                  }
                  
                  /* Arka plan için özel düzenleme */
                  .left-column-bg {
                      position: fixed;
                      left: 0;
                      top: 0;
                      bottom: 0;
                      width: 35%;
                      background-color: #f7f9fc;
                      z-index: -1;
                  }
                  
                  .content-wrapper {
                      display: flex;
                      position: relative;
                  }
                  
                  .left-column {
                      width: 35%;
                      background-color: transparent;
                      position: relative;
                  }
                  
                  .right-column {
                      width: 65%;
                      background-color: white;
                  }
                  
                  /* Bölümler arası boşluk */
                  .section {
                      page-break-inside: avoid;
                      margin-top: 10px; /* İlk sayfa için daha az boşluk */
                  }
                  
                  .section:first-child {
                      margin-top: 0; /* İlk bölümde fazladan boşluk olmasın */
                  }
                  
                  /* Diğer sayfalar için */
                  .section + .section {
                      margin-top: 20px; /* Diğer sayfalarda daha fazla boşluk */
                  }
                  
                  .experience-item, .education-item, .certificate-item {
                      page-break-inside: avoid;
                  }
                  
                  /* İlk sayfa için ayarlar */
                  .right-column .section:first-child {
                      margin-top: 0;
                  }
                  
                  /* İkinci ve sonraki sayfalar için ayarlar */
                  .right-column .section {
                      page-break-inside: avoid;
                  }
                  
                  /* Sayfa kırılımı ile başlayan bölümler için boşluk */
                  .right-column .section:not(:first-child) {
                      padding-top: 30px;
                  }
                  
                  /* Sağ sütun için olan sayfa geçiş ayarlarına benzer şekilde sol sütun için de düzenlemeler */
                  .left-column .left-section:first-child {
                      margin-top: 0; /* İlk bölümde fazladan boşluk olmasın */
                  }
                  
                  /* İkinci ve sonraki sayfalar için */
                  .left-column .left-section {
                      page-break-inside: avoid;
                  }
                  
                  /* Sayfa kırılımı ile başlayan sol kolon bölümleri için boşluk */
                  .left-column .left-section:not(:first-child) {
                      padding-top: 30px;
                  }
              }
          </style>
      </head>
      <body>
          <div class="container">              
              <div class="content-wrapper">
                  <div class="left-column">
                      <div class="profile-section">
                          ${profileImageBase64 ? 
                              `<img src="${profileImageBase64}" alt="Profil" class="profile-image">` : 
                              `<div class="profile-initial">${cv.personal?.fullName?.charAt(0).toUpperCase() || 'U'}</div>`
                          }
                          <h1 class="name">${cv.personal?.fullName || 'İsimsiz'}</h1>
                          <p class="title">${cv.experience?.[0]?.position || 'Dijital Pazarlama Uzmanı'}</p>
                      </div>
                      
                      <div class="left-section">
                          <h2 class="section-title">Hakkımda</h2>
                          <p class="about-text">${cv.about || 'Hakkımda bilgisi bulunamadı.'}</p>
                      </div>
                      
                      <div class="left-section">
                          <h2 class="section-title">Kişisel Bilgiler</h2>
                          <div class="contact-item">
                              <i>🎂</i>
                              <span>${cv.personal?.birthDate || 'Belirtilmedi'}</span>
                          </div>
                          ${cv.personal?.drivingLicense ? `
                          <div class="contact-item">
                              <i>🚗</i>
                              <span>Ehliyet: ${cv.personal.drivingLicense}</span>
                          </div>
                          ` : ''}
                          ${cv.personal?.militaryStatus ? `
                          <div class="contact-item">
                              <i>🪖</i>
                              <span>Askerlik: ${cv.personal.militaryStatus}</span>
                          </div>
                          ` : ''}
                          ${cv.personal?.maritalStatus ? `
                          <div class="contact-item">
                              <i>💍</i>
                              <span>Medeni Durum: ${cv.personal.maritalStatus}</span>
                          </div>
                          ` : ''}
                      </div>
                      
                      <div class="left-section">
                          <h2 class="section-title">İletişim</h2>
                          ${cv.personal ? `
                          <div class="contact-item">
                              <i>📱</i>
                              <span>${cv.personal.phone || '0212 123 24 25'}</span>
                          </div>
                          <div class="contact-item">
                              <i>📧</i>
                              <span>${cv.personal.email || 'mail@site.com'}</span>
                          </div>
                          <div class="contact-item">
                              <i>📍</i>
                              <span>${cv.personal.address || 'Adres bilgisi'}</span>
                          </div>
                          ` : ''}
                      </div>
                      
                      ${cv.socialMedia?.length > 0 ? `
                      <div class="left-section">
                          <h2 class="section-title">Sosyal Medya</h2>
                          ${cv.socialMedia.map((social: any) => {
                              const platformName = social.platform.charAt(0).toUpperCase() + social.platform.slice(1);
                              return `
                              <div class="contact-item">
                                  <i>🔗</i>
                                  <span>${platformName}: ${social.username}</span>
                              </div>
                              `;
                          }).join('')}
                      </div>
                      ` : ''}
                      
                      ${cv.languages?.length > 0 ? `
                      <div class="left-section">
                          <h2 class="section-title">Diller</h2>
                          ${cv.languages.map((lang: any) => {
                              let levelPercent = 0;
                              switch(lang.level) {
                                  case 'Başlangıç': levelPercent = 20; break;
                                  case 'Orta': levelPercent = 50; break;
                                  case 'İyi': levelPercent = 70; break;
                                  case 'Çok iyi': levelPercent = 85; break;
                                  case 'Anadil': levelPercent = 100; break;
                                  default: levelPercent = 60;
                              }
                              return `
                              <div class="language-item">
                                  <span class="skill-name">${lang.name} - ${lang.level}</span>
                                  <div class="skill-level">
                                      <div class="skill-level-inner" style="width: ${levelPercent}%"></div>
                                  </div>
                              </div>
                              `;
                          }).join('')}
                      </div>
                      ` : ''}
                      
                      ${cv.skills?.length > 0 ? `
                      <div class="left-section">
                          <h2 class="section-title">Beceriler</h2>
                          ${cv.skills.map((skill: any) => {
                              let levelPercent = 0;
                              switch(skill.level) {
                                  case 'Başlangıç': levelPercent = 20; break;
                                  case 'Orta': levelPercent = 50; break;
                                  case 'İyi': levelPercent = 70; break;
                                  case 'Çok iyi': levelPercent = 85; break;
                                  case 'Uzman': levelPercent = 100; break;
                                  default: levelPercent = 60;
                              }
                              return `
                              <div class="skill-item">
                                  <span class="skill-name">${skill.name} - ${skill.level}</span>
                                  <div class="skill-level">
                                      <div class="skill-level-inner" style="width: ${levelPercent}%"></div>
                                  </div>
                              </div>
                              `;
                          }).join('')}
                      </div>
                      ` : ''}
                  </div>
                  
                  <div class="right-column">
                      ${cv.about ? `
                          <div class="section">
                              <h2 class="right-section-title">Hakkımda</h2>
                              <p class="about-text">${cv.about}</p>
                          </div>
                      ` : ''}
                      
                      ${cv.education?.length > 0 ? `
                      <div class="section">
                          <h2 class="right-section-title">Eğitim</h2>
                          <div class="certificates-grid" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
                              ${cv.education.map((edu: any) => `
                              <div class="education-item">
                                  <div class="item-title">${edu.schoolName}</div>
                                  <div class="item-subtitle">${edu.department}</div>
                                  <div class="item-date">${edu.startDate} - ${edu.endDate}</div>
                              </div>
                              `).join('')}
                          </div>
                      </div>
                      ` : ''}
                      
                      ${cv.experience?.length > 0 ? `
                      <div class="section">
                          <h2 class="right-section-title">İş Deneyimi</h2>
                          ${cv.experience.map((exp: any) => `
                          <div class="experience-item">
                              <div class="item-title">${exp.position}</div>
                              <div class="item-subtitle">${exp.companyName}</div>
                              <div class="item-date">${exp.startDate} - ${exp.endDate}</div>
                              <p class="item-description">${exp.description}</p>
                          </div>
                          `).join('')}
                      </div>
                      ` : ''}
                      
                      ${cv.projects?.length > 0 ? `
                      <div class="section">
                          <h2 class="right-section-title">Projeler</h2>
                          ${cv.projects.map((project: any) => `
                          <div class="experience-item">
                              <div class="item-title">${project.name}</div>
                              <div class="item-date">${project.startDate} - ${project.endDate}</div>
                              <p class="item-description">${project.description}</p>
                              ${project.technologies ? `<p class="item-description"><strong>Teknolojiler:</strong> ${project.technologies}</p>` : ''}
                              ${project.projectUrl ? `<p class="item-description"><strong>URL:</strong> ${project.projectUrl}</p>` : ''}
                          </div>
                          `).join('')}
                      </div>
                      ` : ''}
                      
                      ${cv.certificates?.length > 0 ? `
                      <div class="section">
                          <h2 class="right-section-title">Sertifikalar</h2>
                          <div class="certificates-grid">
                              ${cv.certificates.map((cert: any) => `
                              <div class="certificate-item" style="margin-bottom: 10px;">
                                  <div class="item-title">${cert.name}</div>
                                  <div class="item-subtitle">${cert.institution}</div>
                                  <div class="item-date">${cert.date}</div>
                              </div>
                              `).join('')}
                          </div>
                      </div>
                      ` : ''}
                      
                      ${cv.references?.length > 0 ? `
                      <div class="section">
                          <h2 class="right-section-title">Referanslar</h2>
                          ${cv.references.map((ref: any) => `
                          <div class="education-item">
                              <div class="item-title">${ref.fullName}</div>
                              <div class="item-subtitle">${ref.position}, ${ref.company}</div>
                              <div class="contact-item">
                                  <i>📞</i>
                                  <span>${ref.phone}</span>
                              </div>
                              <div class="contact-item">
                                  <i>✉️</i>
                                  <span>${ref.email}</span>
                              </div>
                          </div>
                          `).join('')}
                      </div>
                      ` : ''}
                  </div>
              </div>
          </div>
      </body>
      </html>
    `
  }; 