/**
 * Graffiti Slap Game - Innovation Lab Feature
 * Neon-lined cyberpunk sticker placement game with physics and style
 * Time-aware, mobile-optimized, performance-monitored
 */

export default class GraffitiSlap {
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            timeAware: true,
            mobileOptimized: true,
            trojanTier: 3,
            ...options
        };
        
        // Game state
        this.score = 0;
        this.highScore = parseInt(localStorage.getItem('graffitiSlapHighScore') || '0');
        this.gameState = 'attract'; // attract, playing, gameover
        this.timeRemaining = 60; // 60 second rounds
        
        // Sticker system
        this.stickers = [];
        this.availableStickers = this.generateStickerPalette();
        this.selectedSticker = null;
        this.placedStickers = [];
        
        // Physics
        this.gravity = 0.5;
        this.friction = 0.95;
        this.bounce = 0.7;
        
        // Canvas setup
        this.canvas = null;
        this.ctx = null;
        this.canvasSize = { width: 600, height: 400 };
        
        // Time-aware theming
        this.timeOfDay = this.getTimeOfDay();
        this.neonColors = this.getNeonPalette();
        
        // Mobile detection
        this.isMobile = window.innerWidth < 768;
        if (this.isMobile) {
            this.canvasSize = { width: 350, height: 250 };
        }
        
        // Game loop
        this.gameLoop = null;
        this.particles = [];
        
        // Performance metrics
        this.performanceMetrics = {
            frameCount: 0,
            averageFPS: 0,
            lastFrameTime: 0
        };
        
        this.init();
    }
    
    init() {
        this.createGameInterface();
        this.setupCanvas();
        this.setupEventListeners();
        this.setupTimeAwareTheming();
        this.render();
        this.startPerformanceMonitoring();
    }
    
    createGameInterface() {
        this.container.innerHTML = `
            <div class="graffiti-slap-container" data-time-of-day="${this.timeOfDay}">
                <!-- Header -->
                <header class="graffiti-slap-header">
                    <div class="graffiti-title">
                        <span class="graffiti-icon">🎨</span>
                        <h3>GRAFFITI.SLAP</h3>
                        <span class="graffiti-subtitle">NEON STICKER WARFARE</span>
                    </div>
                    <div class="graffiti-stats">
                        <div class="stat">
                            <span class="label">STYLE</span>
                            <span class="value" id="graffiti-score">0</span>
                        </div>
                        <div class="stat">
                            <span class="label">BEST</span>
                            <span class="value" id="graffiti-high-score">${this.highScore}</span>
                        </div>
                        <div class="stat">
                            <span class="label">TIME</span>
                            <span class="value" id="graffiti-timer">60</span>
                        </div>
                    </div>
                </header>
                
                <!-- Game Area -->
                <main class="graffiti-game-area">
                    <div class="graffiti-canvas-container">
                        <canvas 
                            id="graffiti-canvas" 
                            width="${this.canvasSize.width}" 
                            height="${this.canvasSize.height}"
                            class="graffiti-canvas"
                        ></canvas>
                        
                        <!-- Game Overlay -->
                        <div class="graffiti-overlay" id="game-overlay">
                            <div class="overlay-content">
                                <div class="game-message" id="game-message">
                                    <h4>GRAFFITI SLAP READY</h4>
                                    <p class="time-greeting">Good ${this.timeOfDay}</p>
                                    <p class="instructions">Place stickers with style and physics!</p>
                                </div>
                                <button class="graffiti-btn primary" id="start-btn">START SLAPPING</button>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Sticker Palette -->
                    <div class="graffiti-palette" id="sticker-palette">
                        <div class="palette-title">STICKER ARSENAL</div>
                        <div class="palette-grid" id="palette-grid">
                            ${this.availableStickers.map((sticker, index) => `
                                <div class="sticker-option ${index === 0 ? 'selected' : ''}" 
                                     data-sticker-id="${sticker.id}"
                                     style="background: ${sticker.color}; border-color: ${sticker.neon};">
                                    ${sticker.symbol}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </main>
                
                <!-- Game Actions -->
                <div class="graffiti-actions">
                    <button class="graffiti-btn secondary" id="clear-btn">CLEAR WALL</button>
                    <button class="graffiti-btn secondary" id="reset-btn">RESET</button>
                    <button class="graffiti-btn secondary" id="close-btn">CLOSE</button>
                </div>
                
                <!-- Style Meter -->
                <div class="graffiti-style-meter" id="style-meter">
                    <div class="meter-title">STYLE METER</div>
                    <div class="meter-bar">
                        <div class="meter-fill" id="style-fill" style="width: 0%"></div>
                    </div>
                    <div class="meter-labels">
                        <span>BASIC</span>
                        <span>FRESH</span>
                        <span>LEGENDARY</span>
                    </div>
                </div>
                
                <!-- Performance Monitor -->
                ${this.options.trojanTier >= 3 ? `
                    <div class="graffiti-perf" id="perf-monitor">
                        <div class="perf-stat">FPS: <span id="fps-counter">60</span></div>
                        <div class="perf-stat">PARTICLES: <span id="particle-counter">0</span></div>
                    </div>
                ` : ''}
            </div>
        `;
        
        // Set initial selected sticker
        this.selectedSticker = this.availableStickers[0];
    }
    
    setupCanvas() {
        this.canvas = document.getElementById('graffiti-canvas');
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
        document.getElementById('clear-btn').addEventListener('click', () => this.clearWall());
        document.getElementById('reset-btn').addEventListener('click', () => this.resetGame());
        document.getElementById('close-btn').addEventListener('click', () => this.close());
        
        // Sticker palette selection
        document.querySelectorAll('.sticker-option').forEach(option => {
            option.addEventListener('click', (e) => {
                document.querySelectorAll('.sticker-option').forEach(o => o.classList.remove('selected'));
                e.target.classList.add('selected');
                
                const stickerId = e.target.dataset.stickerId;
                this.selectedSticker = this.availableStickers.find(s => s.id === stickerId);
            });
        });
        
        // Canvas interaction
        this.canvas.addEventListener('click', (e) => this.handleCanvasClick(e));
        this.canvas.addEventListener('mousemove', (e) => this.handleCanvasHover(e));
        
        // Touch support for mobile
        if (this.isMobile) {
            this.canvas.addEventListener('touchstart', (e) => {
                e.preventDefault();
                const touch = e.touches[0];
                const rect = this.canvas.getBoundingClientRect();
                const x = touch.clientX - rect.left;
                const y = touch.clientY - rect.top;
                this.placeSticker(x, y);
            }, { passive: false });
        }
        
        // Prevent context menu
        this.canvas.addEventListener('contextmenu', (e) => e.preventDefault());
    }
    
    setupTimeAwareTheming() {
        const container = this.container.querySelector('.graffiti-slap-container');
        
        // Apply time-based neon colors
        const neonGradients = {
            morning: 'linear-gradient(45deg, #ff6b35, #f7931e)',
            afternoon: 'linear-gradient(45deg, #00d4ff, #0099cc)', 
            evening: 'linear-gradient(45deg, #ff0080, #8000ff)',
            night: 'linear-gradient(45deg, #00ff88, #0080ff)'
        };
        
        container.style.setProperty('--neon-gradient', neonGradients[this.timeOfDay]);
        
        // Update neon colors based on time
        this.neonColors = this.getNeonPalette();
    }
    
    generateStickerPalette() {
        const symbols = ['★', '♦', '●', '▲', '■', '♠', '♥', '♣', '◆', '▼'];
        const baseColors = ['#ff0080', '#00ff88', '#0080ff', '#ff8000', '#8000ff', '#ff0040', '#40ff00', '#0040ff'];
        
        return symbols.map((symbol, index) => ({
            id: `sticker-${index}`,
            symbol: symbol,
            color: baseColors[index % baseColors.length],
            neon: this.neonColors[index % this.neonColors.length],
            size: 20 + Math.random() * 15,
            weight: 0.5 + Math.random() * 0.5
        }));
    }
    
    getNeonPalette() {
        const palettes = {
            morning: ['#ff6b35', '#f7931e', '#ffcc02', '#ff4081'],
            afternoon: ['#00d4ff', '#0099cc', '#0066ff', '#3399ff'],
            evening: ['#ff0080', '#8000ff', '#ff4081', '#c51162'],
            night: ['#00ff88', '#0080ff', '#00ffcc', '#0040ff']
        };
        
        return palettes[this.timeOfDay] || palettes.night;
    }
    
    handleCanvasClick(e) {
        if (this.gameState !== 'playing') return;
        
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        this.placeSticker(x, y);
    }
    
    handleCanvasHover(e) {
        if (this.gameState !== 'playing') return;
        
        const rect = this.canvas.getBoundingClientRect();
        this.mouseX = e.clientX - rect.left;
        this.mouseY = e.clientY - rect.top;
    }
    
    placeSticker(x, y) {
        if (!this.selectedSticker) return;
        
        // Create sticker with physics
        const sticker = {
            id: Date.now() + Math.random(),
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.2,
            symbol: this.selectedSticker.symbol,
            color: this.selectedSticker.color,
            neon: this.selectedSticker.neon,
            size: this.selectedSticker.size,
            weight: this.selectedSticker.weight,
            age: 0,
            settled: false,
            glowIntensity: 1
        };
        
        this.placedStickers.push(sticker);
        
        // Create placement particles
        this.createPlacementParticles(x, y, this.selectedSticker.neon);
        
        // Calculate style points
        const stylePoints = this.calculateStylePoints(sticker);
        this.score += stylePoints;
        this.updateUI();
        
        // Show style feedback
        this.showStyleFeedback(x, y, stylePoints);
    }
    
    createPlacementParticles(x, y, color) {
        for (let i = 0; i < 12; i++) {
            this.particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 8,
                vy: (Math.random() - 0.5) * 8,
                life: 30,
                maxLife: 30,
                color: color,
                size: Math.random() * 4 + 2,
                glow: true
            });
        }
    }
    
    calculateStylePoints(sticker) {
        let points = 10; // Base points
        
        // Bonus for placement near other stickers (composition)
        const nearbyStickers = this.placedStickers.filter(s => 
            s !== sticker && 
            Math.hypot(s.x - sticker.x, s.y - sticker.y) < 80
        );
        
        if (nearbyStickers.length > 0) {
            points += nearbyStickers.length * 5; // Composition bonus
        }
        
        // Bonus for edge placement (risk taking)
        const edgeDistance = Math.min(
            sticker.x, 
            sticker.y, 
            this.canvasSize.width - sticker.x, 
            this.canvasSize.height - sticker.y
        );
        
        if (edgeDistance < 50) {
            points += 15; // Edge bonus
        }
        
        // Time-based multiplier
        const timeMultiplier = this.timeRemaining > 30 ? 1.5 : 1.0;
        
        return Math.floor(points * timeMultiplier);
    }
    
    showStyleFeedback(x, y, points) {
        const feedback = {
            x: x,
            y: y - 20,
            text: `+${points}`,
            life: 60,
            maxLife: 60,
            color: points > 20 ? '#00ff88' : points > 15 ? '#ffcc02' : '#ffffff',
            size: points > 20 ? 16 : 14
        };
        
        this.particles.push(feedback);
    }
    
    startGame() {
        this.gameState = 'playing';
        this.timeRemaining = 60;
        this.score = 0;
        this.placedStickers = [];
        this.particles = [];
        this.hideOverlay();
        
        // Start game timer
        this.gameTimer = setInterval(() => {
            this.timeRemaining--;
            this.updateUI();
            
            if (this.timeRemaining <= 0) {
                this.endGame();
            }
        }, 1000);
        
        // Start game loop
        this.gameLoop = setInterval(() => {
            this.update();
            this.render();
        }, 16); // ~60fps
    }
    
    update() {
        // Update sticker physics
        this.placedStickers.forEach(sticker => {
            if (!sticker.settled) {
                sticker.vx *= this.friction;
                sticker.vy += this.gravity * sticker.weight;
                sticker.vy *= this.friction;
                
                sticker.x += sticker.vx;
                sticker.y += sticker.vy;
                sticker.rotation += sticker.rotationSpeed;
                
                // Boundary collision
                if (sticker.x < sticker.size/2) {
                    sticker.x = sticker.size/2;
                    sticker.vx *= -this.bounce;
                }
                if (sticker.x > this.canvasSize.width - sticker.size/2) {
                    sticker.x = this.canvasSize.width - sticker.size/2;
                    sticker.vx *= -this.bounce;
                }
                if (sticker.y > this.canvasSize.height - sticker.size/2) {
                    sticker.y = this.canvasSize.height - sticker.size/2;
                    sticker.vy *= -this.bounce;
                }
                
                // Settle if moving slowly
                if (Math.abs(sticker.vx) < 0.1 && Math.abs(sticker.vy) < 0.1) {
                    sticker.settled = true;
                    sticker.vx = 0;
                    sticker.vy = 0;
                }
            }
            
            sticker.age++;
            
            // Glow pulsing
            sticker.glowIntensity = 0.5 + Math.sin(sticker.age * 0.1) * 0.5;
        });
        
        // Update particles
        this.particles = this.particles.filter(particle => {
            particle.x += particle.vx || 0;
            particle.y += particle.vy || 0;
            particle.vy += 0.2; // Gravity for particles
            particle.life--;
            return particle.life > 0;
        });
        
        this.updatePerformanceMetrics();
    }
    
    render() {
        // Clear canvas with cyberpunk background
        const gradient = this.ctx.createLinearGradient(0, 0, this.canvasSize.width, this.canvasSize.height);
        gradient.addColorStop(0, '#0a0a0a');
        gradient.addColorStop(1, '#1a0a1a');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvasSize.width, this.canvasSize.height);
        
        // Draw grid pattern
        this.drawGrid();
        
        // Draw placed stickers
        this.placedStickers.forEach(sticker => this.drawSticker(sticker));
        
        // Draw particles
        this.particles.forEach(particle => this.drawParticle(particle));
        
        // Draw preview sticker at mouse position
        if (this.gameState === 'playing' && this.mouseX && this.mouseY && this.selectedSticker) {
            this.drawPreviewSticker(this.mouseX, this.mouseY);
        }
    }
    
    drawGrid() {
        this.ctx.strokeStyle = '#333333';
        this.ctx.lineWidth = 0.5;
        this.ctx.globalAlpha = 0.3;
        
        const gridSize = 20;
        for (let x = 0; x <= this.canvasSize.width; x += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvasSize.height);
            this.ctx.stroke();
        }
        
        for (let y = 0; y <= this.canvasSize.height; y += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvasSize.width, y);
            this.ctx.stroke();
        }
        
        this.ctx.globalAlpha = 1;
    }
    
    drawSticker(sticker) {
        this.ctx.save();
        
        // Glow effect
        this.ctx.shadowColor = sticker.neon;
        this.ctx.shadowBlur = 15 * sticker.glowIntensity;
        
        // Transform for rotation
        this.ctx.translate(sticker.x, sticker.y);
        this.ctx.rotate(sticker.rotation);
        
        // Draw sticker background
        this.ctx.fillStyle = sticker.color;
        this.ctx.beginPath();
        this.ctx.arc(0, 0, sticker.size/2, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Draw symbol
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = `${sticker.size * 0.6}px Arial`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(sticker.symbol, 0, 0);
        
        this.ctx.restore();
    }
    
    drawPreviewSticker(x, y) {
        this.ctx.save();
        this.ctx.globalAlpha = 0.6;
        
        // Glow effect
        this.ctx.shadowColor = this.selectedSticker.neon;
        this.ctx.shadowBlur = 10;
        
        // Draw preview background
        this.ctx.fillStyle = this.selectedSticker.color;
        this.ctx.beginPath();
        this.ctx.arc(x, y, this.selectedSticker.size/2, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Draw symbol
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = `${this.selectedSticker.size * 0.6}px Arial`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(this.selectedSticker.symbol, x, y);
        
        this.ctx.restore();
    }
    
    drawParticle(particle) {
        this.ctx.save();
        
        const alpha = particle.life / particle.maxLife;
        this.ctx.globalAlpha = alpha;
        
        if (particle.glow) {
            this.ctx.shadowColor = particle.color;
            this.ctx.shadowBlur = 8;
        }
        
        if (particle.text) {
            // Text particle (score feedback)
            this.ctx.fillStyle = particle.color;
            this.ctx.font = `${particle.size}px Arial`;
            this.ctx.textAlign = 'center';
            this.ctx.fillText(particle.text, particle.x, particle.y);
        } else {
            // Regular particle
            this.ctx.fillStyle = particle.color;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
        }
        
        this.ctx.restore();
    }
    
    clearWall() {
        this.placedStickers = [];
        this.particles = [];
    }
    
    endGame() {
        clearInterval(this.gameTimer);
        clearInterval(this.gameLoop);
        this.gameState = 'gameover';
        
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('graffitiSlapHighScore', this.highScore.toString());
            this.showOverlay('NEW HIGH SCORE!', `Style points: ${this.score}`);
        } else {
            this.showOverlay('TIME\'S UP!', `Style points: ${this.score}`);
        }
        
        this.updateUI();
    }
    
    resetGame() {
        clearInterval(this.gameTimer);
        clearInterval(this.gameLoop);
        this.gameState = 'attract';
        this.timeRemaining = 60;
        this.score = 0;
        this.placedStickers = [];
        this.particles = [];
        this.updateUI();
        this.showOverlay('GRAFFITI SLAP READY', `Good ${this.timeOfDay}`);
    }
    
    showOverlay(title, subtitle) {
        const overlay = document.getElementById('game-overlay');
        const message = document.getElementById('game-message');
        const btn = document.getElementById('start-btn');
        
        message.innerHTML = `
            <h4>${title}</h4>
            <p>${subtitle}</p>
        `;
        
        btn.textContent = this.gameState === 'gameover' ? 'SLAP AGAIN' : 'START SLAPPING';
        overlay.style.display = 'flex';
    }
    
    hideOverlay() {
        document.getElementById('game-overlay').style.display = 'none';
    }
    
    updateUI() {
        document.getElementById('graffiti-score').textContent = this.score;
        document.getElementById('graffiti-high-score').textContent = this.highScore;
        document.getElementById('graffiti-timer').textContent = this.timeRemaining;
        
        // Update style meter
        const styleFill = document.getElementById('style-fill');
        const stylePercent = Math.min(100, (this.score / 500) * 100);
        styleFill.style.width = `${stylePercent}%`;
        
        // Update particle counter
        const particleCounter = document.getElementById('particle-counter');
        if (particleCounter) {
            particleCounter.textContent = this.particles.length;
        }
    }
    
    startPerformanceMonitoring() {
        if (this.options.trojanTier < 3) return;
        
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
    
    close() {
        this.destroy();
        this.container.dispatchEvent(new CustomEvent('feature-close', {
            detail: { featureId: 'graffiti-slap' }
        }));
    }
    
    destroy() {
        clearInterval(this.gameTimer);
        clearInterval(this.gameLoop);
        this.container.innerHTML = '';
    }
}
