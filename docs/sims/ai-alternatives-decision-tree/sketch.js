// AI Alternatives Decision Tree MicroSim
// Interactive visualization for selecting AI vs non-AI solutions

// Canvas dimensions
let canvasWidth = 900;
let drawHeight = 500;
let controlWidth = 300;
let canvasHeight = drawHeight;
let margin = 20;

// Decision tree state
let currentQuestionIndex = 0;
let answers = [];
let showReasoning = true;

// Questions and options
const questions = [
    {
        id: 'data',
        question: 'Data Availability',
        fullQuestion: 'How much labeled training data do you have?',
        options: ['None', 'Limited (<1K)', 'Moderate (1K-10K)', 'Abundant (>10K)']
    },
    {
        id: 'pattern',
        question: 'Pattern Complexity',
        fullQuestion: 'How complex are the patterns in your problem?',
        options: ['Simple Rules', 'Multi-factor', 'Non-linear', 'Unknown']
    },
    {
        id: 'interpret',
        question: 'Interpretability Needs',
        fullQuestion: 'How important is explainability?',
        options: ['Critical', 'Helpful', 'Not Important']
    },
    {
        id: 'budget',
        question: 'Budget Constraint',
        fullQuestion: 'What is your budget range?',
        options: ['Low (<$10K)', 'Medium ($10K-$100K)', 'High (>$100K)']
    }
];

// Recommendations with colors and reasoning
const recommendations = {
    'rule-based': {
        name: 'Rule-Based System',
        color: '#4CAF50', // Green
        description: 'Use explicit business rules and decision trees. Best for well-understood, stable domains.',
        reasoning: 'Your constraints favor deterministic, explainable solutions without ML overhead.'
    },
    'traditional-ml': {
        name: 'Traditional ML',
        color: '#2196F3', // Blue
        description: 'Regression, decision trees, random forests. Good balance of performance and interpretability.',
        reasoning: 'Sufficient data and moderate complexity make classical ML algorithms effective.'
    },
    'deep-learning': {
        name: 'Deep Learning',
        color: '#9C27B0', // Purple
        description: 'Neural networks, transformers. For complex patterns with abundant data.',
        reasoning: 'Complex patterns and abundant data justify the investment in deep learning infrastructure.'
    },
    'hybrid': {
        name: 'Hybrid Approach',
        color: '#FFC107', // Yellow/Amber
        description: 'Combine rules for known patterns with ML for edge cases.',
        reasoning: 'Mixed requirements suggest combining rule-based stability with ML flexibility.'
    },
    'start-simpler': {
        name: 'Start Simpler',
        color: '#9E9E9E', // Gray
        description: 'Begin with heuristics or manual processes. Collect data before automating.',
        reasoning: 'Limited data or unclear patterns suggest building understanding before automation.'
    }
};

// Tree visualization
let treeNodes = [];
let treeEdges = [];
let pulsePhase = 0;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));
    buildTree();

    describe('Interactive decision tree for evaluating AI vs non-AI solution approaches. Answer questions about data, patterns, interpretability, and budget to receive recommendations.', LABEL);
}

function buildTree() {
    // Build tree structure for visualization
    treeNodes = [];
    treeEdges = [];

    let drawWidth = canvasWidth - controlWidth - margin * 2;
    let nodeWidth = 120;
    let nodeHeight = 40;
    let startX = margin + drawWidth / 2;
    let startY = 60;
    let levelHeight = 90;

    // Root node
    treeNodes.push({
        x: startX,
        y: startY,
        w: nodeWidth,
        h: nodeHeight,
        label: 'Start',
        level: -1,
        type: 'start'
    });

    // Question nodes (levels 0-3)
    for (let i = 0; i < questions.length; i++) {
        treeNodes.push({
            x: startX,
            y: startY + (i + 1) * levelHeight,
            w: nodeWidth + 20,
            h: nodeHeight,
            label: questions[i].question,
            level: i,
            type: 'question'
        });
    }

    // Recommendation nodes at bottom
    let recY = startY + (questions.length + 1) * levelHeight;
    let recKeys = Object.keys(recommendations);
    let recSpacing = drawWidth / (recKeys.length + 1);

    for (let i = 0; i < recKeys.length; i++) {
        let key = recKeys[i];
        treeNodes.push({
            x: margin + recSpacing * (i + 1),
            y: recY,
            w: nodeWidth,
            h: nodeHeight + 10,
            label: recommendations[key].name,
            level: questions.length,
            type: 'recommendation',
            recKey: key
        });
    }
}

