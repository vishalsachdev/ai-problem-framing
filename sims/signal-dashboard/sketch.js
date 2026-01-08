// Signal Dashboard MicroSim
// Educational tool for AI project monitoring with success/kill/leading indicators

// Canvas dimensions - visualization only, controls in HTML
let canvasWidth = 700;
let canvasHeight = 580;
let margin = 12;

// Signal definitions
let signals = [
  {
    name: 'Model Accuracy',
    type: 'success',
    value: 82,
    target: 85,
    min: 0,
    max: 100,
    unit: '%',
    greenThreshold: 85,
    yellowThreshold: 70,
    higherIsBetter: true
  },
  {
    name: 'User Satisfaction',
    type: 'success',
    value: 3.8,
    target: 4.0,
    min: 0,
    max: 5,
    unit: '/5',
    greenThreshold: 4.0,
    yellowThreshold: 3.0,
    higherIsBetter: true
  },
  {
    name: 'Error Rate',
    type: 'kill',
    value: 4.2,
    target: 5,
    min: 0,
    max: 15,
    unit: '%',
    greenThreshold: 3,
    yellowThreshold: 5,
    higherIsBetter: false
  },
  {
    name: 'Cost Per Transaction',
    type: 'kill',
    value: 8.5,
    target: 10,
    min: 0,
    max: 25,
    unit: '$',
    greenThreshold: 8,
    yellowThreshold: 10,
    higherIsBetter: false
  },
  {
    name: 'Data Freshness',
    type: 'leading',
    value: 3,
    target: 7,
    min: 0,
    max: 30,
    unit: ' days',
    greenThreshold: 5,
    yellowThreshold: 10,
    higherIsBetter: false
  },
  {
    name: 'Team Velocity',
    type: 'leading',
    value: 24,
    target: 20,
    min: 0,
    max: 50,
    unit: ' pts',
    greenThreshold: 25,
    yellowThreshold: 15,
    higherIsBetter: true
  }
];

// Simulation state
let simulating = false;
let simFrame = 0;

// Colors
const COLORS = {
  success: '#2E8B57',
  kill: '#DC143C',
  leading: '#4169E1',
  green: '#22C55E',
  yellow: '#EAB308',
  red: '#EF4444',
  background: '#FFFFFF',
  text: '#1E293B',
  lightText: '#64748B'
};

function setup() {
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent('canvas-container');

  // Set up slider event listeners
  for (let i = 0; i < signals.length; i++) {
    const slider = document.getElementById('slider' + i);
    if (slider) {
      slider.addEventListener('input', function() {
        signals[i].value = parseFloat(this.value);
      });
    }
  }

  describe('Interactive signal dashboard showing 6 AI project monitoring signals with semi-circular gauges.', LABEL);
}

// Global functions for HTML buttons
window.toggleSimulation = function() {
  simulating = !simulating;
  const btn = document.getElementById('simBtn');
  if (btn) btn.textContent = simulating ? 'Stop' : 'Simulate';
};

window.resetSignals = function() {
  const defaults = [82, 3.8, 4.2, 8.5, 3, 24];
  for (let i = 0; i < signals.length; i++) {
    signals[i].value = defaults[i];
    const slider = document.getElementById('slider' + i);
    if (slider) slider.value = defaults[i];
  }
  simulating = false;
  simFrame = 0;
  const btn = document.getElementById('simBtn');
  if (btn) btn.textContent = 'Simulate';
};

function draw() {
  background(COLORS.background);

  // Handle simulation
  if (simulating) {
    simFrame++;
    if (simFrame % 10 === 0) {
      simulateTimeStep();
    }
  }

  // Title
  fill(COLORS.text);
  noStroke();
  textSize(22);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('Signal Dashboard', canvasWidth / 2, 12);
  textStyle(NORMAL);

  // Draw decision banner
  drawDecisionBanner();

  // Draw gauge tiles (2x3 grid)
  drawGaugeTiles();
}

