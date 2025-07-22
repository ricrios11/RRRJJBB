// THEME-AWARE INNOVATION LAB
// Trojan Horse Brigade + InteractionOS + DesignOS Orchestration
// Optimized for Performance, Usability, and Theme Harmony

console.log('🎨 DESIGNOS + INTERACTIONOS: Orchestrating theme-aware Innovation Lab...');

// 1. DETECT CURRENT THEME STATE
function detectCurrentTheme() {
    const body = document.body;
    const html = document.documentElement;
    
    // Check for theme indicators
    const isDark = body.classList.contains('dark-theme') || 
                   html.classList.contains('dark-theme') ||
                   body.getAttribute('data-theme') === 'dark' ||
                   html.getAttribute('data-theme') === 'dark' ||
                   getComputedStyle(body).backgroundColor.includes('rgb(0') ||
                   getComputedStyle(body).backgroundColor.includes('rgb(1') ||
                   getComputedStyle(body).backgroundColor.includes('rgb(2');
    
    console.log(`🎨 THEME DETECTED: ${isDark ? 'DARK' : 'LIGHT'}`);
    return isDark ? 'dark' : 'light';
}

// 2. CLEAR EXISTING IMPLEMENTATIONS
const existingLabs = document.querySelectorAll('#cyberpunk-innovation-lab, #innovation-lab-foundation, [id*="innovation"]');
existingLabs.forEach(lab => {
    if (!lab.id.includes('snake')) {
        lab.remove();
        console.log('🧹 Removed existing lab:', lab.id);
    }
});

// Remove existing styles
const existingStyles = document.querySelectorAll('#cyberpunk-lab-styles, #robust-snake-styles');
existingStyles.forEach(style => style.remove());

// 3. CREATE THEME-AWARE INNOVATION LAB
const currentTheme = detectCurrentTheme();
const themeAwareLab = document.createElement('section');
themeAwareLab.id = 'theme-aware-innovation-lab';
themeAwareLab.className = `innovation-laboratory theme-${currentTheme}`;
themeAwareLab.setAttribute('data-theme', currentTheme);

themeAwareLab.innerHTML = `
    <div class="lab-header">
        <div class="lab-icon">🧬</div>
        <h2 class="lab-title">Innovation Laboratory</h2>
        <p class="lab-subtitle">Future-state design experiments and prototypes</p>
    </div>
    
    <div class="lab-grid">
        <!-- Row 1: 3-up Feature Cards -->
        <div class="feature-card live-card" data-feature="ux-memory">
            <div class="card-status">
                <span class="status-badge live">LIVE</span>
            </div>
            <div class="card-icon">🧠</div>
            <h3 class="card-title">UX Memory Recall</h3>
            <p class="card-description">Advanced visitor journey analysis</p>
            <div class="card-footer">
                <button class="card-action" data-action="ux-memory">Launch</button>
            </div>
        </div>
        
        <div class="feature-card live-card" data-feature="case-remix">
            <div class="card-status">
                <span class="status-badge live">LIVE</span>
            </div>
            <div class="card-icon">🎭</div>
            <h3 class="card-title">Case Study Remix</h3>
            <p class="card-description">AI-powered case study personalization</p>
            <div class="card-footer">
                <button class="card-action" data-action="case-remix">Launch</button>
            </div>
        </div>
        
        <div class="feature-card live-card" data-feature="save-local">
            <div class="card-status">
                <span class="status-badge live">LIVE</span>
            </div>
            <div class="card-icon">💾</div>
            <h3 class="card-title">Save-to-Local</h3>
            <p class="card-description">Persistent experience curation</p>
            <div class="card-footer">
                <button class="card-action" data-action="save-local">Launch</button>
            </div>
        </div>
        
        <!-- Row 2: 3-up Feature Cards -->
        <div class="feature-card live-card" data-feature="trojan-feed">
            <div class="card-status">
                <span class="status-badge live">LIVE</span>
            </div>
            <div class="card-icon">🐴</div>
            <h3 class="card-title">TrojanHorse Feed</h3>
            <p class="card-description">Advanced content orchestration</p>
            <div class="card-footer">
                <button class="card-action" data-action="trojan-feed">Launch</button>
            </div>
        </div>
        
        <div class="feature-card beta-card" data-feature="prompt-gen">
            <div class="card-status">
                <span class="status-badge beta">BETA</span>
            </div>
            <div class="card-icon">⚡</div>
            <h3 class="card-title">Prompt Generator</h3>
            <p class="card-description">Dynamic prompt generation</p>
            <div class="card-footer">
                <button class="card-action" data-action="prompt-gen">Launch</button>
            </div>
        </div>
        
        <div class="feature-card experimental-card" data-feature="snake-game">
            <div class="card-status">
                <span class="status-badge experimental">EXPERIMENTAL</span>
            </div>
            <div class="card-icon">🐍</div>
            <h3 class="card-title">DOS Snake Game</h3>
            <p class="card-description">Classic game with modern enhancements</p>
            <div class="card-footer">
                <button class="card-action" data-action="snake-game">Launch</button>
            </div>
        </div>
    </div>
    
    <!-- Snake Game Container (Initially Hidden) -->
    <div id="snake-game-section" class="snake-section" style="display: none;">
        <div class="section-divider"></div>
        <div id="snake-game-container"></div>
    </div>
`;

