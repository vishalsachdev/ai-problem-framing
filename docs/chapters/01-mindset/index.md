# Chapter 1: The AI Problem Framing Mindset

## Learning Objectives

By the end of this chapter, you will be able to:

1. Distinguish between System 1 and System 2 thinking in AI problem framing
2. Identify common cognitive biases (Hammer Bias, etc.) that derail AI projects
3. Apply the Stranger Test to evaluate problem clarity
4. Analyze domain context to inform framing decisions

## Introduction

In 2019, a healthcare startup raised $47 million to use machine learning to predict patient readmissions. The technology worked beautifully—their model achieved 87% accuracy in predicting which patients would return to the hospital within 30 days. Eighteen months later, the company shut down.

What went wrong? The technology wasn't the problem. The problem was the problem.

The startup had framed their challenge as a prediction problem: "Which patients will be readmitted?" But hospitals didn't actually need predictions—they needed interventions. Even with perfect predictions, nurses and social workers were overwhelmed and couldn't act on the information. The real problem wasn't identifying at-risk patients (clinicians already had good intuitions about this), but rather designing interventions that fit into existing workflows and addressing the underlying social determinants of health that caused readmissions in the first place.

This is not a story about bad technology. It's a story about jumping to a solution before understanding the problem. And it's far from unique.

According to various industry surveys, between 60-85% of AI projects fail to reach production. When these failures are analyzed, the most common culprit isn't insufficient data, inadequate computing power, or poorly trained models. It's problem framing—the fundamental work of understanding what problem you're actually trying to solve before you decide how to solve it.

This course is built on a single provocative claim: **Most AI failures aren't technical failures. They're failures of thinking.**

In this opening chapter, we'll examine the cognitive patterns that lead to poor problem framing and develop the mindset needed to frame problems well. We'll explore why our natural thinking patterns often mislead us, how to recognize when we're being misled, and how to cultivate the deliberate, analytical thinking that effective problem framing requires.

## Section 1: System 2 Thinking for AI

Let's start with a scenario that might feel uncomfortably familiar.

You're in a meeting. A colleague says, "We need to predict customer churn so we can offer targeted discounts to at-risk customers." Within seconds, your mind is racing: What data do you have? What features would you need? Should you use a random forest or gradient boosting? What's the target variable?

Notice what just happened. You jumped immediately from hearing a business challenge to designing a machine learning solution. You skipped over the most important question: Is this actually a prediction problem?

This is System 1 thinking at work.

### Key Idea: Two Systems of Thought

Psychologist Daniel Kahneman distinguishes between two modes of thinking:

**System 1** is fast, automatic, and intuitive. It's the thinking that lets you drive a familiar route while having a conversation, recognize a friend's face in a crowd, or answer "2 + 2 = ?" without conscious effort. System 1 is incredibly useful for navigating daily life—but it's terrible at problem framing.

**System 2** is slow, deliberate, and analytical. It's the thinking required to calculate 17 × 24 in your head, evaluate a complex argument, or check whether your intuitions are actually correct. System 2 is effortful and mentally taxing—but it's exactly what effective problem framing requires.

Here's the challenge: When we encounter a problem, System 1 kicks in first. It pattern-matches to familiar solutions, makes assumptions based on surface features, and generates answers that feel right. Only with deliberate effort do we engage System 2 to question those intuitions.

For AI practitioners, this creates a specific hazard. If you're reading this course, you probably have training in machine learning, data science, or a related field. Your System 1 has been trained to recognize "problems that ML can solve." When you hear a business challenge, your brain automatically translates it into ML terms. This translation happens so quickly and smoothly that you might not even notice it's occurring.

Let's examine what System 2 thinking looks like in practice.

### Example: Reframing the Churn Problem

Recall the earlier scenario: "We need to predict customer churn so we can offer targeted discounts to at-risk customers."

**System 1 response:** "Great, a binary classification problem. Let's gather historical customer data and build a logistic regression baseline."

**System 2 response:** "Wait. Let's slow down and examine the actual problem."

Here's what System 2 thinking might uncover:

**Question 1: What's the actual business goal?**
Not "predict churn" but "reduce churn" or more precisely "increase customer lifetime value." Prediction is a means, not an end.

**Question 2: What would we do with predictions?**
Offer discounts to at-risk customers. But does this actually work? Have we tested whether discounts reduce churn, or do they simply reduce margins on customers who would have stayed anyway?

**Question 3: Why do customers churn?**
If customers leave because a competitor offers better features, discounts won't help. If they leave because onboarding was confusing, predicting churn is treating a symptom, not the disease.

**Question 4: What are we not considering?**
Maybe the problem isn't predicting who will leave, but understanding why they stay. Maybe it's not about individual customers at all, but about segments or product features.

