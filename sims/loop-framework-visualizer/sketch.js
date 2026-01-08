// LOOP Framework Visualizer - p5.js MicroSim
// Interactive 5-step wizard for systematic problem framing

// Canvas dimensions
let canvasWidth = 600;
let canvasHeight = 600;

// Global state
let currentStep = 1;
let containerWidth;

// Data model
let loopData = {
    outcome: {
        problem: '',
        desired: ''
    },
    components: [],
    alternatives: [],
    tradeoffs: {
        xLabel: 'Effort',
        yLabel: 'Impact',
        positions: {} // alternativeIndex -> {x, y}
    },
    signals: []
};

// UI state
let selectedAlternative = null;
let draggingPoint = null;
let hoverPoint = null;

// Colors
const colors = {
    primary: '#4A90D9',
    success: '#5cb85c',
    warning: '#f0ad4e',
    danger: '#dc3545',
    light: '#f5f5f5',
    dark: '#333',
    gray: '#999',
    ai: '#9b59b6',
    nonai: '#3498db',
    hybrid: '#e67e22'
};

// Sample problems data
const sampleProblems = {
    'customer-churn': {
        problem: 'Our SaaS platform is experiencing 15% monthly customer churn, significantly above the industry average of 5%. We need to identify at-risk customers and intervene before they cancel.',
        desired: 'Reduce monthly churn rate to 5% within 6 months by identifying and retaining at-risk customers through timely interventions.',
        components: [
            { name: 'Usage Pattern Analysis', priority: 'H' },
            { name: 'Customer Support Interactions', priority: 'H' },
            { name: 'Billing & Payment Behavior', priority: 'M' },
            { name: 'Feature Adoption Tracking', priority: 'M' }
        ],
        alternatives: [
            { name: 'ML Churn Prediction Model', tag: 'AI' },
            { name: 'Rule-Based Alert System', tag: 'Non-AI' },
            { name: 'Customer Health Score Dashboard', tag: 'Hybrid' },
            { name: 'Manual Account Reviews', tag: 'Non-AI' }
        ]
    },
    'content-moderation': {
        problem: 'Our user-generated content platform receives 50,000 posts daily. Manual moderation cannot keep up, and harmful content sometimes stays visible for hours.',
        desired: 'Achieve 99% harmful content removal within 5 minutes of posting while maintaining false positive rate below 1%.',
        components: [
            { name: 'Text Classification', priority: 'H' },
            { name: 'Image Analysis', priority: 'H' },
            { name: 'Context Understanding', priority: 'M' },
            { name: 'Appeal Processing', priority: 'L' }
        ],
        alternatives: [
            { name: 'LLM Content Classifier', tag: 'AI' },
            { name: 'Keyword Filtering', tag: 'Non-AI' },
            { name: 'AI + Human Review Pipeline', tag: 'Hybrid' },
            { name: 'Community Flagging System', tag: 'Non-AI' }
        ]
    },
    'inventory-optimization': {
        problem: 'Retail chain with 200 stores faces both stockouts (8% of SKUs) and overstock (23% excess inventory), resulting in $2M annual losses.',
        desired: 'Reduce stockouts to 2% and overstock to 10% within one year, saving $1.5M annually.',
        components: [
            { name: 'Demand Forecasting', priority: 'H' },
            { name: 'Supply Chain Visibility', priority: 'H' },
            { name: 'Store-Level Optimization', priority: 'M' },
            { name: 'Seasonal Adjustment', priority: 'M' }
        ],
        alternatives: [
            { name: 'ML Demand Prediction', tag: 'AI' },
            { name: 'Historical Average Model', tag: 'Non-AI' },
            { name: 'AI-Assisted Buyer Tools', tag: 'Hybrid' },
            { name: 'Vendor-Managed Inventory', tag: 'Non-AI' }
        ]
    }
};

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, canvasHeight);
    canvas.parent('canvas-container');

    textFont('Arial');

    // Set up step dot click handlers
    document.querySelectorAll('.step-dot').forEach(dot => {
        dot.addEventListener('click', function() {
            const step = parseInt(this.dataset.step);
            goToStep(step);
        });
    });

    describe('LOOP Framework Visualizer - Interactive problem framing wizard with 5 steps: Outcome, Deconstruction, Alternatives, Trade-offs, and Signals.', LABEL);
}

