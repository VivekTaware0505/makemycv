import { ExamQuestion, Subject, TARGET_QUESTIONS } from "@/data/exam";
import { supabase } from "@/integrations/supabase/client";

const key = (id: string) => `mmcv:exam:${id}`;

export function loadCached(id: string): ExamQuestion[] {
  try {
    const raw = localStorage.getItem(key(id));
    return raw ? (JSON.parse(raw) as ExamQuestion[]) : [];
  } catch {
    return [];
  }
}

export function saveCached(id: string, questions: ExamQuestion[]) {
  try {
    localStorage.setItem(key(id), JSON.stringify(questions));
  } catch {
    /* storage unavailable */
  }
}

/** Ask the AI for a batch of fresh questions with deep model answers. */
export async function generateQuestions(
  subject: Subject,
  university: string,
  existing: string[],
  count: number,
): Promise<ExamQuestion[]> {
  const { data, error } = await supabase.functions.invoke("career-ai", {
    body: {
      task: "exam-answer",
      branch: subject.branches[0],
      year: subject.year,
      sem: (subject.year - 1) * 2 + subject.sem,
      subject: subject.name,
      code: subject.code,
      units: subject.units,
      university,
      existing,
      count,
    },
  });
  if (error) throw error;
  if (data?.error) throw new Error(data.error);
  const incoming: ExamQuestion[] = Array.isArray(data?.questions) ? data.questions : [];
  return incoming.filter((q) => q?.q && q?.a);
}

export const targetCount = TARGET_QUESTIONS;