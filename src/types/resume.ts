export interface Education {
  id: string;
  degree: string;
  institution: string;
  year: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  duration: string;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string;
  link: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
}

export type ResumeField = 
  | "it-software"
  | "banking-finance"
  | "healthcare"
  | "marketing"
  | "engineering"
  | "legal"
  | "academic"
  | "creative"
  | "government"
  | "other";

export interface ResumeData {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  portfolio: string;
  summary: string;
  skills: string;
  photo: string;
  field: ResumeField;
  showProjects: boolean;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  certifications: Certification[];
}

export const defaultResumeData: ResumeData = {
  name: '',
  email: '',
  phone: '',
  linkedin: '',
  portfolio: '',
  summary: '',
  skills: '',
  photo: '',
  field: 'other',
  showProjects: true,
  education: [{ id: '1', degree: '', institution: '', year: '' }],
  experience: [{ id: '1', title: '', company: '', duration: '', description: '' }],
  projects: [{ id: '1', name: '', description: '', technologies: '', link: '' }],
  certifications: [{ id: '1', name: '', issuer: '', year: '' }],
};

export const fieldLabels: Record<ResumeField, string> = {
  "it-software": "IT / Software",
  "banking-finance": "Banking & Finance",
  "healthcare": "Healthcare / Medical",
  "marketing": "Marketing & Sales",
  "engineering": "Engineering",
  "legal": "Legal",
  "academic": "Academic / Research",
  "creative": "Creative / Design",
  "government": "Government / Public Sector",
  "other": "Other",
};

export const fieldSkillSuggestions: Record<ResumeField, string[]> = {
  "it-software": ["JavaScript", "Python", "React", "Node.js", "SQL", "Git", "AWS", "Docker", "TypeScript", "MongoDB", "REST APIs", "Agile"],
  "banking-finance": ["Financial Analysis", "Risk Management", "Excel", "Bloomberg Terminal", "Tally", "GST", "Accounting", "SAP", "Auditing", "Compliance", "Mutual Funds", "Taxation"],
  "healthcare": ["Patient Care", "EMR/EHR", "Clinical Research", "HIPAA", "CPR Certified", "Pharmacology", "Medical Coding", "Anatomy", "Diagnosis", "Surgery Assistance", "Lab Testing"],
  "marketing": ["SEO", "Google Ads", "Social Media Marketing", "Content Writing", "Analytics", "Canva", "Email Marketing", "CRM", "Brand Strategy", "Copywriting", "Market Research"],
  "engineering": ["AutoCAD", "MATLAB", "SolidWorks", "Project Management", "Quality Control", "Six Sigma", "Thermodynamics", "Circuit Design", "PLC Programming", "3D Printing"],
  "legal": ["Legal Research", "Contract Drafting", "Litigation", "Compliance", "IP Law", "Corporate Law", "Negotiation", "Case Management", "Legal Writing", "Mediation"],
  "academic": ["Research Methodology", "Data Analysis", "Academic Writing", "SPSS", "LaTeX", "Grant Writing", "Peer Review", "Curriculum Design", "R Programming", "Teaching"],
  "creative": ["Adobe Photoshop", "Illustrator", "Figma", "UI/UX Design", "Typography", "Video Editing", "Photography", "Branding", "After Effects", "Sketch", "InDesign"],
  "government": ["Public Administration", "Policy Analysis", "RTI", "Report Writing", "Budget Management", "MS Office", "Data Entry", "Public Relations", "Governance", "Project Planning"],
  "other": ["Communication", "Teamwork", "Problem Solving", "Time Management", "Leadership", "MS Office", "Critical Thinking", "Adaptability"],
};

// Fields where projects are typically not relevant
export const fieldsWithoutProjects: ResumeField[] = ["healthcare", "banking-finance", "legal", "government"];
