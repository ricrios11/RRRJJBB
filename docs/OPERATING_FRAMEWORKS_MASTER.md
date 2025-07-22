# RicRios Portfolio - Operating Frameworks Master Document
*Version 1.0 - Stable State*

## 🎛️ Base OS Stack Architecture

### Core Operating Systems
| OS | Function | Purpose | Agent Integration |
|----|----------|---------|-------------------|
| **SeedOS** | Problem Clarification | Prep stage → feeds all other agents | Foundation for all workflows |
| **LyraOS** | Orchestration & Rigor | Coordination across all systems | Agent R routing logic |
| **DOS** | Design Operating System | Layout and UX structure guidance | Agent D implementation |
| **COS** | Content Operating System | Tone, editorial, copywriting | Agent S execution |
| **MemOS** | Memory & Recall | History tracking and context | Agent X archival |
| **EngageOS** | Journey & Flow Logic | Module sequencing and UX flow | Agent G guidance |

### Workflow Integration
```
SeedOS → LyraOS → [DOS + COS + MemOS + EngageOS] → Output
   ↓        ↓              ↓
Problem → Route → Execute → Archive
```

## 🎭 Cascade Multi-Agent Design Studio

### Agent Roles & Responsibilities
```yaml
Agent R (Orchestrator):
  - Function: LyraOS prompt routing
  - Responsibility: Coordinate all agent activities
  - Input: Reframed goals from SeedOS
  - Output: Agent-specific instructions

Agent Q (Questioner):
  - Function: Problem statement sharpening
  - Responsibility: Fallback to SeedOS when clarity needed
  - Input: Unclear or broad requests
  - Output: Refined problem statements

Agent S (Stylist):
  - Function: Tone, polish, luxury editorial copy
  - Responsibility: COS implementation
  - Input: Tone profiles and content requirements
  - Output: Refined copy with editorial minimalism

Agent D (Designer):
  - Function: Tailwind layout, DOM-aware UX
  - Responsibility: DOS implementation
  - Input: Layout variants and design requirements
  - Output: Structured, responsive layouts

Agent G (Guide):
  - Function: User journey logic
  - Responsibility: EngageOS implementation
  - Input: Intent tokens and flow requirements
  - Output: Module sequences and interaction patterns

Agent A (Analyst):
  - Function: MPC-safe intent inference
  - Responsibility: Context analysis and pattern detection
  - Input: User behavior and context data
  - Output: Intent classifications and recommendations

Agent X (Archivist):
  - Function: Memory tracking and engagement delta logging
  - Responsibility: MemOS implementation
  - Input: Session data and execution results
  - Output: Historical context and performance insights
```

## 🎛️ Dynamic Agent Tuner System

### Intent Token Profiles
```javascript
const intentProfiles = {
  professional: {
    tone: 'authoritative, high formality, confident',
    layout: 'executive hierarchy, generous spacing, professional dark',
    use_case: 'LinkedIn referrals, business inquiries'
  },
  creative: {
    tone: 'inspiring, medium formality, curious',
    layout: 'discovery hierarchy, dynamic spacing, creative gradient',
    use_case: 'Dribbble/Behance referrals, design exploration'
  },
  technical: {
    tone: 'analytical, medium-high formality, focused',
    layout: 'structured hierarchy, compact spacing, technical blue',
    use_case: 'GitHub referrals, technical documentation'
  },
  evening: {
    tone: 'contemplative, medium formality, wise',
    layout: 'flowing hierarchy, relaxed spacing, evening warm',
    use_case: 'After-hours browsing, reflective content'
  },
  mobile: {
    tone: 'direct, low-medium formality, efficient',
    layout: 'vertical priority, touch-friendly, high contrast',
    use_case: 'Mobile devices, quick interactions'
  },
  default: {
    tone: 'balanced, medium formality, approachable',
    layout: 'balanced hierarchy, comfortable spacing, adaptive',
    use_case: 'General browsing, first-time visitors'
  }
};
```

### Context Detection Logic
```javascript
function inferIntent(context) {
  const { timeOfDay, deviceType, referrer, userAgent } = context;
  
  // Time-based
  if (timeOfDay === 'evening' || timeOfDay === 'night') return 'evening';
  
  // Device-based
  if (deviceType === 'mobile' || /Mobile|Android|iPhone/i.test(userAgent)) return 'mobile';
  
  // Referrer-based
  if (/linkedin|professional|business/i.test(referrer)) return 'professional';
  if (/dribbble|behance|design|creative/i.test(referrer)) return 'creative';
  if (/github|stackoverflow|tech|dev/i.test(referrer)) return 'technical';
  
  return 'default';
}
```

## 🔄 Orchestration Workflow Pattern

### Standard Execution Flow
```yaml
# Homepage Evolution Example
workflow:
  - agent: seedos
    action: clarify_goal
    input: "User request or problem statement"
    output: reframed_goal

  - agent: dynamic_tuner
    action: adjust_tone_layout
    input: 
      intent_token: "{{detected_intent}}"
    output:
      tone_profile: "..."
      layout_variant: "..."

  - agent: agent-r
    action: orchestrate
    input:
      goal: "{{reframed_goal}}"
      tuning: "{{tone_profile}}, {{layout_variant}}"
    output: agent_plan

  - parallel:
      - agent: agent-s
        input: "{{agent_plan.agent-s}}"
        context: "{{tone_profile}}"
        
      - agent: agent-d
        input: "{{agent_plan.agent-d}}"
        context: "{{layout_variant}}"
        
      - agent: agent-g
        input: "{{agent_plan.agent-g}}"
        context: "{{interaction_style}}"

  - agent: agent-x
    action: logSession
    input: "{{all_execution_results}}"
```

## 🎯 Design Principles & Constraints

### Editorial Minimalism
- Clean, uncluttered layouts
- Purposeful white space
- Sophisticated typography hierarchy
- Subtle, meaningful interactions

### Systematic Design Thinking
- Base OS Stack guides all decisions
- Consistent component patterns
- Scalable architecture
- Performance-first approach

### Context Awareness
- Time-aware content adaptation
- Device-responsive layouts
- Intent-based experience tuning
- Emotional context consideration

### Technical Excellence
- Clean, maintainable code
- Conflict-free CSS architecture
- Modular component structure
- Extensible for future features

## 🚀 Implementation Guidelines

### Development Workflow
1. **Problem Clarification** (SeedOS)
2. **Context Detection** (Dynamic Tuner)
3. **Agent Orchestration** (Agent R)
4. **Parallel Execution** (Agents S/D/G)
5. **Session Archival** (Agent X)

### Quality Assurance
- Preserve existing functionality
- Test across all intent contexts
- Verify responsive behavior
- Maintain performance standards

### Deployment Strategy
- Incremental enhancement approach
- Rollback plan with archived states
- Cross-browser compatibility testing
- Production monitoring and feedback

---

*This master document serves as the definitive reference for all operating frameworks, ensuring consistent application of systematic design principles while maintaining editorial minimalism and context awareness.*
