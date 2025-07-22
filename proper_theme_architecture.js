// PROPER CSS ARCHITECTURE SOLUTION
// Best Practice Theme System - Root Cause Analysis & Fix

console.log('🏗️ PROPER CSS ARCHITECTURE: Analyzing and fixing theme system...');

// STEP 1: DIAGNOSTIC ANALYSIS - Identify Root Cause
function diagnosticAnalysis() {
    console.log('🔍 === DIAGNOSTIC ANALYSIS ===');
    
    // Check existing theme system
    const body = document.body;
    const html = document.documentElement;
    
    console.log('Body classes:', body.className);
    console.log('HTML classes:', html.className);
    console.log('Body data-theme:', body.getAttribute('data-theme'));
    console.log('HTML data-theme:', html.getAttribute('data-theme'));
    
    // Check computed styles of body/html
    const bodyBg = getComputedStyle(body).backgroundColor;
    const htmlBg = getComputedStyle(html).backgroundColor;
    console.log('Body background:', bodyBg);
    console.log('HTML background:', htmlBg);
    
    // Check existing Innovation Lab
    const existingLab = document.getElementById('dynamic-theme-lab');
    if (existingLab) {
        console.log('Existing lab found:', existingLab.className);
        console.log('Lab computed background:', getComputedStyle(existingLab).backgroundColor);
        console.log('Lab computed border:', getComputedStyle(existingLab).border);
    }
    
    // Check for conflicting stylesheets
    const stylesheets = Array.from(document.styleSheets);
    console.log('Total stylesheets:', stylesheets.length);
    
    // Check our CSS injection
    const ourStyles = document.getElementById('dynamic-theme-styles');
    console.log('Our CSS loaded:', !!ourStyles);
    if (ourStyles) {
        console.log('Our CSS rules count:', ourStyles.sheet?.cssRules?.length || 'Unable to access');
    }
    
    return {
        bodyClasses: body.className,
        htmlClasses: html.className,
        bodyTheme: body.getAttribute('data-theme'),
        htmlTheme: html.getAttribute('data-theme'),
        bodyBg,
        htmlBg,
        existingLab: !!existingLab,
        ourStyles: !!ourStyles
    };
}

// STEP 2: INTELLIGENT THEME DETECTION
function intelligentThemeDetection() {
    const body = document.body;
    const html = document.documentElement;
    
    // Method 1: Check explicit theme attributes/classes
    const explicitTheme = 
        body.getAttribute('data-theme') ||
        html.getAttribute('data-theme') ||
        (body.classList.contains('dark-theme') ? 'dark' : null) ||
        (body.classList.contains('light-theme') ? 'light' : null) ||
        (html.classList.contains('dark-theme') ? 'dark' : null) ||
        (html.classList.contains('light-theme') ? 'light' : null);
    
    if (explicitTheme) {
        console.log('🎯 Explicit theme found:', explicitTheme);
        return explicitTheme;
    }
    
    // Method 2: Analyze computed background colors
    const bodyBg = getComputedStyle(body).backgroundColor;
    const htmlBg = getComputedStyle(html).backgroundColor;
    
    const getBrightness = (color) => {
        const rgb = color.match(/\d+/g);
        if (rgb) {
            const [r, g, b] = rgb.map(Number);
            return (r * 299 + g * 587 + b * 114) / 1000;
        }
        return 128; // neutral
    };
    
    const bodyBrightness = getBrightness(bodyBg);
    const htmlBrightness = getBrightness(htmlBg);
    
    console.log('Body brightness:', bodyBrightness);
    console.log('HTML brightness:', htmlBrightness);
    
    // Use the darker of the two
    const isDark = Math.min(bodyBrightness, htmlBrightness) < 128;
    
    // Method 3: System preference fallback
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const detectedTheme = isDark ? 'dark' : (systemPrefersDark ? 'dark' : 'light');
    
    console.log('🎯 Detected theme:', detectedTheme);
    return detectedTheme;
}

