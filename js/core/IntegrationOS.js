/**
 * IntegrationOS - Orchestration Conductor
 * Central hub for all OS coordination, state alignment, and feature management
 * Implements daily reset ritual and Trojan Horse deployment patterns
 */

class IntegrationOS {
    constructor() {
        this.version = '1.0.0';
        this.lastReset = localStorage.getItem('integrationOS_lastReset');
        this.activeFeatures = new Map();
        this.systemState = 'initializing';
        this.orchestrationQueue = [];
        this.performanceMetrics = {
            totalFeatures: 0,
            activeFeatures: 0,
            averageLoadTime: 0,
            errorCount: 0
        };
        
        // OS Layer references
        this.researchOS = null;
        this.techOS = null;
        this.interactionOS = null;
        this.designOS = null;
        
        // Innovation Lab reference
        this.innovationLab = null;
        
        this.init();
    }
    
    async init() {
        console.log('🎛️ IntegrationOS initializing...');
        
        // Check for daily reset
        await this.checkDailyReset();
        
        // Initialize core systems
        await this.initializeCoreSystems();
        
        // Setup orchestration patterns
        this.setupOrchestrationPatterns();
        
        // Start monitoring
        this.startSystemMonitoring();
        
        this.systemState = 'ready';
        console.log('✅ IntegrationOS ready - All systems operational');
        
        // Dispatch ready event
        window.dispatchEvent(new CustomEvent('integrationos-ready', {
            detail: { version: this.version, timestamp: Date.now() }
        }));
    }
    
    async checkDailyReset() {
        const today = new Date().toDateString();
        
        if (this.lastReset !== today) {
            console.log('🔄 Performing daily reset ritual...');
            await this.performDailyReset();
            localStorage.setItem('integrationOS_lastReset', today);
            this.lastReset = today;
        }
    }
    
    async performDailyReset() {
        // Clear stale feature states
        localStorage.removeItem('activeInnovationFeatures');
        
        // Reset performance metrics
        this.performanceMetrics = {
            totalFeatures: 0,
            activeFeatures: 0,
            averageLoadTime: 0,
            errorCount: 0
        };
        
        // Clear orchestration queue
        this.orchestrationQueue = [];
        
        // Validate Trojan Horse compliance
        await this.validateTrojanHorseCompliance();
        
        console.log('✅ Daily reset completed');
    }
    
    async initializeCoreSystems() {
        // Wait for Innovation Lab to be available
        if (window.innovationLab) {
            this.innovationLab = window.innovationLab;
        } else {
            // Wait for Innovation Lab initialization
            await new Promise(resolve => {
                const checkLab = () => {
                    if (window.innovationLab) {
                        this.innovationLab = window.innovationLab;
                        resolve();
                    } else {
                        setTimeout(checkLab, 100);
                    }
                };
                checkLab();
            });
        }
        
        // Initialize time-aware systems
        this.initializeTimeAwareness();
        
        // Setup feature management
        this.setupFeatureManagement();
    }
    
    initializeTimeAwareness() {
        const hour = new Date().getHours();
        let timeOfDay, greeting;
        
        if (hour >= 5 && hour < 12) {
            timeOfDay = 'morning';
            greeting = 'Good morning';
        } else if (hour >= 12 && hour < 18) {
            timeOfDay = 'afternoon';
            greeting = 'Good afternoon';
        } else if (hour >= 18 && hour < 22) {
            timeOfDay = 'evening';
            greeting = 'Good evening';
        } else {
            timeOfDay = 'night';
            greeting = 'Good evening';
        }
        
        // Update hero greeting if element exists
        const heroGreeting = document.querySelector('[data-hero-greeting]');
        if (heroGreeting) {
            heroGreeting.textContent = greeting;
        }
        
        // Apply time-aware gradients
        this.applyTimeAwareGradients(timeOfDay);
        
        console.log(`🌅 Time-aware systems initialized: ${timeOfDay}`);
    }
    
    applyTimeAwareGradients(timeOfDay) {
        const gradients = {
            morning: 'linear-gradient(135deg, #fbbf24, #f97316)',
            afternoon: 'linear-gradient(135deg, #93c5fd, #1e40af)',
            evening: 'linear-gradient(135deg, #a855f7, #ec4899)',
            night: 'linear-gradient(135deg, #a855f7, #ec4899)'
        };
        
        document.documentElement.style.setProperty('--time-aware-gradient', gradients[timeOfDay]);
        document.body.setAttribute('data-time-of-day', timeOfDay);
    }
    
