/**
 * Accessibility Validator - WCAG 2.1 AA Compliance
 * Validates color contrast, focus indicators, and accessibility features
 */

class AccessibilityValidator {
    constructor() {
        this.contrastRatio = {
            AA_NORMAL: 4.5,
            AA_LARGE: 3,
            AAA_NORMAL: 7,
            AAA_LARGE: 4.5
        };
        this.issues = [];
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.runValidation());
        } else {
            this.runValidation();
        }
        
        this.enhanceFocusIndicators();
        this.addKeyboardNavigation();
        console.log('♿ ACCESSIBILITY VALIDATOR: Initialized');
    }

    runValidation() {
        this.validateColorContrast();
        this.validateFocusIndicators();
        this.validateAriaLabels();
        this.validateKeyboardNavigation();
        this.generateReport();
    }

    // Color contrast validation
    getLuminance(r, g, b) {
        const [rs, gs, bs] = [r, g, b].map(c => {
            c = c / 255;
            return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    }

    getContrastRatio(color1, color2) {
        const lum1 = this.getLuminance(...color1);
        const lum2 = this.getLuminance(...color2);
        const brightest = Math.max(lum1, lum2);
        const darkest = Math.min(lum1, lum2);
        return (brightest + 0.05) / (darkest + 0.05);
    }

    parseColor(colorStr) {
        const div = document.createElement('div');
        div.style.color = colorStr;
        document.body.appendChild(div);
        const computed = getComputedStyle(div).color;
        document.body.removeChild(div);
        
        const match = computed.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        return match ? [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])] : [0, 0, 0];
    }

    validateColorContrast() {
        const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, a, button, .text');
        
        textElements.forEach(element => {
            const styles = getComputedStyle(element);
            const textColor = this.parseColor(styles.color);
            const bgColor = this.parseColor(styles.backgroundColor);
            
            // If background is transparent, check parent
            let actualBgColor = bgColor;
            if (styles.backgroundColor === 'rgba(0, 0, 0, 0)' || styles.backgroundColor === 'transparent') {
                let parent = element.parentElement;
                while (parent && (getComputedStyle(parent).backgroundColor === 'transparent' || 
                       getComputedStyle(parent).backgroundColor === 'rgba(0, 0, 0, 0)')) {
                    parent = parent.parentElement;
                }
                if (parent) {
                    actualBgColor = this.parseColor(getComputedStyle(parent).backgroundColor);
                } else {
                    actualBgColor = [10, 10, 10]; // Default dark background
                }
            }

            const contrast = this.getContrastRatio(textColor, actualBgColor);
            const fontSize = parseFloat(styles.fontSize);
            const isLargeText = fontSize >= 18 || (fontSize >= 14 && styles.fontWeight === 'bold');
            
            const requiredRatio = isLargeText ? this.contrastRatio.AA_LARGE : this.contrastRatio.AA_NORMAL;
            
            if (contrast < requiredRatio) {
                this.issues.push({
                    type: 'contrast',
                    element: element.tagName.toLowerCase() + (element.className ? '.' + element.className.split(' ')[0] : ''),
                    contrast: contrast.toFixed(2),
                    required: requiredRatio,
                    text: element.textContent.substring(0, 50) + '...',
                    severity: contrast < 3 ? 'high' : 'medium'
                });
            }
        });
    }

    validateFocusIndicators() {
        const focusableElements = document.querySelectorAll(
            'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        focusableElements.forEach(element => {
            const styles = getComputedStyle(element, ':focus');
            const hasOutline = styles.outline !== 'none' && styles.outline !== '0px';
            const hasBoxShadow = styles.boxShadow !== 'none';
            const hasCustomFocus = element.classList.contains('focus-visible') || 
                                 element.hasAttribute('data-focus-visible');
            
            if (!hasOutline && !hasBoxShadow && !hasCustomFocus) {
                this.issues.push({
                    type: 'focus',
                    element: element.tagName.toLowerCase() + (element.className ? '.' + element.className.split(' ')[0] : ''),
                    text: element.textContent?.substring(0, 30) || element.getAttribute('aria-label') || 'No text',
                    severity: 'medium'
                });
            }
        });
    }

    validateAriaLabels() {
        // Check buttons without accessible names
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => {
            const hasText = button.textContent.trim().length > 0;
            const hasAriaLabel = button.hasAttribute('aria-label');
            const hasAriaLabelledby = button.hasAttribute('aria-labelledby');
            
            if (!hasText && !hasAriaLabel && !hasAriaLabelledby) {
                this.issues.push({
                    type: 'aria',
                    element: 'button.' + (button.className.split(' ')[0] || 'unnamed'),
                    issue: 'Missing accessible name',
                    severity: 'high'
                });
            }
        });

        // Check images without alt text
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (!img.hasAttribute('alt')) {
                this.issues.push({
                    type: 'aria',
                    element: 'img',
                    issue: 'Missing alt attribute',
                    src: img.src.substring(img.src.lastIndexOf('/') + 1),
                    severity: 'medium'
                });
            }
        });
    }

    validateKeyboardNavigation() {
        // Check for skip links
        const skipLink = document.querySelector('a[href="#main"], a[href="#content"], .skip-link');
        if (!skipLink) {
            this.issues.push({
                type: 'keyboard',
                element: 'document',
                issue: 'Missing skip navigation link',
                severity: 'medium'
            });
        }

        // Check for proper heading hierarchy
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        let lastLevel = 0;
        headings.forEach(heading => {
            const level = parseInt(heading.tagName.charAt(1));
            if (level > lastLevel + 1) {
                this.issues.push({
                    type: 'keyboard',
                    element: heading.tagName.toLowerCase(),
                    issue: `Heading level skipped (from h${lastLevel} to h${level})`,
                    text: heading.textContent.substring(0, 30),
                    severity: 'low'
                });
            }
            lastLevel = level;
        });
    }

    enhanceFocusIndicators() {
        const style = document.createElement('style');
        style.textContent = `
            /* Enhanced Focus Indicators */
            *:focus {
                outline: 2px solid #00ff9d !important;
                outline-offset: 2px !important;
                box-shadow: 0 0 0 4px rgba(0, 255, 157, 0.2) !important;
                transition: all 0.2s ease !important;
            }
            
            /* High contrast focus for buttons */
            button:focus,
            .btn:focus,
            .feature-card:focus {
                outline: 3px solid #00ff9d !important;
                outline-offset: 3px !important;
                box-shadow: 0 0 0 6px rgba(0, 255, 157, 0.3) !important;
                transform: scale(1.02) !important;
            }
            
            /* Focus for interactive elements */
            a:focus,
            [role="button"]:focus,
            [tabindex]:focus {
                outline: 2px solid #00ff9d !important;
                outline-offset: 2px !important;
                background: rgba(0, 255, 157, 0.1) !important;
            }
            
            /* Skip link enhancement */
            .skip-link {
                position: absolute;
                top: -40px;
                left: 6px;
                background: #00ff9d;
                color: #000;
                padding: 8px;
                text-decoration: none;
                border-radius: 4px;
                font-weight: bold;
                z-index: 10000;
                transition: top 0.3s ease;
            }
            
            .skip-link:focus {
                top: 6px;
            }
            
            /* High contrast mode support */
            @media (prefers-contrast: high) {
                * {
                    border-width: 2px !important;
                }
                
                *:focus {
                    outline-width: 4px !important;
                    box-shadow: 0 0 0 8px rgba(0, 255, 157, 0.5) !important;
                }
            }
            
            /* Reduced motion support */
            @media (prefers-reduced-motion: reduce) {
                *,
                *::before,
                *::after {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                }
            }
        `;
        document.head.appendChild(style);
    }

    addKeyboardNavigation() {
        // Add skip link if missing
        if (!document.querySelector('.skip-link')) {
            const skipLink = document.createElement('a');
            skipLink.href = '#main';
            skipLink.className = 'skip-link';
            skipLink.textContent = 'Skip to main content';
            document.body.insertBefore(skipLink, document.body.firstChild);
        }

        // Add main landmark if missing
        if (!document.querySelector('main, [role="main"]')) {
            const mainContent = document.querySelector('.hero-section, .main-content, #content');
            if (mainContent) {
                mainContent.setAttribute('role', 'main');
                mainContent.id = 'main';
            }
        }

        // Enhance keyboard navigation for custom elements
        document.addEventListener('keydown', (e) => {
            // Escape key to close modals
            if (e.key === 'Escape') {
                const modal = document.querySelector('.modal:not([style*="display: none"])');
                if (modal && typeof closeModal === 'function') {
                    closeModal();
                }
            }
            
            // Enter/Space for custom buttons
            if ((e.key === 'Enter' || e.key === ' ') && e.target.hasAttribute('role') && 
                e.target.getAttribute('role') === 'button') {
                e.preventDefault();
                e.target.click();
            }
        });
    }

    generateReport() {
        const report = {
            timestamp: new Date().toISOString(),
            totalIssues: this.issues.length,
            highSeverity: this.issues.filter(i => i.severity === 'high').length,
            mediumSeverity: this.issues.filter(i => i.severity === 'medium').length,
            lowSeverity: this.issues.filter(i => i.severity === 'low').length,
            issues: this.issues
        };

        console.log('♿ ACCESSIBILITY REPORT:', report);

        // Only show notifications in deep testing mode (URL parameter ?a11y=debug)
        const urlParams = new URLSearchParams(window.location.search);
        const debugMode = urlParams.get('a11y') === 'debug';
        
        if (window.GlobalErrorHandler && debugMode) {
            const message = `Accessibility scan: ${report.totalIssues} issues (${report.highSeverity} high)`;
            window.GlobalErrorHandler.reportError(message, 'accessibility');
        }

        return report;
    }

    // Public API for manual validation and testing
    validateElement(element) {
        const originalIssues = this.issues.length;
        
        // Run specific validations on element
        if (element.matches('p, h1, h2, h3, h4, h5, h6, span, a, button')) {
            // Color contrast check for this element
            const styles = getComputedStyle(element);
            // ... validation logic
        }
        
        return this.issues.slice(originalIssues);
    }

    // Manual accessibility test trigger for user control
    runManualTest() {
        this.issues = []; // Reset issues
        this.runValidation();
        
        if (window.GlobalErrorHandler) {
            const report = {
                totalIssues: this.issues.length,
                highSeverity: this.issues.filter(i => i.severity === 'high').length,
                mediumSeverity: this.issues.filter(i => i.severity === 'medium').length,
                lowSeverity: this.issues.filter(i => i.severity === 'low').length
            };
            
            const message = `Manual A11y Test: ${report.totalIssues} issues (${report.highSeverity} high, ${report.mediumSeverity} medium, ${report.lowSeverity} low)`;
            
            if (report.totalIssues > 0) {
                window.GlobalErrorHandler.reportError(message, 'accessibility');
            } else {
                window.GlobalErrorHandler.reportSuccess('Accessibility scan: No issues found!');
            }
        }
        
        return this.issues;
    }

    fixCommonIssues() {
        // Auto-fix some common accessibility issues
        let fixedCount = 0;

        // Add missing alt attributes to decorative images
        const decorativeImages = document.querySelectorAll('img:not([alt])');
        decorativeImages.forEach(img => {
            if (img.src.includes('icon') || img.src.includes('decoration')) {
                img.setAttribute('alt', '');
                fixedCount++;
            }
        });

        // Add aria-labels to icon buttons
        const iconButtons = document.querySelectorAll('button:empty, button:not(:has(text))');
        iconButtons.forEach(button => {
            if (!button.hasAttribute('aria-label')) {
                const className = button.className;
                if (className.includes('close')) button.setAttribute('aria-label', 'Close');
                else if (className.includes('menu')) button.setAttribute('aria-label', 'Menu');
                else if (className.includes('play')) button.setAttribute('aria-label', 'Play');
                else button.setAttribute('aria-label', 'Button');
                fixedCount++;
            }
        });

        console.log(`♿ AUTO-FIXED: ${fixedCount} accessibility issues`);
        
        // Silent auto-fixes - no notifications for production UX
        
        return fixedCount;
    }
}

// Initialize accessibility validator
window.AccessibilityValidator = new AccessibilityValidator();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AccessibilityValidator;
}
