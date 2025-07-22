/**
 * Time Travel System
 * Replay the same case study from three different time-of-day perspectives
 * 
 * Features:
 * - Three time variations: Morning (Analytical), Afternoon (Strategic), Evening (Reflective)
 * - Consistent structure with adaptive tone and storytelling lens
 * - Interactive time switching and comparison
 * - Variation preview and adoption
 * - Memory integration and preference tracking
 */

class TimeTravelSystem {
    constructor() {
        this.sessionId = `time_travel_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        this.confidenceThreshold = 0.85;
        this.currentVariations = null;
        this.currentCaseStudy = null;
        
        console.log(`🕰️ Time Travel System initialized: ${this.sessionId}`);
    }

    // Trigger time travel for a case study
    async triggerTimeTravel(caseStudyId, caseStudyData, context = {}) {
        try {
            console.log(`🕰️ Time Travel: Triggering for ${caseStudyId}`);
            
            // Validate case study
            const validation = this.validateCaseStudy(caseStudyId, caseStudyData);
            if (!validation.isValid) {
                throw new Error(`Invalid case study: ${validation.reason}`);
            }

            // Generate time variations
            const timeVariations = await this.generateTimeVariations(caseStudyId, caseStudyData, context);
            
            // Store current state
            this.currentVariations = timeVariations;
            this.currentCaseStudy = { id: caseStudyId, data: caseStudyData };
            
            // Show time travel modal
            this.showTimeTravelModal(timeVariations, context);
            
            return {
                success: true,
                variations: timeVariations,
                caseStudyId
            };
        } catch (error) {
            console.error('🚨 Time Travel: Error in triggerTimeTravel:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Validate case study for time travel
    validateCaseStudy(caseStudyId, caseStudyData) {
        if (!caseStudyId) {
            return { isValid: false, reason: 'Missing case study ID' };
        }

        if (!caseStudyData || !caseStudyData.summary) {
            return { isValid: false, reason: 'Missing case study data or summary' };
        }

        const contentLength = caseStudyData.summary.length;
        if (contentLength < 50) {
            return { isValid: false, reason: 'Case study content too short for meaningful variations' };
        }

        const narrationPotential = this.calculateNarrationPotential(caseStudyData);
        if (narrationPotential < 0.6) {
            return { isValid: false, reason: 'Low narration potential for time variations' };
        }

        return {
            isValid: true,
            caseStudyId,
            contentLength,
            narrationPotential
        };
    }

    // Calculate narration potential
    calculateNarrationPotential(caseStudyData) {
        let potential = 0.5; // Base potential

        // Content richness
        if (caseStudyData.summary && caseStudyData.summary.length > 100) potential += 0.2;
        if (caseStudyData.outcomes && caseStudyData.outcomes.length > 0) potential += 0.1;
        if (caseStudyData.methodology && caseStudyData.methodology.length > 0) potential += 0.1;
        if (caseStudyData.challenges && caseStudyData.challenges.length > 0) potential += 0.1;

        return Math.min(potential, 1.0);
    }

    // Generate time variations
    async generateTimeVariations(caseStudyId, caseStudyData, context) {
        try {
            console.log(`🕰️ Generating time variations for ${caseStudyId}`);
            
            // Generate all three variations
            const morningVariation = await this.generateVariation('morning', caseStudyId, caseStudyData, context);
            const afternoonVariation = await this.generateVariation('afternoon', caseStudyId, caseStudyData, context);
            const eveningVariation = await this.generateVariation('evening', caseStudyId, caseStudyData, context);

            return {
                morning_version: morningVariation,
                afternoon_version: afternoonVariation,
                evening_version: eveningVariation,
                timestamp: new Date().toISOString(),
                sessionId: this.sessionId
            };
        } catch (error) {
            console.error('🚨 Error generating time variations:', error);
            throw error;
        }
    }

    // Generate individual variation
    async generateVariation(timeOfDay, caseStudyId, caseStudyData, context) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 150));

        const templates = this.getVariationTemplates();
        const template = templates[timeOfDay] || templates.default;
        
        const variation = this.adaptTemplateForCaseStudy(template, caseStudyId, caseStudyData, timeOfDay);
        
        return {
            narration: variation,
            tone: this.determineToneForTime(timeOfDay),
            focus: this.determineFocusForTime(timeOfDay),
            voice: this.determineVoiceForTime(timeOfDay),
            confidence: this.calculateVariationConfidence(timeOfDay, caseStudyData, context),
            timeOfDay,
            timestamp: new Date().toISOString()
        };
    }

    // Get variation templates
    getVariationTemplates() {
        return {
            morning: "Systematic design thinking transformed complex user friction into measurable business impact. This case demonstrates how strategic methodology delivered significant engagement increases and conversion improvements through disciplined, analytical execution.",
            
            afternoon: "Strategic design leadership applied to high-stakes transformation challenges, delivering measurable business outcomes through proven methodology. This case reveals how systematic thinking creates competitive advantage and sustainable growth.",
            
            evening: "Leading through uncertainty required more than design skills—it demanded clarity, patience, and conviction. This journey traces how three decades of craft mastery guided complex challenges toward breakthrough solutions.",
            
            default: "Strategic design leadership applied to real-world challenges, demonstrating how systematic thinking creates lasting impact through thoughtful execution."
        };
    }

    // Adapt template for specific case study
    adaptTemplateForCaseStudy(template, caseStudyId, caseStudyData, timeOfDay) {
        let adaptedTemplate = template;

        // Case study specific adaptations
        if (caseStudyId.includes('bjj')) {
            adaptedTemplate = adaptedTemplate.replace(/design thinking/gi, 'community-centered design thinking');
        } else if (caseStudyId.includes('chase')) {
            adaptedTemplate = adaptedTemplate.replace(/design thinking/gi, 'travel experience design');
        } else if (caseStudyId.includes('digital-wealth')) {
            adaptedTemplate = adaptedTemplate.replace(/design thinking/gi, 'fintech design thinking');
        }

        // Outcome-specific adaptations
        if (caseStudyData.outcomes) {
            if (caseStudyData.outcomes.includes('engagement')) {
                adaptedTemplate = adaptedTemplate.replace(/business impact/gi, 'engagement transformation');
            }
            if (caseStudyData.outcomes.includes('conversion')) {
                adaptedTemplate = adaptedTemplate.replace(/business impact/gi, 'conversion optimization');
            }
        }

        return adaptedTemplate;
    }

    // Determine tone for time
    determineToneForTime(timeOfDay) {
        const toneMap = {
            morning: 'crisp_systematic_methodical',
            afternoon: 'confident_authoritative_results_driven',
            evening: 'contemplative_wise_narrative_driven'
        };
        return toneMap[timeOfDay] || 'analytical_professional';
    }

    // Determine focus for time
    determineFocusForTime(timeOfDay) {
        const focusMap = {
            morning: 'methodology_process_systematic_execution',
            afternoon: 'business_impact_strategic_decisions_proven_outcomes',
            evening: 'journey_growth_wisdom_human_elements'
        };
        return focusMap[timeOfDay] || 'systematic_approach';
    }

    // Determine voice for time
    determineVoiceForTime(timeOfDay) {
        const voiceMap = {
            morning: 'analytical',
            afternoon: 'strategic',
            evening: 'reflective'
        };
        return voiceMap[timeOfDay] || 'analytical';
    }

    // Calculate variation confidence
    calculateVariationConfidence(timeOfDay, caseStudyData, context) {
        let confidence = 0.8; // Base confidence

        // Content richness bonus
        if (caseStudyData.summary && caseStudyData.summary.length > 200) confidence += 0.05;
        if (caseStudyData.outcomes && caseStudyData.outcomes.length > 0) confidence += 0.05;
        if (caseStudyData.methodology) confidence += 0.05;

        // Context bonus
        if (context.engagementLevel === 'high') confidence += 0.05;
        if (context.userPrompt && context.userPrompt.length > 20) confidence += 0.05;

        return Math.min(confidence, 0.98);
    }

    // Show time travel modal
    showTimeTravelModal(timeVariations, context) {
        console.log(`🕰️ Showing time travel modal`);
        console.log(`🌅 Morning: "${timeVariations.morning_version.narration}"`);
        console.log(`🌞 Afternoon: "${timeVariations.afternoon_version.narration}"`);
        console.log(`🌙 Evening: "${timeVariations.evening_version.narration}"`);

        const modalHTML = this.generateTimeTravelModalHTML(timeVariations, context);
        console.log('🎨 Time Travel Modal HTML Generated:');
        console.log(modalHTML);
    }

    // Generate time travel modal HTML
    generateTimeTravelModalHTML(timeVariations, context) {
        const currentTime = this.getTimeOfDay();
        
        return `
            <div class="time-travel-container ${currentTime}-theme">
                <div class="time-travel-header">
                    <h2>🕰️ Time Travel Narrator</h2>
                    <p class="time-travel-subtitle">${this.currentCaseStudy.id} - Three Time Perspectives</p>
                    <div class="current-time-indicator">
                        <span class="current-time">Current: ${currentTime}</span>
                        <span class="time-badge ${currentTime}">${this.getTimeEmoji(currentTime)}</span>
                    </div>
                </div>
                
                <div class="time-variations-grid">
                    <!-- Morning Variation -->
                    <div class="time-variation morning-variation">
                        <div class="variation-header">
                            <div class="time-icon">🌅</div>
                            <h3>Morning (Analytical)</h3>
                            <div class="time-range">5:00 AM - 12:00 PM</div>
                        </div>
                        
                        <div class="variation-content">
                            <div class="narration-text morning">
                                ${timeVariations.morning_version.narration}
                            </div>
                            
                            <div class="variation-meta">
                                <div class="meta-grid">
                                    <div class="meta-item">
                                        <span class="meta-label">Tone:</span>
                                        <span class="meta-value">${timeVariations.morning_version.tone}</span>
                                    </div>
                                    <div class="meta-item">
                                        <span class="meta-label">Focus:</span>
                                        <span class="meta-value">${timeVariations.morning_version.focus}</span>
                                    </div>
                                    <div class="meta-item">
                                        <span class="meta-label">Voice:</span>
                                        <span class="meta-value">${timeVariations.morning_version.voice}</span>
                                    </div>
                                    <div class="meta-item">
                                        <span class="meta-label">Confidence:</span>
                                        <span class="meta-value">${Math.round(timeVariations.morning_version.confidence * 100)}%</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="variation-actions">
                                <button class="use-variation-btn" onclick="timeTravel.adoptVariation('morning')">
                                    🌅 Use Morning Version
                                </button>
                                <button class="preview-variation-btn" onclick="timeTravel.previewVariation('morning')">
                                    👁 Preview
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Afternoon Variation -->
                    <div class="time-variation afternoon-variation">
                        <div class="variation-header">
                            <div class="time-icon">🌞</div>
                            <h3>Afternoon (Strategic)</h3>
                            <div class="time-range">12:00 PM - 6:00 PM</div>
                        </div>
                        
                        <div class="variation-content">
                            <div class="narration-text afternoon">
                                ${timeVariations.afternoon_version.narration}
                            </div>
                            
                            <div class="variation-meta">
                                <div class="meta-grid">
                                    <div class="meta-item">
                                        <span class="meta-label">Tone:</span>
                                        <span class="meta-value">${timeVariations.afternoon_version.tone}</span>
                                    </div>
                                    <div class="meta-item">
                                        <span class="meta-label">Focus:</span>
                                        <span class="meta-value">${timeVariations.afternoon_version.focus}</span>
                                    </div>
                                    <div class="meta-item">
                                        <span class="meta-label">Voice:</span>
                                        <span class="meta-value">${timeVariations.afternoon_version.voice}</span>
                                    </div>
                                    <div class="meta-item">
                                        <span class="meta-label">Confidence:</span>
                                        <span class="meta-value">${Math.round(timeVariations.afternoon_version.confidence * 100)}%</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="variation-actions">
                                <button class="use-variation-btn" onclick="timeTravel.adoptVariation('afternoon')">
                                    🌞 Use Afternoon Version
                                </button>
                                <button class="preview-variation-btn" onclick="timeTravel.previewVariation('afternoon')">
                                    👁 Preview
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Evening Variation -->
                    <div class="time-variation evening-variation">
                        <div class="variation-header">
                            <div class="time-icon">🌙</div>
                            <h3>Evening (Reflective)</h3>
                            <div class="time-range">6:00 PM - 5:00 AM</div>
                        </div>
                        
                        <div class="variation-content">
                            <div class="narration-text evening">
                                ${timeVariations.evening_version.narration}
                            </div>
                            
                            <div class="variation-meta">
                                <div class="meta-grid">
                                    <div class="meta-item">
                                        <span class="meta-label">Tone:</span>
                                        <span class="meta-value">${timeVariations.evening_version.tone}</span>
                                    </div>
                                    <div class="meta-item">
                                        <span class="meta-label">Focus:</span>
                                        <span class="meta-value">${timeVariations.evening_version.focus}</span>
                                    </div>
                                    <div class="meta-item">
                                        <span class="meta-label">Voice:</span>
                                        <span class="meta-value">${timeVariations.evening_version.voice}</span>
                                    </div>
                                    <div class="meta-item">
                                        <span class="meta-label">Confidence:</span>
                                        <span class="meta-value">${Math.round(timeVariations.evening_version.confidence * 100)}%</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="variation-actions">
                                <button class="use-variation-btn" onclick="timeTravel.adoptVariation('evening')">
                                    🌙 Use Evening Version
                                </button>
                                <button class="preview-variation-btn" onclick="timeTravel.previewVariation('evening')">
                                    👁 Preview
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="time-travel-controls">
                    <div class="controls-header">
                        <h3>🎛️ Time Travel Controls</h3>
                    </div>
                    
                    <div class="controls-grid">
                        <button class="time-switch-btn" onclick="timeTravel.switchTimeContext('morning')">
                            🌅 Switch to Morning
                        </button>
                        <button class="time-switch-btn" onclick="timeTravel.switchTimeContext('afternoon')">
                            🌞 Switch to Afternoon
                        </button>
                        <button class="time-switch-btn" onclick="timeTravel.switchTimeContext('evening')">
                            🌙 Switch to Evening
                        </button>
                        <button class="auto-time-btn" onclick="timeTravel.useCurrentTime()">
                            🕰️ Use Current Time
                        </button>
                    </div>
                    
                    <div class="advanced-controls">
                        <button class="compare-all-btn" onclick="timeTravel.compareAllVariations()">
                            📊 Compare All Variations
                        </button>
                        <button class="save-variations-btn" onclick="timeTravel.saveAllVariations()">
                            💾 Save All Variations
                        </button>
                        <button class="share-time-travel-btn" onclick="timeTravel.shareTimeTravel()">
                            📤 Share Time Travel
                        </button>
                    </div>
                </div>
                
                <div class="time-travel-footer">
                    <button class="close-time-travel-btn" onclick="timeTravel.closeModal()">
                        ↩ Close Time Travel
                    </button>
                </div>
            </div>
        `;
    }

    // Switch time context
    switchTimeContext(targetTime) {
        console.log(`🕰️ Switching time context to: ${targetTime}`);
        
        if (!this.currentVariations) {
            console.error('No variations available for time context switch');
            return false;
        }

        const variation = this.currentVariations[`${targetTime}_version`];
        if (!variation) {
            console.error(`No variation available for ${targetTime}`);
            return false;
        }

        // Update current time context
        this.currentTimeContext = targetTime;
        
        // Trigger content rerender
        this.rerenderTimeAwareContent(targetTime, variation);
        
        // Update visitor preferences
        this.updateTimePreference(targetTime);
        
        return true;
    }

    // Rerender time-aware content
    rerenderTimeAwareContent(timeContext, variation) {
        console.log(`🔄 Rerendering content for ${timeContext} context`);
        console.log(`📝 Using variation: "${variation.narration}"`);
        
        // In production, this would update the actual page content
        // For now, we'll just log the change
        console.log(`✅ Content updated to ${timeContext} context`);
    }

    // Update time preference
    updateTimePreference(timeContext) {
        try {
            const preferences = JSON.parse(localStorage.getItem('ricrios_time_preferences') || '{}');
            preferences.preferredTimeContext = timeContext;
            preferences.lastTimeSwitch = new Date().toISOString();
            preferences.timeSwitchCount = (preferences.timeSwitchCount || 0) + 1;
            localStorage.setItem('ricrios_time_preferences', JSON.stringify(preferences));
            
            console.log(`💾 Time preference updated: ${timeContext}`);
        } catch (error) {
            console.error('Error updating time preference:', error);
        }
    }

    // Compare all variations
    compareAllVariations() {
        if (!this.currentVariations) {
            console.error('No variations available for comparison');
            return;
        }

        console.log('📊 Comparing all time variations:');
        console.log('🌅 Morning (Analytical):', this.currentVariations.morning_version.narration);
        console.log('🌞 Afternoon (Strategic):', this.currentVariations.afternoon_version.narration);
        console.log('🌙 Evening (Reflective):', this.currentVariations.evening_version.narration);

        // In production, this would show a comparison modal
        this.showVariationComparison();
    }

    // Show variation comparison
    showVariationComparison() {
        const comparisonHTML = `
            <div class="variation-comparison-container">
                <div class="comparison-header">
                    <h2>📊 Time Variation Analysis</h2>
                    <p class="comparison-subtitle">${this.currentCaseStudy.id} - Comparative Analysis</p>
                </div>
                
                <div class="comparison-table">
                    <table class="variations-table">
                        <thead>
                            <tr>
                                <th>Aspect</th>
                                <th>🌅 Morning</th>
                                <th>🌞 Afternoon</th>
                                <th>🌙 Evening</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="aspect-label">Narration</td>
                                <td class="morning-cell">${this.currentVariations.morning_version.narration}</td>
                                <td class="afternoon-cell">${this.currentVariations.afternoon_version.narration}</td>
                                <td class="evening-cell">${this.currentVariations.evening_version.narration}</td>
                            </tr>
                            <tr>
                                <td class="aspect-label">Tone</td>
                                <td class="morning-cell">${this.currentVariations.morning_version.tone}</td>
                                <td class="afternoon-cell">${this.currentVariations.afternoon_version.tone}</td>
                                <td class="evening-cell">${this.currentVariations.evening_version.tone}</td>
                            </tr>
                            <tr>
                                <td class="aspect-label">Focus</td>
                                <td class="morning-cell">${this.currentVariations.morning_version.focus}</td>
                                <td class="afternoon-cell">${this.currentVariations.afternoon_version.focus}</td>
                                <td class="evening-cell">${this.currentVariations.evening_version.focus}</td>
                            </tr>
                            <tr>
                                <td class="aspect-label">Voice</td>
                                <td class="morning-cell">${this.currentVariations.morning_version.voice}</td>
                                <td class="afternoon-cell">${this.currentVariations.afternoon_version.voice}</td>
                                <td class="evening-cell">${this.currentVariations.evening_version.voice}</td>
                            </tr>
                            <tr>
                                <td class="aspect-label">Confidence</td>
                                <td class="morning-cell">${Math.round(this.currentVariations.morning_version.confidence * 100)}%</td>
                                <td class="afternoon-cell">${Math.round(this.currentVariations.afternoon_version.confidence * 100)}%</td>
                                <td class="evening-cell">${Math.round(this.currentVariations.evening_version.confidence * 100)}%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        console.log('📊 Variation Comparison HTML Generated:');
        console.log(comparisonHTML);
    }

