/**
 * SocialShareSystem - Unified social sharing for ASCII art and high scores
 * Integrates with BaseGameEngine for consistent sharing across all games
 */

class SocialShareSystem {
    constructor() {
        this.shareHistory = [];
        this.maxHistorySize = 50;
        
        this.setupCanvas();
        console.log('📱 SocialShareSystem initialized');
    }

    setupCanvas() {
        // Create hidden canvas for ASCII art rendering
        this.canvas = document.createElement('canvas');
        this.canvas.style.display = 'none';
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);
    }

    async shareScore(gameEngine, customMessage = '') {
        const shareData = this.prepareScoreShare(gameEngine, customMessage);
        
        try {
            if (navigator.share && this.isMobileDevice()) {
                await navigator.share(shareData);
                this.trackShare('native_share', shareData);
            } else {
                await this.fallbackShare(shareData);
                this.trackShare('fallback_share', shareData);
            }
        } catch (error) {
            console.error('Share failed:', error);
            this.showShareError(error.message);
        }
    }

    async shareASCIIArt(gameEngine, asciiGrid, customMessage = '') {
        const shareData = await this.prepareASCIIShare(gameEngine, asciiGrid, customMessage);
        
        try {
            if (navigator.share && this.isMobileDevice()) {
                await navigator.share(shareData);
                this.trackShare('ascii_native_share', shareData);
            } else {
                await this.fallbackASCIIShare(shareData, asciiGrid);
                this.trackShare('ascii_fallback_share', shareData);
            }
        } catch (error) {
            console.error('ASCII share failed:', error);
            this.showShareError(error.message);
        }
    }

    prepareScoreShare(gameEngine, customMessage) {
        const gameTitle = gameEngine.gameType.toUpperCase();
        const score = gameEngine.score;
        const highScore = gameEngine.highScore;
        
        const message = customMessage || this.generateScoreMessage(gameEngine);
        
        return {
            title: `${gameTitle} High Score`,
            text: message,
            url: window.location.href
        };
    }

    async prepareASCIIShare(gameEngine, asciiGrid, customMessage) {
        const gameTitle = gameEngine.gameType.toUpperCase();
        const asciiArt = this.gridToASCII(asciiGrid);
        const imageUrl = await this.generateASCIIImage(asciiArt, gameEngine);
        
        const message = customMessage || `Check out my ${gameTitle} creation!\n\n${asciiArt}`;
        
        const shareData = {
            title: `${gameTitle} ASCII Art`,
            text: message,
            url: window.location.href
        };
        
        // Add image for platforms that support it
        if (imageUrl) {
            shareData.files = [await this.urlToFile(imageUrl, 'ascii-art.png')];
        }
        
        return shareData;
    }

    generateScoreMessage(gameEngine) {
        const gameTitle = gameEngine.gameType.toUpperCase();
        const score = gameEngine.score;
        const highScore = gameEngine.highScore;
        
        const messages = [
            `🎮 Just scored ${score} points in ${gameTitle}!`,
            `🔥 New ${gameTitle} score: ${score} points!`,
            `⚡ ${gameTitle} mastery: ${score} points achieved!`,
            `🎯 ${gameTitle} session complete: ${score} points!`
        ];
        
        let message = messages[Math.floor(Math.random() * messages.length)];
        
        if (score === highScore && score > 0) {
            message += ' 🏆 NEW PERSONAL BEST!';
        }
        
        message += `\n\nPlay at: ${window.location.href}`;
        
        return message;
    }

    gridToASCII(grid) {
        if (!grid || !Array.isArray(grid)) return '';
        
        return grid.map(row => {
            if (!Array.isArray(row)) return '';
            return row.map(cell => {
                if (cell && cell.char) return cell.char;
                if (typeof cell === 'string') return cell;
                return ' ';
            }).join('');
        }).join('\n');
    }

    async generateASCIIImage(asciiText, gameEngine) {
        const lines = asciiText.split('\n');
        const maxLineLength = Math.max(...lines.map(line => line.length));
        
        // Configure canvas
        const fontSize = 12;
        const charWidth = fontSize * 0.6;
        const lineHeight = fontSize * 1.2;
        
        this.canvas.width = maxLineLength * charWidth + 40;
        this.canvas.height = lines.length * lineHeight + 40;
        
        // Style canvas
        this.ctx.fillStyle = '#0a0a0a';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.font = `${fontSize}px 'Courier New', monospace`;
        this.ctx.fillStyle = '#00ff9d';
        this.ctx.textBaseline = 'top';
        
        // Add title
        const title = `${gameEngine.gameType.toUpperCase()} Creation`;
        this.ctx.font = `${fontSize + 2}px 'Courier New', monospace`;
        this.ctx.fillText(title, 20, 10);
        
        // Draw ASCII art
        this.ctx.font = `${fontSize}px 'Courier New', monospace`;
        lines.forEach((line, index) => {
            this.ctx.fillText(line, 20, 30 + (index * lineHeight));
        });
        
        // Add signature
        this.ctx.font = `${fontSize - 2}px 'Courier New', monospace`;
        this.ctx.fillStyle = 'rgba(0, 255, 157, 0.7)';
        this.ctx.fillText(`Score: ${gameEngine.score} | ${new Date().toLocaleDateString()}`, 20, this.canvas.height - 20);
        
        return this.canvas.toDataURL('image/png');
    }

    async urlToFile(dataUrl, filename) {
        const response = await fetch(dataUrl);
        const blob = await response.blob();
        return new File([blob], filename, { type: blob.type });
    }

    async fallbackShare(shareData) {
        const shareText = `${shareData.title}\n\n${shareData.text}`;
        
        if (navigator.clipboard) {
            await navigator.clipboard.writeText(shareText);
            this.showShareSuccess('Score copied to clipboard!');
        } else {
            this.showShareModal(shareData);
        }
    }

    async fallbackASCIIShare(shareData, asciiGrid) {
        if (navigator.clipboard) {
            await navigator.clipboard.writeText(shareData.text);
            this.showShareSuccess('ASCII art copied to clipboard!');
        } else {
            this.showASCIIShareModal(shareData, asciiGrid);
        }
    }

    showShareModal(shareData) {
        const modal = document.createElement('div');
        modal.className = 'share-modal';
        modal.innerHTML = `
            <div class="share-modal-content">
                <div class="share-modal-header">
                    <h3>${shareData.title}</h3>
                    <button class="share-modal-close">×</button>
                </div>
                <div class="share-modal-body">
                    <textarea readonly class="share-text">${shareData.text}</textarea>
                    <div class="share-buttons">
                        <button class="share-btn twitter" onclick="shareToTwitter('${encodeURIComponent(shareData.text)}')">
                            Twitter
                        </button>
                        <button class="share-btn copy" onclick="copyShareText('${shareData.text.replace(/'/g, "\\'")}')">
                            Copy Text
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        this.injectShareStyles();
        document.body.appendChild(modal);
        
        // Setup close handler
        modal.querySelector('.share-modal-close').onclick = () => modal.remove();
        modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
        
        setTimeout(() => modal.classList.add('active'), 10);
    }

    showASCIIShareModal(shareData, asciiGrid) {
        const modal = document.createElement('div');
        modal.className = 'share-modal ascii-share';
        modal.innerHTML = `
            <div class="share-modal-content">
                <div class="share-modal-header">
                    <h3>${shareData.title}</h3>
                    <button class="share-modal-close">×</button>
                </div>
                <div class="share-modal-body">
                    <div class="ascii-preview">${this.gridToASCII(asciiGrid)}</div>
                    <div class="share-buttons">
                        <button class="share-btn twitter" onclick="shareASCIIToTwitter('${encodeURIComponent(shareData.text)}')">
                            Twitter
                        </button>
                        <button class="share-btn copy" onclick="copyASCIIText('${shareData.text.replace(/'/g, "\\'")}')">
                            Copy ASCII
                        </button>
                        <button class="share-btn download" onclick="downloadASCIIImage()">
                            Download Image
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        this.injectShareStyles();
        document.body.appendChild(modal);
        
        // Setup close handler
        modal.querySelector('.share-modal-close').onclick = () => modal.remove();
        modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
        
        setTimeout(() => modal.classList.add('active'), 10);
    }

    injectShareStyles() {
        if (document.getElementById('social-share-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'social-share-styles';
        style.textContent = `
            .share-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: rgba(0, 0, 0, 0.9);
                backdrop-filter: blur(10px);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .share-modal.active {
                opacity: 1;
            }
            
            .share-modal-content {
                background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
                border: 2px solid #00ff9d;
                border-radius: 8px;
                max-width: 500px;
                width: 90vw;
                max-height: 80vh;
                overflow: hidden;
            }
            
            .share-modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20px;
                background: rgba(0, 255, 157, 0.1);
                border-bottom: 1px solid #00ff9d;
            }
            
            .share-modal-header h3 {
                color: #00ff9d;
                font-family: 'Courier New', monospace;
                margin: 0;
                font-size: 18px;
                text-transform: uppercase;
            }
            
            .share-modal-close {
                background: rgba(255, 68, 68, 0.2);
                border: 1px solid #ff4444;
                color: #ff4444;
                width: 30px;
                height: 30px;
                border-radius: 4px;
                cursor: pointer;
                font-size: 16px;
            }
            
            .share-modal-body {
                padding: 20px;
            }
            
            .share-text {
                width: 100%;
                height: 120px;
                background: rgba(0, 0, 0, 0.5);
                border: 1px solid #00ff9d;
                color: #00ff9d;
                font-family: 'Courier New', monospace;
                font-size: 14px;
                padding: 10px;
                resize: none;
                margin-bottom: 20px;
            }
            
            .ascii-preview {
                background: rgba(0, 0, 0, 0.8);
                border: 1px solid #00ff9d;
                color: #00ff9d;
                font-family: 'Courier New', monospace;
                font-size: 12px;
                padding: 15px;
                white-space: pre;
                overflow: auto;
                max-height: 300px;
                margin-bottom: 20px;
            }
            
            .share-buttons {
                display: flex;
                gap: 10px;
                flex-wrap: wrap;
            }
            
            .share-btn {
                background: rgba(0, 255, 157, 0.1);
                border: 1px solid #00ff9d;
                color: #00ff9d;
                padding: 10px 16px;
                font-family: 'Courier New', monospace;
                font-size: 12px;
                cursor: pointer;
                transition: all 0.2s ease;
                text-transform: uppercase;
                border-radius: 4px;
            }
            
            .share-btn:hover {
                background: rgba(0, 255, 157, 0.2);
                transform: translateY(-1px);
            }
            
            .share-btn.twitter {
                background: rgba(29, 161, 242, 0.2);
                border-color: #1da1f2;
                color: #1da1f2;
            }
            
            .share-notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: #00ff9d;
                color: #000;
                padding: 12px 20px;
                border-radius: 4px;
                font-weight: bold;
                z-index: 10001;
                font-family: 'Courier New', monospace;
                animation: slideInRight 0.3s ease;
            }
            
            .share-notification.error {
                background: #ff4444;
                color: #fff;
            }
            
            @keyframes slideInRight {
                from { transform: translateX(100%); }
                to { transform: translateX(0); }
            }
        `;
        document.head.appendChild(style);
    }

    showShareSuccess(message) {
        const notification = document.createElement('div');
        notification.className = 'share-notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    showShareError(message) {
        const notification = document.createElement('div');
        notification.className = 'share-notification error';
        notification.textContent = `Share failed: ${message}`;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }

    trackShare(shareType, shareData) {
        const event = {
            type: shareType,
            timestamp: Date.now(),
            sessionId: this.getSessionId(),
            data: {
                title: shareData.title,
                textLength: shareData.text ? shareData.text.length : 0,
                hasImage: !!shareData.files
            }
        };
        
        this.shareHistory.push(event);
        if (this.shareHistory.length > this.maxHistorySize) {
            this.shareHistory.shift();
        }
        
        // Store in session storage
        const sessionShares = JSON.parse(sessionStorage.getItem('share_analytics') || '[]');
        sessionShares.push(event);
        sessionStorage.setItem('share_analytics', JSON.stringify(sessionShares.slice(-20)));
        
        console.log(`📊 Share: ${shareType}`, event.data);
    }

    getSessionId() {
        let sessionId = sessionStorage.getItem('share_session_id');
        if (!sessionId) {
            sessionId = Date.now().toString(36) + Math.random().toString(36).substr(2);
            sessionStorage.setItem('share_session_id', sessionId);
        }
        return sessionId;
    }

    isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    // Utility methods for modal buttons
    shareToTwitter(text) {
        const url = `https://twitter.com/intent/tweet?text=${text}`;
        window.open(url, '_blank', 'width=550,height=420');
    }

    async copyText(text) {
        if (navigator.clipboard) {
            await navigator.clipboard.writeText(text);
            this.showShareSuccess('Copied to clipboard!');
        }
    }

    downloadASCIIImage() {
        const link = document.createElement('a');
        link.download = `ascii-art-${Date.now()}.png`;
        link.href = this.canvas.toDataURL();
        link.click();
        
        this.showShareSuccess('Image downloaded!');
    }

    // Cleanup
    destroy() {
        if (this.canvas) {
            this.canvas.remove();
        }
        
        const styleEl = document.getElementById('social-share-styles');
        if (styleEl) styleEl.remove();
        
        this.shareHistory = [];
    }
}

// Global instance
window.socialShareSystem = new SocialShareSystem();

// Global utility functions for modal buttons
window.shareToTwitter = (text) => window.socialShareSystem.shareToTwitter(text);
window.copyShareText = (text) => window.socialShareSystem.copyText(text);
window.copyASCIIText = (text) => window.socialShareSystem.copyText(text);
window.shareASCIIToTwitter = (text) => window.socialShareSystem.shareToTwitter(text);
window.downloadASCIIImage = () => window.socialShareSystem.downloadASCIIImage();

console.log('📱 SocialShareSystem ready for ASCII art and score sharing');
