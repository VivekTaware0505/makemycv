import { useNavigate, useLocation } from "react-router-dom";
import { Home, BookOpen, FileCheck, Sparkles, Route as RouteIcon } from "lucide-react";

const items = [
  { path: "/", label: "Home", icon: Home },
  { path: "/exam-prep", label: "Exams", icon: BookOpen },
  { path: "/builder", label: "Build", icon: FileCheck, primary: true },
  { path: "/interview-prep", label: "Interview", icon: Sparkles },
  { path: "/journey", label: "Journey", icon: RouteIcon },
];

const MobileBottomNav = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Hide on Builder — that page has its own sticky download bar
  if (pathname.startsWith("/builder")) return null;

  return (
    <nav
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-background/95 backdrop-blur-xl border-t border-border safe-bottom"
      style={{ paddingBottom: "max(0.25rem, env(safe-area-inset-bottom))" }}
    >
      <div className="flex items-end justify-around px-2 pt-1.5">
        {items.map(({ path, label, icon: Icon, primary }) => {
          const active = pathname === path;
          if (primary) {
            return (
              <button
                key={path}
                onClick={() => navigate(path)}
                className="relative -mt-6 flex flex-col items-center justify-center gap-1"
              >
                <div className="w-14 h-14 rounded-2xl gradient-brand shadow-elevated flex items-center justify-center text-primary-foreground border-4 border-background">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-semibold text-foreground">{label}</span>
              </button>
            );
          }
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 py-1.5 rounded-lg transition-colors ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon className={`w-5 h-5 ${active ? "scale-110" : ""} transition-transform`} />
              <span className="text-[10px] font-medium">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;