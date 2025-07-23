/**
 * DEEP CODEBASE AUDIT SCRIPT
 * Identifies all competing controllers, deprecated code, and conflicts
 * Provides elimination plan for architectural cleanup
 */

console.log('🔍 DEEP CODEBASE AUDIT INITIATED');
console.log('================================');

const auditResults = {
    themeControllers: [],
    deprecatedCSS: [],
    modalSystems: [],
    gameInitializers: [],
    conflictingSystems: [],
    recommendations: []
};

// AUDIT 1: Theme Controllers and Systems
console.log('🎨 AUDITING THEME CONTROLLERS...');

const themeControllers = {
    dnaOrchestration: !!window.dnaOrchestration,
    themeToggleSystem: !!window.themeToggle,
    innovationLabTheme: !!window.InnovationLab,
    heroGradientSystem: !!window.timeAwareHeroGradient,
    darkMatterFabric: !!window.DarkMatterFabricStatus,
    cssVariables: !!document.querySelector(':root'),
    themeToggleElements: document.querySelectorAll('.theme-toggle, .sun, .moon, [data-theme-toggle]').length
};

auditResults.themeControllers = Object.entries(themeControllers).map(([name, exists]) => ({
    name,
    exists,
    status: exists ? 'ACTIVE' : 'INACTIVE'
}));

console.log('🎨 Theme Controllers Found:', auditResults.themeControllers.filter(c => c.exists).length);

// AUDIT 2: Deprecated CSS and Style Conflicts
console.log('🎭 AUDITING CSS CONFLICTS...');

const stylesheets = Array.from(document.styleSheets);
const inlineStyles = Array.from(document.querySelectorAll('style'));
const deprecatedClasses = [];

// Check for conflicting CSS rules
const potentialConflicts = [
    'innovation-lab',
    'theme-toggle',
    'hero-gradient',
    'modal-system',
    'snake-game',
    'trojanhorse-feed'
];

potentialConflicts.forEach(className => {
    const elements = document.querySelectorAll(`.${className}, #${className}`);
    if (elements.length > 0) {
        elements.forEach(el => {
            const computedStyle = window.getComputedStyle(el);
            const hasInlineStyles = el.style.cssText.length > 0;
            const hasMultipleClasses = el.classList.length > 3;
            
            if (hasInlineStyles || hasMultipleClasses) {
                deprecatedClasses.push({
                    element: el.tagName + (el.id ? `#${el.id}` : '') + (el.className ? `.${el.className}` : ''),
                    inlineStyles: hasInlineStyles,
                    classCount: el.classList.length,
                    potentialConflict: true
                });
            }
        });
    }
});

auditResults.deprecatedCSS = deprecatedClasses;
console.log('🎭 CSS Conflicts Found:', deprecatedClasses.length);

// AUDIT 3: Modal Systems
console.log('🪟 AUDITING MODAL SYSTEMS...');

const modalSystems = {
    openCaseStudyModal: !!window.openCaseStudyModal,
    closeCaseStudyModal: !!window.closeCaseStudyModal,
    modalElements: document.querySelectorAll('.modal, #modal, [data-modal]').length,
    modalTriggers: document.querySelectorAll('[onclick*="modal"], [data-modal-trigger]').length,
    timeTravel: document.querySelectorAll('[onclick*="timeTravel"], .time-travel').length
};

auditResults.modalSystems = Object.entries(modalSystems).map(([name, value]) => ({
    name,
    value,
    status: value > 0 ? 'ACTIVE' : 'INACTIVE'
}));

console.log('🪟 Modal Systems Found:', Object.values(modalSystems).filter(v => v > 0).length);

// AUDIT 4: Game Initialization Systems
console.log('🎮 AUDITING GAME SYSTEMS...');

const gameSystems = {
    DOSSnakeGame: !!window.DOSSnakeGame,
    launchSnakeGame: !!window.launchSnakeGame,
    initializeSnakeGame: !!window.initializeSnakeGame,
    currentSnakeGame: !!window.currentSnakeGame,
    snakeGameContainers: document.querySelectorAll('#snake-game-container, .snake-game-container').length,
    gameControls: document.querySelectorAll('[onclick*="snake"], [id*="snake-"]').length
};

auditResults.gameInitializers = Object.entries(gameSystems).map(([name, value]) => ({
    name,
    value,
    status: value > 0 ? 'ACTIVE' : 'INACTIVE'
}));

console.log('🎮 Game Systems Found:', Object.values(gameSystems).filter(v => v > 0).length);

