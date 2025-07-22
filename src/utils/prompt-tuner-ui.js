/**
 * RicRios AI Prompt Tuner UI
 * Fine-grained control over Agent S, D, and G behavior
 * Based on session metadata and user preferences
 */

class PromptTunerUI {
    constructor() {
        this.toneProfiles = [
            'poetic', 'technical', 'luxury_editorial', 'friendly', 
            'direct', 'experimental', 'night_reflective'
        ];
        
        this.layoutVariants = [
            'minimal_grid', 'anchor_layout', 'cta_heavy', 
            'scrollable_stack', 'dark_reflective', 'visual_story'
        ];
        
        this.moduleTokens = [
            'introModule', 'caseStudyQuickView', 'philosophyScroll', 
            'livePrompt', 'ctaBanner', 'innovationLabTeaser', 
            'contactPhilosophy', 'easterEggHint'
        ];
    }

    /**
     * Generate agent instructions based on tuner parameters
     * @param {Object} params - Tuner parameters
     * @returns {Object} Agent-specific instructions
     */
    generateInstructions(params) {
        const {
            intent_token,
            time_of_day,
            device_type,
            tone_profile,
            layout_variant,
            module_sequence
        } = params;

        // Determine theme based on time and context
        const theme = this.determineTheme(time_of_day, intent_token);
        
        // Validate and normalize inputs
        const normalizedParams = this.normalizeParams(params);

        return {
            tone_instructions: this.generateToneInstructions(normalizedParams),
            layout_instructions: this.generateLayoutInstructions(normalizedParams),
            module_sequence: normalizedParams.module_sequence,
            theme: theme,
            session_metadata: {
                intent_token: normalizedParams.intent_token,
                time_of_day: normalizedParams.time_of_day,
                device_type: normalizedParams.device_type,
                certainty: 99
            }
        };
    }

    /**
     * Generate tone instructions for Agent S (Stylist)
     */
    generateToneInstructions(params) {
        const { tone_profile, intent_token, time_of_day } = params;
        
        const toneMap = {
            poetic: "Write with lyrical precision, using metaphor and rhythm while maintaining Ric's sophisticated voice. Emphasize the artistry in systematic design thinking.",
            
            technical: "Adopt analytical clarity with systematic precision. Use concrete language that demonstrates deep technical understanding while remaining accessible to strategic leaders.",
            
            luxury_editorial: "Embody editorial minimalism with sophisticated restraint. Every word should carry weight, creating space for contemplation and reflection.",
            
            friendly: "Maintain approachable warmth while preserving professional authority. Create connection without sacrificing the gravitas of three decades of expertise.",
            
            direct: "Communicate with purposeful brevity and strategic clarity. Cut through complexity to deliver essential insights with confident precision.",
            
            experimental: "Push creative boundaries while honoring systematic principles. Introduce unexpected elements that reward curious exploration.",
            
            night_reflective: "Embrace contemplative depth with evening wisdom. Write for the thoughtful professional who values substance over surface."
        };

        const baseInstruction = toneMap[tone_profile] || toneMap.luxury_editorial;
        
        // Add contextual modifiers
        let contextualModifiers = "";
        if (time_of_day === 'evening' || time_of_day === 'night') {
            contextualModifiers += " Adapt for evening contemplation with deeper philosophical undertones.";
        }
        if (intent_token === 'professional') {
            contextualModifiers += " Emphasize strategic leadership credentials and systematic competitive advantage.";
        }

        return `Agent S should write in a ${tone_profile} voice aligned to Ric's brand tone. ${baseInstruction}${contextualModifiers}`;
    }

    /**
     * Generate layout instructions for Agent D (Designer)
     */
    generateLayoutInstructions(params) {
        const { layout_variant, device_type, intent_token } = params;
        
        const layoutMap = {
            minimal_grid: "Structure with clean grid systems, generous white space, and purposeful typography hierarchy. Emphasize editorial minimalism through restraint.",
            
            anchor_layout: "Create strong visual anchors with deliberate content positioning. Use systematic spacing to guide attention and create reading rhythm.",
            
            cta_heavy: "Design with clear conversion pathways while maintaining sophisticated aesthetics. Balance persuasion with editorial elegance.",
            
            scrollable_stack: "Implement vertical storytelling with progressive disclosure. Create natural scroll rhythms that reward continued engagement.",
            
            dark_reflective: "Embrace sophisticated dark themes with warm undertones. Use subtle gradients and elegant typography for evening contemplation.",
            
            visual_story: "Blend visual narrative with systematic content organization. Create discovery layers that unfold through purposeful interaction."
        };

        const baseInstruction = layoutMap[layout_variant] || layoutMap.minimal_grid;
        
        // Add device-specific optimizations
        let deviceOptimizations = "";
        if (device_type === 'mobile') {
            deviceOptimizations = " Optimize for thumb navigation with touch-friendly targets and vertical content priority.";
        } else if (device_type === 'desktop') {
            deviceOptimizations = " Leverage horizontal space for sophisticated multi-column layouts and hover interactions.";
        }

        return `Agent D should structure the layout using the ${layout_variant} grid optimized for ${device_type}. ${baseInstruction}${deviceOptimizations}`;
    }

