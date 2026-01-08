# Chapter 4: Diagnosis - Reading Signals

## Learning Objectives

By the end of this chapter, you will be able to:

1. Diagnose AI system issues through systematic input and output analysis
2. Perform error analysis on model predictions to identify failure patterns
3. Design and execute sanity checks for AI systems
4. Detect model drift, data drift, and concept drift in production systems

## Introduction

In March 2016, a major financial institution's credit risk model suddenly started rejecting 40% more loan applications than usual. The data science team spent three days analyzing model weights, checking for bugs in the inference code, and retraining on recent data. Nothing worked. Finally, a junior analyst discovered the issue: a vendor had changed the format of income data from annual to monthly values without notification. The model was seeing everyone's income as 1/12th of reality.

This story illustrates a fundamental truth about AI systems: **they fail silently and subtly**. Unlike traditional software that crashes with error messages, AI systems continue producing outputs even when something is deeply wrong. They don't know they're confused.

Diagnosis is the art of reading signals—recognizing when something is wrong, isolating where the problem lives, and understanding why it happened. This chapter teaches you systematic approaches to diagnosing AI system failures, from quick sanity checks to deep error analysis.

Think of yourself as a medical diagnostician. You don't jump straight to treatment. You observe symptoms, run tests, form hypotheses, and narrow possibilities until you understand the root cause. AI diagnosis follows the same pattern.

## Section 1: Input Diagnosis

Most AI failures start with the data. Before you question the model, question what the model sees.

### Key Idea: The Input Hypothesis

When an AI system misbehaves, start with this hypothesis: **"The inputs have changed in ways the model wasn't trained to handle."**

Input diagnosis examines three dimensions:

**1. Data Distribution Shifts**

Models learn patterns from training data. When production data looks different, performance degrades. Common shifts include:

- **Covariate shift**: Input features change but relationships remain (e.g., camera quality improves, making images sharper)
- **Prior shift**: Class frequencies change (e.g., fraud rates spike during holidays)
- **Sample selection bias**: You're seeing a non-representative subset (e.g., model trained on US data, deployed globally)

**Diagnostic approach:**

```python
# Compare training vs production distributions
import pandas as pd
import matplotlib.pyplot as plt
from scipy import stats

def diagnose_distribution_shift(train_data, prod_data, feature):
    """
    Compare distributions using visualization and statistical tests.
    """
    # Visual comparison
    plt.figure(figsize=(12, 4))

    plt.subplot(1, 2, 1)
    plt.hist(train_data[feature], alpha=0.5, label='Training', bins=50)
    plt.hist(prod_data[feature], alpha=0.5, label='Production', bins=50)
    plt.legend()
    plt.title(f'{feature} Distribution Comparison')

    plt.subplot(1, 2, 2)
    plt.boxplot([train_data[feature], prod_data[feature]],
                labels=['Training', 'Production'])
    plt.title(f'{feature} Box Plot')

    plt.tight_layout()
    plt.show()

    # Statistical test for distribution equality
    statistic, pvalue = stats.ks_2samp(train_data[feature],
                                        prod_data[feature])

    print(f"Kolmogorov-Smirnov test for {feature}:")
    print(f"  Statistic: {statistic:.4f}")
    print(f"  P-value: {pvalue:.4f}")

    if pvalue < 0.05:
        print(f"  ⚠️  Significant distribution shift detected!")
    else:
        print(f"  ✓ Distributions are similar")

    return statistic, pvalue

# Run for all features
for feature in numerical_features:
    diagnose_distribution_shift(train_df, production_df, feature)
```

**2. Data Quality Issues**

Even with stable distributions, quality problems corrupt inputs:

- **Missing values**: NULL, empty strings, sentinel values (-999, 0)
- **Invalid values**: Out-of-range numbers, malformed text, corrupted files
- **Encoding errors**: Wrong character sets, timezone issues, unit mismatches
- **Upstream failures**: API timeouts, database corruptions, ETL bugs

**Diagnostic checklist:**

```python
def data_quality_report(df):
    """
    Generate comprehensive data quality diagnostics.
    """
    print("=" * 60)
    print("DATA QUALITY DIAGNOSTIC REPORT")
    print("=" * 60)

    # 1. Missing values
    print("\n1. MISSING VALUES:")
    missing = df.isnull().sum()
    missing_pct = 100 * missing / len(df)
    missing_df = pd.DataFrame({
        'Count': missing,
        'Percentage': missing_pct
    })
    print(missing_df[missing_df['Count'] > 0].sort_values('Count',
                                                           ascending=False))

    # 2. Data types
    print("\n2. DATA TYPES:")
    print(df.dtypes.value_counts())

    # 3. Cardinality
    print("\n3. CARDINALITY (unique values):")
    for col in df.columns:
        unique_count = df[col].nunique()
        unique_pct = 100 * unique_count / len(df)
        print(f"  {col}: {unique_count} ({unique_pct:.1f}%)")

    # 4. Value ranges
    print("\n4. NUMERIC RANGES:")
    print(df.describe())

    # 5. Suspicious values
    print("\n5. SUSPICIOUS PATTERNS:")
    for col in df.select_dtypes(include=['number']).columns:
        # Check for sentinel values
        if (df[col] == -999).any():
            print(f"  ⚠️  {col}: Contains -999 (possible sentinel)")
        if (df[col] == 0).mean() > 0.5:
            print(f"  ⚠️  {col}: >50% zeros")

        # Check for outliers (IQR method)
        Q1 = df[col].quantile(0.25)
        Q3 = df[col].quantile(0.75)
        IQR = Q3 - Q1
        outliers = ((df[col] < (Q1 - 3 * IQR)) |
                    (df[col] > (Q3 + 3 * IQR))).sum()
        if outliers > 0:
            print(f"  ⚠️  {col}: {outliers} extreme outliers")

    return missing_df

# Run diagnostics
quality_report = data_quality_report(production_df)
```

