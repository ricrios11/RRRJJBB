import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { MetaInnovationPortal } from "./MetaInnovationPortal";
import { TimeAwareText } from "./TimeAwareContent";
import { Archive, Sparkles, Zap, X } from "lucide-react";

import archiveImage from "figma:asset/5b776723288fa8b264fc46020a24de01fcc6b499.png";

export function EveningArchiveModal() {
  const [isOpen, setIsOpen] = useState(false);

  // Handle keyboard navigation for the trigger
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setIsOpen(true);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div
          className="cursor-pointer group"
          role="button"
          tabIndex={0}
          aria-label="Open Evening Innovation Archive"
          onKeyDown={handleKeyDown}
        >
          <Card className="featured-card border-none group-hover:scale-105 transition-transform duration-500">
            <CardContent className="p-6 sm:p-8 relative overflow-hidden">
              {/* Background Image */}
              <div
                className="absolute inset-0 opacity-20 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${archiveImage})`,
                }}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-purple-700 opacity-90" />

              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Archive className="w-6 h-6 text-white" />
                    <Badge
                      variant="secondary"
                      className="bg-white/20 text-white border-white/30"
                    >
                      <TimeAwareText
                        morning="Morning Archive"
                        afternoon="Innovation Lab"
                        evening="Evening Innovation Archive"
                      />
                    </Badge>
                  </div>
                  <div className="opacity-60 group-hover:opacity-100 transition-opacity">
                    <Sparkles className="w-5 h-5 text-white animate-pulse" />
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant="outline"
                      className="bg-black/20 text-white border-white/30 text-xs"
                    >
                      AI/ML Experience Design
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-black/20 text-white border-white/30 text-xs"
                    >
                      Luxury Market Psychology
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-black/20 text-white border-white/30 text-xs"
                    >
                      Content Architecture
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-black/20 text-white border-white/30 text-xs"
                    >
                      Behavioral Transformation
                    </Badge>
                  </div>
                </div>

                <p className="text-white/90 mb-4 leading-relaxed">
                  <TimeAwareText
                    morning="Innovation and luxury psychology—transforming wanderlust into seamless reality through content architecture."
                    afternoon="Travel experiences that think like a curator and feel like a conversation. Machine learning guided by human aspiration."
                    evening="Innovation and luxury psychology—transforming wanderlust into seamless reality through content architecture."
                  />
                </p>

                <p className="text-sm text-white/70 mb-6">
                  <TimeAwareText
                    morning="Where timeless hospitality meets AI-powered personalization. Psychology applied to transform aspiration into reality."
                    afternoon="Design thinking applied to emerging technology. Every decision guided by behavioral transformation and luxury market expectations."
                    evening="Where timeless hospitality meets AI-powered personalization. Psychology applied to transform aspiration into reality."
                  />
                </p>

                {/* Call to Action */}
                <div className="flex items-center justify-between">
                  <div className="text-xs text-white/60">
                    <TimeAwareText
                      morning="Click to explore innovations"
                      afternoon="Enter the laboratory"
                      evening="Access the archive"
                    />
                  </div>
                  <div className="flex items-center gap-2 text-white/80 group-hover:text-white transition-colors">
                    <span className="text-sm font-medium">
                      Explore
                    </span>
                    <Zap className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogTrigger>

      <DialogContent
        size="full"
        className="p-0 gap-0 border-0 bg-background [&>button]:hidden flex flex-col"
      >
        {/* Accessible Dialog Title and Description */}
        <DialogTitle className="sr-only">
          <TimeAwareText
            morning="Morning Innovation Laboratory"
            afternoon="Innovation Portal"
            evening="Evening Innovation Archive"
          />
        </DialogTitle>
        <DialogDescription className="sr-only">
          <TimeAwareText
            morning="Where innovation meets emerging possibilities. Access AI-powered frameworks for collaboration and transformation."
            afternoon="Frameworks for complex challenges. Explore methodologies and validation tools for leadership."
            evening="Experimental workspace for forward-looking methodologies. Discover approaches to AI collaboration."
          />
        </DialogDescription>

        {/* Custom Header */}
        <div className="flex items-center justify-between px-12 py-8 border-b border-border bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <Archive className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2
                className="text-xl font-semibold"
                aria-hidden="true"
              >
                <TimeAwareText
                  morning="Morning Innovation Laboratory"
                  afternoon="Innovation Portal"
                  evening="Evening Innovation Archive"
                />
              </h2>
              <p
                className="text-sm text-muted-foreground"
                aria-hidden="true"
              >
                <TimeAwareText
                  morning="Where innovation meets emerging possibilities"
                  afternoon="Frameworks for complex challenges"
                  evening="Experimental workspace for forward-looking methodologies"
                />
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0"
            >
              Innovation Portal
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 p-0 hover:bg-destructive hover:text-destructive-foreground"
              aria-label="Close dialog"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-hidden">
          <div
            className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent px-12 py-8"
            role="main"
            aria-label="Innovation portal content"
          >
            {/* Innovation Portal Status */}
            <div className="mb-6 mt-4 p-4 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Innovation Framework</span>
                <span>Applied Methodologies</span>
                <span>Design Leadership</span>
              </div>
            </div>
            <MetaInnovationPortal />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}