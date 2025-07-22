// ROBUST SNAKE GAME FIX
// This creates a completely isolated, functional Snake game

console.log('🐍 SNAKE GAME FIX: Starting robust implementation...');

// 1. CLEAR ANY EXISTING BROKEN SNAKE GAMES
const existingSnakeContainers = document.querySelectorAll('#dos-snake-game-container, [id*="snake"]');
existingSnakeContainers.forEach(container => {
    if (container.id !== 'snake-canvas') {
        container.remove();
        console.log('🧹 Removed broken snake container:', container.id);
    }
});

// Clear any existing game loops
if (window.emergencySnakeGame) {
    if (window.emergencySnakeGame.gameLoop) {
        clearInterval(window.emergencySnakeGame.gameLoop);
    }
    delete window.emergencySnakeGame;
    console.log('🧹 Cleared existing snake game');
}

// 2. CREATE CLEAN SNAKE GAME CONTAINER
const foundation = document.getElementById('innovation-lab-foundation');
if (!foundation) {
    console.error('❌ Foundation not found');
    return;
}

const snakeContainer = document.createElement('div');
snakeContainer.id = 'robust-snake-game';
snakeContainer.className = 'lab-feature-card';
snakeContainer.innerHTML = `
    <div class="feature-status-badge live">✅ Live</div>
    <div class="feature-icon">🐍</div>
    <h3>DOS Snake Game</h3>
    <p>Classic Snake game with robust collision detection and smooth gameplay.</p>
    <div class="snake-game-wrapper">
        <div class="game-info">
            <div class="game-stats">
                <span>Score: <span id="robust-snake-score">0</span></span>
                <span>High Score: <span id="robust-snake-high-score">0</span></span>
                <span>Status: <span id="robust-game-status">Ready</span></span>
            </div>
        </div>
        <canvas id="robust-snake-canvas" width="320" height="320"></canvas>
        <div class="game-controls">
            <button id="robust-snake-start" class="control-btn primary">Start Game</button>
            <button id="robust-snake-pause" class="control-btn">Pause</button>
            <button id="robust-snake-reset" class="control-btn">Reset</button>
        </div>
        <div class="game-instructions">
            <p>Use arrow keys to control the snake. Eat red food to grow and score points!</p>
        </div>
    </div>
`;

// 3. ADD ROBUST STYLING
const robustStyles = document.createElement('style');
robustStyles.id = 'robust-snake-styles';
robustStyles.textContent = `
    #robust-snake-game {
        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
        border: 2px solid #00ff41;
        border-radius: 12px;
        padding: 1.5rem;
        margin: 1rem 0;
        color: #00ff41;
        font-family: 'Courier New', monospace;
        box-shadow: 0 8px 32px rgba(0, 255, 65, 0.2);
    }
    
    .snake-game-wrapper {
        text-align: center;
    }
    
    .game-info {
        margin-bottom: 1rem;
    }
    
    .game-stats {
        display: flex;
        justify-content: space-around;
        background: rgba(0, 255, 65, 0.1);
        padding: 0.5rem;
        border-radius: 8px;
        margin-bottom: 1rem;
        font-size: 0.9rem;
    }
    
    #robust-snake-canvas {
        border: 3px solid #00ff41;
        background: #000;
        margin: 1rem auto;
        display: block;
        box-shadow: 0 0 20px rgba(0, 255, 65, 0.3);
    }
    
    .game-controls {
        display: flex;
        gap: 1rem;
        justify-content: center;
        margin: 1rem 0;
    }
    
    .control-btn {
        background: rgba(0, 255, 65, 0.1);
        border: 2px solid #00ff41;
        color: #00ff41;
        padding: 0.75rem 1.5rem;
        border-radius: 6px;
        cursor: pointer;
        font-family: 'Courier New', monospace;
        font-weight: bold;
        transition: all 0.2s ease;
        min-width: 100px;
    }
    
    .control-btn:hover {
        background: rgba(0, 255, 65, 0.2);
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 255, 65, 0.3);
    }
    
    .control-btn.primary {
        background: rgba(0, 255, 65, 0.2);
        font-size: 1.1rem;
    }
    
    .control-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none;
    }
    
    .game-instructions {
        margin-top: 1rem;
        padding: 1rem;
        background: rgba(0, 255, 65, 0.05);
        border-radius: 8px;
        font-size: 0.9rem;
        color: rgba(0, 255, 65, 0.8);
    }
    
    #robust-game-status {
        font-weight: bold;
        text-transform: uppercase;
    }
`;

