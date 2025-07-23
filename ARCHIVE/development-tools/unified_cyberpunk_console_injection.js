// UNIFIED CYBERPUNK DOS CSS ARCHITECTURE - Browser Console Injection
console.log('🎯 UNIFIED CYBERPUNK DOS: Injecting CSS Architecture...');

// Cyberpunk DOS Design Tokens
const CYBERPUNK_DOS_TOKENS = {
    colors: {
        cyberpunk: { primary: '#00ff41', secondary: '#00c832', accent: '#39ff14' },
        matrix: { light: 'rgba(0, 255, 65, 0.1)', medium: 'rgba(0, 255, 65, 0.2)', glow: 'rgba(0, 255, 65, 0.6)' },
        terminal: { darkBorder: '#00ff41', lightBorder: 'rgba(0, 200, 50, 0.4)' }
    },
    typography: {
        fonts: { mono: "'JetBrains Mono', 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace" },
        sizes: { lg: '1.125rem', xl: '1.25rem', '2xl': '1.5rem', '3xl': '1.875rem' }
    },
    spacing: { md: '0.75rem', lg: '1rem', xl: '1.5rem', '2xl': '2rem' }
};

function injectUnifiedCyberpunkCSS() {
    const existingStyles = document.querySelectorAll('style[data-cyberpunk-dos]');
    existingStyles.forEach(style => style.remove());
    
    const isDarkMode = document.body.classList.contains('dark');
    
    const unifiedCSS = `
        @keyframes matrix-grid { 0% { transform: translateY(0); } 100% { transform: translateY(20px); } }
        @keyframes cyberpunk-glow { 
            0%, 100% { text-shadow: 0 0 10px ${CYBERPUNK_DOS_TOKENS.colors.matrix.glow}; }
            50% { text-shadow: 0 0 20px ${CYBERPUNK_DOS_TOKENS.colors.matrix.glow}, 0 0 30px ${CYBERPUNK_DOS_TOKENS.colors.matrix.medium}; }
        }
        
        .unified-innovation-lab-header {
            padding: ${CYBERPUNK_DOS_TOKENS.spacing['2xl']} 0;
            text-align: center;
            background: ${isDarkMode ? 
                'linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(0, 20, 0, 0.8) 100%)' :
                'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 255, 240, 0.8) 100%)'};
            border-top: 1px solid ${isDarkMode ? CYBERPUNK_DOS_TOKENS.colors.terminal.darkBorder : CYBERPUNK_DOS_TOKENS.colors.terminal.lightBorder};
            border-bottom: 1px solid ${isDarkMode ? CYBERPUNK_DOS_TOKENS.colors.terminal.darkBorder : CYBERPUNK_DOS_TOKENS.colors.terminal.lightBorder};
            transition: all 0.3s ease;
        }
        
        .unified-innovation-lab-title {
            font-size: ${CYBERPUNK_DOS_TOKENS.typography.sizes['3xl']};
            font-family: ${CYBERPUNK_DOS_TOKENS.typography.fonts.mono};
            font-weight: 700;
            color: ${isDarkMode ? CYBERPUNK_DOS_TOKENS.colors.cyberpunk.primary : CYBERPUNK_DOS_TOKENS.colors.cyberpunk.secondary};
            text-shadow: ${isDarkMode ? 
                `0 0 10px ${CYBERPUNK_DOS_TOKENS.colors.matrix.glow}, 0 0 20px ${CYBERPUNK_DOS_TOKENS.colors.matrix.medium}` :
                `0 0 5px ${CYBERPUNK_DOS_TOKENS.colors.matrix.light}`};
            letter-spacing: 0.05em;
            margin: 0;
            animation: cyberpunk-glow 3s ease-in-out infinite;
        }
        
        .unified-innovation-lab-subtitle {
            font-size: ${CYBERPUNK_DOS_TOKENS.typography.sizes.lg};
            font-family: ${CYBERPUNK_DOS_TOKENS.typography.fonts.mono};
            color: ${isDarkMode ? 'rgba(0, 255, 65, 0.7)' : 'rgba(0, 150, 40, 0.8)'};
            margin-top: ${CYBERPUNK_DOS_TOKENS.spacing.md};
            letter-spacing: 0.02em;
            opacity: 0.9;
        }
        
        .unified-cyberpunk-dos-container {
            background: ${isDarkMode ?
                'linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(0, 20, 0, 0.9) 50%, rgba(0, 0, 0, 0.95) 100%)' :
                'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 255, 240, 0.9) 50%, rgba(255, 255, 255, 0.95) 100%)'};
            border: 2px solid ${isDarkMode ? CYBERPUNK_DOS_TOKENS.colors.cyberpunk.primary : CYBERPUNK_DOS_TOKENS.colors.cyberpunk.secondary};
            border-radius: 12px;
            padding: ${CYBERPUNK_DOS_TOKENS.spacing['2xl']};
            margin: ${CYBERPUNK_DOS_TOKENS.spacing.xl} auto;
            max-width: 1200px;
            position: relative;
            overflow: hidden;
            box-shadow: ${isDarkMode ?
                '0 0 30px rgba(0, 255, 65, 0.3), inset 0 0 30px rgba(0, 255, 65, 0.05)' :
                '0 0 20px rgba(0, 200, 50, 0.2), inset 0 0 20px rgba(0, 200, 50, 0.03)'};
            transition: all 0.3s ease;
        }
        
        .unified-cyberpunk-dos-container:hover {
            transform: translateY(-2px);
            box-shadow: ${isDarkMode ?
                '0 0 40px rgba(0, 255, 65, 0.4), inset 0 0 40px rgba(0, 255, 65, 0.08)' :
                '0 0 30px rgba(0, 200, 50, 0.3), inset 0 0 30px rgba(0, 200, 50, 0.05)'};
        }
        
        .unified-cyberpunk-dos-container::before {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            opacity: ${isDarkMode ? 0.1 : 0.05};
            background-image: linear-gradient(${CYBERPUNK_DOS_TOKENS.colors.cyberpunk.primary} 1px, transparent 1px),
                             linear-gradient(90deg, ${CYBERPUNK_DOS_TOKENS.colors.cyberpunk.primary} 1px, transparent 1px);
            background-size: 20px 20px;
            animation: matrix-grid 20s linear infinite;
            pointer-events: none;
        }
        
        .unified-cyberpunk-dos-container::after {
            content: '';
            position: absolute;
            top: 10px; left: 10px;
            width: 20px; height: 20px;
            border-top: 2px solid ${CYBERPUNK_DOS_TOKENS.colors.cyberpunk.primary};
            border-left: 2px solid ${CYBERPUNK_DOS_TOKENS.colors.cyberpunk.primary};
            pointer-events: none;
        }
        
        @media (max-width: 768px) {
            .unified-innovation-lab-title { font-size: ${CYBERPUNK_DOS_TOKENS.typography.sizes['2xl']}; }
            .unified-innovation-lab-subtitle { font-size: 1rem; }
            .unified-cyberpunk-dos-container { padding: ${CYBERPUNK_DOS_TOKENS.spacing.lg}; }
        }
    `;
    
    const styleElement = document.createElement('style');
    styleElement.setAttribute('data-cyberpunk-dos', 'unified');
    styleElement.textContent = unifiedCSS;
    document.head.appendChild(styleElement);
}

