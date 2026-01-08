# Chapter 6: Application - Quiz

**Course:** AI Problem Framing for AI Practitioners
**Chapter Type:** Advanced (Synthesis)
**Focus:** Case study analysis, pattern recognition across pivots, and practical application of the Monday Morning Checklist

---

## Instructions

This quiz contains 10 questions designed to assess your understanding of the Application chapter. Questions range from basic recall to complex synthesis tasks. For each question, select the best answer or provide your response as indicated.

**Time Estimate:** 30-45 minutes

---

## Questions

### 1. **Remember** | Classic ML Pivot Recognition

A team has spent 3 months building a rules-based invoice processing system that achieved 78% extraction accuracy. They realize accuracy is insufficient for their use case. Which of the following is the most direct Classic ML Pivot opportunity?

A) Switch to a completely different problem domain
B) Implement a fine-tuned language model for invoice extraction
C) Add more manual rules to improve the heuristic system
D) Hire more people to manually process invoices

**Correct Answer:** B

**Explanation:** A Classic ML Pivot involves moving from simpler approaches (rules-based) to machine learning when the simpler approach cannot achieve sufficient performance. Fine-tuning a language model represents a clear ML Pivot from rule-based extraction.

---

### 2. **Remember** | GenAI Pivot Identification

Which scenario best exemplifies a GenAI Pivot decision?

A) A team improves their existing classification model's hyperparameters
B) A team switches from traditional NLP pipelines to using a large language model's generation capabilities for text summarization
C) A team adds more training data to their existing regression model
D) A team changes their feature engineering approach

**Correct Answer:** B

**Explanation:** A GenAI Pivot represents a shift toward generative AI approaches when traditional models or simpler methods are insufficient. Moving to LLM-based generation for summarization is a classic GenAI Pivot.

---

### 3. **Understand** | Pattern Bridge Application

A healthcare organization successfully deployed a machine learning system to predict patient readmission risk, achieving high accuracy. They now want to apply the same pattern to predict no-show rates for appointments. What is this an example of?

A) Problem Pivot
B) Pattern Bridge
C) Scope Pivot
D) Tool Pivot

**Correct Answer:** B

**Explanation:** Pattern Bridging is the structured transfer of a successful problem-solving approach from one context (readmission prediction) to a similar but distinct problem (no-show prediction). It recognizes that the underlying pattern—predicting binary user behavior from historical data—transfers across domains.

---

### 4. **Understand** | Problem Portfolio Structure

A fintech company has identified 12 potential AI improvement opportunities across their platform. Before beginning development, they should use a Problem Portfolio to accomplish which of the following?

A) Immediately start implementation on all 12 problems in parallel
B) Rank and prioritize problems by business impact and solution feasibility
C) Assign each problem to a different engineer
D) Guarantee that all solutions will use the same ML architecture

**Correct Answer:** B

**Explanation:** A Problem Portfolio provides a structured inventory of related problems prioritized by business impact and solution feasibility. This enables strategic focus rather than chaotic parallel development.

---

### 5. **Apply** | Monday Morning Checklist in Practice

It's Monday morning, and your team is resuming work on a customer churn prediction model you started 2 weeks ago. Which question should NOT be part of your Monday Morning Checklist evaluation?

A) Has the business context changed (new competitive threat, market shift, organizational priorities)?
B) Are the data quality assumptions still valid?
C) What is the exact model architecture we used for our initial prototype?
D) Is the original problem we're solving still the most critical priority?

**Correct Answer:** C

**Explanation:** The Monday Morning Checklist is designed to validate whether your original framing remains sound. It focuses on business context, data validity, and strategic alignment—not implementation details like model architecture. Knowing the exact architecture doesn't help assess if you're solving the right problem.

---

### 6. **Apply** | Synthesis of Pivots and Signals

