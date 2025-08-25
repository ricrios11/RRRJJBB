/**
 * CYBERPUNK SNAKE GAME
 * Unified aesthetic: Terminal-based with neon trails and grid precision
 * Integration: Hero section, Innovation Lab
 */

class CyberpunkSnakeGame {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.canvas = null;
        this.ctx = null;
        this.gameLoop = null;
        this.isPlaying = false;
        this.isPaused = false;
        
        // Game state
        this.snake = [{ x: 10, y: 10 }];
        this.direction = { x: 1, y: 0 };
        this.food = { x: 15, y: 15 };
        this.score = 0;
        this.highScore = parseInt(localStorage.getItem('cyberpunk-snake-high-score') || '0');
        this.level = 1;
        this.speed = 150;
        
        // Cyberpunk visual elements
        this.gridSize = 20;
        this.neonTrails = [];
        this.particles = [];
        this.scanlineOffset = 0;
        this.glitchIntensity = 0;
        
        // Time-aware theming
        this.currentTheme = this.getTimeTheme();
        
        // Achievement system
        this.achievements = [];
        this.onAchievement = null;
        
        this.init();
    }
    
    getTimeTheme() {
        const hour = new Date().getHours();
        
        if (hour >= 6 && hour < 12) {
            return {
                name: 'Boot Sequence',
                accent: '#00FF41',
                glow: 'rgba(0, 255, 65, 0.6)',
                bg: '#000000',
                grid: 'rgba(0, 255, 65, 0.1)'
            };
        } else if (hour >= 12 && hour < 18) {
            return {
                name: 'Active Session',
                accent: '#00FFFF',
                glow: 'rgba(0, 255, 255, 0.6)',
                bg: '#000000',
                grid: 'rgba(0, 255, 255, 0.1)'
            };
        } else if (hour >= 18 && hour < 22) {
            return {
                name: 'Neon District',
                accent: '#FF2D92',
                glow: 'rgba(255, 45, 146, 0.6)',
                bg: '#0A0A0A',
                grid: 'rgba(255, 45, 146, 0.1)'
            };
        } else {
            return {
                name: 'Deep Scan',
                accent: '#FF6600',
                glow: 'rgba(255, 102, 0, 0.6)',
                bg: '#000000',
                grid: 'rgba(255, 102, 0, 0.1)'
            };
        }
    }
    
    init() {
        this.createGameInterface();
        this.setupCanvas();
        this.bindEvents();
        this.render();
    }
    
    createGameInterface() {
        this.container.innerHTML = `
            <div class="cyberpunk-snake-container">
                <div class="cyber-terminal-header">
                    <div class="terminal-title">
                        <span class="cyber-data-label">SYSTEM:</span>
                        <span class="cyber-data-value">${this.currentTheme.name}</span>
                    </div>
                    <div class="game-stats">
                        <div class="stat">
                            <span class="cyber-data-label">SCORE:</span>
                            <span class="cyber-data-value" id="current-score">000</span>
                        </div>
                        <div class="stat">
                            <span class="cyber-data-label">HIGH:</span>
                            <span class="cyber-data-value" id="high-score">${this.highScore.toString().padStart(3, '0')}</span>
                        </div>
                        <div class="stat">
                            <span class="cyber-data-label">LVL:</span>
                            <span class="cyber-data-value" id="level">01</span>
                        </div>
                    </div>
                </div>
                
                <div class="game-canvas-container">
                    <canvas id="cyberpunk-snake-canvas"></canvas>
                    <div class="scanlines"></div>
                </div>
                
                <div class="game-controls">
                    <button class="cyber-button" id="play-pause-btn">INITIALIZE</button>
                    <button class="cyber-button" id="reset-btn">RESET</button>
                </div>
                
                <div class="game-instructions">
                    <div class="cyber-data-label">CONTROLS:</div>
                    <div class="control-grid keyboard-instructions">
                        <span>WASD / ARROWS</span>
                        <span>SPACE: PAUSE</span>
                        <span>R: RESET</span>
                    </div>
                    <div class="touch-instructions">
                        <span>SWIPE TO CONTROL • TAP BUTTONS TO PLAY/PAUSE</span>
                    </div>
                </div>
            </div>
        `;
        
        // Add cyberpunk styling
        const style = document.createElement('style');
        style.textContent = `
            .cyberpunk-snake-container {
                background: ${this.currentTheme.bg};
                border: 1px solid ${this.currentTheme.accent};
                border-radius: 4px;
                box-shadow: 0 0 20px ${this.currentTheme.glow};
                padding: 1rem;
                font-family: 'SF Mono', monospace;
                position: relative;
                max-width: 600px;
                margin: 0 auto;
            }
            
            .cyber-terminal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1rem;
                padding-bottom: 0.5rem;
                border-bottom: 1px solid ${this.currentTheme.accent};
            }
            
            .terminal-title {
                color: ${this.currentTheme.accent};
                text-shadow: 0 0 5px ${this.currentTheme.glow};
            }
            
            .game-stats {
                display: flex;
                gap: 1rem;
            }
            
            .stat {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 0.25rem;
            }
            
            .cyber-data-label {
                color: #666;
                font-size: 0.75rem;
                letter-spacing: 0.1em;
            }
            
            .cyber-data-value {
                color: ${this.currentTheme.accent};
                font-weight: bold;
                text-shadow: 0 0 5px ${this.currentTheme.glow};
            }
            
            .game-canvas-container {
                position: relative;
                display: flex;
                justify-content: center;
                margin: 1rem 0;
            }
            
            #cyberpunk-snake-canvas {
                border: 1px solid ${this.currentTheme.accent};
                box-shadow: inset 0 0 20px ${this.currentTheme.glow};
                background: ${this.currentTheme.bg};
            }
            
            .scanlines {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: repeating-linear-gradient(
                    0deg,
                    transparent,
                    transparent 2px,
                    ${this.currentTheme.grid} 2px,
                    ${this.currentTheme.grid} 4px
                );
                pointer-events: none;
            }
            
            .game-controls {
                display: flex;
                gap: 1rem;
                justify-content: center;
                margin: 1rem 0;
            }
            
            .cyber-button {
                background: transparent;
                border: 1px solid ${this.currentTheme.accent};
                color: ${this.currentTheme.accent};
                padding: 0.5rem 1rem;
                cursor: pointer;
                font-family: 'SF Mono', monospace;
                font-weight: bold;
                letter-spacing: 0.1em;
                transition: all 0.3s ease;
            }
            
            .cyber-button:hover {
                background: ${this.currentTheme.accent};
                color: ${this.currentTheme.bg};
                box-shadow: 0 0 15px ${this.currentTheme.glow};
            }
            
            .game-instructions {
                text-align: center;
                margin-top: 1rem;
                padding-top: 1rem;
                border-top: 1px solid ${this.currentTheme.accent};
            }
            
            .control-grid {
                display: flex;
                justify-content: space-around;
                margin-top: 0.5rem;
                color: #999;
                font-size: 0.875rem;
            }
            
            .touch-instructions {
                display: none;
            }
            
            @media (hover: none) and (pointer: coarse) {
                .keyboard-instructions {
                    display: none;
                }
                .touch-instructions {
                    display: block;
                    text-align: center;
                    color: #999;
                    font-size: 0.875rem;
                    margin-top: 0.5rem;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    setupCanvas() {
        this.canvas = document.getElementById('cyberpunk-snake-canvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Set canvas size
        this.canvas.width = 400;
        this.canvas.height = 400;
        
        // Set up high DPI rendering
        const dpr = window.devicePixelRatio || 1;
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        this.ctx.scale(dpr, dpr);
        this.canvas.style.width = rect.width + 'px';
        this.canvas.style.height = rect.height + 'px';
    }
    
    bindEvents() {
        // Button controls
        document.getElementById('play-pause-btn').addEventListener('click', () => {
            this.toggleGame();
        });
        
        document.getElementById('reset-btn').addEventListener('click', () => {
            this.resetGame();
        });
        
        // Touch/swipe controls for mobile
        this.setupTouchControls();
        
        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            if (!this.isPlaying) return;
            
            switch(e.key.toLowerCase()) {
                case 'w':
                case 'arrowup':
                    if (this.direction.y === 0) this.direction = { x: 0, y: -1 };
                    break;
                case 's':
                case 'arrowdown':
                    if (this.direction.y === 0) this.direction = { x: 0, y: 1 };
                    break;
                case 'a':
                case 'arrowleft':
                    if (this.direction.x === 0) this.direction = { x: -1, y: 0 };
                    break;
                case 'd':
                case 'arrowright':
                    if (this.direction.x === 0) this.direction = { x: 1, y: 0 };
                    break;
                case ' ':
                    this.togglePause();
                    break;
            }
        });
    }
    
    setupTouchControls() {
        let touchStartX = 0;
        let touchStartY = 0;
        const minSwipeDistance = 30;
        
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            touchStartX = touch.clientX;
            touchStartY = touch.clientY;
        }, { passive: false });
        
        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
        }, { passive: false });
        
        this.canvas.addEventListener('touchend', (e) => {
            e.preventDefault();
            if (!this.isPlaying) return;
            
            const touch = e.changedTouches[0];
            const deltaX = touch.clientX - touchStartX;
            const deltaY = touch.clientY - touchStartY;
            
            // Check if swipe distance is sufficient
            if (Math.abs(deltaX) < minSwipeDistance && Math.abs(deltaY) < minSwipeDistance) {
                return;
            }
            
            // Determine swipe direction
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                // Horizontal swipe
                if (deltaX > 0 && this.direction.x === 0) {
                    // Swipe right
                    this.direction = { x: 1, y: 0 };
                } else if (deltaX < 0 && this.direction.x === 0) {
                    // Swipe left
                    this.direction = { x: -1, y: 0 };
                }
            } else {
                // Vertical swipe
                if (deltaY > 0 && this.direction.y === 0) {
                    // Swipe down
                    this.direction = { x: 0, y: 1 };
                } else if (deltaY < 0 && this.direction.y === 0) {
                    // Swipe up
                    this.direction = { x: 0, y: -1 };
                }
            }
        }, { passive: false });
    }
    
    toggleGame() {
        if (!this.isPlaying) {
            this.startGame();
        } else {
            this.togglePause();
        }
    }
    
    startGame() {
        this.isPlaying = true;
        this.isPaused = false;
        document.getElementById('play-pause-btn').textContent = 'PAUSE';
        this.gameLoop = setInterval(() => this.update(), this.speed);
    }
    
    togglePause() {
        this.isPaused = !this.isPaused;
        document.getElementById('play-pause-btn').textContent = this.isPaused ? 'RESUME' : 'PAUSE';
        
        if (this.isPaused) {
            clearInterval(this.gameLoop);
        } else {
            this.gameLoop = setInterval(() => this.update(), this.speed);
        }
    }
    
    resetGame() {
        clearInterval(this.gameLoop);
        this.isPlaying = false;
        this.isPaused = false;
        this.snake = [{ x: 10, y: 10 }];
        this.direction = { x: 1, y: 0 };
        this.food = { x: 15, y: 15 };
        this.score = 0;
        this.level = 1;
        this.speed = 150;
        this.neonTrails = [];
        this.particles = [];
        this.glitchIntensity = 0;
        
        document.getElementById('play-pause-btn').textContent = 'INITIALIZE';
        this.updateUI();
        this.render();
    }
    
    update() {
        if (this.isPaused) return;
        
        // Move snake
        const head = { ...this.snake[0] };
        head.x += this.direction.x;
        head.y += this.direction.y;
        
        // Check wall collision
        if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20) {
            this.gameOver();
            return;
        }
        
        // Check self collision
        if (this.snake.some(segment => segment.x === head.x && segment.y === head.y)) {
            this.gameOver();
            return;
        }
        
        this.snake.unshift(head);
        
        // Add neon trail
        this.addNeonTrail(head);
        
        // Check food collision
        if (head.x === this.food.x && head.y === this.food.y) {
            this.eatFood();
        } else {
            this.snake.pop();
        }
        
        // Update visual effects
        this.updateNeonTrails();
        this.updateParticles();
        this.scanlineOffset += 0.5;
        
        this.render();
    }
    
    addNeonTrail(position) {
        this.neonTrails.push({
            x: position.x,
            y: position.y,
            opacity: 1,
            size: this.gridSize
        });
        
        // Limit trail length
        if (this.neonTrails.length > 20) {
            this.neonTrails.shift();
        }
    }
    
    updateNeonTrails() {
        this.neonTrails = this.neonTrails.map(trail => ({
            ...trail,
            opacity: trail.opacity * 0.95,
            size: trail.size * 0.98
        })).filter(trail => trail.opacity > 0.1);
    }
    
    updateParticles() {
        this.particles = this.particles.map(particle => ({
            ...particle,
            x: particle.x + particle.vx,
            y: particle.y + particle.vy,
            opacity: particle.opacity * 0.95,
            size: particle.size * 0.98
        })).filter(particle => particle.opacity > 0.1);
    }
    
    eatFood() {
        this.score += 10;
        this.createFoodParticles();
        this.generateFood();
        this.checkLevelUp();
        this.updateUI();
        
        // Trigger achievement
        if (this.score > 0 && this.score % 100 === 0) {
            this.triggerAchievement('score_milestone', {
                score: this.score,
                level: this.level
            });
        }
        
        // Add glitch effect
        this.glitchIntensity = 0.5;
    }
    
    createFoodParticles() {
        for (let i = 0; i < 8; i++) {
            this.particles.push({
                x: this.food.x * this.gridSize + this.gridSize / 2,
                y: this.food.y * this.gridSize + this.gridSize / 2,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4,
                opacity: 1,
                size: 3,
                color: this.currentTheme.accent
            });
        }
    }
    
    generateFood() {
        do {
            this.food = {
                x: Math.floor(Math.random() * 20),
                y: Math.floor(Math.random() * 20)
            };
        } while (this.snake.some(segment => segment.x === this.food.x && segment.y === this.food.y));
    }
    
    checkLevelUp() {
        const newLevel = Math.floor(this.score / 50) + 1;
        if (newLevel > this.level) {
            this.level = newLevel;
            this.speed = Math.max(80, 150 - (this.level - 1) * 10);
            
            // Restart game loop with new speed
            clearInterval(this.gameLoop);
            this.gameLoop = setInterval(() => this.update(), this.speed);
            
            this.triggerAchievement('level_up', {
                level: this.level,
                speed: this.speed
            });
        }
    }
    
    gameOver() {
        clearInterval(this.gameLoop);
        this.isPlaying = false;
        
        // Update high score
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('cyberpunk-snake-high-score', this.highScore.toString());
            this.triggerAchievement('high_score', {
                score: this.score,
                previousHigh: this.highScore
            });
        }
        
        document.getElementById('play-pause-btn').textContent = 'RESTART';
        this.glitchIntensity = 1;
        
        // Game over effect
        setTimeout(() => {
            this.glitchIntensity = 0;
        }, 1000);
    }
    
    triggerAchievement(type, data) {
        const achievement = {
            type: 'snake_achievement',
            title: this.getAchievementTitle(type, data),
            description: this.getAchievementDescription(type, data),
            data: data
        };
        
        this.achievements.push(achievement);
        
        if (this.onAchievement) {
            this.onAchievement(achievement);
        }
        
        // Visual feedback
        console.log('🏆 Achievement:', achievement.title);
    }
    
    getAchievementTitle(type, data) {
        switch(type) {
            case 'score_milestone':
                return `Score Milestone: ${data.score}`;
            case 'level_up':
                return `Level ${data.level} Reached`;
            case 'high_score':
                return 'New High Score!';
            default:
                return 'Achievement Unlocked';
        }
    }
    
    getAchievementDescription(type, data) {
        switch(type) {
            case 'score_milestone':
                return `Reached ${data.score} points in the cyberpunk grid`;
            case 'level_up':
                return `Advanced to level ${data.level} - speed increased`;
            case 'high_score':
                return `New personal best: ${data.score} points`;
            default:
                return 'Achievement unlocked in Snake';
        }
    }
    
    updateUI() {
        document.getElementById('current-score').textContent = this.score.toString().padStart(3, '0');
        document.getElementById('high-score').textContent = this.highScore.toString().padStart(3, '0');
        document.getElementById('level').textContent = this.level.toString().padStart(2, '0');
    }
    
    render() {
        const ctx = this.ctx;
        const canvasWidth = this.canvas.width / (window.devicePixelRatio || 1);
        const canvasHeight = this.canvas.height / (window.devicePixelRatio || 1);
        
        // Clear canvas
        ctx.fillStyle = this.currentTheme.bg;
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        
        // Draw dark matter universal plane grid
        ctx.strokeStyle = this.currentTheme.grid;
        ctx.lineWidth = 0.8;
        ctx.globalAlpha = 0.6;
        
        // Primary grid lines
        for (let i = 0; i <= 20; i++) {
            const pos = i * this.gridSize;
            ctx.beginPath();
            ctx.moveTo(pos, 0);
            ctx.lineTo(pos, canvasHeight);
            ctx.moveTo(0, pos);
            ctx.lineTo(canvasWidth, pos);
            ctx.stroke();
        }
        
        // Secondary grid lines for depth
        ctx.strokeStyle = this.currentTheme.accent;
        ctx.lineWidth = 0.3;
        ctx.globalAlpha = 0.2;
        
        for (let i = 0; i <= 40; i++) {
            const pos = i * (this.gridSize / 2);
            if (i % 2 !== 0) { // Only draw between major grid lines
                ctx.beginPath();
                ctx.moveTo(pos, 0);
                ctx.lineTo(pos, canvasHeight);
                ctx.moveTo(0, pos);
                ctx.lineTo(canvasWidth, pos);
                ctx.stroke();
            }
        }
        
        // Grid intersection points for cosmic effect
        ctx.fillStyle = this.currentTheme.accent;
        ctx.globalAlpha = 0.4;
        for (let x = 0; x <= 20; x++) {
            for (let y = 0; y <= 20; y++) {
                const posX = x * this.gridSize;
                const posY = y * this.gridSize;
                ctx.beginPath();
                ctx.arc(posX, posY, 0.8, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        ctx.globalAlpha = 1;
        
        // Draw neon trails
        this.neonTrails.forEach(trail => {
            ctx.fillStyle = `rgba(${this.hexToRgb(this.currentTheme.accent)}, ${trail.opacity * 0.3})`;
            ctx.fillRect(
                trail.x * this.gridSize + (this.gridSize - trail.size) / 2,
                trail.y * this.gridSize + (this.gridSize - trail.size) / 2,
                trail.size,
                trail.size
            );
        });
        
        // Draw snake
        this.snake.forEach((segment, index) => {
            const isHead = index === 0;
            const opacity = isHead ? 1 : 0.8 - (index * 0.1);
            
            ctx.fillStyle = this.currentTheme.accent;
            ctx.shadowColor = this.currentTheme.glow;
            ctx.shadowBlur = isHead ? 10 : 5;
            
            ctx.fillRect(
                segment.x * this.gridSize + 2,
                segment.y * this.gridSize + 2,
                this.gridSize - 4,
                this.gridSize - 4
            );
            
            // Head details
            if (isHead) {
                ctx.fillStyle = this.currentTheme.bg;
                ctx.fillRect(
                    segment.x * this.gridSize + 6,
                    segment.y * this.gridSize + 6,
                    this.gridSize - 12,
                    this.gridSize - 12
                );
            }
        });
        
        // Draw food
        ctx.fillStyle = this.currentTheme.accent;
        ctx.shadowColor = this.currentTheme.glow;
        ctx.shadowBlur = 15;
        
        const foodPulse = Math.sin(Date.now() * 0.01) * 0.2 + 0.8;
        const foodSize = (this.gridSize - 4) * foodPulse;
        const foodOffset = (this.gridSize - foodSize) / 2;
        
        ctx.fillRect(
            this.food.x * this.gridSize + foodOffset,
            this.food.y * this.gridSize + foodOffset,
            foodSize,
            foodSize
        );
        
        // Draw particles
        this.particles.forEach(particle => {
            ctx.fillStyle = `rgba(${this.hexToRgb(particle.color)}, ${particle.opacity})`;
            ctx.shadowBlur = 5;
            ctx.fillRect(
                particle.x - particle.size / 2,
                particle.y - particle.size / 2,
                particle.size,
                particle.size
            );
        });
        
        // Reset shadow
        ctx.shadowBlur = 0;
        
        // Apply glitch effect
        if (this.glitchIntensity > 0) {
            this.applyGlitchEffect();
            this.glitchIntensity *= 0.95;
        }
    }
    
    applyGlitchEffect() {
        const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
            if (Math.random() < this.glitchIntensity * 0.1) {
                data[i] = Math.random() * 255;     // Red
                data[i + 1] = Math.random() * 255; // Green
                data[i + 2] = Math.random() * 255; // Blue
            }
        }
        
        this.ctx.putImageData(imageData, 0, 0);
    }
    
    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? 
            `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : 
            '255, 255, 255';
    }
    
    // Public API for integration
    setAchievementCallback(callback) {
        this.onAchievement = callback;
    }
    
    getGameStats() {
        return {
            score: this.score,
            highScore: this.highScore,
            level: this.level,
            isPlaying: this.isPlaying,
            theme: this.currentTheme.name
        };
    }
}

// Auto-initialize if container exists
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('cyberpunk-snake-game');
    if (container) {
        window.cyberpunkSnakeGame = new CyberpunkSnakeGame('cyberpunk-snake-game');
    }
});

export default CyberpunkSnakeGame;
