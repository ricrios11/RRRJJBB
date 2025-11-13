import { TimeAwareText } from './TimeAwareContent';
import { MobileAnimation, TouchOptimized } from './MobileOptimization';

export function MobileFooter() {
  const footerLinks = [
    {
      category: "Connect with Ric",
      links: [
        { label: "LinkedIn: @itsricrios", href: "https://linkedin.com/in/itsricrios" },
        { label: "Instagram: @itsricrios", href: "https://instagram.com/itsricrios" },
        { label: "Speaking Engagements", href: "#" }
      ]
    },
    {
      category: "Strategic Thinking",
      links: [
        { label: "AI Integration at Scale", href: "#" },
        { label: "Design Leadership Methodology", href: "#" },
        { label: "Future-State Experience Design", href: "#" },
        { label: "Systems Architecture Thinking", href: "#" }
      ]
    }
  ];

  return (
    <footer className="border-t border-border bg-muted transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <MobileAnimation animation="fadeUp">
          {/* Mobile: Single column, Tablet+: Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
            {/* Contact Links */}
            {footerLinks.map((section, index) => (
              <div key={section.category}>
                <h3 className="text-base sm:text-lg mb-4 sm:mb-6 text-foreground">
                  {section.category}
                </h3>
                <div className="space-y-2 sm:space-y-3">
                  {section.links.map((link) => (
                    <TouchOptimized key={link.label}>
                      <a
                        href={link.href}
                        target={link.href.startsWith('http') ? '_blank' : undefined}
                        rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="block text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors py-2 px-2 -mx-2 rounded-lg hover:bg-accent"
                      >
                        {link.label}
                      </a>
                    </TouchOptimized>
                  ))}
                </div>
              </div>
            ))}

            {/* Design Operating System Message */}
            <div>
              <h3 className="text-base sm:text-lg mb-4 sm:mb-6 text-foreground">
                Design Operating System
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4 leading-relaxed">
                <TimeAwareText
                  morning="Morning discipline: Deep mastery applied with systematic precision."
                  afternoon="Midday momentum: Strategic innovation at the intersection of craft and technology."
                  evening="Evening reflection: Thirty years of proven methodology, always evolving for tomorrow."
                />
              </p>
              <div className="text-xs sm:text-sm text-muted-foreground/80">
                World-class quality. Authentically mine. Future-aware.
              </div>
            </div>
          </div>
        </MobileAnimation>
        
        {/* Copyright */}
        <div className="border-t border-border mt-8 sm:mt-12 pt-6 sm:pt-8 text-center">
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            &copy; 2025 Ric Rios. Design Operating System crafted with disciplined innovation and forward-looking curiosity.
          </p>
        </div>
      </div>
    </footer>
  );
}