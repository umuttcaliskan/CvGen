export const feminineTemplate = {
  id: 'feminine',
  name: 'Feminine',
  styles: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#fff5f7',
    primaryColor: '#d6336c',
    secondaryColor: '#767676'
  },
  generateHTML: (cv: any, profileImageBase64: string | null) => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>${cv.personal?.fullName || 'CV'}</title>
      <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600&display=swap" rel="stylesheet">
      <style>
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        body {
          font-family: 'Raleway', sans-serif;
          margin: 0;
          padding: 20px;
          background: #fff5f7;
          color: #444;
          line-height: 1.5;
          font-size: 14px;
        }
        .main-container {
          max-width: 210mm;
          margin: 0 auto;
          background: white;
          box-shadow: 0 5px 20px rgba(0,0,0,0.05);
          border-radius: 8px;
          overflow: hidden;
        }
        .header {
          padding: 25px 30px;
          display: flex;
          align-items: center;
          border-bottom: 1px solid #f3f3f3;
          background: linear-gradient(to right, #fff, #fff5f7);
        }
        .profile-image {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid white;
          box-shadow: 0 3px 10px rgba(0,0,0,0.1);
          margin-right: 25px;
        }
        .profile-initial {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(45deg, #ffaec9, #d6336c);
          color: white;
          font-size: 42px;
          border: 3px solid white;
          box-shadow: 0 3px 10px rgba(0,0,0,0.1);
          margin-right: 25px;
        }
        .name-title {
          flex: 1;
        }
        h1 {
          font-size: 32px;
          margin: 0;
          font-weight: 600;
          color: #333;
        }
        .position {
          font-size: 18px;
          color: #d6336c;
          margin-top: 5px;
          font-weight: 400;
        }
        .content {
          padding: 25px 30px;
        }
        .section {
          margin-bottom: 25px;
          page-break-inside: auto;
        }
        h2 {
          color: #d6336c;
          font-size: 20px;
          margin-bottom: 15px;
          font-weight: 500;
          border-bottom: 1px solid #ffcad4;
          padding-bottom: 6px;
        }
        .about {
          background: #fafafa;
          padding: 15px;
          border-radius: 6px;
          line-height: 1.6;
          margin-bottom: 20px;
        }
        .two-columns {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 12px;
        }
        .info-item {
          background: #fafafa;
          padding: 10px 12px;
          border-radius: 6px;
        }
        .info-item-title {
          font-size: 12px;
          color: #666;
          margin-bottom: 4px;
        }
        .info-item-content {
          font-weight: 500;
        }
        .contact-info {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 10px;
          margin-bottom: 20px;
        }
        .contact-item {
          display: flex;
          align-items: center;
          background: #fafafa;
          padding: 8px 12px;
          border-radius: 6px;
        }
        .contact-item span {
          margin-right: 8px;
          color: #d6336c;
        }
        .timeline {
          margin-left: 15px;
        }
        .timeline-item {
          position: relative;
          padding-left: 25px;
          margin-bottom: 20px;
          page-break-inside: avoid;
        }
        .timeline-item::before {
          content: '';
          position: absolute;
          left: -5px;
          top: 6px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #ffcad4;
          border: 2px solid #d6336c;
        }
        .timeline-item h3 {
          margin: 0 0 5px;
          color: #333;
          font-size: 16px;
          font-weight: 500;
        }
        .timeline-subtitle {
          color: #666;
          font-size: 14px;
          margin-bottom: 3px;
        }
        .timeline-date {
          color: #d6336c;
          font-size: 13px;
          margin-bottom: 5px;
          font-weight: 500;
        }
        .timeline-description {
          font-size: 13px;
          line-height: 1.5;
          color: #555;
        }
        .skills-grid, .languages-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .skill-item {
          background: #fafafa;
          padding: 6px 12px;
          border-radius: 15px;
          font-size: 13px;
          color: #444;
          border: 1px solid #f0f0f0;
        }
        .language-item {
          background: #fafafa;
          padding: 8px 12px;
          border-radius: 6px;
          display: flex;
          justify-content: space-between;
          width: 180px;
        }
        .language-name {
          font-weight: 500;
        }
        .language-level {
          color: #d6336c;
          font-size: 13px;
        }
        .project-grid {
          display: flex;
          flex-direction: column;
          gap: 15px;
          width: 100%;
        }
        .project-item {
          background: #fafafa;
          border-radius: 6px;
          padding: 15px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          width: 100%;
        }
        .project-item h3 {
          margin: 0 0 10px;
          font-size: 16px;
          color: #333;
        }
        .project-description {
          font-size: 13px;
          margin-bottom: 8px;
          color: #555;
        }
        .project-tech {
          font-size: 13px;
          margin-bottom: 8px;
        }
        .project-tech span {
          font-weight: 500;
          color: #666;
        }
        .project-link {
          display: inline-flex;
          align-items: center;
          color: #d6336c;
          text-decoration: none;
          font-size: 13px;
        }
        .certificates-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }
        .certificate-item {
          background: #fafafa;
          padding: 12px;
          border-radius: 6px;
          page-break-inside: avoid;
        }
        .certificate-item h3 {
          margin: 0 0 5px;
          font-size: 15px;
          color: #333;
        }
        .certificate-institution {
          color: #666;
          font-size: 13px;
          margin-bottom: 3px;
        }
        .certificate-date {
          color: #d6336c;
          font-size: 13px;
        }
        .references-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 15px;
        }
        .reference-item {
          background: #fafafa;
          padding: 12px;
          border-radius: 6px;
          page-break-inside: avoid;
        }
        .reference-item h3 {
          margin: 0 0 5px;
          font-size: 15px;
          color: #333;
        }
        .reference-position {
          color: #666;
          font-size: 13px;
        }
        .reference-company {
          color: #888;
          font-size: 13px;
          margin-bottom: 8px;
        }
        .reference-contact {
          font-size: 13px;
        }
        .reference-contact div {
          margin-bottom: 3px;
        }
        .reference-contact span {
          color: #d6336c;
          margin-right: 5px;
        }
        .social-media-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .social-media-item {
          display: flex;
          align-items: center;
          background: #fafafa;
          padding: 8px 12px;
          border-radius: 6px;
        }
        .social-media-item span {
          margin-right: 8px;
          color: #d6336c;
        }
        .social-media-item a {
          color: #444;
          text-decoration: none;
        }
        @media print {
          body {
            padding: 0;
            margin: 0;
          }
          
          .main-container {
            box-shadow: none;
          }
          
          /* Bireysel öğeler asla bölünmez */
          .timeline-item, .project-item, .skill-item,
          .certificate-item, .reference-item, .social-media-item,
          .language-item, .info-item {
            page-break-inside: avoid;
            break-inside: avoid;
          }
          
          /* Bölümler gerektiğinde bölünebilir, ancak başlık bölünmemeli */
          .section {
            page-break-inside: auto;
            break-inside: auto;
          }
          
          /* Bölüm başlıkları asla içeriğinden ayrılmaz */
          h2 {
            page-break-after: avoid;
            break-after: avoid;
          }
          
          /* İçerik grupları mümkünse birlikte tutulmalı */
          .timeline, .project-grid, .certificates-grid, 
          .references-grid, .social-media-grid,
          .languages-grid, .skills-grid, .info-grid {
            break-inside: auto;
            page-break-inside: auto;
          }
          
          /* İçerik grubu taşacaksa en az 2 öğe yeni sayfada olmalı */
          .timeline::before {
            content: "";
            display: block;
            height: 0;
            page-break-inside: avoid;
            break-inside: avoid;
            margin-top: 2px;
          }
          
          /* İki sütunlu yerleşim sayfa sonlarında düzgün bölünsün */
          .two-columns {
            break-inside: avoid;
            page-break-inside: avoid;
          }
          
          /* Yeni sayfada başlayan bölümler için üst boşluk */
          .section {
            orphans: 2; /* En az 2 satır alt sayfaya taşınmadan bölünmez */
            widows: 2;  /* En az 2 satır üst sayfada kalmadan bölünmez */
          }
        }
      </style>
    </head>
    <body>
      <div class="main-container">
        <div class="header">
          ${profileImageBase64 ? 
            `<img src="${profileImageBase64}" class="profile-image" alt="Profil">` : 
            `<div class="profile-initial">${cv.personal?.fullName?.charAt(0).toUpperCase() || 'U'}</div>`
          }
          <div class="name-title">
            <h1>${cv.personal?.fullName || 'İsimsiz'}</h1>
            ${cv.experience?.[0]?.position ? 
              `<div class="position">${cv.experience[0].position}</div>` : ''
            }
          </div>
        </div>
        
        <div class="content">
          <!-- İletişim Bilgileri -->
          <div class="contact-info">
            ${cv.personal?.email ? `
              <div class="contact-item">
                <span>📧</span> ${cv.personal.email}
              </div>
            ` : ''}
            ${cv.personal?.phone ? `
              <div class="contact-item">
                <span>📱</span> ${cv.personal.phone}
              </div>
            ` : ''}
            ${cv.personal?.address ? `
              <div class="contact-item">
                <span>📍</span> ${cv.personal.address}
              </div>
            ` : ''}
          </div>
          
          <!-- Hakkımda -->
          ${cv.about ? `
            <div class="section">
              <h2>Hakkımda</h2>
              <div class="about">${cv.about}</div>
            </div>
          ` : ''}
          
          <!-- Kişisel Bilgiler -->
          ${cv.personal?.birthDate || cv.personal?.birthPlace || cv.personal?.gender || 
          cv.personal?.maritalStatus || cv.personal?.nationality || 
          cv.personal?.militaryStatus || cv.personal?.drivingLicense ? `
            <div class="section">
              <h2>Kişisel Bilgiler</h2>
              <div class="info-grid">
                ${cv.personal?.birthDate ? `
                  <div class="info-item">
                    <div class="info-item-title">Doğum Tarihi</div>
                    <div class="info-item-content">${cv.personal.birthDate}</div>
                  </div>
                ` : ''}
                
                ${cv.personal?.birthPlace ? `
                  <div class="info-item">
                    <div class="info-item-title">Doğum Yeri</div>
                    <div class="info-item-content">${cv.personal.birthPlace}</div>
                  </div>
                ` : ''}
                
                ${cv.personal?.gender ? `
                  <div class="info-item">
                    <div class="info-item-title">Cinsiyet</div>
                    <div class="info-item-content">${cv.personal.gender}</div>
                  </div>
                ` : ''}
                
                ${cv.personal?.maritalStatus ? `
                  <div class="info-item">
                    <div class="info-item-title">Medeni Durumu</div>
                    <div class="info-item-content">${cv.personal.maritalStatus}</div>
                  </div>
                ` : ''}
                
                ${cv.personal?.nationality ? `
                  <div class="info-item">
                    <div class="info-item-title">Uyruğu</div>
                    <div class="info-item-content">${cv.personal.nationality}</div>
                  </div>
                ` : ''}
                
                ${cv.personal?.militaryStatus ? `
                  <div class="info-item">
                    <div class="info-item-title">Askerlik Durumu</div>
                    <div class="info-item-content">${cv.personal.militaryStatus}</div>
                  </div>
                ` : ''}
                
                ${cv.personal?.drivingLicense ? `
                  <div class="info-item">
                    <div class="info-item-title">Ehliyet</div>
                    <div class="info-item-content">${cv.personal.drivingLicense}</div>
                  </div>
                ` : ''}
              </div>
            </div>
          ` : ''}
          
          <!-- Deneyim -->
          ${cv.experience?.length > 0 ? `
            <div class="section">
              <h2>Deneyim</h2>
              <div class="timeline">
                ${cv.experience.map((exp: any) => `
                  <div class="timeline-item">
                    <h3>${exp.position}</h3>
                    <div class="timeline-subtitle">${exp.companyName}</div>
                    <div class="timeline-date">${exp.startDate} - ${exp.endDate}</div>
                    <p class="timeline-description">${exp.description}</p>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}
    
          <!-- Eğitim -->
          ${cv.education?.length > 0 ? `
            <div class="section">
              <h2>Eğitim</h2>
              <div class="timeline">
                ${cv.education.map((edu: any) => `
                  <div class="timeline-item">
                    <h3>${edu.schoolName}</h3>
                    <div class="timeline-subtitle">${edu.department}</div>
                    <div class="timeline-date">${edu.startDate} - ${edu.endDate}</div>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}
          
          <!-- Beceriler ve Diller - Yan Yana -->
          ${(cv.skills?.length > 0 || cv.languages?.length > 0) ? `
            <div class="two-columns">
              ${cv.skills?.length > 0 ? `
                <div class="section">
                  <h2>Beceriler</h2>
                  <div class="skills-grid">
                    ${cv.skills.map((skill: any) => `
                      <div class="skill-item">${skill.name}</div>
                    `).join('')}
                  </div>
                </div>
              ` : ''}
              
              ${cv.languages?.length > 0 ? `
                <div class="section">
                  <h2>Diller</h2>
                  <div class="languages-grid">
                    ${cv.languages.map((lang: any) => `
                      <div class="language-item">
                        <div class="language-name">${lang.name}</div>
                        <div class="language-level">${lang.level}</div>
                      </div>
                    `).join('')}
                  </div>
                </div>
              ` : ''}
            </div>
          ` : ''}
          
          <!-- Projeler -->
          ${cv.projects?.length > 0 ? `
            <div class="section">
              <h2>Projeler</h2>
              <div class="project-grid">
                ${cv.projects.map((project: any) => `
                  <div class="project-item">
                    <h3>${project.name}</h3>
                    ${project.description ? `<p class="project-description">${project.description}</p>` : ''}
                    ${project.technologies ? `
                      <div class="project-tech">
                        <span>Teknolojiler:</span> ${project.technologies}
                      </div>
                    ` : ''}
                    ${project.projectUrl ? `
                      <a href="${project.projectUrl}" class="project-link" target="_blank">
                        <span>🔗</span> Proje Bağlantısı
                      </a>
                    ` : ''}
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}
          
          <!-- Sertifikalar -->
          ${cv.certificates?.length > 0 ? `
            <div class="section">
              <h2>Sertifikalar</h2>
              <div class="certificates-grid">
                ${cv.certificates.map((cert: any) => `
                  <div class="certificate-item">
                    <h3>${cert.name}</h3>
                    <div class="certificate-institution">${cert.institution}</div>
                    <div class="certificate-date">${cert.date || ''}</div>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}
          
          <!-- Referanslar -->
          ${cv.references?.length > 0 ? `
            <div class="section">
              <h2>Referanslar</h2>
              <div class="references-grid">
                ${cv.references.map((ref: any) => `
                  <div class="reference-item">
                    <h3>${ref.fullName}</h3>
                    ${ref.position ? `<div class="reference-position">${ref.position}</div>` : ''}
                    ${ref.company ? `<div class="reference-company">${ref.company}</div>` : ''}
                    <div class="reference-contact">
                      ${ref.email ? `<div><span>📧</span> ${ref.email}</div>` : ''}
                      ${ref.phone ? `<div><span>📱</span> ${ref.phone}</div>` : ''}
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}
          
          <!-- Sosyal Medya -->
          ${cv.socialMedia?.length > 0 ? `
            <div class="section">
              <h2>Sosyal Medya</h2>
              <div class="social-media-grid">
                ${cv.socialMedia.map((social: any) => `
                  <div class="social-media-item">
                    <span>
                      ${social.platform === 'linkedin' ? '🔗' : 
                        social.platform === 'github' ? '💻' : 
                        social.platform === 'twitter' ? '🐦' :
                        social.platform === 'instagram' ? '📷' :
                        social.platform === 'facebook' ? '📘' : '🌐'}
                    </span>
                    <a href="${social.url}" target="_blank">
                      ${social.platform === 'linkedin' ? 'LinkedIn' : 
                        social.platform === 'github' ? 'GitHub' : 
                        social.platform === 'twitter' ? 'Twitter' :
                        social.platform === 'instagram' ? 'Instagram' :
                        social.platform === 'facebook' ? 'Facebook' : 
                        social.username || social.url}
                    </a>
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