import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { CheckCircle, Clock, Target, Users, TrendingUp, Zap } from 'lucide-react';

/**
 * 🎯 MVP VALIDATION TRACKER
 * Track strategic validation metrics for DOS framework
 */

interface ValidationStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'active' | 'complete';
  progress: number;
  metrics?: string[];
}

export function MVPValidationTracker() {
  const validationSteps: ValidationStep[] = [
    {
      id: 'strategic-leaders',
      title: 'Validate with Strategic Leaders',
      description: 'Test DOS framework with leaders who value systematic approaches',
      status: 'active',
      progress: 25,
      metrics: [
        'Target: C-level executives and strategic leaders',
        'Focus: Complex multi-phase initiatives',
        'Measure: Framework completion rate'
      ]
    },
    {
      id: 'dos-adoption',
      title: 'Build MVP - DOS Framework First',
      description: 'Focus on Define-Orchestrate-Synthesize methodology validation',
      status: 'complete',
      progress: 100,
      metrics: [
        'Framework interface: ✅ Complete',
        'User flow: ✅ Strategic objective → DOS breakdown',
        'Feedback collection: ✅ Integrated'
      ]
    },
    {
      id: 'methodology-adoption',
      title: 'Measure Methodology Adoption',
      description: 'Track framework usage vs. simple prompt improvement',
      status: 'active',
      progress: 15,
      metrics: [
        'Framework completion vs. abandonment',
        'Quality of systematic breakdown',
        'User preference: methodology vs. prompts'
      ]
    },
    {
      id: 'strategic-value',
      title: 'Scale Based on Proven Strategic Value',
      description: 'Expand successful patterns, not just feature additions',
      status: 'pending',
      progress: 0,
      metrics: [
        'Proven strategic value metrics',
        'Expansion to ROS, TOS, IOS frameworks',
        'Enterprise collaboration features'
      ]
    }
  ];

  const getStatusIcon = (status: ValidationStep['status']) => {
    switch (status) {
      case 'complete':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'active':
        return <Clock className="w-5 h-5 text-blue-600 animate-pulse" />;
      default:
        return <Target className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: ValidationStep['status']) => {
    switch (status) {
      case 'complete':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'active':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  // Calculate overall progress
  const totalProgress = validationSteps.reduce((sum, step) => sum + step.progress, 0) / validationSteps.length;

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold">Strategic Validation Progress</h2>
          </div>
          <Badge className={getStatusColor('active')}>
            MVP Phase
          </Badge>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Overall Completion</span>
            <span className="text-sm text-muted-foreground">{Math.round(totalProgress)}%</span>
          </div>
          <Progress value={totalProgress} className="h-2" />
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            <strong>2030 Strategic Focus:</strong> Validating that systematic frameworks create better outcomes 
            than simple prompt optimization for complex strategic initiatives.
          </p>
        </div>
      </Card>

      {/* Validation Steps */}
      <div className="space-y-4">
        {validationSteps.map((step, index) => (
          <Card key={step.id} className="p-6">
            <div className="flex items-start gap-4">
              {getStatusIcon(step.status)}
              
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{step.title}</h3>
                  <Badge className={getStatusColor(step.status)}>
                    {step.status === 'complete' ? 'Complete' : 
                     step.status === 'active' ? 'In Progress' : 'Pending'}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
                
                {step.progress > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium">Progress</span>
                      <span className="text-xs text-muted-foreground">{step.progress}%</span>
                    </div>
                    <Progress value={step.progress} className="h-1.5" />
                  </div>
                )}
                
                {step.metrics && (
                  <div className="space-y-1">
                    <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Key Metrics
                    </h4>
                    <ul className="space-y-1">
                      {step.metrics.map((metric, metricIndex) => (
                        <li key={metricIndex} className="text-xs text-muted-foreground flex items-start gap-2">
                          <span className="w-1 h-1 bg-muted-foreground rounded-full mt-1.5 flex-shrink-0"></span>
                          {metric}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Strategic Insights */}
      <Card className="p-6 border-2 border-purple-200 dark:border-purple-800">
        <div className="flex items-center gap-3 mb-4">
          <Zap className="w-5 h-5 text-purple-600" />
          <h3 className="font-semibold">Strategic Validation Insights</h3>
        </div>
        
        <div className="space-y-3 text-sm text-muted-foreground">
          <p>
            <strong>Market Differentiation:</strong> We're not building another prompt tool—we're creating 
            systematic thinking frameworks for strategic leaders.
          </p>
          <p>
            <strong>Success Criteria:</strong> Users choose methodology over convenience, complete framework 
            processes, and report better strategic outcomes.
          </p>
          <p>
            <strong>Critical Risk:</strong> Over-engineering complexity vs. demonstrating clear strategic value. 
            MVP focuses on proving framework effectiveness first.
          </p>
        </div>
      </Card>

      {/* Next Steps */}
      <Card className="p-6 bg-muted/30">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <Users className="w-5 h-5" />
          Immediate Next Actions
        </h3>
        <ol className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="font-medium text-blue-600">1.</span>
            Test DOS framework with 5-10 strategic leaders on real initiatives
          </li>
          <li className="flex items-start gap-2">
            <span className="font-medium text-blue-600">2.</span>
            Measure completion rate and quality of framework adoption
          </li>
          <li className="flex items-start gap-2">
            <span className="font-medium text-blue-600">3.</span>
            Compare outcomes vs. simple prompt optimization approaches
          </li>
          <li className="flex items-start gap-2">
            <span className="font-medium text-blue-600">4.</span>
            Scale only proven patterns—avoid feature bloat without validation
          </li>
        </ol>
      </Card>
    </div>
  );
}