// STEP 3: CLEAN SLATE APPROACH
function cleanSlate() {
    console.log('🧹 CLEAN SLATE: Removing broken implementations...');
    
    // Remove all previous lab implementations
    const brokenLabs = document.querySelectorAll('[id*="innovation"], [id*="lab"], [id*="cyberpunk"], [id*="theme-aware"], [id*="dynamic"]');
    brokenLabs.forEach(lab => {
        if (!lab.id.includes('snake') && !lab.id.includes('foundation')) {
            lab.remove();
            console.log('Removed:', lab.id || lab.className);
        }
    });
    
    // Remove all previous styles
    const brokenStyles = document.querySelectorAll('[id*="lab-styles"], [id*="cyberpunk"], [id*="theme-aware"], [id*="dynamic"]');
    brokenStyles.forEach(style => {
        style.remove();
        console.log('Removed style:', style.id);
    });
}

// STEP 4: PROPER CSS ARCHITECTURE WITH SPECIFICITY STRATEGY
function createProperCSSArchitecture(theme) {
    console.log('🏗️ CREATING PROPER CSS ARCHITECTURE...');
    
    const architectureStyles = document.createElement('style');
    architectureStyles.id = 'proper-theme-architecture';
    
    // Use CSS Custom Properties + High Specificity Selectors (Best Practice)
    architectureStyles.textContent = `
        /* CSS CUSTOM PROPERTIES ARCHITECTURE */
        :root {
            --lab-transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* LIGHT THEME PROPERTIES */
        :root,
        html[data-theme="light"],
        body[data-theme="light"],
        html.light-theme,
        body.light-theme {
            --lab-bg-primary: rgba(255, 255, 255, 0.95);
            --lab-bg-secondary: rgba(248, 250, 252, 0.95);
            --lab-border-color: rgba(0, 102, 204, 0.2);
            --lab-text-primary: #1a202c;
            --lab-text-secondary: #4a5568;
            --lab-accent-color: #0066cc;
            --lab-accent-rgb: 0, 102, 204;
            --lab-shadow: rgba(0, 102, 204, 0.1);
            --lab-card-bg: rgba(255, 255, 255, 0.9);
            --lab-card-border: rgba(0, 102, 204, 0.15);
            --lab-card-hover-border: rgba(0, 102, 204, 0.4);
            --lab-card-hover-shadow: rgba(0, 102, 204, 0.15);
        }
        
        /* DARK THEME PROPERTIES */
        html[data-theme="dark"],
        body[data-theme="dark"],
        html.dark-theme,
        body.dark-theme,
        @media (prefers-color-scheme: dark) {
            :root {
                --lab-bg-primary: rgba(13, 13, 13, 0.95);
                --lab-bg-secondary: rgba(25, 25, 35, 0.95);
                --lab-border-color: rgba(0, 255, 157, 0.3);
                --lab-text-primary: #ffffff;
                --lab-text-secondary: rgba(255, 255, 255, 0.7);
                --lab-accent-color: #00ff9d;
                --lab-accent-rgb: 0, 255, 157;
                --lab-shadow: rgba(0, 255, 157, 0.2);
                --lab-card-bg: rgba(255, 255, 255, 0.05);
                --lab-card-border: rgba(0, 255, 157, 0.2);
                --lab-card-hover-border: rgba(0, 255, 157, 0.5);
                --lab-card-hover-shadow: rgba(0, 255, 157, 0.25);
            }
        }
        
        /* HIGH SPECIFICITY SELECTORS FOR INNOVATION LAB */
        html body .proper-innovation-lab {
            background: linear-gradient(135deg, 
                var(--lab-bg-primary) 0%, 
                var(--lab-bg-secondary) 50%, 
                var(--lab-bg-primary) 100%);
            border: 2px solid var(--lab-border-color);
            color: var(--lab-text-primary);
            box-shadow: 0 8px 32px var(--lab-shadow);
            border-radius: 16px;
            padding: 2rem;
            margin: 2rem 0;
            backdrop-filter: blur(10px);
            position: relative;
            overflow: hidden;
            transition: var(--lab-transition);
        }
        
        html body .proper-innovation-lab .lab-header {
            text-align: center;
            margin-bottom: 3rem;
            position: relative;
            z-index: 1;
        }
        
        html body .proper-innovation-lab .lab-icon {
            font-size: 3rem;
            margin-bottom: 1rem;
            transition: var(--lab-transition);
        }
        
        html body .proper-innovation-lab .lab-title {
            font-size: 2.5rem;
            font-weight: 700;
            color: var(--lab-text-primary);
            margin: 0 0 0.5rem 0;
            font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
            transition: var(--lab-transition);
        }
        
        /* DARK THEME SPECIFIC OVERRIDES */
        html[data-theme="dark"] body .proper-innovation-lab .lab-title,
        body[data-theme="dark"] .proper-innovation-lab .lab-title,
        html.dark-theme body .proper-innovation-lab .lab-title,
        body.dark-theme .proper-innovation-lab .lab-title {
            background: linear-gradient(135deg, #00ff9d, #00d4ff, #9d00ff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-shadow: 0 0 20px rgba(0, 255, 157, 0.5);
        }
        
        html body .proper-innovation-lab .lab-subtitle {
            color: var(--lab-text-secondary);
            font-size: 1.1rem;
            margin: 0 0 1rem 0;
            font-weight: 400;
            transition: var(--lab-transition);
        }
        
        html body .proper-innovation-lab .theme-indicator {
            display: inline-block;
            padding: 0.5rem 1rem;
            background: rgba(var(--lab-accent-rgb), 0.1);
            border: 1px solid rgba(var(--lab-accent-rgb), 0.2);
            color: var(--lab-accent-color);
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: 600;
            margin-top: 1rem;
            transition: var(--lab-transition);
        }
        
        html body .proper-innovation-lab .lab-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1.5rem;
            position: relative;
            z-index: 1;
        }
        
        html body .proper-innovation-lab .feature-card {
            background: var(--lab-card-bg);
            border: 1px solid var(--lab-card-border);
            border-radius: 12px;
            padding: 1.5rem;
            transition: var(--lab-transition);
            backdrop-filter: blur(10px);
            position: relative;
            overflow: hidden;
            cursor: pointer;
        }
        
        html body .proper-innovation-lab .feature-card:hover {
            border-color: var(--lab-card-hover-border);
            box-shadow: 0 12px 40px var(--lab-card-hover-shadow);
            transform: translateY(-4px);
        }
        
        html body .proper-innovation-lab .card-title {
            font-size: 1.25rem;
            font-weight: 600;
            color: var(--lab-text-primary);
            margin: 0 0 0.5rem 0;
            font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
            transition: var(--lab-transition);
        }
        
        html body .proper-innovation-lab .card-description {
            color: var(--lab-text-secondary);
            font-size: 0.9rem;
            line-height: 1.5;
            margin: 0 0 1.5rem 0;
            transition: var(--lab-transition);
        }
        
        html body .proper-innovation-lab .card-action {
            background: rgba(var(--lab-accent-rgb), 0.1);
            border: 1px solid rgba(var(--lab-accent-rgb), 0.3);
            color: var(--lab-accent-color);
            padding: 0.75rem 1.5rem;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: var(--lab-transition);
            width: 100%;
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        html body .proper-innovation-lab .card-action:hover {
            background: rgba(var(--lab-accent-rgb), 0.2);
            border-color: rgba(var(--lab-accent-rgb), 0.5);
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(var(--lab-accent-rgb), 0.2);
        }
        
        html body .proper-innovation-lab .status-badge {
            position: absolute;
            top: 1rem;
            right: 1rem;
            padding: 0.25rem 0.75rem;
            border-radius: 20px;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            transition: var(--lab-transition);
        }
        
        html body .proper-innovation-lab .status-badge.live {
            background: rgba(var(--lab-accent-rgb), 0.2);
            color: var(--lab-accent-color);
            border: 1px solid rgba(var(--lab-accent-rgb), 0.3);
        }
        
        html body .proper-innovation-lab .status-badge.beta {
            background: rgba(255, 193, 7, 0.2);
            color: #ffc107;
            border: 1px solid rgba(255, 193, 7, 0.3);
        }
        
        html body .proper-innovation-lab .status-badge.experimental {
            background: rgba(255, 87, 34, 0.2);
            color: #ff5722;
            border: 1px solid rgba(255, 87, 34, 0.3);
        }
        
        /* RESPONSIVE DESIGN */
        @media (max-width: 768px) {
            html body .proper-innovation-lab .lab-grid {
                grid-template-columns: 1fr;
                gap: 1rem;
            }
            
            html body .proper-innovation-lab {
                padding: 1.5rem;
                margin: 1rem 0;
            }
            
            html body .proper-innovation-lab .lab-title {
                font-size: 2rem;
            }
        }
        
        @media (max-width: 1024px) and (min-width: 769px) {
            html body .proper-innovation-lab .lab-grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }
    `;
    
    document.head.appendChild(architectureStyles);
    console.log('✅ Proper CSS architecture created');
    return architectureStyles;
}

