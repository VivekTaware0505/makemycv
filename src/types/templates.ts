import { ResumeData } from "./resume";

export type TemplateId = "classic" | "modern" | "it-developer" | "banking" | "healthcare" | "marketing" | "engineering" | "creative";

export interface TemplateInfo {
  id: TemplateId;
  name: string;
  category: string;
  description: string;
  color: string;
  headerBg: string;
  accentColor: string;
}

export const templateCategories = [
  { id: "all", label: "All Templates" },
  { id: "general", label: "General" },
  { id: "it", label: "IT / Software" },
  { id: "banking", label: "Banking & Finance" },
  { id: "healthcare", label: "Healthcare" },
  { id: "marketing", label: "Marketing" },
  { id: "engineering", label: "Engineering" },
  { id: "creative", label: "Creative" },
];

export const templates: TemplateInfo[] = [
  {
    id: "classic",
    name: "Classic Professional",
    category: "general",
    description: "Clean, timeless design that works for any profession",
    color: "#1a1a1a",
    headerBg: "#ffffff",
    accentColor: "#1a1a1a",
  },
  {
    id: "modern",
    name: "Modern Minimal",
    category: "general",
    description: "Sleek dark header with a contemporary feel",
    color: "#111827",
    headerBg: "#111827",
    accentColor: "#111827",
  },
  {
    id: "it-developer",
    name: "Tech Developer",
    category: "it",
    description: "Optimized for software engineers & IT professionals",
    color: "#0f766e",
    headerBg: "#0f766e",
    accentColor: "#0f766e",
  },
  {
    id: "banking",
    name: "Banking & Finance",
    category: "banking",
    description: "Formal & structured for banking and finance roles",
    color: "#1e3a5f",
    headerBg: "#1e3a5f",
    accentColor: "#1e3a5f",
  },
  {
    id: "healthcare",
    name: "Healthcare Pro",
    category: "healthcare",
    description: "Clean layout for doctors, nurses & medical staff",
    color: "#0e7490",
    headerBg: "#0e7490",
    accentColor: "#0e7490",
  },
  {
    id: "marketing",
    name: "Marketing & Sales",
    category: "marketing",
    description: "Bold design for marketing and sales professionals",
    color: "#c2410c",
    headerBg: "#c2410c",
    accentColor: "#c2410c",
  },
  {
    id: "engineering",
    name: "Engineering",
    category: "engineering",
    description: "Structured format for civil, mechanical & electrical engineers",
    color: "#4338ca",
    headerBg: "#4338ca",
    accentColor: "#4338ca",
  },
  {
    id: "creative",
    name: "Creative Portfolio",
    category: "creative",
    description: "Stand out with a unique layout for designers & artists",
    color: "#9333ea",
    headerBg: "#9333ea",
    accentColor: "#9333ea",
  },
];
