# Pivot Decision Matrix

Visualize multi-dimensional trade-offs across pivot alternatives using 2x2 matrices, bubble charts, radar plots, and weighted scoring to make defensible decisions when options have conflicting strengths.

## Interactive Simulation

<iframe src="main.html" width="100%" height="580" style="border: 1px solid #ccc; border-radius: 4px;" scrolling="no"></iframe>

## How to Use This MicroSim

### Quick Start
1. **Select a template** (Feature Pivot, Model Change, Market Shift, or Resource Reallocation) or start with "Custom"
2. **Choose visualization type:** 2x2 Matrix (default), Bubble Chart, Radar Chart, or Weighted Table
3. **Add your pivot options** if starting custom (aim for 4-8 alternatives to compare)
4. **Score each option** on relevant dimensions using sliders
5. **Adjust dimension weights** to reflect what matters most to your decision
6. **Analyze the visualization** to identify quick wins, money pits, and optimal trade-offs
7. **Use Compare Mode** to examine top contenders side-by-side

### Visualization Types

**2x2 Matrix (Impact vs. Effort):**
Best for quick, high-level comparison of alternatives when two dimensions dominate the decision.

- **Quick Wins (Bottom-right):** High impact, low effort—prioritize these
- **Big Bets (Top-right):** High impact, high effort—strategic investments requiring resources
- **Money Pits (Top-left):** Low impact, high effort—avoid these
- **Low Priority (Bottom-left):** Low impact, low effort—defer or skip

**Bubble Chart (3 Dimensions):**
Best when three dimensions matter (X-axis, Y-axis, bubble size). For example: Impact (X) vs. Risk (Y), sized by Confidence.

