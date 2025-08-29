/**
 * Global Error Handler - ASCII Cyberpunk Theme
 * Provides user-facing error notifications with graceful degradation
 */

class GlobalErrorHandler {
    constructor() {
        this.errorQueue = [];
        this.isInitialized = false;
        this.maxErrors = 5;
        this.init();
    }

    init() {
        if (this.isInitialized) return;
        
        // Global error listeners
        window.addEventListener('error', (event) => this.handleError(event));
        window.addEventListener('unhandledrejection', (event) => this.handlePromiseRejection(event));
        
        // Network error detection
        window.addEventListener('online', () => this.handleNetworkRestore());
        window.addEventListener('offline', () => this.handleNetworkLoss());
        
        this.createErrorContainer();
        this.isInitialized = true;
        
        console.log('🛡️ GLOBAL ERROR HANDLER: Initialized with ASCII cyberpunk theme');
    }

    createErrorContainer() {
        if (document.getElementById('global-error-container')) return;
        
        const container = document.createElement('div');
        container.id = 'global-error-container';
        container.innerHTML = `
            <style>
                #global-error-container {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    z-index: 10000;
                    font-family: 'Space Mono', monospace;
                    max-width: 400px;
                }
                
                .error-notification {
                    background: linear-gradient(135deg, #ff0040, #8b0000);
                    border: 2px solid #ff0040;
                    border-radius: 8px;
                    padding: 16px;
                    margin-bottom: 12px;
                    color: #ffffff;
                    box-shadow: 0 8px 32px rgba(255, 0, 64, 0.3);
                    backdrop-filter: blur(10px);
                    animation: errorSlideIn 0.3s ease-out;
                    position: relative;
                }
                
                .error-notification.network-error {
                    background: linear-gradient(135deg, #ff6b00, #cc4400);
                    border-color: #ff6b00;
                    box-shadow: 0 8px 32px rgba(255, 107, 0, 0.3);
                }
                
                .error-notification.success {
                    background: linear-gradient(135deg, #00ff9d, #00cc7d);
                    border-color: #00ff9d;
                    box-shadow: 0 8px 32px rgba(0, 255, 157, 0.3);
                }
                
                .error-header {
                    font-weight: bold;
                    font-size: 14px;
                    margin-bottom: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                
                .error-ascii {
                    font-family: 'Space Mono', monospace;
                    font-size: 12px;
                    line-height: 1.2;
                    margin: 8px 0;
                    white-space: pre;
                }
                
                .error-message {
                    font-size: 12px;
                    line-height: 1.4;
                    margin-bottom: 8px;
                }
                
                .error-actions {
                    display: flex;
                    gap: 8px;
                    margin-top: 12px;
                }
                
                .error-btn {
                    background: rgba(255, 255, 255, 0.2);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    border-radius: 4px;
                    color: #ffffff;
                    padding: 4px 8px;
                    font-size: 11px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }
                
                .error-btn:hover {
                    background: rgba(255, 255, 255, 0.3);
                    transform: translateY(-1px);
                }
                
                .error-close {
                    background: none;
                    border: none;
                    color: #ffffff;
                    cursor: pointer;
                    font-size: 16px;
                    padding: 0;
                    width: 20px;
                    height: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                @keyframes errorSlideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                @keyframes errorSlideOut {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
            </style>
        `;
        
        document.body.appendChild(container);
    }

    handleError(event) {
        const error = {
            type: 'javascript',
            message: event.message || 'Unknown JavaScript error',
            filename: event.filename || 'Unknown file',
            lineno: event.lineno || 0,
            timestamp: new Date().toISOString()
        };
        
        this.showErrorNotification(error);
        console.error('🚨 GLOBAL ERROR:', error);
    }

    handlePromiseRejection(event) {
        const error = {
            type: 'promise',
            message: event.reason?.message || 'Unhandled promise rejection',
            timestamp: new Date().toISOString()
        };
        
        this.showErrorNotification(error);
        console.error('🚨 PROMISE REJECTION:', error);
        
        // Prevent default browser handling
        event.preventDefault();
    }

