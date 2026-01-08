# AI Alternatives Decision Tree

Navigate problem characteristics systematically to discover whether AI, traditional software, or hybrid approaches best fit your needs.

## Interactive Simulation

<iframe src="main.html" width="100%" height="550px" style="border: 1px solid #ccc; border-radius: 8px;" scrolling="no"></iframe>

## How to Use This MicroSim

### Quick Start
1. **Adjust the controls** on the right panel to describe your problem characteristics
2. **Watch the tree dynamically update** as decision paths illuminate based on your inputs
3. **Follow the highlighted path** from root to leaf to see the recommended approach
4. **Read the recommendation** to understand why this solution fits your constraints
5. **Explore alternatives** by tweaking controls to see how recommendations change

### Understanding the Tree

**Node Types:**
- **Hexagons (Decision Points):** Questions about your problem that guide the recommendation
- **Rectangles (Recommendations):** Specific solution approaches at the end of each path
- **Arrows (Paths):** Labeled with conditions that lead from one decision to the next

**Color Meanings:**
- **Green:** Simple/non-AI solutions (rules, heuristics, traditional algorithms)
- **Yellow:** Hybrid approaches (combining rules with ML)
- **Blue:** Traditional machine learning (regression, decision trees, random forests)
- **Purple:** Deep learning (neural networks, transformers)
- **Red:** Not recommended given your constraints

**Confidence Meter:**
The bar chart shows how well your inputs align with the recommendation. High confidence (>80%) means strong fit; low confidence (<60%) suggests edge case or conflicting requirements.

### Key Controls to Understand

**Data Availability:** How much labeled training data do you have? AI needs data to learn patterns.

**Pattern Complexity:** Can you write simple if-then rules, or are relationships too complex/unknown?

**Latency Requirements:** How fast must the system respond? Real-time needs favor simpler models.

**Interpretability:** Do stakeholders need to understand why decisions were made?

**Budget Constraint:** Development, infrastructure, and maintenance costs vary dramatically by approach.

## Learning Objectives

By using this MicroSim, you will:

1. **Evaluate** problem characteristics systematically rather than jumping to solutions
2. **Apply** decision criteria to match technology to need, not hype
3. **Analyze** trade-offs between different solution approaches
4. **Recognize** when simpler non-AI solutions outperform complex ML systems
5. **Justify** technology choices based on evidence and constraints

## Connection to Course Content

- **Chapter 2:** AI vs. Non-AI Alternatives—when is AI the right tool?
- **Chapter 3:** Trade-off Analysis—balancing accuracy, cost, speed, interpretability
- **Chapter 5:** Pivoting Decisions—recognizing when to switch approaches
- **Chapter 6:** Implementation Constraints—budget, timeline, team expertise

## Worked Examples

### Example 1: Customer Support Routing
**Problem:** Route customer emails to correct department
- **Data:** 10,000 labeled historical emails
- **Pattern:** Multi-factor (keywords, sentiment, urgency)
- **Latency:** 1 second acceptable
- **Interpretability:** Helpful for quality assurance

**Recommendation:** Traditional ML (Naive Bayes or Logistic Regression)
- Fast training and inference
- Interpretable feature weights
- Sufficient data for good accuracy
- Low infrastructure costs

### Example 2: Fraud Detection
**Problem:** Flag suspicious financial transactions in real-time
- **Data:** Millions of transactions, rare fraud cases
- **Pattern:** Complex, evolving fraud patterns
- **Latency:** <50ms required
- **Interpretability:** Critical for regulatory compliance

**Recommendation:** Hybrid (Rules + Lightweight ML)
- Known fraud patterns → Rules (instant, explainable)
- Novel patterns → Gradient Boosting (fast inference, feature importance)
- Handles class imbalance with sampling techniques

### Example 3: Content Moderation
**Problem:** Detect harmful content in user posts
- **Data:** Abundant, diverse dataset
- **Pattern:** Subtle context-dependent violations
- **Latency:** Batch processing acceptable (review within 5 minutes)
- **Interpretability:** Helpful for appeals process

**Recommendation:** Deep Learning (Fine-tuned Transformer)
- Understands context and nuance
- Transfer learning from pre-trained models
- High accuracy on complex cases
- Generate explanations via attention weights

## Common Insights

### When Simple Beats Complex
- **Clear business rules exist:** Don't use ML to learn what you already know
- **Small datasets:** Rules or transfer learning outperform custom models
- **High-stakes decisions:** Interpretability often trumps marginal accuracy gains
- **Tight budgets:** Open-source rules-based systems cost far less than ML infrastructure

### When to Choose Hybrid
- **Known patterns + edge cases:** Rules for 80%, ML for 20%
- **Gradual rollout:** Start with rules, add ML incrementally
- **Regulatory constraints:** Rules for compliance-critical paths, ML for optimization
- **Team expertise:** Leverage domain knowledge via rules, ML for unknowns

### When AI Makes Sense
- **Abundant data:** You have 10K+ labeled examples
- **Complex patterns:** Relationships are non-linear or unknown
- **Performance matters:** Accuracy gains justify costs
- **Evolving domains:** Patterns change, requiring adaptive models

## Reflection Questions

After exploring the decision tree, consider:

1. **What surprised you?** Did simpler solutions work for problems you assumed needed AI?
2. **What constraints matter most?** Which inputs most dramatically changed recommendations?
3. **Where are you biased?** Do you default to complex solutions when simple ones suffice?
4. **How would you explain this?** Could you justify your recommendation to a non-technical stakeholder?

## Assessment Applications

This MicroSim supports:
- **Homework 3:** Technology Selection Justification
- **Midterm Question:** "Given these constraints, recommend and defend a solution approach"
- **Final Project:** Technology choice documentation and trade-off analysis
- **Peer Review:** Critique classmates' algorithm selections using this framework