document.head.appendChild(robustStyles);
foundation.appendChild(snakeContainer);

// 4. IMPLEMENT ROBUST SNAKE GAME CLASS
class RobustSnakeGame {
    constructor() {
        this.canvas = document.getElementById('robust-snake-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.gridSize = 16;
        this.tileCount = this.canvas.width / this.gridSize;
        
        // Game state
        this.snake = [{x: 10, y: 10}];
        this.food = this.generateFood();
        this.direction = {x: 0, y: 0};
        this.nextDirection = {x: 0, y: 0};
        this.score = 0;
        this.highScore = parseInt(localStorage.getItem('robustSnakeHighScore')) || 0;
        this.gameState = 'ready'; // ready, playing, paused, gameOver
        this.gameLoop = null;
        this.gameSpeed = 200; // ms between moves
        
        this.init();
    }
    
    init() {
        this.updateDisplay();
        this.setupControls();
        this.draw();
        console.log('🐍 Robust Snake game initialized');
    }
    
    generateFood() {
        let food;
        do {
            food = {
                x: Math.floor(Math.random() * this.tileCount),
                y: Math.floor(Math.random() * this.tileCount)
            };
        } while (this.snake.some(segment => segment.x === food.x && segment.y === food.y));
        
        return food;
    }
    
    setupControls() {
        // Remove any existing listeners
        document.removeEventListener('keydown', this.handleKeyPress);
        
        // Add new isolated key handler
        this.handleKeyPress = (e) => {
            if (this.gameState !== 'playing') return;
            
            // Prevent default and stop propagation to avoid Konami conflicts
            e.preventDefault();
            e.stopPropagation();
            
            switch(e.code) {
                case 'ArrowUp':
                    if (this.direction.y === 0) {
                        this.nextDirection = {x: 0, y: -1};
                    }
                    break;
                case 'ArrowDown':
                    if (this.direction.y === 0) {
                        this.nextDirection = {x: 0, y: 1};
                    }
                    break;
                case 'ArrowLeft':
                    if (this.direction.x === 0) {
                        this.nextDirection = {x: -1, y: 0};
                    }
                    break;
                case 'ArrowRight':
                    if (this.direction.x === 0) {
                        this.nextDirection = {x: 1, y: 0};
                    }
                    break;
                case 'Space':
                    this.togglePause();
                    break;
            }
        };
        
        document.addEventListener('keydown', this.handleKeyPress);
        
        // Button controls
        document.getElementById('robust-snake-start').addEventListener('click', () => this.startGame());
        document.getElementById('robust-snake-pause').addEventListener('click', () => this.togglePause());
        document.getElementById('robust-snake-reset').addEventListener('click', () => this.resetGame());
    }
    
    startGame() {
        if (this.gameState === 'ready' || this.gameState === 'gameOver') {
            this.gameState = 'playing';
            this.direction = {x: 1, y: 0}; // Start moving right
            this.nextDirection = {x: 1, y: 0};
            this.gameLoop = setInterval(() => this.update(), this.gameSpeed);
            this.updateDisplay();
            console.log('🎮 Snake game started');
        }
    }
    
    togglePause() {
        if (this.gameState === 'playing') {
            this.gameState = 'paused';
            clearInterval(this.gameLoop);
            this.updateDisplay();
            console.log('⏸️ Game paused');
        } else if (this.gameState === 'paused') {
            this.gameState = 'playing';
            this.gameLoop = setInterval(() => this.update(), this.gameSpeed);
            this.updateDisplay();
            console.log('▶️ Game resumed');
        }
    }
    
    resetGame() {
        clearInterval(this.gameLoop);
        this.snake = [{x: 10, y: 10}];
        this.food = this.generateFood();
        this.direction = {x: 0, y: 0};
        this.nextDirection = {x: 0, y: 0};
        this.score = 0;
        this.gameState = 'ready';
        this.updateDisplay();
        this.draw();
        console.log('🔄 Game reset');
    }
    
    update() {
        // Update direction
        this.direction = {...this.nextDirection};
        
        // Calculate new head position
        const head = {
            x: this.snake[0].x + this.direction.x,
            y: this.snake[0].y + this.direction.y
        };
        
        // Check wall collision
        if (head.x < 0 || head.x >= this.tileCount || head.y < 0 || head.y >= this.tileCount) {
            this.gameOver();
            return;
        }
        
        // Check self collision
        if (this.snake.some(segment => segment.x === head.x && segment.y === head.y)) {
            this.gameOver();
            return;
        }
        
        // Add new head
        this.snake.unshift(head);
        
        // Check food collision
        if (head.x === this.food.x && head.y === this.food.y) {
            this.score += 10;
            this.food = this.generateFood();
            
            // Increase speed slightly
            if (this.gameSpeed > 100) {
                this.gameSpeed -= 2;
                clearInterval(this.gameLoop);
                this.gameLoop = setInterval(() => this.update(), this.gameSpeed);
            }
        } else {
            // Remove tail if no food eaten
            this.snake.pop();
        }
        
        this.updateDisplay();
        this.draw();
    }
    
    gameOver() {
        clearInterval(this.gameLoop);
        this.gameState = 'gameOver';
        
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('robustSnakeHighScore', this.highScore);
            console.log('🏆 New high score!', this.highScore);
        }
        
        this.updateDisplay();
        console.log('💀 Game Over! Final Score:', this.score);
    }
    
