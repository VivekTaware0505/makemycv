import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, CheckCircle2, Star } from "lucide-react";
import resumePreview from "@/assets/resume-preview.jpg";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[90vh] flex items-center gradient-hero overflow-hidden pt-24 sm:pt-28 pb-16">
      <div className="absolute top-10 -left-20 w-96 h-96 rounded-full opacity-30 blur-3xl gradient-brand" />
      <div className="absolute bottom-10 -right-20 w-96 h-96 rounded-full opacity-20 blur-3xl gradient-emerald" />

      <div className="absolute inset-0 opacity-[0.025]" style={{
        backgroundImage: 'linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card text-xs sm:text-sm mb-8 border border-border shadow-card">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="font-medium text-foreground">Trusted by 1,000+ job seekers</span>
              <div className="flex items-center gap-0.5 ml-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-warning text-warning" />
                ))}
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-extrabold tracking-tight text-foreground mb-6 leading-[1.05]">
              Create an{" "}
              <span className="text-gradient-brand">ATS-Friendly</span>{" "}
              Resume in{" "}
              <span className="relative inline-block">
                <span className="relative z-10">5 Minutes</span>
                <span className="absolute inset-x-0 bottom-1 h-3 gradient-brand-soft rounded -z-0" />
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed font-light">
              Recruiter-approved templates. Instant PDF & Word download.{" "}
              <span className="text-foreground font-medium">100% free</span> — no sign-up, no watermark.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-x-5 gap-y-2 mb-8 text-sm">
              {["ATS optimized", "14+ templates", "PDF & Word", "No credit card"].map((b) => (
                <div key={b} className="flex items-center gap-1.5 text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  <span className="font-medium">{b}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3 flex-wrap">
              <Button
                size="lg"
                className="w-full sm:w-auto h-14 px-8 text-base font-bold rounded-xl gradient-brand text-primary-foreground shadow-elevated hover:shadow-glow transition-all duration-300 hover:-translate-y-1 border-0"
                onClick={() => navigate("/builder")}
              >
                Build My Resume — Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                className="w-full sm:w-auto h-14 px-6 text-base font-semibold rounded-xl bg-secondary text-secondary-foreground hover:bg-secondary/80 border-2 border-primary/30 hover:border-primary/60 transition-all"
                onClick={() => navigate("/interview-prep")}
              >
                <Sparkles className="mr-2 w-5 h-5 text-primary" />
                Interview Prep
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto h-14 px-6 text-base font-semibold rounded-xl border-2 hover:bg-secondary transition-all"
                onClick={() => navigate("/converter")}
              >
                Convert Files
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
            className="relative mx-auto lg:mx-0 max-w-md lg:max-w-none w-full"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="hidden sm:flex absolute -left-4 top-16 z-20 items-center gap-2 px-4 py-2.5 rounded-2xl bg-card shadow-elevated border border-border"
            >
              <div className="w-9 h-9 rounded-lg gradient-emerald flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">ATS Score</div>
                <div className="text-lg font-bold text-foreground leading-tight">94/100</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              className="hidden sm:flex absolute -right-4 bottom-20 z-20 items-center gap-2 px-4 py-2.5 rounded-2xl bg-card shadow-elevated border border-border"
            >
              <div className="w-9 h-9 rounded-lg gradient-brand flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Downloaded</div>
                <div className="text-sm font-bold text-foreground leading-tight">Just now ⚡</div>
              </div>
            </motion.div>

            <div className="relative rounded-2xl overflow-hidden shadow-elevated border border-border bg-card">
              <img
                src={resumePreview}
                alt="Example of an ATS-optimized resume built with MakeMyCV"
                width={896}
                height={1152}
                className="w-full h-auto block"
              />
            </div>

            <div className="absolute inset-0 -z-10 gradient-brand opacity-20 blur-3xl rounded-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;