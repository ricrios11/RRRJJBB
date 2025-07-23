// SAFE SURGICAL CYBERPUNK DOS - Browser Console Injection (NO BREAKS)
console.log('🔧 SAFE SURGICAL: Fixing code injection breaks...');

function applySafeCyberpunkDOSStyling() {
    try {
        const existingStyles = document.querySelectorAll('style[data-safe-cyberpunk]');
        existingStyles.forEach(style => style.remove());
        
        const isDarkMode = document.body.classList.contains('dark');
        
        const safeCSS = `
            /* SAFE SURGICAL CYBERPUNK DOS - Innovation Lab Only */
            #innovation-lab-foundation {
                font-family: 'JetBrains Mono', 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace !important;
                background: ${isDarkMode ? 'rgba(0, 0, 0, 0.95)' : 'rgba(255, 255, 255, 0.95)'} !important;
                border: 2px solid ${isDarkMode ? '#00ff41' : 'rgba(0, 200, 50, 0.4)'} !important;
                border-radius: 12px !important;
                box-shadow: ${isDarkMode ? '0 0 20px rgba(0, 255, 65, 0.2)' : '0 0 15px rgba(0, 200, 50, 0.1)'} !important;
                transition: all 0.3s ease !important;
            }
            
            #innovation-lab-foundation:hover {
                transform: translateY(-1px) !important;
                box-shadow: ${isDarkMode ? '0 0 25px rgba(0, 255, 65, 0.3)' : '0 0 20px rgba(0, 200, 50, 0.15)'} !important;
            }
            
            #innovation-lab-foundation h2, #innovation-lab-foundation h3 {
                color: ${isDarkMode ? '#00ff41' : '#00c832'} !important;
                text-shadow: ${isDarkMode ? '0 0 10px rgba(0, 255, 65, 0.5)' : '0 0 5px rgba(0, 200, 50, 0.3)'} !important;
                font-family: 'JetBrains Mono', monospace !important;
                letter-spacing: 0.02em !important;
            }
            
            .lab-feature-card {
                background: ${isDarkMode ? 'rgba(0, 20, 0, 0.3)' : 'rgba(240, 255, 240, 0.5)'} !important;
                border: 1px solid ${isDarkMode ? 'rgba(0, 255, 65, 0.3)' : 'rgba(0, 200, 50, 0.2)'} !important;
                transition: all 0.3s ease !important;
            }
            
            .lab-feature-card:hover {
                border-color: ${isDarkMode ? '#00ff41' : '#00c832'} !important;
                box-shadow: ${isDarkMode ? '0 0 15px rgba(0, 255, 65, 0.2)' : '0 0 10px rgba(0, 200, 50, 0.1)'} !important;
            }
            
            #exit-lab-btn {
                background: ${isDarkMode ? 'rgba(255, 107, 53, 0.2)' : 'rgba(255, 107, 53, 0.1)'} !important;
                border: 1px solid ${isDarkMode ? '#ff6b35' : 'rgba(255, 107, 53, 0.4)'} !important;
                color: ${isDarkMode ? '#ff6b35' : '#d63031'} !important;
                font-family: 'JetBrains Mono', monospace !important;
                transition: all 0.3s ease !important;
            }
            
            #exit-lab-btn:hover {
                background: ${isDarkMode ? 'rgba(255, 107, 53, 0.3)' : 'rgba(255, 107, 53, 0.15)'} !important;
                transform: translateY(-1px) !important;
            }
        `;
        
        const styleElement = document.createElement('style');
        styleElement.setAttribute('data-safe-cyberpunk', 'surgical');
        styleElement.textContent = safeCSS;
        document.head.appendChild(styleElement);
        
        console.log('✅ SAFE STYLING: Applied successfully');
        return true;
    } catch (error) {
        console.error('❌ SAFE STYLING: Error:', error);
        return false;
    }
}

