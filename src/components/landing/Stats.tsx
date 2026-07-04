import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 1000, suffix: "+", label: "Resumes Created", sub: "and counting" },
  { value: 94, suffix: "%", label: "ATS Pass Rate", sub: "average score" },
  { value: 14, suffix: "+", label: "Pro Templates", sub: "industry-specific" },
  { value: 5, suffix: " min", label: "Avg. Build Time", sub: "from start to PDF" },
];

const Counter = ({ end, suffix }: { end: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setStarted(true), { threshold: 0.3 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const dur = 1500;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(end * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, end]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

const Stats = () => (
  <section className="py-14 sm:py-16 border-y border-border bg-card">
    <div className="container mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="text-center lg:text-left"
          >
            <div className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gradient-brand tracking-tight leading-none mb-2">
              <Counter end={s.value} suffix={s.suffix} />
            </div>
            <div className="text-sm sm:text-base font-semibold text-foreground">{s.label}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{s.sub}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Stats;