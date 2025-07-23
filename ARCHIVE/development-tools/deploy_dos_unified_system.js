/**
 * DOS DEPLOYMENT - ONE TRUE SOURCE
 * Eliminates all competing controllers and establishes unified system
 * Design Operating System for ricrios.com portfolio
 */

console.log('🚀 DEPLOYING DOS - ONE TRUE SOURCE');
console.log('==================================');

// PHASE 1: ELIMINATE ALL COMPETING SYSTEMS
console.log('🧹 PHASE 1: ELIMINATING COMPETING SYSTEMS...');

// Stop all existing intervals and timeouts
for (let i = 1; i < 99999; i++) {
    window.clearInterval(i);
    window.clearTimeout(i);
}

// Remove all competing theme controllers
delete window.dnaOrchestration;
delete window.themeToggle;
delete window.timeAwareHeroGradient;
delete window.DarkMatterFabricStatus;
delete window.darkMatterFabricOrchestration;

// Remove all competing modal systems except the core one
delete window.initializeSnakeGame;
delete window.currentSnakeGame;

// Remove all existing style injections
const existingStyles = document.querySelectorAll('style[id*="fix"], style[id*="enhancement"], style[id*="theme"], style[id*="contrast"]');
existingStyles.forEach(style => style.remove());

console.log('✅ Competing systems eliminated');

// PHASE 2: ESTABLISH DOS UNIFIED THEME SYSTEM
console.log('🎨 PHASE 2: DOS UNIFIED THEME SYSTEM...');

