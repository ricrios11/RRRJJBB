/**
 * Visitor Memory & Agent-Orchestrated Personalization System
 * Persistent visitor memory, interaction capture, and dynamic refinement for Ric Rios portfolio
 */

class VisitorMemoryPersonalizationSystem {
    constructor() {
        this.sessionId = `memory_system_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        this.timestamp = new Date().toISOString();
        this.memoryKeys = [
            'lastPrompt', 'lastVisitTimeOfDay', 'lastAgentBlock', 'visitCount',
            'preferredSections', 'interactionDepth', 'lastSessionDuration', 'hiddenLabAccess'
        ];
        
        // Initialize memory system
        this.initializeMemorySystem();
        
        // Set up interaction capture
        this.setupInteractionCapture();
        
        // Initialize Agent X for memory synthesis
        this.agentX = new VisitorMemorySynthAgent();
        
        console.log('🧠 Visitor Memory & Personalization System Initialized');
        console.log(`Session ID: ${this.sessionId}`);
    }

    // =====================================
    // MEMORY MANAGEMENT
    // =====================================
    
    initializeMemorySystem() {
        try {
            // Check if visitor memory exists
            const existingMemory = this.getVisitorMemory();
            
            if (!existingMemory) {
                // First-time visitor - initialize memory
                this.setVisitorMemory({
                    visitCount: 1,
                    interactionDepth: 'surface',
                    preferredSections: [],
                    hiddenLabAccess: false,
                    firstVisit: this.timestamp,
                    lastVisit: this.timestamp
                });
                console.log('🆕 First-time visitor - memory initialized');
            } else {
                // Returning visitor - update visit count and last visit
                this.updateVisitorMemory({
                    visitCount: (existingMemory.visitCount || 0) + 1,
                    lastVisit: this.timestamp
                });
                console.log(`🔄 Returning visitor - visit #${existingMemory.visitCount + 1}`);
            }
        } catch (error) {
            console.error('❌ Memory initialization failed:', error);
            this.fallbackToDefaults();
        }
    }

    getVisitorMemory() {
        try {
            const memoryData = localStorage.getItem('ricrios_visitor_memory');
            return memoryData ? JSON.parse(memoryData) : null;
        } catch (error) {
            console.error('❌ Failed to retrieve visitor memory:', error);
            return null;
        }
    }

    setVisitorMemory(memoryData) {
        try {
            const sanitizedData = this.sanitizeMemoryData(memoryData);
            localStorage.setItem('ricrios_visitor_memory', JSON.stringify(sanitizedData));
            return true;
        } catch (error) {
            console.error('❌ Failed to set visitor memory:', error);
            return false;
        }
    }

    updateVisitorMemory(updates) {
        try {
            const currentMemory = this.getVisitorMemory() || {};
            const updatedMemory = { ...currentMemory, ...updates, lastUpdate: this.timestamp };
            return this.setVisitorMemory(updatedMemory);
        } catch (error) {
            console.error('❌ Failed to update visitor memory:', error);
            return false;
        }
    }

    sanitizeMemoryData(data) {
        const sanitized = {};
        
        // Sanitize each field based on type and constraints
        if (data.lastPrompt) {
            sanitized.lastPrompt = String(data.lastPrompt).substring(0, 500);
        }
        
        if (data.lastVisitTimeOfDay && ['morning', 'afternoon', 'evening'].includes(data.lastVisitTimeOfDay)) {
            sanitized.lastVisitTimeOfDay = data.lastVisitTimeOfDay;
        }
        
        if (data.visitCount && typeof data.visitCount === 'number') {
            sanitized.visitCount = Math.max(0, Math.min(1000, data.visitCount));
        }
        
        if (data.interactionDepth && ['surface', 'engaged', 'deep'].includes(data.interactionDepth)) {
            sanitized.interactionDepth = data.interactionDepth;
        }
        
        if (Array.isArray(data.preferredSections)) {
            sanitized.preferredSections = data.preferredSections.slice(0, 10);
        }
        
        // Copy other safe fields
        ['lastAgentBlock', 'lastSessionDuration', 'hiddenLabAccess', 'firstVisit', 'lastVisit', 'lastUpdate'].forEach(key => {
            if (data[key] !== undefined) {
                sanitized[key] = data[key];
            }
        });
        
        return sanitized;
    }

    // =====================================
    // INTERACTION CAPTURE
    // =====================================
    
    setupInteractionCapture() {
        // Capture prompt submissions
        this.setupPromptCapture();
        
        // Capture section views
        this.setupSectionViewCapture();
        
        // Capture hidden lab access
        this.setupHiddenLabCapture();
        
        // Capture session end
        this.setupSessionEndCapture();
    }

    setupPromptCapture() {
        // Listen for prompt submission events
        document.addEventListener('promptSubmit', (event) => {
            const { prompt, timeOfDay, agentName } = event.detail;
            
            this.updateVisitorMemory({
                lastPrompt: prompt,
                lastVisitTimeOfDay: timeOfDay,
                lastAgentBlock: agentName
            });
            
            console.log('📝 Prompt captured:', prompt.substring(0, 50) + '...');
        });
    }

    setupSectionViewCapture() {
        // Intersection Observer for section views
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                    const sectionName = entry.target.dataset.section;
                    if (sectionName) {
                        this.trackSectionView(sectionName);
                    }
                }
            });
        }, { threshold: 0.5 });

        // Observe all sections
        document.querySelectorAll('[data-section]').forEach(section => {
            sectionObserver.observe(section);
        });
    }

    trackSectionView(sectionName) {
        const memory = this.getVisitorMemory();
        const preferredSections = memory?.preferredSections || [];
        
        if (!preferredSections.includes(sectionName)) {
            preferredSections.push(sectionName);
            this.updateVisitorMemory({ preferredSections });
        }
        
        // Update interaction depth based on section engagement
        this.updateInteractionDepth(sectionName);
    }

    updateInteractionDepth(sectionName) {
        const memory = this.getVisitorMemory();
        const currentDepth = memory?.interactionDepth || 'surface';
        const preferredSections = memory?.preferredSections || [];
        
        let newDepth = currentDepth;
        
        if (preferredSections.length >= 5 && currentDepth === 'surface') {
            newDepth = 'engaged';
        } else if (preferredSections.length >= 8 && currentDepth === 'engaged') {
            newDepth = 'deep';
        }
        
        if (newDepth !== currentDepth) {
            this.updateVisitorMemory({ interactionDepth: newDepth });
            console.log(`📊 Interaction depth updated to: ${newDepth}`);
        }
    }

    setupHiddenLabCapture() {
        // Listen for hidden lab access
        document.addEventListener('hiddenLabAccess', () => {
            this.updateVisitorMemory({
                hiddenLabAccess: true,
                interactionDepth: 'deep'
            });
            console.log('🔬 Hidden lab access captured');
        });
    }

    setupSessionEndCapture() {
        const sessionStartTime = Date.now();
        
        const captureSessionEnd = () => {
            const sessionDuration = Math.round((Date.now() - sessionStartTime) / 60000); // minutes
            this.updateVisitorMemory({
                lastSessionDuration: sessionDuration
            });
            console.log(`⏱️ Session duration captured: ${sessionDuration} minutes`);
        };
        
        window.addEventListener('beforeunload', captureSessionEnd);
        
        // Also capture on visibility change (tab switch)
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                captureSessionEnd();
            }
        });
    }

    // =====================================
    // PERSONALIZATION CONFIDENCE SCORING
    // =====================================
    
    calculatePersonalizationConfidence() {
        const memory = this.getVisitorMemory();
        if (!memory) return 0;
        
        const factors = {
            memoryRecency: this.calculateMemoryRecency(memory),
            interactionDepth: this.calculateInteractionDepthScore(memory),
            promptCoherence: this.calculatePromptCoherence(memory),
            timeConsistency: this.calculateTimeConsistency(memory)
        };
        
        const weights = {
            memoryRecency: 0.3,
            interactionDepth: 0.25,
            promptCoherence: 0.25,
            timeConsistency: 0.2
        };
        
        const confidence = Object.keys(factors).reduce((total, factor) => {
            return total + (factors[factor] * weights[factor]);
        }, 0);
        
        console.log('🎯 Personalization confidence:', confidence.toFixed(2), factors);
        return confidence;
    }

    calculateMemoryRecency(memory) {
        if (!memory.lastVisit) return 0;
        
        const daysSinceLastVisit = (Date.now() - new Date(memory.lastVisit).getTime()) / (1000 * 60 * 60 * 24);
        
        if (daysSinceLastVisit < 1) return 1.0;
        if (daysSinceLastVisit < 7) return 0.8;
        if (daysSinceLastVisit < 30) return 0.5;
        return 0.2;
    }

    calculateInteractionDepthScore(memory) {
        const depthScores = {
            surface: 0.3,
            engaged: 0.7,
            deep: 1.0
        };
        return depthScores[memory.interactionDepth] || 0.3;
    }

    calculatePromptCoherence(memory) {
        // Simplified coherence calculation
        if (!memory.lastPrompt) return 0.5;
        
        const currentTimeOfDay = this.getCurrentTimeOfDay();
        const lastTimeOfDay = memory.lastVisitTimeOfDay;
        
        // Higher coherence if prompts are contextually related
        return lastTimeOfDay === currentTimeOfDay ? 0.8 : 0.6;
    }

    calculateTimeConsistency(memory) {
        const currentTimeOfDay = this.getCurrentTimeOfDay();
        const lastTimeOfDay = memory.lastVisitTimeOfDay;
        
        return lastTimeOfDay === currentTimeOfDay ? 1.0 : 0.5;
    }

    // =====================================
    // PERSONALIZED CONTENT GENERATION
    // =====================================
    
    async generatePersonalizedContent(section, baseContent) {
        const memory = this.getVisitorMemory();
        const confidence = this.calculatePersonalizationConfidence();
        
        if (confidence < 0.60) {
            console.log('⚠️ Low confidence - using default content');
            return baseContent;
        }
        
        try {
            const personalizedContent = await this.agentX.synthesizePersonalizedContent({
                memory,
                section,
                baseContent,
                confidence,
                currentTimeOfDay: this.getCurrentTimeOfDay()
            });
            
            console.log('✨ Personalized content generated for:', section);
            return personalizedContent;
            
        } catch (error) {
            console.error('❌ Personalization failed:', error);
            return baseContent;
        }
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

    fallbackToDefaults() {
        console.log('🔄 Falling back to default behavior');
        // Clear any corrupted memory
        try {
            localStorage.removeItem('ricrios_visitor_memory');
        } catch (error) {
            console.error('Failed to clear corrupted memory:', error);
        }
    }

    // =====================================
    // PUBLIC API
    // =====================================
    
    getVisitorProfile() {
        const memory = this.getVisitorMemory();
        const confidence = this.calculatePersonalizationConfidence();
        
        return {
            isReturningVisitor: memory?.visitCount > 1,
            visitCount: memory?.visitCount || 1,
            interactionDepth: memory?.interactionDepth || 'surface',
            preferredSections: memory?.preferredSections || [],
            hasHiddenLabAccess: memory?.hiddenLabAccess || false,
            personalizationConfidence: confidence,
            lastVisitTimeOfDay: memory?.lastVisitTimeOfDay,
            sessionId: this.sessionId
        };
    }

    async personalizeSection(sectionName, baseContent) {
        return await this.generatePersonalizedContent(sectionName, baseContent);
    }

    triggerPromptSubmission(prompt, agentName) {
        const event = new CustomEvent('promptSubmit', {
            detail: {
                prompt,
                timeOfDay: this.getCurrentTimeOfDay(),
                agentName
            }
        });
        document.dispatchEvent(event);
    }

    triggerHiddenLabAccess() {
        const event = new CustomEvent('hiddenLabAccess');
        document.dispatchEvent(event);
    }
}

