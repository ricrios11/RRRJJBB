import React, { useMemo } from "react";
import { TimeAwareText } from "./TimeAwareContent";
import {
  MobileAnimation,
  LazyComponent,
  TouchOptimized,
} from "./MobileOptimization";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { FeaturedCaseStudy } from "./FeaturedCaseStudy";
import { CaseStudyCard } from "./CaseStudyCard";

// Enhanced case study data structure with detailed content support
interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  tags: string[];
  overview: string;
  challenge: string;
  approach: string[];
  impact: {
    metrics: string[];
    qualitative: string;
  };
  keyLearnings: string;
  featured?: boolean;
  timeAware?: {
    morning?: string;
    afternoon?: string;
    evening?: string;
  };
  detailedContent?: {
    challenge: string;
    approach: {
      title: string;
      description: string;
    }[];
    impact: {
      metrics: string[];
      description: string;
    };
    keyLearnings: string[];
  };
}

// Memoized case study data - moved outside component for better performance
const CASE_STUDIES: CaseStudy[] = [
  {
    id: "chase-travel",
    title: "Chase Travel Transformation",
    subtitle: "AI-Enhanced Luxury Travel Experience",
    icon: "🎯",
    tags: [
      "Cross-Platform Unification",
      "Progressive Disclosure",
      "Brand DNA Integration",
      "UX Gap Reduction",
    ],
    overview:
      "Led strategic redesign of Chase's travel booking experience, unifying desktop and mobile channels through systematic brand DNA alignment and refined progressive disclosure patterns that honor both editorial storytelling and transactional precision.",
    challenge:
      "Fragmented interfaces across web and app created friction in the booking journey post-rebrand. Federated touch points lacked cohesion, resulting in inconsistent pricing displays and reduced engagement with premium inventory offerings.",
    approach: [
      "Aligned brand and experience DNA: Led cross-functional workshops with marketing, product and engineering to audit the federated journey post-rebrand, uncovering and prioritizing critical pain points",
      "Hypothesized impact of cohesion: Framed the problem—'If we unify UI patterns, elevate typography, and introduce elegant progressive disclosure, we'll reduce friction and reinforce the new brand at every step'",
      "Modularized and modernized interactions: Built and iterated on refined interface modules—chunked content, responsive typographic scales, and clean layouts—benchmarking against best-in-class analogs",
      "Validated with measurable results: Pressure-tested prototypes in mixed-method sessions and gap-mapping exercises, confirming an 88% reduction in prioritized UX issues and setting a new standard for cross-platform harmony"
    ],
    impact: {
      metrics: [
        "88% reduction in prioritized UX gaps",
        "20% year-over-year transaction growth across strategic lines",
      ],
      qualitative:
        "Despite pricing constraints outside our direct control, this cohesive redesign drove sustained growth across our most strategic business lines, boosted NPS, and strengthened cross-product coherence.",
    },
    keyLearnings:
      "Friction reduction is fundamental: Clear pricing displays + contextually surfaced premium inventory drive both satisfaction and conversion. From transactional to experiential: Progressive disclosure of curated offers shifts perception, increasing engagement and brand affinity. Design DNA scales impact: Consistent UI, accessibility compliance, and cohesive cross-product patterns fuel higher NPS, cross-sell lift, and sustained year-over-year transaction growth.",
    featured: true,
    timeAware: {
      morning:
        "Morning precision: systematic brand DNA alignment that transforms fragmented experiences into cohesive competitive advantage.",
      afternoon:
        "Strategic innovation at midday: where cross-functional collaboration meets measurable UX improvement through systematic methodology.",
      evening:
        "Evening reflection: three decades of craft knowledge applied to eliminate friction and reinforce brand trust at every interaction.",
    },
  },
  {
    id: "wealth-management",
    title: "Digital Wealth Management",
    subtitle: "Unified Investment Platform",
    icon: "💼",
    tags: [
      "Wealth Management",
      "Design Systems",
      "Platform Unification",
      "Account Aggregation"
    ],
    overview:
      "Introduced full-featured wealth management UI into Chase's ecosystem—desktop and native mobile—serving high-net-worth clients with systematic precision.",
    challenge:
      "Legacy online application lacked investment tools, mobile app had no managed-account surfaces, causing client churn to competitors offering more comprehensive digital experiences.",
    approach: [
      "Conducted comprehensive audit of existing online flows and mobile usage analytics",
      "Designed modular Dashboard, Portfolio, and Advice components with systematic token architecture",
      "Built responsive patterns ensuring feature parity and usability across all platforms",
    ],
    impact: {
      metrics: [
        "30% reduction in support calls",
        "$2B in new assets onboarded within six months",
      ],
      qualitative:
        "Created seamless wealth management experience that builds client trust through consistent, world-class interface design.",
    },
    keyLearnings:
      "Unified design systems accelerate feature parity and client trust across platforms. Systematic approach to component architecture enables rapid scaling without compromising quality.",
    detailedContent: {
      challenge: "JPMC's wealth tools lived in silos—brokerage, DAFs, and managed accounts each had their own interfaces and workflows. Clients lacked a unified, end-to-end experience for onboarding, portfolio management, and holistic financial planning.",
      approach: [
        {
          title: "0→1 Platform Foundation",
          description: "Architected a unified investment framework from scratch—defining core design tokens, interaction patterns, and data models to support Brokerage, Managed Accounts, DAFs, and Hybrid Branch offerings."
        },
        {
          title: "Iterative Feature Roll-Out",
          description: "Launched account opening flows for Brokerage & Managed Accounts, then layered in asset allocation tools, native trading UIs, and the MyJPM Plan planner—using agile sprints informed by analytics and user feedback."
        },
        {
          title: "Full-Picture Aggregation",
          description: "Spearheaded account aggregation via banking rails, giving high-net-worth clients a single dashboard for all assets, driving deeper engagement and trust."
        },
        {
          title: "Cross-Functional Rigor",
          description: "Partnered with Product, Engineering, Compliance, and Private Bank teams to ensure brand fidelity, accessibility compliance, and seamless hand-offs across digital and branch channels."
        }
      ],
      impact: {
        metrics: [
          "30% reduction in support calls",
          "20% year-over-year AUM growth",
          "+15 pts lift in NPS among Private Client users"
        ],
        description: "Confident, scalable design foundations and relentless focus on end-to-end client value powered our sustained growth in U.S. wealth management."
      },
      keyLearnings: [
        "Platform Consistency Wins: A shared design system accelerated feature velocity and cohesion across product lines.",
        "Holistic Journeys Drive Trust: Aggregated views turned point solutions into high-value, sticky experiences.",
        "Data + Design Synergy: Embedding analytics early in each sprint ensured we prioritized the features that moved the needle on AUM and client satisfaction."
      ]
    }
  },
  {
    id: "chase-dining",
    title: "Chase Dining Platform",
    subtitle: "Editorial Meets Utility",
    icon: "🍽️",
    tags: [
      "Editorial Design",
      "Transaction Optimization",
      "Content Integration",
    ],
    overview:
      "Created Chase Dining, a hybrid editorial-booking platform marrying The Infatuation's rich content with OpenTable's reservation engine, plus exclusive Reserve Card perks.",
    challenge:
      "Customers loved Infatuation's storytelling but bounced when forced offsite to book. Booking drop-off undermined transaction credits value and premium card engagement.",
    approach: [
      "Integrated curated editorial modules directly into booking flows",
      'Designed unified "Reserve" button with in-context previews of editorial highlights',
      "Surfaced transaction-credit reminders at key decision points in user journey",
    ],
    impact: {
      metrics: [
        "50% increase in on-platform reservations",
        "20% boost in Chase Reserve card spending",
      ],
      qualitative:
        "Transformed dining discovery from fragmented experience into seamless editorial-transaction journey.",
    },
    keyLearnings:
      "Seamless editorial-transaction experiences deepen engagement and lift spend on premium benefits. The key is eliminating friction while preserving the editorial magic that drives discovery.",
    detailedContent: {
      challenge: "Chase Dining lived at the intersection of rich editorial storytelling and reservation utility—but the hand-off was disjointed. Our goal was to fuse The Infatuation–style content with a seamless booking engine, elevate the Sapphire Reserve dining experience, and prove the model at scale.",
      approach: [
        {
          title: "Editorial-to-Utility Integration",
          description: "Partnered with content, design, and engineering teams to embed curated restaurant lists and storytelling modules directly into the reservation flow—ensuring context and action live side-by-side."
        },
        {
          title: "MVP Metrics & Rapid Iteration",
          description: "Launched an initial set of \"Featured Lists\" and \"Chef's Picks\" alongside OpenTable's engine. Instrumented click-paths and heatmaps to validate that customers could both parse the benefit and convert without friction."
        },
        {
          title: "Cross-Channel Coordination",
          description: "Aligned with Sapphire Reserve marketing, product, and Ops for a coordinated rollout—leveraging in-app banners, email campaigns, and on-site promos to drive discoverability and adoption."
        }
      ],
      impact: {
        metrics: [
          "50% increase in on-platform reservations",
          "70% of users engaged with curated editorial lists",
          "55% click-through rate from featured restaurant pages"
        ],
        description: "Delivering a best-in-class hybrid dining experience—fueling Sapphire Reserve's dining & travel objectives and setting the stage for our rich roadmap ahead."
      },
      keyLearnings: [
        "Contextual Action: Seamless editorial-booking integration transforms inspiration into conversion.",
        "Measurable Storytelling: Data-driven refinement of list curation boosts engagement and trust.",
        "Cross-Functional Alignment: Early coordination with marketing and Ops is critical for platform-wide success."
      ]
    }
  },
  {
    id: "bjj-movement",
    title: "BJJ Training & Design Practice",
    subtitle: "Mat Skills Applied to Design Leadership",
    icon: "🥋",
    tags: [
      "Skill Transfer",
      "Problem Solving",
      "Emotional Intelligence",
      "Design Leadership",
    ],
    overview:
      "Applied problem solving, perseverance, and emotional intelligence developed through Brazilian Jiu-Jitsu training to design leadership—transferring mat-learned principles to business objectives and customer pain points.",
    challenge:
      "High-pressure design environments demand the same mental resilience, problem-solving clarity, and emotional regulation required in martial arts competition. The challenge was systematically transferring these skills.",
    approach: [
      "Developed systematic problem-solving approach through consistent mat training",
      "Applied emotional intelligence and pressure management from sparring to design critiques and stakeholder management",
      "Transferred perseverance and iterative improvement mindset to product development cycles",
    ],
    impact: {
      metrics: [
        "Improved team dynamics through authentic leadership approach",
        "Enhanced stakeholder management through emotional intelligence",
      ],
      qualitative:
        "Demonstrated relentless work ethic and authentic approach that others respect, admire, and emulate to accelerate their own professional development.",
    },
    keyLearnings:
      "Authentic skill transfer from martial arts to design work creates genuine leadership presence. Problem-solving under pressure, emotional regulation, and systematic improvement translate directly to design excellence.",
    detailedContent: {
      challenge: "Design leadership requires the same mental clarity, problem-solving ability, and emotional intelligence as martial arts training. The challenge was systematically transferring skills developed on the mats to business objectives and customer pain points in parallel.",
      approach: [
        {
          title: "Problem-Solving Under Pressure",
          description: "Applied systematic approach learned through sparring—stay calm, assess options, execute with precision—to high-stakes design decisions and technical challenges. Pressure-tested solutions with the same methodical mindset used in competition."
        },
        {
          title: "Emotional Intelligence in Practice",
          description: "Transferred emotional regulation skills from mat training to stakeholder management, design critiques, and team leadership. Applied the same presence and awareness required in close-contact sparring to navigate complex interpersonal dynamics."
        },
        {
          title: "Relentless Iterative Improvement",
          description: "Brought the daily practice mindset—show up, refine technique, measure progress—to design systems development. Applied the perseverance learned through years of training to long-term product development cycles."
        }
      ],
      impact: {
        metrics: [
          "Enhanced team performance through authentic leadership approach",
          "Improved stakeholder relationships via emotional intelligence application",
          "Accelerated personal development model adopted by team members"
        ],
        description: "Authentic skill transfer created a leadership presence others respect and emulate. The real, kind, and relentlessly disciplined approach became a model for accelerating professional growth across the team."
      },
      keyLearnings: [
        "Authentic Transfer: Skills genuinely developed through physical practice create real leadership presence that can't be faked.",
        "Pressure Management: Mental clarity under competition pressure translates directly to design decision-making under business constraints.",
        "Systematic Improvement: The daily practice mindset of incremental progress accelerates both martial arts and design mastery."
      ]
    }
  },
  {
    id: "meta-workflow",
    title: "Meta: AI-Powered Design Workflow",
    subtitle: "Multi-Agent Creative Engine",
    icon: "🤖",
    tags: [
      "Design Operations",
      "AI Workflow",
      "Systems Innovation",
      "Content Architecture"
    ],
    overview:
      'Systematized the end-to-end realization of ricrios.com through structured human-AI collaboration, delivering a live portfolio with zero manual updates and rapid case study deployment.',
    challenge:
      "Traditional portfolio development creates maintenance overhead and limits content velocity. Goal was to architect a self-sustaining system with time-aware personalization and bulletproof scalability.",
    approach: [
      "Established COS/IOS/TechOS framework as systematic creative lens",
      "Built modular content architecture with JSON schema-driven components",
      "Implemented automated quality gates with pre-deployment validation",
    ],
    impact: {
      metrics: [
        "3× faster content releases with 30-minute deployment cycles",
        "100% template adherence across all case studies",
        "90% reduction in editorial errors via single source of truth",
      ],
      qualitative:
        "Transformed portfolio maintenance from manual overhead into systematic creative engine that scales content velocity while enforcing brand rigor.",
    },
    keyLearnings:
      "Systematic frameworks unlock AI collaboration potential. Position Before Submission applies to prompting: establish structure, then execute. Human domain expertise + AI execution precision = sustainable creative advantage.",
    detailedContent: {
      challenge: "Deliver a live, time-aware portfolio site that showcases three decades of design leadership with zero manual updates, supports rapid case study rollout, and enforces brand rigor at scale through systematic human-AI collaboration.",
      approach: [
        {
          title: "COS/IOS/TechOS Framework Implementation",
          description: "Established systematic creative lens—COS (Content Operating System) for voice consistency, IOS (Implementation Operating System) for execution, TechOS for technical precision. Applied 'Position Before Submission' methodology to structure before content generation."
        },
        {
          title: "Modular Content Architecture",
          description: "Built reusable component system driven by JSON schema variables (timeOfDay, projectType, metrics). Created time-aware content framework with morning/afternoon/evening variants, modal-based case study system, and bulletproof navigation patterns."
        },
        {
          title: "Automated Quality Assurance",
          description: "Implemented pre-deployment validation checks for variant presence, placeholder replacement, and tone alignment. Established 'Content Dojo' review process ensuring AI outputs maintain authentic voice and systematic precision across all case studies."
        }
      ],
      impact: {
        metrics: [
          "3× faster content releases: new sections live in under 30 minutes",
          "Fully dynamic time-aware personalization with zero manual updates post-launch",
          "100% template adherence across Travel, Wealth, Dining, and BJJ case studies",
          "90% reduction in editorial errors via single source of truth methodology"
        ],
        description: "Created a self-sustaining creative engine that maintains systematic rigor while enabling rapid innovation. Portfolio system demonstrates how structured human-AI collaboration scales creative velocity without compromising authenticity."
      },
      keyLearnings: [
        "Systematize Early: Define templates and systematic framework before content generation unlocks both velocity and consistency.",
        "AI as Strategic Partner: Training models on established voice and methodology transforms AI from tool into force multiplier for systematic precision.",
        "Constraints Enable Creativity: Rigid structural framework plus parametric content flexibility yields both operational efficiency and authentic voice expression."
      ]
    }
  },
];

