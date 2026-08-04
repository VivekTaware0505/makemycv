export type BranchId =
  | "first-year"
  | "computer"
  | "it"
  | "ai-ds"
  | "entc"
  | "electrical"
  | "mechanical"
  | "civil"
  | "chemical"
  | "bca"
  | "bcs"
  | "mca"
  | "mcs";

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

/** Global semester number across the whole degree (Year 2, Sem 1 -> Sem 3). */
export function globalSem(s: Pick<Subject, "year" | "sem">) {
  return (s.year - 1) * 2 + s.sem;
}

export interface Branch {
  id: BranchId;
  name: string;
  short: string;
  blurb: string;
  stream?: "engineering" | "computer-application";
}

export const branches: Branch[] = [
  { id: "first-year", name: "First Year (Common)", short: "FE", blurb: "Common subjects for every engineering branch", stream: "engineering" },
  { id: "computer", name: "Computer Engineering", short: "CSE", blurb: "Core computer science and programming subjects", stream: "engineering" },
  { id: "it", name: "Information Technology", short: "IT", blurb: "Systems, networks and web technologies", stream: "engineering" },
  { id: "ai-ds", name: "AI & Data Science", short: "AI/DS", blurb: "Machine learning, data analytics and AI", stream: "engineering" },
  { id: "entc", name: "Electronics & Telecommunication", short: "E&TC", blurb: "Devices, signals and communication systems", stream: "engineering" },
  { id: "electrical", name: "Electrical Engineering", short: "EE", blurb: "Machines, power systems and control", stream: "engineering" },
  { id: "mechanical", name: "Mechanical Engineering", short: "ME", blurb: "Thermal, design and manufacturing subjects", stream: "engineering" },
  { id: "civil", name: "Civil Engineering", short: "CE", blurb: "Structures, surveying and construction", stream: "engineering" },
  { id: "chemical", name: "Chemical Engineering", short: "CH", blurb: "Process, reactions and transport phenomena", stream: "engineering" },
  { id: "bca", name: "Bachelor of Computer Applications", short: "BCA", blurb: "Applications, web, databases and programming", stream: "computer-application" },
  { id: "bcs", name: "B.Sc. Computer Science", short: "BCS", blurb: "Core computer science with maths and electronics", stream: "computer-application" },
  { id: "mca", name: "Master of Computer Applications", short: "MCA", blurb: "Advanced software, data and cloud subjects", stream: "computer-application" },
  { id: "mcs", name: "M.Sc. Computer Science", short: "MCS", blurb: "Research-level computing, AI and security", stream: "computer-application" },
];

export const universities = [
  { id: "sppu", name: "Savitribai Phule Pune University (SPPU), Pune", pattern: "6 questions, attempt any 4 — 70 marks paper" },
  { id: "dbatu", name: "Dr. Babasaheb Ambedkar Technological University (DBATU), Lonere", pattern: "Unit-wise, Q1 objective compulsory — 60 marks paper" },
  { id: "mu", name: "University of Mumbai", pattern: "6 questions, Q1 compulsory — 80 marks paper" },
  { id: "unishivaji", name: "Shivaji University, Kolhapur", pattern: "Q1 MCQ + 4 long answers — 70 marks paper" },
  { id: "nmu", name: "Kavayitri Bahinabai Chaudhari North Maharashtra University, Jalgaon", pattern: "5 questions of 14 marks — 70 marks paper" },
  { id: "rtmnu", name: "Rashtrasant Tukadoji Maharaj Nagpur University (RTMNU)", pattern: "Unit-wise, attempt 1 of 2 per unit — 80 marks paper" },
  { id: "bamu", name: "Dr. Babasaheb Ambedkar Marathwada University (BAMU), Aurangabad", pattern: "Q1 short notes + 4 long answers — 80 marks paper" },
  { id: "pahsu", name: "Punyashlok Ahilyadevi Holkar Solapur University", pattern: "Q1 MCQ + 4 of 6 questions — 70 marks paper" },
  { id: "sgbau", name: "Sant Gadge Baba Amravati University", pattern: "Unit-wise, attempt any 5 — 80 marks paper" },
  { id: "gondwana", name: "Gondwana University, Gadchiroli", pattern: "Unit-wise, 1 of 2 per unit — 80 marks paper" },
  { id: "sndt", name: "SNDT Women's University, Mumbai", pattern: "Q1 compulsory + any 4 — 70 marks paper" },
  { id: "yashwantrao", name: "YCMOU, Nashik", pattern: "Section A/B/C — 80 marks paper" },
  { id: "vtu", name: "VTU Belagavi", pattern: "Module-wise, answer 5 of 10 — 100 marks paper" },
  { id: "aktu", name: "AKTU Lucknow", pattern: "Section A/B/C — 100 marks paper" },
  { id: "anna", name: "Anna University", pattern: "Part A (10x2) + Part B (5x13) — 100 marks paper" },
  { id: "rgpv", name: "RGPV Bhopal", pattern: "Unit-wise, attempt 1 of 2 per unit — 70 marks paper" },
  { id: "other", name: "Other / Autonomous", pattern: "Generic pattern — 70 marks paper" },
];

export const years = [1, 2, 3, 4] as const;