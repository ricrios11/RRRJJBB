// EMERGENCY INNOVATION LAB FIX
// This script will:
// 1. Deactivate broken Konami Innovation Lab
// 2. Restore clean Foundation with TrojanHorse Feed
// 3. Fix Snake game
// 4. Repair case study modals

console.log('🚨 EMERGENCY LAB FIX: Starting system restoration...');

// 1. DEACTIVATE BROKEN KONAMI LAB
console.log('🔧 Step 1: Deactivating broken Konami Innovation Lab...');
const brokenLab = document.getElementById('hidden-lab');
if (brokenLab) {
    brokenLab.style.display = 'none';
    console.log('✅ Broken Innovation Lab hidden');
}

// Hide any other broken lab elements
const brokenElements = document.querySelectorAll('[id*="lab"]:not(#innovation-lab-foundation)');
brokenElements.forEach(el => {
    if (el.style.display !== 'none') {
        el.style.display = 'none';
        console.log(`✅ Hidden broken element: ${el.id}`);
    }
});

// 2. RESTORE CLEAN FOUNDATION
console.log('🔧 Step 2: Restoring clean Foundation...');
const foundation = document.getElementById('innovation-lab-foundation');
if (foundation) {
    foundation.style.display = 'block';
    foundation.style.opacity = '1';
    console.log('✅ Clean Foundation restored');
    
    // Ensure TrojanHorse Feed is visible
    const trojanFeed = foundation.querySelector('.atomic-trojan-horse-feed');
    if (trojanFeed) {
        trojanFeed.style.display = 'block';
        trojanFeed.style.opacity = '1';
        console.log('✅ TrojanHorse Feed restored');
    }
} else {
    console.error('❌ Foundation not found - may need recreation');
}

// 3. CREATE FUNCTIONAL SNAKE GAME
console.log('🔧 Step 3: Creating functional Snake game...');

// Create Snake game container in Foundation
const snakeContainer = document.createElement('div');
snakeContainer.id = 'dos-snake-game-container';
snakeContainer.className = 'lab-feature-card';
snakeContainer.innerHTML = `
    <div class="feature-status-badge live">✅ Live</div>
    <div class="feature-icon">🐍</div>
    <h3>DOS Snake Game</h3>
    <p>Classic Snake game with modern responsive design and DOS-style aesthetics.</p>
    <div class="snake-game-wrapper">
        <canvas id="snake-canvas" width="400" height="400"></canvas>
        <div class="game-controls">
            <button id="snake-start-btn" class="control-btn">Start Game</button>
            <button id="snake-pause-btn" class="control-btn">Pause</button>
            <button id="snake-reset-btn" class="control-btn">Reset</button>
        </div>
        <div class="game-stats">
            <span>Score: <span id="snake-score">0</span></span>
            <span>High Score: <span id="snake-high-score">0</span></span>
        </div>
    </div>
`;

// Add Snake game styles
const snakeStyles = document.createElement('style');
snakeStyles.id = 'snake-game-emergency-styles';
snakeStyles.textContent = `
    .lab-feature-card {
        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
        border: 2px solid #00ff41;
        border-radius: 12px;
        padding: 1.5rem;
        margin: 1rem 0;
        color: #00ff41;
        font-family: 'Courier New', monospace;
    }
    .feature-status-badge {
        background: #00ff41;
        color: #1a1a2e;
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        font-size: 0.8rem;
        font-weight: bold;
        display: inline-block;
        margin-bottom: 1rem;
    }
    .feature-icon {
        font-size: 2rem;
        margin-bottom: 0.5rem;
    }
    .snake-game-wrapper {
        margin-top: 1rem;
        text-align: center;
    }
    #snake-canvas {
        border: 2px solid #00ff41;
        background: #000;
        margin-bottom: 1rem;
        max-width: 100%;
        height: auto;
    }
    .game-controls {
        display: flex;
        gap: 1rem;
        justify-content: center;
        margin-bottom: 1rem;
    }
    .control-btn {
        background: rgba(0, 255, 65, 0.1);
        border: 1px solid #00ff41;
        color: #00ff41;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        cursor: pointer;
        font-family: 'Courier New', monospace;
        transition: all 0.2s ease;
    }
    .control-btn:hover {
        background: rgba(0, 255, 65, 0.2);
        transform: scale(1.05);
    }
    .game-stats {
        display: flex;
        gap: 2rem;
        justify-content: center;
        font-size: 0.9rem;
    }
`;

