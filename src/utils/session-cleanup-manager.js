
/**
 * Session Cleanup Manager
 * Manages session data lifecycle and prevents memory leaks
 */

class SessionCleanupManager {
    constructor() {
        this.maxSessionAge = 24 * 60 * 60 * 1000; // 24 hours
        this.maxSessionCount = 1000;
        this.cleanupInterval = 60 * 60 * 1000; // 1 hour
        this.sessions = new Map();
        
        // Start cleanup timer
        this.startCleanupTimer();
    }

    addSession(sessionId, sessionData) {
        const session = {
            ...sessionData,
            createdAt: Date.now(),
            lastAccessed: Date.now()
        };

        this.sessions.set(sessionId, session);
        
        // Trigger cleanup if we have too many sessions
        if (this.sessions.size > this.maxSessionCount) {
            this.cleanupOldSessions();
        }
    }

    getSession(sessionId) {
        const session = this.sessions.get(sessionId);
        if (session) {
            session.lastAccessed = Date.now();
            return session;
        }
        return null;
    }

    updateSession(sessionId, updates) {
        const session = this.sessions.get(sessionId);
        if (session) {
            Object.assign(session, updates);
            session.lastAccessed = Date.now();
        }
    }

    cleanupOldSessions() {
        const now = Date.now();
        const expiredSessions = [];

        for (const [sessionId, session] of this.sessions.entries()) {
            if (now - session.lastAccessed > this.maxSessionAge) {
                expiredSessions.push(sessionId);
            }
        }

        expiredSessions.forEach(sessionId => {
            this.sessions.delete(sessionId);
        });

        console.log(`[SESSION_CLEANUP] Removed ${expiredSessions.length} expired sessions`);
        return expiredSessions.length;
    }

    startCleanupTimer() {
        setInterval(() => {
            this.cleanupOldSessions();
        }, this.cleanupInterval);
    }

    getSessionStats() {
        return {
            totalSessions: this.sessions.size,
            maxSessionAge: this.maxSessionAge,
            maxSessionCount: this.maxSessionCount,
            cleanupInterval: this.cleanupInterval
        };
    }

    // Graceful shutdown
    shutdown() {
        console.log('[SESSION_CLEANUP] Shutting down session manager');
        this.sessions.clear();
    }
}

module.exports = SessionCleanupManager;
