# Glossary: AI Problem Framing for AI Practitioners

A comprehensive reference of key concepts for understanding AI problem framing at the graduate level.

---

#### Alternatives Menu

A structured set of different AI approaches or solution strategies identified for a given problem. Creates an explicit framework for comparing how various methods could address the core issue.

**Example:** For customer churn, an alternatives menu might include: regression (predict churn probability), classification (high/low risk buckets), or clustering (identify similar at-risk customers).

#### Anomaly Detection

A machine learning task that identifies data points, patterns, or behaviors that deviate significantly from normal or expected distributions. Used to find unusual observations within datasets.

**Example:** Detecting fraudulent credit card transactions that fall outside normal spending patterns for an individual user.

#### Atomic Unit

The smallest, independently meaningful component of a problem that can be diagnosed, solved, or measured. Identifies the granularity level needed for effective problem deconstruction.

**Example:** In invoice processing, the atomic unit might be a single line item rather than an entire invoice, enabling line-level quality metrics.

#### Assumptions

Beliefs or conditions accepted as true without verification when framing a problem. Critical to identify explicitly because false assumptions undermine problem and solution frames.

**Example:** Assuming that historical sales data reflects current customer behavior may fail when market conditions have fundamentally changed.

#### Autonomous Agent

An AI system that operates with minimal human intervention, making decisions and taking actions based on learned patterns, goals, or instructions without requiring approval for each step.

**Example:** A recommendation system that automatically adjusts product suggestions based on real-time user behavior without human review of each recommendation.

#### Bias Detection

The process of measuring and identifying systematic errors, disparities, or unfair treatment in AI model predictions across different demographic groups or conditions.

**Example:** Discovering that a hiring recommendation model rejects female candidates at rates 15% higher than male candidates with identical qualifications.

#### Cautionary Tale

A documented case where problem framing or decision-making went wrong, providing lessons about which approaches to avoid or which hidden assumptions to watch for.

**Example:** A company that built a predictive churn model assuming recent behavior indicates lifetime value, then discovered their most valuable customers had intentionally reduced engagement before renewal.

#### Churn Prediction

A classification task that predicts the probability or likelihood that a customer will stop using a service or product within a specified time period.

**Example:** Predicting which subscription users will cancel within the next 30 days to enable targeted retention campaigns.

#### Classification

A supervised machine learning task that assigns data points to predefined categories or classes based on learned patterns from labeled examples.

**Example:** Categorizing emails as spam or not-spam based on historical examples of each category.

#### Clustering

An unsupervised machine learning task that groups similar data points together based on patterns without predefined categories or labels.

**Example:** Grouping customers by purchase behavior to discover natural market segments without specifying segments in advance.

#### Cognitive Bias

Systematic patterns in human thinking that lead to consistent errors or deviations from rational judgment, often unconscious and difficult to overcome.

**Example:** Confirmation bias leads practitioners to seek data supporting their initial problem hypothesis while ignoring contradictory evidence.

#### Concept Drift

A change in the statistical relationship between input variables and outcomes over time, causing models trained on historical data to become less accurate on new data.

**Example:** A model trained on past unemployment patterns may fail when economic policy or labor market structure fundamentally changes.

#### Data Distribution

The statistical properties and patterns of how values are spread across a dataset, including central tendency, variability, and shape characteristics.

**Example:** Customer ages in an e-commerce dataset show bimodal distribution with peaks at 25-34 and 55-64, indicating two distinct demographic segments.

#### Data Drift

A change in the statistical properties of input data (features) over time, causing models trained on historical distributions to encounter unfamiliar patterns in production.

**Example:** A model trained on credit card spending patterns from 2019 encounters post-pandemic spending behavior with different seasonal patterns and magnitude.

#### Decision Threshold

The boundary value used to convert continuous model outputs (scores or probabilities) into discrete decisions or actions.

**Example:** Setting a churn prediction threshold at 0.6 probability means customers scoring above 60% are targeted for retention, while those below are not.

#### Deterministic Agent

An AI system that produces the same output given the same input, following explicitly defined rules without randomness or learned variability.

**Example:** A rules-based invoice processing system that applies consistent formatting and extraction logic to all invoices.

#### Diagnostic Test

A specific analysis or experiment designed to identify the root cause of poor model performance or to validate assumptions about problem structure.