    setupFeatureManagement() {
        // Listen for feature events
        document.addEventListener('feature-load-request', (e) => {
            this.handleFeatureLoadRequest(e.detail);
        });
        
        document.addEventListener('feature-close', (e) => {
            this.handleFeatureClose(e.detail);
        });
        
        // Setup Innovation Lab integration
        if (this.innovationLab) {
            this.setupInnovationLabIntegration();
        }
    }
    
    setupInnovationLabIntegration() {
        // Create Innovation Lab UI if not exists
        let labContainer = document.getElementById('innovation-lab-container');
        if (!labContainer) {
            labContainer = this.createInnovationLabContainer();
        }
        
        // Setup feature buttons
        this.setupFeatureButtons();
    }
    
    createInnovationLabContainer() {
        const container = document.createElement('div');
        container.id = 'innovation-lab-container';
        container.className = 'innovation-lab-container';
        container.innerHTML = `
            <div class="innovation-lab-header">
                <h3>🧪 Innovation Lab</h3>
                <div class="lab-status" id="lab-status">Ready</div>
            </div>
            <div class="innovation-lab-features" id="lab-features">
                <button class="lab-feature-btn" data-feature="trojan-snake">
                    🐍 Trojan Snake
                </button>
                <button class="lab-feature-btn" data-feature="graffiti-slap">
                    🎨 Graffiti Slap
                </button>
                <button class="lab-feature-btn" data-feature="agentx-modal">
                    🤖 AgentX Interface
                </button>
            </div>
            <div class="innovation-lab-viewport" id="lab-viewport">
                <div class="viewport-placeholder">
                    <p>Select a feature to begin</p>
                </div>
            </div>
        `;
        
        // Find appropriate insertion point
        const mainContent = document.querySelector('main') || document.body;
        mainContent.appendChild(container);
        
        return container;
    }
    
