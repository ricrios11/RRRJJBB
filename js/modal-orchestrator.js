/**
 * MODAL ORCHESTRATOR - Agent-Driven Modal State Management
 * Disciplined Excellence: Bulletproof modal system with evening-reflection tone
 * Future-State Innovation: Extensible architecture for tomorrow's features
 */

class ModalOrchestrator {
    constructor() {
        this.activeModal = null;
        this.modalStack = [];
        this.isInitialized = false;
        this.debugMode = true;
        
        // Evening reflection tone: calm, curiosity-charged, methodical
        this.brandVoice = {
            transformation: "Every interaction transforms understanding",
            mastery: "Mastery emerges through disciplined practice", 
            futureAware: "Building tomorrow's realities, not yesterday's reports"
        };
        
        this.init();
    }
    
    init() {
        if (this.isInitialized) return;
        
        this.log("🎛️ Modal Orchestrator initializing...");
        this.setupEventListeners();
        this.validateModalStructure();
        this.isInitialized = true;
        this.log("✅ Modal Orchestrator ready - transformation awaits");
    }
    
    log(message) {
        if (this.debugMode) {
            console.log(`[Modal Orchestrator] ${message}`);
        }
    }
    
    setupEventListeners() {
        // Escape key handler
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.activeModal) {
                this.closeModal(this.activeModal);
            }
        });
        
        // Click outside to close
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('game-modal') && this.activeModal) {
                this.closeModal(this.activeModal);
            }
        });
    }
    
    validateModalStructure() {
        const requiredModals = ['snake-modal', 'graffiti-modal'];
        const missingModals = [];
        
        requiredModals.forEach(modalId => {
            const modal = document.getElementById(modalId);
            if (!modal) {
                missingModals.push(modalId);
            }
        });
        
        if (missingModals.length > 0) {
            this.log(`⚠️ Missing modals detected: ${missingModals.join(', ')}`);
            return false;
        }
        
        this.log("✅ All required modals validated");
        return true;
    }
    
    openModal(modalId) {
        this.log(`🚀 Launch request: ${modalId}`);
        
        const modal = document.getElementById(modalId);
        if (!modal) {
            this.handleLaunchFailure(modalId, "Modal element not found");
            return false;
        }
        
        // Close any existing modal first
        if (this.activeModal) {
            this.closeModal(this.activeModal);
        }
        
        // Show modal with smooth animation
        modal.style.display = 'flex';
        modal.style.opacity = '0';
        
        // Trigger reflow for animation
        modal.offsetHeight;
        
        modal.style.transition = 'opacity 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        modal.style.opacity = '1';
        
        // Update state
        this.activeModal = modalId;
        this.modalStack.push(modalId);
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Initialize modal-specific functionality
        this.initializeModalContent(modalId);
        
        this.log(`✅ ${modalId} launched successfully`);
        return true;
    }
    
    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return false;
        
        this.log(`🔄 Closing ${modalId}`);
        
        // Smooth close animation
        modal.style.transition = 'opacity 0.2s ease-out';
        modal.style.opacity = '0';
        
        setTimeout(() => {
            modal.style.display = 'none';
            modal.style.transition = '';
        }, 200);
        
        // Update state
        this.activeModal = null;
        this.modalStack = this.modalStack.filter(id => id !== modalId);
        
        // Restore body scroll
        document.body.style.overflow = 'auto';
        
        this.log(`✅ ${modalId} closed gracefully`);
        return true;
    }
    
    initializeModalContent(modalId) {
        switch(modalId) {
            case 'snake-modal':
                this.initializeSnakeGame();
                break;
            case 'graffiti-modal':
                this.initializeGraffitiGame();
                break;
            default:
                this.log(`⚠️ No initialization handler for ${modalId}`);
        }
    }
    
    initializeSnakeGame() {
        this.log("🐍 Initializing Snake Game Protocol...");
        
        const gameContainer = document.querySelector('#snake-modal .snake-game-container');
        if (!gameContainer) {
            this.log("❌ Snake game container not found");
            return;
        }
        
        // Check if game is already initialized
        if (gameContainer.querySelector('.snake-board')) {
            this.log("✅ Snake game already initialized");
            return;
        }
        
        // Initialize the actual snake game
        if (typeof initializeSnakeGameEngine === 'function') {
            initializeSnakeGameEngine();
        } else {
            // Fallback implementation
            gameContainer.innerHTML = `
                <div class="snake-board" style="
                    width: 400px; 
                    height: 400px; 
                    background: var(--cyber-dark-secondary);
                    border: 2px solid var(--cyber-primary-accent);
                    margin: 0 auto;
                    position: relative;
                    display: grid;
                    grid-template-columns: repeat(20, 1fr);
                    grid-template-rows: repeat(20, 1fr);
                ">
                    <div style="
                        grid-column: 1 / -1;
                        grid-row: 1 / -1;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: var(--cyber-primary-accent);
                        font-family: var(--cyber-font-mono);
                        font-size: 1.2rem;
                        text-align: center;
                    ">
                        🐍 SNAKE PROTOCOL READY<br>
                        <small style="opacity: 0.7; margin-top: 1rem; display: block;">
                            Use arrow keys to navigate<br>
                            Mastery emerges through disciplined practice
                        </small>
                    </div>
                </div>
                <div style="margin-top: 1rem; text-align: center;">
                    <button class="cyber-btn" onclick="window.modalOrchestrator.startSnakeGame()">
                        ▶ BEGIN VALIDATION
                    </button>
                </div>
            `;
        }
        
        this.log("✅ Snake game initialized");
    }
    
    initializeGraffitiGame() {
        this.log("🎨 Initializing Graffiti Slap Creator...");
        
        const gameContainer = document.querySelector('#graffiti-modal .graffiti-interface');
        if (!gameContainer) {
            this.log("❌ Graffiti interface container not found");
            return;
        }
        
        // Check if already initialized
        if (gameContainer.querySelector('.graffiti-canvas')) {
            this.log("✅ Graffiti interface already initialized");
            return;
        }
        
        // Initialize graffiti interface
        gameContainer.innerHTML = `
            <div class="graffiti-canvas" style="
                width: 100%;
                max-width: 500px;
                height: 300px;
                background: var(--cyber-dark-secondary);
                border: 2px solid var(--cyber-primary-accent);
                margin: 0 auto 1rem;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                color: var(--cyber-primary-accent);
                font-family: var(--cyber-font-mono);
                text-align: center;
            ">
                🎨 CREATIVE EXPRESSION PROTOCOL<br>
                <small style="opacity: 0.7; margin-top: 0.5rem; display: block;">
                    Building tomorrow's realities through creative discourse
                </small>
            </div>
            <div class="graffiti-controls" style="text-align: center;">
                <button class="cyber-btn" onclick="window.modalOrchestrator.startGraffitiMode()">
                    ▶ INITIALIZE DISCOURSE VALIDATION
                </button>
            </div>
        `;
        
        this.log("✅ Graffiti interface initialized");
    }
    
    startSnakeGame() {
        this.log("🚀 Starting Snake Game...");
        // Placeholder for actual game start logic
        const board = document.querySelector('.snake-board');
        if (board) {
            board.innerHTML = `
                <div style="
                    grid-column: 1 / -1;
                    grid-row: 1 / -1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--cyber-primary-accent);
                    font-family: var(--cyber-font-mono);
                    animation: pulse 2s infinite;
                ">
                    🐍 GAME ACTIVE<br>
                    <small>Use arrow keys to move</small>
                </div>
            `;
        }
    }
    
    startGraffitiMode() {
        this.log("🎨 Starting Graffiti Mode...");
        const canvas = document.querySelector('.graffiti-canvas');
        if (canvas) {
            canvas.innerHTML = `
                <div style="
                    color: var(--cyber-primary-accent);
                    font-family: var(--cyber-font-mono);
                    animation: pulse 2s infinite;
                ">
                    🎨 CREATIVE MODE ACTIVE<br>
                    <small>Click and drag to create</small>
                </div>
            `;
        }
    }
    
    handleLaunchFailure(modalId, reason) {
        this.log(`❌ Launch failed for ${modalId}: ${reason}`);
        
        // Show user-friendly feedback instead of glitching
        const fallbackMessage = this.createFallbackModal(modalId, reason);
        document.body.appendChild(fallbackMessage);
        
        setTimeout(() => {
            fallbackMessage.remove();
        }, 3000);
    }
    
    createFallbackModal(modalId, reason) {
        const fallback = document.createElement('div');
        fallback.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--cyber-dark-primary);
            border: 2px solid var(--cyber-primary-accent);
            border-radius: var(--cyber-radius-base);
            padding: 2rem;
            color: var(--cyber-primary-accent);
            font-family: var(--cyber-font-mono);
            text-align: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease-out;
        `;
        
        fallback.innerHTML = `
            <div style="font-size: 1.5rem; margin-bottom: 1rem;">🔧</div>
            <div>Feature not ready yet—let's reflect instead of glitching</div>
            <div style="opacity: 0.7; margin-top: 0.5rem; font-size: 0.9rem;">
                ${this.brandVoice.transformation}
            </div>
        `;
        
        return fallback;
    }
}

// Ensure DOM is ready before initialization
function initializeModalSystem() {
    console.log('🎛️ Initializing Modal System...');
    
    // Global initialization
    window.modalOrchestrator = new ModalOrchestrator();
    
    // Global functions for backward compatibility
    window.openModal = (modalId) => {
        console.log(`🚀 Global openModal called: ${modalId}`);
        return window.modalOrchestrator.openModal(modalId);
    };
    
    window.closeModal = (modalId) => {
        console.log(`🔄 Global closeModal called: ${modalId}`);
        return window.modalOrchestrator.closeModal(modalId);
    };
    
    window.initializeSnakeGame = () => {
        console.log('🐍 Global initializeSnakeGame called');
        return window.modalOrchestrator.initializeSnakeGame();
    };
    
    window.initializeGraffitiGame = () => {
        console.log('🎨 Global initializeGraffitiGame called');
        return window.modalOrchestrator.initializeGraffitiGame();
    };
    
    console.log('✅ Modal System initialized - global functions ready');
}

// Initialize immediately if DOM is ready, otherwise wait
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeModalSystem);
} else {
    initializeModalSystem();
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ModalOrchestrator;
}
