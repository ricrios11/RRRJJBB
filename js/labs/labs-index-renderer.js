// labs-index-renderer.js
// Trojan Tranche 4: Dynamic Labs Index Grid Renderer
// Renders feature cards from LAB_FEATURES global array

document.addEventListener("DOMContentLoaded", () => {
  console.log('🧱 Labs Index Renderer: Initializing...');
  
  // Validate LAB_FEATURES exists
  if (!window.LAB_FEATURES || !Array.isArray(window.LAB_FEATURES)) {
    console.error("❌ LAB_FEATURES not found or invalid format.");
    console.log("💡 Expected: window.LAB_FEATURES as array from YAML/JSON conversion");
    return;
  }

  // Validate target container exists
  const labContainer = document.getElementById("labs-index");
  if (!labContainer) {
    console.error("❌ #labs-index container not found in DOM");
    return;
  }

  console.log(`🔍 Found ${window.LAB_FEATURES.length} lab features to render`);

  // Clear existing content
  labContainer.innerHTML = '';

  // Render each feature as a card
  window.LAB_FEATURES.forEach((feature, index) => {
    const card = document.createElement("div");
    card.className = `feature-card status-${feature.status}`;
    card.setAttribute('data-feature-id', feature.id || index);
    card.setAttribute('data-status', feature.status);
    
    card.innerHTML = `
      <div class="feature-card-header">
        <h3 class="feature-title">${feature.label}</h3>
        <span class="feature-status status-${feature.status}">${feature.status.toUpperCase()}</span>
      </div>
      <div class="feature-card-body">
        <p class="feature-description">${feature.description}</p>
        <div class="feature-meta">
          <span class="feature-category">${feature.category || 'Lab'}</span>
          ${feature.version ? `<span class="feature-version">v${feature.version}</span>` : ''}
        </div>
      </div>
      <div class="feature-card-actions">
        <button class="feature-explore-btn" onclick="openModal('${feature.modal}')">
          Explore ${feature.label}
        </button>
      </div>
    `;
    
    // Add smooth entrance animation
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    
    labContainer.appendChild(card);
    
    // Animate in with staggered delay
    setTimeout(() => {
      card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 100);
  });

  console.log(`✅ Labs Index Renderer: Successfully rendered ${window.LAB_FEATURES.length} feature cards`);
  
  // Dispatch custom event for other systems
  window.dispatchEvent(new CustomEvent('labsIndexRendered', {
    detail: { 
      featuresCount: window.LAB_FEATURES.length,
      container: labContainer 
    }
  }));
});

// Global modal opener function (referenced in card HTML)
window.openModal = function(modalId) {
  console.log(`🎭 Opening modal: ${modalId}`);
  
  // Try to find and open the modal
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = 'block';
    modal.classList.add('active');
    
    // Add escape key listener
    const escapeHandler = (e) => {
      if (e.key === 'Escape') {
        modal.style.display = 'none';
        modal.classList.remove('active');
        document.removeEventListener('keydown', escapeHandler);
      }
    };
    document.addEventListener('keydown', escapeHandler);
    
    console.log(`✅ Modal opened: ${modalId}`);
  } else {
    console.warn(`⚠️ Modal not found: ${modalId}`);
    // Fallback: show alert with feature info
    alert(`Feature modal "${modalId}" is being prepared. Check back soon!`);
  }
};
