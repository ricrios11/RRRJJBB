
/**
 * Production Error Handling Utilities
 * Comprehensive error handling for all async operations
 */

class ProductionErrorHandler {
    static async safeExecute(operation, context = 'unknown') {
        try {
            return await operation();
        } catch (error) {
            console.error(`[ERROR] ${context}: ${error.message}`);
            console.error(`[STACK] ${error.stack}`);
            
            // Log to production monitoring system
            this.logError(error, context);
            
            // Return safe fallback
            return this.getSafeFallback(context);
        }
    }

    static logError(error, context) {
        const errorLog = {
            timestamp: new Date().toISOString(),
            context,
            message: error.message,
            stack: error.stack,
            severity: this.determineSeverity(error)
        };
        
        // In production, this would send to monitoring service
        console.log('[PRODUCTION_ERROR]', JSON.stringify(errorLog));
    }

    static determineSeverity(error) {
        if (error.name === 'TypeError' || error.name === 'ReferenceError') {
            return 'high';
        } else if (error.name === 'ValidationError') {
            return 'medium';
        } else {
            return 'low';
        }
    }

    static getSafeFallback(context) {
        const fallbacks = {
            'agent_execution': { status: 'error', message: 'Agent execution failed safely' },
            'prompt_processing': { status: 'error', message: 'Prompt processing failed safely' },
            'session_management': { status: 'error', message: 'Session management failed safely' },
            'orchestration': { status: 'error', message: 'Orchestration failed safely' }
        };
        
        return fallbacks[context] || { status: 'error', message: 'Operation failed safely' };
    }
}

module.exports = ProductionErrorHandler;
