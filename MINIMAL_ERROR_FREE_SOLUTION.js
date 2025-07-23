/**
 * MINIMAL ERROR-FREE SOLUTION
 * 
 * MISSION: Fix injection errors with absolute minimal approach
 * - No complex CSS injections
 * - No !important declarations
 * - Only essential, safe operations
 * - Pay technical debt with minimal risk
 */

console.log('🔧 MINIMAL: Starting error-free minimal solution...');

// ====================================================================
// 1. MINIMAL TIME-AWARE HERO GRADIENT (DEBT PAYMENT)
// ====================================================================

function payDebtTimeAwareMinimal() {
    console.log('💳 MINIMAL DEBT: Applying time-aware gradient...');
    
    try {
        const now = new Date();
        const hour = now.getHours();
        
        // Determine time of day (current: 20:36 = evening)
        let timeClass = 'time-evening';
        if (hour >= 6 && hour < 12) {
            timeClass = 'time-morning';
        } else if (hour >= 12 && hour < 18) {
            timeClass = 'time-afternoon';
        }
        
        // Remove existing time classes
        document.body.classList.remove('time-morning', 'time-afternoon', 'time-evening');
        
        // Add current time class
        document.body.classList.add(timeClass);
        
        console.log(`✅ MINIMAL DEBT: Time gradient applied - ${timeClass} (${hour}:${now.getMinutes().toString().padStart(2, '0')})`);
        return true;
        
    } catch (error) {
        console.error('❌ MINIMAL DEBT: Time gradient error:', error);
        return false;
    }
}

// ====================================================================
// 2. MINIMAL GITHUB FOOTER LINK (DEBT PAYMENT)
// ====================================================================

function payDebtGitHubMinimal() {
    console.log('💳 MINIMAL DEBT: Adding GitHub footer link...');
    
    try {
        // Check if already exists
        const existingGitHub = document.querySelector('a[href*="github.com/ricrios11"]');
        if (existingGitHub) {
            console.log('✅ MINIMAL DEBT: GitHub link already exists');
            return true;
        }
        
        // Find footer
        const footer = document.querySelector('footer');
        if (!footer) {
            console.log('❌ MINIMAL DEBT: Footer not found');
            return false;
        }
        
        // Find LinkedIn link to add GitHub next to it
        const linkedinLink = footer.querySelector('a[href*="linkedin.com"]');
        if (!linkedinLink) {
            console.log('❌ MINIMAL DEBT: LinkedIn link not found for reference');
            return false;
        }
        
        // Create minimal GitHub link
        const githubLink = document.createElement('a');
        githubLink.href = 'https://github.com/ricrios11';
        githubLink.target = '_blank';
        githubLink.rel = 'noopener noreferrer';
        githubLink.setAttribute('aria-label', 'GitHub Profile');
        
        // Use same styling as LinkedIn link
        githubLink.className = linkedinLink.className;
        
        // Simple GitHub SVG icon
        githubLink.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
        `;
        
        // Insert after LinkedIn link
        linkedinLink.parentNode.insertBefore(githubLink, linkedinLink.nextSibling);
        
        console.log('✅ MINIMAL DEBT: GitHub footer link added');
        return true;
        
    } catch (error) {
        console.error('❌ MINIMAL DEBT: GitHub link error:', error);
        return false;
    }
}

// ====================================================================
// 3. MINIMAL CYBERPUNK STYLING (NO INJECTION)
// ====================================================================

function applyMinimalCyberpunkStyling() {
    console.log('🎨 MINIMAL STYLING: Applying minimal cyberpunk touches...');
    
    try {
        // Find Innovation Lab Foundation
        const foundation = document.getElementById('innovation-lab-foundation');
        if (foundation) {
            // Apply minimal styling directly to element (no CSS injection)
            foundation.style.fontFamily = "'JetBrains Mono', 'SF Mono', 'Monaco', monospace";
            foundation.style.borderColor = document.body.classList.contains('dark') ? '#00ff41' : 'rgba(0, 200, 50, 0.4)';
            
            console.log('✅ MINIMAL STYLING: Innovation Lab Foundation styled');
        }
        
        // Find Exit Lab button
        const exitBtn = document.getElementById('exit-lab-btn');
        if (exitBtn) {
            exitBtn.style.fontFamily = "'JetBrains Mono', monospace";
            console.log('✅ MINIMAL STYLING: Exit Lab button styled');
        }
        
        return true;
        
    } catch (error) {
        console.error('❌ MINIMAL STYLING: Error:', error);
        return false;
    }
}

// ====================================================================
// 4. MINIMAL INITIALIZATION (ERROR-FREE)
// ====================================================================

function initializeMinimalErrorFreeSolution() {
    console.log('🚀 MINIMAL: Initializing error-free solution...');
    
    let successCount = 0;
    const results = [];
    
    try {
        // 1. Pay debt: Time-aware hero gradient
        if (payDebtTimeAwareMinimal()) {
            successCount++;
            results.push('✅ Time-aware gradient');
        } else {
            results.push('❌ Time-aware gradient');
        }
        
        // 2. Pay debt: GitHub footer link
        if (payDebtGitHubMinimal()) {
            successCount++;
            results.push('✅ GitHub footer link');
        } else {
            results.push('❌ GitHub footer link');
        }
        
        // 3. Apply minimal cyberpunk styling
        if (applyMinimalCyberpunkStyling()) {
            successCount++;
            results.push('✅ Minimal cyberpunk styling');
        } else {
            results.push('❌ Minimal cyberpunk styling');
        }
        
        console.log(`🎯 MINIMAL: Solution complete - ${successCount}/3 operations successful`);
        console.log('📋 RESULTS:');
        results.forEach(result => console.log(`  ${result}`));
        
        if (successCount >= 2) {
            console.log('🎉 MINIMAL: Technical debt paid successfully with minimal approach');
        }
        
        return successCount >= 2;
        
    } catch (error) {
        console.error('❌ MINIMAL: Initialization error:', error);
        return false;
    }
}

// ====================================================================
// 5. GLOBAL EXPOSURE AND SAFE AUTO-INITIALIZATION
// ====================================================================

// Make functions globally available
window.initializeMinimalErrorFreeSolution = initializeMinimalErrorFreeSolution;
window.payDebtTimeAwareMinimal = payDebtTimeAwareMinimal;
window.payDebtGitHubMinimal = payDebtGitHubMinimal;
window.applyMinimalCyberpunkStyling = applyMinimalCyberpunkStyling;

// Safe auto-initialization
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeMinimalErrorFreeSolution);
} else {
    // DOM is already loaded - initialize with delay to avoid conflicts
    setTimeout(initializeMinimalErrorFreeSolution, 500);
}

console.log('🔧 MINIMAL ERROR-FREE SOLUTION: Ready - NO INJECTION ERRORS GUARANTEED');
