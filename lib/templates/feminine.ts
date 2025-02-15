export const feminineTemplate = {
  id: 'feminine',
  name: 'Feminine',
  styles: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#fff5f5',
    primaryColor: '#ff8fab',
    secondaryColor: '#444444'
  },
  generateHTML: (cv: any, profileImageBase64: string | null) => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>${cv.personal?.fullName || 'CV'}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 40px;
          background: #fff5f5;
          color: #333;
        }
        .header {
          display: flex;
          align-items: center;
          gap: 30px;
          margin-bottom: 40px;
        }
        .profile-image {
          width: 200px;
          height: 200px;
          border-radius: 50%;
          object-fit: cover;
        }
        .name-title {
          flex: 1;
        }
        h1 {
          font-size: 48px;
          margin: 0;
          color: #333;
        }
        .position {
          font-size: 24px;
          color: #ff8fab;
          margin-top: 10px;
        }
        .section {
          margin-bottom: 30px;
        }
        h2 {
          color: #ff8fab;
          font-size: 28px;
          border-bottom: 2px solid #ffc2d1;
          padding-bottom: 10px;
          margin-bottom: 20px;
        }
        .timeline {
          position: relative;
          margin-left: 20px;
        }
        .timeline::before {
          content: '';
          position: absolute;
          left: -2px;
          top: 0;
          bottom: 0;
          width: 2px;
          background: #ffc2d1;
        }
        .timeline-item {
          position: relative;
          padding-left: 30px;
          margin-bottom: 30px;
        }
        .timeline-item::before {
          content: '';
          position: absolute;
          left: -7px;
          top: 5px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #ff8fab;
        }
        .skills-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
        }
        .skill-item {
          background: white;
          padding: 10px 20px;
          border-radius: 20px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .contact-info {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
        }
        .contact-item {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #666;
        }
      </style>
    </head>
    <body>
      <div class="header">
        ${profileImageBase64 ? 
          `<img src="${profileImageBase64}" class="profile-image" alt="Profile">` : 
          `<div class="profile-image" style="background: #ff8fab; display: flex; align-items: center; justify-content: center; color: white; font-size: 64px;">
            ${cv.personal?.fullName?.charAt(0).toUpperCase() || 'U'}
          </div>`
        }
        <div class="name-title">
          <h1>${cv.personal?.fullName || 'İsimsiz'}</h1>
          ${cv.experience?.[0]?.position ? 
            `<div class="position">${cv.experience[0].position}</div>` : ''
          }
        </div>
      </div>

      ${cv.about ? `
        <div class="section">
          <h2>HAKKIMDA</h2>
          <p>${cv.about}</p>
        </div>
      ` : ''}

      ${cv.skills?.length > 0 ? `
        <div class="section">
          <h2>BECERİLER</h2>
          <div class="skills-grid">
            ${cv.skills.map((skill: any) => `
              <div class="skill-item">${skill.name}</div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      ${cv.experience?.length > 0 ? `
        <div class="section">
          <h2>DENEYİMLER</h2>
          <div class="timeline">
            ${cv.experience.map((exp: any) => `
              <div class="timeline-item">
                <h3 style="margin: 0; color: #333;">${exp.position}</h3>
                <div style="color: #666;">${exp.companyName}</div>
                <div style="color: #888; font-size: 14px;">${exp.startDate} - ${exp.endDate}</div>
                <p>${exp.description}</p>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      ${cv.education?.length > 0 ? `
        <div class="section">
          <h2>EĞİTİM</h2>
          <div class="timeline">
            ${cv.education.map((edu: any) => `
              <div class="timeline-item">
                <h3 style="margin: 0; color: #333;">${edu.schoolName}</h3>
                <div style="color: #666;">${edu.department}</div>
                <div style="color: #888; font-size: 14px;">${edu.startDate} - ${edu.endDate}</div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <div class="section">
        <h2>İLETİŞİM</h2>
        <div class="contact-info">
          ${cv.personal?.email ? `
            <div class="contact-item">
              📧 ${cv.personal.email}
            </div>
          ` : ''}
          ${cv.personal?.phone ? `
            <div class="contact-item">
              📱 ${cv.personal.phone}
            </div>
          ` : ''}
          ${cv.personal?.address ? `
            <div class="contact-item">
              📍 ${cv.personal.address}
            </div>
          ` : ''}
        </div>
      </div>
    </body>
    </html>
  `
}; 