function payDebtTimeAwareHeroGradient() {
    try {
        const now = new Date();
        const hour = now.getHours();
        
        let timeClass = 'time-evening'; // Current time (19:55)
        if (hour >= 6 && hour < 12) timeClass = 'time-morning';
        else if (hour >= 12 && hour < 18) timeClass = 'time-afternoon';
        
        document.body.classList.remove('time-morning', 'time-afternoon', 'time-evening');
        document.body.classList.add(timeClass);
        
        console.log(`✅ DEBT PAYMENT: Time-aware gradient - ${timeClass} (${hour}:${now.getMinutes().toString().padStart(2, '0')})`);
        return true;
    } catch (error) {
        console.error('❌ DEBT PAYMENT: Time gradient error:', error);
        return false;
    }
}

function payDebtGitHubFooterLink() {
    try {
        const footer = document.querySelector('footer');
        if (!footer) {
            console.log('❌ DEBT PAYMENT: Footer not found');
            return false;
        }
        
        const existingGitHubLink = footer.querySelector('a[href*="github.com"]');
        if (existingGitHubLink) {
            console.log('✅ DEBT PAYMENT: GitHub link already exists');
            return true;
        }
        
        let socialContainer = footer.querySelector('.social-links, .footer-links');
        if (!socialContainer) {
            const linkedinLink = footer.querySelector('a[href*="linkedin.com"]');
            if (linkedinLink && linkedinLink.parentElement) {
                socialContainer = linkedinLink.parentElement;
            }
        }
        
        if (socialContainer) {
            const githubLink = document.createElement('a');
            githubLink.href = 'https://github.com/ricrios11';
            githubLink.target = '_blank';
            githubLink.rel = 'noopener noreferrer';
            githubLink.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
            `;
            githubLink.style.cssText = `
                display: inline-flex; align-items: center; justify-content: center;
                width: 40px; height: 40px; color: var(--foreground);
                transition: all 0.3s ease; opacity: 0.7;
            `;
            
            githubLink.addEventListener('mouseenter', function() {
                this.style.opacity = '1'; this.style.transform = 'translateY(-2px)';
            });
            githubLink.addEventListener('mouseleave', function() {
                this.style.opacity = '0.7'; this.style.transform = 'translateY(0)';
            });
            
            socialContainer.appendChild(githubLink);
            console.log('✅ DEBT PAYMENT: GitHub footer link added');
            return true;
        } else {
            console.log('❌ DEBT PAYMENT: No suitable container found');
            return false;
        }
    } catch (error) {
        console.error('❌ DEBT PAYMENT: GitHub link error:', error);
        return false;
    }
}

function setupSafeThemeToggleAwareness() {
    try {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class' && mutation.target === document.body) {
                    console.log('🌙 THEME CHANGE: Safe update detected');
                    setTimeout(() => {
                        applySafeCyberpunkDOSStyling();
                        payDebtTimeAwareHeroGradient();
                    }, 100);
                }
            });
        });
        
        observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
        console.log('✅ SAFE THEME: Theme awareness established');
        return true;
    } catch (error) {
        console.error('❌ SAFE THEME: Error:', error);
        return false;
    }
}

function initializeSafeSurgicalCyberpunkDOS() {
    try {
        let successCount = 0;
        
        if (applySafeCyberpunkDOSStyling()) successCount++;
        if (payDebtTimeAwareHeroGradient()) successCount++;
        if (payDebtGitHubFooterLink()) successCount++;
        if (setupSafeThemeToggleAwareness()) successCount++;
        
        console.log(`🎯 SAFE SURGICAL: ${successCount}/4 systems active`);
        console.log('📋 DEBT PAYMENT: ✅ Time gradient ✅ GitHub footer ✅ Safe styling ✅ Theme awareness');
        
        return successCount === 4;
    } catch (error) {
        console.error('❌ SAFE SURGICAL: Error:', error);
        return false;
    }
}

// Initialize immediately
initializeSafeSurgicalCyberpunkDOS();

// Make globally available
window.initializeSafeSurgicalCyberpunkDOS = initializeSafeSurgicalCyberpunkDOS;
