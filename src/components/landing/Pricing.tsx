import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, FileText, FileIcon } from "lucide-react";

const plans = [
  {
    name: "PDF Download",
    price: "₹9",
    icon: FileText,
    features: ["Clean PDF format", "Print-ready quality", "ATS compatible", "Instant delivery"],
    popular: true,
  },
  {
    name: "Word Download",
    price: "₹20",
    icon: FileIcon,
    features: ["Editable .docx format", "Easy to customize", "ATS compatible", "Instant delivery"],
    popular: false,
  },
];

const Pricing = () => {
  const navigate = useNavigate();

  return (
    <section id="pricing" className="py-24 gradient-hero">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-muted-foreground text-lg">
            Build for free. Pay only when you download.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative p-8 rounded-2xl border bg-card ${plan.popular ? 'border-foreground shadow-elevated' : 'border-border shadow-card'}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                  Most Popular
                </div>
              )}
              <plan.icon className="w-10 h-10 text-foreground mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-1">{plan.name}</h3>
              <div className="text-4xl font-bold text-foreground mb-6">{plan.price}</div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-success" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                className="w-full h-12 rounded-xl font-semibold"
                variant={plan.popular ? "default" : "outline"}
                onClick={() => navigate("/builder")}
              >
                Get Started
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
