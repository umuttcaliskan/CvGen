export const atsMinimalTemplate = {
  id: 'atsMinimal',
  name: 'ATS Uyumlu',
  styles: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#ffffff',
    primaryColor: '#333333',
    secondaryColor: '#555555'
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
            
            .header-info {
                margin-top: 10px;
                display: flex;
                flex-wrap: wrap;
                gap: 8px 20px;
            }
            
            .main-content {
                display: flex;
                gap: 30px;
            }
            
            .left-column {
                flex: 3;
            }
            
            .right-column {
                flex: 1;
            }
            
            .profile-image {
                width: 180px;
                height: 180px;
                object-fit: cover;
                float: right;
            }
            
            .name {
                font-size: 28px;
                font-weight: bold;
                color: #333;
                margin-bottom: 5px;
            }
            
            .title {
                font-size: 18px;
                color: #555;
                margin-bottom: 20px;
            }
            
            .contact-item {
                flex-basis: calc(50% - 10px);
                margin-bottom: 5px;
                font-size: 14px;
            }
            
            .section {
                margin-bottom: 25px;
            }
            
            .section-heading {
                font-size: 18px;
                text-transform: uppercase;
                color: #333;
                border-bottom: 1px solid #ccc;
                padding-bottom: 5px;
                margin-bottom: 15px;
            }
            
            .experience-item, .education-item, .project-item, .reference-item {
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
                margin-bottom: 5px;
            }
            
            .item-bullet {
                margin-left: 20px;
                margin-bottom: 3px;
            }
            
            .skills-list, .languages-list {
                list-style-type: none;
            }
            
            .skills-list li, .languages-list li {
                margin-bottom: 5px;
                padding-bottom: 5px;
                border-bottom: 1px dotted #eee;
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
                
                .profile-image {
                    width: 150px;
                    height: 150px;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div style="display: flex; justify-content: space-between; margin-bottom: 30px;">
                <div style="flex: 1;">
                    <h1 class="name">${cv.personal?.fullName || 'AD SOYAD'}</h1>
                    <div class="title" style="margin-bottom: 10px;">${cv.experience?.[0]?.position || 'Yazılım Mühendisi'}</div>
                    
                    <div class="header-info">
                        ${cv.personal?.phone ? `<div class="contact-item"><strong>Telefon:</strong> ${cv.personal.phone}</div>` : ''}
                        ${cv.personal?.email ? `<div class="contact-item"><strong>E-posta:</strong> ${cv.personal.email}</div>` : ''}
                        ${cv.personal?.website ? `<div class="contact-item"><strong>Web:</strong> ${cv.personal.website}</div>` : ''}
                        ${cv.personal?.address ? `<div class="contact-item"><strong>Adres:</strong> ${cv.personal.address}</div>` : ''}
                        ${cv.personal?.birthDate ? `<div class="contact-item"><strong>D. Tarihi:</strong> ${cv.personal.birthDate}</div>` : ''}
                        ${cv.personal?.drivingLicense ? `<div class="contact-item"><strong>Ehliyet:</strong> ${cv.personal.drivingLicense}</div>` : ''}
                        ${cv.personal?.maritalStatus ? `<div class="contact-item"><strong>M. Durum:</strong> ${cv.personal.maritalStatus}</div>` : ''}
                        ${cv.personal?.militaryStatus ? `<div class="contact-item"><strong>Askerlik:</strong> ${cv.personal.militaryStatus}</div>` : ''}
                    </div>
                </div>
                ${profileImageBase64 ? `<img class="profile-image" src="${profileImageBase64}" alt="Profil Resmi">` : ''}
            </div>
            
            ${cv.about ? `
            <div class="section">
                <h2 class="section-heading">Hakkımda</h2>
                <p>${cv.about}</p>
            </div>
            ` : ''}
            
            <div class="main-content">
                <div class="left-column">
                    ${cv.experience?.length > 0 ? `
                    <div class="section">
                        <h2 class="section-heading">Deneyim</h2>
                        ${cv.experience.map((exp: any) => `
                        <div class="experience-item">
                            <div class="item-title">${exp.position}</div>
                            <div class="item-subtitle">${exp.companyName}</div>
                            <div class="item-date">${exp.startDate} - ${exp.endDate}</div>
                            <div class="item-description">${exp.description}</div>
                        </div>
                        `).join('')}
                    </div>
                    ` : ''}
                    
                    ${cv.education?.length > 0 ? `
                    <div class="section">
                        <h2 class="section-heading">Eğitim</h2>
                        ${cv.education.map((edu: any) => `
                        <div class="education-item">
                            <div class="item-title">${edu.schoolName}</div>
                            <div class="item-subtitle">${edu.department}</div>
                            <div class="item-date">${edu.startDate} - ${edu.endDate}</div>
                        </div>
                        `).join('')}
                    </div>
                    ` : ''}
                    
                    ${cv.projects?.length > 0 ? `
                    <div class="section">
                        <h2 class="section-heading">Projeler</h2>
                        ${cv.projects.map((project: any) => `
                        <div class="project-item">
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
                    
                    ${cv.references?.length > 0 ? `
                    <div class="section">
                        <h2 class="section-heading">Referanslar</h2>
                        ${cv.references.map((ref: any) => `
                        <div class="reference-item">
                            <div class="item-title">${ref.fullName}</div>
                            <div class="item-subtitle">${ref.position}, ${ref.company}</div>
                            <div>Tel: ${ref.phone}</div>
                            <div>E-posta: ${ref.email}</div>
                        </div>
                        `).join('')}
                    </div>
                    ` : ''}
                </div>
                
                <div class="right-column">
                    ${cv.skills?.length > 0 ? `
                    <div class="section">
                        <h2 class="section-heading">Yetkinlikler</h2>
                        <ul class="skills-list">
                            ${cv.skills.map((skill: any) => `
                            <li>
                                <div>${skill.name}</div>
                                <div>${skill.level}</div>
                            </li>
                            `).join('')}
                        </ul>
                    </div>
                    ` : ''}
                    
                    ${cv.languages?.length > 0 ? `
                    <div class="section">
                        <h2 class="section-heading">Dil</h2>
                        <ul class="languages-list">
                            ${cv.languages.map((lang: any) => `
                            <li>
                                <div>${lang.name}</div>
                                <div>${lang.level}</div>
                            </li>
                            `).join('')}
                        </ul>
                    </div>
                    ` : ''}
                    
                    ${cv.certificates?.length > 0 ? `
                    <div class="section">
                        <h2 class="section-heading">Sertifikalar</h2>
                        ${cv.certificates.map((cert: any) => `
                        <div class="item">
                            <div class="item-title">${cert.name}</div>
                            <div class="item-subtitle">${cert.institution}</div>
                            <div class="item-date">${cert.date}</div>
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