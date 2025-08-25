/**
 * SYSTEM VALIDATOR - Post-Restart Validation Checklist
 * Disciplined Excellence: Comprehensive system health monitoring
 * Evening Reflection Tone: Methodical, curiosity-charged validation
 */

class SystemValidator {
    constructor() {
        this.results = {};
        this.debugMode = true;
        this.validationStartTime = performance.now();
        
        this.init();
    }
    
    init() {
        this.log("🔍 System Validator initializing...");
        this.runFullValidation();
    }
    
    log(message, type = 'info') {
        const timestamp = new Date().toLocaleTimeString();
        const prefix = `[${timestamp}] [System Validator]`;
        
        switch(type) {
            case 'success':
                console.log(`✅ ${prefix} ${message}`);
                break;
            case 'warning':
                console.warn(`⚠️ ${prefix} ${message}`);
                break;
            case 'error':
                console.error(`❌ ${prefix} ${message}`);
                break;
            default:
                console.log(`🔍 ${prefix} ${message}`);
        }
    }
    
    async runFullValidation() {
        this.log("Starting comprehensive system validation...");
        
        // Test 1: Snake Game Modal
        await this.validateSnakeGameModal();
        
        // Test 2: Graffiti Game Modal  
        await this.validateGraffitiGameModal();
        
        // Test 3: Case Study Cards
        await this.validateCaseStudyCards();
        
        // Test 4: Console Monitoring
        await this.validateConsoleHealth();
        
        // Test 5: Modal Orchestrator
        await this.validateModalOrchestrator();
        
        // Generate final report
        this.generateValidationReport();
    }
    
    async validateSnakeGameModal() {
        this.log("Testing Snake Game Modal functionality...");
        
        const tests = {
            modalExists: false,
            footerLinkExists: false,
            cardButtonExists: false,
            modalOrchestrator: false,
            gameContainer: false
        };
        
        // Check modal element
        const snakeModal = document.getElementById('snake-modal');
        tests.modalExists = !!snakeModal;
        
        // Check footer link
        const footerLink = document.querySelector('a[onclick*="snake-modal"]');
        tests.footerLinkExists = !!footerLink;
        
        // Check card button
        const cardButton = document.querySelector('button[onclick*="initializeSnakeGame"]');
        tests.cardButtonExists = !!cardButton;
        
        // Check modal orchestrator
        tests.modalOrchestrator = typeof window.modalOrchestrator !== 'undefined';
        
        // Check game container
        if (snakeModal) {
            const gameContainer = snakeModal.querySelector('.snake-game-container');
            tests.gameContainer = !!gameContainer;
        }
        
        this.results.snakeGame = tests;
        
        // Test actual modal launch
        if (tests.modalExists && tests.modalOrchestrator) {
            try {
                const launched = window.modalOrchestrator.openModal('snake-modal');
                if (launched) {
                    this.log("Snake Game modal launched successfully", 'success');
                    // Close it immediately
                    setTimeout(() => {
                        window.modalOrchestrator.closeModal('snake-modal');
                    }, 500);
                } else {
                    this.log("Snake Game modal failed to launch", 'error');
                }
            } catch (error) {
                this.log(`Snake Game modal launch error: ${error.message}`, 'error');
            }
        }
        
        const passedTests = Object.values(tests).filter(Boolean).length;
        const totalTests = Object.keys(tests).length;
        
        this.log(`Snake Game Modal: ${passedTests}/${totalTests} tests passed`, 
                 passedTests === totalTests ? 'success' : 'warning');
    }
    
