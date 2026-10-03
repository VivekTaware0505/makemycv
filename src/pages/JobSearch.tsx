import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { ExternalLink, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import JourneyToolLayout from "@/components/journey/JourneyToolLayout";
import { markStageDone } from "@/lib/journey";

const portals = [
  { name: "LinkedIn", url: "https://www.linkedin.com/jobs/search/?keywords=" },
  { name: "Naukri", url: "https://www.naukri.com/jobs-in-india?k=" },
  { name: "Indeed", url: "https://in.indeed.com/jobs?q=" },
];

const JobSearch = () => {
  const [role, setRole] = useState(() => localStorage.getItem("mmcv:target-role") || "");
  const [location, setLocation] = useState(() => localStorage.getItem("mmcv:target-location") || "");
  const query = useMemo(() => encodeURIComponent(`${role} ${location}`.trim()), [role, location]);
  const save = () => {
    localStorage.setItem("mmcv:target-role", role);
    localStorage.setItem("mmcv:target-location", location);
    markStageDone("job-search");
  };

  return (
    <JourneyToolLayout eyebrow="Step 6 of 6" title="Job Search" description="Save a clear target and run the same focused search across trusted job portals.">
      <Helmet><title>Focused Job Search - MakeMyCV</title><meta name="description" content="Plan a focused job search and open matching roles on major job portals." /></Helmet>
      <section className="max-w-3xl border-y border-border py-6">
        <div className="grid gap-3 sm:grid-cols-2">
          <Input value={role} onChange={(e) => setRole(e.target.value)} placeholder="Target role, e.g. Java Developer" aria-label="Target role" />
          <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location, e.g. Pune" aria-label="Target location" />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {portals.map((portal) => <Button key={portal.name} asChild variant="outline" disabled={!role}><a href={`${portal.url}${query}`} target="_blank" rel="noreferrer" onClick={save} className="gap-2"><Search className="h-4 w-4" /> Search {portal.name}<ExternalLink className="h-3.5 w-3.5" /></a></Button>)}
        </div>
      </section>
      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          ["Target", "Choose one primary role and two close alternatives."],
          ["Tailor", "Match your resume headline and skills to each job description."],
          ["Track", "Record applications and follow up after five working days."],
        ].map(([title, text]) => <div key={title} className="border-t-2 border-primary pt-4"><h2 className="font-semibold">{title}</h2><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p></div>)}
      </section>
    </JourneyToolLayout>
  );
};

export default JobSearch;