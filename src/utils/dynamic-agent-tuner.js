/**
 * Dynamic Agent Tuner - Advanced Setup
 * Dynamically switches agent tone/layout based on intent token
 * Part of Cascade Multi-Agent Design Studio Framework
 */

class DynamicAgentTuner {
    constructor() {
        this.intentProfiles = {
            // Professional/Business Intent
            'professional': {
                tone_profile: {
                    voice: 'authoritative',
                    formality: 'high',
                    complexity: 'sophisticated',
                    emotional_register: 'confident',
                    copy_style: 'strategic_leadership'
                },
                layout_variant: {
                    hierarchy: 'executive',
                    spacing: 'generous',
                    typography: 'serif_headers',
                    color_scheme: 'professional_dark',
                    interaction_style: 'deliberate'
                }
            },

            // Creative/Exploration Intent
            'creative': {
                tone_profile: {
                    voice: 'inspiring',
                    formality: 'medium',
                    complexity: 'nuanced',
                    emotional_register: 'curious',
                    copy_style: 'design_thinking'
                },
                layout_variant: {
                    hierarchy: 'discovery',
                    spacing: 'dynamic',
                    typography: 'sans_modern',
                    color_scheme: 'creative_gradient',
                    interaction_style: 'exploratory'
                }
            },

            // Technical/Research Intent
            'technical': {
                tone_profile: {
                    voice: 'analytical',
                    formality: 'medium-high',
                    complexity: 'detailed',
                    emotional_register: 'focused',
                    copy_style: 'systematic_precision'
                },
                layout_variant: {
                    hierarchy: 'structured',
                    spacing: 'compact',
                    typography: 'mono_accents',
                    color_scheme: 'technical_blue',
                    interaction_style: 'methodical'
                }
            },

            // Evening/Contemplative Intent
            'evening': {
                tone_profile: {
                    voice: 'contemplative',
                    formality: 'medium',
                    complexity: 'reflective',
                    emotional_register: 'wise',
                    copy_style: 'editorial_minimalism'
                },
                layout_variant: {
                    hierarchy: 'flowing',
                    spacing: 'relaxed',
                    typography: 'serif_elegant',
                    color_scheme: 'evening_warm',
                    interaction_style: 'gentle'
                }
            },

            // Mobile/Quick Intent
            'mobile': {
                tone_profile: {
                    voice: 'direct',
                    formality: 'low-medium',
                    complexity: 'concise',
                    emotional_register: 'efficient',
                    copy_style: 'mobile_optimized'
                },
                layout_variant: {
                    hierarchy: 'vertical_priority',
                    spacing: 'touch_friendly',
                    typography: 'sans_readable',
                    color_scheme: 'high_contrast',
                    interaction_style: 'thumb_navigation'
                }
            },

            // Default/Balanced Intent
            'default': {
                tone_profile: {
                    voice: 'balanced',
                    formality: 'medium',
                    complexity: 'accessible',
                    emotional_register: 'approachable',
                    copy_style: 'editorial_minimalism'
                },
                layout_variant: {
                    hierarchy: 'balanced',
                    spacing: 'comfortable',
                    typography: 'sans_clean',
                    color_scheme: 'adaptive_neutral',
                    interaction_style: 'intuitive'
                }
            }
        };
    }

    /**
     * Adjust tone and layout based on intent token
     * @param {string} intent_token - The detected intent token
     * @returns {Object} Tone profile and layout variant
     */
    adjustToneLayout(intent_token) {
        // Normalize intent token
        const normalizedToken = intent_token?.toLowerCase() || 'default';
        
        // Get profile or fallback to default
        const profile = this.intentProfiles[normalizedToken] || this.intentProfiles.default;
        
        return {
            intent_token: normalizedToken,
            tone_profile: profile.tone_profile,
            layout_variant: profile.layout_variant,
            timestamp: new Date().toISOString(),
            context: {
                detected_intent: normalizedToken,
                fallback_used: !this.intentProfiles[normalizedToken]
            }
        };
    }

    /**
     * Infer intent from context clues
     * @param {Object} context - Context object with time, device, referrer, etc.
     * @returns {string} Inferred intent token
     */
    inferIntent(context = {}) {
        const { 
            timeOfDay, 
            deviceType, 
            referrer, 
            userAgent, 
            previousPath,
            sessionDuration 
        } = context;

        // Evening time preference
        if (timeOfDay === 'evening' || timeOfDay === 'night') {
            return 'evening';
        }

        // Mobile device detection
        if (deviceType === 'mobile' || /Mobile|Android|iPhone/i.test(userAgent)) {
            return 'mobile';
        }

        // Professional referrer patterns
        if (referrer && /linkedin|professional|business/i.test(referrer)) {
            return 'professional';
        }

        // Creative/design referrer patterns
        if (referrer && /dribbble|behance|design|creative/i.test(referrer)) {
            return 'creative';
        }

        // Technical referrer patterns
        if (referrer && /github|stackoverflow|tech|dev/i.test(referrer)) {
            return 'technical';
        }

        // Default fallback
        return 'default';
    }

    /**
     * Generate agent instructions based on tuned profile
     * @param {Object} tunedProfile - Output from adjustToneLayout
     * @returns {Object} Agent-specific instructions
     */
    generateAgentInstructions(tunedProfile) {
        const { tone_profile, layout_variant } = tunedProfile;

        return {
            'agent-s': {
                instruction: `Refine hero copy with ${tone_profile.voice} voice, ${tone_profile.formality} formality, using ${tone_profile.copy_style} approach. Emotional register: ${tone_profile.emotional_register}.`,
                tone_profile
            },
            'agent-d': {
                instruction: `Structure layout with ${layout_variant.hierarchy} hierarchy, ${layout_variant.spacing} spacing, ${layout_variant.typography} typography. Color scheme: ${layout_variant.color_scheme}.`,
                layout_variant
            },
            'agent-g': {
                instruction: `Design user journey with ${layout_variant.interaction_style} interaction style, optimized for ${tunedProfile.intent_token} intent pattern.`,
                interaction_style: layout_variant.interaction_style
            }
        };
    }
}

// Export for use in build system
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DynamicAgentTuner;
}

// Browser global for immediate use
if (typeof window !== 'undefined') {
    window.DynamicAgentTuner = DynamicAgentTuner;
}

/**
 * Usage Example:
 * 
 * const tuner = new DynamicAgentTuner();
 * 
 * // Method 1: Direct intent token
 * const result = tuner.adjustToneLayout('evening');
 * 
 * // Method 2: Context-based inference
 * const context = {
 *     timeOfDay: 'evening',
 *     deviceType: 'desktop',
 *     referrer: 'https://linkedin.com'
 * };
 * const intentToken = tuner.inferIntent(context);
 * const result = tuner.adjustToneLayout(intentToken);
 * 
 * // Method 3: Generate agent instructions
 * const instructions = tuner.generateAgentInstructions(result);
 */
