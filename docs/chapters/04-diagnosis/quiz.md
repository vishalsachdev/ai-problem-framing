# Chapter 4: Diagnosis Quiz

**Difficulty Level:** Intermediate
**Total Questions:** 10
**Estimated Time:** 20-25 minutes

---

## Instructions

Answer each question based on the concepts from Chapter 4: Diagnosis. Questions progress through different cognitive levels (Remember → Understand → Apply → Analyze) to test your comprehension and ability to apply diagnostic techniques in real-world scenarios.

---

## Questions

### 1. **Input vs Output Diagnosis** [Remember]

When diagnosing a machine learning system's failures, what is the primary difference between **Input Diagnosis** and **Output Diagnosis**?

A) Input Diagnosis checks if features are correctly preprocessed; Output Diagnosis evaluates prediction quality
B) Input Diagnosis looks at raw data distribution; Output Diagnosis only examines model weights
C) Input Diagnosis is performed before training; Output Diagnosis is performed after deployment
D) Input Diagnosis detects feature engineering errors; Output Diagnosis detects hardware failures

**Correct Answer:** A

**Explanation:** Input Diagnosis examines whether the data being fed into the model is correct (features, distributions, data quality), while Output Diagnosis evaluates whether the model's predictions are reasonable and of sufficient quality. This distinction is crucial for narrowing down where problems originate.

---

### 2. **Sanity Check Applications** [Remember]

Which of the following is an appropriate use of a **Sanity Check**?

A) Verifying that predicted prices never exceed the maximum historical price in training data
B) Ensuring model accuracy improves with every new batch of data
C) Confirming that feature distributions are perfectly normal
D) Testing that the model architecture matches the research paper exactly

**Correct Answer:** A

**Explanation:** Sanity checks establish basic boundary conditions and expected behavior patterns. Checking that predictions stay within reasonable ranges is a classic sanity check that catches obvious failures before deeper analysis.

---

### 3. **Types of Drift - Definition** [Understand]

Explain the relationship between **Data Drift**, **Model Drift**, and **Concept Drift**. Which statement correctly describes them?

A) Data Drift occurs in features; Concept Drift occurs in the target variable's relationship to features; Model Drift is when the model becomes outdated
B) They are three names for the same phenomenon
C) Data Drift and Model Drift are the same thing; Concept Drift is different
D) Data Drift only affects training; Concept Drift only affects deployment

**Correct Answer:** A

**Explanation:** These three types of drift represent different failure modes: Data Drift (P(X) changes), Concept Drift (P(Y|X) changes), and Model Drift (the model was good but is now outdated relative to new data). Understanding these distinctions helps target solutions appropriately.

---

### 4. **Error Pattern Recognition** [Understand]

You notice your classification model performs well on normal cases but fails consistently on edge cases (extreme values). This error pattern suggests:

A) The model has high bias and needs more complex features
B) There is likely **data distribution mismatch** between training and edge cases
C) The model is overfitting to the training set
D) Input Diagnosis is unnecessary; this is purely an Output Diagnosis problem

**Correct Answer:** B

**Explanation:** Systematic failures on edge cases indicate that the model wasn't exposed to these cases during training (Data Drift or distribution mismatch). This is an Input Diagnosis problem showing that the training distribution doesn't match the production distribution.

---

### 5. **Bias Detection Methods** [Understand]

Which diagnostic approach is most effective for detecting **systemic bias** in a model's predictions across different demographic groups?

A) Comparing overall model accuracy to individual group accuracies
B) Running a single sanity check on the aggregate dataset
C) Analyzing error distributions separately for each protected attribute
D) Checking that the training data is balanced in size

**Correct Answer:** C

**Explanation:** Detecting bias requires analyzing error patterns within each group separately. Aggregate metrics can hide group-specific problems. This allows you to see if certain groups experience systematically higher errors.

---

### 6. **Diagnosis Scenario - Model Performance Drop** [Apply]

Your fraud detection model was deployed 6 months ago with 95% accuracy. Today it shows 78% accuracy on the same test set. Which type of drift is MOST likely, and what's your first diagnostic step?

A) Concept Drift is most likely; retraining the model immediately is the first step
B) Data Drift is most likely; compare the feature distributions of recent data to training data
C) Model Drift; the model weights have corrupted and need to be reset
D) This is a hardware failure; check server logs first

**Correct Answer:** B

**Explanation:** A dramatic accuracy drop over time with changing real-world data suggests Data Drift. The first diagnostic step is Input Diagnosis: check if feature distributions have shifted. This guides whether retraining, feature engineering changes, or data cleaning is needed.

---

### 7. **Error Analysis in Production** [Apply]

You're analyzing error logs from your recommendation system and notice that 85% of errors occur in a specific user segment (new users with sparse interaction history). What's the most appropriate diagnostic approach?

A) Blame the feature engineering team for not creating interaction-based features
B) Perform an Error Analysis on this segment and check if the training data included this distribution
C) Immediately apply output post-processing rules to hide errors from this segment
D) Assume this is inevitable and accept the high error rate

