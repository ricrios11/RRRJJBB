/**
 * Innovation Lab Validator
 * Single JS renderer with feature registry validation
 * Enforces performance budgets and prevents duplicate renderers
 */

class InnovationLabValidator {
    constructor() {
        this.registry = null;
        this.loadedFeatures = new Map();
        this.performanceMetrics = {
            initialLoadSize: 0,
            featureLoadTimes: new Map(),
            renderCount: 0
        };
        this.duplicateRendererGuard = new Set();
        
        this.init();
    }
    
    async init() {
        await this.loadFeatureRegistry();
        this.setupPerformanceMonitoring();
        this.validateEnvironment();
    }
    
    async loadFeatureRegistry() {
        try {
            const response = await fetch('/feature_registry.yaml');
            const yamlText = await response.text();
            this.registry = this.parseYAML(yamlText);
            console.log('🎛️ Feature Registry loaded:', this.registry.features.length, 'features');
        } catch (error) {
            console.error('❌ Failed to load feature registry:', error);
            this.registry = { features: [] };
        }
    }
    
    parseYAML(yamlText) {
        // Simple YAML parser for feature registry
        const lines = yamlText.split('\n');
        const result = { features: [] };
        let currentFeature = null;
        let currentSection = null;
        
        for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed.startsWith('- id:')) {
                if (currentFeature) result.features.push(currentFeature);
                currentFeature = { id: trimmed.split('"')[1] };
            } else if (currentFeature && trimmed.includes(':')) {
                const [key, value] = trimmed.split(':').map(s => s.trim());
                if (value.startsWith('"') && value.endsWith('"')) {
                    currentFeature[key] = value.slice(1, -1);
                } else if (value === 'true') {
                    currentFeature[key] = true;
                } else if (value === 'false') {
                    currentFeature[key] = false;
                } else if (!isNaN(value)) {
                    currentFeature[key] = parseFloat(value);
                } else {
                    currentFeature[key] = value;
                }
            }
        }
        if (currentFeature) result.features.push(currentFeature);
        
        return result;
    }
    
    setupPerformanceMonitoring() {
        // Monitor initial bundle size
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.entryType === 'resource' && entry.name.includes('.js')) {
                    this.performanceMetrics.initialLoadSize += entry.transferSize || 0;
                }
            }
        });
        observer.observe({ entryTypes: ['resource'] });
        
        // Check performance budget
        setTimeout(() => {
            const budgetKB = 150;
            const currentKB = this.performanceMetrics.initialLoadSize / 1024;
            if (currentKB > budgetKB) {
                console.warn(`⚠️ Performance budget exceeded: ${currentKB.toFixed(1)}KB > ${budgetKB}KB`);
            } else {
                console.log(`✅ Performance budget OK: ${currentKB.toFixed(1)}KB / ${budgetKB}KB`);
            }
        }, 2000);
    }
    
    validateEnvironment() {
        // Check for duplicate renderers
        const existingRenderers = document.querySelectorAll('[data-innovation-renderer]');
        if (existingRenderers.length > 1) {
            console.error('❌ Multiple Innovation Lab renderers detected - violates single renderer rule');
        }
        
        // Mark this as the authoritative renderer
        document.body.setAttribute('data-innovation-renderer', 'primary');
    }
    
    async loadFeature(featureId, container) {
        const startTime = performance.now();
        
        // Prevent duplicate renderer creation
        if (this.duplicateRendererGuard.has(featureId)) {
            console.warn(`⚠️ Feature ${featureId} already has active renderer`);
            return false;
        }
        
        const feature = this.registry.features.find(f => f.id === featureId);
        if (!feature) {
            console.error(`❌ Feature ${featureId} not found in registry`);
            return false;
        }
        
        // Validate feature status
        if (feature.status === 'disabled') {
            console.warn(`⚠️ Feature ${featureId} is disabled`);
            return false;
        }
        
        try {
            this.duplicateRendererGuard.add(featureId);
            
            // Load feature dependencies
            await this.loadDependencies(feature.dependencies || []);
            
            // Load feature module
            const module = await this.loadFeatureModule(featureId);
            
            // Apply time-aware theming if enabled
            if (feature.time_aware) {
                this.applyTimeAwareTheming(container);
            }
            
            // Initialize feature
            const instance = new module.default(container, {
                timeAware: feature.time_aware,
                mobileOptimized: feature.mobile_optimized,
                trojanTier: feature.trojan_tier
            });
            
            this.loadedFeatures.set(featureId, instance);
            
            const loadTime = performance.now() - startTime;
            this.performanceMetrics.featureLoadTimes.set(featureId, loadTime);
            
            console.log(`✅ Feature ${featureId} loaded in ${loadTime.toFixed(2)}ms`);
            return true;
            
        } catch (error) {
            console.error(`❌ Failed to load feature ${featureId}:`, error);
            this.duplicateRendererGuard.delete(featureId);
            return false;
        }
    }
    
    async loadDependencies(dependencies) {
        for (const dep of dependencies) {
            if (dep.endsWith('.css')) {
                await this.loadCSS(dep);
            } else if (dep.endsWith('.js')) {
                await this.loadScript(dep);
            }
        }
    }
    
    loadCSS(href) {
        return new Promise((resolve, reject) => {
            if (document.querySelector(`link[href="${href}"]`)) {
                resolve();
                return;
            }
            
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            link.onload = resolve;
            link.onerror = reject;
            document.head.appendChild(link);
        });
    }
    
    loadScript(src) {
        return new Promise((resolve, reject) => {
            if (document.querySelector(`script[src="${src}"]`)) {
                resolve();
                return;
            }
            
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }
    
    async loadFeatureModule(featureId) {
        const modulePath = `/js/features/${featureId}.js`;
        return import(modulePath);
    }
    
    applyTimeAwareTheming(container) {
        const hour = new Date().getHours();
        let timeOfDay, gradient;
        
        if (hour >= 5 && hour < 12) {
            timeOfDay = 'morning';
            gradient = 'linear-gradient(135deg, #fbbf24, #f97316)'; // yellow→orange
        } else if (hour >= 12 && hour < 18) {
            timeOfDay = 'afternoon';
            gradient = 'linear-gradient(135deg, #93c5fd, #1e40af)'; // light→deep blue
        } else {
            timeOfDay = 'night';
            gradient = 'linear-gradient(135deg, #a855f7, #ec4899)'; // purple→pink
        }
        
        container.setAttribute('data-time-of-day', timeOfDay);
        container.style.setProperty('--time-aware-gradient', gradient);
        
        // Apply seasonal matrix if available
        if (this.registry.time_awareness?.seasonal_matrix) {
            this.applySeasonalMatrix(container);
        }
    }
    
    applySeasonalMatrix(container) {
        const month = new Date().getMonth();
        let season;
        
        if (month >= 2 && month <= 4) season = 'spring';
        else if (month >= 5 && month <= 7) season = 'summer';
        else if (month >= 8 && month <= 10) season = 'autumn';
        else season = 'winter';
        
        container.setAttribute('data-season', season);
    }
    
    unloadFeature(featureId) {
        const instance = this.loadedFeatures.get(featureId);
        if (instance && typeof instance.destroy === 'function') {
            instance.destroy();
        }
        
        this.loadedFeatures.delete(featureId);
        this.duplicateRendererGuard.delete(featureId);
        
        console.log(`🗑️ Feature ${featureId} unloaded`);
    }
    
    getPerformanceReport() {
        return {
            initialLoadSize: `${(this.performanceMetrics.initialLoadSize / 1024).toFixed(1)}KB`,
            loadedFeatures: Array.from(this.loadedFeatures.keys()),
            featureLoadTimes: Object.fromEntries(this.performanceMetrics.featureLoadTimes),
            renderCount: this.performanceMetrics.renderCount
        };
    }
    
    validateTrojanHorseCompliance() {
        // Ensure every feature has Trojan Horse improvements
        const nonCompliantFeatures = this.registry.features.filter(f => !f.trojan_tier);
        if (nonCompliantFeatures.length > 0) {
            console.warn('⚠️ Non-Trojan compliant features:', nonCompliantFeatures.map(f => f.id));
        }
        return nonCompliantFeatures.length === 0;
    }
}

// Export for global use
window.InnovationLabValidator = InnovationLabValidator;

// Auto-initialize if DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.innovationLab = new InnovationLabValidator();
    });
} else {
    window.innovationLab = new InnovationLabValidator();
}
