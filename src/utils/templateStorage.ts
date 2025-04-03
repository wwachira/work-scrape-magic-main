
import { Template } from "@/types/template";

// Local storage key
const TEMPLATE_STORAGE_KEY = "job-scraper-templates";

// Get all saved templates
export const getTemplates = (): Template[] => {
  const storedTemplates = localStorage.getItem(TEMPLATE_STORAGE_KEY);
  if (!storedTemplates) {
    return [];
  }
  
  try {
    const parsed = JSON.parse(storedTemplates);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Error parsing templates from localStorage:", error);
    return [];
  }
};

// Add a new template
export const saveTemplate = (template: Omit<Template, "id" | "createdAt">): Template => {
  const templates = getTemplates();
  
  const newTemplate: Template = {
    ...template,
    id: crypto.randomUUID(),
    createdAt: new Date(),
  };
  
  localStorage.setItem(
    TEMPLATE_STORAGE_KEY, 
    JSON.stringify([...templates, newTemplate])
  );
  
  return newTemplate;
};

// Delete a template by ID
export const deleteTemplate = (id: string): void => {
  const templates = getTemplates();
  const filtered = templates.filter(template => template.id !== id);
  
  localStorage.setItem(
    TEMPLATE_STORAGE_KEY, 
    JSON.stringify(filtered)
  );
};
