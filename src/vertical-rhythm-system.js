/**
 * Vertical Rhythm System
 * Advanced vertical rhythm and spacing harmonization for production-quality design
 * Ensures consistent baseline grid, typography hierarchy, and visual flow
 */

class VerticalRhythmSystem {
    constructor() {
        this.baseLineHeight = 1.6;
        this.baseUnit = 24; // 24px baseline unit for rhythm
        this.typographyScale = {
            xs: { size: '0.75rem', lineHeight: 1.4, marginBottom: '0.5rem' },
            sm: { size: '0.875rem', lineHeight: 1.5, marginBottom: '0.75rem' },
            base: { size: '1rem', lineHeight: 1.6, marginBottom: '1rem' },
            lg: { size: '1.125rem', lineHeight: 1.6, marginBottom: '1.25rem' },
            xl: { size: '1.25rem', lineHeight: 1.5, marginBottom: '1.5rem' },
            '2xl': { size: '1.5rem', lineHeight: 1.4, marginBottom: '1.75rem' },
            '3xl': { size: '1.875rem', lineHeight: 1.3, marginBottom: '2rem' },
            '4xl': { size: '2.25rem', lineHeight: 1.2, marginBottom: '2.5rem' },
            '5xl': { size: '3rem', lineHeight: 1.1, marginBottom: '3rem' }
        };
        
        this.spacingSystem = {
            section: {
                hero: { top: '6rem', bottom: '6rem' },
                primary: { top: '4rem', bottom: '4rem' },
                secondary: { top: '3rem', bottom: '3rem' },
                compact: { top: '2rem', bottom: '2rem' }
            },
            content: {
                paragraph: '1.5rem',
                list: '1.25rem',
                heading: '2rem',
                card: '1.5rem'
            },
            responsive: {
                mobile: { multiplier: 0.75 },
                tablet: { multiplier: 0.875 },
                desktop: { multiplier: 1 },
                large: { multiplier: 1.125 }
            }
        };
        
        this.fixes = [];
        this.improvements = [];
    }

