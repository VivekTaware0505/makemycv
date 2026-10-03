import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Copy, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import JourneyToolLayout from "@/components/journey/JourneyToolLayout";
import { markStageDone } from "@/lib/journey";
import { toast } from "@/hooks/use-toast";

const SalaryNegotiation = () => {
  const [current, setCurrent] = useState("");
  const [offer, setOffer] = useState("");
  const [target, setTarget] = useState("");
  const [role, setRole] = useState("");
  const increase = useMemo(() => {
    const from = Number(current);
    const to = Number(offer);
    return from > 0 && to > 0 ? Math.round(((to - from) / from) * 100) : null;
  }, [current, offer]);
  const script = `Thank you for the offer for the ${role || "position"}. I’m excited about the opportunity. Based on the role’s responsibilities, my experience, and the value I can bring, I was targeting ₹${target || "[target]"} LPA. Is there flexibility to move the offer closer to this figure? I’m happy to discuss the complete compensation structure.`;

  const copy = async () => {
    await navigator.clipboard.writeText(script);
    markStageDone("salary-negotiation");
    toast({ title: "Negotiation message copied" });
  };

  return (
    <JourneyToolLayout eyebrow="Step 5 of 6" title="Salary Negotiation" description="Compare the offer, set a realistic target, and use a respectful negotiation message.">
      <Helmet><title>Salary Negotiation Tool - MakeMyCV</title><meta name="description" content="Compare salary offers and prepare a professional negotiation message." /></Helmet>
      <div className="grid gap-6 md:grid-cols-2">
        <section className="space-y-4 border-t border-border pt-5">
          <Input value={role} onChange={(e) => setRole(e.target.value)} placeholder="Role" aria-label="Role" />
          <Input type="number" min="0" value={current} onChange={(e) => setCurrent(e.target.value)} placeholder="Current CTC in LPA" aria-label="Current CTC" />
          <Input type="number" min="0" value={offer} onChange={(e) => setOffer(e.target.value)} placeholder="Offered CTC in LPA" aria-label="Offered CTC" />
          <Input type="number" min="0" value={target} onChange={(e) => setTarget(e.target.value)} placeholder="Target CTC in LPA" aria-label="Target CTC" />
          <div className="flex items-center gap-3 bg-secondary p-4"><IndianRupee className="h-5 w-5 text-primary" /><p className="text-sm font-semibold">{increase === null ? "Enter current and offered CTC" : `${increase}% increase over current CTC`}</p></div>
        </section>
        <section className="border-t border-border pt-5">
          <p className="text-xs font-bold uppercase text-primary">Ready-to-send message</p>
          <p className="mt-3 whitespace-pre-line leading-relaxed text-muted-foreground">{script}</p>
          <Button onClick={copy} className="mt-5 gap-2"><Copy className="h-4 w-4" /> Copy message</Button>
        </section>
      </div>
    </JourneyToolLayout>
  );
};

export default SalaryNegotiation;