// =====================================
// AGENT X - VISITOR MEMORY SYNTH
// =====================================

class VisitorMemorySynthAgent {
    constructor() {
        this.agentName = 'Agent X - Visitor Memory Synth';
        this.purpose = 'Merge returning visitor data with live prompt context to enhance relevance';
    }

    async synthesizePersonalizedContent(context) {
        const { memory, section, baseContent, confidence, currentTimeOfDay } = context;
        
        // Determine personalization strategy
        const strategy = this.determinePersonalizationStrategy(memory);
        
        // Generate personalized content based on strategy
        const personalizedContent = this.generateContentVariant(
            strategy, 
            currentTimeOfDay, 
            baseContent, 
            memory
        );
        
        return personalizedContent;
    }

    determinePersonalizationStrategy(memory) {
        if (memory.hiddenLabAccess) {
            return 'lab_discoverer';
        } else if (memory.interactionDepth === 'deep') {
            return 'deep_explorer';
        } else if (memory.visitCount > 1) {
            return 'returning_visitor';
        } else {
            return 'first_time_visitor';
        }
    }

    generateContentVariant(strategy, timeOfDay, baseContent, memory) {
        const personalizedVariants = {
            returning_visitor: {
                morning: {
                    hero_refinement: "Welcome back to strategic clarity—ready to build on yesterday's insights?",
                    cta_refinement: "Continue Your Strategic Journey",
                    agent_insight: "Agent Q recognizes your returning commitment to systematic innovation"
                },
                afternoon: {
                    hero_refinement: "Back for systematic execution—let's apply proven methodology to new challenges",
                    cta_refinement: "Advance Your Methodology",
                    agent_insight: "Agent G acknowledges your consistent pursuit of rigorous design leadership"
                },
                evening: {
                    hero_refinement: "Returning for reflective mastery—where earned wisdom meets new possibilities",
                    cta_refinement: "Deepen Your Mastery",
                    agent_insight: "Agent S honors your commitment to transformative design leadership"
                }
            },
            deep_explorer: {
                morning: {
                    hero_refinement: "Strategic depth meets morning clarity—unlock advanced systematic thinking",
                    cta_refinement: "Access Advanced Frameworks",
                    agent_insight: "Agent Q elevates content for visitors who seek comprehensive understanding"
                },
                afternoon: {
                    hero_refinement: "Deep methodology for serious practitioners—enterprise-scale systematic innovation",
                    cta_refinement: "Engage Advanced Methodology",
                    agent_insight: "Agent G provides sophisticated frameworks for committed practitioners"
                },
                evening: {
                    hero_refinement: "Mastery-level exploration for transformative leaders—where depth meets wisdom",
                    cta_refinement: "Enter Mastery Territory",
                    agent_insight: "Agent S reveals advanced insights for visitors who appreciate profound depth"
                }
            },
            lab_discoverer: {
                morning: {
                    hero_refinement: "Experimental mindset meets strategic innovation—where curiosity drives breakthrough",
                    cta_refinement: "Explore Advanced Innovation",
                    agent_insight: "Agent Q celebrates your experimental approach to strategic design"
                },
                afternoon: {
                    hero_refinement: "Systematic experimentation for innovation leaders—proven methodology meets bold exploration",
                    cta_refinement: "Apply Experimental Methodology",
                    agent_insight: "Agent G honors your commitment to rigorous innovation exploration"
                },
                evening: {
                    hero_refinement: "Transformative experimentation for visionary leaders—where mastery meets bold possibility",
                    cta_refinement: "Pioneer Transformative Innovation",
                    agent_insight: "Agent S acknowledges your courage to explore transformative possibilities"
                }
            }
        };

        const variant = personalizedVariants[strategy]?.[timeOfDay];
        
        if (variant) {
            return {
                ...baseContent,
                headline: variant.hero_refinement || baseContent.headline,
                cta_text: variant.cta_refinement || baseContent.cta_text,
                agentInjectedInsight: variant.agent_insight || baseContent.agentInjectedInsight,
                personalizationStrategy: strategy,
                personalizationApplied: true
            };
        }
        
        return baseContent;
    }
}

// =====================================
// INITIALIZE SYSTEM
// =====================================

// Auto-initialize when DOM is ready
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        window.visitorMemorySystem = new VisitorMemoryPersonalizationSystem();
        
        // Example usage
        console.log('👤 Visitor Profile:', window.visitorMemorySystem.getVisitorProfile());
    });
}

module.exports = { VisitorMemoryPersonalizationSystem, VisitorMemorySynthAgent };
