interface CV {
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
}

export const generateCVHtml = (cv: CV, profileImageUri?: string | null) => {
  return `
    <!DOCTYPE html>
    <html lang="tr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${cv.personal?.fullName || 'CV'}</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
                line-height: 1.6;
            }
            
            .header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 30px;
            }
            
            .header h1 {
                margin: 0;
                font-size: 32px;
            }
            
            .cv-badge {
                background-color: #2196F3;
                color: white;
                padding: 8px 16px;
                border-radius: 4px;
                font-weight: bold;
            }
            
            .contact-info {
                margin-bottom: 30px;
            }
            
            .personal-info {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 20px;
                margin-bottom: 30px;
            }
            
            .personal-info-item {
                margin-bottom: 10px;
            }
            
            .personal-info-item label {
                font-weight: bold;
                display: block;
                margin-bottom: 5px;
            }
            
            .section {
                margin-bottom: 30px;
            }
            
            .section h2 {
                border-bottom: 2px solid #2196F3;
                padding-bottom: 5px;
                margin-bottom: 15px;
            }
            
            .job {
                margin-bottom: 20px;
            }
            
            .job h3 {
                margin-bottom: 5px;
                color: #333;
            }
            
            .job-location {
                color: #666;
                font-style: italic;
                margin-bottom: 10px;
            }
            
            .skills-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 10px;
            }
            
            .skill-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 5px 0;
            }
            
            .skill-level {
                color: #666;
            }

            .profile-image {
                width: 120px;
                height: 120px;
                border-radius: 60px;
                object-fit: cover;
                margin-right: 20px;
            }

            .header-content {
                display: flex;
                align-items: center;
            }
        </style>
    </head>
    <body>
        <div class="header">
            <div class="header-content">
                ${profileImageUri ? `<img src="${profileImageUri}" class="profile-image" alt="Profile" />` : ''}
                <h1>${cv.personal?.fullName?.toUpperCase() || 'CV'}</h1>
            </div>
            <div class="cv-badge">CV</div>
        </div>
        
        <div class="contact-info">
            ${cv.personal?.address ? `<span>📍 ${cv.personal.address}</span> &nbsp;|&nbsp;` : ''}
            ${cv.personal?.phone ? `<span>📞 ${cv.personal.phone}</span> &nbsp;|&nbsp;` : ''}
            ${cv.personal?.email ? `<span>📧 ${cv.personal.email}</span>` : ''}
        </div>
        
        <div class="personal-info">
            ${cv.personal?.birthDate ? `
                <div class="personal-info-item">
                    <label>Doğum tarihi</label>
                    ${cv.personal.birthDate}
                </div>
            ` : ''}
            ${cv.personal?.gender ? `
                <div class="personal-info-item">
                    <label>Cinsiyet</label>
                    ${cv.personal.gender}
                </div>
            ` : ''}
            ${cv.personal?.maritalStatus ? `
                <div class="personal-info-item">
                    <label>Medeni durum</label>
                    ${cv.personal.maritalStatus}
                </div>
            ` : ''}
            ${cv.personal?.drivingLicense ? `
                <div class="personal-info-item">
                    <label>Sürücü ehliyeti</label>
                    ${cv.personal.drivingLicense}
                </div>
            ` : ''}
        </div>
        
        ${cv.about ? `
            <div class="section">
                <p>${cv.about}</p>
            </div>
        ` : ''}
        
        ${cv.experience && cv.experience.length > 0 ? `
            <div class="section">
                <h2>İş tecrübesi</h2>
                ${cv.experience.map(exp => `
                    <div class="job">
                        <h3>${exp.position}</h3>
                        <div class="job-location">${exp.companyName}, ${exp.startDate} - ${exp.endDate}</div>
                        <p>${exp.description}</p>
                    </div>
                `).join('')}
            </div>
        ` : ''}
        
        ${cv.education && cv.education.length > 0 ? `
            <div class="section">
                <h2>Eğitim</h2>
                ${cv.education.map(edu => `
                    <div class="job">
                        <h3>${edu.schoolName}</h3>
                        <div class="job-location">${edu.department}, ${edu.startDate} - ${edu.endDate}</div>
                    </div>
                `).join('')}
            </div>
        ` : ''}
        
        ${cv.skills && cv.skills.length > 0 ? `
            <div class="section">
                <h2>Beceriler</h2>
                <div class="skills-grid">
                    ${cv.skills.map(skill => `
                        <div class="skill-item">
                            <span>${skill.name}</span>
                            <span class="skill-level">${skill.level}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        ` : ''}
    </body>
    </html>
  `;
}; 