// 🔥 SURGICAL DEDUPLICATION: Remove duplicate TrojanHorse Feed carousel
console.log('🎯 SURGICAL PRECISION: Starting duplicate removal...');

// Find all TrojanHorse Feed containers
const allFeeds = document.querySelectorAll('[id*="trojan_horse_feed"]');
console.log(`Found ${allFeeds.length} TrojanHorse Feed instances`);

if (allFeeds.length > 1) {
    // Keep the first one, remove all others
    const keepFeed = allFeeds[0];
    console.log(`Keeping: ${keepFeed.id}`);
    
    for (let i = 1; i < allFeeds.length; i++) {
        const duplicate = allFeeds[i];
        console.log(`Removing duplicate: ${duplicate.id}`);
        duplicate.remove();
    }
    
    // Validate single instance remains
    const remaining = document.querySelectorAll('[id*="trojan_horse_feed"]');
    console.log(`✅ DEDUPLICATION COMPLETE: ${remaining.length} instance(s) remaining`);
    
    // Ensure theme awareness
    if (remaining.length === 1) {
        const feed = remaining[0];
        const currentTheme = document.body.classList.contains('dark') ? 'dark' : 'light';
        feed.setAttribute('data-theme', currentTheme);
        console.log(`🎨 Theme applied: ${currentTheme}`);
        
        // Apply cyberpunk styling enhancement
        feed.style.fontFamily = '"JetBrains Mono", monospace';
        feed.style.transition = 'all 0.3s ease';
        console.log('🚀 Cyberpunk styling applied');
    }
} else {
    console.log('✅ No duplicates found - single instance confirmed');
}

// Final validation check
const finalCount = document.querySelectorAll('[id*="trojan_horse_feed"]').length;
console.log(`🔍 FINAL VALIDATION: ${finalCount} TrojanHorse Feed instance(s) in DOM`);

// Innovation Lab system integration check
const innovationLab = document.getElementById('innovation-lab-foundation');
if (innovationLab && finalCount === 1) {
    console.log('✅ Innovation Lab Foundation integration confirmed');
} else {
    console.log('⚠️ Innovation Lab Foundation integration needs attention');
}

console.log('🎯 SURGICAL DEDUPLICATION COMPLETE - Ready for validation');
