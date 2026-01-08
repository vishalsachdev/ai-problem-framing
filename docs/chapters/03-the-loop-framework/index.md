# Chapter 3: The Loop Framework

## Learning Objectives

By the end of this chapter, you will be able to:

1. **Apply** the 5-step Loop framework systematically to any AI problem, from initial ambiguity to actionable implementation plan
2. **Define** outcome metrics that properly frame problems and distinguish between vanity metrics and meaningful business outcomes
3. **Deconstruct** complex problems into atomic units and surface hidden assumptions that constrain solution approaches
4. **Generate** comprehensive alternative menus by systematically mapping solution archetypes to problem characteristics
5. **Evaluate** trade-offs between alternatives across multiple dimensions including cost, latency, accuracy, interpretability, maintenance burden, and organizational fit
6. **Design** signal systems that enable early detection of success, failure, and leading indicators of project health
7. **Synthesize** complete problem framings that demonstrate systematic thinking from outcome clarity through signal-based decision making

## Introduction

In 1986, the Space Shuttle Challenger exploded 73 seconds after launch, killing all seven crew members. The Rogers Commission investigation revealed that engineers had identified O-ring vulnerability to cold temperatures but lacked a systematic framework for escalating concerns and making go/no-go decisions. NASA had checklist culture for technical operations but no equivalent framework for strategic decision-making under uncertainty.

The tragedy illustrates a broader truth: humans are poor at systematic decision-making without explicit frameworks. We skip steps, follow intuition, succumb to pressure, and rationalize away warning signs. AI problem framing suffers from the same challenges. Teams jump from vague business objectives directly to implementation without systematic analysis. They choose solutions based on familiarity rather than fit. They miss early warning signals until projects are too far committed to pivot.

**The Loop framework provides what NASA's pre-flight checklist provides for launches: a systematic, repeatable process that forces deliberate thinking at each critical decision point.** You cannot skip steps. You must explicitly surface assumptions. You generate alternatives before committing. You define success and failure criteria upfront. You establish leading indicators that catch problems early.

This chapter introduces The Loop—a five-step framework that transforms ambiguous business problems into actionable AI initiatives:

1. **OUTCOME**: Define the metric that operationalizes success
2. **DECONSTRUCTION**: Identify the atomic unit and surface assumptions
3. **ALTERNATIVES**: Build a comprehensive menu of solution approaches
4. **TRADE-OFFS**: Choose between alternatives using explicit criteria
5. **SIGNALS**: Define success indicators, kill signals, and leading metrics

The Loop is not a one-time analysis. You cycle through it repeatedly as you learn from implementation. Initial outcome definitions get refined. Assumptions get validated or disproven. Alternatives get added or eliminated. Trade-off priorities shift with changing constraints. Signals get recalibrated based on what actually predicts success.

Think of The Loop as a diagnostic and navigation tool. When projects feel stuck, working through The Loop reveals where the framing broke down. When stakeholders disagree, The Loop provides structured language for articulating differences. When new information arrives, The Loop helps you decide whether to persist, pivot, or stop.

By the end of this chapter, you'll have applied The Loop to two complete case studies—one classic ML problem (churn prediction) and one GenAI application (invoice processing). You'll understand not just what The Loop is, but how to use it as a practical problem-solving tool in messy, real-world contexts.

## The Loop: Overview

The Loop framework consists of five interconnected steps, each building on the previous one:

```
OUTCOME → DECONSTRUCTION → ALTERNATIVES → TRADE-OFFS → SIGNALS
   ↑                                                        ↓
   ←←←←←←←←←←←←←← LEARN & ITERATE ←←←←←←←←←←←←←←←←←←←←←←←←←←
```

### Why "The Loop"?

The framework is called "The Loop" because it's cyclical, not linear. You don't execute steps 1-5 once and declare victory. Instead:

- **Initial framing** is based on incomplete information and assumptions
- **Implementation** generates new data about what works and what doesn't
- **Signals** reveal whether your framing was correct or needs adjustment
- **Learning** feeds back into refined outcome definitions, reconsidered assumptions, and updated alternatives

The best AI teams cycle through The Loop quickly, using each iteration to test assumptions and refine understanding. Weak teams treat initial framing as gospel and ignore signals that contradict their original frame.

### The Five Steps

**Step 1: OUTCOME** — The metric IS the frame. Choosing "reduce churn by 10%" versus "increase lifetime value by 20%" fundamentally changes what problem you're solving. This step forces explicit articulation of what success means, making disagreements visible before you commit resources.

**Step 2: DECONSTRUCTION** — Complex problems hide multiple sub-problems. This step breaks monolithic business objectives into atomic units (the smallest meaningful component) and surfaces hidden assumptions (the beliefs that, if false, invalidate your entire approach). Deconstruction reveals where your frame is fragile.

**Step 3: ALTERNATIVES** — Most teams converge on a single solution too quickly. This step forces generation of a comprehensive menu by systematically mapping solution archetypes to your problem characteristics. The goal is breadth before depth—creating options before committing.

**Step 4: TRADE-OFFS** — No solution dominates across all dimensions. This step makes trade-offs explicit: cost vs. accuracy, latency vs. personalization, interpretability vs. performance, organizational fit vs. technical elegance. Transparent trade-offs enable better decisions and clearer communication.

**Step 5: SIGNALS** — How will you know if you're succeeding, failing, or heading toward trouble? This step defines three types of signals: success indicators (we're on track), kill signals (we should stop), and leading indicators (early predictors of outcomes). Clear signals enable fast pivots before sunk costs become overwhelming.

### The Canvases

Throughout this chapter, you'll encounter four structured canvases that operationalize The Loop:

1. **Atomic Unit Canvas** — Helps identify the smallest meaningful problem component and associated assumptions
2. **Pre-Flight Checklist** — Ensures all critical framing questions are answered before implementation
3. **Trade-off Canvas** — Structures evaluation of alternatives across key dimensions
4. **Signals Canvas** — Documents success metrics, kill signals, and leading indicators

These aren't bureaucratic paperwork—they're thinking tools. Filling them out forces explicit reasoning that reveals gaps in your framing. Teams that skip the canvases consistently miss important considerations.

### How to Use The Loop

**For new problems**: Work through steps 1-5 sequentially, using canvases to document your reasoning. Share with stakeholders to surface disagreements early.

**For in-flight projects**: Use The Loop diagnostically. If a project feels stuck, work backward through the steps to find where framing broke down. Often the root cause is an invalid assumption (Step 2) or an unstated trade-off (Step 4).

**For learning**: After implementation, cycle back through The Loop with new data. Update your outcome definition, validate assumptions, reconsider alternatives, adjust trade-offs, and recalibrate signals. Each iteration makes your framing more robust.

Let's examine each step in detail.

---

## Step 1: Outcome

**The outcome metric IS the problem frame.** This is the most important insight in problem framing: different metrics imply fundamentally different problems, even when stakeholders use the same casual language.

Consider "reduce customer churn." What does this actually mean?

- **Reduce churn rate by 10%** → Focus on preventing departures across all customers
- **Reduce churn among high-value customers by 15%** → Focus on a specific segment
- **Increase customer lifetime value by 20%** → Focus on value, not just retention
- **Reduce time-to-churn after negative events by 30 days** → Focus on recovery windows
- **Increase successful intervention rate from 20% to 40%** → Focus on action effectiveness

Each metric frames a different problem requiring different solutions. The first optimizes for broad retention. The second requires customer segmentation and prioritization. The third might accept higher churn if remaining customers spend more. The fourth focuses on detecting and responding to trigger events. The fifth evaluates intervention quality, not churn directly.