**Correct Answer:** B

**Explanation:** Segment-specific error patterns are a key diagnostic signal. You should investigate whether the training data included new users with sparse data and whether your features are appropriate for this distribution. This is Input Diagnosis focused on identifying data distribution issues.

---

### 8. **Concept Drift Detection** [Apply]

Your loan default prediction model has stable feature distributions and model weights haven't changed, yet prediction accuracy is declining. Which scenario best explains this?

A) This is impossible—if features and model are stable, performance must be stable
B) This indicates Concept Drift: the relationship between features and target (likelihood of default) has changed
C) The test set is corrupted
D) This indicates Model Drift but not Concept Drift

**Correct Answer:** B

**Explanation:** If features haven't changed but the relationship between features and the target has shifted (e.g., economic conditions affecting default likelihood), this is Concept Drift: P(Y|X) changed while P(X) stayed stable. This requires different solutions than Data Drift.

---

### 9. **Integrated Diagnosis - Multiple Drift Types** [Analyze]

You're diagnosing a computer vision model for product quality inspection. You observe:
- Feature distributions have shifted from historical data (edge colors changed due to lighting upgrades)
- The model's decision boundary is no longer optimal for the new distributions
- The underlying product quality requirements have become stricter (fewer defects acceptable)

Which types of drift are present, and what is the correct diagnostic priority?

A) Only Data Drift; retrain immediately
B) Data Drift, Concept Drift, and potentially Model Drift; diagnose Input (features) first, then Output (prediction patterns)
C) Only Concept Drift; no retraining needed
D) Model Drift exclusively; check hardware and model serving infrastructure

**Correct Answer:** B

**Explanation:** This scenario involves multiple drift types occurring simultaneously. Input Diagnosis (Data Drift from lighting changes) should be priority one. Then analyze Output Diagnosis for Concept Drift (stricter quality standards change P(Y|X)). Model Drift may also be at play. A layered diagnostic approach handles this complexity.

---

### 10. **Sanity Check Design** [Analyze]

You're building sanity checks for a stock price prediction model. Which of the following represents an effective, practical sanity check for detecting issues early?

A) Verify that predicted prices stay within the historical price range of each stock, and alert if ±20% threshold is exceeded
B) Ensure that every prediction is more accurate than a naive baseline
C) Check that predicted volatility never decreases from one day to the next
D) Confirm that R² score on test data is above 0.95

**Correct Answer:** A

**Explanation:** Effective sanity checks should (1) be computationally cheap, (2) catch obvious failures, and (3) be actionable. Option A creates a practical boundary check that's fast to compute and provides early warning of distribution shift or model failure. Options B, C, and D are either too expensive or too permissive as sanity checks.

---

## Answer Key & Scoring

| Question | Answer | Bloom's Level | Topic |
|----------|--------|---------------|-------|
| 1 | A | Remember | Input vs Output Diagnosis |
| 2 | A | Remember | Sanity Checks |
| 3 | A | Understand | Types of Drift |
| 4 | B | Understand | Data Distribution & Error Patterns |
| 5 | C | Understand | Bias Detection |
| 6 | B | Apply | Diagnosis Scenario (Model Performance) |
| 7 | B | Apply | Error Analysis |
| 8 | B | Apply | Concept Drift |
| 9 | B | Analyze | Integrated Multi-Drift Diagnosis |
| 10 | A | Analyze | Sanity Check Design |

**Scoring:**
- **9-10 correct:** Mastery (90-100%)
- **8 correct:** Proficient (80%)
- **6-7 correct:** Developing (60-70%)
- **Below 6:** Review Chapter 4 material

---

## Discussion Prompts

Use these questions for classroom discussion or deeper reflection:

1. **Input vs Output Tradeoff:** In practice, why might it be easier to fix Input Diagnosis problems than Output Diagnosis problems?

2. **Drift in Your Domain:** Think of an ML system in your field of work. How might Data Drift, Concept Drift, or Model Drift manifest?

3. **Sanity Check Effectiveness:** What are three sanity checks you would design for a healthcare prediction model? What properties make them effective?

4. **Bias and Fairness:** How does understanding drift help in detecting and addressing bias? Can a model be biased without drift?

---

## Key Concepts Review

Before taking this quiz, ensure you understand:

- **Input Diagnosis:** Examines feature quality, distributions, and data integrity
- **Output Diagnosis:** Evaluates prediction quality, error patterns, and model behavior
- **Data Drift:** P(X) changes—feature distributions shift over time
- **Concept Drift:** P(Y|X) changes—relationship between features and target shifts
- **Model Drift:** Model becomes outdated relative to current performance requirements
- **Sanity Checks:** Fast, cheap checks to catch obvious failures before deeper analysis
- **Error Analysis:** Breaking down errors by segment, pattern, or feature to understand root causes
- **Bias Detection:** Analyzing performance metrics separately for protected attributes and subgroups
