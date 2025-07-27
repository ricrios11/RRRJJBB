/**
 * 🔄 AgentX Onboarding Loop - Trojan Tier 7
 * Transforms casual visitors into system-aware collaborators
 */

document.addEventListener("DOMContentLoaded", () => {
    initializeOnboardingLoop();
});

/**
 * Initialize the onboarding loop system
 */
function initializeOnboardingLoop() {
    const profile = localStorage.getItem("agentx-profile");
    
    // Skip if agent already configured
    if (profile) {
        console.log('🔄 AgentX Onboarding: Agent already configured, skipping onboarding');
        return;
    }

    // Check if we've already prompted this session
    if (sessionStorage.getItem("onboarding-prompted")) {
        console.log('🔄 AgentX Onboarding: Already prompted this session');
        return;
    }

    // Delay to avoid overwhelming users on immediate page load
    setTimeout(() => {
        triggerOnboardingPrompt();
    }, 3000);
}

/**
 * Trigger the onboarding prompt
 */
function triggerOnboardingPrompt() {
    // Mark as prompted for this session
    sessionStorage.setItem("onboarding-prompted", "true");
    
    // Log onboarding attempt
    if (typeof logAgentXEvent === 'function') {
        logAgentXEvent('onboarding_prompted', {
            page_url: window.location.pathname,
            time_on_page: 3000,
            user_agent: navigator.userAgent.substring(0, 100)
        });
    }

    // Create custom onboarding modal
    createOnboardingModal();
}

/**
 * Create a custom onboarding modal
 */
