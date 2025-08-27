/**
 * CyberSnakeGame - Advanced Snake implementation
 * Extends CyberGameEngine with snake-specific logic
 * Touch controls, power-ups, cyberpunk effects
 */

class CyberSnakeGame extends CyberGameEngine {
    constructor(containerId, options = {}) {
        super(containerId, 'snake', {
            gridSize: 20,
            aspectRatio: 1,
            ...options
        });

        // Snake game state
        this.snake = [{ x: 10, y: 10 }];
        this.direction = { x: 1, y: 0 };
        this.nextDirection = { x: 1, y: 0 };
        this.food = null;
        this.score = 0;
        this.highScore = this.loadHighScore();
        this.speed = 150; // ms between moves
        this.lastMoveTime = 0;
        this.boostMode = false;
        this.boostEndTime = 0;

        // Food types with different effects
        this.foodTypes = {
            normal: { 
                emoji: '🍎', 
                points: 10, 
                color: '#ff4444',
                probability: 0.7,
                effect: 'grow'
            },
            boost: { 
                emoji: '⚡', 
                points: 15, 
                color: '#00ff9d',
                probability: 0.15,
                effect: 'speed'
            },
            mega: { 
                emoji: '💎', 
                points: 25, 
                color: '#4A90E2',
                probability: 0.1,
                effect: 'mega'
            },
            toxic: { 
                emoji: '☠️', 
                points: -5, 
                color: '#ff6b35',
                probability: 0.05,
                effect: 'shrink'
            }
        };

        // Visual effects
        this.particles = [];
        this.trailEffect = [];
        this.glitchEffect = false;
        this.glitchEndTime = 0;

        this.generateFood();
        this.createHUD();
        this.setupKeyboardControls();
        
        // Remove auto-start - let unified system handle it
        console.log('🐍 Snake game constructor complete - waiting for manual start');
    }

    /**
     * Create game HUD - Skip if elements already exist
     */
    createHUD() {
        // Use existing HUD elements from modal instead of creating new ones
        this.updateHUD();
    }

    /**
     * Update HUD display
     */
    updateHUD() {
        const scoreEl = document.getElementById('snake-score');
        const levelEl = document.getElementById('snake-level');
        const statusEl = document.getElementById('snake-status');
        
        if (scoreEl) scoreEl.textContent = this.score;
        if (levelEl) levelEl.textContent = Math.floor(this.score / 50) + 1;
        if (statusEl) {
            let status = this.gameState.toUpperCase();
            if (this.boostMode) status += ' [BOOST]';
            if (this.glitchEffect) status += ' [GLITCH]';
            statusEl.textContent = status;
        }
    }

    /**
     * Generate food at random position
     */
    generateFood() {
        let attempts = 0;
        do {
            this.food = {
                x: Math.floor(Math.random() * this.grid.cols),
                y: Math.floor(Math.random() * this.grid.rows)
            };
            attempts++;
        } while (this.isSnakePosition(this.food.x, this.food.y) && attempts < 100);

        // Determine food type based on probability
        const rand = Math.random();
        let cumulative = 0;
        
        for (const [type, data] of Object.entries(this.foodTypes)) {
            cumulative += data.probability;
            if (rand <= cumulative) {
                this.food.type = type;
                break;
            }
        }
        
        if (!this.food.type) this.food.type = 'normal';
    }

    /**
     * Check if position is occupied by snake
     */
    isSnakePosition(x, y) {
        return this.snake.some(segment => segment.x === x && segment.y === y);
    }

    /**
     * Setup keyboard controls
     */
    setupKeyboardControls() {
        // Add keydown listener to document
        this.keyHandler = (e) => {
            this.onKeyDown(e.code);
            e.preventDefault();
        };
        document.addEventListener('keydown', this.keyHandler);
        
        // Focus canvas for keyboard input
        if (this.canvas) {
            this.canvas.setAttribute('tabindex', '0');
            this.canvas.focus();
        }
        
        console.log('🎮 Snake keyboard controls setup complete');
    }

    /**
     * Handle keyboard input
     */
    onKeyDown(keyCode) {
        const directions = {
            'ArrowUp': { x: 0, y: -1 },
            'ArrowDown': { x: 0, y: 1 },
            'ArrowLeft': { x: -1, y: 0 },
            'ArrowRight': { x: 1, y: 0 },
            'KeyW': { x: 0, y: -1 },
            'KeyS': { x: 0, y: 1 },
            'KeyA': { x: -1, y: 0 },
            'KeyD': { x: 1, y: 0 }
        };

        if (directions[keyCode]) {
            this.setDirection(directions[keyCode]);
        } else if (keyCode === 'Space') {
            this.togglePause();
        } else if (keyCode === 'KeyR') {
            this.restart();
        }
    }

