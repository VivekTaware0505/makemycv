import { motion } from "framer-motion";
import { ShieldCheck, Lock, Zap, Award, Eye, FileCheck } from "lucide-react";

const badges = [
  { icon: ShieldCheck, title: "SSL Secured", sub: "256-bit encryption" },
  { icon: Lock, title: "100% Private", sub: "Files never uploaded" },
  { icon: FileCheck, title: "ATS Approved", sub: "Recruiter-tested layouts" },
  { icon: Eye, title: "No Tracking", sub: "Zero personal data stored" },
  { icon: Zap, title: "Instant Download", sub: "No waiting, no queue" },
  { icon: Award, title: "Always Free", sub: "No hidden charges" },
];

const TrustBadges = () => (
  <section className="py-12 sm:py-14 bg-secondary/40 border-y border-border">
    <div className="container mx-auto px-4 sm:px-6">
      <div className="text-center mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Your data. Your resume. Fully secure.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
        {badges.map((b, i) => (
          <motion.div
            key={b.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="flex flex-col items-center text-center gap-2 p-3"
          >
            <div className="w-11 h-11 rounded-xl bg-card border border-border flex items-center justify-center shadow-card">
              <b.icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-semibold text-foreground">{b.title}</div>
              <div className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">{b.sub}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustBadges;