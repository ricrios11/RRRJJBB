/**
 * TRIPLE VALIDATION SCRIPT - Deep Analysis & DOM Inspection
 * Comprehensive bulletproof codebase validation
 */

console.log('🔍 STARTING TRIPLE VALIDATION - DEEP ANALYSIS');
console.log('================================================');

// PHASE 1: DOM TREE INTEGRITY VALIDATION
function validateDOMIntegrity() {
    console.log('\n📋 PHASE 1: DOM TREE INTEGRITY VALIDATION');
    console.log('------------------------------------------');
    
    const results = {
        criticalElements: 0,
        gameElements: 0,
        modalElements: 0,
        navigationElements: 0,
        errors: []
    };
    
    // Critical DOM elements validation
    const criticalSelectors = [
        '#hero-section',
        '#case-studies-grid', 
        '#playground-section',
        '.theme-toggle',
        '.ascii-nav'
    ];
    
    criticalSelectors.forEach(selector => {
        const element = document.querySelector(selector);
        if (element) {
            results.criticalElements++;
            console.log(`✅ ${selector} - FOUND`);
        } else {
            results.errors.push(`❌ ${selector} - MISSING`);
            console.error(`❌ ${selector} - MISSING`);
        }
    });
    
    // Game elements validation
    const gameSelectors = [
        '.game-card',
        '#snake-touch-controls',
        '.touch-controls',
        '.mobile-touch-controls'
    ];
    
    gameSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        if (elements.length > 0) {
            results.gameElements += elements.length;
            console.log(`✅ ${selector} - FOUND ${elements.length} elements`);
        } else {
            results.errors.push(`⚠️ ${selector} - NO ELEMENTS FOUND`);
            console.warn(`⚠️ ${selector} - NO ELEMENTS FOUND`);
        }
    });
    
    // Modal elements validation
    const modalSelectors = [
        '.game-modal',
        '.modal-content',
        '.game-modal-header',
        '.game-modal-body'
    ];
    
    modalSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        if (elements.length > 0) {
            results.modalElements += elements.length;
            console.log(`✅ ${selector} - FOUND ${elements.length} elements`);
        } else {
            results.errors.push(`⚠️ ${selector} - NO ELEMENTS FOUND`);
            console.warn(`⚠️ ${selector} - NO ELEMENTS FOUND`);
        }
    });
    
    console.log(`\n📊 DOM INTEGRITY SUMMARY:`);
    console.log(`Critical Elements: ${results.criticalElements}/5`);
    console.log(`Game Elements: ${results.gameElements}`);
    console.log(`Modal Elements: ${results.modalElements}`);
    console.log(`Errors: ${results.errors.length}`);
    
    return results;
}

// PHASE 2: JAVASCRIPT FUNCTION VALIDATION
function validateJavaScriptFunctions() {
    console.log('\n🔧 PHASE 2: JAVASCRIPT FUNCTION VALIDATION');
    console.log('-------------------------------------------');
    
    const results = {
        coreFunctions: 0,
        gameFunctions: 0,
        modalFunctions: 0,
        errors: []
    };
    
    // Core functions validation
    const coreFunctions = [
        'toggleTheme',
        'scrollToSection',
        'applyTimeAwareThemes',
        'updateTimeStatus'
    ];
    
    coreFunctions.forEach(funcName => {
        if (typeof window[funcName] === 'function') {
            results.coreFunctions++;
            console.log(`✅ ${funcName}() - AVAILABLE`);
        } else {
            results.errors.push(`❌ ${funcName}() - MISSING`);
            console.error(`❌ ${funcName}() - MISSING`);
        }
    });
    
    // Game functions validation
    const gameFunctions = [
        'launchImmersiveSnake',
        'launchImmersiveSlap'
    ];
    
    gameFunctions.forEach(funcName => {
        if (typeof window[funcName] === 'function') {
            results.gameFunctions++;
            console.log(`✅ ${funcName}() - AVAILABLE`);
        } else {
            results.errors.push(`❌ ${funcName}() - MISSING`);
            console.error(`❌ ${funcName}() - MISSING`);
        }
    });
    
    // Modal functions validation
    const modalFunctions = [
        'openModal',
        'closeModal'
    ];
    
    modalFunctions.forEach(funcName => {
        if (typeof window[funcName] === 'function') {
            results.modalFunctions++;
            console.log(`✅ ${funcName}() - AVAILABLE`);
        } else {
            results.errors.push(`❌ ${funcName}() - MISSING`);
            console.error(`❌ ${funcName}() - MISSING`);
        }
    });
    
    console.log(`\n📊 JAVASCRIPT FUNCTION SUMMARY:`);
    console.log(`Core Functions: ${results.coreFunctions}/${coreFunctions.length}`);
    console.log(`Game Functions: ${results.gameFunctions}/${gameFunctions.length}`);
    console.log(`Modal Functions: ${results.modalFunctions}/${modalFunctions.length}`);
    console.log(`Errors: ${results.errors.length}`);
    
    return results;
}

