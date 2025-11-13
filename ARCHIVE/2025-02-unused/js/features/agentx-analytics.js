/**
 * 📊 AgentX Analytics System
 * Tracks agent personalization usage and interactions for insights
 */

/**
 * Log an AgentX event to localStorage analytics
 * @param {string} eventType - Type of event (e.g., "case_study_read", "lab_feature_clicked")
 * @param {Object} context - Additional context data
 */
function logAgentXEvent(eventType, context = {}) {
    try {
        // Get current agent profile
        const agent = JSON.parse(localStorage.getItem("agentx-profile") || "{}");
        
        // Get existing analytics logs
        const logs = JSON.parse(localStorage.getItem("agentx-analytics") || "[]");
        
        // Create event entry
        const eventEntry = {
            timestamp: new Date().toISOString(),
            event: eventType,
            agent: agent.name || "Unconfigured",
            theme: agent.theme || "default",
            role: agent.role || "assistant",
            tone: agent.tone || "professional",
            expertise: agent.expertise || "general",
            session_id: getSessionId(),
            page_url: window.location.pathname,
            page_title: document.title,
            user_agent: navigator.userAgent.substring(0, 100), // Truncated for storage
            ...context
        };
        
        // Add to logs array
        logs.push(eventEntry);
        
        // Maintain log size (keep last 1000 entries)
        if (logs.length > 1000) {
            logs.splice(0, logs.length - 1000);
        }
        
        // Save back to localStorage
        localStorage.setItem("agentx-analytics", JSON.stringify(logs));
        
        // Fire custom event for real-time listeners
        document.dispatchEvent(new CustomEvent('agentxAnalyticsLogged', {
            detail: eventEntry
        }));
        
        console.log("AgentX Analytics:", eventType, eventEntry);
        
    } catch (error) {
        console.error("AgentX Analytics Error:", error);
    }
}

/**
 * Get or create session ID for tracking user sessions
 * @returns {string} Session ID
 */
function getSessionId() {
    let sessionId = sessionStorage.getItem("agentx-session-id");
    if (!sessionId) {
        sessionId = "sess_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
        sessionStorage.setItem("agentx-session-id", sessionId);
    }
    return sessionId;
}

/**
 * Get analytics summary for dashboard/reporting
 * @returns {Object} Analytics summary
 */
function getAgentXAnalytics() {
    try {
        const logs = JSON.parse(localStorage.getItem("agentx-analytics") || "[]");
        
        if (logs.length === 0) {
            return {
                total_events: 0,
                unique_sessions: 0,
                most_active_agent: null,
                popular_themes: {},
                event_breakdown: {},
                recent_activity: []
            };
        }
        
        // Calculate summary statistics
        const summary = {
            total_events: logs.length,
            unique_sessions: new Set(logs.map(log => log.session_id)).size,
            date_range: {
                first_event: logs[0]?.timestamp,
                last_event: logs[logs.length - 1]?.timestamp
            }
        };
        
        // Agent usage statistics
        const agentCounts = {};
        const themeCounts = {};
        const roleCounts = {};
        const eventCounts = {};
        
        logs.forEach(log => {
            // Count agent usage
            agentCounts[log.agent] = (agentCounts[log.agent] || 0) + 1;
            
            // Count theme usage
            themeCounts[log.theme] = (themeCounts[log.theme] || 0) + 1;
            
            // Count role usage
            roleCounts[log.role] = (roleCounts[log.role] || 0) + 1;
            
            // Count event types
            eventCounts[log.event] = (eventCounts[log.event] || 0) + 1;
        });
        
        // Find most popular items
        summary.most_active_agent = Object.keys(agentCounts).reduce((a, b) => 
            agentCounts[a] > agentCounts[b] ? a : b
        );
        
        summary.popular_themes = Object.entries(themeCounts)
            .sort(([,a], [,b]) => b - a)
            .reduce((obj, [key, val]) => ({ ...obj, [key]: val }), {});
            
        summary.popular_roles = Object.entries(roleCounts)
            .sort(([,a], [,b]) => b - a)
            .reduce((obj, [key, val]) => ({ ...obj, [key]: val }), {});
            
        summary.event_breakdown = Object.entries(eventCounts)
            .sort(([,a], [,b]) => b - a)
            .reduce((obj, [key, val]) => ({ ...obj, [key]: val }), {});
        
        // Recent activity (last 10 events)
        summary.recent_activity = logs.slice(-10).reverse();
        
        return summary;
        
    } catch (error) {
        console.error("AgentX Analytics Summary Error:", error);
        return null;
    }
}

