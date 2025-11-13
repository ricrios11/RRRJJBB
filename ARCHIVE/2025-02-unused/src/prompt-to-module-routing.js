/**
 * RicRios Prompt-to-Module Routing Cascade Block
 * Maps Claude prompt themes to live homepage modules with time-aware context
 */

class PromptToModuleRouting {
    constructor() {
        this.sessionId = this.generateSessionId();
        this.memoryState = this.initializeMemoryState();
        this.moduleTemplates = this.defineModuleTemplates();
    }

    generateSessionId() {
        return `ricrios_routing_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    initializeMemoryState() {
        return {
            last_prompt: null,
            interaction_history: [],
            preferred_modules: {},
            time_patterns: {}
        };
    }

    defineModuleTemplates() {
        return {
            Hero: {
                structure: ['headline', 'subhead', 'cta'],
                focus: 'primary_value_proposition_and_engagement'
            },
            Toolkit: {
                structure: ['card_1', 'card_2', 'card_3'],
                focus: 'practical_resources_and_methodologies'
            },
            CaseStudies: {
                structure: ['case_study_1', 'case_study_2', 'case_study_3'],
                focus: 'demonstrated_expertise_and_results'
            },
            Philosophy: {
                structure: ['pillar_statement', 'supporting_principles', 'time_context'],
                focus: 'foundational_thinking_and_approach'
            },
            Innovation: {
                structure: ['innovation_highlight', 'strategic_context', 'future_implications'],
                focus: 'forward_thinking_and_systematic_advancement'
            }
        };
    }

    async processPromptToModule(userPrompt) {
        console.log('🎛️ Prompt-to-Module Routing Cascade');
        console.log('===================================');
        console.log(`Session ID: ${this.sessionId}`);
        console.log(`User Prompt: "${userPrompt}"`);
        console.log('');

        // Block 1: User Prompt Input (with memory)
        const promptInput = await this.executeUserPromptInput(userPrompt);
        console.log('📝 User Prompt Input Processed');

        // Block 2: Time of Day Context
        const timeContext = await this.executeTimeOfDayContext();
        console.log('🕐 Time Context Retrieved');

        // Block 3: Classify Prompt Intent
        const intentClassification = await this.executeClassifyPromptIntent(userPrompt);
        console.log('🎯 Prompt Intent Classified');

        // Block 4: Render Module (Conditional)
        const moduleRendering = await this.executeRenderModule(
            intentClassification, userPrompt, timeContext
        );
        console.log('🎨 Module Rendered');

        // Update memory state
        this.updateMemoryState(userPrompt, intentClassification, moduleRendering);

        return {
            sessionId: this.sessionId,
            promptInput,
            timeContext,
            intentClassification,
            moduleRendering,
            memoryState: this.memoryState
        };
    }

    async executeUserPromptInput(userPrompt) {
        return {
            id: 'user_prompt_input',
            type: 'text_input',
            label: "What's your focus today?",
            input: userPrompt,
            memory_key: 'last_prompt',
            previous_prompt: this.memoryState.last_prompt,
            prompt_similarity: this.calculatePromptSimilarity(userPrompt)
        };
    }

    calculatePromptSimilarity(currentPrompt) {
        if (!this.memoryState.last_prompt) return 0;
        
        const current = currentPrompt.toLowerCase();
        const previous = this.memoryState.last_prompt.toLowerCase();
        
        // Simple similarity based on common words
        const currentWords = current.split(' ');
        const previousWords = previous.split(' ');
        const commonWords = currentWords.filter(word => previousWords.includes(word));
        
        return commonWords.length / Math.max(currentWords.length, previousWords.length);
    }

    async executeTimeOfDayContext() {
        const now = new Date();
        const hour = now.getHours();
        
        let timeBlock;
        if (hour >= 6 && hour < 12) timeBlock = 'morning';
        else if (hour >= 12 && hour < 18) timeBlock = 'afternoon';
        else timeBlock = 'evening';

        return {
            id: 'time_of_day_context',
            type: 'system',
            source: 'datetime',
            format: 'HH',
            output_variable: 'time_block',
            current_hour: hour,
            time_block: timeBlock,
            contextual_influence: this.getTimeContextualInfluence(timeBlock)
        };
    }

    getTimeContextualInfluence(timeBlock) {
        const influences = {
            morning: 'fresh_perspective_systematic_clarity',
            afternoon: 'focused_execution_methodical_precision',
            evening: 'contemplative_depth_philosophical_reflection'
        };
        return influences[timeBlock];
    }

    async executeClassifyPromptIntent(userPrompt) {
        const classification = this.classifyPromptToModule(userPrompt);
        
        return {
            id: 'classify_prompt_intent',
            type: 'claude',
            input: userPrompt,
            instructions: 'Analyze the prompt and classify it into homepage modules',
            output: classification,
            confidence_score: this.calculateClassificationConfidence(userPrompt, classification.targetModule)
        };
    }

    classifyPromptToModule(prompt) {
        const promptLower = prompt.toLowerCase();
        
        // Hero module indicators
        if (promptLower.includes('homepage') || promptLower.includes('headline') || 
            promptLower.includes('introduction') || promptLower.includes('first impression')) {
            return {
                targetModule: 'Hero',
                rationale: 'Prompt focuses on primary homepage presentation and value proposition'
            };
        }
        
        // Toolkit module indicators
        if (promptLower.includes('toolkit') || promptLower.includes('resources') || 
            promptLower.includes('methodology') || promptLower.includes('framework') ||
            promptLower.includes('system') || promptLower.includes('process')) {
            return {
                targetModule: 'Toolkit',
                rationale: 'Prompt seeks practical resources and systematic methodologies'
            };
        }
        
        // Case Studies module indicators
        if (promptLower.includes('case study') || promptLower.includes('example') || 
            promptLower.includes('project') || promptLower.includes('work') ||
            promptLower.includes('portfolio') || promptLower.includes('results')) {
            return {
                targetModule: 'CaseStudies',
                rationale: 'Prompt requests demonstrated expertise and project examples'
            };
        }
        
        // Philosophy module indicators
        if (promptLower.includes('philosophy') || promptLower.includes('approach') || 
            promptLower.includes('thinking') || promptLower.includes('principles') ||
            promptLower.includes('belief') || promptLower.includes('wisdom')) {
            return {
                targetModule: 'Philosophy',
                rationale: 'Prompt explores foundational thinking and design principles'
            };
        }
        
        // Innovation module indicators
        if (promptLower.includes('innovation') || promptLower.includes('future') || 
            promptLower.includes('strategic') || promptLower.includes('advancement') ||
            promptLower.includes('cutting-edge') || promptLower.includes('next')) {
            return {
                targetModule: 'Innovation',
                rationale: 'Prompt focuses on forward-thinking and strategic innovation'
            };
        }
        
        // Default to Hero for general inquiries
        return {
            targetModule: 'Hero',
            rationale: 'General inquiry best served by primary value proposition'
        };
    }

    calculateClassificationConfidence(prompt, targetModule) {
        const moduleKeywords = {
            Hero: ['homepage', 'headline', 'introduction', 'first', 'main'],
            Toolkit: ['toolkit', 'resources', 'methodology', 'framework', 'system'],
            CaseStudies: ['case', 'example', 'project', 'work', 'portfolio'],
            Philosophy: ['philosophy', 'approach', 'thinking', 'principles', 'belief'],
            Innovation: ['innovation', 'future', 'strategic', 'advancement', 'next']
        };
        
        const promptWords = prompt.toLowerCase().split(' ');
        const moduleWords = moduleKeywords[targetModule] || [];
        const matches = promptWords.filter(word => moduleWords.includes(word)).length;
        
        return Math.min(matches / moduleWords.length + 0.3, 1.0);
    }

    async executeRenderModule(intentClassification, userPrompt, timeContext) {
        const targetModule = intentClassification.output.targetModule;
        
        console.log(`🎨 Rendering ${targetModule} module`);
        
        switch (targetModule) {
            case 'Hero':
                return await this.executeHeroSectionBlock(userPrompt, timeContext);
            case 'Toolkit':
                return await this.executeToolkitSectionBlock(userPrompt, timeContext);
            case 'CaseStudies':
                return await this.executeCaseStudyBlock(userPrompt, timeContext);
            case 'Philosophy':
                return await this.executePhilosophyBlock(userPrompt, timeContext);
            case 'Innovation':
                return await this.executeInnovationBlock(userPrompt, timeContext);
            default:
                return await this.executeHeroSectionBlock(userPrompt, timeContext);
        }
    }

    async executeHeroSectionBlock(userPrompt, timeContext) {
        const timeGreeting = this.getTimeGreeting(timeContext.time_block);
        
        return {
            id: 'hero_section_block',
            type: 'claude',
            input: userPrompt,
            instructions: 'Generate homepage headline, subhead, and CTA for Hero section',
            output: {
                headline: `${timeGreeting} ${this.generateHeroHeadline(userPrompt)}`,
                subhead: this.generateHeroSubhead(userPrompt, timeContext),
                cta: this.generateHeroCTA(userPrompt),
                time_context: timeContext.time_block
            }
        };
    }

    getTimeGreeting(timeBlock) {
        const greetings = {
            morning: '🌅 Fresh perspective:',
            afternoon: '☀️ Strategic focus:',
            evening: '🌙 Evening wisdom:'
        };
        return greetings[timeBlock];
    }

    generateHeroHeadline(prompt) {
        const essence = this.extractPromptEssence(prompt);
        return `Systematic design leadership for ${essence}`;
    }

    generateHeroSubhead(prompt, timeContext) {
        const contextualApproach = {
            morning: 'Fresh systematic thinking meets editorial minimalism',
            afternoon: 'Strategic precision through methodical design leadership',
            evening: 'Contemplative wisdom applied to systematic innovation'
        };
        return contextualApproach[timeContext.time_block];
    }

    generateHeroCTA(prompt) {
        if (prompt.toLowerCase().includes('startup') || prompt.toLowerCase().includes('scale')) {
            return 'Explore Systematic Scaling Methodology';
        } else if (prompt.toLowerCase().includes('leadership') || prompt.toLowerCase().includes('team')) {
            return 'Discover Design Leadership Framework';
        } else {
            return 'Begin Systematic Exploration';
        }
    }

    async executeToolkitSectionBlock(userPrompt, timeContext) {
        return {
            id: 'toolkit_section_block',
            type: 'claude',
            input: userPrompt,
            instructions: 'Return 3 Toolkit cards tailored to user interest',
            output: {
                card_1: this.generateToolkitCard(userPrompt, 'primary'),
                card_2: this.generateToolkitCard(userPrompt, 'secondary'),
                card_3: this.generateToolkitCard(userPrompt, 'tertiary'),
                time_context: timeContext.time_block
            }
        };
    }

    generateToolkitCard(prompt, priority) {
        const toolkitOptions = {
            primary: {
                title: 'Systematic Design Framework',
                description: 'Core methodology for systematic design thinking',
                action: 'Download Framework'
            },
            secondary: {
                title: 'Leadership Scaling Toolkit',
                description: 'Resources for design leadership at scale',
                action: 'Access Toolkit'
            },
            tertiary: {
                title: 'Innovation Lab Methodology',
                description: 'Systematic approach to innovation processes',
                action: 'Explore Methodology'
            }
        };
        
        return toolkitOptions[priority];
    }

    async executeCaseStudyBlock(userPrompt, timeContext) {
        return {
            id: 'case_study_block',
            type: 'claude',
            input: userPrompt,
            instructions: 'Suggest 2-3 relevant Case Studies with short summaries',
            output: {
                case_study_1: {
                    title: 'BJJ Systematic Training Methodology',
                    summary: 'Applying design thinking to martial arts mastery',
                    relevance: 'Systematic approach to complex skill development'
                },
                case_study_2: {
                    title: 'Chase Travel Experience Transformation',
                    summary: 'Strategic UX leadership for enterprise travel',
                    relevance: 'Scaling design systems across global ecosystems'
                },
                case_study_3: {
                    title: 'Meta Platform Innovation',
                    summary: 'Design leadership for platform-scale innovation',
                    relevance: 'Systematic innovation in complex environments'
                },
                time_context: timeContext.time_block
            }
        };
    }

    async executePhilosophyBlock(userPrompt, timeContext) {
        return {
            id: 'philosophy_block',
            type: 'claude',
            input: userPrompt,
            instructions: 'Generate Philosophy Pillar reflecting user prompt and time of day',
            output: {
                pillar_statement: this.generatePhilosophyPillar(userPrompt, timeContext),
                supporting_principles: this.generateSupportingPrinciples(userPrompt),
                time_context: timeContext.time_block,
                contextual_wisdom: this.getContextualWisdom(timeContext.time_block)
            }
        };
    }

    generatePhilosophyPillar(prompt, timeContext) {
        const timePerspectives = {
            morning: 'Fresh systematic thinking reveals that',
            afternoon: 'Strategic precision demonstrates that',
            evening: 'Contemplative wisdom shows that'
        };
        
        return `${timePerspectives[timeContext.time_block]} true design leadership emerges from the intersection of systematic methodology and editorial minimalism.`;
    }

    generateSupportingPrinciples(prompt) {
        return [
            'Systematic thinking over reactive solutions',
            'Editorial minimalism over feature complexity',
            'Sustainable methodology over quick fixes'
        ];
    }

    getContextualWisdom(timeBlock) {
        const wisdom = {
            morning: 'Each day offers fresh perspective on systematic challenges',
            afternoon: 'Strategic execution requires methodical precision',
            evening: 'Deep reflection reveals the patterns that endure'
        };
        return wisdom[timeBlock];
    }

    async executeInnovationBlock(userPrompt, timeContext) {
        return {
            id: 'innovation_block',
            type: 'claude',
            input: userPrompt,
            instructions: 'Return strategic innovation highlight aligned with user prompt',
            output: {
                innovation_highlight: this.generateInnovationHighlight(userPrompt),
                strategic_context: this.generateStrategicContext(userPrompt, timeContext),
                future_implications: this.generateFutureImplications(userPrompt),
                time_context: timeContext.time_block
            }
        };
    }

    generateInnovationHighlight(prompt) {
        return 'Multi-Agent AI Orchestration Framework: Systematic coordination of AI agents for adaptive UX and contextual design experiences';
    }

    generateStrategicContext(prompt, timeContext) {
        const contexts = {
            morning: 'Fresh systematic thinking applied to AI orchestration',
            afternoon: 'Strategic implementation of multi-agent coordination',
            evening: 'Contemplative approach to AI-human design collaboration'
        };
        return contexts[timeContext.time_block];
    }

    generateFutureImplications(prompt) {
        return 'Enables context-aware design systems that adapt to user intent, time, and emotional context while maintaining systematic design principles';
    }

    extractPromptEssence(prompt) {
        const keywords = prompt.toLowerCase().match(/\b(startup|scale|leadership|team|design|system|innovation|framework|methodology|process)\b/g);
        return keywords ? keywords.slice(0, 2).join(' & ') : 'systematic thinking';
    }

    updateMemoryState(userPrompt, intentClassification, moduleRendering) {
        this.memoryState.last_prompt = userPrompt;
        this.memoryState.interaction_history.push({
            timestamp: new Date().toISOString(),
            prompt: userPrompt,
            targetModule: intentClassification.output.targetModule,
            confidence: intentClassification.confidence_score
        });
        
        // Update preferred modules
        const module = intentClassification.output.targetModule;
        this.memoryState.preferred_modules[module] = (this.memoryState.preferred_modules[module] || 0) + 1;
    }

    // Demo method to showcase the routing system
    async demonstrateRouting() {
        console.log('\n🎯 Prompt-to-Module Routing Demo');
        console.log('=================================');
        
        const testPrompts = [
            "Show me systems design examples for startups",
            "What's your design leadership philosophy?",
            "I need a toolkit for scaling design teams",
            "Tell me about your innovation approach",
            "Show me case studies of systematic design"
        ];

        for (const prompt of testPrompts) {
            console.log(`\n--- Processing: "${prompt}" ---`);
            const result = await this.processPromptToModule(prompt);
            console.log(`✅ Routed to: ${result.intentClassification.output.targetModule}`);
            console.log(`📊 Confidence: ${(result.intentClassification.confidence_score * 100).toFixed(1)}%`);
        }
    }
}

// Execute demonstration
const promptRouting = new PromptToModuleRouting();
promptRouting.demonstrateRouting().then(() => {
    console.log('\n🎛️ Prompt-to-Module Routing Complete!');
    console.log('====================================');
    console.log(`✅ Session: ${promptRouting.sessionId}`);
    console.log(`💬 Total Prompts Processed: ${promptRouting.memoryState.interaction_history.length}`);
    console.log(`🎯 Module Preferences:`, promptRouting.memoryState.preferred_modules);
    console.log('\n🚀 Ready for intelligent prompt-to-module routing!');
});

module.exports = PromptToModuleRouting;