// STEP 5: CREATE SEMANTIC HTML STRUCTURE
function createSemanticHTML(theme) {
    console.log('🏗️ CREATING SEMANTIC HTML STRUCTURE...');
    
    const properLab = document.createElement('section');
    properLab.id = 'proper-innovation-lab';
    properLab.className = 'proper-innovation-lab';
    properLab.setAttribute('data-theme', theme);
    properLab.setAttribute('role', 'region');
    properLab.setAttribute('aria-label', 'Innovation Laboratory');
    
    properLab.innerHTML = `
        <div class="lab-header">
            <div class="lab-icon" role="img" aria-label="DNA molecule">🧬</div>
            <h2 class="lab-title">Innovation Laboratory</h2>
            <p class="lab-subtitle">Future-state design experiments and prototypes</p>
            <div class="theme-indicator" role="status" aria-live="polite">
                Theme: <span class="current-theme">${theme.toUpperCase()}</span>
            </div>
        </div>
        
        <div class="lab-grid" role="grid">
            <div class="feature-card live-card" role="gridcell">
                <div class="card-status">
                    <span class="status-badge live">LIVE</span>
                </div>
                <div class="card-icon" role="img" aria-label="Brain">🧠</div>
                <h3 class="card-title">UX Memory Recall</h3>
                <p class="card-description">Advanced visitor journey analysis</p>
                <div class="card-footer">
                    <button class="card-action" type="button">Launch</button>
                </div>
            </div>
            
            <div class="feature-card live-card" role="gridcell">
                <div class="card-status">
                    <span class="status-badge live">LIVE</span>
                </div>
                <div class="card-icon" role="img" aria-label="Theater masks">🎭</div>
                <h3 class="card-title">Case Study Remix</h3>
                <p class="card-description">AI-powered case study personalization</p>
                <div class="card-footer">
                    <button class="card-action" type="button">Launch</button>
                </div>
            </div>
            
            <div class="feature-card live-card" role="gridcell">
                <div class="card-status">
                    <span class="status-badge live">LIVE</span>
                </div>
                <div class="card-icon" role="img" aria-label="Floppy disk">💾</div>
                <h3 class="card-title">Save-to-Local</h3>
                <p class="card-description">Persistent experience curation</p>
                <div class="card-footer">
                    <button class="card-action" type="button">Launch</button>
                </div>
            </div>
            
            <div class="feature-card live-card" role="gridcell">
                <div class="card-status">
                    <span class="status-badge live">LIVE</span>
                </div>
                <div class="card-icon" role="img" aria-label="Horse">🐴</div>
                <h3 class="card-title">TrojanHorse Feed</h3>
                <p class="card-description">Advanced content orchestration</p>
                <div class="card-footer">
                    <button class="card-action" type="button">Launch</button>
                </div>
            </div>
            
            <div class="feature-card beta-card" role="gridcell">
                <div class="card-status">
                    <span class="status-badge beta">BETA</span>
                </div>
                <div class="card-icon" role="img" aria-label="Lightning bolt">⚡</div>
                <h3 class="card-title">Prompt Generator</h3>
                <p class="card-description">Dynamic prompt generation</p>
                <div class="card-footer">
                    <button class="card-action" type="button">Launch</button>
                </div>
            </div>
            
            <div class="feature-card experimental-card" role="gridcell">
                <div class="card-status">
                    <span class="status-badge experimental">EXPERIMENTAL</span>
                </div>
                <div class="card-icon" role="img" aria-label="Snake">🐍</div>
                <h3 class="card-title">DOS Snake Game</h3>
                <p class="card-description">Classic game with modern enhancements</p>
                <div class="card-footer">
                    <button class="card-action" type="button">Launch</button>
                </div>
            </div>
        </div>
    `;
    
    return properLab;
}

