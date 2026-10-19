import { describe, expect, it } from "vitest";
import { getResumeCanvasScale, RESUME_A4 } from "@/lib/resumeA4";

describe("resume A4 geometry", () => {
  it("uses one fixed, margin-free A4 portrait canvas", () => {
    expect(RESUME_A4).toEqual({
      width: 794,
      height: 1123,
      format: "a4",
      orientation: "portrait",
      margin: 0,
    });
  });

  it("scales the preview down to fit without changing its A4 proportions", () => {
    expect(getResumeCanvasScale(397)).toBe(0.5);
    expect(getResumeCanvasScale(794)).toBe(1);
    expect(getResumeCanvasScale(1200)).toBe(1);
  });

  it("does not produce an invalid scale for an unavailable preview width", () => {
    expect(getResumeCanvasScale(0)).toBe(0);
    expect(getResumeCanvasScale(Number.NaN)).toBe(0);
  });
});