    /**
     * Main execution method for vertical rhythm harmonization
     */
    async execute() {
        console.log('🎼 Starting Vertical Rhythm System...');
        
        try {
            // Core rhythm fixes
            this.harmonizeTypography();
            this.harmonizeSectionSpacing();
            this.harmonizeContentSpacing();
            this.optimizeResponsiveRhythm();
            this.fixSpecificRhythmIssues();
            
            // Advanced rhythm enhancements
            this.implementBaselineGrid();
            this.enhanceVisualFlow();
            this.optimizeReadingExperience();
            
            console.log('✅ Vertical Rhythm System Complete!');
            return {
                success: true,
                fixes: this.fixes.length,
                improvements: this.improvements.length,
                message: 'Vertical rhythm harmonized to production standards'
            };
            
        } catch (error) {
            console.error('❌ Vertical Rhythm System Error:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Harmonize typography hierarchy and spacing
     */
    harmonizeTypography() {
        console.log('📝 Harmonizing typography...');
        
        // Fix heading hierarchy and spacing
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headings.forEach(heading => {
            const level = parseInt(heading.tagName.charAt(1));
            const scale = this.getTypographyScale(level);
            
            // Apply consistent typography scale
            heading.style.fontSize = scale.size;
            heading.style.lineHeight = scale.lineHeight;
            heading.style.marginBottom = scale.marginBottom;
            heading.style.marginTop = level === 1 ? '0' : `${1.5 + (level * 0.25)}rem`;
            
            // Ensure proper font weight hierarchy
            const weights = { 1: '700', 2: '600', 3: '600', 4: '500', 5: '500', 6: '500' };
            heading.style.fontWeight = weights[level];
            
            // Letter spacing for larger headings
            if (level <= 2) {
                heading.style.letterSpacing = '-0.02em';
            }
        });

        // Fix paragraph spacing and line height
        const paragraphs = document.querySelectorAll('p');
        paragraphs.forEach(p => {
            p.style.lineHeight = this.baseLineHeight;
            p.style.marginBottom = this.spacingSystem.content.paragraph;
            
            // Ensure proper text size
            if (!p.style.fontSize && !p.className.includes('text-')) {
                p.style.fontSize = this.typographyScale.base.size;
            }
        });

        // Fix list spacing
        const lists = document.querySelectorAll('ul, ol');
        lists.forEach(list => {
            list.style.marginBottom = this.spacingSystem.content.list;
            
            const listItems = list.querySelectorAll('li');
            listItems.forEach(li => {
                li.style.marginBottom = '0.5rem';
                li.style.lineHeight = this.baseLineHeight;
            });
        });

        this.fixes.push('Typography hierarchy and spacing harmonized');
    }

    /**
     * Get typography scale based on heading level
     */
    getTypographyScale(level) {
        const scales = {
            1: this.typographyScale['4xl'],
            2: this.typographyScale['3xl'],
            3: this.typographyScale['2xl'],
            4: this.typographyScale.xl,
            5: this.typographyScale.lg,
            6: this.typographyScale.base
        };
        return scales[level] || this.typographyScale.base;
    }

    /**
     * Harmonize section spacing for consistent rhythm
     */
    harmonizeSectionSpacing() {
        console.log('📐 Harmonizing section spacing...');
        
        // Hero section special treatment
        const heroSection = document.querySelector('.hero-section, #hero, [data-section="hero"]');
        if (heroSection) {
            heroSection.style.paddingTop = this.spacingSystem.section.hero.top;
            heroSection.style.paddingBottom = this.spacingSystem.section.hero.bottom;
            heroSection.style.marginBottom = '0';
        }

        // Main sections
        const sections = document.querySelectorAll('section:not(.hero-section), .section');
        sections.forEach((section, index) => {
            const isFirstSection = index === 0 && !heroSection;
            const isLastSection = index === sections.length - 1;
            
            // Determine section type based on content
            const sectionType = this.determineSectionType(section);
            const spacing = this.spacingSystem.section[sectionType];
            
            section.style.paddingTop = isFirstSection ? spacing.top : spacing.top;
            section.style.paddingBottom = isLastSection ? spacing.bottom : spacing.bottom;
            
            // Ensure consistent section margins
            if (index > 0) {
                section.style.marginTop = '0';
            }
        });

        // Fix container spacing
        const containers = document.querySelectorAll('.container, .max-w-6xl, .max-w-4xl');
        containers.forEach(container => {
            container.style.paddingLeft = 'clamp(1rem, 4vw, 2rem)';
            container.style.paddingRight = 'clamp(1rem, 4vw, 2rem)';
        });

        this.fixes.push('Section spacing harmonized with consistent rhythm');
    }

    /**
     * Determine section type for appropriate spacing
     */
    determineSectionType(section) {
        const content = section.textContent.toLowerCase();
        const hasCards = section.querySelectorAll('.card, .premium-card').length > 0;
        const hasGrid = section.classList.contains('grid') || section.querySelector('.grid');
        
        if (content.includes('hero') || section.classList.contains('hero')) {
            return 'hero';
        } else if (hasCards || hasGrid) {
            return 'primary';
        } else if (section.children.length <= 2) {
            return 'compact';
        } else {
            return 'secondary';
        }
    }

    /**
     * Harmonize content spacing within sections
     */
    harmonizeContentSpacing() {
        console.log('📄 Harmonizing content spacing...');
        
        // Fix card spacing
        const cards = document.querySelectorAll('.card, .premium-card, .case-study-card');
        cards.forEach(card => {
            card.style.marginBottom = this.spacingSystem.content.card;
            
            // Internal card spacing
            const cardContent = card.children;
            Array.from(cardContent).forEach((child, index) => {
                if (child.tagName === 'P' && index > 0) {
                    child.style.marginTop = '1rem';
                }
            });
        });

        // Fix grid spacing
        const grids = document.querySelectorAll('.grid');
        grids.forEach(grid => {
            grid.style.gap = 'clamp(1.5rem, 3vw, 2rem)';
            grid.style.marginBottom = '2rem';
        });

        // Fix button spacing
        const buttons = document.querySelectorAll('button, .btn');
        buttons.forEach(button => {
            button.style.marginTop = '1rem';
            button.style.marginBottom = '0.5rem';
        });

        this.fixes.push('Content spacing harmonized within sections');
    }

    /**
     * Optimize responsive rhythm across breakpoints
     */
    optimizeResponsiveRhythm() {
        console.log('📱 Optimizing responsive rhythm...');
        
        // Create responsive typography CSS
        const responsiveCSS = `
            @media (max-width: 640px) {
                h1 { font-size: 2rem; line-height: 1.2; margin-bottom: 1.5rem; }
                h2 { font-size: 1.75rem; line-height: 1.3; margin-bottom: 1.25rem; }
                h3 { font-size: 1.5rem; line-height: 1.4; margin-bottom: 1rem; }
                
                section { padding-top: 2rem; padding-bottom: 2rem; }
                .hero-section { padding-top: 3rem; padding-bottom: 3rem; }
                
                p { margin-bottom: 1rem; }
                .grid { gap: 1rem; }
            }
            
            @media (min-width: 641px) and (max-width: 1024px) {
                h1 { font-size: 2.5rem; line-height: 1.15; margin-bottom: 2rem; }
                h2 { font-size: 2rem; line-height: 1.25; margin-bottom: 1.75rem; }
                h3 { font-size: 1.75rem; line-height: 1.35; margin-bottom: 1.5rem; }
                
                section { padding-top: 3rem; padding-bottom: 3rem; }
                .hero-section { padding-top: 4rem; padding-bottom: 4rem; }
                
                .grid { gap: 1.5rem; }
            }
            
            @media (min-width: 1025px) {
                h1 { font-size: 3rem; line-height: 1.1; margin-bottom: 2.5rem; }
                h2 { font-size: 2.25rem; line-height: 1.2; margin-bottom: 2rem; }
                h3 { font-size: 1.875rem; line-height: 1.3; margin-bottom: 1.75rem; }
                
                section { padding-top: 4rem; padding-bottom: 4rem; }
                .hero-section { padding-top: 6rem; padding-bottom: 6rem; }
                
                .grid { gap: 2rem; }
            }
        `;
        
        this.injectCSS(responsiveCSS, 'responsive-rhythm');
        this.improvements.push('Responsive rhythm optimized across all breakpoints');
    }

    /**
     * Fix specific rhythm issues identified in the current build
     */
    fixSpecificRhythmIssues() {
        console.log('🔧 Fixing specific rhythm issues...');
        
        // Fix hero section spacing inconsistencies
        const heroTitle = document.querySelector('.hero-section h1, #hero h1');
        if (heroTitle) {
            heroTitle.style.marginBottom = '1.5rem';
            heroTitle.style.lineHeight = '1.1';
        }

        const heroSubtitle = document.querySelector('.hero-section p, #hero p');
        if (heroSubtitle) {
            heroSubtitle.style.marginBottom = '2rem';
            heroSubtitle.style.fontSize = '1.125rem';
            heroSubtitle.style.lineHeight = '1.6';
        }

        // Fix case study card spacing
        const caseStudyCards = document.querySelectorAll('.case-study-card');
        caseStudyCards.forEach(card => {
            card.style.marginBottom = '2rem';
            
            const title = card.querySelector('h3');
            if (title) {
                title.style.marginBottom = '0.75rem';
                title.style.lineHeight = '1.3';
            }
            
            const description = card.querySelector('p');
            if (description) {
                description.style.marginBottom = '1rem';
                description.style.lineHeight = '1.6';
            }
        });

        // Fix footer spacing
        const footer = document.querySelector('footer');
        if (footer) {
            footer.style.marginTop = '4rem';
            footer.style.paddingTop = '2rem';
            footer.style.paddingBottom = '2rem';
        }

        // Fix modal content spacing
        const modalContent = document.querySelector('#modal-content');
        if (modalContent) {
            modalContent.style.padding = '2rem';
            modalContent.style.lineHeight = '1.6';
        }

        this.fixes.push('Specific rhythm issues resolved');
    }

    /**
     * Implement baseline grid system
     */
    implementBaselineGrid() {
        console.log('📏 Implementing baseline grid...');
        
        const baselineCSS = `
            .baseline-grid {
                background-image: linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px);
                background-size: 100% ${this.baseUnit}px;
                background-position: 0 0;
            }
            
            .baseline-debug {
                position: relative;
            }
            
            .baseline-debug::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-image: linear-gradient(to bottom, rgba(255,0,0,0.1) 1px, transparent 1px);
                background-size: 100% ${this.baseUnit}px;
                pointer-events: none;
                z-index: 9999;
            }
            
            /* Ensure all text aligns to baseline */
            * {
                line-height: ${this.baseLineHeight};
            }
            
            h1, h2, h3, h4, h5, h6 {
                margin-top: 0;
                margin-bottom: ${this.baseUnit / 16}rem;
            }
            
            p, ul, ol {
                margin-top: 0;
                margin-bottom: ${this.baseUnit / 16}rem;
            }
        `;
        
        this.injectCSS(baselineCSS, 'baseline-grid');
        this.improvements.push('Baseline grid system implemented');
    }

    /**
     * Enhance visual flow and reading experience
     */
    enhanceVisualFlow() {
        console.log('🌊 Enhancing visual flow...');
        
        // Add subtle rhythm indicators
        const sections = document.querySelectorAll('section');
        sections.forEach((section, index) => {
            section.style.position = 'relative';
            
            // Add subtle visual rhythm cues
            if (index > 0) {
                section.style.borderTop = '1px solid rgba(0,0,0,0.05)';
                section.style.marginTop = '0';
            }
        });

        // Enhance reading rhythm
        const textBlocks = document.querySelectorAll('p, li');
        textBlocks.forEach(block => {
            const wordCount = block.textContent.split(' ').length;
            
            // Adjust line height based on content length
            if (wordCount > 50) {
                block.style.lineHeight = '1.7';
            } else if (wordCount > 20) {
                block.style.lineHeight = '1.6';
            } else {
                block.style.lineHeight = '1.5';
            }
        });

        this.improvements.push('Visual flow and reading experience enhanced');
    }

    /**
     * Optimize reading experience with advanced typography
     */
    optimizeReadingExperience() {
        console.log('👁️ Optimizing reading experience...');
        
        const readingCSS = `
            /* Optimize text rendering */
            body {
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
                text-rendering: optimizeLegibility;
            }
            
            /* Improve paragraph spacing */
            p + p {
                margin-top: 1.5rem;
            }
            
            /* Enhance list readability */
            ul, ol {
                padding-left: 1.5rem;
            }
            
            li {
                margin-bottom: 0.5rem;
            }
            
            li:last-child {
                margin-bottom: 0;
            }
            
            /* Optimize heading spacing */
            h1 + p, h2 + p, h3 + p {
                margin-top: 0.5rem;
            }
            
            /* Improve quote and emphasis spacing */
            blockquote {
                margin: 2rem 0;
                padding: 1rem 1.5rem;
                border-left: 4px solid var(--primary);
                font-style: italic;
                line-height: 1.7;
            }
            
            /* Enhance code block spacing */
            pre, code {
                font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
                line-height: 1.5;
            }
            
            pre {
                margin: 1.5rem 0;
                padding: 1rem;
                border-radius: 0.5rem;
                overflow-x: auto;
            }
        `;
        
        this.injectCSS(readingCSS, 'reading-optimization');
        this.improvements.push('Reading experience optimized with advanced typography');
    }

    /**
     * Inject CSS into the document
     */
    injectCSS(css, id) {
        const existingStyle = document.getElementById(id);
        if (existingStyle) {
            existingStyle.remove();
        }
        
        const style = document.createElement('style');
        style.id = id;
        style.textContent = css;
        document.head.appendChild(style);
    }

    /**
     * Generate comprehensive rhythm report
     */
    generateReport() {
        return {
            timestamp: new Date().toISOString(),
            summary: {
                fixes_applied: this.fixes.length,
                improvements_made: this.improvements.length,
                baseline_unit: this.baseUnit,
                line_height: this.baseLineHeight
            },
            fixes: this.fixes,
            improvements: this.improvements,
            recommendations: [
                'Consider implementing a design token system for consistent spacing',
                'Use CSS custom properties for dynamic rhythm adjustments',
                'Implement automated rhythm testing in your build process',
                'Consider using a typography scale generator for future projects'
            ]
        };
    }
}

// Auto-execute when DOM is ready
if (typeof window !== 'undefined') {
    const rhythmSystem = new VerticalRhythmSystem();
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => rhythmSystem.execute());
    } else {
        rhythmSystem.execute();
    }
}

// Export for Node.js compatibility
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VerticalRhythmSystem;
}
