export type BranchId =
  | "first-year"
  | "computer"
  | "it"
  | "ai-ds"
  | "entc"
  | "electrical"
  | "mechanical"
  | "civil"
  | "chemical";

export interface ExamQuestion {
  q: string;
  marks: number;
  topic?: string;
  repeats?: number;
  a: string;
}

export interface Subject {
  id: string;
  name: string;
  code?: string;
  branches: BranchId[];
  year: 1 | 2 | 3 | 4;
  sem: 1 | 2;
  units: string[];
  questions: ExamQuestion[];
}

export interface Branch {
  id: BranchId;
  name: string;
  short: string;
  blurb: string;
}

export const branches: Branch[] = [
  { id: "first-year", name: "First Year (Common)", short: "FE", blurb: "Common subjects for every engineering branch" },
  { id: "computer", name: "Computer Engineering", short: "CSE", blurb: "Core computer science and programming subjects" },
  { id: "it", name: "Information Technology", short: "IT", blurb: "Systems, networks and web technologies" },
  { id: "ai-ds", name: "AI & Data Science", short: "AI/DS", blurb: "Machine learning, data analytics and AI" },
  { id: "entc", name: "Electronics & Telecommunication", short: "E&TC", blurb: "Devices, signals and communication systems" },
  { id: "electrical", name: "Electrical Engineering", short: "EE", blurb: "Machines, power systems and control" },
  { id: "mechanical", name: "Mechanical Engineering", short: "ME", blurb: "Thermal, design and manufacturing subjects" },
  { id: "civil", name: "Civil Engineering", short: "CE", blurb: "Structures, surveying and construction" },
  { id: "chemical", name: "Chemical Engineering", short: "CH", blurb: "Process, reactions and transport phenomena" },
];

export const universities = [
  { id: "sppu", name: "Savitribai Phule Pune University (SPPU)", pattern: "6 questions, attempt any 4 — 70 marks paper" },
  { id: "mu", name: "University of Mumbai", pattern: "6 questions, Q1 compulsory — 80 marks paper" },
  { id: "vtu", name: "VTU Belagavi", pattern: "Module-wise, answer 5 of 10 — 100 marks paper" },
  { id: "aktu", name: "AKTU Lucknow", pattern: "Section A/B/C — 100 marks paper" },
  { id: "anna", name: "Anna University", pattern: "Part A (10x2) + Part B (5x13) — 100 marks paper" },
  { id: "rgpv", name: "RGPV Bhopal", pattern: "Unit-wise, attempt 1 of 2 per unit — 70 marks paper" },
  { id: "other", name: "Other / Autonomous", pattern: "Generic pattern — 70 marks paper" },
];

export const years = [1, 2, 3, 4] as const;