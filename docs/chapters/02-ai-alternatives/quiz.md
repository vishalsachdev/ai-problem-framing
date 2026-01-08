# Chapter 2 Quiz: AI Solution Alternatives

Test your understanding of AI approach archetypes and when to apply each solution.

---

#### 1. Which AI approach is most appropriate when you need to predict continuous numerical values like house prices or stock prices?

<div class="upper-alpha" markdown>
1. Classification
2. Regression
3. Clustering
4. Anomaly Detection
</div>

??? question "Show Answer"
    The correct answer is **B**.

    Regression is specifically designed for predicting continuous numerical values. Classification predicts discrete categories, clustering groups similar items without labels, and anomaly detection identifies outliers—none of which address the need for continuous numerical predictions.

    **Concept:** Regression fundamentals

---

#### 2. What is the primary difference between Forecasting and standard Regression?

<div class="upper-alpha" markdown>
1. Forecasting uses more data points than regression
2. Forecasting specifically handles time-series data with temporal dependencies
3. Regression only works with structured data while forecasting works with unstructured data
4. Forecasting is less accurate than regression for all prediction tasks
</div>

??? question "Show Answer"
    The correct answer is **B**.

    Forecasting is a specialized form of regression that explicitly models temporal dependencies and patterns over time (seasonality, trends, autocorrelation). Standard regression assumes independent observations, while forecasting respects the sequential nature of time-series data.

    **Concept:** Forecasting vs Regression distinctions

---

#### 3. When would you choose Classification over Clustering for a customer dataset?

<div class="upper-alpha" markdown>
1. When you have labeled examples showing desired customer segments
2. When you want to discover new, unknown customer groupings
3. When you need to reduce computational complexity
4. When working with very large datasets that clustering cannot handle
</div>

??? question "Show Answer"
    The correct answer is **A**.

    Classification requires labeled training data and learns to assign new examples to predefined categories. Clustering is unsupervised and discovers patterns without labels. Choose classification when you have known categories you want to predict; choose clustering when you want to discover unknown groupings in your data.

    **Concept:** Classification vs Clustering use cases

---

#### 4. A company detects unusual patterns in credit card transactions that don't match historical behavior. Which approach best solves this?

<div class="upper-alpha" markdown>
1. Classification
2. Regression
3. Anomaly Detection
4. Recommendation
</div>

??? question "Show Answer"
    The correct answer is **C**.

    Anomaly Detection identifies outliers and unusual patterns that deviate significantly from normal behavior. This is ideal for fraud detection, system monitoring, and identifying unusual patterns without needing explicit labels for "fraud" vs "normal."

    **Concept:** Anomaly Detection applications

---

#### 5. What is the key trade-off between using Fine-Tuning versus Prompting for customizing a language model?

<div class="upper-alpha" markdown>
1. Fine-tuning is faster but prompting is more accurate
2. Fine-tuning requires labeled data and computational resources but enables deeper customization; prompting requires no training but may underperform on specialized tasks
3. Prompting works only for simple tasks while fine-tuning works for all tasks
4. Fine-tuning and prompting have identical performance—choose based only on cost
</div>

??? question "Show Answer"
    The correct answer is **B**.

    Fine-tuning adapts model weights through training on labeled examples, requiring more data and compute but enabling deep customization for specialized tasks. Prompting leverages the pre-trained model through instruction engineering, requiring no training but potentially hitting performance limits on domain-specific challenges. The choice depends on your performance requirements, data availability, and computational budget.

    **Concept:** Fine-Tuning vs Prompting trade-offs

---

#### 6. You have an e-commerce platform and want to suggest products to users. Your product catalog is massive (500,000+ items) and grows constantly. Which approach is better suited: Recommendation systems or RAG?

<div class="upper-alpha" markdown>
1. RAG, because it can search the entire catalog dynamically
2. Recommendation systems, because they're optimized for discovering relevant items from large catalogs using collaborative or content-based filtering
3. Both equally—they solve the same problem
4. Neither—this requires a custom machine learning solution
</div>

??? question "Show Answer"
    The correct answer is **B**.

    Recommendation systems are purpose-built for suggesting items from large catalogs, using collaborative filtering (user-item interactions), content-based filtering (item features), or hybrid approaches. RAG is better suited for retrieving specific information from documents. Recommendations excel at personalized discovery and can scale efficiently even with massive item counts.

    **Concept:** Recommendation systems vs RAG

