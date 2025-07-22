import React, { useMemo, useState, useCallback } from 'react';
import { MobileAnimation, TouchOptimized } from './MobileOptimization';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { CaseStudyModal, DetailedCaseStudy } from './CaseStudyModal';

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

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
  delay?: number;
}

export const CaseStudyCard = React.memo(({ caseStudy, delay = 0 }: CaseStudyCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Memoize key metric for performance
  const primaryMetric = useMemo(() => {
    return caseStudy.impact.metrics[0] || '';
  }, [caseStudy.impact.metrics]);

  // Memoize primary tags (show max 2 in grid view)
  const primaryTags = useMemo(() => {
    return caseStudy.tags.slice(0, 2);
  }, [caseStudy.tags]);

  // Extract numeric value from metric for highlighting
  const metricValue = useMemo(() => {
    const match = primaryMetric.match(/(\d+%?)/);
    return match ? match[1] : '';
  }, [primaryMetric]);

  const metricLabel = useMemo(() => {
    return primaryMetric.replace(/^\d+%?\s*/, '');
  }, [primaryMetric]);

  // Handle modal open/close with useCallback for performance
  const handleOpenModal = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(`🎯 TechOS: Opening case study modal for "${caseStudy.title}"`);
    setIsModalOpen(true);
  }, [caseStudy.title]);

  const handleCloseModal = useCallback(() => {
    console.log(`🎯 TechOS: Closing case study modal for "${caseStudy.title}"`);
    setIsModalOpen(false);
  }, [caseStudy.title]);

  return (
    <>
      <MobileAnimation animation="fadeUp" delay={delay}>
        <TouchOptimized className="h-full">
          <Card 
            className="h-full bg-card border-border hover:shadow-lg transition-all duration-300 group cursor-pointer overflow-hidden"
            onClick={handleOpenModal}
          >
            <CardContent className="p-4 sm:p-6 h-full flex flex-col">
              {/* Header */}
              <div className="flex items-start gap-3 mb-4">
                <div className="text-xl sm:text-2xl group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                  {caseStudy.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-medium text-card-foreground leading-tight mb-1">
                    {caseStudy.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {caseStudy.subtitle}
                  </p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {primaryTags.map((tag) => (
                  <Badge 
                    key={tag} 
                    variant="secondary" 
                    className="text-xs px-2 py-0.5"
                  >
                    {tag}
                  </Badge>
                ))}
                {caseStudy.tags.length > 2 && (
                  <Badge 
                    variant="outline" 
                    className="text-xs px-2 py-0.5"
                  >
                    +{caseStudy.tags.length - 2}
                  </Badge>
                )}
              </div>

              {/* Overview */}
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed flex-1 mb-4">
                {caseStudy.overview}
              </p>

              {/* Key Metric */}
              {primaryMetric && (
                <div className="bg-muted/50 rounded-lg p-3 border border-border/50 mb-4">
                  <div className="flex items-baseline gap-2">
                    {metricValue && (
                      <span className="text-lg sm:text-xl font-semibold text-foreground">
                        {metricValue}
                      </span>
                    )}
                    <span className="text-xs sm:text-sm text-muted-foreground leading-tight">
                      {metricLabel}
                    </span>
                  </div>
                </div>
              )}

              {/* CTA Label - Always visible with hover enhancement */}
              <div className="mt-auto pt-3 border-t border-border/30 opacity-70 group-hover:opacity-100 transition-all duration-300 -mx-4 sm:-mx-6 -mb-4 sm:-mb-6 px-4 sm:px-6 pb-4 sm:pb-6 rounded-b-lg bg-gradient-to-b from-transparent to-muted/20 group-hover:to-muted/30">
                <div className="text-xs text-muted-foreground group-hover:text-foreground flex items-center justify-center pt-2 transition-colors duration-300">
                  <span className="mr-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                  View methodology & impact
                </div>
              </div>
            </CardContent>
          </Card>
        </TouchOptimized>
      </MobileAnimation>

      {/* Modal */}
      <CaseStudyModal 
        caseStudy={caseStudy as DetailedCaseStudy}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
});

CaseStudyCard.displayName = 'CaseStudyCard';