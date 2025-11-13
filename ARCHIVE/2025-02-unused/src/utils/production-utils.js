
/**
 * Production Utilities
 * Essential utilities for production environment
 */

const ProductionErrorHandler = require('./production-error-handler');
const InputSanitizer = require('./input-sanitizer');
const SessionCleanupManager = require('./session-cleanup-manager');

class ProductionUtils {
    constructor() {
        this.environment = process.env.NODE_ENV || 'development';
        this.sessionManager = new SessionCleanupManager();
        this.startupTime = Date.now();
    }

    // Safe orchestration execution with error handling
    async safeOrchestrationExecution(orchestrationFn, context) {
        return await ProductionErrorHandler.safeExecute(async () => {
            const result = await orchestrationFn();
            
            // Log successful execution
            this.logOperation('orchestration_success', context);
            
            return result;
        }, `orchestration_${context}`);
    }

    // Safe prompt processing with sanitization
    async safePromptProcessing(prompt, processingFn) {
        try {
            const sanitizedPrompt = InputSanitizer.sanitizePrompt(prompt);
            
            return await ProductionErrorHandler.safeExecute(async () => {
                return await processingFn(sanitizedPrompt);
            }, 'prompt_processing');
            
        } catch (error) {
            console.error('[PROMPT_SANITIZATION_ERROR]', error.message);
            return { status: 'error', message: 'Invalid prompt format' };
        }
    }

    // Safe session management
    createSession(sessionData) {
        try {
            InputSanitizer.validateSessionData(sessionData);
            const sanitizedData = InputSanitizer.sanitizeSessionData(sessionData);
            
            this.sessionManager.addSession(sessionData.sessionId, sanitizedData);
            
            return { status: 'success', sessionId: sessionData.sessionId };
        } catch (error) {
            console.error('[SESSION_CREATION_ERROR]', error.message);
            return { status: 'error', message: 'Failed to create session' };
        }
    }

    // Health check for production monitoring
    getHealthStatus() {
        const uptime = Date.now() - this.startupTime;
        const sessionStats = this.sessionManager.getSessionStats();
        
        return {
            status: 'healthy',
            uptime,
            environment: this.environment,
            timestamp: new Date().toISOString(),
            sessions: sessionStats,
            memory: this.getMemoryUsage()
        };
    }

    getMemoryUsage() {
        if (typeof process !== 'undefined' && process.memoryUsage) {
            const usage = process.memoryUsage();
            return {
                heapUsed: Math.round(usage.heapUsed / 1024 / 1024) + ' MB',
                heapTotal: Math.round(usage.heapTotal / 1024 / 1024) + ' MB',
                external: Math.round(usage.external / 1024 / 1024) + ' MB'
            };
        }
        return { status: 'unavailable' };
    }

    logOperation(operation, context) {
        const logEntry = {
            timestamp: new Date().toISOString(),
            operation,
            context,
            environment: this.environment
        };
        
        console.log('[PRODUCTION_LOG]', JSON.stringify(logEntry));
    }

    // Graceful shutdown
    shutdown() {
        console.log('[PRODUCTION_UTILS] Initiating graceful shutdown');
        this.sessionManager.shutdown();
    }
}

module.exports = ProductionUtils;