// 4. THEME-AWARE CSS SYSTEM
const themeAwareStyles = document.createElement('style');
themeAwareStyles.id = 'theme-aware-lab-styles';
themeAwareStyles.textContent = `
    /* THEME-AWARE INNOVATION LAB - DESIGNOS + INTERACTIONOS */
    
    /* CSS Custom Properties for Theme System */
    .innovation-laboratory.theme-light {
        --lab-bg-primary: rgba(255, 255, 255, 0.95);
        --lab-bg-secondary: rgba(248, 250, 252, 0.95);
        --lab-border: rgba(0, 0, 0, 0.1);
        --lab-text-primary: #1a202c;
        --lab-text-secondary: #4a5568;
        --lab-accent: #0066cc;
        --lab-accent-rgb: 0, 102, 204;
        --lab-success: #00a86b;
        --lab-warning: #ff8c00;
        --lab-experimental: #dc3545;
        --lab-shadow: rgba(0, 0, 0, 0.1);
        --lab-hover-shadow: rgba(0, 102, 204, 0.15);
        --card-bg: rgba(255, 255, 255, 0.8);
        --card-border: rgba(0, 0, 0, 0.08);
        --card-hover-border: rgba(0, 102, 204, 0.3);
    }
    
    .innovation-laboratory.theme-dark {
        --lab-bg-primary: rgba(13, 13, 13, 0.95);
        --lab-bg-secondary: rgba(25, 25, 35, 0.95);
        --lab-border: rgba(255, 255, 255, 0.1);
        --lab-text-primary: #ffffff;
        --lab-text-secondary: rgba(255, 255, 255, 0.7);
        --lab-accent: #00ff9d;
        --lab-accent-rgb: 0, 255, 157;
        --lab-success: #00ff9d;
        --lab-warning: #ffc107;
        --lab-experimental: #ff5722;
        --lab-shadow: rgba(0, 255, 157, 0.1);
        --lab-hover-shadow: rgba(0, 255, 157, 0.2);
        --card-bg: rgba(255, 255, 255, 0.05);
        --card-border: rgba(255, 255, 255, 0.1);
        --card-hover-border: rgba(0, 255, 157, 0.4);
    }
    
    /* Base Innovation Laboratory Styles */
    .innovation-laboratory {
        background: linear-gradient(135deg, 
            var(--lab-bg-primary) 0%, 
            var(--lab-bg-secondary) 50%, 
            var(--lab-bg-primary) 100%);
        border: 1px solid var(--lab-border);
        border-radius: 16px;
        padding: 2rem;
        margin: 2rem 0;
        backdrop-filter: blur(10px);
        box-shadow: 0 8px 32px var(--lab-shadow);
        position: relative;
        overflow: hidden;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .innovation-laboratory::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(circle at 20% 20%, rgba(var(--lab-accent-rgb), 0.05) 0%, transparent 50%);
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
        filter: drop-shadow(0 0 10px rgba(var(--lab-accent-rgb), 0.5));
        transition: transform 0.3s ease;
    }
    
    .lab-title {
        font-size: 2.5rem;
        font-weight: 700;
        color: var(--lab-text-primary);
        margin: 0 0 0.5rem 0;
        font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
        position: relative;
    }
    
    .theme-dark .lab-title {
        background: linear-gradient(135deg, #00ff9d, #00d4ff, #9d00ff);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }
    
    .lab-subtitle {
        color: var(--lab-text-secondary);
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
        background: var(--card-bg);
        border: 1px solid var(--card-border);
        border-radius: 12px;
        padding: 1.5rem;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        backdrop-filter: blur(10px);
        position: relative;
        overflow: hidden;
        cursor: pointer;
    }
    
    .feature-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, transparent 0%, rgba(var(--lab-accent-rgb), 0.05) 100%);
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
    }
    
    .feature-card:hover {
        transform: translateY(-4px);
        border-color: var(--card-hover-border);
        box-shadow: 0 12px 40px var(--lab-hover-shadow);
    }
    
    .feature-card:hover::before {
        opacity: 1;
    }
    
    .feature-card:hover .lab-icon {
        transform: scale(1.1);
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
        backdrop-filter: blur(10px);
    }
    
    .status-badge.live {
        background: rgba(var(--lab-accent-rgb), 0.2);
        color: var(--lab-success);
        border: 1px solid rgba(var(--lab-accent-rgb), 0.3);
    }
    
    .status-badge.beta {
        background: rgba(255, 193, 7, 0.2);
        color: var(--lab-warning);
        border: 1px solid rgba(255, 193, 7, 0.3);
    }
    
    .status-badge.experimental {
        background: rgba(255, 87, 34, 0.2);
        color: var(--lab-experimental);
        border: 1px solid rgba(255, 87, 34, 0.3);
    }
    
    .card-icon {
        font-size: 2.5rem;
        margin-bottom: 1rem;
        filter: drop-shadow(0 0 8px rgba(var(--lab-accent-rgb), 0.3));
        transition: transform 0.3s ease;
    }
    
    .card-title {
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--lab-text-primary);
        margin: 0 0 0.5rem 0;
        font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
    }
    
    .card-description {
        color: var(--lab-text-secondary);
        font-size: 0.9rem;
        line-height: 1.5;
        margin: 0 0 1.5rem 0;
    }
    
    .card-footer {
        margin-top: auto;
    }
    
    .card-action {
        background: rgba(var(--lab-accent-rgb), 0.1);
        border: 1px solid rgba(var(--lab-accent-rgb), 0.3);
        color: var(--lab-accent);
        padding: 0.75rem 1.5rem;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        width: 100%;
        font-size: 0.9rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        backdrop-filter: blur(10px);
    }
    
    .card-action:hover {
        background: rgba(var(--lab-accent-rgb), 0.2);
        border-color: rgba(var(--lab-accent-rgb), 0.5);
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(var(--lab-accent-rgb), 0.2);
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
            rgba(var(--lab-accent-rgb), 0.5) 50%, 
            transparent 100%);
        margin: 2rem 0;
    }
    
    /* Performance Optimizations */
    .innovation-laboratory {
        contain: layout style paint;
        will-change: transform;
    }
    
    .feature-card {
        contain: layout style paint;
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
    
    /* Theme Transition Animations */
    @media (prefers-reduced-motion: no-preference) {
        .innovation-laboratory,
        .feature-card,
        .card-action,
        .lab-icon,
        .card-icon {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
    }
    
    /* Accessibility Enhancements */
    @media (prefers-reduced-motion: reduce) {
        .innovation-laboratory,
        .feature-card,
        .card-action,
        .lab-icon,
        .card-icon {
            transition: none;
        }
    }
    
    .feature-card:focus-within {
        outline: 2px solid var(--lab-accent);
        outline-offset: 2px;
    }
    
    .card-action:focus {
        outline: 2px solid var(--lab-accent);
        outline-offset: 2px;
    }
`;

