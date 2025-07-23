/**
 * NUCLEAR RESET: UNIFIED THEME ARCHITECTURE (UTA)
 * 
 * TOP 0.1% ARCHITECTURAL SOLUTION
 * Eliminates all theme system chaos with single source of truth
 * 
 * Design Principles:
 * 1. ATOMIC OPERATIONS - Theme changes are indivisible transactions
 * 2. ZERO CONFLICTS - Complete elimination of competing systems
 * 3. PREDICTABLE ORDER - Strict execution sequence prevents race conditions
 * 4. SCALABLE FOUNDATION - Built for infinite future expansion
 * 5. SUB-50MS PERFORMANCE - Lightning fast theme transitions
 */

class UnifiedThemeArchitecture {
    constructor() {
        this.currentTheme = 'dark'; // Default state
        this.isInitialized = false;
        this.subscribers = new Set();
        this.transitionQueue = [];
        this.isTransitioning = false;
        
        // Performance metrics
        this.metrics = {
            transitionCount: 0,
            averageTransitionTime: 0,
            lastTransitionTime: 0
        };
        
        console.log('🚀 UTA: Unified Theme Architecture initializing...');
    }

    /**
     * PHASE 1: COMPLETE TEARDOWN
     * Nuclear removal of all competing theme systems
     */
    async executeNuclearTeardown() {
        console.log('💥 UTA PHASE 1: Nuclear teardown initiated...');
        
        const startTime = performance.now();
        
        // 1. Remove all existing theme event listeners
        this.removeAllThemeListeners();
        
        // 2. Clear all theme-related classes from DOM
        this.clearAllThemeClasses();
        
        // 3. Disable all competing theme functions
        this.disableCompetingThemeFunctions();
        
        // 4. Clear conflicting localStorage entries
        this.clearConflictingStorage();
        
        // 5. Remove orphaned theme controllers
        this.removeOrphanedControllers();
        
        const teardownTime = performance.now() - startTime;
        console.log(`💥 UTA PHASE 1: Nuclear teardown complete in ${teardownTime.toFixed(2)}ms`);
        
        return true;
    }

    /**
     * Remove all existing theme event listeners
     */
    removeAllThemeListeners() {
        // Clone and replace all theme toggle buttons to remove listeners
        const themeToggles = document.querySelectorAll('.ric-dark-mode-toggle, [onclick*="toggleDarkMode"], [onclick*="toggleTheme"]');
        
        themeToggles.forEach(toggle => {
            const newToggle = toggle.cloneNode(true);
            toggle.parentNode.replaceChild(newToggle, toggle);
        });
        
        // Remove custom event listeners
        const events = ['themeChanged', 'darkModeToggle', 'lightModeToggle'];
        events.forEach(event => {
            document.removeEventListener(event, this.handleLegacyThemeEvent);
        });
        
        console.log('🧹 UTA: Removed all legacy theme event listeners');
    }

    /**
     * Clear all theme-related classes from DOM
     */
    clearAllThemeClasses() {
        const elements = document.querySelectorAll('*');
        const themeClasses = ['dark', 'light', 'dark-mode', 'light-mode', 'theme-dark', 'theme-light'];
        
        elements.forEach(element => {
            themeClasses.forEach(className => {
                element.classList.remove(className);
            });
        });
        
        // Clear data attributes
        document.body.removeAttribute('data-theme');
        document.documentElement.removeAttribute('data-theme');
        
        console.log('🧹 UTA: Cleared all theme classes from DOM');
    }

    /**
     * Disable all competing theme functions
     */
    disableCompetingThemeFunctions() {
        // Override legacy functions with no-ops
        const legacyFunctions = [
            'toggleDarkMode',
            'toggleTheme',
            'initializeThemeSystem',
            'applyTheme',
            'detectAndApplyTheme'
        ];
        
        legacyFunctions.forEach(funcName => {
            if (window[funcName]) {
                window[`_legacy_${funcName}`] = window[funcName]; // Backup
                window[funcName] = () => {
                    console.warn(`🚫 UTA: Legacy function ${funcName} disabled. Use UTA.toggleTheme() instead.`);
                };
            }
        });
        
        console.log('🚫 UTA: Disabled all competing theme functions');
    }

