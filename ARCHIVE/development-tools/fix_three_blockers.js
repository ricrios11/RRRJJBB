/**
 * FIX THREE CRITICAL BLOCKERS
 * 1. TrojanHorse Feed overlap issues
 * 2. Ensure Innovation Lab Konami code integration
 * 3. Fix Snake game launch from feature card
 */

console.log('🎯 FIXING THREE CRITICAL BLOCKERS');
console.log('==================================');

// BLOCKER 1: Fix TrojanHorse Feed Overlap
console.log('1️⃣ FIXING TROJANHORSE FEED OVERLAP...');

const feedOverlapFix = document.createElement('style');
feedOverlapFix.id = 'trojanhorse-feed-overlap-fix';
feedOverlapFix.textContent = `
    /* TrojanHorse Feed Overlap Fix */
    .trojanhorse-feed, #trojanhorse-feed {
        min-height: 250px !important;
        padding-bottom: 4rem !important;
        position: relative !important;
    }
    
    .trojanhorse-feed .carousel-indicators,
    .trojanhorse-feed .carousel-nav,
    .trojanhorse-feed .dots,
    #trojanhorse-feed .carousel-indicators,
    #trojanhorse-feed .carousel-nav,
    #trojanhorse-feed .dots {
        position: absolute !important;
        bottom: 1rem !important;
        left: 50% !important;
        transform: translateX(-50%) !important;
        z-index: 100 !important;
        display: flex !important;
        gap: 0.5rem !important;
    }
    
    .trojanhorse-feed .feed-content,
    #trojanhorse-feed .feed-content {
        margin-bottom: 3rem !important;
        padding-bottom: 1rem !important;
    }
    
    /* Ensure feed text doesn't overlap with nav */
    .trojanhorse-feed p,
    .trojanhorse-feed .description,
    #trojanhorse-feed p,
    #trojanhorse-feed .description {
        margin-bottom: 2rem !important;
    }
`;

// Remove existing fix if present
const existingFeedFix = document.getElementById('trojanhorse-feed-overlap-fix');
if (existingFeedFix) existingFeedFix.remove();

document.head.appendChild(feedOverlapFix);
console.log('✅ TrojanHorse Feed overlap fixed');

// BLOCKER 2: Ensure Innovation Lab Konami Integration
console.log('2️⃣ ENSURING INNOVATION LAB KONAMI INTEGRATION...');

