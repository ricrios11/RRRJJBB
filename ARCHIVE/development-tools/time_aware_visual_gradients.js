/**
 * TIME-AWARE VISUAL THEME GRADIENTS - PHASE 3 SURGICAL IMPLEMENTATION
 * "Expressive art project disguised within hyper minimalistic site"
 * 
 * User Requirements:
 * - SUPER subtle gradients with time-aware color interactions
 * - Morning: Orange touches
 * - Afternoon: Blue touches  
 * - Night: Pink/Purple touches
 * - Focus on hero section for first impression impact
 * - CSS-preferred for performance
 * - Avoid being too expressive or performance-taxing
 * 
 * Framework: Dark Matter + Trojan Horse + Lyra precision
 * Timestamp: 2025-07-21T09:24:25-04:00 (Morning context - orange touches active)
 */

class TimeAwareVisualGradients {
    constructor() {
        this.sessionId = `time_gradients_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        this.currentTime = new Date();
        this.timeContext = this.determineTimeContext();
        
        // Super subtle gradient definitions
        this.gradientPalettes = {
            morning: {
                primary: 'rgba(255, 165, 0, 0.03)', // Super subtle orange
                secondary: 'rgba(255, 140, 0, 0.02)', // Even more subtle orange
                accent: 'rgba(255, 200, 100, 0.01)', // Barely perceptible warm
                transition: 'rgba(255, 180, 50, 0.015)' // In-between pocket
            },
            afternoon: {
                primary: 'rgba(59, 130, 246, 0.03)', // Super subtle blue
                secondary: 'rgba(37, 99, 235, 0.02)', // Even more subtle blue
                accent: 'rgba(100, 150, 255, 0.01)', // Barely perceptible cool
                transition: 'rgba(80, 140, 250, 0.015)' // In-between pocket
            },
            evening: {
                primary: 'rgba(168, 85, 247, 0.03)', // Super subtle purple
                secondary: 'rgba(147, 51, 234, 0.02)', // Even more subtle purple
                accent: 'rgba(200, 120, 255, 0.01)', // Barely perceptible warm purple
                transition: 'rgba(180, 100, 250, 0.015)' // In-between pocket
            }
        };
        
        console.log('🎨 TIME-AWARE GRADIENTS: Initialized for', this.timeContext, 'context');
    }

    determineTimeContext() {
        const hour = this.currentTime.getHours();
        
        if (hour >= 5 && hour < 12) {
            return 'morning';
        } else if (hour >= 12 && hour < 18) {
            return 'afternoon';
        } else {
            return 'evening';
        }
    }

    // Get current gradient palette with in-between pocket support
    getCurrentGradientPalette() {
        const hour = this.currentTime.getHours();
        const minute = this.currentTime.getMinutes();
        const timeDecimal = hour + (minute / 60);
        
        // Define transition zones (30 minutes before/after major transitions)
        const transitions = {
            morningToAfternoon: { start: 11.5, end: 12.5 }, // 11:30 AM - 12:30 PM
            afternoonToEvening: { start: 17.5, end: 18.5 }, // 5:30 PM - 6:30 PM
            eveningToMorning: { start: 4.5, end: 5.5 }     // 4:30 AM - 5:30 AM
        };
        
        // Check if we're in a transition zone for gentle color interaction
        for (const [transitionName, zone] of Object.entries(transitions)) {
            if (timeDecimal >= zone.start && timeDecimal <= zone.end) {
                return this.createTransitionPalette(transitionName, timeDecimal, zone);
            }
        }
        
        // Return standard palette for current time context
        return this.gradientPalettes[this.timeContext];
    }

    // Create transition palette for in-between pockets
    createTransitionPalette(transitionName, currentTime, zone) {
        const progress = (currentTime - zone.start) / (zone.end - zone.start);
        
        let fromPalette, toPalette;
        
        switch (transitionName) {
            case 'morningToAfternoon':
                fromPalette = this.gradientPalettes.morning;
                toPalette = this.gradientPalettes.afternoon;
                break;
            case 'afternoonToEvening':
                fromPalette = this.gradientPalettes.afternoon;
                toPalette = this.gradientPalettes.evening;
                break;
            case 'eveningToMorning':
                fromPalette = this.gradientPalettes.evening;
                toPalette = this.gradientPalettes.morning;
                break;
        }
        
        console.log(`🌈 TRANSITION: ${transitionName} at ${Math.round(progress * 100)}% progress`);
        
        // Return blended palette using transition colors
        return {
            primary: fromPalette.transition,
            secondary: toPalette.transition,
            accent: this.blendColors(fromPalette.accent, toPalette.accent, progress),
            transition: this.blendColors(fromPalette.primary, toPalette.primary, progress)
        };
    }

    // Blend two rgba colors (simple implementation)
    blendColors(color1, color2, progress) {
        // For super subtle gradients, just return the transition color
        // More complex blending could be added here if needed
        return progress < 0.5 ? color1 : color2;
    }

    // Apply gradients to hero section with CSS-only approach
    applyHeroGradients() {
        console.log('🎨 APPLYING: Hero section time-aware gradients...');
        
        const heroSection = document.querySelector('.hero-section') || 
                           document.querySelector('[class*="hero"]') ||
                           document.querySelector('main > section:first-child');
        
        if (!heroSection) {
            console.log('⚠️ GRADIENTS: Hero section not found, will retry...');
            return false;
        }
        
        const palette = this.getCurrentGradientPalette();
        
        // Create super subtle gradient overlay
        const gradientOverlay = this.createGradientOverlay(palette);
        
        // Apply to hero section with minimal performance impact
        heroSection.style.position = 'relative';
        
        // Remove any existing gradient overlay
        const existingOverlay = heroSection.querySelector('.time-aware-gradient-overlay');
        if (existingOverlay) {
            existingOverlay.remove();
        }
        
        // Add new gradient overlay
        heroSection.appendChild(gradientOverlay);
        
        console.log('✅ GRADIENTS: Applied', this.timeContext, 'palette to hero section');
        return true;
    }

    // Create gradient overlay element
    createGradientOverlay(palette) {
        const overlay = document.createElement('div');
        overlay.className = 'time-aware-gradient-overlay';
        
        // Super subtle gradient with multiple layers for depth
        const gradientCSS = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            pointer-events: none;
            z-index: 1;
            background: 
                radial-gradient(ellipse at top left, ${palette.primary} 0%, transparent 50%),
                radial-gradient(ellipse at top right, ${palette.secondary} 0%, transparent 50%),
                radial-gradient(ellipse at bottom center, ${palette.accent} 0%, transparent 60%);
            opacity: 0;
            transition: opacity 2s ease-in-out;
            will-change: opacity;
        `;
        
        overlay.style.cssText = gradientCSS;
        
        // Fade in gradually for subtle appearance
        setTimeout(() => {
            overlay.style.opacity = '1';
        }, 100);
        
        return overlay;
    }

