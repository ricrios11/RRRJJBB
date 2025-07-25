/**
 * 🧬 GradientGuardian Agent – Real-Time Gradient Integrity Enforcement
 * 
 * Ensures hero gradients stay aligned with time-aware cycles and theme state
 * Prevents conflicts and maintains visual consistency
 */

class GradientGuardian {
    constructor() {
        this.scope = ['#hero', '.ric-hero'];
        this.currentTimeContext = null;
        this.currentTheme = null;
        this.isActive = false;
        
        // Time context mapping
        this.timeContexts = {
            'late-night': { start: 3, end: 5 },     // 3-5 AM
            'early-morning': { start: 5, end: 8 },  // 5-8 AM  
            'morning': { start: 8, end: 12 },       // 8-12 PM
            'late-morning': { start: 12, end: 14 }, // 12-2 PM
            'afternoon': { start: 14, end: 18 },    // 2-6 PM
            'late-afternoon': { start: 18, end: 19 }, // 6-7 PM
            'evening': { start: 19, end: 23 },      // 7-11 PM
            'night': { start: 23, end: 3 }          // 11 PM-3 AM
        };
        
        this.init();
    }
    
    init() {
        console.log('🧬 GradientGuardian: Initializing real-time gradient integrity enforcement...');
        
        // Initial setup
        this.updateTimeContext();
        this.updateTheme();
        this.applyTimeAwareClasses();
        
        // Set up watchers
        this.setupTimeWatcher();
        this.setupThemeWatcher();
        this.setupMutationObserver();
        
        this.isActive = true;
        console.log('✅ GradientGuardian: Active and monitoring hero gradient integrity');
        
        // Dispatch ready event
        document.dispatchEvent(new CustomEvent('gradient-guardian:ready'));
    }
    
    updateTimeContext() {
        const now = new Date();
        const hour = now.getHours();
        
        let newContext = null;
        
        // Determine time context based on current hour
        if (hour >= 3 && hour < 5) newContext = 'late-night';
        else if (hour >= 5 && hour < 8) newContext = 'early-morning';
        else if (hour >= 8 && hour < 12) newContext = 'morning';
        else if (hour >= 12 && hour < 14) newContext = 'late-morning';
        else if (hour >= 14 && hour < 18) newContext = 'afternoon';
        else if (hour >= 18 && hour < 19) newContext = 'late-afternoon';
        else if (hour >= 19 && hour < 23) newContext = 'evening';
        else newContext = 'night';
        
        if (newContext !== this.currentTimeContext) {
            const oldContext = this.currentTimeContext;
            this.currentTimeContext = newContext;
            console.log(`🕐 GradientGuardian: Time context changed from ${oldContext} to ${newContext}`);
            this.applyTimeAwareClasses();
            
            // Dispatch time change event
            document.dispatchEvent(new CustomEvent('gradient-guardian:time-changed', {
                detail: { from: oldContext, to: newContext }
            }));
        }
    }
    
    updateTheme() {
        const isDark = document.documentElement.classList.contains('dark');
        const newTheme = isDark ? 'dark' : 'light';
        
        if (newTheme !== this.currentTheme) {
            const oldTheme = this.currentTheme;
            this.currentTheme = newTheme;
            console.log(`🎨 GradientGuardian: Theme changed from ${oldTheme} to ${newTheme}`);
            
            // Dispatch theme change event
            document.dispatchEvent(new CustomEvent('gradient-guardian:theme-changed', {
                detail: { from: oldTheme, to: newTheme }
            }));
        }
    }
    
    applyTimeAwareClasses() {
        if (!this.currentTimeContext) return;
        
        const body = document.body;
        
        // Remove all existing time classes
        const timeClasses = ['time-late-night', 'time-early-morning', 'time-morning', 
                           'time-late-morning', 'time-afternoon', 'time-late-afternoon', 
                           'time-evening', 'time-night'];
        
        timeClasses.forEach(cls => body.classList.remove(cls));
        
        // Add current time class
        const currentClass = `time-${this.currentTimeContext}`;
        body.classList.add(currentClass);
        
        console.log(`🎯 GradientGuardian: Applied time class '${currentClass}' to body`);
        
        // Verify gradient application
        setTimeout(() => this.verifyGradientIntegrity(), 100);
    }
    
    verifyGradientIntegrity() {
        this.scope.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                const computedStyle = window.getComputedStyle(element);
                const background = computedStyle.backgroundImage;
                
                // Check if gradient is applied
                if (!background || background === 'none') {
                    console.warn(`⚠️ GradientGuardian: No gradient detected on ${selector}. Triggering reapplication...`);
                    this.reapplyGradient(element);
                } else {
                    console.log(`✅ GradientGuardian: Gradient integrity verified for ${selector}`);
                }
            });
        });
    }
    
    reapplyGradient(element) {
        // Force CSS recalculation by temporarily removing and re-adding time class
        const body = document.body;
        const currentClass = `time-${this.currentTimeContext}`;
        
        body.classList.remove(currentClass);
        
        // Force reflow
        element.offsetHeight;
        
        // Re-add class
        body.classList.add(currentClass);
        
        console.log(`🔄 GradientGuardian: Reapplied gradient for time context '${this.currentTimeContext}'`);
        
        // Dispatch restoration event
        document.dispatchEvent(new CustomEvent('gradient-guardian:gradient-restored', {
            detail: { timeContext: this.currentTimeContext, element: element }
        }));
    }
    
    setupTimeWatcher() {
        // Check time every 30 seconds
        setInterval(() => {
            this.updateTimeContext();
        }, 30000);
        
        // Also check on page visibility change
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                this.updateTimeContext();
            }
        });
    }
    
    setupThemeWatcher() {
        // Watch for theme toggle events
        document.addEventListener('theme:toggle', () => {
            setTimeout(() => {
                this.updateTheme();
                this.applyTimeAwareClasses();
            }, 100);
        });
        
        // Watch for dark class changes on documentElement
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    this.updateTheme();
                }
            });
        });
        
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });
    }
    
    setupMutationObserver() {
        // Watch for style mutations on hero elements
        this.scope.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                const observer = new MutationObserver((mutations) => {
                    mutations.forEach((mutation) => {
                        if (mutation.type === 'attributes' && 
                            (mutation.attributeName === 'style' || mutation.attributeName === 'class')) {
                            
                            // Debounce verification
                            clearTimeout(this.verificationTimeout);
                            this.verificationTimeout = setTimeout(() => {
                                this.verifyGradientIntegrity();
                            }, 500);
                        }
                    });
                });
                
                observer.observe(element, {
                    attributes: true,
                    attributeFilter: ['style', 'class']
                });
            });
        });
    }
    
    // Public methods for manual control
    forceUpdate() {
        console.log('🔄 GradientGuardian: Manual update triggered');
        this.updateTimeContext();
        this.updateTheme();
        this.applyTimeAwareClasses();
    }
    
    getStatus() {
        return {
            active: this.isActive,
            timeContext: this.currentTimeContext,
            theme: this.currentTheme,
            timestamp: new Date().toISOString()
        };
    }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.gradientGuardian = new GradientGuardian();
    });
} else {
    window.gradientGuardian = new GradientGuardian();
}

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GradientGuardian;
}
