export type StreamId =
  | "engineering"
  | "computer-application"
  | "management"
  | "medical"
  | "agriculture";

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
  | "mcs"
  | "mba-marketing"
  | "mba-finance"
  | "mba-hr"
  | "mba-operations"
  | "mba-analytics"
  | "mbbs"
  | "bams"
  | "bhms"
  | "bsc-nursing"
  | "bsc-agri";

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
  stream?: StreamId;
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
  { id: "mba-marketing", name: "MBA Marketing", short: "MBA-MKT", blurb: "Brand, sales, consumer behaviour and digital marketing", stream: "management" },
  { id: "mba-finance", name: "MBA Finance", short: "MBA-FIN", blurb: "Corporate finance, investments and banking", stream: "management" },
  { id: "mba-hr", name: "MBA Human Resources", short: "MBA-HR", blurb: "HRM, labour law, training and OB", stream: "management" },
  { id: "mba-operations", name: "MBA Operations & SCM", short: "MBA-OPS", blurb: "Operations, logistics, quality and supply chain", stream: "management" },
  { id: "mba-analytics", name: "MBA Business Analytics", short: "MBA-BA", blurb: "Data-driven decisions, BI and analytics tools", stream: "management" },
  { id: "mbbs", name: "MBBS", short: "MBBS", blurb: "Anatomy, physiology, pathology, medicine and surgery", stream: "medical" },
  { id: "bams", name: "BAMS (Ayurveda)", short: "BAMS", blurb: "Ayurvedic samhita, dravyaguna, kayachikitsa", stream: "medical" },
  { id: "bhms", name: "BHMS (Homoeopathy)", short: "BHMS", blurb: "Organon, materia medica, repertory and practice", stream: "medical" },
  { id: "bsc-nursing", name: "B.Sc. Nursing", short: "NURSING", blurb: "Nursing foundations, MSN, OBG and community health", stream: "medical" },
  { id: "bsc-agri", name: "B.Sc. Agriculture", short: "AGRI", blurb: "Agronomy, soil science, horticulture and extension", stream: "agriculture" },
];

export interface Stream {
  id: StreamId;
  label: string;
  tagline: string;
}

export const streams: Stream[] = [
  { id: "engineering", label: "Engineering", tagline: "All branches · First year to final year" },
  { id: "computer-application", label: "BCA · BCS · MCA · MCS", tagline: "Computer application degrees, all semesters" },
  { id: "management", label: "MBA / MMS", tagline: "Marketing, Finance, HR, Operations, Analytics" },
  { id: "medical", label: "Medical & Nursing", tagline: "MBBS · BAMS · BHMS · B.Sc. Nursing" },
  { id: "agriculture", label: "Agriculture", tagline: "B.Sc. Agri — agronomy to extension" },
];

export interface University {
  id: string;
  name: string;
  short: string;
  pattern: string;
  streams: StreamId[];
}

const tech: StreamId[] = ["engineering", "computer-application", "management"];

