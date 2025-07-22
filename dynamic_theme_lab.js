// DYNAMIC THEME-RESPONSIVE INNOVATION LAB
// EMERGENCY FIX - Proper theme detection and visual response

console.log('🚨 EMERGENCY THEME FIX: Creating truly responsive Innovation Lab...');

// 1. AGGRESSIVE CLEANUP OF BROKEN IMPLEMENTATIONS
const brokenLabs = document.querySelectorAll('[id*="innovation"], [id*="lab"], [id*="cyberpunk"], [id*="theme-aware"]');
brokenLabs.forEach(lab => {
    if (!lab.id.includes('snake')) {
        lab.remove();
        console.log('🧹 Removed broken lab:', lab.id);
    }
});

// Remove all existing lab styles
const brokenStyles = document.querySelectorAll('[id*="lab-styles"], [id*="cyberpunk"], [id*="theme-aware"]');
brokenStyles.forEach(style => style.remove());

// 2. REAL THEME DETECTION THAT ACTUALLY WORKS
function getRealTheme() {
    const body = document.body;
    const html = document.documentElement;
    
    // Check computed background color
    const bodyBg = getComputedStyle(body).backgroundColor;
    const htmlBg = getComputedStyle(html).backgroundColor;
    
    // Parse RGB values
    const isDarkBg = (bg) => {
        const rgb = bg.match(/\d+/g);
        if (rgb) {
            const [r, g, b] = rgb.map(Number);
            const brightness = (r * 299 + g * 587 + b * 114) / 1000;
            return brightness < 128;
        }
        return false;
    };
    
    const bodyIsDark = isDarkBg(bodyBg);
    const htmlIsDark = isDarkBg(htmlBg);
    
    // Also check for explicit theme classes/attributes
    const hasLightClass = body.classList.contains('light') || html.classList.contains('light') ||
                         body.getAttribute('data-theme') === 'light' || html.getAttribute('data-theme') === 'light';
    const hasDarkClass = body.classList.contains('dark') || html.classList.contains('dark') ||
                        body.getAttribute('data-theme') === 'dark' || html.getAttribute('data-theme') === 'dark';
    
    let theme;
    if (hasDarkClass || bodyIsDark || htmlIsDark) {
        theme = 'dark';
    } else if (hasLightClass) {
        theme = 'light';
    } else {
        // Fallback to system preference
        theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    console.log(`🎨 REAL THEME DETECTED: ${theme.toUpperCase()}`);
    console.log(`   Body BG: ${bodyBg}`);
    console.log(`   HTML BG: ${htmlBg}`);
    console.log(`   Body Dark: ${bodyIsDark}, HTML Dark: ${htmlIsDark}`);
    console.log(`   Light Class: ${hasLightClass}, Dark Class: ${hasDarkClass}`);
    
    return theme;
}

// 3. CREATE DYNAMIC THEME-RESPONSIVE LAB
const currentTheme = getRealTheme();
const dynamicLab = document.createElement('section');
dynamicLab.id = 'dynamic-theme-lab';
dynamicLab.className = `innovation-lab theme-${currentTheme}`;
dynamicLab.setAttribute('data-current-theme', currentTheme);

dynamicLab.innerHTML = `
    <div class="lab-header">
        <div class="lab-icon">🧬</div>
        <h2 class="lab-title">Innovation Laboratory</h2>
        <p class="lab-subtitle">Future-state design experiments and prototypes</p>
        <div class="theme-indicator">Theme: <span class="current-theme">${currentTheme.toUpperCase()}</span></div>
    </div>
    
    <div class="lab-grid">
        <!-- Row 1 -->
        <div class="feature-card live-card">
            <div class="card-status"><span class="status-badge live">LIVE</span></div>
            <div class="card-icon">🧠</div>
            <h3 class="card-title">UX Memory Recall</h3>
            <p class="card-description">Advanced visitor journey analysis</p>
            <div class="card-footer">
                <button class="card-action">Launch</button>
            </div>
        </div>
        
        <div class="feature-card live-card">
            <div class="card-status"><span class="status-badge live">LIVE</span></div>
            <div class="card-icon">🎭</div>
            <h3 class="card-title">Case Study Remix</h3>
            <p class="card-description">AI-powered case study personalization</p>
            <div class="card-footer">
                <button class="card-action">Launch</button>
            </div>
        </div>
        
        <div class="feature-card live-card">
            <div class="card-status"><span class="status-badge live">LIVE</span></div>
            <div class="card-icon">💾</div>
            <h3 class="card-title">Save-to-Local</h3>
            <p class="card-description">Persistent experience curation</p>
            <div class="card-footer">
                <button class="card-action">Launch</button>
            </div>
        </div>
        
        <!-- Row 2 -->
        <div class="feature-card live-card">
            <div class="card-status"><span class="status-badge live">LIVE</span></div>
            <div class="card-icon">🐴</div>
            <h3 class="card-title">TrojanHorse Feed</h3>
            <p class="card-description">Advanced content orchestration</p>
            <div class="card-footer">
                <button class="card-action">Launch</button>
            </div>
        </div>
        
        <div class="feature-card beta-card">
            <div class="card-status"><span class="status-badge beta">BETA</span></div>
            <div class="card-icon">⚡</div>
            <h3 class="card-title">Prompt Generator</h3>
            <p class="card-description">Dynamic prompt generation</p>
            <div class="card-footer">
                <button class="card-action">Launch</button>
            </div>
        </div>
        
        <div class="feature-card experimental-card">
            <div class="card-status"><span class="status-badge experimental">EXPERIMENTAL</span></div>
            <div class="card-icon">🐍</div>
            <h3 class="card-title">DOS Snake Game</h3>
            <p class="card-description">Classic game with modern enhancements</p>
            <div class="card-footer">
                <button class="card-action">Launch</button>
            </div>
        </div>
    </div>
`;

// 4. EXPLICIT THEME-SPECIFIC CSS (NO CSS VARIABLES - DIRECT STYLING)
const dynamicStyles = document.createElement('style');
dynamicStyles.id = 'dynamic-theme-styles';
dynamicStyles.textContent = `
    /* LIGHT THEME STYLES */
    .innovation-lab.theme-light {
        background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.95) 0%, 
            rgba(248, 250, 252, 0.95) 50%, 
            rgba(255, 255, 255, 0.95) 100%);
        border: 2px solid rgba(0, 102, 204, 0.2);
        color: #1a202c;
        box-shadow: 0 8px 32px rgba(0, 102, 204, 0.1);
    }
    
    .theme-light .lab-title {
        color: #1a202c;
        text-shadow: none;
    }
    
    .theme-light .lab-subtitle {
        color: #4a5568;
    }
    
    .theme-light .feature-card {
        background: rgba(255, 255, 255, 0.9);
        border: 1px solid rgba(0, 102, 204, 0.15);
        color: #1a202c;
    }
    
    .theme-light .feature-card:hover {
        border-color: rgba(0, 102, 204, 0.4);
        box-shadow: 0 12px 40px rgba(0, 102, 204, 0.15);
    }
    
    .theme-light .card-title {
        color: #1a202c;
    }
    
    .theme-light .card-description {
        color: #4a5568;
    }
    
    .theme-light .card-action {
        background: rgba(0, 102, 204, 0.1);
        border: 1px solid rgba(0, 102, 204, 0.3);
        color: #0066cc;
    }
    
    .theme-light .card-action:hover {
        background: rgba(0, 102, 204, 0.2);
        border-color: rgba(0, 102, 204, 0.5);
    }
    
    .theme-light .status-badge.live {
        background: rgba(0, 166, 107, 0.15);
        color: #00a86b;
        border: 1px solid rgba(0, 166, 107, 0.3);
    }
    
    .theme-light .status-badge.beta {
        background: rgba(255, 140, 0, 0.15);
        color: #ff8c00;
        border: 1px solid rgba(255, 140, 0, 0.3);
    }
    
    .theme-light .status-badge.experimental {
        background: rgba(220, 53, 69, 0.15);
        color: #dc3545;
        border: 1px solid rgba(220, 53, 69, 0.3);
    }
    
    /* DARK THEME STYLES */
    .innovation-lab.theme-dark {
        background: linear-gradient(135deg, 
            rgba(13, 13, 13, 0.95) 0%, 
            rgba(25, 25, 35, 0.95) 50%, 
            rgba(13, 13, 13, 0.95) 100%);
        border: 2px solid rgba(0, 255, 157, 0.3);
        color: #ffffff;
        box-shadow: 0 8px 32px rgba(0, 255, 157, 0.2);
    }
    
    .theme-dark .lab-title {
        background: linear-gradient(135deg, #00ff9d, #00d4ff, #9d00ff);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-shadow: 0 0 20px rgba(0, 255, 157, 0.5);
    }
    
    .theme-dark .lab-subtitle {
        color: rgba(255, 255, 255, 0.7);
    }
    
    .theme-dark .feature-card {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(0, 255, 157, 0.2);
        color: #ffffff;
    }
    
    .theme-dark .feature-card:hover {
        border-color: rgba(0, 255, 157, 0.5);
        box-shadow: 0 12px 40px rgba(0, 255, 157, 0.25);
        background: rgba(255, 255, 255, 0.08);
    }
    
    .theme-dark .card-title {
        color: #ffffff;
    }
    
    .theme-dark .card-description {
        color: rgba(255, 255, 255, 0.7);
    }
    
    .theme-dark .card-action {
        background: rgba(0, 255, 157, 0.1);
        border: 1px solid rgba(0, 255, 157, 0.3);
        color: #00ff9d;
    }
    
    .theme-dark .card-action:hover {
        background: rgba(0, 255, 157, 0.2);
        border-color: rgba(0, 255, 157, 0.6);
        box-shadow: 0 4px 12px rgba(0, 255, 157, 0.3);
    }
    
    .theme-dark .status-badge.live {
        background: rgba(0, 255, 157, 0.2);
        color: #00ff9d;
        border: 1px solid rgba(0, 255, 157, 0.4);
    }
    
    .theme-dark .status-badge.beta {
        background: rgba(255, 193, 7, 0.2);
        color: #ffc107;
        border: 1px solid rgba(255, 193, 7, 0.4);
    }
    
    .theme-dark .status-badge.experimental {
        background: rgba(255, 87, 34, 0.2);
        color: #ff5722;
        border: 1px solid rgba(255, 87, 34, 0.4);
    }
    
    /* BASE STYLES */
    .innovation-lab {
        border-radius: 16px;
        padding: 2rem;
        margin: 2rem 0;
        backdrop-filter: blur(10px);
        position: relative;
        overflow: hidden;
        transition: all 0.3s ease;
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
    }
    
    .lab-title {
        font-size: 2.5rem;
        font-weight: 700;
        margin: 0 0 0.5rem 0;
        font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
    }
    
    .lab-subtitle {
        font-size: 1.1rem;
        margin: 0 0 1rem 0;
        font-weight: 400;
    }
    
    .theme-indicator {
        font-size: 0.9rem;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        display: inline-block;
        font-weight: 600;
        margin-top: 1rem;
    }
    
    .theme-light .theme-indicator {
        background: rgba(0, 102, 204, 0.1);
        color: #0066cc;
        border: 1px solid rgba(0, 102, 204, 0.2);
    }
    
    .theme-dark .theme-indicator {
        background: rgba(0, 255, 157, 0.1);
        color: #00ff9d;
        border: 1px solid rgba(0, 255, 157, 0.2);
    }
    
    .lab-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1.5rem;
        position: relative;
        z-index: 1;
    }
    
    .feature-card {
        border-radius: 12px;
        padding: 1.5rem;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        backdrop-filter: blur(10px);
        position: relative;
        overflow: hidden;
        cursor: pointer;
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
    
    .card-icon {
        font-size: 2.5rem;
        margin-bottom: 1rem;
    }
    
    .card-title {
        font-size: 1.25rem;
        font-weight: 600;
        margin: 0 0 0.5rem 0;
        font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
    }
    
    .card-description {
        font-size: 0.9rem;
        line-height: 1.5;
        margin: 0 0 1.5rem 0;
    }
    
    .card-action {
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
    
    /* Responsive */
    @media (max-width: 768px) {
        .lab-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
        }
        
        .innovation-lab {
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

document.head.appendChild(dynamicStyles);

// 5. INSERT INTO DOM
const targetContainer = document.querySelector('main') || document.body;
targetContainer.appendChild(dynamicLab);

// 6. REAL-TIME THEME MONITORING AND UPDATING
function updateLabTheme() {
    const newTheme = getRealTheme();
    const lab = document.getElementById('dynamic-theme-lab');
    const themeIndicator = lab?.querySelector('.current-theme');
    
    if (lab) {
        lab.className = `innovation-lab theme-${newTheme}`;
        lab.setAttribute('data-current-theme', newTheme);
        
        if (themeIndicator) {
            themeIndicator.textContent = newTheme.toUpperCase();
        }
        
        console.log(`🎨 THEME UPDATED TO: ${newTheme.toUpperCase()}`);
    }
}

// Multiple monitoring approaches to catch theme changes
const themeObserver = new MutationObserver((mutations) => {
    let shouldUpdate = false;
    
    mutations.forEach((mutation) => {
        if (mutation.type === 'attributes') {
            const attr = mutation.attributeName;
            if (attr === 'class' || attr === 'data-theme' || attr === 'style') {
                shouldUpdate = true;
            }
        }
    });
    
    if (shouldUpdate) {
        setTimeout(updateLabTheme, 100); // Small delay to ensure styles are applied
    }
});

// Observe both body and html for theme changes
themeObserver.observe(document.body, { 
    attributes: true, 
    attributeFilter: ['class', 'data-theme', 'style'] 
});
themeObserver.observe(document.documentElement, { 
    attributes: true, 
    attributeFilter: ['class', 'data-theme', 'style'] 
});

// Also listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateLabTheme);

// Periodic check as backup
setInterval(updateLabTheme, 2000);

// 7. IMMEDIATE VISUAL FEEDBACK
console.log('🎉 DYNAMIC THEME LAB READY!');
console.log(`🎨 Current theme: ${currentTheme.toUpperCase()}`);
console.log('🔄 Real-time theme monitoring active');
console.log('💡 Switch your site theme to see the Innovation Lab respond!');

// Test theme switching
setTimeout(() => {
    console.log('🧪 Testing theme detection...');
    updateLabTheme();
}, 1000);

'Dynamic theme-responsive Innovation Lab created successfully!';
