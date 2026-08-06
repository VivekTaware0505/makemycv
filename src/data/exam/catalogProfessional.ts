import { BranchId, Subject } from "./types";
import { make } from "./catalogHelpers";

const MBA: BranchId[] = ["mba-marketing", "mba-finance", "mba-hr", "mba-operations", "mba-analytics"];

/** MBA / MMS — common core in year 1, specialisation in year 2. */
const mbaCore: Subject[] = [
  ...make(MBA, 1, 1, [
    ["Management Principles & Practices", "MBA-101", ["Evolution of Management", "Planning & Decision Making", "Organising & Staffing", "Directing & Leadership", "Controlling"]],
    ["Organisational Behaviour", "MBA-102", ["Individual Behaviour", "Perception & Personality", "Motivation Theories", "Group Dynamics", "Organisational Culture & Change"]],
    ["Managerial Economics", "MBA-103", ["Demand & Elasticity", "Production & Cost", "Market Structures", "Pricing Strategies", "Macroeconomic Indicators"]],
    ["Accounting for Business Decisions", "MBA-104", ["Accounting Concepts", "Final Accounts", "Ratio Analysis", "Fund & Cash Flow", "Cost Concepts"]],
    ["Business Statistics & Analytics", "MBA-105", ["Descriptive Statistics", "Probability", "Sampling & Estimation", "Hypothesis Testing", "Correlation & Regression"]],
    ["Business Communication & Ethics", "MBA-106", ["Communication Process", "Business Writing", "Presentation Skills", "Business Ethics", "Corporate Governance"]],
  ]),
  ...make(MBA, 1, 2, [
    ["Marketing Management", "MBA-201", ["Marketing Concepts", "STP & Consumer Behaviour", "Product & Brand", "Pricing & Distribution", "IMC & Digital Marketing"]],
    ["Financial Management", "MBA-202", ["Time Value of Money", "Capital Budgeting", "Cost of Capital", "Capital Structure", "Working Capital Management"]],
    ["Human Resource Management", "MBA-203", ["HR Planning", "Recruitment & Selection", "Training & Development", "Performance Appraisal", "Compensation & IR"]],
    ["Operations & Supply Chain Management", "MBA-204", ["Operations Strategy", "Facility & Layout", "Inventory Management", "Quality Management", "Logistics & SCM"]],
    ["Research Methodology", "MBA-205", ["Research Design", "Data Collection", "Scaling & Questionnaire", "Data Analysis", "Report Writing"]],
    ["Legal Aspects of Business", "MBA-206", ["Indian Contract Act", "Companies Act", "Consumer Protection Act", "Negotiable Instruments", "Cyber & IPR Laws"]],
  ]),
  ...make(MBA, 2, 1, [
    ["Strategic Management", "MBA-301", ["Strategy Concepts", "Environmental Scanning", "SWOT & Portfolio Models", "Strategy Formulation", "Implementation & Control"]],
    ["Business Analytics with Excel & Tools", "MBA-302", ["Data Preparation", "Descriptive Analytics", "Predictive Models", "Dashboards & BI", "Decision Support"]],
    ["Entrepreneurship & Project Management", "MBA-303", ["Entrepreneurial Process", "Business Plan", "Project Appraisal", "Project Scheduling (PERT/CPM)", "Funding & Startups"]],
    ["International Business", "MBA-304", ["Globalisation", "Trade Theories", "FDI & MNCs", "Exim Procedures", "WTO & Regional Blocs"]],
  ]),
  ...make(MBA, 2, 2, [
    ["Management Control & Corporate Strategy", "MBA-401", ["Control Systems", "Balanced Scorecard", "Corporate Restructuring", "Mergers & Acquisitions", "Corporate Social Responsibility"]],
    ["Digital Transformation & E-Business", "MBA-402", ["E-Business Models", "ERP & CRM", "Digital Payments", "Data Privacy", "Emerging Technologies"]],
    ["Leadership & Change Management", "MBA-403", ["Leadership Theories", "Emotional Intelligence", "Change Models", "Conflict & Negotiation", "Organisational Development"]],
  ]),
];

