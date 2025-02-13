import { getTemplate, TemplateId } from '../lib/templates';

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
  
export const generateCVHtml = async (cv: CVData, profileImageUrl: string | null, templateId: TemplateId) => {
  // Profil resmini base64'e dönüştür
  let base64Image = null;
  if (profileImageUrl) {
    try {
      const response = await fetch(profileImageUrl);
      const blob = await response.blob();
      base64Image = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Profil resmi base64\'e dönüştürülürken hata:', error);
    }
  }

  // Seçilen şablonu al
  const template = getTemplate(templateId);
  
  // Şablonun HTML'ini oluştur ve base64 formatındaki profil resmini gönder
  const html = template.generateHTML(cv, base64Image as string | null);

  return html;
}; 