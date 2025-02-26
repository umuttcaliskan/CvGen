import { modernTemplate } from './modern';
import { professionalTemplate } from './professional';
import { elegantTemplate } from './elegant';
import { feminineTemplate } from './feminine';
import { darkModernTemplate } from './darkModern';
import { minimalistTemplate } from './minimalist';
import { corporateTemplate } from './corporate';
import { atsMinimalTemplate } from './atsMinimal';
import { twoColumnTemplate } from './twoColumn';

export const templates = {
  modern: modernTemplate,
  professional: professionalTemplate,
  elegant: elegantTemplate,
  feminine: feminineTemplate,
  darkModern: darkModernTemplate,
  minimalist: minimalistTemplate,
  corporate: corporateTemplate,
  atsMinimal: atsMinimalTemplate,
  twoColumn: twoColumnTemplate
};

export type TemplateId = 'modern' | 'professional' | 'elegant' | 'feminine' | 'darkModern' | 'minimalist' | 'corporate' | 'atsMinimal' | 'twoColumn';

export const getTemplate = (templateId: TemplateId) => {
  switch (templateId) {
    case 'twoColumn':
      return twoColumnTemplate;
    default:
      return modernTemplate;
  }
}; 