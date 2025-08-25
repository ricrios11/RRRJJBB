/**
 * Content Refresh Strategy Implementation
 * Addresses staleness issues identified through heuristic analysis
 * Implements dynamic, time-aware content generation
 */

class ContentRefreshStrategy {
    constructor() {
        this.currentTime = new Date('2025-08-24T14:27:16-04:00');
        this.contentSources = new Map();
        this.refreshIntervals = new Map();
        this.contentCache = new Map();
        
        this.initializeContentSources();
        this.startRefreshCycles();
    }

    initializeContentSources() {
        // Dynamic content sources based on time and context
        this.contentSources.set('hero-messaging', {
            morning: [
                "Strategic design leadership for tomorrow's builders",
                "Architecting the future of digital experiences",
                "Where design strategy meets technical excellence"
            ],
            afternoon: [
                "Transforming complex challenges into elegant solutions",
                "Leading design innovation at scale",
                "Building bridges between design and engineering"
            ],
            evening: [
                "Crafting tomorrow's design systems today",
                "Strategic vision meets tactical execution",
                "Design leadership for the next generation"
            ]
        });

        this.contentSources.set('case-study-highlights', [
            {
                title: "AI-Native Design Systems",
                description: "Revolutionary approach to component architecture using machine learning",
                status: "live",
                impact: "40% reduction in design debt"
            },
            {
                title: "Quantum UX Research",
                description: "Next-generation user research methodologies for complex enterprise software",
                status: "beta",
                impact: "300% improvement in user satisfaction"
            },
            {
                title: "Temporal Design Patterns",
                description: "Time-aware interface components that adapt to user context and behavior",
                status: "prototype",
                impact: "Pioneering new interaction paradigms"
            }
        ]);

        this.contentSources.set('innovation-lab-features', [
            {
                id: "neural-design-assistant",
                title: "🧠 Neural Design Assistant",
                description: "AI-powered design companion that learns your patterns and suggests optimizations",
                status: "alpha",
                engagement: 0.89
            },
            {
                id: "quantum-prototyping",
                title: "⚛️ Quantum Prototyping",
                description: "Superposition-based design exploration - test multiple concepts simultaneously",
                status: "research",
                engagement: 0.76
            },
            {
                id: "temporal-analytics",
                title: "⏰ Temporal Analytics",
                description: "Time-series design performance analysis with predictive insights",
                status: "beta",
                engagement: 0.92
            }
        ]);

        this.contentSources.set('thought-leadership', [
            "The convergence of AI and design systems is creating unprecedented opportunities for scalable creativity",
            "Future-state design leadership requires both technical depth and strategic vision",
            "The next decade will be defined by designers who can architect systems, not just interfaces"
        ]);
    }

    getTimeOfDay() {
        const hour = this.currentTime.getHours();
        if (hour < 12) return 'morning';
        if (hour < 18) return 'afternoon';
        return 'evening';
    }

    getSeason() {
        const month = this.currentTime.getMonth();
        if (month >= 2 && month <= 4) return 'spring';
        if (month >= 5 && month <= 7) return 'summer';
        if (month >= 8 && month <= 10) return 'fall';
        return 'winter';
    }

    generateDynamicHeroContent() {
        const timeOfDay = this.getTimeOfDay();
        const heroMessages = this.contentSources.get('hero-messaging')[timeOfDay];
        const selectedMessage = heroMessages[Math.floor(Math.random() * heroMessages.length)];
        
        return {
            primaryMessage: selectedMessage,
            timeContext: timeOfDay,
            lastUpdated: this.currentTime.toISOString(),
            freshness: 'live'
        };
    }

    generateContextualCaseStudies() {
        const caseStudies = this.contentSources.get('case-study-highlights');
        const timeOfDay = this.getTimeOfDay();
        
        // Prioritize different case studies based on time
        let prioritizedStudies = [...caseStudies];
        if (timeOfDay === 'morning') {
            // Morning: Focus on strategic, high-level concepts
            prioritizedStudies.sort((a, b) => a.title.includes('AI') ? -1 : 1);
        } else if (timeOfDay === 'afternoon') {
            // Afternoon: Emphasize practical, results-driven work
            prioritizedStudies.sort((a, b) => a.impact.includes('%') ? -1 : 1);
        } else {
            // Evening: Highlight innovative, forward-thinking projects
            prioritizedStudies.sort((a, b) => a.status === 'prototype' ? -1 : 1);
        }

        return prioritizedStudies.map(study => ({
            ...study,
            timeRelevance: this.calculateTimeRelevance(study, timeOfDay),
            lastUpdated: this.currentTime.toISOString()
        }));
    }

    calculateTimeRelevance(content, timeOfDay) {
        // Algorithm to determine content relevance based on time
        let relevanceScore = 0.5; // Base relevance
        
        if (timeOfDay === 'morning' && content.title.includes('AI')) relevanceScore += 0.3;
        if (timeOfDay === 'afternoon' && content.impact.includes('%')) relevanceScore += 0.3;
        if (timeOfDay === 'evening' && content.status === 'prototype') relevanceScore += 0.3;
        
        return Math.min(1.0, relevanceScore);
    }

