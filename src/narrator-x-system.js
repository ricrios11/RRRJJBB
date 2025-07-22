/**
 * Narrator-X: Dynamic Case Study Storyteller
 * Adaptive agent for transforming case studies into living, breathing stories
 * 
 * Features:
 * - Time-aware narration generation
 * - Evolution mode integration (metric, method, visual, emotional, remix)
 * - Style theme alignment
 * - Voice profile adaptation
 * - Confidence-based activation
 * - Regeneration and enhancement capabilities
 */

class NarratorXSystem {
    constructor() {
        this.sessionId = `narrator_x_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        this.confidenceThreshold = 0.85;
        this.regenerationCount = 0;
        this.voiceProfiles = this.initializeVoiceProfiles();
        this.evolutionModes = this.initializeEvolutionModes();
        this.styleThemes = this.initializeStyleThemes();
        
        console.log(`🎙 Narrator-X System initialized: ${this.sessionId}`);
    }

    // Initialize voice profiles
    initializeVoiceProfiles() {
        return {
            analytical: {
                description: "Crisp, systematic, methodical voice",
                keywords: ["systematic", "methodical", "strategic", "analytical"],
                toneMarkers: ["precision", "clarity", "logic"],
                timeAlignment: ["morning", "afternoon"]
            },
            empathetic: {
                description: "Warm, human-centered, leadership-focused voice",
                keywords: ["leadership", "team", "human", "empathetic"],
                toneMarkers: ["warmth", "understanding", "connection"],
                timeAlignment: ["evening", "afternoon"]
            },
            dynamic: {
                description: "Energetic, creative, visually-rich voice",
                keywords: ["dynamic", "creative", "innovative", "expressive"],
                toneMarkers: ["energy", "creativity", "movement"],
                timeAlignment: ["morning", "afternoon", "evening"]
            },
            contemplative: {
                description: "Reflective, wise, depth-focused voice",
                keywords: ["contemplative", "reflective", "wise", "thoughtful"],
                toneMarkers: ["depth", "wisdom", "reflection"],
                timeAlignment: ["evening", "late-night"]
            }
        };
    }

    // Initialize evolution modes
    initializeEvolutionModes() {
        return {
            metric: "impact, results, transformation, measurable outcomes",
            method: "process, systematic thinking, methodology, step-by-step approach",
            visual: "design decisions, aesthetic choices, visual problem-solving, interface evolution",
            emotional: "leadership journey, team dynamics, human elements, personal growth",
            remix: "fresh perspective, alternative angle, surprising insights, different lens"
        };
    }

    // Initialize style themes
    initializeStyleThemes() {
        return {
            'editorial-card': 'Clean, professional, journalistic voice',
            'zen-mono': 'Minimalist, contemplative, essential voice',
            'neon-grid': 'Modern, dynamic, tech-forward voice',
            'neoblueprint': 'Technical, systematic, architectural voice',
            'minimal-glass': 'Elegant, refined, sophisticated voice',
            'strategic-canvas': 'Warm, strategic, leadership-focused voice'
        };
    }

    // Main narration trigger
    async triggerNarration(caseStudyId, context = {}) {
        try {
            console.log(`🎙 Narrator-X: Triggering narration for ${caseStudyId}`);
            
            // Assess narration confidence
            const confidenceAssessment = await this.assessNarrationConfidence(caseStudyId, context);
            
            if (confidenceAssessment.confidence >= this.confidenceThreshold) {
                console.log(`✅ Confidence threshold met: ${confidenceAssessment.confidence}`);
                
                // Generate narration
                const narration = await this.generateNarration(caseStudyId, context, confidenceAssessment);
                
                // Show narration interface
                this.showNarrationInterface(narration, context);
                
                return {
                    success: true,
                    narration,
                    confidence: confidenceAssessment.confidence
                };
            } else {
                console.log(`❌ Confidence too low: ${confidenceAssessment.confidence}`);
                this.logLowConfidence(confidenceAssessment, context);
                
                return {
                    success: false,
                    reason: 'low_confidence',
                    confidence: confidenceAssessment.confidence
                };
            }
        } catch (error) {
            console.error('🚨 Narrator-X: Error in triggerNarration:', error);
            return {
                success: false,
                reason: 'generation_error',
                error: error.message
            };
        }
    }

    // Assess narration confidence
    async assessNarrationConfidence(caseStudyId, context) {
        try {
            const timeOfDay = this.getTimeOfDay();
            const userPrompt = context.userPrompt || '';
            const evolutionMode = context.evolutionMode || 'method';
            const styleTheme = context.styleTheme || 'editorial-card';
            const engagementLevel = context.engagementLevel || 'medium';

            // Calculate confidence factors
            const contextRichness = this.analyzeContextRichness(context);
            const promptClarity = this.evaluatePromptClarity(userPrompt);
            const styleAlignment = this.assessStyleAlignment(styleTheme, timeOfDay);
            const narrationValue = this.calculateNarrationValue(evolutionMode, engagementLevel);

            // Overall confidence calculation
            const confidence = (contextRichness + promptClarity + styleAlignment + narrationValue) / 4;
            
            // Voice recommendation
            const voiceRecommendation = this.recommendVoice(timeOfDay, evolutionMode, styleTheme);

            return {
                confidence: Math.round(confidence * 100) / 100,
                shouldNarrate: confidence >= this.confidenceThreshold,
                reasoning: this.generateConfidenceReasoning(confidence, {
                    contextRichness,
                    promptClarity,
                    styleAlignment,
                    narrationValue
                }),
                voiceRecommendation
            };
        } catch (error) {
            console.error('🚨 Narrator-X: Error in assessNarrationConfidence:', error);
            return {
                confidence: 0.5,
                shouldNarrate: false,
                reasoning: 'Assessment failed due to error',
                voiceRecommendation: 'analytical'
            };
        }
    }

    // Generate narration
    async generateNarration(caseStudyId, context, confidenceAssessment) {
        try {
            const timeOfDay = this.getTimeOfDay();
            const prompt = context.userPrompt || '';
            const evolutionMode = context.evolutionMode || 'method';
            const styleTheme = context.styleTheme || 'editorial-card';
            const engagementLevel = context.engagementLevel || 'medium';
            const voiceRecommendation = confidenceAssessment.voiceRecommendation;

            // Generate narration based on context
            const narration = await this.generateContextualNarration({
                caseStudyId,
                timeOfDay,
                prompt,
                evolutionMode,
                styleTheme,
                engagementLevel,
                voiceRecommendation
            });

            return {
                narration: narration.text,
                tone: narration.tone,
                voice: narration.voice,
                confidence: narration.confidence,
                timestamp: new Date().toISOString(),
                sessionId: this.sessionId
            };
        } catch (error) {
            console.error('🚨 Narrator-X: Error in generateNarration:', error);
            return {
                narration: this.getDefaultNarration(caseStudyId),
                tone: 'analytical',
                voice: 'analytical',
                confidence: 0.6,
                timestamp: new Date().toISOString(),
                sessionId: this.sessionId
            };
        }
    }

    // Generate contextual narration (simulated Claude API call)
    async generateContextualNarration(context) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 100));

        const { caseStudyId, timeOfDay, prompt, evolutionMode, styleTheme, voiceRecommendation } = context;

        // Generate narration based on context matrix
        const narrationTemplates = this.getNarrationTemplates();
        const template = this.selectTemplate(narrationTemplates, timeOfDay, evolutionMode, styleTheme);
        
        const narration = this.populateTemplate(template, {
            caseStudyId,
            prompt,
            evolutionMode,
            styleTheme,
            timeOfDay
        });

        return {
            text: narration,
            tone: this.determineTone(timeOfDay, evolutionMode),
            voice: voiceRecommendation,
            confidence: 0.92
        };
    }

    // Get narration templates
    getNarrationTemplates() {
        return {
            morning_strategic: "When systematic thinking meets strategic execution, transformation becomes inevitable. This case study breaks down the methodology that turned ambitious vision into measurable impact.",
            
            morning_visual: "Clean lines, purposeful choices, and strategic clarity converge in this design exploration. See how methodical craft creates interfaces that feel both inevitable and surprising.",
            
            afternoon_metric: "The numbers tell the story: significant increases in engagement, dramatic reductions in friction, measurable boosts in conversion. Here's the systematic approach that delivered these results.",
            
            afternoon_method: "Systematic design thinking applied to complex challenges yields predictable excellence. This case traces the methodology from strategic insight to scalable implementation.",
            
            evening_emotional: "Leading under pressure required more than design instincts—it took clarity, kindness, and conviction. This case traces how complexity became calm, aligning vision with every detail.",
            
            evening_remix: "Three decades of craft mastery meets fresh perspective in this reimagined case study. Sometimes the most profound insights emerge when we view familiar challenges through new lenses.",
            
            default: "Strategic design leadership applied to real-world challenges, demonstrating how systematic thinking creates lasting impact."
        };
    }

    // Select appropriate template
    selectTemplate(templates, timeOfDay, evolutionMode, styleTheme) {
        const key = `${timeOfDay}_${evolutionMode}`;
        return templates[key] || templates.default;
    }

    // Populate template with context
    populateTemplate(template, context) {
        // Simple template population - in production, this would be more sophisticated
        return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
            return context[key] || match;
        });
    }

    // Determine tone based on context
    determineTone(timeOfDay, evolutionMode) {
        const toneMatrix = {
            morning: {
                metric: 'energetic_analytical',
                method: 'crisp_systematic',
                visual: 'fresh_creative',
                emotional: 'warm_optimistic',
                remix: 'dynamic_innovative'
            },
            afternoon: {
                metric: 'confident_driven',
                method: 'professional_precise',
                visual: 'focused_creative',
                emotional: 'balanced_empathetic',
                remix: 'strategic_adaptive'
            },
            evening: {
                metric: 'reflective_analytical',
                method: 'contemplative_systematic',
                visual: 'sophisticated_creative',
                emotional: 'wise_empathetic',
                remix: 'thoughtful_innovative'
            }
        };

        return toneMatrix[timeOfDay]?.[evolutionMode] || 'analytical_professional';
    }

    // Show narration interface
    showNarrationInterface(narration, context) {
        console.log(`🎙 Narrator-X: Showing narration interface`);
        console.log(`📝 Narration: "${narration.narration}"`);
        console.log(`🎭 Voice: ${narration.voice}`);
        console.log(`🎵 Tone: ${narration.tone}`);
        console.log(`📊 Confidence: ${narration.confidence}`);

        // In a real implementation, this would create the modal UI
        this.createNarrationModal(narration, context);
    }

    // Create narration modal (simulated)
    createNarrationModal(narration, context) {
        const modalHTML = `
            <div class="narration-modal narrator-x ${this.getTimeOfDay()}-theme">
                <div class="narration-header">
                    <h2>🎙 Narrator-X: Your Case Study Story</h2>
                    <p class="narration-subtitle">Adaptive storytelling for ${context.caseStudyId || 'this case study'}</p>
                </div>
                
                <div class="narration-context">
                    <div class="context-grid">
                        <div class="context-item">
                            <span class="context-label">Voice:</span>
                            <span class="context-value">${narration.voice}</span>
                        </div>
                        <div class="context-item">
                            <span class="context-label">Tone:</span>
                            <span class="context-value">${narration.tone}</span>
                        </div>
                        <div class="context-item">
                            <span class="context-label">Mode:</span>
                            <span class="context-value">${context.evolutionMode || 'method'}</span>
                        </div>
                        <div class="context-item">
                            <span class="context-label">Time:</span>
                            <span class="context-value">${this.getTimeOfDay()}</span>
                        </div>
                    </div>
                </div>
                
                <div class="narration-content">
                    <div class="narration-text">
                        ${narration.narration}
                    </div>
                    
                    <div class="narration-attribution">
                        <span class="narrator-signature">— Narrator-X</span>
                        <span class="confidence-display">${Math.round(narration.confidence * 100)}% confidence</span>
                    </div>
                </div>
                
                <div class="narration-actions">
                    <button class="regenerate-btn primary" onclick="narratorX.regenerateNarration()">
                        🔁 Regenerate
                    </button>
                    <button class="save-narration-btn secondary" onclick="narratorX.saveNarration()">
                        💾 Save
                    </button>
                    <button class="share-narration-btn tertiary" onclick="narratorX.shareNarration()">
                        📤 Share
                    </button>
                    <button class="close-narration-btn quaternary" onclick="narratorX.closeModal()">
                        ↩ Close
                    </button>
                </div>
                
                <div class="narration-enhancement">
                    <h3>🎨 Enhance Narration</h3>
                    <div class="enhancement-options">
                        <button class="voice-option" onclick="narratorX.applyVoiceEnhancement('analytical')">Analytical</button>
                        <button class="voice-option" onclick="narratorX.applyVoiceEnhancement('empathetic')">Empathetic</button>
                        <button class="voice-option" onclick="narratorX.applyVoiceEnhancement('dynamic')">Dynamic</button>
                        <button class="voice-option" onclick="narratorX.applyVoiceEnhancement('contemplative')">Contemplative</button>
                    </div>
                </div>
            </div>
        `;

        console.log('🎨 Narration Modal HTML Generated:');
        console.log(modalHTML);
    }

    // Regenerate narration
    async regenerateNarration(enhancementRequest = '', voiceOverride = '') {
        try {
            this.regenerationCount++;
            console.log(`🔁 Narrator-X: Regenerating narration (attempt #${this.regenerationCount})`);
            
            // Store enhancement context
            const enhancementContext = {
                enhancementRequest,
                voiceOverride,
                regenerationCount: this.regenerationCount
            };

            // Generate new narration with enhancement context
            const regeneratedNarration = await this.generateEnhancedNarration(enhancementContext);
            
            console.log(`✨ Regenerated narration: "${regeneratedNarration.narration}"`);
            
            return regeneratedNarration;
        } catch (error) {
            console.error('🚨 Narrator-X: Error in regenerateNarration:', error);
            return null;
        }
    }

