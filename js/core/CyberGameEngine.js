/**
 * CyberGameEngine - Unified Game Foundation
 * Bulletproof canvas grid system with responsive scaling
 * Touch controls, viewport detection, and performance optimization
 */

class CyberGameEngine {
    constructor(containerId, gameType, options = {}) {
        this.containerId = containerId;
        this.gameType = gameType;
        
        // Try to find container by ID first, then by class selector
        this.container = document.getElementById(containerId) || 
                        document.querySelector(containerId) ||
                        document.querySelector(`.${containerId}`);
        
        console.log(`🔍 CyberGameEngine looking for container: "${containerId}"`, this.container);
        
        if (!this.container) {
            throw new Error(`Container ${containerId} not found`);
        }

        // Core properties
        this.canvas = null;
        this.ctx = null;
        this.gameState = 'idle'; // idle, playing, paused, gameOver
        this.gameLoop = null;
        this.lastFrameTime = 0;
        this.targetFPS = 60;
        this.frameInterval = 1000 / this.targetFPS;

        // Viewport and scaling
        this.viewport = this.detectViewport();
        this.devicePixelRatio = window.devicePixelRatio || 1;
        this.scaleFactor = 1;

        // Grid system - bulletproof mathematical approach
        this.gridConfig = {
            baseSize: options.gridSize || 20,
            minCellSize: 8,  // Minimum cell size in pixels
            maxCellSize: 40, // Maximum cell size in pixels
            aspectRatio: options.aspectRatio || 1, // width/height ratio
            padding: options.padding || 16
        };

        // Performance monitoring
        this.performance = {
            frameCount: 0,
            lastFPSCheck: 0,
            currentFPS: 0,
            renderTime: 0
        };

        // Initialize
        this.init();
        
        // Touch and input (after canvas is created)
        if (typeof GameInputManager !== 'undefined') {
            this.inputManager = new GameInputManager(this);
        } else {
            console.warn('GameInputManager not available, creating fallback');
            this.inputManager = null;
        }
        this.touchControls = null;
        this.resizeObserver = null;
    }

    /**
     * Detect viewport capabilities and constraints
     */
    detectViewport() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        const isMobile = width <= 768;
        const isTablet = width > 768 && width <= 1024;
        const isDesktop = width > 1024;