---

#### 7. Your application needs to retrieve relevant documents from a 10,000-page knowledge base to answer user questions. Compare RAG and Long Context approaches. Which statement best describes the trade-off?

<div class="upper-alpha" markdown>
1. RAG is faster and cheaper because it retrieves only relevant documents; Long Context processes everything but guarantees no information is missed
2. Long Context is always superior because it has access to more information
3. RAG requires external databases while Long Context only needs the LLM
4. They produce identical results—cost and speed are the only differences
</div>

??? question "Show Answer"
    The correct answer is **A**.

    RAG (Retrieval-Augmented Generation) retrieves a focused subset of relevant documents via semantic search, reducing context window usage and costs while maintaining quality. Long Context models can ingest entire knowledge bases but consume more tokens, increase latency, and cost more. RAG is generally more efficient and practical for large knowledge bases unless you need to preserve nuanced information across the entire collection.

    **Concept:** RAG vs Long Context trade-offs

---

#### 8. You're building an autonomous AI system that must make decisions, execute actions, interact with external tools, and adapt based on outcomes. Which AI approach best enables this capability?

<div class="upper-alpha" markdown>
1. Semantic Search
2. Autonomous Agents
3. Fine-Tuning
4. Anomaly Detection
</div>

??? question "Show Answer"
    The correct answer is **B**.

    Autonomous Agents combine language models with planning, tool use, memory, and feedback loops to make independent decisions and take actions. They can reason about complex tasks, interact with APIs and databases, and adapt based on results. The other approaches address specific subproblems (search, training, outlier detection) but don't enable full autonomous decision-making.

    **Concept:** Autonomous Agents architecture

---

#### 9. Your data science team is trying to understand which customer segments exist in your user base to improve targeting. The team has no pre-defined segment labels. Why would Clustering be more appropriate than Classification for this initial exploration?

<div class="upper-alpha" markdown>
1. Clustering is always more accurate than classification
2. Clustering discovers unknown patterns without requiring labeled examples, allowing you to find naturally occurring segments; Classification requires you to already know what segments you're looking for
3. Classification cannot work with customer data
4. Clustering is faster because it uses less computational power
</div>

??? question "Show Answer"
    The correct answer is **B**.

    Clustering is unsupervised learning—it discovers patterns and groupings in data without predefined labels. Classification is supervised learning—it requires labeled examples showing desired categories. For exploratory analysis where you don't know segment boundaries in advance, clustering reveals natural groupings. After discovering segments through clustering, you could then build a classifier to assign future customers to those discovered segments.

    **Concept:** Unsupervised discovery with Clustering

---

#### 10. A financial services company uses a combination of Semantic Search and Autonomous Agents. Explain why this combination works well for customer support: which role does each play?

<div class="upper-alpha" markdown>
1. Semantic Search retrieves relevant policy documents; Autonomous Agents decide which documents to retrieve and generate personalized responses while managing conversation flow
2. Semantic Search generates responses while Autonomous Agents retrieve documents
3. They serve identical functions—using both is redundant
4. Semantic Search handles complex reasoning while Autonomous Agents only do keyword matching
</div>

??? question "Show Answer"
    The correct answer is **A**.

    Semantic Search enables efficient retrieval of relevant policy documents, FAQs, and knowledge base entries by understanding meaning rather than just keywords. Autonomous Agents orchestrate the interaction by deciding what information to retrieve, when to escalate, how to personalize responses, and managing multi-turn conversations. Together, they create a system where the agent reasons about what's needed, retrieves appropriate context, and generates informed responses—more powerful than either approach alone.

    **Concept:** Combining semantic search with autonomous agents

---

## Quiz Metadata

| Metric | Value |
|--------|-------|
| Total Questions | 10 |
| Difficulty Level | Intermediate |
| Bloom's Distribution | Remember: 20%, Understand: 30%, Apply: 30%, Analyze: 20% |
| Answer Distribution | A: 25%, B: 25%, C: 25%, D: 25% |
| Estimated Time | 15-20 minutes |
| Key Concepts Covered | Forecasting, Regression, Classification, Clustering, Anomaly Detection, Recommendation, RAG, Long Context, Fine-Tuning, Prompting, Semantic Search, Autonomous Agents |
