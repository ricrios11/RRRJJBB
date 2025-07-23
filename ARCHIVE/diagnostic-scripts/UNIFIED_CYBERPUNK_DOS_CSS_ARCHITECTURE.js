/**
 * UNIFIED CYBERPUNK DOS CSS ARCHITECTURE
 * 
 * MISSION: Create single source of truth for all Innovation Lab styling
 * - Unify header/subhead styling across dark/light themes
 * - Mature entry-point cyberpunk DOS styles for all use cases
 * - Propagate across Innovation Lab and Trojan Horse systems
 * - Eliminate CSS fragmentation and ensure theme toggle awareness
 * 
 * APPROACH: Dark Matter + Trojan Horse framework integration
 */

console.log('🎯 UNIFIED CYBERPUNK DOS: Initializing CSS Architecture...');

// ====================================================================
// 1. CYBERPUNK DOS DESIGN TOKENS - SINGLE SOURCE OF TRUTH
// ====================================================================

const CYBERPUNK_DOS_TOKENS = {
    // Core Cyberpunk Colors
    colors: {
        cyberpunk: {
            primary: '#00ff41',      // Matrix green
            secondary: '#00c832',    // Darker green
            accent: '#39ff14',       // Bright neon green
            warning: '#ff6b35',      // Cyber orange
            danger: '#ff073a',       // Cyber red
            info: '#00d4ff',         // Cyber blue
        },
        matrix: {
            light: 'rgba(0, 255, 65, 0.1)',
            medium: 'rgba(0, 255, 65, 0.2)',
            heavy: 'rgba(0, 255, 65, 0.3)',
            glow: 'rgba(0, 255, 65, 0.6)',
        },
        terminal: {
            darkBg: 'rgba(0, 0, 0, 0.95)',
            lightBg: 'rgba(0, 20, 0, 0.05)',
            darkBorder: '#00ff41',
            lightBorder: 'rgba(0, 200, 50, 0.4)',
        }
    },
    
    // Typography System
    typography: {
        fonts: {
            mono: "'JetBrains Mono', 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace",
            system: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif"
        },
        sizes: {
            xs: '0.75rem',
            sm: '0.875rem',
            base: '1rem',
            lg: '1.125rem',
            xl: '1.25rem',
            '2xl': '1.5rem',
            '3xl': '1.875rem',
            '4xl': '2.25rem'
        },
        weights: {
            normal: 400,
            medium: 500,
            semibold: 600,
            bold: 700
        }
    },
    
    // Spacing System
    spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '0.75rem',
        lg: '1rem',
        xl: '1.5rem',
        '2xl': '2rem',
        '3xl': '3rem'
    },
    
    // Animation System
    animations: {
        duration: {
            fast: '0.15s',
            normal: '0.3s',
            slow: '0.5s'
        },
        easing: {
            ease: 'ease',
            easeOut: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            easeIn: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
            bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
        }
    }
};

// ====================================================================
// 2. UNIFIED INNOVATION LAB HEADER/SUBHEAD SYSTEM
// ====================================================================