const mbaSpecial: Subject[] = [
  ...make(["mba-marketing"], 2, 1, [
    ["Consumer Behaviour", "MKT-311", ["Buying Decision Process", "Motivation & Perception", "Attitudes & Learning", "Reference Groups", "Culture & Diffusion"]],
    ["Sales & Distribution Management", "MKT-312", ["Sales Planning", "Sales Force Management", "Channel Design", "Channel Conflict", "Retail & Distribution Metrics"]],
    ["Digital & Social Media Marketing", "MKT-313", ["Digital Channels", "SEO & SEM", "Social Media Strategy", "Content Marketing", "Web Analytics"]],
  ]),
  ...make(["mba-finance"], 2, 1, [
    ["Security Analysis & Portfolio Management", "FIN-311", ["Investment Environment", "Fundamental Analysis", "Technical Analysis", "Portfolio Theory", "CAPM & Performance"]],
    ["Banking & Financial Services", "FIN-312", ["Indian Banking System", "RBI & Monetary Policy", "Credit Appraisal", "NBFC & Insurance", "Financial Inclusion"]],
    ["Corporate Taxation", "FIN-313", ["Income Tax Basics", "Heads of Income", "Corporate Tax Planning", "GST Framework", "Tax Compliance"]],
  ]),
  ...make(["mba-hr"], 2, 1, [
    ["Industrial Relations & Labour Laws", "HR-311", ["Trade Unions", "Industrial Disputes Act", "Factories Act", "Wage Legislation", "Collective Bargaining"]],
    ["Talent & Performance Management", "HR-312", ["Talent Acquisition", "Competency Mapping", "Performance Systems", "Career Planning", "Retention Strategies"]],
    ["HR Analytics", "HR-313", ["HR Metrics", "Attrition Analysis", "Workforce Planning", "Engagement Analytics", "HR Dashboards"]],
  ]),
  ...make(["mba-operations"], 2, 1, [
    ["Total Quality Management", "OPS-311", ["Quality Concepts", "SPC & Control Charts", "Six Sigma", "ISO Standards", "Kaizen & Lean"]],
    ["Logistics & Warehouse Management", "OPS-312", ["Logistics Network", "Transportation Modes", "Warehousing", "Inventory Systems", "Reverse Logistics"]],
    ["Operations Research", "OPS-313", ["Linear Programming", "Transportation & Assignment", "Queuing Theory", "Game Theory", "Simulation"]],
  ]),
  ...make(["mba-analytics"], 2, 1, [
    ["Data Visualisation & BI Tools", "BA-311", ["Visual Design Principles", "Power BI / Tableau", "Dashboards", "Storytelling with Data", "KPI Design"]],
    ["Predictive Analytics & Machine Learning", "BA-312", ["Regression Models", "Classification", "Clustering", "Model Validation", "Business Applications"]],
    ["Big Data & Data Management", "BA-313", ["Big Data Ecosystem", "Data Warehousing", "SQL for Analytics", "Cloud Data Platforms", "Data Governance"]],
  ]),
];

