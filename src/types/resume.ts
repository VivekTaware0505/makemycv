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

export interface ResumeData {
  name: string;
  email: string;
  phone: string;
  summary: string;
  skills: string;
  education: Education[];
  experience: Experience[];
}

export const defaultResumeData: ResumeData = {
  name: '',
  email: '',
  phone: '',
  summary: '',
  skills: '',
  education: [{ id: '1', degree: '', institution: '', year: '' }],
  experience: [{ id: '1', title: '', company: '', duration: '', description: '' }],
};
