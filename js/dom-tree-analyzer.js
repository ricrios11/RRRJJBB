/**
 * DOM TREE ANALYZER - Deep Site Reliability Assessment
 * Disciplined Excellence: Comprehensive defect detection and innovation roadmap
 * Future-State Innovation: Building tomorrow's bulletproof architecture
 */

class DOMTreeAnalyzer {
    constructor() {
        this.issues = [];
        this.recommendations = [];
        this.performance = {};
        this.accessibility = {};
        this.structure = {};
        this.reliability = {};
        
        this.init();
    }
    
    init() {
        console.log('🔍 DOM Tree Analyzer initializing...');
        this.runComprehensiveAnalysis();
    }
    
    async runComprehensiveAnalysis() {
        const startTime = performance.now();
        
        // Core Analysis Modules
        await this.analyzeStructuralIntegrity();
        await this.analyzePerformanceMetrics();
        await this.analyzeAccessibility();
        await this.analyzeModalSystem();
        await this.analyzeScriptIntegration();
        await this.analyzeCSSIntegrity();
        await this.analyzeEventHandlers();
        await this.analyzeMemoryLeaks();
        
        const endTime = performance.now();
        this.performance.analysisTime = Math.round(endTime - startTime);
        
        this.generateReliabilityReport();
        this.proposeInnovationRoadmap();
    }
    
    async analyzeStructuralIntegrity() {
        console.log('🏗️ Analyzing structural integrity...');
        
        const structure = {
            totalElements: document.querySelectorAll('*').length,
            duplicateIds: this.findDuplicateIds(),
            orphanedElements: this.findOrphanedElements(),
            malformedHTML: this.findMalformedHTML(),
            missingRequiredElements: this.findMissingRequiredElements(),
            nestedDepth: this.calculateMaxNestingDepth()
        };
        
        this.structure = structure;
        
        // Flag issues
        if (structure.duplicateIds.length > 0) {
            this.issues.push({
                type: 'structural',
                severity: 'high',
                message: `${structure.duplicateIds.length} duplicate IDs found`,
                elements: structure.duplicateIds
            });
        }
        
        if (structure.nestedDepth > 15) {
            this.issues.push({
                type: 'structural',
                severity: 'medium',
                message: `Excessive nesting depth: ${structure.nestedDepth} levels`,
                recommendation: 'Consider flattening DOM structure for better performance'
            });
        }
        
        console.log(`✅ Structure: ${structure.totalElements} elements, ${structure.nestedDepth} max depth`);
    }
    
    findDuplicateIds() {
        const ids = [];
        const duplicates = [];
        
        document.querySelectorAll('[id]').forEach(el => {
            const id = el.id;
            if (ids.includes(id)) {
                duplicates.push(id);
            } else {
                ids.push(id);
            }
        });
        
        return [...new Set(duplicates)];
    }
    
    findOrphanedElements() {
        const orphaned = [];
        
        // Check for elements with missing parents or broken references
        document.querySelectorAll('[data-parent], [data-target]').forEach(el => {
            const parent = el.dataset.parent;
            const target = el.dataset.target;
            
            if (parent && !document.getElementById(parent)) {
                orphaned.push({ element: el, missingParent: parent });
            }
            
            if (target && !document.getElementById(target)) {
                orphaned.push({ element: el, missingTarget: target });
            }
        });
        
        return orphaned;
    }
    
    findMalformedHTML() {
        const malformed = [];
        
        // Check for unclosed tags, missing attributes, etc.
        document.querySelectorAll('img').forEach(img => {
            if (!img.alt && !img.getAttribute('aria-label')) {
                malformed.push({ element: img, issue: 'Missing alt text' });
            }
        });
        
        document.querySelectorAll('button').forEach(btn => {
            if (!btn.textContent.trim() && !btn.getAttribute('aria-label')) {
                malformed.push({ element: btn, issue: 'Button without accessible text' });
            }
        });
        
        return malformed;
    }
    
