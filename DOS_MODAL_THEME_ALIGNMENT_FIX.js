/**
 * DOS FRAMEWORK SOLUTION: Modal Theme Alignment & Snake Game Functionality
 * 
 * CRITICAL ISSUES ADDRESSED:
 * 1. Theme inheritance failure in modals (white background in dark mode)
 * 2. Non-functional Snake Game logic
 * 3. CSS variable scope issues
 * 4. DOS compliance gaps in modal styling
 * 
 * APPROACH: Surgical precision fixes with DOS framework rigor
 */

console.log('🎯 DOS FRAMEWORK: Initializing Modal Theme Alignment & Snake Game Fix...');

// ====================================================================
// 1. DOS-COMPLIANT THEME-AWARE MODAL SYSTEM
// ====================================================================

function createDOSCompliantSnakeGameModal() {
    console.log('🐍 DOS MODAL: Creating theme-aware Snake Game modal...');
    
    // Remove existing modal
    const existingModal = document.getElementById('snake-game-modal');
    if (existingModal) existingModal.remove();
    
    // Detect current theme
    const isDarkMode = document.body.classList.contains('dark');
    const themeClass = isDarkMode ? 'dark' : '';
    
    console.log(`🌙 THEME DETECTION: ${isDarkMode ? 'Dark' : 'Light'} mode detected`);
    
    // Create modal overlay with theme awareness
    const modalOverlay = document.createElement('div');
    modalOverlay.id = 'snake-game-modal';
    modalOverlay.className = `ric-modal-overlay ${themeClass}`;
    modalOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: ${isDarkMode ? 'rgba(0, 0, 0, 0.95)' : 'rgba(0, 0, 0, 0.8)'};
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
        backdrop-filter: blur(8px);
    `;
    
    // Create modal content with proper theme inheritance
    const modalContent = document.createElement('div');
    modalContent.className = `ric-modal ${themeClass}`;
    modalContent.style.cssText = `
        background: ${isDarkMode ? 'hsl(0 0% 3.9%)' : 'hsl(0 0% 100%)'};
        color: ${isDarkMode ? 'hsl(0 0% 98%)' : 'hsl(222.2 84% 4.9%)'};
        border: 1px solid ${isDarkMode ? 'hsl(217.2 32.6% 17.5%)' : 'hsl(214.3 31.8% 91.4%)'};
        border-radius: var(--ric-radius-lg);
        padding: var(--ric-space-xl);
        max-width: 600px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
        text-align: center;
        transform: translateY(20px);
        transition: transform 0.3s ease;
        box-shadow: ${isDarkMode ? 
            '0 25px 50px -12px rgba(0, 0, 0, 0.9), 0 8px 10px -6px rgba(0, 0, 0, 0.8)' : 
            '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'
        };
    `;
    
    // DOS-compliant modal content with proper theme styling
    modalContent.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--ric-space-lg);">
            <h2 style="
                margin: 0; 
                font-size: var(--ric-text-2xl); 
                font-weight: 600; 
                font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
                color: ${isDarkMode ? 'hsl(0 0% 98%)' : 'hsl(222.2 84% 4.9%)'};
            ">🐍 DOS Snake Game</h2>
            <button onclick="closeDOSSnakeGameModal()" style="
                background: none; 
                border: none; 
                font-size: var(--ric-text-xl); 
                cursor: pointer; 
                color: ${isDarkMode ? 'hsl(215.4 16.3% 56.9%)' : 'hsl(215.4 16.3% 46.9%)'};
                padding: var(--ric-space-sm);
                border-radius: var(--ric-radius-sm);
                transition: all 0.2s ease;
            " onmouseover="this.style.background='${isDarkMode ? 'hsl(217.2 32.6% 17.5%)' : 'hsl(210 40% 96%)'}'" 
               onmouseout="this.style.background='none'">✕</button>
        </div>
        
        <div style="
            background: ${isDarkMode ? 'hsl(217.2 32.6% 17.5%)' : 'hsl(210 40% 98%)'};
            border: 1px solid ${isDarkMode ? 'hsl(215 20.2% 25%)' : 'hsl(214.3 31.8% 91.4%)'};
            border-radius: var(--ric-radius-lg);
            padding: var(--ric-space-lg);
            margin: var(--ric-space-lg) 0;
        ">
            <canvas id="dos-snake-canvas" width="400" height="400" style="
                border: 2px solid ${isDarkMode ? 'hsl(215 20.2% 25%)' : 'hsl(214.3 31.8% 91.4%)'};
                border-radius: var(--ric-radius-md);
                background: ${isDarkMode ? 'hsl(0 0% 3.9%)' : 'hsl(0 0% 100%)'};
                display: block;
                margin: 0 auto;
            "></canvas>
            
            <div style="margin-top: var(--ric-space-lg); display: flex; justify-content: center; align-items: center; gap: var(--ric-space-lg);">
                <div style="
                    font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
                    font-size: var(--ric-text-lg);
                    font-weight: 600;
                    color: ${isDarkMode ? 'hsl(0 0% 98%)' : 'hsl(222.2 84% 4.9%)'};
                ">
                    Score: <span id="dos-snake-score" style="color: ${isDarkMode ? 'hsl(142.1 76.2% 36.3%)' : 'hsl(142.1 70.6% 45.3%)'};">0</span>
                </div>
            </div>
        </div>
        
        <div style="display: flex; justify-content: center; gap: var(--ric-space-md); margin-top: var(--ric-space-lg);">
            <button id="dos-start-btn" onclick="startDOSSnakeGame()" style="
                padding: var(--ric-space-sm) var(--ric-space-lg); 
                background: ${isDarkMode ? 'hsl(142.1 76.2% 36.3%)' : 'hsl(142.1 70.6% 45.3%)'}; 
                color: white; 
                border: none; 
                border-radius: var(--ric-radius-md); 
                cursor: pointer;
                font-weight: 600;
                font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
                transition: all 0.2s ease;
            " onmouseover="this.style.background='${isDarkMode ? 'hsl(142.1 76.2% 32%)' : 'hsl(142.1 70.6% 40%)'}'" 
               onmouseout="this.style.background='${isDarkMode ? 'hsl(142.1 76.2% 36.3%)' : 'hsl(142.1 70.6% 45.3%)'}'">START</button>
            
            <button id="dos-pause-btn" onclick="pauseDOSSnakeGame()" style="
                padding: var(--ric-space-sm) var(--ric-space-lg); 
                background: ${isDarkMode ? 'hsl(217.2 32.6% 17.5%)' : 'hsl(210 40% 96%)'}; 
                color: ${isDarkMode ? 'hsl(0 0% 98%)' : 'hsl(222.2 84% 4.9%)'}; 
                border: 1px solid ${isDarkMode ? 'hsl(215 20.2% 25%)' : 'hsl(214.3 31.8% 91.4%)'}; 
                border-radius: var(--ric-radius-md); 
                cursor: pointer;
                font-weight: 600;
                font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
                transition: all 0.2s ease;
            " onmouseover="this.style.background='${isDarkMode ? 'hsl(215 20.2% 25%)' : 'hsl(210 40% 92%)'}'" 
               onmouseout="this.style.background='${isDarkMode ? 'hsl(217.2 32.6% 17.5%)' : 'hsl(210 40% 96%)'}'">PAUSE</button>
            
            <button id="dos-reset-btn" onclick="resetDOSSnakeGame()" style="
                padding: var(--ric-space-sm) var(--ric-space-lg); 
                background: ${isDarkMode ? 'hsl(0 84% 60%)' : 'hsl(0 84% 60%)'}; 
                color: white; 
                border: none; 
                border-radius: var(--ric-radius-md); 
                cursor: pointer;
                font-weight: 600;
                font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
                transition: all 0.2s ease;
            " onmouseover="this.style.background='${isDarkMode ? 'hsl(0 84% 55%)' : 'hsl(0 84% 55%)'}'" 
               onmouseout="this.style.background='${isDarkMode ? 'hsl(0 84% 60%)' : 'hsl(0 84% 60%)'}'">RESET</button>
        </div>
        
        <p style="
            margin-top: var(--ric-space-md); 
            font-size: var(--ric-text-sm); 
            color: ${isDarkMode ? 'hsl(215.4 16.3% 56.9%)' : 'hsl(215.4 16.3% 46.9%)'};
            font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
        ">Use WASD or Arrow Keys • Space to Pause • ESC to Close</p>
    `;
    
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);
    
    // Animate in
    requestAnimationFrame(() => {
        modalOverlay.style.opacity = '1';
        modalContent.style.transform = 'translateY(0)';
    });
    
    // Initialize Snake Game
    setTimeout(() => {
        initializeDOSSnakeGame();
    }, 300);
    
    // Close on overlay click
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeDOSSnakeGameModal();
    });
    
    // ESC key to close
    const escHandler = (e) => {
        if (e.key === 'Escape') {
            closeDOSSnakeGameModal();
            document.removeEventListener('keydown', escHandler);
        }
    };
    document.addEventListener('keydown', escHandler);
    
    console.log('✅ DOS MODAL: Theme-aware Snake Game modal created successfully');
}

