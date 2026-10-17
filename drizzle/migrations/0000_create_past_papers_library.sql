CREATE TABLE public.past_papers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  university_id text NOT NULL,
  university_name text NOT NULL,
  program text NOT NULL,
  branch text NOT NULL,
  subject_name text NOT NULL,
  subject_code text,
  academic_year text,
  semester integer NOT NULL,
  exam_year integer NOT NULL,
  exam_session text NOT NULL,
  paper_type text NOT NULL DEFAULT 'End Semester Examination',
  medium text NOT NULL DEFAULT 'English',
  maximum_marks integer NOT NULL,
  duration_minutes integer NOT NULL,
  source_url text,
  file_path text NOT NULL,
  file_name text NOT NULL,
  verification_status text NOT NULL DEFAULT 'Unverified community upload',
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT past_papers_text_lengths CHECK (
    char_length(university_id) BETWEEN 1 AND 64 AND
    char_length(university_name) BETWEEN 1 AND 200 AND
    char_length(program) BETWEEN 1 AND 120 AND
    char_length(branch) BETWEEN 1 AND 120 AND
    char_length(subject_name) BETWEEN 1 AND 200 AND
    (subject_code IS NULL OR char_length(subject_code) <= 64) AND
    (academic_year IS NULL OR char_length(academic_year) <= 32) AND
    char_length(exam_session) BETWEEN 1 AND 64 AND
    char_length(paper_type) BETWEEN 1 AND 64 AND
    char_length(medium) BETWEEN 1 AND 40 AND
    char_length(file_path) BETWEEN 1 AND 300 AND
    char_length(file_name) BETWEEN 1 AND 255 AND
    (source_url IS NULL OR (char_length(source_url) <= 2048 AND source_url ~ '^https?://'))
  ),
  CONSTRAINT past_papers_number_ranges CHECK (
    semester BETWEEN 1 AND 16 AND
    exam_year BETWEEN 1950 AND 2100 AND
    maximum_marks BETWEEN 1 AND 1000 AND
    duration_minutes BETWEEN 1 AND 1440
  )
);
GRANT SELECT, INSERT ON public.past_papers TO anon, authenticated;
GRANT ALL ON public.past_papers TO service_role;
ALTER TABLE public.past_papers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read past papers" ON public.past_papers FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Anyone can submit past papers" ON public.past_papers FOR INSERT TO anon, authenticated WITH CHECK (
  verification_status = 'Unverified community upload' AND
  file_path ~ '^[0-9a-fA-F-]{36}\.pdf$'
);
CREATE INDEX past_papers_university_subject_idx ON public.past_papers (university_id, subject_name);
CREATE INDEX past_papers_exam_year_idx ON public.past_papers (exam_year DESC, created_at DESC);
CREATE POLICY "Public read access for paper PDFs" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'past-year-papers');
CREATE POLICY "Public PDF uploads for past papers" ON storage.objects FOR INSERT TO anon, authenticated WITH CHECK (
  bucket_id = 'past-year-papers' AND
  lower(name) ~ '^[0-9a-f-]{36}\.pdf$' AND
  lower(COALESCE(metadata->>'mimetype', '')) = 'application/pdf'
);