A team built a GenAI-powered customer service system using prompt engineering. After 2 weeks in production, they observe: high user satisfaction (90%) but increasing latency (5s → 12s response times) and rising API costs ($2K → $12K monthly). What decision does your Monday Morning Checklist suggest?

A) Continue with GenAI Pivot—the signals don't matter
B) Persist with current approach; user satisfaction is the only metric that matters
C) Evaluate whether the current approach is sustainable despite positive sentiment signals
D) Immediately switch to a Classic ML approach without analysis

**Correct Answer:** C

**Explanation:** The Monday Morning Checklist synthesizes multiple signals. While user satisfaction is a success signal, increasing latency and costs are leading indicators of operational strain. A responsible evaluation must weigh whether the current solution is sustainable given its cost and performance trajectory, even with positive user feedback. This might lead to an Approach Pivot toward a hybrid solution.

---

### 7. **Analyze** | Pattern Recognition Across Problem Domains

You're reviewing three completed projects: (1) a recommendation system using collaborative filtering, (2) a fraud detection system using anomaly detection, and (3) a demand forecasting system using time series prediction. Which Pattern Bridge opportunity exists?

A) All three should use identical algorithms
B) The anomaly detection pattern from fraud detection could apply to demand forecasting for identifying unusual market conditions
C) Recommendation systems and forecasting have no shared patterns
D) All three problems are fundamentally different and cannot share approaches

**Correct Answer:** B

**Explanation:** Pattern Bridging involves recognizing structural similarities across surface-level differences. Both fraud detection (identifying anomalies) and demand forecasting (modeling normal behavior) operate on the pattern of distinguishing expected from unexpected observations. The anomaly detection approach used in fraud could transfer to identifying unusual demand patterns caused by market disruptions.

---

### 8. **Analyze** | Evaluating Pivot Necessity Through Systematic Analysis

A logistics company tried a rules-based route optimization system. After 6 months, they achieved 85% of theoretical optimal routes. Their stakeholders ask: "Should we pivot to an ML-based approach?" What framework should guide this analysis?

A) Immediately pivot because 85% isn't perfect
B) Apply the Loop framework to diagnose: Does 85% solve the business problem? What are the constraints? What would ML realistically achieve? What are the costs?
C) Always use ML for optimization problems
D) Never pivot from rules-based systems

**Correct Answer:** B

**Explanation:** The decision to pivot is not binary "good vs. perfect" but strategic. The Loop framework guides analysis: Is the current solution adequate for business outcomes? Is the problem likely solvable better with ML (not just theoretically)? What are realistic improvements vs. implementation costs? What would the operational impact be?

---

### 9. **Evaluate** | Trade-off Analysis in Application Decisions

Your team must choose between two approaches for a new recommendation system:

**Approach A (Classic ML Pivot):** Train a collaborative filtering model on historical user-item interactions. Estimated accuracy: 88%, cost: $50K development, latency: 200ms, interpretability: Low

**Approach B (GenAI Pivot):** Use an LLM with prompt engineering to generate personalized recommendations. Estimated quality: 92% (subjective), cost: $15K development + $5K/month API fees, latency: 2-5s, interpretability: High

Which is not a legitimate evaluation criterion for deciding between these approaches?

A) Total cost of ownership over 12 months
B) Whether latency impact will degrade user experience
C) Whether A or B has the cooler sounding name
D) Whether interpretability is critical for stakeholder trust

**Correct Answer:** C

**Explanation:** Trade-off analysis must consider relevant business and technical dimensions: cost, performance, latency, interpretability, organizational fit, etc. The "coolness" of an approach name has zero bearing on whether it solves the problem effectively and sustainably.

---

### 10. **Create** | Comprehensive Problem Portfolio Decision

A healthcare organization has identified three AI opportunities in their Problem Portfolio:

1. **Readmission Prediction:** High business impact, moderate solution complexity, known domain patterns
2. **Drug Interaction Detection:** Medium business impact, high solution complexity (regulatory constraints), limited existing patterns
3. **Patient Communication Optimization:** High business impact, low solution complexity, strong Pattern Bridge from marketing domain

