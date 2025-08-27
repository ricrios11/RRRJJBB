/**
 * CyberGraffitiGame - Advanced ASCII art creation tool
 * Extends CyberGameEngine with drawing capabilities
 * Touch-optimized with mobile gesture support
 */

class CyberGraffitiGame extends CyberGameEngine {
    constructor(containerId, options = {}) {
        super(containerId, 'graffiti', {
            gridSize: 60, // Larger grid for art creation
            aspectRatio: 2, // Wide canvas for art
            ...options
        });

        // Drawing state
        this.asciiGrid = [];
        this.currentChar = '█';
        this.currentColor = '#00ff9d';
        this.brushSize = 1;
        this.isDrawing = false;
        this.lastDrawPos = { x: -1, y: -1 };

        // Undo/Redo system
        this.undoStack = [];
        this.redoStack = [];
        this.maxUndoSteps = 50;

        // Color palette
        this.colorPalette = [
            '#00ff9d', // Cyber green
            '#4A90E2', // Cyber blue
            '#ff4444', // Warning red
            '#ff6b35', // Orange accent
            '#aa44ff', // Purple
            '#ffff00', // Yellow
            '#ffffff', // White
            '#888888'  // Gray
        ];

        // Character palette
        this.charPalette = [
            '█', '▓', '▒', '░', '■', '□', '●', '○',
            '▲', '▼', '◄', '►', '♦', '♠', '♣', '♥',
            '★', '☆', '※', '◆', '◇', '▪', '▫', '•',
            '/', '\\', '|', '-', '+', 'X', '#', '@'
        ];

        // Touch drawing state
        this.touchStartPos = null;
        this.gestureMode = 'draw'; // draw, erase, select

        this.initializeGrid();
        this.createToolbar();
        this.setupDrawingEvents();
        
        // Remove auto-start - let unified system handle it
        console.log('🎨 Graffiti game constructor complete - waiting for manual start');
    }

    /**
     * Initialize empty grid
     */
    initializeGrid() {
        this.asciiGrid = [];
        for (let y = 0; y < this.grid.rows; y++) {
            this.asciiGrid[y] = [];
            for (let x = 0; x < this.grid.cols; x++) {
                this.asciiGrid[y][x] = {
                    char: ' ',
                    color: '#ffffff'
                };
            }
        }
    }

    /**
     * Create drawing toolbar
     */
    createToolbar() {
        const toolbarHTML = `
            <div class="cyber-graffiti-toolbar">
                <div class="toolbar-section">
                    <label>Character:</label>
                    <div class="char-palette">
                        ${this.charPalette.map(char => 
                            `<button class="char-btn ${char === this.currentChar ? 'active' : ''}" 
                                     data-char="${char}">${char}</button>`
                        ).join('')}
                    </div>
                </div>
                
                <div class="toolbar-section">
                    <label>Color:</label>
                    <div class="color-palette">
                        ${this.colorPalette.map(color => 
                            `<button class="color-btn ${color === this.currentColor ? 'active' : ''}" 
                                     data-color="${color}" 
                                     style="background-color: ${color}"></button>`
                        ).join('')}
                    </div>
                </div>
                
                <div class="toolbar-section">
                    <label>Brush:</label>
                    <select class="brush-size" id="brush-size">
                        <option value="1" selected>1x1</option>
                        <option value="2">2x2</option>
                        <option value="3">3x3</option>
                    </select>
                </div>
                
                <div class="toolbar-actions">
                    <button class="tool-btn" id="undo-btn" title="Undo">↶</button>
                    <button class="tool-btn" id="redo-btn" title="Redo">↷</button>
                    <button class="tool-btn" id="clear-btn" title="Clear All">🗑️</button>
                    <button class="tool-btn" id="save-btn" title="Save Art">💾</button>
                    <button class="tool-btn" id="load-btn" title="Load Art">📁</button>
                </div>
            </div>
        `;
        
        this.container.insertAdjacentHTML('afterbegin', toolbarHTML);
        this.setupToolbarEvents();
    }