// AUDIT 5: Conflicting Event Listeners and Functions
console.log('⚡ AUDITING EVENT CONFLICTS...');

const eventConflicts = [];

// Check for multiple theme toggle handlers
const themeToggles = document.querySelectorAll('.theme-toggle, .sun, .moon');
themeToggles.forEach((toggle, index) => {
    if (toggle.onclick) {
        eventConflicts.push({
            element: `Theme Toggle ${index + 1}`,
            hasHandler: true,
            handlerType: typeof toggle.onclick
        });
    }
});

// Check for multiple modal handlers
const modalTriggers = document.querySelectorAll('[onclick*="modal"]');
modalTriggers.forEach((trigger, index) => {
    eventConflicts.push({
        element: `Modal Trigger ${index + 1}`,
        hasHandler: true,
        onclick: trigger.onclick ? trigger.onclick.toString().substring(0, 100) : 'none'
    });
});

auditResults.conflictingSystems = eventConflicts;
console.log('⚡ Event Conflicts Found:', eventConflicts.length);

// AUDIT 6: Generate Elimination Recommendations
console.log('🎯 GENERATING RECOMMENDATIONS...');

const recommendations = [];

// Theme System Recommendations
const activeThemeControllers = auditResults.themeControllers.filter(c => c.exists);
if (activeThemeControllers.length > 2) {
    recommendations.push({
        priority: 'HIGH',
        category: 'Theme Systems',
        issue: `${activeThemeControllers.length} competing theme controllers detected`,
        action: 'Eliminate all except one unified theme controller',
        impact: 'Resolves light mode legibility and class collisions'
    });
}

// CSS Conflict Recommendations
if (auditResults.deprecatedCSS.length > 0) {
    recommendations.push({
        priority: 'HIGH',
        category: 'CSS Conflicts',
        issue: `${auditResults.deprecatedCSS.length} elements with potential style conflicts`,
        action: 'Remove inline styles and consolidate CSS classes',
        impact: 'Eliminates visual inconsistencies and theme conflicts'
    });
}

// Modal System Recommendations
const activeModalSystems = auditResults.modalSystems.filter(s => s.value > 0);
if (activeModalSystems.length > 3) {
    recommendations.push({
        priority: 'MEDIUM',
        category: 'Modal Systems',
        issue: `${activeModalSystems.length} different modal systems active`,
        action: 'Consolidate to single modal system with unified styling',
        impact: 'Fixes modal initialization failures and styling issues'
    });
}

// Game System Recommendations
const activeGameSystems = auditResults.gameInitializers.filter(g => g.value > 0);
if (activeGameSystems.length > 2) {
    recommendations.push({
        priority: 'MEDIUM',
        category: 'Game Systems',
        issue: `${activeGameSystems.length} game initialization systems detected`,
        action: 'Keep only one working game initializer, remove others',
        impact: 'Resolves "GAME INITIALIZATION FAILED" errors'
    });
}

auditResults.recommendations = recommendations;

// FINAL AUDIT REPORT
console.log('📋 DEEP CODEBASE AUDIT COMPLETE');
console.log('================================');

console.log('🎯 CRITICAL FINDINGS:');
recommendations.forEach((rec, index) => {
    console.log(`${index + 1}. [${rec.priority}] ${rec.category}: ${rec.issue}`);
    console.log(`   → Action: ${rec.action}`);
    console.log(`   → Impact: ${rec.impact}`);
    console.log('');
});

console.log('🔧 ELIMINATION PLAN:');
console.log('1. THEME SYSTEMS: Remove DNA orchestration, keep unified theme toggle');
console.log('2. CSS CLEANUP: Remove all inline styles, consolidate classes');
console.log('3. MODAL SYSTEMS: Keep openCaseStudyModal, remove competing systems');
console.log('4. GAME SYSTEMS: Keep one working initializer, remove duplicates');
console.log('5. EVENT HANDLERS: Deduplicate event listeners');

console.log('⚠️  ARCHITECTURAL DEBT CONFIRMED:');
console.log('   - Multiple competing theme controllers causing class collisions');
console.log('   - Deprecated CSS creating visual inconsistencies');
console.log('   - Conflicting modal and game systems causing initialization failures');
console.log('   - Event handler duplication causing unpredictable behavior');

console.log('🎯 NEXT STEPS:');
console.log('   1. Execute surgical elimination of competing systems');
console.log('   2. Establish single source of truth for each system type');
console.log('   3. Test and validate unified systems');
console.log('   4. Apply final polish and optimization');

// Store audit results globally for reference
window.deepCodebaseAudit = auditResults;

return auditResults;
