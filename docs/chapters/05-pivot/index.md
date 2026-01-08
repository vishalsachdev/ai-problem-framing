# Chapter 5: Pivot - Acting on Signals

## Learning Objectives

By the end of this chapter, you will be able to:

1. Recognize when signals indicate need for change versus normal project turbulence
2. Apply the Persist/Pivot/Stop decision framework to AI project challenges
3. Execute system-level reframes when solutions fail to address underlying problems
4. Avoid sunk cost fallacy and make rational pivot decisions under uncertainty

## Introduction

In 2018, Google launched Duplex, an AI system that could make phone calls on your behalf to book restaurant reservations or hair appointments. The demo was stunning—the AI used natural speech patterns, including "umm" and "uh," making it nearly indistinguishable from a human caller. The internet exploded with both amazement and ethical concerns about AI deception.

Google faced a critical decision. They had invested heavily in the technology. The demo worked. But the signals were clear: users were uncomfortable with an AI that could pass as human without disclosure. Google could have persisted, defended their approach, and pushed forward. Instead, they pivoted. They redesigned the system to clearly identify itself as an automated assistant and reframed the problem from "make AI sound exactly like humans" to "make AI interactions helpful and transparent."

Contrast this with IBM Watson Health. Between 2015 and 2022, IBM invested billions into applying Watson's AI capabilities to healthcare—oncology, drug discovery, medical imaging. The signals came early: doctors didn't trust the recommendations, the training data didn't generalize, partnerships dissolved, revenue targets weren't met. Yet IBM persisted for seven years, pouring resources into a fundamentally flawed problem framing. In 2022, they sold Watson Health for parts, at a massive loss.

The difference? Google recognized signals and acted. IBM saw the same signals but stayed the course, trapped by sunk costs and organizational momentum. This chapter is about developing the judgment to know when to persist through normal difficulties and when to fundamentally change direction.

## Section 1: Signal Recognition

Signals are everywhere in AI projects. Models underperform. Users complain. Stakeholders lose interest. Engineers burn out. The challenge isn't detecting signals—it's knowing which ones demand action and which are just noise.

### Key Idea: Strong Signals vs. Weak Signals

**Weak signals** are isolated, inconsistent, or easily explained by temporary factors:
- A single model training run fails
- One user gives negative feedback
- A team member has a bad week
- A competitor announces a vague plan

**Strong signals** are persistent, patterned, and structural:
- Models consistently underperform across multiple iterations
- User feedback reveals fundamental misalignment with needs
- Team velocity declines despite removing obstacles
- Multiple competitors solve the problem differently

The distinction matters because weak signals invite tuning—adjust hyperparameters, refine features, provide better support. Strong signals invite reframing—question assumptions, examine the problem definition, consider fundamental changes.

Consider three signal categories:

**1. Technical Signals**
- **Weak**: Model accuracy plateaus after one experiment
- **Strong**: Accuracy plateaus across diverse architectures, data augmentation strategies, and feature engineering approaches
- **What it means**: Weak signals suggest optimization opportunities. Strong signals suggest you're approaching the theoretical limits of your problem formulation—you may need different data, different objectives, or a different problem.

**2. User Signals**
- **Weak**: Users request specific features or complain about UI details
- **Strong**: Users consistently work around your system or abandon it at the same stage
- **What it means**: Weak signals point to usability improvements. Strong signals indicate your system doesn't align with actual workflows or needs—you may be solving the wrong problem.

**3. Economic Signals**
- **Weak**: One sales cycle takes longer than expected
- **Strong**: Customer acquisition costs consistently exceed lifetime value, or pilots fail to convert despite positive feedback
- **What it means**: Weak signals suggest sales execution issues. Strong signals indicate fundamental product-market misalignment—you may be targeting the wrong customers or solving too small a problem.

### Example: Healthcare Chatbot Signals

A team builds an AI chatbot to help patients schedule appointments and answer basic medical questions. Here's how they interpret signals:

