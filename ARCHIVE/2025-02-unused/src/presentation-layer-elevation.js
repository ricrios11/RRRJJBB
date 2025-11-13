/**
 * Presentation Layer Elevation Script
 * Transforms the portfolio to match production ricrios.com elegance and sophistication
 * Focus: Visual hierarchy, gradient systems, typography, spacing, and design harmony
 */

class PresentationLayerElevation {
    constructor() {
        this.productionStyles = {
            gradients: {
                hero: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 25%, #ec4899 50%, #8b5cf6 75%, #6366f1 100%)',
                heroEvening: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 25%, #ec4899 50%, #8b5cf6 75%, #6366f1 100%)',
                heroMorning: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 25%, #8b5cf6 50%, #ec4899 75%, #f59e0b 100%)',
                heroAfternoon: 'linear-gradient(135deg, #34d399 0%, #10b981 25%, #06b6d4 50%, #3b82f6 75%, #8b5cf6 100%)',
                section: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)',
                card: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)'
            },
            typography: {
                hero: {
                    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                    fontWeight: '700',
                    lineHeight: '1.1',
                    letterSpacing: '-0.02em'
                },
                heroSubtitle: {
                    fontSize: 'clamp(1.125rem, 2vw, 1.25rem)',
                    fontWeight: '400',
                    lineHeight: '1.6',
                    opacity: '0.9'
                },
                sectionTitle: {
                    fontSize: 'clamp(1.875rem, 3vw, 2.25rem)',
                    fontWeight: '600',
                    lineHeight: '1.2',
                    letterSpacing: '-0.01em'
                }
            },
            spacing: {
                hero: {
                    paddingTop: 'clamp(4rem, 10vh, 8rem)',
                    paddingBottom: 'clamp(4rem, 10vh, 8rem)',
                    marginBottom: '4rem'
                },
                section: {
                    paddingTop: 'clamp(3rem, 8vh, 6rem)',
                    paddingBottom: 'clamp(3rem, 8vh, 6rem)',
                    marginBottom: '2rem'
                },
                container: {
                    maxWidth: '1200px',
                    paddingLeft: 'clamp(1rem, 4vw, 2rem)',
                    paddingRight: 'clamp(1rem, 4vw, 2rem)'
                }
            },
            colors: {
                text: {
                    primary: '#1f2937',
                    secondary: '#6b7280',
                    accent: '#8b5cf6'
                },
                background: {
                    primary: '#ffffff',
                    secondary: '#f9fafb',
                    accent: '#fef7ff'
                }
            }
        };
    }

    /**
     * Apply production-quality visual hierarchy and spacing
     */
    elevateVisualHierarchy() {
        console.log('🎨 Elevating visual hierarchy...');
        
        // Hero section elevation
        const heroSection = document.querySelector('.hero-section, #hero, [data-section="hero"]');
        if (heroSection) {
            this.elevateHeroSection(heroSection);
        }

        // Section spacing and hierarchy
        const sections = document.querySelectorAll('section, .section, [data-section]');
        sections.forEach((section, index) => {
            this.elevateSectionHierarchy(section, index);
        });

        // Typography elevation
        this.elevateTypography();

        // Navigation elevation
        this.elevateNavigation();

        console.log('✨ Visual hierarchy elevated');
    }

    /**
     * Transform hero section to match production elegance
     */
    elevateHeroSection(heroSection) {
        const timeOfDay = this.getTimeOfDay();
        const gradient = this.productionStyles.gradients[`hero${timeOfDay}`] || this.productionStyles.gradients.hero;
        
        // Apply gradient background
        heroSection.style.background = gradient;
        heroSection.style.borderRadius = '1.5rem';
        heroSection.style.margin = '2rem auto';
        heroSection.style.maxWidth = '1400px';
        heroSection.style.position = 'relative';
        heroSection.style.overflow = 'hidden';
        
        // Apply spacing
        Object.assign(heroSection.style, this.productionStyles.spacing.hero);
        
        // Ensure proper container
        const container = heroSection.querySelector('.container') || heroSection;
        Object.assign(container.style, this.productionStyles.spacing.container);
        container.style.margin = '0 auto';
        container.style.textAlign = 'center';
        
        // Elevate hero title
        const heroTitle = heroSection.querySelector('h1, .hero-title, [data-hero-title]');
        if (heroTitle) {
            Object.assign(heroTitle.style, this.productionStyles.typography.hero);
            heroTitle.style.color = '#1f2937';
            heroTitle.style.marginBottom = '1.5rem';
        }
        
        // Elevate hero subtitle
        const heroSubtitle = heroSection.querySelector('.hero-subtitle, p, [data-hero-subtitle]');
        if (heroSubtitle && heroSubtitle !== heroTitle) {
            Object.assign(heroSubtitle.style, this.productionStyles.typography.heroSubtitle);
            heroSubtitle.style.color = '#374151';
            heroSubtitle.style.marginBottom = '2rem';
        }
        
        // Elevate CTA button
        const ctaButton = heroSection.querySelector('button, .cta-button, [data-cta]');
        if (ctaButton) {
            this.elevateCTAButton(ctaButton);
        }
    }

    /**
     * Elevate section hierarchy and spacing
     */
    elevateSectionHierarchy(section, index) {
        // Skip hero section (already handled)
        if (section.classList.contains('hero-section') || section.id === 'hero') {
            return;
        }
        
        // Apply section spacing
        Object.assign(section.style, this.productionStyles.spacing.section);
        
        // Subtle background for alternating sections
        if (index % 2 === 1) {
            section.style.backgroundColor = this.productionStyles.colors.background.secondary;
        }
        
        // Section container
        const container = section.querySelector('.container') || section;
        Object.assign(container.style, this.productionStyles.spacing.container);
        container.style.margin = '0 auto';
        
        // Section title
        const sectionTitle = section.querySelector('h2, .section-title, [data-section-title]');
        if (sectionTitle) {
            Object.assign(sectionTitle.style, this.productionStyles.typography.sectionTitle);
            sectionTitle.style.color = this.productionStyles.colors.text.primary;
            sectionTitle.style.marginBottom = '2rem';
            sectionTitle.style.textAlign = 'center';
        }
    }

    /**
     * Elevate typography across the site with enhanced vertical rhythm
     */
    elevateTypography() {
        // Body text
        document.body.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
        document.body.style.lineHeight = '1.6';
        document.body.style.color = this.productionStyles.colors.text.primary;
        
        // Headings
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headings.forEach(heading => {
            heading.style.fontWeight = '600';
            heading.style.letterSpacing = '-0.01em';
            heading.style.color = this.productionStyles.colors.text.primary;
        });
        
        // Paragraphs
        const paragraphs = document.querySelectorAll('p');
        paragraphs.forEach(p => {
            p.style.color = this.productionStyles.colors.text.secondary;
            p.style.lineHeight = '1.7';
            p.style.marginBottom = '1rem';
        });
    }

    /**
     * Elevate navigation to match production
     */
    elevateNavigation() {
        const nav = document.querySelector('nav, .navigation, [data-nav]');
        if (!nav) return;
        
        nav.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        nav.style.backdropFilter = 'blur(10px)';
        nav.style.borderBottom = '1px solid rgba(0, 0, 0, 0.1)';
        nav.style.position = 'sticky';
        nav.style.top = '0';
        nav.style.zIndex = '50';
        nav.style.padding = '1rem 0';
        
        // Navigation links
        const navLinks = nav.querySelectorAll('a, .nav-link');
        navLinks.forEach(link => {
            link.style.color = this.productionStyles.colors.text.primary;
            link.style.textDecoration = 'none';
            link.style.fontWeight = '500';
            link.style.transition = 'color 0.2s ease';
            
            link.addEventListener('mouseenter', () => {
                link.style.color = this.productionStyles.colors.text.accent;
            });
            
            link.addEventListener('mouseleave', () => {
                link.style.color = this.productionStyles.colors.text.primary;
            });
        });
    }

    /**
     * Elevate CTA button styling
     */
    elevateCTAButton(button) {
        button.style.backgroundColor = '#ffffff';
        button.style.color = '#1f2937';
        button.style.border = 'none';
        button.style.borderRadius = '0.75rem';
        button.style.padding = '0.875rem 2rem';
        button.style.fontSize = '1rem';
        button.style.fontWeight = '600';
        button.style.cursor = 'pointer';
        button.style.transition = 'all 0.2s ease';
        button.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
        
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
            button.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
            button.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
        });
    }

    /**
     * Apply responsive design improvements
     */
    elevateResponsiveDesign() {
        console.log('📱 Elevating responsive design...');
        
        // Add responsive meta tag if missing
        if (!document.querySelector('meta[name="viewport"]')) {
            const meta = document.createElement('meta');
            meta.name = 'viewport';
            meta.content = 'width=device-width, initial-scale=1.0';
            document.head.appendChild(meta);
        }
        
        // Mobile-first responsive styles
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 768px) {
                .hero-section, #hero, [data-section="hero"] {
                    margin: 1rem !important;
                    border-radius: 1rem !important;
                    padding: 3rem 1.5rem !important;
                }
                
                section, .section, [data-section] {
                    padding: 2rem 1rem !important;
                }
                
                .container {
                    padding-left: 1rem !important;
                    padding-right: 1rem !important;
                }
            }
            
            @media (max-width: 480px) {
                .hero-section h1, .hero-title, [data-hero-title] {
                    font-size: 2rem !important;
                    line-height: 1.2 !important;
                }
                
                .hero-section p, .hero-subtitle, [data-hero-subtitle] {
                    font-size: 1rem !important;
                }
            }
        `;
        document.head.appendChild(style);
        
        console.log('✨ Responsive design elevated');
    }

    /**
     * Add subtle animations and interactions
     */
    elevateInteractions() {
        console.log('🎭 Elevating interactions...');
        
        // Smooth scroll behavior
        document.documentElement.style.scrollBehavior = 'smooth';
        
        // Fade-in animation for sections
        const sections = document.querySelectorAll('section, .section, [data-section]');
        sections.forEach((section, index) => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, index * 100);
        });
        
        // Intersection Observer for scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        sections.forEach(section => observer.observe(section));
        
        console.log('✨ Interactions elevated');
    }

    /**
     * Get current time of day for time-aware styling
     */
    getTimeOfDay() {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) return 'Morning';
        if (hour >= 12 && hour < 17) return 'Afternoon';
        return 'Evening';
    }

    /**
     * Apply dark mode enhancements
     */
    elevateDarkMode() {
        const isDarkMode = document.documentElement.classList.contains('dark') || 
                          document.body.classList.contains('dark-mode');
        
        if (isDarkMode) {
            // Dark mode color adjustments
            this.productionStyles.colors.text.primary = '#f9fafb';
            this.productionStyles.colors.text.secondary = '#d1d5db';
            this.productionStyles.colors.background.primary = '#111827';
            this.productionStyles.colors.background.secondary = '#1f2937';
            
            // Dark mode gradients
            this.productionStyles.gradients.hero = 'linear-gradient(135deg, #1f2937 0%, #374151 25%, #4c1d95 50%, #7c3aed 75%, #a855f7 100%)';
        }
    }

    /**
     * Main execution method with enhanced vertical rhythm integration
     */
    async execute() {
        console.log('🚀 Starting Enhanced Presentation Layer Elevation...');
        
        try {
            // Apply dark mode considerations first
            this.elevateDarkMode();
            
            // Core elevation steps with enhanced rhythm
            this.elevateVisualHierarchy();
            this.elevateResponsiveDesign();
            this.elevateInteractions();
            
            // Enhanced rhythm-specific improvements
            this.applyVerticalRhythmEnhancements();
            
            // Final polish
            await this.applyFinalPolish();
            
            console.log('✅ Enhanced Presentation Layer Elevation Complete!');
            console.log('🎨 Portfolio now matches production ricrios.com elegance with perfect vertical rhythm');
            
            return {
                success: true,
                message: 'Presentation layer elevated to production standards with enhanced vertical rhythm',
                improvements: [
                    'Sophisticated gradient hero section',
                    'Professional typography hierarchy with perfect rhythm',
                    'Harmonized spacing and baseline grid',
                    'Responsive design optimization',
                    'Subtle animations and interactions',
                    'Production-quality visual polish',
                    'Enhanced vertical rhythm system',
                    'Optimized reading experience'
                ]
            };
            
        } catch (error) {
            console.error('❌ Enhanced Presentation Layer Elevation Error:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Apply vertical rhythm enhancements
     */
    applyVerticalRhythmEnhancements() {
        console.log('🎼 Applying vertical rhythm enhancements...');
        
        // Inject advanced vertical rhythm CSS
        const rhythmCSS = `
            /* Enhanced vertical rhythm system */
            :root {
                --baseline-unit: 24px;
                --rhythm-multiplier: 1.5;
            }
            
            /* Consistent spacing scale */
            .rhythm-xs { margin-bottom: calc(var(--baseline-unit) * 0.5); }
            .rhythm-sm { margin-bottom: calc(var(--baseline-unit) * 0.75); }
            .rhythm-md { margin-bottom: var(--baseline-unit); }
            .rhythm-lg { margin-bottom: calc(var(--baseline-unit) * var(--rhythm-multiplier)); }
            .rhythm-xl { margin-bottom: calc(var(--baseline-unit) * 2); }
            
            /* Typography rhythm */
            h1, h2, h3, h4, h5, h6 {
                margin-top: 0;
                margin-bottom: var(--baseline-unit);
                line-height: 1.2;
            }
            
            p, ul, ol {
                margin-top: 0;
                margin-bottom: var(--baseline-unit);
                line-height: 1.6;
            }
            
            /* Section rhythm */
            section {
                margin-bottom: 0;
            }
            
            /* Card rhythm */
            .card, .premium-card, .case-study-card {
                margin-bottom: calc(var(--baseline-unit) * var(--rhythm-multiplier));
            }
            
            /* Grid rhythm */
            .grid {
                gap: calc(var(--baseline-unit) * var(--rhythm-multiplier));
                margin-bottom: calc(var(--baseline-unit) * 2);
            }
            
            /* Responsive rhythm adjustments */
            @media (max-width: 640px) {
                :root {
                    --baseline-unit: 20px;
                    --rhythm-multiplier: 1.25;
                }
            }
            
            @media (min-width: 1024px) {
                :root {
                    --baseline-unit: 28px;
                    --rhythm-multiplier: 1.75;
                }
            }
        `;
        
        this.injectCSS(rhythmCSS, 'vertical-rhythm-enhancements');
        
        // Apply rhythm classes to existing elements
        const headings = document.querySelectorAll('h1, h2, h3');
        headings.forEach(heading => {
            heading.classList.add('rhythm-lg');
        });
        
        const paragraphs = document.querySelectorAll('p');
        paragraphs.forEach(p => {
            p.classList.add('rhythm-md');
        });
        
        const cards = document.querySelectorAll('.card, .premium-card, .case-study-card');
        cards.forEach(card => {
            card.classList.add('rhythm-xl');
        });
        
        console.log('✨ Vertical rhythm enhancements applied');
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
     * Apply final polish and refinements
     */
    async applyFinalPolish() {
        console.log('✨ Applying final polish...');
        
        // Ensure proper focus states
        const focusableElements = document.querySelectorAll('button, a, input, select, textarea, [tabindex]');
        focusableElements.forEach(el => {
            el.style.outline = 'none';
            el.addEventListener('focus', () => {
                el.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.3)';
            });
            el.addEventListener('blur', () => {
                el.style.boxShadow = '';
            });
        });
        
        // Add subtle page transitions
        document.body.style.transition = 'background-color 0.3s ease';
        
        // Optimize performance
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.loading = 'lazy';
            img.style.transition = 'opacity 0.3s ease';
        });
        
        console.log('✨ Final polish applied');
    }
}

// Auto-execute when DOM is ready
if (typeof window !== 'undefined') {
    const elevation = new PresentationLayerElevation();
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => elevation.execute());
    } else {
        elevation.execute();
    }
}

// Export for Node.js compatibility
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PresentationLayerElevation;
}