    // Generate enhanced narration
    async generateEnhancedNarration(enhancementContext) {
        // Simulate enhanced generation
        await new Promise(resolve => setTimeout(resolve, 150));

        const enhancedNarrations = [
            "Strategic design leadership emerges when systematic thinking meets creative courage. This case study reveals how methodical craft transforms ambitious vision into measurable, lasting impact.",
            "When complexity meets clarity, transformation becomes inevitable. Here's how strategic design thinking turned challenging constraints into breakthrough solutions.",
            "Three decades of design mastery applied to real-world challenges, demonstrating how systematic leadership creates solutions that endure and inspire."
        ];

        const randomNarration = enhancedNarrations[Math.floor(Math.random() * enhancedNarrations.length)];

        return {
            narration: randomNarration,
            tone: 'enhanced_analytical',
            voice: enhancementContext.voiceOverride || 'analytical',
            confidence: 0.94,
            enhanced: true,
            regenerationCount: enhancementContext.regenerationCount
        };
    }

    // Save narration to memory
    saveNarration(narration) {
        try {
            const savedNarrations = JSON.parse(localStorage.getItem('ricrios_saved_narrations') || '[]');
            
            const narrationData = {
                timestamp: new Date().toISOString(),
                sessionId: this.sessionId,
                narration: narration.narration,
                voice: narration.voice,
                tone: narration.tone,
                confidence: narration.confidence
            };

            savedNarrations.push(narrationData);
            localStorage.setItem('ricrios_saved_narrations', JSON.stringify(savedNarrations));
            
            console.log('💾 Narration saved to memory');
            return true;
        } catch (error) {
            console.error('🚨 Error saving narration:', error);
            return false;
        }
    }

