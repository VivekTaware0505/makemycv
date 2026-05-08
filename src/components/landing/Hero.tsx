import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[85vh] sm:min-h-[92vh] flex items-center justify-center gradient-hero overflow-hidden pt-14 sm:pt-0">
      {/* Decorative blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full opacity-[0.04] blur-3xl" style={{ background: 'hsl(var(--primary))' }} />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-[0.03] blur-3xl" style={{ background: 'hsl(var(--primary))' }} />
      
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-muted-foreground text-xs sm:text-sm mb-8 sm:mb-10 border border-border shadow-card">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
            <span><span className="font-semibold text-foreground">1000+ resumes</span> created · ATS optimized</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-extrabold tracking-tight text-foreground mb-6 sm:mb-8 max-w-5xl mx-auto leading-[1.05]">
            Create an ATS-Friendly
            <span className="block text-primary mt-2">Resume in 5 Minutes</span>
          </h1>

          <p className="text-base sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 sm:mb-12 leading-relaxed px-2 font-light">
            Recruiter-approved templates trusted by students and professionals. 100% free — no sign-up.
          </p>

          <div className="flex justify-center px-4 sm:px-0">
            <Button
              size="lg"
              className="w-full sm:w-auto h-14 sm:h-16 px-10 sm:px-12 text-base sm:text-lg font-bold rounded-xl shadow-elevated hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
              onClick={() => navigate("/builder")}
            >
              Build My Resume — Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 sm:mt-16 grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-3 sm:gap-6 md:gap-10 text-xs sm:text-sm text-muted-foreground px-4 sm:px-0"
        >
          {[
            { text: "Free to Build", emoji: "✅" },
            { text: "ATS Optimized", emoji: "📊" },
            { text: "14+ Templates", emoji: "📄" },
            { text: "Instant Download", emoji: "⚡" },
          ].map(({ text, emoji }) => (
            <div key={text} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-card border border-border shadow-card">
              <span>{emoji}</span>
              <span className="font-medium">{text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