    // Adopt variation
    adoptVariation(timeOfDay) {
        if (!this.currentVariations) {
            console.error('No variations available to adopt');
            return null;
        }

        const variation = this.currentVariations[`${timeOfDay}_version`];
        if (!variation) {
            console.error(`No variation available for ${timeOfDay}`);
            return null;
        }

        console.log(`✅ Adopting ${timeOfDay} variation: "${variation.narration}"`);
        
        // Update preferences
        this.updateTimePreference(timeOfDay);
        
        return variation;
    }

    // Save all variations
    saveAllVariations() {
        if (!this.currentVariations) {
            console.error('No variations available to save');
            return false;
        }

        try {
            const savedVariations = JSON.parse(localStorage.getItem('ricrios_saved_time_variations') || '[]');
            
            const variationData = {
                timestamp: new Date().toISOString(),
                sessionId: this.sessionId,
                caseStudyId: this.currentCaseStudy.id,
                variations: this.currentVariations
            };

            savedVariations.push(variationData);
            localStorage.setItem('ricrios_saved_time_variations', JSON.stringify(savedVariations));
            
            console.log('💾 All variations saved to memory');
            return true;
        } catch (error) {
            console.error('Error saving variations:', error);
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

    getTimeEmoji(timeOfDay) {
        const emojiMap = {
            morning: '🌅',
            afternoon: '🌞',
            evening: '🌙'
        };
        return emojiMap[timeOfDay] || '🕰️';
    }

    // Action handlers
    previewVariation(timeOfDay) {
        console.log(`👁 Previewing ${timeOfDay} variation`);
        // Implementation for preview functionality
    }

    useCurrentTime() {
        const currentTime = this.getTimeOfDay();
        console.log(`🕰️ Using current time: ${currentTime}`);
        this.switchTimeContext(currentTime);
    }

    shareTimeTravel() {
        console.log('📤 Sharing time travel experience');
        // Implementation for sharing functionality
    }

    closeModal() {
        console.log('↩ Closing time travel modal');
        // Implementation for closing modal
    }
}

// Demo function
async function demonstrateTimeTravel() {
    console.log('🕰️ === Time Travel System Demo ===');
    
    const timeTravel = new TimeTravelSystem();
    
    // Sample case study data
    const caseStudyData = {
        summary: "A comprehensive design leadership project that transformed user experience through systematic thinking and strategic execution, resulting in measurable business impact and user satisfaction improvements.",
        outcomes: ["40% engagement increase", "25% conversion boost", "60% reduction in support tickets"],
        methodology: "Systematic design thinking with user-centered approach",
        challenges: ["Complex user requirements", "Technical constraints", "Tight timeline"]
    };

    // Demo scenarios
    const scenarios = [
        {
            name: 'BJJ Community Platform Time Travel',
            caseStudyId: 'bjj-community-platform',
            context: {
                engagementLevel: 'high',
                userPrompt: 'Show me how systematic thinking creates community impact'
            }
        },
        {
            name: 'Chase Travel Experience Time Travel',
            caseStudyId: 'chase-travel-experience',
            context: {
                engagementLevel: 'medium',
                userPrompt: 'Explain the travel experience transformation'
            }
        }
    ];

    for (const scenario of scenarios) {
        console.log(`\n🎬 Testing: ${scenario.name}`);
        console.log(`📁 Case Study: ${scenario.caseStudyId}`);
        console.log(`🎯 Context: ${JSON.stringify(scenario.context, null, 2)}`);
        
        const result = await timeTravel.triggerTimeTravel(scenario.caseStudyId, caseStudyData, scenario.context);
        
        if (result.success) {
            console.log(`✅ Success! Generated ${Object.keys(result.variations).length - 2} variations`);
            console.log(`🌅 Morning: "${result.variations.morning_version.narration}"`);
            console.log(`🌞 Afternoon: "${result.variations.afternoon_version.narration}"`);
            console.log(`🌙 Evening: "${result.variations.evening_version.narration}"`);
            
            // Test time context switching
            console.log(`\n🔄 Testing time context switching...`);
            const switchResult = timeTravel.switchTimeContext('evening');
            console.log(`✅ Time context switch: ${switchResult ? 'Success' : 'Failed'}`);
            
            // Test comparison
            console.log(`\n📊 Testing variation comparison...`);
            timeTravel.compareAllVariations();
        } else {
            console.log(`❌ Failed: ${result.error}`);
        }
        
        console.log(`\n${'='.repeat(60)}`);
    }
    
    console.log('\n🕰️ Time Travel Demo Complete!');
    return timeTravel;
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TimeTravelSystem, demonstrateTimeTravel };
} else {
    // Browser environment
    window.TimeTravelSystem = TimeTravelSystem;
    window.demonstrateTimeTravel = demonstrateTimeTravel;
}

// Auto-run demo if this file is executed directly
if (typeof require !== 'undefined' && require.main === module) {
    demonstrateTimeTravel().then(() => {
        console.log('🕰️ Time Travel system ready for integration!');
    });
}
