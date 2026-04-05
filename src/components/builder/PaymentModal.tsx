import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, FileText, FileIcon, CheckCircle, Loader2, X, Shield, Sparkles } from "lucide-react";
import { ResumeData } from "@/types/resume";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface Props {
  data: ResumeData;
  onDownload: (format: "pdf" | "word") => void;
}

const PRICES = { pdf: 9, word: 20 };

const PaymentModal = ({ data, onDownload }: Props) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<"pdf" | "word" | null>(null);

  const handlePayment = async (format: "pdf" | "word") => {
    setSelectedFormat(format);
    setLoading(true);

    try {
      const { data: orderData, error } = await supabase.functions.invoke("cashfree-payment", {
        body: {
          action: "create_order",
          amount: PRICES[format],
          customer_name: data.name || "Customer",
          customer_email: data.email || "customer@example.com",
          customer_phone: data.phone || "9999999999",
        },
      });

      if (error || !orderData?.payment_session_id) {
        throw new Error(error?.message || orderData?.error || "Failed to create order");
      }

      const cashfree = (window as any).Cashfree;
      if (!cashfree) {
        throw new Error("Payment SDK not loaded. Please refresh and try again.");
      }

      const cf = cashfree({ mode: "production" });

      cf.checkout({
        paymentSessionId: orderData.payment_session_id,
        redirectTarget: "_modal",
      }).then(async (result: any) => {
        console.log("Cashfree checkout result:", JSON.stringify(result));
        
        // If there's a hard error from the SDK itself
        if (result?.error) {
          // Some errors are just modal-close, not real failures
          if (result.error?.message?.includes("closed") || result.error?.message?.includes("cancel")) {
            setLoading(false);
            return;
          }
        }

        // Always verify with backend regardless of frontend result
        try {
          const { data: verifyData, error: verifyError } = await supabase.functions.invoke("cashfree-payment", {
            body: {
              action: "verify_payment",
              order_id: orderData.order_id,
            },
          });

          if (verifyData?.verified) {
            setLoading(false);
            setSuccess(true);
            setTimeout(() => {
              onDownload(format);
              toast.success(`Your ${format.toUpperCase()} resume is downloading!`);
              setSuccess(false);
              setOpen(false);
            }, 1500);
          } else {
            // Payment not yet confirmed - could be pending
            toast.error("Payment not confirmed yet. If you paid, please try again in a moment.");
            setLoading(false);
          }
        } catch (verifyErr: any) {
          toast.error("Could not verify payment. Please contact support.");
          setLoading(false);
        }
      });
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        className="w-full h-14 rounded-2xl font-bold text-base gap-2.5 shadow-lg hover:shadow-xl transition-all"
        onClick={() => setOpen(true)}
      >
        <Download className="w-5 h-5" />
        Download Resume
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
              {success ? (
                <div className="text-center py-10">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  >
                    <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
                      <CheckCircle className="w-12 h-12 text-green-600" />
                    </div>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                    <h3 className="text-2xl font-bold text-foreground mb-2">Payment Successful!</h3>
                    <p className="text-sm text-muted-foreground">Preparing your download...</p>
                    <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                      <Loader2 className="w-3 h-3 animate-spin" />
                      <span>Generating file...</span>
                    </div>
                  </motion.div>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-foreground">Download Resume</h3>
                      <p className="text-xs text-muted-foreground mt-1">Choose your preferred format</p>
                    </div>
                    <button
                      onClick={() => setOpen(false)}
                      className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-3 mt-6">
                    {/* PDF Option */}
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      disabled={loading}
                      onClick={() => handlePayment("pdf")}
                      className="w-full p-5 rounded-2xl border-2 border-border hover:border-foreground/30 transition-all flex items-center gap-4 text-left disabled:opacity-50 bg-gradient-to-r from-red-50/50 to-transparent"
                    >
                      <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center flex-shrink-0">
                        <FileText className="w-7 h-7 text-red-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-foreground text-base">PDF Format</p>
                        <p className="text-xs text-muted-foreground mt-0.5">Print-ready, professional layout</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-2xl font-black text-foreground">₹{PRICES.pdf}</p>
                        {loading && selectedFormat === "pdf" && (
                          <Loader2 className="w-4 h-4 animate-spin text-muted-foreground ml-auto mt-1" />
                        )}
                      </div>
                    </motion.button>

                    {/* Word Option */}
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      disabled={loading}
                      onClick={() => handlePayment("word")}
                      className="w-full p-5 rounded-2xl border-2 border-border hover:border-foreground/30 transition-all flex items-center gap-4 text-left disabled:opacity-50 bg-gradient-to-r from-blue-50/50 to-transparent"
                    >
                      <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <FileIcon className="w-7 h-7 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-foreground text-base">Word Format</p>
                        <p className="text-xs text-muted-foreground mt-0.5">Fully editable .doc file</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-2xl font-black text-foreground">₹{PRICES.word}</p>
                        {loading && selectedFormat === "word" && (
                          <Loader2 className="w-4 h-4 animate-spin text-muted-foreground ml-auto mt-1" />
                        )}
                      </div>
                    </motion.button>

                    {/* Popular badge for PDF */}
                    <div className="flex items-center justify-center gap-1.5 pt-1">
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      <span className="text-xs text-muted-foreground">Most users choose PDF format</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-border flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <Shield className="w-3.5 h-3.5" />
                    <span>Secure payment via Cashfree · 256-bit SSL encrypted</span>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PaymentModal;
