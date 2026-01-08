# MicroSim: Signal Dashboard

## Concept Visualized

- **Concept:** Success/Kill/Leading Indicators for AI Project Monitoring
- **Learning Goal:** Students will design, configure, and interpret signal dashboards that drive persist/pivot/stop decisions based on threshold-based monitoring of project health indicators
- **Difficulty:** Advanced (graduate level)
- **Bloom's Level:** Evaluate/Create

## Controls (Right Panel)

| Control | Type | Range | Default | Effect |
|---------|------|-------|---------|--------|
| Add Signal | Button + Form | - | - | Create new signal with name, type, thresholds |
| Signal Name | Text input | 50 chars | Empty | Label for dashboard tile |
| Signal Type | Dropdown | [Success, Kill, Leading] | Success | Category and color |
| Current Value | Slider | 0-100 | 50 | Real-time metric value |
| Green Threshold | Number input | 0-100 | 70 | Success zone (≥ this value) |
| Yellow Threshold | Number input | 0-100 | 40 | Warning zone |
| Red Threshold | Number input | 0-100 | 0 | Danger zone (< yellow) |
| Unit | Text input | 20 chars | "%" | Display unit (%, ms, $, etc.) |
| Trend Period | Dropdown | [1 week, 1 month, 3 months, 6 months] | 1 month | Historical data window |
| Update Frequency | Dropdown | [Real-time, Hourly, Daily, Weekly] | Daily | Refresh rate |
| Alert Enabled | Checkbox | On/Off | Off | Notification when thresholds crossed |
| Weight | Slider | 1-10 | 5 | Importance in overall decision |
| Remove Signal | Button (per signal) | - | - | Delete signal from dashboard |
| Load Template | Dropdown | [E-commerce, Healthcare, FinTech, Custom] | Custom | Pre-configured signal sets |
| Time Simulation | Play/Pause | - | Paused | Animate values changing over time |
| Simulation Speed | Slider | 0.5x-5x | 1x | Playback speed for time series |
| Export Dashboard | Button | - | - | Download config as JSON |
| Import Dashboard | File upload | JSON | - | Load saved configuration |

## Visualization (Left Panel)

### Dashboard Layout
- **Grid of tiles:** 2-4 columns, responsive
- **Each tile shows:**
  - Signal name (bold, top)
  - Large gauge/dial visualization
  - Current value (prominent number + unit)
  - Threshold markers on gauge
  - Color background (green/yellow/red zone)
  - Mini trend line (sparkline showing recent history)
  - Status icon (✓, ⚠, ✗)
  - Last updated timestamp

### Gauge Styles by Signal Type

**Success Signals (Green border):**
- Semi-circular gauge, 0-100 scale
- Higher is better
- Green zone (≥ green threshold)
- Yellow zone (yellow to green threshold)
- Red zone (< yellow threshold)
- Example: User satisfaction, model accuracy, engagement rate

**Kill Signals (Red border):**
- Semi-circular gauge, inverted color scheme
- Lower is better
- Red zone (≥ red threshold) → Project should stop
- Yellow zone (yellow to red threshold)
- Green zone (< yellow threshold)
- Example: Error rate, customer churn, cost overrun

**Leading Indicators (Blue border):**
- Linear progress bar
- Predicts future success/kill signals
- Directional arrow showing trend
- Example: Data labeling progress, team velocity, user adoption rate

### Overall Decision Panel
- **Top banner** summarizing dashboard state:
  - **Persist:** All critical signals green, majority positive
  - **Pivot:** Mixed signals, some yellows/reds but recoverable
  - **Stop:** Critical kill signals in red, low recovery probability
- **Decision confidence:** Percentage based on weighted signals
- **Recommendation text:** Human-readable guidance
- **Key concerns:** Bullet list of red/yellow signals needing attention

### Historical Trends Section
- **Time series line chart** below gauge tiles
- Select any signal to expand full trend view
- Overlay multiple signals for correlation analysis
- Threshold lines visible on timeline
- Annotations for key events (pivots, launches, etc.)
- Date range selector for zoom

### Alert Feed
- **Sidebar** showing recent threshold crossings
- "Accuracy dropped below 85% (yellow threshold)"
- Timestamp and severity icon
- Clickable to jump to relevant signal tile

