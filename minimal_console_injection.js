// MINIMAL ERROR-FREE SOLUTION - Browser Console Injection
console.log('🔧 MINIMAL: Starting error-free solution (NO INJECTION ERRORS)...');

function payDebtTimeAwareMinimal() {
    try {
        const now = new Date();
        const hour = now.getHours();
        
        let timeClass = 'time-evening'; // Current: 20:36
        if (hour >= 6 && hour < 12) timeClass = 'time-morning';
        else if (hour >= 12 && hour < 18) timeClass = 'time-afternoon';
        
        document.body.classList.remove('time-morning', 'time-afternoon', 'time-evening');
        document.body.classList.add(timeClass);
        
        console.log(`✅ DEBT: Time gradient - ${timeClass} (${hour}:${now.getMinutes().toString().padStart(2, '0')})`);
        return true;
    } catch (error) {
        console.error('❌ DEBT: Time gradient error:', error);
        return false;
    }
}

function payDebtGitHubMinimal() {
    try {
        const existingGitHub = document.querySelector('a[href*="github.com/ricrios11"]');
        if (existingGitHub) {
            console.log('✅ DEBT: GitHub link already exists');
            return true;
        }
        
        const footer = document.querySelector('footer');
        if (!footer) {
            console.log('❌ DEBT: Footer not found');
            return false;
        }
        
        const linkedinLink = footer.querySelector('a[href*="linkedin.com"]');
        if (!linkedinLink) {
            console.log('❌ DEBT: LinkedIn link not found');
            return false;
        }
        
        const githubLink = document.createElement('a');
        githubLink.href = 'https://github.com/ricrios11';
        githubLink.target = '_blank';
        githubLink.rel = 'noopener noreferrer';
        githubLink.setAttribute('aria-label', 'GitHub Profile');
        githubLink.className = linkedinLink.className;
        
        githubLink.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
        `;
        
        linkedinLink.parentNode.insertBefore(githubLink, linkedinLink.nextSibling);
        console.log('✅ DEBT: GitHub footer link added');
        return true;
    } catch (error) {
        console.error('❌ DEBT: GitHub link error:', error);
        return false;
    }
}

function applyMinimalCyberpunkStyling() {
    try {
        const foundation = document.getElementById('innovation-lab-foundation');
        if (foundation) {
            foundation.style.fontFamily = "'JetBrains Mono', 'SF Mono', 'Monaco', monospace";
            foundation.style.borderColor = document.body.classList.contains('dark') ? '#00ff41' : 'rgba(0, 200, 50, 0.4)';
            console.log('✅ STYLING: Innovation Lab Foundation');
        }
        
        const exitBtn = document.getElementById('exit-lab-btn');
        if (exitBtn) {
            exitBtn.style.fontFamily = "'JetBrains Mono', monospace";
            console.log('✅ STYLING: Exit Lab button');
        }
        
        return true;
    } catch (error) {
        console.error('❌ STYLING: Error:', error);
        return false;
    }
}

function initializeMinimalErrorFreeSolution() {
    let successCount = 0;
    const results = [];
    
    try {
        if (payDebtTimeAwareMinimal()) {
            successCount++;
            results.push('✅ Time-aware gradient');
        } else {
            results.push('❌ Time-aware gradient');
        }
        
        if (payDebtGitHubMinimal()) {
            successCount++;
            results.push('✅ GitHub footer link');
        } else {
            results.push('❌ GitHub footer link');
        }
        
        if (applyMinimalCyberpunkStyling()) {
            successCount++;
            results.push('✅ Minimal cyberpunk styling');
        } else {
            results.push('❌ Minimal cyberpunk styling');
        }
        
        console.log(`🎯 MINIMAL: ${successCount}/3 operations successful`);
        results.forEach(result => console.log(`  ${result}`));
        
        if (successCount >= 2) {
            console.log('🎉 MINIMAL: Technical debt paid - NO INJECTION ERRORS');
        }
        
        return successCount >= 2;
    } catch (error) {
        console.error('❌ MINIMAL: Error:', error);
        return false;
    }
}

// Initialize immediately
initializeMinimalErrorFreeSolution();

// Make globally available
window.initializeMinimalErrorFreeSolution = initializeMinimalErrorFreeSolution;
