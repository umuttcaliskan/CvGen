export const twoColumnTemplate = {
  id: 'twoColumn',
  name: 'İki Sütunlu',
  styles: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#ffffff',
    primaryColor: '#2c3e50',
    secondaryColor: '#34495e'
  },
  generateHTML: (cv: any, profileImageBase64: string | null) => `
    <!DOCTYPE html>
    <html lang="tr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${cv.personal?.fullName || 'CV'}</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                font-family: Arial, sans-serif;
            }
            
            body {
                background-color: #f5f5f5;
                color: #333;
                line-height: 1.6;
                min-height: 100vh;
            }
            
            .container {
                max-width: 1000px;
                margin: 0 auto;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                position: relative;
                min-height: 100vh;
                background-color: white;
            }
            
            .content-wrapper {
                display: flex;
                position: relative;
                min-height: 100vh;
            }
            
            /* Sol kolon sabit arka planı - Tam yükseklik */
            .left-column-bg {
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                width: 35%;
                background-color: #2c3e50;
                min-height: 100vh;
                z-index: 0;
            }
            
            .left-column {
                width: 35%;
                color: white;
                padding: 40px 20px;
                position: relative;
                z-index: 1;
                min-height: 100vh;
                background-color: transparent;  /* Arkaplanı transparan yap */
            }
            
            .right-column {
                width: 65%;
                background-color: white;
                padding: 40px 30px;
                position: relative;
                z-index: 1;
                min-height: 100vh;
            }
            
            .profile-image {
                width: 150px;
                height: 150px;
                border-radius: 50%;
                border: 5px solid rgba(255, 255, 255, 0.2);
                margin: 0 auto 20px;
                display: block;
                object-fit: cover;
            }
            
            .profile-initial {
                width: 150px;
                height: 150px;
                border-radius: 50%;
                background-color: #34495e;
                color: white;
                font-size: 64px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 20px;
            }
            
            h1 {
                font-size: 28px;
                margin-bottom: 5px;
                color: #fff;
                text-align: center;
            }
            
            .title {
                font-size: 18px;
                color: #ccc;
                text-align: center;
                margin-bottom: 30px;
            }
            
            .section-title {
                font-size: 22px;
                margin-bottom: 15px;
                color: #2c3e50;
                border-bottom: 2px solid #2c3e50;
                padding-bottom: 5px;
            }
            
            .left-section-title {
                font-size: 18px;
                text-transform: uppercase;
                margin: 30px 0 15px;
                color: #fff;
                border-bottom: 1px solid rgba(255, 255, 255, 0.3);
                padding-bottom: 5px;
            }
            
            .contact-item {
                margin-bottom: 10px;
                display: flex;
                align-items: center;
            }
            
            .contact-item i {
                width: 20px;
                margin-right: 10px;
                text-align: center;
            }
            
            .education-item, .experience-item, .certificate-item {
                margin-bottom: 25px;
                page-break-inside: avoid;
            }
            
            .item-title {
                font-weight: bold;
                font-size: 18px;
                margin-bottom: 5px;
            }
            
            .item-subtitle {
                font-weight: 500;
                color: #666;
                margin-bottom: 5px;
            }
            
            .item-date {
                color: #999;
                font-size: 14px;
                margin-bottom: 5px;
            }
            
            .skill-item {
                display: flex;
                justify-content: space-between;
                margin-bottom: 10px;
            }
            
            .language-item {
                margin-bottom: 15px;
            }
            
            .education-grid, .certificates-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 20px;
            }
            
            .certificate-item {
                break-inside: avoid; /* Modern tarayıcılar için */
            }
            
            .section {
                margin-bottom: 30px;
                page-break-inside: avoid;
            }
            
            .left-section {
                margin-bottom: 25px;
                page-break-inside: avoid;
            }
            
            /* Sayfa geçişlerinde düzenleme */
            @page {
                margin: 0; /* Sayfa marjını sıfırla */
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
                    min-height: auto;
                }
                
                .content-wrapper {
                    min-height: auto;
                    padding-top: 40px; /* Sayfa başına içerik boşluğu */
                    padding-bottom: 40px; /* Sayfa sonuna içerik boşluğu */
                }
                
                .section, .left-section {
                    page-break-inside: avoid;
                }
                
                .experience-item, .education-item, .certificate-item {
                    page-break-inside: avoid;
                }
                
                /* Sol kolon yazdırma ayarı - Her sayfada görünmesi için */
                .left-column-bg {
                    position: fixed;
                    height: 100%;
                    min-height: 100%;
                    top: 0;
                    left: 0;
                    -webkit-print-color-adjust: exact;
                    print-color-adjust: exact;
                }
                
                .left-column {
                    background-color: transparent;
                    min-height: auto;
                }
                
                .right-column {
                    background-color: white;
                    min-height: auto;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <!-- Sol kolon arka planı -->
            <div class="left-column-bg"></div>
            
            <div class="content-wrapper">
                <div class="left-column">
                    ${profileImageBase64 ? 
                        `<img src="${profileImageBase64}" alt="Profil" class="profile-image">` : 
                        `<div class="profile-initial">${cv.personal?.fullName?.charAt(0).toUpperCase() || 'U'}</div>`
                    }
                    <h1>${cv.personal?.fullName || 'İsimsiz'}</h1>
                    <p class="title">${cv.experience?.[0]?.position || 'Dijital Pazarlama Uzmanı'}</p>
                    
                    <div class="left-section">
                        <h2 class="left-section-title">Hakkımda</h2>
                        <p>${cv.about || 'Hakkımda bilgisi bulunamadı.'}</p>
                    </div>
                    
                    <div class="left-section">
                        <h2 class="left-section-title">İletişim</h2>
                        ${cv.personal ? `
                        <div class="contact-item">
                            <i>📞</i>
                            <span>${cv.personal.phone || '0212 123 24 25'}</span>
                        </div>
                        <div class="contact-item">
                            <i>✉️</i>
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
                        <h2 class="left-section-title">Sosyal Medya</h2>
                        ${cv.socialMedia.map((social: any) => `
                        <div class="contact-item">
                            <i>🔗</i>
                            <span>${social.platform}: ${social.username}</span>
                        </div>
                        `).join('')}
                    </div>
                    ` : ''}
                    
                    ${cv.languages?.length > 0 ? `
                    <div class="left-section">
                        <h2 class="left-section-title">Diller</h2>
                        ${cv.languages.map((lang: any) => `
                        <div class="language-item">
                            <div class="skill-item">
                                <span>${lang.name}</span>
                                <span>${lang.level}</span>
                            </div>
                        </div>
                        `).join('')}
                    </div>
                    ` : ''}
                    
                    ${cv.skills?.length > 0 ? `
                    <div class="left-section">
                        <h2 class="left-section-title">Beceriler</h2>
                        ${cv.skills.map((skill: any) => `
                        <div class="skill-item">
                            <span>${skill.name}</span>
                            <span>${skill.level}</span>
                        </div>
                        `).join('')}
                    </div>
                    ` : ''}
                </div>
                
                <div class="right-column">
                    ${cv.education?.length > 0 ? `
                    <div class="section">
                        <h2 class="section-title">Eğitim</h2>
                        <div class="education-grid">
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
                        <h2 class="section-title">İş Deneyimi</h2>
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
                    
                    ${cv.projects?.length > 0 ? `
                    <div class="section">
                        <h2 class="section-title">Projeler</h2>
                        ${cv.projects.map((project: any) => `
                        <div class="experience-item">
                            <div class="item-title">${project.name}</div>
                            <div class="item-date">${project.startDate} - ${project.endDate}</div>
                            <p>${project.description}</p>
                            ${project.technologies ? `<p><strong>Teknolojiler:</strong> ${project.technologies}</p>` : ''}
                            ${project.projectUrl ? `<p><strong>URL:</strong> ${project.projectUrl}</p>` : ''}
                        </div>
                        `).join('')}
                    </div>
                    ` : ''}
                    
                    ${cv.certificates?.length > 0 ? `
                    <div class="section">
                        <h2 class="section-title">Sertifikalar</h2>
                        <div class="certificates-grid">
                            ${cv.certificates.map((cert: any) => `
                            <div class="certificate-item">
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
                        <h2 class="section-title">Referanslar</h2>
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