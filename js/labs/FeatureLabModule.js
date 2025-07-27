/**
 * FeatureLabModule.js v1.0
 * Trojan Recovery & Time-Aware Hero Refactor Initiative
 * 
 * Modular Innovation Lab system with:
 * - Dynamic feature card generation
 * - Status-aware styling (live, alpha, planned)
 * - Engagement tracking via localStorage
 * - Modal interaction system
 * - Cyberpunk DOS fusion aesthetics
 */

(function() {
    'use strict';

    // Feature configuration with DOS-aligned metadata
    const featureCards = [
        {
            id: "snake",
            title: "🐍 DOS Snake Game",
            status: "live",
            description: "Classic arcade experience rebuilt with Trojan Horse architecture.",
            action: () => launchSnake()
        },
        {
            id: "prompt",
            title: "🎨 Prompt Generator",
            status: "planned",
            description: "Onboards designers into DOS agent thinking via contextual prompts.",
            action: () => openModal("prompt")
        },
        {
            id: "graffiti",
            title: "🎨 Graffiti Slap Game",
            status: "alpha",
            description: "Sticker-slap graffiti game in neon-lined cyberpunk CSS glory.",
            action: () => openModal("graffiti")
        },
        {
            id: "agentx",
            title: "🤖 Agent Expression",
            status: "planned",
            description: "AI-driven content architecture powered by Trojan protocol.",
            action: () => openModal("agentx")
        }
    ];

    // Initialize Feature Lab Module
    function initializeFeatureLab() {
        console.log('🧪 FEATURE LAB: Initializing modular system...');
        
        const container = findInnovationLabContainer();
        if (!container) {
            console.error('❌ FEATURE LAB: Innovation Lab container missing');
            createFallbackContainer();
            return;
        }

        // Clear existing content and rebuild
        const featuresGrid = container.querySelector('.innovation-features-grid') || createFeaturesGrid(container);
        
        // Generate feature cards
        featureCards.forEach(feature => {
            const card = createFeatureCard(feature);
            featuresGrid.appendChild(card);
        });

        console.log('✅ FEATURE LAB: Module initialized with', featureCards.length, 'features');
        
        // Initialize engagement tracking
        initializeEngagementTracking();
    }

    // Find Innovation Lab container with multiple fallback strategies
    function findInnovationLabContainer() {
        return document.getElementById('innovation-lab') || 
               document.getElementById('innovationLab') ||
               document.querySelector('.innovation-lab') ||
               document.querySelector('[data-section="innovation-lab"]');
    }

    // Create fallback container if missing
    function createFallbackContainer() {
        console.log('🔄 FEATURE LAB: Creating fallback Innovation Lab container');
        
        const container = document.createElement('section');
        container.id = 'innovation-lab';
        container.className = 'innovation-lab cyberpunk-dos-fusion';
        container.style.cssText = `
            display: block;
            padding: var(--ric-space-3xl) 0;
            position: relative;
            z-index: 1000;
        `;
        
        container.innerHTML = `
            <div class="ric-container">
                <div class="innovation-lab-header" style="text-align: center; margin-bottom: var(--ric-space-3xl);">
                    <h2 class="ric-text-3xl ric-font-bold ric-mb-lg" style="background: linear-gradient(135deg, #00ff88, #0099ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                        🧪 Innovation Laboratory
                    </h2>
                    <p class="ric-text-lg ric-text-muted">Experimental features and future-state design patterns</p>
                </div>
            </div>
        `;
        
        // Insert before footer or at end of body
        const footer = document.querySelector('footer') || document.querySelector('.footer');
        if (footer) {
            footer.parentNode.insertBefore(container, footer);
        } else {
            document.body.appendChild(container);
        }
        
        return container;
    }

    // Create or find features grid
    function createFeaturesGrid(container) {
        let grid = container.querySelector('.innovation-features-grid');
        
        if (!grid) {
            grid = document.createElement('div');
            grid.className = 'innovation-features-grid';
            grid.style.cssText = `
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: var(--ric-space-xl);
                margin-bottom: var(--ric-space-3xl);
                padding: 0 var(--ric-space-lg);
            `;
            
            const containerInner = container.querySelector('.ric-container') || container;
            containerInner.appendChild(grid);
        }
        
        return grid;
    }

    // Create individual feature card
    function createFeatureCard({ id, title, status, description, action }) {
        const card = document.createElement('div');
        card.className = `lab-feature-card feature-card status-${status} cyberpunk-card`;
        card.setAttribute('data-feature-id', id);
        
        card.style.cssText = `
            padding: var(--ric-space-xl);
            border-radius: var(--ric-radius-lg);
            cursor: pointer;
            position: relative;
            overflow: hidden;
            transition: all 0.3s ease;
            border: 2px solid;
        `;
        
        // Apply status-specific styling
        applyStatusStyling(card, status);
        
        card.innerHTML = `
            <div class="feature-header" style="display: flex; align-items: flex-start; gap: var(--ric-space-md); margin-bottom: var(--ric-space-lg);">
                <div style="flex: 1;">
                    <h3 class="feature-title" style="font-size: var(--ric-text-xl); font-weight: 600; margin-bottom: var(--ric-space-xs);">
                        ${title}
                    </h3>
                    <p class="feature-description" style="font-size: var(--ric-text-sm); color: var(--ric-color-text-muted); line-height: 1.6; margin-bottom: var(--ric-space-md);">
                        ${description}
                    </p>
                </div>
                <span class="feature-status status-badge-${status}" style="padding: var(--ric-space-xs) var(--ric-space-sm); border-radius: var(--ric-radius-sm); font-size: var(--ric-text-xs); font-weight: 600; text-transform: uppercase; white-space: nowrap;">
                    ${status}
                </span>
            </div>
            
            <div class="feature-actions" style="display: flex; justify-content: space-between; align-items: center;">
                <button class="feature-button" data-id="${id}" style="
                    padding: var(--ric-space-sm) var(--ric-space-lg);
                    border: none;
                    border-radius: var(--ric-radius-md);
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s ease;
                ">
                    ${status === 'live' ? 'Launch' : status === 'alpha' ? 'Preview' : 'Learn More'}
                </button>
                <p class="click-count" id="count-${id}" style="font-size: var(--ric-text-xs); color: var(--ric-color-text-muted); margin: 0;">
                    Viewed: ${getClickCount(id)}x
                </p>
            </div>
        `;

        // Add click handler
        const button = card.querySelector('.feature-button');
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            incrementClickCount(id);
            updateCount(id);
            
            console.log(`🎯 FEATURE LAB: ${title} activated (${getClickCount(id)}x total)`);
            
            // 📊 AnalyticsOS v1: Click → Insight Tracker
            console.log(`📊 AnalyticsOS: ${id} clicked`);
            const eventLog = JSON.parse(localStorage.getItem("featureEvents") || "[]");
            eventLog.push({
                id,
                timestamp: new Date().toISOString()
            });
            localStorage.setItem("featureEvents", JSON.stringify(eventLog));
            
            // Execute feature action
            try {
                action();
            } catch (error) {
                console.error(`❌ FEATURE LAB: Error launching ${title}:`, error);
                showFallbackMessage(title, status);
            }
        });

        // Add hover effects
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-4px)';
            card.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.15)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = 'none';
        });

        return card;
    }

    // Apply status-specific styling
    function applyStatusStyling(card, status) {
        const isDark = document.body.classList.contains('dark');
        
        switch (status) {
            case 'live':
                card.style.borderColor = '#00ff88';
                card.style.background = isDark 
                    ? 'linear-gradient(135deg, rgba(0, 255, 136, 0.1) 0%, rgba(0, 255, 136, 0.05) 100%)'
                    : 'linear-gradient(135deg, rgba(0, 255, 136, 0.05) 0%, rgba(0, 255, 136, 0.02) 100%)';
                
                const liveButton = card.querySelector('.feature-button');
                if (liveButton) {
                    liveButton.style.background = 'linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)';
                    liveButton.style.color = '#000';
                }
                break;
                
            case 'alpha':
                card.style.borderColor = '#ff6b35';
                card.style.background = isDark
                    ? 'linear-gradient(135deg, rgba(255, 107, 53, 0.1) 0%, rgba(255, 107, 53, 0.05) 100%)'
                    : 'linear-gradient(135deg, rgba(255, 107, 53, 0.05) 0%, rgba(255, 107, 53, 0.02) 100%)';
                
                const alphaButton = card.querySelector('.feature-button');
                if (alphaButton) {
                    alphaButton.style.background = 'linear-gradient(135deg, #ff6b35 0%, #e55a2b 100%)';
                    alphaButton.style.color = '#fff';
                }
                break;
                
            case 'planned':
                card.style.borderColor = '#6b7280';
                card.style.background = isDark
                    ? 'linear-gradient(135deg, rgba(107, 114, 128, 0.1) 0%, rgba(107, 114, 128, 0.05) 100%)'
                    : 'linear-gradient(135deg, rgba(107, 114, 128, 0.05) 0%, rgba(107, 114, 128, 0.02) 100%)';
                
                const plannedButton = card.querySelector('.feature-button');
                if (plannedButton) {
                    plannedButton.style.background = 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)';
                    plannedButton.style.color = '#fff';
                }
                break;
        }
    }

    // --------------------
    // Engagement Tracking
    // --------------------
    function incrementClickCount(id) {
        const key = `feature-clicks-${id}`;
        const current = parseInt(localStorage.getItem(key) || "0", 10);
        localStorage.setItem(key, current + 1);
        
        // Dispatch engagement event for analytics
        window.dispatchEvent(new CustomEvent('featureEngagement', {
            detail: { featureId: id, clickCount: current + 1 }
        }));
    }

    function getClickCount(id) {
        return parseInt(localStorage.getItem(`feature-clicks-${id}`) || "0", 10);
    }

    function updateCount(id) {
        const el = document.getElementById(`count-${id}`);
        if (el) el.textContent = `Viewed: ${getClickCount(id)}x`;
    }

    function initializeEngagementTracking() {
        console.log('📊 FEATURE LAB: Engagement tracking initialized');
        
        // Log current engagement stats
        const stats = featureCards.map(feature => ({
            id: feature.id,
            title: feature.title,
            clicks: getClickCount(feature.id)
        }));
        
        console.log('📈 ENGAGEMENT STATS:', stats);
    }

    // --------------------
    // Modal Handling
    // --------------------
    function openModal(modalId) {
        const modal = document.getElementById(`modal-${modalId}`);
        if (modal) {
            modal.style.display = "block";
            console.log(`🎭 MODAL: Opened ${modalId}`);
        } else {
            console.warn(`⚠️ MODAL: Modal ${modalId} not found, showing fallback`);
            showFallbackMessage(modalId, 'modal');
        }
    }

    function closeModal(modalId) {
        const modal = document.getElementById(`modal-${modalId}`);
        if (modal) {
            modal.style.display = "none";
            console.log(`🎭 MODAL: Closed ${modalId}`);
        }
    }

    // Fallback message for missing features/modals
    function showFallbackMessage(featureName, type) {
        const message = type === 'modal' 
            ? `${featureName} modal is being prepared. Check back soon!`
            : `${featureName} is ${type} and will be available soon.`;
            
        if (window.alert) {
            alert(`🚧 ${message}`);
        } else {
            console.log(`🚧 FALLBACK: ${message}`);
        }
    }

    // Placeholder functions for missing features
    function launchSnake() {
        if (typeof window.launchSnakeGame === 'function') {
            window.launchSnakeGame();
        } else {
            showFallbackMessage('DOS Snake Game', 'live');
        }
    }

    // Export functions to global scope
    window.FeatureLabModule = {
        initialize: initializeFeatureLab,
        openModal,
        closeModal,
        getEngagementStats: () => featureCards.map(f => ({
            id: f.id,
            title: f.title,
            clicks: getClickCount(f.id)
        }))
    };

    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeFeatureLab);
    } else {
        initializeFeatureLab();
    }

    console.log('🧪 FEATURE LAB MODULE: Loaded and ready');

})();
