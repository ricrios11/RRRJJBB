import React, { useState, useMemo } from 'react';
import { TimeAwareText } from './TimeAwareContent';
import { MobileAnimation, TouchOptimized } from './MobileOptimization';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

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
  timeAware?: {
    morning?: string;
    afternoon?: string;
    evening?: string;
  };
}

interface FeaturedCaseStudyProps {
  caseStudy: CaseStudy;
}

export const FeaturedCaseStudy = ({ caseStudy }: FeaturedCaseStudyProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // BULLETPROOF: Functional state update to prevent stale state
  const toggleExpanded = () => {
    console.log('🎯 TOGGLE CLICKED - Component ID:', caseStudy.id, 'Current state:', isExpanded);
    setIsExpanded(prev => {
      const newState = !prev;
      console.log('🔄 State changing from', prev, 'to', newState);
      // Force re-render with immediate feedback
      setTimeout(() => {
        console.log('✅ State after update:', newState);
      }, 0);
      return newState;
    });
  };

  // Memoize key metrics for performance
  const keyMetrics = useMemo(() => {
    return caseStudy.impact.metrics.slice(0, 2);
  }, [caseStudy.impact.metrics]);

  const timeAwareDescription = useMemo(() => {
    if (!caseStudy.timeAware) return caseStudy.overview;
    
    return (
      <TimeAwareText
        morning={caseStudy.timeAware.morning || caseStudy.overview}
        afternoon={caseStudy.timeAware.afternoon || caseStudy.overview}
        evening={caseStudy.timeAware.evening || caseStudy.overview}
      />
    );
  }, [caseStudy.timeAware, caseStudy.overview]);

  // Debug logging (removed for performance)
  // console.log('🔍 FeaturedCaseStudy render:', { caseStudyId: caseStudy.id, isExpanded });

  return (
    <MobileAnimation animation="fadeUp">
      <TouchOptimized>
        <Card 
          id={`case-study-${caseStudy.id}`}
          className="relative bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border-border hover:shadow-xl transition-all duration-500"
        >
          <CardContent className="p-6 sm:p-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl sm:text-3xl">{caseStudy.icon}</span>
                  <div>
                    <h3 className="text-xl sm:text-2xl text-foreground leading-tight">
                      {caseStudy.title}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground">
                      {caseStudy.subtitle}
                    </p>
                  </div>
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {caseStudy.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Key Metrics - Desktop */}
              <div className="hidden sm:block text-right space-y-2">
                {keyMetrics.map((metric, index) => (
                  <div key={index} className="text-sm">
                    <span className="font-semibold text-foreground">
                      {metric.split(' ')[0]}
                    </span>
                    <span className="text-muted-foreground ml-1">
                      {metric.split(' ').slice(1).join(' ')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Overview */}
            <div className="space-y-4 mb-6">
              <p className="text-base sm:text-lg text-foreground leading-relaxed">
                {timeAwareDescription}
              </p>

              {/* Key Metrics - Mobile */}
              <div className="flex flex-wrap gap-4 sm:hidden">
                {keyMetrics.map((metric, index) => (
                  <div key={index} className="text-sm">
                    <span className="font-semibold text-foreground">
                      {metric.split(' ')[0]}
                    </span>
                    <span className="text-muted-foreground ml-1">
                      {metric.split(' ').slice(1).join(' ')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* FIXED: Expandable Content with proper state management */}
            <div style={{ display: isExpanded ? 'block' : 'none' }}>
              <MobileAnimation animation="fadeIn" delay={100}>
                <div className="space-y-6 border-t border-border pt-6">
                  {/* Challenge */}
                  <div>
                    <h4 className="text-base sm:text-lg font-medium text-foreground mb-3">
                      Challenge
                    </h4>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {caseStudy.challenge}
                    </p>
                  </div>

                  {/* Approach */}
                  <div>
                    <h4 className="text-base sm:text-lg font-medium text-foreground mb-3">
                      Systematic Approach
                    </h4>
                    <ul className="space-y-2">
                      {caseStudy.approach.map((item, index) => (
                        <li key={index} className="text-sm sm:text-base text-muted-foreground leading-relaxed flex items-start">
                          <span className="inline-block w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Impact */}
                  <div>
                    <h4 className="text-base sm:text-lg font-medium text-foreground mb-3">
                      Business Impact
                    </h4>
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {caseStudy.impact.metrics.map((metric, index) => (
                          <div key={index} className="bg-background/50 rounded-lg p-3 border border-border">
                            <span className="text-lg font-semibold text-foreground">
                              {metric.split(' ')[0]}
                            </span>
                            <span className="text-sm text-muted-foreground ml-1 block">
                              {metric.split(' ').slice(1).join(' ')}
                            </span>
                          </div>
                        ))}
                      </div>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed italic">
                        {caseStudy.impact.qualitative}
                      </p>
                    </div>
                  </div>

                  {/* Key Learnings */}
                  <div>
                    <h4 className="text-base sm:text-lg font-medium text-foreground mb-3">
                      Key Learnings
                    </h4>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {caseStudy.keyLearnings}
                    </p>
                  </div>
                </div>
              </MobileAnimation>
            </div>

            {/* BULLETPROOF: Toggle Button - completely isolated from other components */}
            <div className="mt-6 pt-4 border-t border-border/50">
              <button
                className="featured-case-study-toggle-btn"
                onClick={toggleExpanded}
                style={{
                  cursor: 'pointer',
                  padding: '8px 16px',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px',
                  fontSize: '14px',
                  backgroundColor: 'transparent',
                  color: 'hsl(var(--foreground))',
                  userSelect: 'none',
                  display: 'inline-block',
                  transition: 'all 0.2s ease',
                  outline: 'none',
                  fontFamily: 'inherit'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'hsl(var(--muted))';
                  e.currentTarget.style.borderColor = 'hsl(var(--border))';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.borderColor = 'hsl(var(--border))';
                }}
              >
                {isExpanded ? '↑ Hide Details' : '↓ Explore Full Case Study'}
              </button>
            </div>
          </CardContent>
        </Card>
      </TouchOptimized>
    </MobileAnimation>
  );
};

FeaturedCaseStudy.displayName = 'FeaturedCaseStudy';