function draw() {
    // Main drawing area
    fill('aliceblue');
    noStroke();
    rect(0, 0, canvasWidth - controlWidth, canvasHeight);

    // Control panel
    fill('#f5f5f5');
    rect(canvasWidth - controlWidth, 0, controlWidth, canvasHeight);

    // Divider line
    stroke('#ccc');
    strokeWeight(2);
    line(canvasWidth - controlWidth, 0, canvasWidth - controlWidth, canvasHeight);

    // Update pulse animation
    pulsePhase += 0.05;

    // Draw tree
    drawTree();

    // Draw control panel
    drawControls();

    // Draw recommendation if complete
    if (currentQuestionIndex >= questions.length) {
        drawFinalRecommendation();
    }
}

function drawTree() {
    let drawWidth = canvasWidth - controlWidth;

    // Title
    fill('#333');
    noStroke();
    textSize(20);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    text('AI Alternatives Decision Tree', drawWidth / 2, 15);
    textStyle(NORMAL);

    // Draw edges first (behind nodes)
    drawTreeEdges();

    // Draw nodes
    for (let node of treeNodes) {
        drawTreeNode(node);
    }
}

function drawTreeEdges() {
    // Draw connections between levels
    let activeLevel = currentQuestionIndex;

    // Connect start to first question
    if (treeNodes.length > 1) {
        let start = treeNodes[0];
        let q1 = treeNodes[1];

        let isActive = activeLevel >= 0;
        stroke(isActive ? '#333' : '#ccc');
        strokeWeight(isActive ? 2 : 1);
        line(start.x, start.y + start.h / 2, q1.x, q1.y - q1.h / 2);
    }

    // Connect questions
    for (let i = 1; i < questions.length; i++) {
        let q1 = treeNodes[i];
        let q2 = treeNodes[i + 1];

        let isActive = i < activeLevel;
        let isPending = i === activeLevel - 1;

        if (isActive || isPending) {
            stroke('#333');
            strokeWeight(2);
        } else {
            stroke('#ddd');
            strokeWeight(1);
        }

        line(q1.x, q1.y + q1.h / 2, q2.x, q2.y - q2.h / 2);
    }

    // Connect last question to recommendations
    if (activeLevel >= questions.length) {
        let lastQ = treeNodes[questions.length];
        let rec = getRecommendation();

        // Find the recommendation node
        for (let node of treeNodes) {
            if (node.type === 'recommendation' && node.recKey === rec) {
                stroke(recommendations[rec].color);
                strokeWeight(3);

                // Draw curved line to recommendation
                noFill();
                beginShape();
                vertex(lastQ.x, lastQ.y + lastQ.h / 2);
                quadraticVertex(lastQ.x, node.y - 30, node.x, node.y - node.h / 2);
                endShape();
            }
        }
    }
}

