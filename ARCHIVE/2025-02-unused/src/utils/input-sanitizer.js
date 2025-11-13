
/**
 * Input Sanitization Utilities
 * Secure input validation and sanitization for user prompts
 */

class InputSanitizer {
    static sanitizePrompt(prompt) {
        if (!prompt || typeof prompt !== 'string') {
            return '';
        }

        // Remove potentially dangerous characters
        let sanitized = prompt
            .replace(/<script[^>]*>.*?<\/script>/gi, '') // Remove script tags
            .replace(/<[^>]*>/g, '') // Remove HTML tags
            .replace(/javascript:/gi, '') // Remove javascript: URLs
            .replace(/on\w+\s*=/gi, '') // Remove event handlers
            .trim();

        // Limit length to prevent DoS
        if (sanitized.length > 1000) {
            sanitized = sanitized.substring(0, 1000) + '...';
        }

        // Validate content
        if (!this.isValidPrompt(sanitized)) {
            throw new Error('Invalid prompt content detected');
        }

        return sanitized;
    }

    static isValidPrompt(prompt) {
        // Check for suspicious patterns
        const suspiciousPatterns = [
            /\b(eval|exec|system|shell)\b/i,
            /\b(drop|delete|truncate|alter)\b/i,
            /\b(union|select|insert|update)\b/i
        ];

        return !suspiciousPatterns.some(pattern => pattern.test(prompt));
    }

    static validateSessionData(sessionData) {
        if (!sessionData || typeof sessionData !== 'object') {
            throw new Error('Invalid session data format');
        }

        // Validate required fields
        const requiredFields = ['sessionId', 'timestamp'];
        for (const field of requiredFields) {
            if (!sessionData[field]) {
                throw new Error(`Missing required field: ${field}`);
            }
        }

        // Validate sessionId format
        if (!/^[a-zA-Z0-9_-]+$/.test(sessionData.sessionId)) {
            throw new Error('Invalid sessionId format');
        }

        return true;
    }

    static sanitizeSessionData(sessionData) {
        const sanitized = { ...sessionData };
        
        // Remove sensitive data
        delete sanitized.internalDebugInfo;
        delete sanitized.systemPaths;
        
        // Sanitize string fields
        Object.keys(sanitized).forEach(key => {
            if (typeof sanitized[key] === 'string') {
                sanitized[key] = this.sanitizePrompt(sanitized[key]);
            }
        });

        return sanitized;
    }
}

module.exports = InputSanitizer;