        return {
            width,
            height,
            isTouch,
            isMobile,
            isTablet,
            isDesktop,
            orientation: width > height ? 'landscape' : 'portrait',
            safeArea: this.calculateSafeArea()
        };
    }

    /**
     * Calculate safe area for mobile devices (notches, etc.)
     */
    calculateSafeArea() {
        const style = getComputedStyle(document.documentElement);
        return {
            top: parseInt(style.getPropertyValue('env(safe-area-inset-top)') || '0'),
            right: parseInt(style.getPropertyValue('env(safe-area-inset-right)') || '0'),
            bottom: parseInt(style.getPropertyValue('env(safe-area-inset-bottom)') || '0'),
            left: parseInt(style.getPropertyValue('env(safe-area-inset-left)') || '0')
        };
    }

    /**
     * Initialize the game engine
     */
    init() {
        this.createCanvas();
        this.calculateOptimalGrid();
        this.setupEventListeners();
        this.initializeControls();
        
        console.log(`🎮 CyberGameEngine initialized for ${this.gameType}`);
        console.log(`📱 Viewport: ${this.viewport.width}x${this.viewport.height} (${this.viewport.orientation})`);
        console.log(`🎯 Grid: ${this.grid.cols}x${this.grid.rows} (${this.grid.cellSize}px cells)`);
    }

    /**
     * Create and configure canvas with proper scaling
     */
    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Set canvas ID for styling
        this.canvas.id = `${this.containerId}-canvas`;
        this.canvas.className = 'cyber-game-canvas';
        
        // Configure context for crisp rendering
        this.ctx.imageSmoothingEnabled = false;
        this.ctx.textBaseline = 'middle';
        this.ctx.textAlign = 'center';
        
        this.container.appendChild(this.canvas);
        this.resizeCanvas();
    }

    /**
     * Calculate optimal grid based on viewport and constraints
     * Mathematical precision over pixel-perfect positioning
     */
    calculateOptimalGrid() {
        const containerRect = this.container.getBoundingClientRect();
        const rawWidth = containerRect.width || this.viewport.width;
        const rawHeight = containerRect.height || this.viewport.height;
        const paddedWidth = Math.max(
            rawWidth - (this.gridConfig.padding * 2),
            this.gridConfig.minCellSize * 8
        );
        const paddedHeight = Math.max(
            rawHeight - (this.gridConfig.padding * 2),
            this.gridConfig.minCellSize * 10
        );
        
        // Account for UI elements (controls, score, etc.)
        const uiHeight = Math.min(
            paddedHeight * 0.35,
            this.viewport.isMobile ? 200 : 120
        );
        const gameHeight = Math.max(
            paddedHeight - uiHeight,
            this.gridConfig.minCellSize * 8
        );
        
        // Calculate optimal cell size
        let cellSize = Math.floor(Math.min(
            paddedWidth / this.gridConfig.baseSize,
            gameHeight / this.gridConfig.baseSize
        ));
        
        // Clamp to min/max constraints
        cellSize = Math.max(this.gridConfig.minCellSize, 
                   Math.min(this.gridConfig.maxCellSize, cellSize));
        
        // Calculate grid dimensions
        const cols = Math.max(1, Math.floor(paddedWidth / cellSize));
        const rows = Math.max(1, Math.floor(gameHeight / cellSize));
        
        // Calculate actual canvas size (centered)
        const canvasWidth = cols * cellSize;
        const canvasHeight = rows * cellSize;
        
        this.grid = {
            cols,
            rows,
            cellSize,
            canvasWidth,
            canvasHeight,
            offsetX: (paddedWidth - canvasWidth) / 2,
            offsetY: (paddedHeight - canvasHeight) / 2,
            uiHeight,
            visibleWidth: paddedWidth,
            visibleHeight: paddedHeight
        };

        this.resizeCanvas();
    }

    /**
     * Resize canvas with proper scaling and pixel density
     */
    resizeCanvas() {
        if (!this.canvas || !this.grid) return;
        
        const { canvasWidth, canvasHeight } = this.grid;
        
        // Set display size
        this.canvas.style.width = `${canvasWidth}px`;
        this.canvas.style.height = `${canvasHeight}px`;
        
        // Set actual size accounting for device pixel ratio
        this.canvas.width = canvasWidth * this.devicePixelRatio;
        this.canvas.height = canvasHeight * this.devicePixelRatio;
        
        // Scale context to match device pixel ratio
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.scale(this.devicePixelRatio, this.devicePixelRatio);
        
        // Position canvas
        this.canvas.style.position = 'relative';
        this.canvas.style.margin = '0 auto';
        this.canvas.style.display = 'block';
    }

    /**
     * Convert screen coordinates to grid coordinates
     */
    screenToGrid(screenX, screenY) {
        const rect = this.canvas.getBoundingClientRect();
        const x = screenX - rect.left;
        const y = screenY - rect.top;
        
        return {
            x: Math.floor(x / this.grid.cellSize),
            y: Math.floor(y / this.grid.cellSize)
        };
    }

    /**
     * Convert grid coordinates to canvas coordinates
     */
    gridToCanvas(gridX, gridY) {
        return {
            x: gridX * this.grid.cellSize,
            y: gridY * this.grid.cellSize
        };
    }

    /**
     * Setup event listeners for resize and visibility
     */
    setupEventListeners() {
        // Resize handling with debounce
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 100);
        });

        // Visibility change handling
        document.addEventListener('visibilitychange', () => {
            if (document.hidden && this.gameState === 'playing') {
                this.pause();
            }
        });

        // Prevent context menu on canvas
        this.canvas.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });

        // Watch container size changes for responsive layouts
        if (window.ResizeObserver) {
            this.resizeObserver = new ResizeObserver(() => this.handleResize());
            this.resizeObserver.observe(this.container);
        } else {
            console.warn('ResizeObserver not supported - relying on window resize events only');
        }
    }

    /**
     * Handle viewport resize
     */
    handleResize() {
        this.viewport = this.detectViewport();
        this.calculateOptimalGrid();
        
        // Reinitialize controls for new viewport
        if (this.touchControls) {
            this.touchControls.destroy();
            this.initializeControls();
        }
        
        console.log(`🔄 Viewport resized: ${this.viewport.width}x${this.viewport.height}`);
    }

    /**
     * Initialize input controls based on device capabilities
     */
    initializeControls() {
        if (this.viewport.isTouch) {
            this.touchControls = new TouchControlSystem(this);
        }
    }

    /**
     * Start game loop with precise timing
     */
    start() {
        if (this.gameState === 'playing') return;
        
        this.gameState = 'playing';
        this.lastFrameTime = performance.now();
        this.gameLoop = requestAnimationFrame((timestamp) => this.loop(timestamp));
        
        console.log(`🎮 ${this.gameType} started`);
    }

    /**
     * Pause game
     */
    pause() {
        if (this.gameState !== 'playing') return;
        
        this.gameState = 'paused';
        if (this.gameLoop) {
            cancelAnimationFrame(this.gameLoop);
            this.gameLoop = null;
        }
        
        console.log(`⏸️ ${this.gameType} paused`);
    }

    /**
     * Resume game
     */
    resume() {
        if (this.gameState !== 'paused') return;
        
        this.gameState = 'playing';
        this.lastFrameTime = performance.now();
        this.gameLoop = requestAnimationFrame((timestamp) => this.loop(timestamp));
        
        console.log(`▶️ ${this.gameType} resumed`);
    }

    /**
     * Stop game
     */
    stop() {
        this.gameState = 'idle';
        if (this.gameLoop) {
            cancelAnimationFrame(this.gameLoop);
            this.gameLoop = null;
        }
        
        console.log(`⏹️ ${this.gameType} stopped`);
    }

    /**
     * Main game loop with frame rate control
     */
    loop(timestamp) {
        if (this.gameState !== 'playing') return;
        
        const deltaTime = timestamp - this.lastFrameTime;
        
        if (deltaTime >= this.frameInterval) {
            const renderStart = performance.now();
            
            // Update game logic (implemented by subclasses)
            this.update(deltaTime);
            
            // Render frame
            this.render();
            
            // Performance tracking
            this.performance.renderTime = performance.now() - renderStart;
            this.performance.frameCount++;
            
            if (timestamp - this.performance.lastFPSCheck >= 1000) {
                this.performance.currentFPS = this.performance.frameCount;
                this.performance.frameCount = 0;
                this.performance.lastFPSCheck = timestamp;
            }
            
            this.lastFrameTime = timestamp;
        }
        
        this.gameLoop = requestAnimationFrame((timestamp) => this.loop(timestamp));
    }

    /**
     * Update game logic - to be implemented by subclasses
     */
    update(deltaTime) {
        // Override in subclasses
    }

    /**
     * Render game - to be implemented by subclasses
     */
    render() {
        // Clear canvas with cyberpunk background
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(0, 0, this.grid.canvasWidth, this.grid.canvasHeight);
        
        // Draw grid lines in debug mode
        if (this.debugMode) {
            this.drawGrid();
        }
    }

    /**
     * Draw debug grid
     */
    drawGrid() {
        this.ctx.strokeStyle = 'rgba(0, 255, 157, 0.1)';
        this.ctx.lineWidth = 1;
        
        // Vertical lines
        for (let x = 0; x <= this.grid.cols; x++) {
            const xPos = x * this.grid.cellSize;
            this.ctx.beginPath();
            this.ctx.moveTo(xPos, 0);
            this.ctx.lineTo(xPos, this.grid.canvasHeight);
            this.ctx.stroke();
        }
        
        // Horizontal lines
        for (let y = 0; y <= this.grid.rows; y++) {
            const yPos = y * this.grid.cellSize;
            this.ctx.beginPath();
            this.ctx.moveTo(0, yPos);
            this.ctx.lineTo(this.grid.canvasWidth, yPos);
            this.ctx.stroke();
        }
    }

    /**
     * Cleanup and destroy
     */
    destroy() {
        this.stop();
        
        if (this.touchControls) {
            this.touchControls.destroy();
        }
        
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }

        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
            this.resizeObserver = null;
        }
        
        console.log(`🗑️ ${this.gameType} engine destroyed`);
    }
}