**3. Feature Engineering Bugs**

Derived features are fragile. A timezone change, a library update, or a dependency version bump can break feature computation silently.

**Diagnostic strategy:**

- **Recompute features**: Run feature engineering on sample data and compare to stored features
- **Check feature correlations**: Features that were correlated in training should remain correlated
- **Monitor feature statistics**: Track mean, std, min, max for each feature over time

### Example: The Case of the Disappearing Weekend

A ride-sharing company's demand forecasting model started underpredicting Sunday rides by 30%. The data science team investigated:

```python
# Check temporal features
production_df['day_of_week'] = pd.to_datetime(production_df['timestamp']).dt.dayofweek

# Compare to training data
train_dow_dist = train_df['day_of_week'].value_counts(normalize=True)
prod_dow_dist = production_df['day_of_week'].value_counts(normalize=True)

print("Day of week distribution:")
print(pd.DataFrame({
    'Training': train_dow_dist,
    'Production': prod_dow_dist
}))

# Output:
#     Training  Production
# 0   0.142     0.143      # Monday
# 1   0.143     0.143      # Tuesday
# 2   0.143     0.143      # Wednesday
# 3   0.143     0.143      # Thursday
# 4   0.144     0.144      # Friday
# 5   0.143     0.141      # Saturday
# 6   0.142     0.000      # Sunday ⚠️
```

The culprit? A database migration changed the timestamp column from local time to UTC. Sunday rides in California (UTC-8) were being labeled as Monday in the new system. The model never saw "Sunday" data in production.

### Try It

**Exercise: Input Diagnosis Lab**

You're given two datasets: `train.csv` (historical data) and `current.csv` (last week's production data). A previously 85%-accurate sentiment classifier is now at 72% accuracy.

1. Load both datasets and compare feature distributions
2. Generate a data quality report for production data
3. Identify at least three input-related issues that could explain the performance drop
4. For each issue, propose a specific diagnostic test

```python
# Starter code
import pandas as pd
import numpy as np

train_df = pd.read_csv('train.csv')
current_df = pd.read_csv('current.csv')

# Your diagnosis here
# Hint: Check text length, character distributions,
# language detection, encoding issues
```

**Reflection**: Before reading the next section, write down: What percentage of AI failures do you think originate from input issues vs. model issues? Why?

## Section 2: Output Diagnosis

Once you've ruled out (or fixed) input issues, examine what the model produces.

### Key Idea: Error Patterns Reveal Root Causes

Errors aren't random. They cluster around failure modes—systematic weaknesses in how the model understands the problem. Output diagnosis reveals these patterns.

**1. Confusion Analysis**

For classification tasks, the confusion matrix is your first diagnostic tool:

```python
from sklearn.metrics import confusion_matrix, classification_report
import seaborn as sns

def diagnose_classification_errors(y_true, y_pred, class_names):
    """
    Comprehensive classification diagnostics.
    """
    # Confusion matrix
    cm = confusion_matrix(y_true, y_pred)

    plt.figure(figsize=(10, 8))
    sns.heatmap(cm, annot=True, fmt='d', cmap='Blues',
                xticklabels=class_names,
                yticklabels=class_names)
    plt.ylabel('True Label')
    plt.xlabel('Predicted Label')
    plt.title('Confusion Matrix')
    plt.show()

    # Classification report
    print("\nDetailed Metrics by Class:")
    print(classification_report(y_true, y_pred,
                                target_names=class_names))

    # Identify most confused pairs
    cm_normalized = cm.astype('float') / cm.sum(axis=1)[:, np.newaxis]
    np.fill_diagonal(cm_normalized, 0)  # Ignore correct predictions

    confused_pairs = []
    for i in range(len(class_names)):
        for j in range(len(class_names)):
            if cm_normalized[i, j] > 0.1:  # >10% confusion rate
                confused_pairs.append({
                    'True': class_names[i],
                    'Predicted': class_names[j],
                    'Error_Rate': cm_normalized[i, j],
                    'Count': cm[i, j]
                })

    if confused_pairs:
        print("\n⚠️  SYSTEMATIC CONFUSIONS (>10% error rate):")
        confused_df = pd.DataFrame(confused_pairs).sort_values(
            'Error_Rate', ascending=False)
        print(confused_df)

    return cm, confused_pairs

# Run diagnostics
cm, confused_pairs = diagnose_classification_errors(
    y_true=test_labels,
    y_pred=predictions,
    class_names=['cat', 'dog', 'bird', 'fish']
)
```

**What to look for:**

- **Asymmetric confusion**: Model confuses A→B more than B→A (suggests class imbalance or feature bias)
- **Cluster confusion**: Model confuses several similar classes (suggests insufficient discriminative features)
- **Systematic misclassification**: One class predicts as another >20% of time (suggests labeling error or concept overlap)

**2. Regression Error Patterns**

For continuous predictions, examine residuals (true - predicted):

