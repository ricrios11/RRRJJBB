import React, { useState, useCallback } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { ArrowRight, Target, CheckCircle, Clock, Users } from 'lucide-react';

/**
 * 🎯 DOS FRAMEWORK MVP - Strategic Validation Version
 * Focus: Validate DOS (Define-Orchestrate-Synthesize) framework with strategic leaders
 * Measure: Framework adoption vs. simple prompt improvement
 */

interface DOSAnalysis {
  define: string;
  orchestrate: string;
  synthesize: string;
  context: string;
  successMetrics: string[];
}

interface ValidationMetric {
  label: string;
  description: string;
  status: 'pending' | 'collecting' | 'success';
}

export function DOSFrameworkMVP() {
  const [userObjective, setUserObjective] = useState('');
  const [dosAnalysis, setDosAnalysis] = useState<DOSAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  // Strategic validation metrics we're tracking
  const validationMetrics: ValidationMetric[] = [
    {
      label: "Strategic Thinking Enhancement",
      description: "Does DOS framework improve systematic approach vs. ad-hoc prompting?",
      status: dosAnalysis ? 'collecting' : 'pending'
    },
    {
      label: "Framework Adoption Rate", 
      description: "Do leaders complete the full DOS process vs. skipping to execution?",
      status: dosAnalysis ? 'collecting' : 'pending'
    },
    {
      label: "Outcome Quality Improvement",
      description: "Better results with structured methodology vs. simple prompt optimization?",
      status: feedbackSubmitted ? 'success' : dosAnalysis ? 'collecting' : 'pending'
    }
  ];

  const analyzeThroughDOS = useCallback(async () => {
    if (!userObjective.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate strategic analysis - in production, this would be AI-powered
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Generate DOS framework breakdown
    const analysis: DOSAnalysis = {
      define: `Clear objective: ${userObjective.split(' ').slice(0, 10).join(' ')}...
      
Success criteria: Measurable outcomes that demonstrate strategic value
Constraints: Resource, timeline, and stakeholder considerations
Scope boundaries: What's included and what's deliberately excluded`,
      
      orchestrate: `Component breakdown: Identify core elements and dependencies
Sequencing strategy: Logical progression from current state to desired outcome  
Resource allocation: People, time, technology, and budget requirements
Risk mitigation: Anticipate challenges and prepare contingency approaches`,
      
      synthesize: `Integration approach: How components work together systematically
Validation methods: Testing and feedback loops throughout execution
Scaling strategy: How to expand successful patterns across similar challenges
Learning capture: Document insights for future strategic initiatives`,
      
      context: `Strategic complexity: Multi-phase initiative requiring systematic coordination
Leadership level: Executive decision-making with cross-functional impact
Timeline: Iterative approach with measurable milestones
Methodology focus: Systematic thinking over tactical optimization`,
      
      successMetrics: [
        "Systematic approach adoption (vs. ad-hoc execution)",
        "Quality of strategic breakdown and planning", 
        "Effectiveness of component integration",
        "Measurable improvement in outcome quality",
        "Reusability of framework for similar challenges"
      ]
    };
    
    setDosAnalysis(analysis);
    setIsAnalyzing(false);
    
    // Track that user completed the framework process
    console.log('🎯 MVP Validation: User completed DOS framework analysis');
  }, [userObjective]);

  const submitFrameworkFeedback = useCallback(() => {
    setFeedbackSubmitted(true);
    
    // In production, this would send validation data
    console.log('🎯 MVP Validation: Strategic leader provided framework feedback');
    console.log('📊 Tracking: Framework completion vs. simple prompt usage');
  }, []);

  const getStatusIcon = (status: ValidationMetric['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'collecting':
        return <Clock className="w-4 h-4 text-blue-600" />;
      default:
        return <Target className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* MVP Header - Strategic Positioning */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full">
          <Target className="w-4 h-4 text-blue-600" />
          <span className="font-medium text-sm">Strategic Validation MVP</span>
          <Badge variant="outline" className="text-xs">DOS Framework</Badge>
        </div>
        
        <h1 className="text-2xl md:text-3xl font-bold">
          Define-Orchestrate-Synthesize Framework
        </h1>
        
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Strategic methodology for complex initiatives. We're validating whether systematic frameworks 
          create better outcomes than traditional prompt optimization.
        </p>
      </div>

      {/* Strategic Objective Input */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Strategic Objective Definition</h2>
        <div className="space-y-4">
          <Textarea
            placeholder="Describe a complex strategic initiative you're working on. This could be a business transformation, product development, organizational change, or innovation project. Be as detailed or high-level as needed—the framework will help break it down systematically."
            value={userObjective}
            onChange={(e) => setUserObjective(e.target.value)}
            className="min-h-32"
          />
          
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Strategic leaders value methodology over shortcuts
            </p>
            <Button 
              onClick={analyzeThroughDOS}
              disabled={!userObjective.trim() || isAnalyzing}
              className="flex items-center gap-2"
            >
              {isAnalyzing ? 'Analyzing systematically...' : 'Apply DOS Framework'}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* DOS Framework Output */}
      {dosAnalysis && (
        <div className="space-y-6">
          <div className="grid gap-6">
            {/* Define */}
            <Card className="p-6 border-l-4 border-blue-500">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">D</span>
                Define: Strategic Foundation
              </h3>
              <pre className="text-sm whitespace-pre-wrap text-muted-foreground leading-relaxed">
                {dosAnalysis.define}
              </pre>
            </Card>

            {/* Orchestrate */}
            <Card className="p-6 border-l-4 border-purple-500">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <span className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 font-bold text-sm">O</span>
                Orchestrate: Systematic Execution
              </h3>
              <pre className="text-sm whitespace-pre-wrap text-muted-foreground leading-relaxed">
                {dosAnalysis.orchestrate}
              </pre>
            </Card>

            {/* Synthesize */}
            <Card className="p-6 border-l-4 border-green-500">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <span className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 font-bold text-sm">S</span>
                Synthesize: Integration & Scale
              </h3>
              <pre className="text-sm whitespace-pre-wrap text-muted-foreground leading-relaxed">
                {dosAnalysis.synthesize}
              </pre>
            </Card>
          </div>

          {/* Strategic Context */}
          <Card className="p-6 bg-muted/50">
            <h3 className="text-lg font-semibold mb-3">Strategic Context & Approach</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {dosAnalysis.context}
            </p>
          </Card>

          {/* Success Metrics */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Success Validation Criteria</h3>
            <ul className="space-y-2">
              {dosAnalysis.successMetrics.map((metric, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{metric}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* MVP Feedback Collection */}
          {!feedbackSubmitted && (
            <Card className="p-6 border-2 border-blue-200 dark:border-blue-800">
              <h3 className="text-lg font-semibold mb-3">Strategic Validation Feedback</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Help us validate the DOS framework's strategic value. Did this systematic approach 
                provide better clarity and actionability than a simple prompt would have?
              </p>
              <div className="flex gap-3">
                <Button onClick={submitFrameworkFeedback} className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Yes, framework adds strategic value
                </Button>
                <Button variant="outline" onClick={submitFrameworkFeedback}>
                  Prefer simpler approach
                </Button>
              </div>
            </Card>
          )}

          {feedbackSubmitted && (
            <Card className="p-6 bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">
                  Strategic Validation Recorded
                </h3>
              </div>
              <p className="text-sm text-green-700 dark:text-green-300">
                Your feedback helps us understand whether systematic frameworks create better outcomes 
                for strategic leaders. This data guides our product development priorities.
              </p>
            </Card>
          )}
        </div>
      )}

      {/* Validation Metrics Dashboard */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30">
        <h3 className="text-lg font-semibold mb-4">MVP Validation Progress</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {validationMetrics.map((metric, index) => (
            <div key={index} className="flex items-start gap-3">
              {getStatusIcon(metric.status)}
              <div>
                <h4 className="font-medium text-sm">{metric.label}</h4>
                <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground">
            MVP Focus: Validating framework adoption vs. simple prompt improvement • 
            Target: Strategic leaders who value systematic approaches • 
            Success Metric: Methodology adoption rate and outcome quality
          </p>
        </div>
      </Card>
    </div>
  );
}