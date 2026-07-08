// @ts-nocheck
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { role, existingQuestions = [], count = 5 } = await req.json();
    if (!role) {
      return new Response(JSON.stringify({ error: "role is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "AI is not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const systemPrompt = `You are a senior interview coach. Generate realistic, high-quality interview questions with a concise model answer, a detailed multi-paragraph explanation, and 3-4 pro tips. Return STRICT JSON only.`;

    const userPrompt = `Role: ${role}
Existing questions to AVOID duplicating:
${existingQuestions.slice(0, 30).map((q: string, i: number) => `${i + 1}. ${q}`).join("\n") || "(none)"}

Generate ${count} NEW interview questions. Each must include:
- "q": the interview question
- "a": a strong 2-3 sentence quick model answer
- "detailedAnswer": a longer, in-depth explanation (4-8 sentences) walking through frameworks, reasoning, examples, and edge cases. Use \\n for paragraph breaks if needed.
- "tips": an array of 3-4 short, actionable pro tips or suggestions (each 1 sentence) — what to emphasize, common mistakes to avoid, phrases to use.
- "tag": one of "behavioral" | "technical" | "situational" | "hr"

Return JSON: { "questions": [ { "q": "...", "a": "...", "detailedAnswer": "...", "tips": ["...", "..."], "tag": "..." } ] }`;

    const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (resp.status === 429) {
      return new Response(JSON.stringify({ error: "Rate limit reached. Please try again in a moment." }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (resp.status === 402) {
      return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }), {
        status: 402,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!resp.ok) {
      const t = await resp.text();
      return new Response(JSON.stringify({ error: "AI gateway error", detail: t }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await resp.json();
    const content = data.choices?.[0]?.message?.content ?? "{}";
    let parsed: any = {};
    try { parsed = JSON.parse(content); } catch { parsed = { questions: [] }; }
    const questions = Array.isArray(parsed.questions) ? parsed.questions : [];

    return new Response(JSON.stringify({ questions }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});