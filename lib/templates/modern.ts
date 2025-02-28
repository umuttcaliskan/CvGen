export const modernTemplate = {
  id: 'modern',
  name: 'Modern',
  styles: {
    fontFamily: 'Roboto, sans-serif',
    backgroundColor: '#ffffff',
    primaryColor: '#1976d2',
    secondaryColor: '#f5f5f5'
  },
  generateHTML: (cv: any, profileImageBase64: string | null) => `
    <!DOCTYPE html>
    <html lang="tr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${cv.personal?.fullName || 'CV'}</title>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                font-family: 'Roboto', sans-serif;
            }
            
            body {
                background-color: #f5f5f5;
                color: #333;
                line-height: 1.6;
            }
            
            .container {
                max-width: 800px;
                margin: 0 auto;
                background-color: #fff;
                box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
            }
            
            .header {
                background-color: #1976d2;
                color: white;
                padding: 30px;
                display: flex;
                align-items: center;
            }
            
            .profile-image {
                width: 120px;
                height: 120px;
                border-radius: 50%;
                object-fit: cover;
                border: 3px solid white;
                margin-right: 30px;
            }
            
            .profile-initial {
                width: 120px;
                height: 120px;
                border-radius: 50%;
                background: white;
                color: #1976d2;
                font-size: 48px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 30px;
                font-weight: bold;
            }
            
            .name-title {
                flex: 1;
            }
            
            .name-title h1 {
                font-size: 32px;
                margin-bottom: 5px;
            }
            
            .position {
                font-size: 18px;
                opacity: 0.9;
            }
            
            .info {
                display: flex;
            }
            
            .left-column {
                width: 33%;
                background-color: #f5f5f5;
                padding: 30px;
            }
            
            .right-column {
                width: 67%;
                padding: 30px;
            }
            
            .section {
                margin-bottom: 25px;
            }
            
            .section-title {
                color: #1976d2;
                font-size: 18px;
                text-transform: uppercase;
                border-bottom: 2px solid #1976d2;
                padding-bottom: 5px;
                margin-bottom: 15px;
                font-weight: 500;
            }
            
            .contact-info div {
                margin-bottom: 10px;
                display: flex;
                align-items: center;
            }
            
            .contact-info span {
                margin-right: 10px;
                font-size: 16px;
            }
            
            .skill-level {
                height: 8px;
                background-color: #ddd;
                border-radius: 4px;
                margin-top: 5px;
                overflow: hidden;
            }
            
            .skill-bar {
                height: 100%;
                background-color: #1976d2;
            }
            
            .exp-item, .edu-item {
                margin-bottom: 20px;
            }
            
            .exp-title, .edu-title {
                font-weight: bold;
                font-size: 16px;
                margin-bottom: 3px;
            }
            
            .exp-company, .edu-school {
                font-weight: 500;
                color: #555;
                margin-bottom: 3px;
            }
            
            .exp-date, .edu-date {
                color: #777;
                font-size: 14px;
                margin-bottom: 5px;
            }
            
            .exp-desc {
                text-align: justify;
            }
            
            @media print {
                body {
                    background-color: white;
                }
                
                .container {
                    box-shadow: none;
                    max-width: 100%;
                }
                
                .section {
                    break-inside: avoid;
                    page-break-inside: avoid;
                }
                
                .exp-item, .edu-item {
                    break-inside: avoid;
                    page-break-inside: avoid;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                ${profileImageBase64 ? 
                    `<img src="${profileImageBase64}" class="profile-image" alt="Profile">` : 
                    `<div class="profile-initial">${cv.personal?.fullName?.charAt(0).toUpperCase() || 'U'}</div>`
                }
                <div class="name-title">
                    <h1>${cv.personal?.fullName || 'İsimsiz'}</h1>
                    ${cv.experience?.[0]?.position ? 
                        `<div class="position">${cv.experience[0].position}</div>` : ''
                    }
                </div>
            </div>
            
            <div class="info">
                <div class="left-column">
                    <div class="section">
                        <h2 class="section-title">İletişim</h2>
                        <div class="contact-info">
                            ${cv.personal?.email ? `<div><span>📧</span> ${cv.personal.email}</div>` : ''}
                            ${cv.personal?.phone ? `<div><span>📱</span> ${cv.personal.phone}</div>` : ''}
                            ${cv.personal?.address ? `<div><span>📍</span> ${cv.personal.address}</div>` : ''}
                        </div>
                    </div>
                    
                    ${cv.personal?.birthDate || cv.personal?.maritalStatus || cv.personal?.militaryStatus || cv.personal?.drivingLicense ? `
                        <div class="section">
                            <h2 class="section-title">Kişisel Bilgiler</h2>
                            <div class="contact-info">
                                ${cv.personal?.birthDate ? `<div><span>🎂</span> ${cv.personal.birthDate}</div>` : ''}
                                ${cv.personal?.maritalStatus ? `<div><span>💍</span> ${cv.personal.maritalStatus}</div>` : ''}
                                ${cv.personal?.militaryStatus ? `<div><span>🛡️</span> ${cv.personal.militaryStatus}</div>` : ''}
                                ${cv.personal?.drivingLicense ? `<div><span>🚗</span> ${cv.personal.drivingLicense}</div>` : ''}
                            </div>
                        </div>
                    ` : ''}
                    
                    ${cv.socialMedia?.length > 0 ? `
                        <div class="section">
                            <h2 class="section-title">Sosyal Medya</h2>
                            <div class="contact-info">
                                ${cv.socialMedia.map((social: any) => `
                                    <div>
                                        <span>🔗</span> 
                                        <a href="${social.url}" style="color: #1976d2; text-decoration: none;" target="_blank">
                                            ${getPlatformName(social.platform)}: ${social.username}
                                        </a>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                    
                    ${cv.skills?.length > 0 ? `
                        <div class="section">
                            <h2 class="section-title">Beceriler</h2>
                            ${cv.skills.map((skill: any) => `
                                <div style="margin-bottom: 12px;">
                                    <div style="display: flex; justify-content: space-between;">
                                        <span>${skill.name}</span>
                                        <span>${skill.level}</span>
                                    </div>
                                    <div class="skill-level">
                                        <div class="skill-bar" style="width: ${
                                            skill.level === 'Başlangıç' ? '25%' :
                                            skill.level === 'Orta' ? '50%' :
                                            skill.level === 'İleri' ? '75%' :
                                            skill.level === 'Uzman' ? '100%' : '50%'
                                        }"></div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
                    
                    ${cv.languages?.length > 0 ? `
                        <div class="section">
                            <h2 class="section-title">Diller</h2>
                            ${cv.languages.map((lang: any) => `
                                <div style="margin-bottom: 12px;">
                                    <div style="display: flex; justify-content: space-between;">
                                        <span>${lang.name}</span>
                                        <span>${lang.level}</span>
                                    </div>
                                    <div class="skill-level">
                                        <div class="skill-bar" style="width: ${
                                            lang.level === 'Başlangıç' ? '25%' :
                                            lang.level === 'Orta' ? '50%' :
                                            lang.level === 'İleri' ? '75%' :
                                            lang.level === 'Anadil' ? '100%' : '50%'
                                        }"></div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
                
                <div class="right-column">
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
                                <div class="exp-item">
                                    <div class="exp-title">${exp.position}</div>
                                    <div class="exp-company">${exp.companyName}</div>
                                    <div class="exp-date">${exp.startDate} - ${exp.endDate}</div>
                                    <div class="exp-desc">${exp.description}</div>
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
                    
                    ${cv.education?.length > 0 ? `
                        <div class="section">
                            <h2 class="section-title">Eğitim</h2>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                                ${cv.education.map((edu: any) => `
                                    <div class="edu-item">
                                        <div class="edu-title">${edu.department}</div>
                                        <div class="edu-school">${edu.schoolName}</div>
                                        <div class="edu-date">${edu.startDate} - ${edu.endDate}</div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                    
                    ${cv.certificates?.length > 0 ? `
                        <div class="section">
                            <h2 class="section-title">Sertifikalar</h2>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                                ${cv.certificates.map((cert: any) => `
                                    <div class="edu-item">
                                        <div class="edu-title">${cert.name}</div>
                                        <div class="edu-school">${cert.institution}</div>
                                        <div class="edu-date">${cert.date}</div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                    
                    ${cv.references?.length > 0 ? `
                        <div class="section">
                            <h2 class="section-title">Referanslar</h2>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                                ${cv.references.map((ref: any) => `
                                    <div class="exp-item">
                                        <div class="exp-title">${ref.fullName}</div>
                                        <div class="exp-company">${ref.position}, ${ref.company}</div>
                                        ${ref.email ? `<div>📧 ${ref.email}</div>` : ''}
                                        ${ref.phone ? `<div>📱 ${ref.phone}</div>` : ''}
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                </div>
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