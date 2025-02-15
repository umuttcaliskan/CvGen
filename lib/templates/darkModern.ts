export const darkModernTemplate = {
  id: 'darkModern',
  name: 'Dark Modern',
  styles: {
    fontFamily: 'Montserrat, sans-serif',
    backgroundColor: '#f4f4f4',
    primaryColor: '#2c3e50',
    secondaryColor: '#f8f9fa'
  },
  generateHTML: (cv: any, profileImageBase64: string | null) => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>${cv.personal?.fullName || 'CV'}</title>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700&display=swap" rel="stylesheet">
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Montserrat', sans-serif;
        }
        body {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background-color: #f4f4f4;
        }
        .cv-container {
          display: flex;
          width: 900px;
          background: white;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .left-section {
          width: 35%;
          background: #f8f9fa;
          padding: 20px;
          text-align: center;
        }
        .profile-image {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          margin-bottom: 10px;
          object-fit: cover;
        }
        .profile-initial {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          margin: 0 auto 10px;
          background: #2c3e50;
          color: white;
          font-size: 48px;
          line-height: 120px;
          text-align: center;
        }
        .left-section h2 {
          font-size: 20px;
          margin-bottom: 5px;
        }
        .left-section p {
          font-size: 14px;
          color: #777;
          margin-bottom: 15px;
        }
        .section-title {
          margin-top: 20px;
          font-weight: bold;
          border-bottom: 1px solid #ccc;
          padding-bottom: 5px;
          text-align: left;
        }
        .contact-info {
          text-align: left;
        }
        .contact-info p {
          display: flex;
          align-items: center;
          font-size: 14px;
          margin: 8px 0;
        }
        .right-section {
          width: 65%;
          background: #2c3e50;
          color: white;
          padding: 20px;
        }
        .right-section h3 {
          border-bottom: 1px solid white;
          padding-bottom: 5px;
          margin: 20px 0 10px;
          font-size: 18px;
        }
        .right-section h3:first-child {
          margin-top: 0;
        }
        .experience-item, .education-item {
          margin-bottom: 15px;
        }
        .item-title {
          font-weight: bold;
          margin-bottom: 5px;
        }
        .item-subtitle {
          color: #ecf0f1;
          font-size: 14px;
          margin-bottom: 5px;
        }
        .item-date {
          color: #bdc3c7;
          font-size: 12px;
          margin-bottom: 5px;
        }
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
          margin-top: 10px;
        }
        .skill-item {
          font-size: 14px;
          padding: 5px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
      </style>
    </head>
    <body>
      <div class="cv-container">
        <div class="left-section">
          ${profileImageBase64 ? 
            `<img src="${profileImageBase64}" class="profile-image" alt="Profile">` :
            `<div class="profile-initial">${cv.personal?.fullName?.charAt(0).toUpperCase() || 'U'}</div>`
          }
          <h2>${cv.personal?.fullName || 'İsimsiz'}</h2>
          ${cv.experience?.[0]?.position ? 
            `<p>${cv.experience[0].position}</p>` : ''
          }
          
          <div class="section-title">Hakkımda</div>
          <p>${cv.about || ''}</p>

          <div class="section-title">İletişim</div>
          <div class="contact-info">
            ${cv.personal?.phone ? `<p>📞 ${cv.personal.phone}</p>` : ''}
            ${cv.personal?.email ? `<p>📧 ${cv.personal.email}</p>` : ''}
            ${cv.personal?.address ? `<p>📍 ${cv.personal.address}</p>` : ''}
          </div>

          ${cv.languages?.length > 0 ? `
            <div class="section-title">Diller</div>
            <div class="contact-info">
              ${cv.languages.map((lang: any) => `
                <p>${lang.name} - ${lang.level}</p>
              `).join('')}
            </div>
          ` : ''}
        </div>

        <div class="right-section">
          ${cv.education?.length > 0 ? `
            <h3>Eğitim</h3>
            ${cv.education.map((edu: any) => `
              <div class="education-item">
                <div class="item-title">${edu.schoolName}</div>
                <div class="item-subtitle">${edu.department}</div>
                <div class="item-date">${edu.startDate} - ${edu.endDate}</div>
              </div>
            `).join('')}
          ` : ''}

          ${cv.experience?.length > 0 ? `
            <h3>İş Deneyimi</h3>
            ${cv.experience.map((exp: any) => `
              <div class="experience-item">
                <div class="item-title">${exp.position}</div>
                <div class="item-subtitle">${exp.companyName}</div>
                <div class="item-date">${exp.startDate} - ${exp.endDate}</div>
                <p>${exp.description}</p>
              </div>
            `).join('')}
          ` : ''}

          ${cv.certificates?.length > 0 ? `
            <h3>Sertifikalar</h3>
            <div class="skills-grid">
              ${cv.certificates.map((cert: any) => `
                <div class="experience-item">
                  <div class="item-title">${cert.name}</div>
                  <div class="item-subtitle">${cert.institution}</div>
                  <div class="item-date">${cert.date}</div>
                </div>
              `).join('')}
            </div>
          ` : ''}

          ${cv.skills?.length > 0 ? `
            <h3>Beceriler</h3>
            <div class="skills-grid">
              ${cv.skills.map((skill: any) => `
                <div class="skill-item">${skill.name}</div>
              `).join('')}
            </div>
          ` : ''}

          ${cv.references?.length > 0 ? `
            <h3>Referanslar</h3>
            ${cv.references.map((ref: any) => `
              <div class="experience-item">
                <div class="item-title">${ref.fullName}</div>
                <div class="item-subtitle">${ref.position} - ${ref.company}</div>
                ${ref.email ? `<div class="item-date">📧 ${ref.email}</div>` : ''}
                ${ref.phone ? `<div class="item-date">📞 ${ref.phone}</div>` : ''}
              </div>
            `).join('')}
          ` : ''}
        </div>
      </div>
    </body>
    </html>
  `
};