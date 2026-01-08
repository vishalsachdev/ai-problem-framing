# FAQ: AI Problem Framing for AI Practitioners

This FAQ addresses common questions from students in the graduate-level course on AI problem framing. Questions are organized by type to help you find quick answers.

---

## Conceptual Clarifications

### Q: What is the difference between "problem framing" and "problem-solving"?

Problem framing is about correctly defining the challenge before you solve it—identifying the real outcome you need, what constraints exist, and what alternatives are available. Problem-solving is execution: once the frame is clear, you build the solution. Most AI projects fail at framing (wrong outcome, incompletely decomposed), not at solving. **Chapter 1** establishes this distinction as foundational to the course.

### Q: Why is System 2 thinking important for AI problem framing?

System 2 thinking (deliberate, analytical, slow) prevents the snap judgments of System 1 that lead practitioners to jump to technical solutions before understanding the problem. In AI, this prevents costly mistakes like choosing the wrong model architecture or optimizing the wrong metric. The course shows how to activate System 2 at critical framing moments. See **Chapter 1: The AI Problem Framing Mindset**.

### Q: What is "The Loop" and why does it have five steps?

The Loop (Outcome → Deconstruction → Alternatives → Trade-offs → Signals) is a structured decision-making process that ensures you've thought through all angles before committing to an AI solution. Five steps because: (1) outcome clarity, (2) breaking the problem into components, (3) exploring multiple solution approaches, (4) weighing costs and benefits, (5) defining success metrics. Skipping any step leads to misaligned projects. See **Chapter 3: The Loop Framework**.

### Q: What are the 13 AI archetypes and why should I care?

The 13 archetypes represent common AI solution patterns (e.g., RAG vs. long context, supervised learning vs. reinforcement learning, rule-based vs. learned models). Understanding these archetypes helps you quickly recognize which approach fits your decomposed problem, rather than defaulting to whatever's trendy. **Chapter 2: AI Solution Alternatives** catalogs these with trade-offs.

### Q: How do "signals" differ from "metrics"?

Metrics are numbers you track (accuracy, latency, cost). Signals are the observable patterns that indicate whether your problem framing was correct and your solution is working as intended. A metric might show high accuracy, but the signal (user behavior, business outcome) might reveal your framing missed something critical. Signals are leading indicators of real-world success. See **Chapter 4: Diagnosis**.

### Q: What does it mean to "decompose" a problem?

Decomposition breaks a complex problem into smaller, independently solvable sub-problems with clear boundaries. Instead of "build an AI system," you identify: "What data do we have? What is the actual prediction target? Who uses the output? What are failure modes?" This reveals whether you actually need AI or if a simpler solution suffices. **Chapter 3** teaches a systematic decomposition process.

### Q: Why is "persist vs. pivot vs. stop" framed as a decision point?

After you've executed your framed solution and gathered signals, you're at an inflection: the framing might be spot-on (persist), or signals reveal misalignment (pivot the approach) or deeper misunderstanding (stop and reframe). This decision point prevents sunk-cost fallacy and ensures teams move deliberately, not reactively. See **Chapter 5: Pivot**.

---

## Common Misconceptions

### Q: Is it true that more data always solves AI problems?

No. A common misconception is that data is the limiting factor. In reality, wrong framing is often the bottleneck—you might be optimizing the wrong metric, predicting the wrong target, or solving a problem that isn't actually the business need. Gathering more data for a poorly framed problem wastes resources. **Chapter 1** and **Chapter 4** show how to diagnose whether data or framing is your real constraint.

### Q: Should I always choose the most sophisticated AI model?

No. Practitioners often assume bigger or newer models are better, but a well-designed rule-based system or simpler model can outperform a complex approach if your problem is correctly framed. The Loop (especially the **Alternatives** and **Trade-offs** steps in **Chapter 3**) forces you to compare across complexity levels and find the *simplest solution that meets your outcome*.

### Q: Is it a mistake if I change my problem frame mid-project?

Not necessarily—it's only a mistake if you're changing frames randomly or without evidence. If new signals show your original frame was incomplete, pivoting to a new frame is the right move. The key is *intentionality*: you should change frames because you've learned something concrete, not because things are hard. **Chapter 5: Pivot** covers when and how to reframe responsibly.

### Q: Do I need deep learning for every AI problem?