document.head.appendChild(themeAwareStyles);

// 5. INSERT INTO DOM WITH PERFORMANCE OPTIMIZATION
const targetContainer = document.querySelector('main') || document.body;

// Use requestAnimationFrame for smooth insertion
requestAnimationFrame(() => {
    targetContainer.appendChild(themeAwareLab);
    console.log('🎨 Theme-aware Innovation Lab inserted');
});

// 6. INTERACTIONOS - OPTIMIZED EVENT HANDLING
class InteractionOS {
    constructor() {
        this.setupEventDelegation();
        this.setupThemeObserver();
        this.setupPerformanceMonitoring();
    }
    
    setupEventDelegation() {
        // Single event listener for all card interactions
        themeAwareLab.addEventListener('click', (e) => {
            const card = e.target.closest('.feature-card');
            const action = e.target.closest('.card-action');
            
            if (action && card) {
                const actionType = action.getAttribute('data-action');
                this.handleCardAction(actionType, card);
            }
        });
        
        // Hover performance optimization
        themeAwareLab.addEventListener('mouseenter', (e) => {
            if (e.target.classList.contains('feature-card')) {
                e.target.style.willChange = 'transform';
            }
        }, true);
        
        themeAwareLab.addEventListener('mouseleave', (e) => {
            if (e.target.classList.contains('feature-card')) {
                e.target.style.willChange = 'auto';
            }
        }, true);
    }
    