// ====================================================================
// 2. FUNCTIONAL DOS SNAKE GAME IMPLEMENTATION
// ====================================================================

let dosSnakeGame = {
    canvas: null,
    ctx: null,
    snake: [{x: 200, y: 200}],
    food: {x: 0, y: 0},
    dx: 0,
    dy: 0,
    score: 0,
    gameRunning: false,
    gameLoop: null,
    gridSize: 20,
    tileCount: 20,
    speed: 150
};

function initializeDOSSnakeGame() {
    console.log('🐍 DOS GAME: Initializing Snake Game...');
    
    const canvas = document.getElementById('dos-snake-canvas');
    if (!canvas) {
        console.error('❌ DOS GAME: Canvas not found');
        return;
    }
    
    const ctx = canvas.getContext('2d');
    dosSnakeGame.canvas = canvas;
    dosSnakeGame.ctx = ctx;
    
    // Reset game state
    dosSnakeGame.snake = [{x: 200, y: 200}];
    dosSnakeGame.dx = 0;
    dosSnakeGame.dy = 0;
    dosSnakeGame.score = 0;
    dosSnakeGame.gameRunning = false;
    
    // Generate initial food
    generateDOSFood();
    
    // Draw initial state
    drawDOSSnakeGame();
    
    // Update score display
    const scoreElement = document.getElementById('dos-snake-score');
    if (scoreElement) scoreElement.textContent = dosSnakeGame.score;
    
    console.log('✅ DOS GAME: Snake Game initialized successfully');
}