No. Many AI problems are solved better with simpler approaches: decision trees, gradient boosting, heuristics, or even non-ML solutions. Deep learning shines in specific domains (vision, language, sequential data) where the complexity is justified. Defaulting to deep learning without framing your problem is a trap. **Chapter 2: AI Solution Alternatives** guides you through selecting the right archetype.

### Q: Is it true that if my model has high test accuracy, my problem is solved?

No. Test accuracy measures one dimension—does the learned pattern generalize to held-out data? But it doesn't tell you: (1) Is this the metric that matters for your outcome? (2) Does the model work in production? (3) Are there fairness or safety concerns? **Chapter 4: Diagnosis** teaches you to read broader signals beyond accuracy metrics.

### Q: Should I always optimize for the latest benchmark or leaderboard metric?

No. Leaderboards optimize for academic reproducibility, not for real-world outcomes. Your business problem likely has constraints (latency, cost, fairness) that the benchmark ignores. The course teaches you to define *your own signals* tied to *your outcome*, not chase published benchmarks. See **Chapter 3** (Signals step) and **Chapter 4**.

### Q: Is peer feedback only useful after the course ends?

No. The portfolio-based assessment includes *ongoing* peer feedback because framing is collaborative. What seems clear to you might be unclear to a teammate; peer review catches blind spots. Treating feedback as post-hoc instead of formative is a missed opportunity. Integrate feedback iteratively through the course.

---

## Practical Applications

### Q: How do I apply The Loop to a real project I'm working on?