function drawDecisionBanner() {
  let decision = calculateDecision();
  let bannerY = 45;
  let bannerHeight = 48;

  // Banner background
  let bgColor;
  if (decision.recommendation === 'PERSIST') {
    bgColor = color(34, 197, 94, 40);
  } else if (decision.recommendation === 'PIVOT') {
    bgColor = color(234, 179, 8, 40);
  } else {
    bgColor = color(239, 68, 68, 40);
  }

  fill(bgColor);
  noStroke();
  rect(margin, bannerY, canvasWidth - margin * 2, bannerHeight, 6);

  // Decision text
  textSize(20);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);

  if (decision.recommendation === 'PERSIST') {
    fill(COLORS.green);
  } else if (decision.recommendation === 'PIVOT') {
    fill(COLORS.yellow);
  } else {
    fill(COLORS.red);
  }

  text('Recommendation: ' + decision.recommendation, canvasWidth / 2, bannerY + bannerHeight / 2 - 7);

  // Confidence
  textSize(12);
  textStyle(NORMAL);
  fill(COLORS.lightText);
  text('Confidence: ' + decision.confidence + '%', canvasWidth / 2, bannerY + bannerHeight / 2 + 13);
}

function calculateDecision() {
  let greenCount = 0;
  let yellowCount = 0;
  let redCount = 0;
  let killRedCount = 0;

  for (let s of signals) {
    let status = getSignalStatus(s);
    if (status === 'green') greenCount++;
    else if (status === 'yellow') yellowCount++;
    else {
      redCount++;
      if (s.type === 'kill') killRedCount++;
    }
  }

  let recommendation, confidence;

  if (killRedCount >= 2 || (killRedCount >= 1 && redCount >= 3)) {
    recommendation = 'STOP';
    confidence = Math.min(95, 70 + killRedCount * 10 + redCount * 5);
  } else if (redCount >= 2 || (redCount >= 1 && yellowCount >= 2)) {
    recommendation = 'PIVOT';
    confidence = Math.min(90, 60 + redCount * 10 + yellowCount * 5);
  } else if (greenCount >= 4 && redCount === 0) {
    recommendation = 'PERSIST';
    confidence = Math.min(95, 70 + greenCount * 5);
  } else {
    recommendation = 'PIVOT';
    confidence = Math.max(50, 70 - yellowCount * 5 - redCount * 10);
  }

  return { recommendation, confidence };
}

function getSignalStatus(s) {
  if (s.higherIsBetter) {
    if (s.value >= s.greenThreshold) return 'green';
    if (s.value >= s.yellowThreshold) return 'yellow';
    return 'red';
  } else {
    if (s.value <= s.greenThreshold) return 'green';
    if (s.value <= s.yellowThreshold) return 'yellow';
    return 'red';
  }
}

function drawGaugeTiles() {
  let startY = 105;
  let tileWidth = (canvasWidth - margin * 3) / 2;
  let tileHeight = 150;
  let gap = margin;

  for (let i = 0; i < signals.length; i++) {
    let col = i % 2;
    let row = Math.floor(i / 2);
    let x = margin + col * (tileWidth + gap);
    let y = startY + row * (tileHeight + gap);

    drawGaugeTile(signals[i], x, y, tileWidth, tileHeight);
  }
}