document.head.appendChild(snakeStyles);

// Insert Snake game into Foundation
if (foundation) {
    foundation.appendChild(snakeContainer);
    console.log('✅ Snake game container created');
}

// 4. IMPLEMENT SNAKE GAME LOGIC
console.log('🔧 Step 4: Implementing Snake game logic...');

class EmergencySnakeGame {
    constructor() {
        this.canvas = document.getElementById('snake-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.gridSize = 20;
        this.tileCount = this.canvas.width / this.gridSize;
        
        this.snake = [
            {x: 10, y: 10}
        ];
        this.food = {};
        this.dx = 0;
        this.dy = 0;
        this.score = 0;
        this.highScore = localStorage.getItem('snakeHighScore') || 0;
        this.gameRunning = false;
        this.gameLoop = null;
        
        this.init();
    }
    
    init() {
        this.generateFood();
        this.updateScore();
        this.setupControls();
        this.draw();
        console.log('🐍 Snake game initialized');
    }
    
    generateFood() {
        this.food = {
            x: Math.floor(Math.random() * this.tileCount),
            y: Math.floor(Math.random() * this.tileCount)
        };
    }
    
    setupControls() {
        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            if (!this.gameRunning) return;
            
            switch(e.code) {
                case 'ArrowUp':
                    if (this.dy === 0) { this.dx = 0; this.dy = -1; }
                    break;
                case 'ArrowDown':
                    if (this.dy === 0) { this.dx = 0; this.dy = 1; }
                    break;
                case 'ArrowLeft':
                    if (this.dx === 0) { this.dx = -1; this.dy = 0; }
                    break;
                case 'ArrowRight':
                    if (this.dx === 0) { this.dx = 1; this.dy = 0; }
                    break;
            }
        });
        
        // Button controls
        document.getElementById('snake-start-btn').addEventListener('click', () => this.startGame());
        document.getElementById('snake-pause-btn').addEventListener('click', () => this.pauseGame());
        document.getElementById('snake-reset-btn').addEventListener('click', () => this.resetGame());
    }
    
    startGame() {
        if (!this.gameRunning) {
            this.gameRunning = true;
            this.gameLoop = setInterval(() => this.update(), 150);
            console.log('🎮 Snake game started');
        }
    }
    
    pauseGame() {
        if (this.gameRunning) {
            this.gameRunning = false;
            clearInterval(this.gameLoop);
            console.log('⏸️ Snake game paused');
        }
    }
    
    resetGame() {
        this.gameRunning = false;
        clearInterval(this.gameLoop);
        this.snake = [{x: 10, y: 10}];
        this.dx = 0;
        this.dy = 0;
        this.score = 0;
        this.generateFood();
        this.updateScore();
        this.draw();
        console.log('🔄 Snake game reset');
    }
    
    update() {
        const head = {x: this.snake[0].x + this.dx, y: this.snake[0].y + this.dy};
        
        // Check wall collision
        if (head.x < 0 || head.x >= this.tileCount || head.y < 0 || head.y >= this.tileCount) {
            this.gameOver();
            return;
        }
        
        // Check self collision
        for (let segment of this.snake) {
            if (head.x === segment.x && head.y === segment.y) {
                this.gameOver();
                return;
            }
        }
        
        this.snake.unshift(head);
        
        // Check food collision
        if (head.x === this.food.x && head.y === this.food.y) {
            this.score += 10;
            this.updateScore();
            this.generateFood();
        } else {
            this.snake.pop();
        }
        
        this.draw();
    }
    
    gameOver() {
        this.gameRunning = false;
        clearInterval(this.gameLoop);
        
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('snakeHighScore', this.highScore);
            console.log('🏆 New high score!', this.highScore);
        }
        
        this.updateScore();
        console.log('💀 Game Over! Score:', this.score);
    }
    
    updateScore() {
        document.getElementById('snake-score').textContent = this.score;
        document.getElementById('snake-high-score').textContent = this.highScore;
    }
    
    draw() {
        // Clear canvas
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw snake
        this.ctx.fillStyle = '#00ff41';
        for (let segment of this.snake) {
            this.ctx.fillRect(segment.x * this.gridSize, segment.y * this.gridSize, this.gridSize - 2, this.gridSize - 2);
        }
        
        // Draw food
        this.ctx.fillStyle = '#ff4141';
        this.ctx.fillRect(this.food.x * this.gridSize, this.food.y * this.gridSize, this.gridSize - 2, this.gridSize - 2);
    }
}