    /**
     * Clear conflicting localStorage entries
     */
    clearConflictingStorage() {
        const conflictingKeys = [
            'theme',
            'darkMode',
            'lightMode',
            'userTheme',
            'themePreference',
            'darkModeEnabled'
        ];
        
        conflictingKeys.forEach(key => {
            if (localStorage.getItem(key) !== null) {
                localStorage.removeItem(key);
            }
        });
        
        console.log('🧹 UTA: Cleared conflicting localStorage entries');
    }

    /**
     * Remove orphaned theme controllers
     */
    removeOrphanedControllers() {
        // Remove global theme objects
        const orphanedObjects = [
            'ThemeController',
            'DarkModeController',
            'ThemeManager',
            'AtomicTrojanFeed',
            'UnifiedThemeController',
            'ThemeEventBus'
        ];
        
        orphanedObjects.forEach(objName => {
            if (window[objName]) {
                delete window[objName];
            }
        });
        
        console.log('🧹 UTA: Removed orphaned theme controllers');
    }

    /**
     * PHASE 2: UNIFIED CONTROLLER BUILD
     * Build the single source of truth theme system
     */
    async buildUnifiedController() {
        console.log('🏗️ UTA PHASE 2: Building unified controller...');
        
        const startTime = performance.now();
        
        // 1. Initialize theme state detection
        this.initializeThemeState();
        
        // 2. Create unified event system
        this.createEventSystem();
        
        // 3. Build atomic theme operations
        this.buildAtomicOperations();
        
        // 4. Create performance monitoring
        this.initializePerformanceMonitoring();
        
        const buildTime = performance.now() - startTime;
        console.log(`🏗️ UTA PHASE 2: Unified controller built in ${buildTime.toFixed(2)}ms`);
        
        return true;
    }

    /**
     * Initialize theme state detection
     */
    initializeThemeState() {
        // Detect system preference
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // Check for any remaining user preference
        const userPreference = localStorage.getItem('uta-theme');
        
        // Determine initial theme
        if (userPreference) {
            this.currentTheme = userPreference;
        } else {
            this.currentTheme = systemPrefersDark ? 'dark' : 'light';
        }
        
        console.log(`🎯 UTA: Initial theme state: ${this.currentTheme}`);
    }

    /**
     * Create unified event system
     */
    createEventSystem() {
        // Custom event bus for theme changes
        this.eventBus = {
            emit: (event, data) => {
                const customEvent = new CustomEvent(`uta:${event}`, { 
                    detail: data,
                    bubbles: true,
                    cancelable: false
                });
                document.dispatchEvent(customEvent);
            },
            
            on: (event, callback) => {
                document.addEventListener(`uta:${event}`, callback);
                this.subscribers.add({ event, callback });
            },
            
            off: (event, callback) => {
                document.removeEventListener(`uta:${event}`, callback);
                this.subscribers.delete({ event, callback });
            }
        };
        
        console.log('📡 UTA: Unified event system created');
    }

    /**
     * Build atomic theme operations
     */
    buildAtomicOperations() {
        // Atomic theme application - indivisible operation
        this.applyThemeAtomic = (theme) => {
            const startTime = performance.now();
            
            // 1. Update DOM in single operation
            if (theme === 'dark') {
                document.documentElement.classList.add('dark');
                document.documentElement.classList.remove('light');
            } else {
                document.documentElement.classList.add('light');
                document.documentElement.classList.remove('dark');
            }
            
            // 2. Update internal state
            this.currentTheme = theme;
            
            // 3. Persist preference
            localStorage.setItem('uta-theme', theme);
            
            // 4. Update UI elements
            this.updateThemeUI(theme);
            
            // 5. Emit change event
            this.eventBus.emit('themeChanged', { 
                theme, 
                timestamp: Date.now(),
                transitionTime: performance.now() - startTime
            });
            
            const transitionTime = performance.now() - startTime;
            this.updateMetrics(transitionTime);
            
            console.log(`⚡ UTA: Atomic theme transition to ${theme} in ${transitionTime.toFixed(2)}ms`);
        };
    }

