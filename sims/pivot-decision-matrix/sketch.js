// Pivot Decision Matrix MicroSim
// Interactive 2x2 matrix for multi-dimensional trade-off analysis

// Canvas and layout dimensions
let containerWidth;
let containerHeight = 550;
let canvasLeftMargin = 50;
let canvasTopMargin = 60;
let controlPanelWidth = 280;
let matrixSize;

// Data
let options = [];
let xAxisOptions = ['Impact', 'Value', 'Revenue', 'ROI'];
let yAxisOptions = ['Effort', 'Cost', 'Risk', 'Time'];
let currentXAxis = 'Impact';
let currentYAxis = 'Effort';
let showPareto = true;

// Interaction state
let draggedOption = null;
let dragOffsetX = 0;
let dragOffsetY = 0;
let hoveredOption = null;
let newOptionName = '';

// UI Elements
let xDropdown, yDropdown;
let paretoCheckbox;
let addButton, resetButton;
let nameInput;

// Colors for options
let optionColors = [
    { name: 'gray', hex: '#808080' },
    { name: 'purple', hex: '#9370DB' },
    { name: 'yellow', hex: '#FFD700' },
    { name: 'green', hex: '#32CD32' },
    { name: 'blue', hex: '#4169E1' },
    { name: 'coral', hex: '#FF7F50' },
    { name: 'teal', hex: '#20B2AA' },
    { name: 'pink', hex: '#FF69B4' }
];

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    var mainElement = document.querySelector('main');
    canvas.parent(mainElement);
    textFont('Arial');

    // Initialize default options
    initializeDefaultOptions();

    // Create UI elements
    createUIElements();
}

function initializeDefaultOptions() {
    options = [
        { name: 'Keep Current', x: 3, y: 3, color: optionColors[0].hex },
        { name: 'AI-Powered', x: 8, y: 7, color: optionColors[1].hex },
        { name: 'Hybrid Human+AI', x: 7, y: 5, color: optionColors[2].hex },
        { name: 'Rules-Based', x: 5, y: 2, color: optionColors[3].hex },
        { name: 'Outsource', x: 6, y: 4, color: optionColors[4].hex }
    ];
}

function createUIElements() {
    // Calculate control panel position
    let controlX = containerWidth - controlPanelWidth + 10;
    let controlY = 80;

    // X-Axis dropdown
    xDropdown = createSelect();
    xDropdown.parent(document.querySelector('main'));
    xDropdown.position(controlX, controlY);
    xDropdown.style('width', '120px');
    xDropdown.style('padding', '5px');
    xDropdown.style('font-size', '12px');
    for (let opt of xAxisOptions) {
        xDropdown.option(opt);
    }
    xDropdown.selected(currentXAxis);
    xDropdown.changed(() => {
        currentXAxis = xDropdown.value();
    });

    // Y-Axis dropdown
    yDropdown = createSelect();
    yDropdown.parent(document.querySelector('main'));
    yDropdown.position(controlX, controlY + 50);
    yDropdown.style('width', '120px');
    yDropdown.style('padding', '5px');
    yDropdown.style('font-size', '12px');
    for (let opt of yAxisOptions) {
        yDropdown.option(opt);
    }
    yDropdown.selected(currentYAxis);
    yDropdown.changed(() => {
        currentYAxis = yDropdown.value();
    });

    // Pareto checkbox
    paretoCheckbox = createCheckbox(' Show Pareto Frontier', true);
    paretoCheckbox.parent(document.querySelector('main'));
    paretoCheckbox.position(controlX, controlY + 100);
    paretoCheckbox.style('font-size', '12px');
    paretoCheckbox.changed(() => {
        showPareto = paretoCheckbox.checked();
    });

    // Name input for new options
    nameInput = createInput('');
    nameInput.parent(document.querySelector('main'));
    nameInput.position(controlX, controlY + 130);
    nameInput.style('width', '160px');
    nameInput.style('padding', '5px');
    nameInput.style('font-size', '12px');
    nameInput.attribute('placeholder', 'New option name...');

    // Add button
    addButton = createButton('Add Option');
    addButton.parent(document.querySelector('main'));
    addButton.position(controlX + 170, controlY + 130);
    addButton.style('padding', '5px 10px');
    addButton.style('font-size', '12px');
    addButton.style('cursor', 'pointer');
    addButton.mousePressed(addNewOption);

    // Reset button
    resetButton = createButton('Reset Positions');
    resetButton.parent(document.querySelector('main'));
    resetButton.position(controlX, controlY + 165);
    resetButton.style('padding', '5px 10px');
    resetButton.style('font-size', '12px');
    resetButton.style('cursor', 'pointer');
    resetButton.mousePressed(resetPositions);
}

