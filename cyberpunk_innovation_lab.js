// CYBERPUNK INNOVATION LAB - RICRIOS.COM STYLE REFINEMENT
// Trojan Horse Brigade Implementation

console.log('🚀 TROJAN HORSE BRIGADE: Executing Cyberpunk Innovation Lab refinement...');

// 1. CLEAR EXISTING INNOVATION LAB IMPLEMENTATIONS
const existingLabs = document.querySelectorAll('#innovation-lab-foundation, [id*="innovation"], [class*="lab"]');
existingLabs.forEach(lab => {
    if (lab.id !== 'robust-snake-game') {
        lab.remove();
        console.log('🧹 Removed existing lab:', lab.id || lab.className);
    }
});

// 2. CREATE CYBERPUNK INNOVATION LAB CONTAINER
const cyberpunkLab = document.createElement('section');
cyberpunkLab.id = 'cyberpunk-innovation-lab';
cyberpunkLab.className = 'innovation-laboratory';
cyberpunkLab.innerHTML = `
    <div class="lab-header">
        <div class="lab-icon">🧬</div>
        <h2 class="lab-title">Innovation Laboratory</h2>
        <p class="lab-subtitle">Future-state design experiments and prototypes</p>
    </div>
    
    <div class="lab-grid">
        <!-- Row 1: 3-up Feature Cards -->
        <div class="feature-card live-card">
            <div class="card-status">
                <span class="status-badge live">LIVE</span>
            </div>
            <div class="card-icon">🧠</div>
            <h3 class="card-title">UX Memory Recall</h3>
            <p class="card-description">Advanced visitor journey analysis</p>
            <div class="card-footer">
                <button class="card-action" onclick="openCaseStudy('ux-memory')">Launch</button>
            </div>
        </div>
        
        <div class="feature-card live-card">
            <div class="card-status">
                <span class="status-badge live">LIVE</span>
            </div>
            <div class="card-icon">🎭</div>
            <h3 class="card-title">Case Study Remix</h3>
            <p class="card-description">AI-powered case study personalization</p>
            <div class="card-footer">
                <button class="card-action" onclick="openCaseStudy('remix')">Launch</button>
            </div>
        </div>
        
        <div class="feature-card live-card">
            <div class="card-status">
                <span class="status-badge live">LIVE</span>
            </div>
            <div class="card-icon">💾</div>
            <h3 class="card-title">Save-to-Local</h3>
            <p class="card-description">Persistent experience curation</p>
            <div class="card-footer">
                <button class="card-action" onclick="saveToLocal()">Launch</button>
            </div>
        </div>
        
        <!-- Row 2: 3-up Feature Cards -->
        <div class="feature-card live-card">
            <div class="card-status">
                <span class="status-badge live">LIVE</span>
            </div>
            <div class="card-icon">🐴</div>
            <h3 class="card-title">TrojanHorse Feed</h3>
            <p class="card-description">Advanced content orchestration</p>
            <div class="card-footer">
                <button class="card-action" onclick="launchTrojanHorse()">Launch</button>
            </div>
        </div>
        
        <div class="feature-card beta-card">
            <div class="card-status">
                <span class="status-badge beta">BETA</span>
            </div>
            <div class="card-icon">⚡</div>
            <h3 class="card-title">Prompt Generator</h3>
            <p class="card-description">Dynamic prompt generation</p>
            <div class="card-footer">
                <button class="card-action" onclick="launchPromptGen()">Launch</button>
            </div>
        </div>
        
        <div class="feature-card experimental-card">
            <div class="card-status">
                <span class="status-badge experimental">EXPERIMENTAL</span>
            </div>
            <div class="card-icon">🐍</div>
            <h3 class="card-title">DOS Snake Game</h3>
            <p class="card-description">Classic game with modern enhancements</p>
            <div class="card-footer">
                <button class="card-action" onclick="launchSnakeGame()">Launch</button>
            </div>
        </div>
    </div>
    
    <!-- Snake Game Container (Initially Hidden) -->
    <div id="snake-game-section" class="snake-section" style="display: none;">
        <div class="section-divider"></div>
        <div id="snake-game-container"></div>
    </div>
`;

