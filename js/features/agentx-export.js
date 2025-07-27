// agentx-export.js
// Trojan Tier 5: AgentX Export System
// Handles export/import of agent configurations for portability

// Download current AgentX profile as JSON
function downloadAgentXProfile() {
  console.log('📤 AgentX Export: Initiating profile download...');
  
  try {
    const profile = JSON.parse(localStorage.getItem("agentx-profile") || "{}");
    
    if (!profile.name) {
      alert('⚠️ No agent profile found to export. Please create an agent first.');
      console.warn('⚠️ AgentX Export: No profile to export');
      return;
    }
    
    // Add export metadata
    const exportData = {
      ...profile,
      exportedAt: new Date().toISOString(),
      exportVersion: '1.0',
      source: 'Ric Rios Portfolio - AgentX System'
    };
    
    // Create and download file
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { 
      type: "application/json" 
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `agentx-profile-${profile.name.toLowerCase()}-${new Date().toISOString().split('T')[0]}.json`;
    a.style.display = 'none';
    
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    console.log(`✅ AgentX Export: Profile "${profile.name}" downloaded successfully`);
    
    // Show success feedback
    showExportSuccess(profile.name);
    
  } catch (error) {
    console.error('❌ AgentX Export: Failed to download profile:', error);
    alert('❌ Failed to export agent profile. Please try again.');
  }
}

// Export as YAML format
function downloadAgentXProfileYAML() {
  console.log('📤 AgentX Export: Initiating YAML download...');
  
  try {
    const profile = JSON.parse(localStorage.getItem("agentx-profile") || "{}");
    
    if (!profile.name) {
      alert('⚠️ No agent profile found to export. Please create an agent first.');
      return;
    }
    
    // Convert to YAML format
    const yamlContent = `# AgentX Profile Export
# Generated: ${new Date().toISOString()}
# Source: Ric Rios Portfolio - AgentX System

agent:
  name: "${profile.name}"
  role: "${profile.role}"
  tone: "${profile.tone}"
  theme: "${profile.theme}"
  expertise: "${profile.expertise || 'adaptive'}"
  focus: "${profile.focus || ''}"
  
metadata:
  created: "${profile.created}"
  version: "${profile.version}"
  id: "${profile.id}"
  exported_at: "${new Date().toISOString()}"
  export_version: "1.0"
`;
    
    const blob = new Blob([yamlContent], { type: "text/yaml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `agentx-profile-${profile.name.toLowerCase()}.yaml`;
    a.style.display = 'none';
    
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    console.log(`✅ AgentX Export: YAML profile "${profile.name}" downloaded successfully`);
    showExportSuccess(profile.name, 'YAML');
    
  } catch (error) {
    console.error('❌ AgentX Export: Failed to download YAML profile:', error);
    alert('❌ Failed to export YAML profile. Please try again.');
  }
}

// Import AgentX profile from file
function importAgentXProfile(file) {
  console.log('📥 AgentX Import: Processing file import...');
  
  if (!file) {
    console.warn('⚠️ AgentX Import: No file provided');
    return;
  }
  
  const reader = new FileReader();
  
  reader.onload = function(e) {
    try {
      const importedData = JSON.parse(e.target.result);
      
      // Validate required fields
      if (!importedData.name || !importedData.role || !importedData.tone || !importedData.theme) {
        throw new Error('Invalid profile format: missing required fields');
      }
      
      // Clean and prepare profile
      const profile = {
        name: importedData.name,
        role: importedData.role,
        tone: importedData.tone,
        theme: importedData.theme,
        expertise: importedData.expertise || 'adaptive',
        focus: importedData.focus || '',
        created: importedData.created || new Date().toISOString(),
        version: importedData.version || '1.0',
        id: importedData.id || generateAgentId(importedData.name),
        importedAt: new Date().toISOString()
      };
      
      // Save to localStorage
      localStorage.setItem("agentx-profile", JSON.stringify(profile));
      
      console.log(`✅ AgentX Import: Profile "${profile.name}" imported successfully`);
      
      // Refresh form if it exists
      if (typeof loadSavedConfig === 'function') {
        loadSavedConfig();
      }
      
      // Refresh agent presence
      if (typeof refreshAgentPresence === 'function') {
        refreshAgentPresence();
      }
      
      // Show success feedback
      showImportSuccess(profile.name);
      
      // Dispatch import event
      window.dispatchEvent(new CustomEvent('agentxImported', {
        detail: { profile }
      }));
      
    } catch (error) {
      console.error('❌ AgentX Import: Failed to import profile:', error);
      alert(`❌ Failed to import agent profile: ${error.message}`);
    }
  };
  
  reader.onerror = function() {
    console.error('❌ AgentX Import: File reading error');
    alert('❌ Failed to read the import file. Please try again.');
  };
  
  reader.readAsText(file);
}

// Show export success feedback
function showExportSuccess(agentName, format = 'JSON') {
  const message = `✅ Agent "${agentName}" exported as ${format} successfully!`;
  
  // Try to find existing success element or create one
  let successElement = document.getElementById("agentx-export-success");
  
  if (!successElement) {
    successElement = document.createElement("div");
    successElement.id = "agentx-export-success";
    successElement.className = "export-success-message";
    successElement.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--ric-success-bg, #4ade80);
      color: var(--ric-success-text, #ffffff);
      padding: 12px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 10000;
      font-weight: 600;
      opacity: 0;
      transform: translateX(100%);
      transition: all 0.3s ease;
    `;
    document.body.appendChild(successElement);
  }
  
  successElement.textContent = message;
  
  // Animate in
  setTimeout(() => {
    successElement.style.opacity = '1';
    successElement.style.transform = 'translateX(0)';
  }, 100);
  
  // Auto-hide after 3 seconds
  setTimeout(() => {
    successElement.style.opacity = '0';
    successElement.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (successElement.parentNode) {
        successElement.parentNode.removeChild(successElement);
      }
    }, 300);
  }, 3000);
}

// Show import success feedback
function showImportSuccess(agentName) {
  const message = `✅ Agent "${agentName}" imported successfully!`;
  showExportSuccess(agentName, 'Import');
}

// Generate unique agent ID (helper function)
function generateAgentId(name) {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substr(2, 5);
  const nameSlug = (name || 'agent').toLowerCase().replace(/[^a-z0-9]/g, '');
  return `${nameSlug}-${timestamp}-${randomStr}`;
}

// Bulk export all agent data (for backup)
function exportAllAgentData() {
  console.log('📦 AgentX Export: Exporting all agent data...');
  
  try {
    const profile = JSON.parse(localStorage.getItem("agentx-profile") || "{}");
    
    // Gather all related data
    const exportData = {
      profile: profile,
      preferences: {
        theme: document.body.className.match(/agentx-theme-(\w+)/)?.[1] || null,
        lastActive: new Date().toISOString()
      },
      metadata: {
        exportType: 'full',
        exportedAt: new Date().toISOString(),
        version: '1.0',
        source: 'Ric Rios Portfolio - AgentX System'
      }
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { 
      type: "application/json" 
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `agentx-full-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.style.display = 'none';
    
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    console.log('✅ AgentX Export: Full backup exported successfully');
    showExportSuccess('Full Backup', 'Backup');
    
  } catch (error) {
    console.error('❌ AgentX Export: Failed to export full backup:', error);
    alert('❌ Failed to export full backup. Please try again.');
  }
}

// Make functions globally available
window.downloadAgentXProfile = downloadAgentXProfile;
window.downloadAgentXProfileYAML = downloadAgentXProfileYAML;
window.importAgentXProfile = importAgentXProfile;
window.exportAllAgentData = exportAllAgentData;