// STEP 6: INTELLIGENT THEME MONITORING SYSTEM
function createThemeMonitoringSystem() {
    console.log('🔄 CREATING THEME MONITORING SYSTEM...');
    
    function updateTheme() {
        const newTheme = intelligentThemeDetection();
        const lab = document.getElementById('proper-innovation-lab');
        const themeIndicator = lab?.querySelector('.current-theme');
        
        if (lab) {
            lab.setAttribute('data-theme', newTheme);
            
            if (themeIndicator) {
                themeIndicator.textContent = newTheme.toUpperCase();
            }
            
            console.log(`🎨 THEME UPDATED TO: ${newTheme.toUpperCase()}`);
            
            // Trigger CSS custom property recalculation
            lab.style.setProperty('--theme-update', Date.now());
        }
    }
    
    // Multiple monitoring strategies
    const observer = new MutationObserver((mutations) => {
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
            setTimeout(updateTheme, 100);
        }
    });
    
    // Observe theme containers
    observer.observe(document.body, { 
        attributes: true, 
        attributeFilter: ['class', 'data-theme', 'style'] 
    });
    observer.observe(document.documentElement, { 
        attributes: true, 
        attributeFilter: ['class', 'data-theme', 'style'] 
    });
    
    // System preference monitoring
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateTheme);
    
    // Periodic check as backup
    setInterval(updateTheme, 3000);
    
    return { updateTheme, observer };
}

