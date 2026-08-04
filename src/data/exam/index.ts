import { branchSubjects } from "./branchSubjects";
import { firstYearSubjects } from "./firstYear";
import { compAppFoundationSubjects } from "./compAppFoundation";
import { compAppCoreSubjects } from "./compAppCore";
import { compAppProgrammingSubjects } from "./compAppProgramming";
import { compAppAdvancedSubjects } from "./compAppAdvanced";
import { BranchId, Subject } from "./types";

export * from "./types";

export const allSubjects: Subject[] = [
  ...firstYearSubjects,
  ...branchSubjects,
  ...compAppFoundationSubjects,
  ...compAppCoreSubjects,
  ...compAppProgrammingSubjects,
  ...compAppAdvancedSubjects,
];

export function subjectsFor(branch: BranchId, year?: number) {
  return allSubjects.filter((s) => s.branches.includes(branch) && (!year || s.year === year));
}

export function subjectsForSem(branch: BranchId, sem: number) {
  return allSubjects.filter((s) => s.branches.includes(branch) && (s.year - 1) * 2 + s.sem === sem);
}

export function semestersFor(branch: BranchId) {
  const set = new Set(
    allSubjects.filter((s) => s.branches.includes(branch)).map((s) => (s.year - 1) * 2 + s.sem),
  );
  return [...set].sort((a, b) => a - b);
}

export function yearsFor(branch: BranchId) {
  const set = new Set(allSubjects.filter((s) => s.branches.includes(branch)).map((s) => s.year));
  return [...set].sort();
}

export function getSubject(id: string) {
  return allSubjects.find((s) => s.id === id);
}

export function searchSubjects(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return allSubjects.filter(
    (s) =>
      s.name.toLowerCase().includes(q) ||
      s.units.some((u) => u.toLowerCase().includes(q)) ||
      s.questions.some((question) => question.q.toLowerCase().includes(q)),
  );
}

export function trendingSubjects() {
  return [...allSubjects]
    .sort((a, b) => {
      const score = (s: Subject) => s.questions.reduce((n, q) => n + (q.repeats || 0), 0);
      return score(b) - score(a);
    })
    .slice(0, 6);
}