    // Apply voice enhancement
    async applyVoiceEnhancement(voiceType) {
        try {
            console.log(`🎭 Applying voice enhancement: ${voiceType}`);
            
            const enhancedNarration = await this.regenerateNarration('', voiceType);
            
            if (enhancedNarration) {
                this.showNarrationInterface(enhancedNarration, { voiceEnhancement: voiceType });
            }
            
            return enhancedNarration;
        } catch (error) {
            console.error('🚨 Error applying voice enhancement:', error);
            return null;
        }
    }

    // Helper methods
    getTimeOfDay() {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) return 'morning';
        if (hour >= 12 && hour < 18) return 'afternoon';
        return 'evening';
    }

    analyzeContextRichness(context) {
        let richness = 0.5;
        if (context.userPrompt && context.userPrompt.length > 10) richness += 0.2;
        if (context.evolutionMode && context.evolutionMode !== 'method') richness += 0.1;
        if (context.styleTheme && context.styleTheme !== 'editorial-card') richness += 0.1;
        if (context.engagementLevel === 'high') richness += 0.1;
        return Math.min(richness, 1.0);
    }

    evaluatePromptClarity(prompt) {
        if (!prompt) return 0.6;
        if (prompt.length < 10) return 0.5;
        if (prompt.length > 50) return 0.9;
        return 0.7;
    }

    assessStyleAlignment(styleTheme, timeOfDay) {
        const alignmentMatrix = {
            'editorial-card': { morning: 0.9, afternoon: 0.8, evening: 0.7 },
            'zen-mono': { morning: 0.7, afternoon: 0.8, evening: 0.9 },
            'neon-grid': { morning: 0.8, afternoon: 0.9, evening: 0.8 },
            'neoblueprint': { morning: 0.9, afternoon: 0.9, evening: 0.7 },
            'minimal-glass': { morning: 0.8, afternoon: 0.8, evening: 0.9 },
            'strategic-canvas': { morning: 0.8, afternoon: 0.9, evening: 0.8 }
        };

        return alignmentMatrix[styleTheme]?.[timeOfDay] || 0.7;
    }

    calculateNarrationValue(evolutionMode, engagementLevel) {
        const baseValue = 0.7;
        const modeBonus = evolutionMode === 'emotional' ? 0.2 : 0.1;
        const engagementBonus = engagementLevel === 'high' ? 0.1 : 0;
        return Math.min(baseValue + modeBonus + engagementBonus, 1.0);
    }

    recommendVoice(timeOfDay, evolutionMode, styleTheme) {
        if (timeOfDay === 'evening' && evolutionMode === 'emotional') return 'contemplative';
        if (timeOfDay === 'morning' && evolutionMode === 'metric') return 'analytical';
        if (evolutionMode === 'visual' || evolutionMode === 'remix') return 'dynamic';
        if (evolutionMode === 'emotional') return 'empathetic';
        return 'analytical';
    }

    generateConfidenceReasoning(confidence, factors) {
        if (confidence >= 0.9) return 'High confidence: Rich context, clear prompt, excellent alignment';
        if (confidence >= 0.8) return 'Good confidence: Solid context with good alignment';
        if (confidence >= 0.7) return 'Moderate confidence: Adequate context for narration';
        return 'Low confidence: Limited context or poor alignment';
    }

    getDefaultNarration(caseStudyId) {
        return `Strategic design leadership applied to real-world challenges in ${caseStudyId || 'this case study'}, demonstrating how systematic thinking creates lasting impact.`;
    }

    logLowConfidence(assessment, context) {
        console.log(`📊 Narrator-X: Low confidence narration skipped`);
        console.log(`   Confidence: ${assessment.confidence}`);
        console.log(`   Reasoning: ${assessment.reasoning}`);
        console.log(`   Context: ${JSON.stringify(context, null, 2)}`);
    }

    // Modal control methods
    closeModal() {
        console.log('↩ Closing narration modal');
        // In real implementation, this would close the modal
    }

    shareNarration() {
        console.log('📤 Sharing narration');
        // In real implementation, this would handle sharing
    }
}

