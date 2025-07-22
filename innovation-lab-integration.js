// #TrojanHorseOS:2025-07-19 - InnovationAgent: Comprehensive Innovation Lab Integration (MD SaaS Vision)
// Complex multi-agent orchestration for world-class digital product design organization

class InnovationLabAnalytics {
    constructor() {
        this.featureInteractions = {};
        this.sessionData = {
            startTime: Date.now(),
            userId: this.generateUserId(),
            features: [],
            engagement: 0
        };
        this.initializeAnalytics();
    }

    generateUserId() {
        return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    initializeAnalytics() {
        console.log('🔬 Innovation Lab Analytics: Initialized');
        console.log('📊 Session ID:', this.sessionData.userId);
        
        // Initialize feature interaction tracking
        const features = [
            'memory-recall', 'case-remix', 'live-prompting', 'time-aware', 'trojan-feed',
            'agent-tuner', 'advanced-modals', 'prompt-helper', 'collaborative-design'
        ];
        
        features.forEach(feature => {
            this.featureInteractions[feature] = {
                hovers: 0,
                clicks: 0,
                interest: 0,
                lastInteraction: null
            };
        });
    }

    trackFeatureHover(featureId) {
        if (this.featureInteractions[featureId]) {
            this.featureInteractions[featureId].hovers++;
            this.featureInteractions[featureId].lastInteraction = Date.now();
            console.log(`🎯 Feature Hover: ${featureId} (${this.featureInteractions[featureId].hovers} hovers)`);
        }
    }

    trackFeatureClick(featureId) {
        if (this.featureInteractions[featureId]) {
            this.featureInteractions[featureId].clicks++;
            this.featureInteractions[featureId].lastInteraction = Date.now();
            this.sessionData.engagement++;
            console.log(`🚀 Feature Click: ${featureId} (${this.featureInteractions[featureId].clicks} clicks)`);
            
            // Add to session features if not already present
            if (!this.sessionData.features.includes(featureId)) {
                this.sessionData.features.push(featureId);
            }
        }
    }

    trackInterest(featureId) {
        if (this.featureInteractions[featureId]) {
            this.featureInteractions[featureId].interest++;
            console.log(`💡 Feature Interest: ${featureId} (${this.featureInteractions[featureId].interest} interests)`);
        }
    }

    getLeaderboard() {
        const features = Object.entries(this.featureInteractions)
            .map(([id, data]) => ({
                id,
                score: (data.clicks * 3) + (data.hovers * 1) + (data.interest * 5),
                ...data
            }))
            .sort((a, b) => b.score - a.score);

        console.log('🏆 Feature Leaderboard:', features);
        return features;
    }

    generateAnalyticsReport() {
        const sessionDuration = Date.now() - this.sessionData.startTime;
        const leaderboard = this.getLeaderboard();
        
        const report = {
            session: {
                ...this.sessionData,
                duration: sessionDuration,
                engagementRate: this.sessionData.engagement / (sessionDuration / 1000 / 60) // per minute
            },
            leaderboard,
            recommendations: this.generateRecommendations(leaderboard)
        };

        console.log('📈 Analytics Report:', report);
        return report;
    }

    generateRecommendations(leaderboard) {
        const topFeatures = leaderboard.slice(0, 3);
        const recommendations = [];

        if (topFeatures[0]?.score > 10) {
            recommendations.push(`Prioritize development of ${topFeatures[0].id} - high engagement detected`);
        }

        if (leaderboard.filter(f => f.interest > 0).length > 3) {
            recommendations.push('Multiple features showing interest - consider batch development');
        }

        return recommendations;
    }
}

// Global analytics instance
const labAnalytics = new InnovationLabAnalytics();

// Global tracking functions for HTML integration
function trackFeatureHover(featureId) {
    labAnalytics.trackFeatureHover(featureId);
}

function trackFeatureClick(featureId) {
    labAnalytics.trackFeatureClick(featureId);
}

function trackInterest(featureId) {
    labAnalytics.trackInterest(featureId);
}

// WIP Modal System with Analytics Integration
function showWIPModal(featureId) {
    const modal = document.getElementById('wip-modal') || createWIPModal();
    const title = document.getElementById('wip-title');
    const description = document.getElementById('wip-description');
    
    const features = {
        'agent-tuner': {
            title: 'Dynamic Agent Tuner',
            description: 'Real-time modification of AI agent behavior with intent-based adaptation, tone profile adjustment, and contextual response tuning. Perfect for creating personalized interaction experiences that adapt to user context and preferences.'
        },
        'advanced-modals': {
            title: 'Advanced Modal System',
            description: 'Next-generation modal system with Framer Motion portals, glassmorphism effects, and mythic variant hooks. Includes smooth animations, gesture controls, and immersive storytelling capabilities for enhanced user engagement.'
        },
        'prompt-helper': {
            title: 'Prompt Helper Tool',
            description: 'Floating Claude-copyable prompts with cmd+shift+P shortcut integration. Provides instant access to optimized prompts for design collaboration, with remix support and contextual suggestions.'
        },
        'collaborative-design': {
            title: 'Collaborative Design Sessions',
            description: 'Multi-user real-time design collaboration platform with shared canvas, synchronized interactions, and live feedback systems. Imagine Figma meets portfolio storytelling with AI-enhanced collaboration.'
        }
    };
    
    const feature = features[featureId];
    if (feature) {
        title.textContent = feature.title;
        description.textContent = feature.description;
        modal.style.display = 'block';
        
        // Track WIP feature interest with analytics
        labAnalytics.trackFeatureClick(featureId);
        console.log(`🔬 WIP Feature Modal: ${featureId} - ${new Date().toISOString()}`);
    }
}

function createWIPModal() {
    const modal = document.createElement('div');
    modal.id = 'wip-modal';
    modal.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 10000; backdrop-filter: blur(8px); display: none;">
            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: var(--ric-color-surface); border-radius: 16px; padding: 2rem; max-width: 500px; width: 90%; box-shadow: 0 20px 60px rgba(0,0,0,0.3);">
                <h2 id="wip-title" style="margin: 0 0 1rem 0; color: var(--ric-color-text-primary); font-size: 1.5rem;">Feature Under Construction</h2>
                <p id="wip-description" style="color: var(--ric-color-text-muted); margin: 0 0 1.5rem 0; line-height: 1.6; font-size: 0.95rem;">This innovative feature is currently in development. Click tracking and analytics are active to help prioritize development efforts.</p>
                <div style="display: flex; gap: 1rem; justify-content: flex-end;">
                    <button onclick="closeWIPModal()" style="background: var(--ric-color-surface-secondary); color: var(--ric-color-text-primary); border: 1px solid var(--ric-color-border); padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer; transition: all 0.3s ease;">Close</button>
                    <button onclick="expressInterest()" style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); color: white; border: none; padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer; transition: all 0.3s ease; font-weight: 600;">I'm Interested!</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    return modal.firstElementChild;
}