function draw() {
    background(255);

    // Draw based on current step
    switch(currentStep) {
        case 1:
            drawOutcomeVisualization();
            break;
        case 2:
            drawDeconstructionVisualization();
            break;
        case 3:
            drawAlternativesVisualization();
            break;
        case 4:
            drawTradeoffsVisualization();
            break;
        case 5:
            drawSignalsVisualization();
            break;
    }

    // Draw step label
    drawStepLabel();
}

function drawStepLabel() {
    const stepNames = ['', 'OUTCOME', 'DECONSTRUCTION', 'ALTERNATIVES', 'TRADE-OFFS', 'SIGNALS'];

    fill(colors.primary);
    noStroke();
    textSize(14);
    textAlign(LEFT, TOP);
    text(`Step ${currentStep}: ${stepNames[currentStep]}`, 15, 15);
}

// Step 1: Outcome Visualization
function drawOutcomeVisualization() {
    const centerX = containerWidth / 2;
    const centerY = canvasHeight / 2;

    // Draw outer glow
    noStroke();
    for (let i = 5; i > 0; i--) {
        fill(74, 144, 217, 20);
        ellipse(centerX, centerY, 200 + i * 20, 200 + i * 20);
    }

    // Draw main outcome node
    fill(colors.primary);
    stroke(255);
    strokeWeight(3);
    ellipse(centerX, centerY, 200, 200);

    // Draw text
    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(16);
    text('OUTCOME', centerX, centerY - 40);

    // Draw problem statement (truncated)
    textSize(11);
    const problemText = loopData.outcome.problem || 'Enter your problem statement...';
    const lines = wrapText(problemText, 160, 11);
    for (let i = 0; i < min(3, lines.length); i++) {
        text(lines[i], centerX, centerY - 10 + i * 14);
    }

    // Draw desired outcome below
    if (loopData.outcome.desired) {
        fill(colors.success);
        noStroke();
        textSize(10);
        text('Target:', centerX, centerY + 50);

        fill(255);
        textSize(11);
        const targetLines = wrapText(loopData.outcome.desired, 160, 11);
        for (let i = 0; i < min(2, targetLines.length); i++) {
            text(targetLines[i], centerX, centerY + 65 + i * 12);
        }
    }

    // Draw decorative elements
    drawLoopLetters(centerX, centerY);
}

function drawLoopLetters(cx, cy) {
    const letters = ['L', 'O', 'O', 'P'];
    const angles = [-PI/4, PI/4, 3*PI/4, 5*PI/4];
    const radius = 140;

    textSize(20);
    fill(colors.primary);
    noStroke();

    for (let i = 0; i < 4; i++) {
        const x = cx + cos(angles[i]) * radius;
        const y = cy + sin(angles[i]) * radius;

        fill(255);
        stroke(colors.primary);
        strokeWeight(2);
        ellipse(x, y, 36, 36);

        fill(colors.primary);
        noStroke();
        textAlign(CENTER, CENTER);
        text(letters[i], x, y);
    }
}

