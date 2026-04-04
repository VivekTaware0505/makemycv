import { ResumeData } from "@/types/resume";

export function calculateATSScore(data: ResumeData): { score: number; suggestions: string[] } {
  const suggestions: string[] = [];
  let score = 0;
  const max = 100;

  // Name (8)
  if (data.name.trim()) score += 8;
  else suggestions.push("Add your full name");

  // Email (8)
  if (data.email.trim() && data.email.includes("@")) score += 8;
  else suggestions.push("Add a valid email address");

  // Phone (5)
  if (data.phone.trim()) score += 5;
  else suggestions.push("Add your phone number");

  // LinkedIn (4)
  if (data.linkedin.trim()) score += 4;
  else suggestions.push("Add your LinkedIn profile URL");

  // Summary (10)
  if (data.summary.trim().length > 30) score += 10;
  else if (data.summary.trim()) { score += 5; suggestions.push("Write a longer professional summary (50+ words)"); }
  else suggestions.push("Add a professional summary");

  // Skills (15)
  const skills = data.skills.split(",").filter((s) => s.trim());
  if (skills.length >= 5) score += 15;
  else if (skills.length >= 3) { score += 9; suggestions.push("Add more skills (aim for 5+)"); }
  else if (skills.length >= 1) { score += 4; suggestions.push("Add more relevant skills"); }
  else suggestions.push("Add your key skills (comma-separated)");

  // Education (12)
  const validEdu = data.education.filter((e) => e.degree.trim() && e.institution.trim());
  if (validEdu.length >= 1) score += 12;
  else suggestions.push("Add your education details");

  // Experience (20)
  const validExp = data.experience.filter((e) => e.title.trim() && e.company.trim());
  if (validExp.length >= 2) score += 20;
  else if (validExp.length === 1) { score += 12; suggestions.push("Add more work experience for a stronger resume"); }
  else suggestions.push("Add your work experience");

  // Projects (10)
  const validProjects = data.projects.filter((p) => p.name.trim() && p.description.trim());
  if (validProjects.length >= 2) score += 10;
  else if (validProjects.length === 1) { score += 6; suggestions.push("Add more projects to showcase your work"); }
  else suggestions.push("Add projects to demonstrate your skills");

  // Certifications (5)
  const validCerts = data.certifications.filter((c) => c.name.trim());
  if (validCerts.length >= 1) score += 5;
  else suggestions.push("Add certifications to stand out");

  // Portfolio (3)
  if (data.portfolio.trim()) score += 3;
  else suggestions.push("Add a portfolio or website link");

  return { score: Math.min(score, max), suggestions };
}
