// @ts-nocheck
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type Task =
  | "improve-resume"
  | "cover-letter"
  | "linkedin"
  | "job-match"
  | "exam-answer"
  | "exam-notes";

const prompts: Record<Task, { system: string; user: (p: any) => string }> = {
  "improve-resume": {
    system:
      "You are an expert resume editor for ATS systems. Rewrite weak content into strong, quantified, action-verb bullet points. Return STRICT JSON only.",
    user: (p) => `Resume JSON:\n${JSON.stringify(p.resume)}\n\nTarget job description (may be empty):\n${p.jobDescription || "(none)"}\n\nReturn JSON:
{
  "summary": "a rewritten 2-3 sentence professional summary",
  "bullets": [{ "section": "experience|project", "title": "which item", "before": "original text", "after": "improved bullet" }],
  "missingKeywords": ["keyword", "..."],
  "quickWins": ["short actionable fix", "..."]
}`,
  },
  "cover-letter": {
    system:
      "You are a professional career writer. Write tailored, confident, human-sounding cover letters. No clichés, no filler. Return STRICT JSON only.",
    user: (p) => `Candidate resume JSON:\n${JSON.stringify(p.resume)}\n\nCompany: ${p.company || "(unspecified)"}\nRole: ${p.role || "(unspecified)"}\nTone: ${p.tone || "professional"}\nJob description:\n${p.jobDescription || "(none)"}\n\nReturn JSON: { "letter": "full cover letter text with \\n\\n between paragraphs (250-350 words)" }`,
  },
  linkedin: {
    system:
      "You are a LinkedIn profile strategist optimizing for recruiter search. Return STRICT JSON only.",
    user: (p) => `Resume JSON:\n${JSON.stringify(p.resume)}\nTarget role: ${p.role || "(from resume)"}\n\nReturn JSON:
{
  "headlines": ["3 headline options under 220 characters"],
  "about": "an About section of 4 short paragraphs, first person, with \\n\\n breaks",
  "skillOrder": ["top 10 skills in the order they should be pinned"],
  "tips": ["6 concrete profile improvements (photo, banner, featured, activity, recommendations, keywords)"]
}`,
  },
  "job-match": {
    system:
      "You are an ATS matching engine. Compare a resume against a job description honestly. Return STRICT JSON only.",
    user: (p) => `Resume JSON:\n${JSON.stringify(p.resume)}\n\nJob description:\n${p.jobDescription}\n\nReturn JSON:
{
  "score": 0-100,
  "verdict": "one sentence honest verdict",
  "matched": ["skills/keywords present"],
  "missing": ["important keywords absent"],
  "actions": ["4-6 specific changes to raise the score"]
}`,
  },
  "exam-answer": {
    system:
      "You are a senior university professor and paper-setter (engineering, computer applications, MBA, medical, nursing and agriculture). You write exam-ready model answers that score full marks: precise definition, deep explanation, structured key points, diagram/flow description where useful, a worked example or clinical/field application, and a one-line conclusion. Use the exact terminology of the syllabus. Return STRICT JSON only.",
    user: (p) => `Branch: ${p.branch}\nYear: ${p.year}\nSemester: ${p.sem || "(unspecified)"}\nSubject: ${p.subject}${p.code ? ` (code ${p.code})` : ""}\nSyllabus units: ${(p.units || []).join(" | ") || "(standard syllabus)"}\nUniversity pattern: ${p.university || "generic"}\nExisting questions to AVOID repeating:\n${(p.existing || []).slice(0, 40).join("\n") || "(none)"}\n\nGenerate ${p.count || 5} important university exam questions for this exact subject, spread across the syllabus units above and weighted towards repeatedly asked topics. Each needs a deep, exam-scoring model answer (definition, explanation, key points, a worked example or diagram description where useful).\nReturn JSON: { "questions": [ { "q": "...", "marks": 5, "topic": "one of the units", "repeats": 3, "a": "detailed model answer, 150-260 words, use \\n for line breaks and '-' for point lists" } ] }`,
  },
  "exam-notes": {
    system:
      "You are a senior university professor writing the clearest possible revision notes for a specific subject. Explain every concept with deep meaning: what it is, why it exists, how it works, where it is used, and the exam angle. Simple language, no filler. Return STRICT JSON only.",
    user: (p) => `Branch/Course: ${p.branch}\nYear: ${p.year}\nSemester: ${p.sem || "(unspecified)"}\nSubject: ${p.subject}${p.code ? ` (code ${p.code})` : ""}\nSyllabus units: ${(p.units || []).join(" | ") || "(standard syllabus)"}\nUniversity pattern: ${p.university || "generic"}\n\nWrite complete unit-wise study notes covering EVERY unit listed above.\nReturn JSON: { "notes": [ { "unit": "unit name", "summary": "2 sentence overview", "body": "deep notes of 220-380 words with '\\n' line breaks and '-' bullet points, including definitions, key formulas/terms, how-it-works explanation, real application and an exam tip", "keyTerms": ["term — meaning", "..."], "mustRead": ["high-scoring topic", "..."] } ] }`,
  },
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  try {
    const payload = await req.json();
    const task = payload.task as Task;
    if (!task || !prompts[task]) return json({ error: "Unknown task" }, 400);

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) return json({ error: "AI is not configured" }, 500);

    const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: prompts[task].system },
          { role: "user", content: prompts[task].user(payload) },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (resp.status === 429) return json({ error: "Too many requests right now. Please retry in a moment." }, 429);
    if (resp.status === 402) return json({ error: "AI credits exhausted. Please add credits to continue." }, 402);
    if (!resp.ok) return json({ error: "AI service error", detail: await resp.text() }, 500);

    const data = await resp.json();
    const content = data.choices?.[0]?.message?.content ?? "{}";
    let parsed: any = {};
    try {
      parsed = JSON.parse(content);
    } catch {
      parsed = {};
    }
    return json(parsed);
  } catch (err) {
    return json({ error: (err as Error).message }, 500);
  }
});