// Step 2: Deconstruction Visualization
function drawDeconstructionVisualization() {
    const centerX = containerWidth / 2;
    const centerY = 120;

    // Draw outcome node at top
    fill(colors.primary);
    stroke(255);
    strokeWeight(2);
    ellipse(centerX, centerY, 100, 60);

    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(12);
    text('OUTCOME', centerX, centerY);

    // Draw components as tree branches
    const components = loopData.components;
    if (components.length > 0) {
        const spacing = min(150, (containerWidth - 100) / components.length);
        const startX = centerX - (components.length - 1) * spacing / 2;
        const componentY = 280;

        for (let i = 0; i < components.length; i++) {
            const x = startX + i * spacing;
            const comp = components[i];

            // Draw connection line
            stroke(200);
            strokeWeight(2);
            line(centerX, centerY + 30, x, componentY - 40);

            // Draw component node
            const nodeColor = getPriorityColor(comp.priority);
            fill(nodeColor);
            stroke(255);
            strokeWeight(2);
            rectMode(CENTER);
            rect(x, componentY, 120, 70, 10);

            // Draw text
            fill(255);
            noStroke();
            textAlign(CENTER, CENTER);
            textSize(10);

            const compLines = wrapText(comp.name, 100, 10);
            for (let j = 0; j < min(2, compLines.length); j++) {
                text(compLines[j], x, componentY - 10 + j * 12);
            }

            // Draw priority badge
            fill(255);
            stroke(nodeColor);
            strokeWeight(1);
            ellipse(x + 50, componentY - 25, 24, 24);
            fill(nodeColor);
            noStroke();
            textSize(12);
            text(comp.priority, x + 50, componentY - 25);
        }
    } else {
        // Empty state
        fill(colors.gray);
        textAlign(CENTER, CENTER);
        textSize(14);
        text('Add components in the panel', centerX, 300);
    }

    // Draw priority legend
    drawPriorityLegend();
}

function getPriorityColor(priority) {
    switch(priority) {
        case 'H': return colors.danger;
        case 'M': return colors.warning;
        case 'L': return colors.success;
        default: return colors.gray;
    }
}

function drawPriorityLegend() {
    const startX = 20;
    const y = canvasHeight - 30;

    textSize(10);
    textAlign(LEFT, CENTER);

    const priorities = [
        { label: 'High Priority', color: colors.danger },
        { label: 'Medium Priority', color: colors.warning },
        { label: 'Low Priority', color: colors.success }
    ];

    let x = startX;
    for (const p of priorities) {
        fill(p.color);
        noStroke();
        ellipse(x + 6, y, 12, 12);
        fill(colors.dark);
        text(p.label, x + 16, y);
        x += 110;
    }
}

// Step 3: Alternatives Visualization
function drawAlternativesVisualization() {
    const alternatives = loopData.alternatives;

    if (alternatives.length === 0) {
        fill(colors.gray);
        textAlign(CENTER, CENTER);
        textSize(14);
        text('Add alternatives in the panel', containerWidth / 2, canvasHeight / 2);
        return;
    }

    const cardWidth = 130;
    const cardHeight = 160;
    const cardsPerRow = min(4, alternatives.length);
    const rows = ceil(alternatives.length / cardsPerRow);
    const startY = 80;

    for (let i = 0; i < alternatives.length; i++) {
        const row = floor(i / cardsPerRow);
        const col = i % cardsPerRow;

        const totalWidthThisRow = min(cardsPerRow, alternatives.length - row * cardsPerRow);
        const rowStartX = (containerWidth - totalWidthThisRow * (cardWidth + 20)) / 2 + cardWidth / 2;

        const x = rowStartX + col * (cardWidth + 20);
        const y = startY + row * (cardHeight + 30);

        const alt = alternatives[i];
        drawAlternativeCard(x, y, cardWidth, cardHeight, alt, i);
    }

    // Draw tag legend
    drawTagLegend();
}

function drawAlternativeCard(x, y, w, h, alt, index) {
    const tagColor = getTagColor(alt.tag);

    // Card shadow
    noStroke();
    fill(0, 20);
    rectMode(CENTER);
    rect(x + 3, y + 3, w, h, 8);

    // Card background
    fill(255);
    stroke(tagColor);
    strokeWeight(3);
    rect(x, y, w, h, 8);

    // Tag banner at top
    fill(tagColor);
    noStroke();
    rectMode(CORNER);
    rect(x - w/2, y - h/2, w, 30, 8, 8, 0, 0);

    // Tag text
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(11);
    text(alt.tag, x, y - h/2 + 15);

    // Alternative name
    fill(colors.dark);
    textSize(12);
    const nameLines = wrapText(alt.name, w - 20, 12);
    for (let i = 0; i < min(3, nameLines.length); i++) {
        text(nameLines[i], x, y + i * 16);
    }

    // Index number
    fill(colors.gray);
    textSize(10);
    text(`#${index + 1}`, x, y + h/2 - 15);
}

