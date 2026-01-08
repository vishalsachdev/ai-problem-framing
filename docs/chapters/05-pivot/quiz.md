# Chapter 5: Pivot - Quiz

**Chapter Type:** Advanced | **Difficulty:** Graduate-level | **Total Questions:** 10

This quiz assesses your understanding of when and how to make persist, pivot, and stop decisions in AI problem framing. Focus areas include signal recognition, decision thresholds, sunk cost fallacy awareness, and system-level reframes.

---

## Question 1 (Remember) | Decision Options

Your team has spent 6 weeks building a classification model to predict which customers will churn. Early performance metrics show 78% accuracy, but stakeholder feedback indicates the business needs 85% accuracy to act on predictions reliably.

**What are the three core decision options your team faces at this point?**

A) Build a more complex model, hire more data scientists, or abandon the project entirely
B) Persist with optimization, pivot to a different approach, or stop the project
C) Collect more data, improve feature engineering, or switch to a regression model
D) Deploy immediately, wait for more data, or consult with executives

**Correct Answer:** B

**Explanation:** The three fundamental decision options in The Loop are:
- **Persist:** Continue with the current problem frame and solution approach
- **Pivot:** Change the problem frame, approach, or resource allocation
- **Stop:** Abandon the current direction as unviable

Options A and C confuse specific tactics with strategic decision choices. Option D conflates decision-making with stakeholder management.

---

## Question 2 (Remember) | Signal Recognition Definition

Which of the following best describes **Signal Recognition** in the context of pivot decisions?

A) The ability to statistically detect anomalies in data streams
B) The ability to identify early indicators that current strategy is working or needs to change
C) The process of collecting metrics from production models
D) The technique of filtering out noise from sensor data

**Correct Answer:** B

**Explanation:** Signal recognition is the cognitive skill of identifying early indicators or patterns that suggest whether the current approach should continue (success signal) or change (kill signal). It's distinct from data anomaly detection or production monitoring, though those activities may feed signal recognition.

---

## Question 3 (Understand) | Sunk Cost Fallacy in Decision-Making

A team has invested 8 weeks and $120,000 in building an end-to-end ML pipeline for demand forecasting. During a sprint retrospective, they discover that a simple statistical baseline (which takes 2 hours to build) would achieve 89% of the pipeline's accuracy at a fraction of the cost.

**What cognitive bias is most at play if the team decides to continue with the ML pipeline despite this discovery?**

A) Confirmation bias—they only see evidence supporting their original approach
B) Escalation of commitment—continuing to invest despite evidence the current path is suboptimal
C) Hammer bias—they're overreliant on machine learning as a tool
D) Anchoring bias—they're fixated on the original 8-week timeline

**Correct Answer:** B

**Explanation:** Escalation of commitment describes the tendency to continue investing in a course of action despite evidence it is failing or suboptimal, driven by sunk costs and desire to avoid admitting past mistakes. The team has already "spent" the $120,000 and 8 weeks; the rational decision (pivot to the simpler approach) is emotionally difficult because it feels like acknowledging waste. This is the definition of sunk cost fallacy in action.

---

## Question 4 (Understand) | Decision Threshold Concept

You're building a model to identify patients at high risk for hospital readmission. Your model outputs a probability between 0 and 1. The hospital can only accommodate intensive follow-up interventions for 15% of patients due to resource constraints.

**How does understanding Decision Threshold inform your pivot/persist decision?**

A) It determines which algorithm (neural networks vs. random forest) you should use
B) It establishes the boundary probability value used to convert continuous model outputs into actionable decisions
C) It tells you how much data you need to collect
D) It measures whether your training data is representative of production

**Correct Answer:** B

**Explanation:** A decision threshold is the boundary value that converts the model's continuous output (probability) into a discrete action (intervene or don't intervene). In this case, you'd set the threshold so that the top 15% of patients by risk score are targeted. If the model cannot distinguish patients sharply enough to enable meaningful action at that threshold, it becomes a signal to pivot away from prediction and toward other approaches.

---

## Question 5 (Apply) | Recognizing a Pivot Signal

A recommendation system has been in production for 6 months. Initial metrics showed a 12% increase in user engagement. However, you notice:
- Engagement gains have plateaued for 8 weeks despite weekly model retraining
- User satisfaction surveys show engagement is increasingly driven by novelty shock rather than genuine preference matches
- A/B tests of competing recommendation strategies show no statistical difference