Notice the shift. System 1 gave us a solution (build a churn prediction model). System 2 gave us questions—questions that might lead to a completely different approach. Perhaps the real problem is improving onboarding, or fixing product bugs, or identifying which features drive loyalty. None of these require machine learning.

This is the essence of System 2 thinking for AI: **Slowing down to question the problem before jumping to solutions.**

### Try It: Practicing System 2 Thinking

Here's a low-stakes exercise to practice engaging System 2 thinking.

**Scenario:** A university administrator says, "We need to use AI to predict which students will drop out so we can intervene early."

Your System 1 probably already has ideas. But before you think about data or models:

1. Write down three questions you would ask to understand the actual problem
2. For each question, explain what you might learn that would change your approach
3. Identify one assumption embedded in the problem statement

Take a few minutes to work through this before reading ahead.

---

**Some questions you might have asked:**

- What does "intervene" mean? (If there's no intervention capacity, predictions are useless)
- What causes students to drop out? (Financial, academic, social—each requires different solutions)
- Who would use these predictions? (Faculty? Advisors? Do they have time and training to act?)
- What's the cost of false positives vs false negatives? (Stigmatizing students vs missing those who need help)
- Are we trying to help students succeed, or reduce dropout statistics? (These might not be the same)

**Assumption embedded in the problem statement:** That early prediction enables effective intervention. But what if students drop out due to factors that emerge late (sudden financial crisis, family emergency)? What if the real problem is that interventions don't work, not that we can't predict who needs them?

The point isn't that prediction is wrong. The point is that System 2 thinking reveals questions that System 1 leaps over—and those questions often matter more than the technical solution.

## Section 2: Cognitive Biases in AI Framing

System 1 thinking isn't just fast—it's also systematically biased. When we let intuition drive problem framing, we fall into predictable cognitive traps.

### Hammer Bias: When Everything Looks Like a Nail

Abraham Maslow famously wrote, "If the only tool you have is a hammer, everything looks like a nail." For AI practitioners, the hammer is machine learning, and the nails are prediction problems.

This is Hammer Bias: the tendency to frame problems in terms of the tools you know, rather than the problems you face.

**Examples of Hammer Bias in action:**

- A recommendation problem becomes a collaborative filtering problem (because you know collaborative filtering)
- A workflow inefficiency becomes an automation problem (because you know how to automate)
- A communication breakdown becomes a chatbot problem (because chatbots are trendy)
- An ambiguous business goal becomes a prediction problem (because prediction is what ML does)

Hammer Bias is insidious because it operates invisibly. You don't notice yourself reframing problems—it just feels like you're recognizing what kind of problem it is. The solution seems obvious because your expertise makes it obvious.

But here's the trap: **Expertise in ML makes you better at solving ML problems, not at recognizing when problems aren't ML problems.**

Consider this real example from a manufacturing company. Engineers noticed quality defects and proposed using computer vision and deep learning to detect defects on the production line. Sounds reasonable, right?

But when they examined the problem more carefully (System 2 thinking), they discovered that defects clustered at specific times—right after machine maintenance and during shift changes. The root cause wasn't detection, it was process consistency. The solution wasn't ML-based quality inspection, it was better maintenance protocols and shift handoff procedures.

The engineers had Hammer Bias. They saw a quality problem and thought, "We can detect defects with AI." They missed the actual problem: Why are defects occurring in the first place?

### Other Common Biases

Hammer Bias isn't the only cognitive trap. Watch for these as well:

**Availability Bias:** Over-weighting recent examples or problems similar to ones you've solved before. ("We just built a great recommendation system, so let's frame this new problem as recommendations too.")

**Confirmation Bias:** Seeking evidence that supports your initial framing while ignoring evidence against it. ("The data shows our churn model is 85% accurate!" But did you check if interventions actually work?)

**Sunk Cost Fallacy:** Continuing with an approach because you've already invested time or resources, even when evidence suggests reframing. ("We've spent three months building this model, we can't change the problem now.")

**Anchoring Bias:** Fixating on the first problem framing you encounter, even if it's arbitrary. ("The client asked for a classification model, so that's what we'll build.")

These biases don't make you a bad data scientist. They make you human. But recognizing them is the first step to counteracting them.

### The Stranger Test: A Tool for Clarity

Here's a simple diagnostic for detecting poor problem framing: **The Stranger Test.**

Imagine explaining your problem to an intelligent stranger who knows nothing about your domain or AI. Can you articulate:

1. **What problem you're solving** (not what model you're building)
2. **Why it matters** (the actual impact, not technical metrics)
3. **What success looks like** (in business or human terms, not accuracy scores)
4. **What you'll do with the results** (the specific actions or decisions)

If you can't explain these things clearly to a stranger, you probably don't understand the problem well enough yourself.

Let's test this with our earlier examples:

**Churn prediction (before The Stranger Test):**
"We're building a logistic regression model to predict customer churn with 80% accuracy."

