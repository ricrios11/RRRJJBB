/**
 * 🎤 AgentX Navigation Awareness System - Trojan Tier 7
 * Injects agent identity into navigation for universal awareness
 */

document.addEventListener("DOMContentLoaded", () => {
    initializeAgentXNav();
});

/**
 * Initialize AgentX navigation badge
 */
function initializeAgentXNav() {
    const profile = JSON.parse(localStorage.getItem("agentx-profile") || "{}");
    const badge = document.getElementById("agentx-nav-badge");
    
    if (!badge) {
        console.log('🎤 AgentX Nav: Badge element not found, creating dynamically');
        createNavBadge();
        return;
    }

    updateNavBadge(profile);
}

/**
 * Create navigation badge dynamically if not found
 */
function createNavBadge() {
    const navActions = document.querySelector('.ric-nav-actions');
    if (!navActions) {
        console.log('🎤 AgentX Nav: Navigation actions container not found');
        return;
    }

    const badge = document.createElement('span');
    badge.id = 'agentx-nav-badge';
    badge.className = 'agentx-badge';
    
    // Insert before dark mode toggle
    const darkModeToggle = navActions.querySelector('.ric-dark-mode-toggle');
    if (darkModeToggle) {
        navActions.insertBefore(badge, darkModeToggle);
    } else {
        navActions.appendChild(badge);
    }

    const profile = JSON.parse(localStorage.getItem("agentx-profile") || "{}");
    updateNavBadge(profile);
}

/**
 * Update navigation badge with agent information
 */
function updateNavBadge(profile) {
    const badge = document.getElementById("agentx-nav-badge");
    if (!badge) return;

    if (profile.name) {
        badge.textContent = `Your Agent: ${profile.name}`;
        badge.classList.add('agentx-active');
        badge.classList.remove('agentx-inactive');
        
        // Add theme-specific styling
        if (profile.theme) {
            badge.classList.add(`agentx-theme-${profile.theme.toLowerCase()}`);
        }
        
        // Add click handler for agent management
        badge.onclick = () => {
            if (typeof openModal === 'function') {
                openModal('agentx');
            } else {
                console.log('🎤 AgentX Nav: Opening agent configuration...');
                // Fallback: could trigger a custom event
                document.dispatchEvent(new CustomEvent('agentxNavClicked', {
                    detail: { profile }
                }));
            }
        };
        
        badge.style.cursor = 'pointer';
        badge.title = `Click to manage ${profile.name} (${profile.role || 'Agent'})`;
        
    } else {
        badge.textContent = 'No Agent Configured';
        badge.classList.add('agentx-inactive');
        badge.classList.remove('agentx-active');
        
        // Add click handler for onboarding
        badge.onclick = () => {
            if (typeof openModal === 'function') {
                openModal('agentx');
            } else {
                // Trigger onboarding
                document.dispatchEvent(new CustomEvent('agentxOnboardingRequested'));
            }
        };
        
        badge.style.cursor = 'pointer';
        badge.title = 'Click to configure your personal agent';
    }

    // Log navigation awareness event
    if (typeof logAgentXEvent === 'function') {
        logAgentXEvent('nav_badge_updated', {
            agent_name: profile.name || 'none',
            agent_theme: profile.theme || 'none',
            badge_state: profile.name ? 'active' : 'inactive'
        });
    }
}

/**
 * Listen for agent profile updates
 */
document.addEventListener('agentxConfigSaved', (e) => {
    if (e.detail && e.detail.profile) {
        updateNavBadge(e.detail.profile);
    }
});

/**
 * Listen for agent profile loads
 */
document.addEventListener('agentxProfileLoaded', (e) => {
    if (e.detail) {
        updateNavBadge(e.detail);
    }
});

/**
 * Global function for manual nav update
 */
window.updateAgentXNav = function() {
    const profile = JSON.parse(localStorage.getItem("agentx-profile") || "{}");
    updateNavBadge(profile);
};

console.log('🎤 AgentX Navigation Awareness system loaded');