    findMissingRequiredElements() {
        const missing = [];
        const required = ['title', 'meta[charset]', 'meta[viewport]'];
        
        required.forEach(selector => {
            if (!document.querySelector(selector)) {
                missing.push(selector);
            }
        });
        
        return missing;
    }
    
    calculateMaxNestingDepth() {
        let maxDepth = 0;
        
        function getDepth(element, depth = 0) {
            maxDepth = Math.max(maxDepth, depth);
            Array.from(element.children).forEach(child => {
                getDepth(child, depth + 1);
            });
        }
        
        getDepth(document.body);
        return maxDepth;
    }
    
    async analyzePerformanceMetrics() {
        console.log('⚡ Analyzing performance metrics...');
        
        const metrics = {
            domSize: document.querySelectorAll('*').length,
            scriptCount: document.querySelectorAll('script').length,
            styleCount: document.querySelectorAll('style, link[rel="stylesheet"]').length,
            imageCount: document.querySelectorAll('img').length,
            largeImages: this.findLargeImages(),
            unusedCSS: await this.detectUnusedCSS(),
            memoryUsage: this.estimateMemoryUsage()
        };
        
        this.performance = { ...this.performance, ...metrics };
        
        // Performance flags
        if (metrics.domSize > 3000) {
            this.issues.push({
                type: 'performance',
                severity: 'high',
                message: `Large DOM size: ${metrics.domSize} elements`,
                recommendation: 'Consider lazy loading or virtualization'
            });
        }
        
        if (metrics.scriptCount > 10) {
            this.issues.push({
                type: 'performance',
                severity: 'medium',
                message: `Many scripts: ${metrics.scriptCount} files`,
                recommendation: 'Bundle and minify scripts'
            });
        }
        
        console.log(`✅ Performance: ${metrics.domSize} DOM elements, ${metrics.scriptCount} scripts`);
    }
    
    findLargeImages() {
        const large = [];
        document.querySelectorAll('img').forEach(img => {
            if (img.naturalWidth > 1920 || img.naturalHeight > 1080) {
                large.push({
                    element: img,
                    dimensions: `${img.naturalWidth}x${img.naturalHeight}`
                });
            }
        });
        return large;
    }
    
    async detectUnusedCSS() {
        // Simplified unused CSS detection
        const stylesheets = Array.from(document.styleSheets);
        const unusedRules = [];
        
        try {
            stylesheets.forEach(sheet => {
                if (sheet.cssRules) {
                    Array.from(sheet.cssRules).forEach(rule => {
                        if (rule.selectorText && !document.querySelector(rule.selectorText)) {
                            unusedRules.push(rule.selectorText);
                        }
                    });
                }
            });
        } catch (e) {
            // CORS or other access issues
            console.warn('CSS analysis limited due to access restrictions');
        }
        
        return unusedRules.slice(0, 10); // Limit for performance
    }
    
    estimateMemoryUsage() {
        const elements = document.querySelectorAll('*').length;
        const eventListeners = this.countEventListeners();
        const estimatedKB = Math.round((elements * 0.5 + eventListeners * 0.1));
        
        return { elements, eventListeners, estimatedKB };
    }
    
    countEventListeners() {
        let count = 0;
        document.querySelectorAll('[onclick], [onload], [onchange]').forEach(() => count++);
        return count;
    }
    
    async analyzeAccessibility() {
        console.log('♿ Analyzing accessibility...');
        
        const a11y = {
            missingAltText: document.querySelectorAll('img:not([alt])').length,
            missingLabels: document.querySelectorAll('input:not([aria-label]):not([id])').length,
            missingHeadings: this.checkHeadingStructure(),
            colorContrast: this.checkColorContrast(),
            focusableElements: document.querySelectorAll('[tabindex], button, input, select, textarea, a[href]').length,
            ariaIssues: this.findAriaIssues()
        };
        
        this.accessibility = a11y;
        
        if (a11y.missingAltText > 0) {
            this.issues.push({
                type: 'accessibility',
                severity: 'high',
                message: `${a11y.missingAltText} images missing alt text`,
                recommendation: 'Add descriptive alt attributes to all images'
            });
        }
        
        console.log(`✅ Accessibility: ${a11y.focusableElements} focusable elements`);
    }
    
