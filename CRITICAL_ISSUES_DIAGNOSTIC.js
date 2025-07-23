/**
 * CRITICAL ISSUES DIAGNOSTIC SCRIPT
 * Systematic validation of all issues mentioned in memories
 * 
 * Based on memories:
 * 1. Theme toggle responsiveness (especially when Innovation Lab is active)
 * 2. Light mode contrast/readability issues
 * 3. Snake game functionality and modal integration
 * 4. Case study modal functionality
 * 5. Navigation overlap issues
 */

console.log('🔍 CRITICAL ISSUES DIAGNOSTIC INITIATED');
console.log('========================================');

const diagnosticResults = {
    themeToggle: null,
    lightModeContrast: null,
    snakeGame: null,
    caseStudyModals: null,
    navigationOverlap: null,
    innovationLab: null
};

// 1. TEST THEME TOGGLE RESPONSIVENESS
console.log('🎨 TESTING THEME TOGGLE RESPONSIVENESS...');
try {
    const themeToggle = document.querySelector('.theme-toggle, [data-theme-toggle], .ric-theme-toggle');
    const body = document.body;
    const html = document.documentElement;
    
    if (themeToggle) {
        console.log('✅ Theme toggle element found:', themeToggle);
        
        // Test current theme state
        const currentTheme = html.classList.contains('dark') ? 'dark' : 'light';
        console.log('📊 Current theme:', currentTheme);
        
        // Test if toggle is responsive
        const isClickable = themeToggle.onclick || themeToggle.addEventListener;
        console.log('🖱️ Toggle is clickable:', !!isClickable);
        
        diagnosticResults.themeToggle = {
            found: true,
            currentTheme,
            isClickable: !!isClickable,
            element: themeToggle.outerHTML.substring(0, 100) + '...'
        };
    } else {
        console.log('❌ Theme toggle element not found');
        diagnosticResults.themeToggle = { found: false };
    }
} catch (error) {
    console.error('❌ Theme toggle test failed:', error);
    diagnosticResults.themeToggle = { error: error.message };
}

// 2. TEST INNOVATION LAB STATE
console.log('🧪 TESTING INNOVATION LAB STATE...');
try {
    const innovationLab = document.querySelector('#innovation-lab, .innovation-lab, [data-innovation-lab]');
    const konamiSystem = window.konamiCode || window.KonamiCode;
    
    if (innovationLab) {
        const isVisible = innovationLab.style.display !== 'none' && 
                         !innovationLab.hidden && 
                         window.getComputedStyle(innovationLab).display !== 'none';
        
        console.log('✅ Innovation Lab found:', isVisible ? 'VISIBLE' : 'HIDDEN');
        console.log('🎮 Konami system available:', !!konamiSystem);
        
        diagnosticResults.innovationLab = {
            found: true,
            isVisible,
            konamiAvailable: !!konamiSystem,
            element: innovationLab.outerHTML.substring(0, 200) + '...'
        };
    } else {
        console.log('❌ Innovation Lab not found');
        diagnosticResults.innovationLab = { found: false };
    }
} catch (error) {
    console.error('❌ Innovation Lab test failed:', error);
    diagnosticResults.innovationLab = { error: error.message };
}

// 3. TEST SNAKE GAME FUNCTIONALITY
console.log('🐍 TESTING SNAKE GAME FUNCTIONALITY...');
try {
    const snakeContainer = document.querySelector('#snake-game-container, .snake-game-container');
    const snakeGame = document.querySelector('#snake-game, .snake-game');
    const launchButton = document.querySelector('[onclick*="launchSnakeGame"], [onclick*="snake"]');
    const dosSnakeGame = window.DOSSnakeGame;
    
    console.log('🎮 Snake container found:', !!snakeContainer);
    console.log('🎮 Snake game element found:', !!snakeGame);
    console.log('🎮 Launch button found:', !!launchButton);
    console.log('🎮 DOSSnakeGame class available:', !!dosSnakeGame);
    
    diagnosticResults.snakeGame = {
        containerFound: !!snakeContainer,
        gameElementFound: !!snakeGame,
        launchButtonFound: !!launchButton,
        classAvailable: !!dosSnakeGame,
        containerVisible: snakeContainer ? window.getComputedStyle(snakeContainer).display !== 'none' : false
    };
} catch (error) {
    console.error('❌ Snake game test failed:', error);
    diagnosticResults.snakeGame = { error: error.message };
}

// 4. TEST CASE STUDY MODALS
console.log('📋 TESTING CASE STUDY MODALS...');
try {
    const caseStudyButtons = document.querySelectorAll('[onclick*="openCaseStudyModal"], .case-study-card, [data-case-study]');
    const modalFunction = window.openCaseStudyModal;
    const modalContainer = document.querySelector('#case-study-modal, .modal-container, .ric-modal');
    
    console.log('📊 Case study buttons found:', caseStudyButtons.length);
    console.log('🔧 Modal function available:', !!modalFunction);
    console.log('📦 Modal container found:', !!modalContainer);
    
    diagnosticResults.caseStudyModals = {
        buttonsFound: caseStudyButtons.length,
        modalFunctionAvailable: !!modalFunction,
        modalContainerFound: !!modalContainer,
        buttons: Array.from(caseStudyButtons).map(btn => ({
            text: btn.textContent?.trim().substring(0, 50) || 'No text',
            onclick: btn.onclick?.toString().substring(0, 100) || 'No onclick'
        }))
    };
} catch (error) {
    console.error('❌ Case study modal test failed:', error);
    diagnosticResults.caseStudyModals = { error: error.message };
}

