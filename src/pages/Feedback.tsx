import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2, MessageSquarePlus, Quote, Star } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface FeedbackRow {
  id: string;
  name: string;
  course: string | null;
  rating: number;
  message: string;
  created_at: string;
}

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(60, "Name is too long"),
  course: z.string().trim().max(80, "Course/college is too long").optional(),
  message: z
    .string()
    .trim()
    .min(10, "Please write at least 10 characters")
    .max(800, "Feedback must be under 800 characters"),
  rating: z.number().int().min(1).max(5),
});

const initials = (name: string) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");

const Feedback = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState<FeedbackRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);

  const load = async () => {
    const { data, error } = await supabase
      .from("student_feedback")
      .select("id, name, course, rating, message, created_at")
      .order("created_at", { ascending: false })
      .limit(200);
    if (!error) setRows((data as FeedbackRow[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ name, course: course || undefined, message, rating });
    if (!parsed.success) {
      toast({
        title: "Please check your feedback",
        description: parsed.error.issues[0].message,
        variant: "destructive",
      });
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("student_feedback").insert({
      name: parsed.data.name,
      course: parsed.data.course ?? null,
      message: parsed.data.message,
      rating: parsed.data.rating,
    });
    setSubmitting(false);
    if (error) {
      toast({ title: "Could not submit", description: "Please try again in a moment.", variant: "destructive" });
      return;
    }
    toast({ title: "Thank you!", description: "Your feedback is now live on this page." });
    setName("");
    setCourse("");
    setMessage("");
    setRating(5);
    load();
  };

  const avg = rows.length ? rows.reduce((n, r) => n + r.rating, 0) / rows.length : 0;

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-12">
      <Helmet>
        <title>Student Feedback & Reviews - MakeMyCV</title>
        <meta
          name="description"
          content="Read genuine feedback from students and professionals using MakeMyCV for resumes, ATS scores, interview prep and engineering exam question papers — and share your own."
        />
        <link rel="canonical" href="https://makemycv.co.in/feedback" />
        <meta property="og:title" content="Student Feedback & Reviews - MakeMyCV" />
        <meta property="og:url" content="https://makemycv.co.in/feedback" />
      </Helmet>

      <header className="border-b border-border bg-card/80 backdrop-blur-xl sticky top-0 z-30">
        <div className="container mx-auto px-4 h-14 flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="gap-2 text-muted-foreground">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Home</span>
          </Button>
          <span className="text-sm font-semibold">Student Feedback</span>
        </div>
      </header>

      <section className="container mx-auto px-4 pt-8 pb-4">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display uppercase text-3xl sm:text-5xl leading-[0.95] mb-3">
            What students <span className="text-primary">say</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            Every review below was submitted by a real user. Share yours — it appears on this page instantly.
          </p>
          {rows.length > 0 && (
            <div className="flex items-center gap-2 mt-4 text-sm">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.round(avg) ? "fill-warning text-warning" : "text-muted-foreground"}`}
                  />
                ))}
              </div>
              <span className="font-semibold">{avg.toFixed(1)}/5</span>
              <span className="text-muted-foreground">from {rows.length} submitted reviews</span>
            </div>
          )}
        </motion.div>
      </section>

      <section className="container mx-auto px-4 py-6">
        <form onSubmit={submit} className="rounded-2xl border border-border bg-card shadow-card p-5 space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <MessageSquarePlus className="w-4 h-4 text-primary" /> Give your feedback
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              maxLength={60}
              className="h-11 rounded-xl"
            />
            <Input
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              placeholder="Course / College (optional) — e.g. MCA, SPPU"
              maxLength={80}
              className="h-11 rounded-xl"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground">Rating</span>
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                aria-label={`${n} star`}
                onClick={() => setRating(n)}
                className="p-0.5"
              >
                <Star className={`w-6 h-6 ${n <= rating ? "fill-warning text-warning" : "text-muted-foreground"}`} />
              </button>
            ))}
          </div>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell other students how MakeMyCV helped you…"
            maxLength={800}
            rows={4}
            className="rounded-xl"
          />
          <Button type="submit" disabled={submitting} className="h-12 rounded-xl font-semibold w-full sm:w-auto px-8">
            {submitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
            Submit feedback
          </Button>
        </form>
      </section>

      <section className="container mx-auto px-4 pb-10">
        {loading ? (
          <div className="flex items-center justify-center py-12 text-muted-foreground">
            <Loader2 className="w-5 h-5 animate-spin" />
          </div>
        ) : rows.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
            No student feedback yet — be the first to share your experience.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rows.map((r) => (
              <div key={r.id} className="relative p-5 rounded-2xl border border-border bg-card shadow-card">
                <Quote className="absolute top-4 right-4 w-7 h-7 text-primary/10" />
                <div className="flex items-center gap-0.5 mb-2.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${i < r.rating ? "fill-warning text-warning" : "text-muted-foreground/40"}`}
                    />
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-4">"{r.message}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full gradient-brand flex items-center justify-center text-primary-foreground font-bold text-xs">
                    {initials(r.name)}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{r.name}</div>
                    {r.course && <div className="text-[11px] text-muted-foreground">{r.course}</div>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Feedback;