    updateDisplay() {
        document.getElementById('robust-snake-score').textContent = this.score;
        document.getElementById('robust-snake-high-score').textContent = this.highScore;
        
        const statusElement = document.getElementById('robust-game-status');
        const startBtn = document.getElementById('robust-snake-start');
        const pauseBtn = document.getElementById('robust-snake-pause');
        
        switch(this.gameState) {
            case 'ready':
                statusElement.textContent = 'Ready';
                startBtn.textContent = 'Start Game';
                startBtn.disabled = false;
                pauseBtn.disabled = true;
                break;
            case 'playing':
                statusElement.textContent = 'Playing';
                startBtn.disabled = true;
                pauseBtn.textContent = 'Pause';
                pauseBtn.disabled = false;
                break;
            case 'paused':
                statusElement.textContent = 'Paused';
                pauseBtn.textContent = 'Resume';
                break;
            case 'gameOver':
                statusElement.textContent = 'Game Over';
                startBtn.textContent = 'Play Again';
                startBtn.disabled = false;
                pauseBtn.disabled = true;
                break;
        }
    }
    
    draw() {
        // Clear canvas
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw snake
        this.ctx.fillStyle = '#00ff41';
        this.snake.forEach((segment, index) => {
            // Head is slightly brighter
            if (index === 0) {
                this.ctx.fillStyle = '#00ff88';
            } else {
                this.ctx.fillStyle = '#00ff41';
            }
            
            this.ctx.fillRect(
                segment.x * this.gridSize + 1,
                segment.y * this.gridSize + 1,
                this.gridSize - 2,
                this.gridSize - 2
            );
        });
        
        // Draw food
        this.ctx.fillStyle = '#ff4141';
        this.ctx.fillRect(
            this.food.x * this.gridSize + 1,
            this.food.y * this.gridSize + 1,
            this.gridSize - 2,
            this.gridSize - 2
        );
        
        // Draw grid (subtle)
        this.ctx.strokeStyle = 'rgba(0, 255, 65, 0.1)';
        this.ctx.lineWidth = 1;
        for (let i = 0; i <= this.tileCount; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(i * this.gridSize, 0);
            this.ctx.lineTo(i * this.gridSize, this.canvas.height);
            this.ctx.stroke();
            
            this.ctx.beginPath();
            this.ctx.moveTo(0, i * this.gridSize);
            this.ctx.lineTo(this.canvas.width, i * this.gridSize);
            this.ctx.stroke();
        }
    }
}

// 5. INITIALIZE ROBUST SNAKE GAME
window.robustSnakeGame = new RobustSnakeGame();

console.log('🎉 ROBUST SNAKE GAME READY!');
console.log('🎮 Click "Start Game" and use arrow keys to play');
console.log('🐍 Eat red food to grow and score points');

'Robust Snake game created successfully!';
