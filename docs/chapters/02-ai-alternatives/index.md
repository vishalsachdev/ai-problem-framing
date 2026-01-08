# Chapter 2: AI Solution Alternatives

## Learning Objectives

By the end of this chapter, you will be able to:

1. **Compare and contrast** 13 fundamental AI approach archetypes across prediction, search, generation, and agent categories
2. **Select** appropriate AI approaches based on problem characteristics, constraints, and success criteria
3. **Evaluate** trade-offs between alternative approaches across dimensions of data requirements, interpretability, latency, and maintenance burden
4. **Apply** the "alternatives menu" thinking to real problems by systematically generating multiple candidate approaches before converging on a solution

## Introduction

In 2019, a healthcare analytics team spent six months building a sophisticated classification model to predict patient readmissions within 30 days. The model achieved 87% accuracy on their test set. The data science team celebrated. Leadership was impressed. Then they deployed it.

Within two weeks, clinicians stopped using it.

The problem? The model predicted *which* patients would be readmitted, but clinicians needed to know *when* patients would likely deteriorate to intervene at the right moment. The team had built a binary classifier when they needed a time-series forecasting system. Same data. Same goal of reducing readmissions. Completely wrong approach.

This failure wasn't due to poor modeling skills or insufficient data. The team made a strategic error at the very beginning: they converged on a solution archetype before fully exploring alternatives. They asked "How accurately can we classify readmissions?" when they should have asked "What are all the ways we could use AI to help clinicians reduce readmissions?"

This chapter teaches you to avoid premature convergence by building a mental model of the AI solution space. You'll learn 13 fundamental solution archetypes, understand when each applies, and develop the discipline to systematically consider alternatives before committing to implementation.

The payoff is substantial. Teams that generate and evaluate multiple approaches before building tend to deliver solutions that are:

- **Better aligned** with actual user needs (not just stated requirements)
- **More maintainable** because they chose approaches that fit organizational capabilities
- **Less expensive** because they avoided over-engineering or under-engineering the solution
- **Faster to valuable** because they identified the simplest adequate approach

Let's build your alternatives menu.

## Section 1: Prediction Archetypes

Prediction is the most common category of AI applications, but "prediction" encompasses distinctly different archetypes with different use cases, data requirements, and success criteria. Four major prediction archetypes deserve careful differentiation.

### Forecasting vs Regression

Both forecasting and regression predict numerical outcomes, but they differ fundamentally in their relationship to time and the nature of their predictions.

**Regression** predicts outcomes based on features at a single point in time, with no inherent temporal ordering. Examples:

- Predicting house prices from bedroom count, location, and square footage
- Estimating patient length-of-stay from admission vitals and diagnosis codes
- Predicting customer lifetime value from demographic and behavioral features

Regression models assume features are simultaneously available and the prediction task is repeatable with new feature combinations. You can predict house prices for thousands of imaginary houses by varying features.

**Forecasting** predicts future values in a time series based on historical patterns. Examples:

- Predicting next month's sales from the past 24 months of sales data
- Forecasting daily electricity demand from historical demand patterns
- Predicting patient vital signs for the next 4 hours from the past 24 hours

Forecasting models assume temporal dependencies—recent past matters more than distant past, seasonality exists, trends evolve. You cannot forecast sales for a new product with no history.

**Key differentiators:**

| Dimension | Regression | Forecasting |
|-----------|-----------|-------------|
| **Time dependence** | Features available simultaneously | Sequential observations over time |
| **Prediction target** | Any feature combination | Next point(s) in time series |
| **Data requirements** | Cross-sectional or panel data | Sufficient historical time series |
| **Model assumptions** | Feature independence (often) | Temporal autocorrelation |
| **Interpretability** | Feature importance | Lag relationships, seasonality |

**Common mistake:** Using regression when temporal patterns matter. The readmission prediction story from our introduction exemplifies this—they built a regression model (predict readmission risk from admission features) when they needed forecasting (predict when deterioration would occur).

**When to choose regression:**

- Outcome depends on features available at prediction time, not historical trajectory
- You need to simulate "what-if" scenarios by varying features
- Temporal ordering is irrelevant or non-existent
- You have abundant cross-sectional data but limited time series history

**When to choose forecasting:**

- Outcome is inherently temporal (what happens next?)
- Historical patterns contain predictive signal (seasonality, trends, cycles)
- You need lead time for intervention (predict 2 hours before the event)
- Features are time-varying observations of the same entity