```python
def diagnose_regression_errors(y_true, y_pred, features_df=None):
    """
    Regression error diagnostics.
    """
    residuals = y_true - y_pred

    fig, axes = plt.subplots(2, 2, figsize=(14, 10))

    # 1. Residual plot
    axes[0, 0].scatter(y_pred, residuals, alpha=0.5)
    axes[0, 0].axhline(y=0, color='r', linestyle='--')
    axes[0, 0].set_xlabel('Predicted Value')
    axes[0, 0].set_ylabel('Residual')
    axes[0, 0].set_title('Residual Plot')

    # 2. Residual distribution
    axes[0, 1].hist(residuals, bins=50)
    axes[0, 1].set_xlabel('Residual')
    axes[0, 1].set_ylabel('Frequency')
    axes[0, 1].set_title('Residual Distribution')

    # 3. Q-Q plot (normality check)
    from scipy import stats
    stats.probplot(residuals, dist="norm", plot=axes[1, 0])
    axes[1, 0].set_title('Q-Q Plot')

    # 4. Actual vs Predicted
    axes[1, 1].scatter(y_true, y_pred, alpha=0.5)
    axes[1, 1].plot([y_true.min(), y_true.max()],
                    [y_true.min(), y_true.max()],
                    'r--', linewidth=2)
    axes[1, 1].set_xlabel('True Value')
    axes[1, 1].set_ylabel('Predicted Value')
    axes[1, 1].set_title('Actual vs Predicted')

    plt.tight_layout()
    plt.show()

    # Statistical tests
    print("ERROR DIAGNOSTICS:")
    print(f"  Mean Absolute Error: {np.abs(residuals).mean():.3f}")
    print(f"  Root Mean Squared Error: {np.sqrt((residuals**2).mean()):.3f}")
    print(f"  Mean Residual (bias): {residuals.mean():.3f}")
    print(f"  Std Residual: {residuals.std():.3f}")

    # Check for heteroscedasticity (non-constant variance)
    # Split predictions into quartiles
    quartiles = pd.qcut(y_pred, q=4, labels=['Q1', 'Q2', 'Q3', 'Q4'])
    variance_by_quartile = [residuals[quartiles == q].var()
                            for q in ['Q1', 'Q2', 'Q3', 'Q4']]

    if max(variance_by_quartile) > 2 * min(variance_by_quartile):
        print("\n  ⚠️  HETEROSCEDASTICITY DETECTED:")
        print("     Error variance changes with prediction magnitude")
        for i, var in enumerate(variance_by_quartile):
            print(f"     Q{i+1} variance: {var:.3f}")

    # Identify worst predictions
    abs_errors = np.abs(residuals)
    worst_idx = np.argsort(abs_errors)[-10:]

    print("\n  WORST 10 PREDICTIONS:")
    worst_df = pd.DataFrame({
        'True': y_true.iloc[worst_idx] if hasattr(y_true, 'iloc') else y_true[worst_idx],
        'Predicted': y_pred[worst_idx],
        'Error': residuals.iloc[worst_idx] if hasattr(residuals, 'iloc') else residuals[worst_idx]
    })
    print(worst_df)

    return residuals

# Run diagnostics
residuals = diagnose_regression_errors(y_test, predictions)
```

**What to look for:**

- **Systematic bias**: Mean residual ≠ 0 (model consistently over/under-predicts)
- **Heteroscedasticity**: Variance changes with prediction magnitude (model uncertainty not calibrated)
- **Nonlinear patterns**: Residuals show curves (model missing nonlinear relationships)
- **Outliers**: Extreme errors indicate edge cases

**3. Failure Mode Analysis**

Beyond aggregate metrics, identify specific failure modes:

```python
def identify_failure_modes(df, predictions, errors, threshold=0.9):
    """
    Find slices of data where model systematically fails.
    """
    df = df.copy()
    df['prediction'] = predictions
    df['error'] = errors
    df['is_error'] = (errors > threshold)

    print("FAILURE MODE ANALYSIS:")
    print(f"Overall error rate: {df['is_error'].mean():.1%}\n")

    failure_modes = []

    # Analyze categorical features
    for col in df.select_dtypes(include=['object', 'category']).columns:
        error_by_category = df.groupby(col)['is_error'].agg(['mean', 'count'])
        error_by_category = error_by_category[error_by_category['count'] > 10]

        # Find categories with >2x average error rate
        avg_error = df['is_error'].mean()
        problematic = error_by_category[error_by_category['mean'] > 2 * avg_error]

        if len(problematic) > 0:
            print(f"⚠️  Feature: {col}")
            print(problematic.sort_values('mean', ascending=False))
            print()

            for category in problematic.index:
                failure_modes.append({
                    'Feature': col,
                    'Value': category,
                    'Error_Rate': problematic.loc[category, 'mean'],
                    'Count': problematic.loc[category, 'count']
                })

    # Analyze numerical features (binned)
    for col in df.select_dtypes(include=['number']).columns:
        if col in ['prediction', 'error', 'is_error']:
            continue

        df[f'{col}_bin'] = pd.qcut(df[col], q=5, duplicates='drop',
                                     labels=False)
        error_by_bin = df.groupby(f'{col}_bin')['is_error'].agg(['mean', 'count'])

        # Find bins with >2x average error rate
        problematic_bins = error_by_bin[error_by_bin['mean'] > 2 * avg_error]

        if len(problematic_bins) > 0:
            print(f"⚠️  Feature: {col} (binned)")
            print(problematic_bins.sort_values('mean', ascending=False))
            print()

    return pd.DataFrame(failure_modes)

# Example usage
failure_modes = identify_failure_modes(
    df=test_df,
    predictions=predictions,
    errors=abs_errors,
    threshold=10.0  # Define what constitutes an "error"
)
```

