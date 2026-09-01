# Smart A4, Indian Education, and University UX

## Scope
- Add a normalized education model with Indian qualification levels, searchable degree and institution data, dates, grades, study status, achievements, and backwards-compatible rendering.
- Create a shared A4 export measurement/layout path so PDF downloads clone the exact preview dimensions, use deterministic page-break rules, and adapt density through bounded spacing/type values.
- Replace the exam-prep university list with state-filtered, searchable autocomplete suggestions, popular/recent results, college/institution filtering, keyboard navigation, and manual university entry.

## Technical details
- Keep the resume preview at a fixed 794 × 1123 CSS-pixel A4 canvas for screen and export; use CSS variables/classes for print-safe sizing and avoid scale values that can make text unreadable.
- Extend Education with optional fields and normalize legacy degree/institution/year values in the form and preview.
- Add an Indian education catalog and Maharashtra-focused university/college metadata with aliases for abbreviation, spelling, and location search.
- Validate with the project build signal and Playwright checks at desktop and mobile viewport sizes, including education entry, university search, and resume preview dimensions.

## Verification
- Confirm no build errors, the builder renders, the education form supports multiple entries, university search narrows results and manual entry is selectable, and PDF export uses A4 settings.
