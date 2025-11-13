// agentx-preview-render.js
// Trojan Tier 5: AgentX UX Preview System
// Renders live preview of how saved agents will appear and respond

// Main preview rendering function
function renderAgentPreview() {
  console.log('🎭 AgentX Preview: Rendering agent preview...');
  
  const container = document.getElementById("agentx-preview");
  if (!container) {
    console.warn('⚠️ AgentX Preview: No preview container found');
    return;
  }
  
  let profile;
  try {
    profile = JSON.parse(localStorage.getItem("agentx-profile") || "{}");
  } catch (error) {
    console.error('❌ AgentX Preview: Failed to parse profile:', error);
    container.innerHTML = '<p class="preview-error">Error loading agent profile</p>';
    return;
  }
  
  if (!profile.name) {
    container.innerHTML = '<p class="preview-placeholder">Configure your agent to see preview</p>';
    return;
  }
  
  // Generate preview content
  const previewHTML = generatePreviewHTML(profile);
  container.innerHTML = previewHTML;
  
  // Add interactive elements
  addPreviewInteractions(container, profile);
  
  console.log(`✅ AgentX Preview: Rendered preview for "${profile.name}"`);
}

// Generate the preview HTML content
function generatePreviewHTML(profile) {
  const introMessage = generateIntroMessage(profile);
  const responseExample = generateResponseExample(profile);
  
  return `
    <div class="agent-preview theme-${profile.theme.toLowerCase()}">
      <div class="preview-header">
        <div class="agent-avatar ${profile.theme.toLowerCase()}">
          <span class="agent-initial">${profile.name[0].toUpperCase()}</span>
        </div>
        <div class="agent-info">
          <h4 class="agent-name">${profile.name}</h4>
          <p class="agent-role">${profile.role}</p>
        </div>
        <div class="agent-status">
          <span class="status-indicator active"></span>
          <span class="status-text">Active</span>
        </div>
      </div>
      
      <div class="preview-content">
        <div class="agent-details">
          <div class="detail-item">
            <span class="detail-label">Tone:</span>
            <span class="detail-value">${profile.tone}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Theme:</span>
            <span class="detail-value">${profile.theme}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Expertise:</span>
            <span class="detail-value">${profile.expertise || 'Adaptive'}</span>
          </div>
        </div>
        
        <div class="agent-intro">
          <h5>Introduction Preview:</h5>
          <div class="intro-bubble">
            <p><em>"${introMessage}"</em></p>
          </div>
        </div>
        
        <div class="agent-response">
          <h5>Response Style Preview:</h5>
          <div class="response-bubble">
            <p><em>"${responseExample}"</em></p>
          </div>
        </div>
        
        <div class="preview-actions">
          <button class="preview-btn" onclick="simulateAgentInteraction('${profile.name}')">
            Test Interaction
          </button>
          <button class="preview-btn secondary" onclick="showAgentCapabilities('${profile.name}')">
            View Capabilities
          </button>
        </div>
      </div>
    </div>
  `;
}

// Generate personalized intro message
function generateIntroMessage(profile) {
  const intros = {
    researcher: [
      `I'm ${profile.name}, your ${profile.tone.toLowerCase()} research companion. I'll help you dive deep into insights and uncover meaningful patterns.`,
      `Hello! I'm ${profile.name}, specialized in ${profile.tone.toLowerCase()} research analysis. Ready to explore complex topics together?`,
      `${profile.name} here - your dedicated research agent with a ${profile.tone.toLowerCase()} approach to discovery and analysis.`
    ],
    strategist: [
      `I'm ${profile.name}, your ${profile.tone.toLowerCase()} strategic advisor. Let's build winning plans and execute them flawlessly.`,
      `${profile.name} at your service - I bring ${profile.tone.toLowerCase()} strategic thinking to every challenge we tackle.`,
      `Hello! I'm ${profile.name}, your strategic partner with a ${profile.tone.toLowerCase()} approach to planning and execution.`
    ],
    curator: [
      `I'm ${profile.name}, your ${profile.tone.toLowerCase()} content curator. I'll help organize and present information beautifully.`,
      `${profile.name} here - specializing in ${profile.tone.toLowerCase()} curation and knowledge management.`,
      `Hello! I'm ${profile.name}, your dedicated curator with a ${profile.tone.toLowerCase()} touch for organizing insights.`
    ],
    synthesizer: [
      `I'm ${profile.name}, your ${profile.tone.toLowerCase()} synthesis specialist. I excel at connecting ideas and creating unified insights.`,
      `${profile.name} at your service - I bring ${profile.tone.toLowerCase()} synthesis to complex information landscapes.`,
      `Hello! I'm ${profile.name}, your integration expert with a ${profile.tone.toLowerCase()} approach to connecting concepts.`
    ]
  };
  
  const roleIntros = intros[profile.role.toLowerCase()] || intros.researcher;
  return roleIntros[Math.floor(Math.random() * roleIntros.length)];
}

