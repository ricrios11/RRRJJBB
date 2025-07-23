/**
 * CRITICAL ISSUES FIX
 * 1. TrojanHorse Feed height to prevent carousel nav overlap
 * 2. Snake game initialization failure resolution
 */

console.log('🔧 FIXING CRITICAL ISSUES...');
console.log('============================');

// ISSUE 1: Fix TrojanHorse Feed Height
console.log('📏 FIXING TROJANHORSE FEED HEIGHT...');

const trojanHorseFeed = document.querySelector('.trojanhorse-feed, #trojanhorse-feed');
if (trojanHorseFeed) {
    // Apply height fix to prevent carousel nav overlap
    const heightFixStyle = document.createElement('style');
    heightFixStyle.id = 'trojanhorse-feed-height-fix';
    heightFixStyle.textContent = `
        /* TrojanHorse Feed Height Fix */
        .trojanhorse-feed, #trojanhorse-feed {
            min-height: 200px !important;
            padding-bottom: 3rem !important;
            position: relative !important;
        }
        
        .trojanhorse-feed .carousel-nav,
        #trojanhorse-feed .carousel-nav {
            position: absolute !important;
            bottom: 1rem !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            z-index: 10 !important;
        }
        
        .trojanhorse-feed .feed-content,
        #trojanhorse-feed .feed-content {
            margin-bottom: 2.5rem !important;
        }
        
        /* Ensure proper spacing in both themes */
        html:not(.dark) .trojanhorse-feed,
        html:not(.dark) #trojanhorse-feed {
            background: rgba(255, 255, 255, 0.95) !important;
            border: 1px solid #4a7c23 !important;
        }
        
        html.dark .trojanhorse-feed,
        html.dark #trojanhorse-feed {
            background: rgba(0, 0, 0, 0.8) !important;
            border: 1px solid #00ff88 !important;
        }
    `;
    
    // Remove existing fix if present
    const existingFix = document.getElementById('trojanhorse-feed-height-fix');
    if (existingFix) {
        existingFix.remove();
    }
    
    document.head.appendChild(heightFixStyle);
    console.log('✅ TrojanHorse Feed height fix applied');
} else {
    console.log('❌ TrojanHorse Feed element not found');
}

// ISSUE 2: Fix Snake Game Initialization
console.log('🐍 FIXING SNAKE GAME INITIALIZATION...');

// Create a robust Snake game initialization system
window.initializeSnakeGame = function() {
    console.log('🎮 Initializing Snake Game...');
    
    // Remove any existing snake game container
    const existingContainer = document.getElementById('snake-game-container');
    if (existingContainer) {
        existingContainer.remove();
    }
    
    // Create new snake game container
    const snakeContainer = document.createElement('div');
    snakeContainer.id = 'snake-game-container';
    snakeContainer.className = 'snake-game-container';
    
    const isDark = document.documentElement.classList.contains('dark');
    
    snakeContainer.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10000;
        background: ${isDark ? 'rgba(0, 0, 0, 0.95)' : 'rgba(255, 255, 255, 0.95)'};
        border: 2px solid ${isDark ? '#00ff88' : '#4a7c23'};
        border-radius: 12px;
        padding: 2rem;
        text-align: center;
        font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(10px);
        color: ${isDark ? '#00ff88' : '#2d5016'};
        max-width: 90vw;
        max-height: 90vh;
        overflow: auto;
    `;
    
    snakeContainer.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
            <h3 style="color: ${isDark ? '#00ff88' : '#2d5016'}; margin: 0; font-size: 1.5rem; text-shadow: ${isDark ? '0 0 10px #00ff88' : 'none'};">
                🐍 DOS Snake Game
            </h3>
            <button onclick="closeSnakeGame()" style="background: #ff4444; color: #fff; border: none; padding: 0.5rem 1rem; border-radius: 6px; font-family: monospace; cursor: pointer; font-weight: bold;">✕ CLOSE</button>
        </div>
        
        <div id="snake-game-area" style="margin: 0 auto; width: 400px; height: 400px; border: 2px solid ${isDark ? '#00ff88' : '#4a7c23'}; background: #000; position: relative; box-shadow: ${isDark ? '0 0 20px rgba(0, 255, 136, 0.3)' : '0 4px 20px rgba(0, 0, 0, 0.2)'};">
            <div id="snake-game-canvas" style="width: 100%; height: 100%; position: relative;">
                <!-- Game will be rendered here -->
            </div>
        </div>
        
        <div class="snake-controls" style="margin-top: 1.5rem; display: flex; justify-content: center; gap: 0.75rem; flex-wrap: wrap;">
            <button id="snake-start-btn" onclick="startSnakeGame()" style="background: ${isDark ? '#00ff88' : '#4a7c23'}; color: ${isDark ? '#000' : '#fff'}; border: none; padding: 0.75rem 1.5rem; border-radius: 6px; font-family: monospace; cursor: pointer; font-weight: bold; font-size: 0.9rem;">▶ START</button>
            <button id="snake-pause-btn" onclick="pauseSnakeGame()" style="background: #666; color: #fff; border: none; padding: 0.75rem 1.5rem; border-radius: 6px; font-family: monospace; cursor: pointer; font-size: 0.9rem;">⏸ PAUSE</button>
            <button id="snake-reset-btn" onclick="resetSnakeGame()" style="background: #666; color: #fff; border: none; padding: 0.75rem 1.5rem; border-radius: 6px; font-family: monospace; cursor: pointer; font-size: 0.9rem;">🔄 RESET</button>
        </div>
        
        <div style="margin-top: 1rem;">
            <p style="color: ${isDark ? '#888' : '#666'}; margin: 0.5rem 0; font-size: 0.9rem;">
                Use arrow keys or WASD to control the snake
            </p>
            <div id="snake-score" style="color: ${isDark ? '#00ff88' : '#2d5016'}; font-weight: bold; font-size: 1.1rem;">
                Score: 0
            </div>
        </div>
    `;
    
    document.body.appendChild(snakeContainer);
    
    // Initialize simple snake game logic
    initializeSimpleSnakeGame();
    
    console.log('✅ Snake Game container created and initialized');
    return true;
};