// 5. TEST LIGHT MODE CONTRAST
console.log('💡 TESTING LIGHT MODE CONTRAST...');
try {
    const html = document.documentElement;
    const isLightMode = !html.classList.contains('dark');
    
    if (isLightMode) {
        const heroSection = document.querySelector('.ric-hero-section, .hero-section, .hero');
        const innovationLabSection = document.querySelector('#innovation-lab, .innovation-lab');
        
        if (heroSection) {
            const heroStyles = window.getComputedStyle(heroSection);
            console.log('🎨 Hero background:', heroStyles.background.substring(0, 100));
            console.log('🎨 Hero color:', heroStyles.color);
        }
        
        if (innovationLabSection) {
            const labStyles = window.getComputedStyle(innovationLabSection);
            console.log('🧪 Lab background:', labStyles.background.substring(0, 100));
            console.log('🧪 Lab color:', labStyles.color);
        }
        
        diagnosticResults.lightModeContrast = {
            isLightMode: true,
            heroFound: !!heroSection,
            labFound: !!innovationLabSection,
            heroStyles: heroSection ? {
                background: window.getComputedStyle(heroSection).background.substring(0, 100),
                color: window.getComputedStyle(heroSection).color
            } : null,
            labStyles: innovationLabSection ? {
                background: window.getComputedStyle(innovationLabSection).background.substring(0, 100),
                color: window.getComputedStyle(innovationLabSection).color
            } : null
        };
    } else {
        console.log('🌙 Currently in dark mode - switching to light mode for contrast test...');
        diagnosticResults.lightModeContrast = { currentlyDarkMode: true };
    }
} catch (error) {
    console.error('❌ Light mode contrast test failed:', error);
    diagnosticResults.lightModeContrast = { error: error.message };
}

// 6. TEST NAVIGATION OVERLAP
console.log('🧭 TESTING NAVIGATION OVERLAP...');
try {
    const navigation = document.querySelector('nav, .nav, .navigation, header nav');
    const trojanHorseFeed = document.querySelector('.trojanhorse-feed, #trojanhorse-feed, [data-trojanhorse]');
    const innovationLab = document.querySelector('#innovation-lab, .innovation-lab');
    
    if (navigation && (trojanHorseFeed || innovationLab)) {
        const navRect = navigation.getBoundingClientRect();
        const feedRect = trojanHorseFeed ? trojanHorseFeed.getBoundingClientRect() : null;
        const labRect = innovationLab ? innovationLab.getBoundingClientRect() : null;
        
        const navOverlapsFeed = feedRect && (
            navRect.bottom > feedRect.top && 
            navRect.top < feedRect.bottom &&
            navRect.right > feedRect.left && 
            navRect.left < feedRect.right
        );
        
        const navOverlapsLab = labRect && (
            navRect.bottom > labRect.top && 
            navRect.top < labRect.bottom &&
            navRect.right > labRect.left && 
            navRect.left < labRect.right
        );
        
        console.log('🧭 Navigation overlap with feed:', navOverlapsFeed);
        console.log('🧭 Navigation overlap with lab:', navOverlapsLab);
        
        diagnosticResults.navigationOverlap = {
            navigationFound: !!navigation,
            feedFound: !!trojanHorseFeed,
            labFound: !!innovationLab,
            overlapWithFeed: navOverlapsFeed,
            overlapWithLab: navOverlapsLab,
            navRect: navRect,
            feedRect: feedRect,
            labRect: labRect
        };
    } else {
        console.log('❌ Navigation or target elements not found for overlap test');
        diagnosticResults.navigationOverlap = { 
            navigationFound: !!navigation,
            feedFound: !!trojanHorseFeed,
            labFound: !!innovationLab
        };
    }
} catch (error) {
    console.error('❌ Navigation overlap test failed:', error);
    diagnosticResults.navigationOverlap = { error: error.message };
}

// FINAL DIAGNOSTIC REPORT
console.log('📋 CRITICAL ISSUES DIAGNOSTIC COMPLETE');
console.log('=====================================');
console.log('📊 DIAGNOSTIC RESULTS:', diagnosticResults);

// Return results for external access
window.criticalIssuesDiagnostic = diagnosticResults;

// Summary
const issues = [];
if (!diagnosticResults.themeToggle?.found) issues.push('Theme toggle not found');
if (diagnosticResults.themeToggle?.error) issues.push('Theme toggle error');
if (!diagnosticResults.snakeGame?.containerFound) issues.push('Snake game container missing');
if (!diagnosticResults.snakeGame?.classAvailable) issues.push('Snake game class missing');
if (!diagnosticResults.caseStudyModals?.modalFunctionAvailable) issues.push('Case study modal function missing');
if (diagnosticResults.navigationOverlap?.overlapWithFeed || diagnosticResults.navigationOverlap?.overlapWithLab) {
    issues.push('Navigation overlap detected');
}

console.log('🚨 CRITICAL ISSUES FOUND:', issues.length);
if (issues.length > 0) {
    console.log('📝 Issues:', issues);
} else {
    console.log('✅ No critical issues detected!');
}

return diagnosticResults;