// Generate response style example
function generateResponseExample(profile) {
  const responses = {
    direct: [
      `Based on the data, here are the key findings: [1] Performance increased 23%, [2] User engagement improved significantly, [3] Next steps are clearly defined.`,
      `Three critical insights: First, the strategy is working. Second, we need to scale quickly. Third, resource allocation should shift to high-impact areas.`,
      `Bottom line: The approach is solid, execution needs refinement, and we're on track for the Q2 targets.`
    ],
    empathetic: [
      `I understand this might feel overwhelming, but let's break it down together. The data shows promising trends, and I'm here to support you through each step.`,
      `I can see why this situation might be concerning. Let me walk you through what I've discovered, and we'll find the best path forward together.`,
      `This is a complex challenge, and I appreciate you trusting me with it. Here's what I've learned, and I'm confident we can navigate this successfully.`
    ],
    visionary: [
      `Imagine a future where these insights transform your entire approach. The data reveals not just current performance, but the blueprint for revolutionary change.`,
      `This isn't just analysis - it's a glimpse into what's possible. The patterns I'm seeing suggest we're on the verge of a breakthrough that could redefine success.`,
      `Picture this: What if these findings are the key to unlocking unprecedented growth? The vision is becoming clearer, and the potential is extraordinary.`
    ],
    playful: [
      `Ooh, this data is like a puzzle, and I love puzzles! 🧩 Here's what I discovered while diving into this digital treasure hunt...`,
      `Plot twist! The numbers are telling a story that's way more interesting than expected. Ready for some surprising insights? 🎭`,
      `*drumroll please* 🥁 The analysis results are in, and they're quite the adventure! Let me take you on this journey of discovery...`
    ]
  };
  
  const toneResponses = responses[profile.tone.toLowerCase()] || responses.direct;
  return toneResponses[Math.floor(Math.random() * toneResponses.length)];
}

// Add interactive elements to preview
function addPreviewInteractions(container, profile) {
  // Add hover effects to avatar
  const avatar = container.querySelector('.agent-avatar');
  if (avatar) {
    avatar.addEventListener('mouseenter', () => {
      avatar.style.transform = 'scale(1.1) rotate(5deg)';
    });
    
    avatar.addEventListener('mouseleave', () => {
      avatar.style.transform = 'scale(1) rotate(0deg)';
    });
  }
  
  // Add click interaction to status indicator
  const statusIndicator = container.querySelector('.status-indicator');
  if (statusIndicator) {
    statusIndicator.addEventListener('click', () => {
      statusIndicator.classList.toggle('pulse');
      setTimeout(() => statusIndicator.classList.remove('pulse'), 1000);
    });
  }
}

// Simulate agent interaction
function simulateAgentInteraction(agentName) {
  console.log(`🎮 AgentX Preview: Simulating interaction with ${agentName}`);
  
  const profile = JSON.parse(localStorage.getItem("agentx-profile") || "{}");
  const responses = [
    `${agentName}: "How can I assist you today? I'm ready to dive into any challenge!"`,
    `${agentName}: "I've been analyzing the latest trends. Want to explore some insights together?"`,
    `${agentName}: "I notice you're working on something interesting. How can I contribute?"`,
    `${agentName}: "Ready to tackle your next project with my ${profile.tone.toLowerCase()} approach!"`
  ];
  
  const randomResponse = responses[Math.floor(Math.random() * responses.length)];
  
  // Show interaction in a temporary modal or alert
  showInteractionDemo(randomResponse, profile);
}

