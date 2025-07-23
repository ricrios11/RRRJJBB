/**
 * ATOMIC TROJAN HORSE FEED - Phase 2 Component Build
 * Single-responsibility, validated Innovation Lab component
 * Built with orchestrator-led architecture and atomic validation
 */

class AtomicTrojanHorseFeed {
    constructor() {
        this.componentId = `trojan_horse_feed_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        this.initialized = false;
        this.container = null;
        this.state = {
            active: false,
            feedItems: [],
            currentIndex: 0,
            autoRotate: true,
            rotationInterval: null
        };
        
        console.log(`🐴🧬 ATOMIC TROJAN HORSE FEED: Component created - ID: ${this.componentId}`);
    }
    
    // ATOMIC VALIDATION: Pre-initialization checks
    validateEnvironment() {
        const validation = {
            domReady: document.readyState === 'complete' || document.readyState === 'interactive',
            foundationExists: !!document.getElementById('innovation-lab-foundation'),
            noConflicts: !document.querySelector('.trojan-horse-feed'),
            cleanGlobals: !window.TrojanHorseFeed && !window.trojanHorse,
            componentId: this.componentId,
            timestamp: new Date().toISOString()
        };
        
        console.log('🔍 ATOMIC VALIDATION: Environment check', validation);
        return validation.domReady && validation.foundationExists && validation.noConflicts && validation.cleanGlobals;
    }
    
    // ATOMIC BUILD: Create clean component structure
    buildComponent() {
        if (!this.validateEnvironment()) {
            throw new Error('🚨 ATOMIC BUILD FAILED: Environment validation failed');
        }
        
        console.log('🏗️ ATOMIC BUILD: Creating TrojanHorse Feed structure...');
        
        // Create main container
        this.container = document.createElement('div');
        this.container.id = this.componentId;
        this.container.className = 'atomic-trojan-horse-feed';
        
        // Build internal structure
        this.container.innerHTML = `
            <div class="feed-header">
                <div class="feed-icon">🐴</div>
                <h3 class="feed-title">TrojanHorse Feed</h3>
                <div class="feed-status">
                    <span class="status-indicator active"></span>
                    <span class="status-text">Active</span>
                </div>
            </div>
            
            <div class="feed-content">
                <div class="feed-carousel">
                    <div class="feed-item active" data-index="0">
                        <div class="item-icon">🧪</div>
                        <div class="item-content">
                            <h4>Innovation Lab</h4>
                            <p>Systematic innovation through controlled experimentation</p>
                        </div>
                    </div>
                    
                    <div class="feed-item" data-index="1">
                        <div class="item-icon">🎮</div>
                        <div class="item-content">
                            <h4>DOS Snake Game</h4>
                            <p>Classic gaming with modern responsive design</p>
                        </div>
                    </div>
                    
                    <div class="feed-item" data-index="2">
                        <div class="item-icon">🕰️</div>
                        <div class="item-content">
                            <h4>Time Travel Mode</h4>
                            <p>Experience case studies from multiple time perspectives</p>
                        </div>
                    </div>
                    
                    <div class="feed-item" data-index="3">
                        <div class="item-icon">🧠</div>
                        <div class="item-content">
                            <h4>UX Memory Recall</h4>
                            <p>Intelligent pattern recognition for design decisions</p>
                        </div>
                    </div>
                </div>
                
                <div class="feed-controls">
                    <button class="control-btn prev" data-action="prev">‹</button>
                    <div class="feed-indicators">
                        <span class="indicator active" data-index="0"></span>
                        <span class="indicator" data-index="1"></span>
                        <span class="indicator" data-index="2"></span>
                        <span class="indicator" data-index="3"></span>
                    </div>
                    <button class="control-btn next" data-action="next">›</button>
                </div>
            </div>
            
            <div class="feed-footer">
                <div class="component-info">
                    <span class="component-id">${this.componentId}</span>
                    <span class="build-status">Atomic Build ✅</span>
                </div>
            </div>
        `;
        
        // Apply atomic styling
        this.applyAtomicStyles();
        
        console.log('✅ ATOMIC BUILD: TrojanHorse Feed structure created');
        return this.container;
    }
    
    // ATOMIC STYLING: Clean, production-ready CSS
    applyAtomicStyles() {
        const styleId = `${this.componentId}-styles`;
        
        // Remove any existing styles for this component
        const existingStyle = document.getElementById(styleId);
        if (existingStyle) existingStyle.remove();
        
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
            .atomic-trojan-horse-feed {
                background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
                border: 2px solid #00ff41;
                border-radius: 12px;
                padding: 1.5rem;
                margin: 2rem 0;
                font-family: 'Courier New', monospace;
                color: #00ff41;
                box-shadow: 0 8px 32px rgba(0, 255, 65, 0.2);
                backdrop-filter: blur(10px);
                position: relative;
                overflow: hidden;
            }
            
            .atomic-trojan-horse-feed::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 2px;
                background: linear-gradient(90deg, transparent, #00ff41, transparent);
                animation: scan 2s linear infinite;
            }
            
            @keyframes scan {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(100%); }
            }
            
            .feed-header {
                display: flex;
                align-items: center;
                gap: 1rem;
                margin-bottom: 1.5rem;
                padding-bottom: 1rem;
                border-bottom: 1px solid rgba(0, 255, 65, 0.3);
            }
            
            .feed-icon {
                font-size: 2rem;
                animation: pulse 2s ease-in-out infinite;
            }
            
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
            }
            
            .feed-title {
                margin: 0;
                font-size: 1.5rem;
                font-weight: bold;
                flex: 1;
            }
            
            .feed-status {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                font-size: 0.9rem;
            }
            
            .status-indicator {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: #00ff41;
                animation: blink 1s ease-in-out infinite;
            }
            
            @keyframes blink {
                0%, 50% { opacity: 1; }
                51%, 100% { opacity: 0.3; }
            }
            
            .feed-content {
                position: relative;
            }
            
            .feed-carousel {
                height: 120px;
                position: relative;
                overflow: hidden;
                border-radius: 8px;
                background: rgba(0, 255, 65, 0.05);
            }
            
            .feed-item {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                display: flex;
                align-items: center;
                gap: 1rem;
                padding: 1rem;
                opacity: 0;
                transform: translateX(100%);
                transition: all 0.3s ease-in-out;
            }
            
            .feed-item.active {
                opacity: 1;
                transform: translateX(0);
            }
            
            .item-icon {
                font-size: 2.5rem;
                min-width: 60px;
                text-align: center;
            }
            
            .item-content h4 {
                margin: 0 0 0.5rem 0;
                font-size: 1.2rem;
                color: #00ff41;
            }
            
            .item-content p {
                margin: 0;
                font-size: 0.9rem;
                color: rgba(0, 255, 65, 0.8);
                line-height: 1.4;
            }
            
            .feed-controls {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 1rem;
                margin-top: 1rem;
            }
            
            .control-btn {
                background: rgba(0, 255, 65, 0.1);
                border: 1px solid #00ff41;
                color: #00ff41;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                font-size: 1.2rem;
                transition: all 0.2s ease;
            }
            
            .control-btn:hover {
                background: rgba(0, 255, 65, 0.2);
                transform: scale(1.1);
            }
            
            .feed-indicators {
                display: flex;
                gap: 0.5rem;
            }
            
            .indicator {
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background: rgba(0, 255, 65, 0.3);
                cursor: pointer;
                transition: all 0.2s ease;
            }
            
            .indicator.active {
                background: #00ff41;
                transform: scale(1.2);
            }
            
            .feed-footer {
                margin-top: 1.5rem;
                padding-top: 1rem;
                border-top: 1px solid rgba(0, 255, 65, 0.3);
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 0.8rem;
                color: rgba(0, 255, 65, 0.6);
            }
            
            .component-id {
                font-family: monospace;
                font-size: 0.7rem;
            }
            
            .build-status {
                color: #00ff41;
                font-weight: bold;
            }
            
            /* Responsive Design */
            @media (max-width: 768px) {
                .atomic-trojan-horse-feed {
                    padding: 1rem;
                    margin: 1rem 0;
                }
                
                .feed-header {
                    flex-direction: column;
                    text-align: center;
                    gap: 0.5rem;
                }
                
                .feed-carousel {
                    height: 140px;
                }
                
                .feed-item {
                    flex-direction: column;
                    text-align: center;
                    gap: 0.5rem;
                }
                
                .item-icon {
                    min-width: auto;
                }
            }
        `;
        
        document.head.appendChild(style);
        console.log('🎨 ATOMIC STYLING: TrojanHorse Feed styles applied');
    }
    