function getTagColor(tag) {
    switch(tag) {
        case 'AI': return colors.ai;
        case 'Non-AI': return colors.nonai;
        case 'Hybrid': return colors.hybrid;
        default: return colors.gray;
    }
}

function drawTagLegend() {
    const y = canvasHeight - 30;
    const startX = 20;

    textSize(10);
    textAlign(LEFT, CENTER);

    const tags = [
        { label: 'AI Solution', color: colors.ai },
        { label: 'Non-AI Solution', color: colors.nonai },
        { label: 'Hybrid Solution', color: colors.hybrid }
    ];

    let x = startX;
    for (const t of tags) {
        fill(t.color);
        noStroke();
        rect(x, y - 6, 12, 12, 2);
        fill(colors.dark);
        text(t.label, x + 16, y);
        x += 110;
    }
}

// Step 4: Trade-offs Visualization (2x2 Matrix)
function drawTradeoffsVisualization() {
    const margin = 60;
    const gridSize = min(containerWidth - margin * 2, canvasHeight - margin * 2 - 50);
    const gridX = (containerWidth - gridSize) / 2;
    const gridY = 50;

    // Draw grid background
    fill(250);
    stroke(200);
    strokeWeight(1);
    rectMode(CORNER);
    rect(gridX, gridY, gridSize, gridSize);

    // Draw quadrant colors
    noStroke();
    // Top-left: Low effort, High impact (green)
    fill(92, 184, 92, 50);
    rect(gridX, gridY, gridSize/2, gridSize/2);
    // Top-right: High effort, High impact (yellow)
    fill(240, 173, 78, 50);
    rect(gridX + gridSize/2, gridY, gridSize/2, gridSize/2);
    // Bottom-left: Low effort, Low impact (blue)
    fill(52, 152, 219, 50);
    rect(gridX, gridY + gridSize/2, gridSize/2, gridSize/2);
    // Bottom-right: High effort, Low impact (red)
    fill(220, 53, 69, 50);
    rect(gridX + gridSize/2, gridY + gridSize/2, gridSize/2, gridSize/2);

    // Draw grid lines
    stroke(200);
    strokeWeight(1);
    line(gridX + gridSize/2, gridY, gridX + gridSize/2, gridY + gridSize);
    line(gridX, gridY + gridSize/2, gridX + gridSize, gridY + gridSize/2);

    // Draw axes labels
    fill(colors.dark);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(12);

    // X-axis label
    text(loopData.tradeoffs.xLabel + ' →', gridX + gridSize/2, gridY + gridSize + 25);
    text('Low', gridX + 30, gridY + gridSize + 25);
    text('High', gridX + gridSize - 30, gridY + gridSize + 25);

    // Y-axis label
    push();
    translate(gridX - 25, gridY + gridSize/2);
    rotate(-PI/2);
    text(loopData.tradeoffs.yLabel + ' →', 0, 0);
    pop();
    text('Low', gridX - 25, gridY + gridSize - 30);
    text('High', gridX - 25, gridY + 30);

    // Draw quadrant labels
    textSize(10);
    fill(colors.success);
    text('Quick Wins', gridX + gridSize/4, gridY + 20);
    fill(colors.warning);
    text('Major Projects', gridX + 3*gridSize/4, gridY + 20);
    fill(colors.nonai);
    text('Fill-Ins', gridX + gridSize/4, gridY + gridSize - 20);
    fill(colors.danger);
    text('Avoid', gridX + 3*gridSize/4, gridY + gridSize - 20);

    // Draw alternative points
    const alternatives = loopData.alternatives;
    for (let i = 0; i < alternatives.length; i++) {
        const pos = loopData.tradeoffs.positions[i];
        if (pos) {
            const px = gridX + pos.x * gridSize;
            const py = gridY + (1 - pos.y) * gridSize; // Invert y for visual

            const tagColor = getTagColor(alternatives[i].tag);

            // Highlight if hovering
            if (hoverPoint === i || draggingPoint === i) {
                fill(tagColor);
                noStroke();
                ellipse(px, py, 40, 40);
                fill(255, 200);
                ellipse(px, py, 30, 30);
            }

            // Draw point
            fill(tagColor);
            stroke(255);
            strokeWeight(2);
            ellipse(px, py, 24, 24);

            // Draw number
            fill(255);
            noStroke();
            textSize(10);
            text(i + 1, px, py);

            // Draw label on hover
            if (hoverPoint === i || draggingPoint === i) {
                fill(colors.dark);
                textSize(10);
                const label = alternatives[i].name;
                const labelLines = wrapText(label, 100, 10);
                for (let j = 0; j < min(2, labelLines.length); j++) {
                    text(labelLines[j], px, py - 25 - (labelLines.length - 1 - j) * 12);
                }
            }
        }
    }

    // Draw selected alternative indicator
    if (selectedAlternative !== null) {
        fill(colors.primary);
        noStroke();
        textSize(11);
        textAlign(LEFT, TOP);
        text(`Selected: #${selectedAlternative + 1} - ${alternatives[selectedAlternative].name}`, 15, canvasHeight - 30);
        text('Click on the matrix to position', 15, canvasHeight - 15);
    }
}

