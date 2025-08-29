/**
 * GameLoader - Progressive enhancement for game loading
 * Lazy loads game engines, manages performance budgets, and provides loading states
 */

class GameLoader {
    constructor() {
        this.loadedEngines = new Map();
        this.loadingPromises = new Map();
        this.performanceBudget = {
            maxConcurrentLoads: 2,
            loadTimeout: 10000,
            memoryThreshold: 100 * 1024 * 1024 // 100MB
        };
        this.activeLoads = 0;
        this.loadQueue = [];
        
        this.setupPerformanceMonitoring();
        console.log('🚀 GameLoader initialized with progressive enhancement');
    }

    setupPerformanceMonitoring() {
        // Monitor memory usage if available
        if ('memory' in performance) {
            this.memoryMonitor = setInterval(() => {
                const memInfo = performance.memory;
                if (memInfo.usedJSHeapSize > this.performanceBudget.memoryThreshold) {
                    console.warn('⚠️ Memory usage high, deferring game loads');
                    this.pauseLoading = true;
                } else {
                    this.pauseLoading = false;
                    this.processQueue();
                }
            }, 5000);
        }
    }

    async loadGameEngine(gameType, containerId, config = {}) {
        const engineKey = `${gameType}-${containerId}`;
        
        // Return existing instance if already loaded
        if (this.loadedEngines.has(engineKey)) {
            return this.loadedEngines.get(engineKey);
        }
        
        // Return existing promise if currently loading
        if (this.loadingPromises.has(engineKey)) {
            return this.loadingPromises.get(engineKey);
        }
        
        // Create loading promise
        const loadPromise = this.createLoadPromise(gameType, containerId, config);
        this.loadingPromises.set(engineKey, loadPromise);
        
        try {
            const engine = await loadPromise;
            this.loadedEngines.set(engineKey, engine);
            this.loadingPromises.delete(engineKey);
            return engine;
        } catch (error) {
            this.loadingPromises.delete(engineKey);
            throw error;
        }
    }

    async createLoadPromise(gameType, containerId, config) {
        // Check if we can load immediately or need to queue
        if (this.activeLoads >= this.performanceBudget.maxConcurrentLoads || this.pauseLoading) {
            await this.queueLoad(gameType, containerId, config);
        }
        
        this.activeLoads++;
        
        try {
            // Show loading state
            this.showLoadingState(containerId, gameType);
            
            // Ensure dependencies are loaded
            await this.loadDependencies(gameType);
            
            // Create game engine with timeout
            const engine = await Promise.race([
                this.createGameEngine(gameType, containerId, config),
                this.createTimeout(this.performanceBudget.loadTimeout)
            ]);
            
            // Hide loading state
            this.hideLoadingState(containerId);
            
            // Track successful load
            this.trackLoadEvent('game_load_success', { gameType, loadTime: Date.now() });
            
            return engine;
            
        } catch (error) {
            this.hideLoadingState(containerId);
            this.showErrorState(containerId, gameType, error);
            this.trackLoadEvent('game_load_error', { gameType, error: error.message });
            throw error;
        } finally {
            this.activeLoads--;
            this.processQueue();
        }
    }

    async loadDependencies(gameType) {
        const dependencies = {
            snake: ['BaseGameEngine', 'SnakeGameEngine'],
            slap: ['BaseGameEngine', 'SlapGameEngine']
        };
        
        const requiredDeps = dependencies[gameType] || [];
        
        for (const dep of requiredDeps) {
            if (!window[dep]) {
                await this.loadScript(`/js/core/${dep}.js`);
            }
        }
        
        // Ensure UnifiedModalSystem and UnifiedHUDSystem are loaded
        if (!window.UnifiedModalSystem) {
            await this.loadScript('/js/core/UnifiedModalSystem.js');
        }
        if (!window.UnifiedHUDSystem) {
            await this.loadScript('/js/core/UnifiedHUDSystem.js');
        }
    }

