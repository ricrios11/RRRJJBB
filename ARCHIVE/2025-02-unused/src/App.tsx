import React, { useEffect, useCallback } from "react";
import { UnifiedHeader } from "./components/UnifiedHeader";
import { UnifiedPortfolioSections } from "./components/UnifiedPortfolioSections";
import { MobileFooter } from "./components/MobileFooter";
import { TimeAwareText } from "./components/TimeAwareContent";
import { DarkModeProvider } from "./components/DarkModeProvider";
import { KonamiCodeProvider } from "./components/KonamiCodeContext";
import { useBulletproofButtonNavigation } from "./components/BulletproofNavigation";
import {
  MobileAnimation,
  useDeviceCapabilities,
  usePerformanceMonitor,
} from "./components/MobileOptimization";

// EMERGENCY BRIDGE: Figma Make Compatibility Layer
// This component bridges the gap between modern React and the bundle.js builds

// Clean App content component using only unified components
function AppContent() {
  const capabilities = useDeviceCapabilities();
  const performance = usePerformanceMonitor();
  const { navigateToSection } =
    useBulletproofButtonNavigation();

  // Professional CSS enhancements for production quality
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      /* 🎯 PROFESSIONAL PRODUCTION ENHANCEMENTS */
      .featured-card {
        border-radius: var(--radius-lg) !important;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        will-change: transform, border-radius;
        backface-visibility: hidden;
      }
      
      .featured-card:hover {
        border-radius: var(--radius-lg) !important;
        transform: translateY(-6px) scale(1.02);
        box-shadow: 0 32px 64px -12px rgba(139, 92, 246, 0.4);
      }
      
      /* Bulletproof text readability */
      .featured-card, .featured-card * {
        color: white !important;
      }
      
      /* Nuclear-strength badge contrast fixes */
      .badge-bulletproof {
        background-color: #000000 !important;
        color: #ffffff !important;
        border: 1px solid rgba(0,0,0,0.2) !important;
        font-weight: 500 !important;
      }
      
      .dark .badge-bulletproof {
        background-color: #ffffff !important;
        color: #000000 !important;
        border: 1px solid rgba(255,255,255,0.2) !important;
      }
      
      .badge-bulletproof:hover {
        background-color: #1a1a1a !important;
        color: #ffffff !important;
      }
      
      .dark .badge-bulletproof:hover {
        background-color: #f0f0f0 !important;
        color: #000000 !important;
      }
      
      /* Production quality complete */
    `;
    document.head.appendChild(style);
    
    // Cleanup on unmount
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  // Development performance monitoring
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log(
        "🔧 TechOS Device Capabilities:",
        capabilities,
      );
      console.log(
        "📊 TechOS Performance Metrics:",
        performance,
      );
      console.log("🎯 PROFESSIONAL BUILD: Production quality enhancements applied");
      console.log("💀 NUCLEAR-STRENGTH: Bulletproof badge contrast active");
    }
  }, [
    capabilities.isMobile,
    capabilities.connectionSpeed,
    performance.fps,
  ]);

  // Single primary navigation CTA
  const handleExploreWork = useCallback(async () => {
    console.log("🎯 TechOS: Explore Work navigation initiated");
    await navigateToSection("case-studies", { offset: 80 });
  }, [navigateToSection]);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <UnifiedHeader />

      {/* Hero Section - Strategic Leadership Positioning */}
      <section className="hero-gradient container mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-24 text-center">
        <div className="max-w-5xl mx-auto">
          <MobileAnimation animation="fadeUp">
            <div className="text-4xl sm:text-5xl mb-4 sm:mb-6 animate-float">
              🎛️
            </div>
            <h1 className="hero-title text-premium-2xl mb-6 sm:mb-8 tracking-tight leading-tight">
              <TimeAwareText
                morning="Design Leadership for Tomorrow's Builders"
                afternoon="Innovation at the Intersection of Mastery"
                evening="Earned Wisdom Applied to Future-State Design"
              />
            </h1>
          </MobileAnimation>

          <MobileAnimation animation="fadeUp" delay={200}>
            <p className="text-premium-lg text-muted-foreground mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
              <TimeAwareText
                morning="When ambitious leaders need disciplined design innovation that bridges craft mastery with emerging technology—delivering standards that define tomorrow."
                afternoon="Design leadership distilled into proven methodologies. Creative excellence guided by disciplined precision that transforms outcomes."
                evening="Where timeless principles meet forward-looking innovation. Earned wisdom applied to emerging technologies for lasting impact."
              />
            </p>
          </MobileAnimation>

          <MobileAnimation animation="fadeUp" delay={300}>
            <p className="text-base sm:text-lg text-muted-foreground/80 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
              <TimeAwareText
                morning="For leaders who understand exceptional design isn't decoration—it's competitive advantage. Strategic, disciplined, relentlessly forward-looking."
                afternoon="Calm authority through applied mastery. Rigor that remains human and creatively inspiring. Results that speak louder than trends."
                evening="Authentically mine, never generic. World-class quality honoring both heritage and possibility. Mastery meets relentless curiosity."
              />
            </p>
          </MobileAnimation>

          <MobileAnimation animation="fadeUp" delay={400}>
            {/* Single focused CTA */}
            <div className="flex justify-center">
              <button
                onClick={handleExploreWork}
                className="btn-premium px-8 sm:px-10 py-4 sm:py-5 rounded-lg text-base sm:text-lg focus-premium mobile-optimized"
              >
                <TimeAwareText
                  morning="Begin with proven mastery"
                  afternoon="Discover disciplined innovation"
                  evening="Access proven methodologies"
                />
              </button>
            </div>
          </MobileAnimation>

          <MobileAnimation animation="fadeUp" delay={600}>
            <div className="mt-12 sm:mt-16 text-center">
              <div className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs sm:text-sm text-muted-foreground font-medium">
                <TimeAwareText
                  morning="Leadership • Innovation • Future-Aware • Authentically Mine"
                  afternoon="Applied Mastery • Strategic Thinking • Creative Excellence • Disciplined Precision"
                  evening="Timeless Principles • Forward-Looking • World-Class Quality • Earned Authority"
                />
              </div>
            </div>
          </MobileAnimation>

          {/* Subtle hint about hidden features */}
          <MobileAnimation animation="fadeUp" delay={800}>
            <div className="mt-8 text-center">
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-muted-foreground/40 to-transparent mx-auto mb-4"></div>
              <p className="text-xs text-muted-foreground/60 font-mono">
                <TimeAwareText
                  morning="⬆⬆⬇⬇⬅➡⬅➡🅱🅰 — For visionaries who remember the classics"
                  afternoon="Curious leaders may discover hidden innovations below..."
                  evening="Some wisdom reveals itself to the persistent..."
                />
              </p>
            </div>
          </MobileAnimation>
        </div>
      </section>

      {/* Scroll Indicator */}
      <MobileAnimation animation="fadeIn" delay={1000}>
        <div className="text-center pb-8 sm:pb-12 hidden sm:block">
          <div className="inline-flex flex-col items-center space-y-2 text-muted-foreground">
            <span className="text-sm">
              <TimeAwareText
                morning="Explore the foundation"
                afternoon="Discover the approach"
                evening="Navigate earned wisdom"
              />
            </span>
            <div className="w-px h-6 sm:h-8 bg-border animate-pulse"></div>
          </div>
        </div>
      </MobileAnimation>

      {/* Main Content */}
      <main className="container mx-auto pb-16 sm:pb-20">
        <UnifiedPortfolioSections />
      </main>

      <MobileFooter />

      {/* Development Performance Indicator */}
      {process.env.NODE_ENV === "development" &&
        capabilities.isMobile && (
          <div className="fixed bottom-4 left-4 bg-primary/90 text-primary-foreground text-xs p-2 rounded z-50 font-mono">
            TechOS FPS: {performance.fps} |{" "}
            {capabilities.connectionSpeed}
          </div>
        )}
    </div>
  );
}

// Main App component with all providers
function App() {
  return (
    <DarkModeProvider>
      <KonamiCodeProvider>
        <AppContent />
      </KonamiCodeProvider>
    </DarkModeProvider>
  );
}

export default App;