import { BranchId, Subject } from "./types";

export type Row = [name: string, code: string, units: string[]];

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/** Build catalog subjects (question banks are generated on demand for these). */
export function make(
  branches: BranchId[],
  year: 1 | 2 | 3 | 4,
  sem: 1 | 2,
  rows: Row[],
): Subject[] {
  return rows.map(([name, code, units]) => ({
    id: `${branches[0]}-s${(year - 1) * 2 + sem}-${slug(name)}`,
    name,
    code,
    branches,
    year,
    sem,
    units,
    questions: [],
  }));
}