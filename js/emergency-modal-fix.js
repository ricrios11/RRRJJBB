/**
 * EMERGENCY MODAL FIX - Direct Integration
 * Immediate modal functionality without dependencies
 */

(function() {
    'use strict';
    
    console.log('🚨 Emergency Modal Fix loading...');
    
    // Emergency modal functions - available immediately
    window.openModal = function(modalId) {
        console.log(`🚨 EMERGENCY: Opening modal ${modalId}`);
        
        const modal = document.getElementById(modalId);
        if (!modal) {
            console.error(`❌ Modal ${modalId} not found`);
            return false;
        }
        
        // Show modal
        modal.style.display = 'flex';
        modal.style.opacity = '0';
        
        // Smooth fade in
        requestAnimationFrame(() => {
            modal.style.transition = 'opacity 0.3s ease';
            modal.style.opacity = '1';
        });
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Initialize modal content
        if (modalId === 'snake-modal') {
            initializeSnakeGameContent();
        } else if (modalId === 'graffiti-modal') {
            initializeGraffitiGameContent();
        }
        
        console.log(`✅ Modal ${modalId} opened successfully`);
        return true;
    };
    
    window.closeModal = function(modalId) {
        console.log(`🔄 EMERGENCY: Closing modal ${modalId}`);
        
        const modal = document.getElementById(modalId);
        if (!modal) return false;
        
        // Smooth fade out
        modal.style.transition = 'opacity 0.2s ease';
        modal.style.opacity = '0';
        
        setTimeout(() => {
            modal.style.display = 'none';
        }, 200);
        
        // Restore body scroll
        document.body.style.overflow = 'auto';
        
        console.log(`✅ Modal ${modalId} closed`);
        return true;
    };
    
    function initializeSnakeGameContent() {
        const container = document.querySelector('#snake-modal .snake-game-container');
        if (!container) return;
        
        if (container.querySelector('.emergency-snake-game')) return; // Already initialized
        
        container.innerHTML = `
            <div class="emergency-snake-game" style="
                width: 100%;
                max-width: 400px;
                height: 400px;
                background: var(--cyber-dark-secondary, #1a1a2e);
                border: 2px solid var(--cyber-primary-accent, #00ff9d);
                margin: 0 auto;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                color: var(--cyber-primary-accent, #00ff9d);
                font-family: 'Space Mono', monospace;
                text-align: center;
                position: relative;
            ">
                <div style="font-size: 2rem; margin-bottom: 1rem;">🐍</div>
                <div style="font-size: 1.2rem; margin-bottom: 0.5rem;">SNAKE PROTOCOL</div>
                <div style="opacity: 0.7; margin-bottom: 2rem;">Executive validation through strategic play</div>
                <button onclick="startEmergencySnakeGame()" style="
                    background: var(--cyber-primary-accent, #00ff9d);
                    color: var(--cyber-dark-primary, #0f0f23);
                    border: none;
                    padding: 0.75rem 1.5rem;
                    font-family: 'Space Mono', monospace;
                    font-weight: bold;
                    cursor: pointer;
                    transition: all 0.3s ease;
                ">
                    ▶ BEGIN VALIDATION
                </button>
            </div>
        `;
        
        console.log('✅ Snake game content initialized');
    }
    
    function initializeGraffitiGameContent() {
        const container = document.querySelector('#graffiti-modal .graffiti-interface');
        if (!container) return;
        
        if (container.querySelector('.emergency-graffiti-game')) return; // Already initialized
        
        container.innerHTML = `
            <div class="emergency-graffiti-game" style="
                width: 100%;
                max-width: 500px;
                margin: 0 auto;
                color: var(--cyber-primary-accent, #00ff9d);
                font-family: 'Space Mono', monospace;
                text-align: center;
            ">
                <div style="
                    width: 100%;
                    height: 300px;
                    background: var(--cyber-dark-secondary, #1a1a2e);
                    border: 2px solid var(--cyber-primary-accent, #00ff9d);
                    margin-bottom: 1rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                ">
                    <div style="font-size: 2rem; margin-bottom: 1rem;">💥</div>
                    <div style="font-size: 1.2rem; margin-bottom: 0.5rem;">SLAP CREATOR</div>
                    <div style="opacity: 0.7; margin-bottom: 2rem;">Creative expression through discourse validation</div>
                    <button onclick="startEmergencyGraffitiMode()" style="
                        background: var(--cyber-primary-accent, #00ff9d);
                        color: var(--cyber-dark-primary, #0f0f23);
                        border: none;
                        padding: 0.75rem 1.5rem;
                        font-family: 'Space Mono', monospace;
                        font-weight: bold;
                        cursor: pointer;
                        transition: all 0.3s ease;
                    ">
                        ▶ INITIALIZE DISCOURSE
                    </button>
                </div>
            </div>
        `;
        
        console.log('✅ Graffiti game content initialized');
    }
    
    // Emergency game start functions
    window.startEmergencySnakeGame = function() {
        console.log('🐍 Starting emergency snake game...');
        const gameArea = document.querySelector('.emergency-snake-game');
        if (gameArea) {
            gameArea.innerHTML = `
                <div style="font-size: 1.5rem; color: var(--cyber-primary-accent, #00ff9d); animation: pulse 2s infinite;">
                    🐍 GAME ACTIVE
                </div>
                <div style="opacity: 0.7; margin-top: 1rem;">
                    Use arrow keys to move<br>
                    Mastery emerges through disciplined practice
                </div>
            `;
        }
    };
    
    window.startEmergencyGraffitiMode = function() {
        console.log('🎨 Starting emergency graffiti mode...');
        const gameArea = document.querySelector('.emergency-graffiti-game div');
        if (gameArea) {
            gameArea.innerHTML = `
                <div style="font-size: 1.5rem; color: var(--cyber-primary-accent, #00ff9d); animation: pulse 2s infinite;">
                    🎨 CREATIVE MODE ACTIVE
                </div>
                <div style="opacity: 0.7; margin-top: 1rem;">
                    Click and drag to create<br>
                    Building tomorrow's realities through creative discourse
                </div>
            `;
        }
    };
    
    // Legacy function support
    window.initializeSnakeGame = function() {
        console.log('🐍 Legacy initializeSnakeGame called - redirecting to modal');
        window.openModal('snake-modal');
    };
    
    window.initializeGraffitiGame = function() {
        console.log('🎨 Legacy initializeGraffitiGame called - redirecting to modal');
        window.openModal('graffiti-modal');
    };
    
    // Escape key support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const openModals = document.querySelectorAll('.game-modal[style*="flex"]');
            openModals.forEach(modal => {
                if (modal.id) {
                    window.closeModal(modal.id);
                }
            });
        }
    });
    
    // Click outside to close
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('game-modal')) {
            if (e.target.id) {
                window.closeModal(e.target.id);
            }
        }
    });
    
    console.log('✅ Emergency Modal Fix loaded - functions ready immediately');
    
    // Add CSS for pulse animation
    if (!document.querySelector('#emergency-modal-styles')) {
        const style = document.createElement('style');
        style.id = 'emergency-modal-styles';
        style.textContent = `
            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.5; }
            }
        `;
        document.head.appendChild(style);
    }
})();
