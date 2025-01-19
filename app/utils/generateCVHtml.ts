interface CVData {
  id: string;
  userId: string;
  personal?: {
    fullName: string;
    email: string;
    phone: string;
    birthDate: string;
    address: string;
    gender?: string;
    maritalStatus?: string;
    drivingLicense?: string;
  };
  about?: string;
  education?: Array<{
    id: string;
    schoolName: string;
    department: string;
    startDate: string;
    endDate: string;
  }>;
  experience?: Array<{
    id: string;
    companyName: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  skills?: Array<{
    id: string;
    name: string;
    level: string;
  }>;
  languages?: Array<{
    id: string;
    name: string;
    level: string;
  }>;
  references?: Array<{
    id: string;
    fullName: string;
    company: string;
    position: string;
    phone: string;
    email: string;
  }>;
  createdAt: {
    toDate: () => Date;
  };
}

export const generateCVHtml = (cv: CVData, profileImageUri: string | null): string => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>${cv.personal?.fullName || 'CV'}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          margin: 0;
          padding: 20px;
          color: #333;
        }
        .container {
          max-width: 800px;
          margin: 0 auto;
          background: #fff;
          padding: 30px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        .profile-image {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          object-fit: cover;
          margin-bottom: 20px;
        }
        .name {
          font-size: 28px;
          font-weight: bold;
          margin-bottom: 10px;
          color: #2563eb;
        }
        .contact-info {
          margin-bottom: 20px;
          color: #666;
        }
        .section {
          margin-bottom: 30px;
        }
        .section-title {
          font-size: 20px;
          font-weight: bold;
          color: #2563eb;
          border-bottom: 2px solid #2563eb;
          padding-bottom: 5px;
          margin-bottom: 15px;
        }
        .item {
          margin-bottom: 20px;
        }
        .item-title {
          font-weight: bold;
          margin-bottom: 5px;
        }
        .item-subtitle {
          color: #666;
          font-style: italic;
          margin-bottom: 5px;
        }
        .item-date {
          color: #888;
          font-size: 14px;
          margin-bottom: 5px;
        }
        .item-description {
          color: #444;
        }
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }
        .skill-item {
          display: flex;
          justify-content: space-between;
          padding: 5px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          ${profileImageUri ? `<img src="data:image/jpeg;base64,${profileImageUri}" class="profile-image" alt="Profile" />` : ''}
          <div class="name">${cv.personal?.fullName || 'İsimsiz'}</div>
          <div class="contact-info">
            ${cv.personal?.email ? `<div>📧 ${cv.personal.email}</div>` : ''}
            ${cv.personal?.phone ? `<div>📱 ${cv.personal.phone}</div>` : ''}
            ${cv.personal?.address ? `<div>📍 ${cv.personal.address}</div>` : ''}
            ${cv.personal?.birthDate ? `<div>🎂 ${cv.personal.birthDate}</div>` : ''}
          </div>
        </div>

        ${cv.about ? `
          <div class="section">
            <div class="section-title">Hakkımda</div>
            <div class="item-description">${cv.about}</div>
          </div>
        ` : ''}

        ${cv.experience && cv.experience.length > 0 ? `
          <div class="section">
            <div class="section-title">İş Deneyimi</div>
            ${cv.experience.map(exp => `
              <div class="item">
                <div class="item-title">${exp.position}</div>
                <div class="item-subtitle">${exp.companyName}</div>
                <div class="item-date">${exp.startDate} - ${exp.endDate}</div>
                <div class="item-description">${exp.description}</div>
              </div>
            `).join('')}
          </div>
        ` : ''}

        ${cv.education && cv.education.length > 0 ? `
          <div class="section">
            <div class="section-title">Eğitim</div>
            ${cv.education.map(edu => `
              <div class="item">
                <div class="item-title">${edu.schoolName}</div>
                <div class="item-subtitle">${edu.department}</div>
                <div class="item-date">${edu.startDate} - ${edu.endDate}</div>
              </div>
            `).join('')}
          </div>
        ` : ''}

        ${cv.skills && cv.skills.length > 0 ? `
          <div class="section">
            <div class="section-title">Beceriler</div>
            <div class="skills-grid">
              ${cv.skills.map(skill => `
                <div class="skill-item">
                  <span>${skill.name}</span>
                  <span>${skill.level}</span>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        ${cv.languages && cv.languages.length > 0 ? `
          <div class="section">
            <div class="section-title">Yabancı Diller</div>
            <div class="skills-grid">
              ${cv.languages.map(lang => `
                <div class="skill-item">
                  <span>${lang.name}</span>
                  <span>${lang.level}</span>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        ${cv.references && cv.references.length > 0 ? `
          <div class="section">
            <div class="section-title">Referanslar</div>
            ${cv.references.map(ref => `
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
  `;
}; 