import { Subject } from "./types";
import { make } from "./catalogHelpers";

/** BCA, BCS, MCA and MCS catalog — every semester, every subject. */
export const compAppCatalog: Subject[] = [
  ...make(["bca"], 1, 1, [
    ["Principles of Programming & Algorithms (C)", "BCA-101", ["Algorithms & Flowcharts", "Data Types & Operators", "Control Structures", "Functions", "Arrays & Strings"]],
    ["Computer Fundamentals & Office Automation", "BCA-102", ["Computer Organization", "Input/Output Devices", "Operating Environments", "Word & Spreadsheet", "Presentation Tools"]],
    ["Discrete Mathematics", "BCA-103", ["Set Theory", "Logic", "Relations & Functions", "Graph Theory", "Counting Principles"]],
    ["Business Communication", "BCA-104", ["Communication Process", "Business Correspondence", "Report Writing", "Presentation Skills", "Group Discussion & Interview"]],
    ["Principles of Management", "BCA-105", ["Management Functions", "Planning & Organizing", "Staffing & Directing", "Controlling", "Modern Management Practices"]],
  ]),
  ...make(["bca"], 1, 2, [
    ["Data Structures using C", "BCA-201", ["Arrays & Pointers", "Linked Lists", "Stacks & Queues", "Trees", "Searching & Sorting"]],
    ["Relational Database Management System", "BCA-202", ["Data Models", "ER Diagrams", "Relational Algebra", "SQL Queries", "Normalization"]],
    ["Operating Systems", "BCA-203", ["OS Functions", "Process Management", "CPU Scheduling", "Memory Management", "File Systems"]],
    ["Statistics for Computer Science", "BCA-204", ["Measures of Central Tendency", "Dispersion", "Correlation & Regression", "Probability", "Testing of Hypothesis"]],
    ["Web Design (HTML & CSS)", "BCA-205", ["HTML5 Structure", "Forms & Tables", "CSS3 Styling", "Responsive Design", "Accessibility & SEO Basics"]],
  ]),
  ...make(["bca"], 2, 1, [
    ["Object Oriented Programming with C++", "BCA-301", ["Classes & Objects", "Constructors", "Inheritance", "Polymorphism & Virtual Functions", "Templates & Files"]],
    ["Software Engineering", "BCA-302", ["SDLC Models", "Requirement Analysis", "Design Concepts", "Testing Strategies", "Maintenance & CASE Tools"]],
    ["Computer Networks", "BCA-303", ["Network Topologies", "OSI & TCP/IP", "IP Addressing", "Routing Basics", "Network Devices & Security"]],
    ["Data Structures & Algorithms", "BCA-304", ["Complexity Analysis", "Recursion", "Graphs", "Hashing", "Algorithm Design Techniques"]],
    ["Financial Accounting", "BCA-305", ["Accounting Principles", "Journal & Ledger", "Trial Balance", "Final Accounts", "Computerized Accounting"]],
  ]),
  ...make(["bca"], 2, 2, [
    ["Java Programming", "BCA-401", ["Java Basics & JVM", "Classes & Interfaces", "Exception Handling", "Collections", "Multithreading"]],
    ["DBMS with SQL & PL/SQL", "BCA-402", ["Advanced SQL", "Joins & Subqueries", "PL/SQL Blocks", "Cursors & Triggers", "Transactions"]],
    ["Advanced Web Technology (JavaScript)", "BCA-403", ["JavaScript Fundamentals", "DOM Manipulation", "Events & Validation", "AJAX & JSON", "Frameworks Overview"]],
    ["Computer Graphics", "BCA-404", ["Graphics Primitives", "Line & Circle Drawing", "2D Transformations", "Clipping", "Animation Basics"]],
    ["Cyber Security Basics", "BCA-405", ["Security Threats", "Malware & Attacks", "Cryptography Basics", "Safe Practices", "Cyber Laws in India"]],
  ]),
  ...make(["bca"], 3, 1, [
    ["Python Programming", "BCA-501", ["Python Basics", "Data Structures in Python", "Functions & Modules", "OOP in Python", "File & Exception Handling"]],
    ["Software Testing", "BCA-502", ["Testing Fundamentals", "Black Box Techniques", "White Box Techniques", "Levels of Testing", "Automation Tools"]],
    ["Mobile Application Development (Android)", "BCA-503", ["Android Architecture", "Activities & Intents", "UI Layouts", "Data Storage & SQLite", "Publishing Apps"]],
    ["Data Warehousing & Data Mining", "BCA-504", ["Warehouse Architecture", "OLAP", "Association Rules", "Classification", "Clustering"]],
    ["Advanced Java", "BCA-505", ["JDBC", "Servlets", "JSP", "Frameworks Basics", "Web Application Deployment"]],
  ]),
  ...make(["bca"], 3, 2, [
    ["Cloud Computing", "BCA-601", ["Cloud Models", "Virtualization", "Cloud Storage", "Cloud Providers", "Security & SLA"]],
    [".NET Framework & C#", "BCA-602", ["CLR & .NET Architecture", "C# Language Basics", "OOP in C#", "ADO.NET", "ASP.NET Basics"]],
    ["AI & Machine Learning Basics", "BCA-603", ["AI Fundamentals", "Search Techniques", "Supervised Learning", "Unsupervised Learning", "Applications"]],
    ["Internet of Things", "BCA-604", ["IoT Architecture", "Sensors & Boards", "Communication Protocols", "Cloud Integration", "Applications"]],
    ["PHP & MySQL", "BCA-605", ["PHP Basics", "Forms & Sessions", "MySQL Integration", "CRUD Applications", "Security Practices"]],
  ]),

  ...make(["bcs"], 1, 1, [
    ["Problem Solving using C", "CS-101", ["Algorithm Development", "Operators & Expressions", "Decision & Loops", "Functions", "Arrays"]],
    ["Digital Electronics", "CS-102", ["Number Systems", "Boolean Algebra", "Combinational Circuits", "Flip-Flops", "Counters"]],
    ["Discrete Mathematics", "CS-103", ["Sets & Logic", "Relations", "Functions", "Graphs & Trees", "Recurrence Relations"]],
    ["Statistics I", "CS-104", ["Data Presentation", "Central Tendency", "Dispersion", "Probability", "Distributions"]],
    ["Principles of Electronics", "CS-105", ["Semiconductors", "Diodes & Rectifiers", "Transistors", "Amplifiers", "Op-Amps"]],
  ]),
  ...make(["bcs"], 1, 2, [
    ["Advanced C Programming", "CS-201", ["Pointers", "Structures & Unions", "Dynamic Memory", "File Handling", "Preprocessor"]],
    ["Data Structures", "CS-202", ["Linear Lists", "Stacks & Queues", "Linked Lists", "Trees", "Sorting & Searching"]],
    ["Relational Database Concepts", "CS-203", ["Database Concepts", "ER Model", "Relational Model", "SQL", "Normalization"]],
    ["Computer Organization", "CS-204", ["CPU Structure", "Instruction Cycle", "Addressing Modes", "Memory Hierarchy", "I/O Organization"]],
    ["Statistics II", "CS-205", ["Sampling Theory", "Estimation", "Hypothesis Testing", "Chi-Square & ANOVA", "Non-parametric Tests"]],
  ]),
  ...make(["bcs"], 2, 1, [
    ["Object Oriented Programming with C++", "CS-301", ["Classes & Objects", "Operator Overloading", "Inheritance", "Virtual Functions", "Templates"]],
    ["Software Engineering", "CS-302", ["Process Models", "Requirements Engineering", "Design", "Testing", "Project Management"]],
    ["Operating Systems", "CS-303", ["Process Management", "Scheduling", "Synchronization", "Memory Management", "Disk & File Management"]],
    ["Data Structures & Algorithms", "CS-304", ["Algorithm Analysis", "Graph Algorithms", "Hashing", "Greedy & DP", "Advanced Trees"]],
    ["Numerical Techniques", "CS-305", ["Errors", "Solution of Equations", "Interpolation", "Numerical Integration", "ODE Methods"]],
  ]),
  ...make(["bcs"], 2, 2, [
    ["Java Programming", "CS-401", ["Java Basics", "OOP in Java", "Exception Handling", "Collections & Generics", "Threads"]],
    ["DBMS & SQL", "CS-402", ["Advanced SQL", "PL/SQL", "Indexing", "Transactions & Concurrency", "Backup & Recovery"]],
    ["Computer Networks", "CS-403", ["Layered Models", "Data Link Protocols", "Network Layer", "Transport Layer", "Application Layer"]],
    ["Automata Theory", "CS-404", ["Finite Automata", "Regular Languages", "Context Free Grammar", "Pushdown Automata", "Turing Machines"]],
    ["Web Technology", "CS-405", ["HTML & CSS", "JavaScript", "Server Side Scripting", "XML & JSON", "Web Services"]],
  ]),
  ...make(["bcs"], 3, 1, [
    ["Python Programming", "CS-501", ["Core Python", "Collections", "OOP", "Modules & Packages", "Data Analysis Libraries"]],
    ["Design & Analysis of Algorithms", "CS-502", ["Asymptotic Notation", "Divide & Conquer", "Greedy", "Dynamic Programming", "NP-Completeness"]],
    ["Advanced Java", "CS-503", ["JDBC", "Servlets & JSP", "MVC Pattern", "Frameworks", "Deployment"]],
    ["Data Mining", "CS-504", ["Preprocessing", "Association Mining", "Classification", "Clustering", "Evaluation"]],
    ["Compiler Construction", "CS-505", ["Lexical Analysis", "Syntax Analysis", "Semantic Analysis", "Code Generation", "Optimization"]],
  ]),
  ...make(["bcs"], 3, 2, [
    ["Machine Learning", "CS-601", ["Learning Paradigms", "Regression", "Classification", "Clustering", "Model Evaluation"]],
    ["Cloud Computing", "CS-602", ["Cloud Architecture", "Virtualization", "Service Models", "Containers", "Security"]],
    ["Information Security", "CS-603", ["Security Principles", "Cryptography", "Authentication", "Network Security", "Cyber Laws"]],
    ["Mobile Computing", "CS-604", ["Wireless Basics", "Mobile Networks", "Mobile IP & TCP", "Android Basics", "Security"]],
    ["Big Data Analytics", "CS-605", ["Big Data Concepts", "Hadoop & HDFS", "MapReduce", "Hive & Pig", "Spark"]],
  ]),

  ...make(["mca"], 1, 1, [
    ["Problem Solving & Programming in C", "MCA-101", ["Algorithms", "Control Structures", "Functions & Recursion", "Pointers", "Files"]],
    ["Discrete Mathematics", "MCA-102", ["Logic & Proofs", "Set Theory", "Relations & Functions", "Graph Theory", "Algebraic Structures"]],
    ["Database Management Systems", "MCA-103", ["Data Models", "SQL", "Normalization", "Transactions", "Distributed Databases"]],
    ["Operating Systems", "MCA-104", ["Process Management", "Scheduling Algorithms", "Deadlock", "Memory Management", "File & I/O Systems"]],
    ["Computer Organization & Architecture", "MCA-105", ["Digital Logic", "CPU Design", "Pipelining", "Memory Hierarchy", "Parallel Architectures"]],
  ]),
  ...make(["mca"], 1, 2, [
    ["Object Oriented Programming with Java", "MCA-201", ["Java Fundamentals", "Inheritance & Interfaces", "Exception Handling", "Collections", "Concurrency"]],
    ["Data Structures & Algorithms", "MCA-202", ["Linear Structures", "Trees & Heaps", "Graphs", "Hashing", "Algorithm Techniques"]],
    ["Computer Networks", "MCA-203", ["Reference Models", "Data Link Layer", "Routing Protocols", "TCP/UDP", "Network Security"]],
    ["Software Engineering", "MCA-204", ["Process Models & Agile", "Requirements", "Architecture & Design", "Testing", "Quality & Metrics"]],
    ["Web Technologies", "MCA-205", ["HTML5 & CSS3", "JavaScript & DOM", "Server Side Frameworks", "REST APIs", "Security & Deployment"]],
  ]),
  ...make(["mca"], 2, 1, [
    ["Design & Analysis of Algorithms", "MCA-301", ["Complexity Analysis", "Divide & Conquer", "Greedy & DP", "Graph Algorithms", "NP-Completeness"]],
    ["Machine Learning", "MCA-302", ["Supervised Learning", "Unsupervised Learning", "Neural Networks", "Ensemble Methods", "Evaluation"]],
    ["Cloud Computing", "MCA-303", ["Cloud Models", "Virtualization", "Cloud Storage & Databases", "Containers & Kubernetes", "Cloud Security"]],
    ["Advanced Database Systems", "MCA-304", ["Query Optimization", "Distributed Databases", "NoSQL", "Data Warehousing", "Big Data Stores"]],
    ["Information & Cyber Security", "MCA-305", ["Cryptography", "Authentication & Access Control", "Web Security", "Forensics", "Compliance"]],
  ]),
  ...make(["mca"], 2, 2, [
    ["Big Data Analytics", "MCA-401", ["Big Data Landscape", "Hadoop Ecosystem", "MapReduce", "Spark", "Streaming Analytics"]],
    ["Deep Learning", "MCA-402", ["Neural Network Training", "CNN", "RNN & LSTM", "Attention & Transformers", "Generative Models"]],
    ["DevOps & Microservices", "MCA-403", ["DevOps Practices", "CI/CD Pipelines", "Docker", "Kubernetes", "Microservice Patterns"]],
    ["Blockchain Technology", "MCA-404", ["Distributed Ledgers", "Consensus", "Smart Contracts", "Enterprise Blockchain", "Applications"]],
    ["IT Project Management", "MCA-405", ["Project Life Cycle", "Estimation & Scheduling", "Risk Management", "Agile Delivery", "Quality & Closure"]],
  ]),

  ...make(["mcs"], 1, 1, [
    ["Principles of Programming Languages", "MCS-101", ["Language Paradigms", "Syntax & Semantics", "Type Systems", "Control & Data Abstraction", "Functional Programming"]],
    ["Advanced Operating Systems", "MCS-102", ["Process & Thread Models", "Advanced Scheduling", "Distributed OS Concepts", "Virtualization", "Security"]],
    ["Design & Analysis of Algorithms", "MCS-103", ["Advanced Analysis", "Greedy & DP", "Graph Algorithms", "Randomized Algorithms", "Approximation & NP"]],
    ["Digital Image Processing", "MCS-104", ["Image Fundamentals", "Enhancement", "Restoration", "Compression", "Morphology & Segmentation"]],
    ["Advanced DBMS", "MCS-105", ["Query Processing", "Concurrency & Recovery", "Distributed Databases", "Object & NoSQL Databases", "Data Warehousing"]],
  ]),
  ...make(["mcs"], 1, 2, [
    ["Distributed Systems", "MCS-201", ["Architectures", "Interprocess Communication", "Clock Synchronization", "Consistency & Replication", "Fault Tolerance"]],
    ["Machine Learning", "MCS-202", ["Statistical Learning", "Kernel Methods", "Probabilistic Models", "Ensembles", "Model Selection"]],
    ["Advanced Computer Networks", "MCS-203", ["Advanced Routing", "QoS", "MPLS & SDN", "Wireless & Mobile Networks", "Network Measurement"]],
    ["Software Architecture", "MCS-204", ["Architectural Styles", "Quality Attributes", "Design Patterns", "Documentation Views", "Evaluation Methods"]],
    ["Data Mining & Warehousing", "MCS-205", ["Preprocessing", "Warehouse Design & OLAP", "Association Rules", "Classification", "Cluster Analysis"]],
  ]),
  ...make(["mcs"], 2, 1, [
    ["Deep Learning", "MCS-301", ["Optimization for DL", "CNN Architectures", "Sequence Models", "Attention & Transformers", "Regularization"]],
    ["Cloud & Edge Computing", "MCS-302", ["Cloud Service Models", "Serverless", "Edge & Fog Architectures", "Orchestration", "Performance & Security"]],
    ["Natural Language Processing", "MCS-303", ["Text Processing", "Language Models", "Syntax & Semantics", "Embeddings", "Applications"]],
    ["Information Security & Cryptography", "MCS-304", ["Symmetric Cryptography", "Public Key Systems", "Protocols & PKI", "Attacks", "Security Management"]],
    ["Research Methodology", "MCS-305", ["Research Problem", "Literature Review", "Research Design", "Data Analysis", "Publication Ethics"]],
  ]),
  ...make(["mcs"], 2, 2, [
    ["Generative AI & Large Language Models", "MCS-401", ["Transformer Internals", "Pretraining & Fine-tuning", "Prompting", "RAG Systems", "Evaluation & Safety"]],
    ["Big Data Technologies", "MCS-402", ["Distributed Storage", "Batch Processing", "Stream Processing", "NoSQL Systems", "Data Governance"]],
    ["Computer Vision", "MCS-403", ["Image Features", "Camera Models", "Deep Vision Models", "Detection & Segmentation", "3D Vision"]],
    ["Quantum Computing Basics", "MCS-404", ["Qubits & Gates", "Quantum Circuits", "Algorithms (Deutsch, Grover, Shor)", "Error Correction", "Platforms"]],
    ["IoT & Cyber Physical Systems", "MCS-405", ["IoT Architecture", "Sensing & Actuation", "Protocols", "CPS Modelling", "Security & Privacy"]],
  ]),
];