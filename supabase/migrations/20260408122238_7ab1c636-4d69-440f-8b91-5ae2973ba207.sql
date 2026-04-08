
CREATE TABLE public.resume_downloads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_name TEXT,
  user_email TEXT,
  user_phone TEXT,
  format TEXT NOT NULL CHECK (format IN ('pdf', 'word')),
  template TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.resume_downloads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public inserts for download tracking"
ON public.resume_downloads
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Allow authenticated reads"
ON public.resume_downloads
FOR SELECT
TO authenticated
USING (true);
