/**
 * GameAnalytics - Session tracking and performance monitoring
 * Privacy-focused analytics with local storage
 */

class GameAnalytics {
    constructor() {
        this.sessionId = this.generateSessionId();
        this.startTime = Date.now();
        this.events = [];
        this.performance = {
            fps: [],
            renderTime: [],
            memoryUsage: []
        };
        
        // Storage keys
        this.storageKeys = {
            sessions: 'cyber-game-sessions',
            highScores: 'cyber-game-scores',
            preferences: 'cyber-game-preferences',
            achievements: 'cyber-game-achievements'
        };
        
        // Initialize
        this.initializeAnalytics();
    }

    /**
     * Generate unique session ID
     */
    generateSessionId() {
        return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * Initialize analytics system
     */
    initializeAnalytics() {
        // Load existing data
        this.loadStoredData();
        
        // Track session start
        this.trackEvent('session_start', {
            timestamp: new Date().toISOString(),
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight,
                devicePixelRatio: window.devicePixelRatio
            },
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            touchSupport: 'ontouchstart' in window
        });
        
        // Setup performance monitoring
        this.setupPerformanceMonitoring();
        
        // Setup cleanup on page unload
        window.addEventListener('beforeunload', () => {
            this.trackSessionEnd();
            this.saveData();
        });
        
        console.log(`📊 GameAnalytics initialized: ${this.sessionId}`);
    }

    /**
     * Setup performance monitoring
     */
    setupPerformanceMonitoring() {
        // Monitor FPS
        let lastTime = performance.now();
        let frameCount = 0;
        
        const measureFPS = (currentTime) => {
            frameCount++;
            
            if (currentTime - lastTime >= 1000) {
                const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
                this.recordPerformance('fps', fps);
                
                frameCount = 0;
                lastTime = currentTime;
            }
            
            requestAnimationFrame(measureFPS);
        };
        
        requestAnimationFrame(measureFPS);
        
        // Monitor memory usage (if available)
        if (performance.memory) {
            setInterval(() => {
                this.recordPerformance('memory', {
                    used: performance.memory.usedJSHeapSize,
                    total: performance.memory.totalJSHeapSize,
                    limit: performance.memory.jsHeapSizeLimit
                });
            }, 5000);
        }
    }

    /**
     * Track game event
     */
    trackEvent(eventType, data = {}) {
        const event = {
            id: this.generateEventId(),
            sessionId: this.sessionId,
            type: eventType,
            timestamp: Date.now(),
            data: { ...data }
        };
        
        this.events.push(event);
        
        // Limit events in memory
        if (this.events.length > 100) {
            this.events.shift();
        }
        
        console.log(`📊 Event tracked: ${eventType}`, data);
    }