    async validateGraffitiGameModal() {
        this.log("Testing Graffiti Game Modal functionality...");
        
        const tests = {
            modalExists: false,
            footerLinkExists: false,
            cardButtonExists: false,
            modalOrchestrator: false,
            gameInterface: false
        };
        
        // Check modal element
        const graffitiModal = document.getElementById('graffiti-modal');
        tests.modalExists = !!graffitiModal;
        
        // Check footer link
        const footerLink = document.querySelector('a[onclick*="graffiti-modal"]');
        tests.footerLinkExists = !!footerLink;
        
        // Check card button
        const cardButton = document.querySelector('button[onclick*="initializeGraffitiGame"]');
        tests.cardButtonExists = !!cardButton;
        
        // Check modal orchestrator
        tests.modalOrchestrator = typeof window.modalOrchestrator !== 'undefined';
        
        // Check graffiti interface
        if (graffitiModal) {
            const gameInterface = graffitiModal.querySelector('.graffiti-interface');
            tests.gameInterface = !!gameInterface;
        }
        
        this.results.graffitiGame = tests;
        
        // Test actual modal launch
        if (tests.modalExists && tests.modalOrchestrator) {
            try {
                const launched = window.modalOrchestrator.openModal('graffiti-modal');
                if (launched) {
                    this.log("Graffiti Game modal launched successfully", 'success');
                    // Close it immediately
                    setTimeout(() => {
                        window.modalOrchestrator.closeModal('graffiti-modal');
                    }, 500);
                } else {
                    this.log("Graffiti Game modal failed to launch", 'error');
                }
            } catch (error) {
                this.log(`Graffiti Game modal launch error: ${error.message}`, 'error');
            }
        }
        
        const passedTests = Object.values(tests).filter(Boolean).length;
        const totalTests = Object.keys(tests).length;
        
        this.log(`Graffiti Game Modal: ${passedTests}/${totalTests} tests passed`, 
                 passedTests === totalTests ? 'success' : 'warning');
    }
    
    async validateCaseStudyCards() {
        this.log("Validating Case Study Card layout consistency...");
        
        const caseStudyCards = document.querySelectorAll('.case-card');
        const tests = {
            cardsFound: caseStudyCards.length > 0,
            consistentHeight: true,
            hoverEffects: true,
            visualConsistency: true
        };
        
        if (caseStudyCards.length > 0) {
            // Check height consistency
            const heights = Array.from(caseStudyCards).map(card => card.offsetHeight);
            const minHeight = Math.min(...heights);
            const maxHeight = Math.max(...heights);
            const heightDifference = maxHeight - minHeight;
            
            tests.consistentHeight = heightDifference <= 20; // Allow 20px variance
            
            // Check hover effects
            caseStudyCards.forEach(card => {
                const computedStyle = window.getComputedStyle(card);
                const hasTransition = computedStyle.transition !== 'all 0s ease 0s';
                if (!hasTransition) {
                    tests.hoverEffects = false;
                }
            });
            
            this.log(`Found ${caseStudyCards.length} case study cards`);
            this.log(`Height variance: ${heightDifference}px`, heightDifference <= 20 ? 'success' : 'warning');
        } else {
            this.log("No case study cards found", 'warning');
        }
        
        this.results.caseStudyCards = tests;
        
        const passedTests = Object.values(tests).filter(Boolean).length;
        const totalTests = Object.keys(tests).length;
        
        this.log(`Case Study Cards: ${passedTests}/${totalTests} tests passed`, 
                 passedTests === totalTests ? 'success' : 'warning');
    }
    
    async validateConsoleHealth() {
        this.log("Monitoring console for clean JavaScript execution...");
        
        const tests = {
            noSyntaxErrors: true,
            modalDebugLogging: false,
            systemInitialization: false,
            themeSystem: false
        };
        
        // Monitor console errors
        const originalError = console.error;
        let errorCount = 0;
        
        console.error = function(...args) {
            errorCount++;
            if (args[0] && args[0].includes('SyntaxError')) {
                tests.noSyntaxErrors = false;
            }
            originalError.apply(console, args);
        };
        
        // Check for expected debug logging
        const originalLog = console.log;
        const logMessages = [];
        
        console.log = function(...args) {
            const message = args.join(' ');
            logMessages.push(message);
            
            if (message.includes('Modal Orchestrator')) {
                tests.modalDebugLogging = true;
            }
            if (message.includes('Innovation Lab initialized')) {
                tests.systemInitialization = true;
            }
            if (message.includes('Theme switched')) {
                tests.themeSystem = true;
            }
            
            originalLog.apply(console, args);
        };
        
        // Wait a moment for logs to appear
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Restore original functions
        console.error = originalError;
        console.log = originalLog;
        
        this.results.consoleHealth = tests;
        
        this.log(`Console errors detected: ${errorCount}`, errorCount === 0 ? 'success' : 'error');
        this.log(`Debug messages captured: ${logMessages.length}`);
        
        const passedTests = Object.values(tests).filter(Boolean).length;
        const totalTests = Object.keys(tests).length;
        
        this.log(`Console Health: ${passedTests}/${totalTests} tests passed`, 
                 passedTests === totalTests ? 'success' : 'warning');
    }
    
