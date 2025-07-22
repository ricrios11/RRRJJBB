import React, { useMemo } from "react";
import {
  TimeAwareText,
  TimeAwareGreeting,
} from "./TimeAwareContent";
import { KonamiCode } from "./KonamiCode";
import { CaseStudies } from "./CaseStudies";
import { EveningArchiveModal } from "./EveningArchiveModal";
import {
  MobileAnimation,
  LazyComponent,
  TouchOptimized,
  useDeviceCapabilities,
} from "./MobileOptimization";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

// Enhanced strategic positioning data
const STRATEGIC_PILLARS = [
  {
    title: "Leadership Architecture",
    description:
      "I see the architecture others miss—connecting design, technology, culture, and business outcomes into coherent strategies that create sustainable advantage.",
    delay: 100,
  },
  {
    title: "Earned Authority",
    description:
      "Decades of real-world integration. Every major design book read and applied. Wisdom earned through transforming ambitious vision into measurable results.",
    delay: 150,
  },
  {
    title: "Future-State Innovation",
    description:
      "While others optimize for yesterday's metrics, I architect tomorrow's realities. Emerging technologies guided by timeless principles, creating lasting impact.",
    delay: 200,
  },
  {
    title: "Disciplined Excellence",
    description:
      "World-class quality through proven methodologies. Rigor that remains human and creatively inspiring. Results that speak louder than trends.",
    delay: 250,
  },
];

const STRATEGIC_CAPABILITIES = [
  {
    icon: "🧠",
    title: "Behavioral Architecture",
    description:
      "User psychology combined with AI-powered pattern recognition. I reveal hidden decision-making architectures that transform digital experiences.",
  },
  {
    icon: "⚡",
    title: "Innovation Process",
    description:
      "Rigorous methodology born from design mastery, refined through real-world application. Creative excellence guided by disciplined precision.",
  },
  {
    icon: "🔮",
    title: "Forward-Looking Design",
    description:
      "Building tomorrow's standards with emerging technologies. Future-state prototyping that bridges current capabilities with next-generation possibilities.",
  },
];



// Optimized memoized components with reduced delays
const StrategicPillarCard = React.memo(
  ({
    pillar,
    index,
  }: {
    pillar: (typeof STRATEGIC_PILLARS)[0];
    index: number;
  }) => (
    <MobileAnimation
      animation={index % 2 === 0 ? "slideLeft" : "slideRight"}
      delay={pillar.delay}
    >
      <TouchOptimized className="h-full">
        <Card className="premium-card h-full touch-manipulation mobile-optimized">
          <CardContent className="p-4 sm:p-6">
            <h3 className="text-base sm:text-lg mb-2 sm:mb-3 text-card-foreground">
              {pillar.title}
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {pillar.description}
            </p>
          </CardContent>
        </Card>
      </TouchOptimized>
    </MobileAnimation>
  ),
);

StrategicPillarCard.displayName = "StrategicPillarCard";

const CapabilityCard = React.memo(
  ({
    capability,
    index,
  }: {
    capability: (typeof STRATEGIC_CAPABILITIES)[0];
    index: number;
  }) => (
    <MobileAnimation
      animation="fadeUp"
      delay={100 + index * 50}
    >
      <TouchOptimized className="h-full">
        <Card className="premium-card h-full group mobile-optimized">
          <CardContent className="p-4 sm:p-6">
            <div className="text-2xl sm:text-3xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
              {capability.icon}
            </div>
            <h3 className="text-base sm:text-lg mb-2 sm:mb-3 text-card-foreground">
              {capability.title}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {capability.description}
            </p>
          </CardContent>
        </Card>
      </TouchOptimized>
    </MobileAnimation>
  ),
);

CapabilityCard.displayName = "CapabilityCard";



