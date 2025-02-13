export const professionalTemplate = {
  id: 'professional',
  name: 'Profesyonel',
  styles: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#ffffff',
    primaryColor: '#2c2f33',
    secondaryColor: '#444444'
  },
  generateHTML: (cv: any, profileImageBase64: string | null) => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>${cv.personal?.fullName || 'CV'}</title>
      <style>
        @page {
          margin: 30px;
          size: A4;
        }
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          display: flex;
        }
        .sidebar {
          width: 30%;
          background: #2c2f33;
          color: white;
          padding: 20px;
          text-align: center;
          min-height: 100vh;
        }
        .sidebar img {
          width: 80%;
          border-radius: 10px;
          margin-bottom: 20px;
        }
        .sidebar h2 {
          font-size: 22px;
          margin-bottom: 10px;
        }
        .sidebar p {
          font-size: 14px;
          margin: 5px 0;
        }
        .content {
          width: 70%;
          padding: 40px;
        }
        h1 {
          font-size: 28px;
          margin-bottom: 10px;
        }
        h2 {
          font-size: 20px;
          border-bottom: 2px solid #ddd;
          padding-bottom: 5px;
          margin-top: 20px;
        }
        .job-title {
          font-weight: bold;
        }
        .skills-bar {
          background: #ddd;
          height: 8px;
          border-radius: 4px;
          margin: 5px 0;
          position: relative;
        }
        .skills-bar .fill {
          background: #444;
          height: 100%;
          border-radius: 4px;
        }
        .experience-item, .education-item, .skill-item {
          page-break-inside: avoid;
          margin-bottom: 20px;
        }
      </style>
    </head>
    <body>
      <div class="sidebar">
        ${profileImageBase64 ? 
          `<img src="${profileImageBase64}" alt="Profile">` : 
          `<div class="profile-initial">${cv.personal?.fullName?.charAt(0).toUpperCase() || 'U'}</div>`
        }
        <h1 style="color: white; font-size: 24px; margin: 10px 0 20px;">${cv.personal?.fullName || 'İsimsiz'}</h1>
        
        <h2 style="margin-top: 30px;">KİŞİSEL</h2>
        ${cv.personal ? `
          <p><strong>Adres:</strong> ${cv.personal.address}</p>
          <p><strong>Telefon:</strong> ${cv.personal.phone}</p>
          <p><strong>E-posta:</strong> ${cv.personal.email}</p>
          <p><strong>Doğum Tarihi:</strong> ${cv.personal.birthDate}</p>
        ` : ''}
        
        ${cv.languages?.length > 0 ? `
          <h2>Diller</h2>
          ${cv.languages.map((lang: any) => `
            <p>${lang.name} - ${lang.level}</p>
          `).join('')}
        ` : ''}
      </div>

      <div class="content">
        ${cv.experience?.length > 0 ? `
          <h2>İş Deneyimi</h2>
          ${cv.experience.map((exp: any) => `
            <p class="job-title">${exp.position}</p>
            <p>${exp.companyName}, ${exp.startDate} - ${exp.endDate}</p>
            <p>${exp.description}</p>
          `).join('')}
        ` : ''}

        ${cv.education?.length > 0 ? `
          <h2>Eğitim</h2>
          ${cv.education.map((edu: any) => `
            <p class="job-title">${edu.schoolName}</p>
            <p>${edu.department}, ${edu.startDate} - ${edu.endDate}</p>
          `).join('')}
        ` : ''}

        ${cv.skills?.length > 0 ? `
          <h2>Beceriler</h2>
          ${cv.skills.map((skill: any) => `
            <p>${skill.name}</p>
            <div class="skills-bar">
              <div class="fill" style="width: ${
                skill.level === 'Başlangıç' ? '25%' :
                skill.level === 'Orta' ? '50%' :
                skill.level === 'İleri' ? '75%' :
                '100%'
              };"></div>
            </div>
          `).join('')}
        ` : ''}

        ${cv.references?.length > 0 ? `
          <h2>Referanslar</h2>
          ${cv.references.map((ref: any) => `
            <p><strong>${ref.fullName}</strong> - ${ref.company}</p>
            <p>${ref.phone}</p>
          `).join('')}
        ` : ''}
      </div>
    </body>
    </html>
  `
}; 