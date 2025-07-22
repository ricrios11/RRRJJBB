/**
 * Embedded Case Studies Evolution System
 * Dynamic case study storytelling with multiple narrative perspectives and time-aware evolution
 * Integrates with Narrator-X, Narrator Remix, and Time Travel systems
 */

class EmbeddedCaseStudiesEvolutionSystem {
    constructor() {
        this.sessionId = `case_evolution_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        this.evolutionModes = {
            enabled: true,
            defaultMode: 'method',
            timeAwareMode: {
                morning: 'method',
                afternoon: 'metric',
                evening: 'emotional'
            },
            promptBasedOverrides: [
                { keyword: 'growth', mode: 'metric' },
                { keyword: 'UI', mode: 'visual' },
                { keyword: 'leadership', mode: 'emotional' },
                { keyword: 'remix', mode: 'remix' },
                { keyword: 'how did you do it', mode: 'method' },
                { keyword: 'results', mode: 'metric' },
                { keyword: 'process', mode: 'method' },
                { keyword: 'design', mode: 'visual' },
                { keyword: 'team', mode: 'emotional' },
                { keyword: 'ROI', mode: 'metric' },
                { keyword: 'methodology', mode: 'method' }
            ]
        };
        
        this.remixVariants = [
            {
                id: 'metric',
                title: 'ROI-Focused Version',
                description: 'Zoom into the quant results',
                icon: '📊',
                timeAlignment: ['afternoon', 'morning'],
                promptAlignment: ['growth', 'results', 'ROI', 'impact']
            },
            {
                id: 'method',
                title: 'Methodology-Heavy Version',
                description: 'Step-by-step systems logic',
                icon: '⚙️',
                timeAlignment: ['morning', 'afternoon'],
                promptAlignment: ['how did you do it', 'process', 'methodology', 'systematic']
            },
            {
                id: 'visual',
                title: 'Visual Showcase',
                description: 'More UI, fewer words',
                icon: '🎨',
                timeAlignment: ['morning', 'afternoon', 'evening'],
                promptAlignment: ['UI', 'design', 'visual', 'interface', 'aesthetic']
            },
            {
                id: 'emotional',
                title: 'Founder Journey',
                description: 'Real, kind, leadership POV',
                icon: '❤️',
                timeAlignment: ['evening', 'afternoon'],
                promptAlignment: ['leadership', 'team', 'journey', 'personal', 'challenge']
            },
            {
                id: 'remix',
                title: 'Alternate Cut',
                description: 'Different lens on the same story',
                icon: '🔄',
                timeAlignment: ['evening', 'afternoon'],
                promptAlignment: ['remix', 'different', 'alternative', 'fresh', 'new perspective']
            }
        ];
        
        this.evolutionContext = null;
        this.selectedEvolutionMode = null;
        this.evolvedCaseStudy = null;
        this.currentCaseStudy = null;
    }

    // Initialize system
    async initialize() {
        console.log(`🧪 Initializing Embedded Case Studies Evolution System`);
        console.log(`📋 Session ID: ${this.sessionId}`);
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Load visitor memory
        await this.loadVisitorMemory();
        
        console.log(`✅ Evolution system initialized`);
        return this;
    }

    // Setup event listeners
    setupEventListeners() {
        // Skip DOM setup in Node.js environment
        if (typeof document === 'undefined') {
            console.log('📝 Skipping DOM event listeners (Node.js environment)');
            return;
        }
        
        // Case study opened event
        document.addEventListener('caseStudyOpened', (event) => {
            this.handleCaseStudyOpened(event.detail);
        });

        // Remix button clicks
        document.addEventListener('click', (event) => {
            if (event.target.matches('.remix-case-study-btn')) {
                this.showCaseStudyRemixModal();
            }
            
            if (event.target.matches('.select-mode-btn')) {
                const mode = event.target.dataset.mode;
                this.selectEvolutionMode(mode);
            }
            
            if (event.target.matches('.auto-select-btn')) {
                this.autoSelectBestMode();
            }
        });
    }

    // Load visitor memory
    async loadVisitorMemory() {
        try {
            // Mock localStorage in Node.js environment
            if (typeof localStorage === 'undefined') {
                console.log('📝 Mocking localStorage (Node.js environment)');
                this.visitorMemory = {
                    lastPrompt: "Show me the methodology behind this transformation",
                    interactionDepth: 0.7,
                    visitedSections: ['hero', 'about', 'case-studies']
                };
                return;
            }
            
            const memory = JSON.parse(localStorage.getItem('ricrios_visitor_memory') || '{}');
            this.visitorMemory = memory;
            console.log(`💾 Visitor memory loaded:`, memory);
        } catch (error) {
            console.warn(`⚠️ Could not load visitor memory:`, error);
            this.visitorMemory = {};
        }
    }

    // Handle case study opened
    async handleCaseStudyOpened(caseStudyData) {
        console.log(`📖 Case study opened:`, caseStudyData.id);
        this.currentCaseStudy = caseStudyData;
        
        // Analyze evolution context
        await this.analyzeEvolutionContext();
        
        // Select evolution mode
        await this.selectOptimalEvolutionMode();
        
        // Generate case study variant
        await this.generateCaseStudyVariant();
        
        // Show remix CTA if appropriate
        this.showRemixCTAIfAppropriate();
    }

    // Analyze evolution context
    async analyzeEvolutionContext() {
        console.log(`🔍 Analyzing evolution context...`);
        
        const timeOfDay = this.getTimeOfDay();
        const userPrompt = this.visitorMemory.lastPrompt || '';
        const engagementLevel = this.visitorMemory.interactionDepth || 0.5;
        const stylePreferences = typeof localStorage !== 'undefined' ? 
            JSON.parse(localStorage.getItem('ricrios_ui_prefs') || '{}') : 
            { visualTheme: 'dark', preferredMode: 'method' };
        
        // Analyze prompt keywords
        const promptKeywords = this.analyzePromptKeywords(userPrompt);
        
        // Assess time alignment
        const timeAlignment = this.assessTimeAlignment(timeOfDay);
        
        // Determine suggested mode
        let suggestedMode = this.evolutionModes.timeAwareMode[timeOfDay] || this.evolutionModes.defaultMode;
        let confidence = 0.7;
        let reasoning = `Default ${timeOfDay} mode`;
        
        // Check for prompt-based overrides
        for (const override of this.evolutionModes.promptBasedOverrides) {
            if (userPrompt.toLowerCase().includes(override.keyword.toLowerCase())) {
                suggestedMode = override.mode;
                confidence = 0.85;
                reasoning = `Prompt keyword "${override.keyword}" detected`;
                break;
            }
        }
        
        // Adjust confidence based on engagement
        if (engagementLevel > 0.7) {
            confidence += 0.1;
        }
        
        this.evolutionContext = {
            suggestedMode,
            confidence,
            reasoning,
            alternativeModes: this.remixVariants.map(v => v.id).filter(id => id !== suggestedMode),
            timeOfDay,
            userPrompt,
            engagementLevel,
            promptKeywords,
            timeAlignment
        };
        
        console.log(`📊 Evolution context analyzed:`, this.evolutionContext);
        return this.evolutionContext;
    }

    // Analyze prompt keywords
    analyzePromptKeywords(prompt) {
        const keywords = [];
        for (const override of this.evolutionModes.promptBasedOverrides) {
            if (prompt.toLowerCase().includes(override.keyword.toLowerCase())) {
                keywords.push(override.keyword);
            }
        }
        return keywords;
    }

    // Assess time alignment
    assessTimeAlignment(timeOfDay) {
        const alignedModes = this.remixVariants.filter(variant => 
            variant.timeAlignment.includes(timeOfDay)
        );
        return alignedModes.map(mode => mode.id);
    }

    // Select optimal evolution mode
    async selectOptimalEvolutionMode() {
        if (!this.evolutionContext) {
            await this.analyzeEvolutionContext();
        }
        
        this.selectedEvolutionMode = {
            mode: this.evolutionContext.suggestedMode,
            confidence: this.evolutionContext.confidence,
            source: 'context_analysis',
            alternatives: this.evolutionContext.alternativeModes
        };
        
        console.log(`🎯 Selected evolution mode:`, this.selectedEvolutionMode);
        return this.selectedEvolutionMode;
    }

    // Generate case study variant
    async generateCaseStudyVariant() {
        if (!this.selectedEvolutionMode || !this.currentCaseStudy) {
            console.warn(`⚠️ Cannot generate variant: missing mode or case study`);
            return null;
        }
        
        console.log(`🎨 Generating ${this.selectedEvolutionMode.mode} variant...`);
        
        const mode = this.selectedEvolutionMode.mode;
        const caseStudy = this.currentCaseStudy;
        const timeOfDay = this.getTimeOfDay();
        
        // Generate content based on mode
        const evolvedContent = await this.generateModeSpecificContent(mode, caseStudy, timeOfDay);
        
        this.evolvedCaseStudy = {
            mode,
            title: evolvedContent.title,
            summary: evolvedContent.summary,
            content: evolvedContent.content,
            keyInsights: evolvedContent.keyInsights,
            callToAction: evolvedContent.callToAction,
            confidence: evolvedContent.confidence,
            timestamp: new Date().toISOString(),
            sessionId: this.sessionId
        };
        
        console.log(`✅ Case study variant generated:`, this.evolvedCaseStudy);
        return this.evolvedCaseStudy;
    }

    // Generate mode-specific content
    async generateModeSpecificContent(mode, caseStudy, timeOfDay) {
        const templates = {
            metric: {
                title: `${caseStudy.title} - ROI Analysis`,
                summary: `Quantified impact and measurable results from ${caseStudy.title}`,
                content: `Data-driven analysis of ${caseStudy.title} showing concrete ROI, user engagement metrics, and business impact. Key performance indicators demonstrate systematic improvement across all measured dimensions.`,
                keyInsights: [
                    "Measurable ROI improvement through systematic design",
                    "Quantified user engagement and conversion metrics",
                    "Data-validated design decisions and outcomes"
                ],
                callToAction: "View detailed metrics and ROI analysis",
                confidence: 0.90
            },
            method: {
                title: `${caseStudy.title} - Methodology`,
                summary: `Step-by-step systematic approach used in ${caseStudy.title}`,
                content: `Detailed methodology and systematic process behind ${caseStudy.title}. Clear, repeatable framework that can be applied to similar challenges. Proven systematic thinking meets practical execution.`,
                keyInsights: [
                    "Systematic methodology for repeatable results",
                    "Clear process framework and decision logic",
                    "Proven approach adaptable to similar challenges"
                ],
                callToAction: "Explore the systematic methodology",
                confidence: 0.92
            },
            visual: {
                title: `${caseStudy.title} - Design Showcase`,
                summary: `Visual design journey and interface evolution in ${caseStudy.title}`,
                content: `Visual storytelling of ${caseStudy.title} through design evolution, interface decisions, and aesthetic choices. See how design thinking translates into elegant, functional solutions.`,
                keyInsights: [
                    "Design evolution and visual decision-making",
                    "Interface aesthetics meeting functional requirements",
                    "Visual storytelling through design progression"
                ],
                callToAction: "View the complete design showcase",
                confidence: 0.88
            },
            emotional: {
                title: `${caseStudy.title} - Leadership Journey`,
                summary: `Personal leadership challenges and team dynamics in ${caseStudy.title}`,
                content: `The human story behind ${caseStudy.title}: leadership challenges, team dynamics, and personal growth. Authentic insights into the people and relationships that made success possible.`,
                keyInsights: [
                    "Leadership challenges and personal growth",
                    "Team dynamics and collaborative success",
                    "Human elements behind technical achievements"
                ],
                callToAction: "Explore the leadership journey",
                confidence: 0.85
            },
            remix: {
                title: `${caseStudy.title} - Alternative Perspective`,
                summary: `Fresh angle and alternative narrative for ${caseStudy.title}`,
                content: `${caseStudy.title} from a different lens: What if we focused on the unexpected insights? Alternative perspective reveals hidden aspects and surprising connections in this transformation story.`,
                keyInsights: [
                    "Alternative perspective on familiar challenges",
                    "Hidden insights and unexpected connections",
                    "Fresh angle on transformation narrative"
                ],
                callToAction: "Discover the alternative perspective",
                confidence: 0.87
            }
        };
        
        const template = templates[mode] || templates.method;
        
        // Time-aware adaptation
        if (timeOfDay === 'evening') {
            template.content = template.content.replace(/systematic/g, 'thoughtful');
            template.content = template.content.replace(/Clear/g, 'Reflective');
        } else if (timeOfDay === 'morning') {
            template.content = template.content.replace(/transformation/g, 'breakthrough');
            template.content = template.content.replace(/insights/g, 'discoveries');
        }
        
        return template;
    }

    // Show remix CTA if appropriate
    showRemixCTAIfAppropriate() {
        if (!this.evolutionContext || this.evolutionContext.confidence > 0.9) {
            return; // High confidence, no need for remix CTA
        }
        
        console.log(`🎭 Showing remix CTA (confidence: ${this.evolutionContext.confidence})`);
        
        // Create remix CTA button (skip DOM creation in Node.js)
        if (typeof document === 'undefined') {
            console.log('📝 Remix CTA created (Node.js environment)');
            return;
        }
        
        const remixCTA = document.createElement('button');
        remixCTA.className = 'remix-case-study-btn';
        remixCTA.innerHTML = `
            <span class="remix-icon">🎭</span>
            <span class="remix-text">Try Different Perspective</span>
        `;
        
        // Find case study container and add CTA (skip in Node.js)
        if (typeof document !== 'undefined') {
            const caseStudyContainer = document.querySelector('.case-study-container');
            if (caseStudyContainer) {
                caseStudyContainer.appendChild(remixCTA);
            }
        } else {
            console.log('📝 Remix CTA created (Node.js environment)');
        }
    }

    // Show case study remix modal
    showCaseStudyRemixModal() {
        console.log(`🎭 Showing case study remix modal`);
        
        const modal = document.createElement('div');
        modal.className = 'case-study-remix-modal evolution-selector';
        modal.innerHTML = `
            <div class="modal-overlay" onclick="this.parentElement.remove()"></div>
            <div class="modal-content">
                <div class="case-study-remix-container">
                    <div class="remix-header">
                        <h2>🎭 Remix This Case Study</h2>
                        <p>Choose your preferred narrative perspective</p>
                    </div>
                    
                    <div class="remix-modes-grid">
                        ${this.remixVariants.map(variant => `
                            <div class="remix-mode-option" data-mode="${variant.id}">
                                <div class="mode-icon">${variant.icon}</div>
                                <div class="mode-info">
                                    <h3>${variant.title}</h3>
                                    <p>${variant.description}</p>
                                </div>
                                <button class="select-mode-btn" data-action="selectMode" data-mode="${variant.id}">
                                    Select ${variant.title}
                                </button>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="remix-actions">
                        <button class="auto-select-btn primary" data-action="autoSelect">
                            🤖 Auto-Select Best Mode
                        </button>
                        <button class="close-remix-btn secondary" onclick="this.closest('.case-study-remix-modal').remove()">
                            Keep Current Mode
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // Append modal (skip in Node.js)
        if (typeof document !== 'undefined') {
            document.body.appendChild(modal);
        } else {
            console.log('📝 Remix modal created (Node.js environment)');
        }
    }

    // Select evolution mode
    async selectEvolutionMode(mode) {
        console.log(`🎯 Selecting evolution mode: ${mode}`);
        
        this.selectedEvolutionMode = {
            mode,
            confidence: 0.95,
            source: 'user_selection',
            alternatives: this.remixVariants.map(v => v.id).filter(id => id !== mode)
        };
        
        // Generate new variant
        await this.generateCaseStudyVariant();
        
        // Apply evolution mode
        await this.applyEvolutionMode(mode);
        
        // Close modal (skip in Node.js)
        if (typeof document !== 'undefined') {
            const modal = document.querySelector('.case-study-remix-modal');
            if (modal) {
                modal.remove();
            }
        } else {
            console.log('📝 Modal closed (Node.js environment)');
        }
        
        // Save preference
        this.saveEvolutionPreference(mode);
    }

    // Auto-select best mode
    async autoSelectBestMode() {
        console.log(`🤖 Auto-selecting best mode...`);
        
        if (!this.evolutionContext) {
            await this.analyzeEvolutionContext();
        }
        
        const bestMode = this.evolutionContext.suggestedMode;
        const confidence = this.evolutionContext.confidence;
        const reasoning = this.evolutionContext.reasoning;
        
        console.log(`🎯 Auto-selected mode: ${bestMode} (${Math.round(confidence * 100)}% confidence)`);
        console.log(`💭 Reasoning: ${reasoning}`);
        
        await this.selectEvolutionMode(bestMode);
    }

    // Apply evolution mode
    async applyEvolutionMode(mode) {
        console.log(`🎨 Applying evolution mode: ${mode}`);
        
        if (!this.evolvedCaseStudy) {
            await this.generateCaseStudyVariant();
        }
        
        // Update case study content (skip DOM updates in Node.js)
        if (typeof document !== 'undefined') {
            const caseStudyContainer = document.querySelector('.case-study-container');
            if (caseStudyContainer) {
                // Update title
                const titleElement = caseStudyContainer.querySelector('.case-study-title');
                if (titleElement) {
                    titleElement.textContent = this.evolvedCaseStudy.title;
                }
                
                // Update summary
                const summaryElement = caseStudyContainer.querySelector('.case-study-summary');
                if (summaryElement) {
                    summaryElement.textContent = this.evolvedCaseStudy.summary;
                }
                
                // Update content
                const contentElement = caseStudyContainer.querySelector('.case-study-content');
                if (contentElement) {
                    contentElement.textContent = this.evolvedCaseStudy.content;
                }
                
                // Update CTA
                const ctaElement = caseStudyContainer.querySelector('.case-study-cta');
                if (ctaElement) {
                    ctaElement.textContent = this.evolvedCaseStudy.callToAction;
                }
                
                // Add mode-specific styling
                caseStudyContainer.className = `case-study-container ${mode}-mode`;
            }
        } else {
            console.log('📝 Case study content updated (Node.js environment)');
            console.log(`📝 Title: ${this.evolvedCaseStudy.title}`);
            console.log(`📝 Summary: ${this.evolvedCaseStudy.summary}`);
            console.log(`📝 CTA: ${this.evolvedCaseStudy.callToAction}`);
        }
        
        console.log(`✅ Evolution mode applied: ${mode}`);
    }

    // Save evolution preference
    saveEvolutionPreference(mode) {
        try {
            // Mock localStorage in Node.js environment
            if (typeof localStorage === 'undefined') {
                console.log(`💾 Evolution preference saved (Node.js mock): ${mode}`);
                return;
            }
            
            const preferences = JSON.parse(localStorage.getItem('ricrios_evolution_prefs') || '{}');
            preferences.preferredMode = mode;
            preferences.lastSelected = new Date().toISOString();
            preferences.selectionCount = (preferences.selectionCount || 0) + 1;
            
            localStorage.setItem('ricrios_evolution_prefs', JSON.stringify(preferences));
            console.log(`💾 Evolution preference saved: ${mode}`);
        } catch (error) {
            console.warn(`⚠️ Could not save evolution preference:`, error);
        }
    }

    // Get time of day
    getTimeOfDay() {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) return 'morning';
        if (hour >= 12 && hour < 17) return 'afternoon';
        return 'evening';
    }

    // Export evolution experience
    exportEvolutionExperience() {
        const experience = {
            sessionId: this.sessionId,
            evolutionContext: this.evolutionContext,
            selectedEvolutionMode: this.selectedEvolutionMode,
            evolvedCaseStudy: this.evolvedCaseStudy,
            currentCaseStudy: this.currentCaseStudy,
            timestamp: new Date().toISOString()
        };
        
        console.log(`📦 Exporting evolution experience:`, experience);
        return experience;
    }
}

// Demo function
async function runEmbeddedCaseStudiesEvolutionDemo() {
    console.log(`🧪 Starting Embedded Case Studies Evolution Demo`);
    console.log(`============================================================`);
    
    const evolutionSystem = new EmbeddedCaseStudiesEvolutionSystem();
    await evolutionSystem.initialize();
    
    // Test case studies
    const testCaseStudies = [
        {
            id: 'bjj-community-platform',
            title: 'BJJ Community Platform',
            summary: 'Building a martial arts community platform with systematic design thinking',
            content: 'Original case study content about BJJ platform development...'
        },
        {
            id: 'chase-travel-experience',
            title: 'Chase Travel Experience',
            summary: 'Redesigning travel booking experience for Chase customers',
            content: 'Original case study content about Chase travel redesign...'
        },
        {
            id: 'fintech-dashboard',
            title: 'FinTech Dashboard',
            summary: 'Creating intuitive financial dashboard for complex data',
            content: 'Original case study content about FinTech dashboard...'
        }
    ];
    
    // Test different evolution modes
    const testModes = ['metric', 'method', 'visual', 'emotional', 'remix'];
    
    for (const caseStudy of testCaseStudies) {
        console.log(`\n🎬 Testing: ${caseStudy.title}`);
        console.log(`📖 Case Study: ${caseStudy.id}`);
        
        // Simulate case study opened
        await evolutionSystem.handleCaseStudyOpened(caseStudy);
        
        console.log(`🎯 Suggested Mode: ${evolutionSystem.evolutionContext.suggestedMode}`);
        console.log(`📊 Confidence: ${Math.round(evolutionSystem.evolutionContext.confidence * 100)}%`);
        console.log(`💭 Reasoning: ${evolutionSystem.evolutionContext.reasoning}`);
        
        // Test mode selection
        const randomMode = testModes[Math.floor(Math.random() * testModes.length)];
        console.log(`🎭 Testing mode: ${randomMode}`);
        
        await evolutionSystem.selectEvolutionMode(randomMode);
        
        console.log(`✅ Mode applied: ${evolutionSystem.evolvedCaseStudy.mode}`);
        console.log(`📝 Title: ${evolutionSystem.evolvedCaseStudy.title}`);
        console.log(`📄 Summary: ${evolutionSystem.evolvedCaseStudy.summary}`);
        console.log(`🎯 CTA: ${evolutionSystem.evolvedCaseStudy.callToAction}`);
        
        console.log(`============================================================`);
    }
    
    // Test auto-selection
    console.log(`\n🤖 Testing auto-selection...`);
    evolutionSystem.visitorMemory.lastPrompt = "Show me the methodology behind this transformation";
    await evolutionSystem.handleCaseStudyOpened(testCaseStudies[0]);
    await evolutionSystem.autoSelectBestMode();
    
    console.log(`🎯 Auto-selected: ${evolutionSystem.selectedEvolutionMode.mode}`);
    console.log(`📊 Confidence: ${Math.round(evolutionSystem.selectedEvolutionMode.confidence * 100)}%`);
    
    // Export experience
    const experience = evolutionSystem.exportEvolutionExperience();
    console.log(`\n📦 Evolution experience exported successfully`);
    
    console.log(`\n🧪 Embedded Case Studies Evolution Demo Complete!`);
    console.log(`🧪 Evolution system ready for integration!`);
}

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { EmbeddedCaseStudiesEvolutionSystem, runEmbeddedCaseStudiesEvolutionDemo };
}

// Auto-run demo if called directly
if (typeof require !== 'undefined' && require.main === module) {
    runEmbeddedCaseStudiesEvolutionDemo().catch(console.error);
}
