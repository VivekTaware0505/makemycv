import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rohit Verma",
    role: "Software Engineer @ Infosys",
    initials: "RV",
    text: "Built my resume in under 10 minutes and got 3 interview calls the same week. The ATS score checker actually helped me fix real issues before applying.",
    color: "gradient-brand",
  },
  {
    name: "Ananya Iyer",
    role: "MBA Fresher, IIM-B",
    initials: "AI",
    text: "Every other builder wanted a subscription just to download PDF. MakeMyCV gave me a clean, recruiter-friendly resume for free. Landed my summer internship offer.",
    color: "gradient-emerald",
  },
  {
    name: "Dr. Karan Mehta",
    role: "Medical Resident",
    initials: "KM",
    text: "The healthcare template is genuinely tailored — proper section for licenses, publications, rotations. Feels made by someone who actually knows medical CVs.",
    color: "gradient-brand",
  },
  {
    name: "Sneha Reddy",
    role: "Data Analyst @ Flipkart",
    initials: "SR",
    text: "Switched from Canva. This is faster, cleaner, and the PDF export is pixel-perfect. My recruiter said it was the best-formatted resume in the shortlist.",
    color: "gradient-emerald",
  },
  {
    name: "Arjun Nair",
    role: "Final-year B.Tech Student",
    initials: "AN",
    text: "No sign-up wall. No 'upgrade to download'. I made 4 different versions for different roles without paying a rupee. This is what free should mean.",
    color: "gradient-brand",
  },
  {
    name: "Priya Kapoor",
    role: "Marketing Manager",
    initials: "PK",
    text: "The Word export is a lifesaver — I could tweak keywords for each application. Simple UI, no bloat, exactly what I needed.",
    color: "gradient-emerald",
  },
];

const Testimonials = () => (
  <section className="py-16 sm:py-24 bg-background">
    <div className="container mx-auto px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">Loved by professionals</span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
          What our users are saying
        </h2>
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-warning text-warning" />
            ))}
          </div>
          <span className="font-semibold text-foreground">4.9/5</span>
          <span className="text-sm">from 400+ reviews</span>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="relative p-6 rounded-2xl border border-border gradient-card hover:shadow-card-hover transition-all"
          >
            <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/10" />
            <div className="flex items-center gap-0.5 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-warning text-warning" />
              ))}
            </div>
            <p className="text-sm text-foreground leading-relaxed mb-5">"{t.text}"</p>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-white font-bold text-sm`}>
                {t.initials}
              </div>
              <div>
                <div className="font-semibold text-foreground text-sm">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;