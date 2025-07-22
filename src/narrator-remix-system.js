/**
 * Narrator Remix System
 * Interactive UI for remixing case study narrations with different narrative lenses
 * 
 * Features:
 * - 5 remix modes: Strategic, Reflective, Energetic, Poetic, Analytical
 * - Time-aware recommendations and adaptations
 * - Comparison modal showing original vs remixed narration
 * - Enhancement options for further refinement
 * - Memory integration and preference tracking
 */

class NarratorRemixSystem {
    constructor() {
        this.sessionId = `narrator_remix_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        this.remixModes = this.initializeRemixModes();
        this.recommendations = this.initializeRecommendations();
        this.currentRemix = null;
        this.originalNarration = null;
        
        console.log(`🎭 Narrator Remix System initialized: ${this.sessionId}`);
    }

    // Initialize remix modes with specifications
    initializeRemixModes() {
        return {
            strategic: {
                emoji: "🎯",
                label: "Strategic",
                description: "Clear + authoritative - business outcomes and system logic",
                timeAlignment: ["morning", "afternoon"],
                voiceProfile: "analytical",
                keywords: ["systematic", "methodical", "strategic", "outcomes", "results"],
                toneMarkers: ["confidence", "authority", "precision"]
            },
            reflective: {
                emoji: "📖",
                label: "Reflective",
                description: "Calm + narrative - personal growth and applied wisdom",
                timeAlignment: ["evening", "late-night"],
                voiceProfile: "contemplative",
                keywords: ["wisdom", "journey", "growth", "learning", "transformation"],
                toneMarkers: ["contemplation", "depth", "narrative"]
            },
            energetic: {
                emoji: "🚀",
                label: "Energetic",
                description: "Punchy + rhythmic - momentum and urgency to transformation",
                timeAlignment: ["morning", "afternoon"],
                voiceProfile: "dynamic",
                keywords: ["momentum", "breakthrough", "acceleration", "dynamic", "rapid"],
                toneMarkers: ["energy", "movement", "urgency"]
            },
            poetic: {
                emoji: "🎨",
                label: "Poetic",
                description: "Vivid + metaphorical - emotion through analogy and symbolism",
                timeAlignment: ["evening", "afternoon"],
                voiceProfile: "empathetic",
                keywords: ["metaphor", "imagery", "emotion", "artistic", "expressive"],
                toneMarkers: ["creativity", "emotion", "symbolism"]
            },
            analytical: {
                emoji: "🧠",
                label: "Analytical",
                description: "Data-rich + concise - metrics, validation, and hard insights",
                timeAlignment: ["morning", "afternoon"],
                voiceProfile: "analytical",
                keywords: ["data", "metrics", "validation", "insights", "evidence"],
                toneMarkers: ["precision", "logic", "evidence"]
            }
        };
    }

    // Initialize recommendation engine
    initializeRecommendations() {
        return {
            time_based: {
                morning: { primary: "strategic", secondary: "energetic", tertiary: "analytical" },
                afternoon: { primary: "analytical", secondary: "strategic", tertiary: "energetic" },
                evening: { primary: "reflective", secondary: "poetic", tertiary: "contemplative" }
            },
            engagement_based: {
                low: "energetic",
                medium: "strategic",
                high: "reflective",
                deep: "poetic"
            },
            prompt_based: {
                methodology: "analytical",
                leadership: "reflective",
                results: "strategic",
                design: "poetic",
                innovation: "energetic"
            }
        };
    }

    // Show remix selector UI
    showRemixSelector(originalNarration, context = {}) {
        this.originalNarration = originalNarration;
        const timeOfDay = this.getTimeOfDay();
        const recommendedMode = this.getRecommendedMode(timeOfDay, context);

        console.log(`🎭 Showing remix selector for ${timeOfDay} context`);
        console.log(`💡 Recommended mode: ${recommendedMode}`);

        const selectorHTML = this.generateSelectorHTML(recommendedMode, timeOfDay);
        console.log('🎨 Remix Selector HTML Generated:');
        console.log(selectorHTML);

        return {
            html: selectorHTML,
            recommendedMode,
            timeOfDay,
            context
        };
    }

    // Generate selector HTML
    generateSelectorHTML(recommendedMode, timeOfDay) {
        const options = Object.entries(this.remixModes).map(([key, mode]) => {
            const isRecommended = key === recommendedMode;
            const isTimeAligned = mode.timeAlignment.includes(timeOfDay);
            
            return `
                <option value="${key}" 
                        ${isRecommended ? 'selected' : ''} 
                        class="remix-option ${isTimeAligned ? 'time-aligned' : ''} ${isRecommended ? 'recommended' : ''}">
                    ${mode.emoji} ${mode.label}
                    ${isRecommended ? ' (Recommended)' : ''}
                </option>
            `;
        }).join('');

        return `
            <div class="remix-selector-container ${timeOfDay}-theme">
                <div class="selector-header">
                    <h3>🎙 Remix the Narrator</h3>
                    <p class="selector-subtitle">Choose a narrative lens for ${timeOfDay} context</p>
                </div>
                
                <div class="selector-input">
                    <select id="remix-mode-selector" class="remix-selector">
                        <option value="">Choose narrative lens...</option>
                        ${options}
                    </select>
                </div>
                
                <div class="selector-descriptions">
                    ${Object.entries(this.remixModes).map(([key, mode]) => `
                        <div class="mode-description" data-mode="${key}" style="display: none;">
                            <div class="mode-header">
                                <span class="mode-emoji">${mode.emoji}</span>
                                <span class="mode-label">${mode.label}</span>
                                <span class="mode-voice">${mode.voiceProfile}</span>
                            </div>
                            <p class="mode-desc">${mode.description}</p>
                            <div class="mode-keywords">
                                ${mode.keywords.map(keyword => `<span class="keyword-tag">${keyword}</span>`).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="selector-actions">
                    <button class="remix-btn primary" onclick="narratorRemix.processRemix()" disabled>
                        ✨ Remix Narration
                    </button>
                    <button class="cancel-btn secondary" onclick="narratorRemix.cancelRemix()">
                        ↩ Cancel
                    </button>
                </div>
            </div>
        `;
    }

    // Process remix request
    async processRemix(remixMode, context = {}) {
        try {
            console.log(`🎭 Processing remix: ${remixMode}`);
            
            if (!this.originalNarration) {
                throw new Error('No original narration available for remix');
            }

            // Generate remixed narration
            const remixedNarration = await this.generateRemixedNarration(remixMode, context);
            
            // Show comparison modal
            this.showComparisonModal(this.originalNarration, remixedNarration, context);
            
            // Track remix usage
            this.trackRemixUsage(remixMode, context);
            
            this.currentRemix = {
                mode: remixMode,
                narration: remixedNarration,
                timestamp: new Date().toISOString()
            };

            return {
                success: true,
                original: this.originalNarration,
                remixed: remixedNarration,
                mode: remixMode
            };
        } catch (error) {
            console.error('🚨 Error processing remix:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Generate remixed narration
    async generateRemixedNarration(remixMode, context) {
        const timeOfDay = this.getTimeOfDay();
        const mode = this.remixModes[remixMode];
        
        if (!mode) {
            throw new Error(`Invalid remix mode: ${remixMode}`);
        }

        // Simulate Claude API call with remix specifications
        const remixedText = await this.generateRemixText(remixMode, timeOfDay, context);
        
        return {
            narration: remixedText,
            remix_mode: remixMode,
            tone: this.determineTone(remixMode, timeOfDay),
            voice: mode.voiceProfile,
            confidence: this.calculateRemixConfidence(remixMode, timeOfDay, context),
            time_adapted: this.isTimeAdapted(remixMode, timeOfDay),
            timestamp: new Date().toISOString(),
            sessionId: this.sessionId
        };
    }

    // Generate remix text based on mode and context
    async generateRemixText(remixMode, timeOfDay, context) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 200));

        const templates = this.getRemixTemplates();
        const key = `${remixMode}_${timeOfDay}`;
        const template = templates[key] || templates[`${remixMode}_default`] || templates.default;

        // Apply context-specific adaptations
        return this.adaptTemplateForContext(template, remixMode, timeOfDay, context);
    }

    // Get remix templates
    getRemixTemplates() {
        return {
            // Strategic templates
            strategic_morning: "Systematic design thinking transformed complex user friction into measurable business impact. This case demonstrates how strategic methodology delivered 40% engagement increase and 25% conversion boost through disciplined execution.",
            strategic_afternoon: "When strategic design leadership meets systematic execution, transformation becomes measurable. This case study reveals the methodology that turned ambitious vision into quantifiable business outcomes.",
            strategic_evening: "Three decades of strategic design thinking applied to complex challenges, demonstrating how systematic leadership creates solutions that deliver lasting business impact.",

            // Reflective templates
            reflective_morning: "Leading through uncertainty required more than design skills—it demanded clarity, patience, and quiet conviction. This journey traces how craft mastery guided breakthrough thinking.",
            reflective_afternoon: "The path from complexity to clarity reveals itself through patient, systematic thinking. This case study follows the thoughtful progression from challenge to transformative solution.",
            reflective_evening: "Leading through uncertainty required more than design skills—it demanded clarity, patience, and conviction. This journey traces how three decades of craft mastery guided a team through complexity toward breakthrough solutions.",

            // Energetic templates
            energetic_morning: "When ambitious vision meets systematic execution, transformation accelerates rapidly. This case captures the momentum of breakthrough thinking—from initial insight to measurable impact.",
            energetic_afternoon: "Breakthrough thinking meets systematic execution in this high-velocity transformation. Watch how strategic design leadership accelerated from concept to measurable impact in record time.",
            energetic_evening: "Dynamic thinking meets proven methodology in this transformation story. See how strategic momentum carried complex challenges through to breakthrough solutions.",

            // Poetic templates
            poetic_morning: "Like morning light revealing hidden patterns, strategic design thinking illuminates the path from complexity to elegant solutions that feel both inevitable and surprising.",
            poetic_afternoon: "Like a master craftsman shaping raw material into art, this case study reveals how strategic design thinking transforms chaos into clarity through patient, systematic craft.",
            poetic_evening: "Like a master craftsman shaping raw material into art, this case study reveals how strategic design thinking transforms chaos into clarity, complexity into elegant solutions that endure.",

            // Analytical templates
            analytical_morning: "Data-driven design decisions yielded quantifiable results: 60% reduction in user friction, 35% increase in task completion, 50% improvement in satisfaction scores. Here's the systematic methodology that delivered these outcomes.",
            analytical_afternoon: "Systematic analysis revealed the path to measurable impact: 40% engagement increase, 25% conversion boost, 60% reduction in support tickets. This case breaks down the methodology behind these results.",
            analytical_evening: "Three decades of systematic thinking applied to complex challenges, yielding measurable outcomes: significant improvements in user engagement, conversion rates, and operational efficiency through proven methodology.",

            // Default fallback
            default: "Strategic design leadership applied to real-world challenges, demonstrating how systematic thinking creates lasting impact through thoughtful, methodical execution."
        };
    }

    // Adapt template for specific context
    adaptTemplateForContext(template, remixMode, timeOfDay, context) {
        // Simple context adaptation - in production, this would be more sophisticated
        let adaptedTemplate = template;

        // Apply case study specific adaptations
        if (context.caseStudyId) {
            adaptedTemplate = adaptedTemplate.replace(/this case study/gi, `the ${context.caseStudyId} case study`);
        }

        // Apply engagement level adaptations
        if (context.engagementLevel === 'high') {
            adaptedTemplate = adaptedTemplate.replace(/systematic/gi, 'deeply systematic');
        }

        return adaptedTemplate;
    }

    // Show comparison modal
    showComparisonModal(originalNarration, remixedNarration, context) {
        console.log(`🎭 Showing comparison modal`);
        console.log(`📝 Original: "${originalNarration.narration}"`);
        console.log(`✨ Remixed: "${remixedNarration.narration}"`);
        console.log(`🎯 Mode: ${remixedNarration.remix_mode}`);
        console.log(`📊 Confidence: ${remixedNarration.confidence}`);

        const modalHTML = this.generateComparisonModalHTML(originalNarration, remixedNarration, context);
        console.log('🎨 Comparison Modal HTML Generated:');
        console.log(modalHTML);
    }

    // Generate comparison modal HTML
    generateComparisonModalHTML(originalNarration, remixedNarration, context) {
        const mode = this.remixModes[remixedNarration.remix_mode];
        const timeOfDay = this.getTimeOfDay();

        return `
            <div class="narrated-modal-container remix-mode-${remixedNarration.remix_mode} ${timeOfDay}-theme">
                <div class="narrated-header">
                    <div class="header-main">
                        <h2>🎙 Narrator-X: ${mode.emoji} ${mode.label} Lens</h2>
                        <p class="narrated-subtitle">${context.caseStudyId || 'Case Study'} - Remixed for ${timeOfDay}</p>
                    </div>
                    <div class="remix-indicator">
                        <span class="remix-badge">${mode.emoji} ${mode.label}</span>
                        <span class="confidence-badge">${Math.round(remixedNarration.confidence * 100)}%</span>
                    </div>
                </div>
                
                <div class="narration-comparison">
                    <div class="comparison-grid">
                        <div class="original-narration">
                            <h3>📝 Original</h3>
                            <div class="narration-text original">
                                ${originalNarration.narration}
                            </div>
                            <div class="narration-meta">
                                <span class="voice-tag">${originalNarration.voice}</span>
                                <span class="tone-tag">${originalNarration.tone}</span>
                            </div>
                        </div>
                        
                        <div class="remix-arrow">
                            <div class="arrow-icon">🎭</div>
                            <div class="remix-label">Remixed</div>
                        </div>
                        
                        <div class="remixed-narration">
                            <h3>${mode.emoji} Remixed</h3>
                            <div class="narration-text remixed">
                                ${remixedNarration.narration}
                            </div>
                            <div class="narration-meta">
                                <span class="voice-tag">${remixedNarration.voice}</span>
                                <span class="tone-tag">${remixedNarration.tone}</span>
                                <span class="remix-tag">${remixedNarration.remix_mode}</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="remix-context">
                    <h3>🎯 Remix Context</h3>
                    <div class="context-details">
                        <div class="context-item">
                            <span class="context-label">Lens:</span>
                            <span class="context-value">${mode.label}</span>
                        </div>
                        <div class="context-item">
                            <span class="context-label">Time:</span>
                            <span class="context-value">${timeOfDay}</span>
                        </div>
                        <div class="context-item">
                            <span class="context-label">Adaptation:</span>
                            <span class="context-value">${remixedNarration.time_adapted ? 'Yes' : 'No'}</span>
                        </div>
                        <div class="context-item">
                            <span class="context-label">Voice:</span>
                            <span class="context-value">${remixedNarration.voice}</span>
                        </div>
                    </div>
                </div>
                
                <div class="narration-actions">
                    <button class="use-remix-btn primary" onclick="narratorRemix.adoptRemix()">
                        ✨ Use This Remix
                    </button>
                    <button class="try-another-btn secondary" onclick="narratorRemix.showRemixSelector()">
                        🔄 Try Another Lens
                    </button>
                    <button class="save-both-btn tertiary" onclick="narratorRemix.saveBothNarrations()">
                        💾 Save Both
                    </button>
                    <button class="share-remix-btn quaternary" onclick="narratorRemix.shareRemix()">
                        📤 Share Remix
                    </button>
                    <button class="close-remix-btn quinary" onclick="narratorRemix.closeModal()">
                        ↩ Close
                    </button>
                </div>
                
                <div class="remix-enhancement">
                    <h3>🎨 Further Enhancement</h3>
                    <div class="enhancement-grid">
                        <button class="enhance-option" onclick="narratorRemix.enhanceRemix('time-specific')">
                            🕐 More ${timeOfDay}
                        </button>
                        <button class="enhance-option" onclick="narratorRemix.enhanceRemix('voice-specific')">
                            🎭 More ${remixedNarration.voice}
                        </button>
                        <button class="enhance-option" onclick="narratorRemix.enhanceRemix('lens-specific')">
                            ${mode.emoji} More ${mode.label}
                        </button>
                        <button class="enhance-option" onclick="narratorRemix.enhanceRemix('hybrid')">
                            🌟 Hybrid Approach
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // Get recommended mode based on context
    getRecommendedMode(timeOfDay, context) {
        // Time-based recommendation
        const timeRec = this.recommendations.time_based[timeOfDay];
        if (timeRec) {
            return timeRec.primary;
        }

        // Engagement-based recommendation
        if (context.engagementLevel) {
            const engagementRec = this.recommendations.engagement_based[context.engagementLevel];
            if (engagementRec) {
                return engagementRec;
            }
        }

        // Prompt-based recommendation
        if (context.userPrompt) {
            const prompt = context.userPrompt.toLowerCase();
            for (const [keyword, mode] of Object.entries(this.recommendations.prompt_based)) {
                if (prompt.includes(keyword)) {
                    return mode;
                }
            }
        }

        // Default fallback
        return 'strategic';
    }

    // Helper methods
    getTimeOfDay() {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) return 'morning';
        if (hour >= 12 && hour < 18) return 'afternoon';
        return 'evening';
    }

    determineTone(remixMode, timeOfDay) {
        const toneMatrix = {
            strategic: { morning: 'crisp_authoritative', afternoon: 'confident_systematic', evening: 'wise_strategic' },
            reflective: { morning: 'calm_thoughtful', afternoon: 'contemplative_narrative', evening: 'wise_reflective' },
            energetic: { morning: 'dynamic_energetic', afternoon: 'momentum_driven', evening: 'powerful_culminating' },
            poetic: { morning: 'inspired_creative', afternoon: 'artistic_flowing', evening: 'evocative_reflective' },
            analytical: { morning: 'sharp_analytical', afternoon: 'systematic_precise', evening: 'insightful_analytical' }
        };

        return toneMatrix[remixMode]?.[timeOfDay] || 'analytical_professional';
    }

    calculateRemixConfidence(remixMode, timeOfDay, context) {
        let confidence = 0.8; // Base confidence

        // Time alignment bonus
        const mode = this.remixModes[remixMode];
        if (mode.timeAlignment.includes(timeOfDay)) {
            confidence += 0.1;
        }

        // Context richness bonus
        if (context.userPrompt && context.userPrompt.length > 20) {
            confidence += 0.05;
        }

        // Engagement level bonus
        if (context.engagementLevel === 'high' || context.engagementLevel === 'deep') {
            confidence += 0.05;
        }

        return Math.min(confidence, 0.98);
    }

    isTimeAdapted(remixMode, timeOfDay) {
        const mode = this.remixModes[remixMode];
        return mode.timeAlignment.includes(timeOfDay);
    }

    trackRemixUsage(remixMode, context) {
        console.log(`📊 Tracking remix usage: ${remixMode} at ${this.getTimeOfDay()}`);
        // In production, this would send analytics events
    }

    // Action handlers
    adoptRemix() {
        console.log('✨ Adopting remixed narration');
        if (this.currentRemix) {
            // Save to preferences
            this.saveRemixPreference(this.currentRemix.mode);
            return this.currentRemix.narration;
        }
        return null;
    }

    saveBothNarrations() {
        console.log('💾 Saving both narrations');
        // Implementation for saving both original and remixed
    }

    shareRemix() {
        console.log('📤 Sharing remix');
        // Implementation for sharing functionality
    }

    closeModal() {
        console.log('↩ Closing remix modal');
        // Implementation for closing modal
    }

    enhanceRemix(enhancementType) {
        console.log(`🎨 Enhancing remix: ${enhancementType}`);
        // Implementation for further enhancement
    }

    saveRemixPreference(remixMode) {
        try {
            const preferences = JSON.parse(localStorage.getItem('ricrios_remix_preferences') || '{}');
            preferences.lastUsedMode = remixMode;
            preferences.usageCount = (preferences.usageCount || 0) + 1;
            preferences.lastUsed = new Date().toISOString();
            localStorage.setItem('ricrios_remix_preferences', JSON.stringify(preferences));
        } catch (error) {
            console.error('Error saving remix preference:', error);
        }
    }
}

// Demo function
async function demonstrateNarratorRemix() {
    console.log('🎭 === Narrator Remix System Demo ===');
    
    const narratorRemix = new NarratorRemixSystem();
    
    // Sample original narration
    const originalNarration = {
        narration: "Strategic design leadership applied to complex challenges, demonstrating how systematic thinking creates lasting impact.",
        voice: "analytical",
        tone: "professional",
        confidence: 0.85
    };

    // Demo scenarios
    const scenarios = [
        {
            name: 'Evening Reflective Remix',
            remixMode: 'reflective',
            context: {
                caseStudyId: 'bjj-community-platform',
                userPrompt: 'Tell me about the leadership journey',
                engagementLevel: 'high'
            }
        },
        {
            name: 'Morning Energetic Remix',
            remixMode: 'energetic',
            context: {
                caseStudyId: 'chase-travel-experience',
                userPrompt: 'Show me the transformation',
                engagementLevel: 'medium'
            }
        },
        {
            name: 'Afternoon Analytical Remix',
            remixMode: 'analytical',
            context: {
                caseStudyId: 'digital-wealth-platform',
                userPrompt: 'What were the results?',
                engagementLevel: 'deep'
            }
        }
    ];

    // Show remix selector first
    console.log('\n🎨 Showing remix selector...');
    const selectorResult = narratorRemix.showRemixSelector(originalNarration, scenarios[0].context);
    console.log(`✅ Selector shown with recommended mode: ${selectorResult.recommendedMode}`);

    // Test each remix scenario
    for (const scenario of scenarios) {
        console.log(`\n🎬 Testing: ${scenario.name}`);
        console.log(`🎯 Mode: ${scenario.remixMode}`);
        console.log(`📁 Context: ${JSON.stringify(scenario.context, null, 2)}`);
        
        const result = await narratorRemix.processRemix(scenario.remixMode, scenario.context);
        
        if (result.success) {
            console.log(`✅ Success! Confidence: ${result.remixed.confidence}`);
            console.log(`📝 Remixed: "${result.remixed.narration}"`);
            console.log(`🎭 Voice: ${result.remixed.voice}`);
            console.log(`🎵 Tone: ${result.remixed.tone}`);
        } else {
            console.log(`❌ Failed: ${result.error}`);
        }
        
        console.log(`\n${'='.repeat(60)}`);
    }
    
    console.log('\n🎭 Narrator Remix Demo Complete!');
    return narratorRemix;
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { NarratorRemixSystem, demonstrateNarratorRemix };
} else {
    // Browser environment
    window.NarratorRemixSystem = NarratorRemixSystem;
    window.demonstrateNarratorRemix = demonstrateNarratorRemix;
}

// Auto-run demo if this file is executed directly
if (typeof require !== 'undefined' && require.main === module) {
    demonstrateNarratorRemix().then(() => {
        console.log('🎭 Narrator Remix system ready for integration!');
    });
}
