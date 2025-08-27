/**
 * Unified Game Modal System - Single Source of Truth
 * Clean implementation without legacy conflicts
 */

class UnifiedGameModalSystem {
    constructor() {
        this.activeGames = new Map();
        this.modalStates = new Map();
        this.initialized = false;
    }

    /**
     * Initialize the unified system
     */
    init() {
        if (this.initialized) return;
        
        console.log('🎮 Initializing Unified Game Modal System');
        this.setupModalHandlers();
        this.initialized = true;
    }

    /**
     * Setup clean modal event handlers
     */
    setupModalHandlers() {
        // Clean modal open handler
        window.openGameModal = (modalId) => {
            console.log(`🎯 Opening game modal: ${modalId}`);
            this.openModal(modalId);
        };

        // Clean modal close handler
        window.closeGameModal = (modalId) => {
            console.log(`🔒 Closing game modal: ${modalId}`);
            this.closeModal(modalId);
        };

        // Global escape key handler
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });
    }

    /**
     * Open modal with game initialization
     */
    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) {
            console.error(`❌ Modal not found: ${modalId}`);
            return;
        }

        // Show modal
        modal.style.display = 'flex';
        modal.style.zIndex = '10000';
        document.body.style.overflow = 'hidden';

        // Initialize game based on modal type
        setTimeout(() => {
            this.initializeGame(modalId);
        }, 200);

        this.modalStates.set(modalId, 'open');
    }

    /**
     * Close modal and cleanup game
     */
    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }

        // Cleanup active game
        this.cleanupGame(modalId);
        this.modalStates.set(modalId, 'closed');
    }

    /**
     * Close all open modals
     */
    closeAllModals() {
        this.modalStates.forEach((state, modalId) => {
            if (state === 'open') {
                this.closeModal(modalId);
            }
        });
    }

    /**
     * Initialize game for specific modal
     */
    initializeGame(modalId) {
        // Cleanup any existing game first
        this.cleanupGame(modalId);

        switch (modalId) {
            case 'snake-modal':
                this.initializeSnakeGame();
                break;
            case 'graffiti-modal':
                this.initializeGraffitiGame();
                break;
            default:
                console.warn(`⚠️ Unknown game modal: ${modalId}`);
        }
    }

    /**
     * Initialize Snake Game - Clean implementation
     */
    initializeSnakeGame() {
        console.log('🐍 Initializing Snake Game (Unified)');
        
        const container = document.getElementById('snake-board');
        if (!container) {
            console.error('❌ Snake container not found');
            return;
        }

        // Clear container
        container.innerHTML = '';

        try {
            // Check if classes are available
            if (typeof CyberSnakeGame === 'undefined') {
                console.error('❌ CyberSnakeGame class not found - check script loading');
                return;
            }

            // Create new game instance
            const snakeGame = new CyberSnakeGame('snake-board');
            
            // Force start the game
            setTimeout(() => {
                snakeGame.start();
                console.log('🎮 Snake game started with state:', snakeGame.gameState);
            }, 100);
            
            // Store reference
            this.activeGames.set('snake-modal', snakeGame);
            
            console.log('✅ Snake game initialized successfully');
        } catch (error) {
            console.error('❌ Snake game initialization failed:', error);
        }
    }

    /**
     * Initialize Graffiti Game - Clean implementation
     */
    initializeGraffitiGame() {
        console.log('🎨 Initializing Graffiti Game (Unified)');
        
        const container = document.querySelector('.graffiti-canvas-container');
        if (!container) {
            console.error('❌ Graffiti container not found');
            return;
        }

        // Clear container
        container.innerHTML = '';

        try {
            // Check if classes are available
            if (typeof CyberGraffitiGame === 'undefined') {
                console.error('❌ CyberGraffitiGame class not found - check script loading');
                return;
            }

            // Create new game instance
            const graffitiGame = new CyberGraffitiGame('graffiti-canvas-container');
            
            // Force start the game
            setTimeout(() => {
                graffitiGame.start();
                console.log('🎨 Graffiti game started with state:', graffitiGame.gameState);
            }, 100);
            
            // Store reference
            this.activeGames.set('graffiti-modal', graffitiGame);
            
            console.log('✅ Graffiti game initialized successfully');
        } catch (error) {
            console.error('❌ Graffiti game initialization failed:', error);
        }
    }

    /**
     * Cleanup game instance
     */
    cleanupGame(modalId) {
        const game = this.activeGames.get(modalId);
        if (game && typeof game.destroy === 'function') {
            game.destroy();
        }
        this.activeGames.delete(modalId);
    }

    /**
     * Get active game instance
     */
    getActiveGame(modalId) {
        return this.activeGames.get(modalId);
    }
}

// Create global instance
window.unifiedGameModalSystem = new UnifiedGameModalSystem();

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.unifiedGameModalSystem.init();
    });
} else {
    window.unifiedGameModalSystem.init();
}

// Export for use
window.UnifiedGameModalSystem = UnifiedGameModalSystem;