// Demo function
async function demonstrateNarratorX() {
    console.log('🎙 === Narrator-X System Demo ===');
    
    const narratorX = new NarratorXSystem();
    
    // Demo scenarios
    const scenarios = [
        {
            name: 'Morning Strategic Case Study',
            caseStudyId: 'bjj-community-platform',
            context: {
                userPrompt: 'Show me your strategic methodology',
                evolutionMode: 'metric',
                styleTheme: 'editorial-card',
                engagementLevel: 'high'
            }
        },
        {
            name: 'Evening Emotional Case Study',
            caseStudyId: 'chase-travel-experience',
            context: {
                userPrompt: 'Tell me about leadership under pressure',
                evolutionMode: 'emotional',
                styleTheme: 'zen-mono',
                engagementLevel: 'deep'
            }
        },
        {
            name: 'Afternoon Visual Case Study',
            caseStudyId: 'digital-wealth-platform',
            context: {
                userPrompt: 'Explain the design decisions',
                evolutionMode: 'visual',
                styleTheme: 'neon-grid',
                engagementLevel: 'medium'
            }
        }
    ];

    for (const scenario of scenarios) {
        console.log(`\n🎬 Testing: ${scenario.name}`);
        console.log(`📁 Case Study: ${scenario.caseStudyId}`);
        console.log(`🎯 Context: ${JSON.stringify(scenario.context, null, 2)}`);
        
        const result = await narratorX.triggerNarration(scenario.caseStudyId, scenario.context);
        
        if (result.success) {
            console.log(`✅ Success! Confidence: ${result.confidence}`);
            console.log(`📝 Narration: "${result.narration.narration}"`);
            
            // Test regeneration
            console.log(`\n🔁 Testing regeneration...`);
            const regenerated = await narratorX.regenerateNarration('Make it more contemplative');
            if (regenerated) {
                console.log(`✨ Regenerated: "${regenerated.narration}"`);
            }
        } else {
            console.log(`❌ Failed: ${result.reason} (confidence: ${result.confidence})`);
        }
        
        console.log(`\n${'='.repeat(60)}`);
    }
    
    console.log('\n🎙 Narrator-X Demo Complete!');
    return narratorX;
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { NarratorXSystem, demonstrateNarratorX };
} else {
    // Browser environment
    window.NarratorXSystem = NarratorXSystem;
    window.demonstrateNarratorX = demonstrateNarratorX;
}

// Auto-run demo if this file is executed directly
if (typeof require !== 'undefined' && require.main === module) {
    demonstrateNarratorX().then(() => {
        console.log('🎙 Narrator-X system ready for integration!');
    });
}
