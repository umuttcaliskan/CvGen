import { modernTemplate } from './modern';
import { professionalTemplate } from './professional';
import { elegantTemplate } from './elegant';
import { feminineTemplate } from './feminine';
import { minimalistTemplate } from './minimalist';
import { darkModernTemplate } from './darkModern';

export const templates = {
  modern: modernTemplate,
  professional: professionalTemplate,
  elegant: elegantTemplate,
  feminine: feminineTemplate,
  minimalist: minimalistTemplate,
  darkModern: darkModernTemplate
};

export type TemplateId = 'modern' | 'professional' | 'elegant' | 'feminine' | 'minimalist' | 'darkModern';

export const getTemplate = (templateId: TemplateId) => {
  return templates[templateId];
}; 