/**
 * Export analytics data for external analysis
 * @param {string} format - Export format ('json' or 'csv')
 */
function exportAgentXAnalytics(format = 'json') {
    try {
        const logs = JSON.parse(localStorage.getItem("agentx-analytics") || "[]");
        
        if (logs.length === 0) {
            alert("No analytics data to export");
            return;
        }
        
        let content, filename, mimeType;
        
        if (format === 'csv') {
            // Convert to CSV
            const headers = Object.keys(logs[0]).join(',');
            const rows = logs.map(log => 
                Object.values(log).map(val => 
                    typeof val === 'string' && val.includes(',') ? `"${val}"` : val
                ).join(',')
            );
            content = [headers, ...rows].join('\n');
            filename = `agentx-analytics-${new Date().toISOString().split('T')[0]}.csv`;
            mimeType = 'text/csv';
        } else {
            // Export as JSON with summary
            const exportData = {
                export_date: new Date().toISOString(),
                summary: getAgentXAnalytics(),
                raw_logs: logs
            };
            content = JSON.stringify(exportData, null, 2);
            filename = `agentx-analytics-${new Date().toISOString().split('T')[0]}.json`;
            mimeType = 'application/json';
        }
        
        // Create and trigger download
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        // Log the export event
        logAgentXEvent("analytics_exported", { format, record_count: logs.length });
        
    } catch (error) {
        console.error("AgentX Analytics Export Error:", error);
        alert("Error exporting analytics data");
    }
}

/**
 * Clear analytics data (with confirmation)
 */
function clearAgentXAnalytics() {
    if (confirm("Are you sure you want to clear all AgentX analytics data? This cannot be undone.")) {
        localStorage.removeItem("agentx-analytics");
        console.log("AgentX Analytics: Data cleared");
        
        // Fire event for UI updates
        document.dispatchEvent(new CustomEvent('agentxAnalyticsCleared'));
    }
}

// Auto-track common events when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    // Track page load
    logAgentXEvent("page_loaded", {
        referrer: document.referrer,
        viewport: `${window.innerWidth}x${window.innerHeight}`
    });
    
    // Track agent profile loads
    document.addEventListener('agentxProfileLoaded', (e) => {
        logAgentXEvent("agent_profile_loaded", {
            agent_name: e.detail?.name,
            has_custom_config: !!e.detail?.name
        });
    });
    
    // Track agent config saves
    document.addEventListener('agentxConfigSaved', (e) => {
        logAgentXEvent("agent_config_saved", {
            agent_name: e.detail?.profile?.name,
            theme: e.detail?.profile?.theme,
            role: e.detail?.profile?.role
        });
    });
    
    // Track exports
    document.addEventListener('agentxExportComplete', (e) => {
        logAgentXEvent("agent_config_exported", {
            export_type: e.detail?.type,
            agent_name: e.detail?.profile?.name
        });
    });
    
    // Track imports
    document.addEventListener('agentxImportComplete', (e) => {
        logAgentXEvent("agent_config_imported", {
            agent_name: e.detail?.profile?.name,
            import_success: e.detail?.success
        });
    });
});

// Track page visibility changes
document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        logAgentXEvent("page_hidden", {
            time_on_page: Date.now() - (window.agentxPageLoadTime || Date.now())
        });
    } else {
        logAgentXEvent("page_visible");
        window.agentxPageLoadTime = Date.now();
    }
});

// Track page unload
window.addEventListener("beforeunload", () => {
    logAgentXEvent("page_unload", {
        time_on_page: Date.now() - (window.agentxPageLoadTime || Date.now())
    });
});

// Initialize page load time tracking
window.agentxPageLoadTime = Date.now();

// Expose global functions
window.logAgentXEvent = logAgentXEvent;
window.getAgentXAnalytics = getAgentXAnalytics;
window.exportAgentXAnalytics = exportAgentXAnalytics;
window.clearAgentXAnalytics = clearAgentXAnalytics;
