export const professionalTemplate = {
  id: 'professional',
  name: 'Profesyonel',
  styles: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#ffffff',
    primaryColor: '#2c2f33',
    secondaryColor: '#444444'
  },
  generateHTML: (cv: any, profileImageBase64: string | null) => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>${cv.personal?.fullName || 'CV'}</title>
      <style>
        @page {
          margin: 30px;
          size: A4;
        }
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          display: flex;
        }
        .sidebar {
          width: 30%;
          background: #2c2f33;
          color: white;
          padding: 20px;
          text-align: center;
          min-height: 100vh;
        }
        .sidebar img {
          width: 80%;
          border-radius: 10px;
          margin-bottom: 20px;
        }
        .sidebar .profile-initial {
          width: 100px;
          height: 100px;
          background-color: #444;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 40px;
          color: white;
          margin: 0 auto 20px;
        }
        .sidebar h2 {
          font-size: 22px;
          margin-bottom: 10px;
        }
        .sidebar p {
          font-size: 14px;
          margin: 5px 0;
        }
        .content {
          width: 70%;
          padding: 40px 40px 0 40px;
        }
        h1 {
          font-size: 28px;
          margin-bottom: 10px;
        }
        h2 {
          font-size: 20px;
          border-bottom: 2px solid #ddd;
          padding-bottom: 5px;
          margin-top: 30px;
          margin-bottom: 20px;
        }
        .job-title {
          font-weight: bold;
        }
        .skills-bar {
          background: #ddd;
          height: 8px;
          border-radius: 4px;
          margin: 5px 0;
          position: relative;
        }
        .skills-bar .fill {
          background: #444;
          height: 100%;
          border-radius: 4px;
        }
        .experience-item, .education-item, .skill-item, .project-item, .certificate-item {
          page-break-inside: avoid;
          margin-bottom: 20px;
        }
        .about-section {
          margin-bottom: 25px;
        }
        .social-media-list {
          list-style-type: none;
          padding: 0;
          margin: 0;
        }
        .social-media-item {
          margin-bottom: 8px;
        }
        .social-media-item a {
          text-decoration: none;
          color: white;
        }
      </style>
    </head>
    <body>
      <div class="sidebar">
        ${profileImageBase64 ? 
          `<img src="${profileImageBase64}" alt="Profile">` : 
          `<div class="profile-initial">${cv.personal?.fullName?.charAt(0).toUpperCase() || 'U'}</div>`
        }
        <h1 style="color: white; font-size: 24px; margin: 10px 0 20px;">${cv.personal?.fullName || 'İsimsiz'}</h1>
        
        <h2 style="margin-top: 30px;">KİŞİSEL</h2>
        ${cv.personal ? `
          <p><strong>Adres:</strong> ${cv.personal.address || ''}</p>
          <p><strong>Telefon:</strong> ${cv.personal.phone || ''}</p>
          <p><strong>E-posta:</strong> ${cv.personal.email || ''}</p>
          <p><strong>Doğum Tarihi:</strong> ${cv.personal.birthDate || ''}</p>
          ${cv.personal.drivingLicense ? `<p><strong>Ehliyet:</strong> ${cv.personal.drivingLicense}</p>` : ''}
          ${cv.personal.maritalStatus ? `<p><strong>Medeni Durum:</strong> ${cv.personal.maritalStatus}</p>` : ''}
          ${cv.personal.militaryStatus ? `<p><strong>Askerlik Durumu:</strong> ${cv.personal.militaryStatus}</p>` : ''}
        ` : ''}
        
        ${cv.languages?.length > 0 ? `
          <h2>Diller</h2>
          ${cv.languages.map((lang: any) => `
            <p>${lang.name} - ${lang.level}</p>
          `).join('')}
        ` : ''}
        
        ${cv.socialMedia?.length > 0 ? `
          <h2>Sosyal Medya</h2>
          <ul class="social-media-list">
            ${cv.socialMedia.map((social: any) => `
              <li class="social-media-item">
                <strong>${getPlatformName(social.platform)}:</strong> 
                <a href="${social.url}">${social.username || social.url}</a>
              </li>
            `).join('')}
          </ul>
        ` : ''}
        
        ${cv.references?.length > 0 ? `
          <h2>Referanslar</h2>
          ${cv.references.map((ref: any) => `
            <div style="text-align: left; margin-bottom: 15px;">
              <p style="margin: 2px 0;"><strong>${ref.fullName}</strong></p>
              <p style="margin: 2px 0;">${ref.position || ''}</p>
              <p style="margin: 2px 0;">${ref.company || ''}</p>
              ${ref.phone ? `<p style="margin: 2px 0;">${ref.phone}</p>` : ''}
              ${ref.email ? `<p style="margin: 2px 0;">${ref.email}</p>` : ''}
            </div>
          `).join('')}
        ` : ''}
      </div>

      <div class="content">
        ${cv.about ? `
          <div class="about-section" style="margin-top: 0;">
            <h2 style="margin-top: 0;">Hakkımda</h2>
            <p>${cv.about}</p>
          </div>
        ` : ''}
      
        ${cv.experience?.length > 0 ? `
          <h2>İş Deneyimi</h2>
          ${cv.experience.map((exp: any) => `
            <div class="experience-item">
              <p class="job-title">${exp.position}</p>
              <p>${exp.companyName}, ${exp.startDate} - ${exp.endDate || 'Devam Ediyor'}</p>
              <p>${exp.description || ''}</p>
            </div>
          `).join('')}
        ` : ''}

        ${cv.education?.length > 0 ? `
          <h2>Eğitim</h2>
          ${cv.education.map((edu: any) => `
            <div class="education-item">
              <p class="job-title">${edu.schoolName}</p>
              <p>${edu.department || ''}, ${edu.startDate} - ${edu.endDate || 'Devam Ediyor'}</p>
              ${edu.grade ? `<p>Not: ${edu.grade}</p>` : ''}
            </div>
          `).join('')}
        ` : ''}
        
        ${cv.projects?.length > 0 ? `
          <h2>Projeler</h2>
          ${cv.projects.map((project: any) => `
            <div class="project-item">
              <p class="job-title">${project.name}</p>
              <p>${project.startDate || ''} - ${project.endDate || ''}</p>
              <p>${project.description || ''}</p>
              ${project.technologies ? `<p><strong>Teknolojiler:</strong> ${project.technologies}</p>` : ''}
              ${project.projectUrl ? `<p><strong>URL:</strong> <a href="${project.projectUrl}">${project.projectUrl}</a></p>` : ''}
            </div>
          `).join('')}
        ` : ''}

        ${cv.skills?.length > 0 ? `
          <h2>Beceriler</h2>
          ${cv.skills.map((skill: any) => `
            <div class="skill-item">
              <p>${skill.name}</p>
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
        ` : ''}
        
        ${cv.certificates?.length > 0 ? `
          <h2>Sertifikalar</h2>
          ${cv.certificates.map((cert: any) => `
            <div class="certificate-item">
              <p class="job-title">${cert.name}</p>
              <p>${cert.institution}, ${cert.date || ''}</p>
            </div>
          `).join('')}
        ` : ''}
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