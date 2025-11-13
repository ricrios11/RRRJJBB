/**
 * 🧪 INNOVATION LAB UNIFIED SYSTEM v2.0
 * DOS Framework - InteractionOS + IntegrationOS
 * 
 * Consolidated Innovation Lab system with proper status tracking,
 * cyberpunk styling, and clear call-to-action patterns.
 * 
 * @author RicRios Design Operating System
 * @version 2.0.0
 * @layer InteractionOS + IntegrationOS
 */

(function() {
    'use strict';
    
    console.log('🧪 INNOVATION LAB: Initializing unified system...');
    
    /**
     * Feature configuration with current status and behaviors
     */
    const labFeatures = {
        'trojan-horse-feed': {
            name: 'TrojanHorse Feed',
            icon: '🎠',
            description: 'Dynamic content carousel with time-aware strategic insights',
            status: 'live',
            statusColor: '#00ff88',
            statusText: 'LIVE',
            action: 'launch',
            actionText: 'Launch Feed',
            theme: 'cyberpunk'
        },
        'dos-snake-game': {
            name: 'DOS Snake Game',
            icon: '🐍',
            description: 'Classic arcade experience rewritten with Trojan Horse architecture',
            status: 'live',
            statusColor: '#00ff88',
            statusText: 'LIVE',
            action: 'launch',
            actionText: 'Launch Game',
            theme: 'cyberpunk'
        },
        'agent-expression': {
            name: 'Agent Expression',
            icon: '🤖',
            description: 'AI-driven design insights and contextual recommendations',
            status: 'alpha',
            statusColor: '#ff6b35',
            statusText: '🧪 ALPHA',
            action: 'modal',
            actionText: 'Learn More',
            theme: 'cyberpunk'
        },
        'graffiti-slap-game': {
            name: 'Graffiti Slap Game',
            icon: '🎨',
            description: 'Interactive design exploration with expressive input UX',
            status: 'alpha',
            statusColor: '#ff6b35',
            statusText: '🧪 ALPHA',
            action: 'modal',
            actionText: 'Learn More',
            theme: 'cyberpunk'
        },
        'prompt-generator': {
            name: 'Prompt Generator',
            icon: '🎯',
            description: 'Help designers onboard their AI agents to DOS frameworks',
            status: 'planned',
            statusColor: '#6b7280',
            statusText: 'PLANNED',
            action: 'modal',
            actionText: 'Project Overview',
            theme: 'cyberpunk'
        }
    };
    
    /**
     * Feature engagement tracking for leaderboard
     */
    let featureEngagement = JSON.parse(localStorage.getItem('lab-feature-engagement') || '{}');
    
    /**
     * Track feature interaction
     * @param {string} featureId - Feature identifier
     */
    function trackFeatureEngagement(featureId) {
        if (!featureEngagement[featureId]) {
            featureEngagement[featureId] = { clicks: 0, lastAccessed: null };
        }
        
        featureEngagement[featureId].clicks++;
        featureEngagement[featureId].lastAccessed = new Date().toISOString();
        
        localStorage.setItem('lab-feature-engagement', JSON.stringify(featureEngagement));
        
        console.log(`📊 INNOVATION LAB: Tracked engagement for ${featureId} (${featureEngagement[featureId].clicks} clicks)`);
        
        // Dispatch analytics event
        document.dispatchEvent(new CustomEvent('lab:engagement', {
            detail: { featureId, engagement: featureEngagement[featureId] }
        }));
    }
    
    /**
     * Launch feature based on its configuration
     * @param {string} featureId - Feature identifier
     */
    function launchFeature(featureId) {
        const feature = labFeatures[featureId];
        if (!feature) {
            console.error(`🧪 INNOVATION LAB: Unknown feature: ${featureId}`);
            return;
        }
        
        console.log(`🚀 INNOVATION LAB: Launching ${feature.name}...`);
        
        // Track engagement
        trackFeatureEngagement(featureId);
        
        // Handle different action types
        switch (feature.action) {
            case 'launch':
                if (featureId === 'trojan-horse-feed') {
                    launchTrojanHorseFeed();
                } else if (featureId === 'dos-snake-game') {
                    launchSnakeGame();
                }
                break;
                
            case 'modal':
                openFeatureModal(featureId);
                break;
                
            default:
                console.warn(`🧪 INNOVATION LAB: Unknown action type: ${feature.action}`);
        }
    }
    
    /**
     * Launch TrojanHorse Feed
     */
    function launchTrojanHorseFeed() {
        console.log('🎠 INNOVATION LAB: Launching TrojanHorse Feed...');
        
        // Check if modal function exists
        if (typeof window.launchFeatureModal === 'function') {
            window.launchFeatureModal('trojan-horse-feed');
        } else {
            console.warn('🎠 INNOVATION LAB: TrojanHorse Feed modal function not found - creating fallback');
            createTrojanHorseFeedFallback();
        }
    }
    
    /**
     * Launch Snake Game
     */
    function launchSnakeGame() {
        console.log('🐍 INNOVATION LAB: Launching DOS Snake Game...');
        
        // Check if snake game function exists
        if (typeof window.launchSnakeGame === 'function') {
            window.launchSnakeGame();
        } else {
            console.warn('🐍 INNOVATION LAB: Snake game function not found - creating fallback');
            createSnakeGameFallback();
        }
    }
    
    /**
     * Open feature modal for alpha/planned features
     * @param {string} featureId - Feature identifier
     */
    function openFeatureModal(featureId) {
        const feature = labFeatures[featureId];
        console.log(`📱 INNOVATION LAB: Opening modal for ${feature.name}...`);
        
        createFeatureModal(feature);
    }
    
    /**
     * Create feature modal
     * @param {Object} feature - Feature configuration
     */
    function createFeatureModal(feature) {
        // Remove existing modal
        const existingModal = document.getElementById('feature-modal');
        if (existingModal) {
            existingModal.remove();
        }
        
        const modal = document.createElement('div');
        modal.id = 'feature-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(10px);
            z-index: 50000;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease-out;
        `;
        
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(20, 20, 40, 0.9) 100%);
            border: 2px solid ${feature.statusColor};
            border-radius: 12px;
            padding: 2rem;
            max-width: 500px;
            width: 90%;
            color: #ffffff;
            font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
            box-shadow: 0 0 30px rgba(0, 255, 136, 0.3);
            animation: slideIn 0.3s ease-out;
        `;
        
        modalContent.innerHTML = `
            <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;">
                <span style="font-size: 2.5rem;">${feature.icon}</span>
                <div>
                    <h3 style="margin: 0; font-size: 1.5rem; color: ${feature.statusColor};">${feature.name}</h3>
                    <span style="
                        display: inline-block;
                        padding: 0.25rem 0.75rem;
                        background: ${feature.statusColor};
                        color: ${feature.status === 'live' ? '#000' : '#fff'};
                        border-radius: 4px;
                        font-size: 0.75rem;
                        font-weight: 600;
                        margin-top: 0.5rem;
                    ">${feature.statusText}</span>
                </div>
            </div>
            
            <p style="margin-bottom: 1.5rem; line-height: 1.6; color: #cccccc;">
                ${feature.description}
            </p>
            
            ${getFeatureModalContent(feature)}
            
            <div style="display: flex; gap: 1rem; margin-top: 2rem;">
                <button onclick="document.getElementById('feature-modal').remove()" style="
                    flex: 1;
                    padding: 0.75rem 1.5rem;
                    background: transparent;
                    border: 1px solid #666;
                    color: #ccc;
                    border-radius: 6px;
                    cursor: pointer;
                    font-family: inherit;
                    transition: all 0.3s ease;
                " onmouseover="this.style.background='rgba(255,255,255,0.1)'" onmouseout="this.style.background='transparent'">
                    Close
                </button>
                ${getFeatureModalAction(feature)}
            </div>
        `;
        
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // Close on backdrop click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        // Close on Escape key
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                modal.remove();
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);
    }
    
    /**
     * Get feature-specific modal content
     * @param {Object} feature - Feature configuration
     * @returns {string} HTML content
     */
    function getFeatureModalContent(feature) {
        const featureId = Object.keys(labFeatures).find(id => labFeatures[id] === feature);
        
        switch (featureId) {
            case 'agent-expression':
                return `
                    <div style="background: rgba(0, 255, 136, 0.1); padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
                        <h4 style="margin: 0 0 0.5rem 0; color: #00ff88;">🤖 AI-Driven Design Intelligence</h4>
                        <p style="margin: 0; font-size: 0.9rem; color: #cccccc;">
                            Experimental system that analyzes design patterns and provides contextual insights
                            based on current project context and user behavior.
                        </p>
                    </div>
                `;
                
            case 'graffiti-slap-game':
                return `
                    <div style="background: rgba(255, 107, 53, 0.1); padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
                        <h4 style="margin: 0 0 0.5rem 0; color: #ff6b35;">🎨 Expressive Design Exploration</h4>
                        <p style="margin: 0; font-size: 0.9rem; color: #cccccc;">
                            Interactive canvas for rapid design ideation with gesture-based input and
                            collaborative features for team design sessions.
                        </p>
                    </div>
                `;
                
            case 'prompt-generator':
                return `
                    <div style="background: rgba(107, 114, 128, 0.1); padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
                        <h4 style="margin: 0 0 0.5rem 0; color: #6b7280;">🎯 AI Agent Onboarding</h4>
                        <p style="margin: 0; font-size: 0.9rem; color: #cccccc;">
                            Strategic tool to help design teams effectively onboard AI agents to DOS frameworks
                            and establish consistent design system workflows.
                        </p>
                    </div>
                `;
                
            default:
                return '';
        }
    }
    
    /**
     * Get feature-specific modal action button
     * @param {Object} feature - Feature configuration
     * @returns {string} HTML button
     */
    function getFeatureModalAction(feature) {
        if (feature.status === 'planned') {
            return `
                <button style="
                    flex: 1;
                    padding: 0.75rem 1.5rem;
                    background: linear-gradient(135deg, ${feature.statusColor}, #4b5563);
                    border: none;
                    color: #fff;
                    border-radius: 6px;
                    cursor: pointer;
                    font-family: inherit;
                    font-weight: 600;
                    transition: all 0.3s ease;
                " onmouseover="this.style.transform='translateY(-1px)'" onmouseout="this.style.transform='translateY(0)'">
                    📋 Add to Roadmap
                </button>
            `;
        }
        
        return `
            <button onclick="alert('Feature launching soon!')" style="
                flex: 1;
                padding: 0.75rem 1.5rem;
                background: linear-gradient(135deg, ${feature.statusColor}, #f59e0b);
                border: none;
                color: ${feature.status === 'live' ? '#000' : '#fff'};
                border-radius: 6px;
                cursor: pointer;
                font-family: inherit;
                font-weight: 600;
                transition: all 0.3s ease;
            " onmouseover="this.style.transform='translateY(-1px)'" onmouseout="this.style.transform='translateY(0)'">
                🚀 ${feature.actionText}
            </button>
        `;
    }
    
    /**
     * Create TrojanHorse Feed fallback
     */
    function createTrojanHorseFeedFallback() {
        alert('🎠 TrojanHorse Feed: Advanced content carousel system coming soon!');
    }
    
    /**
     * Create Snake Game fallback
     */
    function createSnakeGameFallback() {
        alert('🐍 DOS Snake Game: Classic arcade experience launching soon!');
    }
    
    /**
     * Get feature engagement leaderboard
     * @returns {Array} Sorted array of features by engagement
     */
    function getFeatureLeaderboard() {
        return Object.entries(featureEngagement)
            .map(([featureId, data]) => ({
                featureId,
                feature: labFeatures[featureId],
                ...data
            }))
            .sort((a, b) => b.clicks - a.clicks);
    }
    
    /**
     * Display feature leaderboard
     */
    function showLeaderboard() {
        const leaderboard = getFeatureLeaderboard();
        console.group('📊 INNOVATION LAB LEADERBOARD');
        
        if (leaderboard.length === 0) {
            console.log('No feature interactions yet');
        } else {
            leaderboard.forEach((item, index) => {
                const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '📊';
                console.log(`${medal} ${item.feature?.name || item.featureId}: ${item.clicks} clicks`);
            });
        }
        
        console.groupEnd();
        return leaderboard;
    }
    
    /**
     * Initialize Innovation Lab system
     */
    function initialize() {
        console.log('🧪 INNOVATION LAB: System initialized successfully');
        
        // Add CSS animations
        addCSSAnimations();
        
        // Initialize engagement tracking
        console.log(`📊 INNOVATION LAB: Tracking ${Object.keys(featureEngagement).length} features`);
    }
    
    /**
     * Add required CSS animations
     */
    function addCSSAnimations() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes slideIn {
                from { transform: translateY(-20px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
    
    // Export for global access
    window.InnovationLabUnified = {
        launchFeature,
        trackFeatureEngagement,
        getFeatureLeaderboard,
        showLeaderboard,
        features: labFeatures
    };
    
    // Backward compatibility
    window.launchFeatureModal = launchFeature;
    
})();
