import { ExamQuestion, Subject } from "@/data/exam";

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const answerHtml = (a: string) =>
  escape(a)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) =>
      line.startsWith("-")
        ? `<p class="pt">• ${line.slice(1).trim()}</p>`
        : `<p class="ans">${line}</p>`,
    )
    .join("");

interface Options {
  subject: Subject;
  questions: ExamQuestion[];
  withAnswers: boolean;
  university?: string;
  modelPaper?: boolean;
}

function buildHtml({ subject, questions, withAnswers, university, modelPaper }: Options) {
  const heading = modelPaper
    ? "IMP & Model Question Paper with Model Answers"
    : withAnswers
    ? "Important Questions with Answers"
    : "Important Questions";

  const body = questions
    .map((q, i) => {
      const meta = [`${q.marks} marks`, q.topic, q.repeats ? `asked ${q.repeats} times` : null]
        .filter(Boolean)
        .join(" · ");
      return `<div class="q-block">
        <p class="q"><span class="num">Q${i + 1}.</span> ${escape(q.q)}</p>
        <p class="meta">${escape(meta)}</p>
        ${withAnswers ? `<div class="answer"><p class="alabel">Answer</p>${answerHtml(q.a)}</div>` : `<div class="space"></div>`}
      </div>`;
    })
    .join("");

  return `<div class="doc">
    <div class="head">
      <div class="brand">MakeMyCV · Exam Prep</div>
      <h1>${escape(subject.name)}</h1>
      <p class="sub">${escape(heading)} — Year ${subject.year}, Semester ${(subject.year - 1) * 2 + subject.sem}${
    subject.code ? ` · Code ${escape(subject.code)}` : ""
  }</p>
      ${university ? `<p class="sub">${escape(university)}</p>` : ""}
      <p class="units"><strong>Units covered:</strong> ${subject.units.map(escape).join(" | ")}</p>
    </div>
    ${body}
    <p class="foot">Prepared with makemycv.co.in — free study material for engineering students.</p>
  </div>
  <style>
    .doc { font-family: Georgia, 'Times New Roman', serif; color: #16181d; padding: 34px 40px; background: #fff; }
    .head { border-bottom: 2px solid #16181d; padding-bottom: 12px; margin-bottom: 18px; }
    .brand { font-family: Arial, sans-serif; font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; color: #4b5563; }
    .head h1 { font-size: 22px; margin: 6px 0 4px; }
    .sub { font-size: 12px; color: #374151; margin: 2px 0; }
    .units { font-size: 11px; color: #4b5563; margin-top: 8px; }
    .q-block { page-break-inside: avoid; margin-bottom: 16px; }
    .q { font-size: 13px; font-weight: 700; line-height: 1.45; margin: 0; }
    .num { margin-right: 6px; }
    .meta { font-family: Arial, sans-serif; font-size: 10px; color: #6b7280; margin: 3px 0 6px; text-transform: uppercase; letter-spacing: 0.06em; }
    .answer { border-left: 3px solid #2563eb; padding-left: 12px; }
    .alabel { font-family: Arial, sans-serif; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: #2563eb; margin: 0 0 4px; }
    .ans, .pt { font-size: 12px; line-height: 1.6; margin: 0 0 4px; color: #1f2937; }
    .pt { padding-left: 10px; }
    .space { height: 54px; border-bottom: 1px dashed #cbd5e1; }
    .foot { font-family: Arial, sans-serif; font-size: 10px; color: #6b7280; text-align: center; margin-top: 20px; }
  </style>`;
}

export async function downloadExamPdf(options: Options) {
  const html2pdf = (await import("html2pdf.js")).default;
  const holder = document.createElement("div");
  holder.style.cssText = "position:fixed;top:0;left:-10000px;width:794px;background:#fff;z-index:-1;";
  holder.innerHTML = buildHtml(options);
  document.body.appendChild(holder);

  const suffix = options.modelPaper
    ? "model-paper"
    : options.withAnswers
    ? "questions-with-answers"
    : "questions";

  try {
    await html2pdf()
      .set({
        margin: [10, 0, 12, 0],
        filename: `${options.subject.id}-${suffix}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, backgroundColor: "#ffffff", windowWidth: 794 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: { mode: ["css", "legacy"], avoid: [".q-block"] },
      } as never)
      .from(holder.firstElementChild as HTMLElement)
      .save();
  } finally {
    document.body.removeChild(holder);
  }
}