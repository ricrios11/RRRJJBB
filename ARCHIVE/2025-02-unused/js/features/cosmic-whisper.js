// 🌌 Cosmic Whisper Mode - Tier 10
// Contextually tailors homepage hero message based on agent persona and time

(function() {
    'use strict';

    // Hero message variants by agent tone and time of day
    const cosmicWhispers = {
        professional: {
            morning: [
                "Strategic design leadership for tomorrow's builders",
                "Architecting digital experiences that drive business growth",
                "Professional design systems for enterprise innovation"
            ],
            afternoon: [
                "Delivering measurable design impact at scale",
                "Strategic design leadership for tomorrow's builders", 
                "Business-focused design solutions that perform"
            ],
            evening: [
                "Reflecting on strategic design decisions that matter",
                "Professional insights for tomorrow's design challenges",
                "Strategic design leadership for tomorrow's builders"
            ]
        },
        creative: {
            morning: [
                "Crafting digital experiences that inspire and delight",
                "Where creativity meets purposeful design innovation",
                "Artistic vision for tomorrow's digital landscapes"
            ],
            afternoon: [
                "Designing with passion, building with purpose",
                "Creative design leadership for tomorrow's builders",
                "Transforming ideas into beautiful, functional experiences"
            ],
            evening: [
                "Dreaming up tomorrow's most inspiring interfaces",
                "Creative storytelling through thoughtful design",
                "Artistic design leadership for tomorrow's builders"
            ]
        },
        analytical: {
            morning: [
                "Data-driven design decisions for optimal outcomes",
                "Systematic design leadership for tomorrow's builders",
                "Metrics-focused approaches to user experience"
            ],
            afternoon: [
                "Analyzing user patterns to optimize digital experiences",
                "Evidence-based design leadership for tomorrow's builders",
                "Quantified design impact through rigorous testing"
            ],
            evening: [
                "Reviewing data insights that shape better design",
                "Analytical design leadership for tomorrow's builders",
                "Performance-driven design systems that scale"
            ]
        },
        visionary: {
            morning: [
                "Envisioning the future of human-centered design",
                "Transformative design leadership for tomorrow's builders",
                "Pioneering new paradigms in digital experience"
            ],
            afternoon: [
                "Building bridges between today's needs and tomorrow's possibilities",
                "Visionary design leadership for tomorrow's builders",
                "Shaping the next generation of digital interactions"
            ],
            evening: [
                "Contemplating the infinite potential of thoughtful design",
                "Future-focused design leadership for tomorrow's builders",
                "Imagining tomorrow's most transformative experiences"
            ]
        }
    };

    // Fallback messages
    const defaultWhispers = [
        "Strategic design leadership for tomorrow's builders",
        "Crafting experiences that matter",
        "Design leadership for the digital age"
    ];

    function getTimeOfDay() {
        const hour = new Date().getHours();
        
        if (hour >= 5 && hour < 12) {
            return 'morning';
        } else if (hour >= 12 && hour < 18) {
            return 'afternoon';
        } else {
            return 'evening';
        }
    }

    function getAgentProfile() {
        try {
            return JSON.parse(localStorage.getItem('agentx-profile') || '{}');
        } catch (e) {
            console.warn('Cosmic Whisper: Failed to parse agent profile', e);
            return {};
        }
    }

    function selectCosmicWhisper() {
        const profile = getAgentProfile();
        const timeOfDay = getTimeOfDay();
        
        // Use agent-specific whispers if available
        if (profile.tone && cosmicWhispers[profile.tone]) {
            const toneWhispers = cosmicWhispers[profile.tone][timeOfDay] || cosmicWhispers[profile.tone].morning;
            return toneWhispers[Math.floor(Math.random() * toneWhispers.length)];
        }
        
        // Fallback to default whispers
        return defaultWhispers[Math.floor(Math.random() * defaultWhispers.length)];
    }

    function updateHeroMessage() {
        // Target hero title elements
        const heroSelectors = [
            'h1',
            '.hero-title',
            '.hero h1',
            '[data-hero-title]',
            '.main-title'
        ];

        let updated = false;

        heroSelectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            
            elements.forEach(element => {
                // Skip if element doesn't look like a hero title
                const text = element.textContent.trim().toLowerCase();
                if (!text.includes('design') && !text.includes('leadership') && !text.includes('builder')) {
                    return;
                }

                // Skip if element is inside a modal or hidden
                if (element.closest('.modal') || element.closest('[style*="display: none"]')) {
                    return;
                }

                // Update with cosmic whisper
                const whisper = selectCosmicWhisper();
                if (element.textContent.trim() !== whisper) {
                    element.textContent = whisper;
                    updated = true;
                    
                    // Add subtle animation
                    element.style.transition = 'opacity 0.3s ease';
                    element.style.opacity = '0.7';
                    setTimeout(() => {
                        element.style.opacity = '1';
                    }, 150);
                    
                    // Log analytics event
                    if (typeof logAgentXEvent === 'function') {
                        logAgentXEvent('cosmic_whisper_applied', {
                            agent_tone: getAgentProfile().tone,
                            time_of_day: getTimeOfDay(),
                            whisper_text: whisper,
                            element_selector: selector
                        });
                    }
                }
            });
        });

        if (updated) {
            console.log('🌌 Cosmic Whisper: Hero message updated');
        }
    }

    function scheduleNextWhisper() {
        // Update whisper every 30 minutes for dynamic feel
        setTimeout(() => {
            updateHeroMessage();
            scheduleNextWhisper();
        }, 30 * 60 * 1000); // 30 minutes
    }

    // Initialize cosmic whisper system
    function initCosmicWhisper() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initCosmicWhisper);
            return;
        }

        // Initial whisper with delay to ensure hero is rendered
        setTimeout(() => {
            updateHeroMessage();
        }, 1000);

        // Update on agent profile changes
        window.addEventListener('agentx-profile-updated', () => {
            setTimeout(updateHeroMessage, 300);
        });

        // Schedule periodic updates
        scheduleNextWhisper();

        // Update on page visibility change (when user returns to tab)
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                setTimeout(updateHeroMessage, 500);
            }
        });
    }

    // Export functions for testing
    window.CosmicWhisper = {
        update: updateHeroMessage,
        select: selectCosmicWhisper,
        getTimeOfDay: getTimeOfDay
    };

    // Auto-initialize
    initCosmicWhisper();

})();
