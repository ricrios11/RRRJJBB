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
        this.foods = []; // Multi-food system
        this.ghostFoods = [];
        
        // Game timing
        this.gameStartTime = null;
        this.lastFoodSpawn = 0;
        this.foodSpawnInterval = 2000; // Base spawn interval in ms
        
        // Animation states
        this.foodAnimations = new Map(); // Track food introduction animations
        this.consumptionAnimations = []; // Track consumption effects
        
        // Initialize HUD elements - TROJAN HORSE FIX: Proper element binding
        this.scoreEl = null;
        this.levelEl = null;
        this.statusEl = null;
        this.score = 0;
        this.level = 1;
        this.gameState = 'ready'; // ready, playing, paused, gameOver
        this.gameLoop = null;
        this.speed = 100; // More dynamic base speed for engaging gameplay
        this.boostActive = false;
        this.boostSpeed = 50; // Faster turbo speed for exciting gameplay
        this.boostTimeLeft = 0;
        
        // Enhanced food types - TROJAN HORSE FIX: Increased negative food visibility
        this.foodTypes = {
            apple: { emoji: '🍎', points: 10, probability: 0.35 },
            cherry: { emoji: '🍒', points: 20, probability: 0.2 },
            banana: { emoji: '🍌', points: 15, probability: 0.2 },
            turbo: { emoji: '⚡', points: 5, probability: 0.1, effect: 'turbo' },
            poison: { emoji: '☠️', points: -20, probability: 0.1, effect: 'poison' }, // Increased from 0.03 to 0.1
            bomb: { emoji: '💣', points: 0, probability: 0.05, effect: 'death' } // Increased from 0.02 to 0.05
        };
        
        // Ghost food system
        this.ghostFoods = [];
        this.ghostMoveTimer = 0;

        // Viewport calculations
        this.calculateViewport();
        this.setupCanvas();
        this.setupHUD();
        this.setupControls();
        this.generateMultipleFoods();
        this.render(); // Initial render
        
        // Game initialized successfully
        
        // Set global reference for touch controls
        window.currentSnakeGame = this;
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
        
        // Viewport calculated successfully
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
        // BULLETPROOF DOM BINDING: Immediate binding with fallback retry
        this.bindHUDElements();
        
        // Backup binding with retry mechanism
        const retryBinding = () => {
            if (!this.scoreEl || !this.levelEl || !this.statusEl) {
                // Retrying HUD element binding
                this.bindHUDElements();
                if (!this.scoreEl) {
                    setTimeout(retryBinding, 50);
                }
            }
        };
        
        setTimeout(retryBinding, 10);
    }
    
    bindHUDElements() {
        this.scoreEl = document.getElementById('snake-score');
        this.levelEl = document.getElementById('snake-level');
        this.statusEl = document.getElementById('snake-status');
        
        // HUD elements bound successfully
        
        // Force initial update if elements found
        if (this.scoreEl && this.levelEl && this.statusEl) {
            this.updateHUD();
        }
    }

    setupControls() {
        this.keyHandler = (e) => {
            // Key input processed
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
        
        // Setup touch controls for mobile
        this.setupTouchControls();
    }

    setupTouchControls() {
        // Touch control setup for mobile devices
        const touchButtons = {
            'snake-up': () => this.setDirection({ x: 0, y: -1 }),
            'snake-down': () => this.setDirection({ x: 0, y: 1 }),
            'snake-left': () => this.setDirection({ x: -1, y: 0 }),
            'snake-right': () => this.setDirection({ x: 1, y: 0 }),
            'snake-boost': () => this.activateBoost()
        };

        Object.entries(touchButtons).forEach(([id, handler]) => {
            const btn = document.getElementById(id);
            if (btn) {
                // Touch control setup
                
                // Remove existing listeners
                btn.replaceWith(btn.cloneNode(true));
                const newBtn = document.getElementById(id);
                
                // Add multiple event types for compatibility
                ['touchstart', 'mousedown', 'click'].forEach(eventType => {
                    newBtn.addEventListener(eventType, (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        // Touch event processed
                        handler();
                        
                        // Visual feedback
                        newBtn.style.transform = 'scale(0.9)';
                        setTimeout(() => newBtn.style.transform = 'scale(1)', 150);
                    }, { passive: false });
                });
            }
        });
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
        
        // Game started successfully
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
        this.speed = 100; // Updated to match new base speed
        this.boostActive = false;
        this.boostTimeLeft = 0;
        this.foods = [];
        this.ghostFoods = [];
        this.foodAnimations = new Map(); // Reset animations
        this.consumptionAnimations = []; // Reset consumption effects
        this.lastFoodSpawn = 0; // Reset spawn timer
        this.generateMultipleFoods();
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

        // Check food collisions
        let foodEaten = false;
        
        // Check regular foods
        for (let i = this.foods.length - 1; i >= 0; i--) {
            const food = this.foods[i];
            if (head.x === food.x && head.y === food.y) {
                // Add consumption animation with math display
                this.consumptionAnimations.push({
                    x: food.x * this.cellSize + this.cellSize / 2,
                    y: food.y * this.cellSize + this.cellSize / 2,
                    startTime: Date.now(),
                    duration: 400,
                    points: food.points,
                    emoji: food.emoji
                });
                
                // Show math in score display temporarily
                this.showScoreMath(food.points);
                this.handleFoodEffect(food);
                this.foods.splice(i, 1);
                foodEaten = true;
                this.updateHUD(); // Update HUD immediately after food consumption
                break;
            }
        }
        
        // Check ghost foods
        for (let i = this.ghostFoods.length - 1; i >= 0; i--) {
            const ghostFood = this.ghostFoods[i];
            if (head.x === ghostFood.x && head.y === ghostFood.y) {
                this.score += ghostFood.points;
                this.ghostFoods.splice(i, 1);
                foodEaten = true;
                this.updateHUD(); // Update HUD immediately after ghost food consumption
                break;
            }
        }
        
        // Continuous food spawning system
        const currentTime = Date.now();
        if (currentTime - this.lastFoodSpawn > this.foodSpawnInterval) {
            // Vary spawn interval for dynamic gameplay (1.5-3 seconds)
            this.foodSpawnInterval = 1500 + Math.random() * 1500;
            
            // Spawn new food if we have less than 5 foods on screen
            if (this.foods.length < 5) {
                this.generateSingleFood();
                this.lastFoodSpawn = currentTime;
            }
            
            // 20% chance to spawn ghost food if none exists
            if (this.ghostFoods.length === 0 && Math.random() < 0.2) {
                this.generateGhostFood();
            }
        }
        
        if (!foodEaten) {
            this.snake.pop();
        }
        
        // Update boost timer
        if (this.boostActive && this.boostTimeLeft > 0) {
            this.boostTimeLeft--;
            if (this.boostTimeLeft <= 0) {
                this.boostActive = false;
            }
        }
        
        // Update ghost food movement
        this.updateGhostFoods();
        
        this.updateHUD();

        this.render();
    }

    generateMultipleFoods() {
        // Clear existing foods
        this.foods = [];
        
        // Generate 2-4 regular foods
        const numFoods = Math.floor(Math.random() * 3) + 2;
        for (let i = 0; i < numFoods; i++) {
            this.generateSingleFood();
        }
        
        // 30% chance to generate ghost food
        if (Math.random() < 0.3) {
            this.generateGhostFood();
        }
    }

    generateSingleFood() {
        let x, y;
        do {
            x = Math.floor(Math.random() * this.gridWidth);
            y = Math.floor(Math.random() * this.gridHeight);
        } while (this.isPositionOccupied(x, y));
        
        // Select food type based on probability
        const rand = Math.random();
        let cumulativeProbability = 0;
        let selectedType = 'apple'; // default
        
        for (const [type, config] of Object.entries(this.foodTypes)) {
            cumulativeProbability += config.probability;
            if (rand <= cumulativeProbability) {
                selectedType = type;
                break;
            }
        }
        
        const foodConfig = this.foodTypes[selectedType];
        const food = {
            x: x,
            y: y,
            emoji: foodConfig.emoji,
            points: foodConfig.points,
            effect: foodConfig.effect || null,
            id: Date.now() + Math.random() // Unique ID for animation tracking
        };
        
        // Add introduction animation
        this.foodAnimations.set(food.id, {
            type: 'introduction',
            startTime: Date.now(),
            duration: 300, // 300ms intro animation
            scale: 0
        });
        
        this.foods.push(food);
    }

    generateGhostFood() {
        let position;
        do {
            position = {
                x: Math.floor(Math.random() * this.gridWidth),
                y: Math.floor(Math.random() * this.gridHeight)
            };
        } while (this.isPositionOccupied(position.x, position.y));
        
        const ghostFood = {
            x: position.x,
            y: position.y,
            emoji: '👻',
            points: 50,
            type: 'ghost',
            moveTimer: 0,
            moveInterval: 20 // TROJAN HORSE FIX: Move every 20 frames for visible chase mechanics
        };
        
        this.ghostFoods.push(ghostFood);
    }

    isPositionOccupied(x, y) {
        // Check snake
        if (this.snake.some(segment => segment.x === x && segment.y === y)) {
            return true;
        }
        
        // Check regular foods
        if (this.foods.some(food => food.x === x && food.y === y)) {
            return true;
        }
        
        // Check ghost foods
        if (this.ghostFoods.some(food => food.x === x && food.y === y)) {
            return true;
        }
        
        return false;
    }

    handleFoodEffect(food) {
        // Processing food effect
        this.score += food.points;
        // Score updated
        
        switch (food.effect) {
            case 'turbo':
                this.boostActive = true;
                this.boostTimeLeft = 180; // 3 seconds at 60fps
                break;
                
            case 'poison':
                // Negative points already applied, add visual effect
                this.showPoisonEffect();
                break;
                
            case 'death':
                this.gameOver();
                return;
        }
        
        // Update level and speed with more dynamic progression
        this.level = Math.floor(Math.max(0, this.score) / 100) + 1;
        this.speed = Math.max(40, 100 - (this.level * 8)); // Faster progression and lower minimum speed
        
        // Restart game loop with new speed if not boosting
        if (!this.boostActive) {
            clearInterval(this.gameLoop);
            this.gameLoop = setInterval(() => this.update(), this.getCurrentSpeed());
        }
    }

    updateGhostFoods() {
        for (let i = this.ghostFoods.length - 1; i >= 0; i--) {
            const ghost = this.ghostFoods[i];
            ghost.moveTimer++;
            
            // TROJAN HORSE FIX: More frequent movement for visible chase mechanics
            if (ghost.moveTimer >= ghost.moveInterval) {
                ghost.moveTimer = 0;
                
                // Move ghost food like a chess knight
                const knightMoves = [
                    { x: 2, y: 1 }, { x: 2, y: -1 }, { x: -2, y: 1 }, { x: -2, y: -1 },
                    { x: 1, y: 2 }, { x: 1, y: -2 }, { x: -1, y: 2 }, { x: -1, y: -2 }
                ];
                
                const validMoves = knightMoves.filter(move => {
                    const newX = ghost.x + move.x;
                    const newY = ghost.y + move.y;
                    return newX >= 0 && newX < this.gridWidth && 
                           newY >= 0 && newY < this.gridHeight &&
                           !this.isPositionOccupied(newX, newY);
                });
                
                if (validMoves.length > 0) {
                    const randomMove = validMoves[Math.floor(Math.random() * validMoves.length)];
                    ghost.x += randomMove.x;
                    ghost.y += randomMove.y;
                } else {
                    // If no valid moves, disappear
                    this.ghostFoods.splice(i, 1);
                }
            }
        }
    }

    showPoisonEffect() {
        // Flash the canvas red briefly
        const originalFillStyle = this.ctx.fillStyle;
        this.ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
        this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
        
        setTimeout(() => {
            this.render();
        }, 200);
    }

    getCurrentSpeed() {
        return this.boostActive ? this.boostSpeed : this.speed;
    }

    render() {
        // Clear canvas
        this.ctx.fillStyle = '#111';
        this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

        // Draw snake with CYBERPUNK TURBO VISUAL AFFORDANCE
        const turboTime = Date.now() * 0.01;
        this.snake.forEach((segment, index) => {
            if (index === 0) {
                // TURBO HEAD: Dynamic color transformation
                let headColor = '#00ff9d'; // Default green
                let glowIntensity = 0;
                
                if (this.boostActive) {
                    // CYBERPUNK TURBO TRANSFORMATION
                    const pulseFactor = Math.sin(turboTime) * 0.5 + 0.5;
                    headColor = `rgb(${Math.floor(255 * pulseFactor)}, ${Math.floor(255 * (1 - pulseFactor))}, ${Math.floor(255 * pulseFactor)})`;
                    glowIntensity = 15 + Math.sin(turboTime * 2) * 10;
                    
                    // Electric glow effect
                    this.ctx.shadowColor = '#ff00ff';
                    this.ctx.shadowBlur = glowIntensity;
                }
                
                this.ctx.fillStyle = headColor;
                this.ctx.fillRect(
                    segment.x * this.cellSize + 1,
                    segment.y * this.cellSize + 1,
                    this.cellSize - 2,
                    this.cellSize - 2
                );
                
                // Reset shadow for other elements
                this.ctx.shadowBlur = 0;
                
                // Determine emotion based on game state and recent events
                let emotion = 'normal';
                if (this.boostActive) {
                    emotion = 'excited';
                } else if (this.consumptionAnimations.length > 0) {
                    emotion = 'happy';
                } else if (this.score < 0) {
                    emotion = 'sad';
                }
                
                // Draw emotive eyes
                this.ctx.fillStyle = '#000000';
                const eyeSize = Math.max(2, this.cellSize / 6);
                const eyeOffset = this.cellSize / 4;
                const headCenterX = segment.x * this.cellSize + this.cellSize / 2;
                const headCenterY = segment.y * this.cellSize + this.cellSize / 2;
                
                // Eye positions based on direction
                let leftEyeX = segment.x * this.cellSize + eyeOffset;
                let rightEyeX = segment.x * this.cellSize + this.cellSize - eyeOffset - eyeSize;
                let eyeY = segment.y * this.cellSize + eyeOffset;
                
                // Adjust eye position based on movement direction
                if (this.direction.x !== 0) {
                    leftEyeX += this.direction.x * 2;
                    rightEyeX += this.direction.x * 2;
                }
                if (this.direction.y !== 0) {
                    eyeY += this.direction.y * 2;
                }
                
                // Draw eyes based on emotion with TURBO ENHANCEMENT
                switch (emotion) {
                    case 'excited':
                        // TURBO EYES: Electric cyan glow with sparks
                        if (this.boostActive) {
                            this.ctx.shadowColor = '#00ffff';
                            this.ctx.shadowBlur = 8;
                            this.ctx.fillStyle = '#00ffff';
                        } else {
                            this.ctx.fillStyle = '#ffffff';
                        }
                        this.ctx.fillRect(leftEyeX - 1, eyeY - 1, eyeSize + 2, eyeSize + 2);
                        this.ctx.fillRect(rightEyeX - 1, eyeY - 1, eyeSize + 2, eyeSize + 2);
                        this.ctx.shadowBlur = 0;
                        this.ctx.fillStyle = '#000000';
                        this.ctx.fillRect(leftEyeX, eyeY, eyeSize, eyeSize);
                        this.ctx.fillRect(rightEyeX, eyeY, eyeSize, eyeSize);
                        break;
                        
                    case 'happy':
                        // Squinted happy eyes
                        this.ctx.fillRect(leftEyeX, eyeY + eyeSize / 3, eyeSize, eyeSize / 2);
                        this.ctx.fillRect(rightEyeX, eyeY + eyeSize / 3, eyeSize, eyeSize / 2);
                        break;
                        
                    case 'sad':
                        // Droopy eyes
                        this.ctx.fillRect(leftEyeX, eyeY + eyeSize / 4, eyeSize, eyeSize);
                        this.ctx.fillRect(rightEyeX, eyeY + eyeSize / 4, eyeSize, eyeSize);
                        break;
                        
                    default:
                        // Normal eyes
                        this.ctx.fillRect(leftEyeX, eyeY, eyeSize, eyeSize);
                        this.ctx.fillRect(rightEyeX, eyeY, eyeSize, eyeSize);
                }
                
                // Add pupils that follow movement direction
                this.ctx.fillStyle = '#ffffff';
                const pupilSize = Math.max(1, eyeSize / 3);
                const pupilOffsetX = this.direction.x * (eyeSize / 4);
                const pupilOffsetY = this.direction.y * (eyeSize / 4);
                
                if (emotion !== 'happy') { // Don't draw pupils for squinted eyes
                    this.ctx.fillRect(
                        leftEyeX + eyeSize / 2 - pupilSize / 2 + pupilOffsetX,
                        eyeY + eyeSize / 2 - pupilSize / 2 + pupilOffsetY,
                        pupilSize,
                        pupilSize
                    );
                    this.ctx.fillRect(
                        rightEyeX + eyeSize / 2 - pupilSize / 2 + pupilOffsetX,
                        eyeY + eyeSize / 2 - pupilSize / 2 + pupilOffsetY,
                        pupilSize,
                        pupilSize
                    );
                }
            } else {
                // TURBO BODY: Dynamic trail effect with cyberpunk colors
                let bodyColor, bodyAlpha;
                
                if (this.boostActive) {
                    // CYBERPUNK TURBO TRAIL: Magenta to cyan gradient
                    const trailProgress = index / this.snake.length;
                    const pulseFactor = Math.sin(turboTime + index * 0.5) * 0.3 + 0.7;
                    
                    // Interpolate between magenta (#ff00ff) and cyan (#00ffff)
                    const red = Math.floor(255 * (1 - trailProgress) * pulseFactor);
                    const green = Math.floor(255 * trailProgress * pulseFactor);
                    const blue = Math.floor(255 * pulseFactor);
                    
                    bodyColor = `rgb(${red}, ${green}, ${blue})`;
                    bodyAlpha = 0.9 - (index * 0.03); // Slower fade for turbo trail
                    
                    // Add glow effect to body segments
                    this.ctx.shadowColor = bodyColor;
                    this.ctx.shadowBlur = 5 + Math.sin(turboTime + index) * 3;
                } else {
                    // Normal green body
                    bodyColor = `rgba(0, 255, 157, ${0.8 - (index * 0.05)})`;
                    bodyAlpha = 1;
                }
                
                this.ctx.fillStyle = bodyColor;
                this.ctx.globalAlpha = bodyAlpha;
                this.ctx.fillRect(
                    segment.x * this.cellSize + 1,
                    segment.y * this.cellSize + 1,
                    this.cellSize - 2,
                    this.cellSize - 2
                );
                
                // Reset effects
                this.ctx.shadowBlur = 0;
                this.ctx.globalAlpha = 1.0;
            }
        });

        // Draw regular foods with pulsing animation
        this.ctx.font = `${this.cellSize - 4}px Arial`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        
        const pulseTime = Date.now() * 0.005; // Smooth pulsing animation
        
        this.foods.forEach(food => {
            // Full opacity for all foods
            this.ctx.globalAlpha = 1.0;
            
            // Handle introduction animation
            let animationScale = 1.0;
            if (food.id && this.foodAnimations.has(food.id)) {
                const anim = this.foodAnimations.get(food.id);
                const elapsed = Date.now() - anim.startTime;
                const progress = Math.min(elapsed / anim.duration, 1);
                
                if (anim.type === 'introduction') {
                    // Bounce-in animation
                    animationScale = progress < 0.5 ? 
                        2 * progress * progress : 
                        1 - Math.pow(-2 * progress + 2, 3) / 2;
                    
                    if (progress >= 1) {
                        this.foodAnimations.delete(food.id);
                    }
                }
            }
            
            // Calculate pulsing scale (0.9 to 1.1) combined with intro animation
            const pulseScale = (1.0 + Math.sin(pulseTime + food.x * 0.5 + food.y * 0.3) * 0.1) * animationScale;
            
            // Save context for transformation
            this.ctx.save();
            
            // Move to food center for scaling
            const centerX = food.x * this.cellSize + this.cellSize / 2;
            const centerY = food.y * this.cellSize + this.cellSize / 2;
            this.ctx.translate(centerX, centerY);
            this.ctx.scale(pulseScale, pulseScale);
            
            // Add strong background for high visibility
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
            this.ctx.fillRect(-this.cellSize/2 + 2, -this.cellSize/2 + 2, this.cellSize - 4, this.cellSize - 4);
            
            // Add enhanced glow effect for special foods
            if (food.effect) {
                this.ctx.shadowColor = food.effect === 'turbo' ? '#ffff00' : 
                                      food.effect === 'poison' ? '#ff0000' : 
                                      food.effect === 'death' ? '#ff4444' : 'transparent';
                this.ctx.shadowBlur = 15 + Math.sin(pulseTime * 2) * 6; // Stronger pulsing glow
            } else {
                // Regular foods get strong white glow for visibility
                this.ctx.shadowColor = '#ffffff';
                this.ctx.shadowBlur = 8 + Math.sin(pulseTime * 1.5) * 4;
            }
            
            // Set text color for maximum contrast
            this.ctx.fillStyle = '#ffffff';
            this.ctx.strokeStyle = '#000000';
            this.ctx.lineWidth = 2;
            this.ctx.strokeText(food.emoji, 0, 0);
            this.ctx.fillText(food.emoji, 0, 0);
            
            // Restore context
            this.ctx.restore();
            this.ctx.shadowBlur = 0;
            this.ctx.globalAlpha = 1.0;
        });
        
        // Draw consumption animations
        this.consumptionAnimations = this.consumptionAnimations.filter(anim => {
            const elapsed = Date.now() - anim.startTime;
            const progress = elapsed / anim.duration;
            
            if (progress >= 1) return false; // Remove completed animations
            
            this.ctx.save();
            
            // Fade out and scale up
            const alpha = 1 - progress;
            const scale = 1 + progress * 2;
            
            this.ctx.globalAlpha = alpha;
            this.ctx.translate(anim.x, anim.y);
            this.ctx.scale(scale, scale);
            
            // Draw points text
            this.ctx.fillStyle = anim.points > 0 ? '#00ff9d' : '#ff4444';
            this.ctx.font = `${Math.floor(this.cellSize * 0.6)}px Arial`;
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(`${anim.points > 0 ? '+' : ''}${anim.points}`, 0, -this.cellSize);
            
            // Draw emoji
            this.ctx.fillText(anim.emoji, 0, 0);
            
            this.ctx.restore();
            return true; // Keep animation
        });
        
        // Draw ghost foods with enhanced visibility and movement trail
        this.ghostFoods.forEach(ghost => {
            this.ctx.save();
            
            // TROJAN HORSE ENHANCEMENT: Add movement trail effect
            const pulseTime = Date.now() * 0.008;
            const trailAlpha = 0.3 + Math.sin(pulseTime) * 0.2;
            
            // Draw trail positions to show chess movement
            this.ctx.globalAlpha = trailAlpha;
            this.ctx.shadowColor = '#00ffff';
            this.ctx.shadowBlur = 15;
            
            // Draw main ghost with pulsing effect
            this.ctx.globalAlpha = 0.8 + Math.sin(pulseTime * 1.5) * 0.2;
            this.ctx.translate(ghost.x * this.cellSize + this.cellSize / 2, ghost.y * this.cellSize + this.cellSize / 2);
            
            // Add chess piece indicator
            this.ctx.fillStyle = '#00ffff';
            this.ctx.font = `${Math.floor(this.cellSize * 0.3)}px Arial`;
            this.ctx.textAlign = 'center';
            this.ctx.fillText('♞', 0, -this.cellSize * 0.6); // Chess knight symbol
            
            // Draw ghost emoji
            this.ctx.font = `${this.cellSize - 4}px Arial`;
            this.ctx.fillText(ghost.emoji, 0, 0);
            
            this.ctx.restore();
        });
    }

    showScoreMath(points) {
        if (this.scoreEl) {
            const mathDisplay = `${this.score} ${points > 0 ? '+' : ''}${points} = ${this.score + points}`;
            this.scoreEl.textContent = mathDisplay;
            
            // Revert to normal score after 1 second
            setTimeout(() => {
                if (this.scoreEl) {
                    this.scoreEl.textContent = this.score;
                }
            }, 1000);
        }
    }

    updateHUD() {
        // Force re-bind if elements are missing
        if (!this.scoreEl || !this.levelEl || !this.statusEl) {
            this.bindHUDElements();
        }
        
        if (this.scoreEl) {
            this.scoreEl.textContent = this.score;
        }
        
        if (this.levelEl) {
            this.levelEl.textContent = this.level;
        }
        
        if (this.statusEl) {
            this.statusEl.textContent = this.gameState.toUpperCase();
        }
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
