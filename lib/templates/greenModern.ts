export const greenModernTemplate = {
  id: 'greenModern',
  name: 'Yeşil Modern',
  styles: {
    fontFamily: 'Roboto, Arial, sans-serif',
    backgroundColor: '#ffffff',
    primaryColor: '#466d5a',
    secondaryColor: '#ecf0eb'
  },
  generateHTML: (cv: any, profileImageBase64: string | null) => `
    <!DOCTYPE html>
    <html lang="tr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${cv.personal?.fullName || 'CV'}</title>
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        <style>
            html, body {
                height: 100%;
                margin: 0;
                padding: 0;
            }
            
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                font-family: 'Open Sans', sans-serif;
            }
            
            body {
                background-color: #f9f9f9;
                color: #333;
                line-height: 1.6;
            }
            
            .container {
                max-width: 800px;
                margin: 0 auto;
                background-color: #fff;
                box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
                position: relative;
                min-height: 100vh;
            }
            
            .header {
                background-color: #466d5a;
                padding-top: 100px;
                padding-bottom: 30px;
                text-align: center;
                color: white;
                position: relative;
                margin-top: 75px;
            }
            
            .profile-wrapper {
                position: absolute;
                top: -75px;
                left: 50%;
                transform: translateX(-50%);
                width: 150px;
                height: 150px;
                z-index: 5;
            }
            
            .profile-circle {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                border: 5px solid white;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                overflow: hidden;
                background-color: #fff;
            }
            
            .profile-image {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            
            .profile-initial {
                width: 100%;
                height: 100%;
                background: #f0f0f0;
                color: #466d5a;
                font-size: 60px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                border-radius: 50%;
            }
            
            .header h1 {
                font-size: 32px;
                margin-bottom: 8px;
                font-weight: 700;
                text-transform: uppercase;
            }
            
            .header h2 {
                font-size: 20px;
                font-weight: 400;
                opacity: 0.9;
            }
            
            .about-text {
                padding: 25px 40px;
                text-align: center;
                color: #444;
                border-bottom: 1px solid #eee;
                font-size: 15px;
            }
            
            .content {
                display: flex;
                min-height: calc(100vh - 280px);
            }
            
            .left-column {
                width: 35%;
                background-color: #f8f8f8;
                padding: 30px;
                position: relative;
            }
            
            .right-column {
                width: 65%;
                padding: 30px;
            }
            
            .section {
                margin-bottom: 25px;
            }
            
            .section-title {
                color: #466d5a;
                font-size: 18px;
                text-transform: uppercase;
                border-bottom: 2px solid #466d5a;
                padding-bottom: 5px;
                margin-bottom: 15px;
                font-weight: 600;
                letter-spacing: 1px;
            }
            
            .skill-item, .language-item {
                margin-bottom: 12px;
            }
            
            .skill-item li, .language-item li {
                list-style-type: none;
                margin-bottom: 8px;
                font-size: 14px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .skill-name {
                font-weight: 500;
            }
            
            .skill-level {
                color: #466d5a;
                font-weight: 500;
            }
            
            .contact-item {
                display: flex;
                align-items: center;
                margin-bottom: 10px;
                font-size: 14px;
            }
            
            .contact-item span {
                margin-right: 8px;
                font-size: 16px;
            }
            
            .experience-item, .education-item, .certificate-item {
                margin-bottom: 20px;
                page-break-inside: avoid;
            }
            
            .experience-item h3, .education-item h3, .certificate-item h3 {
                font-weight: 600;
                font-size: 16px;
                margin-bottom: 4px;
                color: #333;
            }
            
            .experience-item h4, .education-item h4 {
                font-weight: 500;
                font-size: 15px;
                color: #555;
                margin-bottom: 4px;
            }
            
            .date {
                font-size: 14px;
                color: #777;
                margin-bottom: 8px;
            }
            
            .experience-item p {
                font-size: 14px;
                color: #555;
                text-align: justify;
            }
            
            .education-grid, .certificate-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                grid-gap: 20px;
            }
            
            @media (max-width: 600px) {
                .education-grid, .certificate-grid {
                    grid-template-columns: 1fr;
                }
            }
            
            @media print {
                body {
                    background-color: white;
                    margin: 0;
                    padding: 0;
                }
                
                .container {
                    box-shadow: none;
                    width: 100%;
                    max-width: 100%;
                }
                
                .header {
                    -webkit-print-color-adjust: exact !important;
                    print-color-adjust: exact !important;
                }
                
                .left-column {
                    -webkit-print-color-adjust: exact !important;
                    print-color-adjust: exact !important;
                    background-color: #f8f8f8 !important;
                }
                
                .profile-wrapper {
                    position: absolute !important;
                    z-index: 5 !important;
                }
                
                .profile-circle {
                    overflow: hidden !important;
                    border-radius: 50% !important;
                    border: 5px solid white !important;
                }
                
                .profile-image {
                    border-radius: 50% !important;
                    background-color: white !important;
                }
                
                .profile-initial {
                    border-radius: 50% !important;
                }
                
                .content {
                    display: flex !important;
                    min-height: calc(100vh - 280px) !important;
                    page-break-inside: auto;
                }
                
                .section-title {
                    page-break-after: avoid;
                }
                
                /* Her kayıt kendi içinde bir bütün olarak kalsın */
                .experience-item, .education-item, .certificate-item {
                    page-break-inside: avoid;
                }
                
                /* Header her zaman sayfanın üstünde kalsın ve bölünmesin */
                .header {
                    page-break-inside: avoid;
                }
                
                /* Bölüm başlıkları asla tek başına kalmasın */
                h2, h3 {
                    page-break-after: avoid;
                }
                
                /* About kısmı bölünmesin */
                .about-text {
                    page-break-inside: avoid;
                }
            }
            
            .references-grid {
                display: block;
            }
            
            .reference-item {
                background-color: #f9f9f9;
                border-radius: 6px;
                padding: 15px;
                margin-bottom: 15px;
                box-shadow: 0 1px 3px rgba(0,0,0,0.05);
            }
            
            .reference-item h4 {
                margin-bottom: 8px;
                font-weight: 600;
                color: #466d5a;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="profile-wrapper">
                    ${profileImageBase64 ? 
                        `<img src="${profileImageBase64}" style="width: 150px; height: 150px; border-radius: 50%; border: 5px solid white; background-color: white; object-fit: cover;">` : 
                        `<div style="width: 150px; height: 150px; border-radius: 50%; background-color: #f0f0f0; color: #466d5a; font-size: 60px; display: flex; align-items: center; justify-content: center; font-weight: bold; border: 5px solid white;">${cv.personal?.fullName?.charAt(0).toUpperCase() || 'U'}</div>`
                    }
                </div>
                
                <h1>${cv.personal?.fullName || 'İSİM SOYİSİM'}</h1>
                <h2>${cv.experience?.[0]?.position || 'Yazılım Mühendisi'}</h2>
            </div>
            
            ${cv.about ? 
                `<div class="about-text">
                    ${cv.about}
                </div>` : ''}
            
            <div class="content">
                <div class="left-column">
                    <div class="section">
                        <h2 class="section-title">Kişisel Bilgiler</h2>
                        <div class="contact-info">
                            ${cv.personal?.email ? `<div class="contact-item">${cv.personal.email}</div>` : ''}
                            ${cv.personal?.phone ? `<div class="contact-item">${cv.personal.phone}</div>` : ''}
                            ${cv.personal?.address ? `<div class="contact-item">${cv.personal.address}</div>` : ''}
                            ${cv.personal?.website ? `<div class="contact-item">Web: ${cv.personal.website}</div>` : ''}
                            ${cv.personal?.birthDate ? `<div class="contact-item">Doğum Tarihi: ${cv.personal.birthDate}</div>` : ''}
                            ${cv.personal?.drivingLicense ? `<div class="contact-item">Ehliyet: ${cv.personal.drivingLicense}</div>` : ''}
                            ${cv.personal?.maritalStatus ? `<div class="contact-item">Medeni Durum: ${cv.personal.maritalStatus}</div>` : ''}
                            ${cv.personal?.militaryStatus ? `<div class="contact-item">Askerlik Durumu: ${cv.personal.militaryStatus}</div>` : ''}
                        </div>
                    </div>
                    
                    ${cv.socialMedia?.length > 0 ? `
                    <div class="section">
                        <h2 class="section-title">Sosyal Medya</h2>
                        <div class="contact-info">
                            ${cv.socialMedia.map((social: any) => `
                                <div class="contact-item">${social.platform}: ${social.username}</div>
                            `).join('')}
                        </div>
                    </div>
                    ` : ''}
                    
                    ${cv.skills?.length > 0 ? `
                    <div class="section">
                        <h2 class="section-title">Yetenekler</h2>
                        <ul class="skill-item">
                            ${cv.skills.map((skill: any) => `
                                <li>
                                    <span class="skill-name">${skill.name}</span>
                                    ${skill.level ? `<span class="skill-level">${skill.level}</span>` : ''}
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                    ` : ''}
                    
                    ${cv.languages?.length > 0 ? `
                    <div class="section">
                        <h2 class="section-title">Diller</h2>
                        <ul class="language-item">
                            ${cv.languages.map((lang: any) => `
                                <li>${lang.name} - ${lang.level}</li>
                            `).join('')}
                        </ul>
                    </div>
                    ` : ''}
                    
                    ${cv.references?.length > 0 ? `
                    <div class="section">
                        <h2 class="section-title">Referanslar</h2>
                        <div class="references-grid">
                            ${cv.references.map((ref: any) => `
                                <div class="reference-item">
                                    <h4>${ref.fullName}</h4>
                                    ${ref.position ? `<div class="contact-item">${ref.position}</div>` : ''}
                                    ${ref.company ? `<div class="contact-item">${ref.company}</div>` : ''}
                                    ${ref.phone ? `<div class="contact-item"><span>📱</span> ${ref.phone}</div>` : ''}
                                    ${ref.email ? `<div class="contact-item"><span>📧</span> ${ref.email}</div>` : ''}
                                </div>
                            `).join('')}
                        </div>
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
                                    <h3>${edu.schoolName}</h3>
                                    <h4>${edu.department || ''} ${edu.grade ? `- ${edu.grade}` : ''}</h4>
                                    <div class="date">${edu.startDate || ''} - ${edu.endDate || 'Devam Ediyor'}</div>
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
                                <h3>${exp.position}</h3>
                                <h4>${exp.companyName}</h4>
                                <div class="date">${exp.startDate || ''} - ${exp.endDate || 'Devam Ediyor'}</div>
                                ${exp.description ? `<p>${exp.description}</p>` : ''}
                            </div>
                        `).join('')}
                    </div>
                    ` : ''}
                    
                    ${cv.projects?.length > 0 ? `
                    <div class="section">
                        <h2 class="section-title">Projeler</h2>
                        ${cv.projects.map((project: any) => `
                            <div class="experience-item">
                                <h3>${project.name}</h3>
                                <div class="date">${project.startDate || ''} - ${project.endDate || 'Devam Ediyor'}</div>
                                ${project.description ? `<p>${project.description}</p>` : ''}
                            </div>
                        `).join('')}
                    </div>
                    ` : ''}
                    
                    ${cv.certificates?.length > 0 ? `
                    <div class="section">
                        <h2 class="section-title">Sertifikalar</h2>
                        <div class="certificate-grid">
                            ${cv.certificates.map((cert: any) => `
                                <div class="certificate-item">
                                    <h3>${cert.name}</h3>
                                    <div class="date">${cert.startDate || ''} - ${cert.endDate || 'Süresiz'}</div>
                                    ${cert.institution ? `<p>${cert.institution}</p>` : ''}
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