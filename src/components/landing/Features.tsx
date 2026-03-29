import { motion } from "framer-motion";
import { FileText, BarChart3, Download, Zap } from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Free Resume Builder",
    description: "Intuitive drag-and-drop builder with professional templates. No signup required.",
  },
  {
    icon: BarChart3,
    title: "ATS Score Checker",
    description: "Get instant feedback on how your resume performs with applicant tracking systems.",
  },
  {
    icon: Download,
    title: "Instant Download",
    description: "Download your polished resume as PDF or Word document in seconds.",
  },
  {
    icon: Zap,
    title: "Multiple Templates",
    description: "Choose from professionally designed templates that stand out.",
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
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Everything you need
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Professional tools to create the perfect resume
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group p-6 rounded-2xl border border-border gradient-card hover:shadow-card-hover transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <feature.icon className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
