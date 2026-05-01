import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FileText, FileType, FileImage, ArrowRight } from "lucide-react";

const tools = [
  { id: "pdf-to-word", title: "PDF to Word", desc: "Editable .doc file", icon: FileType, color: "text-blue-600", bg: "bg-blue-50" },
  { id: "word-to-pdf", title: "Word to PDF", desc: "High-quality PDF", icon: FileText, color: "text-red-600", bg: "bg-red-50" },
  { id: "image-to-pdf", title: "Image to PDF", desc: "JPG/PNG → PDF", icon: FileImage, color: "text-emerald-600", bg: "bg-emerald-50" },
  { id: "pdf-to-image", title: "PDF to Image", desc: "Each page as PNG", icon: FileImage, color: "text-purple-600", bg: "bg-purple-50" },
];

const ConverterTools = () => {
  const navigate = useNavigate();
  return (
    <section className="py-16 sm:py-24 bg-secondary/30 border-y border-border">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-card border border-border text-xs font-medium text-muted-foreground mb-4">
            <FileType className="w-3.5 h-3.5" /> Free File Converter
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-3">
            Convert Files in <span className="text-primary">Seconds</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto px-2">
            PDF, Word and images — converted privately in your browser. No uploads, no sign-up.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 max-w-5xl mx-auto">
          {tools.map((t, i) => {
            const Icon = t.icon;
            return (
              <motion.button
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4 }}
                onClick={() => navigate("/converter")}
                className="text-left p-4 sm:p-6 rounded-2xl border border-border bg-card hover:border-primary/40 hover:shadow-card-hover transition-all group"
              >
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${t.bg} flex items-center justify-center mb-3 sm:mb-4`}>
                  <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${t.color}`} />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-foreground mb-1">{t.title}</h3>
                <p className="text-xs text-muted-foreground">{t.desc}</p>
              </motion.button>
            );
          })}
        </div>

        <div className="text-center mt-8 sm:mt-10">
          <button
            onClick={() => navigate("/converter")}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-foreground text-background font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            Open Converter Tools
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ConverterTools;