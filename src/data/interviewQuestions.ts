export interface InterviewQuestion {
  q: string;
  a: string;
  tag: "behavioral" | "technical" | "situational" | "hr";
}

export interface RoleBank {
  id: string;
  label: string;
  icon: string;
  description: string;
  questions: InterviewQuestion[];
}

export const interviewRoles: RoleBank[] = [
  {
    id: "software-engineer",
    label: "Software Engineer",
    icon: "💻",
    description: "Full-stack, backend & frontend engineering roles",
    questions: [
      { tag: "technical", q: "Explain the difference between REST and GraphQL.", a: "REST exposes fixed endpoints returning predefined resources; GraphQL exposes a single endpoint where the client requests exactly the fields it needs. REST is simpler and cache-friendly; GraphQL avoids over/under-fetching and is great for complex, nested data." },
      { tag: "technical", q: "What is the time complexity of common data structures (array, hash map, BST)?", a: "Array: O(1) access, O(n) search/insert. Hash map: O(1) avg lookup/insert. Balanced BST: O(log n) search/insert/delete." },
      { tag: "technical", q: "How does the event loop work in Node.js?", a: "Node uses a single-threaded event loop. Async I/O is offloaded to libuv's thread pool; callbacks are queued (timers, I/O, microtasks) and executed once the call stack is empty. Microtasks (Promises) run before the next macrotask." },
      { tag: "behavioral", q: "Tell me about a challenging bug you fixed.", a: "Use STAR: describe the Situation, the Task, the debugging Actions (logs, bisect, reproducing), and the Result (root cause, fix, prevention like tests or monitoring)." },
      { tag: "situational", q: "How would you design a URL shortener?", a: "Discuss requirements (scale, custom aliases, analytics), a key-generation strategy (base62 of an auto-inc ID or hash), storage (KV or SQL), caching hot links, and redirect via 301/302." },
      { tag: "hr", q: "Why do you want to join our company?", a: "Tie 2-3 specifics about the company (product, tech, mission) to your goals and past work. Avoid generic praise." },
    ],
  },
  {
    id: "data-analyst",
    label: "Data Analyst",
    icon: "📊",
    description: "SQL, analytics, BI & reporting roles",
    questions: [
      { tag: "technical", q: "Difference between INNER JOIN and LEFT JOIN?", a: "INNER JOIN returns rows matching in both tables. LEFT JOIN returns all rows from the left table, with NULLs where the right table has no match." },
      { tag: "technical", q: "How do you handle missing data?", a: "First understand why it's missing (MCAR, MAR, MNAR). Options: drop rows/columns, impute (mean/median/mode, model-based), or flag with an indicator variable. Choice depends on % missing and downstream use." },
      { tag: "technical", q: "Explain a window function.", a: "A window function computes a value across a set of rows related to the current row without collapsing them (e.g., ROW_NUMBER(), RANK(), SUM() OVER (PARTITION BY ...))." },
      { tag: "behavioral", q: "Describe a dashboard you built that drove a decision.", a: "Use STAR — stakeholder, metric, the insight surfaced, and the business action taken." },
      { tag: "situational", q: "Sales dropped 20% last week — how do you investigate?", a: "Segment by dimension (region, product, channel), compare vs. prior periods, check for data pipeline issues, then form and test hypotheses." },
      { tag: "hr", q: "What's your strongest analytical skill?", a: "Pick one (SQL / statistics / storytelling) and back it with a concrete result." },
    ],
  },
  {
    id: "java-developer",
    label: "Java Developer",
    icon: "☕",
    description: "Backend Java, Spring Boot & microservices",
    questions: [
      { tag: "technical", q: "Difference between ArrayList and LinkedList?", a: "ArrayList uses a dynamic array — O(1) random access, O(n) insert in middle. LinkedList is a doubly-linked list — O(1) insert/remove given a node, O(n) access." },
      { tag: "technical", q: "Explain Spring Boot auto-configuration.", a: "Spring Boot scans the classpath and applies `@Configuration` classes conditionally (`@ConditionalOnClass`, `@ConditionalOnMissingBean`) to wire beans automatically, reducing boilerplate." },
      { tag: "technical", q: "What is the JVM Garbage Collector?", a: "It reclaims memory from unreachable objects. Modern JVMs use generational collectors (Young/Old) with algorithms like G1, ZGC, Shenandoah." },
      { tag: "technical", q: "Checked vs unchecked exceptions?", a: "Checked (extend Exception) must be declared or caught; unchecked (extend RuntimeException) do not. Use checked for recoverable conditions and unchecked for programming errors." },
      { tag: "behavioral", q: "Describe a performance issue you resolved in a Java app.", a: "STAR — the symptom (latency/OOM), profiling tools used (JFR, VisualVM), the fix (query, cache, GC tune), and measured impact." },
      { tag: "hr", q: "How do you keep your Java skills current?", a: "Mention JEPs you follow, side projects, blogs, or contributions." },
    ],
  },
  {
    id: "teacher",
    label: "Teacher",
    icon: "🎓",
    description: "School & higher-education teaching roles",
    questions: [
      { tag: "behavioral", q: "How do you handle a disruptive student?", a: "Stay calm, address privately when possible, understand the cause, set clear expectations, involve parents/counselors if needed. Emphasize consistency and empathy." },
      { tag: "situational", q: "Students score poorly on a test — what do you do?", a: "Review the assessment for fairness, identify concept gaps, re-teach with alternative methods, offer targeted practice, and reassess." },
      { tag: "behavioral", q: "How do you engage students of different learning styles?", a: "Combine visual, auditory, and kinesthetic methods; use group work, real-world examples, and differentiated tasks." },
      { tag: "hr", q: "Why teaching?", a: "Share a genuine story — an inspiring teacher, joy of seeing students grow, subject passion." },
      { tag: "situational", q: "A parent disagrees with a grade — how do you respond?", a: "Listen respectfully, show the rubric and evidence, focus on the student's growth, and agree on next steps." },
      { tag: "behavioral", q: "Describe your classroom management style.", a: "Clear rules co-created with students, positive reinforcement, consistent consequences, and strong relationships." },
    ],
  },
  {
    id: "mba",
    label: "MBA Graduate",
    icon: "🎯",
    description: "Consulting, product & general management roles",
    questions: [
      { tag: "behavioral", q: "Tell me about a time you led a team.", a: "STAR — the team, your role, the challenge, decisions you made, and the measurable outcome." },
      { tag: "situational", q: "How would you enter a new market?", a: "Assess market size & growth, competition, customer segments, regulatory landscape, then choose an entry mode (organic, partnership, acquisition) with a phased plan." },
      { tag: "situational", q: "A client's profits are falling. Walk me through your approach.", a: "Profit = Revenue - Cost. Segment revenue (price × volume by product/region) and cost (fixed/variable), isolate the driver, root-cause with data, then recommend." },
      { tag: "hr", q: "Where do you see yourself in 5 years?", a: "Tie ambitions to the role's trajectory — a concrete leadership goal with the skills you'll build getting there." },
      { tag: "behavioral", q: "Describe a time you disagreed with your manager.", a: "STAR — disagreement, respectful discussion with data, outcome, and what you learned." },
      { tag: "situational", q: "How do you prioritize when everything is urgent?", a: "Impact × urgency matrix, align with stakeholders, communicate trade-offs early, and revisit as facts change." },
    ],
  },
  {
    id: "doctor",
    label: "Doctor / Medical",
    icon: "🩺",
    description: "Residency, hospital & clinical roles",
    questions: [
      { tag: "behavioral", q: "Why did you choose medicine?", a: "A personal, honest story tying values (service, science, patient care) to a defining moment." },
      { tag: "situational", q: "How do you handle a patient who refuses treatment?", a: "Ensure informed consent, explore concerns, provide education, respect autonomy, document, and involve ethics if needed." },
      { tag: "behavioral", q: "Describe a difficult case and what you learned.", a: "STAR — presentation, diagnostic reasoning, team collaboration, outcome, and the lesson you applied afterward." },
      { tag: "situational", q: "How do you deliver bad news to a family?", a: "SPIKES protocol — Setting, Perception, Invitation, Knowledge, Empathy, Strategy/Summary." },
      { tag: "hr", q: "Why this specialty / this hospital?", a: "Connect your clinical interests and career goals to the program's strengths (mentors, cases, research)." },
      { tag: "behavioral", q: "How do you handle burnout?", a: "Discuss boundaries, peer support, sleep/exercise, and knowing when to seek help — model good self-care." },
    ],
  },
  {
    id: "advocate",
    label: "Advocate / Lawyer",
    icon: "⚖️",
    description: "Litigation, corporate & legal advisory roles",
    questions: [
      { tag: "behavioral", q: "Why did you choose law?", a: "Personal story tied to justice, advocacy, or problem-solving." },
      { tag: "situational", q: "How do you approach a client whose case has weak merits?", a: "Give an honest assessment, explain risks and options (settlement, alternate remedies), and let the client make an informed choice." },
      { tag: "technical", q: "Explain the difference between civil and criminal law.", a: "Civil resolves private disputes with remedies like damages/injunctions (preponderance of evidence). Criminal is state vs. accused for violations of law, with punishment on proof beyond reasonable doubt." },
      { tag: "behavioral", q: "Describe a case you won against tough odds.", a: "STAR — facts, strategy, key argument or precedent used, outcome." },
      { tag: "situational", q: "You spot an ethical issue with your senior's approach — what do you do?", a: "Raise it privately, cite the bar rule, propose an alternative, and escalate if unresolved." },
      { tag: "hr", q: "Litigation or corporate — why?", a: "Tie temperament and strengths (courtcraft vs. drafting/negotiation) to your career vision." },
    ],
  },
  {
    id: "fresher",
    label: "Fresher / Entry-level",
    icon: "🌱",
    description: "College graduates & first-time job seekers",
    questions: [
      { tag: "hr", q: "Tell me about yourself.", a: "60-90 second pitch: background → key projects/skills → why this role. Skip biography." },
      { tag: "hr", q: "Why should we hire you?", a: "Match 2-3 role requirements to your projects, internships, or coursework with a concrete example each." },
      { tag: "behavioral", q: "What's your biggest achievement so far?", a: "Pick something with measurable impact — a project, competition, leadership role — and quantify the outcome." },
      { tag: "hr", q: "What are your strengths and weaknesses?", a: "Strength: role-relevant, with proof. Weakness: real but improving, with a concrete step you're taking." },
      { tag: "situational", q: "How do you handle tight deadlines?", a: "Prioritize, break work into chunks, communicate early, ask for help when blocked." },
      { tag: "hr", q: "Where do you see yourself in 3 years?", a: "Show ambition aligned with the company's growth path — becoming a strong IC, then a mentor/lead." },
    ],
  },
  {
    id: "graphic-designer",
    label: "Graphic Designer",
    icon: "🎨",
    description: "Visual design, branding & digital creative roles",
    questions: [
      { tag: "behavioral", q: "Walk me through your design process.", a: "Brief → research → sketches → concepts → iteration with feedback → final delivery with specs. Emphasize research and iteration." },
      { tag: "situational", q: "A client rejects all your concepts — what next?", a: "Reopen the brief, ask clarifying questions, share references to align, and iterate. Stay solution-focused." },
      { tag: "technical", q: "Explain the difference between vector and raster.", a: "Vector uses math paths — infinitely scalable (SVG, AI). Raster uses pixels — resolution-dependent (JPG, PNG). Use vector for logos/icons, raster for photos." },
      { tag: "behavioral", q: "Describe your favorite project in your portfolio.", a: "Problem → your role → design decisions and why → result. Show craft and thinking." },
      { tag: "hr", q: "How do you keep your design skills fresh?", a: "Mention specific inspiration sources (Awwwards, Dribbble, books), personal projects, and tools you're learning." },
      { tag: "situational", q: "How do you handle conflicting feedback from multiple stakeholders?", a: "Consolidate feedback, identify conflicts, run a single alignment meeting, tie decisions back to the brief and user goals." },
    ],
  },
  {
    id: "accountant",
    label: "Accountant",
    icon: "📈",
    description: "Bookkeeping, audit, tax & finance roles",
    questions: [
      { tag: "technical", q: "Difference between accounts payable and accounts receivable?", a: "AP is money the business owes to suppliers (a liability). AR is money owed to the business by customers (an asset)." },
      { tag: "technical", q: "Explain the three financial statements and how they connect.", a: "Income Statement (profitability) → Net income flows to Retained Earnings on the Balance Sheet. Cash Flow Statement reconciles net income to cash and ties to the cash line on the Balance Sheet." },
      { tag: "technical", q: "What is accrual accounting?", a: "Revenue and expenses are recognized when earned/incurred, not when cash changes hands. It matches income to the period it relates to." },
      { tag: "behavioral", q: "Describe a time you caught a material error.", a: "STAR — what you spotted, how you investigated, the correction, and the control you added to prevent recurrence." },
      { tag: "situational", q: "How do you handle a tight audit deadline?", a: "Plan the workpapers, request PBC list early, escalate blockers, and communicate status daily." },
      { tag: "hr", q: "Which accounting standards are you most comfortable with?", a: "Mention specifics (IFRS, US GAAP, Ind AS) and cite a recent standard you've applied." },
    ],
  },
];

export const questionTagColors: Record<InterviewQuestion["tag"], string> = {
  behavioral: "bg-primary/10 text-primary border-primary/20",
  technical: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  situational: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  hr: "bg-orange-500/10 text-orange-600 border-orange-500/20",
};