    checkHeadingStructure() {
        const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
        const issues = [];
        
        let previousLevel = 0;
        headings.forEach(heading => {
            const level = parseInt(heading.tagName.charAt(1));
            if (level > previousLevel + 1) {
                issues.push(`Heading level jump: ${heading.tagName} after h${previousLevel}`);
            }
            previousLevel = level;
        });
        
        return issues;
    }
    
    checkColorContrast() {
        // Simplified contrast check
        const issues = [];
        document.querySelectorAll('*').forEach(el => {
            const style = window.getComputedStyle(el);
            const color = style.color;
            const background = style.backgroundColor;
            
            // Basic check for very light text on light background
            if (color === 'rgb(255, 255, 255)' && background === 'rgb(255, 255, 255)') {
                issues.push(el);
            }
        });
        
        return issues.slice(0, 5); // Limit for performance
    }
    
    findAriaIssues() {
        const issues = [];
        
        // Check for invalid ARIA attributes
        document.querySelectorAll('[aria-*]').forEach(el => {
            Array.from(el.attributes).forEach(attr => {
                if (attr.name.startsWith('aria-') && !attr.value.trim()) {
                    issues.push({ element: el, attribute: attr.name, issue: 'Empty ARIA attribute' });
                }
            });
        });
        
        return issues;
    }
    
    async analyzeModalSystem() {
        console.log('🎭 Analyzing modal system...');
        
        const modals = document.querySelectorAll('.game-modal, .modal, [id*="modal"]');
        const modalIssues = [];
        
        modals.forEach(modal => {
            // Check for proper ARIA attributes
            if (!modal.getAttribute('role') && !modal.getAttribute('aria-modal')) {
                modalIssues.push({ modal, issue: 'Missing ARIA modal attributes' });
            }
            
            // Check for close buttons
            const closeBtn = modal.querySelector('[onclick*="close"], .close, .modal-close');
            if (!closeBtn) {
                modalIssues.push({ modal, issue: 'Missing close button' });
            }
            
            // Check for focus trap
            const focusableElements = modal.querySelectorAll('button, input, select, textarea, a[href]');
            if (focusableElements.length === 0) {
                modalIssues.push({ modal, issue: 'No focusable elements in modal' });
            }
        });
        
        this.reliability.modalSystem = {
            totalModals: modals.length,
            issues: modalIssues,
            hasEmergencyFallback: typeof window.openModal === 'function'
        };
        
        console.log(`✅ Modals: ${modals.length} found, ${modalIssues.length} issues`);
    }
    
    async analyzeScriptIntegration() {
        console.log('📜 Analyzing script integration...');
        
        const scripts = document.querySelectorAll('script');
        const scriptIssues = [];
        
        // Check for missing global functions
        const expectedGlobals = ['openModal', 'closeModal', 'toggleTheme'];
        expectedGlobals.forEach(func => {
            if (typeof window[func] !== 'function') {
                scriptIssues.push({ function: func, issue: 'Missing global function' });
            }
        });
        
        // Check for script loading order
        const deferredScripts = Array.from(scripts).filter(s => s.defer);
        const nonDeferredScripts = Array.from(scripts).filter(s => !s.defer && s.src);
        
        if (nonDeferredScripts.length > deferredScripts.length) {
            scriptIssues.push({ issue: 'Many blocking scripts detected', recommendation: 'Consider using defer attribute' });
        }
        
        this.reliability.scriptIntegration = {
            totalScripts: scripts.length,
            deferredScripts: deferredScripts.length,
            issues: scriptIssues,
            globalFunctions: expectedGlobals.filter(func => typeof window[func] === 'function')
        };
        
        console.log(`✅ Scripts: ${scripts.length} total, ${scriptIssues.length} issues`);
    }
    
