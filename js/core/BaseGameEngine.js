/**
 * BaseGameEngine - Abstract base class for all game engines
 * Provides common functionality: viewport calculations, HUD management, scoring, analytics
 */

class BaseGameEngine {
    constructor(containerId, gameType, config = {}) {
        if (this.constructor === BaseGameEngine) {
            throw new Error('BaseGameEngine is abstract and cannot be instantiated directly');
        }

        this.containerId = containerId;
        this.gameType = gameType;
        this.config = {
            // Default configuration
            gridSize: 20,
            canvasWidth: 600,
            canvasHeight: 400,
            enableAnalytics: true,
            enableHighScore: true,
            enableSocialSharing: false,
            enableLeaderboard: false,
            ...config
        };

        this.container = document.getElementById(containerId);
        if (!this.container) {
            throw new Error(`Container ${containerId} not found`);
        }

        // Common game state
        this.score = 0;
        this.highScore = this.loadHighScore();
        this.gameState = 'ready'; // ready, playing, paused, gameOver
        this.gameStartTime = null;
        this.analytics = [];

        // HUD elements (to be bound by subclasses)
        this.scoreEl = null;
        this.highScoreEl = null;
        this.statusEl = null;

        console.log(`🎮 ${gameType} BaseGameEngine initialized`);
    }

    // Abstract methods (must be implemented by subclasses)
    setupCanvas() {
        throw new Error('setupCanvas() must be implemented by subclass');
    }

    setupControls() {
        throw new Error('setupControls() must be implemented by subclass');
    }

    render() {
        throw new Error('render() must be implemented by subclass');
    }

    // Common viewport calculations
    calculateViewport() {
        const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
        
        // Calculate optimal dimensions based on viewport
        this.viewportWidth = vw;
        this.viewportHeight = vh;
        this.isMobile = vw < 768;
        this.isTouch = 'ontouchstart' in window;
        
        console.log(`📱 Viewport: ${vw}x${vh}, Mobile: ${this.isMobile}, Touch: ${this.isTouch}`);
        
        return { vw, vh, isMobile: this.isMobile, isTouch: this.isTouch };
    }

