/**
 * RicRios.com Design Framework Heuristics Analysis
 * Automated evaluation of content staleness and design framework effectiveness
 * Based on Dark Matter + TrojanHorse + ResearchOS orchestration
 */

class DesignFrameworkHeuristics {
    constructor() {
        this.currentTime = new Date('2025-08-24T14:27:16-04:00');
        this.evaluationResults = {
            contentStaleness: {},
            designFrameworks: {},
            performanceMetrics: {},
            recommendations: []
        };
    }

    // Agent Q: Coherence & Strategic Alignment Analysis
    analyzeContentCoherence() {
        console.log('🌌 Agent Q: Analyzing content coherence and strategic alignment...');
        
        const contentSections = document.querySelectorAll('section, .case-study, .portfolio-item');
        const timeAwareElements = document.querySelectorAll('[data-time-aware], .time-aware');
        
        const analysis = {
            totalSections: contentSections.length,
            timeAwareContent: timeAwareElements.length,
            stalenessIndicators: [],
            coherenceScore: 0
        };

        // Check for stale content patterns
        const stalePatterns = [
            'Lorem ipsum',
            'Coming soon',
            'Under construction',
            'Placeholder',
            '2023', '2022', '2021' // Old dates
        ];

        contentSections.forEach((section, index) => {
            const text = section.textContent.toLowerCase();
            stalePatterns.forEach(pattern => {
                if (text.includes(pattern.toLowerCase())) {
                    analysis.stalenessIndicators.push({
                        section: index,
                        pattern: pattern,
                        element: section.tagName + (section.className ? '.' + section.className : '')
                    });
                }
            });
        });

        // Evaluate content freshness based on time-aware elements
        const timeAwareRatio = analysis.timeAwareContent / analysis.totalSections;
        analysis.coherenceScore = Math.max(0, 5 - (analysis.stalenessIndicators.length * 0.5));
        
        this.evaluationResults.contentStaleness.coherence = analysis;
        return analysis;
    }

    // Agent G: Methodology & Systematic Excellence
    analyzeDesignSystemConsistency() {
        console.log('🔬 Agent G: Analyzing design system consistency...');
        
        const cssVariables = this.extractCSSVariables();
        const componentPatterns = this.analyzeComponentPatterns();
        const performanceMetrics = this.measurePerformanceMetrics();

        const analysis = {
            cssVariableUsage: cssVariables.length,
            componentConsistency: componentPatterns.consistency,
            performanceScore: performanceMetrics.score,
            systematicScore: 0
        };

        // Calculate systematic excellence score
        const variableScore = Math.min(5, cssVariables.length / 20); // 20+ variables = max score
        const consistencyScore = componentPatterns.consistency;
        const perfScore = performanceMetrics.score / 20; // Normalize to 0-5

        analysis.systematicScore = (variableScore + consistencyScore + perfScore) / 3;
        
        this.evaluationResults.designFrameworks.systematic = analysis;
        return analysis;
    }

    // Agent S: Style & Authentic Expression
    analyzeVisualExpression() {
        console.log('🎨 Agent S: Analyzing visual expression and authenticity...');
        
        const typography = this.analyzeTypography();
        const colorPalette = this.analyzeColorUsage();
        const animations = this.analyzeAnimations();

        const analysis = {
            typographyVariety: typography.fontFamilies.length,
            colorVariety: colorPalette.uniqueColors.length,
            animationQuality: animations.quality,
            expressionScore: 0
        };

        // Evaluate authentic expression
        const typeScore = Math.min(5, typography.fontFamilies.length / 3); // 3+ fonts = good variety
        const colorScore = Math.min(5, colorPalette.uniqueColors.length / 10); // 10+ colors = good palette
        const animScore = animations.quality;

        analysis.expressionScore = (typeScore + colorScore + animScore) / 3;
        
        this.evaluationResults.designFrameworks.expression = analysis;
        return analysis;
    }

    // Agent D: Layout & Visual Hierarchy
    analyzeLayoutEffectiveness() {
        console.log('📐 Agent D: Analyzing layout and visual hierarchy...');
        
        const hierarchy = this.analyzeVisualHierarchy();
        const responsive = this.analyzeResponsiveDesign();
        const spacing = this.analyzeSpacingConsistency();

        const analysis = {
            hierarchyClarity: hierarchy.clarity,
            responsiveScore: responsive.score,
            spacingConsistency: spacing.consistency,
            layoutScore: 0
        };

        analysis.layoutScore = (hierarchy.clarity + responsive.score + spacing.consistency) / 3;
        
        this.evaluationResults.designFrameworks.layout = analysis;
        return analysis;
    }