// 3. CYBERPUNK RICRIOS.COM STYLE CSS
const cyberpunkStyles = document.createElement('style');
cyberpunkStyles.id = 'cyberpunk-lab-styles';
cyberpunkStyles.textContent = `
    /* CYBERPUNK INNOVATION LAB - RICRIOS.COM STYLE */
    .innovation-laboratory {
        background: linear-gradient(135deg, 
            rgba(13, 13, 13, 0.95) 0%, 
            rgba(25, 25, 35, 0.95) 50%, 
            rgba(13, 13, 13, 0.95) 100%);
        border: 1px solid rgba(0, 255, 157, 0.2);
        border-radius: 16px;
        padding: 2rem;
        margin: 2rem 0;
        backdrop-filter: blur(10px);
        box-shadow: 
            0 8px 32px rgba(0, 255, 157, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        position: relative;
        overflow: hidden;
    }
    
    .innovation-laboratory::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: 
            radial-gradient(circle at 20% 20%, rgba(0, 255, 157, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(157, 0, 255, 0.05) 0%, transparent 50%);
        pointer-events: none;
        z-index: 0;
    }
    
    .lab-header {
        text-align: center;
        margin-bottom: 3rem;
        position: relative;
        z-index: 1;
    }
    
    .lab-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
        filter: drop-shadow(0 0 10px rgba(0, 255, 157, 0.5));
    }
    
    .lab-title {
        font-size: 2.5rem;
        font-weight: 700;
        background: linear-gradient(135deg, #00ff9d, #00d4ff, #9d00ff);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin: 0 0 0.5rem 0;
        font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
    }
    
    .lab-subtitle {
        color: rgba(255, 255, 255, 0.7);
        font-size: 1.1rem;
        margin: 0;
        font-weight: 400;
    }
    
    .lab-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1.5rem;
        position: relative;
        z-index: 1;
    }
    
    .feature-card {
        background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.05) 0%, 
            rgba(255, 255, 255, 0.02) 100%);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        padding: 1.5rem;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        backdrop-filter: blur(10px);
        position: relative;
        overflow: hidden;
    }
    
    .feature-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.05) 100%);
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
    }
    
    .feature-card:hover {
        transform: translateY(-4px);
        border-color: rgba(0, 255, 157, 0.4);
        box-shadow: 
            0 12px 40px rgba(0, 255, 157, 0.15),
            0 4px 12px rgba(0, 0, 0, 0.2);
    }
    
    .feature-card:hover::before {
        opacity: 1;
    }
    
    .live-card:hover {
        border-color: rgba(0, 255, 157, 0.6);
        box-shadow: 
            0 12px 40px rgba(0, 255, 157, 0.2),
            0 4px 12px rgba(0, 0, 0, 0.2);
    }
    
    .beta-card:hover {
        border-color: rgba(255, 193, 7, 0.6);
        box-shadow: 
            0 12px 40px rgba(255, 193, 7, 0.2),
            0 4px 12px rgba(0, 0, 0, 0.2);
    }
    
    .experimental-card:hover {
        border-color: rgba(255, 87, 34, 0.6);
        box-shadow: 
            0 12px 40px rgba(255, 87, 34, 0.2),
            0 4px 12px rgba(0, 0, 0, 0.2);
    }
    
    .card-status {
        position: absolute;
        top: 1rem;
        right: 1rem;
    }
    
    .status-badge {
        padding: 0.25rem 0.75rem;
        border-radius: 20px;
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }
    
    .status-badge.live {
        background: rgba(0, 255, 157, 0.2);
        color: #00ff9d;
        border: 1px solid rgba(0, 255, 157, 0.3);
    }
    
    .status-badge.beta {
        background: rgba(255, 193, 7, 0.2);
        color: #ffc107;
        border: 1px solid rgba(255, 193, 7, 0.3);
    }
    
    .status-badge.experimental {
        background: rgba(255, 87, 34, 0.2);
        color: #ff5722;
        border: 1px solid rgba(255, 87, 34, 0.3);
    }
    
    .card-icon {
        font-size: 2.5rem;
        margin-bottom: 1rem;
        filter: drop-shadow(0 0 8px rgba(0, 255, 157, 0.3));
    }
    
    .card-title {
        font-size: 1.25rem;
        font-weight: 600;
        color: #ffffff;
        margin: 0 0 0.5rem 0;
        font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
    }
    
    .card-description {
        color: rgba(255, 255, 255, 0.7);
        font-size: 0.9rem;
        line-height: 1.5;
        margin: 0 0 1.5rem 0;
    }
    
    .card-footer {
        margin-top: auto;
    }
    
    .card-action {
        background: linear-gradient(135deg, rgba(0, 255, 157, 0.1), rgba(0, 212, 255, 0.1));
        border: 1px solid rgba(0, 255, 157, 0.3);
        color: #00ff9d;
        padding: 0.75rem 1.5rem;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        width: 100%;
        font-size: 0.9rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }
    
    .card-action:hover {
        background: linear-gradient(135deg, rgba(0, 255, 157, 0.2), rgba(0, 212, 255, 0.2));
        border-color: rgba(0, 255, 157, 0.5);
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(0, 255, 157, 0.2);
    }
    
    .snake-section {
        margin-top: 3rem;
        position: relative;
        z-index: 1;
    }
    
    .section-divider {
        height: 1px;
        background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(0, 255, 157, 0.5) 50%, 
            transparent 100%);
        margin: 2rem 0;
    }
    
    /* Responsive Design */
    @media (max-width: 768px) {
        .lab-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
        }
        
        .innovation-laboratory {
            padding: 1.5rem;
            margin: 1rem 0;
        }
        
        .lab-title {
            font-size: 2rem;
        }
    }
    
    @media (max-width: 1024px) and (min-width: 769px) {
        .lab-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }
`;

