import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "Is MakeMyCV really 100% free?",
    a: "Yes. Every template, every download (PDF and Word), and every feature is completely free. No sign-up, no credit card, no watermark, no hidden 'pro' plan.",
  },
  {
    q: "Are the resumes ATS-friendly?",
    a: "All 14+ templates use clean, single-column-first layouts, standard fonts, and semantic section headings — the exact structure Applicant Tracking Systems parse best. Our built-in ATS Score Checker also scans your resume live and flags issues before you download.",
  },
  {
    q: "Is my data safe? Do you store my resume?",
    a: "Your resume never leaves your browser. We use secure HTTPS/SSL for all traffic, and file conversions (PDF ↔ Word, image → PDF, etc.) run entirely on your device. We do not store, sell, or share your personal information.",
  },
  {
    q: "Can I edit my resume later?",
    a: "Yes. You can download in Word (.doc) format to edit in Microsoft Word or Google Docs, or return to the builder anytime to rebuild in seconds.",
  },
  {
    q: "Which industries do you support?",
    a: "We have industry-specific templates for IT/Software, Banking & Finance, Healthcare, Marketing, Engineering, Creative, Legal, Government, Academic, Executive, Consulting, and general professional roles — plus Fresher-friendly layouts.",
  },
  {
    q: "How is this different from Canva or Zety?",
    a: "No paywalls. Canva locks premium templates and Zety charges to download. MakeMyCV gives you every template and every export format for free, with a faster editor and a real ATS score built in.",
  },
  {
    q: "Do I need to create an account?",
    a: "No. Just open the builder, fill in your details, and download. Your work stays in your browser session.",
  },
  {
    q: "What file formats can I download?",
    a: "Pixel-perfect PDF (recommended for applying) and editable Word .doc (recommended for further tweaks). Both are free and unlimited.",
  },
];

const FAQ = () => (
  <section className="py-16 sm:py-24 bg-background">
    <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
          <HelpCircle className="w-3.5 h-3.5" /> FAQ
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
          Frequently asked questions
        </h2>
        <p className="text-muted-foreground">Everything you need to know before you build.</p>
      </motion.div>

      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((f, i) => (
          <AccordionItem
            key={i}
            value={`item-${i}`}
            className="border border-border rounded-2xl px-5 sm:px-6 bg-card data-[state=open]:shadow-card-hover transition-shadow"
          >
            <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5 text-sm sm:text-base">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-sm sm:text-[15px] leading-relaxed pb-5">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default FAQ;