function drawTreeNode(node) {
    let isActive = false;
    let isPending = false;
    let isComplete = false;
    let isRecommended = false;

    if (node.type === 'start') {
        isComplete = currentQuestionIndex >= 0;
    } else if (node.type === 'question') {
        isActive = node.level === currentQuestionIndex;
        isComplete = node.level < currentQuestionIndex;
        isPending = node.level > currentQuestionIndex;
    } else if (node.type === 'recommendation') {
        let rec = getRecommendation();
        isRecommended = currentQuestionIndex >= questions.length && node.recKey === rec;
        isPending = currentQuestionIndex < questions.length;
    }

    // Node styling
    if (node.type === 'recommendation') {
        // Recommendation nodes
        if (isRecommended) {
            let pulse = sin(pulsePhase) * 0.2 + 0.8;
            fill(recommendations[node.recKey].color);
            stroke(recommendations[node.recKey].color);
            strokeWeight(3 + pulse * 2);
        } else if (isPending) {
            fill(255, 255, 255, 150);
            stroke('#ccc');
            strokeWeight(1);
        } else {
            fill(255, 255, 255, 100);
            stroke('#ddd');
            strokeWeight(1);
        }

        rect(node.x - node.w / 2, node.y - node.h / 2, node.w, node.h, 8);

        // Text
        if (isRecommended) {
            fill('white');
        } else {
            fill(isPending ? '#999' : '#666');
        }
    } else if (node.type === 'start') {
        // Start node (hexagon-like)
        fill(isComplete ? '#4CAF50' : '#e0e0e0');
        stroke(isComplete ? '#388E3C' : '#bbb');
        strokeWeight(2);
        ellipse(node.x, node.y, node.w * 0.6, node.h);
        fill(isComplete ? 'white' : '#666');
    } else {
        // Question nodes
        if (isActive) {
            let pulse = sin(pulsePhase) * 0.15 + 0.85;
            fill(255, 235, 180);
            stroke('#FFA000');
            strokeWeight(2 + pulse * 2);
        } else if (isComplete) {
            fill('#C8E6C9');
            stroke('#4CAF50');
            strokeWeight(2);
        } else {
            fill(255, 255, 255, 150);
            stroke('#ccc');
            strokeWeight(1);
        }

        // Hexagon shape for decision nodes
        drawHexagon(node.x, node.y, node.w, node.h);

        fill(isPending ? '#999' : '#333');
    }

    // Node label
    noStroke();
    textSize(11);
    textAlign(CENTER, CENTER);

    // Wrap text for recommendation nodes
    if (node.type === 'recommendation') {
        let words = node.label.split(' ');
        if (words.length > 1) {
            textSize(10);
            text(words[0], node.x, node.y - 7);
            text(words.slice(1).join(' '), node.x, node.y + 7);
        } else {
            text(node.label, node.x, node.y);
        }
    } else {
        text(node.label, node.x, node.y);
    }

    // Show answer for completed questions
    if (node.type === 'question' && isComplete && answers[node.level] !== undefined) {
        fill('#666');
        textSize(9);
        let answerText = questions[node.level].options[answers[node.level]];
        text(answerText, node.x, node.y + node.h / 2 + 12);
    }
}

function drawHexagon(x, y, w, h) {
    let hw = w / 2;
    let hh = h / 2;
    let indent = 15;

    beginShape();
    vertex(x - hw + indent, y - hh);
    vertex(x + hw - indent, y - hh);
    vertex(x + hw, y);
    vertex(x + hw - indent, y + hh);
    vertex(x - hw + indent, y + hh);
    vertex(x - hw, y);
    endShape(CLOSE);
}

