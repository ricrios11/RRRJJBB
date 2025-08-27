/**
 * Immersive SLAP Creator - Viewport-aware ASCII graffiti tool
 * Clean, functional implementation matching production quality
 */

class ImmersiveSlapGame {
    constructor(containerId) {
        this.containerId = containerId;
        this.container = document.getElementById(containerId);
        
        if (!this.container) {
            throw new Error(`Container ${containerId} not found`);
        }

        // Drawing state
        this.isDrawing = false;
        this.currentColor = '#00ff9d';
        this.currentChar = '█';
        this.brushSize = 1;
        
        // Viewport calculations
        this.calculateViewport();
        this.setupCanvas();
        this.setupHUD();
        this.initializeGrid();
        this.setupControls();
        
        console.log('🎨 Immersive SLAP Creator initialized');
    }

    calculateViewport() {
        const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
        
        // Calculate optimal grid size for viewport
        this.cellSize = Math.min(Math.floor(vw / 80), Math.floor(vh / 50), 12);
        this.gridWidth = Math.floor((vw * 0.9) / this.cellSize);
        this.gridHeight = Math.floor((vh * 0.7) / this.cellSize);
        
        this.canvasWidth = this.gridWidth * this.cellSize;
        this.canvasHeight = this.gridHeight * this.cellSize;
        
        console.log(`🎯 SLAP Viewport: ${vw}x${vh}, Grid: ${this.gridWidth}x${this.gridHeight}, Cell: ${this.cellSize}px`);
    }

    setupCanvas() {
        this.container.innerHTML = `
            <div class="immersive-slap-container">
                <div class="slap-hud">
                    <div class="hud-left">
                        <div class="hud-section">
                            <span class="hud-label">COLORS</span>
                            <div class="color-palette">
                                <div class="color-swatch active" data-color="#00ff9d" style="background: #00ff9d"></div>
                                <div class="color-swatch" data-color="#ff4444" style="background: #ff4444"></div>
                                <div class="color-swatch" data-color="#44aaff" style="background: #44aaff"></div>
                                <div class="color-swatch" data-color="#ffaa44" style="background: #ffaa44"></div>
                                <div class="color-swatch" data-color="#aa44ff" style="background: #aa44ff"></div>
                                <div class="color-swatch" data-color="#ffff44" style="background: #ffff44"></div>
                                <div class="color-swatch" data-color="#44ffaa" style="background: #44ffaa"></div>
                                <div class="color-swatch" data-color="#ffffff" style="background: #ffffff"></div>
                            </div>
                        </div>
                        <div class="hud-section">
                            <span class="hud-label">ASCII CHARS</span>
                            <div class="char-palette">
                                <div class="char-btn active" data-char="█">█</div>
                                <div class="char-btn" data-char="▓">▓</div>
                                <div class="char-btn" data-char="▒">▒</div>
                                <div class="char-btn" data-char="░">░</div>
                                <div class="char-btn" data-char="●">●</div>
                                <div class="char-btn" data-char="○">○</div>
                                <div class="char-btn" data-char="■">■</div>
                                <div class="char-btn" data-char="□">□</div>
                                <div class="char-btn" data-char="▲">▲</div>
                                <div class="char-btn" data-char="△">△</div>
                            </div>
                        </div>
                    </div>
                    <div class="hud-right">
                        <button class="hud-btn slap-btn primary-action" ontouchstart="this.click()" onclick="window.currentSlapGame.slap()">🎯 SLAP</button>
                        <button class="hud-btn" ontouchstart="this.click()" onclick="window.currentSlapGame.clear()">🧹 CLEAR</button>
                        <button class="hud-btn" ontouchstart="this.click()" onclick="window.currentSlapGame.undo()">↶ UNDO</button>
                        <button class="hud-btn close-btn" ontouchstart="this.click()" onclick="window.currentSlapGame.close()">✕ CLOSE</button>
                    </div>
                </div>
                <canvas id="slap-canvas" width="${this.canvasWidth}" height="${this.canvasHeight}"></canvas>
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

        this.canvas = document.getElementById('slap-canvas');
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

        this.addImmersiveStyles();
        
        // Initialize game state
        this.currentColor = '#00ff9d';
        this.currentChar = '█';
        this.isDrawing = false;
        
        // Setup interactions
        this.initializeGrid();
        this.setupHUD();
        this.setupControls();
    }

    addImmersiveStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .immersive-slap-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 20px;
                font-family: 'Courier New', monospace;
                color: #00ff9d;
            }
            
            .slap-hud {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                width: ${this.canvasWidth}px;
                padding: 15px 0;
                border-bottom: 2px solid #00ff9d;
            }
            
            .hud-left {
                display: flex;
                gap: 40px;
            }
            
            .hud-section {
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
            
            .hud-label {
                font-size: 12px;
                opacity: 0.7;
                font-weight: bold;
            }
            
            .color-palette {
                display: flex;
                gap: 8px;
            }
            
            .color-swatch {
                width: 24px;
                height: 24px;
                border: 2px solid transparent;
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .color-swatch.active {
                border-color: #00ff9d;
                box-shadow: 0 0 8px rgba(0, 255, 157, 0.5);
            }
            
            .char-palette {
                display: flex;
                gap: 6px;
                flex-wrap: wrap;
                max-width: 200px;
            }
            
            .char-btn {
                width: 28px;
                height: 28px;
                display: flex;
                align-items: center;
                justify-content: center;
                border: 1px solid rgba(0, 255, 157, 0.3);
                cursor: pointer;
                font-size: 14px;
                transition: all 0.2s;
            }
            
            .char-btn.active {
                border-color: #00ff9d;
                background: rgba(0, 255, 157, 0.1);
                box-shadow: 0 0 8px rgba(0, 255, 157, 0.3);
            }
            
            .hud-right {
                display: flex;
                gap: 15px;
                align-items: center;
            }
            
            .slap-btn {
                background: linear-gradient(45deg, #ff4444, #ff6666) !important;
                border-color: #ff4444 !important;
                color: #ffffff !important;
                font-weight: bold !important;
                text-transform: uppercase !important;
                letter-spacing: 1px !important;
            }
            
            .slap-btn:hover {
                background: linear-gradient(45deg, #ff6666, #ff8888) !important;
                transform: translateY(-1px) !important;
                box-shadow: 0 4px 12px rgba(255, 68, 68, 0.4) !important;
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
            }
            
            .hud-btn:hover {
                background: rgba(0, 255, 157, 0.2);
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
            
            #slap-canvas {
                border: 2px solid #00ff9d;
                background: #111;
                box-shadow: 0 0 20px rgba(0, 255, 157, 0.3);
                cursor: crosshair;
            }
            
            .slap-controls {
                display: flex;
                justify-content: center;
                width: ${this.canvasWidth}px;
                padding: 15px 0;
                border-top: 1px solid rgba(0, 255, 157, 0.3);
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
        `;
        document.head.appendChild(style);
    }