export const universities: University[] = [
  { id: "sppu", short: "SPPU", name: "Savitribai Phule Pune University (SPPU), Pune", pattern: "6 questions, attempt any 4 — 70 marks paper", streams: tech },
  { id: "dbatu", short: "DBATU", name: "Dr. Babasaheb Ambedkar Technological University (DBATU), Lonere", pattern: "Unit-wise, Q1 objective compulsory — 60 marks paper", streams: ["engineering", "computer-application"] },
  { id: "mu", short: "Mumbai", name: "University of Mumbai", pattern: "6 questions, Q1 compulsory — 80 marks paper", streams: tech },
  { id: "unishivaji", short: "Shivaji", name: "Shivaji University, Kolhapur", pattern: "Q1 MCQ + 4 long answers — 70 marks paper", streams: [...tech, "agriculture"] },
  { id: "nmu", short: "KBCNMU", name: "Kavayitri Bahinabai Chaudhari North Maharashtra University, Jalgaon", pattern: "5 questions of 14 marks — 70 marks paper", streams: tech },
  { id: "rtmnu", short: "RTMNU", name: "Rashtrasant Tukadoji Maharaj Nagpur University (RTMNU)", pattern: "Unit-wise, attempt 1 of 2 per unit — 80 marks paper", streams: tech },
  { id: "bamu", short: "BAMU", name: "Dr. Babasaheb Ambedkar Marathwada University (BAMU), Aurangabad", pattern: "Q1 short notes + 4 long answers — 80 marks paper", streams: tech },
  { id: "pahsu", short: "Solapur", name: "Punyashlok Ahilyadevi Holkar Solapur University", pattern: "Q1 MCQ + 4 of 6 questions — 70 marks paper", streams: tech },
  { id: "sgbau", short: "SGBAU", name: "Sant Gadge Baba Amravati University", pattern: "Unit-wise, attempt any 5 — 80 marks paper", streams: tech },
  { id: "gondwana", short: "Gondwana", name: "Gondwana University, Gadchiroli", pattern: "Unit-wise, 1 of 2 per unit — 80 marks paper", streams: tech },
  { id: "sndt", short: "SNDT", name: "SNDT Women's University, Mumbai", pattern: "Q1 compulsory + any 4 — 70 marks paper", streams: [...tech, "medical"] },
  { id: "muhs", short: "MUHS", name: "Maharashtra University of Health Sciences (MUHS), Nashik", pattern: "Long answers + short notes — 100 marks theory paper", streams: ["medical"] },
  { id: "mgmims", short: "MGMIHS", name: "MGM Institute of Health Sciences, Navi Mumbai", pattern: "SAQ + LAQ pattern — 100 marks paper", streams: ["medical"] },
  { id: "inc", short: "INC", name: "Indian Nursing Council pattern (B.Sc. Nursing)", pattern: "Section A objectives + SAQ + LAQ — 75 marks paper", streams: ["medical"] },
  { id: "mpkv", short: "MPKV", name: "Mahatma Phule Krishi Vidyapeeth (MPKV), Rahuri", pattern: "Objective + short + long answers — 100 marks (ICAR pattern)", streams: ["agriculture"] },
  { id: "pdkv", short: "PDKV", name: "Dr. Panjabrao Deshmukh Krishi Vidyapeeth (PDKV), Akola", pattern: "ICAR unit-wise pattern — 100 marks paper", streams: ["agriculture"] },
  { id: "vnmkv", short: "VNMKV", name: "Vasantrao Naik Marathwada Krishi Vidyapeeth, Parbhani", pattern: "ICAR pattern, unit-wise questions — 100 marks paper", streams: ["agriculture"] },
  { id: "aicte-mba", short: "AICTE MBA", name: "AICTE / Autonomous MBA pattern", pattern: "Case study + 4 long answers — 70 marks paper", streams: ["management"] },
  { id: "vtu", short: "VTU", name: "VTU Belagavi", pattern: "Module-wise, answer 5 of 10 — 100 marks paper", streams: tech },
  { id: "aktu", short: "AKTU", name: "AKTU Lucknow", pattern: "Section A/B/C — 100 marks paper", streams: tech },
  { id: "anna", short: "Anna", name: "Anna University", pattern: "Part A (10x2) + Part B (5x13) — 100 marks paper", streams: tech },
  { id: "rgpv", short: "RGPV", name: "RGPV Bhopal", pattern: "Unit-wise, attempt 1 of 2 per unit — 70 marks paper", streams: tech },
  { id: "yashwantrao", short: "YCMOU", name: "YCMOU, Nashik", pattern: "Section A/B/C — 80 marks paper", streams: tech },
  { id: "other", short: "Other", name: "Other / Autonomous University", pattern: "Generic pattern — 70 marks paper", streams: ["engineering", "computer-application", "management", "medical", "agriculture"] },
];

export const years = [1, 2, 3, 4] as const;
