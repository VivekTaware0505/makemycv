import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, FileText, FileIcon, CheckCircle, Loader2, X } from "lucide-react";
import { ResumeData } from "@/types/resume";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface Props {
  data: ResumeData;
  onDownload: (format: "pdf" | "word") => void;
}

const CASHFREE_APP_ID = "124826716f628950481443ae1857628421";

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
      // Create order via edge function
      const { data: orderData, error } = await supabase.functions.invoke("razorpay", {
        body: { action: "create_order", amount: PRICES[format], currency: "INR" },
      });

      if (error || !orderData?.order_id) {
        throw new Error(error?.message || "Failed to create order");
      }

      // Open Razorpay checkout
      const options = {
        key: RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "CV.com",
        description: `${format.toUpperCase()} Resume Download`,
        order_id: orderData.order_id,
        handler: async (response: any) => {
          // Verify payment
          const { data: verifyData, error: verifyError } = await supabase.functions.invoke("razorpay", {
            body: {
              action: "verify_payment",
              order_id: response.razorpay_order_id,
              payment_id: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            },
          });

          if (verifyError || !verifyData?.verified) {
            toast.error("Payment verification failed. Please contact support.");
            setLoading(false);
            return;
          }

          setLoading(false);
          setSuccess(true);
          setTimeout(() => {
            onDownload(format);
            toast.success(`${format.toUpperCase()} downloaded successfully!`);
            setSuccess(false);
            setOpen(false);
          }, 1500);
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
            setSelectedFormat(null);
          },
        },
        prefill: {
          name: data.name || "",
          email: data.email || "",
          contact: data.phone || "",
        },
        theme: { color: "#000000" },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", (response: any) => {
        toast.error(response.error?.description || "Payment failed");
        setLoading(false);
      });
      rzp.open();
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <>
      <Button className="w-full h-12 rounded-xl font-semibold" onClick={() => setOpen(true)}>
        <Download className="w-4 h-4 mr-2" />
        Download Resume
      </Button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
            onClick={() => !loading && setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card rounded-2xl p-6 w-full max-w-md border border-border shadow-elevated"
            >
              {success ? (
                <div className="text-center py-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Payment Successful!</h3>
                  <p className="text-sm text-muted-foreground">Downloading your resume...</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-foreground">Download Resume</h3>
                    <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    <button
                      disabled={loading}
                      onClick={() => handlePayment("pdf")}
                      className="w-full p-4 rounded-xl border border-border hover:border-foreground transition-colors flex items-center gap-4 text-left disabled:opacity-50"
                    >
                      <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
                        <FileText className="w-6 h-6 text-destructive" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-foreground">PDF Download</p>
                        <p className="text-xs text-muted-foreground">Clean, print-ready format</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-foreground">₹9</p>
                        {loading && selectedFormat === "pdf" && <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />}
                      </div>
                    </button>

                    <button
                      disabled={loading}
                      onClick={() => handlePayment("word")}
                      className="w-full p-4 rounded-xl border border-border hover:border-foreground transition-colors flex items-center gap-4 text-left disabled:opacity-50"
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <FileIcon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-foreground">Word Download</p>
                        <p className="text-xs text-muted-foreground">Editable .docx format</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-foreground">₹20</p>
                        {loading && selectedFormat === "word" && <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />}
                      </div>
                    </button>
                  </div>

                  <p className="text-xs text-muted-foreground text-center mt-4">
                    Secure payment via Razorpay 🔒
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

export default PaymentModal;