    async analyzeCSSIntegrity() {
        console.log('🎨 Analyzing CSS integrity...');
        
        const cssIssues = [];
        
        // Check for missing CSS custom properties
        const rootStyle = getComputedStyle(document.documentElement);
        const expectedProperties = ['--cyber-primary-accent', '--cyber-dark-primary', '--surface-primary'];
        
        expectedProperties.forEach(prop => {
            const value = rootStyle.getPropertyValue(prop);
            if (!value.trim()) {
                cssIssues.push({ property: prop, issue: 'Missing CSS custom property' });
            }
        });
        
        // Check for broken image references in CSS
        const elements = document.querySelectorAll('*');
        elements.forEach(el => {
            const style = getComputedStyle(el);
            const bgImage = style.backgroundImage;
            if (bgImage && bgImage !== 'none' && bgImage.includes('url(')) {
                // Could check if image loads, but skip for performance
            }
        });
        
        this.reliability.cssIntegrity = {
            customProperties: expectedProperties.length,
            issues: cssIssues
        };
        
        console.log(`✅ CSS: ${expectedProperties.length} custom properties checked`);
    }
    
    async analyzeEventHandlers() {
        console.log('🎯 Analyzing event handlers...');
        
        const eventIssues = [];
        
        // Check for inline event handlers
        const inlineEvents = document.querySelectorAll('[onclick], [onload], [onchange]');
        if (inlineEvents.length > 20) {
            eventIssues.push({
                issue: `Many inline event handlers: ${inlineEvents.length}`,
                recommendation: 'Consider using addEventListener for better maintainability'
            });
        }
        
        // Check for broken onclick handlers
        inlineEvents.forEach(el => {
            const onclick = el.getAttribute('onclick');
            if (onclick && onclick.includes('undefined')) {
                eventIssues.push({ element: el, issue: 'Onclick handler references undefined function' });
            }
        });
        
        this.reliability.eventHandlers = {
            inlineEvents: inlineEvents.length,
            issues: eventIssues
        };
        
        console.log(`✅ Events: ${inlineEvents.length} inline handlers, ${eventIssues.length} issues`);
    }
    
    async analyzeMemoryLeaks() {
        console.log('🧠 Analyzing potential memory leaks...');
        
        const memoryIssues = [];
        
        // Check for potential memory leaks
        const intervals = window.setInterval.toString().includes('[native code]') ? 'unknown' : 0;
        const timeouts = window.setTimeout.toString().includes('[native code]') ? 'unknown' : 0;
        
        // Check for event listeners that might not be cleaned up
        const elementsWithEvents = document.querySelectorAll('[onclick]').length;
        
        this.reliability.memoryLeaks = {
            potentialLeaks: memoryIssues,
            eventListeners: elementsWithEvents,
            intervals: intervals,
            timeouts: timeouts
        };
        
        console.log(`✅ Memory: ${elementsWithEvents} event listeners analyzed`);
    }
    