    // Common HUD styling
    injectBaseStyles() {
        if (document.getElementById(`base-game-styles-${this.gameType}`)) return;
        
        const style = document.createElement('style');
        style.id = `base-game-styles-${this.gameType}`;
        style.textContent = `
            .game-container-${this.gameType} {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
                color: #00ff9d;
                font-family: 'Courier New', monospace;
                z-index: 9999;
                display: flex;
                flex-direction: column;
                overflow: hidden;
            }
            
            .game-hud-${this.gameType} {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                padding: 20px;
                background: rgba(0, 0, 0, 0.8);
                border-bottom: 2px solid #00ff9d;
                flex-wrap: wrap;
                gap: 20px;
            }
            
            .hud-section {
                display: flex;
                flex-direction: column;
                gap: 8px;
            }
            
            .hud-label {
                font-size: 12px;
                font-weight: bold;
                color: #00ff9d;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            
            .score-display {
                display: flex;
                align-items: center;
                gap: 8px;
                font-size: 18px;
                font-weight: bold;
            }
            
            .high-score-display {
                display: flex;
                align-items: center;
                gap: 8px;
                font-size: 14px;
                opacity: 0.8;
            }
            
            .hud-btn {
                background: rgba(0, 255, 157, 0.1);
                border: 1px solid #00ff9d;
                color: #00ff9d;
                padding: 8px 16px;
                font-family: inherit;
                font-size: 12px;
                cursor: pointer;
                transition: all 0.2s;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            
            .hud-btn:hover {
                background: rgba(0, 255, 157, 0.2);
                transform: translateY(-1px);
            }
            
            .primary-action {
                background: linear-gradient(45deg, #00ff9d, #00cc7a);
                color: #000;
                font-weight: bold;
            }
            
            .close-btn {
                background: rgba(255, 68, 68, 0.2);
                border-color: #ff4444;
                color: #ff4444;
            }
            
            .game-canvas-${this.gameType} {
                flex: 1;
                border: 2px solid #00ff9d;
                background: #111;
                box-shadow: 0 0 20px rgba(0, 255, 157, 0.3);
                margin: 0 20px 20px 20px;
            }
            
            @media (max-width: 768px) {
                .game-hud-${this.gameType} {
                    padding: 10px;
                    gap: 10px;
                }
                
                .hud-btn {
                    padding: 12px 16px;
                    font-size: 14px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Common scoring system
    updateScore(points = 0) {
        this.score += points;
        
        // Update high score
        if (this.score > this.highScore) {
            this.highScore = this.score;
            this.saveHighScore();
        }
        
        this.updateHUD();
        
        // Track analytics
        if (this.config.enableAnalytics && points > 0) {
            this.trackEvent('score_update', { points, totalScore: this.score });
        }
    }

    // Common HUD update
    updateHUD() {
        if (this.scoreEl) {
            this.scoreEl.textContent = this.score.toString();
        }
        if (this.highScoreEl) {
            this.highScoreEl.textContent = this.highScore.toString();
        }
        if (this.statusEl) {
            this.statusEl.textContent = this.gameState.toUpperCase();
        }
    }

    // Common high score management
    loadHighScore() {
        if (!this.config.enableHighScore) return 0;
        return parseInt(localStorage.getItem(`${this.gameType}-high-score`) || '0');
    }

    saveHighScore() {
        if (!this.config.enableHighScore) return;
        localStorage.setItem(`${this.gameType}-high-score`, this.highScore.toString());
    }

    // Common analytics system
    trackEvent(eventType, data = {}) {
        if (!this.config.enableAnalytics) return;
        
        const event = {
            type: eventType,
            game: this.gameType,
            timestamp: Date.now(),
            sessionId: this.getSessionId(),
            data
        };
        
        this.analytics.push(event);
        
        // Store in session storage
        const sessionAnalytics = JSON.parse(sessionStorage.getItem('game_analytics') || '[]');
        sessionAnalytics.push(event);
        sessionStorage.setItem('game_analytics', JSON.stringify(sessionAnalytics.slice(-100)));
        
        console.log(`📊 Analytics: ${eventType}`, data);
    }

    getSessionId() {
        let sessionId = sessionStorage.getItem('game_session_id');
        if (!sessionId) {
            sessionId = Date.now().toString(36) + Math.random().toString(36).substr(2);
            sessionStorage.setItem('game_session_id', sessionId);
        }
        return sessionId;
    }

    // Common social sharing
    shareScore(customMessage = '') {
        if (!this.config.enableSocialSharing) return;
        
        const message = customMessage || `I scored ${this.score} points in ${this.gameType.toUpperCase()}!`;
        
        if (navigator.share) {
            navigator.share({
                title: `${this.gameType.toUpperCase()} High Score`,
                text: message,
                url: window.location.href
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(`${message}\n\nPlay at: ${window.location.href}`).then(() => {
                this.showNotification('Score copied to clipboard!');
            });
        }
        
        this.trackEvent('social_share', { score: this.score, method: navigator.share ? 'native' : 'clipboard' });
    }

    // Common leaderboard system
    saveToLeaderboard(additionalData = {}) {
        if (!this.config.enableLeaderboard) return;
        
        const leaderboard = JSON.parse(localStorage.getItem(`${this.gameType}-leaderboard`) || '[]');
        
        const entry = {
            score: this.score,
            timestamp: Date.now(),
            gameType: this.gameType,
            sessionId: this.getSessionId(),
            ...additionalData
        };
        
        leaderboard.push(entry);
        leaderboard.sort((a, b) => b.score - a.score);
        leaderboard.splice(10); // Keep top 10
        
        localStorage.setItem(`${this.gameType}-leaderboard`, JSON.stringify(leaderboard));
        
        this.trackEvent('leaderboard_entry', { score: this.score, rank: leaderboard.findIndex(e => e.sessionId === entry.sessionId) + 1 });
    }

    getLeaderboard() {
        return JSON.parse(localStorage.getItem(`${this.gameType}-leaderboard`) || '[]');
    }

    // Common notification system
    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        const colors = {
            success: '#00ff9d',
            error: '#ff4444',
            warning: '#ffaa44',
            info: '#44aaff'
        };
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${colors[type] || colors.success};
            color: ${type === 'success' ? '#000' : '#fff'};
            padding: 12px 20px;
            border-radius: 4px;
            font-weight: bold;
            z-index: 10001;
            font-family: 'Courier New', monospace;
            animation: slideInRight 0.3s ease;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Common game state management
    startGame() {
        this.gameState = 'playing';
        this.gameStartTime = Date.now();
        this.trackEvent('game_start');
        this.updateHUD();
    }

    pauseGame() {
        if (this.gameState === 'playing') {
            this.gameState = 'paused';
            this.trackEvent('game_pause');
            this.updateHUD();
        }
    }

    resumeGame() {
        if (this.gameState === 'paused') {
            this.gameState = 'playing';
            this.trackEvent('game_resume');
            this.updateHUD();
        }
    }

    endGame() {
        this.gameState = 'gameOver';
        const duration = Date.now() - (this.gameStartTime || Date.now());
        
        this.trackEvent('game_end', { 
            score: this.score, 
            duration,
            highScore: this.score === this.highScore 
        });
        
        if (this.config.enableLeaderboard) {
            this.saveToLeaderboard({ duration });
        }
        
        this.updateHUD();
    }

    // Common cleanup
    destroy() {
        this.trackEvent('game_destroy');
        this.container.innerHTML = '';
        
        // Remove game-specific styles
        const styleEl = document.getElementById(`base-game-styles-${this.gameType}`);
        if (styleEl) styleEl.remove();
    }

    // Common close functionality
    close() {
        this.trackEvent('game_close');
        this.container.style.display = 'none';
        document.body.style.overflow = '';
    }
}

window.BaseGameEngine = BaseGameEngine;