    // Watch for time changes and update gradients
    setupTimeWatcher() {
        console.log('⏰ WATCHER: Setting up time-aware gradient updates...');
        
        // Check every 5 minutes for time context changes
        this.timeWatcherInterval = setInterval(() => {
            const newTimeContext = this.determineTimeContext();
            
            if (newTimeContext !== this.timeContext) {
                console.log('🕐 TIME CHANGE: Updating gradients from', this.timeContext, 'to', newTimeContext);
                this.timeContext = newTimeContext;
                this.applyHeroGradients();
            }
        }, 5 * 60 * 1000); // 5 minutes
        
        console.log('✅ WATCHER: Time-aware gradient watcher active');
    }

    // Watch for theme changes and adapt gradients
    setupThemeWatcher() {
        console.log('🎨 WATCHER: Setting up theme-aware gradient adaptation...');
        
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const isDark = document.body.classList.contains('dark');
                    console.log('🌓 THEME CHANGE: Adapting gradients for', isDark ? 'dark' : 'light', 'mode');
                    
                    // Subtle adaptation for theme changes
                    setTimeout(() => {
                        this.applyHeroGradients();
                    }, 200);
                }
            });
        });
        
        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ['class']
        });
        
        console.log('✅ WATCHER: Theme-aware gradient adaptation active');
    }

    // Initialize the complete time-aware gradient system
    initialize() {
        console.log('🚀 INITIALIZING: Time-Aware Visual Gradients System...');
        
        try {
            // Apply initial gradients
            if (!this.applyHeroGradients()) {
                // Retry after DOM is ready
                setTimeout(() => {
                    this.applyHeroGradients();
                }, 1000);
            }
            
            // Set up watchers
            this.setupTimeWatcher();
            this.setupThemeWatcher();
            
            console.log('✅ INITIALIZED: Time-Aware Visual Gradients System operational');
            console.log('🎨 CURRENT CONTEXT:', this.timeContext);
            console.log('🌈 GRADIENT SUBTLETY: Maximum (barely perceptible)');
            console.log('⚡ PERFORMANCE: CSS-only with minimal JavaScript');
            
            return true;
            
        } catch (error) {
            console.error('❌ GRADIENT SYSTEM ERROR:', error);
            return false;
        }
    }

    // Cleanup method
    destroy() {
        if (this.timeWatcherInterval) {
            clearInterval(this.timeWatcherInterval);
        }
        
        // Remove gradient overlays
        const overlays = document.querySelectorAll('.time-aware-gradient-overlay');
        overlays.forEach(overlay => overlay.remove());
        
        console.log('🧹 CLEANUP: Time-Aware Visual Gradients System destroyed');
    }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎨 TIME-AWARE GRADIENTS: Auto-initializing...');
    
    window.timeAwareGradients = new TimeAwareVisualGradients();
    window.timeAwareGradients.initialize();
});

// Export for manual control
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TimeAwareVisualGradients;
}