### Example: The Medical Imaging Blind Spot

A chest X-ray classifier achieved 94% accuracy in testing but 78% in production. Output diagnosis revealed:

- **Confusion analysis**: Model confused pneumonia with normal 15% of time (asymmetric—normal→pneumonia was only 2%)
- **Failure mode analysis**: Error rate was 35% for patients >70 years old, vs 8% for patients <70
- **Error inspection**: Manual review of failures showed older patients often had subtle, atypical presentations

**Root cause**: Training data oversampled clear, textbook cases of pneumonia (mostly younger patients). Model learned the "obvious" pattern but missed subtle variations.

**Fix**: Rebalance training data by age group, augment with harder cases, add age as an explicit feature.

### Try It

**Exercise: Output Pattern Analysis**

You have predictions from a loan approval model:

- `loan_predictions.csv`: customer_id, true_label (approved/denied), predicted_label, confidence_score, age, income, credit_score, loan_amount

Tasks:

1. Create a confusion matrix and identify asymmetric confusions
2. Plot residuals if you convert to a regression problem (confidence score)
3. Run failure mode analysis to find demographic slices with high error rates
4. Write a 3-sentence summary: "The model struggles most with ___. This happens because ___. To fix it, we should ___."

## Section 3: Error Analysis Framework

Diagnosis isn't just finding errors—it's understanding them systematically.

### Key Idea: Categorize, Quantify, Prioritize

The error analysis framework:

**Step 1: Sample Errors**

Don't analyze all errors—sample strategically:

- **Random sample**: Representative baseline
- **High-confidence errors**: Model was confident but wrong (worst failures)
- **Low-confidence errors**: Model was uncertain (might be ambiguous)
- **Boundary cases**: Predictions near decision threshold
- **Stratified sample**: Ensure all failure modes represented

```python
def sample_errors_strategically(df, predictions, true_labels,
                                 confidence_scores, n_samples=100):
    """
    Sample errors for manual analysis.
    """
    df = df.copy()
    df['prediction'] = predictions
    df['true_label'] = true_labels
    df['confidence'] = confidence_scores
    df['is_error'] = (predictions != true_labels)

    errors = df[df['is_error']]

    # Sample breakdown
    samples = []

    # 30 random errors
    samples.append(errors.sample(min(30, len(errors))))

    # 30 high-confidence errors (model was sure but wrong)
    high_conf_errors = errors.nlargest(min(30, len(errors)), 'confidence')
    samples.append(high_conf_errors)

    # 20 low-confidence errors (model was uncertain)
    low_conf_errors = errors.nsmallest(min(20, len(errors)), 'confidence')
    samples.append(low_conf_errors)

    # 20 boundary cases (confidence near 0.5 for binary)
    boundary = errors.iloc[(errors['confidence'] - 0.5).abs().argsort()[:20]]
    samples.append(boundary)

    # Combine and deduplicate
    error_sample = pd.concat(samples).drop_duplicates()

    return error_sample.head(n_samples)
```

**Step 2: Categorize Errors**

For each sampled error, manually label the failure type:

**Common error categories:**

- **Annotation error**: Label was wrong, model was right
- **Ambiguous case**: No clear correct answer
- **Missing feature**: Model lacked necessary information
- **Edge case**: Rare scenario not well-represented in training
- **Model limitation**: Model architecture can't capture the pattern
- **Distributional shift**: Test example differs from training distribution

```python
# Create annotation template
error_sample['error_category'] = ''
error_sample['notes'] = ''

# Export for manual labeling
error_sample.to_csv('errors_to_annotate.csv', index=False)

# After manual labeling, analyze
annotated = pd.read_csv('errors_annotated.csv')

print("ERROR BREAKDOWN:")
print(annotated['error_category'].value_counts(normalize=True))
```

**Step 3: Quantify Impact**

Not all errors matter equally. Estimate fix impact:

```python
def quantify_error_impact(annotated_errors, total_errors):
    """
    Estimate impact of fixing each error category.
    """
    category_counts = annotated_errors['error_category'].value_counts()

    # Extrapolate to all errors (assuming sample is representative)
    sample_size = len(annotated_errors)

    impact = []
    for category, count in category_counts.items():
        # Estimated proportion of all errors
        proportion = count / sample_size
        estimated_total = proportion * total_errors

        impact.append({
            'Category': category,
            'Sample_Count': count,
            'Estimated_Total': int(estimated_total),
            'Potential_Improvement': f"{proportion:.1%}"
        })

    impact_df = pd.DataFrame(impact).sort_values('Estimated_Total',
                                                  ascending=False)
    print("ESTIMATED ERROR IMPACT:")
    print(impact_df)

    return impact_df
```

**Step 4: Prioritize Fixes**

Prioritize by:

1. **Impact**: How many errors would this fix?
2. **Feasibility**: How hard is it to fix?
3. **Risk**: What could go wrong if we change this?

| Error Category | Impact | Feasibility | Priority |
|----------------|--------|-------------|----------|
| Missing feature | High | Medium | **High** |
| Annotation error | Medium | Easy | **High** |
| Edge case | Low | Hard | Low |
| Ambiguous | Medium | Hard | Medium |

### Example: Customer Churn Error Analysis

A telecom company analyzed 200 churn prediction errors:

**Error breakdown:**

