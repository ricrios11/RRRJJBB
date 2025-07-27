// features.js
// Trojan Tranche 4: Sample LAB_FEATURES data structure
// This would typically be generated from feature_registry.yaml

window.LAB_FEATURES = [
  {
    id: "time-aware-content",
    label: "Time-Aware Content System",
    description: "Dynamic content that adapts based on time of day, creating contextual user experiences with smooth transitions and intelligent scheduling.",
    status: "live",
    category: "Content",
    version: "2.1",
    modal: "time-aware-modal",
    tags: ["dynamic", "time-based", "ux"],
    created: "2025-01-15",
    updated: "2025-01-26"
  },
  {
    id: "agentx-personalization",
    label: "AgentX Personalization",
    description: "AI agent configuration system allowing users to customize their virtual assistant's personality, expertise, and interaction style.",
    status: "alpha",
    category: "AI",
    version: "1.0",
    modal: "agentx-modal",
    tags: ["ai", "personalization", "assistant"],
    created: "2025-01-20",
    updated: "2025-01-26"
  },
  {
    id: "analytics-os",
    label: "AnalyticsOS v1",
    description: "Click-to-insight tracking system that captures user interactions and provides real-time analytics for feature engagement.",
    status: "alpha",
    category: "Analytics",
    version: "1.0",
    modal: "analytics-modal",
    tags: ["analytics", "tracking", "insights"],
    created: "2025-01-22",
    updated: "2025-01-26"
  },
  {
    id: "theme-sync-validator",
    label: "Theme Sync Validator",
    description: "Automated validation system ensuring content and visual themes remain synchronized across time-aware transitions.",
    status: "live",
    category: "Validation",
    version: "1.2",
    modal: "theme-validator-modal",
    tags: ["validation", "themes", "sync"],
    created: "2025-01-18",
    updated: "2025-01-25"
  },
  {
    id: "trojan-horse-os",
    label: "Trojan Horse OS",
    description: "Meta-framework for deploying incremental feature updates through strategic implementation tranches.",
    status: "live",
    category: "Framework",
    version: "3.0",
    modal: "trojan-os-modal",
    tags: ["framework", "deployment", "strategy"],
    created: "2025-01-10",
    updated: "2025-01-26"
  },
  {
    id: "neural-navigation",
    label: "Neural Navigation",
    description: "Predictive navigation system that learns user patterns and pre-loads likely next destinations for instant transitions.",
    status: "planned",
    category: "Navigation",
    version: "0.1",
    modal: "neural-nav-modal",
    tags: ["ai", "navigation", "predictive"],
    created: "2025-01-25",
    updated: "2025-01-25"
  },
  {
    id: "quantum-forms",
    label: "Quantum Forms",
    description: "Multi-dimensional form system that adapts field visibility and validation based on user context and previous interactions.",
    status: "planned",
    category: "Forms",
    version: "0.1",
    modal: "quantum-forms-modal",
    tags: ["forms", "adaptive", "quantum"],
    created: "2025-01-24",
    updated: "2025-01-24"
  },
  {
    id: "holographic-portfolio",
    label: "Holographic Portfolio",
    description: "3D portfolio presentation system with spatial navigation and immersive project exploration capabilities.",
    status: "planned",
    category: "Portfolio",
    version: "0.1",
    modal: "holographic-modal",
    tags: ["3d", "portfolio", "immersive"],
    created: "2025-01-23",
    updated: "2025-01-23"
  }
];

// Initialize features data
console.log(`🧪 Features Data: Loaded ${window.LAB_FEATURES.length} lab features`);

// Export for module systems if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = window.LAB_FEATURES;
}
