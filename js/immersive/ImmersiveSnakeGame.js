/**
 * Immersive Snake Game - Viewport-aware with elegant HUD
 * Clean, functional implementation matching production quality
 */

class ImmersiveSnakeGame {
    constructor(containerId) {
        this.containerId = containerId;
        this.container = document.getElementById(containerId);
        
        if (!this.container) {
            throw new Error(`Container ${containerId} not found`);
        }

        // Game state
        this.snake = [{ x: 10, y: 10 }];
        this.direction = { x: 1, y: 0 };
        this.food = { x: 15, y: 15, emoji: '🍎', points: 10 };
        this.score = 0;
        this.level = 1;
        this.gameState = 'ready'; // ready, playing, paused, gameOver
        this.gameLoop = null;
        this.speed = 150;
        this.boostActive = false;
        this.boostSpeed = 75;

        // Viewport calculations
        this.calculateViewport();
        this.setupCanvas();
        this.setupHUD();
        this.setupControls();
        this.generateFood();
        this.render(); // Initial render
        
        console.log('🐍 Immersive Snake Game initialized');
    }

    calculateViewport() {
        const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
        
        // Calculate optimal grid size for viewport
        this.cellSize = Math.min(Math.floor(vw / 40), Math.floor(vh / 30), 20);
        this.gridWidth = Math.floor((vw * 0.8) / this.cellSize);
        this.gridHeight = Math.floor((vh * 0.7) / this.cellSize);
        
        this.canvasWidth = this.gridWidth * this.cellSize;
        this.canvasHeight = this.gridHeight * this.cellSize;
        
        console.log(`🎯 Viewport: ${vw}x${vh}, Grid: ${this.gridWidth}x${this.gridHeight}, Cell: ${this.cellSize}px`);
    }