**After The Stranger Test:**
"Our customers are canceling subscriptions. We're trying to figure out why they leave and what we can do to keep them. Success means more customers stay and we understand what drives loyalty. We'll use insights to improve our product and target interventions at customers who are unhappy."

Notice the difference. The first version is about the solution (logistic regression, 80% accuracy). The second is about the problem (why customers leave, how to keep them).

If you struggle to pass The Stranger Test, it's often because you're thinking about solutions before understanding problems. This is a red flag—stop and engage System 2 thinking.

### Try It: Apply The Stranger Test

Take one of these problem statements and rewrite it to pass The Stranger Test:

- "We need a neural network to classify images of skin lesions as benign or malignant"
- "We're building an NLP model to extract entities from legal contracts"
- "We need to cluster our users based on behavioral data"

For each, identify:
1. What's the actual problem (not the technical task)?
2. Why does it matter?
3. What constitutes success?
4. What will you do with the results?

## Section 3: Domain Context Matters More Than AI Expertise

Here's a claim that might seem counterintuitive: **For problem framing, domain expertise matters more than AI expertise.**

You can be the world's best machine learning engineer and still frame problems poorly if you don't understand the domain you're working in. Conversely, a domain expert with basic AI literacy can often frame problems better than an AI expert with shallow domain knowledge.

Why? Because good problem framing requires understanding:

- What people actually need (not what they say they need)
- How work actually happens (not how it's supposed to happen)
- What constraints are negotiable (and what constraints are ironclad)
- What success actually looks like (beyond metrics)
- Why previous solutions failed (the graveyard of past attempts)

None of this is in the data. All of this requires domain context.

### The Ethnographic Mindset

Anthropologists study cultures by immersing themselves in them—observing, asking questions, suspending judgment. They call this ethnography.

Effective problem framing requires an ethnographic mindset:

**Observe before theorizing:** Watch how people actually work before deciding how to help them. Shadow a nurse, sit with a customer service rep, observe a factory floor. Reality rarely matches your assumptions.

**Ask "why" five times:** This is the famous "Five Whys" technique from Toyota. When someone describes a problem, ask why it's a problem. Then ask why that's a problem. Keep going. You'll often discover that the surface problem is several layers removed from the root cause.

**Respect local knowledge:** The people closest to the problem usually know more than you do. They might not know ML, but they know their work. Listen to them.

**Understand workflows, not just tasks:** AI often fails because it solves a task in isolation but doesn't fit into the broader workflow. If your solution requires people to change how they work, it better be dramatically better, not just marginally more accurate.

### Example: The Radiology AI That Nobody Used

A team built an AI system to detect lung nodules in chest X-rays. The model was excellent—95% sensitivity, better than average radiologists. But when deployed in hospitals, radiologists rarely used it.

Why? The researchers had focused on the technical task (detect nodules) but ignored the clinical workflow. Radiologists didn't just look at X-rays in isolation—they integrated X-ray findings with patient history, symptoms, prior imaging, and clinical context. The AI only saw the image.

Furthermore, the AI flagged many benign nodules that experienced radiologists would immediately dismiss based on contextual knowledge. Rather than helping, the AI created extra work: radiologists had to review the AI's false positives and document why they disagreed.

The problem wasn't the AI's accuracy. The problem was framing detection as an isolated task rather than understanding the radiologist's actual workflow and decision-making process.

**The lesson:** Domain context reveals that the right question wasn't "Can we detect nodules?" but "How can we support radiologists' clinical decision-making in a way that fits their workflow?"

### Building Domain Understanding

If you're working in an unfamiliar domain, here's how to build context quickly:

**Spend time with end users:** Not in a conference room. In their actual work environment. Watch them work. Ask them to narrate what they're doing and why.

**Map the ecosystem:** Who are the stakeholders? What are their incentives? Who benefits from the current system? Who would benefit from change? Where is power concentrated?

**Study past failures:** What solutions have been tried before? Why didn't they work? This is invaluable—failed solutions often reveal hidden constraints.

**Learn the vocabulary:** Every domain has jargon. Learn it. Not just to communicate, but because jargon often encodes important distinctions that outsiders miss.

**Read the complaints:** Customer support tickets, employee surveys, online reviews, regulatory complaints. These reveal pain points that stakeholders might not articulate directly.

**Find a domain mentor:** Identify someone with deep expertise who can help you navigate the domain. Ask them to explain not just what happens, but why it happens that way.

Domain understanding isn't optional for problem framing. It's the foundation.

## Reflection Questions

Take a few minutes to consider these questions. Write down your thoughts—reflection is most valuable when externalized.

1. **Reflect on a recent project or problem you've worked on.** Can you identify a moment when you jumped to a solution before fully understanding the problem? What happened? What would you do differently now?

2. **Think about your own area of expertise.** How might your expertise create Hammer Bias? What kinds of problems are you predisposed to see? What kinds might you overlook?

3. **Consider a domain you work in (or want to work in).** What do you actually know about how work happens in that domain? What assumptions are you making? How could you test those assumptions?

4. **Apply The Stranger Test to a current or recent project.** Can you clearly explain: (a) what problem you're solving, (b) why it matters, (c) what success looks like, and (d) what you'll do with the results? If not, what's unclear?

5. **Think about biases beyond Hammer Bias.** Can you identify examples of availability bias, confirmation bias, or anchoring bias in your own thinking or in projects you've observed?

## Summary

Effective problem framing is not a technical skill—it's a cognitive discipline. Here are the key takeaways from this chapter:

1. **System 2 thinking is essential.** Our natural intuition (System 1) jumps to solutions before understanding problems. Effective framing requires slowing down, questioning assumptions, and engaging deliberate analytical thinking.

2. **Beware of Hammer Bias.** Expertise in AI makes you better at building AI solutions, but it can blind you to non-AI problems. When you have ML as a tool, everything starts to look like a prediction problem. Recognize this bias in yourself.

3. **Use The Stranger Test.** If you can't clearly explain what problem you're solving, why it matters, what success looks like, and what you'll do with results—to someone outside your field—you probably don't understand the problem well enough yet.

4. **Domain context matters more than AI expertise.** The best problem framers combine AI literacy with deep domain understanding. Invest in building domain knowledge through observation, conversation, and immersion.

5. **Question the question.** Most problems, as initially stated, are actually solutions in disguise. The requester has already done some framing (often poorly). Your job is to unpack that framing and question whether it's the right one.

These principles form the foundation of the AI problem framing mindset. In the coming chapters, we'll build on this foundation with specific frameworks and techniques. But without the mindset—without the commitment to System 2 thinking, bias awareness, and domain understanding—those frameworks won't help.

The good news is that this mindset is learnable. It requires practice and discipline, but it doesn't require genius. It requires only that you slow down, question your intuitions, and take problem framing seriously.

## Portfolio Project: Frame Your First Problem

Throughout this course, you'll build a portfolio of problem framing work. This isn't about implementing solutions—it's about demonstrating your ability to frame problems thoughtfully.

**Your first portfolio assignment is to frame a problem from your own domain.**

### Instructions

1. **Identify a problem** from a domain you know well (your workplace, research area, volunteer work, or personal interest). Choose something real, not hypothetical. Messy is good—real problems are messy.

2. **Write a one-page problem framing document** that includes:
   - **Problem statement:** What's the problem? (Not the solution—the actual problem)
   - **Why it matters:** Who is affected? What's the impact?
   - **Current approaches:** What are people doing now? Why isn't it working?
   - **Success criteria:** What would "solved" look like? (Be specific—not "better" but "how much better")
   - **Stakeholders:** Who cares about this? What are their different perspectives?
   - **Constraints:** What's non-negotiable? (Budget, time, regulations, culture, etc.)
   - **Stranger Test:** Explain the problem as if to an intelligent outsider

3. **Reflect on your biases:** Write a paragraph identifying what biases you might bring to this problem. Are you experiencing Hammer Bias? Availability bias? How might your expertise or background influence how you frame this problem?

4. **Identify what you don't know:** What domain knowledge do you lack? What would you need to learn to frame this problem better? Who would you talk to?

### Peer Review Criteria

You'll review a peer's framing using these questions:

- Does the problem statement describe a problem (not a solution in disguise)?
- Can you understand why this problem matters, even if you're unfamiliar with the domain?
- Are success criteria specific and measurable?
- Are stakeholder perspectives clearly identified?
- Does the framing acknowledge constraints and domain context?
- Does it pass The Stranger Test?
- Has the author demonstrated awareness of their own biases?

**Deliverable:** Submit your one-page framing document plus your bias reflection paragraph via the course platform by [deadline].

**Length:** Maximum 750 words total.

**Note:** You are NOT proposing a solution yet. If you find yourself talking about ML models, algorithms, or technical approaches, stop. That's Chapter 2's work. This assignment is only about understanding and articulating the problem.

## Next Steps

You've developed the mindset for effective problem framing. You understand the need for System 2 thinking, the dangers of cognitive bias, and the importance of domain context.

But here's an uncomfortable truth: **Sometimes the best solution isn't AI at all.**

In the next chapter, we'll explore AI Alternatives—the crucial question of whether AI is actually the right tool for your problem. We'll develop frameworks for evaluating when AI is appropriate, when it's overkill, and when simpler approaches are better.

Because the mark of a mature AI practitioner isn't knowing how to apply AI to every problem. It's knowing when not to.

---

*Ready to question whether AI is the answer? Continue to [Chapter 2: AI Alternatives](../02-ai-alternatives/index.md)*
