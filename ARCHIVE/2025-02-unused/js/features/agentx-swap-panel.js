// 🔄 Multi-Agent Swap Panel - Tier 11
// Agent persona selection with distinct themes and personalities

(function() {
    'use strict';

    // Agent presets with distinct personalities
    const agentPresets = {
        lyra: {
            name: "Lyra",
            role: "Strategic Design Lead",
            tone: "professional",
            theme: "professional",
            avatar: "💼",
            description: "Business-focused design leadership with strategic insights and enterprise experience.",
            personality: "Analytical, goal-oriented, and results-driven. Focuses on ROI and business impact.",
            accent: "#3b82f6" // Blue
        },
        astra: {
            name: "Astra",
            role: "Creative Visionary",
            tone: "creative", 
            theme: "creative",
            avatar: "🎨",
            description: "Artistic design exploration with innovative concepts and creative storytelling.",
            personality: "Imaginative, expressive, and inspiring. Pushes creative boundaries and explores new possibilities.",
            accent: "#a855f7" // Purple
        },
        echo: {
            name: "Echo",
            role: "Data-Driven Designer",
            tone: "analytical",
            theme: "analytical", 
            avatar: "📊",
            description: "Evidence-based design decisions powered by user research and performance metrics.",
            personality: "Methodical, precise, and evidence-based. Makes decisions backed by data and testing.",
            accent: "#22c55e" // Green
        },
        nova: {
            name: "Nova",
            role: "Future-Focused Innovator",
            tone: "visionary",
            theme: "visionary",
            avatar: "🔮",
            description: "Transformative design thinking that anticipates tomorrow's user needs and technologies.",
            personality: "Forward-thinking, innovative, and transformative. Envisions the future of design.",
            accent: "#fb923c" // Orange
        }
    };

    function getCurrentAgent() {
        try {
            const profile = JSON.parse(localStorage.getItem('agentx-profile') || '{}');
            // Find matching preset or return first one
            for (const [key, preset] of Object.entries(agentPresets)) {
                if (preset.name === profile.name) {
                    return key;
                }
            }
            return 'lyra'; // Default
        } catch (e) {
            return 'lyra';
        }
    }

    function renderSwapPanel() {
        const currentAgent = getCurrentAgent();
        const modal = document.getElementById('agentx-swap-panel');
        if (!modal) return;

        const container = modal.querySelector('.agentx-swap-grid');
        if (!container) return;

        container.innerHTML = '';

        Object.entries(agentPresets).forEach(([key, agent]) => {
            const isActive = key === currentAgent;
            
            const card = document.createElement('div');
            card.className = `agentx-swap-card ${isActive ? 'active' : ''}`;
            card.dataset.agentKey = key;
            
            card.innerHTML = `
                <div class="agentx-swap-card-header">
                    <div class="agentx-swap-avatar" style="background: ${agent.accent}20; color: ${agent.accent};">
                        ${agent.avatar}
                    </div>
                    <div class="agentx-swap-info">
                        <h3 class="agentx-swap-name">${agent.name}</h3>
                        <p class="agentx-swap-role">${agent.role}</p>
                    </div>
                    ${isActive ? '<div class="agentx-swap-active-badge">Active</div>' : ''}
                </div>
                <p class="agentx-swap-description">${agent.description}</p>
                <div class="agentx-swap-personality">
                    <strong>Personality:</strong> ${agent.personality}
                </div>
                <div class="agentx-swap-traits">
                    <span class="agentx-swap-trait">${agent.tone}</span>
                    <span class="agentx-swap-trait">${agent.theme}</span>
                </div>
            `;

            // Add click handler
            if (!isActive) {
                card.addEventListener('click', () => selectAgent(key));
                card.style.cursor = 'pointer';
            }

            container.appendChild(card);
        });

        // Log panel open event
        if (typeof logAgentXEvent === 'function') {
            logAgentXEvent('swap_panel_opened', {
                current_agent: currentAgent,
                available_agents: Object.keys(agentPresets)
            });
        }
    }

    function selectAgent(agentKey) {
        const agent = agentPresets[agentKey];
        if (!agent) return;

        // Confirm selection
        const confirmed = confirm(`Switch to ${agent.name}? This will reload the page to apply the new agent theme and personality.`);
        if (!confirmed) return;

        // Save new agent profile
        const profile = {
            name: agent.name,
            role: agent.role,
            tone: agent.tone,
            theme: agent.theme,
            avatar: agent.avatar,
            createdAt: new Date().toISOString()
        };

        localStorage.setItem('agentx-profile', JSON.stringify(profile));

        // Log selection event
        if (typeof logAgentXEvent === 'function') {
            logAgentXEvent('agent_swapped', {
                previous_agent: getCurrentAgent(),
                new_agent: agentKey,
                agent_name: agent.name
            });
        }

        // Close modal
        if (typeof closeModal === 'function') {
            closeModal('swap-panel');
        }

        // Dispatch profile update event
        window.dispatchEvent(new CustomEvent('agentx-profile-updated', {
            detail: { profile, source: 'swap-panel' }
        }));

        // Reload page to apply theme changes
        setTimeout(() => {
            window.location.reload();
        }, 500);
    }

    function setupSwapPanelEvents() {
        // Setup modal open button
        const launchButton = document.querySelector('[data-launch="swap-panel"]');
        if (launchButton) {
            launchButton.addEventListener('click', (e) => {
                e.preventDefault();
                renderSwapPanel();
                if (typeof openModal === 'function') {
                    openModal('swap-panel');
                }
            });
        }

        // Setup modal close events
        const modal = document.getElementById('agentx-swap-panel');
        if (modal) {
            // Close button
            const closeBtn = modal.querySelector('.agentx-swap-close');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    if (typeof closeModal === 'function') {
                        closeModal('swap-panel');
                    }
                });
            }

            // Background click
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    if (typeof closeModal === 'function') {
                        closeModal('swap-panel');
                    }
                }
            });
        }
    }

    // Initialize swap panel system
    function initSwapPanel() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initSwapPanel);
            return;
        }

        // Setup event listeners
        setupSwapPanelEvents();

        console.log('🔄 Multi-Agent Swap Panel initialized');
    }

    // Export functions for testing
    window.AgentXSwap = {
        render: renderSwapPanel,
        select: selectAgent,
        getCurrentAgent: getCurrentAgent,
        presets: agentPresets
    };

    // Auto-initialize
    initSwapPanel();

})();