    /**
     * Handle touch direction input
     */
    onDirectionInput(direction) {
        const directions = {
            'up': { x: 0, y: -1 },
            'down': { x: 0, y: 1 },
            'left': { x: -1, y: 0 },
            'right': { x: 1, y: 0 }
        };

        if (directions[direction]) {
            this.setDirection(directions[direction]);
        }
    }

    /**
     * Handle touch action input
     */
    onActionInput(action) {
        switch (action) {
            case 'primary':
                if (this.gameState === 'idle') {
                    this.start();
                } else {
                    this.activateBoost();
                }
                break;
            case 'pause':
                this.togglePause();
                break;
            case 'restart':
                this.restart();
                break;
        }
    }

    /**
     * Set snake direction (prevent 180-degree turns)
     */
    setDirection(newDirection) {
        if (this.gameState === 'idle') {
            this.start();
        }

        // Prevent reversing into self
        if (this.snake.length > 1) {
            const oppositeX = -this.direction.x;
            const oppositeY = -this.direction.y;
            if (newDirection.x === oppositeX && newDirection.y === oppositeY) {
                return;
            }
        }

        this.nextDirection = newDirection;
    }

    /**
     * Toggle pause state
     */
    togglePause() {
        if (this.gameState === 'playing') {
            this.pause();
        } else if (this.gameState === 'paused') {
            this.resume();
        }
    }

    /**
     * Restart game
     */
    restart() {
        this.stop();
        this.snake = [{ x: 10, y: 10 }];
        this.direction = { x: 1, y: 0 };
        this.nextDirection = { x: 1, y: 0 };
        this.score = 0;
        this.speed = 150;
        this.boostMode = false;
        this.glitchEffect = false;
        this.particles = [];
        this.trailEffect = [];
        this.generateFood();
        this.updateHUD();
    }

    /**
     * Activate speed boost
     */
    activateBoost() {
        if (!this.boostMode && this.gameState === 'playing') {
            this.boostMode = true;
            this.boostEndTime = Date.now() + 3000; // 3 seconds
            this.createParticleEffect(this.snake[0], '#00ff9d', 10);
        }
    }

    /**
     * Game update logic
     */
    update(deltaTime) {
        if (this.gameState !== 'playing') return;

        const currentTime = Date.now();

        // Handle boost mode
        if (this.boostMode && currentTime > this.boostEndTime) {
            this.boostMode = false;
        }

        // Handle glitch effect
        if (this.glitchEffect && currentTime > this.glitchEndTime) {
            this.glitchEffect = false;
        }

        // Move snake based on speed
        const moveSpeed = this.boostMode ? this.speed * 0.6 : this.speed;
        if (currentTime - this.lastMoveTime > moveSpeed) {
            this.moveSnake();
            this.lastMoveTime = currentTime;
        }

        // Update particles
        this.updateParticles(deltaTime);
        
        // Update trail effect
        this.updateTrail();

        this.updateHUD();
    }

    /**
     * Move snake and handle collisions
     */
    moveSnake() {
        // Update direction
        this.direction = { ...this.nextDirection };

        // Calculate new head position
        const head = { ...this.snake[0] };
        head.x += this.direction.x;
        head.y += this.direction.y;

        // Check wall collision
        if (head.x < 0 || head.x >= this.grid.cols || 
            head.y < 0 || head.y >= this.grid.rows) {
            this.gameOver();
            return;
        }

        // Check self collision
        if (this.isSnakePosition(head.x, head.y)) {
            this.gameOver();
            return;
        }

        // Add new head
        this.snake.unshift(head);

        // Check food collision
        if (head.x === this.food.x && head.y === this.food.y) {
            this.eatFood();
        } else {
            // Remove tail if no food eaten
            const tail = this.snake.pop();
            this.trailEffect.push({
                x: tail.x,
                y: tail.y,
                opacity: 0.5,
                decay: 0.05
            });
        }
    }

    /**
     * Handle food consumption
     */
    eatFood() {
        const foodData = this.foodTypes[this.food.type];
        let points = foodData.points;

        // Apply boost multiplier
        if (this.boostMode && points > 0) {
            points = Math.floor(points * 1.5);
        }

        this.score += points;

        // Handle food effects
        switch (foodData.effect) {
            case 'grow':
                // Snake grows naturally by not removing tail
                break;
            case 'speed':
                this.activateBoost();
                break;
            case 'mega':
                this.score += 15; // Bonus points
                this.createParticleEffect(this.food, '#4A90E2', 15);
                break;
            case 'shrink':
                // Remove tail segment if possible
                if (this.snake.length > 1) {
                    this.snake.pop();
                }
                this.glitchEffect = true;
                this.glitchEndTime = Date.now() + 1000;
                break;
        }

        // Create particle effect
        this.createParticleEffect(this.food, foodData.color, 8);

        // Update high score
        if (this.score > this.highScore) {
            this.highScore = this.score;
            this.saveHighScore();
        }

        // Increase speed slightly
        this.speed = Math.max(80, this.speed - 2);

        this.generateFood();
    }

