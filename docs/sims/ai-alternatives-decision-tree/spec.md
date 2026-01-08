# MicroSim: AI Alternatives Decision Tree

## Concept Visualized

- **Concept:** Decision criteria for selecting AI vs. non-AI solutions
- **Learning Goal:** Students will evaluate problem characteristics systematically to identify optimal solution approaches, understanding when AI adds value versus when simpler alternatives suffice
- **Difficulty:** Advanced (graduate level)
- **Bloom's Level:** Evaluate/Apply

## Controls (Right Panel)

| Control | Type | Range | Default | Effect |
|---------|------|-------|---------|--------|
| Data Availability | Slider | None/Limited/Moderate/Abundant | Moderate | Influences AI feasibility scoring |
| Data Quality | Slider | Poor/Fair/Good/Excellent | Good | Affects confidence in AI recommendations |
| Pattern Complexity | Dropdown | [Simple Rules, Multi-factor, Non-linear, Unknown] | Multi-factor | Determines whether rules suffice vs. ML needed |
| Latency Requirements | Slider (ms) | 1-10000 | 100 | Real-time vs. batch processing |
| Accuracy Needs | Slider | 50-99.9% | 90% | Precision requirements |
| Interpretability | Dropdown | [Not Important, Helpful, Critical] | Helpful | Explainability requirements |
| Budget Constraint | Slider | $0-$1M | $50K | Development/operational costs |
| Risk Tolerance | Dropdown | [Low, Medium, High] | Medium | Acceptable failure modes |
| Regulatory | Checkbox group | [GDPR, HIPAA, Financial, None] | None | Compliance constraints |
| Team Expertise | Multi-select | [ML, Rules, Stats, Domain] | Domain | Available skills |
| Time to Deploy | Slider (weeks) | 1-52 | 12 | Development timeline |
| Scale | Dropdown | [<1K, 1K-100K, 100K-1M, >1M] | 1K-100K | Expected usage volume |
| Reset | Button | - | - | Clear all selections |
| Show Reasoning | Toggle | On/Off | On | Display decision rationale |

## Visualization (Left Panel)

### Tree Structure
- **Root node:** "What solution approach fits best?"
- **Decision nodes:** Questions about problem characteristics (hexagons)
- **Branch paths:** User responses leading to next question (arrows with labels)
- **Leaf nodes:** Recommended approaches (rounded rectangles)
- **Color coding:**
  - Green: Non-AI/Simple solutions
  - Yellow: Hybrid approaches
  - Blue: Traditional ML
  - Purple: Deep learning
  - Red: Not recommended

### Interactive Flow
- **Active path highlighted:** Bold lines show current decision path
- **Dimmed alternatives:** Grayed out paths not taken
- **Progress indicator:** Breadcrumb trail of decisions made
- **Animated transitions:** Smooth pan/zoom to next question
- **Confidence meter:** Bar chart showing certainty of recommendation (based on how clear-cut the criteria are)

### Recommendation Display
When a leaf node is reached:
- **Primary recommendation:** Large, prominent display
- **Specific approach:** E.g., "Rule-based system" or "Random Forest classifier"
- **Confidence score:** Percentage based on input alignment
- **Why this fits:** Bullet points explaining the match
- **Trade-offs:** Key advantages and limitations
- **Alternative to consider:** Second-best option with rationale
- **Chapter links:** Related course content sections

### Tree Layout
- **Top-down orientation:** Root at top, recommendations at bottom
- **Collapsible branches:** Click to expand/collapse subtrees
- **Minimap:** Small overview in corner for navigation
- **Zoom controls:** +/- buttons and scroll-to-zoom
- **Path replay:** Animation showing decision flow from root to recommendation

## Decision Logic

### Key Decision Points

1. **Data Volume Check**
   - <1K samples → Simple rules or transfer learning
   - 1K-100K → Traditional ML
   - >100K → Deep learning viable

2. **Pattern Complexity**
   - Simple rules → If-then logic, decision trees
   - Multi-factor → Regression, ensemble methods
   - Non-linear → Neural networks, SVM
   - Unknown → Exploratory data analysis first

3. **Real-time Requirements**
   - <10ms → Pre-computed rules, lookup tables
   - 10-100ms → Lightweight models, edge deployment
   - >100ms → Cloud-based ML acceptable

4. **Interpretability Needs**
   - Critical → Linear models, decision trees, rules
   - Helpful → SHAP-enabled models, attention mechanisms
   - Not important → Black-box models acceptable

5. **Budget Constraints**
   - <$10K → Rules-based, open-source ML
   - $10K-$100K → Custom ML with standard frameworks
   - >$100K → Deep learning, specialized infrastructure

## The "Aha" Moment

Students discover that **most problems don't need cutting-edge AI**—simpler solutions often win on speed, cost, interpretability, and maintainability. The tree reveals how problem characteristics, not AI hype, should drive technology choices. They learn to ask "Does this problem warrant AI?" before jumping to complex solutions.

## Technical Notes

- **Canvas:** Responsive SVG, minimum 700px width, 600px height
- **Library:** D3.js for tree layout and transitions
- **Layout Algorithm:** Reingold-Tilford tree with collision detection
- **State Management:** Decision history stack for back navigation
- **Mobile:** Horizontal scrolling on small screens, touch gestures for pan/zoom
- **Accessibility:** Keyboard navigation (arrow keys), ARIA labels for screen readers
- **Performance:** Lazy rendering for large trees, virtual scrolling

## Assessment Integration

This MicroSim prepares students for:
- **Quiz Question 1:** "When is a rule-based system preferable to machine learning?"
- **Quiz Question 2:** "What problem characteristics favor deep learning over traditional ML?"
- **Quiz Question 3:** "How do regulatory constraints affect algorithm selection?"
- **Case Study:** "Evaluate whether AI is appropriate for [scenario]"
- **Design Exercise:** "Justify your technology choice for the capstone project"

## Example Pathways

### Path 1: Simple Rule-Based Solution
- Data: Limited (<1K samples)
- Pattern: Simple rules
- Latency: <10ms
- Interpretability: Critical
- **Recommendation:** If-then logic with lookup tables

### Path 2: Traditional ML
- Data: Moderate (10K samples)
- Pattern: Multi-factor
- Latency: 100ms acceptable
- Interpretability: Helpful
- **Recommendation:** Random Forest with SHAP explanations

### Path 3: Deep Learning
- Data: Abundant (>1M samples)
- Pattern: Non-linear, unknown
- Latency: >500ms acceptable
- Interpretability: Not critical
- Budget: High
- **Recommendation:** Neural network (CNN/LSTM depending on data type)

### Path 4: Hybrid Approach
- Data: Moderate
- Pattern: Partially known rules + edge cases
- Interpretability: Critical for some decisions
- **Recommendation:** Rules + ML fallback (rules handle common cases, ML for edge cases)

## Edge Cases

- **Conflicting constraints:** Show warning when requirements are incompatible (e.g., real-time + high accuracy + limited data)
- **No clear winner:** Display multiple options with tie-breaker questions
- **Insufficient information:** Prompt for critical missing inputs before recommendation
- **Overspecified:** Detect when user is making arbitrary distinctions, suggest simplification

## Extension Opportunities

- **Cost calculator:** Estimate total cost of ownership for each recommendation
- **Case library:** Real-world examples mapped to tree paths
- **Comparative mode:** Run multiple scenarios side-by-side
- **Team discussion:** Shared sessions with comment threads on decisions
- **Custom trees:** Students build their own decision trees for domain-specific problems
