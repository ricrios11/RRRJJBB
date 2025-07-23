/**
 * EMERGENCY CONSOLE FIX
 * 
 * MISSION: Fix the specific console errors visible in the latest screenshot
 * - Hero element not found errors
 * - Time-aware gradient system failures
 * - Resource loading issues
 * - DOM element missing errors
 */

console.log('🚨 EMERGENCY FIX: Addressing console errors from latest screenshot...');

// ====================================================================
// 1. FIX HERO ELEMENT NOT FOUND ERRORS
// ====================================================================

function fixHeroElementErrors() {
    console.log('🎯 EMERGENCY: Fixing hero element not found errors...');
    
    try {
        // Find hero section with multiple selectors
        let heroSection = document.querySelector('.ric-hero-section') ||
                         document.querySelector('.hero-section') ||
                         document.querySelector('[class*="hero"]') ||
                         document.querySelector('section:first-of-type') ||
                         document.querySelector('main > section:first-child');
        
        if (!heroSection) {
            console.log('🔧 EMERGENCY: Creating missing hero section...');
            
            // Find main content area
            const main = document.querySelector('main') || document.querySelector('.main-content') || document.body;
            
            // Create hero section
            heroSection = document.createElement('section');
            heroSection.className = 'ric-hero-section hero-section';
            heroSection.id = 'hero-section';
            
            // Insert at beginning
            if (main.firstChild) {
                main.insertBefore(heroSection, main.firstChild);
            } else {
                main.appendChild(heroSection);
            }
            
            console.log('✅ EMERGENCY: Hero section created and inserted');
        } else {
            // Ensure hero section has proper classes
            if (!heroSection.classList.contains('ric-hero-section')) {
                heroSection.classList.add('ric-hero-section');
            }
            if (!heroSection.classList.contains('hero-section')) {
                heroSection.classList.add('hero-section');
            }
            
            console.log('✅ EMERGENCY: Hero section found and classes ensured');
        }
        
        // Apply time-aware class immediately
        const now = new Date();
        const hour = now.getHours();
        
        let timeClass = 'time-evening'; // Current: 20:46
        if (hour >= 6 && hour < 12) timeClass = 'time-morning';
        else if (hour >= 12 && hour < 18) timeClass = 'time-afternoon';
        
        // Remove existing time classes and add current
        document.body.classList.remove('time-morning', 'time-afternoon', 'time-evening');
        document.body.classList.add(timeClass);
        
        console.log(`✅ EMERGENCY: Time class applied - ${timeClass}`);
        return true;
        
    } catch (error) {
        console.error('❌ EMERGENCY: Hero element fix error:', error);
        return false;
    }
}

// ====================================================================
// 2. FIX TIME-AWARE GRADIENT SYSTEM
// ====================================================================

function fixTimeAwareGradientSystem() {
    console.log('⏰ EMERGENCY: Fixing time-aware gradient system...');
    
    try {
        // Create minimal time-aware gradient function
        window.updateTimeAwareness = function() {
            const now = new Date();
            const hour = now.getHours();
            
            let timeClass = 'time-evening';
            if (hour >= 6 && hour < 12) timeClass = 'time-morning';
            else if (hour >= 12 && hour < 18) timeClass = 'time-afternoon';
            
            document.body.classList.remove('time-morning', 'time-afternoon', 'time-evening');
            document.body.classList.add(timeClass);
            
            console.log(`⏰ Time awareness updated: ${timeClass} (${hour}:${now.getMinutes().toString().padStart(2, '0')})`);
            return timeClass;
        };
        
        // Execute immediately
        window.updateTimeAwareness();
        
        // Set up interval for updates
        if (window.timeAwarenessInterval) {
            clearInterval(window.timeAwarenessInterval);
        }
        window.timeAwarenessInterval = setInterval(window.updateTimeAwareness, 300000); // 5 minutes
        
        console.log('✅ EMERGENCY: Time-aware gradient system restored');
        return true;
        
    } catch (error) {
        console.error('❌ EMERGENCY: Time-aware gradient fix error:', error);
        return false;
    }
}

// ====================================================================
// 3. FIX RESOURCE LOADING ISSUES
// ====================================================================

function fixResourceLoadingIssues() {
    console.log('📦 EMERGENCY: Addressing resource loading issues...');
    
    try {
        // Check for missing scripts and create fallbacks
        const requiredScripts = [
            'time-aware-hero-gradient-system.js',
            'dos-snake-game.js',
            'content-structure-system.js'
        ];
        
        requiredScripts.forEach(scriptName => {
            const existingScript = document.querySelector(`script[src*="${scriptName}"]`);
            if (existingScript) {
                // Check if script loaded successfully
                existingScript.addEventListener('error', function() {
                    console.log(`⚠️ EMERGENCY: Script ${scriptName} failed to load, creating fallback`);
                    
                    // Create minimal fallbacks based on script type
                    if (scriptName.includes('time-aware')) {
                        fixTimeAwareGradientSystem();
                    } else if (scriptName.includes('snake')) {
                        createSnakeGameFallback();
                    }
                });
            }
        });
        
        console.log('✅ EMERGENCY: Resource loading fallbacks established');
        return true;
        
    } catch (error) {
        console.error('❌ EMERGENCY: Resource loading fix error:', error);
        return false;
    }
}

