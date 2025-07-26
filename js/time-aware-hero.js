/**
 * ⏰ TIME-AWARE HERO SYSTEM v2.0
 * DOS Framework - COS + LocOS Integration
 * 
 * Dynamic hero content system that adapts messaging based on time-of-day
 * with sharp, temporal specificity and clear job-to-be-done alignment.
 * 
 * @author RicRios Design Operating System
 * @version 2.0.0
 * @layer COS + LocOS
 */

(function() {
    'use strict';
    
    console.log('⏰ TIME-AWARE HERO: Initializing temporal content system...');
    
    /**
     * Time-aware hero content configuration
     * Each time segment has specific messaging aligned to user context
     */
    const timeAwareContent = {
        morning: {
            timeRange: '6:00 - 12:00',
            headline: "Design clarity that cuts through chaos. Start aligned to what matters.",
            context: "Strategic planning and foundation building",
            gradient: "linear-gradient(135deg, rgba(255, 193, 7, 0.8) 0%, rgba(255, 152, 0, 0.6) 50%, transparent 100%)"
        },
        afternoon: {
            timeRange: '12:00 - 18:00',
            headline: "Systems-led strategy that scales. Stay sharp in pivotal design moments.",
            context: "Execution excellence and collaboration",
            gradient: "linear-gradient(135deg, rgba(59, 130, 246, 0.8) 0%, rgba(37, 99, 235, 0.6) 50%, transparent 100%)"
        },
        evening: {
            timeRange: '18:00 - 24:00',
            headline: "Mastery moves when it matters. We build design systems for transformation.",
            context: "Reflection, visioning, and integration",
            gradient: "linear-gradient(135deg, rgba(139, 92, 246, 0.8) 0%, rgba(168, 85, 247, 0.6) 50%, transparent 100%)"
        },
        night: {
            timeRange: '0:00 - 6:00',
            headline: "End your day where vision meets execution. Trojan-tested, Director-approved.",
            context: "Deep work and contemplation",
            gradient: "linear-gradient(135deg, rgba(236, 72, 153, 0.8) 0%, rgba(244, 114, 182, 0.6) 50%, transparent 100%)"
        }
    };
    
    /**
     * Get current time context
     * @returns {string} Current time context (morning, afternoon, evening, night)
     */
    function getCurrentTimeContext() {
        const now = new Date();
        const hour = now.getHours();
        
        if (hour >= 6 && hour < 12) return 'morning';
        if (hour >= 12 && hour < 18) return 'afternoon';
        if (hour >= 18 && hour < 24) return 'evening';
        return 'night';
    }
    
    /**
     * Apply time-aware content to hero section
     * @param {string} timeContext - Time context to apply
     */
    function applyTimeAwareContent(timeContext = null) {
        const context = timeContext || getCurrentTimeContext();
        const content = timeAwareContent[context];
        
        if (!content) {
            console.error(`⏰ TIME-AWARE HERO: No content found for context: ${context}`);
            return;
        }
        
        console.log(`⏰ TIME-AWARE HERO: Applying ${context} content (${content.timeRange})`);
        
        // Update main headline - primary time-aware content
        const heroTitle = document.querySelector('#hero-title-text, #hero-title span, h1');
        if (heroTitle) {
            heroTitle.textContent = content.headline;
            console.log(`✅ TIME-AWARE HERO: Headline updated for ${context}`);
        }
        
        // Apply time-aware gradient
        applyTimeAwareGradient(context, content.gradient);
        
        // Update body classes for CSS targeting
        updateTimeClasses(context);
        
        // Dispatch custom event for other systems
        document.dispatchEvent(new CustomEvent('timeAwareHero:updated', {
            detail: { context, content }
        }));
    }
    
    /**
     * Apply time-aware gradient to hero section
     * @param {string} context - Time context
     * @param {string} gradient - CSS gradient string
     */
    function applyTimeAwareGradient(context, gradient) {
        const heroSection = document.getElementById('hero');
        if (!heroSection) {
            console.warn('⏰ TIME-AWARE HERO: Hero section not found for gradient application');
            return;
        }
        
        // Apply gradient with CSS custom property for theme compatibility
        heroSection.style.setProperty('--time-aware-gradient', gradient);
        heroSection.style.background = `var(--time-aware-gradient, ${gradient})`;
        
        console.log(`✅ TIME-AWARE HERO: ${context} gradient applied`);
    }
    
    /**
     * Update body classes for time-aware CSS targeting
     * @param {string} context - Time context
     */
    function updateTimeClasses(context) {
        const body = document.body;
        
        // Remove existing time classes
        const timeClasses = ['time-morning', 'time-afternoon', 'time-evening', 'time-night'];
        timeClasses.forEach(cls => body.classList.remove(cls));
        
        // Add current time class
        body.classList.add(`time-${context}`);
        
        console.log(`✅ TIME-AWARE HERO: Body class updated to time-${context}`);
    }
    
    /**
     * Initialize time-aware hero system
     */
    function initialize() {
        console.log('⏰ TIME-AWARE HERO: Initializing system...');
        
        // Apply initial time-aware content
        applyTimeAwareContent();
        
        // Update every minute to catch time transitions
        setInterval(() => {
            applyTimeAwareContent();
        }, 60000);
        
        // Listen for theme changes to reapply gradients
        document.addEventListener('theme:changed', () => {
            const context = getCurrentTimeContext();
            const content = timeAwareContent[context];
            if (content) {
                applyTimeAwareGradient(context, content.gradient);
            }
        });
        
        console.log('✅ TIME-AWARE HERO: System initialized successfully');
    }
    
    /**
     * Manual time context override for testing
     * @param {string} context - Time context to apply
     */
    function setTimeContext(context) {
        if (!timeAwareContent[context]) {
            console.error(`⏰ TIME-AWARE HERO: Invalid time context: ${context}`);
            return;
        }
        
        console.log(`⏰ TIME-AWARE HERO: Manual override to ${context} context`);
        applyTimeAwareContent(context);
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
    
    // Export for debugging and external use
    window.TimeAwareHero = {
        getCurrentTimeContext,
        applyTimeAwareContent,
        setTimeContext,
        getContent: (context) => timeAwareContent[context],
        getAllContent: () => timeAwareContent
    };
    
})();
