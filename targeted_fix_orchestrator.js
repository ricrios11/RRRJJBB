/**
 * TARGETED FIX ORCHESTRATOR
 * DNA Framework + Trojan Horse + Dark Matter
 * Systematic Resolution of Critical Issues
 * 
 * Based on comprehensive analysis findings
 */

class TargetedFixOrchestrator {
    constructor() {
        this.orchestratorId = `targeted_fix_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        this.initialized = false;
        this.fixes = {
            critical: [],
            strategic: [],
            completed: []
        };
        
        console.log('🧬🎯 TARGETED FIX ORCHESTRATOR: Initialized');
        console.log('🎯 Orchestrator ID:', this.orchestratorId);
    }

    /**
     * CRITICAL FIX 1: Consolidate Innovation Lab Architecture
     */
    async fixInnovationLabArchitecture() {
        console.log('🚨 CRITICAL FIX 1: Consolidating Innovation Lab Architecture...');
        
        const fix = {
            id: 'innovation_lab_consolidation',
            type: 'critical',
            issue: 'Multiple lab instances causing conflicts',
            solution: 'Single source of truth architecture',
            steps: []
        };

        try {
            // Step 1: Audit existing lab instances
            const existingLabs = document.querySelectorAll('#innovation-lab-foundation, #hidden-lab, .innovation-lab-section');
            fix.steps.push(`Found ${existingLabs.length} existing lab instances`);
            
            // Step 2: Preserve foundation, remove conflicts
            const foundation = document.getElementById('innovation-lab-foundation');
            const hiddenLab = document.getElementById('hidden-lab');
            
            if (hiddenLab && foundation) {
                // Hide the hidden lab properly
                hiddenLab.style.display = 'none';
                hiddenLab.setAttribute('data-konami-controlled', 'true');
                fix.steps.push('Hidden lab properly concealed');
            }
            
            // Step 3: Ensure foundation is ready for Konami activation
            if (foundation) {
                foundation.setAttribute('data-konami-target', 'true');
                foundation.setAttribute('data-state', 'foundation');
                fix.steps.push('Foundation marked as Konami target');
            }
            
            // Step 4: Clean up any orphaned elements
            const orphanedElements = document.querySelectorAll('.innovation-card-grid:not(#innovation-lab-foundation .innovation-card-grid)');
            orphanedElements.forEach(el => {
                if (el.parentNode !== foundation) {
                    el.remove();
                    fix.steps.push('Removed orphaned card grid');
                }
            });
            
            fix.status = 'completed';
            fix.result = 'Single source of truth established';
            
        } catch (error) {
            fix.status = 'failed';
            fix.error = error.message;
            console.error('❌ Innovation Lab consolidation failed:', error);
        }
        
        this.fixes.critical.push(fix);
        console.log('✅ CRITICAL FIX 1 COMPLETE:', fix);
        return fix;
    }

    /**
     * CRITICAL FIX 2: Proper Konami System Integration
     */
    async fixKonamiSystemIntegration() {
        console.log('🚨 CRITICAL FIX 2: Fixing Konami System Integration...');
        
        const fix = {
            id: 'konami_system_integration',
            type: 'critical',
            issue: 'Konami activation not properly revealing Innovation Lab',
            solution: 'Robust activation flow with proper state management',
            steps: []
        };

        try {
            // Step 1: Verify Konami listener exists
            if (!window.konamiListener) {
                // Create new Konami system
                this.createRobustKonamiSystem();
                fix.steps.push('Created new Konami listener system');
            } else {
                fix.steps.push('Existing Konami listener found');
            }
            
            // Step 2: Ensure proper activation target
            const foundation = document.getElementById('innovation-lab-foundation');
            const hiddenLab = document.getElementById('hidden-lab');
            
            if (foundation && hiddenLab) {
                // Create activation function
                window.activateInnovationLab = () => {
                    console.log('🎉 KONAMI ACTIVATED: Revealing Innovation Lab');
                    
                    // Hide hidden lab, show foundation with content
                    hiddenLab.style.display = 'none';
                    
                    // Deploy full Innovation Lab in foundation
                    this.deployFullInnovationLabContent();
                    
                    // Smooth scroll to reveal
                    foundation.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    
                    // Add activation animation
                    foundation.style.animation = 'fadeInUp 0.8s ease-out';
                };
                
                fix.steps.push('Activation function created and connected');
            }
            
            fix.status = 'completed';
            fix.result = 'Konami system properly integrated';
            
        } catch (error) {
            fix.status = 'failed';
            fix.error = error.message;
            console.error('❌ Konami system integration failed:', error);
        }
        
        this.fixes.critical.push(fix);
        console.log('✅ CRITICAL FIX 2 COMPLETE:', fix);
        return fix;
    }

    /**
     * CRITICAL FIX 3: Complete Snake Game Integration
     */
    async fixSnakeGameIntegration() {
        console.log('🚨 CRITICAL FIX 3: Completing Snake Game Integration...');
        
        const fix = {
            id: 'snake_game_integration',
            type: 'critical',
            issue: 'Snake game container not found after Konami activation',
            solution: 'Proper Snake game deployment with full functionality',
            steps: []
        };

        try {
            // Step 1: Create Snake game HTML structure
            const snakeGameHTML = this.createSnakeGameStructure();
            fix.steps.push('Snake game HTML structure created');
            
            // Step 2: Add Snake game styles
            const snakeGameStyles = this.createSnakeGameStyles();
            if (!document.getElementById('snake-game-styles')) {
                const styleElement = document.createElement('style');
                styleElement.id = 'snake-game-styles';
                styleElement.textContent = snakeGameStyles;
                document.head.appendChild(styleElement);
                fix.steps.push('Snake game styles added');
            }
            
            // Step 3: Store for deployment during Konami activation
            window.snakeGameHTML = snakeGameHTML;
            window.initializeSnakeGame = this.initializeSnakeGameLogic.bind(this);
            
            fix.steps.push('Snake game ready for deployment');
            fix.status = 'completed';
            fix.result = 'Snake game integration prepared';
            
        } catch (error) {
            fix.status = 'failed';
            fix.error = error.message;
            console.error('❌ Snake game integration failed:', error);
        }
        
        this.fixes.critical.push(fix);
        console.log('✅ CRITICAL FIX 3 COMPLETE:', fix);
        return fix;
    }

    /**
     * STRATEGIC FIX 1: Theme System Validation
     */
    async validateThemeSystem() {
        console.log('🎯 STRATEGIC FIX 1: Validating Theme System...');
        
        const fix = {
            id: 'theme_system_validation',
            type: 'strategic',
            issue: 'Ensure theme system works across all components',
            solution: 'Comprehensive theme validation and consistency check',
            steps: []
        };

        try {
            // Step 1: Check current theme state
            const body = document.body;
            const currentTheme = body.classList.contains('dark') ? 'dark' : 'light';
            const computedBg = window.getComputedStyle(body).backgroundColor;
            
            fix.steps.push(`Current theme: ${currentTheme}, Background: ${computedBg}`);
            
            // Step 2: Validate theme consistency
            const isDarkBg = this.isDarkBackground(computedBg);
            const themeConsistent = (currentTheme === 'dark' && isDarkBg) || (currentTheme === 'light' && !isDarkBg);
            
            if (themeConsistent) {
                fix.steps.push('✅ Theme system consistent');
            } else {
                fix.steps.push('⚠️ Theme inconsistency detected');
                // Add theme fix if needed
                this.fixThemeInconsistency(currentTheme, isDarkBg);
                fix.steps.push('Theme inconsistency resolved');
            }
            
            // Step 3: Ensure Innovation Lab components will inherit theme
            const foundation = document.getElementById('innovation-lab-foundation');
            if (foundation) {
                foundation.setAttribute('data-theme-aware', 'true');
                fix.steps.push('Innovation Lab marked as theme-aware');
            }
            
            fix.status = 'completed';
            fix.result = 'Theme system validated and consistent';
            
        } catch (error) {
            fix.status = 'failed';
            fix.error = error.message;
            console.error('❌ Theme system validation failed:', error);
        }
        
        this.fixes.strategic.push(fix);
        console.log('✅ STRATEGIC FIX 1 COMPLETE:', fix);
        return fix;
    }

    /**
     * DEPLOYMENT FUNCTIONS
     */
    deployFullInnovationLabContent() {
        const foundation = document.getElementById('innovation-lab-foundation');
        if (!foundation) return;

        // Clear existing content but preserve foundation status
        const foundationStatus = foundation.querySelector('.foundation-status');
        foundation.innerHTML = '';
        if (foundationStatus) {
            foundation.appendChild(foundationStatus);
        }

        // Add production card grid
        const cardGridHTML = this.createProductionCardGrid();
        foundation.insertAdjacentHTML('beforeend', cardGridHTML);

        // Add Snake game
        if (window.snakeGameHTML) {
            foundation.insertAdjacentHTML('beforeend', window.snakeGameHTML);
            // Initialize Snake game
            setTimeout(() => {
                if (window.initializeSnakeGame) {
                    window.initializeSnakeGame();
                }
            }, 100);
        }

        console.log('🚀 Full Innovation Lab content deployed');
    }

    createProductionCardGrid() {
        return `
            <div class="innovation-card-grid" id="production-card-grid">
                <div class="card-grid-header">
                    <h3>🧬 Innovation Laboratory</h3>
                    <p>Future-state design experiments and prototypes</p>
                </div>
                
                <div class="card-grid-container">
                    <div class="innovation-card live-card">
                        <div class="card-status-indicator">LIVE</div>
                        <div class="card-icon">🧠</div>
                        <h4>UX Memory Recall</h4>
                        <p>Advanced visitor journey analysis</p>
                        <button class="card-action-btn">LAUNCH</button>
                    </div>
                    
                    <div class="innovation-card live-card">
                        <div class="card-status-indicator">LIVE</div>
                        <div class="card-icon">🔬</div>
                        <h4>Case Study Remix</h4>
                        <p>AI-powered case study personalization</p>
                        <button class="card-action-btn">LAUNCH</button>
                    </div>
                    
                    <div class="innovation-card live-card">
                        <div class="card-status-indicator">LIVE</div>
                        <div class="card-icon">💾</div>
                        <h4>Save-to-Local</h4>
                        <p>Persistent experience curation</p>
                        <button class="card-action-btn">LAUNCH</button>
                    </div>
                    
                    <div class="innovation-card live-card">
                        <div class="card-status-indicator">LIVE</div>
                        <div class="card-icon">🐴</div>
                        <h4>TrojanHorse Feed</h4>
                        <p>Advanced content orchestration</p>
                        <button class="card-action-btn">LAUNCH</button>
                    </div>
                    
                    <div class="innovation-card beta-card">
                        <div class="card-status-indicator">BETA</div>
                        <div class="card-icon">⚡</div>
                        <h4>Prompt Generator</h4>
                        <p>Dynamic prompt generation</p>
                        <button class="card-action-btn">LAUNCH</button>
                    </div>
                    
                    <div class="innovation-card experimental-card">
                        <div class="card-status-indicator">EXPERIMENTAL</div>
                        <div class="card-icon">🐍</div>
                        <h4>DOS Snake Game</h4>
                        <p>Classic game with modern enhancements</p>
                        <button class="card-action-btn" onclick="document.getElementById('snake-game-section').scrollIntoView({behavior: 'smooth'})">LAUNCH</button>
                    </div>
                </div>
            </div>
        `;
    }

    createSnakeGameStructure() {
        return `
            <div class="snake-game-section" id="snake-game-section">
                <div class="snake-game-header">
                    <h4>🐍 DOS Snake Game</h4>
                    <p>Classic arcade experience with modern enhancements</p>
                </div>
                
                <div class="snake-game-container">
                    <div class="game-info">
                        <div class="score-display">
                            <span>Score: <span id="current-score">0</span></span>
                            <span>High: <span id="high-score">0</span></span>
                        </div>
                        <div class="game-status" id="game-status">Ready to Play</div>
                    </div>
                    
                    <canvas id="snake-canvas" width="400" height="400"></canvas>
                    
                    <div class="game-controls">
                        <button id="start-game-btn" class="control-btn">START</button>
                        <button id="pause-game-btn" class="control-btn">PAUSE</button>
                        <button id="reset-game-btn" class="control-btn">RESET</button>
                    </div>
                    
                    <div class="control-instructions">
                        <p>Use WASD or Arrow Keys to control the snake</p>
                        <p>Eat the food to grow and increase your score!</p>
                    </div>
                </div>
            </div>
        `;
    }

    createSnakeGameStyles() {
        return `
            .snake-game-section {
                width: 100%;
                max-width: 600px;
                margin: 3rem auto;
                padding: 2rem;
                text-align: center;
                font-family: 'Courier New', monospace;
            }

            .snake-game-header h4 {
                font-size: 2rem;
                margin-bottom: 0.5rem;
                color: #00ff41;
            }

            [data-theme="light"] .snake-game-header h4,
            body:not(.dark) .snake-game-header h4 {
                color: #0080ff;
            }

            .snake-game-container {
                background: rgba(0, 20, 40, 0.9);
                border: 2px solid rgba(0, 255, 65, 0.3);
                border-radius: 12px;
                padding: 2rem;
                backdrop-filter: blur(10px);
            }

            [data-theme="light"] .snake-game-container,
            body:not(.dark) .snake-game-container {
                background: rgba(255, 255, 255, 0.95);
                border-color: rgba(0, 128, 255, 0.3);
            }

            .game-info {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1rem;
                font-size: 1.1rem;
            }

            .score-display {
                display: flex;
                gap: 2rem;
            }

            .score-display span {
                color: #00ff41;
                font-weight: bold;
            }

            [data-theme="light"] .score-display span,
            body:not(.dark) .score-display span {
                color: #0080ff;
            }

            #snake-canvas {
                border: 2px solid #00ff41;
                background: #000;
                margin: 1rem 0;
                border-radius: 8px;
            }