// Pre-computed constants for better performance
const FEATURED_CASE_STUDY =
  CASE_STUDIES.find((study) => study.featured) ||
  CASE_STUDIES[0];
const GRID_CASE_STUDIES = CASE_STUDIES.filter(
  (study) => !study.featured,
);
const SECTION_INTRO =
  "Three decades of systematic design leadership applied across diverse domains—from luxury travel to wealth management to community building. Each project demonstrates the intersection of deep craft knowledge, strategic rigor, and forward-looking innovation.";

export const CaseStudies = React.memo(() => {
  return (
    <div className="px-4 sm:px-0">
      {/* Section Header - Simplified animation */}
      <MobileAnimation animation="fadeIn">
        <div className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl mb-4 sm:mb-6 text-foreground">
            <TimeAwareText
              morning="Morning Portfolio: Systems in Action"
              afternoon="Strategic Applications: Proven at Scale"
              evening="Evening Archive: Three Decades of Impact"
            />
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-4xl">
            {SECTION_INTRO}
          </p>
        </div>
      </MobileAnimation>

      {/* Featured Case Study - Lazy loaded separately */}
      <LazyComponent threshold={0.2}>
        <div className="mb-12 sm:mb-16">
          <FeaturedCaseStudy 
            key={FEATURED_CASE_STUDY.id} 
            caseStudy={FEATURED_CASE_STUDY} 
          />
        </div>
      </LazyComponent>

      {/* Case Studies Grid - Reduced animation staggering for better performance */}
      <LazyComponent threshold={0.2}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {GRID_CASE_STUDIES.map((study, index) => (
            <CaseStudyCard
              key={study.id}
              caseStudy={study}
              delay={index * 50} // Reduced stagger delay
            />
          ))}
        </div>
      </LazyComponent>

      {/* Portfolio Summary - Simple fade in */}
      <LazyComponent threshold={0.3}>
        <MobileAnimation animation="fadeIn">
          <Card className="bg-muted border-border">
            <CardContent className="p-6 sm:p-8 text-center">
              <p className="text-base sm:text-lg text-foreground mb-4 sm:mb-6 leading-relaxed">
                <TimeAwareText
                  morning="Each morning brings new opportunities to apply systematic precision to emerging challenges—bridging timeless craft with tomorrow's possibilities."
                  afternoon="Strategic applications that demonstrate how deep mastery scales across domains—from luxury experiences to community building to AI-powered workflows."
                  evening="Evening reflection reveals the connecting thread: every project benefits from three decades of integrated design knowledge, authentically applied."
                />
              </p>
              <div className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Systems-level thinking. Disciplined methodology.
                Future-aware innovation.
                <br className="hidden sm:inline" />
                <span className="block sm:inline sm:ml-2">
                  Authentically mine, never generic.
                </span>
              </div>
            </CardContent>
          </Card>
        </MobileAnimation>
      </LazyComponent>
    </div>
  );
});

CaseStudies.displayName = "CaseStudies";