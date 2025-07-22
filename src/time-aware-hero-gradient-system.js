/**
 * TRUE TIME-AWARE HERO BACKGROUND GRADIENT SYSTEM
 * Implements emotional tonal shifts that reflect the viewer's local time
 * Replaces static dark/light approach with sophisticated time-based gradients
 * 
 * Framework: DesignOS + TechOS + InteractionOS
 * Agent: Cascade (Time-Aware Design Leadership)
 * Session: time_aware_hero_gradient_1752813291034
 */

class TimeAwareHeroGradientSystem {
    constructor() {
        this.gradientConfig = {
            // MORNING (5:00 AM - 11:59 AM): Fresh, optimistic, energetic
            // Orange/yellow tones representing sunrise, new beginnings, clarity
            morning: {
                light: {
                    primary: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 25%, #fed7aa 75%, #fecaca 100%)',
                    overlay: 'radial-gradient(ellipse at top, rgba(251, 191, 36, 0.1) 0%, transparent 50%)',
                    accent: 'rgba(245, 158, 11, 0.05)'
                },
                dark: {
                    primary: 'linear-gradient(135deg, #451a03 0%, #7c2d12 25%, #9a3412 75%, #dc2626 100%)',
                    overlay: 'radial-gradient(ellipse at top, rgba(251, 191, 36, 0.15) 0%, transparent 50%)',
                    accent: 'rgba(245, 158, 11, 0.08)'
                }
            },

            // AFTERNOON (12:00 PM - 5:59 PM): Focused, methodical, professional
            // Blue tones representing clarity, productivity, systematic thinking
            afternoon: {
                light: {
                    primary: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 25%, #93c5fd 75%, #c7d2fe 100%)',
                    overlay: 'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.08) 0%, transparent 60%)',
                    accent: 'rgba(59, 130, 246, 0.04)'
                },
                dark: {
                    primary: 'linear-gradient(135deg, #0c1426 0%, #1e3a8a 25%, #1d4ed8 75%, #3730a3 100%)',
                    overlay: 'radial-gradient(ellipse at center, rgba(96, 165, 250, 0.12) 0%, transparent 60%)',
                    accent: 'rgba(96, 165, 250, 0.06)'
                }
            },

            // EVENING (6:00 PM - 10:59 PM): Contemplative, sophisticated, reflective
            // Purple/pink tones representing wisdom, mastery, contemplation
            evening: {
                light: {
                    primary: 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 25%, #ddd6fe 75%, #fce7f3 100%)',
                    overlay: 'radial-gradient(ellipse at bottom, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
                    accent: 'rgba(139, 92, 246, 0.05)'
                },
                dark: {
                    primary: 'linear-gradient(135deg, #2d1b69 0%, #4c1d95 25%, #7c3aed 75%, #a21caf 100%)',
                    overlay: 'radial-gradient(ellipse at bottom, rgba(167, 139, 250, 0.15) 0%, transparent 50%)',
                    accent: 'rgba(167, 139, 250, 0.08)'
                }
            },

            // NIGHT (11:00 PM - 4:59 AM): Deep, mysterious, contemplative
            // Deep purple/pink tones representing depth, mystery, late-night creativity
            night: {
                light: {
                    primary: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 25%, #fbcfe8 75%, #f9a8d4 100%)',
                    overlay: 'radial-gradient(ellipse at center, rgba(236, 72, 153, 0.08) 0%, transparent 50%)',
                    accent: 'rgba(236, 72, 153, 0.04)'
                },
                dark: {
                    primary: 'linear-gradient(135deg, #4a044e 0%, #701a75 25%, #a21caf 75%, #be185d 100%)',
                    overlay: 'radial-gradient(ellipse at center, rgba(244, 114, 182, 0.12) 0%, transparent 50%)',
                    accent: 'rgba(244, 114, 182, 0.08)'
                }
            }
        };

        this.transitionDuration = '0.8s';
        this.currentTimeContext = null;
        this.currentTheme = null;
        this.isInitialized = false;

        // Bind methods
        this.init = this.init.bind(this);
        this.updateGradient = this.updateGradient.bind(this);
        this.getTimeContext = this.getTimeContext.bind(this);
        this.getCurrentTheme = this.getCurrentTheme.bind(this);
        this.applyGradient = this.applyGradient.bind(this);
        this.createTransitionStyles = this.createTransitionStyles.bind(this);
    }