function drawControls() {
    let panelX = canvasWidth - controlWidth + margin;
    let panelW = controlWidth - margin * 2;
    let yPos = margin;

    // Panel title
    fill('#333');
    noStroke();
    textSize(16);
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    text('Decision Criteria', panelX, yPos);
    textStyle(NORMAL);
    yPos += 30;

    // Current question or completion message
    if (currentQuestionIndex < questions.length) {
        let q = questions[currentQuestionIndex];

        // Question number
        fill('#666');
        textSize(12);
        text('Question ' + (currentQuestionIndex + 1) + ' of ' + questions.length, panelX, yPos);
        yPos += 20;

        // Question text
        fill('#333');
        textSize(14);
        textStyle(BOLD);
        text(q.fullQuestion, panelX, yPos, panelW);
        textStyle(NORMAL);
        yPos += 45;

        // Options (drawn as buttons)
        for (let i = 0; i < q.options.length; i++) {
            drawOptionButton(panelX, yPos, panelW, 35, q.options[i], i);
            yPos += 42;
        }
    } else {
        // Completion message
        fill('#4CAF50');
        textSize(14);
        textStyle(BOLD);
        text('Analysis Complete!', panelX, yPos);
        textStyle(NORMAL);
        yPos += 25;

        fill('#666');
        textSize(12);
        text('See recommendation below.', panelX, yPos);
        yPos += 30;
    }

    // Separator
    yPos += 10;
    stroke('#ddd');
    strokeWeight(1);
    line(panelX, yPos, panelX + panelW, yPos);
    yPos += 20;

    // Back button
    if (currentQuestionIndex > 0 || answers.length > 0) {
        drawButton(panelX, yPos, 80, 30, 'Back', 'back');
    }

    // Reset button
    drawButton(panelX + 90, yPos, 80, 30, 'Reset', 'reset');

    yPos += 45;

    // Show reasoning toggle
    fill('#666');
    noStroke();
    textSize(12);
    textAlign(LEFT, CENTER);

    // Checkbox
    stroke('#999');
    strokeWeight(1);
    fill(showReasoning ? '#4CAF50' : 'white');
    rect(panelX, yPos, 16, 16, 3);

    if (showReasoning) {
        stroke('white');
        strokeWeight(2);
        line(panelX + 3, yPos + 8, panelX + 7, yPos + 12);
        line(panelX + 7, yPos + 12, panelX + 13, yPos + 4);
    }

    fill('#333');
    noStroke();
    text('Show Reasoning', panelX + 24, yPos + 8);

    // Progress indicator
    yPos = canvasHeight - 60;
    fill('#666');
    textSize(11);
    textAlign(LEFT, TOP);
    text('Progress:', panelX, yPos);

    // Progress bar
    yPos += 18;
    fill('#e0e0e0');
    noStroke();
    rect(panelX, yPos, panelW, 8, 4);

    let progress = currentQuestionIndex / questions.length;
    if (currentQuestionIndex >= questions.length) progress = 1;
    fill('#4CAF50');
    rect(panelX, yPos, panelW * progress, 8, 4);

    // Answer summary
    yPos += 20;
    fill('#999');
    textSize(10);
    for (let i = 0; i < answers.length && i < questions.length; i++) {
        let summary = questions[i].question + ': ' + questions[i].options[answers[i]];
        text(summary, panelX, yPos);
        yPos += 14;
    }
}

function drawOptionButton(x, y, w, h, label, index) {
    let isHover = mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h;

    if (isHover) {
        fill('#e3f2fd');
        stroke('#2196F3');
        cursor(HAND);
    } else {
        fill('white');
        stroke('#ccc');
    }

    strokeWeight(isHover ? 2 : 1);
    rect(x, y, w, h, 5);

    fill('#333');
    noStroke();
    textSize(13);
    textAlign(LEFT, CENTER);
    text(label, x + 12, y + h / 2);
}

function drawButton(x, y, w, h, label, action) {
    let isHover = mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h;

    if (action === 'reset') {
        if (isHover) {
            fill('#ffebee');
            stroke('#f44336');
        } else {
            fill('#fafafa');
            stroke('#ccc');
        }
    } else {
        if (isHover) {
            fill('#e3f2fd');
            stroke('#2196F3');
        } else {
            fill('#fafafa');
            stroke('#ccc');
        }
    }

    if (isHover) cursor(HAND);

    strokeWeight(isHover ? 2 : 1);
    rect(x, y, w, h, 5);

    fill('#333');
    noStroke();
    textSize(12);
    textAlign(CENTER, CENTER);
    text(label, x + w / 2, y + h / 2);
}

function drawFinalRecommendation() {
    let rec = getRecommendation();
    let recData = recommendations[rec];

    let drawWidth = canvasWidth - controlWidth;
    let boxW = drawWidth - margin * 4;
    let boxH = showReasoning ? 100 : 70;
    let boxX = margin * 2;
    let boxY = canvasHeight - boxH - margin;

    // Background
    fill(255, 255, 255, 240);
    stroke(recData.color);
    strokeWeight(3);
    rect(boxX, boxY, boxW, boxH, 10);

    // Title
    fill(recData.color);
    noStroke();
    textSize(18);
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    text('Recommendation: ' + recData.name, boxX + 15, boxY + 12);
    textStyle(NORMAL);

    // Description
    fill('#333');
    textSize(12);
    text(recData.description, boxX + 15, boxY + 38, boxW - 30);

    // Reasoning
    if (showReasoning) {
        fill('#666');
        textSize(11);
        textStyle(ITALIC);
        text('Reasoning: ' + recData.reasoning, boxX + 15, boxY + 70, boxW - 30);
        textStyle(NORMAL);
    }
}