    async loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
            document.head.appendChild(script);
        });
    }

    async createGameEngine(gameType, containerId, config) {
        const EngineClass = this.getEngineClass(gameType);
        if (!EngineClass) {
            throw new Error(`Unknown game type: ${gameType}`);
        }
        
        return new EngineClass(containerId, config);
    }

    getEngineClass(gameType) {
        const engines = {
            snake: window.SnakeGameEngine,
            slap: window.SlapGameEngine
        };
        
        return engines[gameType];
    }

    async queueLoad(gameType, containerId, config) {
        return new Promise((resolve) => {
            this.loadQueue.push({ gameType, containerId, config, resolve });
        });
    }

    processQueue() {
        if (this.loadQueue.length === 0 || this.activeLoads >= this.performanceBudget.maxConcurrentLoads || this.pauseLoading) {
            return;
        }
        
        const next = this.loadQueue.shift();
        if (next) {
            next.resolve();
        }
    }

    createTimeout(ms) {
        return new Promise((_, reject) => {
            setTimeout(() => reject(new Error('Load timeout')), ms);
        });
    }

    showLoadingState(containerId, gameType) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        container.innerHTML = `
            <div class="game-loading-state">
                <div class="loading-spinner"></div>
                <div class="loading-text">Loading ${gameType.toUpperCase()} Game...</div>
                <div class="loading-progress">
                    <div class="progress-bar"></div>
                </div>
            </div>
        `;
        
        this.injectLoadingStyles();
        this.animateProgressBar(containerId);
    }

    hideLoadingState(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const loadingState = container.querySelector('.game-loading-state');
        if (loadingState) {
            loadingState.style.opacity = '0';
            setTimeout(() => {
                container.innerHTML = '';
            }, 300);
        }
    }

    showErrorState(containerId, gameType, error) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        container.innerHTML = `
            <div class="game-error-state">
                <div class="error-icon">⚠️</div>
                <div class="error-title">Failed to load ${gameType.toUpperCase()} Game</div>
                <div class="error-message">${error.message}</div>
                <button class="retry-btn" onclick="gameLoader.retryLoad('${gameType}', '${containerId}')">
                    Retry Loading
                </button>
            </div>
        `;
    }

    async retryLoad(gameType, containerId, config = {}) {
        // Clear any existing state
        const engineKey = `${gameType}-${containerId}`;
        this.loadedEngines.delete(engineKey);
        this.loadingPromises.delete(engineKey);
        
        // Attempt to load again
        try {
            return await this.loadGameEngine(gameType, containerId, config);
        } catch (error) {
            console.error('Retry failed:', error);
            throw error;
        }
    }

    animateProgressBar(containerId) {
        const progressBar = document.querySelector(`#${containerId} .progress-bar`);
        if (!progressBar) return;
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 20;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
            }
            progressBar.style.width = `${progress}%`;
        }, 200);
    }

    injectLoadingStyles() {
        if (document.getElementById('game-loader-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'game-loader-styles';
        style.textContent = `
            .game-loading-state {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 400px;
                background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
                color: #00ff9d;
                font-family: 'Courier New', monospace;
                transition: opacity 0.3s ease;
            }
            
            .loading-spinner {
                width: 40px;
                height: 40px;
                border: 3px solid rgba(0, 255, 157, 0.3);
                border-top: 3px solid #00ff9d;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin-bottom: 20px;
            }
            
            .loading-text {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 20px;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            
            .loading-progress {
                width: 200px;
                height: 4px;
                background: rgba(0, 255, 157, 0.2);
                border-radius: 2px;
                overflow: hidden;
            }
            
            .progress-bar {
                height: 100%;
                background: linear-gradient(90deg, #00ff9d, #00cc7a);
                width: 0%;
                transition: width 0.3s ease;
            }
            
            .game-error-state {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 400px;
                background: linear-gradient(135deg, #1a0a0a 0%, #2a1a1a 100%);
                color: #ff4444;
                font-family: 'Courier New', monospace;
                text-align: center;
                padding: 20px;
            }
            
            .error-icon {
                font-size: 48px;
                margin-bottom: 20px;
            }
            
            .error-title {
                font-size: 20px;
                font-weight: bold;
                margin-bottom: 10px;
                text-transform: uppercase;
            }
            
            .error-message {
                font-size: 14px;
                opacity: 0.8;
                margin-bottom: 20px;
                max-width: 300px;
            }
            
            .retry-btn {
                background: rgba(255, 68, 68, 0.2);
                border: 1px solid #ff4444;
                color: #ff4444;
                padding: 10px 20px;
                font-family: inherit;
                font-size: 14px;
                cursor: pointer;
                transition: all 0.2s ease;
                text-transform: uppercase;
                letter-spacing: 1px;
                border-radius: 4px;
            }
            
            .retry-btn:hover {
                background: rgba(255, 68, 68, 0.4);
                transform: translateY(-1px);
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }

    // Analytics and monitoring
    trackLoadEvent(eventType, data = {}) {
        const event = {
            type: eventType,
            timestamp: Date.now(),
            sessionId: this.getSessionId(),
            data
        };
        
        const sessionAnalytics = JSON.parse(sessionStorage.getItem('game_loader_analytics') || '[]');
        sessionAnalytics.push(event);
        sessionStorage.setItem('game_loader_analytics', JSON.stringify(sessionAnalytics.slice(-50)));
        
        console.log(`📊 GameLoader: ${eventType}`, data);
    }

    getSessionId() {
        let sessionId = sessionStorage.getItem('game_loader_session_id');
        if (!sessionId) {
            sessionId = Date.now().toString(36) + Math.random().toString(36).substr(2);
            sessionStorage.setItem('game_loader_session_id', sessionId);
        }
        return sessionId;
    }

    // Performance utilities
    getLoadMetrics() {
        return {
            loadedEngines: this.loadedEngines.size,
            activeLoads: this.activeLoads,
            queueLength: this.loadQueue.length,
            memoryUsage: performance.memory ? performance.memory.usedJSHeapSize : null
        };
    }

    // Cleanup
    destroy() {
        if (this.memoryMonitor) {
            clearInterval(this.memoryMonitor);
        }
        
        this.loadedEngines.clear();
        this.loadingPromises.clear();
        this.loadQueue = [];
        
        const styleEl = document.getElementById('game-loader-styles');
        if (styleEl) styleEl.remove();
    }
}

// Global instance
window.gameLoader = new GameLoader();

// Convenience functions for backward compatibility
window.loadGame = async (gameType, containerId, config) => {
    return window.gameLoader.loadGameEngine(gameType, containerId, config);
};

console.log('🚀 GameLoader ready for progressive enhancement');
