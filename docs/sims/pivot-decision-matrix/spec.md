# MicroSim: Pivot Decision Matrix

## Concept Visualized

- **Concept:** Multi-dimensional trade-off analysis for pivot decisions using weighted scoring matrices
- **Learning Goal:** Students will evaluate pivot options across competing dimensions, visualize trade-offs spatially, apply weighted scoring, and make defensible decisions when alternatives have conflicting strengths
- **Difficulty:** Advanced (graduate level)
- **Bloom's Level:** Evaluate/Create

## Controls (Right Panel)

| Control | Type | Range | Default | Effect |
|---------|------|-------|---------|--------|
| Matrix Type | Dropdown | [2x2, Bubble Chart, Radar, Weighted Table] | 2x2 | Visualization style |
| X-Axis Dimension | Dropdown | [Impact, Effort, Cost, Risk, Speed, Complexity, Value, Certainty] | Impact | Horizontal axis |
| Y-Axis Dimension | Dropdown | [Impact, Effort, Cost, Risk, Speed, Complexity, Value, Certainty] | Effort | Vertical axis |
| Bubble Size (if bubble) | Dropdown | [Confidence, ROI, Team Buy-in, Data Quality] | Confidence | Third dimension |
| Add Option | Button + Form | - | - | Create new pivot option |
| Option Name | Text input | 50 chars | Empty | Label for alternative |
| X-Axis Score | Slider | 0-10 | 5 | Position on horizontal |
| Y-Axis Score | Slider | 0-10 | 5 | Position on vertical |
| Bubble Value | Slider | 0-10 | 5 | Size (if bubble chart) |
| Option Color | Color picker | - | Random | Visual identification |
| Option Notes | Text area | 200 chars | Empty | Rationale, risks, assumptions |
| Remove Option | Button (per option) | - | - | Delete alternative |
| Add Dimension | Button + Form | - | - | Custom scoring criteria |
| Dimension Name | Text input | 30 chars | Empty | Custom dimension label |
| Dimension Weight | Slider | 1-10 | 5 | Importance in overall score |
| Score Options | Button | - | - | Rate all options on this dimension |
| Scoring Mode | Toggle | [Manual, Auto-calculate] | Manual | Weighted sum or direct input |
| Pareto Toggle | Checkbox | On/Off | On | Highlight Pareto frontier |
| Grid Lines | Checkbox | On/Off | On | Show quadrant dividers |
| Labels | Checkbox | On/Off | On | Show option names on chart |
| Zoom/Pan | Mouse/Touch | - | - | Navigate large matrices |
| Compare Mode | Checkbox | On/Off | Off | Side-by-side option comparison |
| Selected Options | Multi-select | - | None | Compare subset of options |
| Export | Button | - | - | Download as PNG/PDF/CSV |
| Load Template | Dropdown | [Feature Pivot, Model Change, Market Shift, Resource Reallocate] | Custom | Pre-configured scenarios |

## Visualization (Left Panel)

### 2x2 Matrix View (Default)

**Layout:**
- X-axis: Selected dimension (e.g., Impact), 0-10 scale
- Y-axis: Selected dimension (e.g., Effort), 0-10 scale
- Four quadrants with labels:
  - **Top-right (High Impact, High Effort):** "Big Bets" (yellow)
  - **Top-left (Low Impact, High Effort):** "Money Pits" (red)
  - **Bottom-right (High Impact, Low Effort):** "Quick Wins" (green)
  - **Bottom-left (Low Impact, Low Effort):** "Low Priority" (gray)

**Option Representation:**
- Colored circles placed at (X-score, Y-score) coordinates
- Circle size: Fixed or proportional to third dimension if enabled
- Option name as label (togglable)
- Draggable: Click and drag to reposition
- Hover: Tooltip with all dimension scores and notes

**Pareto Frontier:**
- Dashed line connecting non-dominated options
- Options below/left of frontier are suboptimal
- Highlighted in bold or with star icon

### Bubble Chart View

**3D Representation:**
- X-axis: Dimension 1 (e.g., Impact)
- Y-axis: Dimension 2 (e.g., Risk)
- Bubble size: Dimension 3 (e.g., Confidence)
- Color: Option category or custom grouping
- Legend: Bubble size scale (small = low, large = high)