    setupHUD() {
        // Color palette
        document.querySelectorAll('.color-swatch').forEach(swatch => {
            swatch.addEventListener('click', (e) => {
                document.querySelector('.color-swatch.active').classList.remove('active');
                e.target.classList.add('active');
                this.currentColor = e.target.dataset.color;
            });
        });

        // Character palette
        document.querySelectorAll('.char-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelector('.char-btn.active').classList.remove('active');
                e.target.classList.add('active');
                this.currentChar = e.target.dataset.char;
            });
        });

        // Action buttons - use querySelector since buttons don't have IDs
        document.querySelector('.slap-btn').addEventListener('click', () => this.slap());
        document.querySelector('.hud-btn:not(.slap-btn):not(.close-btn)').addEventListener('click', () => this.clear());
        document.querySelectorAll('.hud-btn:not(.slap-btn):not(.close-btn)')[1].addEventListener('click', () => this.undo());
        document.querySelector('.close-btn').addEventListener('click', () => this.close());
    }

    setupControls() {
        this.setupEventListeners();
        this.setupTouchControls();
    }

    setupEventListeners() {
        // Mouse events
        this.canvas.addEventListener('mousedown', this.startDrawing.bind(this));
        this.canvas.addEventListener('mousemove', this.draw.bind(this));
        this.canvas.addEventListener('mouseup', this.stopDrawing.bind(this));
        this.canvas.addEventListener('mouseout', this.stopDrawing.bind(this));

        // Touch events for mobile
        this.canvas.addEventListener('touchstart', this.handleTouch.bind(this));
        this.canvas.addEventListener('touchmove', this.handleTouch.bind(this));
        this.canvas.addEventListener('touchend', this.stopDrawing.bind(this));

        // Character selection
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('char-btn')) {
                this.selectCharacter(e.target.dataset.char);
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
                    this.clear();
                    break;
                case 'KeyZ':
                    this.undo();
                    break;
                case 'Escape':
                    this.close();
                    break;
            }
        };
        document.addEventListener('keydown', this.keyHandler);
    }

    handleTouch(e) {
        e.preventDefault();
        const touch = e.touches[0];
        if (touch) {
            const mouseEvent = new MouseEvent(e.type === 'touchstart' ? 'mousedown' : 'mousemove', {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            
            if (e.type === 'touchstart') {
                this.startDrawing(mouseEvent);
            } else if (e.type === 'touchmove') {
                this.draw(mouseEvent);
            }
        }
    }

    initializeGrid() {
        this.grid = [];
        this.history = [];
        
        for (let y = 0; y < this.gridHeight; y++) {
            this.grid[y] = [];
            for (let x = 0; x < this.gridWidth; x++) {
                this.grid[y][x] = { char: '', color: '' };
            }
        }
        
        this.render();
    }

    getGridPosition(clientX, clientY) {
        const rect = this.canvas.getBoundingClientRect();
        const x = Math.floor((clientX - rect.left) / this.cellSize);
        const y = Math.floor((clientY - rect.top) / this.cellSize);
        
        return { x, y };
    }

    startDrawing(e) {
        this.isDrawing = true;
        this.saveState();
        this.draw(e);
    }

    draw(e) {
        if (!this.isDrawing) return;
        
        const pos = this.getGridPosition(e.clientX, e.clientY);
        
        if (pos.x >= 0 && pos.x < this.gridWidth && pos.y >= 0 && pos.y < this.gridHeight) {
            this.grid[pos.y][pos.x] = {
                char: this.currentChar,
                color: this.currentColor
            };
            this.render();
        }
    }

    stopDrawing() {
        this.isDrawing = false;
    }

    render() {
        // Clear canvas
        this.ctx.fillStyle = '#111';
        this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

        // Draw grid
        this.ctx.font = `${this.cellSize - 2}px monospace`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';

        for (let y = 0; y < this.gridHeight; y++) {
            for (let x = 0; x < this.gridWidth; x++) {
                const cell = this.grid[y][x];
                if (cell.char) {
                    this.ctx.fillStyle = cell.color;
                    this.ctx.fillText(
                        cell.char,
                        x * this.cellSize + this.cellSize / 2,
                        y * this.cellSize + this.cellSize / 2
                    );
                }
            }
        }
    }

    saveState() {
        this.history.push(JSON.parse(JSON.stringify(this.grid)));
        if (this.history.length > 20) {
            this.history.shift();
        }
    }

    undo() {
        if (this.history.length > 0) {
            this.grid = this.history.pop();
            this.render();
        }
    }

    clear() {
        this.saveState();
        this.initializeGrid();
    }

    slap() {
        // Create ASCII art output
        let output = '';
        for (let y = 0; y < this.gridHeight; y++) {
            let line = '';
            for (let x = 0; x < this.gridWidth; x++) {
                line += this.grid[y][x].char || ' ';
            }
            if (line.trim()) {
                output += line.trimEnd() + '\n';
            }
        }
        
        if (output.trim()) {
            console.log('🎯 SLAP OUTPUT:\n' + output);
            
            // FIXED: Only call addToArtFeed once to prevent duplication
            this.addToArtFeed(output);
            
            // Show output in a modal or copy to clipboard
            navigator.clipboard.writeText(output).then(() => {
                this.showNotification('SLAP copied to clipboard & added to community feed! 🎯', 'success');
            }).catch(() => {
                // Fallback - show in console
                console.log('SLAP ready for copy:', output);
                this.showNotification('Art added to community feed! 🎯', 'success');
            });
        } else {
            this.showNotification('Draw something first! 🎨', 'warning');
        }
    }

    addToArtFeed(artOutput) {
        // Generate thumbnail from ASCII art
        const thumbnail = this.generateArtThumbnail(artOutput);
        
        // Show community art section
        const artSection = document.getElementById('community-art-section');
        if (artSection) {
            artSection.style.display = 'block';
        }
        
        // Add to community feed
        const feedContainer = document.getElementById('community-art-feed');
        if (feedContainer) {
            const timestamp = Date.now();
            const artItem = document.createElement('div');
            artItem.className = 'art-thumbnail';
            artItem.innerHTML = `
                <div class="art-preview">${thumbnail}</div>
                <div class="art-meta">
                    <span class="art-timestamp">${new Date().toLocaleDateString()}</span>
                </div>
            `;
            
            // Store full art data for lightbox
            artItem.dataset.fullArt = artOutput;
            artItem.dataset.timestamp = timestamp;
            
            // Add click handler for lightbox with proper timestamp
            artItem.addEventListener('click', () => this.openArtLightbox(artOutput, timestamp));
            
            // Record art creation with counter update
            this.recordArtCreation(artOutput);
            
            // Add to beginning of feed
            feedContainer.insertBefore(artItem, feedContainer.firstChild);
            
            // Update count
            const countEl = document.getElementById('community-art-count');
            if (countEl) {
                countEl.textContent = feedContainer.children.length;
            }
            
            // Limit to 20 items
            while (feedContainer.children.length > 20) {
                feedContainer.removeChild(feedContainer.lastChild);
                if (countEl) {
                    countEl.textContent = feedContainer.children.length;
                }
            }
        }
    }

    generateArtThumbnail(artOutput) {
        // Create a smaller version of the ASCII art for thumbnail
        const lines = artOutput.split('\n').filter(line => line.trim());
        
        // If no actual art content, return placeholder
        if (lines.length === 0) {
            return '[Empty Art]';
        }
        
        const maxLines = 6;
        const maxWidth = 20;
        
        let thumbnail = '';
        for (let i = 0; i < Math.min(lines.length, maxLines); i++) {
            const line = lines[i];
            if (line.length > maxWidth) {
                thumbnail += line.substring(0, maxWidth - 3) + '...\n';
            } else {
                thumbnail += line + '\n';
            }
        }
        
        if (lines.length > maxLines) {
            thumbnail += '...more';
        }
        
        return thumbnail.trim() || '[Empty Art]';
    }

    openArtLightbox(artOutput, timestamp) {
        // Create lightbox modal
        const lightbox = document.createElement('div');
        lightbox.className = 'art-lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-backdrop" onclick="this.parentElement.remove()"></div>
            <div class="lightbox-content">
                <div class="lightbox-header">
                    <h3>ASCII Art</h3>
                    <button class="lightbox-close" onclick="this.closest('.art-lightbox').remove()">✕</button>
                </div>
                <div class="lightbox-art">
                    <pre>${artOutput}</pre>
                </div>
                <div class="lightbox-actions">
                    <button class="lightbox-btn primary" onclick="navigator.clipboard.writeText('${artOutput.replace(/'/g, "\\'")}'); this.textContent='Copied!'; setTimeout(() => this.textContent='Copy Art', 1000)">Copy Art</button>
                    <button class="lightbox-btn secondary" onclick="this.closest('.art-lightbox').remove(); window.currentSlapGame?.deleteArtFromFeed('${timestamp}')">Delete Art</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(lightbox);
    }

    deleteArtFromFeed(timestamp) {
        const feedContainer = document.getElementById('community-art-feed');
        if (feedContainer) {
            const artItems = feedContainer.querySelectorAll('.art-thumbnail');
            artItems.forEach(item => {
                if (item.dataset.timestamp === String(timestamp)) {
                    item.remove();
                    console.log(`🗑️ Deleted art with timestamp: ${timestamp}`);
                }
            });
            
            // Update count after deletion
            const countEl = document.getElementById('community-art-count');
            if (countEl) {
                countEl.textContent = feedContainer.children.length;
            }
        }
    }

    recordArtCreation(artOutput) {
        // Update Games section art counter
        const artCountEl = document.getElementById('art-count');
        if (artCountEl && artCountEl.textContent !== '∞') {
            const currentCount = parseInt(artCountEl.textContent) || 0;
            artCountEl.textContent = currentCount + 1;
        }

        // Store art data
        const artData = {
            art: artOutput,
            timestamp: Date.now(),
            gridSize: `${this.gridWidth}x${this.gridHeight}`
        };

        // Save to localStorage for persistence
        const savedArt = JSON.parse(localStorage.getItem('slap-art') || '[]');
        savedArt.push(artData);
        localStorage.setItem('slap-art', JSON.stringify(savedArt.slice(-20))); // Keep last 20 pieces
    }

    showNotification(message, type = 'info') {
        // Create custom notification instead of alert
        const notification = document.createElement('div');
        notification.className = `slap-notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#00ff9d' : type === 'warning' ? '#ffaa44' : '#44aaff'};
            color: #000;
            padding: 12px 20px;
            border-radius: 4px;
            font-family: 'Courier New', monospace;
            font-weight: bold;
            z-index: 10001;
            animation: slideIn 0.3s ease;
        `;
        
        // Add CSS animations if not already added
        if (!document.getElementById('slap-notification-styles')) {
            const style = document.createElement('style');
            style.id = 'slap-notification-styles';
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(notification);
        
        // Auto-remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 3000);
    }

    close() {
        // Remove event listeners to prevent memory leaks
        document.removeEventListener('keydown', this.keyHandler);
        this.container.style.display = 'none';
        document.body.style.overflow = '';
        
        // Clear global reference
        if (window.currentSlapGame === this) {
            window.currentSlapGame = null;
        }
    }

    destroy() {
        this.container.innerHTML = '';
    }
}

window.ImmersiveSlapGame = ImmersiveSlapGame;