// MAIN EXECUTION
function main() {
    console.log('🚀 EXECUTING PROPER CSS ARCHITECTURE SOLUTION...');
    
    // Step 1: Diagnostic Analysis
    const diagnostics = diagnosticAnalysis();
    
    // Step 2: Detect Current Theme
    const currentTheme = intelligentThemeDetection();
    
    // Step 3: Clean Slate
    cleanSlate();
    
    // Step 4: Create Proper CSS Architecture
    const cssArchitecture = createProperCSSArchitecture(currentTheme);
    
    // Step 5: Create Semantic HTML
    const semanticHTML = createSemanticHTML(currentTheme);
    
    // Step 6: Insert into DOM
    const targetContainer = document.querySelector('main') || document.body;
    targetContainer.appendChild(semanticHTML);
    
    // Step 7: Create Theme Monitoring System
    const monitoringSystem = createThemeMonitoringSystem();
    
    console.log('✅ PROPER CSS ARCHITECTURE COMPLETE!');
    console.log(`🎨 Current theme: ${currentTheme.toUpperCase()}`);
    console.log('🔄 Intelligent theme monitoring active');
    console.log('📊 Diagnostics:', diagnostics);
    
    return {
        diagnostics,
        currentTheme,
        cssArchitecture,
        semanticHTML,
        monitoringSystem
    };
}

// Execute the proper solution
const result = main();

'Proper CSS architecture solution implemented successfully!';