Using the concepts of Problem Portfolio, Pattern Bridge, and the Loop framework, rank these by implementation priority and justify your ranking in 2-3 sentences.

**Evaluation Criteria:**
- Does the ranking reflect sound strategic thinking?
- Are Pattern Bridge opportunities recognized and valued?
- Is the justification grounded in course concepts (Portfolio prioritization, Pattern Bridge value, Loop framework considerations)?
- Does the response acknowledge trade-offs or constraints?

**Model Answer:**

The ranking should be: (1) Patient Communication Optimization, (2) Readmission Prediction, (3) Drug Interaction Detection.

**Justification:** Patient Communication Optimization offers the best combination of high impact and low complexity, with immediate Pattern Bridge opportunity from marketing (proven transferable knowledge), enabling quick wins that build organizational AI capability. Readmission Prediction follows as a medium-risk, high-impact core healthcare application with known patterns. Drug Interaction Detection, while important, should be deferred until the team has built capability and tribal knowledge through earlier successes—the high regulatory and technical complexity requires deeper domain expertise that later Pattern Bridges could provide from completed projects.

---

## Bloom's Distribution Summary

| Level | Count | Questions |
|-------|-------|-----------|
| Remember | 2 | Q1, Q2 |
| Understand | 2 | Q3, Q4 |
| Apply | 2 | Q5, Q6 |
| Analyze | 2 | Q7, Q8 |
| Evaluate | 1 | Q9 |
| Create | 1 | Q10 |
| **Total** | **10** | |

---

## Key Concepts Assessed

- **ML Pivot & GenAI Pivot:** Recognition and application of when and why to transition from simpler to more complex approaches (Q1, Q2, Q6)
- **Pattern Bridge:** Understanding how successful patterns transfer across problem contexts (Q3, Q7)
- **Problem Portfolio:** Strategic prioritization of multiple AI opportunities (Q4, Q10)
- **Monday Morning Checklist:** Systematic re-validation of problem frames and decisions (Q5, Q6)
- **Signal Recognition & Synthesis:** Integrating multiple signals to make persist/pivot decisions (Q6, Q8)
- **Trade-off Analysis:** Evaluating competing priorities across multiple dimensions (Q9)
- **Systematic Decision-Making:** Applying frameworks over intuition (Q8, Q10)

---

## Answer Key & Scoring

**Multiple Choice Questions (Q1-Q9):** 1 point each = 9 points
**Essay Question (Q10):** 1 point = 1 point
**Total Possible:** 10 points

**Passing Score:** 7/10 (70%)
**Mastery:** 9/10 (90%)

### Scoring Rubric for Q10 (Create)

**1 point:** Ranking is provided with brief justification that references at least one course concept (Portfolio, Pattern Bridge, or Loop framework).

**0.5 points:** Ranking shows strategic thinking but justification lacks clear connection to course concepts.

**0 points:** Ranking is provided without justification, or justification is inaccurate.

---

## Discussion Prompts (Optional)

For deeper learning, consider these reflection questions:

1. **Pattern Bridge Analysis:** In your organization or field, what successful problem-solving patterns could be "bridged" to new contexts? What would make those bridges successful or risky?

2. **Monday Morning Checklist in Your Work:** Describe a project where the Monday Morning Checklist would have prevented or caught a strategic misalignment. What changed between the initial framing and when the issue was discovered?

3. **Problem Portfolio Trade-offs:** If you had to choose between solving a high-impact, high-complexity problem immediately versus deferring it to build capability through lower-complexity problems first, how would you justify that choice to a stakeholder?

4. **Pivot Recognition:** Think of a project where a pivot was needed but didn't happen (or vice versa). What signals should have been stronger? How would applying The Loop framework have changed the outcome?
