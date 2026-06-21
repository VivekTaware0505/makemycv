
-- Drop sensitive PII columns; analytics only needs format/template/timestamp
ALTER TABLE public.resume_downloads
  DROP COLUMN IF EXISTS user_name,
  DROP COLUMN IF EXISTS user_email,
  DROP COLUMN IF EXISTS user_phone;

-- Add basic validation
ALTER TABLE public.resume_downloads
  ADD CONSTRAINT resume_downloads_format_chk CHECK (char_length(format) BETWEEN 1 AND 32),
  ADD CONSTRAINT resume_downloads_template_chk CHECK (template IS NULL OR char_length(template) BETWEEN 1 AND 64);

-- Remove overly permissive SELECT policy; only service_role may read
DROP POLICY IF EXISTS "Allow authenticated reads" ON public.resume_downloads;

-- Tighten INSERT policy (keep public inserts but bounded by CHECK constraints above)
DROP POLICY IF EXISTS "Allow public inserts for download tracking" ON public.resume_downloads;
CREATE POLICY "Allow public inserts for download tracking"
  ON public.resume_downloads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(format) BETWEEN 1 AND 32
    AND (template IS NULL OR char_length(template) BETWEEN 1 AND 64)
  );