- 35% annotation errors (customers marked as "churned" but actually on vacation)
- 25% missing feature (model didn't know about customer service calls in last month)
- 20% edge cases (customers who moved to areas without service)
- 15% distributional shift (new promotion changed behavior)
- 5% ambiguous (customers who paused service temporarily)

**Impact analysis:**

- Fixing annotation errors: Easy, +7% accuracy
- Adding service call feature: Medium effort, +5% accuracy
- Handling edge cases: Hard, +4% accuracy (but only 2% of customer base)

**Decision**: Fix annotations first (quick win), add feature second, defer edge cases.

### Try It

**Exercise: Run Your Own Error Analysis**

Pick any classifier you've built (or use a provided dataset). Perform error analysis:

1. Sample 50-100 errors strategically
2. Manually categorize each error (use the categories above or define your own)
3. Quantify the impact of each category
4. Write a prioritized action plan with estimated accuracy improvements

**Template:**

```
ERROR ANALYSIS REPORT
=====================

Total errors: ___
Sample size: ___

Error Breakdown:
- Category 1: ___% (estimated ___ total errors)
- Category 2: ___% (estimated ___ total errors)
- ...

Prioritized Actions:
1. [Action] - Expected impact: ___%, Effort: [Low/Med/High]
2. [Action] - Expected impact: ___%, Effort: [Low/Med/High]
3. ...
```

## Section 4: Sanity Checks

Before deep diagnosis, run quick tests to catch obvious issues.

### Key Idea: Fail Fast, Debug Faster

Sanity checks are simple tests that should always pass. When they fail, something is fundamentally broken.

**The Sanity Check Hierarchy:**

**Level 1: Data Sanity**

```python
def data_sanity_checks(df):
    """
    Basic data sanity tests.
    """
    checks = []

    # Check 1: Non-empty
    assert len(df) > 0, "Empty dataset"
    checks.append(f"✓ Dataset non-empty: {len(df)} rows")

    # Check 2: Expected columns
    expected_columns = {'feature1', 'feature2', 'label'}
    assert expected_columns.issubset(df.columns), \
        f"Missing columns: {expected_columns - set(df.columns)}"
    checks.append(f"✓ All expected columns present")

    # Check 3: No all-null columns
    null_cols = df.columns[df.isnull().all()].tolist()
    assert len(null_cols) == 0, f"All-null columns: {null_cols}"
    checks.append(f"✓ No all-null columns")

    # Check 4: Reasonable label distribution
    if 'label' in df.columns:
        label_dist = df['label'].value_counts(normalize=True)
        min_class = label_dist.min()
        assert min_class > 0.01, \
            f"Severe class imbalance: smallest class is {min_class:.1%}"
        checks.append(f"✓ Label distribution reasonable")

    # Check 5: Value ranges make sense
    for col in df.select_dtypes(include=['number']).columns:
        if col.endswith('_probability'):
            assert df[col].between(0, 1).all(), \
                f"{col} should be probability [0,1]"
        if col.endswith('_count'):
            assert (df[col] >= 0).all(), \
                f"{col} should be non-negative count"

    checks.append(f"✓ Value ranges valid")

    for check in checks:
        print(check)

    return True

try:
    data_sanity_checks(production_df)
    print("\n✅ All data sanity checks passed")
except AssertionError as e:
    print(f"\n❌ Sanity check failed: {e}")
```

**Level 2: Model Sanity**

```python
def model_sanity_checks(model, X_test, y_test):
    """
    Basic model sanity tests.
    """
    checks = []

    # Check 1: Model makes predictions
    predictions = model.predict(X_test[:10])
    assert len(predictions) == 10, "Model not producing predictions"
    checks.append(f"✓ Model produces predictions")

    # Check 2: Predictions in valid range
    if hasattr(model, 'classes_'):  # Classifier
        assert set(predictions).issubset(set(model.classes_)), \
            f"Predictions outside class set"
        checks.append(f"✓ Predictions are valid classes")

    # Check 3: Better than random
    from sklearn.metrics import accuracy_score
    accuracy = accuracy_score(y_test, model.predict(X_test))
    random_baseline = 1.0 / len(model.classes_)

    assert accuracy > random_baseline * 1.1, \
        f"Model accuracy {accuracy:.1%} barely beats random {random_baseline:.1%}"
    checks.append(f"✓ Model beats random baseline")

    # Check 4: Predictions vary (not all same class)
    unique_preds = len(set(predictions))
    assert unique_preds > 1, "Model predicts only one class"
    checks.append(f"✓ Model produces diverse predictions")

    # Check 5: Deterministic predictions (same input = same output)
    pred1 = model.predict(X_test[:5])
    pred2 = model.predict(X_test[:5])
    assert (pred1 == pred2).all(), "Model is non-deterministic"
    checks.append(f"✓ Predictions are deterministic")

    for check in checks:
        print(check)

    return True
```

**Level 3: Pipeline Sanity**

```python
def pipeline_sanity_checks(pipeline_func, sample_input):
    """
    Test full prediction pipeline end-to-end.
    """
    checks = []

    # Check 1: Pipeline runs without errors
    try:
        output = pipeline_func(sample_input)
        checks.append(f"✓ Pipeline executes successfully")
    except Exception as e:
        raise AssertionError(f"Pipeline failed: {e}")

    # Check 2: Output format correct
    assert isinstance(output, dict), "Output should be dictionary"
    assert 'prediction' in output, "Output missing 'prediction' key"
    checks.append(f"✓ Output format correct")

    # Check 3: Latency acceptable
    import time
    start = time.time()
    for _ in range(10):
        pipeline_func(sample_input)
    avg_latency = (time.time() - start) / 10

    assert avg_latency < 1.0, \
        f"Pipeline too slow: {avg_latency:.2f}s per prediction"
    checks.append(f"✓ Latency acceptable ({avg_latency*1000:.0f}ms)")

    # Check 4: Same input = same output (full pipeline)
    output1 = pipeline_func(sample_input)
    output2 = pipeline_func(sample_input)
    assert output1 == output2, "Pipeline is non-deterministic"
    checks.append(f"✓ Pipeline is deterministic")

    for check in checks:
        print(check)

    return True
```

**The Invariant Test**

Powerful sanity check: define invariants (things that should never change) and test them:

```python
def test_invariants(model, test_cases):
    """
    Test model invariants - predictions that should never change.

    Example invariants:
    - Changing irrelevant feature shouldn't change prediction
    - Monotonic relationship: increasing X should increase Y
    - Symmetry: f(a,b) = f(b,a) for symmetric features
    """

    # Example: Sentiment should be robust to typos
    clean_text = "This product is amazing"
    typo_text = "This produkt is amazng"

    sentiment_clean = model.predict([clean_text])[0]
    sentiment_typo = model.predict([typo_text])[0]

    assert sentiment_clean == sentiment_typo, \
        "Model not robust to typos"

    # Example: Price prediction should increase with size
    small_house = {'sqft': 1000, 'bedrooms': 2}
    large_house = {'sqft': 2000, 'bedrooms': 2}

    price_small = model.predict([small_house])[0]
    price_large = model.predict([large_house])[0]

    assert price_large > price_small, \
        "Price should increase with square footage"

    print("✅ All invariants hold")
```

### Example: The Sanity Check That Saved Launch

A fraud detection model was ready for production. One engineer insisted on a final sanity check:

```python
# Sanity: Model should flag transactions >$10k as high risk
large_transactions = test_df[test_df['amount'] > 10000]
high_risk_pct = (predictions[large_transactions.index] == 'high_risk').mean()

assert high_risk_pct > 0.5, \
    f"Only {high_risk_pct:.1%} of large transactions flagged as high risk"
```

**It failed.** Only 12% of large transactions were flagged. Investigation revealed a preprocessing bug: amounts were being normalized by account balance, so $10k was "small" for wealthy customers. The model learned this pattern.

**Fix**: Remove normalization for fraud detection (raw amounts matter), add account context as separate feature.

### Try It

**Exercise: Design Your Sanity Checks**

For a model you're familiar with (or a hypothetical one), design 5 sanity checks:

1. One data sanity check
2. One model sanity check
3. One pipeline sanity check
4. Two invariant tests specific to your domain

Write them as executable Python assertions with clear error messages.

## Section 5: AI-Specific Diagnostics

AI systems have unique failure modes not seen in traditional software.

### Key Idea: Models Decay Over Time

Unlike traditional code, ML models degrade even when nothing changes in the code. The world shifts beneath them.

**1. Data Drift Detection**

**Data drift**: Input distributions change over time.

```python
from scipy.stats import ks_2samp
import matplotlib.pyplot as plt

def detect_data_drift(reference_data, current_data, features, threshold=0.05):
    """
    Detect drift in input features using statistical tests.
    """
    drift_report = []

    for feature in features:
        # Kolmogorov-Smirnov test
        statistic, pvalue = ks_2samp(
            reference_data[feature].dropna(),
            current_data[feature].dropna()
        )

        is_drift = pvalue < threshold

        drift_report.append({
            'Feature': feature,
            'KS_Statistic': statistic,
            'P_Value': pvalue,
            'Drift_Detected': is_drift
        })

        # Visualize if drift detected
        if is_drift:
            plt.figure(figsize=(10, 4))
            plt.hist(reference_data[feature].dropna(),
                     alpha=0.5, label='Reference', bins=50, density=True)
            plt.hist(current_data[feature].dropna(),
                     alpha=0.5, label='Current', bins=50, density=True)
            plt.title(f'{feature} - DRIFT DETECTED (p={pvalue:.4f})')
            plt.legend()
            plt.show()

    drift_df = pd.DataFrame(drift_report)

    print("DATA DRIFT REPORT:")
    print(drift_df)
    print(f"\n{drift_df['Drift_Detected'].sum()} / {len(features)} features show drift")

    return drift_df
```

**2. Concept Drift Detection**

**Concept drift**: Relationship between inputs and outputs changes.

```python
def detect_concept_drift(model, data_stream, window_size=1000,
                         threshold=0.05):
    """
    Detect concept drift by monitoring accuracy over time.
    Uses sliding window and Page-Hinkley test.
    """
    accuracies = []
    windows = []

    for i in range(0, len(data_stream) - window_size, window_size // 2):
        window = data_stream.iloc[i:i+window_size]

        predictions = model.predict(window.drop('label', axis=1))
        accuracy = (predictions == window['label']).mean()

        accuracies.append(accuracy)
        windows.append(i + window_size // 2)

    # Plot accuracy over time
    plt.figure(figsize=(12, 5))
    plt.plot(windows, accuracies, marker='o')
    plt.axhline(y=np.mean(accuracies), color='r', linestyle='--',
                label=f'Mean: {np.mean(accuracies):.3f}')
    plt.xlabel('Sample Index')
    plt.ylabel('Accuracy')
    plt.title('Model Performance Over Time (Concept Drift Detection)')
    plt.legend()
    plt.grid(True, alpha=0.3)
    plt.show()

    # Statistical test for trend
    from scipy.stats import linregress
    slope, intercept, r_value, p_value, std_err = linregress(windows, accuracies)

    if p_value < threshold and slope < 0:
        print(f"⚠️  CONCEPT DRIFT DETECTED:")
        print(f"   Accuracy declining over time (slope={slope:.6f}, p={p_value:.4f})")
        print(f"   Performance dropped {-slope * len(data_stream):.1%} over dataset")
    else:
        print(f"✓ No significant concept drift detected")

    return accuracies, windows
```

**3. Model Drift Detection**

**Model drift**: Model's predictions change even with same inputs (due to retraining, library updates, hardware differences).

```python
def detect_model_drift(model_v1, model_v2, test_data):
    """
    Compare predictions between two model versions.
    """
    preds_v1 = model_v1.predict(test_data)
    preds_v2 = model_v2.predict(test_data)

    # Agreement rate
    agreement = (preds_v1 == preds_v2).mean()

    print(f"MODEL DRIFT ANALYSIS:")
    print(f"  Prediction agreement: {agreement:.1%}")

    if agreement < 0.95:
        print(f"  ⚠️  Significant model drift detected!")

        # Find disagreements
        disagreements = test_data[preds_v1 != preds_v2]
        print(f"  {len(disagreements)} disagreements out of {len(test_data)}")

        # Analyze disagreement patterns
        print(f"\n  Sample disagreements:")
        print(disagreements.head())
    else:
        print(f"  ✓ Models are consistent")

    return agreement
```

**4. Bias and Fairness Diagnostics**

```python
def diagnose_bias(predictions, true_labels, protected_attribute,
                  group_names):
    """
    Detect bias across demographic groups.
    """
    from sklearn.metrics import confusion_matrix

    print("BIAS DIAGNOSTIC REPORT")
    print("=" * 60)

    for group_value, group_name in zip(protected_attribute.unique(),
                                        group_names):
        mask = (protected_attribute == group_value)

        group_preds = predictions[mask]
        group_labels = true_labels[mask]

        accuracy = (group_preds == group_labels).mean()
        positive_rate = (group_preds == 1).mean()

        # True positive rate (sensitivity)
        cm = confusion_matrix(group_labels, group_preds)
        if cm.shape[0] > 1:
            tpr = cm[1, 1] / (cm[1, 1] + cm[1, 0]) if cm[1, 1] + cm[1, 0] > 0 else 0
            fpr = cm[0, 1] / (cm[0, 1] + cm[0, 0]) if cm[0, 1] + cm[0, 0] > 0 else 0
        else:
            tpr = fpr = 0

        print(f"\nGroup: {group_name} (n={mask.sum()})")
        print(f"  Accuracy: {accuracy:.3f}")
        print(f"  Positive prediction rate: {positive_rate:.3f}")
        print(f"  True positive rate: {tpr:.3f}")
        print(f"  False positive rate: {fpr:.3f}")

    # Compute fairness metrics
    groups = protected_attribute.unique()

    # Demographic parity: P(pred=1 | group=A) ≈ P(pred=1 | group=B)
    pos_rates = []
    for group in groups:
        mask = (protected_attribute == group)
        pos_rate = (predictions[mask] == 1).mean()
        pos_rates.append(pos_rate)

    demographic_parity_diff = max(pos_rates) - min(pos_rates)

    print(f"\n{'=' * 60}")
    print(f"FAIRNESS METRICS:")
    print(f"  Demographic parity difference: {demographic_parity_diff:.3f}")

    if demographic_parity_diff > 0.1:
        print(f"  ⚠️  Significant disparity detected (>{10}%)")
    else:
        print(f"  ✓ Demographic parity acceptable (<{10}%)")
```

### Example: The Seasonal Drift

An e-commerce recommendation model performed well in testing (January) but degraded in production (November-December):

```python
# Monthly performance tracking
monthly_accuracy = {
    'Jan': 0.85, 'Feb': 0.84, 'Mar': 0.83,
    'Apr': 0.82, 'May': 0.81, 'Jun': 0.80,
    'Jul': 0.79, 'Aug': 0.78, 'Sep': 0.77,
    'Oct': 0.75, 'Nov': 0.68, 'Dec': 0.65
}
```

**Drift diagnosis:**

- **Data drift**: November-December showed 3x higher proportion of "gift" searches
- **Concept drift**: Purchase patterns changed (people buying for others, not themselves)
- **Solution**: Retrain monthly with seasonal data, add "gift intent" feature

### Try It

**Exercise: Drift Detection Simulation**

Simulate a data stream with drift:

```python
import numpy as np
import pandas as pd

# Generate data with drift
np.random.seed(42)

# Months 1-6: Normal distribution mean=50
data_normal = np.random.normal(50, 10, size=(6000, 5))

# Months 7-12: Distribution shifts, mean=55
data_shifted = np.random.normal(55, 10, size=(6000, 5))

# Combine
data_stream = np.vstack([data_normal, data_shifted])
data_df = pd.DataFrame(data_stream,
                       columns=['feature1', 'feature2', 'feature3',
                               'feature4', 'feature5'])
data_df['month'] = np.repeat(range(1, 13), 1000)

# Your task:
# 1. Split into reference (months 1-3) and monitoring (months 4-12)
# 2. Run drift detection for each month against reference
# 3. Plot drift statistics over time
# 4. Identify when drift began
```

## Reflection Questions

1. **Input vs. Output**: In your experience, what percentage of model failures originate from data issues vs. model issues? Why do you think data issues are so common?

2. **Error Analysis ROI**: You have 200 errors to analyze but only time for 50. How do you choose which errors to investigate? What sampling strategy maximizes learning?

3. **Sanity Check Philosophy**: Some engineers write dozens of sanity checks, others write few. What's your philosophy? When does sanity checking become excessive?

4. **Drift Response**: You detect data drift but performance hasn't dropped yet. Do you retrain the model preemptively or wait for performance degradation? What factors influence your decision?

5. **Diagnostic Depth**: When diagnosing a production issue, how do you balance speed (fixing it quickly) vs. thoroughness (understanding root cause)?

6. **Human in the Loop**: Error analysis requires manual inspection. How do you scale this as your model sees millions of predictions? What role does human judgment play?

## Portfolio Project: Diagnostic Report

### Project Brief

You are a machine learning engineer at a fintech company. The credit risk model has been in production for 6 months. Performance has degraded from 88% accuracy to 79% accuracy. Your task: diagnose the problem and propose fixes.

### Dataset

You'll receive (or simulate):

- `credit_train.csv`: Original training data (10,000 loans, features: age, income, employment_length, credit_score, loan_amount, purpose, label: approved/denied)
- `credit_production.csv`: Recent production data (2,000 loans, same schema)
- `credit_predictions.csv`: Model predictions on production data with confidence scores

### Deliverable

Write a comprehensive **Diagnostic Report** (1500-2000 words) that includes:

**1. Executive Summary** (200 words)

- What's broken?
- Root cause in 1-2 sentences
- Recommended fix with estimated impact

**2. Input Diagnosis** (400 words)

- Distribution comparison for key features
- Data quality issues identified
- Statistical tests for drift
- Visualizations (histograms, box plots)

**3. Output Diagnosis** (400 words)

- Confusion matrix analysis
- Failure mode identification
- Error patterns by demographic slice
- Worst predictions with examples

**4. Error Analysis** (400 words)

- Sample 100 errors, categorize into types
- Quantify impact of each error category
- Show example errors from each category
- Prioritize fixes by impact and feasibility

**5. Sanity Checks** (200 words)

- List 5 sanity checks you ran
- Did any fail? What did you learn?

**6. Drift Analysis** (200 words)

- Data drift: Which features drifted?
- Concept drift: Has the input-output relationship changed?
- Model drift: If you retrained, did predictions change significantly?

**7. Action Plan** (200 words)

Prioritized list:

1. [Fix] - Estimated impact, effort, risk
2. [Fix] - Estimated impact, effort, risk
3. ...

### Evaluation Rubric

| Criterion | Excellent (4) | Good (3) | Adequate (2) | Needs Work (1) |
|-----------|---------------|----------|--------------|----------------|
| **Diagnosis Depth** | Systematically analyzes inputs, outputs, and errors with statistical rigor | Covers main diagnostic areas with some statistical testing | Basic analysis, mostly descriptive | Superficial, no structured approach |
| **Code Quality** | Clean, well-documented diagnostic scripts; reproducible analysis | Functional code with some documentation | Code works but hard to follow | Code missing or broken |
| **Visualizations** | Insightful plots that clearly reveal patterns; publication-quality | Useful plots with clear labels | Basic plots, readable | Poor or missing visualizations |
| **Root Cause** | Clearly identifies root cause with evidence; separates symptoms from causes | Identifies likely cause with supporting data | Makes reasonable guess | No clear root cause identified |
| **Action Plan** | Prioritized, specific, with estimated impact and effort | Actionable recommendations | Generic suggestions | Vague or missing |

### Stretch Goals

- Implement automated drift detection that runs weekly
- Build a dashboard for ongoing model monitoring
- Propose an A/B testing plan to validate your fixes
- Analyze fairness: Are errors distributed equally across demographic groups?

### Submission

Submit as Jupyter notebook with:

- All code used for diagnosis
- Inline visualizations
- Markdown narrative explaining findings
- Executive summary at the top

**Remember**: The goal isn't just to find the problem—it's to demonstrate systematic diagnostic thinking that generalizes to any AI system failure.

---

## Summary

Diagnosis is detective work. You gather evidence, form hypotheses, run tests, and iteratively narrow possibilities until you find the root cause.

**Key frameworks:**

1. **Input Diagnosis**: Start by checking data distributions, quality, and features
2. **Output Diagnosis**: Analyze error patterns, confusion matrices, and failure modes
3. **Error Analysis**: Systematically categorize, quantify, and prioritize fixes
4. **Sanity Checks**: Quick tests to catch obvious issues before deep dives
5. **Drift Detection**: Monitor for data drift, concept drift, and model drift over time

**Diagnostic mindset:**

- **Be systematic**: Follow a framework, don't jump to conclusions
- **Question assumptions**: The model is probably fine; the data probably isn't
- **Fail fast**: Sanity checks save hours of debugging
- **Quantify everything**: "It seems worse" → "Accuracy dropped 8% on over-65 users"
- **Think in distributions**: One error is an anecdote; 100 errors reveal patterns

The best diagnosticians combine statistical rigor with domain intuition. They know when to trust the numbers and when to look at individual examples. They move fluidly between aggregate metrics and edge cases, always asking: "What is this failure trying to teach me?"

In the next chapter, we'll take what we've learned from diagnosis and use it to **repair** AI systems—fixing data, retraining models, and validating improvements.

---

**Next Chapter**: [Chapter 5: Pivot - Acting on Signals](../05-pivot/index.md)

**Previous Chapter**: [Chapter 3: The Loop Framework](../03-the-loop-framework/index.md)
