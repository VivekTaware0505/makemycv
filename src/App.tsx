import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Builder from "./pages/Builder.tsx";
import Templates from "./pages/Templates.tsx";
import ATSChecker from "./pages/ATSChecker.tsx";
import Converter from "./pages/Converter.tsx";
import InterviewPrep from "./pages/InterviewPrep.tsx";
import Journey from "./pages/Journey.tsx";
import ExamPrep from "./pages/ExamPrep.tsx";
import ExamSubject from "./pages/ExamSubject.tsx";
import Feedback from "./pages/Feedback.tsx";
import NotFound from "./pages/NotFound.tsx";
import MobileBottomNav from "./components/landing/MobileBottomNav";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/builder" element={<Builder />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/ats-checker" element={<ATSChecker />} />
          <Route path="/converter" element={<Converter />} />
          <Route path="/interview-prep" element={<InterviewPrep />} />
          <Route path="/journey" element={<Journey />} />
          <Route path="/exam-prep" element={<ExamPrep />} />
          <Route path="/exam-prep/:subjectId" element={<ExamSubject />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <MobileBottomNav />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