## Interaction Flow

1. **Set up signals:**
   - Add 3-8 signals covering success, kill, and leading indicators
   - Configure thresholds based on project requirements
   - Assign weights to critical signals

2. **Monitor dashboard:**
   - View real-time or simulated values
   - Watch gauges change color as thresholds crossed
   - Check overall decision recommendation

3. **Analyze trends:**
   - Expand individual signals to see historical patterns
   - Identify correlations (e.g., leading indicators predict success signals)
   - Spot early warnings before kill signals trigger

4. **Simulate scenarios:**
   - Use time simulation to test "what if" situations
   - Adjust thresholds to see impact on recommendations
   - Explore how different weighting affects decisions

5. **Export and share:**
   - Save dashboard configuration for team use
   - Generate reports for stakeholder updates

## The "Aha" Moment

Students realize that **defining signals upfront prevents sunk cost fallacy**—when kill thresholds are clear and agreed upon, teams can objectively decide to stop failing projects rather than throwing good money after bad. They also see how leading indicators provide early warning, enabling pivots before irreversible failure. The weighted decision logic shows that not all signals are equal—some are critical, others informative.

## Technical Notes

- **Canvas:** Responsive grid, minimum 800px width, variable height
- **Library:** Chart.js for gauges and trends, custom gauge component
- **Data Structure:** Signal array with metadata (name, type, thresholds, values, history)
- **Time Series:** Array of {timestamp, value} pairs per signal
- **Persistence:** LocalStorage for dashboard config, IndexedDB for time series
- **Mobile:** Stacked tiles, swipe to switch signals, collapsible trend section
- **Accessibility:** High contrast mode, text alternatives for gauges, keyboard navigation
- **Performance:** Virtualized rendering for >20 signals, debounced updates

## Assessment Integration

This MicroSim prepares students for:
- **Quiz Question 1:** "What's the difference between success and leading indicators?"
- **Quiz Question 2:** "Why are kill signals essential for project governance?"
- **Quiz Question 3:** "How do thresholds convert metrics into actionable decisions?"
- **Case Study:** "Analyze this signal dashboard and recommend persist/pivot/stop"
- **Design Exercise:** "Create a signal dashboard for your capstone project"

## Pre-configured Templates

### E-commerce Recommendation System
- **Success:** Click-through rate (>15% green), conversion rate (>5% green), revenue lift (>10% green)
- **Kill:** API latency (>500ms red), model staleness (>7 days red), cost per conversion (>$20 red)
- **Leading:** Training data freshness, A/B test enrollment, user feedback score

### Healthcare Diagnostic AI
- **Success:** Sensitivity (>95% green), specificity (>90% green), physician trust score (>4/5 green)
- **Kill:** False negative rate (>2% red), regulatory audit failures (>0 red), patient complaints (>5/month red)
- **Leading:** Dataset diversity, expert annotation agreement, deployment pipeline health

### FinTech Fraud Detection
- **Success:** Fraud catch rate (>85% green), precision (>80% green), processing speed (<100ms green)
- **Kill:** False positive rate (>5% red), customer friction score (>3/5 red), compliance violations (>0 red)
- **Leading:** Model retrain frequency, data drift detection, transaction volume growth

## Edge Cases

- **Conflicting signals:** Success and kill both in red zones → Show "Mixed Evidence, Manual Review Required"
- **No data:** Gray gauge with "Awaiting Data" message
- **Threshold overlap:** Validate yellow between red and green, prevent invalid configs
- **All signals green:** Celebrate but warn against complacency, suggest stretch goals
- **Rapid oscillation:** Dampen updates if value crosses thresholds too frequently (noise vs. signal)

## Extension Opportunities

- **Forecasting:** ML model predicts signal values 1-4 weeks ahead
- **Anomaly detection:** Alert when signal deviates from expected pattern
- **Team collaboration:** Comments and annotations on signals
- **Integration APIs:** Pull real-time data from Google Analytics, Datadog, etc.
- **Automated reports:** Weekly email summaries with dashboard snapshots
- **Decision history:** Log persist/pivot/stop decisions with rationale for retrospectives
