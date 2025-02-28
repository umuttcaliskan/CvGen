export const brownElegantTemplate = {
  id: 'brownElegant',
  name: 'Kahverengi Şık',
  styles: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#ffffff',
    primaryColor: '#6d4c41',
    secondaryColor: '#a1887f'
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
                background-color: #fff;
                color: #333;
                line-height: 1.6;
            }
            
            .container {
                max-width: 800px;
                margin: 0 auto;
                background-color: #fff;
            }
            
            .header {
                background-color: #6d4c41;
                padding: 30px;
                color: white;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .header-left {
                display: flex;
                align-items: center;
            }
            
            .profile-image-container {
                width: 120px;
                height: 120px;
                border-radius: 50%;
                overflow: hidden;
                border: 4px solid #fff;
                margin-right: 25px;
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
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: #a1887f;
                color: white;
                font-size: 48px;
                font-weight: bold;
            }
            
            .header-name {
                display: flex;
                flex-direction: column;
            }
            
            .header-name h1 {
                font-size: 28px;
                text-transform: uppercase;
                letter-spacing: 1px;
                margin-bottom: 5px;
            }
            
            .header-name h2 {
                font-size: 18px;
                font-weight: normal;
            }
            
            .header-contact {
                text-align: right;
                font-size: 14px;
            }
            
            .header-contact div {
                margin-bottom: 5px;
            }
            
            .about-section {
                padding: 30px;
                text-align: center;
                background-color: #f9f9f9;
                border-bottom: 1px solid #e0e0e0;
            }
            
            .about-text {
                max-width: 700px;
                margin: 0 auto;
                color: #555;
            }
            
            .content {
                display: flex;
                flex-wrap: wrap;
                padding: 30px;
            }
            
            .section {
                margin-bottom: 30px;
                width: 100%;
            }
            
            .half-section {
                width: 48%;
            }
            
            .left-column {
                margin-right: 4%;
            }
            
            .section-title {
                color: #6d4c41;
                font-size: 18px;
                font-weight: bold;
                text-transform: uppercase;
                margin-bottom: 15px;
                padding-bottom: 5px;
                border-bottom: 2px solid #6d4c41;
            }
            
            .skills-list {
                list-style-type: none;
            }
            
            .skills-list li {
                margin-bottom: 8px;
            }
            
            .language-list {
                list-style-type: none;
            }
            
            .language-list li {
                margin-bottom: 8px;
            }
            
            .edu-item, .exp-item, .cert-item {
                margin-bottom: 20px;
                page-break-inside: avoid;
            }
            
            .edu-title, .exp-position, .cert-name {
                font-weight: bold;
                font-size: 16px;
                margin-bottom: 5px;
                color: #444;
            }
            
            .edu-school, .exp-company, .cert-issuer {
                font-size: 15px;
                margin-bottom: 5px;
            }
            
            .edu-date, .exp-date, .cert-date {
                font-size: 14px;
                color: #777;
                margin-bottom: 5px;
            }
            
            .exp-description {
                font-size: 14px;
                color: #555;
            }
            
            .contact-item {
                display: flex;
                align-items: center;
                margin-bottom: 10px;
            }
            
            .contact-icon {
                margin-right: 10px;
                min-width: 20px;
                text-align: center;
            }
            
            .references-list {
                list-style-type: none;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
            }
            
            .reference-item {
                margin-bottom: 15px;
                page-break-inside: avoid;
                width: 31%;
                margin-right: 2%;
            }
            
            .reference-name {
                font-weight: bold;
                font-size: 16px;
                color: #444;
            }
            
            .reference-title {
                font-size: 14px;
                color: #555;
            }
            
            .reference-contact {
                font-size: 14px;
                color: #777;
            }
            
            .cert-item {
                margin-bottom: 20px;
                page-break-inside: avoid;
                width: 31%;
                margin-right: 2%;
                display: inline-block;
                vertical-align: top;
            }
            
            .cert-name {
                font-weight: bold;
                font-size: 16px;
                margin-bottom: 5px;
                color: #444;
            }
            
            /* Projeler için stiller */
            .projects-section {
                margin-bottom: 30px;
                page-break-inside: avoid;
            }
            
            .project-item {
                margin-bottom: 20px;
                page-break-inside: avoid;
            }
            
            .project-title {
                font-weight: bold;
                font-size: 16px;
                color: #444;
                margin-bottom: 5px;
            }
            
            .project-duration {
                font-size: 14px;
                color: #777;
                margin-bottom: 5px;
            }
            
            .project-description {
                font-size: 14px;
                color: #555;
            }
            
            /* Sosyal medya için stiller */
            .social-media-list {
                list-style-type: none;
                display: flex;
                flex-wrap: wrap;
            }
            
            .social-media-item {
                display: flex;
                align-items: center;
                margin-right: 15px;
                margin-bottom: 10px;
                width: 100%;
            }
            
            .social-media-platform {
                font-weight: bold;
                margin-right: 8px;
                color: #6d4c41;
                min-width: 80px;
            }
            
            .social-media-item a {
                text-decoration: none;
                color: #6d4c41;
            }
            
            .social-media-item a:hover {
                color: #a1887f;
            }
            
            /* Kişisel bilgiler için stiller */
            .personal-info-list {
                list-style-type: none;
            }
            
            .personal-info-item {
                margin-bottom: 8px;
                display: flex;
            }
            
            .personal-info-label {
                min-width: 120px;
                font-weight: bold;
                color: #555;
            }
            
            .personal-info-value {
                color: #333;
            }
            
            @media print {
                body {
                    -webkit-print-color-adjust: exact;
                    print-color-adjust: exact;
                }
                
                @page {
                    margin-top: 40px;
                }
                
                @page :first {
                    margin-top: 0;
                }
                
                .container {
                    width: 100%;
                    max-width: 100%;
                    box-shadow: none;
                }
                
                .header {
                    -webkit-print-color-adjust: exact;
                    print-color-adjust: exact;
                    page-break-after: avoid;
                }
                
                .section-title {
                    -webkit-print-color-adjust: exact;
                    print-color-adjust: exact;
                }
                
                .section {
                    page-break-inside: auto;
                }
                
                .section:last-of-type {
                    page-break-inside: avoid;
                }
                
                .edu-item, .exp-item, .cert-item, .reference-item {
                    break-inside: avoid;
                    page-break-inside: avoid;
                }
                
                /* Proje başlığının içerikle birlikte olması için */
                .projects-section .section-title {
                    page-break-after: avoid;
                }
                
                .project-item:first-of-type {
                    page-break-before: avoid;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="header-left">
                    <div class="profile-image-container">
                        ${profileImageBase64 ? 
                          `<img src="${profileImageBase64}" class="profile-image" alt="Profil">` : 
                          `<div class="profile-initial">${cv.personal?.fullName?.charAt(0).toUpperCase() || 'U'}</div>`
                        }
                    </div>
                    <div class="header-name">
                        <h1>${cv.personal?.fullName || 'İSİM SOYAD'}</h1>
                        <h2>${cv.experience?.[0]?.position || 'YAZILIM GELİŞTİRİCİ'}</h2>
                    </div>
                </div>
                <div class="header-contact">
                    ${cv.personal?.phone ? `<div>+${cv.personal.phone}</div>` : ''}
                    ${cv.personal?.email ? `<div>${cv.personal.email}</div>` : ''}
                </div>
            </div>
            
            ${cv.about ? `
            <div class="about-section">
                <div class="about-text">
                    ${cv.about}
                </div>
            </div>
            ` : ''}
            
            <div class="content">
                ${cv.skills?.length > 0 ? `
                <div class="section half-section left-column">
                    <div class="section-title">BECERİLER</div>
                    <ul class="skills-list">
                        ${cv.skills.map((skill: any) => `
                            <li>${skill.name} ${skill.level ? `- ${skill.level}` : ''}</li>
                        `).join('')}
                    </ul>
                </div>
                ` : ''}
                
                ${cv.education?.length > 0 ? `
                <div class="section half-section">
                    <div class="section-title">EĞİTİM GEÇMİŞİ</div>
                    ${cv.education.map((edu: any) => `
                        <div class="edu-item">
                            <div class="edu-title">${edu.schoolName}</div>
                            <div class="edu-school">${edu.department} - ${edu.grade || ''}</div>
                            <div class="edu-date">${edu.startDate || ''} - ${edu.endDate || 'Devam Ediyor'}</div>
                        </div>
                    `).join('')}
                </div>
                ` : ''}
                
                ${cv.experience?.length > 0 ? `
                <div class="section">
                    <div class="section-title">ÇALIŞMA DENEYİMİ</div>
                    ${cv.experience.map((exp: any) => `
                        <div class="exp-item">
                            <div class="exp-position">${exp.companyName}</div>
                            <div class="exp-company">${exp.position}</div>
                            <div class="exp-date">${exp.startDate || ''} - ${exp.endDate || 'Devam Ediyor'}</div>
                            <div class="exp-description">${exp.description || ''}</div>
                        </div>
                    `).join('')}
                </div>
                ` : ''}
                
                ${cv.projects?.length > 0 ? `
                <div class="section projects-section">
                    <div class="section-title">PROJELER</div>
                    ${cv.projects.map((project: any) => `
                        <div class="project-item">
                            <div class="project-title">${project.name}</div>
                            ${project.duration ? `<div class="project-duration">${project.duration}</div>` : ''}
                            <div class="project-description">${project.description || ''}</div>
                            ${project.url ? `<div><a href="${project.url}" target="_blank">Proje Bağlantısı</a></div>` : ''}
                        </div>
                    `).join('')}
                </div>
                ` : ''}
                
                ${cv.languages?.length > 0 ? `
                <div class="section half-section left-column">
                    <div class="section-title">DİL</div>
                    <ul class="language-list">
                        ${cv.languages.map((lang: any) => `
                            <li>${lang.name} - ${lang.level}</li>
                        `).join('')}
                    </ul>
                </div>
                ` : ''}
                
                ${cv.personal?.address || cv.personal?.phone || cv.personal?.email || cv.personal?.website ? `
                <div class="section half-section">
                    <div class="section-title">İLETİŞİM</div>
                    ${cv.personal?.address ? `
                        <div class="contact-item">
                            <span class="contact-icon">📍</span>
                            <div>${cv.personal.address}</div>
                        </div>
                    ` : ''}
                    ${cv.personal?.phone ? `
                        <div class="contact-item">
                            <span class="contact-icon">📞</span>
                            <div>${cv.personal.phone}</div>
                        </div>
                    ` : ''}
                    ${cv.personal?.email ? `
                        <div class="contact-item">
                            <span class="contact-icon">📧</span>
                            <div>${cv.personal.email}</div>
                        </div>
                    ` : ''}
                    ${cv.personal?.website ? `
                        <div class="contact-item">
                            <span class="contact-icon">🌐</span>
                            <div>${cv.personal.website}</div>
                        </div>
                    ` : ''}
                </div>
                ` : ''}
                
                ${cv.personal?.birthDate || cv.personal?.maritalStatus || cv.personal?.militaryStatus || cv.personal?.drivingLicense || cv.personal?.nationality ? `
                <div class="section half-section left-column">
                    <div class="section-title">KİŞİSEL BİLGİLER</div>
                    <ul class="personal-info-list">
                        ${cv.personal?.birthDate ? `
                            <li class="personal-info-item">
                                <div class="personal-info-label">Doğum Tarihi:</div>
                                <div class="personal-info-value">${cv.personal.birthDate}</div>
                            </li>
                        ` : ''}
                        ${cv.personal?.maritalStatus ? `
                            <li class="personal-info-item">
                                <div class="personal-info-label">Medeni Durum:</div>
                                <div class="personal-info-value">${cv.personal.maritalStatus}</div>
                            </li>
                        ` : ''}
                        ${cv.personal?.militaryStatus ? `
                            <li class="personal-info-item">
                                <div class="personal-info-label">Askerlik Durumu:</div>
                                <div class="personal-info-value">${cv.personal.militaryStatus}</div>
                            </li>
                        ` : ''}
                        ${cv.personal?.drivingLicense ? `
                            <li class="personal-info-item">
                                <div class="personal-info-label">Ehliyet:</div>
                                <div class="personal-info-value">${cv.personal.drivingLicense}</div>
                            </li>
                        ` : ''}
                        ${cv.personal?.nationality ? `
                            <li class="personal-info-item">
                                <div class="personal-info-label">Uyruk:</div>
                                <div class="personal-info-value">${cv.personal.nationality}</div>
                            </li>
                        ` : ''}
                    </ul>
                </div>
                ` : ''}
                
                ${cv.socialMedia?.length > 0 ? `
                <div class="section half-section">
                    <div class="section-title">SOSYAL MEDYA</div>
                    <ul class="social-media-list">
                        ${cv.socialMedia.map((social: any) => `
                            <li class="social-media-item">
                                <span class="social-media-platform">${getPlatformName(social.platform)}:</span>
                                <a href="${social.url}" target="_blank">${social.username || social.url}</a>
                            </li>
                        `).join('')}
                    </ul>
                </div>
                ` : ''}
                
                ${cv.certificates?.length > 0 ? `
                <div class="section">
                    <div class="section-title">SERTİFİKALAR</div>
                    <div style="display: flex; flex-wrap: wrap; justify-content: flex-start;">
                    ${cv.certificates.map((cert: any) => `
                        <div class="cert-item">
                            <div class="cert-name">${cert.name}</div>
                            <div class="cert-issuer">${cert.institution}</div>
                            <div class="cert-date">${cert.date}</div>
                        </div>
                    `).join('')}
                    </div>
                </div>
                ` : ''}
                
                ${cv.references?.length > 0 ? `
                <div class="section">
                    <div class="section-title">REFERANSLAR</div>
                    <div style="display: flex; flex-wrap: wrap; justify-content: flex-start;">
                        ${cv.references.map((ref: any) => `
                            <div class="reference-item">
                                <div class="reference-name">${ref.fullName}</div>
                                <div class="reference-title">${ref.position} - ${ref.company}</div>
                                ${ref.phone ? `<div class="reference-contact">📞 ${ref.phone}</div>` : ''}
                                ${ref.email ? `<div class="reference-contact">📧 ${ref.email}</div>` : ''}
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

// Sosyal medya platformu adını almak için yardımcı fonksiyon
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
    
    // Platform adı bulunamadıysa, girilenin ilk harfini büyük yaparak göster
    return platform.charAt(0).toUpperCase() + platform.slice(1);
} 