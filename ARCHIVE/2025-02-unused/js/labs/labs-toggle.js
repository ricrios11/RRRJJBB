// labs-toggle.js
// Trojan Tranche 4: Labs Filter & Sort Toggle UI
// Provides filtering and sorting controls for the labs index

document.addEventListener("DOMContentLoaded", () => {
  console.log('🎛️ Labs Toggle: Initializing filter controls...');
  
  // Initialize status filter
  const statusFilter = document.getElementById("labs-status-filter");
  if (statusFilter) {
    statusFilter.addEventListener("change", handleStatusFilter);
    console.log('✅ Status filter initialized');
  } else {
    console.warn('⚠️ #labs-status-filter not found');
  }
  
  // Initialize sort controls if they exist
  const sortControl = document.getElementById("labs-sort-control");
  if (sortControl) {
    sortControl.addEventListener("change", handleSortChange);
    console.log('✅ Sort control initialized');
  }
  
  // Initialize search if it exists
  const searchInput = document.getElementById("labs-search");
  if (searchInput) {
    searchInput.addEventListener("input", handleSearch);
    console.log('✅ Search input initialized');
  }
  
  // Listen for labs index render completion
  window.addEventListener('labsIndexRendered', () => {
    console.log('🔄 Labs index rendered, applying initial filters...');
    applyAllFilters();
  });
});

// Handle status filtering
function handleStatusFilter(e) {
  const selectedStatus = e.target.value;
  console.log(`🔍 Filtering by status: ${selectedStatus}`);
  
  const cards = document.querySelectorAll(".feature-card");
  let visibleCount = 0;
  
  cards.forEach((card) => {
    const cardStatus = card.getAttribute('data-status');
    const shouldShow = selectedStatus === "all" || cardStatus === selectedStatus;
    
    if (shouldShow) {
      card.style.display = "block";
      card.style.opacity = "1";
      visibleCount++;
    } else {
      card.style.display = "none";
      card.style.opacity = "0";
    }
  });
  
  // Update results counter if it exists
  updateResultsCounter(visibleCount);
  
  console.log(`📊 Status filter applied: ${visibleCount} cards visible`);
}

// Handle sorting
function handleSortChange(e) {
  const sortBy = e.target.value;
  console.log(`📋 Sorting by: ${sortBy}`);
  
  const container = document.getElementById("labs-index");
  if (!container) return;
  
  const cards = Array.from(container.querySelectorAll(".feature-card"));
  
  cards.sort((a, b) => {
    switch (sortBy) {
      case 'name':
        const nameA = a.querySelector('.feature-title').textContent;
        const nameB = b.querySelector('.feature-title').textContent;
        return nameA.localeCompare(nameB);
        
      case 'status':
        const statusA = a.getAttribute('data-status');
        const statusB = b.getAttribute('data-status');
        const statusOrder = { 'live': 0, 'alpha': 1, 'planned': 2 };
        return (statusOrder[statusA] || 3) - (statusOrder[statusB] || 3);
        
      case 'recent':
        // Sort by DOM order (most recently added first)
        return 0;
        
      default:
        return 0;
    }
  });
  
  // Re-append sorted cards
  cards.forEach(card => container.appendChild(card));
  
  console.log(`✅ Cards sorted by: ${sortBy}`);
}

// Handle search filtering
function handleSearch(e) {
  const searchTerm = e.target.value.toLowerCase();
  console.log(`🔎 Searching for: "${searchTerm}"`);
  
  const cards = document.querySelectorAll(".feature-card");
  let visibleCount = 0;
  
  cards.forEach((card) => {
    const title = card.querySelector('.feature-title').textContent.toLowerCase();
    const description = card.querySelector('.feature-description').textContent.toLowerCase();
    const category = card.querySelector('.feature-category')?.textContent.toLowerCase() || '';
    
    const matches = title.includes(searchTerm) || 
                   description.includes(searchTerm) || 
                   category.includes(searchTerm);
    
    if (matches || searchTerm === '') {
      card.style.display = "block";
      card.style.opacity = "1";
      visibleCount++;
    } else {
      card.style.display = "none";
      card.style.opacity = "0";
    }
  });
  
  updateResultsCounter(visibleCount);
  console.log(`🔍 Search applied: ${visibleCount} cards match "${searchTerm}"`);
}

// Apply all active filters
function applyAllFilters() {
  const statusFilter = document.getElementById("labs-status-filter");
  const searchInput = document.getElementById("labs-search");
  
  if (statusFilter && statusFilter.value !== 'all') {
    handleStatusFilter({ target: statusFilter });
  }
  
  if (searchInput && searchInput.value.trim() !== '') {
    handleSearch({ target: searchInput });
  }
}

// Update results counter
function updateResultsCounter(count) {
  const counter = document.getElementById("labs-results-counter");
  if (counter) {
    const total = document.querySelectorAll(".feature-card").length;
    counter.textContent = `Showing ${count} of ${total} features`;
  }
}

// Clear all filters
window.clearLabsFilters = function() {
  const statusFilter = document.getElementById("labs-status-filter");
  const searchInput = document.getElementById("labs-search");
  const sortControl = document.getElementById("labs-sort-control");
  
  if (statusFilter) statusFilter.value = 'all';
  if (searchInput) searchInput.value = '';
  if (sortControl) sortControl.value = 'name';
  
  // Show all cards
  document.querySelectorAll(".feature-card").forEach(card => {
    card.style.display = "block";
    card.style.opacity = "1";
  });
  
  const total = document.querySelectorAll(".feature-card").length;
  updateResultsCounter(total);
  
  console.log('🧹 All labs filters cleared');
};
