import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle, TrendingUp } from "lucide-react";

interface Props {
  score: number;
  suggestions: string[];
}

const ATSScore = ({ score, suggestions }: Props) => {
  const color = score >= 70 ? "hsl(var(--success))" : score >= 40 ? "hsl(var(--warning))" : "hsl(var(--destructive))";
  const circumference = 2 * Math.PI * 40;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="p-4 rounded-xl border border-border bg-card">
      <div className="flex items-center gap-4 mb-4">
        <div className="relative w-20 h-20 flex-shrink-0">
          <svg width="80" height="80" className="-rotate-90">
            <circle cx="40" cy="40" r="40" stroke="hsl(var(--border))" strokeWidth="6" fill="none" />
            <motion.circle
              cx="40" cy="40" r="40"
              stroke={color}
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold text-foreground">{score}</span>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4" />
            ATS Score
          </h3>
          <p className="text-xs text-muted-foreground">
            {score >= 70 ? "Great! Your resume is well optimized." : score >= 40 ? "Good, but could be improved." : "Needs improvement."}
          </p>
        </div>
      </div>

      {suggestions.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Suggestions</p>
          {suggestions.map((s, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
              <AlertTriangle className="w-3 h-3 mt-0.5 text-warning flex-shrink-0" />
              {s}
            </div>
          ))}
        </div>
      )}

      {suggestions.length === 0 && (
        <div className="flex items-center gap-2 text-xs text-success">
          <CheckCircle className="w-4 h-4" />
          All checks passed!
        </div>
      )}
    </div>
  );
};

export default ATSScore;
