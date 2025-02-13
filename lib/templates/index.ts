import { modernTemplate } from './modern';
import { professionalTemplate } from './professional';

export const templates = {
  modern: modernTemplate,
  professional: professionalTemplate
};

export type TemplateId = keyof typeof templates;

export const getTemplate = (templateId: TemplateId) => {
  return templates[templateId];
}; 