**Most AI projects fail because teams never explicitly chose which outcome metric they're optimizing.** Different stakeholders have different implicit metrics in mind. Engineers optimize for accuracy. Product managers optimize for adoption. Executives optimize for revenue impact. Without explicit alignment on THE metric, teams build technically sound systems that fail to deliver business value.

### Key Idea: Outcome Clarity Creates Constraints

A well-defined outcome metric constrains the solution space in productive ways:

- **Time horizon**: "30-day churn prediction" implies different features and models than "12-month churn prediction"
- **Granularity**: "Customer-level churn" differs from "subscription-level churn" when customers have multiple subscriptions
- **Actionability**: "Predict churn 60 days early" differs from "predict churn probability" if you need lead time for interventions
- **Segments**: "Reduce churn in enterprise customers" may require different approaches than "reduce churn in SMB customers"

Vague outcomes ("improve customer retention") provide no constraints. Teams waste time building solutions that might not matter. Specific outcomes ("increase 90-day retention rate among enterprise customers from 75% to 82% within 6 months") immediately clarify what you're optimizing for, what the baseline is, what success means, and what timeframe matters.

### Example: Churn Metric Choices

Let's examine how different outcome metrics lead to different problem frames for a SaaS company:

**Scenario A: Minimize overall churn rate**
- **Metric**: Reduce monthly churn from 5% to 4%
- **Implication**: Optimize for breadth across all customer segments
- **Solution direction**: Identify common churn patterns, broad retention campaigns
- **Data needs**: Historical churn across all customers, shared characteristics
- **Success**: Any customer retained counts equally

**Scenario B: Maximize customer lifetime value**
- **Metric**: Increase average LTV from $1,200 to $1,500
- **Implication**: High-value retention matters more than preventing all churn
- **Solution direction**: Focus retention efforts on high-value or high-potential customers
- **Data needs**: Revenue data, growth trajectories, segment profitability
- **Success**: Losing low-value customers may be acceptable if high-value customers stay

**Scenario C: Reduce preventable churn**
- **Metric**: Increase save rate for at-risk customers from 20% to 35%
- **Implication**: Focus on customers where intervention can make a difference
- **Solution direction**: Identify actionable signals, optimize intervention effectiveness
- **Data needs**: Historical intervention attempts and outcomes, trigger events
- **Success**: Not all churn is preventable—optimize for cases where you have leverage

**Scenario D: Extend customer engagement window**
- **Metric**: Increase median time-to-churn from 8 months to 11 months
- **Implication**: Focus on onboarding, habit formation, value realization
- **Solution direction**: Identify and accelerate paths to product-market fit
- **Data needs**: Engagement patterns, feature adoption, time-series behavior
- **Success**: Customers who eventually churn but stay longer still count as wins

Each metric implies different features, different models, different interventions, and different definitions of success. **Choosing the wrong metric means solving the wrong problem—no amount of technical excellence compensates.**

### Try It: Outcome Definition for Your Problem

Before moving forward, apply outcome thinking to a problem you're facing:

1. **State the vague business objective** (e.g., "improve customer satisfaction")
2. **Generate 4-5 specific outcome metrics** that could operationalize this objective
3. **For each metric, articulate**:
   - What behavior or result it optimizes for
   - What constraints it implies (time horizon, granularity, segments)
   - What trade-offs it accepts (what it's willing to sacrifice)
4. **Choose one metric and justify** why it's the right frame for your context

This exercise reveals how much interpretation lies hidden in casual business language. Make these interpretations explicit before choosing solutions.

---

## Step 2: Deconstruction

Once you've defined the outcome, the next step is **problem deconstruction**—breaking the complex business problem into its atomic parts and surfacing the assumptions that hold your frame together.

Deconstruction serves three purposes:

1. **Reveals hidden complexity**: What seems like one problem is often multiple interrelated problems
2. **Identifies the atomic unit**: The smallest meaningful component you can diagnose, solve, or measure
3. **Surfaces assumptions**: The beliefs that, if false, invalidate your approach

### Identifying the Atomic Unit

The **atomic unit** is the smallest independently meaningful component of your problem. Getting granularity right is critical—too coarse and you miss important patterns, too fine and you drown in noise.

**Example: Invoice Processing**

Consider an AI system that processes invoices:

- **Too coarse**: "Process invoice" — You can't diagnose problems at invoice level because some line items may be correct while others fail
- **Just right**: "Process line item" — Each line item can be extracted, validated, and categorized independently
- **Too fine**: "Process individual character" — Character-level analysis misses the semantic meaning of fields

The atomic unit determines:
- **What you measure**: Line-item accuracy vs. invoice-level accuracy
- **Where you diagnose problems**: Which types of line items cause errors?
- **How you iterate**: Fix line-item extraction vs. reprocess entire invoices

**Example: Churn Prediction**

Consider a subscription service with multiple products:

- **Too coarse**: "Customer churns" — Misses that customers might drop one subscription but keep others
- **Just right**: "Subscription cancellation" — Each subscription has independent churn risk
- **Too fine**: "Feature usage session" — Individual sessions don't directly determine churn

Choosing "subscription" as the atomic unit means:
- Predicting churn per subscription, not per customer
- Analyzing subscription-level engagement and value
- Recognizing that customers with multiple subscriptions have complex retention dynamics

### The Atomic Unit Canvas

Use this canvas to identify your atomic unit:

| Question | Your Answer |
|----------|-------------|
| What is the business outcome we're optimizing? | |
| What is the largest unit we could analyze? | |
| What is the smallest unit we could analyze? | |
| At what granularity can we independently diagnose problems? | |
| At what granularity do we take actions? | |
| At what granularity do we measure success? | |
| **What is our atomic unit?** | |

### Surfacing Assumptions

Every problem frame rests on assumptions—beliefs about how the world works that, if false, invalidate your entire approach. The problem is that assumptions are usually implicit. Teams don't articulate them until something breaks.

**Types of critical assumptions:**

1. **Data assumptions**: "Historical patterns predict future behavior"
2. **Causal assumptions**: "Feature X causes outcome Y"
3. **Stability assumptions**: "The environment won't change significantly"
4. **Capacity assumptions**: "We have resources to implement this solution"
5. **Adoption assumptions**: "Users will engage with our intervention"
6. **Measurement assumptions**: "We can accurately measure the outcome"

**Example: Churn Prediction Assumptions**

For a subscription churn prediction system:

| Assumption | If false, then... |
|------------|-------------------|
| Historical churn patterns predict future churn | Model becomes unreliable when market conditions change |
| We can detect churn risk 30+ days in advance | We lack time for effective interventions |
| Retention interventions influence churn decisions | We're just predicting inevitable outcomes |
| Users who reduce engagement are at higher risk | Power users taking breaks get incorrectly targeted |
| Churn is primarily driven by product experience | External factors (budget cuts, competitors) dominate |
| We have capacity to intervene on 10% of customers | System generates more leads than we can handle |

**Example: Invoice Processing Assumptions**

For an automated invoice processing system:

| Assumption | If false, then... |
|------------|-------------------|
| Invoices follow consistent formatting patterns | Extraction model fails on non-standard formats |
| Line items contain sufficient context for categorization | Ambiguous items require human judgment |
| Vendors provide accurate information | Extraction accuracy doesn't guarantee correctness |
| Processing errors can be detected automatically | Bad data enters system without flags |
| Cost savings justify accuracy trade-offs | Manual verification overhead exceeds automation benefit |

### Why Surface Assumptions Early?

Articulating assumptions upfront provides three benefits:

1. **Risk identification**: You can evaluate which assumptions are fragile and might break
2. **Validation planning**: You can design tests or experiments to validate critical assumptions
3. **Monitoring strategy**: You can track metrics that indicate when assumptions break

Teams that skip assumption identification learn about invalid assumptions only after expensive failures. Teams that surface assumptions early can test them cheaply and pivot before overcommitting.

### Try It: Deconstruct Your Problem

For the problem you're working on:

1. **Identify three possible atomic units** (coarse, just right, fine)
2. **Evaluate each** based on: Can you diagnose problems at this level? Can you measure success at this level? Does it match how you'll take actions?
3. **Choose your atomic unit** and justify the choice
4. **List 5-7 critical assumptions** your problem frame relies on
5. **For each assumption**, describe what breaks if it's false
6. **Identify which assumptions are most fragile** and need early validation

This exercise transforms implicit thinking into explicit analysis. When projects fail, root causes often trace back to invalid assumptions that were never articulated.

---

## Step 3: Alternatives

Most teams suffer from premature convergence—they identify one solution approach and immediately move to implementation without considering alternatives. This happens because:

- **Familiarity bias**: We choose solutions we've used before
- **Hammer bias**: We apply our favorite tool to every problem
- **Authority bias**: We defer to the loudest voice in the room
- **Effort aversion**: Generating alternatives feels like wasted work when we "already know" the answer

The problem is that your first idea is rarely your best idea. Systematically generating alternatives:

- **Reveals better solutions** you wouldn't have considered
- **Clarifies trade-offs** by providing explicit comparison points
- **Reduces regret** by ensuring you explored the option space
- **Enables pivots** by maintaining awareness of other paths

### Building the Alternatives Menu

The goal of Step 3 is to create a **comprehensive menu of solution approaches** before committing to any single path. Think of this as expanding the solution space before narrowing it.

Use the solution archetypes from Chapter 2 as a systematic prompt:

1. **Rule-based approaches**: Could explicit logic solve this?
2. **Classical ML**: Regression, classification, clustering, forecasting?
3. **Retrieval systems**: RAG, semantic search, vector databases?
4. **Fine-tuned models**: Adapt pre-trained models to domain-specific data?
5. **Prompt engineering**: Achieve behavior through instructions alone?
6. **Agents**: Multi-step reasoning and tool use?
7. **RLHF**: Learn from human preference feedback?
8. **Hybrid systems**: Combine multiple approaches?

For each archetype, ask: "Could this work? What would it require? What are the trade-offs?"

### Example: Churn Prediction Alternatives

**Problem**: Predict which customers will churn within 30 days

**Alternative 1: Rule-based scoring**
- Assign points for negative signals (support tickets, declining usage, payment failures)
- Flag customers above threshold as high-risk
- **Pros**: Interpretable, easy to implement, no training data needed
- **Cons**: Doesn't capture complex patterns, requires manual rule tuning

**Alternative 2: Logistic regression**
- Train model on historical churn with engagement features
- Predict churn probability for each customer
- **Pros**: Interpretable coefficients, well-understood, fast inference
- **Cons**: Assumes linear relationships, limited feature interactions

**Alternative 3: Gradient boosted trees (XGBoost)**
- Train ensemble model on rich feature set
- Capture non-linear patterns and interactions
- **Pros**: High accuracy, handles mixed data types, less feature engineering
- **Cons**: Less interpretable, requires more data, longer training time

**Alternative 4: Survival analysis**
- Model time-to-churn rather than binary outcome
- Predict churn hazard over time
- **Pros**: Captures temporal dynamics, predicts when not just if
- **Cons**: More complex to implement, requires time-series features

**Alternative 5: Clustering + classification**
- First cluster customers by behavior
- Train separate classifiers per cluster
- **Pros**: Captures segment-specific patterns, interpretable segments
- **Cons**: More complex pipeline, requires sufficient data per cluster

**Alternative 6: Deep learning (neural network)**
- Train neural network on raw interaction sequences
- Learn representations automatically
- **Pros**: Minimal feature engineering, captures complex patterns
- **Cons**: Data-hungry, hard to interpret, longer training time

Notice that the alternatives span:
- **Complexity**: Rule-based → logistic regression → gradient boosting → neural networks
- **Interpretability**: Rule-based (high) → neural networks (low)
- **Data requirements**: Rule-based (low) → deep learning (high)
- **Development effort**: Rule-based (low) → hybrid systems (high)

### Example: Invoice Processing Alternatives

**Problem**: Automatically extract and categorize line items from invoices

**Alternative 1: Template matching**
- Define templates for common invoice formats
- Extract fields based on position and patterns
- **Pros**: Fast, deterministic, works well for consistent formats
- **Cons**: Brittle to format changes, requires template maintenance

**Alternative 2: OCR + rule-based extraction**
- Use OCR to extract text
- Apply regex and heuristics to identify fields
- **Pros**: Handles multiple formats, explainable, quick to implement
- **Cons**: Requires extensive rule tuning, fails on edge cases

**Alternative 3: Fine-tuned document extraction model**
- Fine-tune LayoutLM or similar on labeled invoices
- Extract structured data from document images
- **Pros**: Handles format variation, learns from examples
- **Cons**: Requires labeled training data, longer development time

**Alternative 4: GPT-4 with prompt engineering**
- Extract text via OCR, pass to GPT-4 with structured prompt
- Request JSON output with required fields
- **Pros**: Minimal training data, flexible, handles edge cases
- **Cons**: Per-invoice API cost, latency, less predictable

**Alternative 5: Multimodal LLM (GPT-4 Vision)**
- Pass invoice image directly to multimodal model
- Extract structured data from visual layout
- **Pros**: No separate OCR step, handles complex layouts
- **Cons**: Higher API cost, newer technology, less mature tooling

**Alternative 6: Hybrid: extraction model + LLM verification**
- Use fine-tuned model for extraction
- Use LLM to validate and correct errors
- **Pros**: Balances cost/accuracy, handles edge cases gracefully
- **Cons**: More complex pipeline, requires orchestration

### The Pre-Flight Checklist

Before committing to implementation, use this checklist to ensure you've adequately explored alternatives:

- [ ] Have we identified at least 3-5 distinct solution approaches?
- [ ] Have we considered both simple and complex alternatives?
- [ ] Have we included at least one non-ML approach as a baseline?
- [ ] Have we articulated pros/cons for each alternative?
- [ ] Have we estimated data, cost, and development effort for each?
- [ ] Have we identified which assumptions each alternative requires?
- [ ] Have we consulted domain experts about feasibility?
- [ ] Have we checked whether similar problems have been solved before?
- [ ] Have we resisted the urge to prematurely eliminate options?

If you answered "no" to any of these, your alternatives menu may be incomplete.

### Try It: Generate Your Alternatives Menu

For your problem:

1. **State your outcome and atomic unit** from Steps 1-2
2. **Generate 5+ solution alternatives** using the archetypes as prompts
3. **For each alternative, document**:
   - Brief description of approach
   - Key pros (what it does well)
   - Key cons (what it struggles with)
   - Data requirements
   - Development effort estimate (low/medium/high)
4. **Ensure your menu includes**:
   - At least one simple baseline (rules, heuristics)
   - At least one classical ML approach
   - At least one GenAI approach (if applicable)
   - At least one hybrid option

The goal is breadth, not depth. You're creating options, not building detailed implementation plans yet.

---

## Step 4: Trade-Offs

You've defined your outcome (Step 1), deconstructed the problem (Step 2), and generated alternatives (Step 3). Now comes the hard part: **choosing which alternative to pursue.**

There is no solution that dominates across all dimensions. Every choice involves trade-offs:

- High accuracy may require expensive infrastructure
- Low latency may sacrifice personalization
- Interpretability may limit model complexity
- Organizational fit may constrain technical options

**The goal of Step 4 is to make these trade-offs explicit and transparent.** When trade-offs are implicit, teams argue past each other—engineers advocate for technical elegance while business stakeholders prioritize speed to market. When trade-offs are explicit, disagreements become productive conversations about priorities.

### Key Trade-Off Dimensions

Most AI solution choices involve trade-offs across these dimensions:

**1. Accuracy vs. Cost**
- High-accuracy models often require more compute, data, or engineering effort
- Example: GPT-4 offers better accuracy than GPT-3.5 but costs 10-20x more per request

**2. Latency vs. Accuracy**
- Complex models that improve accuracy often increase inference time
- Example: Large ensemble models achieve 2% better accuracy but take 500ms vs. 50ms

**3. Interpretability vs. Performance**
- Simpler models (logistic regression, decision trees) are easier to explain
- Complex models (deep learning, large ensembles) often perform better but are opaque
- Example: Logistic regression provides coefficient interpretations but gradient boosting achieves higher accuracy

**4. Development Speed vs. Long-term Maintainability**
- Quick-and-dirty solutions ship faster but create technical debt
- Robust architectures take longer to build but are easier to maintain
- Example: Hardcoded prompts deploy in days but become unmaintainable spaghetti code

**5. Automation vs. Human Oversight**
- Fully automated systems scale better but can fail silently
- Human-in-the-loop systems catch errors but limit throughput
- Example: Auto-approve 80% of invoices vs. require human review for all

**6. Generalization vs. Specialization**
- General solutions work across contexts but may underperform in specific cases
- Specialized solutions excel in narrow domains but require separate systems
- Example: One model for all customer segments vs. segment-specific models

**7. Data Requirements vs. Development Timeline**
- Data-hungry approaches (fine-tuning, deep learning) require collection and labeling
- Few-shot approaches (prompt engineering) work with minimal data
- Example: Fine-tuning requires 1000+ labeled examples and weeks of effort vs. prompt engineering works with 5-10 examples and days of iteration

**8. Organizational Fit vs. Technical Optimality**
- The technically best solution may not fit organizational constraints
- Example: State-of-the-art deep learning may be infeasible if team lacks ML expertise

### The Trade-Off Canvas

Use this canvas to evaluate alternatives systematically:

| Alternative | Accuracy | Cost | Latency | Interpret. | Dev Effort | Maintenance | Org Fit | Overall |
|-------------|----------|------|---------|------------|------------|-------------|---------|---------|
| Option 1    | ★★★☆☆ | ★★★★☆ | ★★★★★ | ★★★★★ | ★★★★★ | ★★★★☆ | ★★★★☆ | |
| Option 2    | ★★★★☆ | ★★☆☆☆ | ★★★☆☆ | ★★☆☆☆ | ★★★☆☆ | ★★★☆☆ | ★★★★☆ | |
| Option 3    | ★★★★★ | ★☆☆☆☆ | ★★☆☆☆ | ★☆☆☆☆ | ★★☆☆☆ | ★★☆☆☆ | ★★☆☆☆ | |

For each dimension, rate each alternative on a 1-5 star scale. More stars = better performance on that dimension.

### Example: Churn Prediction Trade-Offs

Let's evaluate three alternatives for churn prediction:

**Alternative A: Rule-based scoring**
- **Accuracy**: ★★★☆☆ — Captures obvious patterns but misses complex signals
- **Cost**: ★★★★★ — No infrastructure, minimal compute
- **Latency**: ★★★★★ — Near-instant scoring
- **Interpretability**: ★★★★★ — Every rule is explicit
- **Dev Effort**: ★★★★★ — Can build in days
- **Maintenance**: ★★★★☆ — Rules need occasional tuning
- **Org Fit**: ★★★★★ — Business stakeholders can understand and trust

**Alternative B: Gradient boosted trees (XGBoost)**
- **Accuracy**: ★★★★★ — Captures non-linear patterns and interactions
- **Cost**: ★★★★☆ — Moderate compute for training/inference
- **Latency**: ★★★★☆ — Fast inference (10-50ms)
- **Interpretability**: ★★★☆☆ — SHAP values provide some insight
- **Dev Effort**: ★★★☆☆ — Requires feature engineering, model tuning
- **Maintenance**: ★★★☆☆ — Needs retraining as patterns shift
- **Org Fit**: ★★★★☆ — Team has ML experience

**Alternative C: Deep neural network**
- **Accuracy**: ★★★★★ — Can capture complex temporal patterns
- **Cost**: ★★☆☆☆ — GPU training, larger infrastructure
- **Latency**: ★★★☆☆ — Reasonable inference (50-100ms)
- **Interpretability**: ★★☆☆☆ — Black box, limited explainability
- **Dev Effort**: ★★☆☆☆ — Requires more data, longer training
- **Maintenance**: ★★☆☆☆ — Complex training pipeline
- **Org Fit**: ★★☆☆☆ — Team has limited deep learning expertise

### Making the Choice

Trade-off analysis doesn't provide a single "correct" answer—it makes priorities explicit so stakeholders can make informed decisions.

**Scenario 1: Early-stage startup, limited resources**
- **Choose**: Rule-based scoring (Alternative A)
- **Rationale**: Speed to market matters most; team can iterate quickly; interpretability helps build stakeholder trust; minimal resource requirements

**Scenario 2: Established company, data available, accuracy critical**
- **Choose**: Gradient boosted trees (Alternative B)
- **Rationale**: Strong accuracy without excessive complexity; team has ML expertise; reasonable cost/latency trade-off; some interpretability preserved

**Scenario 3: Tech giant, large ML team, accuracy is competitive differentiator**
- **Choose**: Deep neural network (Alternative C)
- **Rationale**: Accuracy improvement justifies cost/complexity; team has deep learning expertise; infrastructure exists; can invest in explainability tooling

Notice that context determines the "right" choice. There's no universally best solution—only solutions that fit your constraints, capabilities, and priorities.

### Try It: Evaluate Your Trade-Offs

For your problem and alternatives:

1. **Identify the 5-7 dimensions** most important for your context
2. **Rate each alternative** on each dimension (1-5 stars or similar scale)
3. **Identify dominant trade-offs**: Which dimensions conflict most?
4. **Consider your context**: What constraints, capabilities, and priorities matter?
5. **Make a recommendation**: Which alternative best fits your trade-offs?
6. **Document your reasoning**: Why is this the right choice given your context?

The goal isn't to find a perfect solution—it's to make a well-reasoned choice you can justify and revisit as circumstances change.

---

## Step 5: Signals

You've chosen a solution approach. Now comes the critical question: **How will you know if it's working?**

Most teams define success vaguely ("improve customer retention") or focus solely on model metrics ("achieve 85% accuracy"). The problem is that model performance doesn't guarantee business impact, and by the time business metrics move, you've lost months to a failing approach.

**Step 5 defines three types of signals that enable early course correction:**

1. **Success signals**: Observable indicators that the solution is delivering value
2. **Kill signals**: Observable indicators that the solution is fundamentally broken
3. **Leading indicators**: Early predictors of success or failure, measured before final outcomes

Think of signals as an early warning system. Good signals let you detect problems when pivoting is cheap, not after you've overcommitted resources.

### Success Signals

Success signals tell you when to persist and expand. They should be:

- **Observable**: You can measure them with available data
- **Timely**: You can detect them reasonably early
- **Actionable**: They inform specific decisions
- **Aligned**: They predict business outcomes, not just technical metrics

**Example: Churn Prediction Success Signals**

| Signal | Threshold | Implication |
|--------|-----------|-------------|
| Retention interventions save 30%+ of targeted customers | Measured monthly | Model identifies actionable churn risk |
| Sales team adoption exceeds 70% | Measured after 2 months | Solution fits workflow |
| Cost per saved customer < $200 | Measured monthly | Economics are favorable |
| Model predictions align with sales intuition 80%+ of time | Measured via spot checks | Model is trustworthy |

Notice these signals combine:
- **Business metrics** (retention rate improvement, cost per save)
- **Adoption metrics** (team usage, workflow integration)
- **Trust metrics** (alignment with human judgment)

**Example: Invoice Processing Success Signals**

| Signal | Threshold | Implication |
|--------|-----------|-------------|
| Extraction accuracy exceeds 95% on validation set | Measured weekly | Technical performance is adequate |
| Manual review time decreases by 60%+ | Measured monthly | Automation delivers efficiency gains |
| Finance team trusts system enough to reduce spot-checks | Measured via surveys | Stakeholder confidence is building |
| Processing errors don't increase vs. manual baseline | Measured monthly | Quality is maintained |

### Kill Signals

Kill signals tell you when to stop. They indicate fundamental problems that can't be fixed with iteration—the problem frame or solution approach is wrong.

Kill signals should be:

- **Clear**: No ambiguity about what triggers stopping
- **Irreversible**: The problem can't be solved with minor adjustments
- **Timely**: Detectable before massive resource waste

**Example: Churn Prediction Kill Signals**

| Signal | Threshold | Implication |
|--------|-----------|-------------|
| Retention interventions show no improvement after 3 months | 90 days | Churn isn't preventable with available actions |
| Model precision drops below 40% | Measured monthly | Too many false positives, unusable |
| Sales team stops using predictions | Measured after 60 days | Solution doesn't fit reality |
| Customer complaints increase due to mistargeted outreach | Any complaints | Solution actively harms relationships |

**Example: Invoice Processing Kill Signals**

| Signal | Threshold | Implication |
|--------|-----------|-------------|
| Extraction accuracy can't exceed 90% after 3 iterations | 3 months | Data or problem is too variable |
| Manual correction time exceeds manual entry time | Measured monthly | Automation creates more work than it saves |
| Processing errors increase defect rate by 20%+ | 2 months | Quality regression is unacceptable |
| Finance team reverts to manual processing | Any reversion | Trust is broken |

Kill signals feel uncomfortable to define upfront because they force you to articulate failure conditions. But that discomfort is the point—if you can't imagine what failure looks like, you can't detect it early.

### Leading Indicators

Leading indicators predict future success or failure before final outcomes materialize. They enable course correction when it's still cheap.

Good leading indicators:

- **Predict lagging metrics**: Correlate with eventual success/failure
- **Appear early**: Measurable weeks/months before final outcomes
- **Drive decisions**: Inform specific actions (persist, adjust, pivot)

**Example: Churn Prediction Leading Indicators**

| Leading Indicator | Predicts | Action |
|-------------------|----------|--------|
| Model agreement with human judgment | Eventual trust and adoption | If low: improve interpretability or involve domain experts |
| Sales team engagement with predictions | Long-term usage | If low: improve UX or provide training |
| Speed of improvement in model accuracy | Technical viability | If plateaued early: pivot to different approach |
| Intervention response rate | Eventual retention impact | If low: reconsider intervention strategy |

**Example: Invoice Processing Leading Indicators**

| Leading Indicator | Predicts | Action |
|-------------------|----------|--------|
| Extraction accuracy on validation set | Production performance | If low: collect more training data or try different model |
| Finance team spot-check frequency | Trust and adoption | If increasing: address specific error patterns |
| Manual correction patterns | Systematic model weaknesses | If concentrated: add rules or fine-tune on those cases |
| Processing time per invoice | Scalability and cost | If too high: optimize inference or architecture |

### The Signals Canvas

Use this canvas to document your signal framework:

| Signal Type | Specific Signal | Measurement | Threshold | Action |
|-------------|----------------|-------------|-----------|--------|
| **Success** | [What indicates success?] | [How measured?] | [What value?] | [What will you do?] |
| **Success** | | | | |
| **Success** | | | | |
| **Kill** | [What indicates fundamental failure?] | [How measured?] | [What value?] | [What will you do?] |
| **Kill** | | | | |
| **Leading** | [What predicts success/failure early?] | [How measured?] | [What value?] | [What will you do?] |
| **Leading** | | | | |

### Why Signals Matter

Teams without clear signals:

- **Miss early warnings**: Problems become obvious only after expensive commitment
- **Persist too long**: Sunk cost fallacy drives continued investment in failing approaches
- **Pivot randomly**: Without signals, pivots feel arbitrary rather than evidence-driven
- **Lose stakeholder trust**: Unclear progress updates create perception of flailing

Teams with clear signals:

- **Detect problems early**: Course-correct when change is cheap
- **Justify pivots**: Evidence-based reasoning replaces intuition
- **Build confidence**: Transparent progress against defined metrics
- **Enable fast learning**: Clear feedback loops accelerate iteration

### Try It: Design Your Signal Framework

For your chosen solution approach:

1. **Define 3-4 success signals** that indicate the solution is working
2. **Define 2-3 kill signals** that indicate the solution should be abandoned
3. **Define 3-4 leading indicators** that predict success/failure early
4. **For each signal, specify**:
   - Exact measurement approach
   - Threshold that triggers action
   - Timeframe for evaluation
   - What action you'll take when threshold is crossed
5. **Validate your signals**:
   - Can you actually measure these with available data?
   - Are thresholds realistic (not too easy or impossibly hard)?
   - Do these signals predict what you actually care about?

If you can't define clear signals, you're not ready to implement—you don't know how you'll tell success from failure.

---

## Worked Example: Churn Prediction

Let's walk through The Loop for a complete churn prediction scenario.

### Context

**Company**: SaaS company providing project management software
**Users**: 10,000 business customers (small teams to mid-sized companies)
**Current state**: 5% monthly churn, no systematic retention efforts
**Objective**: Reduce churn and improve customer lifetime value

### Step 1: Outcome

**Initial statement**: "We need to reduce churn"

**Decomposed into specific metrics**:
- Reduce overall monthly churn from 5% to 4%?
- Reduce churn among high-value customers (>$500/month) by 25%?
- Increase customer lifetime value by 20%?
- Increase success rate of retention interventions from 0% (none attempted) to 30%?

**Chosen metric**: **Increase 90-day retention rate among customers identified as at-risk from 50% (baseline) to 70% within 6 months**

**Rationale**:
- Focuses on actionable segment (at-risk customers we can intervene with)
- 90-day horizon gives time for interventions to work
- 70% target is ambitious but achievable
- Improves retention without requiring intervention at scale (only target at-risk segment)

### Step 2: Deconstruction

**Atomic unit**: Subscription (not customer, since customers may have multiple subscriptions)

**Key assumptions**:
1. Historical engagement patterns predict future churn risk
2. We can identify churn risk 30+ days in advance
3. Targeted retention interventions (discounts, outreach, training) can influence decisions
4. Churn is primarily driven by product value perception, not external factors
5. Sales team has capacity to execute ~100 retention interventions per month
6. Cost of retention intervention (~$200/customer) is justified by LTV recovery

**Validation plan**:
- Test assumption 1: Analyze historical cohorts to see if past engagement predicts future churn
- Test assumption 2: Look at time lag between engagement decline and cancellation
- Test assumption 3: Run small pilot with manual outreach to high-risk customers
- Test assumption 4: Survey churned customers about reasons
- Test assumption 5: Discuss capacity with sales leadership
- Test assumption 6: Calculate intervention cost threshold based on LTV

### Step 3: Alternatives

**Alternative 1: Rule-based risk scoring**
- Assign points for: declining usage, support tickets, payment issues, lack of feature adoption
- Flag subscriptions above threshold as high-risk
- **Pros**: Fast to implement, interpretable, no training data needed
- **Cons**: Limited to obvious signals, requires manual tuning

**Alternative 2: Logistic regression**
- Train on historical churn with engagement and demographic features
- Predict churn probability per subscription
- **Pros**: Interpretable, well-understood, quantifies feature importance
- **Cons**: Assumes linear relationships, limited interactions

**Alternative 3: Gradient boosted trees (XGBoost)**
- Train ensemble model on rich feature set (engagement, support, billing, feature usage)
- Capture non-linear patterns and feature interactions
- **Pros**: High accuracy, automatic feature interaction, handles mixed types
- **Cons**: Less interpretable, requires hyperparameter tuning

**Alternative 4: Survival analysis (Cox model)**
- Model time-to-churn hazard rather than binary churn
- Predict when customers are most at risk
- **Pros**: Captures temporal dynamics, identifies critical windows
- **Cons**: More complex, requires time-series feature engineering

**Alternative 5: Customer segmentation + separate models**
- Cluster customers by behavior and firmographics
- Train separate churn models per segment
- **Pros**: Captures segment-specific patterns, actionable segments
- **Cons**: Requires sufficient data per segment, more complex

### Step 4: Trade-Offs

Using the Trade-Off Canvas:

| Alternative | Accuracy | Cost | Latency | Interpret. | Dev Effort | Maintenance | Org Fit |
|-------------|----------|------|---------|------------|------------|-------------|---------|
| Rule-based | ★★★☆☆ | ★★★★★ | ★★★★★ | ★★★★★ | ★★★★★ | ★★★★☆ | ★★★★★ |
| Logistic | ★★★★☆ | ★★★★★ | ★★★★★ | ★★★★☆ | ★★★★☆ | ★★★★☆ | ★★★★☆ |
| XGBoost | ★★★★★ | ★★★★☆ | ★★★★☆ | ★★★☆☆ | ★★★☆☆ | ★★★☆☆ | ★★★★☆ |
| Survival | ★★★★☆ | ★★★★☆ | ★★★☆☆ | ★★★☆☆ | ★★☆☆☆ | ★★☆☆☆ | ★★☆☆☆ |
| Segmented | ★★★★★ | ★★★☆☆ | ★★★★☆ | ★★★★☆ | ★★☆☆☆ | ★★☆☆☆ | ★★★☆☆ |

**Decision**: Start with **Logistic Regression** (Alternative 2)

**Rationale**:
- **Provides good baseline**: Establishes what's achievable with simple approach
- **Fast iteration**: Can implement and test within 2-3 weeks
- **Interpretability matters**: Sales team needs to understand why customers are flagged
- **Organizational fit**: Team has ML experience but limited deep learning expertise
- **Enables learning**: Can validate assumptions quickly, then upgrade to XGBoost if needed
- **Low regret**: If logistic regression is insufficient, feature engineering carries over to more complex models

**Plan**: Implement logistic regression first, measure performance against success signals for 2 months, then evaluate whether to persist or upgrade to XGBoost based on accuracy plateaus and sales team feedback.

### Step 5: Signals

**Success Signals**:

| Signal | Threshold | Measurement | Implication |
|--------|-----------|-------------|-------------|
| Model achieves 70%+ precision on validation set | 70% | Weekly, hold-out validation | Technical performance is adequate |
| Retention interventions save 30%+ of targeted customers | 30% | Monthly, compare intervention vs. control | Model identifies actionable risk |
| Sales team consistently uses predictions in workflow | 70% adoption | Monthly usage logs | Solution fits sales process |
| Cost per retained customer < $300 | $300 | Monthly, intervention cost / saves | Economics are favorable |

**Kill Signals**:

| Signal | Threshold | Measurement | Implication |
|--------|-----------|-------------|-------------|
| Model precision remains below 40% after 3 tuning iterations | 40% / 3 months | Monthly validation | Too many false positives, unusable |
| Retention interventions show no lift over control after 3 months | 0% lift / 90 days | A/B test: intervention vs. control | Churn isn't preventable with current actions |
| Sales team stops using predictions after training period | <30% adoption / 60 days | Usage logs | Solution doesn't match reality |
| Customer complaints increase due to retention outreach | Any complaints | Support ticket monitoring | Interventions harm relationships |

**Leading Indicators**:

| Leading Indicator | Predicts | Action |
|-------------------|----------|--------|
| Agreement between model predictions and sales intuition | Eventual adoption and trust | If <70%: investigate disagreements, improve features or involve sales in feature selection |
| Speed of accuracy improvement during development | Technical ceiling | If plateaus at <65% precision: pivot to XGBoost or revisit problem frame |
| Sales team engagement during pilot | Long-term adoption | If low: improve UX, add context to predictions, or provide training |
| Intervention response rate (customers engaging with outreach) | Eventual retention impact | If <50%: reconsider intervention strategy or targeting |

### Implementation Plan

**Weeks 1-2**: Feature engineering and exploratory analysis
- Build feature pipeline (engagement metrics, support interactions, billing events)
- Validate assumptions about engagement-churn correlation
- Establish baseline: what % of at-risk customers can we correctly identify?

**Weeks 3-4**: Model development and validation
- Train logistic regression on historical data (6 months prior)
- Validate on hold-out set (most recent month)
- Analyze errors: which customers are we missing? Which false positives?

**Weeks 5-6**: Pilot with sales team
- Deploy predictions for subset of customers
- Sales team attempts retention interventions
- Collect feedback: are predictions useful? What context is missing?

**Months 2-3**: Measure signals and decide
- Track success signals: precision, retention lift, adoption, cost per save
- Track kill signals: watch for precision floor, zero lift, abandonment
- Track leading indicators: agreement with sales, accuracy trajectory, engagement

**Decision point (Month 3)**:
- **If success signals met**: Expand to full customer base, continue with logistic regression
- **If success signals missed but not kill signals hit**: Upgrade to XGBoost for accuracy improvement
- **If kill signals hit**: Pivot problem frame (maybe churn isn't preventable, focus on onboarding instead)

---

## Worked Example: Invoice Processing (GenAI)

Let's walk through The Loop for a GenAI application.

### Context

**Company**: Mid-sized accounting firm processing 5,000+ invoices/month for clients
**Current state**: Manual data entry from PDF/image invoices into accounting software
**Pain points**: 40 hours/week of manual work, ~2% error rate, 2-3 day processing lag
**Objective**: Automate invoice processing to reduce manual effort and improve turnaround

### Step 1: Outcome

**Initial statement**: "Automate invoice processing"

**Decomposed into specific metrics**:
- Reduce manual data entry time by 80%?
- Achieve 99%+ accuracy on invoice extraction?
- Process invoices within 24 hours of receipt?
- Reduce error rate from 2% to 0.5%?

**Chosen metric**: **Reduce manual processing time by 60% while maintaining error rate below 2% within 3 months**

**Rationale**:
- 60% reduction is ambitious but achievable with automation + human review
- Maintaining current error rate prevents quality regression
- 3-month timeline aligns with quarterly planning
- Time savings translate directly to cost savings and capacity for higher-value work

### Step 2: Deconstruction

**Atomic unit**: Invoice line item (not entire invoice)

**Why line item?**
- Invoices have varying numbers of line items (1-50+)
- Extraction errors often affect specific line items, not entire invoice
- Quality metrics need line-level granularity to diagnose problems
- Allows partial automation (high-confidence lines auto-approved, low-confidence reviewed)

**Key assumptions**:
1. Invoices follow predictable structural patterns despite format variation
2. Line items contain sufficient context for categorization (description, amount, vendor)
3. Vendors provide accurate information (extraction accuracy doesn't validate correctness)
4. 95%+ extraction accuracy is sufficient to provide value (some manual correction acceptable)
5. Cost of LLM API calls is justified by labor savings (~$0.01/invoice vs. $5 manual processing)
6. Finance team will trust automated extraction with spot-checking

**Validation plan**:
- Test assumption 1: Manually review 100 diverse invoices to assess format variability
- Test assumption 2: Check if line item descriptions alone enable categorization
- Test assumption 3: Analyze historical errors (extraction vs. vendor errors)
- Test assumption 4: Calculate acceptable error rate based on review time
- Test assumption 5: Estimate API costs for expected volume
- Test assumption 6: Discuss with finance team, understand trust requirements

### Step 3: Alternatives

**Alternative 1: Template matching + OCR**
- Define templates for common invoice formats (top 20 vendors)
- Use OCR + regex to extract fields based on position
- **Pros**: Fast, deterministic, low per-invoice cost
- **Cons**: Brittle to format changes, doesn't handle novel vendors, high maintenance

**Alternative 2: Fine-tuned document extraction model (LayoutLM)**
- Fine-tune LayoutLM on labeled invoices
- Extract structured data from document layout
- **Pros**: Handles format variation, learns from examples, state-of-the-art for documents
- **Cons**: Requires 500+ labeled invoices, longer development time, GPU infrastructure

**Alternative 3: GPT-4 with structured prompting**
- OCR invoice to text, pass to GPT-4 with JSON schema prompt
- Request structured output (vendor, date, line items with descriptions/amounts/categories)
- **Pros**: Minimal training data, flexible, handles edge cases, rapid iteration
- **Cons**: API cost (~$0.05-0.10 per invoice), latency (5-10 seconds), less predictable

**Alternative 4: GPT-4 Vision (multimodal)**
- Pass invoice image directly to GPT-4 Vision
- Extract structured data from visual layout without separate OCR
- **Pros**: No OCR preprocessing, handles complex layouts, captures visual structure
- **Cons**: Higher API cost (~$0.10-0.20 per invoice), newer technology

**Alternative 5: Hybrid: OCR + GPT-4 + validation rules**
- Use OCR to extract text
- GPT-4 to structure and categorize
- Business rules to validate (amounts sum correctly, dates are valid, categories match chart of accounts)
- **Pros**: Balances cost/accuracy, catches errors, handles edge cases gracefully
- **Cons**: More complex pipeline, requires orchestration

**Alternative 6: Hybrid: Template matching + GPT-4 fallback**
- Try template matching first for known formats
- Fall back to GPT-4 for unknown formats or low-confidence extractions
- **Pros**: Optimizes cost (cheap for common cases, robust for edge cases)
- **Cons**: Most complex, requires two systems

### Step 4: Trade-Offs

Using the Trade-Off Canvas:

| Alternative | Accuracy | Cost/Invoice | Latency | Handles Variation | Dev Effort | Maintenance |
|-------------|----------|--------------|---------|-------------------|------------|-------------|
| Template | ★★★☆☆ | ★★★★★ | ★★★★★ | ★★☆☆☆ | ★★★☆☆ | ★★☆☆☆ |
| Fine-tuned | ★★★★★ | ★★★★☆ | ★★★★☆ | ★★★★★ | ★★☆☆☆ | ★★★☆☆ |
| GPT-4 text | ★★★★☆ | ★★★☆☆ | ★★★☆☆ | ★★★★★ | ★★★★★ | ★★★★☆ |
| GPT-4 vision | ★★★★★ | ★★☆☆☆ | ★★★☆☆ | ★★★★★ | ★★★★☆ | ★★★★☆ |
| OCR+GPT-4+rules | ★★★★★ | ★★★☆☆ | ★★★☆☆ | ★★★★★ | ★★★☆☆ | ★★★☆☆ |
| Template+GPT-4 | ★★★★☆ | ★★★★☆ | ★★★★☆ | ★★★★☆ | ★★☆☆☆ | ★★☆☆☆ |

**Decision**: Start with **GPT-4 with structured prompting** (Alternative 3)

**Rationale**:
- **Fastest time to value**: Can implement and test within 1-2 weeks
- **Handles variability**: Vendor format diversity makes template matching fragile
- **Cost is justified**: $0.05-0.10/invoice < $5 manual processing cost
- **Enables learning**: Can rapidly iterate on prompts based on error patterns
- **Low regret**: Prompt engineering insights transfer to GPT-4 Vision or fine-tuning if needed
- **Team capability**: No ML expertise required, can leverage existing dev team

**Plan**: Implement GPT-4 text extraction with structured prompts, evaluate for 1 month, then decide whether to:
- **Persist** if accuracy >95% and cost acceptable
- **Upgrade to GPT-4 Vision** if OCR errors are main failure mode
- **Add validation rules** if systematic errors can be caught with business logic
- **Consider fine-tuning** if cost becomes prohibitive at scale

### Step 5: Signals

**Success Signals**:

| Signal | Threshold | Measurement | Implication |
|--------|-----------|-------------|-------------|
| Extraction accuracy >95% on validation set | 95% | Weekly, manually review 50 invoices | Technical performance is adequate |
| Manual review time decreases by 50%+ | 50% | Monthly, time tracking | Automation delivers efficiency |
| Error rate remains below 2% | 2% | Monthly, downstream error tracking | Quality is maintained |
| Finance team reduces spot-check frequency | 20% → 10% spot-check | Monthly, team feedback | Trust is building |
| Cost per invoice < $0.15 | $0.15 | Weekly, API cost monitoring | Economics are sustainable |

**Kill Signals**:

| Signal | Threshold | Implication |
|--------|-----------|-------------|
| Extraction accuracy plateaus below 90% after prompt tuning | 90% / 4 weeks | LLM approach insufficient, need fine-tuning |
| Manual correction time exceeds manual entry time | Any time correction > entry | Automation creates more work |
| Error rate increases to >3% | 3% / 2 months | Quality regression unacceptable |
| API costs exceed $0.25/invoice | $0.25 / sustained | Economics don't work, need cheaper alternative |
| Finance team loses trust and reverts to manual | Any reversion | Solution is broken |

**Leading Indicators**:

| Leading Indicator | Predicts | Action |
|-------------------|----------|--------|
| Extraction accuracy on diverse sample during development | Production performance | If <93%: improve prompts or add examples |
| Finance team engagement with review UI during pilot | Long-term adoption | If low: simplify UI or improve flagging |
| Pattern in extraction errors (OCR vs. categorization vs. validation) | Systematic weaknesses | If OCR errors dominant: upgrade to GPT-4 Vision |
| API cost trajectory as volume scales | Sustainability | If trending >$0.20: optimize prompts or consider alternatives |
| Time to manually correct flagged line items | Review efficiency | If >30 seconds/item: improve error highlighting |

### Implementation Plan

**Week 1**: Prompt engineering and validation
- Develop structured JSON schema for invoice output
- Test GPT-4 prompts on 50 diverse invoices (various vendors, formats, complexities)
- Analyze errors: OCR quality, field extraction accuracy, categorization correctness
- Establish baseline: current manual processing time per invoice

**Week 2**: Build pipeline and review UI
- Integrate OCR → GPT-4 → structured output pipeline
- Build simple review UI: side-by-side comparison of invoice image and extracted data
- Implement confidence scoring: flag low-confidence extractions for human review

**Weeks 3-4**: Pilot with finance team
- Process 100 invoices through automated system
- Finance team reviews all outputs, corrects errors, provides feedback
- Measure: extraction accuracy, review time per invoice, error patterns
- Iterate on prompts based on systematic errors

**Month 2**: Expand and optimize
- Roll out to 500 invoices/month with selective human review (high-confidence auto-approved)
- Monitor success signals: accuracy, time savings, error rate, cost
- Monitor kill signals: watch for quality regressions or cost overruns
- Track leading indicators: error patterns, finance team satisfaction

**Decision point (Month 2-3)**:
- **If success signals met**: Scale to full volume, reduce human review to spot-checking
- **If OCR errors dominate**: Upgrade to GPT-4 Vision (eliminate OCR preprocessing)
- **If categorization errors dominate**: Add validation rules or provide category examples in prompt
- **If cost is issue**: Optimize prompts for token efficiency or explore template matching for common vendors
- **If kill signals hit**: Revert to manual or pivot to fine-tuned model approach

---

## Reflection Questions

Use these questions to deepen your understanding of The Loop:

1. **On outcome definition**: Think about a recent AI project. What was the implicit outcome metric? If you made it explicit, would different stakeholders have agreed? How might the project have differed with a different outcome definition?

2. **On atomic units**: For a problem you're working on, what happens if you choose the wrong granularity? How would diagnosing problems differ if you chose one level too coarse or one level too fine?

3. **On assumptions**: What assumptions did you make in a past project that turned out to be false? How did you discover the assumption was invalid? What would have happened if you'd surfaced and tested the assumption earlier?

4. **On alternatives**: Think about a solution you implemented recently. What alternatives did you consider? What alternatives did you NOT consider that, in hindsight, might have been better? What prevented you from exploring more alternatives?

5. **On trade-offs**: Describe a recent technical decision involving trade-offs. Were the trade-offs explicit or implicit during the decision? Did different stakeholders prioritize dimensions differently? How would making trade-offs more explicit have changed the discussion?

6. **On signals**: For a current or recent project, what signals did you use to evaluate progress? Were they leading or lagging indicators? Did you define success and kill signals upfront, or figure them out as you went? What would have changed with clearer signals earlier?

7. **On The Loop**: Think about a failed or struggling AI project. Work backward through The Loop—where did the framing break down? Was it an unclear outcome? Invalid assumption? Missed alternative? Unstated trade-off? Lack of signals?

8. **On iteration**: How often do you revisit your problem framing? When new information arrives, do you update your outcome definition, validate assumptions, reconsider alternatives, or recalibrate signals? What prevents more frequent Loop iteration?

---

## Portfolio Project: Apply The Loop

**Objective**: Demonstrate your ability to systematically frame an AI problem using The Loop framework.

### Instructions

Choose one of the following scenarios (or propose your own with instructor approval):

**Scenario A: Educational Content Recommendation**
A university wants to build a system that recommends learning resources (articles, videos, exercises) to students based on their learning progress, struggling topics, and goals.

**Scenario B: Manufacturing Quality Prediction**
A factory wants to predict which products coming off the assembly line are likely to have defects, enabling early intervention before shipping to customers.

**Scenario C: Customer Support Ticket Routing**
A SaaS company receives 1,000+ support tickets per day and wants to automatically route them to the right team and prioritize them by urgency and complexity.

**Scenario D: Medical Diagnosis Assistance**
A healthcare provider wants an AI system to help clinicians identify potential diagnoses based on patient symptoms, medical history, and test results.

### Deliverable

Complete the following analysis for your chosen scenario:

**1. Outcome Definition (Step 1)**
- State the vague business objective
- Generate 4-5 specific outcome metrics
- Choose one metric and justify why it's the right frame
- Articulate what constraints, trade-offs, and priorities this metric implies

**2. Problem Deconstruction (Step 2)**
- Identify the atomic unit and justify the granularity choice
- Complete the Atomic Unit Canvas
- List 6-8 critical assumptions your frame depends on
- For each assumption, explain what breaks if it's false
- Identify the 2-3 most fragile assumptions and propose how you'd validate them

**3. Alternatives Menu (Step 3)**
- Generate 5-6 distinct solution alternatives spanning simple to complex
- For each alternative, document:
  - Brief approach description
  - Key strengths and weaknesses
  - Data requirements
  - Development effort estimate
- Ensure your menu includes rule-based, classical ML, and GenAI options

**4. Trade-Off Analysis (Step 4)**
- Complete the Trade-Off Canvas for your alternatives
- Identify the 2-3 most critical trade-off dimensions for your context
- Choose one alternative and justify based on:
  - Your context (resources, constraints, capabilities)
  - The trade-offs you're willing to accept
  - Why this is better than other alternatives for your situation

**5. Signal Framework (Step 5)**
- Complete the Signals Canvas with:
  - 3-4 success signals (with thresholds and measurement approaches)
  - 2-3 kill signals (with thresholds and conditions)
  - 3-4 leading indicators (with what they predict and enabling actions)
- For each signal, explain:
  - How you'll measure it with available data
  - Why this threshold is meaningful
  - What action you'll take when the signal triggers

**6. Implementation Plan**
- Outline a 3-month implementation and evaluation plan
- Include specific milestones, decision points, and pivot triggers
- Explain how you'll use signals to decide whether to persist, pivot, or stop

### Evaluation Criteria

Your analysis will be evaluated on:

- **Systematic application of The Loop**: Did you work through all five steps methodically?
- **Depth of reasoning**: Did you explore second-order effects, hidden assumptions, and edge cases?
- **Explicit articulation**: Did you make trade-offs, assumptions, and priorities transparent?
- **Contextual awareness**: Did you ground decisions in realistic constraints and capabilities?
- **Signal quality**: Are your signals measurable, timely, and actionable?
- **Clarity**: Is your reasoning easy to follow and well-organized?

**Length**: 8-12 pages (including canvases and tables)

**Submission**: Upload PDF to the course portal by [deadline]

---

## Summary

The Loop framework provides a systematic process for transforming ambiguous business problems into actionable AI initiatives:

1. **OUTCOME**: Define the metric—it IS the problem frame
2. **DECONSTRUCTION**: Identify atomic units and surface assumptions
3. **ALTERNATIVES**: Build a comprehensive menu before committing
4. **TRADE-OFFS**: Choose based on explicit priorities and constraints
5. **SIGNALS**: Define success, failure, and leading indicators upfront

**Key insights from this chapter:**

- **Metric choice determines the problem you solve**: Different outcomes imply fundamentally different solutions, even when casual language sounds the same
- **Assumptions are fragile**: Every frame rests on beliefs that, if false, invalidate the entire approach—surface them early so you can test them
- **Premature convergence wastes resources**: Generate alternatives systematically before committing—your first idea is rarely your best
- **No solution dominates**: Every choice involves trade-offs—make them explicit so stakeholders can make informed decisions
- **Signals enable fast pivots**: Clear success criteria, kill conditions, and leading indicators catch problems while change is still cheap

**The Loop is iterative, not one-time**: Initial framing is based on incomplete information. Implementation generates data. Good teams cycle through The Loop quickly, using each iteration to refine understanding and adjust course.

**Use The Loop as a diagnostic tool**: When projects feel stuck, work backward through the steps to find where framing broke down. When stakeholders disagree, use The Loop's structured language to articulate differences. When new information arrives, cycle through The Loop to update your frame.

In the next chapters, we'll build on The Loop:

- **Chapter 4 (Diagnosis)** teaches how to read signals from live systems to detect when frames need adjustment
- **Chapter 5 (Pivot)** covers decision-making: when to persist, pivot, or stop based on signal evidence
- **Chapter 6 (Application)** applies The Loop to complex, multi-stakeholder case studies across domains

For now, practice The Loop on your portfolio project. The framework will feel mechanical at first, but with repetition it becomes second nature—a systematic way of thinking about AI problems that prevents common failure modes and enables better strategic decisions.
