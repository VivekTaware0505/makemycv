import { ResumeData, defaultResumeData } from "@/types/resume";

export type StageId =
  | "resume"
  | "ats"
  | "improve"
  | "cover-letter"
  | "linkedin"
  | "interview"
  | "jobs"
  | "tracker"
  | "offer";

export interface Stage {
  id: StageId;
  step: number;
  title: string;
  blurb: string;
  path: string;
  cta: string;
}

export const stages: Stage[] = [
  { id: "resume", step: 1, title: "Resume", blurb: "Build an ATS-ready resume with a template that fits your field.", path: "/builder", cta: "Build resume" },
  { id: "ats", step: 2, title: "ATS Score", blurb: "Check how applicant tracking systems read your resume.", path: "/ats-checker", cta: "Check score" },
  { id: "improve", step: 3, title: "AI Improvements", blurb: "Rewrite weak bullets, add numbers, fix missing keywords.", path: "/ai-improvements", cta: "Improve resume" },
  { id: "cover-letter", step: 4, title: "Cover Letter", blurb: "Generate a tailored letter for the exact role you want.", path: "/cover-letter", cta: "Write letter" },
  { id: "linkedin", step: 5, title: "LinkedIn Optimization", blurb: "Headline, About section and skills recruiters search for.", path: "/linkedin", cta: "Optimize profile" },
  { id: "interview", step: 6, title: "Interview Preparation", blurb: "Real questions asked at Amazon, TCS, Infosys and more.", path: "/interview-prep", cta: "Start practising" },
  { id: "jobs", step: 7, title: "Job Matching", blurb: "Paste a job description and see your true match score.", path: "/jobs", cta: "Match a job" },
  { id: "tracker", step: 8, title: "Application Tracking", blurb: "Track every application from applied to offer.", path: "/tracker", cta: "Open tracker" },
  { id: "offer", step: 9, title: "Offer Letter", blurb: "Evaluate the offer and negotiate with ready templates.", path: "/offer", cta: "Review offer" },
];

const PROGRESS_KEY = "mmcv:journey";
const RESUME_KEY = "mmcv:resume";

export function getProgress(): StageId[] {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    return raw ? (JSON.parse(raw) as StageId[]) : [];
  } catch {
    return [];
  }
}

export function markStageDone(id: StageId) {
  const done = new Set(getProgress());
  done.add(id);
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify([...done]));
  } catch {
    /* storage unavailable */
  }
}

export function saveResume(data: ResumeData) {
  try {
    localStorage.setItem(RESUME_KEY, JSON.stringify(data));
  } catch {
    /* storage unavailable */
  }
}

export function loadResume(): ResumeData {
  try {
    const raw = localStorage.getItem(RESUME_KEY);
    if (!raw) return defaultResumeData;
    return { ...defaultResumeData, ...JSON.parse(raw) } as ResumeData;
  } catch {
    return defaultResumeData;
  }
}

export function hasResume(data: ResumeData) {
  return Boolean(data.name || data.skills || data.summary);
}