/** MBBS — professional years mapped to year/sem for navigation. */
const mbbs: Subject[] = [
  ...make(["mbbs"], 1, 1, [
    ["Human Anatomy I", "AN-101", ["General Anatomy", "Upper Limb", "Thorax", "Histology Basics", "Embryology Basics"]],
    ["Physiology I", "PY-101", ["Cell Physiology", "Blood", "Nerve & Muscle", "Cardiovascular System", "Respiratory System"]],
    ["Biochemistry I", "BI-101", ["Carbohydrate Metabolism", "Proteins & Amino Acids", "Enzymes", "Vitamins", "Lipids"]],
  ]),
  ...make(["mbbs"], 1, 2, [
    ["Human Anatomy II", "AN-102", ["Abdomen & Pelvis", "Lower Limb", "Head & Neck", "Neuroanatomy", "Genetics"]],
    ["Physiology II", "PY-102", ["Renal Physiology", "GIT", "Endocrinology", "Reproductive System", "Central Nervous System"]],
    ["Biochemistry II", "BI-102", ["Molecular Biology", "Nucleic Acid Metabolism", "Clinical Biochemistry", "Nutrition", "Acid-Base Balance"]],
  ]),
  ...make(["mbbs"], 2, 1, [
    ["Pathology I", "PA-201", ["Cell Injury", "Inflammation & Repair", "Haemodynamics", "Neoplasia", "Immunopathology"]],
    ["Microbiology I", "MI-201", ["General Bacteriology", "Immunology", "Sterilisation", "Gram Positive Cocci", "Hospital Infection Control"]],
    ["Pharmacology I", "PH-201", ["General Pharmacology", "ANS Drugs", "CVS Drugs", "CNS Drugs", "Autacoids"]],
  ]),
  ...make(["mbbs"], 2, 2, [
    ["Pathology II", "PA-202", ["Systemic Pathology", "Haematology", "CVS & Respiratory Pathology", "Renal Pathology", "GIT & Liver Pathology"]],
    ["Microbiology II", "MI-202", ["Virology", "Mycology", "Parasitology", "Systemic Infections", "Antimicrobial Resistance"]],
    ["Forensic Medicine & Toxicology", "FM-202", ["Medico-legal Autopsy", "Injuries", "Asphyxia", "Toxicology", "Medical Jurisprudence"]],
  ]),
  ...make(["mbbs"], 3, 1, [
    ["Community Medicine", "CM-301", ["Epidemiology", "Biostatistics", "Communicable Diseases", "Maternal & Child Health", "National Health Programmes"]],
    ["General Medicine I", "MD-301", ["Cardiology", "Respiratory Medicine", "Infectious Diseases", "Nephrology", "Endocrinology"]],
    ["General Surgery I", "SU-301", ["Wounds & Healing", "Shock & Fluids", "Infections", "Trauma", "Anaesthesia Basics"]],
  ]),
  ...make(["mbbs"], 3, 2, [
    ["Obstetrics & Gynaecology", "OG-302", ["Antenatal Care", "Labour & Delivery", "Obstetric Emergencies", "Gynaecological Disorders", "Family Planning"]],
    ["Paediatrics", "PE-302", ["Growth & Development", "Neonatology", "Nutrition & Deficiency", "Immunisation", "Common Childhood Illness"]],
    ["ENT & Ophthalmology", "EO-302", ["Ear Diseases", "Nose & Throat", "Cornea & Lens", "Glaucoma", "Retina & Refraction"]],
  ]),
  ...make(["mbbs"], 4, 1, [
    ["General Medicine II", "MD-401", ["Neurology", "Gastroenterology", "Rheumatology", "Haematology", "Critical Care"]],
    ["General Surgery II", "SU-401", ["GI Surgery", "Urology", "Orthopaedics", "Onco-surgery", "Post-op Care"]],
    ["Dermatology & Psychiatry", "DP-401", ["Skin Infections", "Leprosy & STD", "Psychotic Disorders", "Mood & Anxiety Disorders", "Substance Abuse"]],
  ]),
  ...make(["mbbs"], 4, 2, [
    ["Clinical Practice & Emergency Medicine", "CP-402", ["ACLS & BLS", "Poisoning Management", "Trauma Triage", "Clinical Skills", "Ethics & Consent"]],
  ]),
];

const bams: Subject[] = [
  ...make(["bams"], 1, 1, [["Padartha Vigyan & Ayurved Itihas", "AY-101", ["Darshan & Padartha", "Dravya & Guna", "History of Ayurveda", "Research Methods", "Basic Principles"]], ["Sanskrit & Samhita Adhyayan", "AY-102", ["Sanskrit Grammar", "Charaka Samhita", "Sushruta Samhita", "Ashtanga Hridaya", "Commentaries"]], ["Kriya Sharir (Physiology)", "AY-103", ["Tridosha", "Dhatu & Mala", "Agni & Ama", "Srotas", "Prakriti"]]]),
  ...make(["bams"], 1, 2, [["Rachana Sharir (Anatomy)", "AY-201", ["Asthi & Sandhi", "Marma Sharir", "Kostha & Koshtanga", "Indriya Sharir", "Garbha Sharir"]], ["Maulik Siddhant", "AY-202", ["Panchamahabhuta", "Samanya-Vishesha", "Karya-Karana", "Pariksha", "Chikitsa Siddhant"]]]),
  ...make(["bams"], 2, 1, [["Dravyaguna Vigyan", "AY-301", ["Rasa Panchaka", "Herb Identification", "Karma & Prayoga", "Nighantu Study", "Substitutes"]], ["Rasashastra & Bhaishajya Kalpana", "AY-302", ["Parada & Gandhaka", "Maharasa & Uparasa", "Bhasma Preparation", "Kalpana Types", "Quality Control"]], ["Roga Nidan & Vikriti Vigyan", "AY-303", ["Nidan Panchaka", "Ashtavidha Pariksha", "Lab Diagnosis", "Srotodushti", "Modern Correlations"]]]),
  ...make(["bams"], 2, 2, [["Charak Samhita (Purvardha)", "AY-401", ["Sutra Sthana", "Nidana Sthana", "Vimana Sthana", "Chikitsa Basics", "Applied Concepts"]], ["Agad Tantra & Vyavahar Ayurved", "AY-402", ["Visha Classification", "Sthavara & Jangama Visha", "Forensic Ayurveda", "Medical Jurisprudence", "Toxicology Management"]]]),
  ...make(["bams"], 3, 1, [["Kayachikitsa", "AY-501", ["Jwara", "Prameha", "Vata Vyadhi", "Udara Roga", "Rasayana"]], ["Panchakarma", "AY-502", ["Purvakarma", "Vamana & Virechana", "Basti", "Nasya & Raktamokshana", "Paschat Karma"]], ["Shalya Tantra", "AY-503", ["Yantra & Shastra", "Vrana", "Bhagandara & Arsha", "Ksharasutra", "Post-op Care"]]]),
  ...make(["bams"], 3, 2, [["Prasuti Tantra & Stri Roga", "AY-601", ["Garbhini Paricharya", "Prasava", "Sutika", "Yoni Vyapad", "Artava Dushti"]], ["Kaumarbhritya", "AY-602", ["Balaka Poshana", "Suvarnaprashan", "Common Paediatric Roga", "Immunisation", "Growth Assessment"]], ["Shalakya Tantra", "AY-603", ["Netra Roga", "Karna Roga", "Nasa Roga", "Mukha Roga", "Kriyakalpa"]]]),
];