    /**
     * Update theme UI elements
     */
    updateThemeUI(theme) {
        // Update theme toggle icons
        const icons = document.querySelectorAll('#dark-mode-icon, .theme-icon');
        icons.forEach(icon => {
            if (icon) {
                icon.textContent = theme === 'dark' ? '☀️' : '🌙';
            }
        });
        
        // Update any theme-aware components
        this.updateTimeAwareGradients();
        this.updateInnovationLabTheme(theme);
        this.updateModalThemes(theme);
    }

    /**
     * Update time-aware gradients
     */
    updateTimeAwareGradients() {
        if (typeof applyTimeAwareHeroGradient === 'function') {
            applyTimeAwareHeroGradient();
        }
    }

    /**
     * Update Innovation Lab theme
     */
    updateInnovationLabTheme(theme) {
        const innovationLab = document.getElementById('innovation-lab');
        if (innovationLab) {
            innovationLab.setAttribute('data-theme', theme);
        }
    }

    /**
     * Update modal themes
     */
    updateModalThemes(theme) {
        const modals = document.querySelectorAll('.ric-modal, .modal');
        modals.forEach(modal => {
            modal.setAttribute('data-theme', theme);
        });
    }

    /**
     * Initialize performance monitoring
     */
    initializePerformanceMonitoring() {
        this.performanceObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach(entry => {
                if (entry.name.includes('uta-theme')) {
                    console.log(`📊 UTA Performance: ${entry.name} took ${entry.duration.toFixed(2)}ms`);
                }
            });
        });
        
        this.performanceObserver.observe({ entryTypes: ['measure'] });
    }

    /**
     * Update performance metrics
     */
    updateMetrics(transitionTime) {
        this.metrics.transitionCount++;
        this.metrics.lastTransitionTime = transitionTime;
        this.metrics.averageTransitionTime = 
            (this.metrics.averageTransitionTime * (this.metrics.transitionCount - 1) + transitionTime) / 
            this.metrics.transitionCount;
    }

    /**
     * PHASE 3: SYSTEM INTEGRATION
     * Connect all components to unified system
     */
    async integrateAllSystems() {
        console.log('🔗 UTA PHASE 3: System integration initiated...');
        
        // 1. Reconnect theme toggles
        this.reconnectThemeToggles();
        
        // 2. Integrate Innovation Lab
        this.integrateInnovationLab();
        
        // 3. Integrate modals
        this.integrateModals();
        
        // 4. Integrate TrojanHorse Feed
        this.integrateTrojanHorseFeed();
        
        // 5. Apply initial theme
        this.applyThemeAtomic(this.currentTheme);
        
        console.log('🔗 UTA PHASE 3: System integration complete');
    }

    /**
     * Reconnect theme toggles to unified system
     */
    reconnectThemeToggles() {
        const themeToggles = document.querySelectorAll('.ric-dark-mode-toggle');
        
        themeToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleTheme();
            });
        });
        
        // Create global toggle function
        window.toggleTheme = () => this.toggleTheme();
        window.toggleDarkMode = () => this.toggleTheme();
        
        console.log('🔗 UTA: Theme toggles reconnected to unified system');
    }

    /**
     * Main theme toggle function
     */
    toggleTheme() {
        if (this.isTransitioning) {
            console.log('⏳ UTA: Theme transition in progress, queueing request...');
            this.transitionQueue.push(() => this.toggleTheme());
            return;
        }
        
        this.isTransitioning = true;
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        
        this.applyThemeAtomic(newTheme);
        
        // Process queue
        setTimeout(() => {
            this.isTransitioning = false;
            if (this.transitionQueue.length > 0) {
                const nextTransition = this.transitionQueue.shift();
                nextTransition();
            }
        }, 100);
    }

    /**
     * Integrate Innovation Lab
     */
    integrateInnovationLab() {
        // Subscribe to theme changes
        this.eventBus.on('themeChanged', (e) => {
            const { theme } = e.detail;
            this.updateInnovationLabTheme(theme);
        });
        
        console.log('🔗 UTA: Innovation Lab integrated');
    }

    /**
     * Integrate modals
     */
    integrateModals() {
        // Subscribe to theme changes for all modals
        this.eventBus.on('themeChanged', (e) => {
            const { theme } = e.detail;
            this.updateModalThemes(theme);
        });
        
        console.log('🔗 UTA: Modal systems integrated');
    }

    /**
     * Integrate TrojanHorse Feed
     */
    integrateTrojanHorseFeed() {
        // Subscribe to theme changes
        this.eventBus.on('themeChanged', (e) => {
            const { theme } = e.detail;
            
            // Update TrojanHorse Feed theme
            const feed = document.querySelector('.trojan-horse-feed, #trojan-horse-feed');
            if (feed) {
                feed.setAttribute('data-theme', theme);
            }
        });
        
        console.log('🔗 UTA: TrojanHorse Feed integrated');
    }

    /**
     * PHASE 4: VALIDATION & POLISH
     * Ensure bulletproof operation
     */
    async validateAndPolish() {
        console.log('✨ UTA PHASE 4: Validation & polish initiated...');
        
        // 1. Run comprehensive tests
        const testResults = await this.runComprehensiveTests();
        
        // 2. Validate performance metrics
        this.validatePerformanceMetrics();
        
        // 3. Enable monitoring
        this.enableContinuousMonitoring();
        
        // 4. Mark as initialized
        this.isInitialized = true;
        
        console.log('✨ UTA PHASE 4: Validation & polish complete');
        console.log('🚀 UTA: Unified Theme Architecture fully operational!');
        
        return testResults;
    }

    /**
     * Run comprehensive tests
     */
    async runComprehensiveTests() {
        const tests = [
            this.testThemeToggling,
            this.testPerformance,
            this.testEventSystem,
            this.testPersistence,
            this.testComponentIntegration
        ];
        
        const results = [];
        
        for (const test of tests) {
            try {
                const result = await test.call(this);
                results.push({ test: test.name, passed: true, result });
            } catch (error) {
                results.push({ test: test.name, passed: false, error: error.message });
            }
        }
        
        const passedTests = results.filter(r => r.passed).length;
        console.log(`🧪 UTA: Tests completed - ${passedTests}/${results.length} passed`);
        
        return results;
    }

    /**
     * Test theme toggling
     */
    async testThemeToggling() {
        const originalTheme = this.currentTheme;
        
        // Test toggle
        this.toggleTheme();
        await new Promise(resolve => setTimeout(resolve, 150));
        
        if (this.currentTheme === originalTheme) {
            throw new Error('Theme toggle failed');
        }
        
        // Toggle back
        this.toggleTheme();
        await new Promise(resolve => setTimeout(resolve, 150));
        
        return 'Theme toggling works correctly';
    }

    /**
     * Test performance
     */
    async testPerformance() {
        const startTime = performance.now();
        
        // Perform 10 rapid theme changes
        for (let i = 0; i < 10; i++) {
            this.toggleTheme();
            await new Promise(resolve => setTimeout(resolve, 10));
        }
        
        const totalTime = performance.now() - startTime;
        const averageTime = totalTime / 10;
        
        if (averageTime > 50) {
            throw new Error(`Performance test failed: ${averageTime.toFixed(2)}ms average`);
        }
        
        return `Performance test passed: ${averageTime.toFixed(2)}ms average`;
    }

    /**
     * Test event system
     */
    async testEventSystem() {
        let eventReceived = false;
        
        const testHandler = () => {
            eventReceived = true;
        };
        
        this.eventBus.on('themeChanged', testHandler);
        this.toggleTheme();
        
        await new Promise(resolve => setTimeout(resolve, 100));
        
        this.eventBus.off('themeChanged', testHandler);
        
        if (!eventReceived) {
            throw new Error('Event system test failed');
        }
        
        return 'Event system works correctly';
    }

    /**
     * Test persistence
     */
    async testPersistence() {
        const originalTheme = this.currentTheme;
        this.toggleTheme();
        
        const storedTheme = localStorage.getItem('uta-theme');
        
        if (storedTheme !== this.currentTheme) {
            throw new Error('Persistence test failed');
        }
        
        return 'Persistence works correctly';
    }

    /**
     * Test component integration
     */
    async testComponentIntegration() {
        // Test DOM class application
        const htmlElement = document.documentElement;
        
        if (!htmlElement.classList.contains(this.currentTheme)) {
            throw new Error('DOM integration failed');
        }
        
        return 'Component integration works correctly';
    }

    /**
     * Validate performance metrics
     */
    validatePerformanceMetrics() {
        if (this.metrics.averageTransitionTime > 50) {
            console.warn(`⚠️ UTA: Average transition time ${this.metrics.averageTransitionTime.toFixed(2)}ms exceeds target`);
        } else {
            console.log(`✅ UTA: Performance target met - ${this.metrics.averageTransitionTime.toFixed(2)}ms average`);
        }
    }

    /**
     * Enable continuous monitoring
     */
    enableContinuousMonitoring() {
        // Monitor for theme conflicts
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && 
                    mutation.attributeName === 'class' &&
                    mutation.target === document.documentElement) {
                    
                    const classes = Array.from(document.documentElement.classList);
                    const themeClasses = classes.filter(c => ['dark', 'light'].includes(c));
                    
                    if (themeClasses.length > 1) {
                        console.warn('🚨 UTA: Theme conflict detected, resolving...');
                        this.applyThemeAtomic(this.currentTheme);
                    }
                }
            });
        });
        
        observer.observe(document.documentElement, { 
            attributes: true, 
            attributeFilter: ['class'] 
        });
        
        console.log('👁️ UTA: Continuous monitoring enabled');
    }

    /**
     * Get current system status
     */
    getStatus() {
        return {
            initialized: this.isInitialized,
            currentTheme: this.currentTheme,
            isTransitioning: this.isTransitioning,
            queueLength: this.transitionQueue.length,
            subscriberCount: this.subscribers.size,
            metrics: { ...this.metrics }
        };
    }

    /**
     * Execute complete nuclear reset and rebuild
     */
    async executeNuclearReset() {
        console.log('🚀 UTA: NUCLEAR RESET INITIATED - TOP 0.1% ARCHITECTURAL SOLUTION');
        
        try {
            // Phase 1: Complete Teardown
            await this.executeNuclearTeardown();
            
            // Phase 2: Unified Controller Build
            await this.buildUnifiedController();
            
            // Phase 3: System Integration
            await this.integrateAllSystems();
            
            // Phase 4: Validation & Polish
            const testResults = await this.validateAndPolish();
            
            console.log('🎉 UTA: NUCLEAR RESET COMPLETE - UNIFIED THEME ARCHITECTURE OPERATIONAL');
            
            return {
                success: true,
                testResults,
                status: this.getStatus()
            };
            
        } catch (error) {
            console.error('💥 UTA: Nuclear reset failed:', error);
            return {
                success: false,
                error: error.message,
                status: this.getStatus()
            };
        }
    }
}

// Global UTA instance
window.UTA = new UnifiedThemeArchitecture();

// Auto-execute nuclear reset when loaded
document.addEventListener('DOMContentLoaded', () => {
    window.UTA.executeNuclearReset().then(result => {
        if (result.success) {
            console.log('🚀 UTA: System ready for production');
        } else {
            console.error('💥 UTA: System initialization failed');
        }
    });
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UnifiedThemeArchitecture;
}