function addNewOption() {
    let name = nameInput.value().trim();
    if (name && options.length < 8) {
        let colorIndex = options.length % optionColors.length;
        options.push({
            name: name,
            x: 5,
            y: 5,
            color: optionColors[colorIndex].hex
        });
        nameInput.value('');
    }
}

function resetPositions() {
    initializeDefaultOptions();
}

function draw() {
    background('#f8f9fa');

    // Calculate matrix area
    matrixSize = min(containerWidth - controlPanelWidth - 80, containerHeight - 120);
    let matrixX = canvasLeftMargin;
    let matrixY = canvasTopMargin;

    // Draw title
    fill('#333');
    noStroke();
    textSize(18);
    textStyle(BOLD);
    textAlign(LEFT, TOP);
    text('Pivot Decision Matrix', 10, 15);

    // Draw subtitle with axes
    textSize(12);
    textStyle(NORMAL);
    fill('#666');
    text(`${currentXAxis} vs ${currentYAxis}`, 10, 38);

    // Draw matrix background and quadrants
    drawMatrix(matrixX, matrixY, matrixSize);

    // Draw Pareto frontier if enabled
    if (showPareto) {
        drawParetoFrontier(matrixX, matrixY, matrixSize);
    }

    // Draw options
    drawOptions(matrixX, matrixY, matrixSize);

    // Draw control panel background
    drawControlPanel();

    // Draw options list
    drawOptionsList();

    // Draw tooltip if hovering
    if (hoveredOption !== null && draggedOption === null) {
        drawTooltip(hoveredOption);
    }
}

