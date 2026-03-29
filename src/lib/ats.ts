import { ResumeData } from "@/types/resume";

export function calculateATSScore(data: ResumeData): { score: number; suggestions: string[] } {
  const suggestions: string[] = [];
  let score = 0;
  const max = 100;

  // Name (10)
  if (data.name.trim()) score += 10;
  else suggestions.push("Add your full name");

  // Email (10)
  if (data.email.trim() && data.email.includes("@")) score += 10;
  else suggestions.push("Add a valid email address");

  // Phone (10)
  if (data.phone.trim()) score += 10;
  else suggestions.push("Add your phone number");

  // Summary (10)
  if (data.summary.trim().length > 30) score += 10;
  else if (data.summary.trim()) { score += 5; suggestions.push("Write a longer professional summary (50+ words)"); }
  else suggestions.push("Add a professional summary");

  // Skills (20)
  const skills = data.skills.split(",").filter((s) => s.trim());
  if (skills.length >= 5) score += 20;
  else if (skills.length >= 3) { score += 12; suggestions.push("Add more skills (aim for 5+)"); }
  else if (skills.length >= 1) { score += 5; suggestions.push("Add more relevant skills"); }
  else suggestions.push("Add your key skills (comma-separated)");

  // Education (15)
  const validEdu = data.education.filter((e) => e.degree.trim() && e.institution.trim());
  if (validEdu.length >= 1) score += 15;
  else suggestions.push("Add your education details");

  // Experience (25)
  const validExp = data.experience.filter((e) => e.title.trim() && e.company.trim());
  if (validExp.length >= 2) score += 25;
  else if (validExp.length === 1) {
    score += 15;
    suggestions.push("Add more work experience for a stronger resume");
  } else suggestions.push("Add your work experience");

  return { score: Math.min(score, max), suggestions };
}