    setupFeatureButtons() {
        document.querySelectorAll('.lab-feature-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const featureId = e.target.dataset.feature;
                this.loadFeature(featureId);
            });
        });
    }
    
    async loadFeature(featureId) {
        const startTime = performance.now();
        
        try {
            // Update lab status
            this.updateLabStatus(`Loading ${featureId}...`);
            
            // Get viewport
            const viewport = document.getElementById('lab-viewport');
            if (!viewport) {
                throw new Error('Innovation Lab viewport not found');
            }
            
            // Clear viewport
            viewport.innerHTML = '';
            
            // Load feature via Innovation Lab
            const success = await this.innovationLab.loadFeature(featureId, viewport);
            
            if (success) {
                this.activeFeatures.set(featureId, {
                    loadTime: performance.now() - startTime,
                    timestamp: Date.now()
                });
                
                this.updateLabStatus(`${featureId} active`);
                this.updatePerformanceMetrics();
                
                // Add to orchestration queue for Trojan Horse validation
                this.orchestrationQueue.push({
                    action: 'feature_loaded',
                    featureId: featureId,
                    timestamp: Date.now()
                });
                
                console.log(`✅ Feature ${featureId} loaded successfully`);
            } else {
                throw new Error(`Failed to load feature ${featureId}`);
            }
            
        } catch (error) {
            console.error(`❌ Error loading feature ${featureId}:`, error);
            this.updateLabStatus(`Error: ${error.message}`);
            this.performanceMetrics.errorCount++;
        }
    }
    
    handleFeatureClose(detail) {
        const { featureId } = detail;
        
        if (this.activeFeatures.has(featureId)) {
            this.activeFeatures.delete(featureId);
            this.updateLabStatus('Ready');
            this.updatePerformanceMetrics();
            
            // Clear viewport
            const viewport = document.getElementById('lab-viewport');
            if (viewport) {
                viewport.innerHTML = `
                    <div class="viewport-placeholder">
                        <p>Select a feature to begin</p>
                    </div>
                `;
            }
            
            console.log(`🗑️ Feature ${featureId} closed`);
        }
    }
    
    updateLabStatus(status) {
        const statusEl = document.getElementById('lab-status');
        if (statusEl) {
            statusEl.textContent = status;
        }
    }
    
    updatePerformanceMetrics() {
        this.performanceMetrics.activeFeatures = this.activeFeatures.size;
        this.performanceMetrics.totalFeatures = this.innovationLab?.registry?.features?.length || 0;
        
        // Calculate average load time
        const loadTimes = Array.from(this.activeFeatures.values()).map(f => f.loadTime);
        if (loadTimes.length > 0) {
            this.performanceMetrics.averageLoadTime = 
                loadTimes.reduce((a, b) => a + b, 0) / loadTimes.length;
        }
    }
    
    setupOrchestrationPatterns() {
        // Process orchestration queue periodically
        setInterval(() => {
            this.processOrchestrationQueue();
        }, 5000);
        
        // Validate system health
        setInterval(() => {
            this.validateSystemHealth();
        }, 30000);
    }
    
    processOrchestrationQueue() {
        if (this.orchestrationQueue.length === 0) return;
        
        const batch = this.orchestrationQueue.splice(0, 10); // Process in batches
        
        for (const item of batch) {
            switch (item.action) {
                case 'feature_loaded':
                    this.validateFeatureTrojanCompliance(item.featureId);
                    break;
                case 'system_error':
                    this.handleSystemError(item);
                    break;
            }
        }
    }
    
    validateFeatureTrojanCompliance(featureId) {
        if (!this.innovationLab?.registry) return;
        
        const feature = this.innovationLab.registry.features.find(f => f.id === featureId);
        if (feature && !feature.trojan_tier) {
            console.warn(`⚠️ Feature ${featureId} lacks Trojan Horse compliance`);
            this.orchestrationQueue.push({
                action: 'compliance_violation',
                featureId: featureId,
                timestamp: Date.now()
            });
        }
    }
    
    async validateTrojanHorseCompliance() {
        if (!this.innovationLab?.registry) return true;
        
        const nonCompliant = this.innovationLab.registry.features.filter(f => !f.trojan_tier);
        
        if (nonCompliant.length > 0) {
            console.warn('⚠️ Trojan Horse compliance violations detected:', nonCompliant.map(f => f.id));
            return false;
        }
        
        console.log('✅ All features are Trojan Horse compliant');
        return true;
    }
    
    validateSystemHealth() {
        const health = {
            innovationLab: !!this.innovationLab,
            activeFeatures: this.activeFeatures.size,
            errorRate: this.performanceMetrics.errorCount / (this.performanceMetrics.totalFeatures || 1),
            memoryUsage: performance.memory ? performance.memory.usedJSHeapSize / 1024 / 1024 : 0
        };
        
        // Log health warnings
        if (health.errorRate > 0.1) {
            console.warn('⚠️ High error rate detected:', health.errorRate);
        }
        
        if (health.memoryUsage > 50) {
            console.warn('⚠️ High memory usage:', `${health.memoryUsage.toFixed(1)}MB`);
        }
        
        // Dispatch health event
        window.dispatchEvent(new CustomEvent('integrationos-health', {
            detail: health
        }));
    }
    
    startSystemMonitoring() {
        // Monitor for unhandled errors
        window.addEventListener('error', (e) => {
            this.orchestrationQueue.push({
                action: 'system_error',
                error: e.error?.message || 'Unknown error',
                timestamp: Date.now()
            });
            this.performanceMetrics.errorCount++;
        });
        
        // Monitor performance
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (entry.entryType === 'measure' && entry.name.includes('innovation-lab')) {
                        console.log(`📊 Performance: ${entry.name} took ${entry.duration.toFixed(2)}ms`);
                    }
                }
            });
            observer.observe({ entryTypes: ['measure'] });
        }
    }
    
    handleSystemError(errorItem) {
        console.error('🚨 System error handled by IntegrationOS:', errorItem);
        
        // Attempt recovery if needed
        if (this.activeFeatures.size === 0 && this.systemState === 'ready') {
            console.log('🔧 Attempting system recovery...');
            this.initializeCoreSystems();
        }
    }
    
    // Public API methods
    getSystemStatus() {
        return {
            version: this.version,
            state: this.systemState,
            lastReset: this.lastReset,
            activeFeatures: Array.from(this.activeFeatures.keys()),
            performance: this.performanceMetrics,
            queueLength: this.orchestrationQueue.length
        };
    }
    
    async forceReset() {
        console.log('🔄 Force reset initiated...');
        await this.performDailyReset();
        await this.initializeCoreSystems();
        console.log('✅ Force reset completed');
    }
    
    registerOSLayer(name, instance) {
        this[name] = instance;
        console.log(`🔗 OS Layer registered: ${name}`);
    }
    
    dispatch(command, payload = {}) {
        console.log(`📡 IntegrationOS dispatch: ${command}`, payload);
        
        // Add to orchestration queue
        this.orchestrationQueue.push({
            action: 'command_dispatch',
            command: command,
            payload: payload,
            timestamp: Date.now()
        });
        
        // Emit event for other systems
        window.dispatchEvent(new CustomEvent('integrationos-command', {
            detail: { command, payload }
        }));
    }
}

// Global initialization
window.IntegrationOS = IntegrationOS;

// Auto-initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.integrationOS = new IntegrationOS();
    });
} else {
    window.integrationOS = new IntegrationOS();
}