function startDOSSnakeGame() {
    console.log('🚀 DOS GAME: Starting Snake Game...');
    
    if (dosSnakeGame.gameRunning) return;
    
    dosSnakeGame.gameRunning = true;
    
    // Add keyboard listeners
    document.addEventListener('keydown', handleDOSSnakeKeydown);
    
    // Start game loop
    dosSnakeGame.gameLoop = setInterval(updateDOSSnakeGame, dosSnakeGame.speed);
    
    // Update button states
    const startBtn = document.getElementById('dos-start-btn');
    if (startBtn) {
        startBtn.textContent = 'RUNNING...';
        startBtn.disabled = true;
        startBtn.style.opacity = '0.6';
    }
    
    console.log('✅ DOS GAME: Game started successfully');
}

function pauseDOSSnakeGame() {
    console.log('⏸️ DOS GAME: Pausing Snake Game...');
    
    if (!dosSnakeGame.gameRunning) return;
    
    dosSnakeGame.gameRunning = false;
    clearInterval(dosSnakeGame.gameLoop);
    
    // Update button states
    const startBtn = document.getElementById('dos-start-btn');
    if (startBtn) {
        startBtn.textContent = 'RESUME';
        startBtn.disabled = false;
        startBtn.style.opacity = '1';
    }
    
    console.log('✅ DOS GAME: Game paused successfully');
}

function resetDOSSnakeGame() {
    console.log('🔄 DOS GAME: Resetting Snake Game...');
    
    // Stop game
    dosSnakeGame.gameRunning = false;
    if (dosSnakeGame.gameLoop) {
        clearInterval(dosSnakeGame.gameLoop);
        dosSnakeGame.gameLoop = null;
    }
    
    // Reset game state
    dosSnakeGame.snake = [{x: 200, y: 200}];
    dosSnakeGame.dx = 0;
    dosSnakeGame.dy = 0;
    dosSnakeGame.score = 0;
    
    // Generate new food
    generateDOSFood();
    
    // Redraw
    drawDOSSnakeGame();
    
    // Update score display
    const scoreElement = document.getElementById('dos-snake-score');
    if (scoreElement) scoreElement.textContent = dosSnakeGame.score;
    
    // Update button states
    const startBtn = document.getElementById('dos-start-btn');
    if (startBtn) {
        startBtn.textContent = 'START';
        startBtn.disabled = false;
        startBtn.style.opacity = '1';
    }
    
    console.log('✅ DOS GAME: Game reset successfully');
}

