/**
 * Snake Game Engine - Modular Architecture with Mobile Touch Controls
 * Production-grade component with real-time scoring and mobile UX
 */

class SnakeGameEngine {
    constructor(containerId, options = {}) {
        this.containerId = containerId;
        this.container = document.getElementById(containerId);
        
        if (!this.container) {
            throw new Error(`Container ${containerId} not found`);
        }

        // Game configuration
        this.config = {
            gridSize: options.gridSize || 20,
            initialSpeed: options.initialSpeed || 150,
            boostSpeed: options.boostSpeed || 75,
            canvasWidth: options.canvasWidth || 800,
            canvasHeight: options.canvasHeight || 600,
            ...options
        };

        // Game state
        this.snake = [{ x: 10, y: 10 }];
        this.direction = { x: 1, y: 0 };
        this.nextDirection = { x: 1, y: 0 };
        this.foods = []; // Multi-food system like original
        this.ghostFoods = [];
        this.score = 0;
        this.highScore = this.loadHighScore();
        this.level = 1;
        this.gameState = 'ready'; // ready, playing, paused, gameOver
        this.gameLoop = null;
        this.speed = this.config.initialSpeed;
        this.boostActive = false;
        this.boostTimeLeft = 0;
        
        // Enhanced food types from original
        this.foodTypes = {
            apple: { emoji: '🍎', points: 10, probability: 0.35 },
            cherry: { emoji: '🍒', points: 20, probability: 0.2 },
            banana: { emoji: '🍌', points: 15, probability: 0.2 },
            turbo: { emoji: '⚡', points: 5, probability: 0.1, effect: 'turbo' },
            poison: { emoji: '☠️', points: -20, probability: 0.1, effect: 'poison' },
            bomb: { emoji: '💣', points: 0, probability: 0.05, effect: 'death' }
        };
        
        // Game timing
        this.gameStartTime = null;
        this.lastFoodSpawn = 0;
        this.foodSpawnInterval = 2000;

        // Mobile touch controls
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.touchThreshold = 30;
        this.lastSwipeTime = 0;
        this.swipeDebounce = 200;

        // UI elements
        this.canvas = null;
        this.ctx = null;
        this.scoreDisplay = null;
        this.highScoreDisplay = null;
        this.levelDisplay = null;
        this.statusDisplay = null;

        // Bind methods to preserve context
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);

