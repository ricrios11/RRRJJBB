# Cascade Multi-Agent Design Studio Framework

## Studio Roles as Cascade Agents

| Agent | Role | Claude Prompt Function |
|-------|------|------------------------|
| **Agent R** | Orchestrator | LyraOS prompt routing |
| **Agent Q** | Questioner | Sharpens problem statement (fallback to SeedOS) |
| **Agent S** | Stylist | Tone, polish, luxury editorial copy |
| **Agent D** | Designer | Tailwind layout, DOM-aware UX |
| **Agent G** | Guide | User journey logic |
| **Agent A** | Analyst | MPC-safe intent inference |
| **Agent X** | Archivist | Memory tracking and engagement delta logging |

## Workflow Pattern

```yaml
# Homepage Evolution Example
- agent: seedos
  input: "Ric wants to evolve homepage"
  output: "reframed_goal"

- agent: agent-r
  input: "{{reframed_goal}}"
  output: "agent_plan"

- parallel:
    - agent: agent-s
      input: "{{agent_plan.agent-s}}"
      
    - agent: agent-d
      input: "{{agent_plan.agent-d}}"
      
    - agent: agent-g
      input: "{{agent_plan.agent-g}}"

- agent: agent-x
  action: "logSession"
```

## Current Execution State

### ✅ Completed
- **SeedOS**: Reframed goal → "How might we design a homepage experience that adapts to intent, time of day, and emotional context—while staying true to Ric's editorial minimalism?"
- **Agent-R**: Orchestration plan → agent-s (hero copy), agent-d (mobile layout), agent-g (module order)

### 🔄 Ready for Parallel Execution
- **Agent-S**: Refine tone and copy for hero section (nighttime variant)
- **Agent-D**: Structure mobile layout using Tailwind logic
- **Agent-G**: Define module order based on visitor intent

### 📝 Pending
- **Agent-X**: Session logging and memory tracking

## Design Principles
- Maintain editorial minimalism
- Preserve time-aware functionality
- Build on clean TechOS foundation
- Enhance rather than replace existing features

---
*Framework enables systematic, coordinated design execution while maintaining Ric's aesthetic and functional design principles.*
