// Test script for AgentX Tier 6 features
console.log('🧪 Testing AgentX Tier 6 Features');

// 1. Create test agent profile
const testProfile = {
    name: "TestAgent",
    role: "Strategist", 
    tone: "Visionary",
    theme: "Cyberpunk",
    expertise: "Advanced",
    focus: ["Design Systems", "Innovation"]
};

// Store in localStorage
localStorage.setItem('agentx-profile', JSON.stringify(testProfile));
console.log('✅ Test agent profile created:', testProfile);

// 2. Test analytics logging
if (window.logAgentXEvent) {
    window.logAgentXEvent('test_event', { source: 'manual_test' });
    console.log('✅ Analytics logging test completed');
} else {
    console.log('❌ Analytics logging function not found');
}

// 3. Check if case study footnote injection works
const footnoteElement = document.getElementById('agentx-footnote');
if (footnoteElement) {
    console.log('✅ AgentX footnote element found');
} else {
    console.log('❌ AgentX footnote element not found');
}

// 4. Test theme application
const body = document.body;
if (body.classList.contains('agentx-theme-cyberpunk')) {
    console.log('✅ AgentX theme applied');
} else {
    console.log('❌ AgentX theme not applied');
}

console.log('🧪 AgentX Tier 6 test completed');
