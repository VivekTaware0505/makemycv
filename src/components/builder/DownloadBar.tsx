import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, FileText, FileIcon, CheckCircle, Loader2, X } from "lucide-react";
import { ResumeData } from "@/types/resume";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface Props {
  data: ResumeData;
  template: string;
  onDownload: (format: "pdf" | "word") => Promise<void> | void;
}

const DownloadBar = ({ data, template, onDownload }: Props) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState<"pdf" | "word" | null>(null);
  const [done, setDone] = useState(false);

  const trackDownload = async (format: "pdf" | "word") => {
    try {
      await supabase.from("resume_downloads").insert({
        user_name: data.name || null,
        user_email: data.email || null,
        user_phone: data.phone || null,
        format,
        template,
      });
    } catch {
      // Silent fail – don't block download
    }
  };

  const handleDownload = async (format: "pdf" | "word") => {
    setLoading(format);
    try {
      await onDownload(format);
      await trackDownload(format);
      setDone(true);
      toast.success(`Your ${format.toUpperCase()} resume is downloading!`);
      setTimeout(() => {
        setDone(false);
        setOpen(false);
      }, 1500);
    } catch (err: any) {
      toast.error(err.message || "Download failed. Please try again.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <>
      <Button
        className="w-full h-14 rounded-2xl font-bold text-base gap-2.5 shadow-lg hover:shadow-xl transition-all"
        onClick={() => setOpen(true)}
      >
        <Download className="w-5 h-5" />
        Download Resume — Free
      </Button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}
            onClick={() => !loading && setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card rounded-3xl p-8 w-full max-w-md border border-border shadow-2xl"
            >
              {done ? (
                <div className="text-center py-10">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  >
                    <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-5">
                      <CheckCircle className="w-12 h-12 text-emerald-600" />
                    </div>
                  </motion.div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Downloaded!</h3>
                  <p className="text-sm text-muted-foreground">Your resume file is ready.</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-foreground">Download Resume</h3>
                      <p className="text-xs text-muted-foreground mt-1">Choose your preferred format — it's free!</p>
                    </div>
                    <button
                      onClick={() => setOpen(false)}
                      className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-3 mt-6">
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      disabled={!!loading}
                      onClick={() => handleDownload("pdf")}
                      className="w-full p-5 rounded-2xl border-2 border-border hover:border-foreground/30 transition-all flex items-center gap-4 text-left disabled:opacity-50 bg-gradient-to-r from-red-50/50 to-transparent"
                    >
                      <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center flex-shrink-0">
                        <FileText className="w-7 h-7 text-red-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-foreground text-base">PDF Format</p>
                        <p className="text-xs text-muted-foreground mt-0.5">Print-ready, professional layout</p>
                      </div>
                      {loading === "pdf" && <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />}
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      disabled={!!loading}
                      onClick={() => handleDownload("word")}
                      className="w-full p-5 rounded-2xl border-2 border-border hover:border-foreground/30 transition-all flex items-center gap-4 text-left disabled:opacity-50 bg-gradient-to-r from-blue-50/50 to-transparent"
                    >
                      <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <FileIcon className="w-7 h-7 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-foreground text-base">Word Format</p>
                        <p className="text-xs text-muted-foreground mt-0.5">Fully editable .doc file</p>
                      </div>
                      {loading === "word" && <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />}
                    </motion.button>
                  </div>

                  <p className="text-center text-xs text-muted-foreground mt-5">
                    100% free · No sign-up required · Powered by MakeMyCV.com
                  </p>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DownloadBar;