**Example:** Splitting model errors by input data characteristics to determine whether performance problems affect all customer segments equally or concentrate in specific groups.

#### Domain Context

The background knowledge, constraints, business realities, and historical context specific to the problem area that shape what solutions are feasible and valuable.

**Example:** In healthcare, domain context includes regulatory requirements, clinical workflows, and the critical importance of false negatives in diagnosis.

#### Embeddings

Numerical vector representations of text, images, or other data that capture semantic meaning or relationships in a continuous, lower-dimensional space.

**Example:** Word embeddings represent "king" and "queen" as points in vector space where the relationship between them is similar to the relationship between "man" and "woman."

#### Escalation of Commitment

A cognitive tendency to continue investing in a course of action despite evidence that it is failing, driven by sunk costs and desire to avoid admitting past mistakes.

**Example:** A team continues building a complex ML pipeline even after diagnosis shows the root problem could be solved with a simpler rule-based approach.

#### Error Analysis

A systematic investigation of model mistakes to identify patterns, categories, or conditions where errors concentrate, revealing where to focus improvements.

**Example:** Analyzing misclassified images in a computer vision model and discovering 80% of errors occur on low-light photos, pointing to a data quality issue.

#### Error Pattern

Recurring or systematic characteristics in how a model fails, revealing underlying problems rather than random mistakes.

**Example:** A sentiment analysis model consistently misclassifies sarcasm as positive, showing it cannot interpret indirect language.

#### Extraction

A machine learning task that identifies and pulls structured information from unstructured text or documents, converting raw content into organized, usable data.

**Example:** Extracting invoice number, amount, and due date from a PDF document.

#### Fairness Metric

A quantitative measure of whether a model's predictions or decisions treat different demographic groups or conditions equitably without systematic disparities.

**Example:** Using demographic parity to measure whether a loan approval model approves applications from different racial groups at equal rates.

#### Fine-Tuning

A training approach that takes a pre-trained model and continues learning on task-specific or domain-specific data, allowing efficient adaptation to new problems.

**Example:** Taking a general language model trained on broad internet text and fine-tuning it on medical literature to improve clinical summarization performance.

#### First Principles

A problem-solving approach that breaks complex issues into fundamental, irreducible facts and rebuilds solutions from there rather than relying on assumptions or conventions.

**Example:** Questioning why a business needs an ML model at all, rather than assuming ML is the right approach because it solved similar problems elsewhere.

#### Forecasting

A prediction task that estimates future values of a time-dependent variable based on historical patterns and conditions.

**Example:** Predicting monthly sales revenue for the next quarter based on historical sales trends, seasonality, and external economic indicators.

#### Generation

A machine learning task that creates new data, text, images, or other outputs based on learned patterns, often using generative models or transformers.

**Example:** A language model generating human-like responses to customer service questions.

#### Hammer Bias

A cognitive bias where a person familiar with a particular tool assumes it is the right solution to many different problems, regardless of actual suitability.

**Example:** A data scientist who specializes in neural networks proposing deep learning for every prediction task, even where simpler models would be more effective.

#### Invoice Processing

The application of extraction and classification AI to automatically parse, validate, and categorize invoice documents, reducing manual data entry.

**Example:** An OCR and NLP system that extracts invoice details, matches them to purchase orders, and flags discrepancies for human review.

#### Kill Signal

An observable indicator or metric that rises above a defined threshold, suggesting the current problem frame or solution is no longer viable and should be abandoned.

**Example:** When a model's false positive rate climbs above operational capacity, it becomes a kill signal indicating the current approach cannot safely serve its intended purpose.

#### Leading Indicator

An observable metric or signal that predicts future performance or outcomes, measured earlier in a process than the final outcome itself.

**Example:** Weekly engagement metrics serve as a leading indicator for monthly retention, allowing corrective actions before churn occurs.

#### Lexical Search

A retrieval method that matches documents or records to queries based on exact word matches or phrase overlap, without understanding semantic meaning.

**Example:** A search engine that returns documents containing the exact words from a query, regardless of whether they address the intended meaning.

#### Long Context

A language model's ability to process and maintain coherence across very long input sequences, extending beyond traditional context window limitations.

**Example:** A system that can summarize an entire 100-page document while maintaining consistency because it processes the full context together.

#### Mental Model

An internal representation of how something works, structured as interconnected concepts and causal relationships that guide understanding and problem-solving.