const bhms: Subject[] = [
  ...make(["bhms"], 1, 1, [["Organon of Medicine I", "HM-101", ["Life & Works of Hahnemann", "Health & Disease", "Vital Force", "Aphorisms 1-70", "Homoeopathic Philosophy"]], ["Homoeopathic Materia Medica I", "HM-102", ["Sources of Drugs", "Drug Proving", "Constitutional Remedies", "Polychrests", "Comparative Materia Medica"]], ["Anatomy", "HM-103", ["General Anatomy", "Musculoskeletal", "Thorax & Abdomen", "Neuroanatomy", "Histology"]]]),
  ...make(["bhms"], 1, 2, [["Physiology & Biochemistry", "HM-201", ["Blood & CVS", "Respiration", "Renal & GIT", "Endocrine", "Biochemical Metabolism"]], ["Homoeopathic Pharmacy", "HM-202", ["Drug Sources", "Potentisation", "Scales of Potency", "Dispensing", "Pharmacopoeia"]]]),
  ...make(["bhms"], 2, 1, [["Organon of Medicine II", "HM-301", ["Aphorisms 71-145", "Miasms", "Suppression", "Case Taking", "Second Prescription"]], ["Pathology & Microbiology", "HM-302", ["Cell Injury", "Inflammation", "Neoplasia", "Bacteriology", "Immunology"]], ["Forensic Medicine & Toxicology", "HM-303", ["Injuries", "Asphyxia", "Poisons", "Medical Ethics", "Court Procedures"]]]),
  ...make(["bhms"], 2, 2, [["Materia Medica II", "HM-401", ["Mineral Group", "Plant Group", "Nosodes", "Sarcodes", "Relationship of Remedies"]], ["Surgery Basics", "HM-402", ["Wounds", "Abscess & Ulcers", "Fractures", "Hernia", "Homoeopathic Management"]]]),
  ...make(["bhms"], 3, 1, [["Practice of Medicine", "HM-501", ["Infectious Diseases", "CVS & Respiratory", "GIT & Liver", "Renal", "Metabolic Disorders"]], ["Repertory", "HM-502", ["Kent Repertory", "Boenninghausen", "BBCR", "Card & Computer Repertory", "Case Analysis"]], ["Community Medicine", "HM-503", ["Epidemiology", "Biostatistics", "National Programmes", "MCH", "Environment & Health"]]]),
  ...make(["bhms"], 3, 2, [["Obstetrics & Gynaecology", "HM-601", ["Antenatal Care", "Labour", "Puerperium", "Menstrual Disorders", "Homoeopathic Therapeutics"]], ["Paediatrics & Case Practice", "HM-602", ["Growth & Development", "Nutrition", "Childhood Illness", "Immunisation", "Case Records"]]]),
];