// Step 5: Signals Visualization
function drawSignalsVisualization() {
    const signals = loopData.signals;

    if (signals.length === 0) {
        fill(colors.gray);
        textAlign(CENTER, CENTER);
        textSize(14);
        text('Add signals in the panel', containerWidth / 2, canvasHeight / 2);
        return;
    }

    const gaugeWidth = min(160, (containerWidth - 100) / min(3, signals.length));
    const gaugeHeight = 140;
    const startY = 80;

    // Group signals by type
    const signalsByType = {
        success: signals.filter(s => s.type === 'success'),
        kill: signals.filter(s => s.type === 'kill'),
        leading: signals.filter(s => s.type === 'leading')
    };

    let currentY = startY;

    for (const [type, typeSignals] of Object.entries(signalsByType)) {
        if (typeSignals.length === 0) continue;

        // Draw type header
        const typeColors = {
            success: colors.success,
            kill: colors.danger,
            leading: colors.warning
        };
        const typeLabels = {
            success: 'Success Signals (Green Light)',
            kill: 'Kill Signals (Red Light)',
            leading: 'Leading Indicators (Yellow Light)'
        };

        fill(typeColors[type]);
        noStroke();
        textAlign(LEFT, CENTER);
        textSize(14);
        text(typeLabels[type], 30, currentY);

        currentY += 30;

        // Draw gauges for this type
        const gaugesPerRow = min(3, typeSignals.length);
        const rowStartX = (containerWidth - gaugesPerRow * (gaugeWidth + 20)) / 2 + gaugeWidth / 2;

        for (let i = 0; i < typeSignals.length; i++) {
            const row = floor(i / gaugesPerRow);
            const col = i % gaugesPerRow;

            const x = rowStartX + col * (gaugeWidth + 20);
            const y = currentY + row * (gaugeHeight + 20) + gaugeHeight / 2;

            drawSignalGauge(x, y, gaugeWidth, gaugeHeight, typeSignals[i]);
        }

        currentY += ceil(typeSignals.length / gaugesPerRow) * (gaugeHeight + 20) + 20;
    }
}

function drawSignalGauge(x, y, w, h, signal) {
    const typeColors = {
        success: colors.success,
        kill: colors.danger,
        leading: colors.warning
    };
    const color = typeColors[signal.type];

    // Background
    fill(250);
    stroke(200);
    strokeWeight(1);
    rectMode(CENTER);
    rect(x, y, w, h, 8);

    // Signal name
    fill(colors.dark);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(10);

    const nameLines = wrapText(signal.name, w - 20, 10);
    for (let i = 0; i < min(2, nameLines.length); i++) {
        text(nameLines[i], x, y - h/2 + 20 + i * 12);
    }

    // Draw gauge arc
    const gaugeY = y + 10;
    const gaugeRadius = 45;

    noFill();
    stroke(230);
    strokeWeight(8);
    arc(x, gaugeY, gaugeRadius * 2, gaugeRadius * 2, PI, TWO_PI);

    // Colored portion (simulate a value around 70%)
    stroke(color);
    strokeWeight(8);
    const value = 0.7; // Placeholder value
    arc(x, gaugeY, gaugeRadius * 2, gaugeRadius * 2, PI, PI + PI * value);

    // Threshold marker
    const thresholdAngle = PI + PI * 0.5; // 50% threshold line
    const markerX = x + cos(thresholdAngle) * (gaugeRadius + 10);
    const markerY = gaugeY + sin(thresholdAngle) * (gaugeRadius + 10);

    fill(color);
    noStroke();
    triangle(markerX, markerY, markerX - 4, markerY - 8, markerX + 4, markerY - 8);

    // Threshold value
    fill(colors.dark);
    textSize(14);
    text(`${signal.threshold}${signal.unit}`, x, gaugeY + 15);

    // Type indicator
    fill(color);
    textSize(9);
    text(signal.type.toUpperCase(), x, y + h/2 - 15);
}

