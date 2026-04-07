import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center gradient-hero overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full opacity-[0.04] blur-3xl" style={{ background: 'hsl(var(--primary))' }} />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-[0.03] blur-3xl" style={{ background: 'hsl(var(--primary))' }} />
      
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary text-muted-foreground text-sm mb-8 border border-border shadow-card">
            <Sparkles className="w-4 h-4" />
            <span>Trusted by 10,000+ professionals across India</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-foreground mb-6 max-w-5xl mx-auto leading-[1.05]">
            Build Your Perfect
            <span className="block text-muted-foreground">Resume Today</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            ATS-optimized, recruiter-approved templates that get you hired. Build for free, download instantly.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="h-14 px-10 text-base font-bold rounded-xl shadow-elevated hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
              onClick={() => navigate("/builder")}
            >
              Start Building — It's Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-14 px-8 text-base font-semibold rounded-xl border-border hover:bg-secondary transition-all duration-300"
              onClick={() => navigate("/templates")}
            >
              Browse Templates
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-16 flex justify-center gap-8 text-sm text-muted-foreground"
        >
          {["Free to Build", "ATS Optimized", "Instant Download"].map((text) => (
            <div key={text} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-success" />
              {text}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