const nursing: Subject[] = [
  ...make(["bsc-nursing"], 1, 1, [["Anatomy & Physiology", "BN-101", ["Cell & Tissue", "Skeletal & Muscular", "Cardiovascular", "Respiratory & Digestive", "Nervous & Endocrine"]], ["Nursing Foundation I", "BN-102", ["Nursing Concepts", "Health Assessment", "Vital Signs", "Hygiene & Comfort", "Infection Control"]], ["Applied Biochemistry & Nutrition", "BN-103", ["Nutrients", "Balanced Diet", "Therapeutic Diets", "Metabolism", "Food Hygiene"]]]),
  ...make(["bsc-nursing"], 1, 2, [["Nursing Foundation II", "BN-201", ["Medication Administration", "Wound Care", "Oxygenation", "Elimination Needs", "Documentation"]], ["Microbiology & Infection Control", "BN-202", ["Microbes & Classification", "Sterilisation", "Immunity", "Hospital Infection", "Biomedical Waste"]], ["Psychology & Sociology", "BN-203", ["Learning & Motivation", "Personality", "Attitudes", "Family & Society", "Social Problems in Health"]]]),
  ...make(["bsc-nursing"], 2, 1, [["Medical Surgical Nursing I", "BN-301", ["Nursing Process", "Respiratory Disorders", "Cardiac Disorders", "GI Disorders", "Peri-operative Nursing"]], ["Pharmacology & Pathology", "BN-302", ["Drug Actions", "Dosage Calculation", "Antimicrobials", "Inflammation", "Neoplasia"]]]),
  ...make(["bsc-nursing"], 2, 2, [["Medical Surgical Nursing II", "BN-401", ["Neurological Disorders", "Renal & Urinary", "Endocrine Disorders", "Oncology Nursing", "Burns & Reconstructive"]], ["Community Health Nursing I", "BN-402", ["Primary Health Care", "Epidemiology", "Health Education", "Family Health", "National Programmes"]]]),
  ...make(["bsc-nursing"], 3, 1, [["Child Health Nursing", "BN-501", ["Growth & Development", "Neonatal Care", "IMNCI", "Common Disorders", "Paediatric Procedures"]], ["Mental Health Nursing", "BN-502", ["Mental Health Concepts", "Psychiatric Assessment", "Schizophrenia & Mood Disorders", "Therapies", "Mental Health Act"]]]),
  ...make(["bsc-nursing"], 3, 2, [["Midwifery & Obstetrical Nursing", "BN-601", ["Antenatal Care", "Intranatal Care", "Postnatal Care", "High-risk Pregnancy", "Family Welfare"]], ["Nursing Management & Research", "BN-602", ["Management Principles", "Ward Management", "Nursing Research Process", "Statistics", "Quality Assurance"]]]),
  ...make(["bsc-nursing"], 4, 1, [["Community Health Nursing II", "BN-701", ["Health Care Delivery", "School & Occupational Health", "Home Visits", "Disaster Nursing", "Referral System"]], ["Critical Care Nursing", "BN-702", ["ICU Monitoring", "Ventilator Care", "CPR & Emergency", "Shock Management", "Ethical Issues"]]]),
];