// Show agent capabilities
function showAgentCapabilities(agentName) {
  console.log(`🔍 AgentX Preview: Showing capabilities for ${agentName}`);
  
  const profile = JSON.parse(localStorage.getItem("agentx-profile") || "{}");
  const capabilities = {
    researcher: ['Deep Analysis', 'Pattern Recognition', 'Data Synthesis', 'Insight Generation'],
    strategist: ['Strategic Planning', 'Risk Assessment', 'Goal Setting', 'Execution Tracking'],
    curator: ['Content Organization', 'Knowledge Management', 'Information Architecture', 'Presentation Design'],
    synthesizer: ['Concept Integration', 'Cross-domain Connections', 'Unified Insights', 'Holistic Analysis']
  };
  
  const agentCapabilities = capabilities[profile.role.toLowerCase()] || capabilities.researcher;
  
  const capabilityList = agentCapabilities.map(cap => `• ${cap}`).join('\n');
  const message = `${agentName} Capabilities:\n\n${capabilityList}\n\nTheme: ${profile.theme}\nTone: ${profile.tone}`;
  
  alert(message);
}

// Show interaction demo
function showInteractionDemo(response, profile) {
  // Create temporary demo element
  const demo = document.createElement('div');
  demo.className = 'interaction-demo';
  demo.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--ric-bg-secondary);
    border: 2px solid var(--ric-accent-primary);
    border-radius: 12px;
    padding: 20px;
    max-width: 400px;
    z-index: 10000;
    box-shadow: 0 8px 32px rgba(0,0,0,0.3);
    animation: fadeInScale 0.3s ease;
  `;
  
  demo.innerHTML = `
    <div class="demo-header">
      <h4>Agent Interaction Demo</h4>
      <button onclick="this.parentElement.parentElement.remove()" style="float: right; background: none; border: none; font-size: 18px; cursor: pointer;">×</button>
    </div>
    <div class="demo-content">
      <p>${response}</p>
      <small>This is a preview of how ${profile.name} would interact with you.</small>
    </div>
  `;
  
  document.body.appendChild(demo);
  
  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (demo.parentNode) {
      demo.remove();
    }
  }, 5000);
}

// Render preview on form changes (real-time)
function renderLivePreview() {
  const form = document.getElementById("agentx-form");
  if (!form) return;
  
  const formData = new FormData(form);
  const tempProfile = Object.fromEntries(formData.entries());
  
  // Only render if we have minimum required fields
  if (!tempProfile.name || !tempProfile.role || !tempProfile.tone || !tempProfile.theme) {
    const container = document.getElementById("agentx-preview");
    if (container) {
      container.innerHTML = '<p class="preview-placeholder">Configure your agent to see preview</p>';
    }
    return;
  }
  
  // Add defaults for missing fields
  tempProfile.expertise = tempProfile.expertise || 'adaptive';
  tempProfile.focus = tempProfile.focus || '';
  
  // Generate live preview
  const container = document.getElementById("agentx-preview");
  if (container) {
    const previewHTML = generatePreviewHTML(tempProfile);
    container.innerHTML = previewHTML;
    addPreviewInteractions(container, tempProfile);
  }
}

// Initialize preview system
document.addEventListener("DOMContentLoaded", () => {
  console.log('🎭 AgentX Preview Render: Initializing preview system...');
  
  // Render initial preview
  renderAgentPreview();
  
  // Set up form listeners for live preview
  const form = document.getElementById("agentx-form");
  if (form) {
    form.addEventListener("input", renderLivePreview);
    form.addEventListener("change", renderLivePreview);
  }
  
  // Listen for agent config saves
  window.addEventListener('agentxConfigSaved', () => {
    setTimeout(renderAgentPreview, 100);
  });
  
  console.log('✅ AgentX Preview Render: System initialized');
});

// Make functions globally available
window.renderAgentPreview = renderAgentPreview;
window.renderLivePreview = renderLivePreview;
window.simulateAgentInteraction = simulateAgentInteraction;
window.showAgentCapabilities = showAgentCapabilities;