    // ATOMIC BEHAVIOR: Clean event handling
    attachEventHandlers() {
        if (!this.container) {
            throw new Error('🚨 EVENT ATTACHMENT FAILED: Container not built');
        }
        
        console.log('🎯 ATOMIC BEHAVIOR: Attaching event handlers...');
        
        // Control button handlers
        const prevBtn = this.container.querySelector('.control-btn.prev');
        const nextBtn = this.container.querySelector('.control-btn.next');
        
        prevBtn.addEventListener('click', () => this.previousItem());
        nextBtn.addEventListener('click', () => this.nextItem());
        
        // Indicator handlers
        const indicators = this.container.querySelectorAll('.indicator');
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToItem(index));
        });
        
        // Auto-rotation
        this.startAutoRotation();
        
        // Pause on hover
        this.container.addEventListener('mouseenter', () => this.pauseAutoRotation());
        this.container.addEventListener('mouseleave', () => this.startAutoRotation());
        
        console.log('✅ ATOMIC BEHAVIOR: Event handlers attached');
    }
    
    // CAROUSEL METHODS
    nextItem() {
        this.state.currentIndex = (this.state.currentIndex + 1) % 4;
        this.updateCarousel();
    }
    
    previousItem() {
        this.state.currentIndex = (this.state.currentIndex - 1 + 4) % 4;
        this.updateCarousel();
    }
    
    goToItem(index) {
        this.state.currentIndex = index;
        this.updateCarousel();
    }
    
    updateCarousel() {
        const items = this.container.querySelectorAll('.feed-item');
        const indicators = this.container.querySelectorAll('.indicator');
        
        items.forEach((item, index) => {
            item.classList.toggle('active', index === this.state.currentIndex);
        });
        
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.state.currentIndex);
        });
    }
    
    startAutoRotation() {
        if (this.state.autoRotate && !this.state.rotationInterval) {
            this.state.rotationInterval = setInterval(() => {
                this.nextItem();
            }, 4000);
        }
    }
    
    pauseAutoRotation() {
        if (this.state.rotationInterval) {
            clearInterval(this.state.rotationInterval);
            this.state.rotationInterval = null;
        }
    }
    
    // ATOMIC INITIALIZATION: Complete component setup
    initialize() {
        try {
            console.log('🚀 ATOMIC INITIALIZATION: Starting TrojanHorse Feed...');
            
            // Build component
            const component = this.buildComponent();
            
            // Find insertion point
            const foundation = document.getElementById('innovation-lab-foundation');
            if (!foundation) {
                throw new Error('🚨 INITIALIZATION FAILED: Foundation not found');
            }
            
            // Insert component
            foundation.appendChild(component);
            
            // Attach behaviors
            this.attachEventHandlers();
            
            // Mark as initialized
            this.initialized = true;
            this.state.active = true;
            
            console.log('✅ ATOMIC INITIALIZATION: TrojanHorse Feed ready');
            
            return this.validate();
            
        } catch (error) {
            console.error('🚨 ATOMIC INITIALIZATION FAILED:', error);
            throw error;
        }
    }
    
    // ATOMIC VALIDATION: Post-initialization verification
    validate() {
        const validation = {
            componentId: this.componentId,
            initialized: this.initialized,
            containerExists: !!this.container && !!this.container.parentNode,
            stylesApplied: !!document.getElementById(`${this.componentId}-styles`),
            eventHandlersAttached: this.state.rotationInterval !== null,
            carouselWorking: this.container.querySelector('.feed-item.active') !== null,
            responsive: window.getComputedStyle(this.container).display !== 'none',
            timestamp: new Date().toISOString(),
            status: 'ATOMIC_COMPONENT_VALIDATED'
        };
        
        const isValid = Object.values(validation).every(v => v === true || typeof v === 'string');
        
        console.log('📊 ATOMIC VALIDATION REPORT:', validation);
        console.log(isValid ? '✅ ATOMIC COMPONENT: VALIDATED' : '❌ ATOMIC COMPONENT: VALIDATION FAILED');
        
        return validation;
    }
    
    // ATOMIC CLEANUP: Safe component removal
    destroy() {
        console.log('🧹 ATOMIC CLEANUP: Destroying TrojanHorse Feed...');
        
        this.pauseAutoRotation();
        
        if (this.container && this.container.parentNode) {
            this.container.parentNode.removeChild(this.container);
        }
        
        const styles = document.getElementById(`${this.componentId}-styles`);
        if (styles) styles.remove();
        
        this.initialized = false;
        this.state.active = false;
        
        console.log('✅ ATOMIC CLEANUP: Component destroyed');
    }
}

// ATOMIC EXPORT: Clean global exposure
window.AtomicTrojanHorseFeed = AtomicTrojanHorseFeed;

console.log('🐴🧬 ATOMIC TROJAN HORSE FEED: Class definition loaded');
