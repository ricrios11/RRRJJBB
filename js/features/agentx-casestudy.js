/**
 * 🧠 AgentX Case Study Footer Injection System
 * Adds personalized agent footnotes to case studies for editorial depth
 */

document.addEventListener("DOMContentLoaded", () => {
    try {
        // Load agent profile from localStorage
        const profile = JSON.parse(localStorage.getItem("agentx-profile") || "{}");
        const footnoteElement = document.getElementById("agentx-footnote");
        
        // Validate requirements
        if (!footnoteElement || !profile.name) {
            console.log("AgentX Case Study: No footnote element or agent profile found");
            return;
        }

        // Generate personalized footnote content
        const footnoteContent = generateAgentFootnote(profile);
        
        // Inject content with smooth animation
        footnoteElement.innerHTML = footnoteContent;
        footnoteElement.style.opacity = "0";
        footnoteElement.style.transform = "translateY(10px)";
        
        // Animate in
        setTimeout(() => {
            footnoteElement.style.transition = "all 0.5s ease";
            footnoteElement.style.opacity = "1";
            footnoteElement.style.transform = "translateY(0)";
        }, 100);

        // Log analytics event
        if (typeof logAgentXEvent === 'function') {
            logAgentXEvent("case_study_footnote_injected", {
                agent_name: profile.name,
                agent_theme: profile.theme,
                agent_role: profile.role,
                page_url: window.location.pathname
            });
        }

        // Fire custom event for extensibility
        document.dispatchEvent(new CustomEvent('agentxCaseStudyInjected', {
            detail: { profile, element: footnoteElement }
        }));

        console.log("AgentX Case Study: Footnote injected successfully");

    } catch (error) {
        console.error("AgentX Case Study Error:", error);
    }
});

/**
 * Generate personalized agent footnote content
 * @param {Object} profile - Agent profile object
 * @returns {string} HTML content for footnote
 */
function generateAgentFootnote(profile) {
    const {
        name = "Agent",
        tone = "professional",
        role = "assistant",
        theme = "cyberpunk",
        expertise = "general"
    } = profile;

    // Theme-specific styling and content variations
    const themeVariations = {
        cyberpunk: {
            icon: "🤖",
            descriptor: "neural-enhanced",
            suffix: "optimized for digital innovation systems"
        },
        professional: {
            icon: "💼",
            descriptor: "strategically-aligned",
            suffix: "calibrated for enterprise excellence"
        },
        creative: {
            icon: "🎨",
            descriptor: "creatively-tuned",
            suffix: "designed for artistic expression workflows"
        },
        minimal: {
            icon: "●",
            descriptor: "precision-focused",
            suffix: "configured for streamlined efficiency"
        }
    };

    const variation = themeVariations[theme] || themeVariations.cyberpunk;

    // Role-specific analysis descriptors
    const roleDescriptors = {
        assistant: "collaborative analysis",
        analyst: "data-driven insights",
        creative: "innovative ideation",
        technical: "technical evaluation",
        consultant: "strategic consultation"
    };

    const analysisType = roleDescriptors[role] || "comprehensive analysis";

    // Generate dynamic footnote
    return `
        <div class="agentx-case-footnote">
            <div class="agentx-footnote-content">
                <span class="agentx-footnote-icon">${variation.icon}</span>
                <p class="agentx-footnote-text">
                    <em>This case study was analyzed and narrated with ${analysisType} from your personalized agent: 
                    <strong class="agentx-footnote-name">${name}</strong>, a ${variation.descriptor} ${tone} ${role} ${variation.suffix}.</em>
                </p>
            </div>
            <div class="agentx-footnote-meta">
                <span class="agentx-footnote-theme">Theme: ${theme}</span>
                <span class="agentx-footnote-expertise">Focus: ${expertise}</span>
            </div>
        </div>
    `;
}

/**
 * Update case study footnote when agent profile changes
 * @param {Object} newProfile - Updated agent profile
 */
function updateCaseStudyFootnote(newProfile) {
    const footnoteElement = document.getElementById("agentx-footnote");
    if (footnoteElement && newProfile.name) {
        const newContent = generateAgentFootnote(newProfile);
        footnoteElement.innerHTML = newContent;
        
        // Log update event
        if (typeof logAgentXEvent === 'function') {
            logAgentXEvent("case_study_footnote_updated", {
                agent_name: newProfile.name,
                page_url: window.location.pathname
            });
        }
    }
}

// Listen for agent profile updates
document.addEventListener('agentxConfigSaved', (e) => {
    if (e.detail && e.detail.profile) {
        updateCaseStudyFootnote(e.detail.profile);
    }
});

// Global function for manual footnote updates
window.updateCaseStudyFootnote = updateCaseStudyFootnote;
