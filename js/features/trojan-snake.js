/**
 * Trojan Snake - Innovation Lab Feature
 * Extracted from Immersive Snake Game Experience
 * Modular, time-aware, performance-optimized implementation
 */

export default class TrojanSnake {
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            timeAware: true,
            mobileOptimized: true,
            trojanTier: 5,
            ...options
        };
        
        // Game state
        this.snake = [{ x: 10, y: 10 }];
        this.food = { x: 15, y: 15 };
        this.direction = { x: 1, y: 0 };
        this.nextDirection = { x: 1, y: 0 };
        this.score = 0;
        this.highScore = parseInt(localStorage.getItem('trojanSnakeHighScore') || '0');
        this.gameState = 'attract'; // attract, playing, paused, gameover
        this.isBoost = false;
        this.gridSize = { width: 20, height: 20 };
        this.cellSize = 24;
        
        // Performance monitoring
        this.performanceMetrics = {
            frameCount: 0,
            lastFrameTime: 0,
            averageFPS: 0
        };
        
        // Time-aware theming
        this.timeOfDay = this.getTimeOfDay();
        this.seasonalTheme = this.getSeasonalTheme();
        
        // Mobile detection
        this.isMobile = window.innerWidth < 768;
        
        // Game loop
        this.gameLoop = null;
        this.gameSpeed = 200;
        
        // Food system
        this.foodHistory = [];
        this.lastFoodEaten = null;
        this.emotion = 'neutral';
        
        this.init();
    }
    
    init() {
        this.createGameInterface();
        this.setupEventListeners();
        this.setupTimeAwareTheming();
        this.render();
        this.startPerformanceMonitoring();
    }
    
    createGameInterface() {
        this.container.innerHTML = `
            <div class="trojan-snake-container" data-time-of-day="${this.timeOfDay}" data-season="${this.seasonalTheme}">
                <!-- Header -->
                <header class="trojan-snake-header">
                    <div class="trojan-snake-title">
                        <span class="trojan-snake-icon">🐍</span>
                        <h3>TROJAN.SNAKE</h3>
                        <span class="trojan-snake-subtitle">CYBERPUNK INFILTRATION PROTOCOL</span>
                    </div>
                    <div class="trojan-snake-stats">
                        <div class="stat">
                            <span class="label">SCORE</span>
                            <span class="value" id="trojan-score">0</span>
                        </div>
                        <div class="stat">
                            <span class="label">BEST</span>
                            <span class="value" id="trojan-high-score">${this.highScore}</span>
                        </div>
                        <div class="stat">
                            <span class="label">LENGTH</span>
                            <span class="value" id="trojan-length">1</span>
                        </div>
                    </div>
                </header>
                
                <!-- Game Area -->
                <main class="trojan-snake-game-area">
                    <div class="trojan-snake-board-container">
                        <canvas 
                            id="trojan-snake-canvas" 
                            width="${this.gridSize.width * this.cellSize}" 
                            height="${this.gridSize.height * this.cellSize}"
                            class="trojan-snake-board"
                        ></canvas>
                        
                        <!-- Game Overlay -->
                        <div class="trojan-snake-overlay" id="game-overlay">
                            <div class="overlay-content">
                                <div class="game-message" id="game-message">
                                    <h4>TROJAN SNAKE READY</h4>
                                    <p class="time-greeting">Good ${this.timeOfDay}</p>
                                    <p class="instructions">${this.isMobile ? 'Tap to start, swipe to control' : 'SPACE to start, arrows to control'}</p>
                                </div>
                                <button class="trojan-btn primary" id="start-btn">INITIALIZE</button>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Mobile Controls -->
                    ${this.isMobile ? `
                        <div class="trojan-snake-mobile-controls">
                            <div class="control-pad">
                                <button class="control-btn up" data-direction="up">↑</button>
                                <div class="control-row">
                                    <button class="control-btn left" data-direction="left">←</button>
                                    <button class="control-btn boost" id="boost-btn">BOOST</button>
                                    <button class="control-btn right" data-direction="right">→</button>
                                </div>
                                <button class="control-btn down" data-direction="down">↓</button>
                            </div>
                        </div>
                    ` : ''}
                </main>
                
                <!-- Game Actions -->
                <div class="trojan-snake-actions">
                    <button class="trojan-btn secondary" id="pause-btn">PAUSE</button>
                    <button class="trojan-btn secondary" id="reset-btn">RESET</button>
                    <button class="trojan-btn secondary" id="close-btn">CLOSE</button>
                </div>
                
                <!-- Food History -->
                <div class="trojan-snake-history" id="food-history" style="display: none;">
                    <div class="history-title">DATA CONSUMED</div>
                    <div class="history-grid" id="history-grid"></div>
                </div>
                
                <!-- Performance Monitor -->
                ${this.options.trojanTier >= 5 ? `
                    <div class="trojan-snake-perf" id="perf-monitor">
                        <div class="perf-stat">FPS: <span id="fps-counter">60</span></div>
                        <div class="perf-stat">TIME: <span id="time-display">${this.timeOfDay.toUpperCase()}</span></div>
                    </div>
                ` : ''}
            </div>
        `;
        
        // Get canvas context
        this.canvas = document.getElementById('trojan-snake-canvas');
        this.ctx = this.canvas.getContext('2d');
        
        // High DPI support
        const dpr = window.devicePixelRatio || 1;
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        this.ctx.scale(dpr, dpr);
        this.canvas.style.width = rect.width + 'px';
        this.canvas.style.height = rect.height + 'px';
    }
    
    setupEventListeners() {
        // Game controls
        document.getElementById('start-btn').addEventListener('click', () => this.startGame());
        document.getElementById('pause-btn').addEventListener('click', () => this.togglePause());
        document.getElementById('reset-btn').addEventListener('click', () => this.resetGame());
        document.getElementById('close-btn').addEventListener('click', () => this.close());
        
        // Keyboard controls
        this.keyHandler = (e) => this.handleKeyPress(e);
        document.addEventListener('keydown', this.keyHandler);
        
        // Mobile controls
        if (this.isMobile) {
            // Touch controls
            this.setupTouchControls();
            
            // Control buttons
            document.querySelectorAll('.control-btn[data-direction]').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const direction = e.target.dataset.direction;
                    this.handleDirectionInput(direction);
                });
            });
            
            // Boost button
            const boostBtn = document.getElementById('boost-btn');
            if (boostBtn) {
                boostBtn.addEventListener('touchstart', () => this.setBoost(true));
                boostBtn.addEventListener('touchend', () => this.setBoost(false));
                boostBtn.addEventListener('mousedown', () => this.setBoost(true));
                boostBtn.addEventListener('mouseup', () => this.setBoost(false));
            }
        }
        
        // Canvas tap for mobile
        this.canvas.addEventListener('click', () => {
            if (this.isMobile && this.gameState === 'attract') {
                this.startGame();
            }
        });
        
        // Prevent context menu
        this.canvas.addEventListener('contextmenu', (e) => e.preventDefault());
    }
    
    setupTouchControls() {
        let touchStartX = 0;
        let touchStartY = 0;
        
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            touchStartX = touch.clientX;
            touchStartY = touch.clientY;
        }, { passive: false });
        
        this.canvas.addEventListener('touchend', (e) => {
            e.preventDefault();
            if (this.gameState !== 'playing') return;
            
            const touch = e.changedTouches[0];
            const deltaX = touch.clientX - touchStartX;
            const deltaY = touch.clientY - touchStartY;
            const threshold = 30;
            
            if (Math.abs(deltaX) > threshold || Math.abs(deltaY) > threshold) {
                if (Math.abs(deltaX) > Math.abs(deltaY)) {
                    this.setDirection(deltaX > 0 ? { x: 1, y: 0 } : { x: -1, y: 0 });
                } else {
                    this.setDirection(deltaY > 0 ? { x: 0, y: 1 } : { x: 0, y: -1 });
                }
            }
        }, { passive: false });
    }
    
    setupTimeAwareTheming() {
        const container = this.container.querySelector('.trojan-snake-container');
        
        // Apply time-based gradient
        const gradients = {
            morning: 'linear-gradient(135deg, #fbbf24, #f97316)',
            afternoon: 'linear-gradient(135deg, #93c5fd, #1e40af)',
            evening: 'linear-gradient(135deg, #a855f7, #ec4899)',
            night: 'linear-gradient(135deg, #a855f7, #ec4899)'
        };
        
        container.style.setProperty('--time-gradient', gradients[this.timeOfDay]);
        
        // Update greeting based on time
        const greeting = document.querySelector('.time-greeting');
        if (greeting) {
            const greetings = {
                morning: 'Good morning',
                afternoon: 'Good afternoon', 
                evening: 'Good evening',
                night: 'Good evening'
            };
            greeting.textContent = greetings[this.timeOfDay];
        }
    }
    
    handleKeyPress(e) {
        if (this.isMobile) return;
        
        switch (e.code) {
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
                this.setDirection({ x: 1, y: 0 });
                break;
            case 'Space':
                e.preventDefault();
                if (this.gameState === 'attract' || this.gameState === 'gameover') {
                    this.startGame();
                } else {
                    this.togglePause();
                }
                break;
            case 'ShiftLeft':
            case 'ShiftRight':
                e.preventDefault();
                this.setBoost(true);
                break;
        }
    }
    
    handleDirectionInput(direction) {
        const directions = {
            up: { x: 0, y: -1 },
            down: { x: 0, y: 1 },
            left: { x: -1, y: 0 },
            right: { x: 1, y: 0 }
        };
        
        if (directions[direction]) {
            this.setDirection(directions[direction]);
        }
    }
    
    setDirection(newDirection) {
        // Prevent reversing into self
        if (this.direction.x === -newDirection.x && this.direction.y === -newDirection.y) return;
        this.nextDirection = newDirection;
    }
    
    setBoost(active) {
        this.isBoost = active;
        const container = this.container.querySelector('.trojan-snake-container');
        container.classList.toggle('boost-active', active);
    }
    
    startGame() {
        this.gameState = 'playing';
        this.hideOverlay();
        this.generateFood();
        
        this.gameLoop = setInterval(() => {
            this.update();
            this.render();
        }, this.isBoost ? this.gameSpeed / 2 : this.gameSpeed);
    }
    
    togglePause() {
        if (this.gameState === 'playing') {
            this.gameState = 'paused';
            this.showOverlay('GAME PAUSED', 'Press pause to resume');
            clearInterval(this.gameLoop);
        } else if (this.gameState === 'paused') {
            this.gameState = 'playing';
            this.hideOverlay();
            this.gameLoop = setInterval(() => {
                this.update();
                this.render();
            }, this.isBoost ? this.gameSpeed / 2 : this.gameSpeed);
        }
    }
    
    resetGame() {
        clearInterval(this.gameLoop);
        this.gameState = 'attract';
        this.snake = [{ x: 10, y: 10 }];
        this.direction = { x: 1, y: 0 };
        this.nextDirection = { x: 1, y: 0 };
        this.score = 0;
        this.foodHistory = [];
        this.isBoost = false;
        this.updateUI();
        this.showOverlay('TROJAN SNAKE READY', `Good ${this.timeOfDay}`);
        this.render();
    }
    
    update() {
        // Update direction
        this.direction = { ...this.nextDirection };
        
        // Move snake
        const head = { ...this.snake[0] };
        head.x += this.direction.x;
        head.y += this.direction.y;
        
        // Check boundaries
        if (head.x < 0 || head.x >= this.gridSize.width || 
            head.y < 0 || head.y >= this.gridSize.height) {
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
            this.score += this.isBoost ? 20 : 10;
            this.lastFoodEaten = { ...this.food };
            this.foodHistory.push({ ...this.food, rarity: this.getFoodRarity() });
            this.generateFood();
            this.updateUI();
            
            // Increase speed slightly
            if (this.gameSpeed > 100) {
                this.gameSpeed -= 2;
            }
        } else {
            this.snake.pop();
        }
        
        // Update boost speed
        if (this.gameLoop) {
            clearInterval(this.gameLoop);
            this.gameLoop = setInterval(() => {
                this.update();
                this.render();
            }, this.isBoost ? this.gameSpeed / 2 : this.gameSpeed);
        }
    }
    
    generateFood() {
        do {
            this.food = {
                x: Math.floor(Math.random() * this.gridSize.width),
                y: Math.floor(Math.random() * this.gridSize.height)
            };
        } while (this.snake.some(segment => segment.x === this.food.x && segment.y === this.food.y));
    }
    
    getFoodRarity() {
        const rand = Math.random();
        if (rand < 0.05) return 'legendary';
        if (rand < 0.2) return 'rare';
        return 'common';
    }
    
    gameOver() {
        clearInterval(this.gameLoop);
        this.gameState = 'gameover';
        
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('trojanSnakeHighScore', this.highScore.toString());
            this.showOverlay('NEW HIGH SCORE!', `You scored ${this.score} points`);
        } else {
            this.showOverlay('GAME OVER', `You scored ${this.score} points`);
        }
        
        this.updateUI();
    }
    
    showOverlay(title, subtitle) {
        const overlay = document.getElementById('game-overlay');
        const message = document.getElementById('game-message');
        const btn = document.getElementById('start-btn');
        
        message.innerHTML = `
            <h4>${title}</h4>
            <p>${subtitle}</p>
        `;
        
        btn.textContent = this.gameState === 'paused' ? 'RESUME' : 
                         this.gameState === 'gameover' ? 'RESTART' : 'START';
        
        overlay.style.display = 'flex';
    }
    
    hideOverlay() {
        document.getElementById('game-overlay').style.display = 'none';
    }
    
    updateUI() {
        document.getElementById('trojan-score').textContent = this.score;
        document.getElementById('trojan-high-score').textContent = this.highScore;
        document.getElementById('trojan-length').textContent = this.snake.length;
        
        // Update food history
        if (this.foodHistory.length > 0) {
            const historyEl = document.getElementById('food-history');
            const gridEl = document.getElementById('history-grid');
            
            historyEl.style.display = 'block';
            gridEl.innerHTML = this.foodHistory.slice(-20).map(food => 
                `<div class="history-item ${food.rarity}"></div>`
            ).join('');
        }
    }
    
    render() {
        // Clear canvas
        this.ctx.fillStyle = '#0a0a0a';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw grid
        this.ctx.strokeStyle = '#1a1a1a';
        this.ctx.lineWidth = 1;
        
        for (let x = 0; x <= this.gridSize.width; x++) {
            this.ctx.beginPath();
            this.ctx.moveTo(x * this.cellSize, 0);
            this.ctx.lineTo(x * this.cellSize, this.gridSize.height * this.cellSize);
            this.ctx.stroke();
        }
        
        for (let y = 0; y <= this.gridSize.height; y++) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y * this.cellSize);
            this.ctx.lineTo(this.gridSize.width * this.cellSize, y * this.cellSize);
            this.ctx.stroke();
        }
        
        // Draw snake
        this.snake.forEach((segment, index) => {
            const x = segment.x * this.cellSize;
            const y = segment.y * this.cellSize;
            
            if (index === 0) {
                // Head
                this.ctx.fillStyle = '#00ff88';
                this.ctx.fillRect(x + 2, y + 2, this.cellSize - 4, this.cellSize - 4);
                
                // Eyes
                this.ctx.fillStyle = '#ffffff';
                this.ctx.fillRect(x + 6, y + 6, 3, 3);
                this.ctx.fillRect(x + 15, y + 6, 3, 3);
            } else {
                // Body
                const alpha = Math.max(0.3, 1 - (index * 0.05));
                this.ctx.fillStyle = `rgba(0, 255, 136, ${alpha})`;
                this.ctx.fillRect(x + 3, y + 3, this.cellSize - 6, this.cellSize - 6);
            }
        });
        
        // Draw food
        const foodX = this.food.x * this.cellSize + this.cellSize / 2;
        const foodY = this.food.y * this.cellSize + this.cellSize / 2;
        
        this.ctx.fillStyle = '#ff0066';
        this.ctx.beginPath();
        this.ctx.arc(foodX, foodY, this.cellSize / 2 - 2, 0, 2 * Math.PI);
        this.ctx.fill();
        
        // Inner highlight
        this.ctx.fillStyle = '#ffffff';
        this.ctx.beginPath();
        this.ctx.arc(foodX, foodY, this.cellSize / 4, 0, 2 * Math.PI);
        this.ctx.fill();
        
        this.updatePerformanceMetrics();
    }
    
    startPerformanceMonitoring() {
        if (this.options.trojanTier < 5) return;
        
        setInterval(() => {
            const fpsCounter = document.getElementById('fps-counter');
            if (fpsCounter) {
                fpsCounter.textContent = Math.round(this.performanceMetrics.averageFPS);
            }
        }, 1000);
    }
    
    updatePerformanceMetrics() {
        const now = performance.now();
        if (this.performanceMetrics.lastFrameTime) {
            const delta = now - this.performanceMetrics.lastFrameTime;
            const fps = 1000 / delta;
            this.performanceMetrics.averageFPS = 
                (this.performanceMetrics.averageFPS * 0.9) + (fps * 0.1);
        }
        this.performanceMetrics.lastFrameTime = now;
        this.performanceMetrics.frameCount++;
    }
    
    getTimeOfDay() {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) return 'morning';
        if (hour >= 12 && hour < 18) return 'afternoon';
        if (hour >= 18 && hour < 22) return 'evening';
        return 'night';
    }
    
    getSeasonalTheme() {
        const month = new Date().getMonth();
        if (month >= 2 && month <= 4) return 'spring';
        if (month >= 5 && month <= 7) return 'summer';
        if (month >= 8 && month <= 10) return 'autumn';
        return 'winter';
    }
    
    close() {
        this.destroy();
        // Trigger close event for Innovation Lab
        this.container.dispatchEvent(new CustomEvent('feature-close', {
            detail: { featureId: 'trojan-snake' }
        }));
    }
    
    destroy() {
        clearInterval(this.gameLoop);
        document.removeEventListener('keydown', this.keyHandler);
        this.container.innerHTML = '';
    }
}
