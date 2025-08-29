/**
 * SLAP Game Engine - Modular Architecture with Social Features
 * Production-grade component with scoring, leaderboards, and social sharing
 * Extends BaseGameEngine for unified architecture
 */

class SlapGameEngine extends BaseGameEngine {
    constructor(containerId, config = {}) {
        super(containerId, 'slap', {
            gridSize: 12,
            canvasWidth: 800,
            canvasHeight: 600,
            colors: ['#00ff9d', '#ff4444', '#44aaff', '#ffaa44', '#aa44ff', '#ffff44', '#44ffaa', '#ffffff'],
            characters: ['█', '▓', '▒', '░', '●', '○', '■', '□', '▲', '△'],
            enableAnalytics: true,
            enableHighScore: true,
            enableLeaderboard: true,
            enableSocialSharing: true,
            ...config
        });

        // Drawing state
        this.isDrawing = false;
        this.currentColor = this.config.colors[0];
        this.currentChar = this.config.characters[0];
        this.brushSize = 1;
        this.grid = [];
        this.undoStack = [];
        this.creations = 0;
        
        // Initialize using parent methods
        this.calculateViewport();
        this.setupCanvas();
        this.setupControls();
        this.initializeGrid();
        
        console.log('🎨 SLAP Game Engine initialized with modular architecture');
    }

    // Override parent calculateViewport for SLAP-specific sizing
    calculateViewport() {
        const viewport = super.calculateViewport();
        
        // Calculate optimal grid size for viewport
        this.cellSize = Math.min(Math.floor(viewport.vw / 80), Math.floor(viewport.vh / 50), 12);
        this.gridWidth = Math.floor((viewport.vw * 0.9) / this.cellSize);
        this.gridHeight = Math.floor((viewport.vh * 0.7) / this.cellSize);
        
        this.canvasWidth = this.gridWidth * this.cellSize;
        this.canvasHeight = this.gridHeight * this.cellSize;
        
        console.log(`🎯 SLAP Viewport: ${viewport.vw}x${viewport.vh}, Grid: ${this.gridWidth}x${this.gridHeight}, Cell: ${this.cellSize}px`);
        
        return viewport;
    }

    setupCanvas() {
        this.container.innerHTML = `
            <div class="immersive-slap-container">
                <div class="slap-hud">
                    <div class="hud-left">
                        <div class="hud-section">
                            <span class="hud-label">COLORS</span>
                            <div class="color-palette">
                                ${this.config.colors.map((color, index) => `
                                    <div class="color-swatch ${index === 0 ? 'active' : ''}" data-color="${color}" style="background: ${color}"></div>
                                `).join('')}
                            </div>
                        </div>
                        <div class="hud-section">
                            <span class="hud-label">ASCII CHARS</span>
                            <div class="char-palette">
                                ${this.config.characters.map((char, index) => `
                                    <div class="char-btn ${index === 0 ? 'active' : ''}" data-char="${char}">${char}</div>
                                `).join('')}
                            </div>
                        </div>
                        <div class="hud-section">
                            <span class="hud-label">SCORE</span>
                            <div class="score-display">
                                <span id="slap-score-${this.containerId}">${this.score}</span>
                                <span class="score-label">creations</span>
                            </div>
                            <div class="high-score-display">
                                <span class="high-score-label">BEST:</span>
                                <span id="slap-high-score-${this.containerId}">${this.highScore}</span>
                            </div>
                        </div>
                    </div>
                    <div class="hud-right">
                        <button id="slap-slap-${this.containerId}" class="hud-btn slap-btn primary-action">🎯 SLAP</button>
                        <button id="slap-share-${this.containerId}" class="hud-btn share-btn">📤 SHARE</button>
                        <button id="slap-clear-${this.containerId}" class="hud-btn">🧹 CLEAR</button>
                        <button id="slap-undo-${this.containerId}" class="hud-btn">↶ UNDO</button>
                        <button id="slap-close-${this.containerId}" class="hud-btn close-btn">✕ CLOSE</button>
                    </div>
                </div>
                <canvas id="slap-canvas-${this.containerId}" width="${this.canvasWidth}" height="${this.canvasHeight}"></canvas>
                <div class="slap-controls">
                    <div class="control-hint">
                        <span>CLICK & DRAG TO DRAW</span>
                        <span>ESC: EXIT</span>
                        <span>SPACE: SLAP</span>
                        <span>C: CLEAR</span>
                        <span>Z: UNDO</span>
                    </div>
                </div>
            </div>
        `;

        this.canvas = document.getElementById(`slap-canvas-${this.containerId}`);
        this.ctx = this.canvas.getContext('2d');
        
        // Set global reference for touch controls
        window.currentSlapGame = this;
        
        // Bind HUD elements and setup handlers
        setTimeout(() => {
            this.scoreEl = document.getElementById(`slap-score-${this.containerId}`);
            this.highScoreEl = document.getElementById(`slap-high-score-${this.containerId}`);
            this.setupButtonHandlers();
            this.updateScore();
        }, 100);
    }

