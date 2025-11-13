// 🎭 AgentX Narrator Overlay - Tier 9
// Dynamic agent presence on case studies with editorial voice

(function() {
    'use strict';

    // Editorial voice templates by agent tone
    const narratorVoices = {
        professional: [
            "Analyzing this case through a strategic lens...",
            "Here's my professional perspective on this work...",
            "From a business-focused viewpoint...",
            "Let me break down the strategic elements..."
        ],
        creative: [
            "This piece sparks some interesting creative thoughts...",
            "From an artistic perspective, I see...",
            "The creative process here reminds me...",
            "There's a beautiful design story unfolding..."
        ],
        analytical: [
            "The data patterns in this case reveal...",
            "From a metrics-driven analysis...",
            "The systematic approach here demonstrates...",
            "Breaking down the quantitative insights..."
        ],
        visionary: [
            "This work points toward future possibilities...",
            "I envision the broader implications...",
            "The transformative potential here suggests...",
            "Looking beyond the immediate, I see..."
        ]
    };

    // Agent avatars by theme
    const agentAvatars = {
        professional: "💼",
        creative: "🎨",
        analytical: "📊", 
        visionary: "🔮"
    };

    function getAgentProfile() {
        try {
            return JSON.parse(localStorage.getItem('agentx-profile') || '{}');
        } catch (e) {
            console.warn('AgentX Narrator: Failed to parse profile', e);
            return {};
        }
    }

    function selectNarratorVoice(tone) {
        const voices = narratorVoices[tone] || narratorVoices.professional;
        return voices[Math.floor(Math.random() * voices.length)];
    }

    function createNarratorOverlay(caseStudyElement) {
        const profile = getAgentProfile();
        
        // Skip if no agent profile
        if (!profile.name || !profile.tone) {
            return null;
        }

        const overlay = document.createElement('div');
        overlay.className = `agentx-narrator-overlay agentx-theme-${profile.theme || 'professional'}`;
        
        const avatar = agentAvatars[profile.tone] || agentAvatars.professional;
        const voice = selectNarratorVoice(profile.tone);
        
        overlay.innerHTML = `
            <div class="agentx-narrator-header">
                <div class="agentx-narrator-avatar">${avatar}</div>
                <div class="agentx-narrator-name">${profile.name}</div>
            </div>
            <div class="agentx-narrator-role">${profile.role || 'Design Agent'}</div>
            <div class="agentx-narrator-voice">${voice}</div>
        `;

        return overlay;
    }

    function injectNarratorOverlays() {
        // Target case study containers
        const caseStudySelectors = [
            '.case-study-card',
            '.case-study-container', 
            '.project-card',
            '[data-case-study]',
            '.portfolio-item'
        ];

        let injectedCount = 0;

        caseStudySelectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            
            elements.forEach((element, index) => {
                // Skip if already has narrator overlay
                if (element.querySelector('.agentx-narrator-overlay')) {
                    return;
                }

                // Only add to first few case studies to avoid overwhelming
                if (injectedCount >= 3) {
                    return;
                }

                // Ensure element has relative positioning for overlay
                const computedStyle = window.getComputedStyle(element);
                if (computedStyle.position === 'static') {
                    element.style.position = 'relative';
                }

                const overlay = createNarratorOverlay(element);
                if (overlay) {
                    element.appendChild(overlay);
                    injectedCount++;
                    
                    // Log analytics event
                    if (typeof logAgentXEvent === 'function') {
                        logAgentXEvent('narrator_overlay_shown', {
                            element_selector: selector,
                            agent_tone: getAgentProfile().tone,
                            overlay_index: injectedCount
                        });
                    }
                }
            });
        });

        if (injectedCount > 0) {
            console.log(`🎭 AgentX Narrator: Injected ${injectedCount} overlays`);
        }
    }

    function updateNarratorTheme() {
        const profile = getAgentProfile();
        if (!profile.theme) return;

        // Update CSS custom property for theme accent color
        const themeColors = {
            professional: '59, 130, 246',  // Blue
            creative: '168, 85, 247',      // Purple  
            analytical: '34, 197, 94',     // Green
            visionary: '251, 146, 60'      // Orange
        };

        const accentRgb = themeColors[profile.theme] || themeColors.professional;
        document.documentElement.style.setProperty('--agentx-accent-rgb', accentRgb);
    }

    // Initialize narrator system
    function initNarratorOverlay() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initNarratorOverlay);
            return;
        }

        // Update theme colors
        updateNarratorTheme();

        // Inject overlays with slight delay to ensure content is rendered
        setTimeout(() => {
            injectNarratorOverlays();
        }, 500);

        // Re-inject on profile changes
        window.addEventListener('agentx-profile-updated', () => {
            // Remove existing overlays
            document.querySelectorAll('.agentx-narrator-overlay').forEach(overlay => {
                overlay.remove();
            });
            
            // Update theme and re-inject
            updateNarratorTheme();
            setTimeout(injectNarratorOverlays, 300);
        });
    }

    // Export functions for testing
    window.AgentXNarrator = {
        inject: injectNarratorOverlays,
        updateTheme: updateNarratorTheme,
        createOverlay: createNarratorOverlay
    };

    // Auto-initialize
    initNarratorOverlay();

})();