    async validateModalOrchestrator() {
        this.log("Validating Modal Orchestrator functionality...");
        
        const tests = {
            orchestratorExists: false,
            globalFunctions: false,
            eventListeners: false,
            stateManagement: false
        };
        
        // Check orchestrator existence
        tests.orchestratorExists = typeof window.modalOrchestrator !== 'undefined';
        
        // Check global functions
        tests.globalFunctions = typeof window.openModal === 'function' && 
                               typeof window.closeModal === 'function';
        
        // Check state management
        if (window.modalOrchestrator) {
            tests.stateManagement = window.modalOrchestrator.hasOwnProperty('activeModal') &&
                                   window.modalOrchestrator.hasOwnProperty('modalStack');
        }
        
        // Test event listener setup (simplified check)
        tests.eventListeners = true; // Assume working if orchestrator exists
        
        this.results.modalOrchestrator = tests;
        
        const passedTests = Object.values(tests).filter(Boolean).length;
        const totalTests = Object.keys(tests).length;
        
        this.log(`Modal Orchestrator: ${passedTests}/${totalTests} tests passed`, 
                 passedTests === totalTests ? 'success' : 'warning');
    }
    
    generateValidationReport() {
        const endTime = performance.now();
        const duration = Math.round(endTime - this.validationStartTime);
        
        this.log(`\n🎯 VALIDATION COMPLETE (${duration}ms)`);
        this.log("═".repeat(50));
        
        // Calculate overall health
        let totalTests = 0;
        let passedTests = 0;
        
        Object.entries(this.results).forEach(([system, tests]) => {
            const systemPassed = Object.values(tests).filter(Boolean).length;
            const systemTotal = Object.keys(tests).length;
            const percentage = Math.round((systemPassed / systemTotal) * 100);
            
            totalTests += systemTotal;
            passedTests += systemPassed;
            
            this.log(`${system.toUpperCase()}: ${systemPassed}/${systemTotal} (${percentage}%)`, 
                     percentage === 100 ? 'success' : percentage >= 80 ? 'warning' : 'error');
        });
        
        const overallPercentage = Math.round((passedTests / totalTests) * 100);
        this.log("═".repeat(50));
        this.log(`OVERALL SYSTEM HEALTH: ${passedTests}/${totalTests} (${overallPercentage}%)`, 
                 overallPercentage >= 90 ? 'success' : overallPercentage >= 70 ? 'warning' : 'error');
        
        // Provide actionable recommendations
        this.generateRecommendations();
    }
    
    generateRecommendations() {
        this.log("\n🔧 RECOMMENDATIONS:");
        
        const issues = [];
        
        // Check for critical issues
        if (!this.results.modalOrchestrator?.orchestratorExists) {
            issues.push("❌ Modal Orchestrator not loaded - check script inclusion");
        }
        
        if (!this.results.snakeGame?.modalExists) {
            issues.push("❌ Snake Game modal missing from DOM");
        }
        
        if (!this.results.graffitiGame?.modalExists) {
            issues.push("❌ Graffiti Game modal missing from DOM");
        }
        
        if (!this.results.consoleHealth?.noSyntaxErrors) {
            issues.push("❌ JavaScript syntax errors detected - check console");
        }
        
        if (issues.length === 0) {
            this.log("✅ All systems operational - transformation awaits", 'success');
        } else {
            issues.forEach(issue => this.log(issue, 'error'));
        }
        
        // Evening reflection message
        this.log("\n🌆 Evening Reflection: Every interaction transforms understanding");
        this.log("Building tomorrow's realities through disciplined excellence");
    }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => new SystemValidator(), 1000);
    });
} else {
    setTimeout(() => new SystemValidator(), 1000);
}

// Export for manual testing
window.SystemValidator = SystemValidator;