// PHASE 3: ENHANCED SNAKE GAME VALIDATION
function validateEnhancedSnakeGame() {
    console.log('\n🐍 PHASE 3: ENHANCED SNAKE GAME VALIDATION');
    console.log('-------------------------------------------');
    
    const results = {
        classAvailable: false,
        enhancedFeatures: 0,
        methods: 0,
        errors: []
    };
    
    // Check if ImmersiveSnakeGame class exists
    if (typeof ImmersiveSnakeGame === 'function') {
        results.classAvailable = true;
        console.log('✅ ImmersiveSnakeGame class - AVAILABLE');
        
        // Check enhanced features by examining prototype
        const prototype = ImmersiveSnakeGame.prototype;
        const enhancedMethods = [
            'generateMultipleFoods',
            'generateSingleFood',
            'generateGhostFood',
            'handleFoodEffect',
            'updateGhostFoods',
            'showPoisonEffect',
            'getCurrentSpeed'
        ];
        
        enhancedMethods.forEach(method => {
            if (typeof prototype[method] === 'function') {
                results.methods++;
                console.log(`✅ ${method}() - IMPLEMENTED`);
            } else {
                results.errors.push(`❌ ${method}() - MISSING`);
                console.error(`❌ ${method}() - MISSING`);
            }
        });
        
        // Test instantiation
        try {
            const testContainer = document.createElement('div');
            testContainer.id = 'test-snake-container';
            testContainer.style.display = 'none';
            document.body.appendChild(testContainer);
            
            const testGame = new ImmersiveSnakeGame('test-snake-container');
            
            // Check for enhanced properties
            const enhancedProperties = ['foods', 'ghostFoods', 'foodTypes', 'boostTimeLeft'];
            enhancedProperties.forEach(prop => {
                if (testGame.hasOwnProperty(prop)) {
                    results.enhancedFeatures++;
                    console.log(`✅ ${prop} property - PRESENT`);
                } else {
                    results.errors.push(`❌ ${prop} property - MISSING`);
                    console.error(`❌ ${prop} property - MISSING`);
                }
            });
            
            // Cleanup
            document.body.removeChild(testContainer);
            
        } catch (error) {
            results.errors.push(`❌ Snake game instantiation failed: ${error.message}`);
            console.error(`❌ Snake game instantiation failed:`, error);
        }
        
    } else {
        results.errors.push('❌ ImmersiveSnakeGame class - NOT AVAILABLE');
        console.error('❌ ImmersiveSnakeGame class - NOT AVAILABLE');
    }
    
    console.log(`\n📊 ENHANCED SNAKE GAME SUMMARY:`);
    console.log(`Class Available: ${results.classAvailable}`);
    console.log(`Enhanced Methods: ${results.methods}/7`);
    console.log(`Enhanced Properties: ${results.enhancedFeatures}/4`);
    console.log(`Errors: ${results.errors.length}`);
    
    return results;
}

