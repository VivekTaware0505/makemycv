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

export interface ResumeData {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  portfolio: string;
  summary: string;
  skills: string;
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
  education: [{ id: '1', degree: '', institution: '', year: '' }],
  experience: [{ id: '1', title: '', company: '', duration: '', description: '' }],
  projects: [{ id: '1', name: '', description: '', technologies: '', link: '' }],
  certifications: [{ id: '1', name: '', issuer: '', year: '' }],
};