/**
 * Game Input Manager - Handles keyboard and touch input
 */
class GameInputManager {
    constructor(engine) {
        this.engine = engine;
        this.keys = new Set();
        this.touches = new Map();
        
        this.setupKeyboard();
        this.setupTouch();
    }

    setupKeyboard() {
        document.addEventListener('keydown', (e) => {
            this.keys.add(e.code);
            this.engine.onKeyDown?.(e.code);
        });

        document.addEventListener('keyup', (e) => {
            this.keys.delete(e.code);
            this.engine.onKeyUp?.(e.code);
        });
    }

    setupTouch() {
        const canvas = this.engine.canvas;
        
        if (!canvas) {
            console.warn('Canvas not found for touch setup, skipping touch events');
            return;
        }
        
        canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            for (const touch of e.changedTouches) {
                this.touches.set(touch.identifier, {
                    x: touch.clientX,
                    y: touch.clientY,
                    startTime: Date.now()
                });
            }
            this.engine.onTouchStart?.(e);
        });

        canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            for (const touch of e.changedTouches) {
                if (this.touches.has(touch.identifier)) {
                    const startTouch = this.touches.get(touch.identifier);
                    this.touches.set(touch.identifier, {
                        ...startTouch,
                        x: touch.clientX,
                        y: touch.clientY
                    });
                }
            }
            this.engine.onTouchMove?.(e);
        });

        canvas.addEventListener('touchend', (e) => {
            e.preventDefault();
            for (const touch of e.changedTouches) {
                this.touches.delete(touch.identifier);
            }
            this.engine.onTouchEnd?.(e);
        });
    }

    isKeyPressed(keyCode) {
        return this.keys.has(keyCode);
    }

    getTouches() {
        return Array.from(this.touches.values());
    }
}

