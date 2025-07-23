// DIRECT BROWSER CONSOLE EXECUTION - HERO ELEMENT TARGETING TEST
console.log('🎯 TESTING HERO ELEMENT TARGETING...');

// Test all possible hero selectors
const selectors = [
    '#hero.ric-hero-section',
    '.ric-hero-section', 
    '.hero-gradient',
    '#hero',
    'section[id="hero"]',
    'section.ric-hero'
];

console.log('🔍 TESTING SELECTORS:');
selectors.forEach((selector, index) => {
    const element = document.querySelector(selector);
    console.log(`${index + 1}. ${selector}:`, element ? '✅ FOUND' : '❌ NOT FOUND');
    if (element) {
        console.log(`   Classes: ${element.className}`);
        console.log(`   ID: ${element.id}`);
    }
});

// Test the exact hero element from DOM analysis
const heroElement = document.querySelector('#hero');
if (heroElement) {
    console.log('🎯 HERO ELEMENT FOUND:', heroElement);
    console.log('   Full class list:', heroElement.classList.toString());
    console.log('   Has ric-hero-section class:', heroElement.classList.contains('ric-hero-section'));
    
    // Apply time-aware gradient directly
    console.log('🎨 APPLYING EVENING GRADIENT DIRECTLY...');
    
    // Evening gradient for current time (21:07 = evening)
    const eveningGradient = 'linear-gradient(135deg, #2d1b69 0%, #4c1d95 25%, #7c3aed 75%, #a21caf 100%)';
    
    heroElement.style.background = eveningGradient;
    heroElement.style.position = 'relative';
    
    // Add time-aware class
    heroElement.classList.add('time-evening');
    heroElement.classList.add('time-evening-dark');
    
    console.log('✅ EVENING GRADIENT APPLIED SUCCESSFULLY');
    console.log('🌌 Hero element now has evening time-aware styling');
} else {
    console.log('❌ HERO ELEMENT NOT FOUND - CRITICAL ISSUE');
}