function createUnifiedInnovationLabHeader() {
    console.log('🎨 UNIFIED HEADER: Creating theme-aware Innovation Lab header system...');
    
    const isDarkMode = document.body.classList.contains('dark');
    
    // Define unified header styles
    const headerStyles = {
        container: {
            padding: `${CYBERPUNK_DOS_TOKENS.spacing['2xl']} 0`,
            textAlign: 'center',
            position: 'relative',
            background: isDarkMode ? 
                'linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(0, 20, 0, 0.8) 100%)' :
                'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 255, 240, 0.8) 100%)',
            borderTop: `1px solid ${isDarkMode ? CYBERPUNK_DOS_TOKENS.colors.terminal.darkBorder : CYBERPUNK_DOS_TOKENS.colors.terminal.lightBorder}`,
            borderBottom: `1px solid ${isDarkMode ? CYBERPUNK_DOS_TOKENS.colors.terminal.darkBorder : CYBERPUNK_DOS_TOKENS.colors.terminal.lightBorder}`,
        },
        
        title: {
            fontSize: CYBERPUNK_DOS_TOKENS.typography.sizes['3xl'],
            fontFamily: CYBERPUNK_DOS_TOKENS.typography.fonts.mono,
            fontWeight: CYBERPUNK_DOS_TOKENS.typography.weights.bold,
            color: isDarkMode ? CYBERPUNK_DOS_TOKENS.colors.cyberpunk.primary : CYBERPUNK_DOS_TOKENS.colors.cyberpunk.secondary,
            textShadow: isDarkMode ? 
                `0 0 10px ${CYBERPUNK_DOS_TOKENS.colors.matrix.glow}, 0 0 20px ${CYBERPUNK_DOS_TOKENS.colors.matrix.medium}` :
                `0 0 5px ${CYBERPUNK_DOS_TOKENS.colors.matrix.light}`,
            letterSpacing: '0.05em',
            margin: '0',
            position: 'relative',
            display: 'inline-block'
        },
        
        subtitle: {
            fontSize: CYBERPUNK_DOS_TOKENS.typography.sizes.lg,
            fontFamily: CYBERPUNK_DOS_TOKENS.typography.fonts.mono,
            fontWeight: CYBERPUNK_DOS_TOKENS.typography.weights.normal,
            color: isDarkMode ? 
                'rgba(0, 255, 65, 0.7)' : 
                'rgba(0, 150, 40, 0.8)',
            marginTop: CYBERPUNK_DOS_TOKENS.spacing.md,
            letterSpacing: '0.02em',
            opacity: 0.9
        },
        
        icon: {
            fontSize: CYBERPUNK_DOS_TOKENS.typography.sizes['2xl'],
            marginRight: CYBERPUNK_DOS_TOKENS.spacing.md,
            filter: isDarkMode ? 
                `drop-shadow(0 0 8px ${CYBERPUNK_DOS_TOKENS.colors.matrix.glow})` :
                `drop-shadow(0 0 4px ${CYBERPUNK_DOS_TOKENS.colors.matrix.light})`
        }
    };
    
    return headerStyles;
}

// ====================================================================
// 3. CYBERPUNK DOS ENTRY POINT CONTAINER SYSTEM
// ====================================================================