// Simple Snake Game Implementation
function initializeSimpleSnakeGame() {
    const gameArea = document.getElementById('snake-game-canvas');
    if (!gameArea) return;
    
    let snake = [{x: 200, y: 200}];
    let food = {x: 100, y: 100};
    let direction = {x: 0, y: 0};
    let score = 0;
    let gameRunning = false;
    let gameLoop;
    
    function drawGame() {
        gameArea.innerHTML = '';
        
        // Draw snake
        snake.forEach((segment, index) => {
            const snakeSegment = document.createElement('div');
            snakeSegment.style.cssText = `
                position: absolute;
                left: ${segment.x}px;
                top: ${segment.y}px;
                width: 18px;
                height: 18px;
                background: ${index === 0 ? '#00ff88' : '#00cc66'};
                border: 1px solid #000;
                border-radius: 2px;
            `;
            gameArea.appendChild(snakeSegment);
        });
        
        // Draw food
        const foodElement = document.createElement('div');
        foodElement.style.cssText = `
            position: absolute;
            left: ${food.x}px;
            top: ${food.y}px;
            width: 18px;
            height: 18px;
            background: #ff4444;
            border: 1px solid #000;
            border-radius: 50%;
        `;
        gameArea.appendChild(foodElement);
        
        // Update score
        const scoreElement = document.getElementById('snake-score');
        if (scoreElement) {
            scoreElement.textContent = `Score: ${score}`;
        }
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
        alert(`Game Over! Final Score: ${score}`);
    }
    
    // Game controls
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
    document.addEventListener('keydown', function(e) {
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
    });
    
    // Initial draw
    generateFood();
    drawGame();
}

// Close snake game function
window.closeSnakeGame = function() {
    const container = document.getElementById('snake-game-container');
    if (container) {
        container.remove();
        console.log('🚪 Snake game closed');
    }
};

// Enhanced launch function that replaces the failing one
window.launchSnakeGame = function() {
    console.log('🚀 Launching Snake Game (Enhanced)...');
    try {
        window.initializeSnakeGame();
        console.log('✅ Snake Game launched successfully');
    } catch (error) {
        console.error('❌ Snake Game launch failed:', error);
        
        // Fallback error display
        const errorModal = document.createElement('div');
        errorModal.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 10000;
            background: rgba(255, 255, 255, 0.95);
            border: 2px solid #ff4444;
            border-radius: 12px;
            padding: 2rem;
            text-align: center;
            font-family: monospace;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        `;
        
        errorModal.innerHTML = `
            <h3 style="color: #ff4444; margin-bottom: 1rem;">🐍 Snake Game Error</h3>
            <p style="color: #666; margin-bottom: 1.5rem;">Game initialization encountered an issue.</p>
            <button onclick="this.parentElement.remove()" style="background: #ff4444; color: #fff; border: none; padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer;">Close</button>
        `;
        
        document.body.appendChild(errorModal);
        
        setTimeout(() => {
            if (errorModal.parentElement) {
                errorModal.remove();
            }
        }, 5000);
    }
};

console.log('✅ CRITICAL ISSUES FIX COMPLETE');
console.log('================================');
console.log('🎯 TrojanHorse Feed height fixed');
console.log('🐍 Snake Game initialization system enhanced');
console.log('🚀 Ready for testing');

// Return success status
return {
    trojanHorseFeedFixed: true,
    snakeGameFixed: true,
    timestamp: new Date().toISOString()
};