### Anomaly Detection vs Classification

Both identify unusual instances, but anomaly detection and classification differ in how they define "unusual" and what data they require.

**Classification** assigns instances to predefined categories based on labeled training data. Examples:

- Email spam detection (spam vs. not spam)
- Medical diagnosis from imaging (cancer vs. benign)
- Credit card fraud detection (fraudulent vs. legitimate)

Classification requires labeled examples of all classes you want to distinguish. The model learns decision boundaries from examples of both normal and abnormal cases.

**Anomaly detection** identifies instances that deviate from expected patterns without necessarily having labeled examples of anomalies. Examples:

- Network intrusion detection (normal traffic patterns vs. deviations)
- Manufacturing defect detection (normal sensor readings vs. outliers)
- User behavior anomalies (typical usage patterns vs. deviations)

Anomaly detection learns the distribution of normal behavior and flags instances that fall outside expected patterns. It doesn't need examples of every possible anomaly type.

**Key differentiators:**

| Dimension | Classification | Anomaly Detection |
|-----------|---------------|-------------------|
| **Label requirements** | Need examples of all classes | Often needs only normal examples |
| **Anomaly definition** | Pre-specified categories | Statistical deviation from normal |
| **Known unknowns** | Detects known anomaly types | Can detect novel anomaly types |
| **Imbalance tolerance** | Works with imbalanced classes | Designed for rare events |
| **Interpretability** | Why this class vs. others | How this differs from normal |

**Common mistake:** Framing anomaly detection as classification when you lack comprehensive labeled anomalies. Early fraud detection systems often made this error—trying to classify transactions as fraudulent when they only had examples of a few fraud types. New fraud patterns went undetected.

**When to choose classification:**

- You have labeled examples of all important categories
- Anomaly types are well-understood and relatively stable
- You need to distinguish between multiple specific anomaly types
- False positive rates must be precisely controlled

**When to choose anomaly detection:**

