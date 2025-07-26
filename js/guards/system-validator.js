/**
 * 🔍 DARK MATTER VALIDATOR v1.0
 * DOS Framework - IntegrationOS Layer
 * 
 * Comprehensive system validation that ensures all critical components
 * are present and functioning according to DOS specifications.
 * 
 * @author RicRios Design Operating System
 * @version 1.0.0
 * @layer IntegrationOS
 */

(function() {
    'use strict';
    
    console.log('🔍 DARK MATTER VALIDATOR: Starting system validation...');
    
    /**
     * System validation results
     */
    const validationResults = {
        passed: [],
        warnings: [],
        errors: [],
        critical: []
    };
    
    /**
     * Validate atomic elements required by the system
     */
    function validateAtomicElements() {
        const atomicElements = [
            { id: 'trojanHorseFeed', name: 'Atomic Trojan Feed', critical: true },
            { id: 'innovationLab', name: 'Innovation Lab container', critical: true },
            { id: 'hero', name: 'Hero section', critical: true },
            { id: 'innovation-lab', name: 'Innovation Lab section', critical: false }
        ];
        
        atomicElements.forEach(element => {
            const el = document.getElementById(element.id);
            if (!el) {
                const message = `${element.name} missing (#${element.id})`;
                if (element.critical) {
                    validationResults.critical.push(message);
                } else {
                    validationResults.warnings.push(message);
                }
            } else {
                validationResults.passed.push(`${element.name} found`);
            }
        });
    }
    
    /**
     * Validate theme awareness
     */
    function validateThemeAwareness() {
        const body = document.body;
        const hasTheme = body.classList.contains('dark') || body.classList.contains('light');
        
        if (!hasTheme) {
            validationResults.warnings.push('Theme awareness missing - no dark/light class on body');
        } else {
            validationResults.passed.push('Theme awareness active');
        }
        
        // Check for time-aware classes
        const timeClasses = ['time-morning', 'time-afternoon', 'time-evening', 'time-night'];
        const hasTimeClass = timeClasses.some(cls => body.classList.contains(cls));
        
        if (!hasTimeClass) {
            validationResults.warnings.push('Time-aware classes missing on body');
        } else {
            validationResults.passed.push('Time-aware system active');
        }
    }
    
    /**
     * Validate cyberpunk styling elements
     */
    function validateCyberpunkStyling() {
        const cyberpunkElements = document.querySelectorAll('.cyberpunk-neon, .cyberpunk-card, .cyberpunk-dos-fusion');
        
        if (cyberpunkElements.length === 0) {
            validationResults.warnings.push('Cyberpunk styling missing - no cyberpunk classes found');
        } else {
            validationResults.passed.push(`Cyberpunk styling active (${cyberpunkElements.length} elements)`);
        }
    }
    
    /**
     * Validate critical JavaScript functions
     */
    function validateJavaScriptFunctions() {
        const criticalFunctions = [
            { name: 'initializeDarkMode', obj: window },
            { name: 'launchFeatureModal', obj: window },
            { name: 'exitInnovationLab', obj: window },
            { name: 'InnovationLab', obj: window, type: 'constructor' }
        ];
        
        criticalFunctions.forEach(func => {
            const exists = typeof func.obj[func.name] === (func.type === 'constructor' ? 'function' : 'function');
            if (!exists) {
                validationResults.errors.push(`${func.name} function not defined`);
            } else {
                validationResults.passed.push(`${func.name} function available`);
            }
        });
    }
    
    /**
     * Validate Innovation Lab system
     */
    function validateInnovationLab() {
        const labSection = document.getElementById('innovation-lab');
        if (!labSection) {
            validationResults.critical.push('Innovation Lab section missing');
            return;
        }
        
        // Check for feature cards
        const featureCards = labSection.querySelectorAll('.lab-feature-card');
        if (featureCards.length === 0) {
            validationResults.warnings.push('Innovation Lab feature cards missing');
        } else {
            validationResults.passed.push(`Innovation Lab has ${featureCards.length} feature cards`);
        }
        
        // Check for Konami code system
        if (typeof window.InnovationLab === 'function') {
            validationResults.passed.push('Konami code system available');
        } else {
            validationResults.errors.push('Konami code system missing');
        }
    }
    
    /**
     * Run comprehensive validation
     */
    function runValidation() {
        console.log('🔍 DARK MATTER VALIDATOR: Running comprehensive system check...');
        
        validateAtomicElements();
        validateThemeAwareness();
        validateCyberpunkStyling();
        validateJavaScriptFunctions();
        validateInnovationLab();
        
        return validationResults;
    }
    
    /**
     * Display validation results
     */
    function displayResults() {
        const results = runValidation();
        
        console.group('🔍 DARK MATTER VALIDATION RESULTS');
        
        if (results.critical.length > 0) {
            console.group('🚨 CRITICAL ISSUES');
            results.critical.forEach(issue => console.error(`❌ ${issue}`));
            console.groupEnd();
        }
        
        if (results.errors.length > 0) {
            console.group('❌ ERRORS');
            results.errors.forEach(error => console.error(`❌ ${error}`));
            console.groupEnd();
        }
        
        if (results.warnings.length > 0) {
            console.group('⚠️ WARNINGS');
            results.warnings.forEach(warning => console.warn(`⚠️ ${warning}`));
            console.groupEnd();
        }
        
        if (results.passed.length > 0) {
            console.group('✅ PASSED VALIDATIONS');
            results.passed.forEach(pass => console.log(`✅ ${pass}`));
            console.groupEnd();
        }
        
        console.groupEnd();
        
        // Overall status
        const totalIssues = results.critical.length + results.errors.length;
        if (totalIssues === 0) {
            console.log('✅ DARK MATTER VALIDATION: All systems operational');
        } else {
            console.warn(`🚨 DARK MATTER VALIDATION: ${totalIssues} issues detected`);
        }
        
        return results;
    }
    
    /**
     * Initialize validation when DOM is ready
     */
    function initialize() {
        // Run validation after a short delay to allow other scripts to load
        setTimeout(() => {
            displayResults();
        }, 1000);
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
    
    // Export for debugging and external use
    window.DarkMatterValidator = {
        runValidation,
        displayResults,
        getResults: () => validationResults
    };
    
})();
