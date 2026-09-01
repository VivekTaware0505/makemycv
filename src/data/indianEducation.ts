export type EducationLevel =
  | "Diploma"
  | "Undergraduate"
  | "Postgraduate"
  | "PhD / Doctorate"
  | "Professional"
  | "Vocational / ITI"
  | "Certificate"
  | "Other";

export interface QualificationOption {
  value: string;
  label: string;
  level: EducationLevel;
  aliases?: string[];
}

export const educationLevels: EducationLevel[] = [
  "Diploma",
  "Undergraduate",
  "Postgraduate",
  "PhD / Doctorate",
  "Professional",
  "Vocational / ITI",
  "Certificate",
  "Other",
];

export const qualificationOptions: QualificationOption[] = [
  { value: "Class 10", label: "Class 10 / SSC", level: "Other", aliases: ["ssc", "10th"] },
  { value: "Class 12", label: "Class 12 / HSC", level: "Other", aliases: ["hsc", "12th"] },
  { value: "Diploma", label: "Diploma", level: "Diploma" },
  { value: "Diploma Engineering", label: "Diploma in Engineering", level: "Diploma", aliases: ["polytechnic"] },
  { value: "B.Tech", label: "B.Tech", level: "Undergraduate", aliases: ["btech", "b tech"] },
  { value: "B.E.", label: "B.E.", level: "Undergraduate", aliases: ["be", "bachelor of engineering"] },
  { value: "BCA", label: "BCA", level: "Undergraduate" },
  { value: "B.Sc", label: "B.Sc", level: "Undergraduate", aliases: ["bsc", "bachelor of science"] },
  { value: "B.Com", label: "B.Com", level: "Undergraduate", aliases: ["bcom", "bachelor of commerce"] },
  { value: "BBA", label: "BBA", level: "Undergraduate" },
  { value: "B.A.", label: "B.A.", level: "Undergraduate", aliases: ["ba", "bachelor of arts"] },
  { value: "MBBS", label: "MBBS", level: "Professional" },
  { value: "B.Pharm", label: "B.Pharm", level: "Professional", aliases: ["bpharm"] },
  { value: "B.Ed", label: "B.Ed", level: "Professional", aliases: ["bed"] },
  { value: "LLB", label: "LLB", level: "Professional" },
  { value: "B.Arch", label: "B.Arch", level: "Undergraduate", aliases: ["barch"] },
  { value: "B.Voc", label: "B.Voc", level: "Vocational / ITI", aliases: ["bvoc"] },
  { value: "ITI", label: "ITI", level: "Vocational / ITI" },
  { value: "B.Des", label: "B.Des", level: "Undergraduate" },
  { value: "B.Physiotherapy", label: "BPT / B.Physiotherapy", level: "Professional", aliases: ["bpt"] },
  { value: "BAMS", label: "BAMS", level: "Professional" },
  { value: "BHMS", label: "BHMS", level: "Professional" },
  { value: "B.Sc Nursing", label: "B.Sc Nursing", level: "Professional", aliases: ["nursing"] },
  { value: "MBA", label: "MBA", level: "Postgraduate" },
  { value: "MCA", label: "MCA", level: "Postgraduate" },
  { value: "M.Tech", label: "M.Tech", level: "Postgraduate", aliases: ["mtech"] },
  { value: "M.E.", label: "M.E.", level: "Postgraduate", aliases: ["me", "master of engineering"] },
  { value: "M.Sc", label: "M.Sc", level: "Postgraduate", aliases: ["msc", "master of science"] },
  { value: "M.Com", label: "M.Com", level: "Postgraduate", aliases: ["mcom"] },
  { value: "M.A.", label: "M.A.", level: "Postgraduate", aliases: ["ma", "master of arts"] },
  { value: "LLM", label: "LLM", level: "Postgraduate" },
  { value: "M.Ed", label: "M.Ed", level: "Postgraduate" },
  { value: "M.Arch", label: "M.Arch", level: "Postgraduate" },
  { value: "PG Diploma", label: "PG Diploma", level: "Postgraduate" },
  { value: "CA", label: "Chartered Accountant (CA)", level: "Professional", aliases: ["chartered accountant"] },
  { value: "CS", label: "Company Secretary (CS)", level: "Professional", aliases: ["company secretary"] },
  { value: "CMA", label: "Cost & Management Accountant (CMA)", level: "Professional" },
  { value: "PhD", label: "PhD / Doctorate", level: "PhD / Doctorate", aliases: ["doctorate", "doctoral"] },
  { value: "Certificate Course", label: "Certificate Course", level: "Certificate" },
  { value: "Other", label: "Other qualification", level: "Other" },
];

export const institutionSuggestions = [
  "Savitribai Phule Pune University",
  "Dr. Babasaheb Ambedkar Technological University",
  "University of Mumbai",
  "Shivaji University, Kolhapur",
  "Rashtrasant Tukadoji Maharaj Nagpur University",
  "Maharashtra State Board of Secondary and Higher Secondary Education",
  "IIT Bombay",
  "IIT Delhi",
  "IIT Madras",
  "COEP Technological University",
  "VJTI Mumbai",
  "NMIMS Mumbai",
  "Symbiosis International University",
  "Savitribai Phule Pune University affiliated college",
  "Custom Institution",
];
