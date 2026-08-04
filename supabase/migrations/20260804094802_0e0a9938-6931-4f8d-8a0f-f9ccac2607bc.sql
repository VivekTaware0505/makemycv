CREATE TABLE public.student_feedback (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  course text,
  rating smallint NOT NULL DEFAULT 5,
  message text NOT NULL,
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT student_feedback_name_len CHECK (char_length(btrim(name)) BETWEEN 2 AND 60),
  CONSTRAINT student_feedback_course_len CHECK (course IS NULL OR char_length(course) <= 80),
  CONSTRAINT student_feedback_message_len CHECK (char_length(btrim(message)) BETWEEN 10 AND 800),
  CONSTRAINT student_feedback_rating_range CHECK (rating BETWEEN 1 AND 5)
);

GRANT SELECT, INSERT ON public.student_feedback TO anon;
GRANT SELECT, INSERT ON public.student_feedback TO authenticated;
GRANT ALL ON public.student_feedback TO service_role;

ALTER TABLE public.student_feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published feedback"
ON public.student_feedback FOR SELECT
TO anon, authenticated
USING (is_published = true);

CREATE POLICY "Anyone can submit feedback"
ON public.student_feedback FOR INSERT
TO anon, authenticated
WITH CHECK (is_published = true);

CREATE INDEX student_feedback_created_at_idx ON public.student_feedback (created_at DESC);