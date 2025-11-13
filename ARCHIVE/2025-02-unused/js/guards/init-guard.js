/**
 * 🛡️ TROJAN INIT GUARD v1.0
 * DOS Framework - TechOS Layer
 * 
 * Defensive initialization system that protects against missing functions
 * and provides graceful degradation for critical site systems.
 * 
 * @author RicRios Design Operating System
 * @version 1.0.0
 * @layer TechOS
 */

(function() {
    'use strict';
    
    console.log('🛡️ INIT GUARD: Initializing defensive systems...');
    
    /**
     * Safe initialization wrapper with error handling
     * @param {string} name - Function name for logging
     * @param {Function} fn - Function to execute safely
     */
    function safeInit(name, fn) {
        try {
            if (typeof fn === 'function') {
                fn();
                console.log(`✅ INIT GUARD: ${name} initialized successfully`);
            } else {
                console.warn(`⚠️ INIT GUARD: ${name} is not a function - skipping`);
            }
        } catch (error) {
            console.error(`❌ INIT GUARD: ${name} failed to initialize:`, error);
            
            // Attempt graceful degradation
            if (name === 'initializeDarkMode') {
                // Fallback: Set basic theme
                document.body.classList.add('light');
                console.log('🔄 INIT GUARD: Applied fallback light theme');
            }
        }
    }
    
    /**
     * Validate critical DOM elements
     */
    function validateCriticalElements() {
        const criticalElements = [
            { id: 'hero', name: 'Hero Section' },
            { id: 'innovation-lab', name: 'Innovation Lab' },
            { id: 'trojanHorseFeed', name: 'TrojanHorse Feed', optional: true }
        ];
        
        criticalElements.forEach(element => {
            const el = document.getElementById(element.id);
            if (!el && !element.optional) {
                console.error(`❌ INIT GUARD: Critical element missing - ${element.name} (#${element.id})`);
            } else if (el) {
                console.log(`✅ INIT GUARD: ${element.name} element found`);
            }
        });
    }
    
    /**
     * Initialize when DOM is ready
     */
    function initialize() {
        console.log('🛡️ INIT GUARD: DOM ready - starting initialization sequence');
        
        // Validate critical elements
        validateCriticalElements();
        
        // Initialize theme system
        safeInit('initializeDarkMode', window.initializeDarkMode);
        
        // Initialize time-aware systems
        safeInit('initializeTimeAware', window.initializeTimeAware);
        
        // Check for Foundation Reset script
        const resetScript = document.getElementById('direct-foundation-reset');
        if (!resetScript) {
            console.warn('❌ INIT GUARD: DIRECT FOUNDATION RESET script element missing');
        } else {
            console.log('✅ INIT GUARD: Foundation reset script found');
        }
        
        // Validate TrojanHorse Feed
        const feed = document.getElementById('trojanHorseFeed');
        if (!feed) {
            console.warn('❌ INIT GUARD: TrojanHorse Feed element not found - creating placeholder');
            createTrojanFeedPlaceholder();
        } else {
            console.log('✅ INIT GUARD: TrojanHorse Feed element found');
        }
        
        console.log('🛡️ INIT GUARD: Initialization sequence complete');
    }
    
    /**
     * Create placeholder for missing TrojanHorse Feed
     */
    function createTrojanFeedPlaceholder() {
        const placeholder = document.createElement('div');
        placeholder.id = 'trojanHorseFeed';
        placeholder.style.display = 'none';
        placeholder.setAttribute('data-placeholder', 'true');
        document.body.appendChild(placeholder);
        console.log('🔄 INIT GUARD: TrojanHorse Feed placeholder created');
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
    
    // Export for debugging
    window.InitGuard = {
        safeInit,
        validateCriticalElements
    };
    
})();