**Which decision best reflects the signal your data is sending?**

A) Persist—you should continue optimizing the model parameters to break through the plateau
B) Pivot—the current frame (accuracy-driven recommendations) may not address why engagement is stalling
C) Stop—recommendation systems cannot sustain engagement improvements over time
D) Persist with more data—collect user feedback to improve the training signal

**Correct Answer:** B

**Explanation:** The plateau, lack of improvement despite effort, and user satisfaction data all suggest the current problem frame (predict what users will engage with) may not be addressing the underlying issue (sustained preference matching). A pivot might reframe the problem toward: diversity, serendipity, preference discovery, or longer-term satisfaction rather than immediate engagement. Continuing to optimize a fundamentally limited approach (Answer A) represents escalation of commitment.

---

## Question 6 (Apply) | Sunk Cost vs. Sound Decision

Your team built a sophisticated NLP pipeline for analyzing customer support tickets (3 months of work, high complexity). A new intern asks: "Why don't we just use the off-the-shelf sentiment analysis API? It's $500/month, handles our volume, and would save us massive maintenance overhead."

Initial reaction from senior engineers: "We've already invested so much in our custom pipeline—we can't throw away all that work."

**How should leadership evaluate this intern's suggestion?**

A) Reject it outright—the sunk cost of 3 months of work justifies continuing with the pipeline
B) Evaluate based on forward-looking factors (cost, accuracy, maintenance, time to deploy improvements) independent of past investment
C) Implement a hybrid approach combining both systems to recoup the sunk investment
D) Conduct a full rewrite of the custom pipeline to prove its superiority before considering alternatives

**Correct Answer:** B

**Explanation:** Rational decision-making requires evaluating options based on *forward-looking* factors: future cost, performance, maintainability, and time to value. The 3 months already spent is a sunk cost—it doesn't change whether the intern's alternative is better going forward. Good leaders make this distinction explicit and protect teams from escalation of commitment bias by asking: "If we were starting today with this choice, which would we pick?" If the answer is the API, that's a strong pivot signal.

---

## Question 7 (Analyze) | System-Level Reframe in Pivoting

A bank built a model to detect fraudulent credit card transactions. The model achieves 95% accuracy but creates operational problems: legitimate transactions are blocked at high rates, customer frustration is mounting, and support costs are rising.

Tactical pivots attempted:
- Adjusted the decision threshold (still too many false positives)
- Added new features to improve precision (marginal gains)
- Switched to different algorithms (similar results)

**Why might a System-Level Reframe be necessary here? Which reframe makes most sense?**

A) The problem frame is still "identify fraud with high accuracy"—a System-Level Reframe might shift to "minimize fraud AND customer friction" or "balance fraud loss with operational cost"
B) The system architecture is outdated and needs modernization
C) The bank should build separate models for different customer segments
D) The team needs to hire fraud domain experts to improve feature engineering

**Correct Answer:** A

**Explanation:** A system-level reframe changes the *boundaries, stakeholders, or goals* of the problem, not just the tactical approach. The team has been optimizing within a narrow frame (accuracy), but the system-level problem includes multiple competing objectives: fraud prevention, customer trust, operational efficiency, and business cost. Reframing to explicitly balance these creates room for new solutions—like risk-tiered interventions (high-confidence fraud blocks, medium-confidence challenges, low-confidence approvals), real-time customer contact, or fraud scoring without hard blocks.

---

## Question 8 (Analyze) | Multiple Pivot Types Decision

You're working on a churn prediction project where diagnosis revealed: "Customers leave because of unresolved support tickets, not product dissatisfaction."

Your team is debating how to respond:
- **Person A:** Pivot the Problem—move from predicting churn to solving support quality
- **Person B:** Pivot the Approach—use the churn model but add support ticket features
- **Person C:** Pivot the Tool—switch from ML classification to a rules-based support escalation system

**Which pivot type(s) directly address the root cause you've identified?**

A) Only Person A's Problem Pivot
B) Person B's Approach Pivot alone addresses it best
C) Persons A and C; pivoting the problem and/or tool aligns with the diagnosis
D) All three pivots are equally valid responses

**Correct Answer:** C