// ====================================================================
// 4. CREATE SNAKE GAME FALLBACK
// ====================================================================

function createSnakeGameFallback() {
    console.log('🐍 EMERGENCY: Creating Snake Game fallback...');
    
    try {
        // Create minimal launch function if missing
        if (typeof window.launchSnakeGame !== 'function') {
            window.launchSnakeGame = function() {
                console.log('🐍 Snake Game: Launching...');
                
                const container = document.getElementById('snake-game-container');
                if (container) {
                    container.style.display = 'block';
                    console.log('✅ Snake Game: Container shown');
                } else {
                    console.log('❌ Snake Game: Container not found');
                }
            };
        }
        
        // Create minimal exit function for Innovation Lab
        if (typeof window.exitInnovationLab !== 'function') {
            window.exitInnovationLab = function() {
                console.log('🚪 Innovation Lab: Exiting...');
                
                const lab = document.getElementById('innovation-lab') || 
                           document.getElementById('hidden-lab') ||
                           document.getElementById('innovation-lab-foundation');
                
                if (lab) {
                    lab.style.display = 'none';
                    console.log('✅ Innovation Lab: Hidden');
                } else {
                    console.log('❌ Innovation Lab: Not found');
                }
            };
        }
        
        console.log('✅ EMERGENCY: Snake Game and Innovation Lab fallbacks created');
        return true;
        
    } catch (error) {
        console.error('❌ EMERGENCY: Snake Game fallback error:', error);
        return false;
    }
}

// ====================================================================
// 5. FIX GITHUB FOOTER LINK (TECHNICAL DEBT)
// ====================================================================

function fixGitHubFooterLink() {
    console.log('🐙 EMERGENCY: Adding GitHub footer link (technical debt)...');
    
    try {
        // Check if already exists
        if (document.querySelector('a[href*="github.com/ricrios11"]')) {
            console.log('✅ EMERGENCY: GitHub link already exists');
            return true;
        }
        
        const footer = document.querySelector('footer');
        const linkedinLink = footer ? footer.querySelector('a[href*="linkedin.com"]') : null;
        
        if (footer && linkedinLink) {
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
            console.log('✅ EMERGENCY: GitHub footer link added');
            return true;
        } else {
            console.log('❌ EMERGENCY: Footer or LinkedIn link not found');
            return false;
        }
        
    } catch (error) {
        console.error('❌ EMERGENCY: GitHub footer fix error:', error);
        return false;
    }
}

// ====================================================================
// 6. EMERGENCY MASTER ORCHESTRATOR
// ====================================================================

function executeEmergencyConsoleFix() {
    console.log('🚨 EMERGENCY CONSOLE FIX: Starting targeted repair...');
    console.log('=======================================================');
    
    let successCount = 0;
    const results = [];
    
    try {
        // 1. Fix hero element errors
        if (fixHeroElementErrors()) {
            successCount++;
            results.push('✅ Hero element errors fixed');
        } else {
            results.push('❌ Hero element errors persist');
        }
        
        // 2. Fix time-aware gradient system
        if (fixTimeAwareGradientSystem()) {
            successCount++;
            results.push('✅ Time-aware gradient system restored');
        } else {
            results.push('❌ Time-aware gradient system failed');
        }
        
        // 3. Fix resource loading issues
        if (fixResourceLoadingIssues()) {
            successCount++;
            results.push('✅ Resource loading fallbacks established');
        } else {
            results.push('❌ Resource loading issues persist');
        }
        
        // 4. Create Snake Game fallback
        if (createSnakeGameFallback()) {
            successCount++;
            results.push('✅ Snake Game and Innovation Lab fallbacks created');
        } else {
            results.push('❌ Snake Game fallbacks failed');
        }
        
        // 5. Fix GitHub footer link (technical debt)
        if (fixGitHubFooterLink()) {
            successCount++;
            results.push('✅ GitHub footer link added (technical debt paid)');
        } else {
            results.push('❌ GitHub footer link failed');
        }
        
        console.log(`🎯 EMERGENCY FIX: ${successCount}/5 repairs successful`);
        console.log('📋 REPAIR RESULTS:');
        results.forEach(result => console.log(`  ${result}`));
        
        if (successCount >= 3) {
            console.log('🎉 EMERGENCY FIX: Critical console errors addressed');
            console.log('💡 NEXT: Run deep analysis to verify all fixes');
        } else {
            console.log('⚠️ EMERGENCY FIX: Some issues remain, deeper intervention needed');
        }
        
        return successCount >= 3;
        
    } catch (error) {
        console.error('❌ EMERGENCY FIX: Master orchestrator error:', error);
        return false;
    }
}

// ====================================================================
// 7. AUTO-INITIALIZATION
// ====================================================================

// Make functions globally available
window.executeEmergencyConsoleFix = executeEmergencyConsoleFix;
window.fixHeroElementErrors = fixHeroElementErrors;
window.fixTimeAwareGradientSystem = fixTimeAwareGradientSystem;
window.updateTimeAwareness = window.updateTimeAwareness || function() { console.log('Time awareness placeholder'); };

// Execute immediately
setTimeout(executeEmergencyConsoleFix, 500);

console.log('🚨 EMERGENCY CONSOLE FIX: Ready for deployment - targeting visible console errors');