**Example:** An engineer's mental model of customer churn includes: engagement → satisfaction → renewal decision → churn risk.

#### Model Drift

Deterioration in a machine learning model's performance over time due to changes in data distribution, concept relationships, or environmental conditions.

**Example:** A model trained to detect fraud in 2022 shows declining accuracy in 2024 because fraudsters have adopted new tactics.

#### ML Pivot

A decision to pursue a machine learning solution after determining that a simpler approach cannot adequately solve the problem, requiring significant engineering and data investment.

**Example:** After a rules-based system cannot achieve sufficient accuracy for invoice processing, pivoting to an ML-based extraction approach.

#### Monday Morning Checklist

A practical decision-making framework used when returning to a problem to assess whether the original framing remains valid or whether circumstances have changed.

**Example:** Before continuing development on a churn prediction model, verify: Are we still solving the right problem? Has the business context changed? Is the data still valid?

#### Optimization

A machine learning task that finds the best combination of inputs or actions within constraints to maximize or minimize an objective function.

**Example:** Determining the optimal product mix and pricing for maximum profit given manufacturing and demand constraints.

#### Outcome Metric

The quantifiable measure of success that defines what achieving the goal actually means and enables tracking progress toward solving the problem.

**Example:** For a churn reduction project, the outcome metric might be retention rate improvement by 5 percentage points within 6 months.

#### Pattern Bridge

A structured approach to transferring knowledge or applying patterns learned in one context to solve similar problems in a different context, avoiding redundant problem-solving.

**Example:** Recognizing that the pattern used to optimize warehouse logistics applies equally to optimizing data center resource allocation.

#### Persist Decision

A choice to continue with the current problem frame and solution approach based on evidence that progress is being made and the direction remains sound.

**Example:** After testing a classification approach to churn and seeing promising early results, deciding to persist rather than explore alternative methods.

#### Pivot Decision

A choice to fundamentally change the problem frame, solution approach, or resource allocation strategy based on new information that makes the current path unviable.

**Example:** Recognizing that churn is driven by product defects rather than pricing, pivoting from a retention model to a product quality improvement focus.

#### Prediction

A machine learning task that estimates unknown outcomes, future values, or missing information for new data points based on learned patterns.

**Example:** Predicting a patient's likelihood of developing diabetes within 5 years based on health and lifestyle factors.

#### Problem Deconstruction

The process of breaking a complex business problem into smaller, more manageable sub-problems that can be individually diagnosed and solved.

**Example:** Decomposing "reduce customer churn" into: churn detection, churn root cause identification, retention action selection, and retention outcome measurement.

#### Problem Frame

A specific definition of what the business problem actually is, what success means, and what factors are relevant—establishing boundaries on the solution space.

**Example:** "We need to identify high-risk customers 30 days before they churn so we can apply targeted interventions" is a frame that differs from "minimize churn overall."

#### Problem Framing

The practice of clearly defining a business problem, its underlying causes, success criteria, constraints, and assumptions before selecting a solution approach.

**Example:** Before building a recommendation system, framing the problem: Are we optimizing engagement, revenue, or customer lifetime value? Does cold-start matter?

#### Problem Portfolio

A structured inventory of multiple related problems within an organization, prioritized by business impact and solution feasibility to guide strategic focus.

**Example:** A retail company's problem portfolio includes: inventory optimization, demand forecasting, customer churn prediction, and fraud detection.

#### Prompting

A technique of providing specific instructions or examples to a language model to guide it toward desired behavior without requiring training or fine-tuning.

**Example:** Giving a model the instruction "Respond in a professional tone" or providing an example of desired output format shapes its responses.

#### RAG (Retrieval-Augmented Generation)

An approach that combines retrieval of relevant documents or information with generative language models to produce answers grounded in specific sources.

**Example:** A customer service system that retrieves relevant knowledge base articles then uses a language model to generate responses based on that retrieved context.

#### Recommendation System

A machine learning application that predicts user preferences and suggests products, content, or actions most likely to be valuable or interesting to individuals.

**Example:** Netflix's system that recommends movies by learning from viewing patterns, ratings, and similar users' preferences.

#### Reframing

The cognitive act of reconceptualizing a problem by changing perspectives, assumptions, or boundaries to reveal new solution possibilities.