function drawGaugeTile(s, x, y, w, h) {
  // Tile background
  fill(255);

  // Border color based on signal type
  if (s.type === 'success') {
    stroke(COLORS.success);
  } else if (s.type === 'kill') {
    stroke(COLORS.kill);
  } else {
    stroke(COLORS.leading);
  }
  strokeWeight(3);
  rect(x, y, w, h, 6);

  // Signal name
  fill(COLORS.text);
  noStroke();
  textSize(14);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text(s.name, x + w / 2, y + 10);
  textStyle(NORMAL);

  // Signal type badge
  textSize(10);
  if (s.type === 'success') {
    fill(COLORS.success);
    text('SUCCESS', x + w / 2, y + 28);
  } else if (s.type === 'kill') {
    fill(COLORS.kill);
    text('KILL', x + w / 2, y + 28);
  } else {
    fill(COLORS.leading);
    text('LEADING', x + w / 2, y + 28);
  }

  // Draw semi-circular gauge
  let gaugeX = x + w / 2;
  let gaugeY = y + h - 28;
  let gaugeRadius = 45;

  drawGauge(s, gaugeX, gaugeY, gaugeRadius);

  // Current value display
  let status = getSignalStatus(s);
  if (status === 'green') fill(COLORS.green);
  else if (status === 'yellow') fill(COLORS.yellow);
  else fill(COLORS.red);

  textSize(20);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);

  let displayValue = s.value;
  if (s.unit === '$') {
    text('$' + nf(displayValue, 0, 1), gaugeX, gaugeY - 12);
  } else if (s.unit === '%') {
    text(nf(displayValue, 0, 1) + '%', gaugeX, gaugeY - 12);
  } else {
    text(nf(displayValue, 0, 1) + s.unit, gaugeX, gaugeY - 12);
  }
  textStyle(NORMAL);

  // Target label
  fill(COLORS.lightText);
  textSize(9);
  let targetStr = 'Target: ';
  if (s.unit === '$') targetStr += '$' + s.target;
  else targetStr += s.target + s.unit;
  text(targetStr, gaugeX, gaugeY + 6);
}

function drawGauge(s, cx, cy, radius) {
  strokeWeight(10);
  noFill();

  // Red zone
  stroke(COLORS.red);
  if (s.higherIsBetter) {
    let redEnd = map(s.yellowThreshold, s.min, s.max, PI, 0);
    arc(cx, cy, radius * 2, radius * 2, redEnd, PI);
  } else {
    let redStart = map(s.yellowThreshold, s.min, s.max, PI, 0);
    arc(cx, cy, radius * 2, radius * 2, 0, redStart);
  }

  // Yellow zone
  stroke(COLORS.yellow);
  if (s.higherIsBetter) {
    let yellowStart = map(s.yellowThreshold, s.min, s.max, PI, 0);
    let yellowEnd = map(s.greenThreshold, s.min, s.max, PI, 0);
    arc(cx, cy, radius * 2, radius * 2, yellowEnd, yellowStart);
  } else {
    let yellowStart = map(s.greenThreshold, s.min, s.max, PI, 0);
    let yellowEnd = map(s.yellowThreshold, s.min, s.max, PI, 0);
    arc(cx, cy, radius * 2, radius * 2, yellowEnd, yellowStart);
  }

  // Green zone
  stroke(COLORS.green);
  if (s.higherIsBetter) {
    let greenEnd = map(s.greenThreshold, s.min, s.max, PI, 0);
    arc(cx, cy, radius * 2, radius * 2, 0, greenEnd);
  } else {
    let greenStart = map(s.greenThreshold, s.min, s.max, PI, 0);
    arc(cx, cy, radius * 2, radius * 2, greenStart, PI);
  }

  // Draw needle
  let angle = map(s.value, s.min, s.max, PI, 0);
  angle = constrain(angle, 0, PI);

  let needleLength = radius - 5;
  let needleX = cx + cos(angle) * needleLength;
  let needleY = cy - sin(angle) * needleLength;

  stroke('#1E293B');
  strokeWeight(2);
  line(cx, cy, needleX, needleY);

  // Needle center
  fill('#1E293B');
  noStroke();
  circle(cx, cy, 8);

  // Min/Max labels
  fill(COLORS.lightText);
  noStroke();
  textSize(8);
  textAlign(CENTER, TOP);
  text(s.min, cx - radius + 5, cy + 2);
  text(s.max, cx + radius - 5, cy + 2);
}

function simulateTimeStep() {
  for (let i = 0; i < signals.length; i++) {
    let s = signals[i];
    let change = random(-0.5, 0.5) * (s.max - s.min) / 50;

    if (s.name === 'Data Freshness') {
      change = Math.abs(change);
    }
    if (s.name === 'Model Accuracy' && s.value > 80) {
      change -= 0.1;
    }

    s.value = constrain(s.value + change, s.min, s.max);

    // Update HTML slider
    const slider = document.getElementById('slider' + i);
    if (slider) slider.value = s.value;
  }
}