    handleNetworkLoss() {
        const error = {
            type: 'network',
            message: 'Connection lost - Working in offline mode',
            isOffline: true,
            timestamp: new Date().toISOString()
        };
        
        this.showErrorNotification(error);
        console.warn('📡 NETWORK: Offline mode activated');
    }

    handleNetworkRestore() {
        const success = {
            type: 'network',
            message: 'Connection restored - Back online',
            isSuccess: true,
            timestamp: new Date().toISOString()
        };
        
        this.showErrorNotification(success);
        console.log('📡 NETWORK: Online mode restored');
    }

    showErrorNotification(error) {
        const container = document.getElementById('global-error-container');
        if (!container) return;

        // Limit number of visible errors
        const existingErrors = container.querySelectorAll('.error-notification');
        if (existingErrors.length >= this.maxErrors) {
            existingErrors[0].remove();
        }

        const notification = document.createElement('div');
        const isNetworkError = error.type === 'network';
        const isSuccess = error.isSuccess;
        
        notification.className = `error-notification ${isNetworkError ? 'network-error' : ''} ${isSuccess ? 'success' : ''}`;
        
        const ascii = this.getErrorAscii(error.type, isSuccess);
        const actionButtons = this.getActionButtons(error);
        
        notification.innerHTML = `
            <div class="error-header">
                <span>${this.getErrorTitle(error)}</span>
                <button class="error-close" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
            <div class="error-ascii">${ascii}</div>
            <div class="error-message">${error.message}</div>
            ${actionButtons}
        `;
        
        container.appendChild(notification);
        
        // Auto-remove after delay
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.animation = 'errorSlideOut 0.3s ease-in';
                setTimeout(() => notification.remove(), 300);
            }
        }, isSuccess ? 3000 : 8000);
    }

    getErrorTitle(error) {
        switch (error.type) {
            case 'javascript': return '⚠️ SYSTEM ERROR';
            case 'promise': return '🔄 ASYNC ERROR';
            case 'network': 
                return error.isSuccess ? '✅ CONNECTED' : '📡 OFFLINE';
            default: return '❌ ERROR';
        }
    }

    getErrorAscii(type, isSuccess = false) {
        if (type === 'network') {
            return isSuccess ? 
`╔═══════════════╗
║ ████ ONLINE ██║
║ ██ ▲▲▲▲▲▲ ███║
╚═══════════════╝` :
`╔═══════════════╗
║ ▓▓▓ OFFLINE ▓▓║
║ ▓▓ ××××××× ▓▓║
╚═══════════════╝`;
        }
        
        return isSuccess ?
`╔═══════════════╗
║ ░░░ SUCCESS ░░║
║ ░░ ✓✓✓✓✓✓ ░░░║
╚═══════════════╝` :
`╔═══════════════╗
║ ▓▓▓ ERROR ▓▓▓▓║
║ ▓▓ !!!!!!! ▓▓▓║
╚═══════════════╝`;
    }

    getActionButtons(error) {
        let buttons = '<div class="error-actions">';
        
        if (error.type === 'javascript' || error.type === 'promise') {
            buttons += '<button class="error-btn" onclick="location.reload()">RELOAD</button>';
            buttons += '<button class="error-btn" onclick="console.clear()">CLEAR LOG</button>';
        }
        
        if (error.type === 'network' && error.isOffline) {
            buttons += '<button class="error-btn" onclick="location.reload()">RETRY</button>';
        }
        
        buttons += '</div>';
        return buttons;
    }

    // Public API for manual error reporting
    reportError(message, type = 'manual') {
        const error = {
            type,
            message,
            timestamp: new Date().toISOString()
        };
        
        this.showErrorNotification(error);
        console.error('🔧 MANUAL ERROR REPORT:', error);
    }

    reportSuccess(message) {
        const success = {
            type: 'success',
            message,
            isSuccess: true,
            timestamp: new Date().toISOString()
        };
        
        this.showErrorNotification(success);
        console.log('✅ SUCCESS REPORT:', success);
    }
}

// Initialize global error handler
window.GlobalErrorHandler = new GlobalErrorHandler();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GlobalErrorHandler;
}
