/**
 * UnifiedModalSystem - Single source of truth for all modal interactions
 * Eliminates competing modal systems and provides consistent UX
 * Extends BaseGameEngine patterns for unified architecture
 */

class UnifiedModalSystem {
    constructor() {
        this.activeModals = new Map();
        this.modalStack = [];
        this.escapeHandler = null;
        this.backdropClickHandler = null;
        
        this.setupGlobalStyles();
        this.setupEventListeners();
        
        console.log('🎯 UnifiedModalSystem initialized');
    }

    setupGlobalStyles() {
        if (document.getElementById('unified-modal-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'unified-modal-styles';
        style.textContent = `
            .unified-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: rgba(0, 0, 0, 0.95);
                backdrop-filter: blur(10px);
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }
            
            .unified-modal.active {
                opacity: 1;
                visibility: visible;
            }
            
            .unified-modal-content {
                position: relative;
                max-width: 95vw;
                max-height: 95vh;
                background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
                border: 2px solid #00ff9d;
                border-radius: 8px;
                box-shadow: 0 0 30px rgba(0, 255, 157, 0.3);
                overflow: hidden;
                transform: scale(0.9);
                transition: transform 0.3s ease;
            }
            
            .unified-modal.active .unified-modal-content {
                transform: scale(1);
            }
            
            .unified-modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20px;
                background: rgba(0, 255, 157, 0.1);
                border-bottom: 1px solid #00ff9d;
            }
            
            .unified-modal-title {
                color: #00ff9d;
                font-family: 'Courier New', monospace;
                font-size: 18px;
                font-weight: bold;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            
            .unified-modal-close {
                background: rgba(255, 68, 68, 0.2);
                border: 1px solid #ff4444;
                color: #ff4444;
                width: 32px;
                height: 32px;
                border-radius: 4px;
                cursor: pointer;
                font-size: 18px;
                font-weight: bold;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s ease;
            }
            
            .unified-modal-close:hover {
                background: rgba(255, 68, 68, 0.4);
                transform: scale(1.1);
            }
            
            .unified-modal-body {
                padding: 0;
                overflow: auto;
                max-height: calc(95vh - 80px);
            }
            
            .game-modal-body {
                padding: 0;
                display: flex;
                flex-direction: column;
                height: calc(95vh - 80px);
            }
            
            .modal-instructions {
                padding: 15px 20px;
                background: rgba(0, 0, 0, 0.5);
                border-top: 1px solid rgba(0, 255, 157, 0.3);
                color: #00ff9d;
                font-family: 'Courier New', monospace;
                font-size: 12px;
                text-align: center;
            }
            
            @media (max-width: 768px) {
                .unified-modal-content {
                    max-width: 100vw;
                    max-height: 100vh;
                    border-radius: 0;
                }
                
                .unified-modal-header {
                    padding: 15px;
                }
                
                .unified-modal-title {
                    font-size: 16px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    setupEventListeners() {
        // Global escape key handler
        this.escapeHandler = (e) => {
            if (e.key === 'Escape' && this.modalStack.length > 0) {
                this.closeTopModal();
            }
        };
        
        document.addEventListener('keydown', this.escapeHandler);
    }

    createModal(id, title, type = 'default') {
        // Remove existing modal with same ID
        this.closeModal(id);
        
        const modal = document.createElement('div');
        modal.className = 'unified-modal';
        modal.id = `unified-modal-${id}`;
        modal.dataset.modalId = id;
        modal.dataset.modalType = type;
        
        const bodyClass = type === 'game' ? 'game-modal-body' : 'unified-modal-body';
        
        modal.innerHTML = `
            <div class="unified-modal-content">
                <div class="unified-modal-header">
                    <div class="unified-modal-title">${title}</div>
                    <button class="unified-modal-close" aria-label="Close Modal">×</button>
                </div>
                <div class="${bodyClass}" id="modal-content-${id}">
                    <!-- Content will be injected here -->
                </div>
                ${type === 'game' ? `
                    <div class="modal-instructions">
                        <span class="desktop-instructions">ESC to exit • WASD/Arrow Keys • SPACE for actions • R to restart</span>
                        <span class="mobile-instructions">Use touch controls • Swipe for quick moves</span>
                    </div>
                ` : ''}
            </div>
        `;
        
        // Setup close handlers
        const closeBtn = modal.querySelector('.unified-modal-close');
        closeBtn.addEventListener('click', () => this.closeModal(id));
        
        // Backdrop click to close (optional)
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal(id);
            }
        });
        
        document.body.appendChild(modal);
        this.activeModals.set(id, modal);
        
        return modal;
    }

    openModal(id, title, content, type = 'default') {
        const modal = this.createModal(id, title, type);
        const contentContainer = modal.querySelector(`#modal-content-${id}`);
        
        if (typeof content === 'string') {
            contentContainer.innerHTML = content;
        } else if (content instanceof HTMLElement) {
            contentContainer.appendChild(content);
        } else if (typeof content === 'function') {
            content(contentContainer);
        }
        
        // Show modal with animation
        requestAnimationFrame(() => {
            modal.classList.add('active');
            this.modalStack.push(id);
            document.body.style.overflow = 'hidden';
        });
        
        // Track analytics
        this.trackModalEvent('modal_open', { id, title, type });
        
        return contentContainer;
    }

    closeModal(id) {
        const modal = this.activeModals.get(id);
        if (!modal) return;
        
        modal.classList.remove('active');
        
        setTimeout(() => {
            modal.remove();
            this.activeModals.delete(id);
            
            // Remove from stack
            const stackIndex = this.modalStack.indexOf(id);
            if (stackIndex > -1) {
                this.modalStack.splice(stackIndex, 1);
            }
            
            // Restore body scroll if no modals remain
            if (this.modalStack.length === 0) {
                document.body.style.overflow = '';
            }
        }, 300);
        
        // Track analytics
        this.trackModalEvent('modal_close', { id });
    }

    closeTopModal() {
        if (this.modalStack.length > 0) {
            const topModalId = this.modalStack[this.modalStack.length - 1];
            this.closeModal(topModalId);
        }
    }

    closeAllModals() {
        const modalIds = [...this.activeModals.keys()];
        modalIds.forEach(id => this.closeModal(id));
    }

    // Game-specific modal methods
    openGameModal(gameId, gameTitle, gameEngine) {
        const contentContainer = this.openModal(gameId, gameTitle, '', 'game');
        
        // Initialize game engine in the modal
        if (gameEngine && typeof gameEngine === 'function') {
            const game = new gameEngine(contentContainer.id);
            
            // Store game reference for cleanup
            contentContainer.gameInstance = game;
        }
        
        return contentContainer;
    }

    // Case study modal methods
    openCaseStudyModal(studyId, studyTitle, studyContent) {
        return this.openModal(`case-study-${studyId}`, studyTitle, studyContent, 'case-study');
    }

    // Feature modal methods
    openFeatureModal(featureId, featureTitle, featureContent) {
        return this.openModal(`feature-${featureId}`, featureTitle, featureContent, 'feature');
    }

    // Analytics tracking
    trackModalEvent(eventType, data = {}) {
        const event = {
            type: eventType,
            timestamp: Date.now(),
            sessionId: this.getSessionId(),
            data
        };
        
        // Store in session storage
        const sessionAnalytics = JSON.parse(sessionStorage.getItem('modal_analytics') || '[]');
        sessionAnalytics.push(event);
        sessionStorage.setItem('modal_analytics', JSON.stringify(sessionAnalytics.slice(-50)));
        
        console.log(`📊 Modal Analytics: ${eventType}`, data);
    }

    getSessionId() {
        let sessionId = sessionStorage.getItem('modal_session_id');
        if (!sessionId) {
            sessionId = Date.now().toString(36) + Math.random().toString(36).substr(2);
            sessionStorage.setItem('modal_session_id', sessionId);
        }
        return sessionId;
    }

    // Utility methods
    isModalOpen(id) {
        return this.activeModals.has(id);
    }

    getActiveModals() {
        return [...this.activeModals.keys()];
    }

    getModalStack() {
        return [...this.modalStack];
    }

    // Cleanup
    destroy() {
        this.closeAllModals();
        document.removeEventListener('keydown', this.escapeHandler);
        
        const styleEl = document.getElementById('unified-modal-styles');
        if (styleEl) styleEl.remove();
    }
}

// Global instance
window.unifiedModalSystem = new UnifiedModalSystem();

// Backward compatibility functions
window.openModal = (id, title, content, type) => {
    return window.unifiedModalSystem.openModal(id, title, content, type);
};

window.closeModal = (id) => {
    return window.unifiedModalSystem.closeModal(id);
};

window.createSnakeGameModal = () => {
    return window.unifiedModalSystem.openGameModal('snake-game', 'Snake Game', SnakeGameEngine);
};

window.createGraffitiSlapModal = () => {
    return window.unifiedModalSystem.openGameModal('slap-game', 'Graffiti SLAP', SlapGameEngine);
};

window.createAgentExpressionModal = () => {
    return window.unifiedModalSystem.openFeatureModal('agent-expression', 'Agent Expression', 
        '<div style="padding: 20px; color: #00ff9d;">Agent Expression feature coming soon...</div>');
};

console.log('🎯 UnifiedModalSystem loaded with backward compatibility');
