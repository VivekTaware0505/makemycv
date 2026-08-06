import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, FileText, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { streams } from "@/data/exam";
import { StreamBackdrop } from "@/data/exam/streamMedia";

const ExamSpotlight = () => (
  <section className="container mx-auto px-4 py-14 md:py-20">
    <div className="max-w-3xl">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card text-xs font-medium mb-4">
        <GraduationCap className="w-3.5 h-3.5 text-primary" /> University-wise exam preparation
      </div>
      <h2 className="font-display uppercase text-2xl sm:text-4xl leading-[1.05] mb-3">
        Important questions, <span className="text-primary">deep answers</span> & subject notes
      </h2>
      <p className="text-muted-foreground leading-relaxed">
        Select your university first, then your stream — Engineering, BCA/BCS/MCA/MCS, MBA, MBBS, BAMS, BHMS,
        B.Sc. Nursing and B.Sc. Agriculture. Every subject comes with exam-pattern questions, full model answers
        and unit-wise notes you can download free.
      </p>
    </div>

    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-8">
      {streams.map((s, i) => (
        <motion.div
          key={s.id}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
        >
          <Link
            to="/exam-prep"
            className="relative block overflow-hidden p-5 rounded-2xl border border-border bg-card hover:border-primary/60 hover:shadow-card transition-all"
          >
            <StreamBackdrop stream={s.id} />
            <div className="relative">
              <FileText className="w-4 h-4 text-primary mb-3" />
              <p className="font-bold text-sm">{s.label}</p>
              <p className="text-[11px] text-muted-foreground mt-1">{s.tagline}</p>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary mt-3">
                Questions · Answers · Notes <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>

    <div className="mt-6">
      <Button asChild size="lg" className="h-12 rounded-xl font-semibold">
        <Link to="/exam-prep">
          <BookOpen className="w-4 h-4 mr-2" /> Start with my university
        </Link>
      </Button>
    </div>
  </section>
);

export default ExamSpotlight;