    // Agent X: Analytics & Performance Monitoring
    analyzePerformanceMetrics() {
        console.log('⚡ Agent X: Analyzing performance and technical metrics...');
        
        const loadTime = performance.now();
        const resources = performance.getEntriesByType('resource');
        const jsSize = this.calculateJavaScriptSize();
        const cssSize = this.calculateCSSSize();

        const analysis = {
            loadTime: loadTime,
            resourceCount: resources.length,
            jsSize: jsSize,
            cssSize: cssSize,
            performanceScore: 0
        };

        // Performance scoring (higher is better, max 5)
        const loadScore = loadTime < 2000 ? 5 : Math.max(1, 5 - ((loadTime - 2000) / 1000));
        const resourceScore = resources.length < 50 ? 5 : Math.max(1, 5 - ((resources.length - 50) / 10));
        const sizeScore = (jsSize + cssSize) < 500000 ? 5 : Math.max(1, 5 - (((jsSize + cssSize) - 500000) / 100000));

        analysis.performanceScore = (loadScore + resourceScore + sizeScore) / 3;
        
        this.evaluationResults.performanceMetrics = analysis;
        return analysis;
    }

    // Helper Methods
    extractCSSVariables() {
        const variables = [];
        const stylesheets = Array.from(document.styleSheets);
        
        stylesheets.forEach(sheet => {
            try {
                const rules = Array.from(sheet.cssRules || sheet.rules || []);
                rules.forEach(rule => {
                    if (rule.style) {
                        for (let i = 0; i < rule.style.length; i++) {
                            const prop = rule.style[i];
                            if (prop.startsWith('--')) {
                                variables.push(prop);
                            }
                        }
                    }
                });
            } catch (e) {
                // Cross-origin stylesheet access blocked
            }
        });
        
        return [...new Set(variables)];
    }

    analyzeComponentPatterns() {
        const buttons = document.querySelectorAll('button, .button, .btn');
        const cards = document.querySelectorAll('.card, .feature-card, .case-study');
        const modals = document.querySelectorAll('.modal, .dialog, .overlay');

        const buttonClasses = Array.from(buttons).map(btn => btn.className);
        const cardClasses = Array.from(cards).map(card => card.className);
        
        const consistency = this.calculateConsistencyScore(buttonClasses) + 
                          this.calculateConsistencyScore(cardClasses);

        return {
            buttons: buttons.length,
            cards: cards.length,
            modals: modals.length,
            consistency: consistency / 2
        };
    }

    calculateConsistencyScore(classNames) {
        const patterns = {};
        classNames.forEach(className => {
            const normalized = className.replace(/\d+/g, '').trim();
            patterns[normalized] = (patterns[normalized] || 0) + 1;
        });
        
        const total = classNames.length;
        const unique = Object.keys(patterns).length;
        
        return total > 0 ? Math.min(5, (total - unique + 1) / total * 5) : 0;
    }

    measurePerformanceMetrics() {
        const navigation = performance.getEntriesByType('navigation')[0];
        const paint = performance.getEntriesByType('paint');
        
        return {
            domContentLoaded: navigation?.domContentLoadedEventEnd || 0,
            firstPaint: paint.find(p => p.name === 'first-paint')?.startTime || 0,
            score: navigation?.domContentLoadedEventEnd < 2000 ? 5 : 3
        };
    }

    analyzeTypography() {
        const elements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, div');
        const fontFamilies = new Set();
        
        elements.forEach(el => {
            const style = window.getComputedStyle(el);
            fontFamilies.add(style.fontFamily);
        });

        return {
            fontFamilies: Array.from(fontFamilies),
            totalElements: elements.length
        };
    }

    analyzeColorUsage() {
        const elements = document.querySelectorAll('*');
        const colors = new Set();
        
        elements.forEach(el => {
            const style = window.getComputedStyle(el);
            if (style.color && style.color !== 'rgba(0, 0, 0, 0)') colors.add(style.color);
            if (style.backgroundColor && style.backgroundColor !== 'rgba(0, 0, 0, 0)') colors.add(style.backgroundColor);
        });

        return {
            uniqueColors: Array.from(colors),
            totalElements: elements.length
        };
    }