    /**
     * Generate event ID
     */
    generateEventId() {
        return `event_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    }

    /**
     * Record performance metric
     */
    recordPerformance(metric, value) {
        if (!this.performance[metric]) {
            this.performance[metric] = [];
        }
        
        this.performance[metric].push({
            timestamp: Date.now(),
            value
        });
        
        // Keep only last 50 measurements
        if (this.performance[metric].length > 50) {
            this.performance[metric].shift();
        }
    }

    /**
     * Track game start
     */
    trackGameStart(gameType, options = {}) {
        this.trackEvent('game_start', {
            gameType,
            options,
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight
            }
        });
    }

    /**
     * Track game end
     */
    trackGameEnd(gameType, stats = {}) {
        this.trackEvent('game_end', {
            gameType,
            stats,
            duration: stats.duration || 0
        });
        
        // Update high scores if applicable
        if (stats.score !== undefined) {
            this.updateHighScore(gameType, stats.score, stats);
        }
    }

    /**
     * Track user interaction
     */
    trackInteraction(interactionType, details = {}) {
        this.trackEvent('interaction', {
            type: interactionType,
            details
        });
    }

    /**
     * Track error
     */
    trackError(error, context = {}) {
        this.trackEvent('error', {
            message: error.message || error,
            stack: error.stack,
            context
        });
    }

    /**
     * Update high score
     */
    updateHighScore(gameType, score, stats = {}) {
        const highScores = this.getHighScores();
        
        if (!highScores[gameType]) {
            highScores[gameType] = [];
        }
        
        const entry = {
            score,
            timestamp: new Date().toISOString(),
            sessionId: this.sessionId,
            stats
        };
        
        highScores[gameType].push(entry);
        
        // Sort and keep top 10
        highScores[gameType].sort((a, b) => b.score - a.score);
        highScores[gameType] = highScores[gameType].slice(0, 10);
        
        this.saveHighScores(highScores);
        
        // Track achievement
        if (highScores[gameType][0] === entry) {
            this.trackEvent('achievement', {
                type: 'new_high_score',
                gameType,
                score
            });
        }
    }

    /**
     * Get high scores
     */
    getHighScores() {
        try {
            return JSON.parse(localStorage.getItem(this.storageKeys.highScores) || '{}');
        } catch {
            return {};
        }
    }

    /**
     * Save high scores
     */
    saveHighScores(highScores) {
        try {
            localStorage.setItem(this.storageKeys.highScores, JSON.stringify(highScores));
        } catch (error) {
            console.warn('Failed to save high scores:', error);
        }
    }

    /**
     * Get user preferences
     */
    getPreferences() {
        try {
            return JSON.parse(localStorage.getItem(this.storageKeys.preferences) || '{}');
        } catch {
            return {};
        }
    }

    /**
     * Save user preferences
     */
    savePreferences(preferences) {
        try {
            localStorage.setItem(this.storageKeys.preferences, JSON.stringify(preferences));
            this.trackEvent('preferences_updated', { preferences });
        } catch (error) {
            console.warn('Failed to save preferences:', error);
        }
    }

    /**
     * Track session end
     */
    trackSessionEnd() {
        const duration = Date.now() - this.startTime;
        
        this.trackEvent('session_end', {
            duration,
            eventsCount: this.events.length,
            performance: this.getPerformanceSummary()
        });
    }

    /**
     * Get performance summary
     */
    getPerformanceSummary() {
        const summary = {};
        
        for (const [metric, values] of Object.entries(this.performance)) {
            if (values.length === 0) continue;
            
            if (metric === 'fps') {
                const fps = values.map(v => v.value);
                summary.fps = {
                    avg: Math.round(fps.reduce((a, b) => a + b, 0) / fps.length),
                    min: Math.min(...fps),
                    max: Math.max(...fps)
                };
            } else if (metric === 'memory') {
                const memory = values.map(v => v.value.used);
                summary.memory = {
                    avg: Math.round(memory.reduce((a, b) => a + b, 0) / memory.length),
                    peak: Math.max(...memory)
                };
            }
        }
        
        return summary;
    }

    /**
     * Load stored data
     */
    loadStoredData() {
        // Load previous sessions for analytics
        try {
            const sessions = JSON.parse(localStorage.getItem(this.storageKeys.sessions) || '[]');
            console.log(`📊 Loaded ${sessions.length} previous sessions`);
        } catch (error) {
            console.warn('Failed to load session data:', error);
        }
    }

    /**
     * Save current session data
     */
    saveData() {
        try {
            const sessionData = {
                sessionId: this.sessionId,
                startTime: this.startTime,
                endTime: Date.now(),
                events: this.events,
                performance: this.getPerformanceSummary()
            };
            
            // Load existing sessions
            const sessions = JSON.parse(localStorage.getItem(this.storageKeys.sessions) || '[]');
            sessions.push(sessionData);
            
            // Keep only last 20 sessions
            const recentSessions = sessions.slice(-20);
            
            localStorage.setItem(this.storageKeys.sessions, JSON.stringify(recentSessions));
            console.log(`📊 Session data saved: ${this.sessionId}`);
        } catch (error) {
            console.warn('Failed to save session data:', error);
        }
    }

    /**
     * Get analytics summary
     */
    getAnalyticsSummary() {
        return {
            sessionId: this.sessionId,
            duration: Date.now() - this.startTime,
            eventsCount: this.events.length,
            performance: this.getPerformanceSummary(),
            highScores: this.getHighScores(),
            preferences: this.getPreferences()
        };
    }

    /**
     * Export analytics data
     */
    exportData() {
        const data = {
            sessions: JSON.parse(localStorage.getItem(this.storageKeys.sessions) || '[]'),
            highScores: this.getHighScores(),
            preferences: this.getPreferences(),
            currentSession: this.getAnalyticsSummary()
        };
        
        return JSON.stringify(data, null, 2);
    }

    /**
     * Clear all analytics data
     */
    clearData() {
        try {
            Object.values(this.storageKeys).forEach(key => {
                localStorage.removeItem(key);
            });
            
            this.events = [];
            this.performance = { fps: [], renderTime: [], memoryUsage: [] };
            
            console.log('📊 Analytics data cleared');
        } catch (error) {
            console.warn('Failed to clear analytics data:', error);
        }
    }
}

// Create global analytics instance
window.gameAnalytics = new GameAnalytics();

// Export for use
window.GameAnalytics = GameAnalytics;
