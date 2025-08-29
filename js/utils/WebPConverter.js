/**
 * WebP Converter Utility
 * Client-side WebP conversion and optimization for favicons and social images
 */

class WebPConverter {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.isWebPSupported = this.checkWebPSupport();
        
        console.log('🖼️ WEBP CONVERTER: Initialized', { webpSupported: this.isWebPSupported });
    }

    checkWebPSupport() {
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }

    async convertImageToWebP(imageElement, quality = 0.8) {
        if (!this.isWebPSupported) {
            console.warn('🖼️ WebP not supported, returning original');
            return null;
        }

        return new Promise((resolve) => {
            this.canvas.width = imageElement.naturalWidth || imageElement.width;
            this.canvas.height = imageElement.naturalHeight || imageElement.height;
            
            this.ctx.drawImage(imageElement, 0, 0);
            
            this.canvas.toBlob((blob) => {
                if (blob) {
                    const url = URL.createObjectURL(blob);
                    resolve({
                        blob,
                        url,
                        size: blob.size,
                        originalSize: this.estimateOriginalSize(imageElement)
                    });
                } else {
                    resolve(null);
                }
            }, 'image/webp', quality);
        });
    }

    estimateOriginalSize(imageElement) {
        // Rough estimation for PNG size
        const pixels = (imageElement.naturalWidth || imageElement.width) * 
                      (imageElement.naturalHeight || imageElement.height);
        return pixels * 4; // RGBA
    }

    async optimizeFavicons() {
        const faviconElements = document.querySelectorAll('link[rel*="icon"]');
        const optimizedFavicons = [];

        for (const link of faviconElements) {
            if (link.href.includes('.png')) {
                try {
                    const img = new Image();
                    img.crossOrigin = 'anonymous';
                    
                    const result = await new Promise((resolve) => {
                        img.onload = async () => {
                            const webpResult = await this.convertImageToWebP(img, 0.9);
                            resolve(webpResult);
                        };
                        img.onerror = () => resolve(null);
                        img.src = link.href;
                    });

                    if (result) {
                        optimizedFavicons.push({
                            original: link.href,
                            webp: result.url,
                            savings: ((result.originalSize - result.size) / result.originalSize * 100).toFixed(1)
                        });
                    }
                } catch (error) {
                    console.warn('🖼️ Failed to optimize favicon:', link.href, error);
                }
            }
        }

        console.log('🖼️ FAVICON OPTIMIZATION:', optimizedFavicons);
        return optimizedFavicons;
    }

    createWebPFallbackSystem() {
        // Create WebP detection and fallback system
        const style = document.createElement('style');
        style.textContent = `
            /* WebP Support Detection */
            .webp-supported .favicon-webp { display: inline; }
            .webp-supported .favicon-png { display: none; }
            .no-webp .favicon-webp { display: none; }
            .no-webp .favicon-png { display: inline; }
            
            /* Optimized image loading */
            .optimized-image {
                image-rendering: -webkit-optimize-contrast;
                image-rendering: crisp-edges;
            }
        `;
        document.head.appendChild(style);

        // Add WebP class to document
        document.documentElement.classList.add(
            this.isWebPSupported ? 'webp-supported' : 'no-webp'
        );
    }

    enhanceSocialGenerator() {
        // Add WebP export option to social generator
        const socialGenerator = document.querySelector('#social-image-generator');
        if (!socialGenerator) return;

        const webpButton = document.createElement('button');
        webpButton.className = 'webp-export-btn';
        webpButton.innerHTML = '📦 Export WebP';
        webpButton.style.cssText = `
            background: linear-gradient(135deg, #00ff9d, #00cc7d);
            border: none;
            border-radius: 6px;
            color: #000;
            padding: 8px 16px;
            font-weight: bold;
            cursor: pointer;
            margin-left: 10px;
        `;

        webpButton.addEventListener('click', () => this.exportSocialImageAsWebP());

        const existingButton = socialGenerator.querySelector('button');
        if (existingButton && existingButton.parentNode) {
            existingButton.parentNode.insertBefore(webpButton, existingButton.nextSibling);
        }
    }

    async exportSocialImageAsWebP() {
        const canvas = document.querySelector('#social-canvas');
        if (!canvas) {
            console.warn('🖼️ No social canvas found');
            return;
        }

        try {
            canvas.toBlob((blob) => {
                if (blob) {
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `ricrios-social-${Date.now()}.webp`;
                    link.click();
                    
                    setTimeout(() => URL.revokeObjectURL(url), 1000);
                    
                    console.log('🖼️ WebP social image exported');
                    
                    // Show success notification
                    if (window.GlobalErrorHandler) {
                        window.GlobalErrorHandler.reportSuccess('WebP social image exported successfully!');
                    }
                } else {
                    throw new Error('Failed to create WebP blob');
                }
            }, 'image/webp', 0.85);
        } catch (error) {
            console.error('🖼️ WebP export failed:', error);
            
            if (window.GlobalErrorHandler) {
                window.GlobalErrorHandler.reportError('WebP export failed - using PNG fallback');
            }
        }
    }

    generateWebPFavicons() {
        // Generate WebP versions of existing favicons
        const faviconSizes = [16, 32, 144, 192, 512];
        const webpFavicons = [];

        faviconSizes.forEach(size => {
            const canvas = document.createElement('canvas');
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext('2d');

            // Generate ASCII RR favicon programmatically
            ctx.fillStyle = '#0a0a0a';
            ctx.fillRect(0, 0, size, size);
            
            ctx.fillStyle = '#00ff9d';
            ctx.font = `bold ${size * 0.6}px monospace`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('RR', size / 2, size / 2);

            canvas.toBlob((blob) => {
                if (blob) {
                    const url = URL.createObjectURL(blob);
                    webpFavicons.push({
                        size,
                        url,
                        blob
                    });
                    
                    console.log(`🖼️ Generated WebP favicon: ${size}x${size}`);
                }
            }, 'image/webp', 0.9);
        });

        return webpFavicons;
    }

    init() {
        this.createWebPFallbackSystem();
        this.enhanceSocialGenerator();
        
        // Generate WebP favicons on load
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.generateWebPFavicons();
                this.optimizeFavicons();
            });
        } else {
            this.generateWebPFavicons();
            this.optimizeFavicons();
        }
    }
}

// Initialize WebP converter
window.WebPConverter = new WebPConverter();
window.WebPConverter.init();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WebPConverter;
}
