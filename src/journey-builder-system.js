/**
 * Journey Builder System (Lab 3)
 * Advanced journey builder combining remix styles, time travel, and visitor prompts
 * 
 * Features:
 * - 5 storytelling lenses: Editorial, Analytical, Poetic, Bold, Minimalist
 * - Visitor prompt input with suggestions
 * - Time travel integration
 * - Journey preview and export
 * - Memory integration and personalization
 */

class JourneyBuilderSystem {
    constructor() {
        this.sessionId = `journey_builder_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        this.storytellingLenses = this.initializeStorytellingLenses();
        this.promptSuggestions = this.initializePromptSuggestions();
        this.currentJourney = null;
        this.visitorMemory = null;
        
        console.log(`🧪 Journey Builder System (Lab 3) initialized: ${this.sessionId}`);
    }

    // Initialize storytelling lenses
    initializeStorytellingLenses() {
        return {
            editorial: {
                emoji: "📝",
                label: "Editorial",
                description: "Clean, journalistic, professional",
                approach: "Clean, journalistic approach with professional clarity and systematic structure",
                keywords: ["clarity", "structure", "professional", "systematic"],
                voice: "authoritative_clear"
            },
            analytical: {
                emoji: "🧠",
                label: "Analytical",
                description: "Data-driven, systematic, precise",
                approach: "Data-driven storytelling with systematic analysis and measurable insights",
                keywords: ["data", "systematic", "analysis", "insights"],
                voice: "analytical_precise"
            },
            poetic: {
                emoji: "🎨",
                label: "Poetic",
                description: "Metaphorical, expressive, artistic",
                approach: "Metaphorical and expressive approach with artistic depth and emotional resonance",
                keywords: ["metaphor", "expression", "artistic", "emotional"],
                voice: "expressive_artistic"
            },
            bold: {
                emoji: "🚀",
                label: "Bold",
                description: "Dynamic, energetic, breakthrough-focused",
                approach: "Dynamic, energetic storytelling focused on breakthrough moments and transformation",
                keywords: ["dynamic", "energetic", "breakthrough", "transformation"],
                voice: "bold_dynamic"
            },
            minimalist: {
                emoji: "⚡",
                label: "Minimalist",
                description: "Essential, refined, distilled",
                approach: "Essential, refined approach that distills complex ideas into elegant simplicity",
                keywords: ["essential", "refined", "distilled", "elegant"],
                voice: "minimal_refined"
            }
        };
    }

    // Initialize prompt suggestions
    initializePromptSuggestions() {
        return [
            {
                text: "Show me how systematic thinking creates breakthrough results",
                category: "methodology",
                timeAlignment: ["morning", "afternoon"]
            },
            {
                text: "Tell me about leadership under pressure and uncertainty",
                category: "leadership",
                timeAlignment: ["evening", "afternoon"]
            },
            {
                text: "Explain how design thinking transforms complex challenges",
                category: "transformation",
                timeAlignment: ["morning", "afternoon"]
            },
            {
                text: "Reveal the methodology behind strategic innovation",
                category: "innovation",
                timeAlignment: ["morning", "afternoon"]
            },
            {
                text: "Share the journey from complexity to elegant solutions",
                category: "journey",
                timeAlignment: ["evening", "afternoon"]
            },
            {
                text: "Demonstrate how craft mastery creates lasting impact",
                category: "mastery",
                timeAlignment: ["evening", "afternoon"]
            }
        ];
    }

    // Initialize journey builder
    async initializeJourneyBuilder(context = {}) {
        try {
            console.log(`🧪 Initializing Journey Builder`);
            
            // Load visitor memory
            this.visitorMemory = await this.loadVisitorMemory(context.visitorId);
            
            // Detect time context
            const timeContext = this.detectTimeContext();
            
            // Show journey interface
            this.showJourneyInterface(timeContext);
            
            return {
                success: true,
                visitorMemory: this.visitorMemory,
                timeContext,
                sessionId: this.sessionId
            };
        } catch (error) {
            console.error('🚨 Error initializing Journey Builder:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Load visitor memory
    async loadVisitorMemory(visitorId) {
        // Simulate memory loading
        await new Promise(resolve => setTimeout(resolve, 100));

        // Mock visitor memory data
        return {
            promptStylePreference: null,
            timePreference: null,
            journeyHistory: [],
            personalizationScore: 0.6,
            engagementLevel: 'medium',
            lastPrompt: null
        };
    }

    // Detect time context
    detectTimeContext() {
        const currentTime = this.getTimeOfDay();
        
        return {
            currentTimeOfDay: currentTime,
            recommendedTimeContext: currentTime,
            timePreferenceOverride: false
        };
    }

    // Show journey interface
    showJourneyInterface(timeContext) {
        console.log(`🎨 Showing Journey Builder interface for ${timeContext.currentTimeOfDay} context`);
        
        const interfaceHTML = this.generateJourneyInterfaceHTML(timeContext);
        console.log('🎨 Journey Builder Interface HTML Generated:');
        console.log(interfaceHTML);
    }

    // Generate journey interface HTML
    generateJourneyInterfaceHTML(timeContext) {
        const currentTime = timeContext.currentTimeOfDay;
        const personalizationScore = this.visitorMemory?.personalizationScore || 0.6;
        
        return `
            <div class="journey-builder-container ${currentTime}-theme">
                <div class="journey-header">
                    <h2>🧪 Lab 3: Journey Builder</h2>
                    <p class="journey-subtitle">Create your personalized storytelling experience</p>
                    <div class="time-context-display">
                        <span class="current-time">${currentTime} Context</span>
                        <span class="personalization-score">${Math.round(personalizationScore * 100)}% Personalized</span>
                    </div>
                </div>
                
                <div class="journey-components">
                    <!-- Storytelling Lens Selector -->
                    <div class="component-section">
                        <h3>🎭 Choose Your Storytelling Lens</h3>
                        <div class="lens-selector">
                            <select id="prompt-style-selector" class="style-selector">
                                <option value="">Select storytelling approach...</option>
                                ${Object.entries(this.storytellingLenses).map(([key, lens]) => `
                                    <option value="${key}">
                                        ${lens.emoji} ${lens.label} - ${lens.description}
                                    </option>
                                `).join('')}
                            </select>
                        </div>
                        
                        <div class="lens-descriptions">
                            ${Object.entries(this.storytellingLenses).map(([key, lens]) => `
                                <div class="lens-description" data-lens="${key}" style="display: none;">
                                    <p>${lens.approach}</p>
                                    <div class="lens-keywords">
                                        ${lens.keywords.map(keyword => `<span class="keyword-tag">${keyword}</span>`).join('')}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <!-- Visitor Prompt Input -->
                    <div class="component-section">
                        <h3>💭 What's Your Vision?</h3>
                        <div class="prompt-input-container">
                            <textarea 
                                id="visitor-prompt" 
                                class="visitor-prompt-input"
                                placeholder="Write a prompt to shape your journey... What story do you want to explore?"
                                rows="4"
                            ></textarea>
                            
                            <div class="prompt-suggestions">
                                <h4>💡 Prompt Suggestions</h4>
                                <div class="suggestion-buttons">
                                    ${this.promptSuggestions.map(suggestion => `
                                        <button class="suggestion-btn" data-prompt="${suggestion.text}">
                                            ${suggestion.text}
                                        </button>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Time Travel Integration -->
                    <div class="component-section">
                        <h3>🕰️ Time Perspective</h3>
                        <div class="time-controls">
                            <div class="current-time-display">
                                <span class="time-label">Current Context:</span>
                                <span class="time-value">${currentTime}</span>
                            </div>
                            
                            <div class="time-options">
                                <button class="time-option-btn" data-time="morning">
                                    🌅 Morning (Analytical)
                                </button>
                                <button class="time-option-btn" data-time="afternoon">
                                    🌞 Afternoon (Strategic)
                                </button>
                                <button class="time-option-btn" data-time="evening">
                                    🌙 Evening (Reflective)
                                </button>
                                <button class="time-travel-btn" data-action="enableTimeTravel">
                                    🕰️ Enable Time Travel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="journey-actions">
                    <button class="create-journey-btn primary" onclick="journeyBuilder.createJourney()" disabled>
                        ✨ Create Journey
                    </button>
                    <button class="preview-journey-btn secondary" onclick="journeyBuilder.previewJourney()" disabled>
                        👁 Preview Journey
                    </button>
                    <button class="reset-journey-btn tertiary" onclick="journeyBuilder.resetJourney()">
                        🔄 Reset
                    </button>
                </div>
            </div>
        `;
    }

    // Create journey
    async createJourney(promptStyle, visitorPrompt, timeContext = null) {
        try {
            console.log(`🧪 Creating journey with style: ${promptStyle}`);
            console.log(`💭 Visitor prompt: "${visitorPrompt}"`);
            
            if (!promptStyle || !visitorPrompt) {
                throw new Error('Missing required inputs: promptStyle and visitorPrompt');
            }

            // Generate personalized journey
            const personalizedJourney = await this.generatePersonalizedJourney({
                promptStyle,
                visitorPrompt,
                timeOfDay: timeContext || this.getTimeOfDay(),
                visitorContext: this.visitorMemory
            });

            this.currentJourney = personalizedJourney;
            
            return {
                success: true,
                journey: personalizedJourney
            };
        } catch (error) {
            console.error('🚨 Error creating journey:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Generate personalized journey
    async generatePersonalizedJourney(inputs) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 200));

        const { promptStyle, visitorPrompt, timeOfDay, visitorContext } = inputs;
        const lens = this.storytellingLenses[promptStyle];
        
        if (!lens) {
            throw new Error(`Invalid prompt style: ${promptStyle}`);
        }

        // Generate journey based on style and context
        const journeyNarration = await this.generateJourneyNarration(inputs);
        
        return {
            journey_narration: journeyNarration,
            style_applied: promptStyle,
            time_adaptation: timeOfDay,
            personalization_level: this.calculatePersonalizationLevel(visitorContext),
            confidence: this.calculateJourneyConfidence(inputs),
            next_steps: this.generateNextSteps(promptStyle, visitorPrompt),
            timestamp: new Date().toISOString(),
            sessionId: this.sessionId
        };
    }

    // Generate journey narration
    async generateJourneyNarration(inputs) {
        const { promptStyle, visitorPrompt, timeOfDay } = inputs;
        const lens = this.storytellingLenses[promptStyle];
        
        // Get base templates
        const templates = this.getJourneyTemplates();
        const template = templates[promptStyle] || templates.default;
        
        // Adapt for time of day
        const timeAdaptedTemplate = this.adaptTemplateForTime(template, timeOfDay);
        
        // Personalize based on visitor prompt
        const personalizedNarration = this.personalizeNarration(timeAdaptedTemplate, visitorPrompt, lens);
        
        return personalizedNarration;
    }

    // Get journey templates
    getJourneyTemplates() {
        return {
            editorial: "Systematic design thinking applied to your specific challenge reveals clear pathways to measurable impact. This journey demonstrates how professional methodology transforms complex requirements into elegant, scalable solutions.",
            
            analytical: "Data-driven analysis of your challenge yields quantifiable insights: systematic approach increases success probability by 40%, reduces implementation time by 25%, and delivers measurable outcomes through proven methodology.",
            
            poetic: "Like a master craftsman shaping raw vision into refined reality, this journey transforms your challenge into an elegant narrative of systematic thinking meeting creative courage.",
            
            bold: "When ambitious vision meets systematic execution, breakthrough transformation accelerates rapidly. This journey captures the dynamic momentum from initial insight to measurable impact.",
            
            minimalist: "Essential thinking applied to complex challenges. Clear methodology, focused execution, elegant results.",
            
            default: "Strategic design thinking applied to your specific challenge, demonstrating how systematic approach creates lasting impact through thoughtful execution."
        };
    }

    // Adapt template for time of day
    adaptTemplateForTime(template, timeOfDay) {
        const timeAdaptations = {
            morning: {
                prefix: "Fresh perspective meets systematic methodology: ",
                suffix: " Clear execution drives measurable progress.",
                keywords: { "systematic": "crisp systematic", "methodology": "morning-clear methodology" }
            },
            afternoon: {
                prefix: "Strategic thinking meets proven execution: ",
                suffix: " Professional confidence delivers consistent results.",
                keywords: { "systematic": "strategic systematic", "methodology": "results-driven methodology" }
            },
            evening: {
                prefix: "Reflective wisdom meets systematic craft: ",
                suffix: " Thoughtful execution creates enduring impact.",
                keywords: { "systematic": "contemplative systematic", "methodology": "wisdom-informed methodology" }
            }
        };

        const adaptation = timeAdaptations[timeOfDay];
        if (!adaptation) return template;

        let adaptedTemplate = template;
        
        // Apply keyword replacements
        Object.entries(adaptation.keywords).forEach(([original, replacement]) => {
            adaptedTemplate = adaptedTemplate.replace(new RegExp(original, 'gi'), replacement);
        });

        return adaptedTemplate;
    }

    // Personalize narration based on visitor prompt
    personalizeNarration(template, visitorPrompt, lens) {
        // Extract key themes from visitor prompt
        const themes = this.extractThemes(visitorPrompt);
        
        // Apply personalization based on themes
        let personalizedTemplate = template;
        
        if (themes.includes('leadership')) {
            personalizedTemplate = personalizedTemplate.replace(/design thinking/gi, 'leadership-centered design thinking');
        }
        if (themes.includes('innovation')) {
            personalizedTemplate = personalizedTemplate.replace(/systematic/gi, 'innovation-driven systematic');
        }
        if (themes.includes('transformation')) {
            personalizedTemplate = personalizedTemplate.replace(/impact/gi, 'transformative impact');
        }
        
        return personalizedTemplate;
    }

    // Extract themes from visitor prompt
    extractThemes(prompt) {
        const themeKeywords = {
            leadership: ['leadership', 'leading', 'leader', 'team', 'management'],
            innovation: ['innovation', 'innovative', 'breakthrough', 'creative', 'novel'],
            transformation: ['transformation', 'transform', 'change', 'evolution', 'shift'],
            methodology: ['methodology', 'process', 'systematic', 'approach', 'method'],
            results: ['results', 'outcomes', 'impact', 'success', 'achievement']
        };

        const themes = [];
        const lowerPrompt = prompt.toLowerCase();
        
        Object.entries(themeKeywords).forEach(([theme, keywords]) => {
            if (keywords.some(keyword => lowerPrompt.includes(keyword))) {
                themes.push(theme);
            }
        });

        return themes;
    }

    // Calculate personalization level
    calculatePersonalizationLevel(visitorContext) {
        if (!visitorContext) return 0.6;
        
        let level = 0.5; // Base level
        
        if (visitorContext.journeyHistory && visitorContext.journeyHistory.length > 0) level += 0.2;
        if (visitorContext.promptStylePreference) level += 0.1;
        if (visitorContext.engagementLevel === 'high') level += 0.1;
        if (visitorContext.lastPrompt) level += 0.1;
        
        return Math.min(level, 1.0);
    }

    // Calculate journey confidence
    calculateJourneyConfidence(inputs) {
        let confidence = 0.8; // Base confidence
        
        if (inputs.visitorPrompt && inputs.visitorPrompt.length > 20) confidence += 0.05;
        if (inputs.visitorContext && inputs.visitorContext.engagementLevel === 'high') confidence += 0.05;
        if (inputs.promptStyle && this.storytellingLenses[inputs.promptStyle]) confidence += 0.05;
        if (inputs.timeOfDay) confidence += 0.05;
        
        return Math.min(confidence, 0.98);
    }

    // Generate next steps
    generateNextSteps(promptStyle, visitorPrompt) {
        const baseSteps = {
            editorial: [
                "Review the systematic methodology outlined",
                "Apply the structured approach to your specific challenge",
                "Document progress and outcomes for future reference"
            ],
            analytical: [
                "Analyze the data-driven insights provided",
                "Implement the systematic approach with measurable milestones",
                "Track quantifiable results and iterate based on findings"
            ],
            poetic: [
                "Reflect on the metaphorical insights and their application",
                "Embrace the creative aspects of systematic thinking",
                "Allow the narrative to guide your approach to the challenge"
            ],
            bold: [
                "Take decisive action based on the breakthrough insights",
                "Implement the dynamic approach with momentum and energy",
                "Scale the successful elements rapidly for maximum impact"
            ],
            minimalist: [
                "Focus on the essential elements identified",
                "Eliminate unnecessary complexity from your approach",
                "Execute with clarity and purposeful simplicity"
            ]
        };

        return baseSteps[promptStyle] || baseSteps.editorial;
    }

    // Preview journey
    previewJourney() {
        if (!this.currentJourney) {
            console.error('No journey available to preview');
            return null;
        }

        console.log(`👁 Previewing journey`);
        console.log(`📖 Journey: "${this.currentJourney.journey_narration}"`);
        console.log(`🎭 Style: ${this.currentJourney.style_applied}`);
        console.log(`🕰️ Time: ${this.currentJourney.time_adaptation}`);
        console.log(`📊 Personalization: ${Math.round(this.currentJourney.personalization_level * 100)}%`);
        console.log(`🎯 Confidence: ${Math.round(this.currentJourney.confidence * 100)}%`);

        const previewHTML = this.generateJourneyPreviewHTML();
        console.log('🎨 Journey Preview HTML Generated:');
        console.log(previewHTML);

        return this.currentJourney;
    }

    // Generate journey preview HTML
    generateJourneyPreviewHTML() {
        if (!this.currentJourney) return '';

        return `
            <div class="journey-preview-container">
                <div class="preview-header">
                    <h2>👁 Journey Preview</h2>
                    <p class="preview-subtitle">Your personalized storytelling experience</p>
                </div>
                
                <div class="journey-details">
                    <div class="detail-grid">
                        <div class="detail-item">
                            <span class="detail-label">Style:</span>
                            <span class="detail-value">${this.currentJourney.style_applied}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Time Context:</span>
                            <span class="detail-value">${this.currentJourney.time_adaptation}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Personalization:</span>
                            <span class="detail-value">${Math.round(this.currentJourney.personalization_level * 100)}%</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Confidence:</span>
                            <span class="detail-value">${Math.round(this.currentJourney.confidence * 100)}%</span>
                        </div>
                    </div>
                </div>
                
                <div class="journey-content">
                    <h3>📖 Your Journey</h3>
                    <div class="journey-narration">
                        ${this.currentJourney.journey_narration}
                    </div>
                    
                    <div class="next-steps">
                        <h4>🎯 Next Steps</h4>
                        <ul class="steps-list">
                            ${this.currentJourney.next_steps.map(step => `<li class="step-item">${step}</li>`).join('')}
                        </ul>
                    </div>
                </div>
                
                <div class="preview-actions">
                    <button class="finalize-journey-btn primary" onclick="journeyBuilder.finalizeJourney()">
                        ✅ Finalize Journey
                    </button>
                    <button class="edit-journey-btn secondary" onclick="journeyBuilder.editJourney()">
                        ✏️ Edit Journey
                    </button>
                    <button class="save-preview-btn tertiary" onclick="journeyBuilder.saveJourney()">
                        💾 Save Journey
                    </button>
                    <button class="close-preview-btn quaternary" onclick="journeyBuilder.closePreview()">
                        ↩ Close Preview
                    </button>
                </div>
            </div>
        `;
    }

    // Save journey experience
    saveJourneyExperience() {
        if (!this.currentJourney) {
            console.error('No journey available to save');
            return false;
        }

        try {
            const exportData = {
                visitor_prompt: this.currentJourney.visitor_prompt,
                prompt_style_preference: this.currentJourney.style_applied,
                journey: this.currentJourney,
                timeContext: this.currentJourney.time_adaptation,
                personalizationScore: this.currentJourney.personalization_level,
                timestamp: new Date().toISOString(),
                sessionId: this.sessionId
            };

            console.log('📦 Exporting journey experience:');
            console.log(JSON.stringify(exportData, null, 2));

            // In production, this would save to localStorage or export as file
            console.log('💾 Journey experience saved successfully');
            return true;
        } catch (error) {
            console.error('Error saving journey experience:', error);
            return false;
        }
    }

    // Helper methods
    getTimeOfDay() {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) return 'morning';
        if (hour >= 12 && hour < 18) return 'afternoon';
        return 'evening';
    }

    // Action handlers
    resetJourney() {
        console.log('🔄 Resetting journey builder');
        this.currentJourney = null;
        // Reset UI state
    }

    finalizeJourney() {
        console.log('✅ Finalizing journey');
        if (this.currentJourney) {
            this.saveJourneyExperience();
            return this.currentJourney;
        }
        return null;
    }

    editJourney() {
        console.log('✏️ Editing journey');
        // Return to journey builder interface
    }

    closePreview() {
        console.log('↩ Closing journey preview');
        // Close preview modal
    }
}

// Demo function
async function demonstrateJourneyBuilder() {
    console.log('🧪 === Journey Builder System (Lab 3) Demo ===');
    
    const journeyBuilder = new JourneyBuilderSystem();
    
    // Initialize journey builder
    console.log('\n🎨 Initializing Journey Builder...');
    const initResult = await journeyBuilder.initializeJourneyBuilder({ visitorId: 'demo_visitor' });
    console.log(`✅ Initialization: ${initResult.success ? 'Success' : 'Failed'}`);

    // Demo scenarios
    const scenarios = [
        {
            name: 'Editorial Leadership Journey',
            promptStyle: 'editorial',
            visitorPrompt: 'Show me how systematic thinking creates breakthrough results in leadership challenges',
            timeContext: 'morning'
        },
        {
            name: 'Poetic Innovation Journey',
            promptStyle: 'poetic',
            visitorPrompt: 'Tell me about the journey from complexity to elegant solutions',
            timeContext: 'evening'
        },
        {
            name: 'Bold Transformation Journey',
            promptStyle: 'bold',
            visitorPrompt: 'Reveal the methodology behind strategic innovation and rapid transformation',
            timeContext: 'afternoon'
        }
    ];

    for (const scenario of scenarios) {
        console.log(`\n🎬 Testing: ${scenario.name}`);
        console.log(`🎭 Style: ${scenario.promptStyle}`);
        console.log(`💭 Prompt: "${scenario.visitorPrompt}"`);
        console.log(`🕰️ Time: ${scenario.timeContext}`);
        
        const result = await journeyBuilder.createJourney(
            scenario.promptStyle,
            scenario.visitorPrompt,
            scenario.timeContext
        );
        
        if (result.success) {
            console.log(`✅ Success! Journey created`);
            console.log(`📖 Journey: "${result.journey.journey_narration}"`);
            console.log(`📊 Personalization: ${Math.round(result.journey.personalization_level * 100)}%`);
            console.log(`🎯 Confidence: ${Math.round(result.journey.confidence * 100)}%`);
            
            // Test preview
            console.log(`\n👁 Testing preview...`);
            const preview = journeyBuilder.previewJourney();
            console.log(`✅ Preview: ${preview ? 'Success' : 'Failed'}`);
            
            // Test save
            console.log(`\n💾 Testing save...`);
            const saved = journeyBuilder.saveJourneyExperience();
            console.log(`✅ Save: ${saved ? 'Success' : 'Failed'}`);
        } else {
            console.log(`❌ Failed: ${result.error}`);
        }
        
        console.log(`\n${'='.repeat(60)}`);
    }
    
    console.log('\n🧪 Journey Builder Demo Complete!');
    return journeyBuilder;
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { JourneyBuilderSystem, demonstrateJourneyBuilder };
} else {
    // Browser environment
    window.JourneyBuilderSystem = JourneyBuilderSystem;
    window.demonstrateJourneyBuilder = demonstrateJourneyBuilder;
}

// Auto-run demo if this file is executed directly
if (typeof require !== 'undefined' && require.main === module) {
    demonstrateJourneyBuilder().then(() => {
        console.log('🧪 Journey Builder system ready for integration!');
    });
}