- Larger bubbles are more prominent on the third dimension
- Position shows two-dimensional trade-off
- Pareto frontier highlights non-dominated options (can't improve one dimension without worsening another)

**Radar Chart (Multi-dimensional Profile):**
Best for holistic comparison across 4-8 dimensions simultaneously.

- Each axis represents one dimension
- Larger polygons indicate stronger options overall
- Shape reveals strength/weakness patterns (e.g., technically strong but risky)

**Weighted Table (Comprehensive Scoring):**
Best for systematic, defensible decisions with many dimensions.

- Adjust dimension weights to reflect priorities
- Weighted score auto-calculates: Σ(dimension_score × dimension_weight) / Σ(weights)
- Sort by rank to see recommended options
- Export to CSV for stakeholder review

### Understanding Dimension Types

**Benefit Dimensions (higher is better):**
- Impact: User/business value created
- Value: Revenue or cost savings
- Speed: Time to market
- Certainty: Confidence in estimates
- Quality: Output excellence

**Cost Dimensions (lower is better):**
- Effort: Development time
- Cost: Budget required
- Risk: Uncertainty/downside
- Complexity: Maintenance burden

**Note:** The MicroSim automatically inverts cost dimensions in calculations (low effort = high score).

### Using the Pareto Frontier

The **Pareto frontier** connects all non-dominated options—those where you can't improve one dimension without sacrificing another.

**Key insight:** Options *not* on the frontier are suboptimal—there exists another option that's better on all dimensions (or equal on some, better on others).

**Decision strategy:**
1. Eliminate options below the frontier (dominated alternatives)
2. Choose among frontier options based on your priorities (dimension weights)
3. If undecided, run sensitivity analysis (adjust weights to see if recommendation changes)

### Compare Mode

Select 2-3 options to see a side-by-side comparison table:
- Row per dimension with scores for each option
- Difference column shows gaps
- Visual bars for quick scanning
- "Winner" indicator per dimension
- Overall recommendation based on weighted scores

**Use this when:**
- Narrowing from 5+ options to final 2-3
- Explaining trade-offs to stakeholders
- Debugging why scores are similar despite different profiles

## Learning Objectives

By using this MicroSim, you will:

1. **Evaluate** pivot options across multiple competing dimensions systematically
2. **Apply** the Pareto frontier concept to eliminate dominated alternatives
3. **Analyze** how dimension weights affect recommendations and rankings
4. **Create** defensible decision frameworks for stakeholder communication
5. **Recognize** that "best" is context-dependent—optimal choice depends on priorities

## Connection to Course Content

- **Chapter 3:** Trade-off Analysis—balancing competing objectives
- **Chapter 5:** Pivot Decisions—when and how to change course
- **Chapter 6:** Stakeholder Alignment—making decisions transparent and defensible
- **Chapter 7:** Resource Constraints—working within budget, time, and team limitations

## Worked Examples

### Example 1: Feature Pivot (Product Development)

**Scenario:** Your AI-powered shopping app has low engagement. You need to pivot the recommendation feature.

**Options:**
1. **AI Recommendation Engine:** High impact (8), High effort (7), High cost (8)
2. **Manual Curation:** Medium impact (6), Medium effort (5), Medium cost (4)
3. **Hybrid (AI + Human):** High impact (8), High effort (6), High cost (6)
4. **User-Generated:** Medium impact (5), Low effort (3), Low cost (2)
5. **No Personalization:** Low impact (2), Low effort (1), Low cost (1)

**2x2 Matrix (Impact vs. Effort):**
- **Quick Win:** User-Generated (medium impact, low effort)
- **Big Bet:** Hybrid (high impact, medium-high effort)
- **Money Pit:** Pure AI (high impact, but highest effort/cost)
- **Low Priority:** No Personalization

**Weighted Score Analysis:**
- Dimensions: Impact (weight: 10), Effort (weight: 8, inverted), Cost (weight: 6, inverted), Speed (weight: 7, inverted)
- **Winner:** Hybrid approach (balances impact with manageable effort/cost)
- **Runner-up:** User-Generated (fastest to market, decent impact)

**Decision:** Start with User-Generated for quick validation, then layer in Hybrid AI if initial results promising.

### Example 2: Model Change (Technical Pivot)

**Scenario:** Your image classifier has 75% accuracy but is too slow (500ms inference). Stakeholders demand improvement.

**Options:**
1. **Keep Current (Baseline):** Accuracy (5), Speed (2), Complexity (4), Interpretability (6)
2. **Transformer Model:** Accuracy (9), Speed (1), Complexity (9), Interpretability (3)
3. **Ensemble:** Accuracy (8), Speed (3), Complexity (8), Interpretability (4)
4. **Simplify to Linear:** Accuracy (3), Speed (10), Complexity (2), Interpretability (10)
5. **Third-Party API:** Accuracy (7), Speed (9), Complexity (1), Interpretability (5)

**Bubble Chart (Accuracy vs. Speed, sized by Interpretability):**
- **Pareto Frontier:** Third-Party API, Ensemble, Transformer
- **Dominated:** Keep Current (Third-Party API beats it on all dimensions)
- **Trade-off:** Transformer (best accuracy, worst speed) vs. Third-Party API (good accuracy, great speed)

**Weighted Score Analysis (Stakeholder: Product Manager):**
- Dimensions: Accuracy (weight: 7), Speed (weight: 9), Complexity (weight: 5, inverted), Interpretability (weight: 4)
- **Winner:** Third-Party API (balances accuracy and speed with low complexity)

**Weighted Score Analysis (Stakeholder: Data Scientist):**
- Dimensions: Accuracy (weight: 10), Speed (weight: 6), Complexity (weight: 3, inverted), Interpretability (weight: 5)
- **Winner:** Ensemble (maximizes accuracy while keeping reasonable speed)

**Decision:** Stakeholder priorities differ—Product Manager prioritizes speed/simplicity, Data Scientist prioritizes accuracy. Negotiation needed, or run A/B test comparing Third-Party API vs. Ensemble.

### Example 3: Market Shift (Strategic Pivot)

**Scenario:** Your AI tool has 500 SMB customers but growth plateaued. Consider pivoting to enterprise or freemium.

**Options:**
1. **Enterprise B2B:** Revenue Potential (9), CAC (8, inverted), Time to Revenue (7, inverted), Market Size (6), Competition (7, inverted), Team Fit (5)
2. **Consumer B2C:** Revenue Potential (7), CAC (4, inverted), Time to Revenue (5, inverted), Market Size (10), Competition (9, inverted), Team Fit (4)
3. **Freemium + Premium:** Revenue Potential (8), CAC (3, inverted), Time to Revenue (4, inverted), Market Size (8), Competition (8, inverted), Team Fit (7)
4. **White-Label Licensing:** Revenue Potential (6), CAC (5, inverted), Time to Revenue (6, inverted), Market Size (5), Competition (4, inverted), Team Fit (6)

**Radar Chart:**
- **Enterprise B2B:** Strong on revenue potential, weak on team fit and competition
- **Consumer B2C:** Huge market size, but fierce competition and CAC challenges
- **Freemium:** Balanced profile, strongest team fit
- **White-Label:** Most differentiated (least competition), but limited upside

**Weighted Score (Board Priorities):**
- Dimensions: Revenue Potential (weight: 10), Time to Revenue (weight: 8), Market Size (weight: 6), Competition (weight: 7), Team Fit (weight: 5)
- **Winner:** Freemium (scores well across all dimensions, no critical weaknesses)
- **Runner-up:** Enterprise B2B (highest revenue potential, but execution risk on team fit)

**Decision:** Pursue Freemium with option to upsell SMB customers to Premium tier. Monitor Enterprise demand and revisit in 12 months if traction.

## Strategic Insights

### When Options Have Similar Weighted Scores

**Scenario:** Top two options within 5% of each other

**Strategies:**
1. **Sensitivity analysis:** Adjust dimension weights to see if recommendation changes
2. **De-risking:** Choose option with fewer critical weaknesses (no dimension < 3/10)
3. **Experimentation:** Run limited pilot/A/B test to gather real data
4. **Stakeholder tiebreaker:** Let key decision-maker prioritize based on strategic vision

### When No Clear Quick Wins Exist

**All options are high effort or low impact**

**Strategies:**
1. **Question the framing:** Are these really the only options? Generate more alternatives
2. **Phased approach:** Break big bets into smaller milestones
3. **Hybrid solutions:** Combine elements of multiple options
4. **Defer decision:** Gather more data before committing

### When Stakeholders Disagree on Weights

**Example:** Engineering wants low complexity, Sales wants high impact, Finance wants low cost

**Strategies:**
1. **Show multiple weighted views:** One per stakeholder role
2. **Find consensus option:** Option that scores well across all weighting schemes
3. **Sequential optimization:** Satisfy critical constraint first (e.g., cost < $50K), then optimize impact
4. **Escalate to executive:** Let leadership set priority order

## Design Principles for Good Decision Matrices

### Characteristics of Effective Dimensions

**Independent:** Dimensions shouldn't be redundant
- Bad: "Impact" and "Value" (highly correlated)
- Good: "Impact" (user outcomes) and "Cost" (budget)

**Measurable:** Scores should be based on evidence, not just intuition
- Bad: "Strategic fit" (vague)
- Good: "Time to first customer" (concrete, measurable)

**Actionable:** Dimensions should matter to the decision
- Bad: "Technology coolness" (doesn't affect success)
- Good: "Regulatory compliance risk" (critical for healthcare AI)

**Balanced:** Mix of benefit and cost dimensions
- Bad: All benefit dimensions → Every option looks good
- Good: Impact, Speed (benefits) vs. Cost, Risk (costs)

### How Many Options to Compare

- **Too few (< 3):** Limited exploration, may miss better alternatives
- **Sweet spot (4-8):** Enough diversity without overwhelming analysis
- **Too many (> 10):** Decision paralysis, visualization clutter

**Strategy:** Start with brainstorm (10+ options), eliminate obvious non-starters, analyze remaining 4-8 in depth.

### Scoring Calibration

**Common mistakes:**
- **Grade inflation:** Everything scores 7-10, no differentiation
- **Sandbagging:** Everything scores 3-6, loses aspirational options
- **Relative vs. absolute:** Mixing "best in this set" with "best imaginable"

**Best practice:**
- **Anchor the scale:** Define what 0, 5, and 10 mean concretely
  - Example (Impact): 0 = no user value, 5 = 10% engagement lift, 10 = 2x growth
- **Use evidence:** Base scores on data, user research, benchmarks
- **Document assumptions:** Note uncertainties in option descriptions

## Common Pitfalls

1. **Ignoring the Pareto frontier:** Wasting time analyzing dominated options
   - Solution: Eliminate non-frontier options early

2. **Overweighting easy-to-measure dimensions:** Effort/cost are concrete, impact is uncertain
   - Solution: Resist bias toward known quantities, force rigorous impact estimation

3. **Analysis paralysis:** Adding more dimensions indefinitely
   - Solution: Limit to 5-8 dimensions, focus on decision-critical factors

4. **Forgetting opportunity cost:** Choosing Option A means NOT choosing Option B
   - Solution: Compare mode highlights what you're giving up

5. **Treating weights as static:** Priorities change as project progresses
   - Solution: Revisit weights quarterly, re-run analysis with updated priorities

## Reflection Questions

After completing your pivot decision matrix:

1. **Robustness:** If your top dimension weight changed by 50%, would the recommended option still win?
2. **Regret minimization:** Which option would you least regret choosing if you're wrong about assumptions?
3. **Reversibility:** How hard is it to switch from your chosen option if it fails?
4. **Evidence gaps:** Which dimension scores have the highest uncertainty? Can you de-risk with experiments?
5. **Team alignment:** Would your team agree with these weights and scores, or do you need negotiation?

## Assessment Applications

This MicroSim supports:
- **Homework 5:** Pivot Decision Analysis
- **Midterm Case Study:** Evaluate pivot options for a failing AI product
- **Final Project:** Create and defend pivot decision matrix with 5+ alternatives
- **Peer Review:** Critique classmates' dimension selection, scoring, and weighting
- **Team Exercise:** Negotiate stakeholder weights to reach consensus recommendation
- **Written Report:** Document decision rationale with sensitivity analysis