    /**
     * Game over handling
     */
    gameOver() {
        this.gameState = 'gameOver';
        this.createParticleEffect(this.snake[0], '#ff4444', 20);
        
        // Flash effect
        this.glitchEffect = true;
        this.glitchEndTime = Date.now() + 2000;
        
        setTimeout(() => {
            // Skip disruptive browser confirm dialog
            console.log(`🐍 Game Over! Score: ${this.score}`);
            // Auto-restart after brief pause
            setTimeout(() => {
                this.restart();
                this.start();
            }, 2000);
        }, 1000);
    }

    /**
     * Create particle effect
     */
    createParticleEffect(position, color, count) {
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: position.x * this.grid.cellSize + this.grid.cellSize / 2,
                y: position.y * this.grid.cellSize + this.grid.cellSize / 2,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4,
                color,
                life: 1.0,
                decay: 0.02
            });
        }
    }

    /**
     * Update particle system
     */
    updateParticles(deltaTime) {
        this.particles = this.particles.filter(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life -= particle.decay;
            return particle.life > 0;
        });
    }

    /**
     * Update trail effect
     */
    updateTrail() {
        this.trailEffect = this.trailEffect.filter(trail => {
            trail.opacity -= trail.decay;
            return trail.opacity > 0;
        });
    }

    /**
     * Render game
     */
    render() {
        super.render(); // Clear canvas

        // Apply glitch effect
        if (this.glitchEffect) {
            this.ctx.save();
            this.ctx.filter = 'hue-rotate(90deg) saturate(2)';
        }

        // Draw trail effect
        this.trailEffect.forEach(trail => {
            const pos = this.gridToCanvas(trail.x, trail.y);
            this.ctx.fillStyle = `rgba(74, 144, 226, ${trail.opacity * 0.3})`;
            this.ctx.fillRect(pos.x + 2, pos.y + 2, 
                             this.grid.cellSize - 4, this.grid.cellSize - 4);
        });

        // Draw snake
        this.snake.forEach((segment, index) => {
            const pos = this.gridToCanvas(segment.x, segment.y);
            
            if (index === 0) {
                // Snake head
                this.ctx.fillStyle = this.boostMode ? '#00ff9d' : '#4A90E2';
                this.ctx.fillRect(pos.x, pos.y, this.grid.cellSize, this.grid.cellSize);
                
                // Head details
                this.ctx.fillStyle = '#000000';
                const eyeSize = this.grid.cellSize * 0.15;
                const eyeOffset = this.grid.cellSize * 0.25;
                this.ctx.fillRect(pos.x + eyeOffset, pos.y + eyeOffset, eyeSize, eyeSize);
                this.ctx.fillRect(pos.x + this.grid.cellSize - eyeOffset - eyeSize, 
                                 pos.y + eyeOffset, eyeSize, eyeSize);
            } else {
                // Snake body
                const alpha = Math.max(0.3, 1 - (index * 0.1));
                this.ctx.fillStyle = this.boostMode ? 
                    `rgba(0, 255, 157, ${alpha})` : 
                    `rgba(74, 144, 226, ${alpha})`;
                this.ctx.fillRect(pos.x + 1, pos.y + 1, 
                                 this.grid.cellSize - 2, this.grid.cellSize - 2);
            }
        });

        // Draw food
        if (this.food) {
            const pos = this.gridToCanvas(this.food.x, this.food.y);
            const foodData = this.foodTypes[this.food.type];
            
            // Food background
            this.ctx.fillStyle = foodData.color;
            this.ctx.fillRect(pos.x, pos.y, this.grid.cellSize, this.grid.cellSize);
            
            // Food emoji/symbol
            this.ctx.fillStyle = '#ffffff';
            this.ctx.font = `${this.grid.cellSize * 0.6}px monospace`;
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(
                foodData.emoji,
                pos.x + this.grid.cellSize / 2,
                pos.y + this.grid.cellSize / 2
            );
        }

        // Draw particles
        this.particles.forEach(particle => {
            this.ctx.fillStyle = particle.color;
            this.ctx.globalAlpha = particle.life;
            this.ctx.fillRect(particle.x - 2, particle.y - 2, 4, 4);
        });
        this.ctx.globalAlpha = 1;

        // Restore context if glitch effect was applied
        if (this.glitchEffect) {
            this.ctx.restore();
        }
    }

    /**
     * Load high score from localStorage
     */
    loadHighScore() {
        try {
            return parseInt(localStorage.getItem('cyber-snake-high-score') || '0');
        } catch {
            return 0;
        }
    }

    /**
     * Save high score to localStorage
     */
    saveHighScore() {
        try {
            localStorage.setItem('cyber-snake-high-score', this.highScore.toString());
        } catch {
            console.warn('Could not save high score');
        }
    }
}

// Export for use
window.CyberSnakeGame = CyberSnakeGame;
