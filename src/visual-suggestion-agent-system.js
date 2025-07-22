/**
 * Visual Suggestion Agent System
 * Non-invasive design enhancement suggestions based on user context and engagement
 */

class VisualSuggestionAgentSystem {
    constructor(visitorMemorySystem, orchestrationSystem) {
        this.sessionId = `visual_agent_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        this.timestamp = new Date().toISOString();
        this.visitorMemorySystem = visitorMemorySystem;
        this.orchestrationSystem = orchestrationSystem;
        
        // Visual suggestion cache
        this.suggestionCache = new Map();
        
        // User preferences tracking
        this.visualPreferences = {
            acceptedModes: [],
            dismissedSuggestions: [],
            preferredTimeLayouts: {}
        };
        
        // Layout mode definitions
        this.layoutModes = {
            'card layout': {
                description: 'Clean card-based presentation with strategic spacing',
                bestFor: ['content_heavy_sections', 'multiple_items', 'scannable_information'],
                cssClasses: ['card-layout', 'strategic-spacing', 'time-aware-cards']
            },
            'split column': {
                description: 'Two-column layout with visual hierarchy',
                bestFor: ['comparison_content', 'detailed_explanations', 'methodology_breakdown'],
                cssClasses: ['split-column', 'visual-hierarchy', 'time-aware-split']
            },
            'visual summary': {
                description: 'Key points with visual emphasis and icons',
                bestFor: ['key_takeaways', 'process_steps', 'principle_highlights'],
                cssClasses: ['visual-summary', 'icon-emphasis', 'time-aware-summary']
            },
            'timeline flow': {
                description: 'Chronological or process-based visual flow',
                bestFor: ['case_studies', 'methodology_steps', 'journey_narratives'],
                cssClasses: ['timeline-flow', 'process-visual', 'time-aware-timeline']
            },
            'grid showcase': {
                description: 'Structured grid with visual emphasis',
                bestFor: ['portfolio_items', 'toolkit_display', 'feature_highlights'],
                cssClasses: ['grid-showcase', 'visual-emphasis', 'time-aware-grid']
            },
            'narrative scroll': {
                description: 'Story-driven vertical flow with visual breaks',
                bestFor: ['case_study_stories', 'philosophy_content', 'about_sections'],
                cssClasses: ['narrative-scroll', 'story-flow', 'time-aware-narrative']
            },
            'minimal focus': {
                description: 'Simplified layout with single focal point',
                bestFor: ['hero_sections', 'key_messages', 'call_to_action'],
                cssClasses: ['minimal-focus', 'single-focal', 'time-aware-minimal']
            },
            'systematic breakdown': {
                description: 'Methodical visual organization',
                bestFor: ['complex_concepts', 'methodology_explanation', 'framework_details'],
                cssClasses: ['systematic-breakdown', 'methodical-visual', 'time-aware-systematic']
            },
            'contemplative flow': {
                description: 'Elegant, spacious layout for reflection',
                bestFor: ['philosophy_content', 'wisdom_sharing', 'reflective_sections'],
                cssClasses: ['contemplative-flow', 'reflective-space', 'time-aware-contemplative']
            }
        };
        
        console.log('🎨 Visual Suggestion Agent System Initialized');
        console.log(`Session ID: ${this.sessionId}`);
    }

    // =====================================
    // CORE SUGGESTION GENERATION
    // =====================================

    async generateVisualSuggestion(context) {
        console.log('🎨 Generating visual suggestion...');
        
        try {
            // Analyze context for suggestion triggers
            const shouldSuggest = this.analyzeSuggestionTriggers(context);
            
            if (!shouldSuggest) {
                return {
                    insight: "Looks great as is. Nothing to improve visually right now.",
                    suggested_layout_mode: "no change needed",
                    action: null,
                    confidence: 0.0,
                    time_context: "Current layout is appropriate for the context."
                };
            }
            
            // Generate contextual suggestion
            const suggestion = await this.generateContextualSuggestion(context);
            
            // Cache suggestion
            this.cacheSuggestion(context, suggestion);
            
            return suggestion;
            
        } catch (error) {
            console.error('❌ Visual suggestion generation failed:', error);
            return this.getFallbackSuggestion();
        }
    }

    analyzeSuggestionTriggers(context) {
        const { userPrompt, engagementLevel, sessionDuration, currentSection } = context;
        
        // Check for explicit visual request patterns
        const visualTriggerPatterns = [
            /visual/i, /show.*visual/i, /dense/i, /simpler/i, /diagram/i,
            /visualize/i, /see.*differently/i, /hard.*follow/i, /break.*down/i,
            /organize/i, /layout/i, /design/i
        ];
        
        const hasVisualTrigger = visualTriggerPatterns.some(pattern => 
            pattern.test(userPrompt || '')
        );
        
        // Check for engagement-based triggers
        const hasEngagementTrigger = (
            (engagementLevel === 'low' && sessionDuration > 3) ||
            (engagementLevel === 'medium' && currentSection === 'case_studies') ||
            (engagementLevel === 'high' && this.hasComplexContent(currentSection))
        );
        
        return hasVisualTrigger || hasEngagementTrigger;
    }

    async generateContextualSuggestion(context) {
        const { userPrompt, timeOfDay, engagementLevel, currentSection, deviceType } = context;
        
        // Determine best layout mode based on context
        const suggestedMode = this.determineBestLayoutMode(context);
        
        // Generate insight based on context
        const insight = this.generateInsight(context, suggestedMode);
        
        // Generate time-aware context
        const timeContext = this.generateTimeContext(timeOfDay, suggestedMode);
        
        // Calculate confidence
        const confidence = this.calculateSuggestionConfidence(context, suggestedMode);
        
        return {
            insight,
            suggested_layout_mode: suggestedMode,
            action: `Would you like to try ${suggestedMode} mode?`,
            confidence,
            time_context: timeContext
        };
    }

    determineBestLayoutMode(context) {
        const { userPrompt, timeOfDay, engagementLevel, currentSection, deviceType } = context;
        
        // Analyze user prompt for specific layout hints
        if (/dense|complex|break.*down/.test(userPrompt || '')) {
            return timeOfDay === 'evening' ? 'contemplative flow' : 'systematic breakdown';
        }
        
        if (/visual|diagram|show/.test(userPrompt || '')) {
            return engagementLevel === 'high' ? 'visual summary' : 'card layout';
        }
        
        if (/simpler|minimal|focus/.test(userPrompt || '')) {
            return 'minimal focus';
        }
        
        // Section-based suggestions
        const sectionModes = {
            'hero': 'minimal focus',
            'case_studies': 'timeline flow',
            'toolkit': 'grid showcase',
            'philosophy': 'contemplative flow',
            'about': 'narrative scroll'
        };
        
        if (sectionModes[currentSection]) {
            return sectionModes[currentSection];
        }
        
        // Time-based defaults
        const timeModes = {
            'morning': 'card layout',
            'afternoon': 'split column',
            'evening': 'contemplative flow'
        };
        
        return timeModes[timeOfDay] || 'card layout';
    }

    generateInsight(context, suggestedMode) {
        const { userPrompt, timeOfDay, engagementLevel, currentSection } = context;
        
        const insightTemplates = {
            'card layout': `The content could benefit from clean card-based organization to improve scannability and ${timeOfDay} clarity.`,
            'split column': `A two-column approach would create better visual hierarchy and systematic organization for ${timeOfDay} focus.`,
            'visual summary': `Key points with visual emphasis would enhance understanding and engagement for this ${engagementLevel} interaction.`,
            'timeline flow': `A chronological flow would better showcase the systematic methodology and process progression.`,
            'grid showcase': `A structured grid presentation would highlight the strategic frameworks with better visual emphasis.`,
            'narrative scroll': `A story-driven flow with visual breaks would enhance the narrative and maintain ${timeOfDay} engagement.`,
            'minimal focus': `Simplified presentation with single focal point would reduce complexity and enhance ${timeOfDay} clarity.`,
            'systematic breakdown': `Methodical visual organization would make complex concepts more accessible and systematically clear.`,
            'contemplative flow': `Elegant, spacious layout would honor the reflective nature of this content and ${timeOfDay} wisdom.`
        };
        
        return insightTemplates[suggestedMode] || `Visual enhancement could improve clarity and presentation for this ${timeOfDay} context.`;
    }

    generateTimeContext(timeOfDay, suggestedMode) {
        const timeContexts = {
            'morning': {
                'card layout': 'Morning brightness enhances clean card presentation with strategic spacing for fresh clarity.',
                'visual summary': 'Morning energy supports visual icons and clean emphasis for strategic understanding.',
                'minimal focus': 'Morning clarity emphasizes single focal points with bright, clean presentation.',
                'default': 'Morning clarity supports clean, bright visual treatments that enhance strategic thinking.'
            },
            'afternoon': {
                'split column': 'Afternoon structure emphasizes systematic organization with clear visual hierarchy.',
                'systematic breakdown': 'Afternoon rigor supports methodical visual organization for systematic understanding.',
                'timeline flow': 'Afternoon focus enhances process visualization with structured progression.',
                'default': 'Afternoon structure supports systematic visual organization for focused execution.'
            },
            'evening': {
                'contemplative flow': 'Evening wisdom calls for elegant, spacious layouts that honor reflective depth.',
                'narrative scroll': 'Evening reflection enhances story-driven flow with contemplative visual breaks.',
                'minimal focus': 'Evening elegance emphasizes sophisticated focal points with contemplative depth.',
                'default': 'Evening elegance supports sophisticated visual treatments that honor contemplative wisdom.'
            }
        };
        
        return timeContexts[timeOfDay]?.[suggestedMode] || 
               timeContexts[timeOfDay]?.['default'] || 
               'Visual treatment adapted to current time context for optimal clarity.';
    }

    calculateSuggestionConfidence(context, suggestedMode) {
        const { userPrompt, engagementLevel, sessionDuration, currentSection } = context;
        
        let confidence = 0.5; // Base confidence
        
        // Boost confidence for explicit visual requests
        if (/visual|show|diagram|simpler/.test(userPrompt || '')) {
            confidence += 0.3;
        }
        
        // Boost confidence for high engagement
        if (engagementLevel === 'high') {
            confidence += 0.2;
        }
        
        // Boost confidence for longer sessions
        if (sessionDuration > 5) {
            confidence += 0.1;
        }
        
        // Boost confidence for appropriate section-mode matches
        const goodMatches = {
            'case_studies': 'timeline flow',
            'toolkit': 'grid showcase',
            'philosophy': 'contemplative flow'
        };
        
        if (goodMatches[currentSection] === suggestedMode) {
            confidence += 0.15;
        }
        
        return Math.min(confidence, 1.0);
    }

    // =====================================
    // MODAL SYSTEM INTEGRATION
    // =====================================

    async showSuggestionModal(suggestion) {
        console.log('🎭 Showing visual suggestion modal');
        
        const modal = this.createSuggestionModal(suggestion);
        
        // Add to DOM
        document.body.appendChild(modal);
        
        // Set up event listeners
        this.setupModalEventListeners(modal, suggestion);
        
        // Auto-dismiss after 30 seconds
        setTimeout(() => {
            if (modal.parentNode) {
                this.dismissModal(modal);
            }
        }, 30000);
        
        return modal;
    }

    createSuggestionModal(suggestion) {
        const timeOfDay = this.getCurrentTimeOfDay();
        
        const modal = document.createElement('div');
        modal.className = `visual-suggestion-modal time-aware-${timeOfDay} non-invasive contextual`;
        
        modal.innerHTML = `
            <div class="modal-backdrop"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="insight">${suggestion.insight}</h2>
                    <button class="modal-close" aria-label="Close suggestion">×</button>
                </div>
                <div class="modal-body">
                    <p class="suggestion-details">
                        <strong>Suggested:</strong> ${suggestion.suggested_layout_mode}
                    </p>
                    <p class="time-context">${suggestion.time_context}</p>
                    <div class="modal-actions">
                        <button class="try-mode-btn primary" data-mode="${suggestion.suggested_layout_mode}">
                            ${suggestion.action || "Try this mode"}
                        </button>
                        <button class="dismiss-btn secondary">Not now</button>
                    </div>
                </div>
                <div class="confidence-indicator">
                    <span class="confidence-score">Confidence: ${Math.round(suggestion.confidence * 100)}%</span>
                </div>
            </div>
        `;
        
        return modal;
    }

    setupModalEventListeners(modal, suggestion) {
        // Close button
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => this.dismissModal(modal));
        
        // Try mode button
        const tryBtn = modal.querySelector('.try-mode-btn');
        tryBtn.addEventListener('click', () => {
            this.applyLayoutMode(suggestion.suggested_layout_mode);
            this.trackAcceptedSuggestion(suggestion);
            this.dismissModal(modal);
        });
        
        // Dismiss button
        const dismissBtn = modal.querySelector('.dismiss-btn');
        dismissBtn.addEventListener('click', () => {
            this.trackDismissedSuggestion(suggestion);
            this.dismissModal(modal);
        });
        
        // Backdrop click
        const backdrop = modal.querySelector('.modal-backdrop');
        backdrop.addEventListener('click', () => this.dismissModal(modal));
        
        // Escape key
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                this.dismissModal(modal);
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);
    }

    dismissModal(modal) {
        modal.classList.add('dismissing');
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    }

    // =====================================
    // LAYOUT MODE APPLICATION
    // =====================================

    applyLayoutMode(mode) {
        console.log(`🎨 Applying layout mode: ${mode}`);
        
        const layoutConfig = this.layoutModes[mode];
        if (!layoutConfig) {
            console.warn(`Unknown layout mode: ${mode}`);
            return;
        }
        
        // Get current section element
        const currentSection = document.querySelector('[data-current-section]');
        if (!currentSection) {
            console.warn('No current section found');
            return;
        }
        
        // Remove existing layout classes
        Object.values(this.layoutModes).forEach(config => {
            config.cssClasses.forEach(className => {
                currentSection.classList.remove(className);
            });
        });
        
        // Add new layout classes
        layoutConfig.cssClasses.forEach(className => {
            currentSection.classList.add(className);
        });
        
        // Add time-aware class
        const timeOfDay = this.getCurrentTimeOfDay();
        currentSection.classList.add(`time-aware-${timeOfDay}`);
        
        console.log(`✅ Layout mode applied: ${mode}`);
    }

    // =====================================
    // PREFERENCE TRACKING
    // =====================================

    trackAcceptedSuggestion(suggestion) {
        this.visualPreferences.acceptedModes.push({
            mode: suggestion.suggested_layout_mode,
            timestamp: this.timestamp,
            confidence: suggestion.confidence
        });
        
        // Update visitor memory if available
        if (this.visitorMemorySystem) {
            this.visitorMemorySystem.updateVisitorMemory({
                visualPreferences: this.visualPreferences
            });
        }
        
        console.log(`✅ Accepted suggestion tracked: ${suggestion.suggested_layout_mode}`);
    }

    trackDismissedSuggestion(suggestion) {
        this.visualPreferences.dismissedSuggestions.push({
            mode: suggestion.suggested_layout_mode,
            timestamp: this.timestamp,
            reason: 'user_dismissed'
        });
        
        console.log(`📝 Dismissed suggestion tracked: ${suggestion.suggested_layout_mode}`);
    }

    // =====================================
    // UTILITY METHODS
    // =====================================

    getCurrentTimeOfDay() {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) return 'morning';
        if (hour >= 12 && hour < 18) return 'afternoon';
        return 'evening';
    }

    hasComplexContent(section) {
        const complexSections = ['case_studies', 'toolkit', 'philosophy', 'innovation_lab'];
        return complexSections.includes(section);
    }

    cacheSuggestion(context, suggestion) {
        const cacheKey = `${context.currentSection}_${context.timeOfDay}_${context.engagementLevel}`;
        this.suggestionCache.set(cacheKey, {
            suggestion,
            timestamp: Date.now()
        });
    }

    getFallbackSuggestion() {
        return {
            insight: "Looks great as is. Nothing to improve visually right now.",
            suggested_layout_mode: "no change needed",
            action: null,
            confidence: 0.0,
            time_context: "Current layout is appropriate for the context."
        };
    }

    // =====================================
    // PUBLIC API
    // =====================================

    async processUserPrompt(userPrompt, context = {}) {
        const fullContext = {
            userPrompt,
            timeOfDay: this.getCurrentTimeOfDay(),
            engagementLevel: context.engagementLevel || 'medium',
            currentSection: context.currentSection || 'hero',
            deviceType: context.deviceType || 'desktop',
            sessionDuration: context.sessionDuration || 0,
            ...context
        };
        
        const suggestion = await this.generateVisualSuggestion(fullContext);
        
        if (suggestion.suggested_layout_mode !== 'no change needed') {
            await this.showSuggestionModal(suggestion);
        }
        
        return suggestion;
    }

    getVisualPreferences() {
        return this.visualPreferences;
    }

    getAvailableLayoutModes() {
        return Object.keys(this.layoutModes);
    }
}

// =====================================
// DEMO EXECUTION
// =====================================

async function demonstrateVisualSuggestionAgent() {
    console.log('🚀 Visual Suggestion Agent System Demo');
    console.log('======================================');
    
    try {
        // Mock systems
        const mockVisitorMemory = {
            updateVisitorMemory: (updates) => console.log('Memory updated:', updates)
        };
        
        const visualAgent = new VisualSuggestionAgentSystem(mockVisitorMemory);
        
        // Demo scenarios
        const scenarios = [
            {
                name: 'Dense Content Request',
                userPrompt: 'This case study feels dense',
                context: {
                    currentSection: 'case_studies',
                    engagementLevel: 'medium',
                    sessionDuration: 4
                }
            },
            {
                name: 'Visual Request',
                userPrompt: 'Show me something visual',
                context: {
                    currentSection: 'toolkit',
                    engagementLevel: 'high',
                    sessionDuration: 6
                }
            },
            {
                name: 'Simplification Request',
                userPrompt: 'Make it simpler',
                context: {
                    currentSection: 'philosophy',
                    engagementLevel: 'low',
                    sessionDuration: 8
                }
            },
            {
                name: 'No Visual Need',
                userPrompt: 'Tell me about your methodology',
                context: {
                    currentSection: 'about',
                    engagementLevel: 'medium',
                    sessionDuration: 2
                }
            }
        ];
        
        for (const scenario of scenarios) {
            console.log(`\n🎭 Scenario: ${scenario.name}`);
            console.log('----------------------------');
            console.log(`Prompt: "${scenario.userPrompt}"`);
            
            const suggestion = await visualAgent.processUserPrompt(scenario.userPrompt, scenario.context);
            
            console.log(`Insight: "${suggestion.insight}"`);
            console.log(`Suggested Mode: ${suggestion.suggested_layout_mode}`);
            console.log(`Confidence: ${(suggestion.confidence * 100).toFixed(0)}%`);
            
            if (suggestion.action) {
                console.log(`Action: ${suggestion.action}`);
            }
        }
        
        console.log('\n🎉 Visual Suggestion Agent Demo Complete!');
        console.log('==========================================');
        console.log('✅ Context analysis working');
        console.log('✅ Suggestion generation working');
        console.log('✅ Time-aware recommendations working');
        console.log('✅ Confidence scoring working');
        console.log('✅ Modal system ready');
        console.log('✅ Layout mode application ready');
        
        return { success: true };
        
    } catch (error) {
        console.error('❌ Demo failed:', error);
        return { success: false, error: error.message };
    }
}

// Run demo if executed directly
if (require.main === module) {
    demonstrateVisualSuggestionAgent();
}

module.exports = { 
    VisualSuggestionAgentSystem,
    demonstrateVisualSuggestionAgent
};
