import { ResumeData } from "./resume";

export type TemplateId = 
  | "classic" 
  | "modern" 
  | "it-developer" 
  | "banking" 
  | "healthcare" 
  | "marketing" 
  | "engineering" 
  | "creative"
  | "executive"
  | "legal"
  | "academic"
  | "government"
  | "consulting"
  | "minimal";

export interface TemplateInfo {
  id: TemplateId;
  name: string;
  category: string;
  description: string;
  color: string;
  headerBg: string;
  accentColor: string;
  badge?: string;
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
  { id: "executive", label: "Executive" },
  { id: "legal", label: "Legal & Govt" },
  { id: "academic", label: "Academic" },
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
    badge: "Popular",
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
    id: "minimal",
    name: "Ultra Minimal",
    category: "general",
    description: "Stripped-down elegance — let your content speak",
    color: "#374151",
    headerBg: "#ffffff",
    accentColor: "#374151",
    badge: "New",
  },
  {
    id: "executive",
    name: "Executive Suite",
    category: "executive",
    description: "Premium two-tone layout for C-level & senior roles",
    color: "#0c1425",
    headerBg: "#0c1425",
    accentColor: "#b8860b",
    badge: "Premium",
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
  {
    id: "legal",
    name: "Legal & Compliance",
    category: "legal",
    description: "Conservative, authoritative format for legal professionals",
    color: "#1c1917",
    headerBg: "#1c1917",
    accentColor: "#78350f",
    badge: "New",
  },
  {
    id: "academic",
    name: "Academic CV",
    category: "academic",
    description: "Scholarly layout for professors, researchers & PhDs",
    color: "#1e3a5f",
    headerBg: "#ffffff",
    accentColor: "#1e3a5f",
  },
  {
    id: "government",
    name: "Government Official",
    category: "legal",
    description: "Formal structure for government & public sector roles",
    color: "#1a365d",
    headerBg: "#1a365d",
    accentColor: "#1a365d",
  },
  {
    id: "consulting",
    name: "Consulting Pro",
    category: "executive",
    description: "Sharp, data-driven layout for consultants & strategists",
    color: "#0f172a",
    headerBg: "#0f172a",
    accentColor: "#0ea5e9",
    badge: "New",
  },
];
