import { Helmet } from "react-helmet-async";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Stats from "@/components/landing/Stats";
import TrustBadges from "@/components/landing/TrustBadges";
import Features from "@/components/landing/Features";
import ConverterTools from "@/components/landing/ConverterTools";
import Testimonials from "@/components/landing/Testimonials";
import FAQ from "@/components/landing/FAQ";
import Pricing from "@/components/landing/Pricing";
import Footer from "@/components/landing/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Helmet>
      <title>MakeMyCV - Build Professional Resumes Online</title>
      <meta name="description" content="Build ATS-optimized resumes for free. 14+ professional templates, instant preview, ATS score analysis. Download in PDF or Word." />
      <link rel="canonical" href="https://makemycv.lovable.app/" />
      <meta property="og:title" content="MakeMyCV - Build Professional Resumes Online" />
      <meta property="og:url" content="https://makemycv.lovable.app/" />
    </Helmet>
    <Navbar />
    <Hero />
    <Stats />
    <TrustBadges />
    <Features />
    <ConverterTools />
    <Testimonials />
    <FAQ />
    <Pricing />
    <Footer />
  </div>
);

export default Index;
