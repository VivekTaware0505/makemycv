# Career Journey + Engineering Exam Question Bank

The resume design is already reverted to the original clean single-column layout (better PDF alignment for both sparse and detailed resumes). This plan covers the two new things you asked for.

## Part 1 — Guided hiring journey

A single "Your Journey" page that walks a student through 9 stages, with progress saved locally so they can come back:

```text
1 Resume  →  2 ATS Score  →  3 AI Improvements  →  4 Cover Letter
        →  5 LinkedIn Optimization  →  6 Interview Prep
        →  7 Job Matching  →  8 Application Tracking  →  9 Offer Letter
```

- Stage 1, 2, 6 reuse the existing Builder, ATS Checker and Interview Prep pages.
- New stages built in this phase:
  - AI Improvements: rewrite bullets, stronger action verbs, keyword gaps vs a pasted job description.
  - Cover Letter: AI-generated from resume + job description, editable, PDF/Word download.
  - LinkedIn Optimization: headline, About section and skill order suggestions.
  - Job Matching: paste/select roles, get a match score and missing-keyword list.
  - Application Tracking: simple board (Applied / Interview / Offer / Rejected) with notes and dates.
  - Offer Letter: offer-evaluation checklist and negotiation email templates.
- AI stages use the built-in AI (no API key needed from you).
- Journey stepper is shown on the home page and in the mobile bottom nav.

## Part 2 — Engineering Exam Prep (Important Questions)

A browsable question-bank section for engineering students.

Navigation: Branch → Year → Semester → Subject → Question set

- Branches: Computer, IT, Electronics, E&TC, Electrical, Mechanical, Civil, AI/ML & Data Science, Chemical, plus first-year common subjects.
- Years 1–4, both semesters, subject list per branch/year.
- For each subject:
  - Important Questions (marks-weighted, repeat-frequency tags like "Asked 3 times").
  - Model / dummy question paper matching the university paper pattern.
  - Detailed answers written out properly, not one-liners.
- Two download options per subject, as you asked:
  - Questions-only PDF
  - Questions + Answers PDF
  Both generated in-app with clean formatting, headers and page numbers.
- University filter (Pune / Mumbai / Savitribai Phule / VTU / AKTU / Anna University / Other) applied to paper pattern and question weighting.
- Search across subjects and topics, plus a "Trending in exam season" shelf.

### Rollout of content

Content is the bulk of the work, so it lands in waves:
1. Structure, filters, subject pages, PDF export, with first-year common subjects fully populated.
2. Computer / IT / AI-ML core subjects.
3. Electronics, Electrical, Mechanical, Civil, Chemical.

Later waves can also let AI expand answers on demand so a subject is never empty.

## Technical notes

- New routes: `/journey`, `/cover-letter`, `/linkedin`, `/jobs`, `/tracker`, `/offer`, `/exam-prep`, `/exam-prep/:branch/:year/:subject`.
- Question bank stored as typed data modules (`src/data/exam/<branch>/<year>.ts`) so it is fast, offline-capable and SEO-indexable; migrated to the database later if you want an admin editor.
- PDF export reuses the existing html2pdf pipeline with a dedicated print stylesheet (A4, margins, no orphan headings).
- Journey progress, tracker entries and saved answers stored in the browser; moving to accounts requires sign-in, which we can add when you want cross-device sync.
- Each exam-prep page gets its own title, description, canonical URL and sitemap entry (high-traffic search terms like "SPPU sem 4 important questions").
