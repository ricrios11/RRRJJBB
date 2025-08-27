/**
 * 🧼 EntropySweeper Agent – Hero Surface Audit & Hygiene Pass
 * 
 * Detects and neutralizes entropy vectors that interfere with hero gradients
 * Performs comprehensive surface audits and maintains gradient hygiene
 */

class EntropySweeper {
    constructor() {
        this.scope = ['#hero', '.ric-hero'];
        this.entropyVectors = [];
        this.auditResults = {
            inlineStyles: [],
            importantOverrides: [],
            conflictingClasses: [],
            mutatingScripts: [],
            externalStylesheets: []
        };
        
        this.init();
    }
    
    init() {
        console.log('🧼 EntropySweeper: Initializing hero surface audit & hygiene pass...');
        
        // Perform initial audit
        this.performSurfaceAudit();
        
        // Set up continuous monitoring
        this.setupContinuousMonitoring();
        
        console.log('✅ EntropySweeper: Hero surface audit complete');
        
        // Generate entropy report
        this.generateEntropyReport();
        
        // Dispatch completion event
        document.dispatchEvent(new CustomEvent('entropy-sweeper:hero-complete', {
            detail: { auditResults: this.auditResults }
        }));
    }
    
    performSurfaceAudit() {
        console.log('🔍 EntropySweeper: Performing comprehensive hero surface audit...');
        
        this.scope.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                this.auditElement(element);
            });
        });
        
        // Audit global styles that might affect hero
        this.auditGlobalStyles();
        
        // Audit for mutating scripts
        this.auditMutatingScripts();
        
        // Audit external stylesheets
        this.auditExternalStylesheets();
    }
    
    auditElement(element) {
        const elementId = element.id || element.className || 'unknown';
        
        // Check for inline style blocks
        this.detectInlineStyles(element, elementId);
        
        // Check for hardcoded !important
        this.detectImportantOverrides(element, elementId);
        
        // Check for conflicting Tailwind classes
        this.detectConflictingClasses(element, elementId);
        
        // Check for background mutations
        this.detectBackgroundMutations(element, elementId);
    }
    
    detectInlineStyles(element, elementId) {
        const inlineStyle = element.getAttribute('style');
        if (inlineStyle && inlineStyle.includes('background')) {
            const vector = {
                type: 'inline-style',
                element: elementId,
                content: inlineStyle,
                severity: 'medium',
                location: this.getElementPath(element)
            };
            
            this.auditResults.inlineStyles.push(vector);
            console.log(`⚠️ EntropySweeper: Detected inline background style on ${elementId}`);
        }
    }
    
    detectImportantOverrides(element, elementId) {
        const computedStyle = window.getComputedStyle(element);
        const inlineStyle = element.getAttribute('style');
        
        if (inlineStyle && inlineStyle.includes('!important')) {
            const vector = {
                type: 'important-override',
                element: elementId,
                content: inlineStyle,
                severity: 'high',
                location: this.getElementPath(element)
            };
            
            this.auditResults.importantOverrides.push(vector);
            console.log(`🚨 EntropySweeper: Detected !important override on ${elementId}`);
        }
    }
    
    detectConflictingClasses(element, elementId) {
        const classList = Array.from(element.classList);
        const backgroundClasses = classList.filter(cls => 
            cls.includes('bg-gradient') || 
            cls.includes('bg-none') || 
            cls.includes('bg-transparent')
        );
        
        if (backgroundClasses.length > 1) {
            const vector = {
                type: 'conflicting-classes',
                element: elementId,
                classes: backgroundClasses,
                severity: 'medium',
                location: this.getElementPath(element)
            };
            
            this.auditResults.conflictingClasses.push(vector);
            console.log(`⚠️ EntropySweeper: Detected conflicting background classes on ${elementId}:`, backgroundClasses);
        }
    }
    
    detectBackgroundMutations(element, elementId) {
        // Set up mutation observer for this specific element
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                    const newStyle = element.getAttribute('style');
                    if (newStyle && newStyle.includes('background')) {
                        console.log(`🔄 EntropySweeper: Background mutation detected on ${elementId}`);
                        
                        // Log the mutating script if possible
                        const stack = new Error().stack;
                        this.logMutatingScript(elementId, stack);
                    }
                }
            });
        });
        
        observer.observe(element, {
            attributes: true,
            attributeFilter: ['style']
        });
    }
    
    auditGlobalStyles() {
        console.log('🌐 EntropySweeper: Auditing global styles...');
        
        // Check all stylesheets for hero-affecting rules
        Array.from(document.styleSheets).forEach((sheet, index) => {
            try {
                if (sheet.cssRules) {
                    Array.from(sheet.cssRules).forEach((rule, ruleIndex) => {
                        if (rule.selectorText && 
                            (rule.selectorText.includes('#hero') || 
                             rule.selectorText.includes('.ric-hero'))) {
                            
                            if (rule.style && rule.style.background) {
                                console.log(`📋 EntropySweeper: Found global hero style in sheet ${index}, rule ${ruleIndex}:`, rule.selectorText);
                            }
                        }
                    });
                }
            } catch (e) {
                // Cross-origin stylesheet - skip
                console.log(`🔒 EntropySweeper: Skipping cross-origin stylesheet ${index}`);
            }
        });
    }
    
    auditMutatingScripts() {
        console.log('🔍 EntropySweeper: Auditing for mutating scripts...');
        
        // This is a simplified detection - in practice, we'd need more sophisticated tracking
        const scripts = Array.from(document.querySelectorAll('script'));
        scripts.forEach((script, index) => {
            if (script.textContent && 
                (script.textContent.includes('style.background') || 
                 script.textContent.includes('setProperty'))) {
                
                const vector = {
                    type: 'mutating-script',
                    scriptIndex: index,
                    severity: 'high',
                    location: script.src || 'inline'
                };
                
                this.auditResults.mutatingScripts.push(vector);
                console.log(`🚨 EntropySweeper: Detected potentially mutating script at index ${index}`);
            }
        });
    }
    
    auditExternalStylesheets() {
        console.log('🔗 EntropySweeper: Auditing external stylesheets...');
        
        const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
        links.forEach((link, index) => {
            if (link.href) {
                const vector = {
                    type: 'external-stylesheet',
                    href: link.href,
                    loadOrder: index,
                    severity: 'low'
                };
                
                this.auditResults.externalStylesheets.push(vector);
            }
        });
    }
    
    logMutatingScript(elementId, stack) {
        const vector = {
            type: 'runtime-mutation',
            element: elementId,
            timestamp: new Date().toISOString(),
            stack: stack,
            severity: 'high'
        };
        
        this.auditResults.mutatingScripts.push(vector);
    }
    
    getElementPath(element) {
        const path = [];
        let current = element;
        
        while (current && current !== document.body) {
            let selector = current.tagName.toLowerCase();
            if (current.id) {
                selector += `#${current.id}`;
            } else if (current.className) {
                selector += `.${current.className.split(' ').join('.')}`;
            }
            path.unshift(selector);
            current = current.parentElement;
        }
        
        return path.join(' > ');
    }
    
    generateEntropyReport() {
        const report = {
            timestamp: new Date().toISOString(),
            scope: this.scope,
            summary: {
                totalVectors: this.getTotalVectors(),
                highSeverity: this.getVectorsBySeverity('high'),
                mediumSeverity: this.getVectorsBySeverity('medium'),
                lowSeverity: this.getVectorsBySeverity('low')
            },
            details: this.auditResults,
            recommendations: this.generateRecommendations()
        };
        
        console.log('📊 EntropySweeper: Entropy Report Generated:', report);
        
        // Store report for external access
        window.entropyReport = report;
        
        return report;
    }
    
    getTotalVectors() {
        return Object.values(this.auditResults).reduce((total, vectors) => total + vectors.length, 0);
    }
    
    getVectorsBySeverity(severity) {
        return Object.values(this.auditResults)
            .flat()
            .filter(vector => vector.severity === severity)
            .length;
    }
    
    generateRecommendations() {
        const recommendations = [];
        
        if (this.auditResults.inlineStyles.length > 0) {
            recommendations.push({
                priority: 'medium',
                action: 'Remove inline background styles from hero elements',
                reason: 'Inline styles can override CSS-based time-aware gradients'
            });
        }
        
        if (this.auditResults.importantOverrides.length > 0) {
            recommendations.push({
                priority: 'high',
                action: 'Remove !important declarations from hero styling',
                reason: '!important overrides prevent proper gradient application'
            });
        }
        
        if (this.auditResults.conflictingClasses.length > 0) {
            recommendations.push({
                priority: 'medium',
                action: 'Resolve conflicting Tailwind background classes',
                reason: 'Multiple background classes create unpredictable behavior'
            });
        }
        
        if (this.auditResults.mutatingScripts.length > 0) {
            recommendations.push({
                priority: 'high',
                action: 'Review and coordinate background-mutating scripts',
                reason: 'Runtime mutations can interfere with time-aware gradients'
            });
        }
        
        return recommendations;
    }
    
    setupContinuousMonitoring() {
        // Monitor for new script additions
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach((node) => {
                        if (node.tagName === 'SCRIPT' || node.tagName === 'LINK') {
                            console.log('🔄 EntropySweeper: New script/stylesheet detected, re-auditing...');
                            setTimeout(() => this.performSurfaceAudit(), 100);
                        }
                    });
                }
            });
        });
        
        observer.observe(document.head, { childList: true });
        observer.observe(document.body, { childList: true });
    }
    
    // Public methods
    getReport() {
        return window.entropyReport || this.generateEntropyReport();
    }
    
    reaudit() {
        console.log('🔄 EntropySweeper: Manual re-audit triggered');
        this.auditResults = {
            inlineStyles: [],
            importantOverrides: [],
            conflictingClasses: [],
            mutatingScripts: [],
            externalStylesheets: []
        };
        this.performSurfaceAudit();
        return this.generateEntropyReport();
    }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.entropySweeper = new EntropySweeper();
    });
} else {
    window.entropySweeper = new EntropySweeper();
}

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EntropySweeper;
}
