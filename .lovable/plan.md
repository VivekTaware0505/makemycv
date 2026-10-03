# Fixed A4 Resume, University Paper Library, and Six-Step Hiring Journey

## Scope
- Lock every resume template to one 794 × 1123 A4 canvas with a shared content margin, stable single/two-column widths, adaptive density, overflow safeguards, and identical preview/PDF page-break behavior.
- Replace the current generated/cached exam material presentation with a structured university library for DBATU, Mumbai University, SPPU/Pune University, and other Maharashtra universities. Add an upload-ready paper record model and clearly label unavailable papers instead of inventing content.
- Replace the current nine-step Hiring Journey with exactly six working stages: Resume, Cover Letter, Interview Prep, Mock Interviews, Salary Negotiation, and Job Search.
- Update navigation, progress tracking, and page metadata so every journey button opens a usable tool.

## User experience
- Resume preview remains a fixed A4 page on desktop and scales visually on smaller screens without changing its internal geometry.
- PDF download captures the same fixed canvas with zero extra print margin; spacing and column measurements come from the preview itself.
- Exam Prep shows verified university/subject metadata and provides a clean paper-library state ready for authorized PDF uploads. Existing generated question banks will no longer be presented as past university papers.
- Cover Letter creates an editable, downloadable letter from role/company inputs and saved resume details.
- Mock Interviews provides role-based question practice with answer reveal and progress.
- Salary Negotiation provides compensation comparison plus ready-to-copy negotiation wording.
- Job Search provides a structured search checklist, saved target roles, and direct searches across major job portals.

## Technical details
- Centralize A4 dimensions and export rules; use deterministic CSS break classes and content-fit density without shrinking below readable type.
- Keep university paper metadata separate from generated study aids. Store only uploaded/authorized paper references when files are supplied later.
- Reuse the existing Resume Builder and Interview Prep pages for two journey stages; add focused pages for the other four.
- Persist lightweight journey inputs and completion locally, consistent with the current app.

## Verification
- Check fixed A4 dimensions and scaling in desktop/mobile previews, export a PDF, and verify its A4 page size and margins.
- Confirm every six-step journey action resolves to real content with no 404 pages.
- Confirm Exam Prep does not claim generated questions are official past papers and handles missing uploads honestly.
- Confirm the latest app build and key browser flows complete without errors.
