export const minimalistTemplate = {
  id: 'minimalist',
  name: 'Minimalist',
  styles: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#ffffff',
    primaryColor: '#8B7355',
    secondaryColor: '#4A4A4A'
  },
  generateHTML: (cv: any, profileImageBase64: string | null) => `
    <div style="max-width: 800px; margin: 0 auto; display: flex;">
      <!-- Sol Kolon -->
      <div style="background-color: #4A4A4A; color: white; padding: 40px; width: 300px;">
        ${profileImageBase64 ? `
          <div style="text-align: center; margin-bottom: 30px;">
            <img src="${profileImageBase64}" alt="Profil" style="width: 200px; height: 200px; border-radius: 50%; object-fit: cover;">
          </div>
        ` : `
          <div style="text-align: center; margin-bottom: 30px;">
            <div style="width: 200px; height: 200px; border-radius: 50%; background-color: #8B7355; display: flex; align-items: center; justify-content: center; margin: 0 auto; font-size: 64px;">
              ${cv.personal?.fullName?.charAt(0).toUpperCase() || 'U'}
            </div>
          </div>
        `}
        
        <div style="margin-bottom: 30px;">
          <h2 style="color: #fff; margin-bottom: 15px; font-size: 20px;">KİŞİSEL BİLGİLER</h2>
          <p style="margin: 5px 0;">
            <i class="fas fa-map-marker-alt"></i> ${cv.personal?.address || 'Adres'}
          </p>
          <p style="margin: 5px 0;">
            <i class="fas fa-globe"></i> ${cv.personal?.email || 'E-posta'}
          </p>
          <p style="margin: 5px 0;">
            <i class="fas fa-phone"></i> ${cv.personal?.phone || 'Telefon'}
          </p>
          ${cv.personal?.birthDate ? `
            <p style="margin: 5px 0;">
              <i class="fas fa-calendar"></i> ${cv.personal.birthDate}
            </p>
          ` : ''}
          ${cv.personal?.gender ? `
            <p style="margin: 5px 0;">
              <i class="fas fa-user"></i> ${cv.personal.gender}
            </p>
          ` : ''}
          ${cv.personal?.maritalStatus ? `
            <p style="margin: 5px 0;">
              <i class="fas fa-heart"></i> ${cv.personal.maritalStatus}
            </p>
          ` : ''}
          ${cv.personal?.militaryStatus ? `
            <p style="margin: 5px 0;">
              <i class="fas fa-shield-alt"></i> ${cv.personal.militaryStatus}
            </p>
          ` : ''}
          ${cv.personal?.drivingLicense ? `
            <p style="margin: 5px 0;">
              <i class="fas fa-car"></i> ${cv.personal.drivingLicense}
            </p>
          ` : ''}
        </div>

        ${cv.languages?.length > 0 ? `
          <div style="margin-bottom: 30px;">
            <h2 style="color: #fff; margin-bottom: 15px; font-size: 20px;">YABANCI DİL</h2>
            ${cv.languages.map((lang: any) => `
              <div style="margin-bottom: 10px;">
                <h3 style="margin: 0; font-size: 16px;">${lang.name}</h3>
                <p style="margin: 2px 0; font-size: 14px;">${lang.level}</p>
              </div>
            `).join('')}
          </div>
        ` : ''}

        ${cv.skills?.length > 0 ? `
          <div style="margin-bottom: 30px;">
            <h2 style="color: #fff; margin-bottom: 15px; font-size: 20px;">BECERİLER</h2>
            ${cv.skills.map((skill: any) => `
              <div style="margin-bottom: 10px;">
                <h3 style="margin: 0; font-size: 16px;">${skill.name}</h3>
                <p style="margin: 2px 0; font-size: 14px;">${skill.level}</p>
              </div>
            `).join('')}
          </div>
        ` : ''}

        ${cv.references?.length > 0 ? `
          <div style="margin-bottom: 30px;">
            <h2 style="color: #fff; margin-bottom: 15px; font-size: 20px;">REFERANSLAR</h2>
            ${cv.references.map((ref: any) => `
              <div style="margin-bottom: 15px;">
                <h3 style="margin: 0; font-size: 16px;">${ref.fullName}</h3>
                <p style="margin: 2px 0; font-size: 14px;">${ref.position} - ${ref.company}</p>
                <p style="margin: 2px 0; font-size: 14px;">${ref.phone}</p>
                <p style="margin: 2px 0; font-size: 14px;">${ref.email}</p>
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>

      <!-- Sağ Kolon -->
      <div style="background-color: #fff; padding: 40px; flex-grow: 1;">
        <h1 style="color: #8B7355; margin: 0; font-size: 32px;">${cv.personal?.fullName || 'Ad Soyad'}</h1>
        ${cv.experience?.[0] ? `
          <h2 style="color: #8B7355; margin: 5px 0 20px; font-size: 20px;">${cv.experience[0].position || 'Pozisyon'}</h2>
        ` : ''}

        ${cv.about ? `
          <div style="margin-bottom: 30px;">
            <h2 style="color: #8B7355; margin-bottom: 15px; font-size: 20px;">HAKKIMDA</h2>
            <p style="margin: 0; line-height: 1.5;">${cv.about}</p>
          </div>
        ` : ''}

        ${cv.experience?.length > 0 ? `
          <div style="margin-bottom: 30px;">
            <h2 style="color: #8B7355; margin-bottom: 15px; font-size: 20px;">İŞ GEÇMİŞİ</h2>
            ${cv.experience.map((exp: any) => `
              <div style="margin-bottom: 20px;">
                <h3 style="color: #8B7355; margin: 0; font-size: 18px;">${exp.position}</h3>
                <h4 style="color: #4A4A4A; margin: 5px 0; font-size: 16px;">${exp.companyName}</h4>
                <p style="color: #666; margin: 2px 0; font-size: 14px;">${exp.startDate} - ${exp.endDate}</p>
                <p style="margin: 5px 0; line-height: 1.5;">${exp.description}</p>
              </div>
            `).join('')}
          </div>
        ` : ''}

        ${cv.education?.length > 0 ? `
          <div style="margin-bottom: 30px;">
            <h2 style="color: #8B7355; margin-bottom: 15px; font-size: 20px;">EĞİTİM</h2>
            ${cv.education.map((edu: any) => `
              <div style="margin-bottom: 15px;">
                <h3 style="color: #8B7355; margin: 0; font-size: 18px;">${edu.schoolName}</h3>
                <h4 style="color: #4A4A4A; margin: 5px 0; font-size: 16px;">${edu.department}</h4>
                <p style="color: #666; margin: 2px 0; font-size: 14px;">${edu.startDate} - ${edu.endDate}</p>
              </div>
            `).join('')}
          </div>
        ` : ''}

        ${cv.certificates?.length > 0 ? `
          <div style="margin-bottom: 30px;">
            <h2 style="color: #8B7355; margin-bottom: 15px; font-size: 20px;">SERTİFİKALAR</h2>
            ${cv.certificates.map((cert: any) => `
              <div style="margin-bottom: 15px;">
                <h3 style="color: #8B7355; margin: 0; font-size: 18px;">${cert.name}</h3>
                <h4 style="color: #4A4A4A; margin: 5px 0; font-size: 16px;">${cert.institution}</h4>
                <p style="color: #666; margin: 2px 0; font-size: 14px;">${cert.date}</p>
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>
    </div>
  `
}; 