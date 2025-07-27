// agentx-loader.js
// Trojan Tier 5: AgentX Live Presence System
// Loads saved agent from localStorage and injects into UI

document.addEventListener("DOMContentLoaded", () => {
  console.log('🤖 AgentX Loader: Initializing live presence system...');
  
  // Load agent profile from localStorage
  let profile;
  try {
    const savedProfile = localStorage.getItem("agentx-profile");
    profile = savedProfile ? JSON.parse(savedProfile) : null;
  } catch (error) {
    console.error('❌ AgentX Loader: Failed to parse saved profile:', error);
    return;
  }
  
  // Exit early if no profile or no name
  if (!profile || !profile.name) {
    console.log('💭 AgentX Loader: No saved agent profile found');
    return;
  }
  
  console.log(`🎭 AgentX Loader: Loading agent "${profile.name}" (${profile.role})`);
  
  // Inject agent name into all .agentx-name elements
  injectAgentName(profile);
  
  // Apply theme-based body class
  applyAgentTheme(profile);
  
  // Inject agent presence indicators
  injectAgentPresence(profile);
  
  // Dispatch custom event for other systems
  window.dispatchEvent(new CustomEvent('agentxLoaded', {
    detail: { profile }
  }));
  
  console.log(`✅ AgentX Loader: Agent "${profile.name}" loaded successfully`);
});

// Inject agent name into designated elements
function injectAgentName(profile) {
  const nameElements = document.querySelectorAll(".agentx-name");
  
  if (nameElements.length === 0) {
    console.log('💡 AgentX Loader: No .agentx-name elements found');
    return;
  }
  
  nameElements.forEach((element, index) => {
    element.textContent = profile.name;
    element.setAttribute('data-agent-role', profile.role);
    element.setAttribute('data-agent-theme', profile.theme);
    
    // Add subtle animation
    element.style.opacity = '0';
    setTimeout(() => {
      element.style.transition = 'opacity 0.6s ease';
      element.style.opacity = '1';
    }, index * 100);
  });
  
  console.log(`📝 AgentX Loader: Injected "${profile.name}" into ${nameElements.length} elements`);
}

// Apply theme-based styling to body
function applyAgentTheme(profile) {
  if (!profile.theme) return;
  
  const themeClass = `agentx-theme-${profile.theme.toLowerCase()}`;
  document.body.classList.add(themeClass);
  
  // Also add role-based class
  if (profile.role) {
    const roleClass = `agentx-role-${profile.role.toLowerCase()}`;
    document.body.classList.add(roleClass);
  }
  
  console.log(`🎨 AgentX Loader: Applied theme class "${themeClass}"`);
}

// Inject agent presence indicators
function injectAgentPresence(profile) {
  // Find labs header
  const labsHeader = document.querySelector('.labs-header, #labs-header, .lab-section h2');
  if (labsHeader) {
    injectLabsPresence(labsHeader, profile);
  }
  
  // Find case studies sections
  const caseStudies = document.querySelectorAll('.case-study, .project-card, .portfolio-item');
  if (caseStudies.length > 0) {
    injectCaseStudyPresence(caseStudies, profile);
  }
  
  // Find any existing agentx-aware zones
  const awareZones = document.querySelectorAll('.agentx-aware');
  awareZones.forEach(zone => {
    injectAwareZonePresence(zone, profile);
  });
}

// Inject presence into labs header
function injectLabsPresence(header, profile) {
  const presenceElement = document.createElement('div');
  presenceElement.className = 'agentx-presence labs-presence';
  presenceElement.innerHTML = `
    <span class="agent-indicator">
      <span class="agent-avatar">${profile.name[0].toUpperCase()}</span>
      <span class="agent-text">Powered by Agent <strong>${profile.name}</strong></span>
    </span>
  `;
  
  // Insert after header or as subtitle
  if (header.nextSibling) {
    header.parentNode.insertBefore(presenceElement, header.nextSibling);
  } else {
    header.parentNode.appendChild(presenceElement);
  }
  
  console.log(`🧪 AgentX Loader: Added labs presence for "${profile.name}"`);
}

// Inject presence into case studies
function injectCaseStudyPresence(caseStudies, profile) {
  const messages = [
    `${profile.name} helped optimize the strategy alignment...`,
    `With ${profile.name}'s ${profile.tone.toLowerCase()} guidance, we achieved...`,
    `${profile.name} provided ${profile.role.toLowerCase()} insights that...`,
    `Through ${profile.name}'s analysis, we discovered...`
  ];
  
  caseStudies.forEach((study, index) => {
    if (index < 3) { // Only inject into first 3 case studies
      const presenceElement = document.createElement('div');
      presenceElement.className = 'agentx-presence case-study-presence';
      presenceElement.innerHTML = `
        <p class="agent-contribution">
          <span class="agent-icon">🤖</span>
          <em>${messages[index % messages.length]}</em>
        </p>
      `;
      
      // Find a good insertion point
      const description = study.querySelector('.description, .project-description, p');
      if (description) {
        description.parentNode.insertBefore(presenceElement, description.nextSibling);
      } else {
        study.appendChild(presenceElement);
      }
    }
  });
  
  console.log(`📚 AgentX Loader: Added case study presence to ${Math.min(3, caseStudies.length)} items`);
}

// Inject presence into agentx-aware zones
function injectAwareZonePresence(zone, profile) {
  // Look for specific data attributes for custom messages
  const customMessage = zone.getAttribute('data-agentx-message');
  const messageType = zone.getAttribute('data-agentx-type') || 'default';
  
  let message;
  if (customMessage) {
    message = customMessage.replace('{name}', profile.name)
                          .replace('{role}', profile.role)
                          .replace('{tone}', profile.tone);
  } else {
    message = `Agent ${profile.name} is active`;
  }
  
  const presenceElement = document.createElement('span');
  presenceElement.className = `agentx-presence aware-zone-presence ${messageType}`;
  presenceElement.textContent = message;
  
  zone.appendChild(presenceElement);
  
  console.log(`🎯 AgentX Loader: Added aware zone presence: "${message}"`);
}

// Global function to refresh agent presence (for dynamic content)
window.refreshAgentPresence = function() {
  console.log('🔄 AgentX Loader: Refreshing agent presence...');
  
  // Remove existing presence elements
  document.querySelectorAll('.agentx-presence').forEach(el => el.remove());
  
  // Reload agent
  const event = new Event('DOMContentLoaded');
  document.dispatchEvent(event);
};

// Global function to get current agent info
window.getCurrentAgent = function() {
  try {
    const savedProfile = localStorage.getItem("agentx-profile");
    return savedProfile ? JSON.parse(savedProfile) : null;
  } catch (error) {
    console.error('❌ Failed to get current agent:', error);
    return null;
  }
};
