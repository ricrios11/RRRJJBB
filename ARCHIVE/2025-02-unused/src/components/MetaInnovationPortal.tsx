import React, { useState, useCallback } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowRight, Brain, Target, Zap, Users, TestTube, Copy, CheckCircle2, BookOpen, Lightbulb, Clock, TrendingUp, Layers, Compass } from 'lucide-react';
import { AICollaborationFramework } from './AICollaborationFramework';
import { DOSFrameworkMVP } from './DOSFrameworkMVP';
import { MVPValidationTracker } from './MVPValidationTracker';
import { TimeAwareText, useOptimizedTimeOfDay } from './TimeAwareContent';

/**
 * 🎛️ STRATEGIC INNOVATION ARCHIVE
 * Where disciplined design leadership meets emerging AI capabilities
 * Authentically mine, never generic - Earned wisdom applied to future-state collaboration
 */

interface StrategicPrompt {
  id: string;
  title: string;
  context: string;
  prompt: string;
  timeSpecific: {
    morning: string;
    afternoon: string;
    evening: string;
  };
  strategicDepth: 'tactical' | 'strategic' | 'visionary';
  domain: string;
  impact: string;
}

export function MetaInnovationPortal() {
  const [activeView, setActiveView] = useState<'archive' | 'framework' | 'mvp' | 'research'>('archive');
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);
  const timeConfig = useOptimizedTimeOfDay();
  
  // Strategic Innovation Archive - Time-aware, contextual prompts
  const strategicPrompts: StrategicPrompt[] = [
    {
      id: 'strategic-synthesis',
      title: 'Strategic Synthesis Engine',
      context: 'When multiple complex initiatives need coherent direction',
      domain: 'Executive Leadership',
      impact: 'Transforms chaos into strategic clarity',
      strategicDepth: 'visionary',
      timeSpecific: {
        morning: 'Fresh perspective synthesis - when clarity emerges from complexity',
        afternoon: 'Mid-day strategic alignment - when decisions need decisive action',
        evening: 'Reflective integration - when wisdom distills from experience'
      },
      prompt: `I need strategic synthesis across multiple complex initiatives: [DESCRIBE YOUR COMPLEX SITUATION]

**STRATEGIC SYNTHESIS FRAMEWORK:**

**Context Setting:**
- What are the 3-5 major initiatives/challenges requiring coordination?
- What strategic outcomes are we ultimately trying to achieve?
- What constraints or non-negotiables must we work within?

**Multi-Dimensional Analysis:**
1. **Strategic Alignment**: How do these initiatives support our core strategic objectives?
2. **Resource Orchestration**: Where are the resource conflicts, and how can we optimize allocation?
3. **Dependency Mapping**: What are the critical path dependencies between initiatives?
4. **Risk Integration**: How do risks compound across initiatives, and where are our biggest vulnerabilities?

**Synthesis Process:**
1. **Pattern Recognition**: What common themes or root causes emerge across initiatives?
2. **Strategic Prioritization**: If we could only succeed at 2 out of 5 initiatives, which would create the most strategic value?
3. **Integration Opportunities**: Where can we create synergies between initiatives?
4. **Sequential Optimization**: What's the optimal sequencing to maximize strategic momentum?

**Executive Decision Framework:**
- What are the 3 most critical decisions that would unlock the most strategic value?
- How do we communicate this synthesis to stakeholders for maximum buy-in?
- What metrics will tell us if our synthesis is working?

Work through this systematically, challenging assumptions and identifying breakthrough opportunities.`
    },
    {
      id: 'innovation-intersection',
      title: 'Innovation Intersection Mapping',
      context: 'Discovering breakthrough opportunities at the convergence of disciplines',
      domain: 'Strategic Innovation',
      impact: 'Identifies white space opportunities others miss',
      strategicDepth: 'visionary',
      timeSpecific: {
        morning: 'Blue-sky intersection discovery - when possibilities are boundless',
        afternoon: 'Disciplined opportunity validation - when rigor meets innovation',
        evening: 'Wisdom-guided pattern recognition - when experience reveals connections'
      },
      prompt: `I want to explore innovation opportunities at the intersection of: [FIELD A] + [FIELD B] + [YOUR DOMAIN]

**INTERSECTION ANALYSIS:**

**Disciplinary Deep Dive:**
- What are the core principles, methodologies, and breakthrough innovations in each field?
- Where are the current limitations or unsolved problems in each discipline?
- What emerging trends or technologies are reshaping each field?

**Convergence Opportunity Mapping:**
1. **Methodology Transfer**: How could methodologies from Field A solve problems in Field B?
2. **Technology Synthesis**: What happens when we combine the best technologies from both fields?
3. **Principle Integration**: How do the fundamental principles of each field complement or conflict?
4. **Market White Space**: What user needs exist at the intersection that nobody is addressing?

**Innovation Hypothesis Generation:**
- What would be possible if we combined the best of both worlds?
- What assumptions from each field would we need to challenge?
- Where are the biggest opportunities for breakthrough innovation?

**Strategic Validation Framework:**
- How large is the addressable opportunity at this intersection?
- What would it take to build competitive advantage in this space?
- Who would be the ideal early adopters for intersectional innovation?
- What partnerships or capabilities would we need to develop?

**Execution Pathway:**
Design a systematic approach to validate and develop the most promising intersectional opportunities.`
    },
    {
      id: 'leadership-decision-architecture',
      title: 'Leadership Decision Architecture',
      context: 'Structuring complex decisions for optimal outcomes',
      domain: 'Executive Leadership',
      impact: 'Transforms decision-making from reactive to strategic',
      strategicDepth: 'strategic',
      timeSpecific: {
        morning: 'Strategic clarity architecture - when decisions shape direction',
        afternoon: 'Execution-focused decision structure - when clarity meets action',
        evening: 'Wisdom-informed choice architecture - when experience guides judgment'
      },
      prompt: `I need to architect a decision-making approach for: [DESCRIBE YOUR DECISION CONTEXT]

**DECISION ARCHITECTURE FRAMEWORK:**

**Decision Characterization:**
- What type of decision is this? (Strategic, operational, tactical, crisis)
- What's the true cost of delay vs. the cost of getting it wrong?
- Who are the real decision-makers, and what do they truly care about?

**Information Architecture:**
1. **Critical Information**: What information is essential vs. nice-to-have?
2. **Signal vs. Noise**: How do we separate meaningful data from distracting details?
3. **Uncertainty Management**: What are we uncertain about, and how do we make decisions despite uncertainty?
4. **Bias Recognition**: What cognitive biases are likely to influence this decision?

**Stakeholder Dynamics:**
- Who needs to be involved in making this decision?
- Who needs to be consulted, and who just needs to be informed?
- What are the hidden politics or competing interests?
- How do we build consensus while maintaining decision quality?

**Decision Methodology:**
1. **Options Generation**: How do we ensure we're considering all viable alternatives?
2. **Criteria Development**: What are the weighted decision criteria?
3. **Scenario Planning**: How does each option perform under different scenarios?
4. **Reversibility Analysis**: Which decisions can be reversed if they don't work?

**Implementation Architecture:**
- How do we structure the decision to maximize learning?
- What are the key decision gates and review points?
- How do we maintain strategic alignment while allowing tactical flexibility?

Create a decision architecture that optimizes for both decision quality and implementation success.`
    },
    {
      id: 'ai-collaboration-mastery',
      title: 'AI Collaboration Mastery',
      context: 'Elevating human-AI partnership beyond basic prompting',
      domain: 'Strategic AI Partnership',
      impact: 'Transforms AI from tool to strategic partner',
      strategicDepth: 'strategic',
      timeSpecific: {
        morning: 'Partnership potential exploration - when AI collaboration possibilities emerge',
        afternoon: 'Strategic implementation focus - when AI partnership becomes systematic',
        evening: 'Collaborative wisdom integration - when human insight guides AI capability'
      },
      prompt: `I want to develop mastery in AI collaboration for: [YOUR STRATEGIC OBJECTIVE]

**AI COLLABORATION MASTERY FRAMEWORK:**

**Partnership Strategy:**
- What are you trying to achieve that requires AI collaboration beyond basic Q&A?
- Where do your human strengths complement AI capabilities?
- What cognitive tasks would benefit from systematic AI partnership?

**Collaboration Architecture:**
1. **Role Definition**: How do we define complementary roles for human and AI?
2. **Workflow Integration**: Where does AI add value in your thinking/working process?
3. **Quality Frameworks**: How do we ensure AI contributions meet your standards?
4. **Iterative Refinement**: How do we improve collaboration over time?

**Strategic Prompting Methodology:**
- How do we frame problems to leverage AI's pattern recognition?
- What context and constraints help AI understand your standards?
- How do we structure multi-turn conversations for complex problems?
- What examples or frameworks help AI understand your thinking style?

**Advanced Collaboration Techniques:**
1. **Perspective Multiplication**: Using AI to explore multiple viewpoints
2. **Assumption Challenging**: Systematic questioning of your assumptions
3. **Blind Spot Identification**: Using AI to reveal what you might miss
4. **Strategic Synthesis**: Combining AI analysis with human wisdom

**Mastery Development:**
- What specific collaboration skills do you want to develop?
- How will you measure improvement in your AI partnership?
- What feedback loops will help you refine your approach?

Design a personalized approach to developing AI collaboration mastery that amplifies your strategic thinking.`
    },
    {
      id: 'design-leadership-strategy',
      title: 'Design Leadership Strategy',
      context: 'Positioning design as strategic business capability',
      domain: 'Design Leadership',
      impact: 'Elevates design from service to strategic advantage',
      strategicDepth: 'strategic',
      timeSpecific: {
        morning: 'Vision articulation - when design strategy takes shape',
        afternoon: 'Implementation pathway - when design leadership becomes systematic',
        evening: 'Legacy building - when design impact creates lasting value'
      },
      prompt: `I need to develop design leadership strategy for: [YOUR ORGANIZATION/CONTEXT]

**DESIGN LEADERSHIP STRATEGY FRAMEWORK:**

**Strategic Context:**
- What business challenges could be solved through design thinking?
- How mature is design thinking in your organization?
- What are the biggest barriers to design having strategic impact?

**Design Leadership Vision:**
1. **Value Proposition**: How does design create measurable business value?
2. **Capability Building**: What design capabilities need to be developed?
3. **Cultural Integration**: How do we make design thinking part of organizational DNA?
4. **Competitive Advantage**: How does design become a differentiator?

**Implementation Strategy:**
- What early wins would demonstrate design's strategic value?
- How do we build design credibility with senior leadership?
- What partnerships or alliances would amplify design impact?
- How do we measure and communicate design ROI?

**Design Excellence Framework:**
1. **Quality Standards**: What defines exceptional design in your context?
2. **Process Discipline**: How do we maintain design rigor at scale?
3. **Innovation Balance**: How do we balance proven approaches with innovation?
4. **Talent Development**: How do we build design leadership capability?

**Strategic Positioning:**
- How do we position design as essential to strategic success?
- What stories and examples demonstrate design's strategic impact?
- How do we build a design-forward reputation in your industry?

Create a comprehensive strategy for establishing design as a core strategic capability.`
    },
    {
      id: 'future-state-architecture',
      title: 'Future-State Architecture',
      context: 'Designing tomorrow while executing today',
      domain: 'Strategic Foresight',
      impact: 'Bridges present capabilities with future possibilities',
      strategicDepth: 'visionary',
      timeSpecific: {
        morning: 'Possibility architecture - when future potential becomes visible',
        afternoon: 'Pathway engineering - when vision becomes actionable',
        evening: 'Wisdom-guided foresight - when experience illuminates tomorrow'
      },
      prompt: `I need to architect a future state for: [YOUR DOMAIN/ORGANIZATION]

**FUTURE-STATE ARCHITECTURE FRAMEWORK:**

**Future Context Analysis:**
- What macro trends will reshape your industry in the next 5-10 years?
- What emerging technologies will be mature enough to impact your domain?
- What societal or behavioral changes will affect your stakeholders?

**Vision Architecture:**
1. **Possibility Mapping**: What becomes possible in your future state?
2. **Capability Evolution**: How do required capabilities evolve?
3. **Value Creation**: What new forms of value become possible?
4. **Stakeholder Experience**: How do stakeholder experiences transform?

**Bridge Strategy:**
- What capabilities can we build today that will be essential tomorrow?
- How do we balance future investment with present performance?
- What experiments or pilots help us learn about the future?
- How do we maintain strategic momentum while building for tomorrow?

**Adaptive Architecture:**
1. **Scenario Planning**: How do we prepare for multiple possible futures?
2. **Learning Systems**: How do we continuously update our future vision?
3. **Capability Optionality**: How do we maintain flexibility as the future unfolds?
4. **Strategic Patience**: How do we invest in long-term capability building?

**Implementation Pathway:**
- What's the optimal sequence for building toward your future state?
- How do we communicate future vision to inspire present action?
- What metrics help us track progress toward our future state?

Design a systematic approach to building the capabilities needed for your future state while maintaining present performance.`
    }
  ];

  const copyToClipboard = async (text: string, promptId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedPrompt(promptId);
      setTimeout(() => setCopiedPrompt(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const getTimeAwarePrompt = (prompt: StrategicPrompt) => {
    const timeSpecific = prompt.timeSpecific[timeConfig.timeOfDay];
    return `${prompt.prompt}\n\n**TIME-AWARE CONTEXT:**\n${timeSpecific}`;
  };

  const handleEnterFramework = useCallback(() => {
    setActiveView('framework');
  }, []);

  const handleResearchMode = useCallback(() => {
    setActiveView('research');
  }, []);

  const handleMVPMode = useCallback(() => {
    setActiveView('mvp');
  }, []);

  if (activeView === 'framework') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button 
            variant="outline" 
            onClick={() => setActiveView('archive')}
            className="flex items-center gap-2"
          >
            ← Back to Innovation Archive
          </Button>
          <Badge variant="outline" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            Strategic Framework
          </Badge>
        </div>
        <AICollaborationFramework />
      </div>
    );
  }

  if (activeView === 'mvp') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button 
            variant="outline" 
            onClick={() => setActiveView('archive')}
            className="flex items-center gap-2"
          >
            ← Back to Innovation Archive
          </Button>
          <Badge variant="outline" className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
            Strategic Validation
          </Badge>
        </div>
        <DOSFrameworkMVP />
      </div>
    );
  }

  if (activeView === 'research') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button 
            variant="outline" 
            onClick={() => setActiveView('archive')}
            className="flex items-center gap-2"
          >
            ← Back to Innovation Archive
          </Button>
          <Badge variant="outline" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            Research & Methodology
          </Badge>
        </div>
        <MVPValidationTracker />
      </div>
    );
  }

  return (
    <div className="space-y-16">
      {/* Strategic Innovation Archive Header */}
      <div className="text-center space-y-8 max-w-6xl mx-auto">
        <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-full">
          <Clock className="w-5 h-5 text-purple-600" />
          <span className="text-base font-medium">Strategic Innovation Archive</span>
          <Badge variant="outline" className="text-sm bg-white/50 dark:bg-black/50">
            <TimeAwareText
              morning="Morning Clarity"
              afternoon="Afternoon Precision"
              evening="Evening Wisdom"
            />
          </Badge>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
          <TimeAwareText
            morning="Where Fresh Perspective Meets Strategic Discipline"
            afternoon="Applied Innovation Through Systematic Thinking"
            evening="Earned Wisdom Distilled Into Strategic Tools"
          />
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
          <TimeAwareText
            morning="Strategic frameworks built through disciplined innovation. When clarity emerges from complexity, these tools guide breakthrough thinking."
            afternoon="Systematic approaches to strategic challenges. Proven methodologies that transform complexity into competitive advantage."
            evening="Distilled wisdom from strategic design leadership. Time-tested approaches that bridge timeless principles with emerging possibilities."
          />
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={handleMVPMode}
            className="btn-premium flex items-center gap-3 px-8 py-4"
            size="lg"
          >
            <TestTube className="w-5 h-5" />
            <TimeAwareText
              morning="Explore Strategic Validation"
              afternoon="Apply DOS Framework"
              evening="Access Proven Methodology"
            />
            <ArrowRight className="w-4 h-4" />
          </Button>
          
          <Button 
            variant="outline"
            onClick={handleEnterFramework}
            className="flex items-center gap-3 px-8 py-4"
            size="lg"
          >
            <Layers className="w-5 h-5" />
            <TimeAwareText
              morning="Discover Framework Suite"
              afternoon="Access Full Methodology"
              evening="Review Strategic Archive"
            />
          </Button>
        </div>
      </div>

      {/* Time-Aware Strategic Context */}
      <Card className="p-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-blue-200 dark:border-blue-800">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Compass className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-semibold">
              <TimeAwareText
                morning="Strategic Innovation Context"
                afternoon="Applied Strategic Thinking"
                evening="Wisdom-Guided Innovation"
              />
            </h3>
          </div>
          <div className="text-muted-foreground leading-relaxed">
            <TimeAwareText
              morning="Fresh perspective meets systematic discipline. These frameworks emerge from the intersection of creative possibility and strategic rigor—designed for leaders who understand that exceptional outcomes require exceptional thinking."
              afternoon="Proven methodologies refined through application. Each framework represents disciplined innovation—systematic approaches that transform strategic challenges into competitive advantages through rigorous thinking and precise execution."
              evening="Distilled wisdom from strategic design leadership. Time-tested approaches that honor both timeless principles and emerging possibilities—authentically developed, never generic, always grounded in practical strategic impact."
            />
          </div>
        </div>
      </Card>

      {/* Strategic Innovation Archive */}
      <div className="space-y-10">
        <div className="text-center space-y-4">
          <h2 className="text-2xl md:text-3xl font-semibold">
            <TimeAwareText
              morning="Strategic Innovation Archive"
              afternoon="Applied Strategic Frameworks"
              evening="Curated Wisdom Collection"
            />
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            <TimeAwareText
              morning="Breakthrough thinking methodologies for strategic leaders who demand excellence"
              afternoon="Systematic approaches to complex strategic challenges—disciplined, proven, transformative"
              evening="Earned wisdom distilled into practical strategic tools—authentically developed, rigorously tested"
            />
          </p>
        </div>

        <div className="space-y-8">
          {strategicPrompts.map((prompt, index) => (
            <Card key={prompt.id} className="p-8 hover:shadow-2xl transition-all duration-500 border-l-4 border-l-purple-500">
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-4">
                      <h3 className="text-xl font-semibold">{prompt.title}</h3>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          prompt.strategicDepth === 'visionary' ? 'border-purple-200 text-purple-700 dark:border-purple-700 dark:text-purple-300' :
                          prompt.strategicDepth === 'strategic' ? 'border-blue-200 text-blue-700 dark:border-blue-700 dark:text-blue-300' :
                          'border-green-200 text-green-700 dark:border-green-700 dark:text-green-300'
                        }`}
                      >
                        {prompt.strategicDepth}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{prompt.context}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Target className="w-4 h-4" />
                        <span>{prompt.domain}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        <span>{prompt.impact}</span>
                      </div>
                    </div>
                    {/* Time-aware context */}
                    <div className="p-3 bg-muted/50 rounded-lg border-l-2 border-l-purple-300">
                      <div className="text-sm font-medium text-purple-700 dark:text-purple-300 mb-1">
                        <TimeAwareText
                          morning="Morning Context"
                          afternoon="Afternoon Context"
                          evening="Evening Context"
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {prompt.timeSpecific[timeConfig.timeOfDay]}
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() => copyToClipboard(getTimeAwarePrompt(prompt), prompt.id)}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 ml-6"
                  >
                    {copiedPrompt === prompt.id ? (
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                    {copiedPrompt === prompt.id ? 'Copied!' : 'Copy Framework'}
                  </Button>
                </div>
                
                {/* Expandable Full Framework */}
                <details className="group">
                  <summary className="cursor-pointer text-sm text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 font-medium flex items-center gap-2">
                    <span>View Complete Strategic Framework</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-open:rotate-90" />
                  </summary>
                  <div className="mt-6 p-6 bg-muted/30 rounded-lg border-l-4 border-l-purple-200 dark:border-l-purple-700">
                    <pre className="text-sm whitespace-pre-wrap leading-relaxed text-muted-foreground">
                      {getTimeAwarePrompt(prompt)}
                    </pre>
                  </div>
                </details>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Strategic Access Points */}
      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="p-8 hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 border-blue-200 dark:border-blue-800">
          <div className="space-y-6">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-green-600 rounded-xl flex items-center justify-center">
              <TestTube className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-semibold">Strategic Validation</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              <TimeAwareText
                morning="Systematic approach to validating strategic initiatives through disciplined methodology"
                afternoon="Proven framework for strategic decision-making and initiative validation"
                evening="Time-tested methodology for strategic validation and systematic thinking"
              />
            </p>
            <Button onClick={handleMVPMode} className="w-full">
              <TimeAwareText
                morning="Explore Validation Framework"
                afternoon="Apply Strategic Methodology"
                evening="Access Proven Approach"
              />
            </Button>
          </div>
        </Card>

        <Card className="p-8 hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 border-purple-200 dark:border-purple-800">
          <div className="space-y-6">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
              <Layers className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-semibold">Framework Suite</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              <TimeAwareText
                morning="Comprehensive collection of strategic frameworks for systematic innovation"
                afternoon="Complete methodology suite for strategic thinking and execution"
                evening="Curated wisdom collection—proven frameworks for strategic leadership"
              />
            </p>
            <Button variant="outline" onClick={handleEnterFramework} className="w-full">
              <TimeAwareText
                morning="Discover Framework Collection"
                afternoon="Access Strategic Methodologies"
                evening="Review Wisdom Archive"
              />
            </Button>
          </div>
        </Card>

        <Card className="p-8 hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-950/20 dark:to-indigo-900/20 border-indigo-200 dark:border-indigo-800">
          <div className="space-y-6">
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-semibold">Research & Methodology</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              <TimeAwareText
                morning="Systematic research approaches for strategic insight and innovation discovery"
                afternoon="Rigorous methodology for strategic research and validated learning"
                evening="Disciplined approach to research—where curiosity meets systematic thinking"
              />
            </p>
            <Button variant="outline" onClick={handleResearchMode} className="w-full">
              <TimeAwareText
                morning="Explore Research Methods"
                afternoon="Apply Research Framework"
                evening="Access Research Wisdom"
              />
            </Button>
          </div>
        </Card>
      </div>

      {/* Strategic Philosophy */}
      <Card className="p-12 bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-950/50 dark:to-gray-950/50 border-slate-200 dark:border-slate-800">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Users className="w-8 h-8 text-slate-600 dark:text-slate-400" />
            <h3 className="text-2xl font-semibold">
              <TimeAwareText
                morning="Strategic Innovation Philosophy"
                afternoon="Applied Strategic Thinking"
                evening="Distilled Strategic Wisdom"
              />
            </h3>
          </div>
          <blockquote className="text-lg md:text-xl italic text-muted-foreground leading-relaxed">
            <TimeAwareText
              morning="&quot;Strategic innovation requires more than creativity—it demands systematic thinking. These frameworks represent the intersection of possibility and discipline, designed for leaders who understand that exceptional outcomes require exceptional thinking.&quot;"
              afternoon="&quot;Excellence in strategy comes from disciplined methodology, not inspiration alone. These frameworks embody rigorous thinking made systematic—proven approaches that transform strategic challenges into competitive advantages.&quot;"
              evening="&quot;True strategic wisdom emerges from the marriage of timeless principles and emerging possibilities. These frameworks represent earned authority—authentically developed, rigorously tested, never generic.&quot;"
            />
          </blockquote>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span>— Ric Rios, Strategic Design Leader</span>
            <Badge variant="outline" className="text-xs">
              <TimeAwareText
                morning="Morning Innovation"
                afternoon="Afternoon Discipline"
                evening="Evening Wisdom"
              />
            </Badge>
          </div>
        </div>
      </Card>
    </div>
  );
}