// Helper function to wrap text
function wrapText(txt, maxWidth, fontSize) {
    if (!txt) return [''];

    const words = txt.split(' ');
    const lines = [];
    let currentLine = '';

    textSize(fontSize);

    for (const word of words) {
        const testLine = currentLine ? currentLine + ' ' + word : word;
        if (textWidth(testLine) > maxWidth && currentLine) {
            lines.push(currentLine);
            currentLine = word;
        } else {
            currentLine = testLine;
        }
    }
    if (currentLine) {
        lines.push(currentLine);
    }

    return lines;
}

// Navigation functions
function goToStep(step) {
    if (step < 1 || step > 5) return;

    currentStep = step;
    updateStepIndicators();
    updatePanelVisibility();
    updateNavButtons();
    updateControlsFromData();
}

function nextStep() {
    if (currentStep < 5) {
        saveCurrentStepData();
        goToStep(currentStep + 1);
    }
}

function prevStep() {
    if (currentStep > 1) {
        saveCurrentStepData();
        goToStep(currentStep - 1);
    }
}

function updateStepIndicators() {
    document.querySelectorAll('.step-dot').forEach(dot => {
        const step = parseInt(dot.dataset.step);
        dot.classList.remove('active', 'completed');

        if (step === currentStep) {
            dot.classList.add('active');
        } else if (step < currentStep) {
            dot.classList.add('completed');
        }
    });
}

function updatePanelVisibility() {
    for (let i = 1; i <= 5; i++) {
        const panel = document.getElementById(`step${i}-panel`);
        if (panel) {
            panel.style.display = i === currentStep ? 'block' : 'none';
        }
    }
}

function updateNavButtons() {
    document.getElementById('prevBtn').disabled = currentStep === 1;
    document.getElementById('nextBtn').textContent = currentStep === 5 ? 'Complete' : 'Next';
}

// Data management functions
function saveCurrentStepData() {
    switch(currentStep) {
        case 1:
            loopData.outcome.problem = document.getElementById('problemStatement').value;
            loopData.outcome.desired = document.getElementById('desiredOutcome').value;
            break;
        // Other steps save data on add/remove
    }
}

function updateControlsFromData() {
    switch(currentStep) {
        case 1:
            document.getElementById('problemStatement').value = loopData.outcome.problem;
            document.getElementById('desiredOutcome').value = loopData.outcome.desired;
            break;
        case 2:
            updateComponentsList();
            break;
        case 3:
            updateAlternativesList();
            break;
        case 4:
            updateTradeoffsList();
            document.getElementById('xAxisLabel').value = loopData.tradeoffs.xLabel;
            document.getElementById('yAxisLabel').value = loopData.tradeoffs.yLabel;
            break;
        case 5:
            updateSignalsList();
            break;
    }
}

// Component functions
function addComponent() {
    const input = document.getElementById('newComponent');
    const priority = document.getElementById('componentPriority').value;

    if (input.value.trim()) {
        loopData.components.push({
            name: input.value.trim(),
            priority: priority
        });
        input.value = '';
        updateComponentsList();
    }
}

function removeComponent(index) {
    loopData.components.splice(index, 1);
    updateComponentsList();
}