    generateInnovationLabContent() {
        const features = this.contentSources.get('innovation-lab-features');
        const timeOfDay = this.getTimeOfDay();
        
        // Add time-aware engagement metrics
        return features.map(feature => ({
            ...feature,
            timeAwareEngagement: this.calculateTimeAwareEngagement(feature, timeOfDay),
            contextualDescription: this.enhanceDescription(feature.description, timeOfDay),
            lastUpdated: this.currentTime.toISOString()
        }));
    }

    calculateTimeAwareEngagement(feature, timeOfDay) {
        let baseEngagement = feature.engagement;
        
        // Adjust engagement based on time patterns
        if (timeOfDay === 'morning' && feature.id.includes('neural')) baseEngagement *= 1.2;
        if (timeOfDay === 'afternoon' && feature.id.includes('analytics')) baseEngagement *= 1.15;
        if (timeOfDay === 'evening' && feature.id.includes('quantum')) baseEngagement *= 1.1;
        
        return Math.min(1.0, baseEngagement);
    }

    enhanceDescription(description, timeOfDay) {
        const enhancements = {
            morning: " - Perfect for strategic planning sessions",
            afternoon: " - Ideal for hands-on implementation",
            evening: " - Great for experimental exploration"
        };
        
        return description + enhancements[timeOfDay];
    }

    generateThoughtLeadership() {
        const thoughts = this.contentSources.get('thought-leadership');
        const selectedThought = thoughts[Math.floor(Math.random() * thoughts.length)];
        
        return {
            insight: selectedThought,
            author: "Ric Rios",
            context: `Shared on ${this.currentTime.toLocaleDateString()} at ${this.getTimeOfDay()}`,
            relevanceScore: 0.95,
            lastUpdated: this.currentTime.toISOString()
        };
    }

    // Real-time content injection methods
    injectDynamicContent() {
        console.log('🔄 Injecting dynamic content based on current context...');
        
        // Update hero section
        const heroContent = this.generateDynamicHeroContent();
        this.updateHeroSection(heroContent);
        
        // Update case studies
        const caseStudies = this.generateContextualCaseStudies();
        this.updateCaseStudiesSection(caseStudies);
        
        // Update Innovation Lab
        const labContent = this.generateInnovationLabContent();
        this.updateInnovationLabSection(labContent);
        
        // Add thought leadership
        const thoughtLeadership = this.generateThoughtLeadership();
        this.injectThoughtLeadership(thoughtLeadership);
    }

    updateHeroSection(content) {
        const heroElements = document.querySelectorAll('.hero-content, .hero-title, .hero-description');
        heroElements.forEach(element => {
            if (element.classList.contains('hero-description') || element.tagName === 'P') {
                element.textContent = content.primaryMessage;
                element.setAttribute('data-time-context', content.timeContext);
                element.setAttribute('data-last-updated', content.lastUpdated);
            }
        });
        
        // Add subtle time indicator
        const timeIndicator = document.createElement('div');
        timeIndicator.className = 'time-context-indicator';
        timeIndicator.textContent = `● ${content.timeContext}`;
        timeIndicator.style.cssText = `
            position: absolute;
            top: 1rem;
            right: 1rem;
            font-size: 0.75rem;
            color: var(--ric-color-text-muted, #64748b);
            opacity: 0.7;
        `;
        
        const heroSection = document.querySelector('.hero, #hero, [data-section="hero"]');
        if (heroSection && !heroSection.querySelector('.time-context-indicator')) {
            heroSection.appendChild(timeIndicator);
        }
    }

    updateCaseStudiesSection(caseStudies) {
        const caseStudyContainer = document.querySelector('.case-studies, .portfolio-items, [data-section="case-studies"]');
        if (!caseStudyContainer) return;
        
        // Create dynamic case study cards
        const dynamicContent = document.createElement('div');
        dynamicContent.className = 'dynamic-case-studies';
        dynamicContent.innerHTML = caseStudies.map(study => `
            <div class="case-study-card dynamic-card" data-relevance="${study.timeRelevance}">
                <div class="case-study-header">
                    <h3>${study.title}</h3>
                    <span class="status-badge status-${study.status}">${study.status.toUpperCase()}</span>
                </div>
                <p class="case-study-description">${study.description}</p>
                <div class="case-study-impact">
                    <strong>Impact:</strong> ${study.impact}
                </div>
                <div class="freshness-indicator">
                    Updated: ${new Date(study.lastUpdated).toLocaleTimeString()}
                </div>
            </div>
        `).join('');
        
        // Replace or append dynamic content
        const existingDynamic = caseStudyContainer.querySelector('.dynamic-case-studies');
        if (existingDynamic) {
            existingDynamic.replaceWith(dynamicContent);
        } else {
            caseStudyContainer.appendChild(dynamicContent);
        }
    }

