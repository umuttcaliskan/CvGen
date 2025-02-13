export const modernTemplate = {
  id: 'modern',
  name: 'Modern',
  generateHTML: (cv: any, profileImageBase64: string | null) => `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>${cv.personal?.fullName || 'CV'}</title>
        <style>
          body {
            font-family: 'Helvetica', sans-serif;
            margin: 0;
            padding: 0;
            background: #fff;
            color: #333;
          }
          .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 40px;
          }
          .header {
            display: flex;
            align-items: center;
            margin-bottom: 40px;
            background: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
          }
          .profile-image {
            width: 120px;
            height: 120px;
            border-radius: 60px;
            object-fit: cover;
            border: 3px solid #fff;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          .profile-initial {
            width: 120px;
            height: 120px;
            border-radius: 60px;
            background: #1e40af;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 36px;
            font-weight: bold;
          }
          .personal-info {
            margin-left: 30px;
          }
          h1 {
            margin: 0 0 10px 0;
            color: #1a1a1a;
            font-size: 28px;
          }
          .section {
            margin-bottom: 30px;
          }
          .section-title {
            color: #1e40af;
            font-size: 20px;
            margin-bottom: 15px;
            padding-bottom: 5px;
            border-bottom: 2px solid #e5e7eb;
          }
          .item {
            margin-bottom: 20px;
          }
          .item-title {
            font-weight: bold;
            color: #2d3748;
            margin-bottom: 5px;
          }
          .item-subtitle {
            color: #4a5568;
            margin-bottom: 5px;
          }
          .item-date {
            color: #718096;
            font-size: 0.9em;
            margin-bottom: 5px;
          }
          .contact-info {
            color: #4a5568;
            margin-top: 10px;
          }
          .contact-info div {
            margin: 5px 0;
          }
          .skills-bar {
            background: #e5e7eb;
            height: 8px;
            border-radius: 4px;
            margin-top: 5px;
          }
          .skills-bar .fill {
            background: #1e40af;
            height: 100%;
            border-radius: 4px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            ${profileImageBase64 
              ? `<img src="${profileImageBase64}" class="profile-image" alt="Profile">`
              : `<div class="profile-initial">${cv.personal?.fullName?.charAt(0).toUpperCase() || 'U'}</div>`
            }
            <div class="personal-info">
              <h1>${cv.personal?.fullName || 'İsimsiz'}</h1>
              <div class="contact-info">
                ${cv.personal?.email ? `<div>📧 ${cv.personal.email}</div>` : ''}
                ${cv.personal?.phone ? `<div>📱 ${cv.personal.phone}</div>` : ''}
                ${cv.personal?.address ? `<div>📍 ${cv.personal.address}</div>` : ''}
              </div>
            </div>
          </div>
          
          ${cv.about ? `
            <div class="section">
              <h2 class="section-title">Hakkımda</h2>
              <p>${cv.about}</p>
            </div>
          ` : ''}

          ${cv.experience?.length > 0 ? `
            <div class="section">
              <h2 class="section-title">İş Deneyimi</h2>
              ${cv.experience.map((exp: any) => `
                <div class="item">
                  <div class="item-title">${exp.position}</div>
                  <div class="item-subtitle">${exp.companyName}</div>
                  <div class="item-date">${exp.startDate} - ${exp.endDate}</div>
                  <p>${exp.description}</p>
                </div>
              `).join('')}
            </div>
          ` : ''}

          ${cv.education?.length > 0 ? `
            <div class="section">
              <h2 class="section-title">Eğitim</h2>
              ${cv.education.map((edu: any) => `
                <div class="item">
                  <div class="item-title">${edu.schoolName}</div>
                  <div class="item-subtitle">${edu.department}</div>
                  <div class="item-date">${edu.startDate} - ${edu.endDate}</div>
                </div>
              `).join('')}
            </div>
          ` : ''}

          ${cv.skills?.length > 0 ? `
            <div class="section">
              <h2 class="section-title">Beceriler</h2>
              ${cv.skills.map((skill: any) => `
                <div class="item">
                  <div class="item-title">${skill.name}</div>
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
                <div class="item">
                  <div class="item-title">${lang.name}</div>
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

          ${cv.references?.length > 0 ? `
            <div class="section">
              <h2 class="section-title">Referanslar</h2>
              ${cv.references.map((ref: any) => `
                <div class="item">
                  <div class="item-title">${ref.fullName}</div>
                  <div class="item-subtitle">${ref.position} - ${ref.company}</div>
                  <div class="contact-info">
                    <div>📧 ${ref.email}</div>
                    <div>📱 ${ref.phone}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          ` : ''}
        </div>
      </body>
    </html>
  `
}; 