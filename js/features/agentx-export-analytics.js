/**
 * 📥 AgentX Analytics Export System - Trojan Tier 7
 * Provides data portability for analytics logs and agent profiles
 */

/**
 * Download AgentX analytics as JSON file
 */
function downloadAgentXAnalytics() {
    const logs = localStorage.getItem("agentx-analytics");
    if (!logs) {
        alert("No analytics data to export. Start using AgentX features to generate analytics.");
        return;
    }

    try {
        // Validate JSON before export
        const parsedLogs = JSON.parse(logs);
        
        // Create export metadata
        const exportData = {
            export_timestamp: new Date().toISOString(),
            export_version: "1.0",
            agent_profile: JSON.parse(localStorage.getItem("agentx-profile") || "{}"),
            analytics_count: parsedLogs.length,
            session_id: sessionStorage.getItem("agentx-session-id"),
            analytics_data: parsedLogs
        };

        const blob = new Blob([JSON.stringify(exportData, null, 2)], { 
            type: "application/json" 
        });
        
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = `agentx-analytics-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        
        // Clean up
        URL.revokeObjectURL(a.href);
        
        // Log export event
        if (typeof logAgentXEvent === 'function') {
            logAgentXEvent('analytics_exported', {
                export_count: parsedLogs.length,
                export_format: 'json'
            });
        }
        
        console.log('✅ AgentX Analytics exported successfully');
        
    } catch (error) {
        console.error('❌ Error exporting analytics:', error);
        alert('Error exporting analytics data. Please try again.');
    }
}

/**
 * Download AgentX profile as JSON file
 */
function downloadAgentXProfile() {
    const profile = localStorage.getItem("agentx-profile");
    if (!profile) {
        alert("No agent profile to export. Configure your agent first.");
        return;
    }

    try {
        const parsedProfile = JSON.parse(profile);
        
        const exportData = {
            export_timestamp: new Date().toISOString(),
            export_version: "1.0",
            export_type: "agent_profile",
            profile: parsedProfile
        };

        const blob = new Blob([JSON.stringify(exportData, null, 2)], { 
            type: "application/json" 
        });
        
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = `agentx-profile-${parsedProfile.name || 'unnamed'}.json`;
        a.click();
        
        // Clean up
        URL.revokeObjectURL(a.href);
        
        // Log export event
        if (typeof logAgentXEvent === 'function') {
            logAgentXEvent('profile_exported', {
                agent_name: parsedProfile.name,
                export_format: 'json'
            });
        }
        
        console.log('✅ AgentX Profile exported successfully');
        
    } catch (error) {
        console.error('❌ Error exporting profile:', error);
        alert('Error exporting profile data. Please try again.');
    }
}

/**
 * Download complete AgentX data package
 */
function downloadAgentXComplete() {
    const profile = localStorage.getItem("agentx-profile");
    const analytics = localStorage.getItem("agentx-analytics");
    
    if (!profile && !analytics) {
        alert("No AgentX data to export. Configure your agent and use features first.");
        return;
    }

    try {
        const exportData = {
            export_timestamp: new Date().toISOString(),
            export_version: "1.0",
            export_type: "complete_package",
            session_id: sessionStorage.getItem("agentx-session-id"),
            agent_profile: profile ? JSON.parse(profile) : null,
            analytics_data: analytics ? JSON.parse(analytics) : [],
            system_info: {
                user_agent: navigator.userAgent,
                page_url: window.location.href,
                local_time: new Date().toLocaleString()
            }
        };

        const blob = new Blob([JSON.stringify(exportData, null, 2)], { 
            type: "application/json" 
        });
        
        const agentName = exportData.agent_profile?.name || 'unnamed';
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = `agentx-complete-${agentName}-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        
        // Clean up
        URL.revokeObjectURL(a.href);
        
        // Log export event
        if (typeof logAgentXEvent === 'function') {
            logAgentXEvent('complete_export', {
                agent_name: agentName,
                analytics_count: exportData.analytics_data.length,
                export_format: 'json'
            });
        }
        
        console.log('✅ Complete AgentX data package exported successfully');
        
    } catch (error) {
        console.error('❌ Error exporting complete data:', error);
        alert('Error exporting complete data package. Please try again.');
    }
}

// Global function exposure
window.downloadAgentXAnalytics = downloadAgentXAnalytics;
window.downloadAgentXProfile = downloadAgentXProfile;
window.downloadAgentXComplete = downloadAgentXComplete;

console.log('📥 AgentX Export Analytics system loaded');
