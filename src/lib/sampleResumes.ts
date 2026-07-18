import { ResumeData, ResumeField } from "@/types/resume";

const base = (partial: Partial<ResumeData>): ResumeData => ({
  name: "",
  email: "",
  phone: "",
  linkedin: "",
  portfolio: "",
  summary: "",
  skills: "",
  photo: "",
  field: "other",
  showProjects: true,
  education: [{ id: "1", degree: "", institution: "", year: "" }],
  experience: [{ id: "1", title: "", company: "", duration: "", description: "" }],
  projects: [{ id: "1", name: "", description: "", technologies: "", link: "" }],
  certifications: [{ id: "1", name: "", issuer: "", year: "" }],
  ...partial,
});

export const sampleResumes: Record<ResumeField, ResumeData> = {
  "it-software": base({
    name: "Arjun Mehta",
    email: "arjun.mehta@gmail.com",
    phone: "+91 98765 43210",
    linkedin: "linkedin.com/in/arjunmehta",
    portfolio: "arjunmehta.dev",
    field: "it-software",
    summary:
      "Full-stack engineer with 4+ years building scalable web apps in React, Node.js and AWS. Shipped features used by 500K+ users; passionate about clean code and performance.",
    skills: "React, TypeScript, Node.js, Next.js, PostgreSQL, AWS, Docker, GraphQL, Redis, Jest",
    education: [
      { id: "1", degree: "B.Tech Computer Science", institution: "IIT Bombay", year: "2018 - 2022" },
    ],
    experience: [
      { id: "1", title: "Software Engineer II", company: "Razorpay", duration: "2 Years", description: "Led migration of payments dashboard to Next.js, cutting load time by 42%. Mentored 3 junior engineers." },
      { id: "2", title: "Software Engineer", company: "Freshworks", duration: "1 Year", description: "Built REST APIs handling 10M+ daily requests. Reduced database costs by 30% via query optimization." },
    ],
    projects: [
      { id: "1", name: "OpenNotes", description: "Open-source note-taking app with real-time collab. 1.2k GitHub stars.", technologies: "React, Yjs, Node.js, PostgreSQL", link: "github.com/arjun/opennotes" },
    ],
    certifications: [
      { id: "1", name: "AWS Certified Solutions Architect", issuer: "Amazon Web Services", year: "2023" },
    ],
  }),
  healthcare: base({
    name: "Dr. Rahul Verma",
    email: "rahul.verma@hospitalmail.in",
    phone: "+91 91234 56780",
    linkedin: "linkedin.com/in/drrahulverma",
    field: "healthcare",
    showProjects: false,
    summary:
      "MBBS, MD (Internal Medicine) with 6 years of clinical experience across ICU and general medicine. Trained at AIIMS Delhi, passionate about evidence-based patient care.",
    skills: "Patient Care, ICU Management, ECG Interpretation, Ventilator Management, EMR/EHR, Clinical Research, ACLS, BLS",
    education: [
      { id: "1", degree: "MD Internal Medicine", institution: "AIIMS, New Delhi", year: "2019 - 2022" },
      { id: "2", degree: "MBBS", institution: "Grant Medical College, Mumbai", year: "2013 - 2018" },
    ],
    experience: [
      { id: "1", title: "Consultant Physician", company: "Fortis Hospital, Mumbai", duration: "3 Years", description: "Manage 40+ patient rounds daily across general medicine and ICU. Led sepsis protocol update reducing mortality by 18%." },
    ],
    projects: [{ id: "1", name: "", description: "", technologies: "", link: "" }],
    certifications: [
      { id: "1", name: "Advanced Cardiac Life Support (ACLS)", issuer: "American Heart Association", year: "2023" },
      { id: "2", name: "MCI Registration", issuer: "Medical Council of India", year: "2018" },
    ],
  }),
  "banking-finance": base({
    name: "Neha Kulkarni",
    email: "neha.kulkarni@outlook.com",
    phone: "+91 99887 76655",
    field: "banking-finance",
    showProjects: false,
    summary:
      "Finance professional with 5 years in retail & corporate banking. CFA Level 2 candidate; skilled in credit analysis, portfolio management and financial modelling.",
    skills: "Financial Modelling, Credit Analysis, Bloomberg Terminal, Excel (Advanced), SAP, GST, Risk Management, Portfolio Management, Compliance, Auditing",
    education: [
      { id: "1", degree: "MBA (Finance)", institution: "NMIMS Mumbai", year: "2018 - 2020" },
      { id: "2", degree: "B.Com (Hons)", institution: "Pune University", year: "2015 - 2018" },
    ],
    experience: [
      { id: "1", title: "Senior Credit Analyst", company: "HDFC Bank", duration: "3 Years", description: "Underwrote SME loans worth ₹120 Cr with 0.4% NPA. Automated credit-scoring reducing turnaround by 45%." },
    ],
    projects: [{ id: "1", name: "", description: "", technologies: "", link: "" }],
    certifications: [
      { id: "1", name: "CFA Level 1", issuer: "CFA Institute", year: "2022" },
      { id: "2", name: "NISM Series V-A", issuer: "NISM", year: "2021" },
    ],
  }),
  marketing: base({
    name: "Aditi Sharma",
    email: "aditi.sharma@gmail.com",
    phone: "+91 90000 12345",
    linkedin: "linkedin.com/in/aditisharma",
    field: "marketing",
    summary:
      "Digital marketer with 4 years leading performance & content campaigns. Scaled D2C brand from ₹5L to ₹1.2Cr MRR through paid social and SEO.",
    skills: "Google Ads, Meta Ads, SEO, Google Analytics, HubSpot, Copywriting, Content Strategy, Email Marketing, CRO, Canva",
    education: [{ id: "1", degree: "MBA Marketing", institution: "Symbiosis Pune", year: "2019 - 2021" }],
    experience: [
      { id: "1", title: "Growth Marketing Lead", company: "Mamaearth", duration: "2 Years", description: "Owned ₹8Cr annual ad budget; drove 3.2x ROAS across Meta and Google campaigns." },
    ],
    projects: [
      { id: "1", name: "#SkinFirst Campaign", description: "Multi-channel campaign that generated 12M impressions and 40K signups in 6 weeks.", technologies: "Meta Ads, Influencer Marketing, Landing Pages", link: "" },
    ],
    certifications: [
      { id: "1", name: "Google Ads Search Certification", issuer: "Google", year: "2024" },
    ],
  }),
  engineering: base({
    name: "Rohit Patil",
    email: "rohit.patil@engmail.com",
    phone: "+91 98980 12121",
    field: "engineering",
    summary:
      "Mechanical engineer with 5 years in automotive R&D. Led design of 3 production-ready powertrain components; strong in CAD, FEA and DFMEA.",
    skills: "SolidWorks, AutoCAD, ANSYS, MATLAB, GD&T, DFMEA, Six Sigma, Project Management, PLM, Manufacturing Processes",
    education: [{ id: "1", degree: "B.E. Mechanical Engineering", institution: "COEP Pune", year: "2015 - 2019" }],
    experience: [
      { id: "1", title: "Design Engineer", company: "Tata Motors", duration: "3 Years", description: "Designed EV battery mounting bracket reducing weight by 22%. Cross-functional lead for 4-member team." },
    ],
    projects: [
      { id: "1", name: "Formula Student Car", description: "Suspension subsystem lead for university FS team; placed 4th nationally.", technologies: "SolidWorks, ANSYS", link: "" },
    ],
    certifications: [{ id: "1", name: "Six Sigma Green Belt", issuer: "ASQ", year: "2023" }],
  }),
  legal: base({
    name: "Meera Joshi",
    email: "meera.joshi@lawmail.in",
    phone: "+91 90210 33445",
    field: "legal",
    showProjects: false,
    summary:
      "Corporate lawyer with 6 years advising on M&A, IPO and compliance. Bar Council of India registered; drafted 40+ shareholder agreements.",
    skills: "Contract Drafting, Corporate Law, M&A Due Diligence, SEBI Regulations, Litigation, Compliance, Legal Research, IP Law, Negotiation",
    education: [
      { id: "1", degree: "LL.M. Corporate Law", institution: "NLSIU Bangalore", year: "2017 - 2018" },
      { id: "2", degree: "B.A. LL.B. (Hons)", institution: "ILS Law College Pune", year: "2012 - 2017" },
    ],
    experience: [
      { id: "1", title: "Senior Associate", company: "AZB & Partners", duration: "3 Years", description: "Led due diligence on 8 M&A deals worth $200M+. Advised startups on Series A-C fundraising." },
    ],
    projects: [{ id: "1", name: "", description: "", technologies: "", link: "" }],
    certifications: [{ id: "1", name: "Bar Council of India", issuer: "BCI", year: "2017" }],
  }),
  academic: base({
    name: "Dr. Sneha Iyer",
    email: "sneha.iyer@univ.edu",
    phone: "+91 88220 11122",
    field: "academic",
    summary:
      "Assistant Professor with 8 years in Machine Learning research. 24 peer-reviewed publications, h-index 12; PhD from IISc Bangalore.",
    skills: "Machine Learning, Deep Learning, Python, R, LaTeX, SPSS, Grant Writing, Peer Review, Curriculum Design, Academic Writing",
    education: [
      { id: "1", degree: "PhD Computer Science (ML)", institution: "IISc Bangalore", year: "2015 - 2019" },
      { id: "2", degree: "M.Tech Computer Science", institution: "IIT Madras", year: "2013 - 2015" },
    ],
    experience: [
      { id: "1", title: "Assistant Professor", company: "IIIT Hyderabad", duration: "5 Years", description: "Teach ML and Statistics to graduate students; supervise 6 PhD candidates. Secured ₹1.4Cr in research grants." },
    ],
    projects: [
      { id: "1", name: "Federated Learning for Healthcare", description: "DST-funded project on privacy-preserving ML across 3 partner hospitals.", technologies: "PyTorch, Flower, Docker", link: "" },
    ],
    certifications: [],
  }),
  creative: base({
    name: "Kabir Anand",
    email: "kabir@studiokabir.co",
    phone: "+91 90909 45678",
    portfolio: "studiokabir.co",
    field: "creative",
    summary:
      "Product designer with 5 years crafting mobile-first experiences for fintech and healthtech. Featured in Awwwards & Muzli.",
    skills: "Figma, Adobe XD, Prototyping, UI Design, UX Research, Design Systems, Illustrator, After Effects, Framer, HTML/CSS",
    education: [{ id: "1", degree: "B.Des Communication Design", institution: "NID Ahmedabad", year: "2015 - 2019" }],
    experience: [
      { id: "1", title: "Senior Product Designer", company: "CRED", duration: "2 Years", description: "Led redesign of rewards flow, improving activation by 34%." },
    ],
    projects: [
      { id: "1", name: "Kite Banking App", description: "End-to-end design of neobank app that won CES Design Award 2024.", technologies: "Figma, Framer, Lottie", link: "studiokabir.co/kite" },
    ],
    certifications: [],
  }),
  government: base({
    name: "Vikram Singh",
    email: "vikram.singh@gov.in",
    phone: "+91 99001 22334",
    field: "government",
    showProjects: false,
    summary:
      "IAS officer (2018 batch) with 6 years leading district administration and rural development schemes across 3 districts.",
    skills: "Public Administration, Policy Analysis, Budget Management, Governance, RTI, Public Relations, Project Planning, Report Writing, Crisis Management",
    education: [{ id: "1", degree: "B.Tech Civil Engineering", institution: "IIT Delhi", year: "2011 - 2015" }],
    experience: [
      { id: "1", title: "District Collector", company: "Government of Rajasthan — Jaisalmer", duration: "2 Years", description: "Oversee administration of 4M+ residents. Implemented Jal Jeevan Mission covering 82% of rural households." },
    ],
    projects: [{ id: "1", name: "", description: "", technologies: "", link: "" }],
    certifications: [{ id: "1", name: "LBSNAA Foundation Course", issuer: "LBSNAA Mussoorie", year: "2019" }],
  }),
  other: base({
    name: "Priya Nair",
    email: "priya.nair@gmail.com",
    phone: "+91 98765 12345",
    field: "other",
    summary:
      "Operations manager with 5 years scaling processes for high-growth startups. Track record of building teams from 3 to 30.",
    skills: "Operations Management, Team Leadership, SOP Design, Vendor Management, MS Office, Communication, Problem Solving, Data Analysis",
    education: [{ id: "1", degree: "MBA Operations", institution: "SPJIMR Mumbai", year: "2017 - 2019" }],
    experience: [
      { id: "1", title: "Operations Manager", company: "Urban Company", duration: "3 Years", description: "Scaled service-partner ops across 4 cities from 500 to 4,200 partners." },
    ],
    projects: [
      { id: "1", name: "Partner Onboarding Revamp", description: "Redesigned onboarding cutting time-to-first-job from 14 days to 5.", technologies: "Notion, Zapier", link: "" },
    ],
    certifications: [],
  }),
};

export const getSampleResume = (field: ResumeField): ResumeData => {
  const sample = sampleResumes[field] ?? sampleResumes.other;
  return { ...sample };
};