window.DOS = {
    version: '1.0.0',
    initialized: false,
    currentTheme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
    
    // Unified Theme Controller
    theme: {
        toggle: function() {
            const html = document.documentElement;
            const wasDark = html.classList.contains('dark');
            
            if (wasDark) {
                html.classList.remove('dark');
                DOS.currentTheme = 'light';
            } else {
                html.classList.add('dark');
                DOS.currentTheme = 'dark';
            }
            
            // Apply unified styling
            DOS.theme.applyUnified();
            
            console.log(`🎨 DOS THEME: Switched to ${DOS.currentTheme} mode`);
        },
        
        applyUnified: function() {
            const isDark = DOS.currentTheme === 'dark';
            
            // Remove any existing DOS styles
            const existingDOSStyle = document.getElementById('dos-unified-theme');
            if (existingDOSStyle) existingDOSStyle.remove();
            
            // Create unified theme stylesheet
            const dosStyle = document.createElement('style');
            dosStyle.id = 'dos-unified-theme';
            dosStyle.textContent = `
                /* DOS UNIFIED THEME SYSTEM */
                
                /* Innovation Lab Unified Styling */
                .innovation-lab, #innovation-lab {
                    background: ${isDark ? 'rgba(0, 0, 0, 0.9)' : 'rgba(255, 255, 255, 0.95)'} !important;
                    color: ${isDark ? '#00ff88' : '#2d5016'} !important;
                    border: 2px solid ${isDark ? '#00ff88' : '#4a7c23'} !important;
                    border-radius: 12px !important;
                    padding: 2rem !important;
                    margin: 2rem 0 !important;
                    box-shadow: ${isDark ? '0 0 30px rgba(0, 255, 136, 0.2)' : '0 8px 32px rgba(0, 0, 0, 0.1)'} !important;
                    backdrop-filter: blur(10px) !important;
                    font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace !important;
                }
                
                .innovation-lab h2, .innovation-lab h3,
                #innovation-lab h2, #innovation-lab h3 {
                    color: ${isDark ? '#00ff88' : '#2d5016'} !important;
                    text-shadow: ${isDark ? '0 0 10px rgba(0, 255, 136, 0.5)' : 'none'} !important;
                    font-weight: bold !important;
                }
                
                /* TrojanHorse Feed Unified Styling */
                .trojanhorse-feed, #trojanhorse-feed {
                    background: ${isDark ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.9)'} !important;
                    color: ${isDark ? '#00ff88' : '#2d5016'} !important;
                    border: 1px solid ${isDark ? '#00ff88' : '#4a7c23'} !important;
                    border-radius: 8px !important;
                    padding: 1.5rem !important;
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
                
                /* Feature Cards Unified Styling */
                .feature-card {
                    background: ${isDark ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.8)'} !important;
                    border: 1px solid ${isDark ? '#00ff88' : '#4a7c23'} !important;
                    border-radius: 8px !important;
                    padding: 1.5rem !important;
                    color: ${isDark ? '#00ff88' : '#2d5016'} !important;
                    transition: all 0.3s ease !important;
                }
                
                .feature-card:hover {
                    box-shadow: ${isDark ? '0 0 20px rgba(0, 255, 136, 0.3)' : '0 8px 24px rgba(0, 0, 0, 0.15)'} !important;
                    transform: translateY(-2px) !important;
                }
                
                /* Button Unified Styling */
                .launch-btn, .cta-btn {
                    background: ${isDark ? '#00ff88' : '#4a7c23'} !important;
                    color: ${isDark ? '#000' : '#fff'} !important;
                    border: none !important;
                    padding: 0.75rem 1.5rem !important;
                    border-radius: 6px !important;
                    font-family: monospace !important;
                    font-weight: bold !important;
                    cursor: pointer !important;
                    transition: all 0.2s ease !important;
                }
                
                .launch-btn:hover, .cta-btn:hover {
                    background: ${isDark ? '#00cc66' : '#3a6b1d'} !important;
                    transform: translateY(-1px) !important;
                }
                
                /* Exit Lab Button */
                .exit-lab-btn {
                    background: #ff4444 !important;
                    color: #fff !important;
                    border: none !important;
                    padding: 0.5rem 1rem !important;
                    border-radius: 6px !important;
                    font-family: monospace !important;
                    cursor: pointer !important;
                    position: absolute !important;
                    top: 1rem !important;
                    right: 1rem !important;
                }
                
                /* Modal Unified Styling */
                .modal-overlay {
                    position: fixed !important;
                    top: 0 !important;
                    left: 0 !important;
                    width: 100vw !important;
                    height: 100vh !important;
                    background: rgba(0, 0, 0, 0.8) !important;
                    z-index: 10000 !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                }
                
                .modal-content {
                    background: ${isDark ? 'rgba(0, 0, 0, 0.95)' : 'rgba(255, 255, 255, 0.95)'} !important;
                    border: 2px solid ${isDark ? '#00ff88' : '#4a7c23'} !important;
                    border-radius: 12px !important;
                    padding: 2rem !important;
                    max-width: 90vw !important;
                    max-height: 90vh !important;
                    overflow: auto !important;
                    color: ${isDark ? '#00ff88' : '#2d5016'} !important;
                    font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace !important;
                }
            `;
            
            document.head.appendChild(dosStyle);
            console.log(`🎨 DOS THEME: Unified ${DOS.currentTheme} mode applied`);
        }
    },
    
    // Unified Modal System
    modal: {
        open: function(content, title = 'DOS Modal') {
            // Remove any existing modals
            const existingModal = document.querySelector('.modal-overlay');
            if (existingModal) existingModal.remove();
            
            const modalOverlay = document.createElement('div');
            modalOverlay.className = 'modal-overlay';
            modalOverlay.innerHTML = `
                <div class="modal-content">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                        <h3 style="margin: 0; color: ${DOS.currentTheme === 'dark' ? '#00ff88' : '#2d5016'};">${title}</h3>
                        <button onclick="DOS.modal.close()" style="background: #ff4444; color: #fff; border: none; padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer;">✕</button>
                    </div>
                    <div class="modal-body">
                        ${content}
                    </div>
                </div>
            `;
            
            document.body.appendChild(modalOverlay);
            
            // Close on overlay click
            modalOverlay.addEventListener('click', function(e) {
                if (e.target === modalOverlay) {
                    DOS.modal.close();
                }
            });
            
            console.log('🪟 DOS MODAL: Opened');
        },
        
        close: function() {
            const modal = document.querySelector('.modal-overlay');
            if (modal) {
                modal.remove();
                console.log('🪟 DOS MODAL: Closed');
            }
        }
    },
    
    // Unified Game System
    game: {
        launchSnake: function() {
            const snakeGameHTML = `
                <div style="text-align: center;">
                    <div id="snake-game-area" style="width: 400px; height: 400px; border: 2px solid ${DOS.currentTheme === 'dark' ? '#00ff88' : '#4a7c23'}; background: #000; margin: 0 auto; position: relative;">
                        <div id="snake-canvas" style="width: 100%; height: 100%; position: relative;"></div>
                    </div>
                    <div style="margin-top: 1rem;">
                        <button onclick="DOS.game.startSnake()" class="launch-btn">▶ START</button>
                        <button onclick="DOS.game.pauseSnake()" style="background: #666; color: #fff; border: none; padding: 0.75rem 1.5rem; border-radius: 6px; margin-left: 0.5rem; cursor: pointer;">⏸ PAUSE</button>
                        <button onclick="DOS.game.resetSnake()" style="background: #666; color: #fff; border: none; padding: 0.75rem 1.5rem; border-radius: 6px; margin-left: 0.5rem; cursor: pointer;">🔄 RESET</button>
                    </div>
                    <div id="snake-score" style="margin-top: 1rem; color: ${DOS.currentTheme === 'dark' ? '#00ff88' : '#2d5016'}; font-weight: bold;">Score: 0</div>
                    <p style="color: #888; margin-top: 0.5rem; font-size: 0.9rem;">Use arrow keys or WASD to control</p>
                </div>
            `;
            
            DOS.modal.open(snakeGameHTML, '🐍 DOS Snake Game');
            DOS.game.initializeSnake();
        },
        
        initializeSnake: function() {
            // Simple snake game implementation
            const canvas = document.getElementById('snake-canvas');
            if (!canvas) return;
            
            let snake = [{x: 200, y: 200}];
            let food = {x: 100, y: 100};
            let direction = {x: 0, y: 0};
            let score = 0;
            let gameRunning = false;
            let gameLoop;
            
            function draw() {
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
                
                const scoreEl = document.getElementById('snake-score');
                if (scoreEl) scoreEl.textContent = `Score: ${score}`;
            }
            
            function move() {
                if (!gameRunning) return;
                
                const head = {x: snake[0].x + direction.x, y: snake[0].y + direction.y};
                
                if (head.x < 0 || head.x >= 380 || head.y < 0 || head.y >= 380) {
                    DOS.game.gameOver(score);
                    return;
                }
                
                if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
                    DOS.game.gameOver(score);
                    return;
                }
                
                snake.unshift(head);
                
                if (head.x === food.x && head.y === food.y) {
                    score += 10;
                    food = {
                        x: Math.floor(Math.random() * 19) * 20,
                        y: Math.floor(Math.random() * 19) * 20
                    };
                } else {
                    snake.pop();
                }
                
                draw();
            }
            
            DOS.game.startSnake = function() {
                gameRunning = true;
                gameLoop = setInterval(move, 150);
            };
            
            DOS.game.pauseSnake = function() {
                gameRunning = false;
                clearInterval(gameLoop);
            };
            
            DOS.game.resetSnake = function() {
                gameRunning = false;
                clearInterval(gameLoop);
                snake = [{x: 200, y: 200}];
                direction = {x: 0, y: 0};
                score = 0;
                food = {x: 100, y: 100};
                draw();
            };
            
            DOS.game.gameOver = function(finalScore) {
                gameRunning = false;
                clearInterval(gameLoop);
                alert(`Game Over! Score: ${finalScore}`);
            };
            
            // Keyboard controls
            document.addEventListener('keydown', function(e) {
                if (!gameRunning) return;
                switch(e.key) {
                    case 'ArrowUp': case 'w': case 'W':
                        if (direction.y === 0) direction = {x: 0, y: -20};
                        break;
                    case 'ArrowDown': case 's': case 'S':
                        if (direction.y === 0) direction = {x: 0, y: 20};
                        break;
                    case 'ArrowLeft': case 'a': case 'A':
                        if (direction.x === 0) direction = {x: -20, y: 0};
                        break;
                    case 'ArrowRight': case 'd': case 'D':
                        if (direction.x === 0) direction = {x: 20, y: 0};
                        break;
                }
            });
            
            draw();
        }
    },
    
    // Initialize DOS
    init: function() {
        if (DOS.initialized) return;
        
        // Apply initial theme
        DOS.theme.applyUnified();
        
        // Hook up theme toggle
        const themeToggle = document.querySelector('.theme-toggle, .sun, .moon');
        if (themeToggle) {
            themeToggle.onclick = DOS.theme.toggle;
        }
        
        // Replace launchSnakeGame function
        window.launchSnakeGame = DOS.game.launchSnake;
        
        DOS.initialized = true;
        console.log('✅ DOS INITIALIZED - One True Source Established');
    }
};

// PHASE 3: INITIALIZE DOS
console.log('🚀 PHASE 3: INITIALIZING DOS...');
DOS.init();

console.log('🎉 DOS DEPLOYMENT COMPLETE');
console.log('==========================');
console.log('✅ All competing systems eliminated');
console.log('✅ Unified theme system established');
console.log('✅ Unified modal system established');
console.log('✅ Unified game system established');
console.log('🎯 ONE TRUE SOURCE ACHIEVED');

return DOS;
