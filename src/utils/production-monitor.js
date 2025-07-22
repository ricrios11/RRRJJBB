
/**
 * Production Monitoring and Logging
 * Comprehensive monitoring for production environment
 */

class ProductionMonitor {
    constructor() {
        this.metrics = {
            requests: 0,
            errors: 0,
            orchestrations: 0,
            promptProcessing: 0,
            sessionCreations: 0
        };
        this.startTime = Date.now();
        this.logLevel = process.env.LOG_LEVEL || 'info';
    }

    // Increment metrics
    incrementMetric(metric) {
        if (this.metrics.hasOwnProperty(metric)) {
            this.metrics[metric]++;
        }
    }

    // Log with different levels
    log(level, message, context = {}) {
        const logLevels = { error: 0, warn: 1, info: 2, debug: 3 };
        const currentLevel = logLevels[this.logLevel] || 2;
        
        if (logLevels[level] <= currentLevel) {
            const logEntry = {
                timestamp: new Date().toISOString(),
                level: level.toUpperCase(),
                message,
                context,
                uptime: Date.now() - this.startTime
            };
            
            console.log(`[${level.toUpperCase()}]`, JSON.stringify(logEntry));
        }
    }

    // Performance monitoring
    startTimer(operation) {
        return {
            operation,
            startTime: Date.now(),
            end: () => {
                const duration = Date.now() - Date.now();
                this.log('info', `Operation completed: ${operation}`, { duration });
                return duration;
            }
        };
    }

    // Get current metrics
    getMetrics() {
        return {
            ...this.metrics,
            uptime: Date.now() - this.startTime,
            timestamp: new Date().toISOString()
        };
    }

    // Alert system (would integrate with external monitoring)
    alert(severity, message, context = {}) {
        const alert = {
            timestamp: new Date().toISOString(),
            severity,
            message,
            context,
            metrics: this.getMetrics()
        };
        
        console.log('[ALERT]', JSON.stringify(alert));
        
        // In production, this would send to monitoring service
        // e.g., Datadog, New Relic, etc.
    }
}

// Global monitor instance
const globalMonitor = new ProductionMonitor();

module.exports = { ProductionMonitor, globalMonitor };
