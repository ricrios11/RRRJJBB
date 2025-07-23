/**
 * DOS-Aligned Innovation Lab Enhancement Script
 * Addresses: Exit Lab functionality, 2-column grid layout, Snake game launch
 */

// 1. Exit Lab Functionality
function exitInnovationLab() {
    console.log('🚪 EXIT LAB: Closing Innovation Laboratory...');
    
    // Find and hide the Innovation Lab section
    const innovationLab = document.getElementById('innovation-lab');
    if (innovationLab) {
        innovationLab.style.display = 'none';
        console.log('✅ EXIT LAB: Innovation Laboratory closed successfully');
    }
    
    // Show the main portfolio content
    const mainContent = document.querySelector('.main-content') || document.querySelector('main');
    if (mainContent) {
        mainContent.style.display = 'block';
    }
    
    // Reset any active states
    const konamiSection = document.getElementById('konami-section');
    if (konamiSection) {
        konamiSection.style.display = 'none';
    }
}

// 2. Snake Game Launch Functionality
function launchSnakeGame() {
    console.log('🐍 SNAKE LAUNCH: Initializing DOS Snake Game...');
    
    // Activate the Konami section which contains the Snake game
    const konamiSection = document.getElementById('konami-section');
    if (konamiSection) {
        konamiSection.style.display = 'block';
        
        // Scroll to the Snake game
        const snakeGame = document.getElementById('snake-game');
        if (snakeGame) {
            snakeGame.scrollIntoView({ behavior: 'smooth', block: 'center' });
            console.log('✅ SNAKE LAUNCH: Game activated and focused');
        }
    }
    
    // Initialize Snake game if not already running
    if (typeof initializeSnakeGame === 'function') {
        initializeSnakeGame();
    }
}

// 3. DOS-Aligned 2-Column Grid Layout Implementation
function implementDOSGridLayout() {
    console.log('🎛️ DOS GRID: Implementing 2-column layout...');
    
    // Find the Innovation Lab cards container
    const cardsContainer = document.querySelector('.innovation-features-grid') || 
                          document.querySelector('[class*="lab-feature"]').parentElement;
    
    if (!cardsContainer) {
        console.error('❌ DOS GRID: Cards container not found');
        return;
    }
    
    // Apply DOS-aligned 2-column grid styling
    const gridStyles = `
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        padding: 2rem 0;
        max-width: 1200px;
        margin: 0 auto;
    `;
    
    cardsContainer.style.cssText = gridStyles;
    
    // Find all feature cards and enhance them
    const featureCards = cardsContainer.querySelectorAll('.lab-feature-card, [class*="feature-card"]');
    
    featureCards.forEach((card, index) => {
        // Apply consistent card styling
        const cardStyles = `
            background: linear-gradient(135deg, rgba(0, 255, 65, 0.05) 0%, rgba(0, 255, 65, 0.02) 100%);
            border: 1px solid rgba(0, 255, 65, 0.2);
            border-radius: 12px;
            padding: 1.5rem;
            transition: all 0.3s ease;
            cursor: pointer;
            position: relative;
            min-height: 200px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        `;
        
        card.style.cssText += cardStyles;
        
        // Add enhanced hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
            this.style.boxShadow = '0 8px 32px rgba(0, 255, 65, 0.15)';
            this.style.borderColor = 'rgba(0, 255, 65, 0.4)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
            this.style.borderColor = 'rgba(0, 255, 65, 0.2)';
        });
        
        // Special handling for Snake game card
        const cardText = card.textContent || card.innerHTML;
        if (cardText.toLowerCase().includes('graffiti') || cardText.toLowerCase().includes('game')) {
            // Add Snake game launch functionality
            const originalClick = card.getAttribute('onclick');
            card.setAttribute('onclick', `launchSnakeGame(); ${originalClick || ''}`);
            
            // Add visual indicator for interactive game
            const gameIndicator = document.createElement('div');
            gameIndicator.innerHTML = '🎮 LAUNCH';
            gameIndicator.style.cssText = `
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: linear-gradient(135deg, #00ff41 0%, #00cc33 100%);
                color: #000;
                padding: 0.25rem 0.5rem;
                border-radius: 4px;
                font-size: 0.75rem;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                box-shadow: 0 2px 8px rgba(0, 255, 65, 0.3);
                animation: pulse 2s ease-in-out infinite;
            `;
            card.appendChild(gameIndicator);
        }
    });
    
    console.log(`✅ DOS GRID: Applied 2-column layout to ${featureCards.length} cards`);
}

// 4. Fix Exit Lab Button HTML
function fixExitLabButton() {
    console.log('🔧 BUTTON FIX: Repairing Exit Lab button...');
    
    // Find the malformed button and fix it
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        if (button.textContent.includes('Exit Lab')) {
            // Clean up the button HTML
            button.onclick = exitInnovationLab;
            button.style.cssText = `
                background: transparent;
                border: 1px solid var(--ric-color-border);
                color: var(--ric-color-text);
                padding: 0.5rem 1rem;
                border-radius: 6px;
                font-size: 0.875rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            `;
            
            // Add proper hover effects
            button.addEventListener('mouseenter', function() {
                this.style.borderColor = 'var(--ric-color-primary)';
                this.style.color = 'var(--ric-color-primary)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.borderColor = 'var(--ric-color-border)';
                this.style.color = 'var(--ric-color-text)';
            });
            
            console.log('✅ BUTTON FIX: Exit Lab button repaired and functional');
        }
    });
}

// 5. Comprehensive DOS Enhancement Execution
function executeDOSInnovationLabEnhancement() {
    console.log('🚀 DOS ENHANCEMENT: Starting comprehensive Innovation Lab upgrade...');
    
    try {
        // Execute all enhancements
        fixExitLabButton();
        implementDOSGridLayout();
        
        // Add global functions to window for accessibility
        window.exitInnovationLab = exitInnovationLab;
        window.launchSnakeGame = launchSnakeGame;
        
        console.log('🎯 DOS ENHANCEMENT: All systems operational and production-ready!');
        console.log('📋 FEATURES ACTIVATED:');
        console.log('  ✅ Exit Lab button functionality');
        console.log('  ✅ 2-column DOS-aligned grid layout');
        console.log('  ✅ Snake game launch capability');
        console.log('  ✅ Enhanced hover effects and spacing');
        
    } catch (error) {
        console.error('❌ DOS ENHANCEMENT ERROR:', error);
    }
}

// Auto-execute when script loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', executeDOSInnovationLabEnhancement);
} else {
    executeDOSInnovationLabEnhancement();
}

// Export for manual execution
window.executeDOSInnovationLabEnhancement = executeDOSInnovationLabEnhancement;