**Explanation:**
- **Problem Pivot** (Person A): Directly reframes from "predict churn" to "prevent unresolved tickets," addressing root cause
- **Approach Pivot** (Person B): Optimizes the original frame rather than addressing the root cause—this is escalation of commitment
- **Tool Pivot** (Person C): A rules-based escalation system might be more appropriate than ML classification for a deterministic support problem

Either the problem or tool pivot (or both) align with your diagnosis. The approach pivot keeps you in the original frame.

---

## Question 9 (Analyze) | Evaluating Conflicting Signals

Your demand forecasting model is showing mixed signals:
- Production accuracy has remained stable at 87% for 12 weeks
- Stakeholders are increasingly frustrated that the model misses seasonal patterns (e.g., Black Friday spike)
- A/B testing shows the model-driven inventory decisions outperform human judgment by 4% in waste reduction
- The model is computationally expensive (requires 6 hours to retrain daily)
- New competitors are using real-time pricing signals your model doesn't incorporate

**How should you prioritize these conflicting signals when deciding persist/pivot/stop?**

A) Persist because overall accuracy is stable and business impact is positive
B) Stop because competitors have newer approaches
C) Systematically weight signals by business impact and feasibility—the seasonal pattern misses and real-time data gaps may signal a pivot toward ensemble or hybrid approaches
D) Pivot immediately without further analysis because 6 hours of computation is unacceptable

**Correct Answer:** C

**Explanation:** Real-world decisions involve conflicting signals. The framework asks you to:
1. Weight signals by business impact (customer frustration from seasonal misses, competitive threat from missing real-time data)
2. Assess feasibility of addressing each signal
3. Determine if the current frame is sufficient or needs reframing

The positive business impact argues for persistence in the core idea, but the unaddressed seasonal and real-time patterns suggest a pivot toward more sophisticated approaches (ensemble with seasonal models, real-time data integration) rather than stop.

---

## Question 10 (Evaluate) | Justifying a Pivot Decision

You're presenting a decision to pivot away from a supervised learning approach to churn prediction and instead adopt a system redesign focused on reducing the friction points causing churn (based on recent user research).

A skeptical VP asks: "We spent $300K building the ML system. Why should we trust your diagnosis over the work we've already done?"

**Which justification most directly addresses the VP's legitimate concern and demonstrates sound reasoning?**

A) "The new approach will cost less and deploy faster, so the ROI will be better"
B) "The user research identified root causes that the data alone cannot reveal; the ML model optimizes for a symptom (churn prediction) rather than the underlying problem (friction). We're pivoting because the problem frame itself was incomplete"
C) "The old approach was based on flawed assumptions that your team didn't catch during initial design"
D) "New machine learning techniques have become available that will definitely work better"

**Correct Answer:** B

**Explanation:** This answer demonstrates:
- **Clear problem reframing:** Distinguishes between the symptom (churn events) and root cause (system friction)
- **Reasoning transparency:** Explains why the original frame was incomplete, not attacking the team's competence
- **Forward-looking perspective:** Focuses on what will actually solve the business problem, not on justifying past investment
- **Diagnostic confidence:** Grounds the pivot in additional evidence (user research) that the original problem frame missed

Answers A and D appeal to cost/novelty without addressing root cause. Answer C attacks the original team, creating defensiveness rather than alignment. Answer B invites the VP to understand why the pivot is necessary, converting skepticism into support.

---

## Answer Key Summary

| Question | Type | Answer | Concept |
|----------|------|--------|---------|
| 1 | Remember | B | Decision Options (Persist/Pivot/Stop) |
| 2 | Remember | B | Signal Recognition |
| 3 | Understand | B | Escalation of Commitment / Sunk Cost |
| 4 | Understand | B | Decision Threshold |
| 5 | Apply | B | Recognizing Pivot Signals |
| 6 | Apply | B | Sunk Cost Fallacy in Decision-Making |
| 7 | Analyze | A | System-Level Reframe |
| 8 | Analyze | C | Pivot Types (Problem/Approach/Tool) |
| 9 | Analyze | C | Conflicting Signal Prioritization |
| 10 | Evaluate | B | Justifying Pivot with Sound Reasoning |

---

## Distribution Achieved

- **Remember:** 2 questions (20%)
- **Understand:** 2 questions (20%)
- **Apply:** 2 questions (20%)
- **Analyze:** 3 questions (30%)
- **Evaluate:** 1 question (10%)
- **Create:** 0 questions (0%)

**Total:** 10 questions aligned to Advanced chapter requirements and core teaching focus areas.