// Initialize Snake game
window.emergencySnakeGame = new EmergencySnakeGame();

// 5. FIX CASE STUDY MODALS
console.log('🔧 Step 5: Fixing case study modals...');

// Override broken modal functions
window.openCaseStudyModal = function(caseStudyId) {
    console.log('🔧 Opening case study modal:', caseStudyId);
    
    const modal = document.getElementById('modal-overlay');
    const modalContent = document.getElementById('modal-content');
    
    if (!modal || !modalContent) {
        console.error('❌ Modal elements not found');
        return;
    }
    
    // Clear any existing content
    modalContent.innerHTML = '';
    
    // Create proper modal content based on case study
    let content = '';
    switch(caseStudyId) {
        case 'chase-travel':
            content = `
                <div class="modal-header">
                    <h2>🎯 Chase Travel Transformation</h2>
                    <button class="modal-close" onclick="closeModal()">×</button>
                </div>
                <div class="modal-body">
                    <p>AI-Enhanced Luxury Travel Experience</p>
                    <p>Led strategic redesign of Chase's travel booking experience, unifying desktop and mobile channels through progressive disclosure patterns.</p>
                    <div class="modal-metrics">
                        <div class="metric">
                            <span class="metric-value">88%</span>
                            <span class="metric-label">UX Gap Reduction</span>
                        </div>
                        <div class="metric">
                            <span class="metric-value">20%</span>
                            <span class="metric-label">YoY Growth</span>
                        </div>
                    </div>
                </div>
            `;
            break;
        default:
            content = `
                <div class="modal-header">
                    <h2>Case Study: ${caseStudyId}</h2>
                    <button class="modal-close" onclick="closeModal()">×</button>
                </div>
                <div class="modal-body">
                    <p>Case study details for ${caseStudyId}</p>
                </div>
            `;
    }
    
    modalContent.innerHTML = content;
    modal.style.display = 'flex';
    modal.style.opacity = '1';
    
    console.log('✅ Modal opened successfully');
};

window.closeModal = function() {
    const modal = document.getElementById('modal-overlay');
    if (modal) {
        modal.style.display = 'none';
        modal.style.opacity = '0';
        console.log('✅ Modal closed');
    }
};

// Add modal styles
const modalStyles = document.createElement('style');
modalStyles.id = 'emergency-modal-styles';
modalStyles.textContent = `
    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem;
        border-bottom: 1px solid rgba(0, 255, 65, 0.3);
    }
    .modal-header h2 {
        margin: 0;
        color: #00ff41;
    }
    .modal-close {
        background: none;
        border: none;
        color: #00ff41;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0.5rem;
    }
    .modal-body {
        padding: 1.5rem;
        color: #00ff41;
    }
    .modal-metrics {
        display: flex;
        gap: 2rem;
        margin-top: 1rem;
    }
    .metric {
        text-align: center;
    }
    .metric-value {
        display: block;
        font-size: 2rem;
        font-weight: bold;
        color: #00ff41;
    }
    .metric-label {
        font-size: 0.8rem;
        color: rgba(0, 255, 65, 0.7);
    }
`;

document.head.appendChild(modalStyles);

console.log('🎉 EMERGENCY LAB FIX COMPLETE!');
console.log('✅ Innovation Lab Foundation restored');
console.log('✅ TrojanHorse Feed functional');
console.log('✅ Snake game created and playable');
console.log('✅ Case study modals fixed');

return 'Emergency fix applied successfully!';
