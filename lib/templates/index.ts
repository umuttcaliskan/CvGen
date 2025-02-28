import { modernTemplate } from './modern';
import { professionalTemplate } from './professional';
import { elegantTemplate } from './elegant';
import { feminineTemplate } from './feminine';
import { darkModernTemplate } from './darkModern';
import { minimalistTemplate } from './minimalist';
import { corporateTemplate } from './corporate';
import { atsMinimalTemplate } from './atsMinimal';
import { twoColumnTemplate } from './twoColumn';
import { greenModernTemplate } from './greenModern';
import { brownElegantTemplate } from './brownElegant';
import { crystalClearTemplate } from './crystalClear';

export const templates = {
  modern: modernTemplate,
  professional: professionalTemplate,
  elegant: elegantTemplate,
  feminine: feminineTemplate,
  darkModern: darkModernTemplate,
  minimalist: minimalistTemplate,
  corporate: corporateTemplate,
  atsMinimal: atsMinimalTemplate,
  twoColumn: twoColumnTemplate,
  greenModern: greenModernTemplate,
  brownElegant: brownElegantTemplate,
  crystalClear: crystalClearTemplate
};

export type TemplateId = 
  | 'modern' 
  | 'professional' 
  | 'elegant' 
  | 'feminine' 
  | 'darkModern' 
  | 'minimalist' 
  | 'corporate' 
  | 'atsMinimal' 
  | 'twoColumn'
  | 'greenModern'
  | 'brownElegant'
  | 'crystalClear';

export function getTemplate(id: TemplateId) {
  switch (id) {
    case 'modern':
      return modernTemplate;
    case 'professional':
      return professionalTemplate;
    case 'elegant':
      return elegantTemplate;
    case 'feminine':
      return feminineTemplate;
    case 'darkModern':
      return darkModernTemplate;
    case 'minimalist':
      return minimalistTemplate;
    case 'corporate':
      return corporateTemplate;
    case 'atsMinimal':
      return atsMinimalTemplate;
    case 'twoColumn':
      return twoColumnTemplate;
    case 'greenModern':
      return greenModernTemplate;
    case 'brownElegant':
      return brownElegantTemplate;
    case 'crystalClear':
      return crystalClearTemplate;
    default:
      return modernTemplate;
  }
} 