**Interaction:**
- Click bubble: Expand detail panel with all scores
- Drag bubble: Adjust X/Y scores, size auto-updates if linked to formula
- Overlap detection: Slight jitter to separate overlapping bubbles

### Radar Chart View

**Multi-dimensional Profile:**
- Polygon per option overlaid on same axes
- Each vertex: One dimension (up to 8 dimensions supported)
- Shaded area: Represents option's overall strength profile
- Color-coded by option
- Hover: Highlight single option, dim others

**Interaction:**
- Click vertex: Edit score for that dimension
- Toggle options on/off to reduce visual clutter
- Rotate chart to prioritize different dimensions

### Weighted Table View

**Spreadsheet-style Matrix:**
- Rows: Pivot options
- Columns: Dimensions + Weighted Score + Rank
- Each cell: Editable score (0-10)
- Dimension column headers: Weight slider
- Weighted score formula: Σ(dimension_score × dimension_weight) / Σ(weights)
- Auto-sort by rank or any column
- Conditional formatting: Green (high scores), Red (low scores)

**Interaction:**
- Click cell: Edit score
- Click header: Adjust weight
- Click option row: Expand notes section
- Export to CSV for external analysis

### Compare Mode (Side Panel)

**When 2+ options selected:**
- Split-screen comparison table
- Row per dimension showing side-by-side scores
- Difference column: Option A - Option B
- Visual bar charts for quick comparison
- "Winner" indicator per dimension
- Overall recommendation based on weighted scores

## Decision Logic

### Weighted Scoring Algorithm

```
For each option:
  WeightedScore = Σ(DimensionScore_i × DimensionWeight_i) / Σ(DimensionWeight_i)
  Rank = Sort options by WeightedScore descending
```

### Pareto Frontier Detection

```
Option A dominates Option B if:
  - A scores ≥ B on all dimensions (for benefit dimensions like Impact)
  - At least one dimension where A > B

Pareto Frontier = All non-dominated options
```

### Recommendation Engine

**Quick Win Detection (2x2 Matrix):**
- Bottom-right quadrant (High Impact, Low Effort)
- Recommendation: "Prioritize these—high ROI"

**Money Pit Detection (2x2 Matrix):**
- Top-left quadrant (Low Impact, High Effort)
- Recommendation: "Avoid these—poor ROI"

**Big Bet Decision (2x2 Matrix):**
- Top-right quadrant (High Impact, High Effort)
- Recommendation: "Strategic choice—high risk/reward, ensure resources available"

**Weighted Score Recommendation:**
- Top 3 options by weighted score
- Flag ties (< 5% difference)
- Warn if top option has critical weakness (any dimension < 3/10)

## The "Aha" Moment