    analyzeAnimations() {
        const animatedElements = document.querySelectorAll('[style*="transition"], [style*="animation"], .animate');
        const cssAnimations = document.querySelectorAll('[class*="animate"], [class*="transition"]');
        
        return {
            animatedElements: animatedElements.length,
            cssAnimations: cssAnimations.length,
            quality: animatedElements.length > 0 ? Math.min(5, animatedElements.length / 5) : 2
        };
    }

    analyzeVisualHierarchy() {
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        const hierarchy = Array.from(headings).map(h => parseInt(h.tagName.charAt(1)));
        
        let clarity = 5;
        for (let i = 1; i < hierarchy.length; i++) {
            if (hierarchy[i] > hierarchy[i-1] + 1) clarity -= 0.5; // Skip levels
        }
        
        return {
            headingCount: headings.length,
            clarity: Math.max(1, clarity)
        };
    }

    analyzeResponsiveDesign() {
        const mediaQueries = this.extractMediaQueries();
        const viewportMeta = document.querySelector('meta[name="viewport"]');
        
        return {
            mediaQueries: mediaQueries.length,
            hasViewportMeta: !!viewportMeta,
            score: mediaQueries.length > 3 && viewportMeta ? 5 : 3
        };
    }

    extractMediaQueries() {
        const queries = [];
        const stylesheets = Array.from(document.styleSheets);
        
        stylesheets.forEach(sheet => {
            try {
                const rules = Array.from(sheet.cssRules || []);
                rules.forEach(rule => {
                    if (rule.type === CSSRule.MEDIA_RULE) {
                        queries.push(rule.conditionText);
                    }
                });
            } catch (e) {
                // Cross-origin access blocked
            }
        });
        
        return queries;
    }

    analyzeSpacingConsistency() {
        const elements = document.querySelectorAll('*');
        const margins = new Set();
        const paddings = new Set();
        
        elements.forEach(el => {
            const style = window.getComputedStyle(el);
            if (style.margin !== '0px') margins.add(style.margin);
            if (style.padding !== '0px') paddings.add(style.padding);
        });

        const uniqueMargins = margins.size;
        const uniquePaddings = paddings.size;
        
        // Lower unique values indicate better consistency
        const consistency = Math.max(1, 5 - (uniqueMargins + uniquePaddings) / 20);
        
        return {
            uniqueMargins,
            uniquePaddings,
            consistency
        };
    }

    calculateJavaScriptSize() {
        const scripts = document.querySelectorAll('script[src]');
        // This is an approximation - in real implementation, would fetch actual sizes
        return scripts.length * 15000; // Estimate 15KB per script
    }

    calculateCSSSize() {
        const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
        return stylesheets.length * 8000; // Estimate 8KB per stylesheet
    }

    // Generate Comprehensive Report
    generateHeuristicReport() {
        console.log('📊 Generating comprehensive heuristic analysis report...');
        
        const coherence = this.analyzeContentCoherence();
        const systematic = this.analyzeDesignSystemConsistency();
        const expression = this.analyzeVisualExpression();
        const layout = this.analyzeLayoutEffectiveness();
        const performance = this.analyzePerformanceMetrics();

        const overallScore = (
            coherence.coherenceScore +
            systematic.systematicScore +
            expression.expressionScore +
            layout.layoutScore +
            performance.performanceScore
        ) / 5;

        const report = {
            timestamp: this.currentTime.toISOString(),
            overallScore: overallScore.toFixed(2),
            agentScores: {
                'Agent Q (Coherence)': coherence.coherenceScore.toFixed(2),
                'Agent G (Systematic)': systematic.systematicScore.toFixed(2),
                'Agent S (Expression)': expression.expressionScore.toFixed(2),
                'Agent D (Layout)': layout.layoutScore.toFixed(2),
                'Agent X (Performance)': performance.performanceScore.toFixed(2)
            },
            criticalFindings: this.identifyCriticalIssues(),
            recommendations: this.generateRecommendations(overallScore),
            stalenessIndicators: coherence.stalenessIndicators
        };

        return report;
    }

