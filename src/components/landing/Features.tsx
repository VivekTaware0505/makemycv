import { motion } from "framer-motion";
import { FileText, BarChart3, Download, Zap, Shield, Palette } from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Free Resume Builder",
    description: "Build your resume with an intuitive editor. No signup or credit card required to start.",
  },
  {
    icon: BarChart3,
    title: "ATS Score Checker",
    description: "Real-time ATS analysis ensures your resume passes automated screening systems.",
  },
  {
    icon: Palette,
    title: "14+ Pro Templates",
    description: "Industry-specific designs for IT, Banking, Healthcare, Legal, and more.",
  },
  {
    icon: Download,
    title: "PDF & Word Export",
    description: "Download pixel-perfect PDF or editable Word documents instantly.",
  },
  {
    icon: Shield,
    title: "Secure Payments",
    description: "Safe checkout powered by Cashfree. Your data is encrypted and protected.",
  },
  {
    icon: Zap,
    title: "Built for India",
    description: "Templates designed for Indian job market standards and recruiter expectations.",
  },
];

const Features = () => (
  <section className="py-24 bg-background">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3 block">Why MakeMyCV.com</span>
        <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
          Everything you need to get hired
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Professional tools trusted by thousands of job seekers
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="group p-7 rounded-2xl border border-border gradient-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
              <feature.icon className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
