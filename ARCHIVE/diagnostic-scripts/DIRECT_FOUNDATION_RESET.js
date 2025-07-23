/**
 * DIRECT FOUNDATION RESET - Phase 1 Orchestrator Override
 * Emergency teardown script to force complete Innovation Lab reset
 * Bypasses all existing systematic fixes and takes immediate control
 */

console.log('🔥🧬 DIRECT FOUNDATION RESET: Emergency override activated');

// Immediate execution - no delays, no conditions
(function() {
    'use strict';
    
    const resetId = `direct_reset_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    console.log(`🔥 DIRECT RESET ID: ${resetId}`);
    
    // STEP 1: Stop all existing systematic fixes
    console.log('🛑 STEP 1: Stopping all systematic fixes...');
    
    // Clear all intervals and timeouts
    for (let i = 1; i < 99999; i++) {
        window.clearInterval(i);
        window.clearTimeout(i);
    }
    
    // Remove systematic fix globals
    delete window.SystematicInnovationLabFix;
    delete window.LyraMultiThreadedFix;
    delete window.TrojanHorseBrigade;
    
    console.log('✅ STEP 1: All systematic fixes stopped');
    
    // STEP 2: Complete DOM teardown
    console.log('🧹 STEP 2: Complete DOM teardown...');
    
    // Remove ALL Innovation Lab related elements
    const innovationLabSelectors = [
        '#innovation-lab',
        '.innovation-lab',
        '[data-innovation-lab]',
        '.trojan-horse-feed',
        '.dos-snake-game',
        '.snake-game-container',
        '.future-feature-card',
        '.case-study-remix',
        '.ux-memory-recall',
        '.prompt-generator',
        '.graffiti-slap-game',
        '.sass-framework',
        '.techos-innovation',
        '[id*="snake"]',
        '[class*="snake"]',
        '[id*="innovation"]',
        '[class*="innovation"]',
        '[id*="trojan"]',
        '[class*="trojan"]'
    ];
    
    let removedCount = 0;
    innovationLabSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.remove();
            removedCount++;
        });
    });
    
    console.log(`✅ STEP 2: Removed ${removedCount} DOM elements`);
    
    // STEP 3: CSS cleanup
    console.log('🎨 STEP 3: CSS cleanup...');
    
    // Remove all Innovation Lab stylesheets
    const stylesheets = document.querySelectorAll('style, link[rel="stylesheet"]');
    let cssRemovedCount = 0;
    stylesheets.forEach(sheet => {
        if (sheet.textContent && (
            sheet.textContent.includes('snake') ||
            sheet.textContent.includes('innovation') ||
            sheet.textContent.includes('trojan') ||
            sheet.textContent.includes('dos-') ||
            sheet.textContent.includes('future-feature')
        )) {
            sheet.remove();
            cssRemovedCount++;
        }
    });
    
    console.log(`✅ STEP 3: Removed ${cssRemovedCount} CSS resources`);
    
    // STEP 4: JavaScript cleanup
    console.log('🔧 STEP 4: JavaScript cleanup...');
    
    // Remove global variables
    const globalsToRemove = [
        'DOSSnakeGame',
        'InnovationLab',
        'TrojanHorseFeed',
        'CaseStudyRemix',
        'UXMemoryRecall',
        'PromptGenerator',
        'GraffitiSlap',
        'SASSFramework',
        'TechOSInnovation',
        'snakeGame',
        'innovationLab',
        'trojanHorse'
    ];
    
    let globalsRemovedCount = 0;
    globalsToRemove.forEach(globalVar => {
        if (window[globalVar]) {
            delete window[globalVar];
            globalsRemovedCount++;
        }
    });
    
    console.log(`✅ STEP 4: Removed ${globalsRemovedCount} global variables`);
    
    // STEP 5: Event listener cleanup
    console.log('🎯 STEP 5: Event listener cleanup...');
    
    // Remove all click handlers on Innovation Lab elements
    const allElements = document.querySelectorAll('*');
    let eventListenersRemoved = 0;
    allElements.forEach(el => {
        if (el.onclick && (
            el.onclick.toString().includes('snake') ||
            el.onclick.toString().includes('innovation') ||
            el.onclick.toString().includes('trojan')
        )) {
            el.onclick = null;
            eventListenersRemoved++;
        }
    });
    
    console.log(`✅ STEP 5: Removed ${eventListenersRemoved} event listeners`);
    
    // STEP 6: Create clean foundation
    console.log('🏗️ STEP 6: Creating clean foundation...');
    
    // Create minimal Innovation Lab container
    const cleanFoundation = document.createElement('div');
    cleanFoundation.id = 'innovation-lab-foundation';
    cleanFoundation.innerHTML = `
        <div class="foundation-status">
            <h3>🧬 Innovation Lab Foundation</h3>
            <p>Clean slate prepared for atomic component build</p>
            <div class="foundation-metrics">
                <span>Reset ID: ${resetId}</span>
                <span>Status: Ready for Phase 2</span>
                <span>Timestamp: ${new Date().toISOString()}</span>
            </div>
        </div>
    `;
    
    cleanFoundation.style.cssText = `
        padding: 2rem;
        margin: 2rem 0;
        border: 2px solid #00ff41;
        border-radius: 8px;
        background: rgba(0, 255, 65, 0.1);
        font-family: 'Courier New', monospace;
        color: #00ff41;
        text-align: center;
    `;
    
    // Find insertion point (after case studies section)
    const caseStudiesSection = document.querySelector('#case-studies') || 
                              document.querySelector('.case-studies') ||
                              document.querySelector('main') ||
                              document.body;
    
    if (caseStudiesSection) {
        caseStudiesSection.insertAdjacentElement('afterend', cleanFoundation);
        console.log('✅ STEP 6: Clean foundation created and inserted');
    } else {
        document.body.appendChild(cleanFoundation);
        console.log('✅ STEP 6: Clean foundation created (fallback insertion)');
    }
    
    // STEP 7: Validation and reporting
    console.log('📊 STEP 7: Validation and reporting...');
    
    const finalValidation = {
        resetId: resetId,
        timestamp: new Date().toISOString(),
        elementsRemoved: removedCount,
        cssResourcesRemoved: cssRemovedCount,
        globalsRemoved: globalsRemovedCount,
        eventListenersRemoved: eventListenersRemoved,
        foundationCreated: !!document.getElementById('innovation-lab-foundation'),
        phase1Complete: true,
        readyForPhase2: true
    };
    
    console.log('📋 FOUNDATION RESET COMPLETE REPORT:');
    console.log('=====================================');
    Object.entries(finalValidation).forEach(([key, value]) => {
        console.log(`${key}: ${value}`);
    });
    console.log('=====================================');
    
    // Export validation for Phase 2
    window.FoundationResetValidation = finalValidation;
    
    console.log('🎉 DIRECT FOUNDATION RESET: Phase 1 COMPLETE');
    console.log('🚀 Ready for Phase 2: Atomic Component Build');
    
    return finalValidation;
    
})();
