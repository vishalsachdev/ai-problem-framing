# Signal Dashboard

Design and monitor success, kill, and leading indicators to make objective persist/pivot/stop decisions for AI projects based on threshold-driven signals.

## Interactive Simulation

<iframe src="./main.html" width="100%" height="640px" style="border: 1px solid #ddd; border-radius: 8px;" scrolling="no"></iframe>

## How to Use This MicroSim

### Getting Started
1. **Observe the dashboard** with 6 pre-configured signals across three types (success, kill, leading)
2. **Adjust current values** using the sliders on the right panel to simulate different scenarios
3. **Watch the gauges** update with color-coded zones (green/yellow/red)
4. **Monitor the recommendation** banner that shows PERSIST, PIVOT, or STOP based on signal health
5. **Click "Simulate Time"** to watch signals drift over time and practice real-time decision-making

### Signal Types Explained

**Success Signals (Green border):**
These measure positive outcomes you're trying to maximize. Examples:
- Model accuracy on validation set
- User engagement rate
- Revenue generated
- Customer satisfaction score

**Kill Signals (Red border):**
These measure negative outcomes that could force project termination. Examples:
- Error rate or bugs per release
- Cost overrun percentage
- Customer churn rate
- Regulatory compliance violations

**Leading Indicators (Blue border):**
These predict future success or failure before it happens. Examples:
- Data labeling progress (predicts when model training can start)
- Developer velocity (predicts delivery timeline)
- Early user adoption rate (predicts long-term growth)
- Model drift detection (predicts accuracy degradation)

### Setting Good Thresholds

**Green Threshold:** The target you're aiming for. Reaching this means you're succeeding.

**Yellow Threshold:** The warning zone. Not failing yet, but attention needed.

**Red Threshold:** The danger zone. Below this (for success) or above this (for kill) signals serious problems.

**Example: Model Accuracy (Success Signal)**
- Green: ≥ 90% (excellent performance)
- Yellow: 75-89% (acceptable but needs improvement)
- Red: < 75% (unacceptable, requires pivot or stop)

**Example: API Latency (Kill Signal)**
- Green: < 100ms (fast response)
- Yellow: 100-500ms (sluggish but tolerable)
- Red: ≥ 500ms (unacceptable user experience)

### Using the Time Simulation

Click "Simulate Time" to watch signals evolve over time. This helps you:
- **See how trends develop** before thresholds are crossed
- **Test different scenarios** (what if accuracy declines slowly vs. suddenly?)
- **Practice decision-making** under changing conditions
- **Understand leading indicators** that predict future state

Click "Reset" to return to the default values and start fresh.

### Interpreting the Decision Recommendation

The dashboard combines all signals into a weighted recommendation:

**Persist:** Green light—continue with current approach
- Most success signals green
- Kill signals under control
- Leading indicators positive

**Pivot:** Yellow light—change strategy but don't abandon
- Mixed signals (some yellow/red)
- Recovery is possible with course correction
- Leading indicators suggest potential

**Stop:** Red light—terminate the project
- Critical kill signals in red zone
- Success signals consistently failing
- Leading indicators predict continued failure
- Sunk cost fallacy alert—cut losses

**Decision Confidence** shows how clear-cut the recommendation is. Low confidence (< 60%) means you're in a gray area requiring deeper analysis.

## Learning Objectives

By using this MicroSim, you will:

1. **Design** comprehensive signal systems covering success, kill, and leading indicators
2. **Evaluate** project health objectively using threshold-based criteria
3. **Create** actionable dashboards that drive persist/pivot/stop decisions
4. **Analyze** trade-offs in threshold selection (too strict vs. too lenient)
5. **Apply** weighted decision logic to prioritize critical signals

## Connection to Course Content

- **Chapter 4:** Signal Design—defining measurable success and failure criteria
- **Chapter 5:** Pivot Decisions—when to change course vs. stay the course vs. quit
- **Chapter 6:** Implementation Monitoring—tracking real-world AI system performance
- **Chapter 7:** Stakeholder Communication—dashboards as shared truth

## Worked Examples

### Example 1: E-commerce Personalization Engine

**Success Signals:**
- Click-through rate: Current 18% (Green ≥ 15%, Yellow 10-14%, Red < 10%)
- Conversion rate: Current 6% (Green ≥ 5%, Yellow 3-4%, Red < 3%)
- Revenue lift: Current 12% (Green ≥ 10%, Yellow 5-9%, Red < 5%)

**Kill Signals:**
- API latency: Current 200ms (Green < 100ms, Yellow 100-500ms, Red ≥ 500ms)
- Cost per conversion: Current $8 (Green < $10, Yellow $10-20, Red ≥ $20)

**Leading Indicators:**
- A/B test sample size: Current 8,000 users (Target 10,000)
- Model retrain frequency: Current 2 days since last train (Target < 7 days)

**Dashboard Recommendation: PERSIST**
- Confidence: 85%
- All success signals green, kill signals yellow (manageable)
- Leading indicators on track
- Key action: Monitor latency, optimize if trends toward red

### Example 2: Healthcare Diagnostic AI (Warning State)