    /**
     * Determine theme based on time and context
     */
    determineTheme(time_of_day, intent_token) {
        const hour = parseInt(time_of_day?.split(':')[0]) || new Date().getHours();
        
        if (hour >= 18 || hour <= 6) {
            return 'night_mode';
        }
        
        if (!intent_token || intent_token === 'undefined') {
            return 'fallback_mode';
        }
        
        return 'adaptive_mode';
    }

    /**
     * Normalize and validate parameters
     */
    normalizeParams(params) {
        return {
            intent_token: params.intent_token || 'default',
            time_of_day: params.time_of_day || new Date().toTimeString().slice(0, 5),
            device_type: params.device_type || 'desktop',
            tone_profile: this.toneProfiles.includes(params.tone_profile) ? params.tone_profile : 'luxury_editorial',
            layout_variant: this.layoutVariants.includes(params.layout_variant) ? params.layout_variant : 'minimal_grid',
            module_sequence: Array.isArray(params.module_sequence) ? params.module_sequence : ['introModule', 'philosophyScroll', 'ctaBanner']
        };
    }

    /**
     * Generate complete Claude prompt block for agent coordination
     */
    generateClaudePrompt(params) {
        const instructions = this.generateInstructions(params);
        
        return `You are Ric Rios' AI Prompt Tuner UI. Based on the inputs below, instruct Agent S (Stylist), Agent D (Designer), and Agent G (Guide) to modify their behavior accordingly. Use the prompt parameters as control knobs for output generation.

## Session Metadata:
- Visitor Intent Token: ${params.intent_token}
- Time of Day: ${params.time_of_day}
- Device Type: ${params.device_type}

## Tone Profile (Stylist – Agent S):
Select from: ${this.toneProfiles.join(', ')}
→ Current Selection: ${params.tone_profile}

## Layout Variant (Designer – Agent D):
Select from: ${this.layoutVariants.join(', ')}
→ Current Selection: ${params.layout_variant}

## Module Sequence (Guide – Agent G):
Use presets or specify order of modules by token
Example tokens: ${this.moduleTokens.join(', ')}
→ Current Sequence: ${JSON.stringify(params.module_sequence)}

## Optional Theme Toggle
- Use Night Mode if time_of_day > 18:00
- Activate Fallback Mode if intent_token is null or undefined

---

### Output Spec (JSON block):

\`\`\`json
${JSON.stringify(instructions, null, 2)}
\`\`\`

Ensure each agent receives only what they need, with clarity. Raise certainty to 99%. Maintain harmony across brand, tone, rhythm, and structure.`;
    }

    /**
     * Execute tuned agent coordination
     */
    async executeTunedAgents(params) {
        const instructions = this.generateInstructions(params);
        
        console.log('🎛️ Prompt Tuner UI - Agent Coordination');
        console.log('=====================================');
        console.log('Session Metadata:', instructions.session_metadata);
        console.log('Theme:', instructions.theme);
        console.log('');
        
        // Agent S execution
        console.log('🎨 Agent S (Stylist) Instructions:');
        console.log(instructions.tone_instructions);
        console.log('');
        
        // Agent D execution
        console.log('🏗️ Agent D (Designer) Instructions:');
        console.log(instructions.layout_instructions);
        console.log('');
        
        // Agent G execution
        console.log('🧭 Agent G (Guide) Module Sequence:');
        console.log(instructions.module_sequence.join(' → '));
        console.log('');
        
        return instructions;
    }
}

// Export for use in build system
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PromptTunerUI;
}

// Browser global for immediate use
if (typeof window !== 'undefined') {
    window.PromptTunerUI = PromptTunerUI;
}

/**
 * Usage Example:
 * 
 * const tuner = new PromptTunerUI();
 * 
 * const params = {
 *   intent_token: 'evening',
 *   time_of_day: '23:36',
 *   device_type: 'desktop',
 *   tone_profile: 'night_reflective',
 *   layout_variant: 'dark_reflective',
 *   module_sequence: ['introModule', 'philosophyScroll', 'easterEggHint']
 * };
 * 
 * const instructions = tuner.executeTunedAgents(params);
 */
