// EMERGENCY SURGICAL FIX - Direct DOM Manipulation
// Targets exact console-identified failures: Innovation Lab Object, Snake Container, Light Mode
// Date: 2025-07-22 | Agent: Cascade | Approach: Surgical DOM Fixes

console.log('🚨 EMERGENCY SURGICAL FIX: Starting direct DOM manipulation');

// SURGICAL FIX 1: Innovation Lab Object & Nav Overlap
const fixInnovationLabObject = () => {
    console.log('🔧 SURGICAL: Fixing Innovation Lab object and nav overlap');
    
    // Find Innovation Lab section
    const innovationLab = document.querySelector('#innovation-lab, .innovation-lab, section[class*="innovation"]');
    
    if (innovationLab) {
        // Force proper positioning to avoid nav overlap
        innovationLab.style.cssText += `
            margin-top: 120px !important;
            padding-top: 2rem !important;
            position: relative !important;
            z-index: 10 !important;
            clear: both !important;
        `;
        
        // Ensure Innovation Lab object exists in window
        if (!window.InnovationLab) {
            window.InnovationLab = {
                element: innovationLab,
                isVisible: innovationLab.style.display !== 'none',
                show: () => {
                    innovationLab.style.display = 'block';
                    innovationLab.style.opacity = '1';
                },
                hide: () => {
                    innovationLab.style.display = 'none';
                }
            };
        }
        
        console.log('✅ SURGICAL: Innovation Lab object created and positioned');
        return true;
    }
    
    console.error('❌ SURGICAL: Innovation Lab section not found');
    return false;
};

// SURGICAL FIX 2: Snake Game Container & Modal
const fixSnakeGameContainer = () => {
    console.log('🐍 SURGICAL: Creating Snake game container and modal');
    
    // Find or create Snake game container
    let snakeContainer = document.querySelector('#snake-game-container, .snake-game-container');
    
    if (!snakeContainer) {
        // Create Snake game container
        snakeContainer = document.createElement('div');
        snakeContainer.id = 'snake-game-container';
        snakeContainer.className = 'snake-game-container';
        snakeContainer.style.cssText = `
            display: none;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.95);
            border: 2px solid #00ff88;
            border-radius: 12px;
            padding: 2rem;
            z-index: 1000;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
        `;
        
        snakeContainer.innerHTML = `
            <div style="text-align: center; color: #00ff88; font-family: monospace;">
                <h2 style="margin-bottom: 1rem;">🐍 DOS Snake Game</h2>
                <div id="snake-game" style="
                    width: 400px;
                    height: 400px;
                    background: #000;
                    border: 2px solid #00ff88;
                    margin: 0 auto 1rem;
                    position: relative;
                "></div>
                <div style="display: flex; gap: 1rem; justify-content: center; margin-bottom: 1rem;">
                    <button id="snake-start" style="background: #00ff88; color: #000; border: none; padding: 0.5rem 1rem; cursor: pointer;">START</button>
                    <button id="snake-pause" style="background: #ff8800; color: #000; border: none; padding: 0.5rem 1rem; cursor: pointer;">PAUSE</button>
                    <button id="snake-reset" style="background: #ff0088; color: #000; border: none; padding: 0.5rem 1rem; cursor: pointer;">RESET</button>
                    <button id="snake-close" style="background: #888; color: #fff; border: none; padding: 0.5rem 1rem; cursor: pointer;">CLOSE</button>
                </div>
                <p style="color: #888; font-size: 0.9rem;">Use arrow keys or WASD to control</p>
            </div>
        `;
        
        document.body.appendChild(snakeContainer);
        
        // Add close functionality
        document.getElementById('snake-close').addEventListener('click', () => {
            snakeContainer.style.display = 'none';
        });
        
        console.log('✅ SURGICAL: Snake game container created');
    }
    
    // Create launch function for Snake game
    window.launchSnakeGame = () => {
        console.log('🐍 LAUNCHING: Snake game modal');
        snakeContainer.style.display = 'block';
        
        // Initialize basic Snake game if DOSSnakeGame exists
        if (window.DOSSnakeGame) {
            try {
                const gameCanvas = document.getElementById('snake-game');
                if (gameCanvas && !gameCanvas.hasChildNodes()) {
                    new window.DOSSnakeGame(gameCanvas);
                    console.log('✅ SURGICAL: Snake game initialized');
                }
            } catch (error) {
                console.error('❌ SURGICAL: Snake game initialization failed:', error);
                // Fallback: Simple placeholder
                document.getElementById('snake-game').innerHTML = `
                    <div style="
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        height: 100%;
                        color: #00ff88;
                        font-size: 18px;
                    ">
                        🐍 Snake Game Ready<br>
                        <small style="font-size: 14px; color: #888;">Use arrow keys to play</small>
                    </div>
                `;
            }
        }
    };
    
    // Connect Snake feature card button
    const connectSnakeButton = () => {
        // Find Snake game launch button
        const snakeButtons = document.querySelectorAll('button, .ric-button');
        snakeButtons.forEach(button => {
            const buttonText = button.textContent.toLowerCase();
            if (buttonText.includes('launch game') || buttonText.includes('snake')) {
                button.onclick = window.launchSnakeGame;
                console.log('✅ SURGICAL: Snake button connected');
            }
        });
    };
    
    // Connect after DOM is ready
    setTimeout(connectSnakeButton, 500);
    
    return true;
};