Students discover that **the "best" pivot depends on what you optimize for**—changing dimension weights or axes completely reorders options. They see that optimal choices lie on the Pareto frontier (can't improve one dimension without worsening another), and that dominated options should be eliminated immediately. The visualization makes trade-offs visceral: you can't have high impact, low effort, low risk, and low cost all at once. Decisions require accepting trade-offs.

## Technical Notes

- **Canvas:** Responsive SVG, minimum 600px × 600px for 2x2, scalable for bubble/radar
- **Library:** D3.js for charts, custom drag-and-drop handlers
- **Layout Algorithm:** Force-directed for bubble overlap prevention, automatic label positioning
- **State Management:** Option array with {name, scores[], notes, color} objects
- **Persistence:** LocalStorage for autosave, export to JSON for versioning
- **Mobile:** Touch gestures for drag, pinch-to-zoom, tap for tooltips
- **Accessibility:** Keyboard navigation (tab through options, arrow keys to adjust scores), screen reader table fallback
- **Performance:** Canvas rendering for >50 options, SVG for <50

## Assessment Integration

This MicroSim prepares students for:
- **Quiz Question 1:** "What is a Pareto frontier and why does it matter for pivot decisions?"
- **Quiz Question 2:** "Why might different stakeholders choose different pivots from the same matrix?"
- **Quiz Question 3:** "How does changing dimension weights affect the recommended pivot?"
- **Case Study:** "Analyze this pivot decision matrix and defend your recommended choice"
- **Design Exercise:** "Create a pivot decision matrix for your capstone project with 5+ alternatives"

## Pre-configured Templates

### Feature Pivot (Product Development)

**Options:**
1. AI-powered recommendation engine
2. Manual curation by experts
3. Hybrid (AI suggestions + human override)
4. User-generated content (crowdsourced)
5. No personalization (one-size-fits-all)

**Dimensions:**
- **Impact:** User engagement lift (0 = none, 10 = 2x growth)
- **Effort:** Development time in months (0 = 1 month, 10 = 12+ months)
- **Cost:** Budget required (0 = $10K, 10 = $500K+)
- **Risk:** Uncertainty in outcome (0 = proven, 10 = experimental)
- **Speed to market:** Time to first user value (0 = 1 week, 10 = 6+ months)

**Default Axis:** Impact (X) vs. Effort (Y)

### Model Change (Technical Pivot)

**Options:**
1. Keep current model architecture
2. Switch to transformer-based model
3. Ensemble of multiple models
4. Simplify to linear regression
5. Outsource to third-party API

**Dimensions:**
- **Accuracy:** Expected performance improvement (0 = worse, 10 = 50%+ better)
- **Complexity:** Model maintenance burden (0 = simple, 10 = very complex)
- **Inference Speed:** Latency impact (0 = 10x slower, 10 = 10x faster)
- **Data Requirements:** Labeled data needed (0 = 100 samples, 10 = 1M+ samples)
- **Interpretability:** Explainability for stakeholders (0 = black box, 10 = fully transparent)

**Default Axis:** Accuracy (X) vs. Complexity (Y), Bubble size = Interpretability

### Market Shift (Strategic Pivot)

**Options:**
1. Enterprise B2B focus
2. Consumer B2C focus
3. Freemium + Premium tiers
4. White-label licensing
5. Open-source + Consulting

**Dimensions:**
- **Revenue Potential:** 3-year projection (0 = <$1M, 10 = $50M+)
- **Customer Acquisition Cost:** CAC ratio (0 = low, 10 = high)
- **Time to Revenue:** Months to first paying customer (0 = 1 month, 10 = 12+ months)
- **Market Size:** Total addressable market (0 = niche, 10 = mass market)
- **Competitive Intensity:** Existing player strength (0 = blue ocean, 10 = red ocean)
- **Team Fit:** Expertise alignment (0 = no experience, 10 = perfect fit)

**Default Axis:** Revenue Potential (X) vs. Competitive Intensity (Y)

### Resource Reallocation (Operational Pivot)

**Options:**
1. Hire 3 ML engineers
2. Hire 1 data scientist + outsource labeling
3. Buy third-party tools ($100K/year)
4. Retrain existing team (6-month bootcamp)
5. Partner with university research lab

**Dimensions:**
- **Capability Gain:** New skills acquired (0 = minimal, 10 = transformative)
- **Cost:** Total expenditure (0 = $0, 10 = $500K+)
- **Speed:** Time to operational (0 = 1 week, 10 = 12+ months)
- **Sustainability:** Long-term viability (0 = temporary fix, 10 = permanent solution)
- **Quality:** Output excellence (0 = adequate, 10 = world-class)

**Default Axis:** Capability Gain (X) vs. Cost (Y)

## Edge Cases

- **All options in same quadrant:** Suggest adjusting scales or choosing different dimensions
- **No clear winner:** Display top 3 with recommendation to gather more data or run experiments
- **Extreme outlier:** Option with one 10/10 score and rest 1/10 → Flag as "high risk specialist choice"
- **Ties in weighted score:** Show sensitivity analysis (how much would weights need to change to break tie?)
- **Contradictory dimensions:** E.g., "Impact" and "Value" are redundant → Warn user to diversify dimensions

## Extension Opportunities

- **Sensitivity analysis:** Slider to adjust all weights, watch ranking change in real-time
- **Monte Carlo simulation:** Add uncertainty ranges to scores, run 1000 simulations, show probability of each option being best
- **Stakeholder views:** Different stakeholder roles (CEO, Engineer, User) with preset dimension weights
- **Time dimension:** Animate how option scores evolve over project timeline
- **Collaborative scoring:** Team members vote on scores independently, consensus view with outlier detection
- **AI suggestions:** GPT recommends dimension scores based on option descriptions, human can override