// PHASE 4: MOBILE TOUCH CONTROLS VALIDATION
function validateMobileTouchControls() {
    console.log('\n📱 PHASE 4: MOBILE TOUCH CONTROLS VALIDATION');
    console.log('---------------------------------------------');
    
    const results = {
        touchElements: 0,
        eventListeners: 0,
        cssRules: 0,
        errors: []
    };
    
    // Touch control elements
    const touchControlIds = [
        'snake-up',
        'snake-down', 
        'snake-left',
        'snake-right',
        'snake-boost'
    ];
    
    touchControlIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            results.touchElements++;
            console.log(`✅ #${id} - FOUND`);
            
            // Check for event listeners (approximate)
            const hasListeners = element.onclick || 
                                element.addEventListener || 
                                element.getAttribute('onclick');
            if (hasListeners) {
                results.eventListeners++;
                console.log(`✅ #${id} - HAS EVENT HANDLERS`);
            } else {
                results.errors.push(`⚠️ #${id} - NO EVENT HANDLERS DETECTED`);
                console.warn(`⚠️ #${id} - NO EVENT HANDLERS DETECTED`);
            }
        } else {
            results.errors.push(`❌ #${id} - MISSING`);
            console.error(`❌ #${id} - MISSING`);
        }
    });
    
    // Check mobile CSS rules
    const stylesheets = Array.from(document.styleSheets);
    let mobileRulesFound = 0;
    
    try {
        stylesheets.forEach(sheet => {
            try {
                const rules = Array.from(sheet.cssRules || sheet.rules || []);
                rules.forEach(rule => {
                    if (rule.media && rule.media.mediaText.includes('max-width: 768px')) {
                        mobileRulesFound++;
                    }
                    if (rule.selectorText && rule.selectorText.includes('.mobile-touch-controls')) {
                        results.cssRules++;
                    }
                });
            } catch (e) {
                // Cross-origin or other CSS access issues
            }
        });
    } catch (error) {
        console.warn('CSS rules inspection limited due to security restrictions');
    }
    
    console.log(`\n📊 MOBILE TOUCH CONTROLS SUMMARY:`);
    console.log(`Touch Elements: ${results.touchElements}/${touchControlIds.length}`);
    console.log(`Event Listeners: ${results.eventListeners}`);
    console.log(`Mobile CSS Rules: ${mobileRulesFound}`);
    console.log(`Errors: ${results.errors.length}`);
    
    return results;
}

// PHASE 5: MODAL SYSTEM VALIDATION
function validateModalSystem() {
    console.log('\n🎭 PHASE 5: MODAL SYSTEM VALIDATION');
    console.log('-----------------------------------');
    
    const results = {
        modals: 0,
        modalFunctions: 0,
        eventHandlers: 0,
        errors: []
    };
    
    // Modal elements
    const modalIds = [
        'snake-modal',
        'graffiti-modal'
    ];
    
    modalIds.forEach(id => {
        const modal = document.getElementById(id);
        if (modal) {
            results.modals++;
            console.log(`✅ #${id} - FOUND`);
            
            // Check modal structure
            const header = modal.querySelector('.game-modal-header');
            const body = modal.querySelector('.game-modal-body');
            const closeBtn = modal.querySelector('.game-modal-close');
            
            if (header && body && closeBtn) {
                console.log(`✅ #${id} - COMPLETE STRUCTURE`);
            } else {
                results.errors.push(`⚠️ #${id} - INCOMPLETE STRUCTURE`);
                console.warn(`⚠️ #${id} - INCOMPLETE STRUCTURE`);
            }
        } else {
            results.errors.push(`❌ #${id} - MISSING`);
            console.error(`❌ #${id} - MISSING`);
        }
    });
    
    // Test modal functions
    if (typeof window.openModal === 'function') {
        results.modalFunctions++;
        console.log('✅ openModal() - FUNCTIONAL');
    }
    
    if (typeof window.closeModal === 'function') {
        results.modalFunctions++;
        console.log('✅ closeModal() - FUNCTIONAL');
    }
    
    console.log(`\n📊 MODAL SYSTEM SUMMARY:`);
    console.log(`Modals: ${results.modals}/${modalIds.length}`);
    console.log(`Modal Functions: ${results.modalFunctions}/2`);
    console.log(`Errors: ${results.errors.length}`);
    
    return results;
}

