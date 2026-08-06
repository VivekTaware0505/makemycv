import { universities } from "@/data/exam";

const UNI_KEY = "mmcv:exam:university";

export function getSavedUniversity() {
  try {
    const id = localStorage.getItem(UNI_KEY);
    return universities.find((u) => u.id === id)?.id ?? null;
  } catch {
    return null;
  }
}

export function saveUniversity(id: string) {
  try {
    localStorage.setItem(UNI_KEY, id);
  } catch {
    /* storage unavailable */
  }
}