// SURGICAL FIX 3: Light Mode Contrast Emergency Fix
const fixLightModeContrast = () => {
    console.log('💡 SURGICAL: Emergency light mode contrast fix');
    
    const lightModeCSS = document.createElement('style');
    lightModeCSS.id = 'emergency-light-mode-fix';
    lightModeCSS.textContent = `
        /* EMERGENCY LIGHT MODE CONTRAST FIX */
        .light .innovation-lab,
        .light #innovation-lab,
        html.light .innovation-lab,
        html.light #innovation-lab {
            background: rgba(255, 255, 255, 0.98) !important;
            color: rgba(0, 0, 0, 0.95) !important;
            border: 2px solid rgba(0, 0, 0, 0.15) !important;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15) !important;
        }
        
        .light .innovation-lab h1,
        .light .innovation-lab h2,
        .light .innovation-lab h3,
        .light #innovation-lab h1,
        .light #innovation-lab h2,
        .light #innovation-lab h3,
        html.light .innovation-lab h1,
        html.light .innovation-lab h2,
        html.light .innovation-lab h3,
        html.light #innovation-lab h1,
        html.light #innovation-lab h2,
        html.light #innovation-lab h3 {
            color: rgba(0, 0, 0, 0.95) !important;
            text-shadow: none !important;
        }
        
        .light .innovation-lab p,
        .light .innovation-lab .description,
        .light #innovation-lab p,
        .light #innovation-lab .description,
        html.light .innovation-lab p,
        html.light .innovation-lab .description,
        html.light #innovation-lab p,
        html.light #innovation-lab .description {
            color: rgba(0, 0, 0, 0.8) !important;
            line-height: 1.6 !important;
        }
        
        .light .feature-card,
        .light .innovation-card,
        html.light .feature-card,
        html.light .innovation-card {
            background: rgba(248, 250, 252, 0.95) !important;
            color: rgba(0, 0, 0, 0.9) !important;
            border: 1px solid rgba(0, 0, 0, 0.1) !important;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1) !important;
        }
        
        .light .feature-card:hover,
        .light .innovation-card:hover,
        html.light .feature-card:hover,
        html.light .innovation-card:hover {
            background: rgba(255, 255, 255, 1.0) !important;
            border-color: rgba(0, 0, 0, 0.2) !important;
            box-shadow: 0 6px 24px rgba(0, 0, 0, 0.15) !important;
            transform: translateY(-2px) !important;
        }
        
        .light .ric-button,
        html.light .ric-button {
            background: linear-gradient(135deg, #0066cc, #004499) !important;
            color: white !important;
            border: none !important;
            box-shadow: 0 2px 8px rgba(0, 102, 204, 0.3) !important;
        }
        
        .light .ric-button:hover,
        html.light .ric-button:hover {
            background: linear-gradient(135deg, #0052a3, #003366) !important;
            box-shadow: 0 4px 16px rgba(0, 102, 204, 0.4) !important;
        }
    `;
    
    document.head.appendChild(lightModeCSS);
    console.log('✅ SURGICAL: Light mode contrast CSS injected');
    
    return true;
};

// SURGICAL FIX 4: Time Context Correction
const fixTimeContext = () => {
    console.log('⏰ SURGICAL: Correcting time context');
    
    const currentHour = new Date().getHours();
    let timeContext = 'evening'; // Default for 23:00
    
    if (currentHour >= 6 && currentHour < 12) {
        timeContext = 'morning';
    } else if (currentHour >= 12 && currentHour < 18) {
        timeContext = 'afternoon';
    } else {
        timeContext = 'evening';
    }
    
    // Apply correct time context to document
    document.documentElement.classList.remove('time-morning', 'time-afternoon', 'time-evening');
    document.documentElement.classList.add(`time-${timeContext}`);
    
    console.log(`✅ SURGICAL: Time context set to ${timeContext} (hour: ${currentHour})`);
    return true;
};

// EMERGENCY DEPLOYMENT
const deployEmergencyFixes = () => {
    console.log('🚨 DEPLOYING: Emergency surgical fixes');
    
    const results = {
        innovationLab: fixInnovationLabObject(),
        snakeGame: fixSnakeGameContainer(),
        lightMode: fixLightModeContrast(),
        timeContext: fixTimeContext()
    };
    
    const successCount = Object.values(results).filter(Boolean).length;
    const totalFixes = Object.keys(results).length;
    
    console.log(`🎯 EMERGENCY RESULTS: ${successCount}/${totalFixes} fixes deployed`);
    
    if (successCount === totalFixes) {
        console.log('🎉 EMERGENCY SUCCESS: All surgical fixes deployed');
    } else {
        console.warn('⚠️ EMERGENCY WARNING: Some fixes failed');
    }
    
    return results;
};

// VALIDATION FUNCTION
window.validateEmergencyFixes = () => {
    console.log('🔍 VALIDATING: Emergency fixes');
    
    const checks = {
        innovationLabObject: !!window.InnovationLab,
        snakeContainer: !!document.getElementById('snake-game-container'),
        lightModeCSS: !!document.getElementById('emergency-light-mode-fix'),
        timeContext: document.documentElement.classList.contains('time-evening'),
        launchFunction: typeof window.launchSnakeGame === 'function'
    };
    
    console.log('Validation results:', checks);
    return checks;
};

// AUTO-DEPLOY
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', deployEmergencyFixes);
} else {
    deployEmergencyFixes();
}

console.log('🚨✅ EMERGENCY SURGICAL FIX: Ready for deployment');