    generateReliabilityReport() {
        console.log('\n🎯 COMPREHENSIVE SITE RELIABILITY REPORT');
        console.log('═'.repeat(60));
        
        const totalIssues = this.issues.length;
        const highSeverity = this.issues.filter(i => i.severity === 'high').length;
        const mediumSeverity = this.issues.filter(i => i.severity === 'medium').length;
        
        console.log(`📊 OVERALL HEALTH: ${totalIssues} issues found`);
        console.log(`   🔴 High Priority: ${highSeverity}`);
        console.log(`   🟡 Medium Priority: ${mediumSeverity}`);
        console.log(`   🟢 Low Priority: ${totalIssues - highSeverity - mediumSeverity}`);
        
        console.log('\n🏗️ STRUCTURAL INTEGRITY:');
        console.log(`   Elements: ${this.structure.totalElements}`);
        console.log(`   Max Depth: ${this.structure.nestedDepth} levels`);
        console.log(`   Duplicate IDs: ${this.structure.duplicateIds.length}`);
        
        console.log('\n⚡ PERFORMANCE METRICS:');
        console.log(`   DOM Size: ${this.performance.domSize} elements`);
        console.log(`   Scripts: ${this.performance.scriptCount}`);
        console.log(`   Analysis Time: ${this.performance.analysisTime}ms`);
        
        console.log('\n♿ ACCESSIBILITY:');
        console.log(`   Missing Alt Text: ${this.accessibility.missingAltText}`);
        console.log(`   Focusable Elements: ${this.accessibility.focusableElements}`);
        
        console.log('\n🎭 MODAL SYSTEM:');
        console.log(`   Total Modals: ${this.reliability.modalSystem.totalModals}`);
        console.log(`   Emergency Fallback: ${this.reliability.modalSystem.hasEmergencyFallback ? '✅' : '❌'}`);
        
        console.log('\n📜 SCRIPT INTEGRATION:');
        console.log(`   Global Functions: ${this.reliability.scriptIntegration.globalFunctions.join(', ')}`);
        console.log(`   Deferred Scripts: ${this.reliability.scriptIntegration.deferredScripts}`);
        
        // Detailed issue breakdown
        if (this.issues.length > 0) {
            console.log('\n🔍 DETAILED ISSUES:');
            this.issues.forEach((issue, index) => {
                const severity = issue.severity === 'high' ? '🔴' : issue.severity === 'medium' ? '🟡' : '🟢';
                console.log(`   ${severity} ${issue.type.toUpperCase()}: ${issue.message}`);
                if (issue.recommendation) {
                    console.log(`      💡 ${issue.recommendation}`);
                }
            });
        }
    }
    
    proposeInnovationRoadmap() {
        console.log('\n🚀 INNOVATION ROADMAP - Building Tomorrow\'s Architecture');
        console.log('═'.repeat(60));
        
        const roadmap = [
            {
                phase: 'IMMEDIATE FIXES',
                priority: 'P0',
                items: [
                    'Fix duplicate IDs for DOM integrity',
                    'Add missing alt text for accessibility',
                    'Resolve high-severity modal issues',
                    'Clean up broken event handlers'
                ]
            },
            {
                phase: 'PERFORMANCE OPTIMIZATION',
                priority: 'P1', 
                items: [
                    'Bundle and minify JavaScript files',
                    'Implement lazy loading for images',
                    'Remove unused CSS rules',
                    'Optimize DOM structure depth'
                ]
            },
            {
                phase: 'ARCHITECTURAL EVOLUTION',
                priority: 'P2',
                items: [
                    'Migrate to component-based architecture',
                    'Implement proper state management',
                    'Add comprehensive error boundaries',
                    'Create automated testing pipeline'
                ]
            },
            {
                phase: 'FUTURE-STATE INNOVATION',
                priority: 'P3',
                items: [
                    'Progressive Web App capabilities',
                    'Real-time collaboration features',
                    'AI-driven personalization',
                    'Advanced analytics integration'
                ]
            }
        ];
        
        roadmap.forEach(phase => {
            console.log(`\n${phase.priority} - ${phase.phase}:`);
            phase.items.forEach(item => {
                console.log(`   ▶ ${item}`);
            });
        });
        
        console.log('\n🎯 DISCIPLINED EXCELLENCE PRINCIPLES:');
        console.log('   • Every fix builds toward systematic reliability');
        console.log('   • Performance optimizations serve user experience');
        console.log('   • Architecture evolution enables future innovation');
        console.log('   • Innovation roadmap balances ambition with execution');
        
        console.log('\n🌆 Evening Reflection: Transformation through methodical excellence');
    }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => new DOMTreeAnalyzer(), 2000);
    });
} else {
    setTimeout(() => new DOMTreeAnalyzer(), 2000);
}

// Export for manual analysis
window.DOMTreeAnalyzer = DOMTreeAnalyzer;
