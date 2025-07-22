/**
 * DOS-Aligned Snake Game
 * Bulletproof, responsive, touch/mouse compatible
 * Prevents surface scrolling during gameplay
 */

class DOSSnakeGame {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.canvas = null;
        this.ctx = null;
        this.gameLoop = null;
        this.isPlaying = false;
        this.isPaused = false;
        
        // Game state
        this.snake = [];
        this.food = {};
        this.direction = { x: 1, y: 0 };
        this.nextDirection = { x: 1, y: 0 };
        this.score = 0;
        this.highScore = parseInt(localStorage.getItem('dosSnakeHighScore') || '0');
        
        // Game settings - LYRA + DM+TH Optimized (Canvas Centered)
        this.gridSize = 24;
        this.gameSpeed = 200;
        this.canvasSize = { width: 480, height: 480 };
        
        // Expressive game features
        this.level = 1;
        this.foodEaten = 0;
        this.foodPerLevel = 5;
        this.celebrationActive = false;
        this.celebrationTimer = 0;
        this.particles = [];
        this.eyeBlinkTimer = 0;
        this.eyeBlinkState = false;
        
        // Touch/input handling
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.lastInputTime = 0;
        this.inputCooldown = 100;
        
        this.init();
    }
    
    init() {
        this.createGameInterface();
        this.setupCanvas();
        this.setupEventListeners();
        this.resetGame();
        this.render();
    }
    
    createGameInterface() {
        this.container.innerHTML = `
            <div class="dos-snake-game">
                <div class="dos-snake-header">
                    <div class="dos-snake-title">
                        <span class="dos-snake-icon">🐍</span>
                        <h3>DOS Snake</h3>
                    </div>
                    <div class="dos-snake-scores">
                        <div class="dos-snake-score">Score: <span id="current-score">0</span></div>
                        <div class="dos-snake-high-score">Best: <span id="high-score">${this.highScore}</span></div>
                    </div>
                </div>
                
                <div class="dos-snake-canvas-container">
                    <canvas id="snake-canvas" width="${this.canvasSize.width}" height="${this.canvasSize.height}"></canvas>
                    <div class="dos-snake-overlay" id="game-overlay">
                        <div class="dos-snake-overlay-content">
                            <div class="dos-snake-message" id="game-message">
                                <h4>Ready to Play?</h4>
                                <p>Use arrow keys or swipe to control</p>
                            </div>
                            <button class="dos-snake-button" id="play-button">Start Game</button>
                        </div>
                    </div>
                </div>
                
                <div class="dos-snake-controls">
                    <div class="dos-snake-touch-controls" id="touch-controls">
                        <div class="dos-snake-dpad">
                            <button class="dos-snake-direction-btn dos-snake-up" data-direction="up">↑</button>
                            <div class="dos-snake-horizontal">
                                <button class="dos-snake-direction-btn dos-snake-left" data-direction="left">←</button>
                                <button class="dos-snake-direction-btn dos-snake-right" data-direction="right">→</button>
                            </div>
                            <button class="dos-snake-direction-btn dos-snake-down" data-direction="down">↓</button>
                        </div>
                    </div>
                    
                    <div class="dos-snake-actions">
                        <button class="dos-snake-button dos-snake-secondary" id="pause-button">Pause</button>
                        <button class="dos-snake-button dos-snake-secondary" id="reset-button">Reset</button>
                    </div>
                </div>
                
                <div class="dos-snake-instructions">
                    <p><strong>Desktop:</strong> Arrow keys to move</p>
                    <p><strong>Mobile:</strong> Swipe or use touch controls</p>
                    <p><strong>Goal:</strong> Eat food, avoid walls and yourself</p>
                </div>
            </div>
        `;
    }
    
    setupCanvas() {
        this.canvas = document.getElementById('snake-canvas');
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
        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            if (!this.isPlaying) return;
            
            // Prevent default behavior for arrow keys to stop page scrolling
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
                e.preventDefault();
            }
            
            this.handleKeyInput(e.code);
        });
        
        // Touch controls for canvas (swipe)
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            this.touchStartX = touch.clientX;
            this.touchStartY = touch.clientY;
        }, { passive: false });
        
        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
        }, { passive: false });
        
        this.canvas.addEventListener('touchend', (e) => {
            e.preventDefault();
            if (!this.isPlaying) return;
            
            const touch = e.changedTouches[0];
            const deltaX = touch.clientX - this.touchStartX;
            const deltaY = touch.clientY - this.touchStartY;
            
            this.handleSwipeInput(deltaX, deltaY);
        }, { passive: false });
        
        // Touch control buttons
        document.querySelectorAll('.dos-snake-direction-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                if (!this.isPlaying) return;
                this.handleDirectionInput(e.target.dataset.direction);
            });
        });
        
        // BULLETPROOF Control Button Event Handlers
        const pauseButton = document.getElementById('pause-button');
        const resetButton = document.getElementById('reset-button');
        const startButton = document.getElementById('start-button');
        
        if (pauseButton) {
            pauseButton.addEventListener('click', () => {
                console.log('🎮 Pause button clicked');
                this.togglePause();
            });
        }
        
        if (resetButton) {
            resetButton.addEventListener('click', () => {
                console.log('🎮 Reset button clicked');
                this.resetGame();
            });
        }
        
        if (startButton) {
            startButton.addEventListener('click', () => {
                console.log('🎮 Start button clicked');
                this.startGame();
            });
        }
        
        // Game control buttons
        document.getElementById('play-button').addEventListener('click', () => this.startGame());
        document.getElementById('pause-button').addEventListener('click', () => this.togglePause());
        document.getElementById('reset-button').addEventListener('click', () => this.resetGame());
        
        // Prevent context menu on long press
        this.canvas.addEventListener('contextmenu', (e) => e.preventDefault());
        
        // Focus management
        this.canvas.addEventListener('focus', () => {
            document.body.style.overflow = 'hidden';
        });
        
        this.canvas.addEventListener('blur', () => {
            document.body.style.overflow = '';
        });
    }
    
    handleKeyInput(code) {
        const now = Date.now();
        if (now - this.lastInputTime < this.inputCooldown) return;
        
        switch (code) {
            case 'ArrowUp':
                this.setDirection(0, -1);
                break;
            case 'ArrowDown':
                this.setDirection(0, 1);
                break;
            case 'ArrowLeft':
                this.setDirection(-1, 0);
                break;
            case 'ArrowRight':
                this.setDirection(1, 0);
                break;
            case 'Space':
                this.togglePause();
                break;
        }
        
        this.lastInputTime = now;
    }
    
    handleSwipeInput(deltaX, deltaY) {
        const minSwipeDistance = 30;
        const absX = Math.abs(deltaX);
        const absY = Math.abs(deltaY);
        
        if (absX < minSwipeDistance && absY < minSwipeDistance) return;
        
        if (absX > absY) {
            // Horizontal swipe
            this.setDirection(deltaX > 0 ? 1 : -1, 0);
        } else {
            // Vertical swipe
            this.setDirection(0, deltaY > 0 ? 1 : -1);
        }
    }
    
    handleDirectionInput(direction) {
        const now = Date.now();
        if (now - this.lastInputTime < this.inputCooldown) return;
        
        switch (direction) {
            case 'up':
                this.setDirection(0, -1);
                break;
            case 'down':
                this.setDirection(0, 1);
                break;
            case 'left':
                this.setDirection(-1, 0);
                break;
            case 'right':
                this.setDirection(1, 0);
                break;
        }
        
        this.lastInputTime = now;
    }
    
    setDirection(x, y) {
        // Prevent reversing into self
        if (this.direction.x === -x && this.direction.y === -y) return;
        
        this.nextDirection = { x, y };
    }
    
    startGame() {
        this.isPlaying = true;
        this.isPaused = false;
        document.getElementById('game-overlay').style.display = 'none';
        document.getElementById('pause-button').textContent = 'Pause';
        
        // Prevent page scrolling during gameplay
        document.body.style.overflow = 'hidden';
        this.canvas.focus();
        
        this.gameLoop = setInterval(() => {
            if (!this.isPaused) {
                this.update();
                this.render();
            }
        }, this.gameSpeed);
    }
    
    togglePause() {
        if (!this.isPlaying) return;
        
        this.isPaused = !this.isPaused;
        document.getElementById('pause-button').textContent = this.isPaused ? 'Resume' : 'Pause';
        
        if (this.isPaused) {
            document.body.style.overflow = '';
            this.showMessage('Game Paused', 'Press pause again to resume');
        } else {
            document.body.style.overflow = 'hidden';
            document.getElementById('game-overlay').style.display = 'none';
            this.canvas.focus();
        }
    }
    
    resetGame() {
        this.isPlaying = false;
        this.isPaused = false;
        
        if (this.gameLoop) {
            clearInterval(this.gameLoop);
            this.gameLoop = null;
        }
        
        // Reset snake to initial state
        this.snake = [{ x: 10, y: 10 }];
        this.direction = { x: 1, y: 0 };
        this.nextDirection = { x: 1, y: 0 };
        this.score = 0;
        this.level = 1;
        this.foodEaten = 0;
        this.celebrationActive = false;
        this.celebrationTimer = 0;
        this.particles = [];
        this.eyeBlinkTimer = 0;
        this.eyeBlinkState = false;
        this.gameSpeed = 200;
        this.generateFood();
        this.updateScore();
        
        // Show ready message
        this.showMessage('Ready to Play?', 'Use arrow keys or swipe to control');
        
        // Restore page scrolling
        document.body.style.overflow = '';
    }
    
    update() {
        // Update direction
        this.direction = { ...this.nextDirection };
        
        // Move snake
        const head = { ...this.snake[0] };
        head.x += this.direction.x;
        head.y += this.direction.y;
        
        // Check wall collision
        const gridWidth = this.canvasSize.width / this.gridSize;
        const gridHeight = this.canvasSize.height / this.gridSize;
        
        if (head.x < 0 || head.x >= gridWidth || head.y < 0 || head.y >= gridHeight) {
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
            this.score += 10;
            this.foodEaten++;
            this.updateScore();
            
            // Create celebration particles
            this.createFoodParticles(this.food.x * this.gridSize + this.gridSize / 2, this.food.y * this.gridSize + this.gridSize / 2);
            
            // Check for level progression
            if (this.foodEaten >= this.foodPerLevel) {
                this.levelUp();
            }
            
            this.generateFood();
            
            // Increase speed slightly (more gradual)
            if (this.gameSpeed > 120) {
                this.gameSpeed -= 5;
                clearInterval(this.gameLoop);
                this.gameLoop = setInterval(() => {
                    if (!this.isPaused) {
                        this.update();
                        this.render();
                    }
                }, this.gameSpeed);
            }
        } else {
            this.snake.pop();
        }
        
        // Update celebrations and particles
        this.updateCelebrations();
        this.updateParticles();
        this.updateEyeBlink();
    }
    
    generateFood() {
        const gridWidth = this.canvasSize.width / this.gridSize;
        const gridHeight = this.canvasSize.height / this.gridSize;
        
        do {
            this.food = {
                x: Math.floor(Math.random() * gridWidth),
                y: Math.floor(Math.random() * gridHeight)
            };
        } while (this.snake.some(segment => segment.x === this.food.x && segment.y === this.food.y));
    }
    
    levelUp() {
        this.level++;
        this.foodEaten = 0;
        this.foodPerLevel = Math.min(this.foodPerLevel + 1, 10); // Cap at 10 food per level
        
        // Start celebration
        this.celebrationActive = true;
        this.celebrationTimer = 120; // 2 seconds at 60fps
        
        // Create celebration particles
        this.createLevelUpParticles();
        
        // Show level up message briefly
        setTimeout(() => {
            const overlay = document.getElementById('game-overlay');
            const message = document.getElementById('game-message');
            const button = document.getElementById('play-button');
            
            message.innerHTML = `
                <h4 style="color: #00ff88;">🎉 Level ${this.level}! 🎉</h4>
                <p>Speed increased! Next level: ${this.foodPerLevel} food</p>
            `;
            button.textContent = 'Continue';
            overlay.style.display = 'flex';
            
            // Auto-hide after 2 seconds
            setTimeout(() => {
                overlay.style.display = 'none';
            }, 2000);
        }, 100);
    }
    
    createFoodParticles(x, y) {
        for (let i = 0; i < 8; i++) {
            this.particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 6,
                vy: (Math.random() - 0.5) * 6,
                life: 30,
                maxLife: 30,
                color: '#00ff88',
                size: Math.random() * 3 + 2
            });
        }
    }
    
    createLevelUpParticles() {
        for (let i = 0; i < 20; i++) {
            this.particles.push({
                x: this.canvasSize.width / 2,
                y: this.canvasSize.height / 2,
                vx: (Math.random() - 0.5) * 12,
                vy: (Math.random() - 0.5) * 12,
                life: 60,
                maxLife: 60,
                color: ['#00ff88', '#3b82f6', '#8b5cf6', '#f59e0b'][Math.floor(Math.random() * 4)],
                size: Math.random() * 4 + 3
            });
        }
    }
    
    updateParticles() {
        this.particles = this.particles.filter(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vy += 0.2; // Gravity
            particle.life--;
            return particle.life > 0;
        });
    }
    
    updateCelebrations() {
        if (this.celebrationActive) {
            this.celebrationTimer--;
            if (this.celebrationTimer <= 0) {
                this.celebrationActive = false;
            }
        }
    }
    
    updateEyeBlink() {
        this.eyeBlinkTimer++;
        if (this.eyeBlinkTimer > 180) { // Blink every 3 seconds
            this.eyeBlinkState = !this.eyeBlinkState;
            this.eyeBlinkTimer = 0;
        }
    }
    
    gameOver() {
        this.isPlaying = false;
        
        if (this.gameLoop) {
            clearInterval(this.gameLoop);
            this.gameLoop = null;
        }
        
        // Update high score
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('dosSnakeHighScore', this.highScore.toString());
            document.getElementById('high-score').textContent = this.highScore;
            this.showMessage('New High Score!', `You scored ${this.score} points`);
        } else {
            this.showMessage('Game Over', `You scored ${this.score} points`);
        }
        
        // Restore page scrolling
        document.body.style.overflow = '';
    }
    
    showMessage(title, subtitle) {
        const overlay = document.getElementById('game-overlay');
        const message = document.getElementById('game-message');
        const button = document.getElementById('play-button');
        
        message.innerHTML = `
            <h4>${title}</h4>
            <p>${subtitle}</p>
        `;
        
        button.textContent = this.isPlaying ? 'Resume' : 'Start Game';
        overlay.style.display = 'flex';
    }
    
    updateScore() {
        document.getElementById('current-score').textContent = this.score;
    }
    
    render() {
        // Clear canvas with theme-aware background
        this.ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--ric-color-surface-secondary').trim() || '#f8f9fa';
        this.ctx.fillRect(0, 0, this.canvasSize.width, this.canvasSize.height);
        
        // Draw visible grid for better gameplay
        this.ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--ric-color-border').trim() || '#e5e7eb';
        this.ctx.lineWidth = 1;
        this.ctx.globalAlpha = 0.3;
        
        for (let x = 0; x <= this.canvasSize.width; x += this.gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvasSize.height);
            this.ctx.stroke();
        }
        
        for (let y = 0; y <= this.canvasSize.height; y += this.gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvasSize.width, y);
            this.ctx.stroke();
        }
        
        this.ctx.globalAlpha = 1;
        
        // Draw expressive snake
        this.snake.forEach((segment, index) => {
            const x = segment.x * this.gridSize;
            const y = segment.y * this.gridSize;
            
            if (index === 0) {
                // Snake head with rounded corners and expressive eyes
                this.ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--ric-color-primary').trim();
                
                // Draw rounded head
                this.ctx.beginPath();
                this.ctx.roundRect(x + 2, y + 2, this.gridSize - 4, this.gridSize - 4, 6);
                this.ctx.fill();
                
                // Draw expressive eyes
                const eyeSize = this.eyeBlinkState ? 2 : 4;
                const eyeY = y + 6;
                
                // Left eye
                this.ctx.fillStyle = '#ffffff';
                this.ctx.beginPath();
                this.ctx.arc(x + 6, eyeY, eyeSize, 0, 2 * Math.PI);
                this.ctx.fill();
                
                // Right eye
                this.ctx.beginPath();
                this.ctx.arc(x + 14, eyeY, eyeSize, 0, 2 * Math.PI);
                this.ctx.fill();
                
                // Eye pupils (if not blinking)
                if (!this.eyeBlinkState) {
                    this.ctx.fillStyle = '#000000';
                    this.ctx.beginPath();
                    this.ctx.arc(x + 6, eyeY, 1.5, 0, 2 * Math.PI);
                    this.ctx.fill();
                    
                    this.ctx.beginPath();
                    this.ctx.arc(x + 14, eyeY, 1.5, 0, 2 * Math.PI);
                    this.ctx.fill();
                }
                
            } else {
                // Snake body with gradient effect
                const alpha = Math.max(0.3, 0.9 - (index * 0.05));
                this.ctx.globalAlpha = alpha;
                this.ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--ric-color-accent').trim();
                
                // Draw rounded body segment
                this.ctx.beginPath();
                this.ctx.roundRect(x + 3, y + 3, this.gridSize - 6, this.gridSize - 6, 4);
                this.ctx.fill();
            }
        });
        
        this.ctx.globalAlpha = 1;
        
        // Draw ABSOLUTELY VISIBLE food pellet - MAXIMUM CONTRAST
        const foodX = this.food.x * this.gridSize + this.gridSize / 2;
        const foodY = this.food.y * this.gridSize + this.gridSize / 2;
        const foodRadius = this.gridSize / 2 - 1; // Larger food
        
        // MASSIVE glow effect for absolute visibility
        this.ctx.shadowColor = '#ff0000';
        this.ctx.shadowBlur = 20;
        
        // BRIGHT RED food circle - ABSOLUTELY VISIBLE
        this.ctx.fillStyle = '#ff0000';
        this.ctx.beginPath();
        this.ctx.arc(foodX, foodY, foodRadius, 0, 2 * Math.PI);
        this.ctx.fill();
        
        // WHITE inner highlight for maximum contrast
        this.ctx.shadowBlur = 0;
        this.ctx.fillStyle = '#ffffff';
        this.ctx.beginPath();
        this.ctx.arc(foodX, foodY, foodRadius / 2, 0, 2 * Math.PI);
        this.ctx.fill();
        
        // BLACK center dot for absolute visibility
        this.ctx.fillStyle = '#000000';
        this.ctx.beginPath();
        this.ctx.arc(foodX, foodY, 2, 0, 2 * Math.PI);
        this.ctx.fill();
        
        // Draw celebration particles
        this.particles.forEach(particle => {
            const alpha = particle.life / particle.maxLife;
            this.ctx.globalAlpha = alpha;
            this.ctx.fillStyle = particle.color;
            
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, 2 * Math.PI);
            this.ctx.fill();
        });
        
        this.ctx.globalAlpha = 1;
        this.ctx.shadowBlur = 0;
        
        // Draw level indicator
        this.ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--ric-color-text-muted').trim();
        this.ctx.font = '12px monospace';
        this.ctx.fillText(`Level ${this.level}`, 10, 20);
        this.ctx.fillText(`Food: ${this.foodEaten}/${this.foodPerLevel}`, 10, 35);
        
        // Draw celebration overlay if active
        if (this.celebrationActive) {
            const intensity = Math.sin(this.celebrationTimer * 0.3) * 0.5 + 0.5;
            this.ctx.fillStyle = `rgba(0, 255, 136, ${intensity * 0.1})`;
            this.ctx.fillRect(0, 0, this.canvasSize.width, this.canvasSize.height);
        }
    }
    
    destroy() {
        if (this.gameLoop) {
            clearInterval(this.gameLoop);
        }
        document.body.style.overflow = '';
    }
}

// Export for use
window.DOSSnakeGame = DOSSnakeGame;