function updateDOSSnakeGame() {
    if (!dosSnakeGame.gameRunning) return;
    
    // Move snake
    const head = {
        x: dosSnakeGame.snake[0].x + dosSnakeGame.dx, 
        y: dosSnakeGame.snake[0].y + dosSnakeGame.dy
    };
    
    // Check wall collision
    if (head.x < 0 || head.x >= 400 || head.y < 0 || head.y >= 400) {
        dosGameOver();
        return;
    }
    
    // Check self collision
    for (let segment of dosSnakeGame.snake) {
        if (head.x === segment.x && head.y === segment.y) {
            dosGameOver();
            return;
        }
    }
    
    dosSnakeGame.snake.unshift(head);
    
    // Check food collision
    if (head.x === dosSnakeGame.food.x && head.y === dosSnakeGame.food.y) {
        dosSnakeGame.score += 10;
        const scoreElement = document.getElementById('dos-snake-score');
        if (scoreElement) scoreElement.textContent = dosSnakeGame.score;
        generateDOSFood();
        
        // Increase speed slightly
        if (dosSnakeGame.score % 50 === 0 && dosSnakeGame.speed > 80) {
            dosSnakeGame.speed -= 5;
            clearInterval(dosSnakeGame.gameLoop);
            dosSnakeGame.gameLoop = setInterval(updateDOSSnakeGame, dosSnakeGame.speed);
        }
    } else {
        dosSnakeGame.snake.pop();
    }
    
    drawDOSSnakeGame();
}

function drawDOSSnakeGame() {
    const ctx = dosSnakeGame.ctx;
    const isDarkMode = document.body.classList.contains('dark');
    
    // Clear canvas with theme-aware background
    ctx.fillStyle = isDarkMode ? 'hsl(0 0% 3.9%)' : 'hsl(0 0% 100%)';
    ctx.fillRect(0, 0, 400, 400);
    
    // Draw subtle grid
    ctx.strokeStyle = isDarkMode ? 'hsl(217.2 32.6% 17.5%)' : 'hsl(210 40% 96%)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 20; i++) {
        ctx.beginPath();
        ctx.moveTo(i * 20, 0);
        ctx.lineTo(i * 20, 400);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(0, i * 20);
        ctx.lineTo(400, i * 20);
        ctx.stroke();
    }
    
    // Draw snake with gradient effect
    dosSnakeGame.snake.forEach((segment, index) => {
        const alpha = 1 - (index * 0.05);
        if (index === 0) {
            // Head - special styling
            ctx.fillStyle = isDarkMode ? 'hsl(142.1 76.2% 36.3%)' : 'hsl(142.1 70.6% 45.3%)';
        } else {
            // Body - gradient effect
            const baseColor = isDarkMode ? '142.1, 76.2%, 36.3%' : '142.1, 70.6%, 45.3%';
            ctx.fillStyle = `hsla(${baseColor}, ${Math.max(alpha, 0.3)})`;
        }
        
        ctx.fillRect(segment.x + 1, segment.y + 1, 18, 18);
        
        // Add subtle border
        ctx.strokeStyle = isDarkMode ? 'hsl(142.1 76.2% 32%)' : 'hsl(142.1 70.6% 40%)';
        ctx.lineWidth = 1;
        ctx.strokeRect(segment.x + 1, segment.y + 1, 18, 18);
    });
    
    // Draw food with pulsing effect
    const time = Date.now() * 0.005;
    const pulse = Math.sin(time) * 0.1 + 0.9;
    const foodSize = 18 * pulse;
    const offset = (18 - foodSize) / 2;
    
    ctx.fillStyle = isDarkMode ? 'hsl(0 84% 60%)' : 'hsl(0 84% 60%)';
    ctx.fillRect(dosSnakeGame.food.x + 1 + offset, dosSnakeGame.food.y + 1 + offset, foodSize, foodSize);
    
    // Add food glow effect
    ctx.shadowColor = isDarkMode ? 'hsl(0 84% 60%)' : 'hsl(0 84% 60%)';
    ctx.shadowBlur = 8;
    ctx.fillRect(dosSnakeGame.food.x + 1 + offset, dosSnakeGame.food.y + 1 + offset, foodSize, foodSize);
    ctx.shadowBlur = 0;
}

