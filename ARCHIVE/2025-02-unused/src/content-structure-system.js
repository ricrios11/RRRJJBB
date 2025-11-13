/**
 * CONTENT STRUCTURE (SKIM/DIP/DIVE) SYSTEM
 * Progressive disclosure and story flow for Ric Rios Portfolio
 * 
 * Three engagement levels:
 * - SKIM: Quick overview, headlines, key points (30 seconds)
 * - DIP: Moderate depth, context, methodology (2-3 minutes)
 * - DIVE: Full depth, details, insights, case studies (5+ minutes)
 */

class ContentStructureSystem {
    constructor() {
        this.currentLevel = 'skim'; // Default to skim level
        this.sectionStates = new Map();
        this.scrollProgress = 0;
        this.engagementMetrics = {
            timeOnPage: 0,
            sectionsViewed: new Set(),
            interactionCount: 0,
            deepEngagements: 0
        };
        
        this.init();
    }

    init() {
        this.setupProgressiveDisclosure();
        this.setupNavigationFlow();
        this.setupEngagementTracking();
        this.setupKeyboardShortcuts();
        this.setupIntersectionObserver();
        
        console.log('📚 Content Structure System initialized');
    }

    /**
     * PROGRESSIVE DISCLOSURE FRAMEWORK
     * Manages content visibility based on engagement level
     */
    setupProgressiveDisclosure() {
        // Define content layers for each section
        this.contentLayers = {
            hero: {
                skim: {
                    headline: true,
                    subtitle: true,
                    primaryCTA: true
                },
                dip: {
                    headline: true,
                    subtitle: true,
                    description: true,
                    primaryCTA: true,
                    secondaryCTA: true
                },
                dive: {
                    headline: true,
                    subtitle: true,
                    description: true,
                    extendedDescription: true,
                    primaryCTA: true,
                    secondaryCTA: true,
                    socialProof: true,
                    timeAwareMessage: true
                }
            },
            about: {
                skim: {
                    headline: true,
                    keyPoints: 3 // Show only first 3 key points
                },
                dip: {
                    headline: true,
                    keyPoints: 6,
                    methodology: true,
                    experience: true
                },
                dive: {
                    headline: true,
                    keyPoints: 'all',
                    methodology: true,
                    experience: true,
                    philosophy: true,
                    detailedBackground: true,
                    credentials: true
                }
            },
            caseStudies: {
                skim: {
                    headline: true,
                    featuredCases: 2,
                    quickStats: true
                },
                dip: {
                    headline: true,
                    featuredCases: 4,
                    quickStats: true,
                    methodology: true,
                    categories: true
                },
                dive: {
                    headline: true,
                    featuredCases: 'all',
                    quickStats: true,
                    methodology: true,
                    categories: true,
                    detailedCases: true,
                    processBreakdown: true,
                    clientTestimonials: true
                }
            },
            toolkit: {
                skim: {
                    headline: true,
                    coreTools: 4
                },
                dip: {
                    headline: true,
                    coreTools: 8,
                    categories: true,
                    applications: true
                },
                dive: {
                    headline: true,
                    coreTools: 'all',
                    categories: true,
                    applications: true,
                    detailedMethodology: true,
                    frameworks: true,
                    customizations: true
                }
            }
        };

        // Apply initial content layer
        this.applyContentLayer(this.currentLevel);
    }

    /**
     * NAVIGATION FLOW SYSTEM
     * Smooth transitions between sections with story continuity
     */
    setupNavigationFlow() {
        // Story flow sequence
        this.storySequence = [
            'hero',
            'about',
            'philosophy',
            'toolkit',
            'case-studies',
            'innovation-lab',
            'contact'
        ];

        // Navigation enhancement
        this.setupSmoothScrolling();
        this.setupProgressIndicator();
        this.setupSectionTransitions();
    }