function applyUnifiedStylesToExistingElements() {
    // Apply to Innovation Lab headers
    const headers = document.querySelectorAll('h1, h2, h3');
    headers.forEach(header => {
        if (header.textContent.includes('Innovation Laboratory') || header.textContent.includes('Innovation Lab')) {
            header.className = 'unified-innovation-lab-title';
        }
    });
    
    // Apply to subtitles
    const subtitles = document.querySelectorAll('p');
    subtitles.forEach(subtitle => {
        if (subtitle.textContent.includes('Experimental features') || subtitle.textContent.includes('future-state design patterns')) {
            subtitle.className = 'unified-innovation-lab-subtitle';
        }
    });
    
    // Apply to containers
    const containers = document.querySelectorAll('#innovation-lab-foundation, .innovation-lab-container, #hidden-lab');
    containers.forEach(container => {
        container.classList.add('unified-cyberpunk-dos-container');
    });
    
    // Apply to header sections
    const headerSections = document.querySelectorAll('section');
    headerSections.forEach(section => {
        if (section.textContent.includes('Innovation Laboratory')) {
            section.classList.add('unified-innovation-lab-header');
        }
    });
}

function setupThemeToggleAwareness() {
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class' && mutation.target === document.body) {
                console.log('🌙 THEME CHANGE: Updating cyberpunk DOS styles...');
                setTimeout(() => {
                    injectUnifiedCyberpunkCSS();
                    applyUnifiedStylesToExistingElements();
                }, 100);
            }
        });
    });
    
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
}

function initializeUnifiedCyberpunkDOSArchitecture() {
    try {
        injectUnifiedCyberpunkCSS();
        applyUnifiedStylesToExistingElements();
        setupThemeToggleAwareness();
        
        console.log('🚀 UNIFIED CYBERPUNK DOS: Architecture active');
        console.log('📋 FEATURES: ✅ Unified headers ✅ Theme awareness ✅ DOS containers ✅ Animations');
        return true;
    } catch (error) {
        console.error('❌ UNIFIED CYBERPUNK DOS: Error:', error);
        return false;
    }
}

// Initialize immediately
initializeUnifiedCyberpunkDOSArchitecture();

// Make globally available
window.initializeUnifiedCyberpunkDOSArchitecture = initializeUnifiedCyberpunkDOSArchitecture;
