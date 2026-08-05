import { Subject } from "./types";
import { make } from "./catalogHelpers";

/** Computer, IT and AI&DS catalog — every semester, every subject. */
export const computerCatalog: Subject[] = [
  ...make(["computer"], 2, 1, [
    ["Discrete Mathematics", "210241", ["Set Theory & Logic", "Counting Principles", "Graph Theory", "Trees", "Algebraic Structures"]],
    ["Fundamentals of Data Structures", "210242", ["Algorithm Analysis", "Arrays & Sequential Organization", "Linked Lists", "Stacks", "Queues"]],
    ["Object Oriented Programming (C++)", "210243", ["Classes & Objects", "Inheritance", "Polymorphism", "Templates & STL", "Exception Handling"]],
    ["Computer Graphics", "210244", ["Output Primitives", "Scan Conversion", "2D Transformations", "Clipping", "3D Viewing & Curves"]],
    ["Digital Electronics & Logic Design", "210245", ["Number Systems", "Combinational Logic", "Sequential Circuits", "Counters & Registers", "Programmable Logic"]],
  ]),
  ...make(["computer"], 2, 2, [
    ["Engineering Mathematics III", "207003", ["Linear Differential Equations", "Transforms", "Statistics & Probability", "Vector Calculus", "Complex Variables"]],
    ["Data Structures & Algorithms II", "210252", ["Trees & BST", "Graphs", "Hashing", "Sorting Techniques", "File Organization"]],
    ["Software Engineering", "210253", ["Process Models", "Requirement Engineering", "Design & Architecture", "Testing", "Project Management"]],
    ["Microprocessor", "210254", ["8086 Architecture", "Instruction Set", "Assembly Programming", "Interrupts", "Interfacing & Peripherals"]],
    ["Principles of Programming Languages", "210255", ["Language Paradigms", "Names & Bindings", "Data Types", "Control Abstraction", "Functional & Logic Programming"]],
  ]),
  ...make(["computer"], 3, 1, [
    ["Database Management Systems", "310241", ["ER Modelling", "Relational Algebra & SQL", "Normalization", "Transactions & Concurrency", "NoSQL Databases"]],
    ["Theory of Computation", "310242", ["Finite Automata", "Regular Expressions", "Context Free Grammars", "Pushdown Automata", "Turing Machines"]],
    ["Systems Programming & Operating Systems", "310243", ["Assemblers & Macros", "Loaders & Linkers", "Process Management", "Memory Management", "File & Device Management"]],
    ["Computer Networks & Security", "310244", ["OSI & TCP/IP", "Data Link Layer", "Network Layer & Routing", "Transport Layer", "Network Security"]],
    ["Web Technology", "310245", ["HTML5 & CSS3", "JavaScript & DOM", "Server Side Scripting", "AJAX & JSON", "Frameworks & REST APIs"]],
  ]),
  ...make(["computer"], 3, 2, [
    ["Design & Analysis of Algorithms", "310252", ["Divide & Conquer", "Greedy Method", "Dynamic Programming", "Backtracking & Branch and Bound", "NP-Completeness"]],
    ["Artificial Intelligence", "310253", ["Intelligent Agents", "Search Techniques", "Knowledge Representation", "Planning & Reasoning", "Expert Systems"]],
    ["Data Science & Big Data Analytics", "310251", ["Data Science Lifecycle", "Statistical Inference", "Big Data & Hadoop", "MapReduce & Hive", "Data Visualization"]],
    ["Compilers", "310254", ["Lexical Analysis", "Parsing Techniques", "Semantic Analysis", "Intermediate Code", "Code Optimization"]],
    ["Human Computer Interaction", "310255", ["Interaction Design", "Usability Engineering", "Interface Models", "Evaluation Techniques", "Mobile & Web HCI"]],
  ]),
  ...make(["computer"], 4, 1, [
    ["Machine Learning", "410242", ["Supervised Learning", "Regression & Classification", "Clustering", "Neural Networks", "Model Evaluation"]],
    ["Information & Cyber Security", "410241", ["Symmetric Ciphers", "Public Key Cryptography", "Hashing & Digital Signatures", "Network Attacks", "Cyber Laws & Forensics"]],
    ["Cloud Computing", "410243", ["Cloud Models", "Virtualization", "Cloud Storage", "Containers & Orchestration", "Security & SLA"]],
    ["Software Testing & Quality Assurance", "410244", ["Testing Fundamentals", "Black & White Box Testing", "Automation Tools", "Test Management", "Quality Standards"]],
    ["Distributed Systems", "410245", ["System Models", "Communication & RPC", "Synchronization", "Consistency & Replication", "Fault Tolerance"]],
  ]),
  ...make(["computer"], 4, 2, [
    ["Deep Learning", "410251", ["Neural Network Basics", "CNN", "RNN & LSTM", "Autoencoders & GANs", "Transformers"]],
    ["Internet of Things & Embedded Systems", "410252", ["IoT Architecture", "Sensors & Actuators", "Protocols (MQTT, CoAP)", "Embedded Platforms", "IoT Security"]],
    ["Blockchain Technology", "410253", ["Cryptographic Basics", "Bitcoin & Consensus", "Ethereum & Smart Contracts", "Hyperledger", "Applications & Challenges"]],
    ["Software Architecture & Design Patterns", "410254", ["Architectural Styles", "Creational Patterns", "Structural Patterns", "Behavioural Patterns", "Microservices"]],
    ["Business Intelligence", "410255", ["BI Architecture", "Data Warehousing", "OLAP & Reporting", "Decision Support", "BI Tools & Case Studies"]],
  ]),

  ...make(["it"], 2, 1, [
    ["Discrete Mathematics", "214441", ["Logic & Proofs", "Relations & Functions", "Counting", "Graphs & Trees", "Groups & Rings"]],
    ["Data Structures & Algorithms", "214442", ["Complexity Analysis", "Linked Lists", "Stacks & Queues", "Trees", "Graphs"]],
    ["Object Oriented Programming", "214443", ["OOP Principles", "Classes & Inheritance", "Polymorphism", "File I/O", "Exception Handling"]],
    ["Computer Graphics", "214444", ["Display Devices", "Line & Circle Algorithms", "Transformations", "Clipping & Filling", "Animation"]],
    ["Digital Electronics & Microprocessors", "214445", ["Logic Families", "Combinational Design", "Flip-Flops", "8086 Architecture", "Interfacing"]],
  ]),
  ...make(["it"], 2, 2, [
    ["Engineering Mathematics III", "207003", ["Differential Equations", "Laplace & Fourier Transforms", "Probability", "Statistics", "Numerical Methods"]],
    ["Database Management Systems", "214452", ["Data Models", "SQL & PL/SQL", "Normal Forms", "Concurrency Control", "Recovery"]],
    ["Computer Networks", "214453", ["Reference Models", "Framing & Error Control", "IP Addressing & Subnetting", "TCP & UDP", "Application Protocols"]],
    ["Operating Systems", "214454", ["Process & Threads", "CPU Scheduling", "Deadlocks", "Memory Management", "File Systems"]],
    ["Processor Architecture & Interfacing", "214455", ["CPU Organization", "Pipelining", "Cache Memory", "I/O Interfacing", "Multiprocessors"]],
  ]),
  ...make(["it"], 3, 1, [
    ["Software Engineering & Project Management", "314441", ["Process Models", "Requirements", "Estimation & Scheduling", "Risk Management", "Quality & CMMI"]],
    ["Web Technology", "314442", ["HTML5 & CSS3", "JavaScript & jQuery", "Servlets & JSP", "REST & JSON", "MVC Frameworks"]],
    ["Theory of Computation", "314443", ["DFA & NFA", "Regular Grammars", "CFG & Parse Trees", "PDA", "Turing Machines & Decidability"]],
    ["Information Security", "314444", ["Security Goals", "Classical & Modern Ciphers", "RSA & Key Exchange", "Authentication", "Firewalls & IDS"]],
    ["Human Computer Interaction", "314445", ["Human Factors", "Design Principles", "Prototyping", "Usability Testing", "Accessibility"]],
  ]),
  ...make(["it"], 3, 2, [
    ["Design & Analysis of Algorithms", "314451", ["Asymptotic Analysis", "Divide & Conquer", "Greedy", "Dynamic Programming", "Complexity Classes"]],
    ["Cloud Computing", "314452", ["Service Models", "Virtualization", "Cloud Platforms", "Containers", "Cloud Security"]],
    ["Data Science & Analytics", "314453", ["Data Preprocessing", "Descriptive Analytics", "Predictive Models", "Hadoop & Spark", "Visualization"]],
    ["Mobile Computing", "314454", ["Wireless Networks", "GSM & LTE", "Mobile IP & TCP", "Android Development", "Mobile Security"]],
    ["Software Testing & QA", "314455", ["Test Levels", "Test Case Design", "Automation (Selenium)", "Defect Management", "Quality Metrics"]],
  ]),
  ...make(["it"], 4, 1, [
    ["Machine Learning", "414441", ["Learning Types", "Linear Models", "Decision Trees & SVM", "Clustering", "Evaluation & Overfitting"]],
    ["Information & Cyber Security", "414442", ["Cryptography", "Web Attacks", "Malware", "Digital Forensics", "IT Act & Compliance"]],
    ["Internet of Things", "414443", ["IoT Layers", "Sensor Networks", "Protocols", "Cloud Integration", "Case Studies"]],
    ["Enterprise Architecture & Cloud Native", "414444", ["Enterprise Patterns", "SOA & Microservices", "API Gateways", "CI/CD", "Observability"]],
    ["Software Defined Networks", "414445", ["SDN Architecture", "OpenFlow", "Controllers", "Network Virtualization", "NFV Use Cases"]],
  ]),
  ...make(["it"], 4, 2, [
    ["Deep Learning", "414451", ["Perceptron & MLP", "Backpropagation", "CNN", "Sequence Models", "Generative Models"]],
    ["Blockchain Technology", "414452", ["Distributed Ledger", "Consensus Algorithms", "Smart Contracts", "Permissioned Chains", "Applications"]],
    ["Big Data Technologies", "414453", ["Big Data Characteristics", "HDFS", "MapReduce", "Hive & Pig", "Spark & Streaming"]],
    ["DevOps", "414454", ["DevOps Culture", "Version Control & CI", "Docker", "Kubernetes", "Monitoring & IaC"]],
    ["Cyber Forensics", "414455", ["Forensic Process", "Disk & Memory Forensics", "Network Forensics", "Mobile Forensics", "Legal Aspects"]],
  ]),

  ...make(["ai-ds"], 2, 1, [
    ["Discrete Mathematics", "217521", ["Logic", "Combinatorics", "Relations", "Graph Theory", "Recurrence Relations"]],
    ["Data Structures & Algorithms", "217522", ["Analysis of Algorithms", "Linear Structures", "Trees", "Graphs", "Hashing"]],
    ["Object Oriented Programming", "217523", ["Classes & Objects", "Inheritance", "Polymorphism", "STL", "File Handling"]],
    ["Statistics & Probability for AI", "217524", ["Descriptive Statistics", "Probability Distributions", "Sampling", "Hypothesis Testing", "Correlation & Regression"]],
    ["Digital Electronics & Logic Design", "217525", ["Number Systems", "Boolean Algebra", "Combinational Circuits", "Sequential Circuits", "Memory & PLD"]],
  ]),
  ...make(["ai-ds"], 2, 2, [
    ["Linear Algebra for AI", "217531", ["Vector Spaces", "Matrix Decomposition", "Eigenvalues", "SVD & PCA", "Optimization Basics"]],
    ["Database Management Systems", "217532", ["ER Model", "SQL", "Normalization", "Transactions", "NoSQL & Data Lakes"]],
    ["Operating Systems", "217533", ["Processes", "Scheduling", "Synchronization", "Memory Management", "File Systems"]],
    ["Computer Networks", "217534", ["Network Models", "Routing", "Transport Protocols", "Application Layer", "Security Basics"]],
    ["Python for Data Science", "217535", ["Python Basics", "NumPy", "Pandas", "Matplotlib & Seaborn", "Scikit-learn Workflow"]],
  ]),
  ...make(["ai-ds"], 3, 1, [
    ["Machine Learning", "317521", ["Supervised Learning", "Regression", "Classification", "Ensembles", "Model Selection"]],
    ["Artificial Intelligence", "317522", ["Agents & Environments", "Search & Games", "Logic & Knowledge", "Uncertainty", "Planning"]],
    ["Data Visualization", "317523", ["Visual Encoding", "Charts & Dashboards", "Tableau/Power BI", "Storytelling", "Perception Principles"]],
    ["Software Engineering", "317524", ["Agile & Scrum", "Requirements", "Design", "Testing", "DevOps Basics"]],
    ["Theory of Computation", "317525", ["Automata", "Regular Languages", "CFG", "Turing Machines", "Complexity"]],
  ]),
  ...make(["ai-ds"], 3, 2, [
    ["Deep Learning", "317531", ["Neural Networks", "Optimization & Regularization", "CNN", "RNN & Attention", "Transfer Learning"]],
    ["Big Data Analytics", "317532", ["Hadoop Ecosystem", "MapReduce", "Spark", "Streaming Analytics", "NoSQL Stores"]],
    ["Natural Language Processing", "317533", ["Text Preprocessing", "Language Models", "POS & Parsing", "Word Embeddings", "Transformers & BERT"]],
    ["Design & Analysis of Algorithms", "317534", ["Greedy", "Dynamic Programming", "Graph Algorithms", "Approximation", "NP-Hardness"]],
    ["Cloud Computing for Data Science", "317535", ["Cloud Models", "Data Storage Services", "Managed ML Services", "Containers", "Cost & Security"]],
  ]),
  ...make(["ai-ds"], 4, 1, [
    ["Computer Vision", "417521", ["Image Formation", "Filtering & Features", "Segmentation", "CNN for Vision", "Object Detection"]],
    ["Reinforcement Learning", "417522", ["MDP", "Dynamic Programming", "Monte Carlo & TD", "Q-Learning", "Policy Gradient"]],
    ["Data Engineering & Pipelines", "417523", ["ETL vs ELT", "Batch & Stream Pipelines", "Airflow", "Data Quality", "Warehouse Modelling"]],
    ["Information & Cyber Security", "417524", ["Cryptography", "Access Control", "Attacks & Defences", "Privacy in ML", "Governance"]],
    ["MLOps", "417525", ["ML Lifecycle", "Experiment Tracking", "Model Serving", "Monitoring & Drift", "CI/CD for ML"]],
  ]),
  ...make(["ai-ds"], 4, 2, [
    ["Generative AI & Large Language Models", "417531", ["Transformer Architecture", "Pretraining & Fine-tuning", "Prompt Engineering", "RAG", "Evaluation & Safety"]],
    ["Time Series Analytics", "417532", ["Stationarity", "ARIMA", "Seasonality", "Forecast Evaluation", "Deep Learning Forecasting"]],
    ["Robotics & Autonomous Systems", "417533", ["Kinematics", "Sensors & Perception", "Localization & SLAM", "Path Planning", "Control"]],
    ["AI Ethics & Governance", "417534", ["Bias & Fairness", "Explainability", "Privacy & Consent", "Regulation", "Responsible AI Practice"]],
    ["Business Intelligence", "417535", ["BI Architecture", "Data Warehouse", "OLAP", "KPI & Dashboards", "Case Studies"]],
  ]),
];