const agri: Subject[] = [
  ...make(["bsc-agri"], 1, 1, [["Fundamentals of Agronomy", "AG-101", ["Agriculture & Agronomy", "Crop Classification", "Tillage & Seedbed", "Sowing & Spacing", "Weed Management"]], ["Fundamentals of Soil Science", "AG-102", ["Soil Formation", "Physical Properties", "Soil Water", "Soil Colloids", "Soil Classification"]], ["Fundamentals of Horticulture", "AG-103", ["Horticulture Branches", "Propagation", "Orchard Management", "Fruit Crops", "Post-harvest Handling"]], ["Agricultural Meteorology", "AG-104", ["Weather Elements", "Monsoon of India", "Evapotranspiration", "Weather Forecasting", "Climate & Crops"]]]),
  ...make(["bsc-agri"], 1, 2, [["Crop Production Technology (Kharif)", "AG-201", ["Cereals", "Pulses", "Oilseeds", "Fibre Crops", "Cropping Systems"]], ["Fundamentals of Plant Pathology", "AG-202", ["Disease Concepts", "Fungi & Bacteria", "Viruses & Nematodes", "Disease Cycle", "Disease Management"]], ["Fundamentals of Entomology", "AG-203", ["Insect Morphology", "Classification", "Insect Physiology", "Beneficial Insects", "Insect Control"]], ["Fundamentals of Genetics", "AG-204", ["Mendelian Genetics", "Gene Interaction", "Linkage & Crossing Over", "Mutation", "Molecular Genetics"]]]),
  ...make(["bsc-agri"], 2, 1, [["Crop Production Technology (Rabi)", "AG-301", ["Wheat & Barley", "Rabi Pulses", "Rabi Oilseeds", "Sugarcane", "Fodder Crops"]], ["Soil Fertility & Nutrient Management", "AG-302", ["Essential Nutrients", "Fertilizers", "Soil Testing", "INM", "Manures & Biofertilizers"]], ["Agricultural Microbiology", "AG-303", ["Microbial Groups", "Soil Microbiology", "Nitrogen Fixation", "Composting", "Biofertilizer Production"]], ["Agricultural Economics", "AG-304", ["Demand & Supply", "Farm Cost Concepts", "Agricultural Marketing", "Price Policy", "Agricultural Finance"]]]),
  ...make(["bsc-agri"], 2, 2, [["Irrigation Water Management", "AG-401", ["Soil-Water-Plant Relations", "Irrigation Methods", "Scheduling", "Drainage", "Water Use Efficiency"]], ["Plant Breeding", "AG-402", ["Modes of Reproduction", "Selection Methods", "Hybridisation", "Heterosis Breeding", "Variety Release"]], ["Farm Machinery & Power", "AG-403", ["Tractors & Power Sources", "Tillage Implements", "Sowing Equipment", "Plant Protection Equipment", "Harvest Machinery"]], ["Agricultural Extension Education", "AG-404", ["Extension Concepts", "Teaching Methods", "Adoption & Diffusion", "Programme Planning", "Rural Development"]]]),
  ...make(["bsc-agri"], 3, 1, [["Weed Management", "AG-501", ["Weed Biology", "Weed Classification", "Herbicides", "Application Methods", "Integrated Weed Management"]], ["Pests of Crops & Management", "AG-502", ["Pests of Cereals", "Pests of Pulses & Oilseeds", "Storage Pests", "IPM Concepts", "Biological Control"]], ["Diseases of Field Crops", "AG-503", ["Cereal Diseases", "Pulse Diseases", "Oilseed Diseases", "Fruit & Vegetable Diseases", "Integrated Disease Management"]], ["Animal Husbandry & Dairying", "AG-504", ["Cattle Breeds", "Feeds & Fodder", "Milk Production", "Poultry Management", "Animal Health"]]]),
  ...make(["bsc-agri"], 3, 2, [["Post-harvest Technology", "AG-601", ["Maturity Indices", "Storage Structures", "Processing", "Value Addition", "Packaging & Transport"]], ["Seed Production Technology", "AG-602", ["Seed Classes", "Seed Production Techniques", "Seed Certification", "Seed Testing", "Seed Storage"]], ["Farm Management & Production Economics", "AG-603", ["Farm Planning", "Budgeting", "Production Functions", "Risk Management", "Farm Records"]], ["Organic Farming", "AG-604", ["Principles of Organic Farming", "Organic Inputs", "Crop Rotation", "Certification", "Marketing of Organic Produce"]]]),
  ...make(["bsc-agri"], 4, 1, [["Agribusiness Management", "AG-701", ["Agribusiness Environment", "Project Formulation", "Supply Chain", "Marketing Management", "Entrepreneurship"]], ["Rural Agricultural Work Experience (RAWEP)", "AG-702", ["Village Survey", "Crop Diagnostics", "Farmer Advisory", "Report Writing", "Agro-industrial Attachment"]]]),
  ...make(["bsc-agri"], 4, 2, [["Precision & Protected Cultivation", "AG-801", ["Precision Farming Tools", "Remote Sensing & GIS", "Greenhouse Structures", "Hydroponics", "Drip Fertigation"]], ["Natural Resource Management", "AG-802", ["Watershed Management", "Soil Conservation", "Agroforestry", "Climate Resilient Agriculture", "Environmental Policies"]]]),
];

export const professionalCatalog: Subject[] = [
  ...mbaCore,
  ...mbaSpecial,
  ...mbbs,
  ...bams,
  ...bhms,
  ...nursing,
  ...agri,
];