function createOnboardingModal() {
    // Remove any existing onboarding modal
    const existingModal = document.getElementById('agentx-onboarding-modal');
    if (existingModal) {
        existingModal.remove();
    }

    const modal = document.createElement('div');
    modal.id = 'agentx-onboarding-modal';
    modal.className = 'agentx-onboarding-modal';
    
    modal.innerHTML = `
        <div class="agentx-onboarding-overlay"></div>
        <div class="agentx-onboarding-content">
            <div class="agentx-onboarding-header">
                <h2>🤖 Welcome to AgentX</h2>
                <button class="agentx-onboarding-close" onclick="closeOnboardingModal()">×</button>
            </div>
            <div class="agentx-onboarding-body">
                <p>Transform your experience with a personalized AI agent that adapts content, themes, and insights to your preferences.</p>
                
                <div class="agentx-onboarding-features">
                    <div class="agentx-feature-preview">
                        <span class="agentx-feature-icon">🎨</span>
                        <div>
                            <strong>Auto-Theming</strong>
                            <p>Site adapts to your visual preferences</p>
                        </div>
                    </div>
                    <div class="agentx-feature-preview">
                        <span class="agentx-feature-icon">📝</span>
                        <div>
                            <strong>Personalized Content</strong>
                            <p>Case studies enhanced with your agent's insights</p>
                        </div>
                    </div>
                    <div class="agentx-feature-preview">
                        <span class="agentx-feature-icon">📊</span>
                        <div>
                            <strong>Analytics Tracking</strong>
                            <p>Your interactions tracked for better experiences</p>
                        </div>
                    </div>
                </div>
                
                <div class="agentx-onboarding-actions">
                    <button class="agentx-button agentx-button-primary" onclick="startAgentConfiguration()">
                        🚀 Configure My Agent
                    </button>
                    <button class="agentx-button agentx-button-secondary" onclick="skipOnboarding()">
                        Maybe Later
                    </button>
                </div>
                
                <p class="agentx-onboarding-note">
                    <small>Takes 30 seconds • Stored locally • No external data sharing</small>
                </p>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    
    // Add styles
    addOnboardingStyles();
    
    // Animate in
    setTimeout(() => {
        modal.classList.add('agentx-onboarding-visible');
    }, 100);
    
    // Auto-close after 30 seconds if no interaction
    setTimeout(() => {
        if (document.getElementById('agentx-onboarding-modal')) {
            closeOnboardingModal();
        }
    }, 30000);
}

/**
 * Add onboarding modal styles
 */
function addOnboardingStyles() {
    if (document.getElementById('agentx-onboarding-styles')) return;
    
    const styles = document.createElement('style');
    styles.id = 'agentx-onboarding-styles';
    styles.textContent = `
        .agentx-onboarding-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .agentx-onboarding-modal.agentx-onboarding-visible {
            opacity: 1;
            visibility: visible;
        }
        
        .agentx-onboarding-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(4px);
        }
        
        .agentx-onboarding-content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--ric-bg-primary, #1a1a1a);
            border: 1px solid var(--ric-border, #333);
            border-radius: 12px;
            padding: 0;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
        }
        
        .agentx-onboarding-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 24px;
            border-bottom: 1px solid var(--ric-border, #333);
            background: var(--ric-bg-secondary, #222);
        }
        
        .agentx-onboarding-header h2 {
            margin: 0;
            color: var(--ric-text-primary, #fff);
            font-size: 1.25rem;
        }
        
        .agentx-onboarding-close {
            background: none;
            border: none;
            color: var(--ric-text-muted, #888);
            font-size: 1.5rem;
            cursor: pointer;
            padding: 4px;
            border-radius: 4px;
            transition: all 0.2s ease;
        }
        
        .agentx-onboarding-close:hover {
            background: var(--ric-bg-hover, #333);
            color: var(--ric-text-primary, #fff);
        }
        
        .agentx-onboarding-body {
            padding: 24px;
        }
        
        .agentx-onboarding-body p {
            margin: 0 0 20px 0;
            color: var(--ric-text-secondary, #ccc);
            line-height: 1.5;
        }
        
        .agentx-onboarding-features {
            margin: 20px 0;
        }
        
        .agentx-feature-preview {
            display: flex;
            align-items: flex-start;
            gap: 12px;
            margin-bottom: 16px;
        }
        
        .agentx-feature-icon {
            font-size: 1.2rem;
            margin-top: 2px;
        }
        
        .agentx-feature-preview strong {
            color: var(--ric-text-primary, #fff);
            display: block;
            margin-bottom: 4px;
        }
        
        .agentx-feature-preview p {
            margin: 0;
            font-size: 0.9rem;
            color: var(--ric-text-muted, #888);
        }
        
        .agentx-onboarding-actions {
            display: flex;
            gap: 12px;
            margin: 24px 0 16px 0;
        }
        
        .agentx-button {
            flex: 1;
            padding: 12px 16px;
            border: none;
            border-radius: 6px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            font-size: 0.9rem;
        }
        
        .agentx-button-primary {
            background: var(--ric-primary, #00ffff);
            color: var(--ric-bg-primary, #000);
        }
        
        .agentx-button-primary:hover {
            background: var(--ric-primary-hover, #00cccc);
            transform: translateY(-1px);
        }
        
        .agentx-button-secondary {
            background: var(--ric-bg-secondary, #333);
            color: var(--ric-text-secondary, #ccc);
            border: 1px solid var(--ric-border, #444);
        }
        
        .agentx-button-secondary:hover {
            background: var(--ric-bg-hover, #444);
            color: var(--ric-text-primary, #fff);
        }
        
        .agentx-onboarding-note {
            text-align: center;
            margin: 16px 0 0 0;
        }
        
        .agentx-onboarding-note small {
            color: var(--ric-text-muted, #666);
            font-size: 0.8rem;
        }
        
        @media (max-width: 600px) {
            .agentx-onboarding-content {
                width: 95%;
                margin: 20px;
            }
            
            .agentx-onboarding-actions {
                flex-direction: column;
            }
        }
    `;
    
    document.head.appendChild(styles);
}

/**
 * Start agent configuration
 */
function startAgentConfiguration() {
    closeOnboardingModal();
    
    // Log conversion
    if (typeof logAgentXEvent === 'function') {
        logAgentXEvent('onboarding_accepted', {
            conversion_time: Date.now(),
            page_url: window.location.pathname
        });
    }
    
    // Open AgentX configuration modal
    if (typeof openModal === 'function') {
        openModal('agentx');
    } else {
        // Fallback: trigger custom event
        document.dispatchEvent(new CustomEvent('agentxConfigurationRequested'));
    }
}

/**
 * Skip onboarding
 */
function skipOnboarding() {
    closeOnboardingModal();
    
    // Log skip
    if (typeof logAgentXEvent === 'function') {
        logAgentXEvent('onboarding_skipped', {
            skip_time: Date.now(),
            page_url: window.location.pathname
        });
    }
    
    // Set flag to not prompt again for a while
    localStorage.setItem('agentx-onboarding-skipped', Date.now().toString());
}

/**
 * Close onboarding modal
 */
function closeOnboardingModal() {
    const modal = document.getElementById('agentx-onboarding-modal');
    if (modal) {
        modal.classList.remove('agentx-onboarding-visible');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

/**
 * Check if onboarding should be skipped based on previous skip
 */
function shouldSkipOnboarding() {
    const skippedTime = localStorage.getItem('agentx-onboarding-skipped');
    if (!skippedTime) return false;
    
    const skipTime = parseInt(skippedTime);
    const now = Date.now();
    const dayInMs = 24 * 60 * 60 * 1000;
    
    // Skip for 7 days after user clicked "Maybe Later"
    return (now - skipTime) < (7 * dayInMs);
}

// Enhanced initialization with skip check
function initializeOnboardingLoop() {
    const profile = localStorage.getItem("agentx-profile");
    
    // Skip if agent already configured
    if (profile) {
        console.log('🔄 AgentX Onboarding: Agent already configured, skipping onboarding');
        return;
    }
    
    // Skip if user recently declined
    if (shouldSkipOnboarding()) {
        console.log('🔄 AgentX Onboarding: User recently skipped, waiting for cooldown');
        return;
    }

    // Check if we've already prompted this session
    if (sessionStorage.getItem("onboarding-prompted")) {
        console.log('🔄 AgentX Onboarding: Already prompted this session');
        return;
    }

    // Delay to avoid overwhelming users on immediate page load
    setTimeout(() => {
        triggerOnboardingPrompt();
    }, 3000);
}

// Global functions
window.startAgentConfiguration = startAgentConfiguration;
window.skipOnboarding = skipOnboarding;
window.closeOnboardingModal = closeOnboardingModal;

console.log('🔄 AgentX Onboarding Loop system loaded');