    /**
     * Initialize the time-aware gradient system
     */
    init() {
        console.log('🎨 Initializing Time-Aware Hero Gradient System...');
        
        // Create transition styles
        this.createTransitionStyles();
        
        // Apply initial gradient
        this.updateGradient();
        
        // Set up periodic updates (every 30 seconds to catch time transitions)
        setInterval(() => {
            this.updateGradient();
        }, 30000);

        // Listen for theme changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && 
                    (mutation.attributeName === 'class' || mutation.attributeName === 'data-theme')) {
                    this.updateGradient();
                }
            });
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class', 'data-theme']
        });

        this.isInitialized = true;
        console.log('✅ Time-Aware Hero Gradient System initialized');
    }

    /**
     * Get current time context (morning, afternoon, evening, night)
     */
    getTimeContext() {
        const now = new Date();
        const hour = now.getHours();
        
        console.log(`🕐 TIME CHECK: Current hour is ${hour}`);
        
        if (hour >= 5 && hour < 12) {
            console.log('🌅 TIME CONTEXT: Morning (5:00-11:59)');
            return 'morning';
        }
        if (hour >= 12 && hour < 18) {
            console.log('☀️ TIME CONTEXT: Afternoon (12:00-17:59)');
            return 'afternoon';
        }
        if (hour >= 18 && hour < 23) {
            console.log('🌆 TIME CONTEXT: Evening (18:00-22:59)');
            return 'evening';
        }
        console.log('🌙 TIME CONTEXT: Night (23:00-4:59)');
        return 'night';
    }

    /**
     * Get current theme (light or dark)
     */
    getCurrentTheme() {
        return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    }

    /**
     * Create CSS transition styles for smooth gradient changes - HERO ONLY
     */
    createTransitionStyles() {
        const style = document.createElement('style');
        style.id = 'time-aware-hero-gradient-only';
        
        // Remove existing transition styles if they exist
        const existingStyle = document.getElementById('time-aware-hero-gradient-only');
        if (existingStyle) {
            existingStyle.remove();
        }
        
        style.textContent = `
            /* Time-Aware Hero Gradient - HERO CONTAINER ONLY */
            .hero-gradient {
                transition: background ${this.transitionDuration} cubic-bezier(0.4, 0, 0.2, 1);
                position: relative;
            }
            
            .hero-gradient::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: var(--hero-overlay-gradient, none);
                pointer-events: none;
                z-index: 1;
                transition: background ${this.transitionDuration} cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            .hero-gradient > * {
                position: relative;
                z-index: 2;
            }
        `;

        document.head.appendChild(style);
    }

    /**
     * Apply gradient based on current time and theme - HERO CONTAINER ONLY
     */
    applyGradient(timeContext, theme) {
        // Try both hero element selectors for compatibility
        const heroElement = document.querySelector('.hero-gradient') || document.querySelector('.ric-hero-section');
        if (!heroElement) {
            console.warn('⚠️ Hero element not found (.hero-gradient or .ric-hero-section) - retrying in 100ms');
            setTimeout(() => this.applyGradient(timeContext, theme), 100);
            return;
        }

        const gradientConfig = this.gradientConfig[timeContext][theme];
        
        // ONLY apply gradient to the hero element - no global changes
        heroElement.style.background = gradientConfig.primary;
        heroElement.style.position = 'relative';
        
        // Apply overlay via CSS custom property for hero element only
        heroElement.style.setProperty('--hero-overlay-gradient', gradientConfig.overlay);
        
        // Add time-aware class ONLY to hero element, not body
        heroElement.className = heroElement.className.replace(/time-\w+(-\w+)?/g, '');
        heroElement.classList.add(`time-${timeContext}`);
        heroElement.classList.add(`time-${timeContext}-${theme}`);

        console.log(`🎨 HERO-ONLY GRADIENT: Applied ${timeContext} ${theme} gradient to hero container`);
        console.log(`🕐 Time context: ${timeContext} (${new Date().getHours()}:${new Date().getMinutes().toString().padStart(2, '0')})`);
    }

    /**
     * Update gradient based on current time and theme
     */
    updateGradient() {
        const timeContext = this.getTimeContext();
        const theme = this.getCurrentTheme();

        // Only update if context has changed
        if (timeContext === this.currentTimeContext && theme === this.currentTheme) {
            return;
        }

        this.currentTimeContext = timeContext;
        this.currentTheme = theme;

        this.applyGradient(timeContext, theme);

        // Dispatch custom event for other systems to listen to
        window.dispatchEvent(new CustomEvent('timeAwareGradientUpdate', {
            detail: {
                timeContext,
                theme,
                timestamp: new Date().toISOString()
            }
        }));
    }

    /**
     * Get current gradient configuration for external use
     */
    getCurrentGradientConfig() {
        if (!this.currentTimeContext || !this.currentTheme) {
            return null;
        }

        return {
            timeContext: this.currentTimeContext,
            theme: this.currentTheme,
            config: this.gradientConfig[this.currentTimeContext][this.currentTheme]
        };
    }

    /**
     * Force update gradient (useful for testing or manual triggers)
     */
    forceUpdate() {
        this.currentTimeContext = null;
        this.currentTheme = null;
        this.updateGradient();
    }
}

// Initialize the system when DOM is ready
function initializeTimeAwareGradient() {
    console.log('🚀 INITIALIZING TIME-AWARE HERO GRADIENT SYSTEM');
    window.timeAwareHeroGradient = new TimeAwareHeroGradientSystem();
    window.timeAwareHeroGradient.init();
    
    // Force immediate update
    setTimeout(() => {
        window.timeAwareHeroGradient.forceUpdate();
    }, 500);
    
    // Set up regular updates every 30 seconds
    setInterval(() => {
        window.timeAwareHeroGradient.updateGradient();
    }, 30000);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeTimeAwareGradient);
} else {
    initializeTimeAwareGradient();
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TimeAwareHeroGradientSystem;
}

console.log('📦 Time-Aware Hero Gradient System loaded');
