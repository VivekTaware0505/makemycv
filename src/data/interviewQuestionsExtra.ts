import type { InterviewQuestion } from "./interviewQuestions";

// Extra richly-detailed questions with long-form explanations and actionable tips.
// These are appended to each role's base bank at runtime.
export const extraQuestionsByRole: Record<string, InterviewQuestion[]> = {
  "software-engineer": [
    {
      tag: "technical",
      q: "How would you design a scalable chat application like WhatsApp?",
      a: "Discuss real-time transport (WebSockets), fan-out strategy, message storage, delivery/read receipts, offline queueing, and horizontal scaling with a pub/sub layer.",
      detailedAnswer:
        "Start with functional requirements: 1-1 chat, groups, media, read receipts, presence, offline delivery. Non-functional: low latency (<200ms), 99.99% uptime, end-to-end encryption. Use WebSocket (or MQTT) for persistent connections behind a load balancer with sticky sessions or a connection registry (Redis) mapping userId → server. Messages hit a stateless API → published to Kafka → consumed by a fan-out worker that writes to a per-recipient inbox in Cassandra (write-heavy, wide-column). Presence uses ephemeral Redis TTL keys. Media goes to S3 with pre-signed URLs. For groups >200, use a fan-out-on-read model to avoid write amplification. Add push notifications (APNs/FCM) for offline users. Encrypt with the Signal protocol per device.",
      tips: [
        "Always clarify scale first (DAU, msgs/sec, message size) before choosing tech.",
        "Mention trade-offs — fan-out-on-write vs fan-out-on-read is a classic discussion.",
        "Draw a boxes-and-arrows diagram; interviewers grade structure, not memorized stacks.",
        "End with observability: metrics, tracing, and a rollout plan.",
      ],
    },
    {
      tag: "technical",
      q: "Explain SOLID principles with an example.",
      a: "SOLID = Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion — five OO design principles for maintainable code.",
      detailedAnswer:
        "S — a class should have one reason to change (a `UserService` shouldn't also send emails). O — open for extension, closed for modification (add new payment types via a `PaymentStrategy` interface, not by editing a switch). L — subclasses must be substitutable (a `Square extends Rectangle` that breaks `setWidth` violates LSP). I — prefer many small interfaces (`Readable`, `Writable`) over one fat one. D — depend on abstractions, not concretes (inject a `Repository` interface, not `PostgresRepo`). Together they reduce coupling and make testing/refactoring safe.",
      tips: [
        "Prepare ONE code example you can walk through — vague theory answers score low.",
        "Connect each principle to a real bug it prevents.",
        "Mention that over-applying SOLID leads to over-engineering; balance matters.",
      ],
    },
    {
      tag: "behavioral",
      q: "Tell me about a time you disagreed with a technical decision.",
      a: "Use STAR: describe the decision, your concern with data, how you raised it respectfully, and the outcome — including committing to the decision if overruled.",
      detailedAnswer:
        "Example: 'Our team chose MongoDB for a strongly-relational billing module. I built a small proof showing JOIN-heavy queries were 8x slower and harder to maintain. I shared the benchmark in a design doc, invited the tech lead to review, and proposed Postgres with a phased migration. Two engineers agreed; we adopted Postgres for billing and kept Mongo for the event log. Key lesson: disagreement backed by data + a written proposal changes minds; disagreement in a Slack thread rarely does.'",
      tips: [
        "Never bad-mouth colleagues or previous employers.",
        "Show you can disagree AND commit — interviewers screen for both.",
        "Quantify impact (latency, cost, hours saved) whenever possible.",
      ],
    },
    {
      tag: "technical",
      q: "What happens when you type a URL and press Enter?",
      a: "DNS lookup → TCP + TLS handshake → HTTP request → server processes → response → browser parses HTML, fetches sub-resources, builds DOM/CSSOM, runs JS, and paints.",
      detailedAnswer:
        "1) Browser checks caches (HSTS, DNS, HTTP) then resolves the domain via DNS (recursive → root → TLD → authoritative). 2) TCP 3-way handshake on port 443, then TLS 1.3 handshake (ClientHello, cert verify, key exchange). 3) HTTP/2 or /3 request sent with headers/cookies. 4) Server (through CDN → LB → app → DB) returns response. 5) Browser parses HTML into DOM, discovers CSS/JS/images and fetches them (render-blocking CSS, async/defer JS). 6) CSSOM + DOM → render tree → layout → paint → composite. Mention Critical Rendering Path, TTFB, and Core Web Vitals to score bonus points.",
      tips: [
        "Cover every layer — network, browser, rendering — even briefly.",
        "Drop 2-3 modern terms (HTTP/3, TLS 1.3, LCP) to show currency.",
        "Interviewers may drill on any step; know each well enough for a follow-up.",
      ],
    },
  ],
  "data-analyst": [
    {
      tag: "technical",
      q: "Write a SQL query to find the second-highest salary in each department.",
      a: "Use a window function: `ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary DESC)` and filter where the row number equals 2.",
      detailedAnswer:
        "```sql\nSELECT dept, employee, salary\nFROM (\n  SELECT dept, employee, salary,\n         DENSE_RANK() OVER (PARTITION BY dept ORDER BY salary DESC) AS rnk\n  FROM employees\n) t\nWHERE rnk = 2;\n```\nUse `DENSE_RANK` (not `ROW_NUMBER`) if ties should share a rank. If two people tie for #1, `DENSE_RANK` correctly returns the next distinct salary as #2. For truly distinct results per department when duplicates exist, add `DISTINCT` on `(dept, salary)` inside the subquery.",
      tips: [
        "Ask about ties before writing — clarifies `RANK` vs `DENSE_RANK` vs `ROW_NUMBER`.",
        "Explain your subquery out loud; verbalize the partition and order.",
        "Mention edge cases: departments with fewer than 2 employees return nothing.",
      ],
    },
    {
      tag: "situational",
      q: "How would you measure the success of a new product feature?",
      a: "Define the north-star metric tied to the feature's goal, pick guardrail metrics, run an A/B test, and analyze both quantitative uplift and qualitative feedback.",
      detailedAnswer:
        "1) Clarify the goal (engagement? retention? revenue?). 2) Pick a primary metric (e.g., D7 retention) and 2-3 guardrails (crash rate, latency, churn). 3) Ensure baseline & sample size via power analysis. 4) Randomize at the user (not session) level. 5) Run A/B for at least a full weekly cycle. 6) Analyze with a two-sample t-test or CUPED; segment by cohort, platform, geo. 7) Beyond stats, gather NPS/interviews to understand *why*. 8) Decide: ship, iterate, or kill — and document the learning.",
      tips: [
        "Never lead with 'DAU went up' — always frame around user problem + metric.",
        "Bring up novelty effects and Simpson's paradox to demonstrate rigor.",
        "Mention leading vs lagging indicators.",
      ],
    },
    {
      tag: "technical",
      q: "Explain a CTE vs a subquery. When would you use each?",
      a: "Both scope intermediate results. CTEs (WITH) improve readability, allow recursion, and can be referenced multiple times; subqueries are inline and often better for one-off filters.",
      detailedAnswer:
        "A subquery is an expression embedded inside another query — great for a single `WHERE`/`SELECT` calculation. A CTE (`WITH cte AS (...)`) defines a named temporary result set usable multiple times in the same statement, making complex logic readable. Recursive CTEs handle hierarchies (org charts, category trees). Performance-wise, most modern optimizers inline CTEs like subqueries, but Postgres <12 materialized them (a common gotcha). Prefer CTEs when: (a) logic is reused, (b) recursion is needed, (c) query > 30 lines. Prefer subqueries for a single scalar or EXISTS check.",
      tips: [
        "Mention `WITH RECURSIVE` — it's a differentiator.",
        "Discuss readability + optimizer behavior, not just syntax.",
        "Know your dialect (Postgres/MySQL/BigQuery differ).",
      ],
    },
  ],
  "java-developer": [
    {
      tag: "technical",
      q: "Explain the differences between HashMap, LinkedHashMap, and TreeMap.",
      a: "HashMap = unordered O(1) avg. LinkedHashMap = insertion/access order O(1). TreeMap = sorted by key using a Red-Black tree, O(log n).",
      detailedAnswer:
        "HashMap uses a hash table with buckets; since Java 8, long chains convert to a balanced tree, keeping worst case O(log n). Order is undefined and can change on resize. LinkedHashMap extends HashMap with a doubly-linked list across entries — preserves insertion order (or access order for LRU caches via `accessOrder=true`). TreeMap implements NavigableMap with a Red-Black tree, giving sorted iteration and `firstKey`/`floorKey`/`ceilingKey` at O(log n). Choose: HashMap for speed, LinkedHashMap when order matters (caches, predictable iteration), TreeMap for range queries or sorted output.",
      tips: [
        "Mention Java 8 treeification — shows depth.",
        "Give a concrete use case for each (LRU cache = LinkedHashMap).",
        "Know thread-safe variants: ConcurrentHashMap, ConcurrentSkipListMap.",
      ],
    },
    {
      tag: "technical",
      q: "How does @Transactional work in Spring?",
      a: "It's an AOP proxy that opens a DB transaction before the method and commits/rolls back after, based on exceptions and propagation settings.",
      detailedAnswer:
        "Spring creates a proxy around the bean; when a `@Transactional` method is called *externally*, the proxy starts a transaction via the `PlatformTransactionManager`, binds the connection to the current thread (ThreadLocal), executes the method, and commits — or rolls back on unchecked exceptions (checked exceptions require `rollbackFor`). Common gotchas: (1) self-invocation (`this.method()`) bypasses the proxy → no transaction; (2) `REQUIRES_NEW` suspends the current tx and starts a fresh one; (3) `readOnly=true` hints the DB and skips dirty checks in Hibernate; (4) exception thrown after commit is too late to rollback.",
      tips: [
        "Always mention the self-invocation gotcha — it's a favorite follow-up.",
        "Know the 7 propagation types at a high level.",
        "Explain rollback rules for checked vs unchecked.",
      ],
    },
    {
      tag: "technical",
      q: "What is the difference between == and .equals() in Java?",
      a: "== compares references (or primitive values). .equals() compares content, if the class overrides it (String, Integer, etc. do).",
      detailedAnswer:
        "For primitives, `==` compares values. For objects, `==` compares memory references. `.equals()` is defined in `Object` (default is `==`), but overridden by String, wrapper types, and value objects to compare contents. Whenever you override `equals`, you MUST override `hashCode` so equal objects go to the same hash bucket — otherwise HashMap breaks. Watch out for Integer caching: `Integer a = 127; Integer b = 127;` → `a == b` is true (cached), but at 128+ it's false. Always use `.equals()` for objects.",
      tips: [
        "Bring up the equals/hashCode contract — expected of any senior candidate.",
        "Mention Integer cache (-128 to 127) for a bonus.",
        "Use `Objects.equals(a, b)` for null-safety.",
      ],
    },
  ],
  "teacher": [
    {
      tag: "situational",
      q: "How would you teach a concept a student just cannot grasp?",
      a: "Diagnose the gap, switch modality (visual/hands-on/story), scaffold with prerequisites, use analogies from the student's world, and check understanding step by step.",
      detailedAnswer:
        "First, isolate *where* comprehension breaks — usually a missing prerequisite. Re-teach that first. Then change modality: if verbal explanation failed, try a diagram, a physical manipulative, or a real-world analogy tied to their interests. Break the concept into micro-steps and ask them to explain each one back (the 'teach-back' technique). Use formative assessments (thumbs up/down, exit tickets) not just tests. Celebrate small wins to rebuild confidence. If it persists, coordinate with parents and, if needed, learning support.",
      tips: [
        "Show empathy — never blame the student.",
        "Name a specific pedagogy: Bloom's, Vygotsky's ZPD, or UDL.",
        "Give a real example from your practice.",
      ],
    },
    {
      tag: "behavioral",
      q: "How do you incorporate technology into your teaching?",
      a: "Use tech purposefully — to differentiate, provide feedback, or enable creation — not as a substitute for good pedagogy.",
      detailedAnswer:
        "Frame with SAMR (Substitution → Augmentation → Modification → Redefinition). Examples: Google Forms for instant formative quizzes with auto-feedback; Padlet or Jamboard for collaborative brainstorming; adaptive tools (Khan, Duolingo) for differentiation; students *creating* videos or podcasts as a redefinition of the essay. Always balance screen time with hands-on work and address the equity gap (device access at home).",
      tips: [
        "Name 2-3 tools you actually used with an outcome.",
        "Reference a framework (SAMR, TPACK) — shows professionalism.",
        "Acknowledge downsides: distraction, equity, screen time.",
      ],
    },
  ],
  "mba": [
    {
      tag: "situational",
      q: "A client's market share is declining. How do you diagnose the problem?",
      a: "Structure with 4Cs (Customer, Competition, Company, Context), quantify where share was lost (segment/channel/geo), then form and test hypotheses.",
      detailedAnswer:
        "1) Segment the decline: is it category-wide (market shrinking) or share loss? By region, channel, customer segment, SKU? 2) Analyze the 4Cs — Customer (needs, preferences), Competition (new entrants, pricing, product), Company (product quality, distribution, marketing), Context (regulation, macro). 3) Form hypotheses: e.g., 'a new competitor undercut price in the SMB segment.' 4) Validate with data — sales trends, NPS, win/loss analysis, mystery shopping. 5) Recommend: repricing, product improvement, channel expansion, or a targeted campaign. 6) Prioritize by impact × feasibility and propose a 30-60-90 day plan.",
      tips: [
        "Always structure BEFORE diving in — silence for 30s is fine.",
        "State assumptions out loud so the interviewer can course-correct.",
        "Land on a specific recommendation with a metric.",
      ],
    },
    {
      tag: "hr",
      q: "Where do you see yourself in 5 years?",
      a: "Show a clear trajectory tied to the role, emphasizing growth in skills and impact — not job titles.",
      detailedAnswer:
        "Structure: (1) short-term (0-2 yrs) — master this role, deliver measurable impact; (2) mid-term (2-4 yrs) — expand scope, lead cross-functional projects, mentor others; (3) long-term (5 yrs) — a leadership role in this domain, ideally within this company. Example: 'In 5 years I'd like to be leading a product line or a cross-functional team here, having grown from IC to manager by consistently delivering outcomes and developing the people around me.'",
      tips: [
        "Tie the answer to the company's growth path.",
        "Avoid naming a specific title — sounds naive if their org uses different levels.",
        "Signal loyalty without sounding scripted.",
      ],
    },
  ],
  "doctor": [
    {
      tag: "situational",
      q: "A patient refuses a recommended treatment. What do you do?",
      a: "Respect autonomy, ensure informed refusal, explore concerns, document thoroughly, and offer alternatives while keeping the door open.",
      detailedAnswer:
        "Confirm the patient has capacity. Explain the diagnosis, treatment options, risks of accepting vs refusing, and answer questions in plain language — this is informed consent (and informed refusal). Explore the *why*: fear, cost, cultural beliefs, prior bad experience? Offer alternatives — a second opinion, a less invasive option, a trial period. Document the discussion, the patient's understanding, and their decision in the chart. Involve family (with consent) and, if life-threatening, consult ethics. Reassure the patient the relationship continues.",
      tips: [
        "Lead with autonomy and empathy — never coercion.",
        "Show you understand informed consent as a *process*, not a form.",
        "Documentation is critical — mention it explicitly.",
      ],
    },
    {
      tag: "behavioral",
      q: "How do you handle burnout in your practice?",
      a: "Recognize early signs, set boundaries, use peer support, maintain sleep/exercise/nutrition, and seek professional help when needed.",
      detailedAnswer:
        "Early signs: cynicism, emotional exhaustion, depersonalization. My routine: protected time off, a peer debrief group weekly, mindfulness/exercise 4x/week, sleep hygiene, and hobbies unrelated to medicine. I use the Maslach Burnout Inventory as a self-check quarterly. At an organizational level, I advocate for reasonable rosters, EMR efficiency, and destigmatizing help-seeking. If symptoms escalate, I would use physician-health programs — this is a systemic issue, not personal weakness.",
      tips: [
        "Frame burnout as a professional risk, not a taboo.",
        "Show self-awareness AND system-level thinking.",
        "Avoid 'I never get burned out' — reads as low insight.",
      ],
    },
  ],
  "advocate": [
    {
      tag: "situational",
      q: "How do you handle a case you're unlikely to win?",
      a: "Advise the client honestly about odds, explore settlement, prepare the strongest possible case, and manage expectations throughout.",
      detailedAnswer:
        "Duty of candor: give the client a realistic assessment in writing — evidence gaps, precedent, likely outcome ranges, and cost. Explore ADR (mediation/settlement) — often better economics than trial. If proceeding, build the strongest arguable case: identify the two strongest legal theories, prepare witnesses, anticipate opposing arguments. Set milestones for re-evaluation. Always keep the client informed; unpleasant news early beats surprises later. Uphold professional ethics — never mislead the court to boost odds.",
      tips: [
        "Emphasize ethics and candor — non-negotiable for the bar.",
        "Mention ADR — shows commercial judgment.",
        "Explain how you document advice to protect both client and firm.",
      ],
    },
    {
      tag: "behavioral",
      q: "Describe your approach to legal research.",
      a: "Start with the issue, map applicable statutes, find binding precedents, read commentary/law reviews, and synthesize into a memo with citations.",
      detailedAnswer:
        "1) Frame the legal issue precisely (IRAC — Issue, Rule, Application, Conclusion). 2) Primary sources first — constitution, statutes, rules. 3) Case law from binding jurisdictions (Supreme Court → High Court → same-level), Shepardize/KeyCite to check status. 4) Secondary sources — treatises, journal articles, commentary — for context, not authority. 5) Cross-reference on Manupatra/SCC Online/Westlaw. 6) Write a clear memo: issue, short answer, analysis with citations, conclusion, and next steps. 7) Update as the case evolves.",
      tips: [
        "Use IRAC — it's the universal legal writing structure.",
        "Mention the databases you actually use (jurisdiction-specific).",
        "Highlight verifying that a precedent is still good law.",
      ],
    },
  ],
  "fresher": [
    {
      tag: "hr",
      q: "Why should we hire you with no experience?",
      a: "Show attitude, learning speed, relevant projects/internships, and fit with the team. Frame lack of experience as freedom from bad habits.",
      detailedAnswer:
        "Answer in 3 parts: (1) *Aptitude* — 2-3 concrete evidences of learning speed (course, certification, side project, hackathon). (2) *Attitude* — your work ethic, coachability, curiosity, backed by a mini-story (e.g., taught yourself React in a month for a college project). (3) *Alignment* — why this company/role specifically, tying to something you researched (product, mission, tech stack). End with: 'I don't come with baggage; I come ready to learn and contribute from day one.'",
      tips: [
        "Never say 'I'm a fast learner' without proof — always follow with an example.",
        "Research the company deeply; specifics beat flattery.",
        "Show a portfolio/GitHub — trumps grades.",
      ],
    },
    {
      tag: "behavioral",
      q: "Tell me about a project you're proud of.",
      a: "Pick a project with real impact or learning, use STAR, and be ready to go deep on your specific contribution and technical choices.",
      detailedAnswer:
        "Structure: Situation (context, team size), Task (your specific role), Action (what YOU built, decisions you made, alternatives you rejected), Result (users, metrics, grades, feedback). Choose a project where you can defend every choice — interviewers WILL drill into 'why this tech?' or 'what would you do differently?' A great project is one you can talk about for 10 minutes with genuine excitement. Have it deployed / on GitHub so you can demo.",
      tips: [
        "Have the code/live link ready to share.",
        "Practice a 60-second version AND a 5-minute deep-dive.",
        "Prepare 3 hard follow-ups you'd ask yourself.",
      ],
    },
  ],
  "product-manager": [
    {
      tag: "situational",
      q: "How would you prioritize features for the next quarter?",
      a: "Align to strategy, score with a framework (RICE/ICE), factor in dependencies and effort, then socialize with stakeholders.",
      detailedAnswer:
        "1) Anchor to the quarterly objective (a company OKR). 2) List candidate features from user research, data, sales, support. 3) Score each with RICE (Reach × Impact × Confidence ÷ Effort) — Confidence forces you to name assumptions. 4) Overlay strategic bets, tech debt, and dependencies. 5) Draft a proposal with top items, cut items, and rationale. 6) Review with eng leads for feasibility, design for scope, and leadership for alignment. 7) Publish the roadmap with clear 'why now / why not.' Revisit monthly.",
      tips: [
        "Show a real framework — vague answers hurt PMs most.",
        "Emphasize saying NO with reasons.",
        "Discuss stakeholder management explicitly.",
      ],
    },
    {
      tag: "behavioral",
      q: "Tell me about a feature you shipped that failed.",
      a: "Own the failure, walk through hypothesis vs outcome, the metric miss, root cause, and what you changed going forward.",
      detailedAnswer:
        "Example: 'We shipped in-app upsells expecting +8% ARPU; we saw +1% ARPU but -3% D30 retention. Diagnosis: the trigger fired too early in the user journey. Root cause was skipping a proper A/B test in favor of a full launch to hit a deadline. I killed the feature within 2 weeks, ran a proper experiment on a redesigned trigger, and later shipped v2 with +5% ARPU and neutral retention. Lesson: never trade experimentation for speed on revenue-impacting flows.'",
      tips: [
        "Own it fully — no blaming eng/design/leadership.",
        "Quantify the miss and the recovery.",
        "End with the *systemic* change you drove, not just 'I learned.'",
      ],
    },
  ],
  "data-scientist": [
    {
      tag: "technical",
      q: "Explain bias-variance tradeoff.",
      a: "Bias = error from wrong assumptions (underfit); variance = error from sensitivity to training data (overfit). Total error minimized by balancing both.",
      detailedAnswer:
        "A model with high bias oversimplifies (linear model on non-linear data) — high train + test error. High variance memorizes noise (deep tree, no regularization) — low train error, high test error. Techniques that reduce variance: regularization (L1/L2), bagging, more data, simpler models. Techniques that reduce bias: richer features, deeper models, boosting. The sweet spot is a model complex enough to capture signal but constrained enough to generalize. Cross-validation reveals which side you're on: a big train-test gap = variance; both bad = bias.",
      tips: [
        "Sketch the classic U-shaped test-error curve if on a whiteboard.",
        "Mention how you'd diagnose (learning curves).",
        "Connect to a real project you tuned.",
      ],
    },
    {
      tag: "technical",
      q: "How do you handle imbalanced datasets?",
      a: "Combine resampling (SMOTE, undersampling), class weights, better metrics (PR-AUC, F1), and threshold tuning — don't rely on accuracy.",
      detailedAnswer:
        "First, don't use accuracy — a 99%-negative dataset scores 99% by predicting all-negative. Use PR-AUC, F1, or the confusion matrix. Techniques: (1) class_weight='balanced' in most sklearn estimators; (2) oversample minority with SMOTE or undersample majority; (3) anomaly-detection framing (Isolation Forest) if extremely rare; (4) threshold tuning — pick the operating point from the PR curve based on business cost of FP vs FN; (5) collect more minority data if possible. Always resample *inside* the CV fold to avoid leakage.",
      tips: [
        "Emphasize business cost of FP vs FN — that drives metric choice.",
        "Warn against SMOTE leakage — a common mistake.",
        "Know that XGBoost/LightGBM have `scale_pos_weight`.",
      ],
    },
  ],
  "devops": [
    {
      tag: "technical",
      q: "Design a CI/CD pipeline for a microservice.",
      a: "Trigger on PR → lint/test → build container → security scan → push to registry → deploy to staging → smoke tests → promote to prod with progressive rollout.",
      detailedAnswer:
        "Stages: (1) PR opened → run unit tests, linters, type checks. (2) On merge to main: build a Docker image, tag with git SHA, run SAST (Snyk/Trivy) and dependency scan. (3) Push to registry (ECR/GCR). (4) Deploy to staging via GitOps (ArgoCD reads a Helm chart). (5) Run integration + smoke tests. (6) Promote to prod with a canary — 5% → 25% → 100% behind a feature flag, watching SLOs. (7) Auto-rollback if error rate/latency exceeds threshold. (8) Post-deploy: notify Slack, update changelog, tag release. Secrets via Vault/SM, never in the repo.",
      tips: [
        "Mention progressive delivery (canary/blue-green) — key differentiator.",
        "Reference specific tools (GitHub Actions, ArgoCD, Trivy).",
        "Bring up observability + rollback triggers.",
      ],
    },
    {
      tag: "situational",
      q: "Production is down at 3 AM. Walk me through your response.",
      a: "Acknowledge alert, assess blast radius, mitigate first (rollback/failover), then diagnose, communicate status, and run a blameless postmortem.",
      detailedAnswer:
        "1) Acknowledge in PagerDuty within SLA. 2) Assess: which service, how many users, when did it start. 3) *Mitigate before diagnosing* — rollback the last deploy or failover to a healthy region. Restoring service is priority 1. 4) Communicate: update the status page and #incident-channel every 15-30 min. 5) Once stable, dive into logs/metrics/traces for root cause. 6) Write a blameless postmortem within 48h: timeline, impact, root cause, action items with owners and due dates. 7) Fix the class of problem, not just the instance.",
      tips: [
        "Rollback FIRST is the shibboleth — everyone new tries to debug first.",
        "Mention comms cadence — non-technical stakeholders judge you on this.",
        "'Blameless' postmortem is expected vocabulary.",
      ],
    },
  ],
  "sales": [
    {
      tag: "situational",
      q: "How do you handle a prospect who says your product is too expensive?",
      a: "Reframe from price to value/ROI, understand the real objection, quantify impact, and offer options — never lead with a discount.",
      detailedAnswer:
        "1) Don't defend price — ask 'compared to what?' to surface the real objection (budget, priority, perceived value). 2) Reframe to ROI: 'Our customers see X payback in Y months because of Z.' Bring case studies with numbers. 3) Isolate: 'If we can align on the value, is budget the ONLY blocker?' 4) Offer options — smaller starter package, phased rollout, annual pre-pay for discount, or extended terms. 5) Involve champion + economic buyer separately. Discount only after the value is anchored — otherwise you commoditize.",
      tips: [
        "Never discount on the first objection — trains buyers to push.",
        "Have 3 case studies memorized with $ figures.",
        "Silence after asking the price question — let them talk.",
      ],
    },
    {
      tag: "behavioral",
      q: "Tell me about your biggest deal.",
      a: "Walk through prospecting, discovery, stakeholder mapping, competitive positioning, negotiation, and close — with numbers.",
      detailedAnswer:
        "Structure: sourced via (channel), qualified with MEDDIC/BANT, mapped 6 stakeholders including economic buyer & champion, ran a POC, positioned against 2 competitors on differentiators, negotiated a 3-year deal at $X ACV, closed in Y days vs Z avg. Highlight ONE non-obvious move — 'I brought our CEO in for a deal review with their CFO to unblock procurement.' End with the impact: revenue, expansion, reference customer.",
      tips: [
        "Numbers throughout — ACV, cycle length, stakeholders.",
        "Name your qualification framework (MEDDIC/BANT/SPICED).",
        "Show ONE creative move — sellers who only follow playbook are commodities.",
      ],
    },
  ],
  "hr": [
    {
      tag: "situational",
      q: "An employee reports harassment. What are your first steps?",
      a: "Listen without judgment, ensure safety, document, follow policy, involve legal, investigate confidentially and impartially, act on findings.",
      detailedAnswer:
        "1) Acknowledge and thank them for coming forward; create psychological safety. 2) Ensure immediate safety — separate parties if needed via temporary reassignment (never punitive to the complainant). 3) Explain the process, timeline, confidentiality limits, and no-retaliation policy. 4) Document verbatim; involve legal counsel. 5) Investigate impartially — interview complainant, respondent, witnesses; gather evidence (emails, logs). 6) Reach a finding on preponderance of evidence. 7) Take action per policy — coaching, discipline, termination. 8) Follow up with the complainant on outcome and wellbeing.",
      tips: [
        "Emphasize impartiality — don't presume guilt or innocence.",
        "Know your jurisdiction's laws (POSH Act in India, Title VII in US).",
        "Confidentiality is limited, not absolute — set expectations.",
      ],
    },
  ],
  "mechanical-engineer": [
    {
      tag: "technical",
      q: "Explain the difference between stress and strain.",
      a: "Stress = internal force per unit area (σ = F/A). Strain = fractional deformation (ε = ΔL/L). Related by Young's modulus in the elastic range: σ = Eε.",
      detailedAnswer:
        "Stress is measured in Pa or N/m² and represents how much internal resistance a material develops per unit cross-sectional area under load. Strain is dimensionless — the ratio of deformation to original dimension. In the elastic region they're linearly related (Hooke's law, σ = Eε). Beyond the yield point, plastic deformation begins. Key values: yield strength, ultimate tensile strength, fracture point. Types of stress: tensile, compressive, shear, torsional. Always specify whether stress is engineering (based on original area) or true (instantaneous area) — matters for large deformations.",
      tips: [
        "Draw the stress-strain curve — expected on the whiteboard.",
        "Know units and typical values for common materials.",
        "Distinguish engineering vs true stress for senior roles.",
      ],
    },
  ],
  "civil-engineer": [
    {
      tag: "technical",
      q: "How do you select a foundation type for a building?",
      a: "Based on soil type/bearing capacity, load, water table, adjacent structures, and cost. Shallow for good soil + light loads; deep (pile, raft) for weak soil or heavy loads.",
      detailedAnswer:
        "1) Soil investigation via boreholes → determine bearing capacity, groundwater, soil type. 2) Estimate structural loads (dead + live + wind + seismic). 3) If safe bearing capacity supports the load at shallow depth → isolated/strip footing. 4) If loads are heavy or soil weak → mat/raft foundation to spread load. 5) If firm strata are deep or high water table → pile foundation (bored/driven, friction/end-bearing). 6) Check settlement (differential settlement is often more critical than absolute). 7) Consider adjacent structures, construction feasibility, budget, and seismic code (IS 1893 / relevant national code).",
      tips: [
        "Always start with soil investigation — never guess.",
        "Mention differential vs total settlement.",
        "Reference the code you'd follow (IS/ACI/Eurocode).",
      ],
    },
  ],
  "nurse": [
    {
      tag: "situational",
      q: "A patient's condition deteriorates rapidly on your shift. What do you do?",
      a: "Assess ABCs, call for help / rapid response, initiate interventions per protocol, document, and communicate with family.",
      detailedAnswer:
        "1) Recognize early warning signs (MEWS/NEWS score). 2) Airway-Breathing-Circulation — position, oxygen, IV access. 3) Call the Rapid Response Team or code as appropriate; don't hesitate. 4) Follow ACLS/BLS algorithms; administer meds per protocol/order. 5) One nurse leads care, another documents in real time. 6) Notify the physician with SBAR (Situation, Background, Assessment, Recommendation). 7) Once stable, communicate honestly with family. 8) Debrief with the team afterwards. 9) Document thoroughly — what you saw, did, and when.",
      tips: [
        "Know ABCDE and SBAR by heart.",
        "'Call for help early' is the right instinct — never solo heroics.",
        "Debrief is a mark of a mature nurse.",
      ],
    },
  ],
  "digital-marketing": [
    {
      tag: "situational",
      q: "How would you launch a new product with a limited budget?",
      a: "Nail ICP and positioning, prioritize organic + earned channels, run small paid experiments, measure obsessively, double down on what works.",
      detailedAnswer:
        "1) Define ICP + JTBD → clear positioning. 2) Set 1 north-star metric (signups, revenue) with weekly targets. 3) Organic first: SEO landing pages targeting bottom-funnel keywords, a launch on Product Hunt / relevant communities, founder-led LinkedIn content. 4) Earned: reach out to 20 relevant creators/podcasts with a personalized pitch. 5) Paid: allocate 20% budget to test 3 channels (Google, Meta, LinkedIn) with small budgets ($500 each), measure CAC/LTV. 6) Kill losers weekly, scale winners. 7) Build an email nurture from day 1 to compound. Focus on repeatable, measurable channels — not vanity.",
      tips: [
        "Start with ICP — everything cascades from it.",
        "Show comfort with unit economics (CAC/LTV/payback).",
        "Prioritize compounding channels (SEO, content, email) over paid-only.",
      ],
    },
  ],
  "customer-support": [
    {
      tag: "situational",
      q: "How do you handle an angry customer?",
      a: "Stay calm, listen fully, acknowledge, apologize sincerely, solve or escalate quickly, and follow up.",
      detailedAnswer:
        "LAST framework: Listen (don't interrupt, take notes), Acknowledge ('I understand why this is frustrating'), Solve (offer 2 concrete options), Thank ('thanks for flagging this so we could fix it'). Never argue about who is right — de-escalate first. Take ownership even if it isn't your fault; the customer sees the company, not the team. If you can't solve, be honest about the timeline and escalate with all context so they don't repeat their story. Follow up proactively when resolved. Log the pattern — repeated complaints signal a product issue to fix at the root.",
      tips: [
        "Never say 'calm down' — instantly makes it worse.",
        "Apologize for the experience, not necessarily for the fault.",
        "Share a real story with a positive outcome.",
      ],
    },
  ],
  "business-analyst": [
    {
      tag: "technical",
      q: "Walk me through how you gather requirements for a new system.",
      a: "Identify stakeholders, use multiple elicitation techniques, document in structured formats (user stories, BRD), validate, and manage change.",
      detailedAnswer:
        "1) Stakeholder analysis — map power/interest, identify sponsors, users, SMEs. 2) Elicitation via interviews, workshops, observation, document review, and surveys — never one method alone. 3) Model with process flows (BPMN), context diagrams, user stories with acceptance criteria. 4) Produce a BRD/FRD or a product backlog depending on methodology. 5) Validate — walkthroughs with stakeholders, prototypes to make it tangible. 6) Prioritize with MoSCoW or WSJF. 7) Set up a change control process — requirements will evolve. 8) Trace requirements to test cases and deliverables (traceability matrix).",
      tips: [
        "Name at least 3 elicitation techniques.",
        "Mention traceability — separates junior from senior BAs.",
        "Show fluency in both waterfall (BRD) and agile (backlog).",
      ],
    },
  ],
  "cybersecurity": [
    {
      tag: "technical",
      q: "Explain the CIA triad with real examples.",
      a: "Confidentiality (data hidden from unauthorized), Integrity (data unaltered), Availability (services reachable when needed).",
      detailedAnswer:
        "Confidentiality — TLS in transit, AES-256 at rest, RBAC, MFA. Breach example: an S3 bucket left public exposing PII. Integrity — cryptographic hashes, digital signatures, immutable logs, database constraints. Breach: a MITM alters an API payload. Availability — redundancy, DDoS protection, backups, DR plans. Breach: a ransomware attack encrypts prod. Every security control maps to one or more of these; every threat model asks 'which of C/I/A is at risk?' Modern extensions add Authenticity and Non-repudiation.",
      tips: [
        "Give a concrete breach example per pillar.",
        "Mention controls at each layer.",
        "Extensions (AAA, non-repudiation) score bonus.",
      ],
    },
  ],
  "ui-ux": [
    {
      tag: "behavioral",
      q: "Walk me through your design process.",
      a: "Discover (research) → Define (problem, users) → Ideate → Prototype → Test → Iterate. Ground every decision in user needs and data.",
      detailedAnswer:
        "Double Diamond model: 1) Discover — user interviews, analytics, competitive analysis, stakeholder input. 2) Define — synthesize into personas, journey maps, and a clear problem statement. 3) Ideate — sketch, workshops, crazy 8s, converge to 2-3 concepts. 4) Prototype — low-fi wireframes → high-fi in Figma → interactive prototype. 5) Test — usability sessions (5 users catch 80% of issues), A/B tests once live. 6) Handoff to eng with clear specs, edge cases, and a design system. 7) Post-launch: measure adoption, iterate. Show ONE case study end-to-end with metrics.",
      tips: [
        "Frame with a named methodology (Double Diamond, Design Thinking).",
        "Emphasize research — juniors skip it.",
        "Have one detailed case study ready with before/after metrics.",
      ],
    },
  ],
  "content-writer": [
    {
      tag: "technical",
      q: "How do you write content that ranks AND converts?",
      a: "Match search intent, structure for readability, front-load value, use internal linking, and end with a clear CTA aligned to funnel stage.",
      detailedAnswer:
        "1) Start with intent — informational vs commercial vs transactional determines format. 2) SERP analysis — see what already ranks, find the content gap. 3) Structure with H2/H3, short paragraphs, bullets, TOC — skim-friendly wins. 4) Front-load the answer (BLUF — bottom line up front); Google + readers reward it. 5) E-E-A-T signals: author bio, sources, original data. 6) Internal links to money pages using descriptive anchors. 7) CTA matched to intent — TOFU = subscribe, BOFU = demo/trial. 8) Refresh quarterly based on GSC data — updating an existing #4 to #1 outperforms a new post.",
      tips: [
        "Mention search intent — every SEO manager tests for this.",
        "Discuss updating vs creating — mature content strategy.",
        "Show you connect content to revenue, not just traffic.",
      ],
    },
  ],
  "graphic-designer": [
    {
      tag: "behavioral",
      q: "How do you handle design feedback you disagree with?",
      a: "Listen fully, understand the underlying goal, present rationale with data/principles, and be willing to compromise on execution.",
      detailedAnswer:
        "Feedback often expresses a symptom, not a real problem. Ask: 'What's the outcome you want?' If a stakeholder says 'make the logo bigger,' the real ask might be 'the brand feels lost.' Present your rationale with visual hierarchy principles or A/B test data. Offer 2 alternatives that address their concern differently. Pick your battles — push back hard on brand-damaging asks, concede on subjective preferences. Document the decision (and the trade-off) in the file so future designers understand the why.",
      tips: [
        "Always separate goal from execution.",
        "Data + principles > 'because it looks better.'",
        "Show maturity: not every hill is worth dying on.",
      ],
    },
  ],
  "accountant": [
    {
      tag: "technical",
      q: "Explain the difference between accrual and cash accounting.",
      a: "Accrual records revenue/expenses when earned/incurred; cash records when money moves. Accrual gives a truer picture; cash is simpler and matches liquidity.",
      detailedAnswer:
        "Cash basis: revenue recognized when cash received, expenses when paid. Simple, matches bank balance, but distorts profitability (big invoice sent Dec 30 shows next year). Accrual basis: revenue when earned (invoice raised, service delivered), expenses when incurred (regardless of payment). Requires AR, AP, accruals, deferrals, matching principle. GAAP and IFRS require accrual for most entities above small-business thresholds. Small businesses may use cash for tax purposes even while keeping accrual books. Reconcile the two via a cash flow statement.",
      tips: [
        "Give one concrete example showing the timing difference.",
        "Mention which standard bodies require accrual.",
        "Know when small businesses can elect cash.",
      ],
    },
  ],
};