function drawMatrix(x, y, size) {
    // Matrix background
    stroke('#ccc');
    strokeWeight(1);
    fill('#fff');
    rect(x, y, size, size);

    // Quadrant backgrounds
    let halfSize = size / 2;

    // Top-left: Money Pits (red zone)
    fill('rgba(255, 200, 200, 0.5)');
    noStroke();
    rect(x, y, halfSize, halfSize);

    // Top-right: Big Bets (neutral)
    fill('rgba(240, 240, 240, 0.5)');
    rect(x + halfSize, y, halfSize, halfSize);

    // Bottom-left: Low Priority (neutral)
    fill('rgba(240, 240, 240, 0.5)');
    rect(x, y + halfSize, halfSize, halfSize);

    // Bottom-right: Quick Wins (green zone)
    fill('rgba(200, 255, 200, 0.5)');
    rect(x + halfSize, y + halfSize, halfSize, halfSize);

    // Grid lines
    stroke('#ddd');
    strokeWeight(1);
    for (let i = 1; i < 10; i++) {
        let pos = i * (size / 10);
        line(x + pos, y, x + pos, y + size);
        line(x, y + pos, x + size, y + pos);
    }

    // Center lines (thicker)
    stroke('#bbb');
    strokeWeight(2);
    line(x + halfSize, y, x + halfSize, y + size);
    line(x, y + halfSize, x + size, y + halfSize);

    // Quadrant labels
    textSize(11);
    textStyle(BOLD);
    noStroke();

    // Money Pits (top-left)
    fill('#c44');
    textAlign(LEFT, TOP);
    text('MONEY PITS', x + 8, y + 8);
    textStyle(NORMAL);
    textSize(9);
    fill('#888');
    text('Low impact, High effort', x + 8, y + 24);

    // Big Bets (top-right)
    textSize(11);
    textStyle(BOLD);
    fill('#666');
    textAlign(RIGHT, TOP);
    text('BIG BETS', x + size - 8, y + 8);
    textStyle(NORMAL);
    textSize(9);
    fill('#888');
    text('High impact, High effort', x + size - 8, y + 24);

    // Low Priority (bottom-left)
    textSize(11);
    textStyle(BOLD);
    fill('#888');
    textAlign(LEFT, BOTTOM);
    text('LOW PRIORITY', x + 8, y + size - 20);
    textStyle(NORMAL);
    textSize(9);
    text('Low impact, Low effort', x + 8, y + size - 8);

    // Quick Wins (bottom-right)
    textSize(11);
    textStyle(BOLD);
    fill('#2a2');
    textAlign(RIGHT, BOTTOM);
    text('QUICK WINS', x + size - 8, y + size - 20);
    textStyle(NORMAL);
    textSize(9);
    fill('#888');
    text('High impact, Low effort', x + size - 8, y + size - 8);

    // Axis labels
    textSize(12);
    textStyle(BOLD);
    fill('#333');

    // X-axis label
    textAlign(CENTER, TOP);
    text(currentXAxis + ' (0-10)', x + size/2, y + size + 25);

    // X-axis tick labels
    textSize(10);
    textStyle(NORMAL);
    fill('#666');
    for (let i = 0; i <= 10; i += 2) {
        let tickX = x + (i / 10) * size;
        text(i, tickX, y + size + 8);
    }

    // Y-axis label (rotated)
    push();
    translate(x - 35, y + size/2);
    rotate(-HALF_PI);
    textAlign(CENTER, BOTTOM);
    textSize(12);
    textStyle(BOLD);
    fill('#333');
    text(currentYAxis + ' (0-10)', 0, 0);
    pop();

    // Y-axis tick labels
    textSize(10);
    textStyle(NORMAL);
    fill('#666');
    textAlign(RIGHT, CENTER);
    for (let i = 0; i <= 10; i += 2) {
        let tickY = y + size - (i / 10) * size;
        text(i, x - 8, tickY);
    }

    // Border
    stroke('#999');
    strokeWeight(2);
    noFill();
    rect(x, y, size, size);
}

function drawParetoFrontier(matrixX, matrixY, size) {
    // Find Pareto-optimal points (maximize X, minimize Y for this view)
    let paretoPoints = [];

    for (let opt of options) {
        let isDominated = false;
        for (let other of options) {
            if (other !== opt) {
                // For Impact vs Effort: higher X is better, lower Y is better
                if (other.x >= opt.x && other.y <= opt.y &&
                    (other.x > opt.x || other.y < opt.y)) {
                    isDominated = true;
                    break;
                }
            }
        }
        if (!isDominated) {
            paretoPoints.push(opt);
        }
    }

    // Sort by X coordinate
    paretoPoints.sort((a, b) => a.x - b.x);

    // Draw the frontier line
    if (paretoPoints.length > 1) {
        stroke('#ff6b6b');
        strokeWeight(2);
        drawingContext.setLineDash([5, 5]);

        for (let i = 0; i < paretoPoints.length - 1; i++) {
            let x1 = matrixX + (paretoPoints[i].x / 10) * size;
            let y1 = matrixY + size - (paretoPoints[i].y / 10) * size;
            let x2 = matrixX + (paretoPoints[i + 1].x / 10) * size;
            let y2 = matrixY + size - (paretoPoints[i + 1].y / 10) * size;
            line(x1, y1, x2, y2);
        }

        drawingContext.setLineDash([]);
    }

    // Mark Pareto points with a star indicator
    for (let pt of paretoPoints) {
        let px = matrixX + (pt.x / 10) * size;
        let py = matrixY + size - (pt.y / 10) * size;

        fill('#ff6b6b');
        noStroke();
        // Small star above the circle
        push();
        translate(px, py - 25);
        drawStar(0, 0, 4, 8, 5);
        pop();
    }
}