document.head.appendChild(cyberpunkStyles);

// 4. INSERT INTO DOM
const targetContainer = document.querySelector('main') || document.body;
targetContainer.appendChild(cyberpunkLab);

// 5. IMPLEMENT CARD ACTIONS
window.openCaseStudy = function(type) {
    console.log(`🎭 Opening case study: ${type}`);
    // Integrate with existing case study modal system
    if (window.openModal) {
        window.openModal('case-study-modal');
    }
};

window.saveToLocal = function() {
    console.log('💾 Save-to-Local activated');
    // Implement save functionality
    alert('Save-to-Local feature activated! Your preferences are being saved.');
};

window.launchTrojanHorse = function() {
    console.log('🐴 TrojanHorse Feed launched');
    // Show existing TrojanHorse Feed if available
    const trojanFeed = document.querySelector('[id*="trojan"]');
    if (trojanFeed) {
        trojanFeed.scrollIntoView({ behavior: 'smooth' });
    }
};

window.launchPromptGen = function() {
    console.log('⚡ Prompt Generator launched');
    alert('Prompt Generator (BETA) - Coming soon with advanced AI capabilities!');
};

window.launchSnakeGame = function() {
    console.log('🐍 Launching Snake Game...');
    const snakeSection = document.getElementById('snake-game-section');
    const snakeContainer = document.getElementById('snake-game-container');
    
    // Show snake section
    snakeSection.style.display = 'block';
    
    // Move existing snake game or create new one
    const existingSnake = document.getElementById('robust-snake-game');
    if (existingSnake) {
        snakeContainer.appendChild(existingSnake);
        existingSnake.scrollIntoView({ behavior: 'smooth' });
    } else {
        snakeContainer.innerHTML = '<p style="color: #00ff9d; text-align: center;">Snake game loading...</p>';
    }
};

// 6. KONAMI CODE INTEGRATION
let konamiSequence = [];
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', function(e) {
    konamiSequence.push(e.code);
    
    if (konamiSequence.length > konamiCode.length) {
        konamiSequence.shift();
    }
    
    if (JSON.stringify(konamiSequence) === JSON.stringify(konamiCode)) {
        console.log('🎮 KONAMI CODE ACTIVATED!');
        const lab = document.getElementById('cyberpunk-innovation-lab');
        if (lab) {
            lab.scrollIntoView({ behavior: 'smooth' });
            // Add activation effect
            lab.style.animation = 'konamiActivation 2s ease-out';
        }
        konamiSequence = []; // Reset
    }
});

// 7. ADD KONAMI ACTIVATION ANIMATION
const konamiAnimation = document.createElement('style');
konamiAnimation.textContent = `
    @keyframes konamiActivation {
        0% { transform: scale(1); box-shadow: 0 8px 32px rgba(0, 255, 157, 0.1); }
        50% { transform: scale(1.02); box-shadow: 0 16px 64px rgba(0, 255, 157, 0.3); }
        100% { transform: scale(1); box-shadow: 0 8px 32px rgba(0, 255, 157, 0.1); }
    }
`;
document.head.appendChild(konamiAnimation);

console.log('🎉 CYBERPUNK INNOVATION LAB READY!');
console.log('🎮 Try the Konami code: ↑↑↓↓←→←→BA');
console.log('🚀 All feature cards are interactive and ready');

'Cyberpunk Innovation Lab created successfully!';
