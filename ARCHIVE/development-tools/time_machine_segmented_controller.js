/**
 * TIME MACHINE SEGMENTED CONTROLLER - PHASE 4 SURGICAL IMPLEMENTATION
 * "Flexing the framework in action for viewers to experience content adaptation"
 * 
 * User Requirements:
 * - Segmented controller with 3 tabs (Morning/Afternoon/Evening)
 * - Show time-aware case study variants
 * - Flex the time-aware framework for viewers to experience
 * - Clean, professional implementation matching ricrios.com quality
 * 
 * Framework: InteractionOS + Dark Matter + Trojan Horse precision
 * Timestamp: 2025-07-21T09:40:33-04:00 (Morning context active)
 */

class TimeMachineSegmentedController {
    constructor() {
        this.sessionId = `time_machine_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        this.currentTime = new Date();
        this.activeTimeContext = this.determineTimeContext();
        
        // Time-aware case study variants (framework demonstration)
        this.timeVariants = {
            morning: {
                label: 'Morning',
                icon: '🌅',
                description: 'Strategic Clarity',
                theme: 'Fresh perspective with morning clarity',
                color: '#FF8C00', // Orange
                gradient: 'linear-gradient(135deg, rgba(255, 140, 0, 0.1) 0%, rgba(255, 165, 0, 0.05) 100%)'
            },
            afternoon: {
                label: 'Afternoon',
                icon: '☀️',
                description: 'Systematic Focus',
                theme: 'Strategic analysis with methodical rigor',
                color: '#3B82F6', // Blue
                gradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.05) 100%)'
            },
            evening: {
                label: 'Evening',
                icon: '🌙',
                description: 'Reflective Wisdom',
                theme: 'Deep insights with earned wisdom',
                color: '#A855F7', // Purple
                gradient: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(147, 51, 234, 0.05) 100%)'
            }
        };
        
        console.log('🕰️ TIME MACHINE: Segmented Controller initialized for', this.activeTimeContext, 'context');
    }

    determineTimeContext() {
        const hour = this.currentTime.getHours();
        
        if (hour >= 5 && hour < 12) {
            return 'morning';
        } else if (hour >= 12 && hour < 18) {
            return 'afternoon';
        } else {
            return 'evening';
        }
    }

    // Create segmented controller UI
    createSegmentedController(caseStudyId) {
        console.log('🎛️ CREATING: Segmented controller for case study', caseStudyId);
        
        const controller = document.createElement('div');
        controller.className = 'time-machine-segmented-controller';
        controller.setAttribute('data-case-study', caseStudyId);
        
        // Controller styles
        controller.style.cssText = `
            display: flex;
            background: var(--ric-color-surface-secondary);
            border: 1px solid var(--ric-color-border);
            border-radius: 12px;
            padding: 4px;
            margin: 1rem 0;
            width: 100%;
            position: relative;
            overflow: hidden;
        `;
        
        // Create segments
        Object.entries(this.timeVariants).forEach(([timeKey, variant], index) => {
            const segment = this.createSegment(timeKey, variant, index, caseStudyId);
            controller.appendChild(segment);
        });
        
        // Add active indicator
        const indicator = this.createActiveIndicator();
        controller.appendChild(indicator);
        
        console.log('✅ CREATED: Segmented controller with 3 time variants');
        return controller;
    }

    // Create individual segment
    createSegment(timeKey, variant, index, caseStudyId) {
        const segment = document.createElement('button');
        segment.className = `time-segment time-segment-${timeKey}`;
        segment.setAttribute('data-time', timeKey);
        segment.setAttribute('data-case-study', caseStudyId);
        
        const isActive = timeKey === this.activeTimeContext;
        
        segment.style.cssText = `
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 0.75rem 0.5rem;
            border: none;
            background: ${isActive ? variant.gradient : 'transparent'};
            color: ${isActive ? variant.color : 'var(--ric-color-text-secondary)'};
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            z-index: 2;
            font-family: inherit;
            font-size: 0.875rem;
            font-weight: ${isActive ? '600' : '500'};
            min-height: 60px;
        `;
        
        // Segment content
        segment.innerHTML = `
            <div class="segment-icon" style="font-size: 1.25rem; margin-bottom: 0.25rem;">${variant.icon}</div>
            <div class="segment-label" style="font-size: 0.75rem; font-weight: 600;">${variant.label}</div>
            <div class="segment-description" style="font-size: 0.625rem; opacity: 0.8; margin-top: 0.125rem;">${variant.description}</div>
        `;
        
        // Add click handler
        segment.addEventListener('click', (e) => {
            e.preventDefault();
            this.selectTimeVariant(timeKey, caseStudyId, segment);
        });
        
        // Add hover effects
        segment.addEventListener('mouseenter', () => {
            if (timeKey !== this.activeTimeContext) {
                segment.style.background = variant.gradient;
                segment.style.color = variant.color;
            }
        });
        
        segment.addEventListener('mouseleave', () => {
            if (timeKey !== this.activeTimeContext) {
                segment.style.background = 'transparent';
                segment.style.color = 'var(--ric-color-text-secondary)';
            }
        });
        
        return segment;
    }

    // Create active indicator (sliding background)
    createActiveIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'time-machine-active-indicator';
        
        const activeIndex = Object.keys(this.timeVariants).indexOf(this.activeTimeContext);
        const activeVariant = this.timeVariants[this.activeTimeContext];
        
        indicator.style.cssText = `
            position: absolute;
            top: 4px;
            left: ${4 + (activeIndex * 33.333)}%;
            width: 33.333%;
            height: calc(100% - 8px);
            background: ${activeVariant.gradient};
            border-radius: 8px;
            transition: all 0.3s ease;
            z-index: 1;
            pointer-events: none;
        `;
        
        return indicator;
    }

    // Select time variant and update content
    selectTimeVariant(timeKey, caseStudyId, segmentElement) {
        console.log('🕰️ SELECTING: Time variant', timeKey, 'for case study', caseStudyId);
        
        // Update active context
        this.activeTimeContext = timeKey;
        const variant = this.timeVariants[timeKey];
        
        // Update controller visual state
        this.updateControllerState(segmentElement.closest('.time-machine-segmented-controller'), timeKey);
        
        // Trigger case study content update
        this.updateCaseStudyContent(caseStudyId, timeKey, variant);
        
        console.log('✅ SELECTED: Time variant', timeKey, 'activated');
    }

    // Update controller visual state
    updateControllerState(controller, activeTimeKey) {
        const segments = controller.querySelectorAll('.time-segment');
        const indicator = controller.querySelector('.time-machine-active-indicator');
        const activeIndex = Object.keys(this.timeVariants).indexOf(activeTimeKey);
        const activeVariant = this.timeVariants[activeTimeKey];
        
        // Update segments
        segments.forEach((segment, index) => {
            const timeKey = segment.getAttribute('data-time');
            const variant = this.timeVariants[timeKey];
            const isActive = timeKey === activeTimeKey;
            
            segment.style.background = isActive ? variant.gradient : 'transparent';
            segment.style.color = isActive ? variant.color : 'var(--ric-color-text-secondary)';
            segment.style.fontWeight = isActive ? '600' : '500';
        });
        
        // Update indicator position
        if (indicator) {
            indicator.style.left = `${4 + (activeIndex * 33.333)}%`;
            indicator.style.background = activeVariant.gradient;
        }
    }

    // Update case study content based on time variant
    updateCaseStudyContent(caseStudyId, timeKey, variant) {
        console.log('📝 UPDATING: Case study content for', timeKey, 'variant');
        
        // Find the modal content area
        const modal = document.querySelector('.ric-modal');
        if (!modal) {
            console.warn('⚠️ Modal not found for content update');
            return;
        }
        
        // Update modal with time-aware content
        const contentArea = modal.querySelector('.ric-modal-body');
        if (contentArea) {
            // Add time-aware content indicator
            this.addTimeAwareIndicator(contentArea, variant);
            
            // Trigger content adaptation (framework demonstration)
            this.adaptContentForTimeContext(contentArea, timeKey, variant);
        }
        
        console.log('✅ UPDATED: Case study content adapted for', timeKey, 'context');
    }

    // Add time-aware content indicator
    addTimeAwareIndicator(contentArea, variant) {
        // Remove existing indicator
        const existingIndicator = contentArea.querySelector('.time-aware-indicator');
        if (existingIndicator) {
            existingIndicator.remove();
        }
        
        // Create new indicator
        const indicator = document.createElement('div');
        indicator.className = 'time-aware-indicator';
        indicator.style.cssText = `
            display: flex;
            align-items: center;
            padding: 0.75rem 1rem;
            margin-bottom: 1rem;
            background: ${variant.gradient};
            border: 1px solid ${variant.color}20;
            border-radius: 8px;
            color: ${variant.color};
            font-size: 0.875rem;
            font-weight: 600;
        `;
        
        indicator.innerHTML = `
            <span style="margin-right: 0.5rem; font-size: 1.125rem;">${variant.icon}</span>
            <span>Viewing through ${variant.label} lens: ${variant.theme}</span>
        `;
        
        // Insert at the beginning of content
        contentArea.insertBefore(indicator, contentArea.firstChild);
    }

    // Adapt content for time context (framework demonstration)
    adaptContentForTimeContext(contentArea, timeKey, variant) {
        // This is where the time-aware framework would adapt content
        // For now, we'll add a subtle visual treatment to demonstrate the concept
        
        const paragraphs = contentArea.querySelectorAll('p');
        paragraphs.forEach((p, index) => {
            if (index === 0) {
                // Add subtle time-aware styling to first paragraph
                p.style.borderLeft = `3px solid ${variant.color}`;
                p.style.paddingLeft = '1rem';
                p.style.background = variant.gradient;
                p.style.borderRadius = '0 8px 8px 0';
                p.style.transition = 'all 0.3s ease';
            }
        });
        
        console.log('🎨 ADAPTED: Content styling for', timeKey, 'context');
    }

    // Inject Time Machine into case study modals
    injectIntoModal(caseStudyId) {
        console.log('💉 INJECTING: Time Machine controller into modal for', caseStudyId);
        
        // Wait for modal to be created
        setTimeout(() => {
            const modal = document.querySelector('.ric-modal');
            if (!modal) {
                console.warn('⚠️ Modal not found for Time Machine injection');
                return;
            }
            
            const modalHeader = modal.querySelector('.ric-modal-header');
            if (modalHeader) {
                // Create and inject segmented controller
                const controller = this.createSegmentedController(caseStudyId);
                
                // Insert after modal header
                modalHeader.insertAdjacentElement('afterend', controller);
                
                console.log('✅ INJECTED: Time Machine controller into modal');
            }
        }, 100);
    }

    // Initialize Time Machine system
    initialize() {
        console.log('🚀 INITIALIZING: Time Machine Segmented Controller...');
        
        try {
            // Override existing Time Travel functions with new implementation
            window.activateTimeTravelMode = (caseStudyId) => {
                console.log('🕰️ TIME MACHINE: Activating for case study', caseStudyId);
                this.injectIntoModal(caseStudyId);
            };
            
            // Add to global scope for access
            window.timeMachineController = this;
            
            console.log('✅ INITIALIZED: Time Machine Segmented Controller operational');
            console.log('🎛️ ACTIVE CONTEXT:', this.activeTimeContext);
            console.log('🎯 FRAMEWORK DEMO: Ready to flex time-aware content adaptation');
            
            return true;
            
        } catch (error) {
            console.error('❌ TIME MACHINE ERROR:', error);
            return false;
        }
    }

    // Cleanup method
    destroy() {
        // Remove controllers
        const controllers = document.querySelectorAll('.time-machine-segmented-controller');
        controllers.forEach(controller => controller.remove());
        
        // Remove indicators
        const indicators = document.querySelectorAll('.time-aware-indicator');
        indicators.forEach(indicator => indicator.remove());
        
        console.log('🧹 CLEANUP: Time Machine Segmented Controller destroyed');
    }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('🕰️ TIME MACHINE: Auto-initializing segmented controller...');
    
    window.timeMachineSegmentedController = new TimeMachineSegmentedController();
    window.timeMachineSegmentedController.initialize();
});

// Export for manual control
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TimeMachineSegmentedController;
}
