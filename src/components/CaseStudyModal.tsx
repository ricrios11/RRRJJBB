import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";

export interface DetailedCaseStudy {
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

interface CaseStudyModalProps {
  caseStudy: DetailedCaseStudy;
  isOpen: boolean;
  onClose: () => void;
}

export const CaseStudyModal = React.memo(
  ({ caseStudy, isOpen, onClose }: CaseStudyModalProps) => {
    const detailedContent = caseStudy.detailedContent;

    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent 
          size="full" 
          className="bg-background border-border flex flex-col overflow-hidden"
        >
          <DialogHeader className="space-y-4 pb-4 flex-shrink-0">
            <div className="flex items-start gap-4">
              <div className="text-3xl flex-shrink-0">
                {caseStudy.icon}
              </div>
              <div className="flex-1 min-w-0">
                <DialogTitle className="text-xl sm:text-2xl text-foreground leading-tight mb-2">
                  {caseStudy.title}: Methodology & Results
                </DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground mb-3">
                  {caseStudy.subtitle} - Detailed case study
                  including systematic approach, business
                  impact, and strategic learnings
                </DialogDescription>
                <div className="flex flex-wrap gap-2">
                  {caseStudy.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-xs"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent relative">
            <div className="space-y-6 pb-16">
              {/* Challenge Section */}
              <section>
                <h3 className="text-lg font-medium text-foreground mb-3">
                  Challenge
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {detailedContent?.challenge ||
                    caseStudy.challenge}
                </p>
              </section>

              <Separator />

              {/* Approach Section */}
              <section>
                <h3 className="text-lg font-medium text-foreground mb-4">
                  Approach
                </h3>
                <div className="space-y-4">
                  {detailedContent?.approach ? (
                    detailedContent.approach.map(
                      (item, index) => (
                        <div key={index} className="space-y-2">
                          <h4 className="text-sm font-medium text-foreground flex items-start">
                            <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            {item.title}
                          </h4>
                          <p className="text-sm text-muted-foreground leading-relaxed ml-5">
                            {item.description}
                          </p>
                        </div>
                      ),
                    )
                  ) : (
                    <ul className="space-y-3">
                      {caseStudy.approach.map((item, index) => (
                        <li
                          key={index}
                          className="text-sm text-muted-foreground leading-relaxed flex items-start"
                        >
                          <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>

              <Separator />

              {/* Business Impact Section */}
              <section>
                <h3 className="text-lg font-medium text-foreground mb-4">
                  Business Impact
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {(
                      detailedContent?.impact.metrics ||
                      caseStudy.impact.metrics
                    ).map((metric, index) => (
                      <div
                        key={index}
                        className="bg-muted/50 rounded-lg p-4 border border-border"
                      >
                        <div className="space-y-1">
                          <span className="text-lg font-semibold text-foreground block">
                            {metric.split(" ")[0]}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {metric
                              .split(" ")
                              .slice(1)
                              .join(" ")}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed italic">
                    {detailedContent?.impact.description ||
                      caseStudy.impact.qualitative}
                  </p>
                </div>
              </section>

              <Separator />

              {/* Key Learnings Section */}
              <section>
                <h3 className="text-lg font-medium text-foreground mb-4">
                  Key Learnings
                </h3>
                {detailedContent?.keyLearnings ? (
                  <ul className="space-y-3">
                    {detailedContent.keyLearnings.map(
                      (learning, index) => (
                        <li
                          key={index}
                          className="text-sm text-muted-foreground leading-relaxed flex items-start"
                        >
                          <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          {learning}
                        </li>
                      ),
                    )}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {caseStudy.keyLearnings}
                  </p>
                )}
              </section>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  },
);

CaseStudyModal.displayName = "CaseStudyModal";