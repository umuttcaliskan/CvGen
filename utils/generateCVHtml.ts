import { TemplateId } from '../lib/templates';
import { modernTemplate } from '../lib/templates/modern';
import { professionalTemplate } from '../lib/templates/professional';
import { elegantTemplate } from '../lib/templates/elegant';
import { feminineTemplate } from '../lib/templates/feminine';
import { minimalistTemplate } from '../lib/templates/minimalist';
import { darkModernTemplate } from '../lib/templates/darkModern';
import { corporateTemplate } from '../lib/templates/corporate';
import { atsMinimalTemplate } from '../lib/templates/atsMinimal';
import { twoColumnTemplate } from '../lib/templates/twoColumn';

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

const getTemplate = (templateId: TemplateId) => {
  switch (templateId) {
    case 'modern':
      return modernTemplate;
    case 'professional':
      return professionalTemplate;
    case 'elegant':
      return elegantTemplate;
    case 'feminine':
      return feminineTemplate;
    case 'minimalist':
      return minimalistTemplate;
    case 'darkModern':
      return darkModernTemplate;
    case 'corporate':
      return corporateTemplate;
    case 'atsMinimal':
      return atsMinimalTemplate;
    case 'twoColumn':
      return twoColumnTemplate;
    default:
      return modernTemplate;
  }
}; 