function updateComponentsList() {
    const list = document.getElementById('componentsList');
    if (!list) return;

    list.innerHTML = loopData.components.map((comp, i) => `
        <div class="item-entry">
            <span><strong>[${comp.priority}]</strong> ${comp.name}</span>
            <button class="remove-btn" onclick="removeComponent(${i})">X</button>
        </div>
    `).join('');
}

// Alternative functions
function addAlternative() {
    const input = document.getElementById('newAlternative');
    const tag = document.getElementById('alternativeTag').value;

    if (input.value.trim()) {
        loopData.alternatives.push({
            name: input.value.trim(),
            tag: tag
        });
        input.value = '';
        updateAlternativesList();
    }
}

function removeAlternative(index) {
    loopData.alternatives.splice(index, 1);
    // Also remove from tradeoffs
    delete loopData.tradeoffs.positions[index];
    // Reindex positions
    const newPositions = {};
    for (const [key, val] of Object.entries(loopData.tradeoffs.positions)) {
        const oldIndex = parseInt(key);
        if (oldIndex > index) {
            newPositions[oldIndex - 1] = val;
        } else {
            newPositions[key] = val;
        }
    }
    loopData.tradeoffs.positions = newPositions;
    updateAlternativesList();
}

function updateAlternativesList() {
    const list = document.getElementById('alternativesList');
    if (!list) return;

    list.innerHTML = loopData.alternatives.map((alt, i) => `
        <div class="item-entry">
            <span><strong>[${alt.tag}]</strong> ${alt.name}</span>
            <button class="remove-btn" onclick="removeAlternative(${i})">X</button>
        </div>
    `).join('');
}

// Trade-off functions
function updateTradeoffsList() {
    const list = document.getElementById('tradeoffsList');
    if (!list) return;

    list.innerHTML = loopData.alternatives.map((alt, i) => {
        const pos = loopData.tradeoffs.positions[i];
        const posText = pos ? `(${(pos.x * 100).toFixed(0)}%, ${(pos.y * 100).toFixed(0)}%)` : '(not placed)';
        const selected = selectedAlternative === i ? 'style="background:#e3f2fd;"' : '';
        return `
            <div class="item-entry" ${selected} onclick="selectAlternative(${i})" style="cursor:pointer;">
                <span>#${i + 1} ${alt.name}</span>
                <span style="color:#999; font-size:10px;">${posText}</span>
            </div>
        `;
    }).join('');
}

function selectAlternative(index) {
    selectedAlternative = index;
    updateTradeoffsList();
}

function updateAxisLabels() {
    loopData.tradeoffs.xLabel = document.getElementById('xAxisLabel').value || 'Effort';
    loopData.tradeoffs.yLabel = document.getElementById('yAxisLabel').value || 'Impact';
}

// Signal functions
function addSignal() {
    const name = document.getElementById('signalName').value;
    const type = document.getElementById('signalType').value;
    const threshold = document.getElementById('signalThreshold').value;
    const unit = document.getElementById('signalUnit').value;

    if (name.trim() && threshold) {
        loopData.signals.push({
            name: name.trim(),
            type: type,
            threshold: parseFloat(threshold),
            unit: unit || ''
        });
        document.getElementById('signalName').value = '';
        document.getElementById('signalThreshold').value = '';
        document.getElementById('signalUnit').value = '';
        updateSignalsList();
    }
}

function removeSignal(index) {
    loopData.signals.splice(index, 1);
    updateSignalsList();
}

function updateSignalsList() {
    const list = document.getElementById('signalsList');
    if (!list) return;

    const typeColors = {
        success: '#5cb85c',
        kill: '#dc3545',
        leading: '#f0ad4e'
    };

    list.innerHTML = loopData.signals.map((sig, i) => `
        <div class="item-entry">
            <span>
                <span class="signal-type ${sig.type}"></span>
                ${sig.name}: ${sig.threshold}${sig.unit}
            </span>
            <button class="remove-btn" onclick="removeSignal(${i})">X</button>
        </div>
    `).join('');
}