function drawStar(x, y, radius1, radius2, npoints) {
    let angle = TWO_PI / npoints;
    let halfAngle = angle / 2.0;
    beginShape();
    for (let a = -HALF_PI; a < TWO_PI - HALF_PI; a += angle) {
        let sx = x + cos(a) * radius2;
        let sy = y + sin(a) * radius2;
        vertex(sx, sy);
        sx = x + cos(a + halfAngle) * radius1;
        sy = y + sin(a + halfAngle) * radius1;
        vertex(sx, sy);
    }
    endShape(CLOSE);
}

function drawOptions(matrixX, matrixY, size) {
    for (let i = 0; i < options.length; i++) {
        let opt = options[i];
        let px = matrixX + (opt.x / 10) * size;
        let py = matrixY + size - (opt.y / 10) * size;

        // Store screen position for interaction
        opt.screenX = px;
        opt.screenY = py;

        // Draw circle
        let isHovered = hoveredOption === i;
        let isDragged = draggedOption === i;

        // Shadow
        noStroke();
        fill('rgba(0,0,0,0.2)');
        ellipse(px + 2, py + 2, isDragged ? 44 : 40, isDragged ? 44 : 40);

        // Main circle
        stroke(isDragged || isHovered ? '#333' : '#fff');
        strokeWeight(isDragged || isHovered ? 3 : 2);
        fill(opt.color);
        ellipse(px, py, isDragged ? 44 : 40, isDragged ? 44 : 40);

        // Label
        fill('#333');
        noStroke();
        textSize(9);
        textStyle(BOLD);
        textAlign(CENTER, CENTER);

        // Truncate long names
        let displayName = opt.name;
        if (displayName.length > 10) {
            displayName = displayName.substring(0, 9) + '...';
        }

        // Draw text with background for readability
        let textW = textWidth(displayName) + 6;
        fill('rgba(255,255,255,0.9)');
        rect(px - textW/2, py + 22, textW, 14, 2);

        fill('#333');
        text(displayName, px, py + 28);
    }
}

function drawControlPanel() {
    let panelX = containerWidth - controlPanelWidth;

    // Panel background
    fill('#f0f0f0');
    stroke('#ddd');
    strokeWeight(1);
    rect(panelX, 0, controlPanelWidth, containerHeight);

    // Panel title
    fill('#333');
    noStroke();
    textSize(14);
    textStyle(BOLD);
    textAlign(LEFT, TOP);
    text('Controls', panelX + 10, 15);

    // Section labels
    textSize(11);
    textStyle(NORMAL);
    fill('#666');

    text('X-Axis Dimension:', panelX + 10, 65);
    text('Y-Axis Dimension:', panelX + 10, 115);
}

function drawOptionsList() {
    let panelX = containerWidth - controlPanelWidth;
    let listY = 210;

    // Section title
    fill('#333');
    noStroke();
    textSize(12);
    textStyle(BOLD);
    textAlign(LEFT, TOP);
    text('Options (' + options.length + '/8)', panelX + 10, listY);

    // Draw list
    textSize(10);
    textStyle(NORMAL);

    for (let i = 0; i < options.length; i++) {
        let opt = options[i];
        let itemY = listY + 25 + i * 35;

        // Color indicator
        fill(opt.color);
        stroke('#999');
        strokeWeight(1);
        ellipse(panelX + 20, itemY + 8, 12, 12);

        // Name
        fill('#333');
        noStroke();
        textAlign(LEFT, TOP);
        let displayName = opt.name;
        if (displayName.length > 15) {
            displayName = displayName.substring(0, 14) + '...';
        }
        text(displayName, panelX + 32, itemY);

        // Coordinates
        fill('#888');
        textSize(9);
        text(currentXAxis + ': ' + opt.x.toFixed(1) + ', ' + currentYAxis + ': ' + opt.y.toFixed(1), panelX + 32, itemY + 14);
        textSize(10);

        // Delete button (X)
        if (options.length > 2) {
            fill('#c44');
            textSize(12);
            textAlign(CENTER, CENTER);
            let delX = panelX + controlPanelWidth - 25;
            let delY = itemY + 8;

            // Check if mouse is over delete button
            if (mouseX > delX - 10 && mouseX < delX + 10 &&
                mouseY > delY - 10 && mouseY < delY + 10) {
                fill('#f00');
            }
            text('x', delX, delY);
            textSize(10);
        }
    }
}