    /**
     * Setup toolbar event listeners
     */
    setupToolbarEvents() {
        // Character selection
        const charBtns = this.container.querySelectorAll('.char-btn');
        charBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.setCurrentChar(btn.dataset.char);
                this.updateToolbarSelection();
            });
        });

        // Color selection
        const colorBtns = this.container.querySelectorAll('.color-btn');
        colorBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.setCurrentColor(btn.dataset.color);
                this.updateToolbarSelection();
            });
        });

        // Brush size
        const brushSelect = this.container.querySelector('#brush-size');
        brushSelect.addEventListener('change', () => {
            this.brushSize = parseInt(brushSelect.value);
        });

        // Action buttons
        this.container.querySelector('#undo-btn').addEventListener('click', () => this.undo());
        this.container.querySelector('#redo-btn').addEventListener('click', () => this.redo());
        this.container.querySelector('#clear-btn').addEventListener('click', () => this.clearCanvas());
        this.container.querySelector('#save-btn').addEventListener('click', () => this.saveArt());
        this.container.querySelector('#load-btn').addEventListener('click', () => this.loadArt());
    }

    /**
     * Update toolbar selection states
     */
    updateToolbarSelection() {
        // Update character buttons
        this.container.querySelectorAll('.char-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.char === this.currentChar);
        });

        // Update color buttons
        this.container.querySelectorAll('.color-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.color === this.currentColor);
        });
    }

    /**
     * Setup drawing event listeners
     */
    setupDrawingEvents() {
        // Mouse events
        this.canvas.addEventListener('mousedown', (e) => this.startDrawing(e));
        this.canvas.addEventListener('mousemove', (e) => this.draw(e));
        this.canvas.addEventListener('mouseup', () => this.stopDrawing());
        this.canvas.addEventListener('mouseleave', () => this.stopDrawing());

        // Touch events (override parent touch handling)
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.startDrawing(e.touches[0]);
        });

        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            if (this.isDrawing) {
                this.draw(e.touches[0]);
            }
        });

        this.canvas.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.stopDrawing();
        });
    }

    /**
     * Start drawing
     */
    startDrawing(event) {
        this.isDrawing = true;
        this.saveState(); // Save for undo
        this.draw(event);
    }

    /**
     * Draw at position
     */
    draw(event) {
        if (!this.isDrawing) return;

        const gridPos = this.getGridPosition(event);
        if (!gridPos) return;

        // Prevent drawing same position repeatedly
        if (gridPos.x === this.lastDrawPos.x && gridPos.y === this.lastDrawPos.y) {
            return;
        }

        this.drawAtGrid(gridPos.x, gridPos.y);
        this.lastDrawPos = gridPos;
    }

    /**
     * Stop drawing
     */
    stopDrawing() {
        this.isDrawing = false;
        this.lastDrawPos = { x: -1, y: -1 };
    }

    /**
     * Get grid position from event
     */
    getGridPosition(event) {
        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const gridX = Math.floor(x / this.grid.cellSize);
        const gridY = Math.floor(y / this.grid.cellSize);

        if (gridX >= 0 && gridX < this.grid.cols && gridY >= 0 && gridY < this.grid.rows) {
            return { x: gridX, y: gridY };
        }
        return null;
    }

    /**
     * Draw at grid position with brush size
     */
    drawAtGrid(centerX, centerY) {
        const halfBrush = Math.floor(this.brushSize / 2);
        
        for (let dy = -halfBrush; dy <= halfBrush; dy++) {
            for (let dx = -halfBrush; dx <= halfBrush; dx++) {
                const x = centerX + dx;
                const y = centerY + dy;
                
                if (x >= 0 && x < this.grid.cols && y >= 0 && y < this.grid.rows) {
                    this.asciiGrid[y][x] = {
                        char: this.currentChar,
                        color: this.currentColor
                    };
                }
            }
        }
    }

    /**
     * Set current character
     */
    setCurrentChar(char) {
        this.currentChar = char;
    }

    /**
     * Set current color
     */
    setCurrentColor(color) {
        this.currentColor = color;
    }

    /**
     * Save current state for undo
     */
    saveState() {
        const state = JSON.parse(JSON.stringify(this.asciiGrid));
        this.undoStack.push(state);
        
        if (this.undoStack.length > this.maxUndoSteps) {
            this.undoStack.shift();
        }
        
        // Clear redo stack when new action is performed
        this.redoStack = [];
    }

    /**
     * Undo last action
     */
    undo() {
        if (this.undoStack.length === 0) return;
        
        // Save current state to redo stack
        this.redoStack.push(JSON.parse(JSON.stringify(this.asciiGrid)));
        
        // Restore previous state
        this.asciiGrid = this.undoStack.pop();
    }

    /**
     * Redo last undone action
     */
    redo() {
        if (this.redoStack.length === 0) return;
        
        // Save current state to undo stack
        this.undoStack.push(JSON.parse(JSON.stringify(this.asciiGrid)));
        
        // Restore redo state
        this.asciiGrid = this.redoStack.pop();
    }

    /**
     * Clear entire canvas
     */
    clearCanvas() {
        if (confirm('Clear entire canvas? This cannot be undone.')) {
            this.saveState();
            this.initializeGrid();
        }
    }

    /**
     * Save artwork to localStorage
     */
    saveArt() {
        try {
            const artData = {
                grid: this.asciiGrid,
                timestamp: new Date().toISOString(),
                dimensions: { cols: this.grid.cols, rows: this.grid.rows }
            };
            
            const artName = prompt('Enter name for your artwork:') || `Art_${Date.now()}`;
            const savedArt = JSON.parse(localStorage.getItem('cyber-graffiti-art') || '{}');
            savedArt[artName] = artData;
            
            localStorage.setItem('cyber-graffiti-art', JSON.stringify(savedArt));
            alert(`Artwork "${artName}" saved successfully!`);
        } catch (error) {
            alert('Failed to save artwork. Storage may be full.');
        }
    }

    /**
     * Load artwork from localStorage
     */
    loadArt() {
        try {
            const savedArt = JSON.parse(localStorage.getItem('cyber-graffiti-art') || '{}');
            const artNames = Object.keys(savedArt);
            
            if (artNames.length === 0) {
                alert('No saved artwork found.');
                return;
            }
            
            const artName = prompt(`Select artwork to load:\n${artNames.join('\n')}`);
            if (!artName || !savedArt[artName]) return;
            
            this.saveState();
            this.asciiGrid = savedArt[artName].grid;
            alert(`Artwork "${artName}" loaded successfully!`);
        } catch (error) {
            alert('Failed to load artwork.');
        }
    }

    /**
     * Handle keyboard input
     */
    onKeyDown(keyCode) {
        switch (keyCode) {
            case 'KeyZ':
                if (this.inputManager.isKeyPressed('ControlLeft') || this.inputManager.isKeyPressed('MetaLeft')) {
                    this.undo();
                }
                break;
            case 'KeyY':
                if (this.inputManager.isKeyPressed('ControlLeft') || this.inputManager.isKeyPressed('MetaLeft')) {
                    this.redo();
                }
                break;
            case 'KeyS':
                if (this.inputManager.isKeyPressed('ControlLeft') || this.inputManager.isKeyPressed('MetaLeft')) {
                    this.saveArt();
                }
                break;
        }
    }

    /**
     * Handle touch gestures
     */
    onTouchStart(event) {
        if (event.touches.length === 2) {
            // Two-finger gesture for undo
            this.undo();
        }
    }

    /**
     * Update game logic (minimal for drawing tool)
     */
    update(deltaTime) {
        // Graffiti game doesn't need continuous updates
    }

    /**
     * Render the ASCII art
     */
    render() {
        super.render(); // Clear canvas

        const cellSize = this.grid.cellSize;
        
        // Draw grid lines (subtle)
        this.ctx.strokeStyle = 'rgba(74, 144, 226, 0.1)';
        this.ctx.lineWidth = 1;
        
        // Vertical lines
        for (let x = 0; x <= this.grid.cols; x++) {
            this.ctx.beginPath();
            this.ctx.moveTo(x * cellSize, 0);
            this.ctx.lineTo(x * cellSize, this.grid.canvasHeight);
            this.ctx.stroke();
        }
        
        // Horizontal lines
        for (let y = 0; y <= this.grid.rows; y++) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y * cellSize);
            this.ctx.lineTo(this.grid.canvasWidth, y * cellSize);
            this.ctx.stroke();
        }

        // Draw ASCII characters
        this.ctx.font = `${Math.floor(cellSize * 0.8)}px 'Courier New', monospace`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';

        for (let y = 0; y < this.grid.rows; y++) {
            for (let x = 0; x < this.grid.cols; x++) {
                const cell = this.asciiGrid[y][x];
                if (cell.char !== ' ') {
                    this.ctx.fillStyle = cell.color;
                    this.ctx.fillText(
                        cell.char,
                        (x + 0.5) * cellSize,
                        (y + 0.5) * cellSize
                    );
                }
            }
        }
    }

    /**
     * Export artwork as text
     */
    exportAsText() {
        let text = '';
        for (let y = 0; y < this.grid.rows; y++) {
            for (let x = 0; x < this.grid.cols; x++) {
                text += this.asciiGrid[y][x].char;
            }
            text += '\n';
        }
        return text.trim();
    }

    /**
     * Start the drawing tool
     */
    start() {
        this.gameState = 'playing';
        console.log('🎨 Graffiti drawing tool started');
    }
}

// Export for use
window.CyberGraffitiGame = CyberGraffitiGame;