/**
 * Touch Control System - Swipe gestures and button controls
 */
class TouchControlSystem {
    constructor(engine) {
        this.engine = engine;
        this.swipeThreshold = 50;
        this.swipeTimeout = 300;
        this.controlsContainer = null;
        
        this.createControls();
        this.setupSwipeDetection();
    }

    createControls() {
        this.controlsContainer = document.createElement('div');
        this.controlsContainer.className = 'cyber-touch-controls';
        this.controlsContainer.innerHTML = `
            <div class="touch-control-grid">
                <div></div>
                <button class="touch-btn touch-up" data-direction="up">↑</button>
                <div></div>
                <button class="touch-btn touch-left" data-direction="left">←</button>
                <button class="touch-btn touch-action" data-action="primary">⚡</button>
                <button class="touch-btn touch-right" data-direction="right">→</button>
                <div></div>
                <button class="touch-btn touch-down" data-direction="down">↓</button>
                <div></div>
            </div>
            <div class="touch-actions">
                <button class="touch-btn touch-pause" data-action="pause">⏸️</button>
                <button class="touch-btn touch-restart" data-action="restart">🔄</button>
            </div>
        `;
        
        this.engine.container.appendChild(this.controlsContainer);
        this.setupButtonEvents();
    }

    setupButtonEvents() {
        const buttons = this.controlsContainer.querySelectorAll('.touch-btn');
        
        buttons.forEach(btn => {
            btn.addEventListener('touchstart', (e) => {
                e.preventDefault();
                btn.classList.add('active');
                
                const direction = btn.dataset.direction;
                const action = btn.dataset.action;
                
                if (direction) {
                    this.engine.onDirectionInput?.(direction);
                } else if (action) {
                    this.engine.onActionInput?.(action);
                }
            });
            
            btn.addEventListener('touchend', (e) => {
                e.preventDefault();
                btn.classList.remove('active');
            });
        });
    }

    setupSwipeDetection() {
        let startTouch = null;
        
        this.engine.canvas.addEventListener('touchstart', (e) => {
            if (e.touches.length === 1) {
                startTouch = {
                    x: e.touches[0].clientX,
                    y: e.touches[0].clientY,
                    time: Date.now()
                };
            }
        });
        
        this.engine.canvas.addEventListener('touchend', (e) => {
            if (startTouch && e.changedTouches.length === 1) {
                const endTouch = {
                    x: e.changedTouches[0].clientX,
                    y: e.changedTouches[0].clientY,
                    time: Date.now()
                };
                
                const deltaX = endTouch.x - startTouch.x;
                const deltaY = endTouch.y - startTouch.y;
                const deltaTime = endTouch.time - startTouch.time;
                const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                
                if (distance > this.swipeThreshold && deltaTime < this.swipeTimeout) {
                    const direction = this.getSwipeDirection(deltaX, deltaY);
                    this.engine.onDirectionInput?.(direction);
                }
                
                startTouch = null;
            }
        });
    }

    getSwipeDirection(deltaX, deltaY) {
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            return deltaX > 0 ? 'right' : 'left';
        } else {
            return deltaY > 0 ? 'down' : 'up';
        }
    }

    destroy() {
        if (this.controlsContainer && this.controlsContainer.parentNode) {
            this.controlsContainer.parentNode.removeChild(this.controlsContainer);
        }
    }
}

// Export for use
window.CyberGameEngine = CyberGameEngine;
window.GameInputManager = GameInputManager;
window.TouchControlSystem = TouchControlSystem;