Start with **Outcome**: Define the measurable end state (e.g., "reduce customer churn by 10% in 6 months"). Then **Decompose** the problem (what data signals churn? who decides actions?). **Explore Alternatives** (predictive model + outreach, rule-based system, etc.). **Weigh Trade-offs** (cost, speed, interpretability). **Define Signals** (what tells you it's working?). Work through one step at a time, document decisions, and involve stakeholders. **Chapter 3** provides a template.

### Q: When should I use RAG versus long-context approaches?

RAG (Retrieval-Augmented Generation) excels when your knowledge is large, dynamic, or frequently updated—you retrieve relevant chunks on-demand. Long-context is better when the entire context fits in a model window and you want simpler architecture or reasoning across the full context. RAG scales better but adds latency and retrieval accuracy risk; long-context is simpler but more compute-intensive. See **Chapter 2: AI Solution Alternatives** for the full trade-off analysis.

### Q: How do I know if my problem even needs AI?

Ask: (1) Can it be solved with rules or heuristics? (2) Do you have labeled data or a way to generate it? (3) Will the solution be used frequently enough to justify complexity? (4) Can you define measurable success? If you answer "no" to most, you might not need AI—a simpler, deterministic solution might be better. The **Deconstruction** step in **Chapter 3** forces this question.

### Q: How do I choose between supervised learning, reinforcement learning, and unsupervised learning?

Supervised learning is for predicting known targets (classification, regression). Reinforcement learning is for sequential decision-making where you learn from reward signals. Unsupervised learning is for finding patterns in unlabeled data. Your **Outcome** and **Decomposition** determine which fits: e.g., "predict customer churn" → supervised; "optimize inventory allocation" → RL; "segment customers" → unsupervised. **Chapter 2** catalogs these with examples.

### Q: What should I do if my signals show the framing was wrong?

First, understand *why* it was wrong—did you misunderstand the outcome? Incomplete decomposition? Wrong metric? Once you diagnose the flaw, decide: can you adjust your approach (persist), do you need a different solution type (pivot), or was the original problem statement flawed (stop and reframe)? **Chapter 5: Pivot** walks through this decision. Document what you learned so stakeholders understand the adjustment is intentional.

### Q: How do I communicate my framing to non-technical stakeholders?

Use the Loop's language: (1) What's the outcome? (2) How do we decompose it? (3) What are the solution alternatives? (4) What are the trade-offs? (5) How will we know if it works? This avoids jargon and focuses on business logic. Visual diagrams of your decomposition and a simple comparison table of alternatives are especially powerful. See examples in **Chapter 6: Application**.

### Q: How do I handle stakeholders who push for a specific solution before framing?

Acknowledge the suggestion but redirect to framing first: "Let's make sure a [their suggestion] is the best fit for this outcome. What does success look like?" Work through The Loop with them to show whether their suggestion aligns. Often, they'll realize it doesn't, or you'll both learn that alternatives make more sense. **Chapter 1** emphasizes that framing is collaborative.

---

## Practical Applications (Technical Deep Dives)

### Q: How do I design a decomposition tree for a complex problem?

Start with your outcome at the root. Ask: "What are the independent sub-problems?" For example, "Predict customer churn" decomposes into: (1) Data collection (what signals indicate churn?), (2) Feature engineering (what patterns matter?), (3) Model selection (what architecture fits?), (4) Deployment (how do we use predictions?). Each sub-problem can decompose further. Stop when sub-problems are concrete and independently solvable. **Chapter 3** includes templates and examples.

### Q: How should I prototype different framings before committing to one?

Design lightweight experiments for each framing: a small pilot for each alternative. For example, if you're unsure whether supervised learning or RL is better, build a toy supervised model in 2 weeks, a toy RL model in 2 weeks, and compare signals (accuracy, speed, interpretability). This costs less than full implementation and reveals which framing resonates. Document findings rigorously. **Chapter 6: Application** shows case studies that used this approach.

### Q: How do I ensure my signals are actually predictive of the outcome I care about?

Define a causal model: "If signal X goes up, outcome Y should improve." Test this hypothesis with data (time-series analysis, A/B tests, or historical correlation). A signal that doesn't correlate with your outcome is a vanity metric. For example, model accuracy might be a vanity metric if it doesn't correlate with user engagement. Validate signals iteratively. See **Chapter 4: Diagnosis** for signal validation techniques.

---

## Prerequisites & Next Steps

### Q: What background do I need before taking this course?

You should be comfortable with basic ML concepts (supervised vs. unsupervised learning, train/test split, overfitting) and have shipped or worked on at least one end-to-end ML project. The course assumes you've experienced the pain of a misaligned project—framing is more powerful if you've felt its absence. No specific tech stack is required; the focus is conceptual and decision-making.

### Q: How is this course different from typical ML courses that focus on algorithms?

Most ML courses teach *how to build* (algorithms, libraries, optimization). This course teaches *what to build*—the upstream thinking that prevents wasted effort. You'll use fewer fancy techniques but make better decisions about which techniques to use. Think of it as going from "how to code models" to "why that model for that problem."

### Q: Can I apply this course to non-AI problems?

Yes. The Loop and framing methodology apply to any complex decision under uncertainty. Product roadmap decisions, organizational restructuring, research directions—all benefit from explicit outcome definition, decomposition, alternatives exploration, trade-off analysis, and signal definition. The course examples use AI, but the framework is universal.

### Q: What should I study after this course?

Deepen in two directions: (1) **Specialized AI tracks**: dive into specific archetypes (LLM applications, computer vision, recommendation systems), or (2) **Broader decision-making**: study causal inference, decision theory, and organizational strategy to strengthen your framing skills across domains. The course prepares you to learn these effectively because you'll ask better questions.

### Q: How will this course help me in job interviews?

Interviewers (especially at senior levels) love candidates who ask clarifying questions and push back on vague requirements. This course trains that skill. When asked "Build an AI system for X," you'll decompose, ask about outcomes, and propose alternatives with trade-offs—exactly what senior engineers do. Your portfolio demonstrates this thinking concretely.

### Q: Can I use my portfolio from this course in my professional work?

Yes. Your portfolio documents real problem-framing decisions you've made (or analyzed from case studies). Use it to showcase your decision-making process to hiring managers, in promotion discussions, or when pitching ideas to leadership. The best portfolios include both successful and failed framings—they show you learn and iterate intentionally.

### Q: What's the relationship between this course and hands-on ML implementation?

This course is *upstream* of implementation. A strong framing saves 10x effort in implementation because you're building the right thing. But this course doesn't teach implementation—coding, deployment, monitoring are in other courses. Think of framing as the strategic layer and implementation as the tactical layer; both matter, but strategy must come first.

### Q: How often should I revisit the framing of an active project?

Quarterly or when you see misalignment signals (models underperforming, stakeholder confusion, shifting business goals). Don't reframe constantly—that's thrashing—but do revisit when evidence suggests your frame is incomplete. **Chapter 5** teaches how to distinguish between "we should adjust tactics" and "we should revisit the frame."