    setupSmoothScrolling() {
        // Enhanced smooth scrolling with easing
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    this.smoothScrollToElement(targetElement);
                    this.trackNavigation(targetId);
                }
            });
        });
    }

    smoothScrollToElement(element) {
        const headerOffset = 80; // Account for sticky header
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        // Custom easing function for smooth scroll
        const startPosition = window.pageYOffset;
        const distance = offsetPosition - startPosition;
        const duration = Math.min(Math.abs(distance) * 0.5, 1000); // Dynamic duration
        let start = null;

        const easeInOutCubic = (t) => {
            return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        };

        const animation = (currentTime) => {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const progress = Math.min(timeElapsed / duration, 1);
            const ease = easeInOutCubic(progress);

            window.scrollTo(0, startPosition + distance * ease);

            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        };

        requestAnimationFrame(animation);
    }

    setupProgressIndicator() {
        // Create floating progress indicator
        const progressContainer = document.createElement('div');
        progressContainer.className = 'content-progress-indicator';
        progressContainer.innerHTML = `
            <div class="progress-bar">
                <div class="progress-fill"></div>
            </div>
            <div class="progress-labels">
                <span class="progress-label active" data-level="skim">Skim</span>
                <span class="progress-label" data-level="dip">Dip</span>
                <span class="progress-label" data-level="dive">Dive</span>
            </div>
            <div class="engagement-level">
                <span class="level-indicator">${this.currentLevel.toUpperCase()}</span>
            </div>
        `;

        // Add styles
        const progressStyles = `
            .content-progress-indicator {
                position: fixed;
                top: 50%;
                right: var(--space-lg);
                transform: translateY(-50%);
                background: var(--card);
                border: 1px solid var(--border);
                border-radius: var(--radius-lg);
                padding: var(--space-md);
                box-shadow: var(--shadow-lg);
                z-index: 100;
                opacity: 0;
                transition: opacity var(--duration-normal) var(--ease-in-out);
            }

            .content-progress-indicator.visible {
                opacity: 1;
            }

            .progress-bar {
                width: 4px;
                height: 120px;
                background: var(--muted);
                border-radius: 2px;
                margin: 0 auto var(--space-sm);
                position: relative;
            }

            .progress-fill {
                width: 100%;
                background: linear-gradient(to top, var(--primary), var(--afternoon-primary));
                border-radius: 2px;
                transition: height var(--duration-slow) var(--ease-out);
                height: 0%;
            }

            .progress-labels {
                display: flex;
                flex-direction: column;
                gap: var(--space-xs);
                margin-bottom: var(--space-sm);
            }

            .progress-label {
                font-size: var(--text-xs);
                color: var(--muted-foreground);
                cursor: pointer;
                padding: var(--space-xs);
                border-radius: var(--radius-sm);
                transition: all var(--duration-fast) var(--ease-out);
                text-align: center;
            }

            .progress-label:hover {
                background: var(--accent);
                color: var(--foreground);
            }

            .progress-label.active {
                background: var(--primary);
                color: var(--primary-foreground);
                font-weight: 500;
            }

            .engagement-level {
                text-align: center;
                padding-top: var(--space-xs);
                border-top: 1px solid var(--border);
            }

            .level-indicator {
                font-size: var(--text-xs);
                font-weight: 600;
                color: var(--primary);
                letter-spacing: 0.05em;
            }

            @media (max-width: 768px) {
                .content-progress-indicator {
                    display: none;
                }
            }
        `;

        // Inject styles
        const styleSheet = document.createElement('style');
        styleSheet.textContent = progressStyles;
        document.head.appendChild(styleSheet);

        // Append to body
        document.body.appendChild(progressContainer);

        // Add click handlers for level switching
        progressContainer.querySelectorAll('.progress-label').forEach(label => {
            label.addEventListener('click', () => {
                const level = label.dataset.level;
                this.switchEngagementLevel(level);
            });
        });

        this.progressIndicator = progressContainer;
    }

    setupSectionTransitions() {
        // Add transition effects between sections
        const sections = document.querySelectorAll('section[id]');
        sections.forEach(section => {
            section.style.transition = 'all var(--duration-slow) var(--ease-in-out)';
        });
    }

    /**
     * ENGAGEMENT TRACKING
     * Monitors user behavior to suggest optimal content level
     */
    setupEngagementTracking() {
        // Track time on page
        this.startTime = Date.now();
        
        // Track scroll behavior
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                this.updateScrollProgress();
                this.analyzeEngagementLevel();
            }, 100);
        });

        // Track interactions
        document.addEventListener('click', (e) => {
            this.engagementMetrics.interactionCount++;
            
            // Track deep engagements (modals, case studies, etc.)
            if (e.target.closest('.case-study-card') || 
                e.target.closest('.modal-trigger') ||
                e.target.closest('.deep-content')) {
                this.engagementMetrics.deepEngagements++;
            }
        });

        // Periodic engagement analysis
        setInterval(() => {
            this.analyzeEngagementLevel();
        }, 30000); // Every 30 seconds
    }

    updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        this.scrollProgress = Math.min(scrollTop / docHeight, 1);

        // Update progress indicator
        if (this.progressIndicator) {
            const progressFill = this.progressIndicator.querySelector('.progress-fill');
            progressFill.style.height = `${this.scrollProgress * 100}%`;

            // Show/hide based on scroll position
            if (this.scrollProgress > 0.1) {
                this.progressIndicator.classList.add('visible');
            } else {
                this.progressIndicator.classList.remove('visible');
            }
        }
    }

    analyzeEngagementLevel() {
        const timeOnPage = (Date.now() - this.startTime) / 1000; // seconds
        this.engagementMetrics.timeOnPage = timeOnPage;

        let suggestedLevel = 'skim';

        // Analyze engagement patterns
        if (timeOnPage > 120 && this.scrollProgress > 0.5) {
            suggestedLevel = 'dip';
        }
        
        if (timeOnPage > 300 && 
            this.scrollProgress > 0.7 && 
            this.engagementMetrics.deepEngagements > 0) {
            suggestedLevel = 'dive';
        }

        // Auto-suggest level change if significantly different
        if (suggestedLevel !== this.currentLevel) {
            this.suggestLevelChange(suggestedLevel);
        }
    }

    suggestLevelChange(suggestedLevel) {
        // Show subtle notification for level change
        const notification = document.createElement('div');
        notification.className = 'level-suggestion';
        notification.innerHTML = `
            <div class="suggestion-content">
                <span class="suggestion-text">Ready to ${suggestedLevel}?</span>
                <button class="suggestion-btn" onclick="contentStructure.switchEngagementLevel('${suggestedLevel}')">
                    ${suggestedLevel.charAt(0).toUpperCase() + suggestedLevel.slice(1)}
                </button>
                <button class="suggestion-dismiss" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `;

        // Style the notification
        const notificationStyles = `
            .level-suggestion {
                position: fixed;
                bottom: var(--space-lg);
                left: 50%;
                transform: translateX(-50%);
                background: var(--card);
                border: 1px solid var(--border);
                border-radius: var(--radius-lg);
                box-shadow: var(--shadow-xl);
                z-index: 1000;
                animation: slideUp 0.3s var(--ease-out);
            }

            .suggestion-content {
                display: flex;
                align-items: center;
                gap: var(--space-sm);
                padding: var(--space-md);
            }

            .suggestion-text {
                font-size: var(--text-sm);
                color: var(--foreground);
            }

            .suggestion-btn {
                background: var(--primary);
                color: var(--primary-foreground);
                border: none;
                padding: var(--space-xs) var(--space-sm);
                border-radius: var(--radius-md);
                font-size: var(--text-xs);
                cursor: pointer;
                transition: all var(--duration-fast) var(--ease-out);
            }

            .suggestion-btn:hover {
                background: var(--afternoon-primary);
                transform: translateY(-1px);
            }

            .suggestion-dismiss {
                background: none;
                border: none;
                color: var(--muted-foreground);
                cursor: pointer;
                font-size: var(--text-lg);
                padding: var(--space-xs);
            }

            @keyframes slideUp {
                from {
                    transform: translateX(-50%) translateY(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(-50%) translateY(0);
                    opacity: 1;
                }
            }
        `;

        // Inject styles if not already present
        if (!document.querySelector('#suggestion-styles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'suggestion-styles';
            styleSheet.textContent = notificationStyles;
            document.head.appendChild(styleSheet);
        }

        // Remove existing suggestions
        document.querySelectorAll('.level-suggestion').forEach(el => el.remove());

        // Add new suggestion
        document.body.appendChild(notification);

        // Auto-remove after 8 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 8000);
    }

    /**
     * LEVEL SWITCHING
     * Changes content visibility based on engagement level
     */
    switchEngagementLevel(level) {
        if (level === this.currentLevel) return;

        console.log(`📚 Switching to ${level} level`);
        
        this.currentLevel = level;
        this.applyContentLayer(level);
        this.updateProgressIndicator();
        this.trackLevelChange(level);

        // Smooth transition effect
        document.body.style.transition = 'opacity 0.3s ease';
        document.body.style.opacity = '0.8';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 300);
    }

    applyContentLayer(level) {
        Object.entries(this.contentLayers).forEach(([sectionId, layers]) => {
            const section = document.getElementById(sectionId);
            if (!section) return;

            const layerConfig = layers[level];
            if (!layerConfig) return;

            this.applyLayerToSection(section, layerConfig, level);
        });

        // Apply global level class
        document.body.className = document.body.className.replace(/level-\w+/g, '');
        document.body.classList.add(`level-${level}`);
    }

    applyLayerToSection(section, config, level) {
        // Hide all expandable content first
        section.querySelectorAll('.content-expandable').forEach(el => {
            el.style.display = 'none';
        });

        // Show content based on level configuration
        Object.entries(config).forEach(([contentType, value]) => {
            const elements = section.querySelectorAll(`[data-content="${contentType}"]`);
            
            if (typeof value === 'boolean' && value) {
                elements.forEach(el => el.style.display = '');
            } else if (typeof value === 'number') {
                elements.forEach((el, index) => {
                    el.style.display = index < value ? '' : 'none';
                });
            } else if (value === 'all') {
                elements.forEach(el => el.style.display = '');
            }
        });

        // Add level-specific styling
        section.classList.remove('level-skim', 'level-dip', 'level-dive');
        section.classList.add(`level-${level}`);
    }

    updateProgressIndicator() {
        if (!this.progressIndicator) return;

        // Update active label
        this.progressIndicator.querySelectorAll('.progress-label').forEach(label => {
            label.classList.toggle('active', label.dataset.level === this.currentLevel);
        });

        // Update level indicator
        const levelIndicator = this.progressIndicator.querySelector('.level-indicator');
        levelIndicator.textContent = this.currentLevel.toUpperCase();
    }

    /**
     * KEYBOARD SHORTCUTS
     * Quick level switching and navigation
     */
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Only activate if not in input field
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

            switch(e.key) {
                case '1':
                    e.preventDefault();
                    this.switchEngagementLevel('skim');
                    break;
                case '2':
                    e.preventDefault();
                    this.switchEngagementLevel('dip');
                    break;
                case '3':
                    e.preventDefault();
                    this.switchEngagementLevel('dive');
                    break;
                case 'ArrowUp':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        this.navigateToSection('prev');
                    }
                    break;
                case 'ArrowDown':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        this.navigateToSection('next');
                    }
                    break;
            }
        });
    }

    navigateToSection(direction) {
        const currentSection = this.getCurrentSection();
        const currentIndex = this.storySequence.indexOf(currentSection);
        
        let targetIndex;
        if (direction === 'next') {
            targetIndex = Math.min(currentIndex + 1, this.storySequence.length - 1);
        } else {
            targetIndex = Math.max(currentIndex - 1, 0);
        }

        const targetSection = document.getElementById(this.storySequence[targetIndex]);
        if (targetSection) {
            this.smoothScrollToElement(targetSection);
        }
    }

    getCurrentSection() {
        const sections = this.storySequence.map(id => document.getElementById(id)).filter(Boolean);
        const scrollPosition = window.pageYOffset + window.innerHeight / 2;

        for (let i = sections.length - 1; i >= 0; i--) {
            if (sections[i].offsetTop <= scrollPosition) {
                return sections[i].id;
            }
        }

        return this.storySequence[0];
    }

    /**
     * INTERSECTION OBSERVER
     * Track section visibility for enhanced navigation
     */
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: [0.1, 0.5, 0.9],
            rootMargin: '-80px 0px -80px 0px' // Account for header
        };

        this.sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const sectionId = entry.target.id;
                
                if (entry.isIntersecting) {
                    this.engagementMetrics.sectionsViewed.add(sectionId);
                    
                    // Update navigation active state
                    this.updateNavigationState(sectionId);
                    
                    // Track section engagement
                    this.trackSectionView(sectionId, entry.intersectionRatio);
                }
            });
        }, observerOptions);

        // Observe all main sections
        this.storySequence.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                this.sectionObserver.observe(section);
            }
        });
    }

    updateNavigationState(activeSectionId) {
        // Update navigation active states
        document.querySelectorAll('.nav-link').forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                const targetId = href.substring(1);
                link.classList.toggle('active', targetId === activeSectionId);
            }
        });
    }

    trackSectionView(sectionId, ratio) {
        // Track section engagement for analytics
        console.log(`📊 Section ${sectionId} viewed at ${Math.round(ratio * 100)}% visibility`);
    }

    trackNavigation(targetId) {
        console.log(`🧭 Navigation to ${targetId}`);
    }

    trackLevelChange(level) {
        console.log(`📈 Engagement level changed to ${level}`);
    }

    /**
     * PUBLIC API
     */
    getEngagementMetrics() {
        return {
            ...this.engagementMetrics,
            currentLevel: this.currentLevel,
            scrollProgress: this.scrollProgress,
            timeOnPage: this.engagementMetrics.timeOnPage
        };
    }

    setLevel(level) {
        if (['skim', 'dip', 'dive'].includes(level)) {
            this.switchEngagementLevel(level);
        }
    }

    getCurrentLevel() {
        return this.currentLevel;
    }
}

// Initialize the system
const contentStructure = new ContentStructureSystem();

// Export for global access
window.contentStructure = contentStructure;

console.log('📚 Content Structure (Skim/Dip/Dive) System loaded');