function getRecommendation() {
    // Decision logic based on answers
    if (answers.length < questions.length) {
        return 'start-simpler';
    }

    let data = answers[0];        // 0: None, 1: Limited, 2: Moderate, 3: Abundant
    let pattern = answers[1];     // 0: Simple, 1: Multi-factor, 2: Non-linear, 3: Unknown
    let interpret = answers[2];   // 0: Critical, 1: Helpful, 2: Not Important
    let budget = answers[3];      // 0: Low, 1: Medium, 2: High

    // No data scenarios
    if (data === 0) {
        if (pattern === 0) return 'rule-based';
        return 'start-simpler';
    }

    // Limited data
    if (data === 1) {
        if (pattern === 0) return 'rule-based';
        if (pattern === 1 && interpret <= 1) return 'rule-based';
        if (budget === 0) return 'start-simpler';
        return 'hybrid';
    }

    // Moderate data
    if (data === 2) {
        if (pattern === 0) return 'rule-based';
        if (pattern === 1) {
            if (interpret === 0) return 'traditional-ml';
            return budget >= 1 ? 'traditional-ml' : 'hybrid';
        }
        if (pattern === 2) {
            if (interpret === 0) return 'hybrid';
            return budget >= 1 ? 'traditional-ml' : 'hybrid';
        }
        if (pattern === 3) return 'hybrid';
    }

    // Abundant data
    if (data === 3) {
        if (pattern === 0) return 'rule-based';
        if (pattern === 1) return 'traditional-ml';
        if (pattern === 2) {
            if (interpret === 0) return 'hybrid';
            if (budget === 0) return 'traditional-ml';
            if (budget === 1) return 'traditional-ml';
            return 'deep-learning';
        }
        if (pattern === 3) {
            if (interpret === 0) return 'hybrid';
            if (budget >= 2) return 'deep-learning';
            return 'traditional-ml';
        }
    }

    return 'hybrid';
}

function mousePressed() {
    let panelX = canvasWidth - controlWidth + margin;
    let panelW = controlWidth - margin * 2;

    // Check option buttons
    if (currentQuestionIndex < questions.length) {
        let yPos = margin + 30 + 20 + 45;
        let q = questions[currentQuestionIndex];

        for (let i = 0; i < q.options.length; i++) {
            if (mouseX > panelX && mouseX < panelX + panelW &&
                mouseY > yPos && mouseY < yPos + 35) {
                selectOption(i);
                return;
            }
            yPos += 42;
        }
    }

    // Check Back button
    let buttonY = currentQuestionIndex < questions.length ?
        margin + 30 + 20 + 45 + questions[currentQuestionIndex].options.length * 42 + 30 :
        margin + 30 + 25 + 30 + 30;

    if (mouseX > panelX && mouseX < panelX + 80 &&
        mouseY > buttonY && mouseY < buttonY + 30) {
        goBack();
        return;
    }

    // Check Reset button
    if (mouseX > panelX + 90 && mouseX < panelX + 170 &&
        mouseY > buttonY && mouseY < buttonY + 30) {
        resetTree();
        return;
    }

    // Check reasoning toggle
    let toggleY = buttonY + 45;
    if (mouseX > panelX && mouseX < panelX + 100 &&
        mouseY > toggleY && mouseY < toggleY + 20) {
        showReasoning = !showReasoning;
        return;
    }
}

function selectOption(optionIndex) {
    answers[currentQuestionIndex] = optionIndex;
    currentQuestionIndex++;
}

function goBack() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        answers = answers.slice(0, currentQuestionIndex);
    }
}

function resetTree() {
    currentQuestionIndex = 0;
    answers = [];
}

function mouseMoved() {
    cursor(AUTO);
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    buildTree();
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = Math.max(container.offsetWidth, 600);
        canvasWidth = Math.min(canvasWidth, 1200);
    }
}