        this.init();
    }

    init() {
        this.createGameUI();
        this.setupCanvas();
        this.setupControls();
        this.generateMultipleFoods();
        this.render();
        
        console.log('🐍 SNAKE ENGINE: Initialized with mobile controls');
    }

    createGameUI() {
        // Make container fullscreen for immersive mode
        this.container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: 10000;
            background: #000;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        `;

        this.container.innerHTML = `
            <div class="snake-game-container">
                <div class="snake-close-btn" onclick="this.parentElement.parentElement.remove(); document.body.style.overflow = '';">×</div>
                <div class="snake-hud">
                    <div class="snake-score-panel">
                        <div class="score-item">
                            <span class="score-label">SCORE</span>
                            <span class="score-value" id="snake-score-${this.containerId}">0</span>
                        </div>
                        <div class="score-item">
                            <span class="score-label">HIGH</span>
                            <span class="score-value" id="snake-high-score-${this.containerId}">${this.highScore}</span>
                        </div>
                        <div class="score-item">
                            <span class="score-label">LEVEL</span>
                            <span class="score-value" id="snake-level-${this.containerId}">1</span>
                        </div>
                    </div>
                    <div class="snake-status" id="snake-status-${this.containerId}">Ready to Play</div>
                </div>
                
                <div class="snake-game-area">
                    <canvas id="snake-canvas-${this.containerId}" width="${this.config.canvasWidth}" height="${this.config.canvasHeight}"></canvas>
                    
                    <!-- Mobile Touch Controls -->
                    <div class="mobile-controls" id="mobile-controls">
                        <div class="control-instructions">Swipe or tap to control</div>
                        <div class="control-grid">
                            <div class="control-row">
                                <button class="control-btn" data-direction="up">↑</button>
                            </div>
                            <div class="control-row">
                                <button class="control-btn" data-direction="left">←</button>
                                <button class="control-btn boost-btn" data-action="boost">⚡</button>
                                <button class="control-btn" data-direction="right">→</button>
                            </div>
                            <div class="control-row">
                                <button class="control-btn" data-direction="down">↓</button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="snake-actions">
                    <button class="snake-btn primary" id="snake-start-${this.containerId}">START GAME</button>
                    <button class="snake-btn secondary" id="snake-pause-${this.containerId}" style="display: none;">PAUSE</button>
                    <button class="snake-btn danger" id="snake-reset-${this.containerId}" style="display: none;">RESET</button>
                </div>
            </div>
            
            <style>
                .snake-close-btn {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    width: 40px;
                    height: 40px;
                    background: rgba(255, 68, 68, 0.2);
                    border: 2px solid #ff4444;
                    border-radius: 50%;
                    color: #ff4444;
                    font-size: 24px;
                    font-weight: bold;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s ease;
                    z-index: 10001;
                }
                
                .snake-close-btn:hover {
                    background: rgba(255, 68, 68, 0.4);
                    transform: scale(1.1);
                }
                
                .snake-game-container {
                    background: linear-gradient(135deg, #0a0a0a, #1a1a1a);
                    border: 2px solid #00ff9d;
                    border-radius: 12px;
                    padding: 20px;
                    font-family: 'Space Mono', monospace;
                    color: #00ff9d;
                    max-width: 90vw;
                    max-height: 90vh;
                    margin: 0 auto;
                    position: relative;
                }
                
                .snake-hud {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 15px;
                    flex-wrap: wrap;
                    gap: 10px;
                }
                
                .snake-score-panel {
                    display: flex;
                    gap: 20px;
                    flex-wrap: wrap;
                }
                
                .score-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    min-width: 60px;
                }
                
                .score-label {
                    font-size: 12px;
                    opacity: 0.7;
                    margin-bottom: 2px;
                }
                
                .score-value {
                    font-size: 18px;
                    font-weight: bold;
                    color: #00ff9d;
                }
                
                .snake-status {
                    font-size: 14px;
                    padding: 5px 10px;
                    background: rgba(0, 255, 157, 0.1);
                    border-radius: 4px;
                    border: 1px solid rgba(0, 255, 157, 0.3);
                }
                
                .snake-game-area {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin-bottom: 15px;
                }
                
                #snake-canvas {
                    background: #000;
                    border: 1px solid #00ff9d;
                    border-radius: 4px;
                    max-width: 100%;
                    height: auto;
                }
                
                .mobile-controls {
                    margin-top: 15px;
                    display: none;
                }
                
                .control-instructions {
                    text-align: center;
                    font-size: 12px;
                    margin-bottom: 10px;
                    opacity: 0.7;
                }
                
                .control-grid {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                }
                
                .control-row {
                    display: flex;
                    gap: 8px;
                    align-items: center;
                }
                
                .control-btn {
                    width: 50px;
                    height: 50px;
                    background: rgba(0, 255, 157, 0.1);
                    border: 2px solid #00ff9d;
                    border-radius: 8px;
                    color: #00ff9d;
                    font-size: 18px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    user-select: none;
                    -webkit-tap-highlight-color: transparent;
                }
                
                .control-btn:active {
                    background: rgba(0, 255, 157, 0.3);
                    transform: scale(0.95);
                }
                
                .boost-btn {
                    background: rgba(255, 215, 0, 0.1);
                    border-color: #ffd700;
                    color: #ffd700;
                }
                
                .boost-btn:active {
                    background: rgba(255, 215, 0, 0.3);
                }
                
                .snake-actions {
                    display: flex;
                    gap: 10px;
                    justify-content: center;
                    flex-wrap: wrap;
                }
                
                .snake-btn {
                    padding: 10px 20px;
                    border: 2px solid;
                    border-radius: 6px;
                    font-family: 'Space Mono', monospace;
                    font-weight: bold;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    background: transparent;
                }
                
                .snake-btn.primary {
                    border-color: #00ff9d;
                    color: #00ff9d;
                }
                
                .snake-btn.primary:hover {
                    background: #00ff9d;
                    color: #000;
                }
                
                .snake-btn.secondary {
                    border-color: #ffd700;
                    color: #ffd700;
                }
                
                .snake-btn.danger {
                    border-color: #ff4444;
                    color: #ff4444;
                }
                
                /* Mobile responsive */
                @media (max-width: 768px) {
                    .mobile-controls {
                        display: block !important;
                    }
                    
                    #snake-canvas {
                        width: 100%;
                        max-width: 400px;
                    }
                    
                    .snake-hud {
                        font-size: 14px;
                    }
                    
                    .score-value {
                        font-size: 16px;
                    }
                }
                
                @media (max-width: 480px) {
                    .snake-game-container {
                        padding: 15px;
                    }
                    
                    .snake-score-panel {
                        gap: 15px;
                    }
                    
                    .control-btn {
                        width: 45px;
                        height: 45px;
                        font-size: 16px;
                    }
                }
            </style>
        `;

        // Get UI element references with unique IDs
        this.scoreDisplay = document.getElementById(`snake-score-${this.containerId}`);
        this.highScoreDisplay = document.getElementById(`snake-high-score-${this.containerId}`);
        this.levelDisplay = document.getElementById(`snake-level-${this.containerId}`);
        this.statusDisplay = document.getElementById(`snake-status-${this.containerId}`);
    }

    setupCanvas() {
        this.canvas = document.getElementById(`snake-canvas-${this.containerId}`);
        this.ctx = this.canvas.getContext('2d');
        
        // Handle high DPI displays
        const dpr = window.devicePixelRatio || 1;
        const rect = this.canvas.getBoundingClientRect();
        
        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        this.ctx.scale(dpr, dpr);
        
        // Calculate grid dimensions based on canvas size
        this.gridWidth = Math.floor(rect.width / this.config.gridSize);
        this.gridHeight = Math.floor(rect.height / this.config.gridSize);
    }

    setupControls() {
        // Keyboard controls
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
        
        // Touch controls for swipe gestures
        this.canvas.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: false });
        this.canvas.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });
        this.canvas.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: false });
        
        // Button controls
        document.querySelectorAll('.control-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleControlClick(e));
        });
        
        // Game action buttons with unique IDs
        document.getElementById(`snake-start-${this.containerId}`).addEventListener('click', () => this.startGame());
        document.getElementById(`snake-pause-${this.containerId}`).addEventListener('click', () => this.togglePause());
        document.getElementById(`snake-reset-${this.containerId}`).addEventListener('click', () => this.resetGame());
    }

    handleKeyPress(e) {
        if (this.gameState !== 'playing') return;
        
        const keyMap = {
            'ArrowUp': { x: 0, y: -1 },
            'ArrowDown': { x: 0, y: 1 },
            'ArrowLeft': { x: -1, y: 0 },
            'ArrowRight': { x: 1, y: 0 },
            'w': { x: 0, y: -1 },
            's': { x: 0, y: 1 },
            'a': { x: -1, y: 0 },
            'd': { x: 1, y: 0 }
        };
        
        const newDirection = keyMap[e.key];
        if (newDirection) {
            e.preventDefault();
            this.changeDirection(newDirection);
        }
        
        // Boost control
        if (e.key === ' ') {
            e.preventDefault();
            this.activateBoost();
        }
    }

    handleTouchStart(e) {
        e.preventDefault();
        const touch = e.touches[0];
        this.touchStartX = touch.clientX;
        this.touchStartY = touch.clientY;
    }

    handleTouchEnd(e) {
        e.preventDefault();
        
        if (this.gameState !== 'playing') return;
        
        const now = Date.now();
        if (now - this.lastSwipeTime < this.swipeDebounce) return;
        
        const touch = e.changedTouches[0];
        const deltaX = touch.clientX - this.touchStartX;
        const deltaY = touch.clientY - this.touchStartY;
        
        const absDeltaX = Math.abs(deltaX);
        const absDeltaY = Math.abs(deltaY);
        
        // Check if swipe is significant enough
        if (Math.max(absDeltaX, absDeltaY) < this.touchThreshold) return;
        
        let newDirection;
        
        if (absDeltaX > absDeltaY) {
            // Horizontal swipe
            newDirection = deltaX > 0 ? { x: 1, y: 0 } : { x: -1, y: 0 };
        } else {
            // Vertical swipe
            newDirection = deltaY > 0 ? { x: 0, y: 1 } : { x: 0, y: -1 };
        }
        
        this.changeDirection(newDirection);
        this.lastSwipeTime = now;
    }

    handleControlClick(e) {
        const direction = e.target.dataset.direction;
        const action = e.target.dataset.action;
        
        if (action === 'boost') {
            this.activateBoost();
            return;
        }
        
        if (direction && this.gameState === 'playing') {
            const directionMap = {
                'up': { x: 0, y: -1 },
                'down': { x: 0, y: 1 },
                'left': { x: -1, y: 0 },
                'right': { x: 1, y: 0 }
            };
            
            this.changeDirection(directionMap[direction]);
        }
    }

    changeDirection(newDirection) {
        // Prevent reversing into self
        const head = this.snake[0];
        const neck = this.snake[1];
        
        if (neck && head.x + newDirection.x === neck.x && head.y + newDirection.y === neck.y) {
            return;
        }
        
        this.nextDirection = newDirection;
    }

    activateBoost() {
        if (this.gameState === 'playing' && !this.boostActive) {
            this.boostActive = true;
            this.speed = this.config.boostSpeed;
            
            setTimeout(() => {
                this.boostActive = false;
                this.speed = this.config.initialSpeed;
            }, 1000);
        }
    }

    startGame() {
        this.gameState = 'playing';
        this.updateStatus('Playing - Use arrows or swipe to control');
        this.updateButtons();
        this.gameLoop = setInterval(() => this.update(), this.speed);
    }

    togglePause() {
        if (this.gameState === 'playing') {
            this.gameState = 'paused';
            this.updateStatus('Paused');
            clearInterval(this.gameLoop);
        } else if (this.gameState === 'paused') {
            this.gameState = 'playing';
            this.updateStatus('Playing');
            this.gameLoop = setInterval(() => this.update(), this.speed);
        }
        this.updateButtons();
    }

    resetGame() {
        clearInterval(this.gameLoop);
        this.snake = [{ x: 10, y: 10 }];
        this.direction = { x: 1, y: 0 };
        this.nextDirection = { x: 1, y: 0 };
        this.score = 0;
        this.level = 1;
        this.gameState = 'ready';
        this.speed = this.config.initialSpeed;
        this.generateMultipleFoods();
        this.updateScore();
        this.updateStatus('Ready to Play');
        this.updateButtons();
        this.render();
    }

    generateMultipleFoods() {
        // Clear existing foods
        this.foods = [];
        
        // Generate 2-4 foods like original
        const foodCount = Math.floor(Math.random() * 3) + 2;
        
        for (let i = 0; i < foodCount; i++) {
            this.spawnFood();
        }
    }

    spawnFood() {
        let foodPosition;
        let attempts = 0;
        
        do {
            foodPosition = {
                x: Math.floor(Math.random() * this.gridWidth),
                y: Math.floor(Math.random() * this.gridHeight)
            };
            attempts++;
        } while (attempts < 50 && (
            this.snake.some(segment => segment.x === foodPosition.x && segment.y === foodPosition.y) ||
            this.foods.some(food => food.x === foodPosition.x && food.y === foodPosition.y)
        ));
        
        if (attempts < 50) {
            // Select food type based on probability
            const rand = Math.random();
            let cumulativeProbability = 0;
            let selectedType = 'apple';
            
            for (const [type, config] of Object.entries(this.foodTypes)) {
                cumulativeProbability += config.probability;
                if (rand <= cumulativeProbability) {
                    selectedType = type;
                    break;
                }
            }
            
            const food = {
                x: foodPosition.x,
                y: foodPosition.y,
                type: selectedType,
                spawnTime: Date.now(),
                ...this.foodTypes[selectedType]
            };
            
            this.foods.push(food);
        }
    }

    update() {
        if (this.gameState !== 'playing') return;
        
        // Update direction
        this.direction = { ...this.nextDirection };
        
        // Move snake
        const head = { ...this.snake[0] };
        head.x += this.direction.x;
        head.y += this.direction.y;
        
        // Check wall collision
        if (head.x < 0 || head.x >= this.gridWidth || head.y < 0 || head.y >= this.gridHeight) {
            this.gameOver();
            return;
        }
        
        // Check self collision
        if (this.snake.some(segment => segment.x === head.x && segment.y === head.y)) {
            this.gameOver();
            return;
        }
        
        this.snake.unshift(head);
        
        // Check food collisions with multiple foods
        let foodEaten = false;
        for (let i = this.foods.length - 1; i >= 0; i--) {
            const food = this.foods[i];
            if (head.x === food.x && head.y === food.y) {
                this.eatFood(food, i);
                foodEaten = true;
                break;
            }
        }
        
        if (!foodEaten) {
            this.snake.pop();
        }
        
        // Spawn new food periodically
        if (Date.now() - this.lastFoodSpawn > this.foodSpawnInterval && this.foods.length < 4) {
            this.spawnFood();
            this.lastFoodSpawn = Date.now();
        }
        
        this.render();
    }

    eatFood(food, foodIndex) {
        // Remove the eaten food
        this.foods.splice(foodIndex, 1);
        
        // Apply food effects
        if (food.effect === 'turbo') {
            this.activateBoost();
            this.updateStatus('⚡ TURBO BOOST!');
        } else if (food.effect === 'poison') {
            this.score = Math.max(0, this.score + food.points);
            this.updateStatus('☠️ POISONED!');
            // Flash effect
            this.flashEffect('#ff0040');
        } else if (food.effect === 'death') {
            this.gameOver();
            return;
        } else {
            this.updateStatus(`${food.emoji} +${food.points} points!`);
        }
        
        this.score += food.points;
        this.updateScore();
        
        // Level up every 100 points
        const newLevel = Math.floor(this.score / 100) + 1;
        if (newLevel > this.level) {
            this.level = newLevel;
            this.levelDisplay.textContent = this.level;
            // Increase speed slightly
            this.speed = Math.max(50, this.config.initialSpeed - (this.level * 10));
            this.updateStatus(`🎉 LEVEL ${this.level}!`);
        }
        
        // Spawn replacement food
        setTimeout(() => this.spawnFood(), 500);
    }

    flashEffect(color) {
        const originalBg = this.container.style.background;
        this.container.style.background = color;
        setTimeout(() => {
            this.container.style.background = originalBg;
        }, 200);
    }

    gameOver() {
        clearInterval(this.gameLoop);
        this.gameState = 'gameOver';
        
        // Update high score
        if (this.score > this.highScore) {
            this.highScore = this.score;
            this.saveHighScore();
            this.highScoreDisplay.textContent = this.highScore;
            this.updateStatus(`New High Score: ${this.highScore}!`);
        } else {
            this.updateStatus(`Game Over - Score: ${this.score}`);
        }
        
        this.updateButtons();
    }

    updateScore() {
        this.scoreDisplay.textContent = this.score;
    }

    updateStatus(message) {
        this.statusDisplay.textContent = message;
    }

    updateButtons() {
        const startBtn = document.getElementById(`snake-start-${this.containerId}`);
        const pauseBtn = document.getElementById(`snake-pause-${this.containerId}`);
        const resetBtn = document.getElementById(`snake-reset-${this.containerId}`);
        
        switch (this.gameState) {
            case 'ready':
                startBtn.style.display = 'inline-block';
                startBtn.textContent = 'START GAME';
                pauseBtn.style.display = 'none';
                resetBtn.style.display = 'none';
                break;
            case 'playing':
                startBtn.style.display = 'none';
                pauseBtn.style.display = 'inline-block';
                pauseBtn.textContent = 'PAUSE';
                resetBtn.style.display = 'inline-block';
                break;
            case 'paused':
                startBtn.style.display = 'none';
                pauseBtn.style.display = 'inline-block';
                pauseBtn.textContent = 'RESUME';
                resetBtn.style.display = 'inline-block';
                break;
            case 'gameOver':
                startBtn.style.display = 'inline-block';
                startBtn.textContent = 'PLAY AGAIN';
                pauseBtn.style.display = 'none';
                resetBtn.style.display = 'inline-block';
                break;
        }
    }

    render() {
        // Clear canvas
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw snake
        this.ctx.fillStyle = '#00ff9d';
        this.snake.forEach((segment, index) => {
            const x = segment.x * this.config.gridSize;
            const y = segment.y * this.config.gridSize;
            
            if (index === 0) {
                // Head with different color
                this.ctx.fillStyle = '#00ff9d';
                this.ctx.fillRect(x + 1, y + 1, this.config.gridSize - 2, this.config.gridSize - 2);
                
                // Draw eyes
                this.ctx.fillStyle = '#000';
                const eyeSize = 3;
                const eyeOffset = 5;
                this.ctx.fillRect(x + eyeOffset, y + eyeOffset, eyeSize, eyeSize);
                this.ctx.fillRect(x + this.config.gridSize - eyeOffset - eyeSize, y + eyeOffset, eyeSize, eyeSize);
            } else {
                // Body
                this.ctx.fillStyle = index % 2 === 0 ? '#00cc7d' : '#00aa6d';
                this.ctx.fillRect(x + 1, y + 1, this.config.gridSize - 2, this.config.gridSize - 2);
            }
        });
        
        // Draw multiple foods with emojis
        this.foods.forEach(food => {
            const x = food.x * this.config.gridSize;
            const y = food.y * this.config.gridSize;
            
            // Food background based on type
            let bgColor = '#ff4444';
            if (food.type === 'turbo') bgColor = '#ffd700';
            else if (food.type === 'poison') bgColor = '#8b008b';
            else if (food.type === 'bomb') bgColor = '#ff0000';
            else if (food.type === 'cherry') bgColor = '#dc143c';
            else if (food.type === 'banana') bgColor = '#ffff00';
            
            this.ctx.fillStyle = bgColor;
            this.ctx.fillRect(x + 2, y + 2, this.config.gridSize - 4, this.config.gridSize - 4);
            
            // Draw emoji
            this.ctx.font = `${this.config.gridSize - 4}px Arial`;
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(
                food.emoji, 
                x + this.config.gridSize / 2, 
                y + this.config.gridSize / 2
            );
        });
    }

    loadHighScore() {
        return parseInt(localStorage.getItem('snake-high-score') || '0');
    }

    saveHighScore() {
        localStorage.setItem('snake-high-score', this.highScore.toString());
    }

    destroy() {
        clearInterval(this.gameLoop);
        document.removeEventListener('keydown', this.handleKeyPress);
        if (this.container) {
            this.container.innerHTML = '';
        }
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SnakeGameEngine;
}

// Global access
window.SnakeGameEngine = SnakeGameEngine;