function drawTooltip(optIndex) {
    let opt = options[optIndex];
    let tooltipX = opt.screenX + 30;
    let tooltipY = opt.screenY - 30;

    // Adjust if tooltip would go off screen
    let tooltipWidth = 160;
    let tooltipHeight = 70;

    if (tooltipX + tooltipWidth > containerWidth - controlPanelWidth) {
        tooltipX = opt.screenX - tooltipWidth - 10;
    }
    if (tooltipY < 10) {
        tooltipY = opt.screenY + 30;
    }

    // Background
    fill('rgba(0,0,0,0.85)');
    noStroke();
    rect(tooltipX, tooltipY, tooltipWidth, tooltipHeight, 5);

    // Content
    fill('#fff');
    textSize(11);
    textStyle(BOLD);
    textAlign(LEFT, TOP);
    text(opt.name, tooltipX + 10, tooltipY + 10);

    textStyle(NORMAL);
    textSize(10);
    fill('#ccc');
    text(currentXAxis + ': ' + opt.x.toFixed(1) + ' / 10', tooltipX + 10, tooltipY + 30);
    text(currentYAxis + ': ' + opt.y.toFixed(1) + ' / 10', tooltipX + 10, tooltipY + 45);
}

function mousePressed() {
    // Check if clicking on an option to drag
    for (let i = 0; i < options.length; i++) {
        let opt = options[i];
        let d = dist(mouseX, mouseY, opt.screenX, opt.screenY);
        if (d < 20) {
            draggedOption = i;
            dragOffsetX = opt.screenX - mouseX;
            dragOffsetY = opt.screenY - mouseY;
            return;
        }
    }

    // Check for delete button clicks
    let panelX = containerWidth - controlPanelWidth;
    let listY = 210;

    if (options.length > 2) {
        for (let i = 0; i < options.length; i++) {
            let itemY = listY + 25 + i * 35;
            let delX = panelX + controlPanelWidth - 25;
            let delY = itemY + 8;

            if (mouseX > delX - 10 && mouseX < delX + 10 &&
                mouseY > delY - 10 && mouseY < delY + 10) {
                options.splice(i, 1);
                return;
            }
        }
    }
}

function mouseDragged() {
    if (draggedOption !== null) {
        let opt = options[draggedOption];

        // Calculate new position
        let newX = mouseX + dragOffsetX;
        let newY = mouseY + dragOffsetY;

        // Convert to data coordinates
        let dataX = ((newX - canvasLeftMargin) / matrixSize) * 10;
        let dataY = 10 - ((newY - canvasTopMargin) / matrixSize) * 10;

        // Clamp to valid range
        opt.x = constrain(dataX, 0, 10);
        opt.y = constrain(dataY, 0, 10);
    }
}

function mouseReleased() {
    draggedOption = null;
}

function mouseMoved() {
    hoveredOption = null;

    // Check if hovering over an option
    for (let i = 0; i < options.length; i++) {
        let opt = options[i];
        if (opt.screenX && opt.screenY) {
            let d = dist(mouseX, mouseY, opt.screenX, opt.screenY);
            if (d < 20) {
                hoveredOption = i;
                break;
            }
        }
    }
}

function touchStarted() {
    mousePressed();
    return false;
}

function touchMoved() {
    mouseDragged();
    return false;
}

function touchEnded() {
    mouseReleased();
    return false;
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(containerWidth, containerHeight);

    // Reposition UI elements
    let controlX = containerWidth - controlPanelWidth + 10;
    let controlY = 80;

    xDropdown.position(controlX, controlY);
    yDropdown.position(controlX, controlY + 50);
    paretoCheckbox.position(controlX, controlY + 100);
    nameInput.position(controlX, controlY + 130);
    addButton.position(controlX + 170, controlY + 130);
    resetButton.position(controlX, controlY + 165);
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = max(Math.floor(container.width), 600);
}