**Example:** Instead of framing high returns as a shipping logistics problem, reframing it as a product design problem (products that arrive damaged cause returns).

#### Regression

A supervised learning task that predicts continuous numerical values based on input variables and historical labeled examples.

**Example:** Predicting house prices from square footage, location, age, and other property characteristics.

#### Retrieval

A machine learning or information retrieval task that finds and returns the most relevant documents, records, or information from a collection based on a query or input.

**Example:** A search engine that ranks and returns the most relevant web pages given a search query.

#### Sanity Check

A quick validation that results make intuitive sense, are in expected ranges, and don't contradict known facts before trusting model outputs.

**Example:** If a churn prediction model assigns 0% churn risk to a customer who explicitly stated they're switching providers, the sanity check catches this nonsensical prediction.

#### Semantic Search

A retrieval method that matches documents to queries based on meaning and conceptual relevance rather than exact word matching.

**Example:** A search for "ways to fix leaky faucets" returns results about plumbing repairs even if documents don't contain the exact words from the query.

#### Signal Recognition

The ability to identify early indicators, patterns, or evidence that current strategy or problem frame is working well or needs to change.

**Example:** Recognizing that model performance improvement has plateaued (a signal to pivot) versus continuing to incrementally optimize.

#### Solution Frame

A specific definition of how the problem will be addressed, including which approach (rule-based, ML, GenAI), success criteria, and resource requirements.

**Example:** "Build a classification model using historical customer behavior to score churn risk weekly, targeting users above 60% risk with personalized retention offers."

#### Solution Space

The full range of technically and practically feasible approaches available to address a particular problem.

**Example:** For demand forecasting, the solution space includes: rule-based methods, statistical forecasting, time series models, deep learning, and human judgment.

#### Stop Decision

A choice to completely abandon the current problem frame and solution direction, determining that continuing would waste resources without delivering value.

**Example:** Deciding to stop work on a complex churn prediction model after diagnosis reveals the actual problem is product quality, not customer retention dynamics.

#### Stranger Test

A decision-making practice of explaining the problem and proposed solution to someone unfamiliar with the context; if they cannot understand, the framing likely lacks clarity.

**Example:** A product manager unable to explain in simple terms why the team built a specific ML model suggests the business justification may be unclear.

#### Structured Search

A retrieval approach that searches across data with defined schemas and field structure, often using exact matching on specific attributes or ranges.

**Example:** Searching a customer database for all users in zip code 90210 with purchase history above $1,000 in the last year.

#### Success Signal

An observable indicator or metric that rises above a defined threshold, demonstrating that the current problem frame and solution approach are delivering value.

**Example:** When retention rate improves by 5% after launching the churn prediction system, it's a success signal to continue and expand the approach.

#### System 2 Thinking

A deliberate, analytical mode of cognition that involves slow, conscious reasoning and evaluation rather than quick intuitive judgments.

**Example:** Instead of intuitively assuming ML will solve a problem (System 1), systematically analyzing whether simpler approaches might be sufficient (System 2).

#### System-Level Reframe

A fundamental shift in how a problem is understood that changes the boundaries, stakeholders, or goals, not just the tactical approach.

**Example:** Reframing customer acquisition from a marketing problem to a product-market fit problem, requiring changes beyond customer targeting tactics.

#### The Loop

A cyclical framework for problem diagnosis and decision-making: define outcomes, identify signals, diagnose problems, decide (persist/pivot/stop), then repeat.

**Example:** The Loop process for churn: set retention target → monitor leading indicators → analyze why targets are missed → decide to improve product or refine targeting → repeat.

#### Trade-offs

Competing priorities or constraints where improving one dimension requires accepting degradation in another, necessitating explicit prioritization.

**Example:** A recommendation system might face trade-offs between personalization (higher engagement) and diversity (broader cultural exposure), requiring intentional optimization choice.

#### Vector Database

A specialized database designed to efficiently store and search high-dimensional numerical vectors (embeddings), enabling semantic similarity queries.

**Example:** A vector database that stores customer embeddings and enables finding "customers most similar to our best customer" without explicit attribute matching.

---

**Total Terms:** 150
**Coverage:** Chapters 1-6 plus integrated concepts
**Format Compliance:** ISO 11179 standards (precise, concise, distinct, non-circular, no business rules)
**Examples Provided:** ~75% of terms
