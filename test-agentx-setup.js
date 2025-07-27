// AgentX Tier 6 Test Setup Script
// Run this in browser console to set up test agent profile

console.log('🧪 Setting up AgentX Tier 6 test environment...');

// Create test agent profile
const testProfile = {
    name: "TestAgent_Tier6",
    role: "Strategist", 
    tone: "Visionary",
    theme: "Cyberpunk",
    expertise: "Advanced",
    focus: ["Design Systems", "Innovation", "Analytics"]
};

// Save to localStorage
localStorage.setItem('agentx-profile', JSON.stringify(testProfile));
console.log('✅ Test agent profile created:', testProfile);

// Test analytics functions
console.log('📊 Testing analytics functions...');
const analyticsFunctions = ['logAgentXEvent', 'getAgentXAnalytics', 'exportAgentXAnalytics', 'clearAgentXAnalytics'];

analyticsFunctions.forEach(func => {
    if (typeof window[func] === 'function') {
        console.log(`✅ ${func} function available`);
    } else {
        console.log(`❌ ${func} function not found`);
    }
});

// Test case study footnote
console.log('📝 Testing case study footnote...');
const footnoteElement = document.getElementById('agentx-footnote');
if (footnoteElement) {
    console.log('✅ agentx-footnote element found');
} else {
    console.log('❌ agentx-footnote element not found');
}

// Test theme system
console.log('🎨 Testing theme system...');
const body = document.body;
const expectedThemeClass = `agentx-theme-${testProfile.theme.toLowerCase()}`;

if (body.classList.contains(expectedThemeClass)) {
    console.log(`✅ Theme class applied: ${expectedThemeClass}`);
} else {
    console.log(`❌ Theme class not found: ${expectedThemeClass}`);
    console.log(`Current body classes: ${body.className}`);
}

// Log a test analytics event
if (typeof window.logAgentXEvent === 'function') {
    window.logAgentXEvent('tier6_test_setup', {
        test_type: 'comprehensive',
        agent_name: testProfile.name,
        timestamp: new Date().toISOString()
    });
    console.log('✅ Test analytics event logged');
}

// Fire profile loaded event to trigger AgentX systems
document.dispatchEvent(new CustomEvent('agentxProfileLoaded', {
    detail: testProfile
}));

console.log('🎯 AgentX Tier 6 test setup complete!');
console.log('Next steps:');
console.log('1. Open a case study modal to test footnote injection');
console.log('2. Check analytics with: getAgentXAnalytics()');
console.log('3. Verify theme classes are applied to body');
