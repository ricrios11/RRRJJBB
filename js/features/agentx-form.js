// agentx-form.js
// Trojan Tranche 4: AgentX Personalization Form Handler
// Manages AgentX agent configuration and localStorage persistence

document.addEventListener("DOMContentLoaded", () => {
  console.log('🧬 AgentX Form: Initializing personalization system...');
  
  const form = document.getElementById("agentx-form");
  if (!form) {
    console.warn('⚠️ #agentx-form not found in DOM');
    return;
  }
  
  // Initialize form with saved config
  loadSavedConfig();
  
  // Attach form submission handler
  form.addEventListener("submit", handleFormSubmit);
  
  // Add real-time preview if preview element exists
  const previewElement = document.getElementById("agentx-preview");
  if (previewElement) {
    form.addEventListener("input", updatePreview);
    console.log('✅ Real-time preview enabled');
  }
  
  // Add reset button handler
  const resetBtn = document.getElementById("agentx-reset");
  if (resetBtn) {
    resetBtn.addEventListener("click", resetToDefaults);
    console.log('✅ Reset button initialized');
  }
  
  console.log('✅ AgentX Form: Initialization complete');
});

// Handle form submission
function handleFormSubmit(e) {
  e.preventDefault();
  console.log('💾 AgentX Form: Processing submission...');
  
  const formData = new FormData(e.target);
  const config = Object.fromEntries(formData.entries());
  
  // Add metadata
  config.created = new Date().toISOString();
  config.version = '1.0';
  config.id = generateAgentId(config.name);
  
  // Validate required fields
  if (!config.name || !config.role || !config.tone || !config.theme) {
    alert('⚠️ Please fill in all required fields');
    console.error('❌ Form validation failed: missing required fields');
    return;
  }
  
  // Save to localStorage
  try {
    localStorage.setItem("agentx-profile", JSON.stringify(config));
    console.log("✅ AgentX Config Saved:", config);
    
    // Show success feedback
    showSuccessMessage("Agent saved successfully! Future sessions will recall this configuration.");
    
    // Dispatch custom event for other systems
    window.dispatchEvent(new CustomEvent('agentxConfigSaved', {
      detail: { config }
    }));
    
    // Update any preview elements
    updatePreview();
    
  } catch (error) {
    console.error('❌ Failed to save AgentX config:', error);
    alert('❌ Failed to save agent configuration. Please try again.');
  }
}

// Load saved configuration
function loadSavedConfig() {
  try {
    const saved = localStorage.getItem("agentx-profile");
    if (saved) {
      const config = JSON.parse(saved);
      console.log('📂 Loading saved AgentX config:', config);
      
      // Populate form fields
      Object.entries(config).forEach(([key, value]) => {
        const field = document.querySelector(`[name="${key}"]`);
        if (field) {
          field.value = value;
        }
      });
      
      // Update preview
      updatePreview();
      
      console.log('✅ Saved configuration loaded');
    }
  } catch (error) {
    console.error('❌ Failed to load saved config:', error);
  }
}

// Update real-time preview
function updatePreview() {
  const previewElement = document.getElementById("agentx-preview");
  if (!previewElement) return;
  
  const form = document.getElementById("agentx-form");
  const formData = new FormData(form);
  const config = Object.fromEntries(formData.entries());
  
  // Generate preview content
  const previewHTML = `
    <div class="agent-preview theme-${config.theme}">
      <div class="agent-avatar">
        <span class="agent-initial">${(config.name || 'A')[0].toUpperCase()}</span>
      </div>
      <div class="agent-info">
        <h4 class="agent-name">${config.name || 'Unnamed Agent'}</h4>
        <p class="agent-role">${config.role || 'No role selected'}</p>
        <p class="agent-tone">Tone: ${config.tone || 'Not specified'}</p>
        <p class="agent-theme">Theme: ${config.theme || 'Default'}</p>
      </div>
    </div>
  `;
  
  previewElement.innerHTML = previewHTML;
}

// Reset form to defaults
function resetToDefaults() {
  if (confirm('Are you sure you want to reset to default settings? This will clear your saved configuration.')) {
    // Clear localStorage
    localStorage.removeItem("agentx-profile");
    
    // Reset form
    const form = document.getElementById("agentx-form");
    form.reset();
    
    // Clear preview
    const previewElement = document.getElementById("agentx-preview");
    if (previewElement) {
      previewElement.innerHTML = '<p class="preview-placeholder">Configure your agent to see preview</p>';
    }
    
    console.log('🔄 AgentX configuration reset to defaults');
    showSuccessMessage("Configuration reset to defaults");
  }
}

// Generate unique agent ID
function generateAgentId(name) {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substr(2, 5);
  const nameSlug = (name || 'agent').toLowerCase().replace(/[^a-z0-9]/g, '');
  return `${nameSlug}-${timestamp}-${randomStr}`;
}

// Show success message
function showSuccessMessage(message) {
  // Try to find existing success element
  let successElement = document.getElementById("agentx-success");
  
  if (!successElement) {
    // Create success element
    successElement = document.createElement("div");
    successElement.id = "agentx-success";
    successElement.className = "success-message";
    
    // Insert after form
    const form = document.getElementById("agentx-form");
    form.parentNode.insertBefore(successElement, form.nextSibling);
  }
  
  successElement.textContent = message;
  successElement.style.display = "block";
  successElement.style.opacity = "1";
  
  // Auto-hide after 3 seconds
  setTimeout(() => {
    successElement.style.opacity = "0";
    setTimeout(() => {
      successElement.style.display = "none";
    }, 300);
  }, 3000);
}

// Export configuration (for debugging/backup)
window.exportAgentXConfig = function() {
  const saved = localStorage.getItem("agentx-profile");
  if (saved) {
    const blob = new Blob([saved], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'agentx-config.json';
    a.click();
    URL.revokeObjectURL(url);
    console.log('📤 AgentX configuration exported');
  } else {
    alert('No configuration to export');
  }
};

// Import configuration
window.importAgentXConfig = function(file) {
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const config = JSON.parse(e.target.result);
      localStorage.setItem("agentx-profile", JSON.stringify(config));
      loadSavedConfig();
      showSuccessMessage("Configuration imported successfully");
      console.log('📥 AgentX configuration imported');
    } catch (error) {
      alert('Invalid configuration file');
      console.error('❌ Import failed:', error);
    }
  };
  reader.readAsText(file);
};