**Success Signals:**
- Sensitivity: Current 92% (Green ≥ 95%, Yellow 90-94%, Red < 90%) → YELLOW
- Specificity: Current 88% (Green ≥ 90%, Yellow 85-89%, Red < 85%) → YELLOW
- Physician trust: Current 3.5/5 (Green ≥ 4/5, Yellow 3-3.9/5, Red < 3/5) → YELLOW

**Kill Signals:**
- False negative rate: Current 8% (Green < 2%, Yellow 2-5%, Red ≥ 5%) → RED
- Patient complaints: Current 3/month (Green 0, Yellow 1-5, Red > 5) → YELLOW

**Leading Indicators:**
- Dataset diversity: Current 60% (Target 80%) → Behind
- Expert agreement: Current 75% (Target 90%) → Behind

**Dashboard Recommendation: PIVOT**
- Confidence: 72%
- Critical issue: False negative rate in red (life-threatening)
- Success signals underwhelming, all in yellow
- Leading indicators suggest data quality problems
- Recommended pivot: Expand dataset diversity, retrain with stricter false negative penalty, increase expert review

### Example 3: FinTech Fraud Detection (Stop Signal)

**Success Signals:**
- Fraud catch rate: Current 70% (Green ≥ 85%, Yellow 75-84%, Red < 75%) → RED
- Precision: Current 65% (Green ≥ 80%, Yellow 70-79%, Red < 70%) → RED

**Kill Signals:**
- False positive rate: Current 8% (Green < 1%, Yellow 1-5%, Red ≥ 5%) → RED
- Customer friction: Current 4.2/5 (Green < 2/5, Yellow 2-3/5, Red ≥ 3/5) → RED
- Compliance violations: Current 2 this quarter (Green 0, Yellow 0, Red > 0) → RED

**Leading Indicators:**
- Data drift: Current HIGH (models trained on outdated patterns)
- Transaction volume: Growing 20% monthly (models can't keep up)

**Dashboard Recommendation: STOP**
- Confidence: 95%
- Multiple critical kill signals in red, including compliance violations (existential risk)
- Success signals also failing
- Leading indicators predict worsening performance
- Recommended action: Stop deployment, redesign approach, address data drift before retry

## Design Principles for Good Signals

### Characteristics of Effective Signals

**Actionable:** When the signal changes, you know what to do
- Bad: "User satisfaction" (vague)
- Good: "% users rating 4+ stars on feature X" (specific action possible)

**Measurable:** Objective, quantifiable data
- Bad: "Team morale" (subjective)
- Good: "Sprint velocity (story points/week)" (objective)

**Timely:** Updates frequently enough to enable decisions
- Bad: Annual survey results (too slow)
- Good: Daily active users (real-time feedback)

**Owned:** Someone is responsible for the signal
- Bad: Generic "system health" (no owner)
- Good: "API uptime (owned by infrastructure team)"

### Balanced Signal Portfolio

A good dashboard includes:
- **3-5 success signals:** Not too many or focus diffuses
- **2-3 kill signals:** Critical risks that could end the project
- **2-4 leading indicators:** Early warnings for proactive management
- **Mix of types:** User metrics, business metrics, technical metrics

### Threshold Calibration

**Too strict:** Everything is red, team becomes demoralized, dashboard ignored
**Too lenient:** Everything is green, dashboard provides no value, surprises happen

**Right balance:**
- Green: Achievable but challenging (70-80% of time if performing well)
- Yellow: Warning state that prompts investigation (15-25% of time)
- Red: Genuine crisis requiring immediate action (< 10% of time)

Recalibrate thresholds quarterly based on actual performance.

## Common Pitfalls

1. **Vanity metrics:** Tracking numbers that look good but don't predict success
   - Example: Total users (instead of active users)
   - Example: Model complexity (instead of accuracy)

2. **Lagging indicators only:** By the time you see the problem, it's too late
   - Solution: Include leading indicators that predict future state

3. **No kill signals:** Only tracking positives means no objective stop criteria
   - Result: Sunk cost fallacy, projects drag on indefinitely

4. **Ignoring yellow signals:** Waiting until red to act
   - Result: Problems escalate, harder to fix

5. **Signal overload:** Dashboards with 20+ signals become noise
   - Solution: Focus on 8-12 critical signals, archive the rest

## Reflection Questions

After designing your signal dashboard:

1. **Coverage:** Do your signals cover user impact, business value, and technical health?
2. **Early warning:** Could you predict failure 4+ weeks before it happens?
3. **Objectivity:** Could two people look at this dashboard and reach the same decision?
4. **Actionability:** For each red signal, do you know what corrective action to take?
5. **Stakeholder alignment:** Would your team and leadership agree with these thresholds?

## Assessment Applications

This MicroSim supports:
- **Homework 4:** Signal Design Assignment
- **Midterm Case Study:** Given a scenario, design appropriate signals and thresholds
- **Final Project:** Create and justify signal dashboard for capstone project
- **Peer Review:** Critique classmates' signal selection and threshold choices
- **Group Exercise:** Team debate on persist/pivot/stop decisions