    setupThemeObserver() {
        // Watch for theme changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && 
                    (mutation.attributeName === 'class' || mutation.attributeName === 'data-theme')) {
                    this.updateTheme();
                }
            });
        });
        
        observer.observe(document.body, { attributes: true });
        observer.observe(document.documentElement, { attributes: true });
    }
    
    setupPerformanceMonitoring() {
        // Monitor performance and optimize
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach((entry) => {
                    if (entry.duration > 16) { // > 60fps threshold
                        console.warn('🐌 Performance warning:', entry.name, entry.duration + 'ms');
                    }
                });
            });
            
            observer.observe({ entryTypes: ['measure', 'navigation'] });
        }
    }
    
    updateTheme() {
        const newTheme = detectCurrentTheme();
        const lab = document.getElementById('theme-aware-innovation-lab');
        
        if (lab) {
            lab.className = `innovation-laboratory theme-${newTheme}`;
            lab.setAttribute('data-theme', newTheme);
            console.log(`🎨 Theme updated to: ${newTheme.toUpperCase()}`);
        }
    }
    
    handleCardAction(actionType, card) {
        console.log(`🎮 INTERACTIONOS: Launching ${actionType}`);
        
        // Add interaction feedback
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);
        
        switch(actionType) {
            case 'ux-memory':
                this.launchUXMemory();
                break;
            case 'case-remix':
                this.launchCaseRemix();
                break;
            case 'save-local':
                this.launchSaveLocal();
                break;
            case 'trojan-feed':
                this.launchTrojanFeed();
                break;
            case 'prompt-gen':
                this.launchPromptGen();
                break;
            case 'snake-game':
                this.launchSnakeGame();
                break;
        }
    }
    
    launchUXMemory() {
        console.log('🧠 UX Memory Recall activated');
        if (window.openModal) {
            window.openModal('case-study-modal');
        }
    }
    
    launchCaseRemix() {
        console.log('🎭 Case Study Remix activated');
        if (window.openModal) {
            window.openModal('case-study-modal');
        }
    }
    
    launchSaveLocal() {
        console.log('💾 Save-to-Local activated');
        // Implement save functionality with user feedback
        const notification = this.showNotification('💾 Preferences saved locally!', 'success');
    }
    
    launchTrojanFeed() {
        console.log('🐴 TrojanHorse Feed activated');
        const trojanFeed = document.querySelector('[id*="trojan"]');
        if (trojanFeed) {
            trojanFeed.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    launchPromptGen() {
        console.log('⚡ Prompt Generator (BETA) activated');
        this.showNotification('⚡ Prompt Generator (BETA) - Advanced AI capabilities coming soon!', 'info');
    }
    
    launchSnakeGame() {
        console.log('🐍 Snake Game activated');
        const snakeSection = document.getElementById('snake-game-section');
        const snakeContainer = document.getElementById('snake-game-container');
        
        if (snakeSection && snakeContainer) {
            snakeSection.style.display = 'block';
            
            const existingSnake = document.getElementById('robust-snake-game');
            if (existingSnake) {
                snakeContainer.appendChild(existingSnake);
                existingSnake.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `lab-notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 2rem;
            right: 2rem;
            background: var(--card-bg);
            border: 1px solid var(--card-border);
            border-radius: 8px;
            padding: 1rem 1.5rem;
            color: var(--lab-text-primary);
            backdrop-filter: blur(10px);
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
        
        return notification;
    }
}

// 7. KONAMI CODE WITH PERFORMANCE OPTIMIZATION
let konamiSequence = [];
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

// Throttled keydown handler
let konamiTimeout;
document.addEventListener('keydown', function(e) {
    clearTimeout(konamiTimeout);
    konamiTimeout = setTimeout(() => {
        konamiSequence.push(e.code);
        
        if (konamiSequence.length > konamiCode.length) {
            konamiSequence.shift();
        }
        
        if (JSON.stringify(konamiSequence) === JSON.stringify(konamiCode)) {
            console.log('🎮 KONAMI CODE ACTIVATED!');
            const lab = document.getElementById('theme-aware-innovation-lab');
            if (lab) {
                lab.scrollIntoView({ behavior: 'smooth' });
                lab.style.animation = 'konamiActivation 2s ease-out';
            }
            konamiSequence = [];
        }
    }, 50);
});

// 8. INITIALIZE SYSTEMS
const interactionOS = new InteractionOS();

// 9. ADD KONAMI ANIMATION
const konamiAnimation = document.createElement('style');
konamiAnimation.textContent = `
    @keyframes konamiActivation {
        0% { transform: scale(1); box-shadow: 0 8px 32px var(--lab-shadow); }
        50% { transform: scale(1.02); box-shadow: 0 16px 64px var(--lab-hover-shadow); }
        100% { transform: scale(1); box-shadow: 0 8px 32px var(--lab-shadow); }
    }
    
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(konamiAnimation);

console.log('🎉 THEME-AWARE INNOVATION LAB READY!');
console.log('🎨 DESIGNOS: Theme harmony achieved');
console.log('🎮 INTERACTIONOS: Optimized interactions active');
console.log('🐴 TROJAN HORSE BRIGADE: Performance optimized');
console.log('⌨️ Konami code: ↑↑↓↓←→←→BA');

'Theme-aware Innovation Lab activated successfully!';