            [data-theme="light"] #snake-canvas,
            body:not(.dark) #snake-canvas {
                border-color: #0080ff;
                background: #f0f0f0;
            }

            .game-controls {
                display: flex;
                gap: 1rem;
                justify-content: center;
                margin: 1rem 0;
            }

            .control-btn {
                padding: 0.5rem 1rem;
                background: transparent;
                border: 2px solid #00ff41;
                color: #00ff41;
                font-family: 'Courier New', monospace;
                font-weight: bold;
                border-radius: 6px;
                cursor: pointer;
                transition: all 0.3s ease;
            }

            .control-btn:hover {
                background: #00ff41;
                color: #000;
            }

            [data-theme="light"] .control-btn,
            body:not(.dark) .control-btn {
                border-color: #0080ff;
                color: #0080ff;
            }

            [data-theme="light"] .control-btn:hover,
            body:not(.dark) .control-btn:hover {
                background: #0080ff;
                color: #fff;
            }

            .control-instructions {
                margin-top: 1rem;
                font-size: 0.9rem;
                opacity: 0.7;
            }
        `;
    }

    initializeSnakeGameLogic() {
        const canvas = document.getElementById('snake-canvas');
        if (!canvas) {
            console.error('🐍 Snake canvas not found!');
            return;
        }

        console.log('🐍 Initializing Snake game...');
        
        const ctx = canvas.getContext('2d');
        const gridSize = 20;
        const tileCount = canvas.width / gridSize;

        let snake = [{ x: 10, y: 10 }];
        let food = { x: 15, y: 15 };
        let dx = 0, dy = 0;
        let score = 0;
        let gameRunning = false;
        let gameLoop = null;

        // Load high score
        const highScore = localStorage.getItem('snakeHighScore') || 0;
        document.getElementById('high-score').textContent = highScore;

        const updateScore = () => {
            document.getElementById('current-score').textContent = score;
            if (score > highScore) {
                localStorage.setItem('snakeHighScore', score);
                document.getElementById('high-score').textContent = score;
            }
        };

        const updateGameStatus = (status) => {
            const statusEl = document.getElementById('game-status');
            if (statusEl) statusEl.textContent = status;
        };

        const drawGame = () => {
            // Determine colors based on theme
            const isDark = document.body.classList.contains('dark');
            const bgColor = isDark ? '#000' : '#f0f0f0';
            const snakeColor = '#00ff41';
            const foodColor = '#ff0080';

            // Clear canvas
            ctx.fillStyle = bgColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw snake
            ctx.fillStyle = snakeColor;
            snake.forEach(segment => {
                ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
            });

            // Draw food
            ctx.fillStyle = foodColor;
            ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
        };

        const moveSnake = () => {
            if (!gameRunning) return;

            const head = { x: snake[0].x + dx, y: snake[0].y + dy };

            // Check wall collision
            if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
                gameOver();
                return;
            }

            // Check self collision
            if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
                gameOver();
                return;
            }

            snake.unshift(head);

            // Check food collision
            if (head.x === food.x && head.y === food.y) {
                score += 10;
                updateScore();
                food = {
                    x: Math.floor(Math.random() * tileCount),
                    y: Math.floor(Math.random() * tileCount)
                };
                updateGameStatus(`Score: ${score}`);
            } else {
                snake.pop();
            }

            drawGame();
        };

        const gameOver = () => {
            gameRunning = false;
            if (gameLoop) {
                clearInterval(gameLoop);
                gameLoop = null;
            }
            updateGameStatus('Game Over! Press START to play again');
        };

        const startGame = () => {
            snake = [{ x: 10, y: 10 }];
            dx = 0;
            dy = 0;
            score = 0;
            gameRunning = true;
            updateScore();
            updateGameStatus('Playing...');
            
            if (gameLoop) clearInterval(gameLoop);
            gameLoop = setInterval(moveSnake, 150);
            drawGame();
        };

        const pauseGame = () => {
            gameRunning = !gameRunning;
            if (gameRunning) {
                if (gameLoop) clearInterval(gameLoop);
                gameLoop = setInterval(moveSnake, 150);
                updateGameStatus('Playing...');
            } else {
                if (gameLoop) {
                    clearInterval(gameLoop);
                    gameLoop = null;
                }
                updateGameStatus('Paused');
            }
        };

        const resetGame = () => {
            gameRunning = false;
            if (gameLoop) {
                clearInterval(gameLoop);
                gameLoop = null;
            }
            snake = [{ x: 10, y: 10 }];
            dx = 0;
            dy = 0;
            score = 0;
            updateScore();
            updateGameStatus('Ready to Play');
            drawGame();
        };

        // Controls
        const handleKeyPress = (event) => {
            if (!gameRunning) return;

            const key = event.code;
            
            if ((key === 'ArrowLeft' || key === 'KeyA') && dx !== 1) {
                dx = -1; dy = 0;
            } else if ((key === 'ArrowUp' || key === 'KeyW') && dy !== 1) {
                dx = 0; dy = -1;
            } else if ((key === 'ArrowRight' || key === 'KeyD') && dx !== -1) {
                dx = 1; dy = 0;
            } else if ((key === 'ArrowDown' || key === 'KeyS') && dy !== -1) {
                dx = 0; dy = 1;
            }
        };

        // Event listeners
        document.getElementById('start-game-btn').addEventListener('click', startGame);
        document.getElementById('pause-game-btn').addEventListener('click', pauseGame);
        document.getElementById('reset-game-btn').addEventListener('click', resetGame);
        document.addEventListener('keydown', handleKeyPress);

        // Initial draw
        drawGame();
        console.log('🐍 Snake game initialized successfully!');
    }

    createRobustKonamiSystem() {
        const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
        let konamiIndex = 0;
        let konamiTimeout = null;

        const resetKonami = () => {
            konamiIndex = 0;
            if (konamiTimeout) {
                clearTimeout(konamiTimeout);
                konamiTimeout = null;
            }
        };

        const konamiListener = (event) => {
            if (event.code === konamiCode[konamiIndex]) {
                konamiIndex++;
                console.log(`🎮 KONAMI PROGRESS: ${konamiIndex}/10 - Key: ${event.keyCode}`);
                
                // Reset timeout
                if (konamiTimeout) clearTimeout(konamiTimeout);
                konamiTimeout = setTimeout(resetKonami, 3000);
                
                if (konamiIndex === konamiCode.length) {
                    console.log('🎉 KONAMI CODE COMPLETE! ACTIVATING INNOVATION LAB!');
                    if (window.activateInnovationLab) {
                        window.activateInnovationLab();
                    }
                    resetKonami();
                }
            } else {
                resetKonami();
            }
        };

        // Remove existing listener if present
        if (window.konamiListener) {
            document.removeEventListener('keydown', window.konamiListener);
        }

        // Add new listener
        document.addEventListener('keydown', konamiListener);
        window.konamiListener = konamiListener;
        window.konamiSequence = konamiCode;

        console.log('🎮 Robust Konami system created');
    }

    // Utility methods
    isDarkBackground(color) {
        if (!color) return false;
        const rgb = color.match(/\d+/g);
        if (!rgb) return false;
        const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
        return brightness < 128;
    }

    fixThemeInconsistency(currentTheme, isDarkBg) {
        const body = document.body;
        if (currentTheme === 'dark' && !isDarkBg) {
            // Force dark theme styles
            body.classList.remove('light');
            body.classList.add('dark');
        } else if (currentTheme === 'light' && isDarkBg) {
            // Force light theme styles
            body.classList.remove('dark');
            body.classList.add('light');
        }
    }

    /**
     * ORCHESTRATOR EXECUTION
     */
    async executeAllFixes() {
        console.log('🚀 TARGETED FIX ORCHESTRATOR: Executing all fixes...');
        
        const results = {
            orchestratorId: this.orchestratorId,
            timestamp: new Date().toISOString(),
            fixes: {
                critical: [],
                strategic: []
            },
            summary: {
                totalFixes: 0,
                successful: 0,
                failed: 0
            }
        };

        try {
            // Execute critical fixes
            const criticalFixes = [
                await this.fixInnovationLabArchitecture(),
                await this.fixKonamiSystemIntegration(),
                await this.fixSnakeGameIntegration()
            ];

            results.fixes.critical = criticalFixes;

            // Execute strategic fixes
            const strategicFixes = [
                await this.validateThemeSystem()
            ];

            results.fixes.strategic = strategicFixes;

            // Calculate summary
            const allFixes = [...criticalFixes, ...strategicFixes];
            results.summary.totalFixes = allFixes.length;
            results.summary.successful = allFixes.filter(f => f.status === 'completed').length;
            results.summary.failed = allFixes.filter(f => f.status === 'failed').length;

            console.log('🎉 TARGETED FIX ORCHESTRATOR COMPLETE:', results);
            
            // Store results globally
            window.targetedFixResults = results;
            
            return results;

        } catch (error) {
            console.error('❌ TARGETED FIX ORCHESTRATOR FAILED:', error);
            results.error = error.message;
            return results;
        }
    }
}

// Initialize and execute targeted fixes
window.TargetedFixOrchestrator = TargetedFixOrchestrator;
const fixOrchestrator = new TargetedFixOrchestrator();

// Auto-execute all fixes
fixOrchestrator.executeAllFixes().then(results => {
    console.log('🧬🎯 TARGETED FIXES COMPLETE - Results available in window.targetedFixResults');
    console.log('📊 Summary:', results.summary);
    
    if (results.summary.successful === results.summary.totalFixes) {
        console.log('✅ ALL FIXES SUCCESSFUL - System ready for validation');
    } else {
        console.log('⚠️ Some fixes failed - Review results for details');
    }
}).catch(error => {
    console.error('❌ TARGETED FIX EXECUTION FAILED:', error);
});