function generateDOSFood() {
    let newFood;
    do {
        newFood = {
            x: Math.floor(Math.random() * 20) * 20,
            y: Math.floor(Math.random() * 20) * 20
        };
    } while (dosSnakeGame.snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    
    dosSnakeGame.food = newFood;
}

function handleDOSSnakeKeydown(event) {
    if (!dosSnakeGame.gameRunning) return;
    
    const key = event.key.toLowerCase();
    
    // Prevent snake from reversing into itself
    switch (key) {
        case 'arrowup':
        case 'w':
            if (dosSnakeGame.dy === 0) {
                dosSnakeGame.dx = 0;
                dosSnakeGame.dy = -20;
            }
            break;
        case 'arrowdown':
        case 's':
            if (dosSnakeGame.dy === 0) {
                dosSnakeGame.dx = 0;
                dosSnakeGame.dy = 20;
            }
            break;
        case 'arrowleft':
        case 'a':
            if (dosSnakeGame.dx === 0) {
                dosSnakeGame.dx = -20;
                dosSnakeGame.dy = 0;
            }
            break;
        case 'arrowright':
        case 'd':
            if (dosSnakeGame.dx === 0) {
                dosSnakeGame.dx = 20;
                dosSnakeGame.dy = 0;
            }
            break;
        case ' ':
            event.preventDefault();
            pauseDOSSnakeGame();
            break;
    }
}

function dosGameOver() {
    console.log(`🏁 DOS GAME: Game Over! Final Score: ${dosSnakeGame.score}`);
    
    dosSnakeGame.gameRunning = false;
    clearInterval(dosSnakeGame.gameLoop);
    document.removeEventListener('keydown', handleDOSSnakeKeydown);
    
    // Show game over overlay
    const ctx = dosSnakeGame.ctx;
    const isDarkMode = document.body.classList.contains('dark');
    
    ctx.fillStyle = isDarkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.9)';
    ctx.fillRect(0, 0, 400, 400);
    
    ctx.fillStyle = isDarkMode ? 'hsl(0 0% 98%)' : 'hsl(222.2 84% 4.9%)';
    ctx.font = 'bold 24px "SF Mono", "Monaco", "Inconsolata", "Roboto Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('GAME OVER', 200, 180);
    
    ctx.font = '16px "SF Mono", "Monaco", "Inconsolata", "Roboto Mono", monospace';
    ctx.fillText(`Final Score: ${dosSnakeGame.score}`, 200, 210);
    ctx.fillText('Click RESET to play again', 200, 240);
    
    // Reset button state
    const startBtn = document.getElementById('dos-start-btn');
    if (startBtn) {
        startBtn.textContent = 'START';
        startBtn.disabled = false;
        startBtn.style.opacity = '1';
    }
}

function closeDOSSnakeGameModal() {
    console.log('🚪 DOS MODAL: Closing Snake Game modal...');
    
    // Stop game
    dosSnakeGame.gameRunning = false;
    if (dosSnakeGame.gameLoop) {
        clearInterval(dosSnakeGame.gameLoop);
        dosSnakeGame.gameLoop = null;
    }
    
    // Remove event listeners
    document.removeEventListener('keydown', handleDOSSnakeKeydown);
    
    // Remove modal
    const modal = document.getElementById('snake-game-modal');
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
    
    console.log('✅ DOS MODAL: Snake Game modal closed successfully');
}

// ====================================================================
// 3. REPLACE EXISTING FUNCTIONS WITH DOS-COMPLIANT VERSIONS
// ====================================================================

// Override the existing launchSnakeGame function
window.launchSnakeGame = function() {
    console.log('🎯 DOS OVERRIDE: Launching DOS-compliant Snake Game modal...');
    createDOSCompliantSnakeGameModal();
};

// Make all functions globally available
window.createDOSCompliantSnakeGameModal = createDOSCompliantSnakeGameModal;
window.closeDOSSnakeGameModal = closeDOSSnakeGameModal;
window.startDOSSnakeGame = startDOSSnakeGame;
window.pauseDOSSnakeGame = pauseDOSSnakeGame;
window.resetDOSSnakeGame = resetDOSSnakeGame;

// ====================================================================
// 4. INITIALIZE DOS FRAMEWORK FIX
// ====================================================================

console.log('🚀 DOS FRAMEWORK: Modal Theme Alignment & Snake Game Fix initialized');
console.log('📋 FEATURES ACTIVATED:');
console.log('  ✅ Theme-aware modal system (Dark/Light mode inheritance)');
console.log('  ✅ Fully functional Snake Game with DOS aesthetics');
console.log('  ✅ Progressive difficulty and smooth animations');
console.log('  ✅ Keyboard controls (WASD, Arrows, Space, ESC)');
console.log('  ✅ DOS-compliant styling and visual hierarchy');
console.log('🎯 DOS FRAMEWORK: Ready for production validation');
