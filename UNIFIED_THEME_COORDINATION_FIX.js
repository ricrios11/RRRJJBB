// UNIFIED THEME COORDINATION SYSTEM - EMERGENCY FIX
// Addresses critical theme toggle decoupling when Innovation Lab is active
// Date: 2025-07-22 | Agent: Cascade | Framework: Dark Matter + DOS

console.log('🔧 DEPLOYING: Unified Theme Coordination System');

// PHASE 1: Create Global Theme Event Bus
window.ThemeEventBus = {
    listeners: [],
    
    // Subscribe to theme changes
    subscribe(callback) {
        this.listeners.push(callback);
        console.log('🎨 THEME BUS: New listener registered');
    },
    
    // Broadcast theme changes to all systems
    broadcast(theme) {
        console.log(`🎨 THEME BUS: Broadcasting theme change to ${theme}`);
        this.listeners.forEach(callback => {
            try {
                callback(theme);
            } catch (error) {
                console.error('🎨 THEME BUS: Listener error:', error);
            }
        });
    },
    
    // Get current theme from DOM
    getCurrentTheme() {
        return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    }
};

// PHASE 2: Unified Theme Controller
window.UnifiedThemeController = {
    
    // Apply theme to all systems simultaneously
    applyTheme(theme) {
        console.log(`🎨 UNIFIED: Applying ${theme} theme to all systems`);
        
        // Update DOM class
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            document.documentElement.classList.remove('light');
        } else {
            document.documentElement.classList.add('light');
            document.documentElement.classList.remove('dark');
        }
        
        // Update header toggle state
        this.updateHeaderToggle(theme);
        
        // Update Innovation Lab if present
        this.updateInnovationLab(theme);
        
        // Update time-aware gradients
        this.updateTimeAwareGradients();
        
        // Broadcast to all listeners
        window.ThemeEventBus.broadcast(theme);
        
        console.log(`✅ UNIFIED: ${theme} theme applied successfully`);
    },
    
    // Update header toggle visual state
    updateHeaderToggle(theme) {
        const toggle = document.querySelector('.theme-toggle, [data-theme-toggle]');
        if (toggle) {
            // Update toggle appearance
            const icon = toggle.querySelector('.theme-icon');
            if (icon) {
                icon.textContent = theme === 'dark' ? '☀️' : '🌙';
            }
            console.log('🎨 UNIFIED: Header toggle updated');
        }
    },
    
    // Update Innovation Lab theme
    updateInnovationLab(theme) {
        const innovationLab = document.querySelector('#innovation-lab, .innovation-lab');
        if (innovationLab && innovationLab.style.display !== 'none') {
            // Apply theme-specific styling to Innovation Lab
            innovationLab.classList.remove('theme-light', 'theme-dark');
            innovationLab.classList.add(`theme-${theme}`);
            
            // Update all child elements
            const cards = innovationLab.querySelectorAll('.feature-card, .innovation-card');
            cards.forEach(card => {
                card.classList.remove('theme-light', 'theme-dark');
                card.classList.add(`theme-${theme}`);
            });
            
            console.log('🎨 UNIFIED: Innovation Lab theme updated');
        }
    },
    
    // Update time-aware gradients
    updateTimeAwareGradients() {
        // Trigger time-aware gradient system if present
        if (window.TimeAwareGradientSystem) {
            window.TimeAwareGradientSystem.applyCurrentGradient();
        }
        console.log('🎨 UNIFIED: Time-aware gradients updated');
    }
};

// PHASE 3: Intercept All Theme Toggle Events
function interceptThemeToggles() {
    console.log('🔧 UNIFIED: Intercepting theme toggle events');
    
    // Find and override header theme toggle
    const headerToggle = document.querySelector('.theme-toggle, [data-theme-toggle]');
    if (headerToggle) {
        // Remove existing event listeners by cloning
        const newToggle = headerToggle.cloneNode(true);
        headerToggle.parentNode.replaceChild(newToggle, headerToggle);
        
        // Add unified event listener
        newToggle.addEventListener('click', (e) => {
            e.preventDefault();
            const currentTheme = window.ThemeEventBus.getCurrentTheme();
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            window.UnifiedThemeController.applyTheme(newTheme);
        });
        
        console.log('✅ UNIFIED: Header toggle intercepted and unified');
    }
    
    // Override any existing theme functions
    window.toggleTheme = function() {
        const currentTheme = window.ThemeEventBus.getCurrentTheme();
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        window.UnifiedThemeController.applyTheme(newTheme);
    };
    
    console.log('✅ UNIFIED: All theme functions unified');
}

// PHASE 4: Innovation Lab Integration
function integrateInnovationLabTheme() {
    console.log('🔧 UNIFIED: Integrating Innovation Lab theme system');
    
    // Subscribe Innovation Lab to theme changes
    window.ThemeEventBus.subscribe((theme) => {
        const innovationLab = document.querySelector('#innovation-lab, .innovation-lab');
        if (innovationLab && innovationLab.style.display !== 'none') {
            // Force immediate visual update
            innovationLab.style.transition = 'all 0.3s ease';
            
            // Apply theme-specific colors and styling
            if (theme === 'dark') {
                innovationLab.style.background = 'var(--ric-color-surface-dark, #1a1a1a)';
                innovationLab.style.color = 'var(--ric-color-text-dark, #ffffff)';
                innovationLab.style.borderColor = 'var(--ric-color-border-dark, #333333)';
            } else {
                innovationLab.style.background = 'var(--ric-color-surface-light, #ffffff)';
                innovationLab.style.color = 'var(--ric-color-text-light, #000000)';
                innovationLab.style.borderColor = 'var(--ric-color-border-light, #e5e5e5)';
            }
            
            console.log(`🎨 INNOVATION LAB: Theme updated to ${theme}`);
        }
    });
}

// PHASE 5: Emergency Deployment
function deployUnifiedThemeSystem() {
    console.log('🚀 DEPLOYING: Unified Theme Coordination System');
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            interceptThemeToggles();
            integrateInnovationLabTheme();
        });
    } else {
        interceptThemeToggles();
        integrateInnovationLabTheme();
    }
    
    // Apply current theme to ensure consistency
    const currentTheme = window.ThemeEventBus.getCurrentTheme();
    window.UnifiedThemeController.applyTheme(currentTheme);
    
    console.log('✅ DEPLOYED: Unified Theme Coordination System active');
}

// AUTO-DEPLOY
deployUnifiedThemeSystem();

// VALIDATION HOOK
window.validateThemeSystem = function() {
    console.log('🔍 VALIDATING: Theme system coordination');
    
    const currentTheme = window.ThemeEventBus.getCurrentTheme();
    console.log(`Current theme: ${currentTheme}`);
    
    const innovationLab = document.querySelector('#innovation-lab, .innovation-lab');
    if (innovationLab && innovationLab.style.display !== 'none') {
        console.log('Innovation Lab is visible and should be coordinated');
    }
    
    console.log(`Theme listeners: ${window.ThemeEventBus.listeners.length}`);
    return true;
};