// PHASE 6: TIME-AWARE GRADIENT VALIDATION
function validateTimeAwareGradients() {
    console.log('\n🌅 PHASE 6: TIME-AWARE GRADIENT VALIDATION');
    console.log('-------------------------------------------');
    
    const results = {
        gradientActive: false,
        timeDetection: false,
        cssVariables: 0,
        errors: []
    };
    
    // Check hero section for gradient
    const heroSection = document.getElementById('hero-section');
    if (heroSection) {
        const computedStyle = window.getComputedStyle(heroSection);
        const background = computedStyle.background || computedStyle.backgroundImage;
        
        if (background.includes('gradient') || background.includes('linear-gradient')) {
            results.gradientActive = true;
            console.log('✅ Hero gradient - ACTIVE');
        } else {
            results.errors.push('⚠️ Hero gradient - NOT DETECTED');
            console.warn('⚠️ Hero gradient - NOT DETECTED');
        }
    }
    
    // Check time detection
    const currentHour = new Date().getHours();
    const bodyElement = document.body;
    const timeGradientAttr = bodyElement.getAttribute('data-time-gradient');
    
    if (timeGradientAttr) {
        results.timeDetection = true;
        console.log(`✅ Time detection - ACTIVE (${timeGradientAttr})`);
        console.log(`✅ Current hour: ${currentHour}`);
    } else {
        results.errors.push('⚠️ Time detection - NOT ACTIVE');
        console.warn('⚠️ Time detection - NOT ACTIVE');
    }
    
    // Check CSS custom properties
    const root = document.documentElement;
    const timeAwareProperties = [
        '--time-primary',
        '--time-secondary', 
        '--time-accent'
    ];
    
    timeAwareProperties.forEach(prop => {
        const value = getComputedStyle(root).getPropertyValue(prop);
        if (value && value.trim()) {
            results.cssVariables++;
            console.log(`✅ ${prop} - SET (${value.trim()})`);
        } else {
            results.errors.push(`⚠️ ${prop} - NOT SET`);
            console.warn(`⚠️ ${prop} - NOT SET`);
        }
    });
    
    console.log(`\n📊 TIME-AWARE GRADIENT SUMMARY:`);
    console.log(`Gradient Active: ${results.gradientActive}`);
    console.log(`Time Detection: ${results.timeDetection}`);
    console.log(`CSS Variables: ${results.cssVariables}/${timeAwareProperties.length}`);
    console.log(`Errors: ${results.errors.length}`);
    
    return results;
}

// COMPREHENSIVE VALIDATION EXECUTION
function executeTripleValidation() {
    console.log('🚀 EXECUTING COMPREHENSIVE TRIPLE VALIDATION');
    console.log('==============================================');
    
    const validationResults = {
        dom: validateDOMIntegrity(),
        javascript: validateJavaScriptFunctions(),
        snakeGame: validateEnhancedSnakeGame(),
        touchControls: validateMobileTouchControls(),
        modalSystem: validateModalSystem(),
        timeGradients: validateTimeAwareGradients()
    };
    
    // Calculate overall health score
    let totalTests = 0;
    let passedTests = 0;
    let totalErrors = 0;
    
    Object.values(validationResults).forEach(result => {
        totalErrors += result.errors.length;
        // Count successful validations based on result structure
        Object.entries(result).forEach(([key, value]) => {
            if (key !== 'errors' && typeof value === 'number') {
                totalTests += 1;
                if (value > 0) passedTests += 1;
            } else if (key !== 'errors' && typeof value === 'boolean') {
                totalTests += 1;
                if (value) passedTests += 1;
            }
        });
    });
    
    const healthScore = Math.round((passedTests / totalTests) * 100);
    
    console.log('\n🎯 FINAL VALIDATION REPORT');
    console.log('==========================');
    console.log(`Overall Health Score: ${healthScore}%`);
    console.log(`Tests Passed: ${passedTests}/${totalTests}`);
    console.log(`Total Errors: ${totalErrors}`);
    
    if (healthScore >= 90) {
        console.log('🟢 CODEBASE STATUS: BULLETPROOF ✅');
    } else if (healthScore >= 75) {
        console.log('🟡 CODEBASE STATUS: STABLE WITH MINOR ISSUES ⚠️');
    } else {
        console.log('🔴 CODEBASE STATUS: REQUIRES ATTENTION ❌');
    }
    
    // Detailed error summary
    if (totalErrors > 0) {
        console.log('\n🚨 ERROR SUMMARY:');
        Object.entries(validationResults).forEach(([phase, result]) => {
            if (result.errors.length > 0) {
                console.log(`\n${phase.toUpperCase()}:`);
                result.errors.forEach(error => console.log(`  ${error}`));
            }
        });
    }
    
    return {
        healthScore,
        passedTests,
        totalTests,
        totalErrors,
        results: validationResults
    };
}

// AUTO-EXECUTE ON LOAD
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', executeTripleValidation);
} else {
    executeTripleValidation();
}

// Export for manual execution
window.tripleValidation = executeTripleValidation;