    setupButtonHandlers() {
        // SLAP button
        const slapBtn = document.getElementById(`slap-slap-${this.containerId}`);
        if (slapBtn) {
            slapBtn.addEventListener('click', () => this.slap());
        }
        
        // Share button
        const shareBtn = document.getElementById(`slap-share-${this.containerId}`);
        if (shareBtn) {
            shareBtn.addEventListener('click', () => this.shareCreation());
        }
        
        // Clear button
        const clearBtn = document.getElementById(`slap-clear-${this.containerId}`);
        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.clear());
        }
        
        // Undo button
        const undoBtn = document.getElementById(`slap-undo-${this.containerId}`);
        if (undoBtn) {
            undoBtn.addEventListener('click', () => this.undo());
        }
        
        // Close button
        const closeBtn = document.getElementById(`slap-close-${this.containerId}`);
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.close());
        }
    }

    setupHUD() {
        // Add cyberpunk styling
        const style = document.createElement('style');
        style.textContent = `
            .immersive-slap-container {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
                color: #00ff9d;
                font-family: 'Courier New', monospace;
                z-index: 9999;
                display: flex;
                flex-direction: column;
                overflow: hidden;
            }
            
            .slap-hud {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                padding: 20px;
                background: rgba(0, 0, 0, 0.8);
                border-bottom: 2px solid #00ff9d;
                flex-wrap: wrap;
                gap: 20px;
            }
            
            .hud-left {
                display: flex;
                gap: 30px;
                flex-wrap: wrap;
            }
            
            .hud-section {
                display: flex;
                flex-direction: column;
                gap: 8px;
            }
            
            .hud-label {
                font-size: 12px;
                font-weight: bold;
                color: #00ff9d;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            
            .color-palette, .char-palette {
                display: flex;
                gap: 8px;
                flex-wrap: wrap;
            }
            
            .color-swatch {
                width: 30px;
                height: 30px;
                border: 2px solid transparent;
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .color-swatch.active {
                border-color: #ffffff;
                box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
            }
            
            .char-btn {
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                background: rgba(0, 255, 157, 0.1);
                border: 1px solid #00ff9d;
                color: #00ff9d;
                cursor: pointer;
                transition: all 0.2s;
                font-size: 16px;
            }
            
            .char-btn.active {
                background: #00ff9d;
                color: #000;
            }
            
            .score-display {
                display: flex;
                align-items: center;
                gap: 8px;
                font-size: 18px;
                font-weight: bold;
            }
            
            .score-label {
                font-size: 12px;
                opacity: 0.7;
            }
            
            .high-score-display {
                display: flex;
                align-items: center;
                gap: 8px;
                font-size: 14px;
                opacity: 0.8;
            }
            
            .hud-right {
                display: flex;
                gap: 12px;
                flex-wrap: wrap;
            }
            
            .hud-btn {
                background: rgba(0, 255, 157, 0.1);
                border: 1px solid #00ff9d;
                color: #00ff9d;
                padding: 8px 16px;
                font-family: inherit;
                font-size: 12px;
                cursor: pointer;
                transition: all 0.2s;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            
            .hud-btn:hover {
                background: rgba(0, 255, 157, 0.2);
                transform: translateY(-1px);
            }
            
            .slap-btn {
                background: linear-gradient(45deg, #00ff9d, #00cc7a);
                color: #000;
                font-weight: bold;
            }
            
            .share-btn {
                background: linear-gradient(45deg, #44aaff, #3388cc);
                color: #fff;
                font-weight: bold;
            }
            
            .close-btn {
                background: rgba(255, 68, 68, 0.2);
                border-color: #ff4444;
                color: #ff4444;
            }
            
            .slap-controls {
                padding: 10px 20px;
                background: rgba(0, 0, 0, 0.5);
                border-top: 1px solid rgba(0, 255, 157, 0.3);
                text-align: center;
            }
            
            .control-hint {
                display: flex;
                justify-content: center;
                gap: 20px;
                flex-wrap: wrap;
                font-size: 11px;
                opacity: 0.7;
            }
            
            #slap-canvas-${this.containerId} {
                flex: 1;
                border: 2px solid #00ff9d;
                background: #111;
                box-shadow: 0 0 20px rgba(0, 255, 157, 0.3);
                margin: 0 20px 20px 20px;
            }
        `;
        document.head.appendChild(style);
    }

    initializeGrid() {
        this.grid = [];
        for (let y = 0; y < this.gridHeight; y++) {
            this.grid[y] = [];
        }
        this.render();
    }

    setupControls() {
        // Mouse/touch drawing
        this.canvas.addEventListener('mousedown', (e) => this.startDrawing(e));
        this.canvas.addEventListener('mousemove', (e) => this.draw(e));
        this.canvas.addEventListener('mouseup', () => this.stopDrawing());
        this.canvas.addEventListener('mouseleave', () => this.stopDrawing());

        // Touch events
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.startDrawing(e.touches[0]);
        });
        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            this.draw(e.touches[0]);
        });
        this.canvas.addEventListener('touchend', () => this.stopDrawing());

        // Color palette
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('color-swatch')) {
                document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
                e.target.classList.add('active');
                this.currentColor = e.target.dataset.color;
            }
            
            if (e.target.classList.contains('char-btn')) {
                document.querySelectorAll('.char-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentChar = e.target.dataset.char;
            }
        });

        // Keyboard shortcuts
        this.keyHandler = (e) => {
            switch(e.code) {
                case 'Space':
                    e.preventDefault();
                    this.slap();
                    break;
                case 'KeyC':
                    if (e.ctrlKey || e.metaKey) return;
                    this.clear();
                    break;
                case 'KeyZ':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        this.undo();
                    }
                    break;
                case 'Escape':
                    this.close();
                    break;
            }
        };
        document.addEventListener('keydown', this.keyHandler);
    }

    startDrawing(e) {
        this.isDrawing = true;
        this.saveState();
        this.draw(e);
    }

    draw(e) {
        if (!this.isDrawing) return;

        const rect = this.canvas.getBoundingClientRect();
        const x = Math.floor((e.clientX - rect.left) / this.cellSize);
        const y = Math.floor((e.clientY - rect.top) / this.cellSize);

        if (x >= 0 && x < this.gridWidth && y >= 0 && y < this.gridHeight) {
            if (!this.grid[y]) this.grid[y] = [];
            this.grid[y][x] = {
                char: this.currentChar,
                color: this.currentColor
            };
            this.render();
        }
    }

    stopDrawing() {
        this.isDrawing = false;
    }

    saveState() {
        this.undoStack.push(JSON.parse(JSON.stringify(this.grid)));
        if (this.undoStack.length > 50) {
            this.undoStack.shift();
        }
    }

    undo() {
        if (this.undoStack.length > 0) {
            this.grid = this.undoStack.pop();
            this.render();
        }
    }

    clear() {
        this.saveState();
        this.initializeGrid();
    }

    slap() {
        // Calculate creation score based on complexity
        let cellCount = 0;
        let colorVariety = new Set();
        let charVariety = new Set();
        
        for (let y = 0; y < this.gridHeight; y++) {
            for (let x = 0; x < this.gridWidth; x++) {
                const cell = this.grid[y] && this.grid[y][x];
                if (cell) {
                    cellCount++;
                    colorVariety.add(cell.color);
                    charVariety.add(cell.char);
                }
            }
        }
        
        // Score calculation
        const complexityScore = Math.floor(cellCount / 10) + 
                              (colorVariety.size * 5) + 
                              (charVariety.size * 3);
        
        this.score += Math.max(1, complexityScore);
        this.creations++;
        
        // Update high score
        if (this.score > this.highScore) {
            this.highScore = this.score;
            this.saveHighScore();
        }
        
        this.updateScore();
        this.showNotification(`SLAPPED! +${complexityScore} points`);
        
        // Save to community wall (leaderboard system)
        this.saveToLeaderboard();
    }

    saveToLeaderboard() {
        if (!this.config.enableLeaderboard) return;
        
        const leaderboard = JSON.parse(localStorage.getItem('slap-leaderboard') || '[]');
        const asciiArt = this.generateAsciiString();
        
        const entry = {
            score: this.score,
            creations: this.creations,
            art: asciiArt,
            timestamp: Date.now(),
            id: Date.now().toString(36) + Math.random().toString(36).substr(2)
        };
        
        leaderboard.push(entry);
        leaderboard.sort((a, b) => b.score - a.score);
        leaderboard.splice(10); // Keep top 10
        
        localStorage.setItem('slap-leaderboard', JSON.stringify(leaderboard));
    }

    updateScore() {
        if (this.scoreEl) {
            this.scoreEl.textContent = this.score;
        }
        if (this.highScoreEl) {
            this.highScoreEl.textContent = this.highScore;
        }
    }

    loadHighScore() {
        return parseInt(localStorage.getItem('slap-high-score') || '0');
    }

    saveHighScore() {
        localStorage.setItem('slap-high-score', this.highScore.toString());
    }

    shareCreation() {
        if (!this.config.enableSocialSharing) return;
        
        // Generate ASCII art string from grid
        const asciiArt = this.generateAsciiString();
        
        if (navigator.share) {
            navigator.share({
                title: 'My ASCII Art Creation',
                text: `Check out my ASCII art! Score: ${this.score}\n\n${asciiArt}`,
                url: window.location.href
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(`My ASCII Art - Score: ${this.score}\n\n${asciiArt}`).then(() => {
                this.showNotification('ASCII art copied to clipboard!');
            });
        }
    }

    generateAsciiString() {
        let result = '';
        for (let y = 0; y < this.gridHeight; y++) {
            let line = '';
            for (let x = 0; x < this.gridWidth; x++) {
                const cell = this.grid[y] && this.grid[y][x];
                line += cell ? cell.char : ' ';
            }
            // Remove trailing spaces
            line = line.replace(/\s+$/, '');
            if (line.length > 0) {
                result += line + '\n';
            }
        }
        return result.trim();
    }

    render() {
        // Clear canvas
        this.ctx.fillStyle = '#111';
        this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

        // Draw grid
        for (let y = 0; y < this.gridHeight; y++) {
            for (let x = 0; x < this.gridWidth; x++) {
                const cell = this.grid[y] && this.grid[y][x];
                if (cell) {
                    this.ctx.fillStyle = cell.color;
                    this.ctx.font = `${this.cellSize - 2}px monospace`;
                    this.ctx.textAlign = 'center';
                    this.ctx.textBaseline = 'middle';
                    this.ctx.fillText(
                        cell.char,
                        x * this.cellSize + this.cellSize / 2,
                        y * this.cellSize + this.cellSize / 2
                    );
                }
            }
        }
    }

    showNotification(message) {
        // Create temporary notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #00ff9d;
            color: #000;
            padding: 12px 20px;
            border-radius: 4px;
            font-weight: bold;
            z-index: 10000;
            font-family: 'Courier New', monospace;
            animation: slideIn 0.3s ease;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    close() {
        // Remove event listeners to prevent memory leaks
        document.removeEventListener('keydown', this.keyHandler);
        this.container.style.display = 'none';
        document.body.style.overflow = '';
    }

    destroy() {
        this.container.innerHTML = '';
    }
}

window.SlapGameEngine = SlapGameEngine;