    setupCanvas() {
        this.container.innerHTML = `
            <div class="immersive-snake-container">
                <div class="snake-hud">
                    <div class="hud-left">
                        <div class="hud-item">
                            <span class="hud-label">SCORE</span>
                            <span class="hud-value" id="snake-score">0</span>
                        </div>
                        <div class="hud-item">
                            <span class="hud-label">LEVEL</span>
                            <span class="hud-value" id="snake-level">1</span>
                        </div>
                        <div class="hud-item">
                            <span class="hud-label">STATUS</span>
                            <span class="hud-value" id="snake-status">READY</span>
                        </div>
                    </div>
                    <div class="hud-right">
                        <button id="snake-pause" class="hud-btn" style="display: none;">⏸️ PAUSE</button>
                        <button id="snake-restart" class="hud-btn">🔄 RESTART</button>
                        <button id="snake-close" class="hud-btn close-btn">✕ CLOSE</button>
                    </div>
                </div>
                <canvas id="snake-canvas" width="${this.canvasWidth}" height="${this.canvasHeight}"></canvas>
                <div class="snake-controls">
                    <div class="control-hint">
                        <span>↑UP</span> <span>↓DOWN</span> <span>←LEFT</span> <span>→RIGHT</span> 
                        <span>SPACE:PAUSE</span> <span>SHIFT:BOOST</span>
                    </div>
                </div>
            </div>
        `;

        this.canvas = document.getElementById('snake-canvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Style the container - bulletproof dark mode
        this.container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: #0a0a0a;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        `;

        // Add CSS for immersive styling
        this.addImmersiveStyles();
    }

    addImmersiveStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .immersive-snake-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 20px;
                font-family: 'Courier New', monospace;
                color: var(--cyber-primary-accent, #00ff9d);
            }
            
            .snake-hud {
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: ${this.canvasWidth}px;
                padding: 15px 0;
                border-bottom: 2px solid var(--cyber-primary-accent, #00ff9d);
            }
            
            .hud-left {
                display: flex;
                gap: 30px;
            }
            
            .hud-item {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 5px;
            }
            
            .hud-label {
                font-size: 12px;
                opacity: 0.7;
                font-weight: bold;
            }
            
            .hud-value {
                font-size: 18px;
                font-weight: bold;
                color: var(--cyber-primary-accent, #00ff9d);
            }
            
            .hud-right {
                display: flex;
                gap: 15px;
            }
            
            .hud-btn {
                background: var(--surface-secondary, rgba(0, 255, 157, 0.1));
                border: 1px solid var(--cyber-primary-accent, #00ff9d);
                color: var(--cyber-primary-accent, #00ff9d);
                padding: 8px 16px;
                font-family: inherit;
                font-size: 12px;
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .hud-btn:hover {
                background: var(--surface-tertiary, rgba(0, 255, 157, 0.2));
                transform: translateY(-1px);
            }
            
            .close-btn {
                background: rgba(255, 255, 255, 0.9) !important;
                border-color: #ffffff !important;
                color: #000000 !important;
                font-weight: bold !important;
            }
            
            .close-btn:hover {
                background: rgba(255, 255, 255, 1) !important;
                transform: translateY(-1px) !important;
            }
            
            .start-btn {
                background: linear-gradient(45deg, #00ff9d, #00cc7a) !important;
                border-color: #00ff9d !important;
                color: #000 !important;
                font-weight: bold !important;
            }
            
            .start-btn:hover {
                background: linear-gradient(45deg, #00cc7a, #00aa66) !important;
                transform: translateY(-2px) !important;
                box-shadow: 0 4px 12px rgba(0, 255, 157, 0.4) !important;
            }
            
            #snake-canvas {
                border: 2px solid #00ff9d;
                background: #111;
                box-shadow: 0 0 20px rgba(0, 255, 157, 0.3);
            }
            
            .snake-controls {
                display: flex;
                flex-direction: column;
                align-items: center;
                width: ${this.canvasWidth}px;
                padding: 15px 0;
                border-top: 1px solid rgba(0, 255, 157, 0.3);
                gap: 15px;
            }
            
            .touch-controls {
                display: none;
                flex-direction: column;
                align-items: center;
                gap: 10px;
            }
            
            .touch-row {
                display: flex;
                gap: 10px;
            }
            
            .touch-btn {
                width: 50px;
                height: 50px;
                background: rgba(0, 255, 157, 0.1);
                border: 2px solid var(--cyber-primary-accent, #00ff9d);
                color: var(--cyber-primary-accent, #00ff9d);
                font-size: 20px;
                font-weight: bold;
                border-radius: 8px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                user-select: none;
                transition: all 0.2s ease;
            }
            
            .touch-btn:hover,
            .touch-btn:active {
                background: rgba(0, 255, 157, 0.2);
                box-shadow: 0 0 10px rgba(0, 255, 157, 0.4);
                transform: scale(0.95);
            }
            
            .control-hint {
                display: flex;
                gap: 20px;
                font-size: 11px;
                opacity: 0.6;
            }
            
            .control-hint span {
                padding: 4px 8px;
                border: 1px solid rgba(0, 255, 157, 0.3);
                border-radius: 3px;
            }
            
            @media (max-width: 768px) {
                .touch-controls {
                    display: flex;
                }
                .control-hint {
                    display: none;
                }
            }
        `;
        document.head.appendChild(style);
    }

    setupHUD() {
        this.scoreEl = document.getElementById('snake-score');
        this.levelEl = document.getElementById('snake-level');
        this.statusEl = document.getElementById('snake-status');
        // Button event listeners
        document.getElementById('snake-pause').addEventListener('click', () => this.togglePause());
        document.getElementById('snake-restart').addEventListener('click', () => this.restart());
        document.getElementById('snake-close').addEventListener('click', () => this.close());
    }

    setupControls() {
        this.keyHandler = (e) => {
            switch(e.code) {
                case 'ArrowUp':
                case 'KeyW':
                    e.preventDefault();
                    this.setDirection({ x: 0, y: -1 });
                    break;
                case 'ArrowDown':
                case 'KeyS':
                    e.preventDefault();
                    this.setDirection({ x: 0, y: 1 });
                    break;
                case 'ArrowLeft':
                case 'KeyA':
                    e.preventDefault();
                    this.setDirection({ x: -1, y: 0 });
                    break;
                case 'ArrowRight':
                case 'KeyD':
                    e.preventDefault();
                    if (this.gameState === 'ready') {
                        this.startGame();
                    } else {
                        this.setDirection({ x: 1, y: 0 });
                    }
                    break;
                case 'Space':
                    e.preventDefault();
                    this.togglePause();
                    break;
                case 'KeyR':
                    this.restart();
                    break;
                case 'ShiftLeft':
                case 'ShiftRight':
                    this.activateBoost();
                    break;
                case 'Escape':
                    this.close();
                    break;
            }
        };
        
        document.addEventListener('keydown', this.keyHandler);
    }

    setDirection(newDirection) {
        // Prevent reversing into self
        if (newDirection.x === -this.direction.x && newDirection.y === -this.direction.y) {
            return;
        }
        
        this.direction = newDirection;
        
        if (this.gameState === 'ready') {
            this.startGame(); // Auto-start on first direction input
        }
    }

    startGame() {
        if (this.gameState === 'playing') return;
        
        this.gameState = 'playing';
        this.gameStartTime = Date.now(); // Track game start time
        this.updateHUD();
        this.updateButtonStates();
        this.gameLoop = setInterval(() => this.update(), this.getCurrentSpeed());
        
        console.log('🎮 Snake game started');
    }

    start() {
        // Legacy method - redirect to startGame
        this.startGame();
    }

    togglePause() {
        if (this.gameState === 'playing') {
            this.gameState = 'paused';
            clearInterval(this.gameLoop);
        } else if (this.gameState === 'paused') {
            this.gameState = 'playing';
            this.gameLoop = setInterval(() => this.update(), this.getCurrentSpeed());
        }
        this.updateHUD();
        this.updateButtonStates();
    }

    restart() {
        clearInterval(this.gameLoop);
        this.snake = [{ x: 10, y: 10 }];
        this.direction = { x: 1, y: 0 };
        this.score = 0;
        this.level = 1;
        this.gameState = 'ready';
        this.speed = 150;
        this.boostActive = false;
        this.generateFood();
        this.updateHUD();
        this.updateButtonStates();
        this.render();
    }

    update() {
        if (this.gameState !== 'playing') return;

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

        // Check food collision
        if (head.x === this.food.x && head.y === this.food.y) {
            this.score += this.food.points;
            this.level = Math.floor(this.score / 100) + 1;
            this.speed = Math.max(80, 150 - (this.level * 10));
            this.generateFood();
            this.updateHUD();
            
            // Restart game loop with new speed
            clearInterval(this.gameLoop);
            this.gameLoop = setInterval(() => this.update(), this.getCurrentSpeed());
        } else {
            this.snake.pop();
        }

        this.render();
    }

    generateFood() {
        const foodTypes = [
            { emoji: '🍎', points: 10 },
            { emoji: '🍊', points: 15 },
            { emoji: '🍌', points: 20 },
            { emoji: '🍇', points: 25 },
            { emoji: '🍓', points: 30 },
            { emoji: '🥝', points: 35 },
            { emoji: '🍑', points: 40 },
            { emoji: '🥭', points: 50 }
        ];
        
        const randomFood = foodTypes[Math.floor(Math.random() * foodTypes.length)];
        
        do {
            this.food = {
                x: Math.floor(Math.random() * this.gridWidth),
                y: Math.floor(Math.random() * this.gridHeight),
                emoji: randomFood.emoji,
                points: randomFood.points
            };
        } while (this.snake.some(segment => segment.x === this.food.x && segment.y === this.food.y));
    }

    render() {
        // Clear canvas
        this.ctx.fillStyle = '#111';
        this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

        // Draw snake
        this.snake.forEach((segment, index) => {
            if (index === 0) {
                // Head with eyes
                this.ctx.fillStyle = '#00ff9d';
                this.ctx.fillRect(
                    segment.x * this.cellSize + 1,
                    segment.y * this.cellSize + 1,
                    this.cellSize - 2,
                    this.cellSize - 2
                );
                
                // Draw eyes
                this.ctx.fillStyle = '#000000';
                const eyeSize = Math.max(2, this.cellSize / 6);
                const eyeOffset = this.cellSize / 4;
                
                // Left eye
                this.ctx.fillRect(
                    segment.x * this.cellSize + eyeOffset,
                    segment.y * this.cellSize + eyeOffset,
                    eyeSize,
                    eyeSize
                );
                
                // Right eye
                this.ctx.fillRect(
                    segment.x * this.cellSize + this.cellSize - eyeOffset - eyeSize,
                    segment.y * this.cellSize + eyeOffset,
                    eyeSize,
                    eyeSize
                );
            } else {
                // Body
                this.ctx.fillStyle = `rgba(0, 255, 157, ${0.8 - (index * 0.05)})`;
                this.ctx.fillRect(
                    segment.x * this.cellSize + 1,
                    segment.y * this.cellSize + 1,
                    this.cellSize - 2,
                    this.cellSize - 2
                );
            }
        });

        // Draw food as emoji
        this.ctx.font = `${this.cellSize - 4}px Arial`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(
            this.food.emoji,
            this.food.x * this.cellSize + this.cellSize / 2,
            this.food.y * this.cellSize + this.cellSize / 2
        );
    }

    updateHUD() {
        if (this.scoreEl) this.scoreEl.textContent = this.score;
        if (this.levelEl) this.levelEl.textContent = this.level;
        if (this.statusEl) this.statusEl.textContent = this.gameState.toUpperCase();
    }

    updateButtonStates() {
        const startBtn = document.getElementById('snake-start');
        const pauseBtn = document.getElementById('snake-pause');
        
        if (this.gameState === 'ready') {
            startBtn.style.display = 'inline-block';
            pauseBtn.style.display = 'none';
        } else {
            startBtn.style.display = 'none';
            pauseBtn.style.display = 'inline-block';
        }
    }

    activateBoost() {
        if (this.gameState !== 'playing') return;
        
        this.boostActive = true;
        
        // Restart game loop with boost speed
        clearInterval(this.gameLoop);
        this.gameLoop = setInterval(() => this.update(), this.getCurrentSpeed());
        
        // Deactivate boost after 2 seconds
        setTimeout(() => {
            this.boostActive = false;
            if (this.gameState === 'playing') {
                clearInterval(this.gameLoop);
                this.gameLoop = setInterval(() => this.update(), this.getCurrentSpeed());
            }
        }, 2000);
    }

    getCurrentSpeed() {
        return this.boostActive ? this.boostSpeed : this.speed;
    }

    gameOver() {
        clearInterval(this.gameLoop);
        this.gameState = 'gameOver';
        this.updateHUD();
        
        // Record game stats
        this.recordGameStats();
        
        setTimeout(() => {
            this.restart();
        }, 2000);
    }

    recordGameStats() {
        // Update Games section counters
        const snakeCountEl = document.getElementById('snake-count');
        if (snakeCountEl) {
            const currentCount = parseInt(snakeCountEl.textContent) || 0;
            snakeCountEl.textContent = currentCount + 1;
        }

        // Store game data for potential leaderboards
        const gameData = {
            score: this.score,
            level: this.level,
            timestamp: Date.now(),
            duration: Date.now() - (this.gameStartTime || Date.now())
        };

        // Save to localStorage for persistence
        const savedGames = JSON.parse(localStorage.getItem('snake-games') || '[]');
        savedGames.push(gameData);
        localStorage.setItem('snake-games', JSON.stringify(savedGames.slice(-10))); // Keep last 10 games
    }

    close() {
        clearInterval(this.gameLoop);
        document.removeEventListener('keydown', this.keyHandler);
        this.container.style.display = 'none';
        document.body.style.overflow = '';
    }

    destroy() {
        clearInterval(this.gameLoop);
        document.removeEventListener('keydown', this.keyHandler);
        this.container.innerHTML = '';
    }
}

window.ImmersiveSnakeGame = ImmersiveSnakeGame;