// Sample problem loader
function loadSampleProblem() {
    const select = document.getElementById('sampleProblems');
    const sample = sampleProblems[select.value];

    if (sample) {
        document.getElementById('problemStatement').value = sample.problem;
        document.getElementById('desiredOutcome').value = sample.desired;
        loopData.outcome.problem = sample.problem;
        loopData.outcome.desired = sample.desired;

        // Also load components and alternatives
        loopData.components = [...sample.components];
        loopData.alternatives = [...sample.alternatives];

        // Reset tradeoffs and signals
        loopData.tradeoffs.positions = {};
        loopData.signals = [];
    }

    select.value = '';
}

// Mouse interaction for trade-offs
function mousePressed() {
    if (currentStep !== 4) return;

    const margin = 60;
    const gridSize = min(containerWidth - margin * 2, canvasHeight - margin * 2 - 50);
    const gridX = (containerWidth - gridSize) / 2;
    const gridY = 50;

    // Check if clicking on existing point
    for (let i = 0; i < loopData.alternatives.length; i++) {
        const pos = loopData.tradeoffs.positions[i];
        if (pos) {
            const px = gridX + pos.x * gridSize;
            const py = gridY + (1 - pos.y) * gridSize;

            if (dist(mouseX, mouseY, px, py) < 15) {
                draggingPoint = i;
                return;
            }
        }
    }

    // Check if clicking in grid area with a selected alternative
    if (selectedAlternative !== null &&
        mouseX >= gridX && mouseX <= gridX + gridSize &&
        mouseY >= gridY && mouseY <= gridY + gridSize) {

        const x = (mouseX - gridX) / gridSize;
        const y = 1 - (mouseY - gridY) / gridSize;

        loopData.tradeoffs.positions[selectedAlternative] = { x, y };
        selectedAlternative = null;
        updateTradeoffsList();
    }
}

function mouseDragged() {
    if (currentStep !== 4 || draggingPoint === null) return;

    const margin = 60;
    const gridSize = min(containerWidth - margin * 2, canvasHeight - margin * 2 - 50);
    const gridX = (containerWidth - gridSize) / 2;
    const gridY = 50;

    const x = constrain((mouseX - gridX) / gridSize, 0, 1);
    const y = constrain(1 - (mouseY - gridY) / gridSize, 0, 1);

    loopData.tradeoffs.positions[draggingPoint] = { x, y };
}

function mouseReleased() {
    if (draggingPoint !== null) {
        updateTradeoffsList();
    }
    draggingPoint = null;
}

function mouseMoved() {
    if (currentStep !== 4) {
        hoverPoint = null;
        return;
    }

    const margin = 60;
    const gridSize = min(containerWidth - margin * 2, canvasHeight - margin * 2 - 50);
    const gridX = (containerWidth - gridSize) / 2;
    const gridY = 50;

    hoverPoint = null;

    for (let i = 0; i < loopData.alternatives.length; i++) {
        const pos = loopData.tradeoffs.positions[i];
        if (pos) {
            const px = gridX + pos.x * gridSize;
            const py = gridY + (1 - pos.y) * gridSize;

            if (dist(mouseX, mouseY, px, py) < 15) {
                hoverPoint = i;
                break;
            }
        }
    }
}

// Responsive canvas
function windowResized() {
    updateCanvasSize();
    resizeCanvas(containerWidth, canvasHeight);
}

function updateCanvasSize() {
    const container = document.getElementById('canvas-container');
    if (container) {
        containerWidth = Math.floor(container.getBoundingClientRect().width);
        containerWidth = max(containerWidth, 400); // Minimum width
    } else {
        containerWidth = 600;
    }
}

// Input event listeners for real-time updates
document.addEventListener('DOMContentLoaded', function() {
    // Real-time updates for step 1
    const problemInput = document.getElementById('problemStatement');
    const outcomeInput = document.getElementById('desiredOutcome');

    if (problemInput) {
        problemInput.addEventListener('input', function() {
            loopData.outcome.problem = this.value;
        });
    }

    if (outcomeInput) {
        outcomeInput.addEventListener('input', function() {
            loopData.outcome.desired = this.value;
        });
    }

    // Allow Enter key to add items
    document.getElementById('newComponent')?.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') addComponent();
    });

    document.getElementById('newAlternative')?.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') addAlternative();
    });

    document.getElementById('signalUnit')?.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') addSignal();
    });
});