- Anomalies are rare and diverse (can't label all types)
- New anomaly patterns emerge over time
- You have abundant normal data but few anomaly examples
- The cost of missing novel anomalies is high

**Hybrid approaches:** Many production systems combine both. Anomaly detection flags unusual patterns, then classification distinguishes between known anomaly types and genuinely novel cases requiring human review.

### Clustering vs Classification

The confusion between clustering and classification causes more project failures than almost any other alternatives mixup. Both group similar instances, but they serve fundamentally different purposes.

**Classification** assigns instances to predefined categories using labeled training data. You know the categories in advance. The model learns to reproduce human-defined labels.

**Clustering** discovers natural groupings in data without predefined categories. You don't know the groups in advance. The algorithm finds structure based on similarity.

**Key differentiators:**

| Dimension | Classification | Clustering |
|-----------|---------------|------------|
| **Supervision** | Requires labeled training data | Unsupervised, no labels needed |
| **Categories** | Predefined by humans | Discovered from data patterns |
| **Reproducibility** | Consistent labels for new data | Clusters may shift with new data |
| **Validation** | Compare predictions to true labels | Assess cluster quality (coherence, separation) |
| **Purpose** | Automate human categorization | Discover unknown structure |

**Critical distinction in use cases:**

Use **classification** when:

- The categories are established and meaningful (spam vs. not-spam, cat vs. dog)
- You need consistent labeling of new instances
- Regulations or business rules define the categories
- You can obtain labeled training data

Use **clustering** when:

- Categories are unknown or poorly defined
- You want to discover natural segments (customer personas, patient subtypes)
- The goal is exploration or dimensionality reduction
- Creating labels is expensive or subjective

**Common mistake:** Using classification when you don't actually know the right categories. Consider customer segmentation: marketing teams often have legacy segments ("premium," "value," "inactive") but clustering might reveal that customers actually group by different behaviors (time-of-day usage, feature combinations, lifecycle stage). Classification would perpetuate potentially irrelevant categorization.

**The readmission case revisited:** If our healthcare team had considered clustering, they might have discovered that patients naturally group into distinct readmission risk profiles with different intervention needs—not just "high risk" vs. "low risk" but "comorbidity-driven," "medication-adherence-driven," "social-determinant-driven." This would have changed the entire problem framing.

## Section 2: Search and Retrieval Archetypes

When users need to find information, multiple retrieval paradigms exist. Choosing the wrong one leads to poor relevance, high latency, or unsustainable costs.

### Semantic Search vs Lexical Search vs Structured Search

Three fundamentally different approaches to finding relevant information, each with distinct strengths and appropriate contexts.

**Lexical search** matches query terms to document terms using string matching, Boolean logic, and statistical weighting (TF-IDF, BM25). Examples:

- Traditional search engines (before neural embeddings)
- SQL full-text search
- grep, Elasticsearch, Solr

Lexical search excels when queries use precise terminology that appears in target documents. It's fast, interpretable, and works well for factual lookup ("find documents containing 'quarterly revenue 2023'").

**Semantic search** embeds queries and documents into vector spaces where semantic similarity (not lexical overlap) determines relevance. Examples:

- Dense retrieval using BERT, sentence transformers
- Modern RAG systems
- "Similar documents" features

Semantic search excels when users express concepts differently than documents ("budget constraints" might match documents about "cost limitations" or "resource restrictions"). It handles synonyms, paraphrasing, and conceptual similarity naturally.

**Structured search** queries databases with explicit schema and relational logic. Examples:

- SQL queries against relational databases
- GraphQL queries
- Filter-based interfaces (e-commerce facets)

Structured search excels when data has well-defined schema, queries need precise filtering on attributes, and business logic requires exact match semantics.

**Key differentiators:**

| Dimension | Lexical Search | Semantic Search | Structured Search |
|-----------|----------------|-----------------|-------------------|
| **Matching basis** | Term overlap | Conceptual similarity | Attribute filters |
| **Vocabulary gap** | Poor (must use exact terms) | Good (handles synonyms) | N/A (predefined schema) |
| **Precision on factual lookup** | Excellent | Good | Excellent |
| **Latency** | Very fast | Slower (embedding + similarity) | Very fast (indexed) |
| **Interpretability** | Transparent (terms matched) | Opaque (embedding similarity) | Transparent (filters applied) |
| **Data requirements** | Text documents | Text + embedding model | Structured data |

**Common mistake:** Replacing lexical search entirely with semantic search. In practice, hybrid approaches outperform either alone. Lexical search for precise term matching plus semantic search for conceptual similarity often yields the best user experience.

**When to choose lexical search:**

- Users know precise terminology (technical documentation, legal search)
- Documents contain unique identifiers or codes
- Latency requirements are strict
- Query interpretation must be transparent

**When to choose semantic search:**

- Users express needs in natural language
- Terminology varies across documents
- Conceptual similarity matters more than exact matches
- You can tolerate embedding computation latency

**When to choose structured search:**

- Data has well-defined schema
- Queries involve precise attribute filtering
- Business rules require exact match semantics
- Relationships between entities matter

### Recommendation vs Prediction

Recommendation systems predict preferences, but "recommendation" differs from general prediction in critical ways that affect architecture and evaluation.

**Prediction** estimates a target variable from input features, treating all instances independently:

- Predict customer churn from behavioral features
- Predict equipment failure from sensor data
- Predict patient readmission risk from clinical features

**Recommendation** predicts user preferences in a collaborative or content-based framework, leveraging patterns across users or items:

- Recommend movies based on viewing history and similar users
- Recommend products based on purchase patterns
- Recommend content based on engagement signals

**Key differentiators:**

| Dimension | Prediction | Recommendation |
|-----------|-----------|----------------|
| **Data structure** | Feature matrix (independent instances) | User-item interaction matrix |
| **Signals used** | Features of single instance | Patterns across users/items |
| **Cold start** | No special concern | Major challenge (new users/items) |
| **Evaluation** | Accuracy on fixed test set | Ranking metrics, online A/B tests |
| **Diversity concern** | Not typically relevant | Critical (filter bubbles, serendipity) |
| **Feedback loops** | Not typically present | Strong (recommendations influence behavior) |

**Common mistake:** Building a recommendation system when you actually need prediction. Consider "predict which products this customer will buy"—sounds like recommendation, but if you only have features of the customer and products (no collaborative signal from other users), you're building a prediction model, not a recommendation system.

Conversely, building independent prediction models when collaborative patterns exist wastes valuable signal. If similar users exhibit similar preferences, recommendation approaches will outperform pure prediction.

**When to choose prediction:**

- Instance features are sufficient without cross-user/cross-item patterns
- You need predictions for each instance independently
- Collaborative signal is weak or absent
- Cold start is not a concern

**When to choose recommendation:**

- User-item interaction patterns exist
- "Similar users like similar items" holds
- You need to rank options, not just predict outcomes
- Diversity and serendipity matter

### Long Context vs RAG (Retrieval-Augmented Generation)

Two fundamentally different approaches to providing LLMs with external information, with distinct trade-offs in cost, latency, and reliability.

**Long context** puts all relevant information directly in the model's context window:

- Entire documents or codebases in a single prompt
- Full conversation histories
- Complete datasets for analysis

Modern LLMs support 100K–200K+ token contexts, making this feasible for moderate-sized information.

**RAG** retrieves relevant chunks from external knowledge bases and injects only retrieved portions into the prompt:

- Vector database with embeddings of documents
- Retrieve top-k relevant chunks based on query
- Inject retrieved chunks into prompt with question

RAG selectively includes information rather than providing everything.

**Key differentiators:**

| Dimension | Long Context | RAG |
|-----------|-------------|-----|
| **Information volume** | Everything in context | Only retrieved chunks |
| **Cost** | Higher (more input tokens) | Lower (fewer input tokens) |
| **Latency** | Higher (process full context) | Lower (smaller context) |
| **Retrieval errors** | None (everything present) | Possible (relevance failures) |
| **Context limits** | Bounded by model capacity | Unbounded (scale knowledge base) |
| **Knowledge updates** | Requires full context refresh | Update knowledge base only |
| **Consistency** | Guaranteed (full info present) | Variable (depends on retrieval) |

**Common mistake:** Assuming RAG is always better because it's "more advanced." Long context is simpler, has fewer failure modes, and often delivers better results when information volume fits within context limits.

Conversely, forcing everything into context when you have massive knowledge bases wastes resources and may exceed context limits.

**When to choose long context:**

- Information volume fits comfortably in context window
- You need guaranteed access to all information
- Retrieval errors are costly
- Information changes infrequently
- Simplicity and reliability are priorities

**When to choose RAG:**

- Information volume exceeds practical context limits
- Knowledge base updates frequently
- Cost optimization is critical
- Only small portions of knowledge base are relevant per query
- You can tolerate retrieval errors

**Hybrid approaches:** Many production systems use both—RAG for massive knowledge bases, then expand to full documents when needed via long context.

## Section 3: Generation Archetypes

When you need to produce new content—text, code, designs—multiple generation approaches exist with different capabilities and constraints.

### Generation vs Retrieval

The choice between generating new content and retrieving existing content is fundamental to system architecture.

**Retrieval** finds and returns existing content from databases, knowledge bases, or document collections:

- FAQ systems returning pre-written answers
- Document search returning relevant passages
- Code completion suggesting snippets from repositories

**Generation** creates new content on-demand using language models:

- Chatbots composing responses
- Code generation tools writing new functions
- Summarization systems producing abstracts

**Key differentiators:**

| Dimension | Retrieval | Generation |
|-----------|-----------|------------|
| **Content source** | Pre-existing, curated | Created on-demand |
| **Consistency** | Perfect (returns same content) | Variable (different each time) |
| **Quality control** | Curate once, serve many times | Every response is novel |
| **Factual accuracy** | Guaranteed (if source is accurate) | Requires verification (hallucinations) |
| **Flexibility** | Limited to existing content | Unbounded flexibility |
| **Latency** | Fast (lookup) | Slower (inference) |
| **Coverage** | Bounded by curated content | Unbounded (handles novel queries) |

**Common mistake:** Generating when you should retrieve. If users repeatedly ask questions with well-defined answers (product features, policy details, troubleshooting steps), retrieval delivers faster, more consistent, more accurate responses.

Conversely, retrieving when you should generate limits flexibility. If queries are open-ended and require synthesis, retrieval-only systems frustrate users with irrelevant canned responses.

**When to choose retrieval:**

- Queries map to well-defined content categories
- Factual accuracy is critical
- Responses must be consistent across users
- Latency requirements are strict
- Content requires review/approval before serving

**When to choose generation:**

- Queries are open-ended and diverse
- Synthesis across multiple sources is needed
- Personalization or context-specific adaptation is valuable
- You can tolerate occasional errors
- Flexibility is more important than perfect consistency

**Hybrid approaches:** Most production systems combine both. Retrieval for known query types, generation for long-tail or novel queries. Or use retrieval to gather facts, then generation to synthesize personalized responses.

### Extraction vs Generation

Both produce structured information from unstructured text, but extraction and generation differ in how they produce output and what guarantees they provide.

**Extraction** identifies and pulls specific information from source text:

- Named entity recognition (find person names, dates, locations)
- Relation extraction (identify connections between entities)
- Parsing structured data from documents (invoices, resumes)

Extraction returns information that exists explicitly in the source text.

**Generation** produces structured information by interpreting, inferring, or synthesizing from text:

- Summarization (create brief version of document)
- Classification (assign categories not explicitly stated)
- Transformation (convert unstructured notes to structured records)

Generation creates information not explicitly present in source text.

**Key differentiators:**

| Dimension | Extraction | Generation |
|-----------|-----------|------------|
| **Source grounding** | Returns text spans from source | Creates new text/labels |
| **Faithfulness** | Perfect (quoted directly) | Requires verification |
| **Inference level** | Minimal (surface patterns) | Significant (deep understanding) |
| **Schema flexibility** | Fixed extraction patterns | Flexible output formats |
| **Validation** | Compare to source text | Requires external validation |
| **Ambiguity handling** | May fail to extract | Makes best guess |

**Common mistake:** Using generation when extraction suffices. If you need to pull contract dates, party names, and amounts from legal documents, extraction delivers grounded, verifiable results. Generation might hallucinate dates or entities.

Conversely, extraction fails when information requires inference. "What is the author's sentiment toward the policy?" requires generation—the answer isn't a text span you can extract.

**When to choose extraction:**

- Information exists explicitly in text
- Grounding to source spans is important
- Schema is predefined and specific
- Factual accuracy is critical
- You need to show users where information came from

**When to choose generation:**

- Information requires inference or synthesis
- Multiple sources must be combined
- Output format is flexible or complex
- Perfect grounding is less critical than usability
- Users benefit from interpretation, not just facts

### Fine-Tuning vs Prompting vs RAG

Three approaches to specializing LLMs for specific tasks, with drastically different cost structures, data requirements, and maintenance burdens.

**Prompting** provides instructions and examples directly in the prompt without modifying model weights:

- Zero-shot: Instructions only ("Summarize this document")
- Few-shot: Instructions + examples ("Here are 3 example summaries, now summarize this")
- Chain-of-thought: Step-by-step reasoning guidance

Prompting requires no training data or model updates. You iterate by changing prompts.

**Fine-tuning** trains model weights on task-specific data:

- Full fine-tuning: Update all model parameters
- LoRA/adapter methods: Update small adapter layers
- Instruction tuning: Train on instruction-response pairs

Fine-tuning requires labeled training data and computational resources. Models become specialized for the task.

**RAG** augments prompts with retrieved information from external knowledge bases:

- Embed documents, retrieve relevant chunks
- Inject retrieved information into prompt
- Generate response based on retrieved context

RAG requires a knowledge base and retrieval system but no model training.

**Key differentiators:**

| Dimension | Prompting | Fine-Tuning | RAG |
|-----------|-----------|-------------|-----|
| **Data requirements** | None to few examples | Hundreds to thousands of examples | Knowledge base (retrieval corpus) |
| **Setup effort** | Minimal (write prompts) | Significant (prepare data, train) | Moderate (build knowledge base) |
| **Update frequency** | Instant (change prompt) | Slow (retrain model) | Fast (update knowledge base) |
| **Behavior specificity** | Generic model behavior | Highly specialized | Task-general + external knowledge |
| **Cost per inference** | Low (small prompts) | Low (no retrieval) | Moderate (retrieval + generation) |
| **Initial cost** | Minimal | High (training) | Moderate (build knowledge base) |
| **Knowledge updates** | Requires prompt changes | Requires retraining | Update knowledge base only |
| **Performance ceiling** | Lower on specialized tasks | Highest on trained tasks | High on knowledge-intensive tasks |

**Common mistake:** Jumping straight to fine-tuning when prompting or RAG would suffice. Fine-tuning is expensive and rigid—it makes sense only when:

- You have abundant task-specific training data
- Prompt-based approaches fail to meet quality bars
- Task behavior is stable (not constantly changing)
- Inference volume justifies upfront investment

Many teams waste months fine-tuning when better prompts or RAG would have solved the problem faster and more flexibly.

**When to choose prompting:**

- Task is clear and well-specified
- Few-shot examples provide sufficient guidance
- Requirements change frequently
- Budget for training is limited

**When to choose fine-tuning:**

- You have 1000+ high-quality training examples
- Task has specialized vocabulary or patterns
- Inference volume is massive (cost-sensitive)
- Behavior must be highly consistent
- Prompting and RAG both fail to meet quality bars

**When to choose RAG:**

- Task requires external knowledge
- Knowledge base changes frequently
- You need factual grounding for responses
- Knowledge is too large for prompts
- You can tolerate retrieval latency

**Hybrid approaches:** Many systems combine all three—fine-tune for task-specific behavior, use RAG for factual knowledge, and use prompting for runtime customization.

## Section 4: Agent Archetypes

When tasks require multi-step reasoning, tool use, or adaptive behavior, agent architectures come into play. Two fundamentally different agent paradigms exist.

### Deterministic Agents vs Autonomous Agents

Both agents take actions to accomplish goals, but they differ in how those actions are determined and how much autonomy the system has.

**Deterministic agents** follow predefined workflows, decision trees, or state machines:

- Rule-based chatbots (if user says X, do Y)
- Workflow automation (step 1: fetch data, step 2: transform, step 3: load)
- Scripted tool use (always call API A before API B)

Deterministic agents have predictable, inspectable, controllable behavior defined by explicit logic.

**Autonomous agents** use LLMs to reason about goals, plan actions, and select tools dynamically:

- ReAct-style agents (model decides which tool to call based on context)
- Multi-agent systems (agents collaborate to solve problems)
- Goal-directed planning (model generates action sequences)

Autonomous agents have emergent, adaptive behavior determined by model reasoning at runtime.

**Key differentiators:**

| Dimension | Deterministic Agents | Autonomous Agents |
|-----------|---------------------|-------------------|
| **Action selection** | Predefined rules/workflows | LLM reasoning |
| **Predictability** | Fully predictable | Emergent behavior |
| **Debugging** | Inspect logic directly | Requires tracing LLM decisions |
| **Failure modes** | Known and enumerable | Surprising and diverse |
| **Adaptation** | Requires code changes | Adapts via model capability |
| **Latency** | Fast (direct execution) | Slower (LLM reasoning loops) |
| **Cost** | Low (no inference loops) | Higher (multiple LLM calls) |
| **Reliability** | High (deterministic) | Variable (model-dependent) |

**Common mistake:** Building autonomous agents for tasks that should be deterministic workflows. If the action sequence is well-understood and rarely varies, deterministic agents are faster, cheaper, more reliable, and easier to debug.

Conversely, building rigid deterministic workflows when you need adaptability. If the task requires dynamic problem-solving, autonomous agents can handle edge cases that deterministic logic would miss.

**When to choose deterministic agents:**

- Action sequences are well-defined and stable
- Predictability and reliability are critical
- Latency and cost constraints are tight
- Debugging and auditability are important
- Legal or regulatory requirements demand explainable behavior

**When to choose autonomous agents:**

- Tasks require dynamic reasoning and planning
- Action sequences vary significantly by context
- You need adaptability to novel situations
- Model capabilities are sufficient for reliable reasoning
- You can tolerate occasional unexpected behavior

**Hybrid approaches:** Many production systems use deterministic agents as the backbone with autonomous agents for specific subtasks that benefit from flexibility. For example, a deterministic workflow might handle data ingestion and transformation, then invoke an autonomous agent for complex query interpretation or decision-making.

## Section 5: Optimization vs Prediction

A subtle but critical distinction that often goes unrecognized: some business problems frame naturally as optimization, not prediction.

**Prediction** estimates outcomes given inputs:

- Predict demand for each product
- Predict patient readmission risk
- Predict equipment failure timing

**Optimization** finds inputs that maximize or minimize objectives subject to constraints:

- Determine inventory levels that minimize cost while meeting demand
- Schedule surgeries to maximize operating room utilization
- Route vehicles to minimize delivery time and fuel cost

**Key differentiators:**

| Dimension | Prediction | Optimization |
|-----------|-----------|--------------|
| **Goal** | Estimate outcome | Find best decision |
| **Output** | Forecast or estimate | Action plan or configuration |
| **Constraints** | Not typically present | Critical (budgets, capacity, rules) |
| **Evaluation** | Prediction accuracy | Objective value achieved |
| **User need** | Insight or forecast | Actionable decision |
| **Complexity** | Model complexity | Search space complexity |

**Common mistake:** Building prediction models when users need decisions, not forecasts. Consider demand forecasting—if the real need is "How much should we order?" then optimization (possibly using demand predictions as inputs) delivers more value than predictions alone.

Conversely, framing problems as optimization when predictions suffice. If users want insight ("will this patient be readmitted?") without needing prescriptive recommendations, prediction is simpler and more interpretable.

**When to choose prediction:**

- Goal is insight, awareness, or forecast
- Users make decisions based on predictions
- Constraints and action spaces are user-dependent
- Interpretability is critical

**When to choose optimization:**

- Goal is prescriptive recommendation
- Problem has clear objective function and constraints
- Users want "what should I do?" not "what will happen?"
- Decision quality measurably improves with optimal solutions

**Hybrid approaches:** Many systems predict outcomes as inputs to optimization models. Forecast demand (prediction), then optimize inventory (optimization). Predict failure probability (prediction), then optimize maintenance schedule (optimization).

## Reflection Questions

Before moving to the portfolio project, reflect on these questions:

1. **Premature Convergence**: Think of a recent AI project you worked on or heard about. What alternative approaches were considered before committing to the final approach? What alternatives were *not* considered that, in retrospect, might have been viable?

2. **Archetype Selection**: For each of these problem statements, identify which archetype(s) seem most appropriate and explain why:

   - "We want to help clinicians identify high-risk patients early"
   - "We want to help customers find products they'll love"
   - "We want to reduce energy consumption in our manufacturing facilities"
   - "We want to detect fraudulent transactions"
   - "We want to answer employee questions about company policies"

3. **Trade-off Awareness**: Choose two archetypes from this chapter that seem similar (e.g., classification vs. anomaly detection, or RAG vs. long context). What's one scenario where the first clearly wins, and one scenario where the second clearly wins?

4. **Hybrid Thinking**: Many production systems combine multiple archetypes. Why might you combine:

   - Retrieval + Generation?
   - Lexical Search + Semantic Search?
   - Deterministic Agents + Autonomous Agents?
   - Prediction + Optimization?

5. **Missing Alternatives**: Look back at the 13 archetypes. Are there AI approaches you've used that don't fit cleanly into these categories? What would you add to the alternatives menu?

## Portfolio Project: Alternatives Analysis

For this chapter's portfolio assignment, you'll practice systematic alternative generation by mapping real problems to multiple solution archetypes.

### Instructions

Select three of the following problem statements (or use problems from your own domain if you prefer):

1. **Healthcare**: A hospital wants to reduce emergency department wait times
2. **Education**: A university wants to improve student retention and completion rates
3. **Finance**: A bank wants to reduce credit card fraud losses
4. **E-commerce**: An online retailer wants to increase average order value
5. **Manufacturing**: A factory wants to reduce equipment downtime
6. **Customer Support**: A SaaS company wants to reduce support ticket volume
7. **HR**: An enterprise wants to improve employee retention
8. **Logistics**: A delivery company wants to optimize route efficiency

For each of your three chosen problems:

### Part 1: Generate Alternatives (5+ approaches per problem)

For each problem, systematically generate at least 5 different AI solution archetypes that could address the problem. Use the 13 archetypes from this chapter as your starting menu, but feel free to propose hybrid approaches.

For each alternative, specify:

- **Archetype name** (e.g., "Time-series forecasting," "Hybrid retrieval + generation")
- **One-sentence description** of how this approach would work
- **Key data requirements** (what data would you need?)
- **Primary benefit** (what makes this approach attractive?)

### Part 2: Compare Alternatives

For each problem, create a comparison table evaluating your alternatives across these dimensions:

- **Data availability** (Do we likely have this data? Easy/Moderate/Hard)
- **Implementation complexity** (Simple/Moderate/Complex)
- **Time to value** (Weeks/Months/Quarters)
- **Interpretability** (High/Medium/Low)
- **Maintenance burden** (Low/Medium/High)

### Part 3: Recommend and Justify

For each problem, select your recommended approach and justify your choice in 2-3 paragraphs:

- **Why this approach** over the alternatives?
- **What assumptions** is your recommendation based on?
- **What would change your recommendation?** (e.g., "If we had abundant labeled fraud examples, classification would be preferable to anomaly detection")
- **What hybrid approach** might combine strengths of multiple alternatives?

### Part 4: Reflection

After completing the analysis for all three problems, write a 1-2 paragraph reflection:

- What patterns did you notice in how you generated alternatives?
- Which archetypes appeared most frequently in your recommendations? Why?
- What was most difficult about this exercise?
- How might you improve your alternatives generation process for future problems?

### Submission Format

Submit a document (PDF or Markdown) with:

- Your three chosen problem statements
- For each problem: Part 1 (alternatives list), Part 2 (comparison table), Part 3 (recommendation)
- Part 4 (reflection)

Aim for 1500-2500 words total across all three problems and the reflection.

### Evaluation Criteria

Your submission will be evaluated on:

- **Diversity of alternatives** (Did you explore genuinely different archetypes, not just variations on one theme?)
- **Specificity** (Are alternatives concrete enough to evaluate, not vague hand-waving?)
- **Trade-off reasoning** (Do you articulate meaningful differences between alternatives?)
- **Justification depth** (Do recommendations demonstrate systematic thinking or just intuition?)
- **Assumption awareness** (Do you recognize what your recommendation depends on?)

Strong submissions demonstrate disciplined exploration of the solution space before converging on a recommendation. Weak submissions converge immediately on an intuitive answer without seriously considering alternatives.

---

## Key Takeaways

Before moving to Chapter 3, ensure you understand these core ideas:

1. **Premature convergence is the enemy.** The most common failure mode in AI problem framing is jumping to a solution archetype without systematically considering alternatives.

2. **Archetypes are a menu, not a checklist.** You don't need to use all 13 archetypes, but you should consciously choose from the menu rather than defaulting to familiar approaches.

3. **Similar-sounding archetypes have critical differences.** Classification vs. anomaly detection, regression vs. forecasting, extraction vs. generation—these pairs seem similar but have different data requirements, assumptions, and appropriate use cases.

4. **Hybrid approaches often win in production.** Real systems combine archetypes: lexical + semantic search, retrieval + generation, deterministic + autonomous agents. Think in combinations, not either-or.

5. **Context determines the right approach.** There is no universally best archetype. Everything depends on data availability, latency requirements, interpretability needs, maintenance capacity, and organizational constraints.

6. **Alternatives generation is a skill.** With practice, you'll develop the discipline to systematically explore the solution space. This chapter gave you the menu—Chapter 3 will teach you the systematic process for using it.

---

## Additional Resources

### Foundational Papers

- **Retrieval-Augmented Generation**: Lewis et al. (2020), "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks"
- **Few-Shot Prompting**: Brown et al. (2020), "Language Models are Few-Shot Learners"
- **ReAct Agents**: Yao et al. (2023), "ReAct: Synergizing Reasoning and Acting in Language Models"
- **Dense Retrieval**: Karpukhin et al. (2020), "Dense Passage Retrieval for Open-Domain Question Answering"

### Practical Guides

- **Forecasting**: Rob Hyndman's "Forecasting: Principles and Practice" (free online textbook)
- **Anomaly Detection**: Chandola et al. (2009), "Anomaly Detection: A Survey"
- **Recommendation Systems**: Aggarwal (2016), "Recommender Systems: The Textbook"
- **LLM Fine-Tuning**: HuggingFace's "Fine-tuning Guide" and OpenAI's "Fine-Tuning Documentation"

### Comparisons and Trade-offs

- **RAG vs. Fine-Tuning**: "When to Use RAG vs. Fine-Tuning" (Pinecone blog series)
- **Semantic vs. Lexical Search**: "Hybrid Search: Combining Dense and Sparse Retrieval" (Weaviate documentation)
- **Classification vs. Clustering**: James et al., "An Introduction to Statistical Learning" (Chapter 10-12)

### Case Studies

- **Healthcare Prediction Failures**: Shah et al. (2019), "Making Machine Learning Models Clinically Useful"
- **Fraud Detection Evolution**: Bolton & Hand (2002), "Statistical Fraud Detection: A Review"
- **Recommendation System Trade-offs**: Gomez-Uribe & Hunt (2016), "The Netflix Recommender System"

---

**Next Chapter**: In Chapter 3, you'll learn The Loop framework—a systematic process for moving from ambiguous objectives through alternative generation, trade-off analysis, and signal-based decision making. The alternatives menu you just learned becomes a tool within The Loop's structured workflow.