    identifyCriticalIssues() {
        const issues = [];
        
        if (this.evaluationResults.contentStaleness.coherence?.stalenessIndicators.length > 3) {
            issues.push('HIGH: Multiple stale content indicators detected');
        }
        
        if (this.evaluationResults.performanceMetrics?.performanceScore < 3) {
            issues.push('HIGH: Performance metrics below acceptable threshold');
        }
        
        if (this.evaluationResults.designFrameworks.systematic?.systematicScore < 2.5) {
            issues.push('MEDIUM: Design system consistency needs improvement');
        }

        return issues;
    }

    generateRecommendations(overallScore) {
        const recommendations = [];
        
        if (overallScore < 3) {
            recommendations.push({
                priority: 'HIGH',
                category: 'Content Strategy',
                action: 'Comprehensive content audit and refresh needed',
                impact: 'Addresses staleness and improves user engagement'
            });
        }

        recommendations.push({
            priority: 'HIGH',
            category: 'Time-Aware Content',
            action: 'Implement dynamic content based on current time/season',
            impact: 'Creates fresh, contextual user experiences'
        });

        recommendations.push({
            priority: 'MEDIUM',
            category: 'Performance',
            action: 'Optimize JavaScript bundle sizes and implement lazy loading',
            impact: 'Improves page load times and user experience'
        });

        recommendations.push({
            priority: 'MEDIUM',
            category: 'Design System',
            action: 'Consolidate CSS variables and component patterns',
            impact: 'Improves maintainability and visual consistency'
        });

        return recommendations;
    }
}

// Auto-execute heuristic analysis when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heuristics = new DesignFrameworkHeuristics();
    
    // Wait for page to fully load before analysis
    setTimeout(() => {
        const report = heuristics.generateHeuristicReport();
        
        console.log('🌌 DESIGN FRAMEWORK HEURISTICS ANALYSIS COMPLETE');
        console.log('📊 Overall Score:', report.overallScore, '/5.0');
        console.log('🎯 Agent Scores:', report.agentScores);
        console.log('⚠️ Critical Issues:', report.criticalFindings);
        console.log('💡 Recommendations:', report.recommendations);
        console.log('🔍 Staleness Indicators:', report.stalenessIndicators);
        
        // Store results globally for further analysis
        window.heuristicAnalysis = report;
        
        // Trigger content refresh strategy if needed
        if (parseFloat(report.overallScore) < 3.5) {
            console.log('🚨 CONTENT REFRESH STRATEGY TRIGGERED');
            triggerContentRefreshStrategy(report);
        }
    }, 2000);
});

// Content Refresh Strategy Implementation
function triggerContentRefreshStrategy(analysisReport) {
    console.log('🔄 Implementing content refresh strategy...');
    
    const refreshStrategies = {
        timeAwareContent: () => {
            console.log('⏰ Activating time-aware content updates...');
            // Implement time-based content variations
            updateTimeAwareElements();
        },
        
        dynamicPersonalization: () => {
            console.log('👤 Implementing dynamic personalization...');
            // Add user-context aware content
            implementPersonalization();
        },
        
        interactiveElements: () => {
            console.log('🎮 Adding interactive elements...');
            // Enhance with micro-interactions and engagement features
            addInteractiveFeatures();
        }
    };
    
    // Execute refresh strategies based on analysis
    Object.values(refreshStrategies).forEach(strategy => strategy());
}

function updateTimeAwareElements() {
    const currentHour = new Date().getHours();
    const timeOfDay = currentHour < 12 ? 'morning' : currentHour < 18 ? 'afternoon' : 'evening';
    
    document.body.setAttribute('data-time-of-day', timeOfDay);
    
    // Update time-sensitive content
    const timeAwareElements = document.querySelectorAll('[data-time-aware]');
    timeAwareElements.forEach(element => {
        element.classList.add(`time-${timeOfDay}`);
    });
}

function implementPersonalization() {
    // Add subtle personalization based on user behavior
    const visitCount = localStorage.getItem('visitCount') || 0;
    localStorage.setItem('visitCount', parseInt(visitCount) + 1);
    
    if (visitCount > 3) {
        document.body.classList.add('returning-visitor');
    }
}

function addInteractiveFeatures() {
    // Add hover effects and micro-interactions to static elements
    const cards = document.querySelectorAll('.card, .feature-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-2px)';
            card.style.transition = 'transform 0.2s ease';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}

export default DesignFrameworkHeuristics;
