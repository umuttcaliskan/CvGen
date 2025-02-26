export const corporateTemplate = {
  id: 'corporate',
  name: 'Kurumsal',
  styles: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#ffffff',
    primaryColor: '#0a4275',
    secondaryColor: '#2a6496'
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
                line-height: 1.6;
                color: #333;
                background-color: #fff;
            }
            
            .container {
                max-width: 900px;
                margin: 0 auto;
                padding: 30px;
                background-color: white;
            }
            
            .header {
                border-bottom: 2px solid #0a4275;
                padding-bottom: 20px;
                margin-bottom: 25px;
                display: flex;
                gap: 20px;
            }
            
            .profile-image {
                width: 120px;
                height: 120px;
                border-radius: 5px;
                object-fit: cover;
                border: 2px solid #0a4275;
            }
            
            .header-content {
                flex: 1;
            }
            
            .name {
                font-size: 28px;
                font-weight: bold;
                color: #0a4275;
                margin-bottom: 10px;
                text-transform: uppercase;
            }
            
            .contact-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                gap: 5px 15px;
            }
            
            .contact-item {
                margin-bottom: 5px;
            }
            
            .contact-label {
                font-weight: bold;
                display: inline-block;
                min-width: 100px;
            }
            
            .section {
                margin-bottom: 25px;
            }
            
            .section-heading {
                font-size: 18px;
                text-transform: uppercase;
                color: #0a4275;
                border-bottom: 1px solid #0a4275;
                padding-bottom: 5px;
                margin-bottom: 15px;
            }
            
            .item {
                margin-bottom: 15px;
                page-break-inside: avoid;
            }
            
            .item-title {
                font-weight: bold;
                font-size: 16px;
                color: #333;
            }
            
            .item-subtitle {
                font-weight: bold;
                color: #555;
            }
            
            .item-date {
                color: #666;
                font-size: 14px;
                margin-bottom: 5px;
            }
            
            .item-description {
                text-align: justify;
            }
            
            .skills-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 10px;
            }
            
            .skill-item {
                display: flex;
                justify-content: space-between;
                border-bottom: 1px dotted #ddd;
                padding-bottom: 3px;
            }
            
            .certificates-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 15px;
            }
            
            @media print {
                body {
                    font-size: 12pt;
                }
                
                .container {
                    width: 100%;
                    max-width: none;
                    padding: 20px;
                    box-shadow: none;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                ${profileImageBase64 ? `<img class="profile-image" src="${profileImageBase64}" alt="Profil Resmi">` : ''}
                <div class="header-content">
                    <div class="name">${cv.personal?.fullName || 'AD SOYAD'}</div>
                    <div class="contact-grid">
                        ${cv.personal?.address ? `<div class="contact-item"><span class="contact-label">Adres:</span> ${cv.personal.address}</div>` : ''}
                        ${cv.personal?.phone ? `<div class="contact-item"><span class="contact-label">Telefon:</span> ${cv.personal.phone}</div>` : ''}
                        ${cv.personal?.email ? `<div class="contact-item"><span class="contact-label">E-posta:</span> ${cv.personal.email}</div>` : ''}
                        ${cv.personal?.birthDate ? `<div class="contact-item"><span class="contact-label">Doğum Tarihi:</span> ${cv.personal.birthDate}</div>` : ''}
                        ${cv.personal?.drivingLicense ? `<div class="contact-item"><span class="contact-label">Ehliyet:</span> ${cv.personal.drivingLicense}</div>` : ''}
                        ${cv.personal?.maritalStatus ? `<div class="contact-item"><span class="contact-label">Medeni Durum:</span> ${cv.personal.maritalStatus}</div>` : ''}
                        ${cv.personal?.militaryStatus ? `<div class="contact-item"><span class="contact-label">Askerlik:</span> ${cv.personal.militaryStatus}</div>` : ''}
                    </div>
                    
                    ${cv.socialMedia?.length > 0 ? `
                    <div class="section" style="margin-top: 10px;">
                        <div class="section-heading">Sosyal Medya</div>
                        <div class="contact-grid">
                            ${cv.socialMedia.map((social: any) => `
                                <div class="contact-item">
                                    <span class="contact-label">${social.platform}:</span> 
                                    ${social.username}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    ` : ''}
                </div>
            </div>
            
            ${cv.about ? `
            <div class="section">
                <div class="section-heading">Profesyonel Özet</div>
                <p>${cv.about}</p>
            </div>
            ` : ''}
            
            ${cv.experience?.length > 0 ? `
            <div class="section">
                <div class="section-heading">İş Deneyimi</div>
                ${cv.experience.map((exp: any) => `
                <div class="item">
                    <div class="item-title">${exp.position}</div>
                    <div class="item-subtitle">${exp.companyName}</div>
                    <div class="item-date">${exp.startDate} - ${exp.endDate}</div>
                    <div class="item-description">${exp.description}</div>
                </div>
                `).join('')}
            </div>
            ` : ''}
            
            ${cv.projects?.length > 0 ? `
            <div class="section">
                <div class="section-heading">Projeler</div>
                ${cv.projects.map((project: any) => `
                <div class="item">
                    <div class="item-title">${project.name}</div>
                    <div class="item-date">${project.startDate} - ${project.endDate}</div>
                    <div class="item-description">${project.description}</div>
                    ${project.technologies ? `<div><strong>Teknolojiler:</strong> ${project.technologies}</div>` : ''}
                    ${project.projectUrl && project.projectUrl.trim() !== '' ? 
                        `<div><strong>URL:</strong> ${project.projectUrl}</div>` : ''}
                </div>
                `).join('')}
            </div>
            ` : ''}
            
            ${cv.education?.length > 0 ? `
            <div class="section">
                <div class="section-heading">Eğitim</div>
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
                <div class="section-heading">Beceriler</div>
                <div class="skills-grid">
                    ${cv.skills.map((skill: any) => `
                    <div class="skill-item">
                        <span>${skill.name}</span>
                        <span>${skill.level}</span>
                    </div>
                    `).join('')}
                </div>
            </div>
            ` : ''}
            
            ${cv.languages?.length > 0 ? `
            <div class="section">
                <div class="section-heading">Diller</div>
                <div class="skills-grid">
                    ${cv.languages.map((lang: any) => `
                    <div class="skill-item">
                        <span>${lang.name}</span>
                        <span>${lang.level}</span>
                    </div>
                    `).join('')}
                </div>
            </div>
            ` : ''}
            
            ${cv.certificates?.length > 0 ? `
            <div class="section">
                <div class="section-heading">Sertifikalar</div>
                <div class="certificates-grid">
                    ${cv.certificates.map((cert: any) => `
                    <div class="item">
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
                <div class="section-heading">Referanslar</div>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
                    ${cv.references.map((ref: any) => `
                    <div class="item">
                        <div class="item-title">${ref.fullName}</div>
                        <div class="item-subtitle">${ref.position}, ${ref.company}</div>
                        <div>Tel: ${ref.phone}</div>
                        <div>E-posta: ${ref.email}</div>
                    </div>
                    `).join('')}
                </div>
            </div>
            ` : ''}
        </div>
    </body>
    </html>
  `
}; 