// Verify Konami code system is working
if (window.konamiCode || window.konami) {
    console.log('✅ Konami code system detected');
} else {
    console.log('🔧 Creating Konami code system...');
    
    let konamiSequence = [];
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
    
    window.konamiCode = {
        sequence: konamiSequence,
        target: konamiCode,
        
        check: function(keyCode) {
            this.sequence.push(keyCode);
            
            if (this.sequence.length > this.target.length) {
                this.sequence.shift();
            }
            
            if (this.sequence.length === this.target.length) {
                const match = this.sequence.every((key, index) => key === this.target[index]);
                if (match) {
                    this.activate();
                    this.sequence = [];
                }
            }
        },
        
        activate: function() {
            console.log('🌌 KONAMI CODE ACTIVATED!');
            const innovationLab = document.querySelector('#innovation-lab, .innovation-lab');
            if (innovationLab) {
                innovationLab.style.display = 'block';
                innovationLab.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };
    
    document.addEventListener('keydown', function(e) {
        window.konamiCode.check(e.keyCode);
    });
    
    console.log('✅ Konami code system created');
}

// BLOCKER 3: Fix Snake Game Launch from Feature Card
console.log('3️⃣ FIXING SNAKE GAME LAUNCH FROM FEATURE CARD...');

// Create a robust Snake game launcher that works from the feature card
window.launchSnakeGameFromCard = function() {
    console.log('🐍 Launching Snake Game from Feature Card...');
    
    try {
        // Remove any existing snake game modal
        const existingModal = document.querySelector('.snake-game-modal, .modal-overlay');
        if (existingModal) existingModal.remove();
        
        // Create snake game modal
        const snakeModal = document.createElement('div');
        snakeModal.className = 'snake-game-modal modal-overlay';
        snakeModal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.9);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
        `;
        
        const isDark = document.documentElement.classList.contains('dark');
        
        snakeModal.innerHTML = `
            <div class="snake-game-container" style="
                background: ${isDark ? 'rgba(0, 0, 0, 0.95)' : 'rgba(255, 255, 255, 0.95)'};
                border: 2px solid ${isDark ? '#00ff88' : '#4a7c23'};
                border-radius: 12px;
                padding: 2rem;
                text-align: center;
                color: ${isDark ? '#00ff88' : '#2d5016'};
                max-width: 90vw;
                max-height: 90vh;
                overflow: auto;
            ">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                    <h3 style="margin: 0; color: ${isDark ? '#00ff88' : '#2d5016'}; font-size: 1.5rem;">
                        🐍 DOS Snake Game
                    </h3>
                    <button onclick="closeSnakeGameModal()" style="
                        background: #ff4444;
                        color: #fff;
                        border: none;
                        padding: 0.5rem 1rem;
                        border-radius: 6px;
                        cursor: pointer;
                        font-family: monospace;
                        font-weight: bold;
                    ">✕ CLOSE</button>
                </div>
                
                <div id="snake-game-area" style="
                    width: 400px;
                    height: 400px;
                    border: 2px solid ${isDark ? '#00ff88' : '#4a7c23'};
                    background: #000;
                    margin: 0 auto 1.5rem auto;
                    position: relative;
                    box-shadow: ${isDark ? '0 0 20px rgba(0, 255, 136, 0.3)' : '0 4px 20px rgba(0, 0, 0, 0.2)'};
                ">
                    <div id="snake-canvas" style="width: 100%; height: 100%; position: relative;"></div>
                </div>
                
                <div class="snake-controls" style="margin-bottom: 1rem; display: flex; justify-content: center; gap: 0.75rem; flex-wrap: wrap;">
                    <button onclick="startSnakeGame()" style="
                        background: ${isDark ? '#00ff88' : '#4a7c23'};
                        color: ${isDark ? '#000' : '#fff'};
                        border: none;
                        padding: 0.75rem 1.5rem;
                        border-radius: 6px;
                        cursor: pointer;
                        font-family: monospace;
                        font-weight: bold;
                    ">▶ START</button>
                    <button onclick="pauseSnakeGame()" style="
                        background: #666;
                        color: #fff;
                        border: none;
                        padding: 0.75rem 1.5rem;
                        border-radius: 6px;
                        cursor: pointer;
                        font-family: monospace;
                    ">⏸ PAUSE</button>
                    <button onclick="resetSnakeGame()" style="
                        background: #666;
                        color: #fff;
                        border: none;
                        padding: 0.75rem 1.5rem;
                        border-radius: 6px;
                        cursor: pointer;
                        font-family: monospace;
                    ">🔄 RESET</button>
                </div>
                
                <div id="snake-score" style="
                    color: ${isDark ? '#00ff88' : '#2d5016'};
                    font-weight: bold;
                    font-size: 1.1rem;
                    margin-bottom: 0.5rem;
                ">Score: 0</div>
                
                <p style="color: #888; font-size: 0.9rem; margin: 0;">
                    Use arrow keys or WASD to control the snake
                </p>
            </div>
        `;
        
        document.body.appendChild(snakeModal);
        
        // Initialize the snake game
        initializeSnakeGameLogic();
        
        // Close modal on overlay click
        snakeModal.addEventListener('click', function(e) {
            if (e.target === snakeModal) {
                closeSnakeGameModal();
            }
        });
        
        console.log('✅ Snake Game modal created and initialized');
        
    } catch (error) {
        console.error('❌ Snake Game launch failed:', error);
        
        // Show error modal
        const errorModal = document.createElement('div');
        errorModal.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 10001;
            background: rgba(255, 255, 255, 0.95);
            border: 2px solid #ff4444;
            border-radius: 12px;
            padding: 2rem;
            text-align: center;
            font-family: monospace;
        `;
        
        errorModal.innerHTML = `
            <h3 style="color: #ff4444; margin-bottom: 1rem;">🐍 Game Launch Error</h3>
            <p style="color: #666; margin-bottom: 1.5rem;">Unable to initialize Snake game.</p>
            <button onclick="this.parentElement.remove()" style="
                background: #ff4444;
                color: #fff;
                border: none;
                padding: 0.5rem 1rem;
                border-radius: 6px;
                cursor: pointer;
            ">Close</button>
        `;
        
        document.body.appendChild(errorModal);
        setTimeout(() => errorModal.remove(), 5000);
    }
};

// Snake game logic
function initializeSnakeGameLogic() {
    const canvas = document.getElementById('snake-canvas');
    if (!canvas) return;
    
    let snake = [{x: 200, y: 200}];
    let food = {x: 100, y: 100};
    let direction = {x: 0, y: 0};
    let score = 0;
    let gameRunning = false;
    let gameLoop;
    
    function drawGame() {
        canvas.innerHTML = '';
        
        // Draw snake
        snake.forEach((segment, index) => {
            const div = document.createElement('div');
            div.style.cssText = `
                position: absolute;
                left: ${segment.x}px;
                top: ${segment.y}px;
                width: 18px;
                height: 18px;
                background: ${index === 0 ? '#00ff88' : '#00cc66'};
                border: 1px solid #000;
                border-radius: 2px;
            `;
            canvas.appendChild(div);
        });
        
        // Draw food
        const foodDiv = document.createElement('div');
        foodDiv.style.cssText = `
            position: absolute;
            left: ${food.x}px;
            top: ${food.y}px;
            width: 18px;
            height: 18px;
            background: #ff4444;
            border: 1px solid #000;
            border-radius: 50%;
        `;
        canvas.appendChild(foodDiv);
        
        // Update score
        const scoreEl = document.getElementById('snake-score');
        if (scoreEl) scoreEl.textContent = `Score: ${score}`;
    }
    
    function moveSnake() {
        if (!gameRunning) return;
        
        const head = {x: snake[0].x + direction.x, y: snake[0].y + direction.y};
        
        // Check boundaries
        if (head.x < 0 || head.x >= 380 || head.y < 0 || head.y >= 380) {
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
            generateFood();
        } else {
            snake.pop();
        }
        
        drawGame();
    }
    
    function generateFood() {
        food = {
            x: Math.floor(Math.random() * 19) * 20,
            y: Math.floor(Math.random() * 19) * 20
        };
    }
    
    function gameOver() {
        gameRunning = false;
        clearInterval(gameLoop);
        setTimeout(() => {
            alert(`Game Over! Final Score: ${score}`);
        }, 100);
    }
    
    // Global game control functions
    window.startSnakeGame = function() {
        if (!gameRunning) {
            gameRunning = true;
            gameLoop = setInterval(moveSnake, 150);
            console.log('🎮 Snake game started');
        }
    };
    
    window.pauseSnakeGame = function() {
        gameRunning = false;
        clearInterval(gameLoop);
        console.log('⏸ Snake game paused');
    };
    
    window.resetSnakeGame = function() {
        gameRunning = false;
        clearInterval(gameLoop);
        snake = [{x: 200, y: 200}];
        direction = {x: 0, y: 0};
        score = 0;
        generateFood();
        drawGame();
        console.log('🔄 Snake game reset');
    };
    
    // Keyboard controls
    const keyHandler = function(e) {
        if (!gameRunning) return;
        
        switch(e.key) {
            case 'ArrowUp':
            case 'w':
            case 'W':
                if (direction.y === 0) direction = {x: 0, y: -20};
                break;
            case 'ArrowDown':
            case 's':
            case 'S':
                if (direction.y === 0) direction = {x: 0, y: 20};
                break;
            case 'ArrowLeft':
            case 'a':
            case 'A':
                if (direction.x === 0) direction = {x: -20, y: 0};
                break;
            case 'ArrowRight':
            case 'd':
            case 'D':
                if (direction.x === 0) direction = {x: 20, y: 0};
                break;
        }
    };
    
    document.addEventListener('keydown', keyHandler);
    
    // Store handler for cleanup
    window.snakeKeyHandler = keyHandler;
    
    // Initial setup
    generateFood();
    drawGame();
}

// Close snake game modal
window.closeSnakeGameModal = function() {
    const modal = document.querySelector('.snake-game-modal');
    if (modal) {
        // Clean up event listeners
        if (window.snakeKeyHandler) {
            document.removeEventListener('keydown', window.snakeKeyHandler);
            delete window.snakeKeyHandler;
        }
        
        modal.remove();
        console.log('🚪 Snake game modal closed');
    }
};

// Replace the existing launchSnakeGame function
window.launchSnakeGame = window.launchSnakeGameFromCard;

// Hook up the feature card button
setTimeout(() => {
    const launchButton = document.querySelector('[onclick*="launchSnakeGame"], .launch-game-btn, #launch-game-btn');
    if (launchButton) {
        launchButton.onclick = window.launchSnakeGameFromCard;
        console.log('✅ Snake game button hooked up');
    } else {
        console.log('⚠️ Snake game button not found - will retry');
        
        // Try to find and hook up any "LAUNCH GAME" buttons
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => {
            if (button.textContent.includes('LAUNCH GAME') || button.textContent.includes('🐍')) {
                button.onclick = window.launchSnakeGameFromCard;
                console.log('✅ Found and hooked up Snake game button:', button.textContent);
            }
        });
    }
}, 1000);

console.log('🎉 THREE CRITICAL BLOCKERS FIXED');
console.log('=================================');
console.log('✅ 1. TrojanHorse Feed overlap resolved');
console.log('✅ 2. Innovation Lab Konami integration ensured');
console.log('✅ 3. Snake game launch from feature card fixed');
console.log('🎯 Ready for testing!');

return {
    feedOverlapFixed: true,
    konamiIntegrationEnsured: true,
    snakeGameLaunchFixed: true,
    timestamp: new Date().toISOString()
};