    updateInnovationLabSection(labContent) {
        const labSection = document.querySelector('#innovation-lab, .innovation-lab');
        if (!labSection) return;
        
        // Update existing feature cards or create new ones
        labContent.forEach(feature => {
            const existingCard = labSection.querySelector(`[data-feature-id="${feature.id}"]`);
            if (existingCard) {
                // Update existing card
                const description = existingCard.querySelector('.feature-description, p');
                if (description) {
                    description.textContent = feature.contextualDescription;
                }
                
                const engagement = existingCard.querySelector('.engagement-score');
                if (engagement) {
                    engagement.textContent = `${Math.round(feature.timeAwareEngagement * 100)}% engaged`;
                }
            } else {
                // Create new dynamic feature card
                this.createDynamicFeatureCard(feature, labSection);
            }
        });
    }

    createDynamicFeatureCard(feature, container) {
        const card = document.createElement('div');
        card.className = 'lab-feature-card dynamic-feature';
        card.setAttribute('data-feature-id', feature.id);
        card.innerHTML = `
            <div class="feature-header">
                <span class="feature-icon">${feature.title.split(' ')[0]}</span>
                <div>
                    <h3>${feature.title.substring(2)}</h3>
                    <p class="feature-status">${feature.status}</p>
                </div>
                <div class="engagement-score">${Math.round(feature.timeAwareEngagement * 100)}% engaged</div>
            </div>
            <p class="feature-description">${feature.contextualDescription}</p>
            <div class="feature-freshness">
                Live since ${new Date(feature.lastUpdated).toLocaleTimeString()}
            </div>
        `;
        
        const featuresGrid = container.querySelector('.innovation-features-grid, .features-grid');
        if (featuresGrid) {
            featuresGrid.appendChild(card);
        }
    }

    injectThoughtLeadership(thought) {
        // Create or update thought leadership section
        let thoughtSection = document.querySelector('.thought-leadership');
        if (!thoughtSection) {
            thoughtSection = document.createElement('section');
            thoughtSection.className = 'thought-leadership';
            thoughtSection.style.cssText = `
                padding: 2rem;
                margin: 2rem 0;
                background: linear-gradient(135deg, rgba(0, 255, 136, 0.05) 0%, rgba(0, 153, 255, 0.03) 100%);
                border-left: 4px solid var(--ric-color-primary, #00ff88);
                border-radius: 8px;
            `;
            
            // Insert before footer or at end of main content
            const footer = document.querySelector('footer');
            const insertPoint = footer || document.body;
            insertPoint.parentNode.insertBefore(thoughtSection, footer);
        }
        
        thoughtSection.innerHTML = `
            <div class="thought-header">
                <h3>💭 Current Thinking</h3>
                <span class="thought-context">${thought.context}</span>
            </div>
            <blockquote class="thought-insight">
                "${thought.insight}"
            </blockquote>
            <div class="thought-attribution">
                — ${thought.author}
            </div>
        `;
    }

    startRefreshCycles() {
        // Immediate refresh
        this.injectDynamicContent();
        
        // Set up refresh intervals
        setInterval(() => {
            this.injectDynamicContent();
            console.log('🔄 Content refreshed at', new Date().toLocaleTimeString());
        }, 300000); // Refresh every 5 minutes
        
        // Hourly major refresh
        setInterval(() => {
            this.currentTime = new Date();
            this.injectDynamicContent();
            console.log('🌟 Major content refresh at', new Date().toLocaleTimeString());
        }, 3600000); // Refresh every hour
    }

    // Analytics and performance tracking
    trackContentPerformance() {
        const dynamicElements = document.querySelectorAll('[data-last-updated]');
        const performanceMetrics = {
            totalDynamicElements: dynamicElements.length,
            averageFreshness: this.calculateAverageFreshness(dynamicElements),
            engagementScore: this.calculateEngagementScore(),
            lastRefresh: new Date().toISOString()
        };
        
        console.log('📊 Content Performance Metrics:', performanceMetrics);
        return performanceMetrics;
    }

    calculateAverageFreshness(elements) {
        if (elements.length === 0) return 0;
        
        const now = new Date();
        const totalFreshness = Array.from(elements).reduce((sum, element) => {
            const lastUpdated = new Date(element.getAttribute('data-last-updated'));
            const ageMinutes = (now - lastUpdated) / (1000 * 60);
            return sum + Math.max(0, 100 - ageMinutes); // Freshness decreases over time
        }, 0);
        
        return totalFreshness / elements.length;
    }

    calculateEngagementScore() {
        const dynamicFeatures = document.querySelectorAll('.dynamic-feature');
        if (dynamicFeatures.length === 0) return 0;
        
        return Array.from(dynamicFeatures).reduce((sum, feature) => {
            const engagementText = feature.querySelector('.engagement-score')?.textContent || '0%';
            const engagement = parseInt(engagementText) / 100;
            return sum + engagement;
        }, 0) / dynamicFeatures.length;
    }
}

// Auto-initialize content refresh strategy
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initializing Content Refresh Strategy...');
    
    const contentRefresh = new ContentRefreshStrategy();
    
    // Make it globally accessible for debugging
    window.contentRefreshStrategy = contentRefresh;
    
    // Track performance every 10 minutes
    setInterval(() => {
        contentRefresh.trackContentPerformance();
    }, 600000);
    
    console.log('✅ Content Refresh Strategy activated');
});

export default ContentRefreshStrategy;
