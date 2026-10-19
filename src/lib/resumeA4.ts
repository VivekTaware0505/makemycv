export const RESUME_A4 = {
  width: 794,
  height: 1123,
  format: "a4" as const,
  orientation: "portrait" as const,
  margin: 0,
};

export function getResumeCanvasScale(containerWidth: number): number {
  if (!Number.isFinite(containerWidth) || containerWidth <= 0) return 0;
  return Math.min(containerWidth / RESUME_A4.width, 1);
}