**Month 2 - Weak Signal (Persist)**
- Signal: 30% of users abandon the chatbot mid-conversation
- Analysis: Usage logs show confusion around one specific question type
- Action: Revise question phrasing, add examples, persist with core approach

**Month 5 - Moderate Signal (Investigate)**
- Signal: Users consistently exit the chatbot and call the office anyway
- Analysis: Interviews reveal users want appointment changes, not just booking—something the chatbot can't handle
- Action: Add appointment modification features, but start questioning scope

**Month 9 - Strong Signal (Pivot)**
- Signal: Despite new features, 70% of interactions end with "I'd like to speak to a person"
- Analysis: Users fundamentally want human reassurance for medical decisions, not efficiency
- Action: Pivot from "replace human interaction" to "triage and prepare for human interaction"—the chatbot becomes a pre-call tool that gathers information so humans can provide better service

The strong signal wasn't just one metric—it was the pattern across user behavior, qualitative feedback, and business outcomes. The team needed all three perspectives to recognize the signal strength.

### Try It: Signal Strength Assessment

For your portfolio project (or a hypothetical AI initiative), identify three signals you've encountered or might encounter. For each:

1. Describe the signal (what you observed)
2. Classify it (weak, moderate, or strong)
3. Explain your reasoning (what makes it that strength?)
4. Propose an appropriate response (persist, investigate, or pivot)

**Template:**
```
Signal: [What you observed]
Strength: [Weak/Moderate/Strong]
Reasoning: [Why this classification?]
- Is it isolated or patterned?
- Is it temporary or structural?
- Does it appear in one dimension (technical/user/economic) or multiple?
Response: [What action does this signal warrant?]
```

## Section 2: The Three Options

When strong signals appear, you face three options: Persist, Pivot, or Stop. Each has appropriate contexts. The skill is matching the option to the situation.

### Persist: Stay the Course

**When to Persist:**
- Signals are weak or inconsistent
- The fundamental problem framing remains sound
- You have clear hypotheses about what's causing difficulties
- Resources and timeline accommodate continued iteration
- Team morale and stakeholder support remain intact

**Example: OpenAI's GPT Persistence**

Between GPT-1 (2018) and GPT-3 (2020), OpenAI's language models showed promise but faced skepticism. GPT-2 could generate coherent text but often went off-topic. Critics questioned whether scaling alone would work. OpenAI persisted because:
- The technical signals were *improving* (each scale-up showed gains)
- The theoretical foundation (scaling hypothesis) was sound
- They had the resources to continue experiments

By GPT-3, persistence paid off. But notice what they *didn't* do: they didn't persist with failed approaches within each model. They persisted with the *strategy* (scaling transformers) while pivoting on *tactics* (architecture details, training procedures).

**Warning Signs You're Persisting Too Long:**
- Repeating the same experiments hoping for different results
- Rationalizing away multiple independent negative signals
- "We've come too far to turn back now" thinking
- Team increasingly demoralized despite leadership optimism

### Pivot: Change Direction

**When to Pivot:**
- Strong signals indicate your approach is fundamentally limited
- The underlying problem remains valuable and solvable
- You have viable alternative approaches
- Resources allow for redirection without catastrophic loss

**Types of Pivots:**

1. **Problem Pivot**: Change what problem you're solving
   - Example: Slack started as a gaming company, pivoted to team communication when their internal chat tool proved more valuable than the game

2. **Solution Pivot**: Keep the problem, change the approach
   - Example: Switch from supervised learning to reinforcement learning, or from prediction to recommendation

3. **Customer Pivot**: Same solution, different audience
   - Example: Enterprise AI tool repackaged for small businesses, or vice versa

4. **Value Pivot**: Change what aspect of your solution you emphasize
   - Example: From "most accurate" to "most explainable," or from "fastest" to "most cost-effective"

**Example: Medical Imaging Pivot**

A team builds an AI system to detect lung cancer from CT scans, aiming to outperform radiologists. After 18 months:

**Signals:**
- Model achieves 94% accuracy—good but not superhuman
- Radiologists resist adoption, citing liability concerns and lack of explainability
- Hospitals hesitate due to regulatory uncertainty
- False negatives in edge cases create unacceptable risk

**Pivot Decision:**
The team could persist (keep tuning the model) or stop (abandon the project). Instead, they pivot:

**From:** Replace radiologists with AI diagnosis
**To:** Augment radiologists with AI pre-screening

**New Approach:**
- AI flags scans that need human review (high sensitivity, accepts false positives)
- Radiologists focus attention on flagged cases
- Humans make final diagnoses, AI provides decision support
- Regulatory path clearer, adoption friction lower

This system-level reframe changes the problem from "achieve superhuman accuracy" to "efficiently direct human expertise." The technical work continues, but success criteria shift from accuracy alone to efficiency gains and radiologist satisfaction.

### Stop: Kill the Project

**When to Stop:**
- Strong signals indicate the problem isn't worth solving
- No viable pivots address the fundamental issues
- Opportunity costs exceed potential benefits
- Continuing would damage team, reputation, or resources

**Example: Google Glass Consumer Edition**

Google Glass launched in 2013 as a consumer wearable computer. Signals emerged quickly:
- Privacy concerns (cameras on faces in public spaces)
- Social stigma ("Glassholes")
- Weak use cases (nothing you couldn't do with a phone)
- High price ($1,500) for limited functionality
- Battery life and usability issues

Google could have pivoted to different customer segments, adjusted pricing, or refined features. Instead, they stopped the consumer edition in 2015. Why? Because the strong signals indicated fundamental problems:
- The technology wasn't ready (hardware limitations)
- The social context wasn't ready (privacy norms)
- The value proposition wasn't there (phones already filled the need)

**But notice:** They didn't stop Glass entirely. They pivoted to enterprise uses (manufacturing, healthcare) where the use cases were clearer and social concerns less pronounced. The consumer product stopped; the underlying technology found a new problem.

**Stopping Well:**

Stopping isn't failure—it's resource allocation. The key is stopping early enough to:
- Redeploy team members to higher-value work
- Preserve stakeholder trust through transparent communication
- Extract learnings that inform future projects
- Avoid throwing good money after bad

**The Checklist:**
- [ ] Have we tested multiple pivots without success?
- [ ] Are the fundamental assumptions proven wrong?
- [ ] Do opportunity costs now exceed potential returns?
- [ ] Would continuing damage team morale or organizational credibility?
- [ ] Have we documented what we learned?

If you answer "yes" to most of these, stopping is strategic, not defeatist.

## Section 3: System-Level Reframes

Sometimes the solution is wrong because the problem is wrong. System-level reframes question the problem definition itself, not just the approach to solving it.

### Key Idea: Levels of Reframing

**Level 1 - Tactical Reframe**: Change implementation details
- "Our model needs more data" → collect more data
- "Our features are weak" → engineer better features
- This is optimization, not reframing

**Level 2 - Strategic Reframe**: Change approach to the same problem
- "Our supervised model needs labels" → switch to self-supervised learning
- "Our monolithic model is too complex" → build an ensemble
- This is pivoting within problem boundaries

**Level 3 - System Reframe**: Change the problem definition
- "We're building an AI to replace human judgment" → "We're building tools to augment human judgment"
- "We're predicting customer churn" → "We're identifying factors that drive customer success"
- This changes what success means

### Example: Recidivism Prediction Reframe

**Original Problem**: Build an AI system to predict which defendants will commit future crimes (recidivism), helping judges make bail and sentencing decisions.

**Signals After Deployment**:
- Model achieves 70% accuracy—better than random, worse than hoped
- Disproportionate false positives among minority defendants
- Judges over-rely on scores, reducing individual case consideration
- Predicted high-risk defendants who stay in jail can't prove the prediction wrong (unfalsifiable)
- Civil rights groups file lawsuits citing bias

**Level 1 Response (Tactical)**: Tune the model, add more features, balance the training data
- **Problem**: Doesn't address fundamental issues of fairness, unfalsifiability, or over-reliance

**Level 2 Response (Strategic)**: Switch to different ML approaches—causal inference, fairness-aware learning, interpretable models
- **Problem**: Still framing the problem as "predict future crime," which may be fundamentally flawed

**Level 3 Response (System Reframe)**: Change the problem
- **From**: "Predict who will commit crime"
- **To**: "Identify defendants who need support services to succeed"
- **Or**: "Predict who will appear for trial" (actionable, verifiable outcome)
- **Or**: "Provide judges decision support showing similar historical cases and outcomes"

The system reframe recognizes that "predicting future crime" encodes problematic assumptions:
- Assumes crime is individual choice, not systemic/environmental
- Creates self-fulfilling prophecies (jail → job loss → desperation → crime)
- Optimizes for incarceration, not rehabilitation or justice

A reframe might ask: What if the problem isn't "who will commit crime" but "what conditions lead to successful reentry" or "how do we allocate support resources"? This changes the entire AI system—different data, different models, different success metrics, different stakeholders.

### Triggering System Reframes

System reframes happen when you question root assumptions. Ask:

1. **Who defined this problem, and what were their incentives?**
   - Example: If your problem was defined by a technology vendor, is it framed to favor their technology?

2. **What does "success" assume about the world?**
   - Example: Optimizing ad clicks assumes more engagement is good—but what if attention is finite and precious?

3. **Who benefits from this problem definition, and who is harmed?**
   - Example: "Predict employee turnover" benefits employers but may harm employees flagged as flight risks

4. **What would we do if this approach were impossible?**
   - Example: If you couldn't predict recidivism, you'd focus on root causes—poverty, mental health, education. Should you do that anyway?

5. **Are we solving a symptom or a cause?**
   - Example: Predicting hospital readmissions treats readmission as a patient problem, not a systemic discharge/follow-up problem

### Try It: Reframing Practice

Take your portfolio project (or a hypothetical AI system). Write three levels of response to a strong negative signal:

**Scenario**: Your AI system is underperforming or facing resistance.

**Level 1 (Tactical Reframe)**: What implementation changes would you try?

**Level 2 (Strategic Reframe)**: What alternative approaches could solve the same problem?

**Level 3 (System Reframe)**: How could you redefine the problem itself? What assumptions would you question?

**Guiding Questions**:
- Who defined the original problem, and why?
- What does your current success metric assume?
- Who is excluded or harmed by the current problem framing?
- If your current approach were impossible, what would you do instead?

## Section 4: Cautionary Tales

Learning from failure is cheaper than experiencing it firsthand. Here are three cautionary tales of projects that ignored strong signals and paid the price.

### Case 1: Quibi - Ignoring User Behavior Signals

**The Vision**: Quibi (2020) raised $1.75 billion to create premium short-form video content for mobile devices, betting that users wanted high-quality 10-minute episodes designed for phones.

**The Signals**:
- Beta testers preferred landscape mode; Quibi's tech forced portrait-first viewing
- Users expected free content (like YouTube/TikTok); Quibi charged $5-8/month
- COVID-19 hit during launch—commuters (the target audience) stayed home
- User retention dropped 90% after free trials ended
- Competitors (TikTok, Instagram Reels) offered short video for free with massive adoption

**What They Should Have Done**:
- **Pivot 1**: Make content playable on TVs/desktops when COVID eliminated commutes
- **Pivot 2**: Adopt ad-supported free tier when retention collapsed
- **System Reframe**: Question whether "professional short-form mobile video" was a real need, or whether user-generated content had already filled it

**What They Did**: Persisted with the original model, spent $1.75 billion in six months, shut down in October 2020.

**The Lesson**: When user behavior contradicts your assumptions (people want free, people watch on TVs, people prefer user content), that's a system-level signal. Persisting with better marketing or content won't fix a flawed problem definition.

### Case 2: IBM Watson for Oncology - Ignoring Ground Truth

**The Vision**: IBM Watson would analyze medical literature and patient records to recommend cancer treatments, augmenting or replacing oncologist decision-making.

**The Signals**:
- Watson's recommendations often contradicted oncologist expertise
- Training data came from a single hospital (Memorial Sloan Kettering), limiting generalization
- Doctors found recommendations "not safe and may be harmful" in internal reviews
- System required extensive manual coding to handle new cancer types
- Partners (MD Anderson, others) canceled contracts after millions spent
- No peer-reviewed studies validated clinical effectiveness

**What They Should Have Done**:
- **Pivot 1**: Shift from "replace oncologist judgment" to "literature search assistant" when recommendations proved unreliable
- **Pivot 2**: Focus on narrow, validated use cases (e.g., flagging drug interactions) instead of general treatment recommendations
- **System Reframe**: Recognize that oncology is too complex and contextual for pattern-matching AI; reframe to support tasks (research, documentation) rather than core decisions

**What They Did**: Persisted for seven years, rebranding and repositioning without addressing fundamental issues. Sold Watson Health assets in 2022 at a massive loss.

**The Lesson**: When domain experts consistently reject your system's outputs, that's a signal about problem complexity, not expert stubbornness. You may be solving a problem that requires different methods—or shouldn't be solved this way at all.

### Case 3: Zillow Offers - Ignoring Economic Signals

**The Vision**: Zillow would use AI to predict home values, buy houses at algorithm-determined prices, then resell at a profit (iBuying).

**The Signals**:
- Algorithm struggled with volatile markets (COVID housing boom)
- Home appreciation outpaced algorithm predictions—Zillow paid too much
- Renovation costs and holding costs exceeded models
- Competitors (Opendoor, Offerpad) faced same challenges but pivoted faster
- Losses mounted: $380 million in Q3 2021 alone
- Inventory swelled: 7,000+ homes purchased but unsellable at profitable prices

**What They Should Have Done**:
- **Pivot 1**: Pause buying when market volatility exceeded model confidence thresholds
- **Pivot 2**: Shift from "profit on resale" to "profit on transaction fees" (facilitation, not speculation)
- **System Reframe**: Recognize that home pricing isn't just an ML problem—it's a market timing and risk management problem; reframe to tools that help *others* make pricing decisions

**What They Did**: Scaled up buying even as losses grew, hoping scale would fix model accuracy. Shut down Zillow Offers in November 2021, laid off 25% of staff.

**The Lesson**: When your economic model depends on prediction accuracy you can't achieve, persisting with more data or better models won't help. The problem may be unpredictable, or the margins may be too thin for error. Either reframe the business model or stop.

### Common Patterns in Failures

All three cases share characteristics:

1. **Sunk Cost Trap**: Massive investment made pivoting feel like admitting failure
2. **Founder's Dilemma**: Leadership had personal/professional identity tied to original vision
3. **Confirmation Bias**: Focused on positive signals (funding, press, partnerships) over negative signals (user behavior, expert rejection, economic losses)
4. **Technological Optimism**: Believed "more data" or "better models" would solve structural problems
5. **Missing Reframe**: Never questioned whether they were solving the right problem

## Section 5: Overcoming Sunk Cost

The sunk cost fallacy is the most common reason teams persist when they should pivot or stop. Understanding its psychology is essential to making rational decisions.

### The Fallacy: Definition and Dynamics

**Sunk Cost Fallacy**: The tendency to continue investing in a project because of past investment, even when future costs exceed future benefits.

**Rational Decision-Making**: Evaluate options based on future costs and benefits only. Past investments are gone regardless of future decisions.

**Example**:
- You've spent $500,000 and 12 months building an AI system
- Completing it requires another $300,000 and 6 months
- Expected value if completed: $200,000
- **Sunk cost thinking**: "We've invested too much to quit now"
- **Rational thinking**: "Completing costs $300k to gain $200k—that's a $100k loss. Stop."

The $500,000 is gone whether you continue or stop. The only question is: does the *additional* $300,000 investment yield more than $200,000 in value?

### Why We Fall for It

**Psychological Drivers**:

1. **Loss Aversion**: Stopping feels like admitting failure and crystallizing losses. Continuing offers (false) hope of recovery.

2. **Escalation of Commitment**: Each new investment makes stopping harder, creating a spiral.

3. **Identity Protection**: "I'm not the kind of person who quits" or "I'm a visionary who perseveres"—stopping threatens self-image.

4. **Social Pressure**: Investors, stakeholders, and teams expect persistence. Pivoting feels like letting people down.

5. **Narrative Fallacy**: We construct stories where current struggles are "the dark before the dawn"—every hero's journey has setbacks, so setbacks must mean success is near.

### Organizational Amplification

Organizations magnify sunk cost fallacies through:

- **Budget cycles**: "We've allocated this funding; we have to spend it"
- **Promotion incentives**: Leaders who pivot risk appearing indecisive
- **Siloed information**: Teams closest to problems may see signals that executives don't
- **Public commitments**: Announced initiatives are hard to cancel without embarrassment

### Countering Sunk Cost Thinking

**1. Pre-Commitment Strategies**

Before starting, establish decision rules:

**Example Decision Rule**:
"If after 6 months, our model accuracy is below 80% AND user satisfaction is below 60%, we will pivot to a decision-support tool rather than an autonomous system."

By setting thresholds in advance, you create permission to pivot without it feeling like failure.

**2. Prospective Framing**

Reframe the decision from "should we continue?" to "if we were starting today, would we start this project?"

**Exercise**: The New Manager Test
- Imagine a new manager arrives who knows nothing about your project's history
- They evaluate: "Should we invest [remaining resources] in this project given current evidence?"
- Would they say yes?

This mental model removes sunk costs from consideration.

**3. Red Team Reviews**

Assign a team member (rotating role) to argue for stopping or pivoting. Make it their job to find contrary evidence.

**Benefits**:
- Surfaces suppressed doubts
- Normalizes questioning the project
- Creates safe space for dissent

**4. Time-Boxing Pivots**

Set explicit intervals for pivot consideration:

"Every quarter, we will evaluate whether to persist, pivot, or stop based on [specific metrics]."

This removes the stigma—pivoting isn't weakness, it's scheduled strategic review.

**5. Celebrate Pivots**

Reframe pivots as learning victories, not failures:

- "We discovered this problem is harder than we thought—that's valuable information"
- "We found a better problem to solve—that's strategic insight"
- "We stopped before wasting more resources—that's discipline"

**Example**: Google celebrates "failures" through internal case studies. Google+ shutdown wasn't a failure; it validated that social networking wasn't core to their mission. This culture makes future pivots easier.

### Try It: Sunk Cost Audit

For your portfolio project, conduct a sunk cost audit:

**1. Document Sunk Costs**:
- Time invested: [hours/months]
- Money invested: [dollars]
- Reputation/commitment invested: [public statements, stakeholder promises]

**2. Apply the New Manager Test**:
"If I were assigned this project today, knowing what I know now, would I start it?"
- If yes: What would I do differently?
- If no: Why not?

**3. Identify Commitment Mechanisms**:
What makes stopping/pivoting hard beyond rational calculation?
- Personal identity ("I'm not a quitter")
- Social pressure ("I told my advisor this would work")
- Organizational inertia ("We've budgeted for this")

**4. Design a Pre-Commitment Rule**:
What objective criteria would trigger a pivot/stop decision?
- Metric thresholds
- Timeline checkpoints
- Resource limits

**Template**:
"If [measurable condition] is not met by [date], we will [specific pivot/stop action]."

## Reflection Questions

1. **Signal Interpretation**: Think of a time you ignored a strong signal (in any domain—projects, relationships, career). What made you ignore it? What would it take to recognize that pattern earlier next time?

2. **Persist vs. Pivot**: Consider an AI project facing difficulties. What evidence would convince you to persist? What evidence would convince you to pivot? How do you distinguish "hard but solvable" from "fundamentally flawed"?

3. **System Reframes**: Choose a well-known AI system (facial recognition, content recommendation, predictive policing, etc.). How could you reframe the problem it's solving at a system level? What assumptions would you question?

4. **Sunk Cost Scenarios**: You've spent 18 months building an AI product. User feedback is mixed, technical performance is mediocre, and a competitor just launched a better solution. Your team wants to persist. What questions would you ask? What would you need to know to decide?

5. **Ethical Pivots**: When should ethical concerns trigger a pivot or stop, even if technical and economic signals suggest persisting? What's your threshold?

## Portfolio Project: Pivot Analysis

Document a pivot decision—either from your own experience or a hypothetical AI project. Your analysis should demonstrate mastery of the persist/pivot/stop framework and system-level reframing.

### Requirements

**1. Project Context** (300-400 words)
- What problem was the AI system trying to solve?
- Who were the stakeholders and users?
- What was the technical approach?
- What were the initial success criteria?

**2. Signal Documentation** (400-500 words)

Identify and analyze at least three strong signals:

For each signal:
- **Description**: What did you observe?
- **Category**: Technical, user, or economic?
- **Strength**: Why is this a strong signal (persistent, patterned, structural)?
- **Evidence**: Specific metrics, quotes, or observations

**3. Decision Analysis** (500-600 words)

Evaluate the three options:

**Persist**:
- Under what conditions would persisting make sense?
- What hypotheses would you test if persisting?
- What would constitute evidence that persistence was working?

**Pivot**:
- What type of pivot? (Problem, solution, customer, or value)
- What would the pivoted approach look like specifically?
- How does this address the strong signals?
- What new risks does pivoting introduce?

**Stop**:
- What conditions would justify stopping entirely?
- What would you do with the team/resources if stopping?
- How would you extract value from learnings?

**Your Recommendation**: Which option and why?

**4. System Reframe** (400-500 words)

Go beyond tactical changes:
- What assumptions underlie the original problem definition?
- Who defined the problem, and what were their incentives/constraints?
- How could you reframe the problem at a system level?
- What would success look like under the reframed problem?
- How would this reframe change the AI system (data, models, metrics, stakeholders)?

**5. Sunk Cost Analysis** (300-400 words)

- What costs have been sunk?
- What psychological or organizational factors might bias toward persistence?
- How would you apply the New Manager Test?
- What pre-commitment rules would prevent sunk cost fallacy going forward?

### Evaluation Criteria

Your pivot analysis will be evaluated on:

- **Signal Recognition** (25%): Ability to identify and classify strong signals with evidence
- **Decision Framework** (25%): Rigorous application of persist/pivot/stop criteria
- **System Thinking** (25%): Depth of system-level reframing, questioning root assumptions
- **Sunk Cost Awareness** (15%): Recognition of cognitive biases and mitigation strategies
- **Clarity & Evidence** (10%): Clear writing, specific examples, logical argumentation

### Submission Format

- **Length**: 1,800-2,500 words
- **Format**: PDF or Markdown
- **Include**: Diagrams, metrics, or quotes as supporting evidence
- **Due**: [Date per course schedule]

### Example Topics

If you don't have a personal project to analyze, consider:

- **Amazon's Alexa Skill Store**: Why didn't third-party skills succeed? Should Amazon pivot or persist?
- **Healthcare Chatbots**: When do symptom-checkers need to pivot to human handoff?
- **Autonomous Delivery Robots**: Urban sidewalk robots vs. warehouse robots—different problems?
- **AI Content Moderation**: When to pivot from "detect harmful content" to "promote healthy engagement"?
- **Resume Screening AI**: Bias concerns—tactical fixes or system reframe needed?

Choose a case with enough public information to support analysis, or use a hypothetical scenario grounded in real technical and social constraints.

---

**Next Chapter Preview**: Chapter 6 explores "Alignment" - ensuring your AI system's objectives match human values and stakeholder needs, even as both evolve over time. You'll learn techniques for value elicitation, objective specification, and long-term alignment under uncertainty.