function closeWIPModal() {
    const modal = document.getElementById('wip-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function expressInterest() {
    const modal = document.getElementById('wip-modal');
    const title = document.getElementById('wip-title').textContent;
    
    // Track interest with analytics
    const featureId = getCurrentFeatureId(title);
    if (featureId) {
        labAnalytics.trackInterest(featureId);
    }
    
    console.log('🎯 User expressed interest in WIP feature:', title);
    
    // Show thank you message
    const description = document.getElementById('wip-description');
    description.innerHTML = `
        <div style="text-align: center; color: var(--ric-color-success);">
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">🎉</div>
            <div style="font-weight: 600; margin-bottom: 0.5rem;">Interest Recorded!</div>
            <div style="font-size: 0.875rem;">Your feedback helps prioritize development. This feature will be fast-tracked based on user demand.</div>
        </div>
    `;
    
    setTimeout(() => {
        closeWIPModal();
    }, 2000);
}

function getCurrentFeatureId(title) {
    const titleMap = {
        'Dynamic Agent Tuner': 'agent-tuner',
        'Advanced Modal System': 'advanced-modals',
        'Prompt Helper Tool': 'prompt-helper',
        'Collaborative Design Sessions': 'collaborative-design'
    };
    return titleMap[title];
}

// Analytics Dashboard Functions
function showAnalyticsDashboard() {
    const report = labAnalytics.generateAnalyticsReport();
    const leaderboard = report.leaderboard;
    
    const dashboardModal = document.createElement('div');
    dashboardModal.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); z-index: 10001; backdrop-filter: blur(12px);">
            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: var(--ric-color-surface); border-radius: 16px; padding: 2rem; max-width: 700px; width: 90%; max-height: 80vh; overflow-y: auto;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                    <h2 style="margin: 0; color: var(--ric-color-text-primary); font-size: 1.5rem;">📊 Innovation Lab Analytics</h2>
                    <button onclick="this.parentElement.parentElement.parentElement.remove()" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: var(--ric-color-text-muted);">×</button>
                </div>
                
                <div style="margin-bottom: 2rem;">
                    <h3 style="color: var(--ric-color-text-primary); margin: 0 0 1rem 0;">🏆 Feature Leaderboard</h3>
                    <div style="display: grid; gap: 0.5rem;">
                        ${leaderboard.map((feature, index) => `
                            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; background: var(--ric-color-surface-secondary); border-radius: 8px; border-left: 4px solid ${getFeatureColor(feature.id)};">
                                <div>
                                    <div style="font-weight: 600; color: var(--ric-color-text-primary);">${index + 1}. ${formatFeatureName(feature.id)}</div>
                                    <div style="font-size: 0.875rem; color: var(--ric-color-text-muted);">
                                        ${feature.clicks} clicks • ${feature.hovers} hovers • ${feature.interest} interests
                                    </div>
                                </div>
                                <div style="font-weight: 700; color: ${getFeatureColor(feature.id)}; font-size: 1.25rem;">
                                    ${feature.score}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div style="margin-bottom: 2rem;">
                    <h3 style="color: var(--ric-color-text-primary); margin: 0 0 1rem 0;">💡 Development Recommendations</h3>
                    <div style="background: var(--ric-color-surface-secondary); padding: 1rem; border-radius: 8px;">
                        ${report.recommendations.length > 0 ? 
                            report.recommendations.map(rec => `<div style="margin-bottom: 0.5rem; color: var(--ric-color-text-muted);">• ${rec}</div>`).join('') :
                            '<div style="color: var(--ric-color-text-muted);">Continue gathering user interaction data for insights.</div>'
                        }
                    </div>
                </div>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
                    <div style="text-align: center; padding: 1rem; background: var(--ric-color-surface-secondary); border-radius: 8px;">
                        <div style="font-size: 1.5rem; font-weight: 700; color: var(--ric-color-primary);">${report.session.features.length}</div>
                        <div style="font-size: 0.875rem; color: var(--ric-color-text-muted);">Features Explored</div>
                    </div>
                    <div style="text-align: center; padding: 1rem; background: var(--ric-color-surface-secondary); border-radius: 8px;">
                        <div style="font-size: 1.5rem; font-weight: 700; color: var(--ric-color-success);">${report.session.engagement}</div>
                        <div style="font-size: 0.875rem; color: var(--ric-color-text-muted);">Total Interactions</div>
                    </div>
                    <div style="text-align: center; padding: 1rem; background: var(--ric-color-surface-secondary); border-radius: 8px;">
                        <div style="font-size: 1.5rem; font-weight: 700; color: var(--ric-color-warning);">${Math.round(report.session.duration / 1000)}s</div>
                        <div style="font-size: 0.875rem; color: var(--ric-color-text-muted);">Session Duration</div>
                    </div>
                </div>
                
                <div style="text-align: center;">
                    <button onclick="exportAnalytics()" style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 8px; cursor: pointer; font-weight: 600; margin-right: 1rem;">Export Data</button>
                    <button onclick="this.parentElement.parentElement.parentElement.remove()" style="background: var(--ric-color-surface-secondary); color: var(--ric-color-text-primary); border: 1px solid var(--ric-color-border); padding: 0.75rem 1.5rem; border-radius: 8px; cursor: pointer;">Close</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(dashboardModal);
}

function getFeatureColor(featureId) {
    const colors = {
        'memory-recall': '#ec4899',
        'case-remix': '#a855f7',
        'live-prompting': '#3b82f6',
        'time-aware': '#f59e0b',
        'trojan-feed': '#00ff88',
        'agent-tuner': '#6b7280',
        'advanced-modals': '#6b7280',
        'prompt-helper': '#6b7280',
        'collaborative-design': '#374151'
    };
    return colors[featureId] || '#6b7280';
}

function formatFeatureName(featureId) {
    const names = {
        'memory-recall': 'UX Memory Recall',
        'case-remix': 'Case Study Remix',
        'live-prompting': 'Live Prompting',
        'time-aware': 'Time-Aware Content',
        'trojan-feed': 'TrojanHorse Feed',
        'agent-tuner': 'Dynamic Agent Tuner',
        'advanced-modals': 'Advanced Modals',
        'prompt-helper': 'Prompt Helper',
        'collaborative-design': 'Collaborative Design'
    };
    return names[featureId] || featureId;
}

function exportAnalytics() {
    const report = labAnalytics.generateAnalyticsReport();
    const dataStr = JSON.stringify(report, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `innovation-lab-analytics-${Date.now()}.json`;
    link.click();
    
    console.log('📊 Analytics exported:', report);
}

// Initialize analytics on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Innovation Lab Integration: Loaded');
    
    // Add analytics dashboard trigger to footer
    setTimeout(() => {
        const footer = document.querySelector('footer');
        if (footer) {
            const analyticsLink = document.createElement('button');
            analyticsLink.innerHTML = '📊 Lab Analytics';
            analyticsLink.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
                color: white;
                border: none;
                padding: 0.75rem 1rem;
                border-radius: 8px;
                cursor: pointer;
                font-weight: 600;
                box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
                z-index: 1000;
                transition: all 0.3s ease;
            `;
            analyticsLink.onmouseover = () => {
                analyticsLink.style.transform = 'translateY(-2px)';
                analyticsLink.style.boxShadow = '0 8px 24px rgba(59, 130, 246, 0.4)';
            };
            analyticsLink.onmouseout = () => {
                analyticsLink.style.transform = 'translateY(0)';
                analyticsLink.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
            };
            analyticsLink.onclick = showAnalyticsDashboard;
            document.body.appendChild(analyticsLink);
        }
    }, 2000);
});

// Export for global access
window.InnovationLabAnalytics = {
    trackFeatureHover,
    trackFeatureClick,
    trackInterest,
    showWIPModal,
    showAnalyticsDashboard,
    getAnalytics: () => labAnalytics.generateAnalyticsReport()
};
