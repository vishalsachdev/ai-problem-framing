# MicroSim: LOOP Framework Visualizer

## Concept Visualized

- **Concept:** LOOP Framework (Outcome → Deconstruction → Alternatives → Trade-offs → Signals)
- **Learning Goal:** Students will understand systematic problem framing by completing each stage of the LOOP framework, seeing connections between stages, and generating a holistic problem canvas
- **Difficulty:** Advanced (graduate level)
- **Bloom's Level:** Analyze/Evaluate

## Controls (Right Panel)

| Control | Type | Range | Default | Effect |
|---------|------|-------|---------|--------|
| Problem Statement | Text area | 500 chars | Empty | Initial problem description to frame |
| Current Step | Button group | 1-5 | 1 | Advances through LOOP stages |
| Outcome Input | Text field | 200 chars | Empty | Desired end state (Step 1) |
| Outcome Type | Dropdown | [User, Business, Technical] | User | Categorizes outcome |
| Components | Multi-input | 10 max | Empty | Key problem elements (Step 2) |
| Component Priority | Slider (per component) | 1-5 | 3 | Importance weighting |
| Alternatives | Multi-input | 8 max | Empty | Solution approaches (Step 3) |
| Alternative Type | Tag selector | [AI, Non-AI, Hybrid] | - | Categorizes each alternative |
| Trade-off Axes | Dropdown (2) | [Cost, Speed, Accuracy, Complexity, Data, Risk] | Cost/Accuracy | X/Y axes for trade-off plot |
| Alternative Position | Drag point | Canvas space | Center | Position on trade-off matrix |
| Signal Type | Checkbox group | Success/Kill/Leading | None | Signal categories (Step 5) |
| Signal Threshold | Number input | 0-100 | 50 | Trigger value for each signal |
| View Mode | Toggle | [Linear, Canvas] | Linear | Layout style |
| Export Canvas | Button | - | - | Download summary as JSON/PNG |

## Visualization (Left Panel)

### Step 1: Outcome
- Large text display: "What outcome are we optimizing for?"
- Visual icon representing outcome type (user/business/technical)
- Sticky note aesthetic with outcome statement
- Color coding: Blue (user), Green (business), Orange (technical)

### Step 2: Deconstruction
- Tree diagram radiating from outcome
- Each component as a node with size proportional to priority
- Connecting lines showing relationships
- Interactive: hover to see component details
- Visual weight: Larger circles for higher priority

### Step 3: Alternatives
- Horizontal swimlanes showing different approaches
- Color coded by type: Purple (AI), Gray (Non-AI), Gradient (Hybrid)
- Icons representing approach category
- Expandable cards with brief descriptions
- Connection lines back to components they address

### Step 4: Trade-offs
- 2D scatter plot with selected axes
- Each alternative as a draggable point
- Quadrant labels (e.g., "High Cost/High Accuracy")
- Pareto frontier line highlighting optimal solutions
- Hover: tooltip with alternative name and scores
- Visual feedback: optimal region shaded green

### Step 5: Signals
- Dashboard with three sections: Success/Kill/Leading
- Gauge visualizations for each signal
- Threshold lines clearly marked
- Traffic light colors (green/yellow/red zones)
- Historical trend sparklines if revisiting

### Canvas View
- All-in-one visual summary
- Circular layout: Outcome (center) → Components → Alternatives → Trade-offs → Signals (outer ring)
- Connection lines showing information flow
- Printable/exportable format
- Annotations enabled for note-taking

## Interaction Flow

1. **Enter Problem** → Text area activates, sample problems available
2. **Define Outcome** → Step 1 unlocks, outcome visualizes as central node
3. **Deconstruct** → Step 2 unlocks, components branch from outcome
4. **Explore Alternatives** → Step 3 unlocks, approaches populate lanes
5. **Assess Trade-offs** → Step 4 unlocks, scatter plot becomes interactive
6. **Set Signals** → Step 5 unlocks, dashboard populates
7. **Review Canvas** → Toggle to see complete framework
8. **Export** → Download summary for external use

## The "Aha" Moment

Students realize that **problem framing is not linear but iterative**—defining signals may reveal gaps in alternatives, trade-off analysis may expose missing outcome dimensions, and deconstruction may highlight conflicting priorities. The canvas view crystallizes how all elements interconnect into a coherent problem frame.

## Technical Notes

- **Canvas:** Responsive, minimum 600px width, 800px height
- **Library:** p5.js for visualization, custom state management
- **Data Structure:** JSON object storing all framework elements
- **Persistence:** LocalStorage auto-save every 30 seconds
- **Mobile:** Touch-optimized, vertical layout below 768px
- **Accessibility:** Keyboard navigation through steps, screen reader annotations
- **Export:** PNG canvas snapshot + JSON data download

## Assessment Integration

This MicroSim prepares students for:
- **Quiz Question 1:** "Which LOOP stage identifies success/kill metrics?"
- **Quiz Question 2:** "Why must outcomes be defined before alternatives?"
- **Quiz Question 3:** "How do trade-offs inform signal selection?"
- **Assignment:** "Apply LOOP framework to your capstone project problem"

## Edge Cases

- **Empty components:** Warning message, cannot advance to Step 3
- **Single alternative:** Prompt to add at least 3 for comparison
- **Overlapping trade-off points:** Slight jitter to separate visually
- **No signals defined:** Cannot complete framework, Step 5 required

## Extension Opportunities

- **Collaborative mode:** Multiple users frame same problem, compare canvases
- **Template library:** Pre-populated examples from industry cases
- **AI suggestions:** GPT-powered alternative generation or component identification
- **Version history:** Track how problem framing evolves over iterations
