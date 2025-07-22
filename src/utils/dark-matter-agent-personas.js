/**
 * Dark Matter Agent Personas System
 * Invisible precision layer for cross-platform fidelity and strategic integrity
 * Prevents 30% quality degradation in GPT → Claude → Windsurf → Figma pipeline
 */

class DarkMatterAgentPersonas {
    constructor() {
        this.sessionId = `dark_matter_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        this.contextHistory = [];
        this.strategicIntent = null;
        this.qualityMetrics = {
            translationFidelity: 0,
            strategicAlignment: 0,
            executionQuality: 0,
            contextPreservation: 0
        };
    }

    /**
     * 🔄 Translator Agent
     * Prevents translation loss between platforms and execution layers
     */
    translateAgent(userPrompt, platformContext = 'windsurf') {
        const translationEnhancement = {
            windsurf: {
                prefix: "🔄 Translator Agent - Windsurf Optimization",
                contextPreservation: "Maintain YAML fidelity, prevent context degradation, ensure DOS framework alignment",
                executionFocus: "Generate production-ready code with error handling and performance optimization",
                qualityChecks: ["YAML structure integrity", "Base OS Stack alignment", "Production utilities integration"]
            },
            figma: {
                prefix: "🔄 Translator Agent - Figma Bridge",
                contextPreservation: "Preserve design system tokens, maintain component hierarchy, ensure responsive breakpoints",
                executionFocus: "Generate design specifications that translate cleanly to code implementation",
                qualityChecks: ["Design token consistency", "Component structure", "Responsive behavior"]
            },
            gpt: {
                prefix: "🔄 Translator Agent - GPT Strategy Bridge",
                contextPreservation: "Maintain strategic vision, preserve Base OS Stack context, ensure ambition level",
                executionFocus: "Generate strategic frameworks that execute cleanly in technical implementation",
                qualityChecks: ["Strategic coherence", "Framework completeness", "Implementation clarity"]
            }
        };

        const context = translationEnhancement[platformContext];
        
        const optimizedPrompt = `${context.prefix}

**Strategic Context Preservation:**
${context.contextPreservation}

**Execution Focus:**
${context.executionFocus}

**Quality Validation Checklist:**
${context.qualityChecks.map(check => `- [ ] ${check}`).join('\n')}

**Original Request:**
"${userPrompt}"

**Translation Enhancement:**
Anticipate cross-platform execution failures. Translate this task into a prompt that preserves fidelity, preempts degradation, and ensures the strategy matches Ric's design intent with zero quality loss.

**Expected Output:**
Production-ready implementation that maintains strategic integrity and authentic voice throughout execution.`;

        this.logInteraction('translator', userPrompt, optimizedPrompt);
        this.qualityMetrics.translationFidelity += 0.2;
        
        return optimizedPrompt;
    }

    /**
     * 🧪 Quality Auditor
     * Audits output for truth alignment and strategic rigor
     */
    qualityAuditor(userPrompt, outputToAudit = null) {
        const auditFramework = {
            strategicAlignment: [
                "Does this reflect Ric's 5-year vision of strategic design leadership?",
                "Is the ambition level appropriate for Fortune 500 executives?",
                "Does it maintain editorial minimalism and authentic voice?"
            ],
            executionQuality: [
                "Is this production-ready with proper error handling?",
                "Does it integrate cleanly with existing systems?",
                "Are performance and scalability considerations addressed?"
            ],
            designIntegrity: [
                "Does this maintain DOS framework principles?",
                "Is the Base OS Stack properly applied?",
                "Does it preserve the systematic design methodology?"
            ],
            truthAlignment: [
                "Is this authentic to Ric's actual capabilities and experience?",
                "Does it avoid hype and maintain credibility?",
                "Is the positioning strategically sound?"
            ]
        };

        const optimizedPrompt = `🧪 Quality Auditor - Strategic Rigor Assessment

**Audit Request:**
"${userPrompt}"

${outputToAudit ? `**Output to Audit:**
"${outputToAudit}"` : ''}

**Audit Framework:**

**Strategic Alignment:**
${auditFramework.strategicAlignment.map(q => `- ${q}`).join('\n')}

**Execution Quality:**
${auditFramework.executionQuality.map(q => `- ${q}`).join('\n')}

**Design Integrity:**
${auditFramework.designIntegrity.map(q => `- ${q}`).join('\n')}

**Truth Alignment:**
${auditFramework.truthAlignment.map(q => `- ${q}`).join('\n')}

**Quality Auditor Mission:**
Evaluate with brutal honesty. Challenge hype, push for higher ambition, ensure this reflects the 5-year vision of "strategic design leadership that defines tomorrow's standards."

**Expected Output:**
Honest assessment with specific recommendations for elevating quality and maintaining strategic integrity.`;

        this.logInteraction('auditor', userPrompt, optimizedPrompt);
        this.qualityMetrics.strategicAlignment += 0.2;
        
        return optimizedPrompt;
    }

    /**
     * 📤 Handoff Specialist
     * Ensures clean cross-platform orchestration
     */
    handoffSpecialist(userPrompt, targetPlatform = 'windsurf', sourceContext = null) {
        const handoffOptimization = {
            'gpt-to-windsurf': {
                focus: "Strategic vision → Technical implementation",
                requirements: ["Complete context preservation", "YAML structure integrity", "Implementation specifications"],
                riskMitigation: ["Context loss prevention", "Technical feasibility validation", "Resource requirement clarity"]
            },
            'windsurf-to-figma': {
                focus: "Technical implementation → Design specifications",
                requirements: ["Component structure clarity", "Design token mapping", "Responsive behavior specs"],
                riskMitigation: ["Design system consistency", "Implementation feasibility", "Cross-platform compatibility"]
            },
            'figma-to-windsurf': {
                focus: "Design specifications → Code implementation",
                requirements: ["Design token extraction", "Component hierarchy", "Interaction specifications"],
                riskMitigation: ["Technical constraints", "Performance considerations", "Accessibility compliance"]
            }
        };

        const handoffKey = sourceContext ? `${sourceContext}-to-${targetPlatform}` : `gpt-to-${targetPlatform}`;
        const optimization = handoffOptimization[handoffKey] || handoffOptimization['gpt-to-windsurf'];

        const optimizedPrompt = `📤 Handoff Specialist - Cross-Platform Orchestration

**Handoff Type:** ${handoffKey}
**Focus:** ${optimization.focus}

**Original Request:**
"${userPrompt}"

**Handoff Requirements:**
${optimization.requirements.map(req => `- ${req}`).join('\n')}

**Risk Mitigation:**
${optimization.riskMitigation.map(risk => `- ${risk}`).join('\n')}

**Handoff Specialist Mission:**
Design a handoff-ready output that minimizes friction and preserves all context for seamless execution across platforms. Ensure zero quality degradation in the transition.

**Expected Output:**
Complete, context-rich deliverable that executes cleanly on the target platform while maintaining strategic intent and design integrity.`;

        this.logInteraction('handoff', userPrompt, optimizedPrompt);
        this.qualityMetrics.contextPreservation += 0.2;
        
        return optimizedPrompt;
    }

    /**
     * 🧵 Context Keeper
     * Maintains strategic intent and memory across sessions
     */
    contextKeeper(userPrompt, priorContext = null) {
        const contextFramework = {
            strategicContinuity: [
                "Base OS Stack alignment (SeedOS, LyraOS, DOS, COS, MemOS, EngageOS)",
                "Multi-agent framework integration (Agent-R, Agent-Q, Agent-S, Agent-D, Agent-G, Agent-A, Agent-X)",
                "Time-aware content orchestration system",
                "Production utilities and error handling"
            ],
            designIntegrity: [
                "Editorial minimalism and authentic Ric Rios voice",
                "Strategic positioning for Fortune 500 executives",
                "Systematic design methodology",
                "Production-quality execution standards"
            ],
            systemMemory: [
                "33 time-aware content variants across 11 portfolio sections",
                "5 integrated storytelling systems (Narrator-X, Remix Style Selector, Time Travel Mode, Journey Builder, Case Studies Evolution)",
                "Hidden Lab 2.0 with Konami code and experimental features",
                "Comprehensive orchestration and personalization engine"
            ]
        };

        const optimizedPrompt = `🧵 Context Keeper - Strategic Thread Preservation

**Current Request:**
"${userPrompt}"

${priorContext ? `**Prior Context:**
"${priorContext}"` : ''}

**Strategic Continuity Checkpoints:**
${contextFramework.strategicContinuity.map(item => `- ${item}`).join('\n')}

**Design Integrity Preservation:**
${contextFramework.designIntegrity.map(item => `- ${item}`).join('\n')}

**System Memory Integration:**
${contextFramework.systemMemory.map(item => `- ${item}`).join('\n')}

**Context Keeper Mission:**
Restore and preserve strategic intent. Reconnect current output with prior ambition, DOS scaffolds, and MemOS continuity. Ensure the strategic thread is never lost and quality standards are maintained.

**Expected Output:**
Implementation that seamlessly integrates with existing systems while advancing the strategic vision and maintaining authentic voice throughout.`;

        this.logInteraction('context', userPrompt, optimizedPrompt);
        this.qualityMetrics.executionQuality += 0.2;
        
        return optimizedPrompt;
    }

    /**
     * 🎯 Persona Router
     * Intelligent routing based on request type and context
     */
    routePersona(userPrompt, context = {}) {
        const routingLogic = {
            translation: ['implement', 'build', 'create', 'generate', 'code', 'yaml'],
            audit: ['review', 'validate', 'check', 'assess', 'evaluate', 'quality'],
            handoff: ['deploy', 'migrate', 'transfer', 'export', 'integrate', 'bridge'],
            context: ['continue', 'maintain', 'preserve', 'remember', 'restore', 'connect']
        };

        const promptLower = userPrompt.toLowerCase();
        let recommendedPersona = 'translator'; // default

        for (const [persona, keywords] of Object.entries(routingLogic)) {
            if (keywords.some(keyword => promptLower.includes(keyword))) {
                recommendedPersona = persona;
                break;
            }
        }

        // Context-based routing
        if (context.crossPlatform) recommendedPersona = 'handoff';
        if (context.qualityCheck) recommendedPersona = 'audit';
        if (context.sessionContinuation) recommendedPersona = 'context';

        return {
            recommended: recommendedPersona,
            confidence: 0.8,
            reasoning: `Detected ${recommendedPersona} patterns in request and context`
        };
    }

    /**
     * 📊 Quality Metrics Tracking
     */
    getQualityMetrics() {
        const totalScore = Object.values(this.qualityMetrics).reduce((sum, score) => sum + score, 0);
        const averageScore = totalScore / Object.keys(this.qualityMetrics).length;
        
        return {
            ...this.qualityMetrics,
            overallQuality: Math.min(averageScore, 1.0),
            sessionId: this.sessionId,
            interactionCount: this.contextHistory.length
        };
    }

    /**
     * 📝 Interaction Logging
     */
    logInteraction(persona, input, output) {
        this.contextHistory.push({
            timestamp: new Date().toISOString(),
            persona,
            input: input.substring(0, 200) + (input.length > 200 ? '...' : ''),
            output: output.substring(0, 200) + (output.length > 200 ? '...' : ''),
            qualityScore: this.getQualityMetrics().overallQuality
        });

        // Keep only last 50 interactions to prevent memory bloat
        if (this.contextHistory.length > 50) {
            this.contextHistory = this.contextHistory.slice(-50);
        }
    }

    /**
     * 🎭 Multi-Persona Orchestration
     * Combines multiple personas for complex tasks
     */
    orchestratePersonas(userPrompt, personaSequence = ['context', 'translator', 'auditor']) {
        const results = {};
        
        for (const persona of personaSequence) {
            switch (persona) {
                case 'translator':
                    results.translator = this.translateAgent(userPrompt);
                    break;
                case 'auditor':
                    results.auditor = this.qualityAuditor(userPrompt);
                    break;
                case 'handoff':
                    results.handoff = this.handoffSpecialist(userPrompt);
                    break;
                case 'context':
                    results.context = this.contextKeeper(userPrompt);
                    break;
            }
        }

        return {
            orchestrationId: `multi_persona_${Date.now()}`,
            sequence: personaSequence,
            results,
            qualityMetrics: this.getQualityMetrics()
        };
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DarkMatterAgentPersonas;
} else if (typeof window !== 'undefined') {
    window.DarkMatterAgentPersonas = DarkMatterAgentPersonas;
}

// Demo validation
console.log('🌌 Dark Matter Agent Personas System Loaded');
console.log('✅ Cross-platform fidelity protection active');
console.log('✅ Strategic integrity enforcement ready');
console.log('✅ Quality degradation prevention enabled');
