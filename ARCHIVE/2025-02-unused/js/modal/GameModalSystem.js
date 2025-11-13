/**
 * GameModalSystem - Immersive full-screen game experience
 * Desktop-optimized modal with cyberpunk aesthetics
 */

class GameModalSystem {
    constructor() {
        this.currentGame = null;
        this.modal = null;
        this.isFullscreen = false;
        this.escapeHandler = null;
        
        this.createModal();
        this.setupEventListeners();
    }

    /**
     * Create modal structure
     */
    createModal() {
        this.modal = document.createElement('div');
        this.modal.className = 'cyber-game-modal';
        this.modal.innerHTML = `
            <div class="cyber-game-modal-content">
                <button class="cyber-game-close" aria-label="Close Game">×</button>
                <div class="cyber-game-container" id="modal-game-container">
                    <!-- Game will be injected here -->
                </div>
                <div class="cyber-game-instructions">
                    <div class="desktop-instructions">
                        <span>ESC to exit • WASD or Arrow Keys to move • SPACE to boost/pause • R to restart</span>
                    </div>
                    <div class="mobile-instructions">
                        <span>Use touch controls below • Swipe on game area for quick moves</span>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(this.modal);
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Close button
        const closeBtn = this.modal.querySelector('.cyber-game-close');
        closeBtn.addEventListener('click', () => this.closeGame());

        // Click outside to close
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeGame();
            }
        });

        // Escape key handler
        this.escapeHandler = (e) => {
            if (e.code === 'Escape' && this.modal.classList.contains('active')) {
                this.closeGame();
            }
        };
    }

    /**
     * Launch game in modal
     */
    launchGame(gameType, options = {}) {
        if (this.currentGame) {
            this.closeGame();
        }

        // Show modal
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', this.escapeHandler);

        // Create game container
        const container = this.modal.querySelector('#modal-game-container');
        container.innerHTML = `<div id="modal-${gameType}-game"></div>`;

        // Initialize game based on type
        switch (gameType) {
            case 'snake':
                this.currentGame = new CyberSnakeGame(`modal-${gameType}-game`, {
                    ...options,
                    isModal: true
                });
                break;
            case 'graffiti':
                this.currentGame = new CyberGraffitiGame(`modal-${gameType}-game`, {
                    ...options,
                    isModal: true
                });
                break;
            default:
                console.error(`Unknown game type: ${gameType}`);
                this.closeGame();
                return;
        }

        // Auto-start for better UX
        if (this.currentGame && typeof this.currentGame.start === 'function') {
            setTimeout(() => {
                if (this.currentGame) {
                    this.currentGame.start();
                }
            }, 500);
        }

        // Track analytics
        this.trackGameLaunch(gameType);
    }

    /**
     * Close current game
     */
    closeGame() {
        // Destroy current game
        if (this.currentGame && typeof this.currentGame.destroy === 'function') {
            this.currentGame.destroy();
        }
        this.currentGame = null;

        // Hide modal
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
        document.removeEventListener('keydown', this.escapeHandler);

        // Clear container
        const container = this.modal.querySelector('#modal-game-container');
        if (container) {
            container.innerHTML = '';
        }
    }

    /**
     * Toggle fullscreen mode (desktop only)
     */
    async toggleFullscreen() {
        if (!document.fullscreenEnabled) return;

        try {
            if (!document.fullscreenElement) {
                await this.modal.requestFullscreen();
                this.isFullscreen = true;
                this.modal.classList.add('fullscreen');
            } else {
                await document.exitFullscreen();
                this.isFullscreen = false;
                this.modal.classList.remove('fullscreen');
            }
        } catch (error) {
            console.warn('Fullscreen toggle failed:', error);
        }
    }

    /**
     * Track game launch for analytics
     */
    trackGameLaunch(gameType) {
        try {
            const event = {
                type: 'game_launch',
                game: gameType,
                timestamp: new Date().toISOString(),
                viewport: {
                    width: window.innerWidth,
                    height: window.innerHeight,
                    isTouch: 'ontouchstart' in window
                }
            };
            
            // Store in session storage for analytics
            const analytics = JSON.parse(sessionStorage.getItem('game_analytics') || '[]');
            analytics.push(event);
            sessionStorage.setItem('game_analytics', JSON.stringify(analytics.slice(-50))); // Keep last 50 events
            
            console.log(`🎮 Game launched: ${gameType}`);
        } catch (error) {
            console.warn('Analytics tracking failed:', error);
        }
    }

    /**
     * Get current game instance
     */
    getCurrentGame() {
        return this.currentGame;
    }

    /**
     * Check if modal is active
     */
    isActive() {
        return this.modal.classList.contains('active');
    }
}

/**
 * Game launcher integration for existing portfolio
 */
class GameLauncher {
    constructor() {
        this.modalSystem = new GameModalSystem();
        this.setupLaunchButtons();
    }

    /**
     * Setup launch buttons in portfolio
     */
    setupLaunchButtons() {
        // Find existing game cards and add modal launch capability
        this.setupSnakeLauncher();
        this.setupGraffitiLauncher();
    }

    /**
     * Setup snake game launcher
     */
    setupSnakeLauncher() {
        // Look for existing snake game elements
        const snakeElements = document.querySelectorAll('[data-game="snake"], .snake-game, #snake-game');
        
        snakeElements.forEach(element => {
            // Add modal launch button if not already present
            if (!element.querySelector('.modal-launch-btn')) {
                const launchBtn = document.createElement('button');
                launchBtn.className = 'modal-launch-btn cyber-btn';
                launchBtn.innerHTML = '🎮 Play Fullscreen';
                launchBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.modalSystem.launchGame('snake');
                });
                
                element.appendChild(launchBtn);
            }
        });

        // Also add to game cards in portfolio
        const gameCards = document.querySelectorAll('.game-card');
        gameCards.forEach(card => {
            const title = card.querySelector('h3, .game-title');
            if (title && title.textContent.toLowerCase().includes('snake')) {
                // Skip adding button - direct modal launch handled by card click
            }
        });
    }

    /**
     * Setup graffiti game launcher
     */
    setupGraffitiLauncher() {
        const graffitiElements = document.querySelectorAll('[data-game="graffiti"], .graffiti-game, #graffiti-game');
        
        graffitiElements.forEach(element => {
            if (!element.querySelector('.modal-launch-btn')) {
                const launchBtn = document.createElement('button');
                launchBtn.className = 'modal-launch-btn cyber-btn';
                launchBtn.innerHTML = '🎨 Create Fullscreen';
                launchBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.modalSystem.launchGame('graffiti');
                });
                
                element.appendChild(launchBtn);
            }
        });

        // Add to game cards
        const gameCards = document.querySelectorAll('.game-card');
        gameCards.forEach(card => {
            const title = card.querySelector('h3, .game-title');
            if (title && (title.textContent.toLowerCase().includes('graffiti') || 
                         title.textContent.toLowerCase().includes('slap'))) {
                // Skip adding button - direct modal launch handled by card click
            }
        });
    }

    /**
     * Launch game directly
     */
    launch(gameType, options = {}) {
        this.modalSystem.launchGame(gameType, options);
    }

    /**
     * Get modal system
     */
    getModalSystem() {
        return this.modalSystem;
    }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for other scripts to load
    setTimeout(() => {
        if (typeof CyberSnakeGame !== 'undefined') {
            window.gameLauncher = new GameLauncher();
            console.log('🎮 Game Modal System initialized');
        } else {
            console.warn('CyberSnakeGame not found, retrying...');
            setTimeout(() => {
                if (typeof CyberSnakeGame !== 'undefined') {
                    window.gameLauncher = new GameLauncher();
                    console.log('🎮 Game Modal System initialized (delayed)');
                }
            }, 1000);
        }
    }, 500);
});

// Export for manual initialization
window.GameModalSystem = GameModalSystem;
window.GameLauncher = GameLauncher;