function createCyberpunkDOSContainer() {
    console.log('🏗️ DOS CONTAINER: Creating unified cyberpunk DOS container system...');
    
    const isDarkMode = document.body.classList.contains('dark');
    
    const containerStyles = {
        foundation: {
            background: isDarkMode ?
                `linear-gradient(135deg, 
                    rgba(0, 0, 0, 0.95) 0%, 
                    rgba(0, 20, 0, 0.9) 50%, 
                    rgba(0, 0, 0, 0.95) 100%)` :
                `linear-gradient(135deg, 
                    rgba(255, 255, 255, 0.95) 0%, 
                    rgba(240, 255, 240, 0.9) 50%, 
                    rgba(255, 255, 255, 0.95) 100%)`,
            border: `2px solid ${isDarkMode ? CYBERPUNK_DOS_TOKENS.colors.cyberpunk.primary : CYBERPUNK_DOS_TOKENS.colors.cyberpunk.secondary}`,
            borderRadius: '12px',
            padding: CYBERPUNK_DOS_TOKENS.spacing['2xl'],
            margin: `${CYBERPUNK_DOS_TOKENS.spacing.xl} auto`,
            maxWidth: '1200px',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: isDarkMode ?
                `0 0 30px rgba(0, 255, 65, 0.3), 
                 inset 0 0 30px rgba(0, 255, 65, 0.05)` :
                `0 0 20px rgba(0, 200, 50, 0.2), 
                 inset 0 0 20px rgba(0, 200, 50, 0.03)`,
            transition: `all ${CYBERPUNK_DOS_TOKENS.animations.duration.normal} ${CYBERPUNK_DOS_TOKENS.animations.easing.easeOut}`
        },
        
        header: {
            textAlign: 'center',
            marginBottom: CYBERPUNK_DOS_TOKENS.spacing.xl,
            position: 'relative'
        },
        
        content: {
            position: 'relative',
            zIndex: 2
        },
        
        // Animated background grid
        backgroundGrid: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: isDarkMode ? 0.1 : 0.05,
            backgroundImage: `linear-gradient(${CYBERPUNK_DOS_TOKENS.colors.cyberpunk.primary} 1px, transparent 1px),
                             linear-gradient(90deg, ${CYBERPUNK_DOS_TOKENS.colors.cyberpunk.primary} 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
            animation: 'matrix-grid 20s linear infinite',
            pointerEvents: 'none'
        },
        
        // Corner accents
        cornerAccent: {
            position: 'absolute',
            width: '20px',
            height: '20px',
            border: `2px solid ${CYBERPUNK_DOS_TOKENS.colors.cyberpunk.primary}`,
            pointerEvents: 'none'
        }
    };
    
    return containerStyles;
}

// ====================================================================
// 4. UNIFIED CSS INJECTION SYSTEM
// ====================================================================

function injectUnifiedCyberpunkCSS() {
    console.log('💉 CSS INJECTION: Injecting unified cyberpunk DOS styles...');
    
    // Remove existing cyberpunk styles to prevent conflicts
    const existingStyles = document.querySelectorAll('style[data-cyberpunk-dos]');
    existingStyles.forEach(style => style.remove());
    
    const isDarkMode = document.body.classList.contains('dark');
    
    const unifiedCSS = `
        /* UNIFIED CYBERPUNK DOS CSS ARCHITECTURE - SINGLE SOURCE OF TRUTH */
        
        /* Matrix Grid Animation */
        @keyframes matrix-grid {
            0% { transform: translateY(0); }
            100% { transform: translateY(20px); }
        }
        
        /* Cyberpunk Glow Animation */
        @keyframes cyberpunk-glow {
            0%, 100% { text-shadow: 0 0 10px ${CYBERPUNK_DOS_TOKENS.colors.matrix.glow}; }
            50% { text-shadow: 0 0 20px ${CYBERPUNK_DOS_TOKENS.colors.matrix.glow}, 0 0 30px ${CYBERPUNK_DOS_TOKENS.colors.matrix.medium}; }
        }
        
        /* Unified Innovation Lab Header System */
        .unified-innovation-lab-header {
            padding: ${CYBERPUNK_DOS_TOKENS.spacing['2xl']} 0;
            text-align: center;
            position: relative;
            background: ${isDarkMode ? 
                'linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(0, 20, 0, 0.8) 100%)' :
                'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 255, 240, 0.8) 100%)'};
            border-top: 1px solid ${isDarkMode ? CYBERPUNK_DOS_TOKENS.colors.terminal.darkBorder : CYBERPUNK_DOS_TOKENS.colors.terminal.lightBorder};
            border-bottom: 1px solid ${isDarkMode ? CYBERPUNK_DOS_TOKENS.colors.terminal.darkBorder : CYBERPUNK_DOS_TOKENS.colors.terminal.lightBorder};
            transition: all ${CYBERPUNK_DOS_TOKENS.animations.duration.normal} ${CYBERPUNK_DOS_TOKENS.animations.easing.easeOut};
        }
        
        .unified-innovation-lab-title {
            font-size: ${CYBERPUNK_DOS_TOKENS.typography.sizes['3xl']};
            font-family: ${CYBERPUNK_DOS_TOKENS.typography.fonts.mono};
            font-weight: ${CYBERPUNK_DOS_TOKENS.typography.weights.bold};
            color: ${isDarkMode ? CYBERPUNK_DOS_TOKENS.colors.cyberpunk.primary : CYBERPUNK_DOS_TOKENS.colors.cyberpunk.secondary};
            text-shadow: ${isDarkMode ? 
                `0 0 10px ${CYBERPUNK_DOS_TOKENS.colors.matrix.glow}, 0 0 20px ${CYBERPUNK_DOS_TOKENS.colors.matrix.medium}` :
                `0 0 5px ${CYBERPUNK_DOS_TOKENS.colors.matrix.light}`};
            letter-spacing: 0.05em;
            margin: 0;
            position: relative;
            display: inline-block;
            animation: cyberpunk-glow 3s ease-in-out infinite;
        }
        
        .unified-innovation-lab-subtitle {
            font-size: ${CYBERPUNK_DOS_TOKENS.typography.sizes.lg};
            font-family: ${CYBERPUNK_DOS_TOKENS.typography.fonts.mono};
            font-weight: ${CYBERPUNK_DOS_TOKENS.typography.weights.normal};
            color: ${isDarkMode ? 'rgba(0, 255, 65, 0.7)' : 'rgba(0, 150, 40, 0.8)'};
            margin-top: ${CYBERPUNK_DOS_TOKENS.spacing.md};
            letter-spacing: 0.02em;
            opacity: 0.9;
            transition: all ${CYBERPUNK_DOS_TOKENS.animations.duration.normal} ${CYBERPUNK_DOS_TOKENS.animations.easing.easeOut};
        }
        
        .unified-innovation-lab-icon {
            font-size: ${CYBERPUNK_DOS_TOKENS.typography.sizes['2xl']};
            margin-right: ${CYBERPUNK_DOS_TOKENS.spacing.md};
            filter: ${isDarkMode ? 
                `drop-shadow(0 0 8px ${CYBERPUNK_DOS_TOKENS.colors.matrix.glow})` :
                `drop-shadow(0 0 4px ${CYBERPUNK_DOS_TOKENS.colors.matrix.light})`};
        }
        
        /* Unified Cyberpunk DOS Container System */
        .unified-cyberpunk-dos-container {
            background: ${isDarkMode ?
                `linear-gradient(135deg, 
                    rgba(0, 0, 0, 0.95) 0%, 
                    rgba(0, 20, 0, 0.9) 50%, 
                    rgba(0, 0, 0, 0.95) 100%)` :
                `linear-gradient(135deg, 
                    rgba(255, 255, 255, 0.95) 0%, 
                    rgba(240, 255, 240, 0.9) 50%, 
                    rgba(255, 255, 255, 0.95) 100%)`};
            border: 2px solid ${isDarkMode ? CYBERPUNK_DOS_TOKENS.colors.cyberpunk.primary : CYBERPUNK_DOS_TOKENS.colors.cyberpunk.secondary};
            border-radius: 12px;
            padding: ${CYBERPUNK_DOS_TOKENS.spacing['2xl']};
            margin: ${CYBERPUNK_DOS_TOKENS.spacing.xl} auto;
            max-width: 1200px;
            position: relative;
            overflow: hidden;
            box-shadow: ${isDarkMode ?
                `0 0 30px rgba(0, 255, 65, 0.3), 
                 inset 0 0 30px rgba(0, 255, 65, 0.05)` :
                `0 0 20px rgba(0, 200, 50, 0.2), 
                 inset 0 0 20px rgba(0, 200, 50, 0.03)`};
            transition: all ${CYBERPUNK_DOS_TOKENS.animations.duration.normal} ${CYBERPUNK_DOS_TOKENS.animations.easing.easeOut};
        }
        
        .unified-cyberpunk-dos-container:hover {
            transform: translateY(-2px);
            box-shadow: ${isDarkMode ?
                `0 0 40px rgba(0, 255, 65, 0.4), 
                 inset 0 0 40px rgba(0, 255, 65, 0.08)` :
                `0 0 30px rgba(0, 200, 50, 0.3), 
                 inset 0 0 30px rgba(0, 200, 50, 0.05)`};
        }
        
        .unified-cyberpunk-dos-container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            opacity: ${isDarkMode ? 0.1 : 0.05};
            background-image: linear-gradient(${CYBERPUNK_DOS_TOKENS.colors.cyberpunk.primary} 1px, transparent 1px),
                             linear-gradient(90deg, ${CYBERPUNK_DOS_TOKENS.colors.cyberpunk.primary} 1px, transparent 1px);
            background-size: 20px 20px;
            animation: matrix-grid 20s linear infinite;
            pointer-events: none;
        }
        
        /* Corner Accents */
        .unified-cyberpunk-dos-container::after {
            content: '';
            position: absolute;
            top: 10px;
            left: 10px;
            width: 20px;
            height: 20px;
            border-top: 2px solid ${CYBERPUNK_DOS_TOKENS.colors.cyberpunk.primary};
            border-left: 2px solid ${CYBERPUNK_DOS_TOKENS.colors.cyberpunk.primary};
            pointer-events: none;
        }
        
        /* Theme Toggle Awareness */
        body.dark .unified-innovation-lab-header,
        body.dark .unified-innovation-lab-title,
        body.dark .unified-innovation-lab-subtitle,
        body.dark .unified-cyberpunk-dos-container {
            /* Dark mode styles are already applied via CSS variables above */
        }
        
        body:not(.dark) .unified-innovation-lab-header,
        body:not(.dark) .unified-innovation-lab-title,
        body:not(.dark) .unified-innovation-lab-subtitle,
        body:not(.dark) .unified-cyberpunk-dos-container {
            /* Light mode styles are already applied via CSS variables above */
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
            .unified-innovation-lab-title {
                font-size: ${CYBERPUNK_DOS_TOKENS.typography.sizes['2xl']};
            }
            
            .unified-innovation-lab-subtitle {
                font-size: ${CYBERPUNK_DOS_TOKENS.typography.sizes.base};
            }
            
            .unified-cyberpunk-dos-container {
                padding: ${CYBERPUNK_DOS_TOKENS.spacing.lg};
                margin: ${CYBERPUNK_DOS_TOKENS.spacing.md} auto;
            }
        }
    `;
    
    // Inject the unified CSS
    const styleElement = document.createElement('style');
    styleElement.setAttribute('data-cyberpunk-dos', 'unified');
    styleElement.textContent = unifiedCSS;
    document.head.appendChild(styleElement);
    
    console.log('✅ CSS INJECTION: Unified cyberpunk DOS styles injected successfully');
}

// ====================================================================
// 5. THEME TOGGLE AWARENESS SYSTEM
// ====================================================================

function setupThemeToggleAwareness() {
    console.log('🌙 THEME AWARENESS: Setting up theme toggle awareness system...');
    
    // Watch for theme changes
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const target = mutation.target;
                if (target === document.body) {
                    console.log('🌙 THEME CHANGE: Theme toggle detected, updating cyberpunk DOS styles...');
                    
                    // Re-inject CSS with new theme
                    setTimeout(() => {
                        injectUnifiedCyberpunkCSS();
                        applyUnifiedStylesToExistingElements();
                    }, 100);
                }
            }
        });
    });
    
    observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['class']
    });
    
    console.log('✅ THEME AWARENESS: Theme toggle awareness system established');
}

// ====================================================================
// 6. APPLY STYLES TO EXISTING ELEMENTS
// ====================================================================

function applyUnifiedStylesToExistingElements() {
    console.log('🎨 STYLE APPLICATION: Applying unified styles to existing elements...');
    
    // Apply to Innovation Lab headers
    const innovationLabHeaders = document.querySelectorAll('h1, h2, h3');
    innovationLabHeaders.forEach(header => {
        if (header.textContent.includes('Innovation Laboratory') || 
            header.textContent.includes('Innovation Lab')) {
            header.className = 'unified-innovation-lab-title';
        }
    });
    
    // Apply to Innovation Lab subtitles
    const subtitles = document.querySelectorAll('p');
    subtitles.forEach(subtitle => {
        if (subtitle.textContent.includes('Experimental features') ||
            subtitle.textContent.includes('future-state design patterns')) {
            subtitle.className = 'unified-innovation-lab-subtitle';
        }
    });
    
    // Apply to Innovation Lab containers
    const containers = document.querySelectorAll('#innovation-lab-foundation, .innovation-lab-container');
    containers.forEach(container => {
        container.classList.add('unified-cyberpunk-dos-container');
    });
    
    console.log('✅ STYLE APPLICATION: Unified styles applied to existing elements');
}

// ====================================================================
// 7. TROJAN HORSE INTEGRATION
// ====================================================================

function integrateTrojanHorseSystem() {
    console.log('🐴 TROJAN HORSE: Integrating with Trojan Horse Feed system...');
    
    // Apply unified styling to Trojan Horse Feed elements
    const trojanHorseElements = document.querySelectorAll('[class*="trojan"], [id*="trojan"]');
    trojanHorseElements.forEach(element => {
        // Apply cyberpunk DOS styling to Trojan Horse elements
        if (element.classList.contains('feed') || element.textContent.includes('TrojanHorse Feed')) {
            element.style.fontFamily = CYBERPUNK_DOS_TOKENS.typography.fonts.mono;
            element.style.color = document.body.classList.contains('dark') ? 
                CYBERPUNK_DOS_TOKENS.colors.cyberpunk.primary : 
                CYBERPUNK_DOS_TOKENS.colors.cyberpunk.secondary;
        }
    });
    
    console.log('✅ TROJAN HORSE: Integration complete');
}

// ====================================================================
// 8. INITIALIZATION AND ORCHESTRATION
// ====================================================================

function initializeUnifiedCyberpunkDOSArchitecture() {
    console.log('🚀 UNIFIED CYBERPUNK DOS: Initializing complete architecture...');
    
    try {
        // 1. Inject unified CSS
        injectUnifiedCyberpunkCSS();
        
        // 2. Apply styles to existing elements
        applyUnifiedStylesToExistingElements();
        
        // 3. Setup theme toggle awareness
        setupThemeToggleAwareness();
        
        // 4. Integrate with Trojan Horse system
        integrateTrojanHorseSystem();
        
        console.log('🎯 UNIFIED CYBERPUNK DOS: Architecture initialization complete');
        console.log('📋 FEATURES ACTIVATED:');
        console.log('  ✅ Unified header/subhead styling with theme awareness');
        console.log('  ✅ Cyberpunk DOS entry-point containers');
        console.log('  ✅ Single source of truth CSS architecture');
        console.log('  ✅ Theme toggle awareness system');
        console.log('  ✅ Trojan Horse system integration');
        console.log('  ✅ Responsive design and animations');
        
        return true;
        
    } catch (error) {
        console.error('❌ UNIFIED CYBERPUNK DOS: Initialization error:', error);
        return false;
    }
}

// ====================================================================
// 9. GLOBAL EXPOSURE AND AUTO-INITIALIZATION
// ====================================================================

// Make functions globally available
window.CYBERPUNK_DOS_TOKENS = CYBERPUNK_DOS_TOKENS;
window.initializeUnifiedCyberpunkDOSArchitecture = initializeUnifiedCyberpunkDOSArchitecture;
window.injectUnifiedCyberpunkCSS = injectUnifiedCyberpunkCSS;
window.applyUnifiedStylesToExistingElements = applyUnifiedStylesToExistingElements;

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeUnifiedCyberpunkDOSArchitecture);
} else {
    // DOM is already loaded
    setTimeout(initializeUnifiedCyberpunkDOSArchitecture, 100);
}

console.log('🎯 UNIFIED CYBERPUNK DOS CSS ARCHITECTURE: Ready for deployment');