export const UnifiedPortfolioSections = React.memo(() => {
  const capabilities = useDeviceCapabilities();

  // Debug logging for TechOS navigation
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('🎯 TechOS: UnifiedPortfolioSections mounted, checking section presence...');
      const sectionIds = ['about', 'philosophy', 'focus', 'toolkit', 'case-studies', 'hidden-lab'];
      
      // Check immediately
      sectionIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
          console.log(`✅ TechOS: Section "${id}" found in DOM`);
        } else {
          console.warn(`⚠️ TechOS: Section "${id}" not found in DOM`);
        }
      });

      // Check again after lazy loading might have occurred
      setTimeout(() => {
        console.log('🔄 TechOS: Re-checking sections after lazy load delay...');
        sectionIds.forEach(id => {
          const element = document.getElementById(id);
          if (element) {
            console.log(`✅ TechOS: Section "${id}" found after delay`);
          } else {
            console.warn(`❌ TechOS: Section "${id}" still missing after delay`);
          }
        });
      }, 2000);
    }
  }, []);

  return (
    <div className="space-y-16 sm:space-y-24 lg:space-y-32">
      {/* About Section - Always present */}
      <MobileAnimation delay={50}>
        <section
          id="about"
          className="scroll-mt-20 sm:scroll-mt-24 scroll-target px-4 sm:px-0"
        >
          <div className="max-w-4xl">
            <h2 className="text-2xl sm:text-3xl mb-6 sm:mb-8 text-foreground">
              <TimeAwareText
                morning="Design Leadership"
                afternoon="Innovation Authority"
                evening="Applied Wisdom"
              />
            </h2>
            <div className="space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg text-foreground leading-relaxed">
                <TimeAwareGreeting className="mr-2" />I am Ric Rios, a design leader who transforms ambitious vision into competitive advantage. For decades, I've guided founders and executives through the intersection of creative excellence, disciplined methodology, and emerging technology.
              </p>
              <p className="text-base sm:text-lg text-foreground leading-relaxed">
                <TimeAwareText
                  morning="As morning brings fresh possibilities, I bring thinking that connects design, technology, culture, and business outcomes into coherent strategies that define tomorrow's standards."
                  afternoon="In the clarity of midday, my approach synthesizes years of real-world application—every major design book read, integrated, and refined through measurable transformation."
                  evening="With evening's reflective wisdom, I offer the rare combination of deep craft mastery and forward-looking innovation—timeless principles applied to emerging possibilities."
                />
              </p>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                <TimeAwareText
                  morning="For leaders who understand that exceptional design isn't decoration—it's competitive advantage. Calm authority earned through application, always with relentless curiosity about what's possible."
                  afternoon="Rigor grounded in real-world integration. World-class quality that honors both heritage and possibility, authentically mine, never generic."
                  evening="Where timeless principles meet forward-looking approaches. My commitment remains constant: disciplined excellence that transforms business outcomes through innovation."
                />
              </p>
            </div>
          </div>
        </section>
      </MobileAnimation>

      {/* Philosophy Section - Section container always present, content lazy loaded */}
      <section
        id="philosophy"
        className="scroll-mt-20 sm:scroll-mt-24 scroll-target px-4 sm:px-0"
      >
        <LazyComponent threshold={0.2} preserveHeight={true}>
          <MobileAnimation animation="fadeUp" delay={50}>
            <h2 className="text-2xl sm:text-3xl mb-6 sm:mb-8 text-foreground">
              <TimeAwareText
                morning="Foundation"
                afternoon="Methodology"
                evening="Leadership Pillars"
              />
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {STRATEGIC_PILLARS.map((pillar, index) => (
                <StrategicPillarCard
                  key={pillar.title}
                  pillar={pillar}
                  index={index}
                />
              ))}
            </div>
          </MobileAnimation>
        </LazyComponent>
      </section>

      {/* Focus Section - Section container always present, content lazy loaded */}
      <section
        id="focus"
        className="scroll-mt-20 sm:scroll-mt-24 scroll-target px-4 sm:px-0"
      >
        <LazyComponent threshold={0.2} preserveHeight={true}>
          <MobileAnimation animation="fadeUp" delay={100}>
            <h2 className="text-2xl sm:text-3xl mb-6 sm:mb-8 text-foreground">
              <TimeAwareText
                morning="Current Innovation Focus"
                afternoon="Innovation Laboratory"
                evening="Evening Innovation Archive"
              />
            </h2>
            <TouchOptimized>
              <EveningArchiveModal />
            </TouchOptimized>
          </MobileAnimation>
        </LazyComponent>
      </section>

      {/* Toolkit Section - Section container always present, content lazy loaded */}
      <section
        id="toolkit"
        className="scroll-mt-20 sm:scroll-mt-24 scroll-target px-4 sm:px-0"
      >
        <LazyComponent threshold={0.2} preserveHeight={true}>
          <MobileAnimation animation="fadeUp" delay={50}>
            <h2 className="text-2xl sm:text-3xl mb-6 sm:mb-8 text-foreground">
              <TimeAwareText
                morning="Capabilities"
                afternoon="Methodologies"
                evening="Leadership Tools"
              />
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {STRATEGIC_CAPABILITIES.map((capability, index) => (
                <CapabilityCard
                  key={capability.title}
                  capability={capability}
                  index={index}
                />
              ))}
            </div>
          </MobileAnimation>
        </LazyComponent>
      </section>

      {/* Case Studies Section - Section container always present */}
      <section
        id="case-studies"
        className="scroll-mt-20 sm:scroll-mt-24 scroll-target"
      >
        <LazyComponent threshold={0.15} preserveHeight={true}>
          <CaseStudies />
        </LazyComponent>
      </section>

      {/* Strategic Value Section - Non-navigable, fully lazy loaded */}
      <LazyComponent threshold={0.2} preserveHeight={true}>
        <MobileAnimation animation="fadeIn" delay={100}>
          <section
            id="value-proposition"
            className="scroll-mt-20 sm:scroll-mt-24 scroll-target px-4 sm:px-0"
          >
            <h2 className="text-2xl sm:text-3xl mb-6 sm:mb-8 text-foreground">
              <TimeAwareText
                morning="Value Through Time"
                afternoon="Transformation"
                evening="Leadership Impact"
              />
            </h2>
            <Card className="premium-card bg-muted/50">
              <CardContent className="p-6 sm:p-8 text-center">
                <p className="text-lg sm:text-xl text-foreground mb-4 sm:mb-6 leading-relaxed">
                  <TimeAwareText
                    morning="When ambitious leaders need design innovation that bridges deep craft mastery with emerging technology—delivering advantage through disciplined excellence."
                    afternoon="For executives who understand that exceptional design isn't aesthetic choice—it's competitive strategy. Proven methodologies applied to transform business outcomes."
                    evening="Where timeless principles meet forward-looking approaches. Earned authority through real-world application, creating lasting impact that honors both heritage and possibility."
                  />
                </p>
                <div className="text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  <TimeAwareText
                    morning="Leadership that remains human and creatively inspiring. Authentically mine, never generic. World-class quality earned through disciplined methodology."
                    afternoon="Results that speak louder than trends. Innovation guided by understanding what creates lasting transformation in competitive markets."
                    evening="Calm authority earned through application. Rigor that bridges creative excellence with business outcomes, always with relentless curiosity about tomorrow's possibilities."
                  />
                </div>
              </CardContent>
            </Card>
          </section>
        </MobileAnimation>
      </LazyComponent>

      {/* Applied Wisdom Section - Non-navigable, fully lazy loaded */}
      <LazyComponent threshold={0.2} preserveHeight={true}>
        <MobileAnimation animation="fadeUp" delay={50}>
          <section
            id="applied-wisdom"
            className="scroll-mt-20 sm:scroll-mt-24 scroll-target px-4 sm:px-0"
          >
            <h2 className="text-2xl sm:text-3xl mb-6 sm:mb-8 text-foreground">
              <TimeAwareText
                morning="Applied Design Wisdom"
                afternoon="Knowledge Integration"
                evening="Earned Synthesis"
              />
            </h2>
            <Card className="border-l-4 border-blue-500 dark:border-blue-400 bg-card border-border">
              <CardContent className="p-6 sm:p-8">
                <p className="text-base sm:text-lg text-foreground mb-3 sm:mb-4 leading-relaxed">
                  <TimeAwareText
                    morning="Every major design book read and applied—from Bauhaus principles to contemporary behavioral psychology. This isn't theoretical knowledge; it's integration into measurable business transformation."
                    afternoon="Synthesis that honors both heritage and possibility. Dieter Rams meets Don Norman, Paul Rand meets Julie Zhuo—creating coherent methodologies that transform ambitious vision into competitive advantage."
                    evening="Where timeless design principles meet emerging technology. Real-world application creating innovation that defines tomorrow's standards through proven excellence."
                  />
                </p>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  <TimeAwareText
                    morning="My approach bridges the rigorous with the creative, the timeless with the emerging. Discipline that remains human and creatively inspiring, always with relentless curiosity about what's possible."
                    afternoon="Methodology born from every major design book, refined through real-world application. Creative excellence guided by precision that delivers predictable transformation outcomes."
                    evening="Earned authority through application. Leadership that connects design, technology, culture, and business outcomes into coherent approaches that create lasting competitive advantage."
                  />
                </p>
              </CardContent>
            </Card>
          </section>
        </MobileAnimation>
      </LazyComponent>

      {/* Hidden Lab Section - Section container always present */}
      <section
        id="hidden-lab"
        className="scroll-mt-16 sm:scroll-mt-20 scroll-target px-4 sm:px-0 pt-16 sm:pt-20"
      >
        <LazyComponent threshold={0.3} preserveHeight={true}>
          <MobileAnimation animation="fadeUp" delay={150}>
            <div className="mb-8 sm:mb-10 text-center">
              <h2 className="text-2xl sm:text-3xl mb-3 text-foreground">
                <TimeAwareText
                  morning="Innovation Laboratory"
                  afternoon="Hidden Architecture"
                  evening="Evening Innovation Archive"
                />
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-4">
                🎮{" "}
                <span className="italic">
                  <TimeAwareText
                    morning="Where innovation meets playful discovery..."
                    afternoon="Experimental workspace for minds..."
                    evening="Evening wisdom meets forward-looking experimentation..."
                  />
                </span>
              </p>
              <div className="w-16 h-px bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 mx-auto mb-6"></div>
              <p className="text-xs text-muted-foreground/70 max-w-md mx-auto">
                <TimeAwareText
                  morning="⬆⬆⬇⬇⬅➡⬅➡🅱🅰 — For leaders who appreciate precision"
                  afternoon="Some innovations are unlocked through classic sequences..."
                  evening="Minds who remember the fundamentals unlock hidden capabilities..."
                />
              </p>
            </div>
            <KonamiCode />
          </MobileAnimation>
        </LazyComponent>
      </section>
    </div>
  );
});

UnifiedPortfolioSections.displayName = "UnifiedPortfolioSections";