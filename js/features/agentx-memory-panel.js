/**
 * AgentX Memory Sync Panel - Trojan Tier 8
 * Centralized interface for memory visibility, agent control, analytics export, and reset flow
 */

function renderAgentXMemoryPanel() {
    const profile = JSON.parse(localStorage.getItem("agentx-profile") || "{}");
    const analytics = JSON.parse(localStorage.getItem("agentx-analytics") || "[]");
    
    // Update profile fields
    document.getElementById("agentx-name").textContent = profile.name || "—";
    document.getElementById("agentx-role").textContent = profile.role || "—";
    document.getElementById("agentx-tone").textContent = profile.tone || "—";
    document.getElementById("agentx-theme").textContent = profile.theme || "—";
    
    // Update analytics summary
    const analyticsCount = document.getElementById("agentx-analytics-count");
    if (analyticsCount) {
        analyticsCount.textContent = analytics.length;
    }
    
    const lastActivity = document.getElementById("agentx-last-activity");
    if (lastActivity && analytics.length > 0) {
        const latest = analytics[analytics.length - 1];
        lastActivity.textContent = new Date(latest.timestamp).toLocaleString();
    } else if (lastActivity) {
        lastActivity.textContent = "No activity";
    }
    
    // Update creation date
    const createdDate = document.getElementById("agentx-created");
    if (createdDate && profile.created) {
        createdDate.textContent = new Date(profile.created).toLocaleDateString();
    } else if (createdDate) {
        createdDate.textContent = "—";
    }
    
    // Log panel access
    if (typeof logAgentXEvent === 'function') {
        logAgentXEvent('memory_panel_opened', {
            agent: profile.name || 'Unconfigured',
            analytics_events: analytics.length
        });
    }
}

function resetAgentX() {
    const confirmed = confirm("⚠️ This will permanently delete your agent profile and all analytics data. Are you sure?");
    
    if (confirmed) {
        // Clear all AgentX data
        localStorage.removeItem("agentx-profile");
        localStorage.removeItem("agentx-analytics");
        localStorage.removeItem("agentx-onboarding-skipped");
        sessionStorage.removeItem("onboarding-prompted");
        sessionStorage.removeItem("agentx-session-id");
        
        // Log reset event before clearing
        if (typeof logAgentXEvent === 'function') {
            logAgentXEvent('agent_reset', {
                timestamp: new Date().toISOString(),
                reset_type: 'complete'
            });
        }
        
        alert("✅ Agent and logs cleared. You'll be prompted to re-onboard on your next visit.");
        
        // Update navigation badge
        if (typeof updateAgentXNav === 'function') {
            updateAgentXNav();
        }
        
        // Close panel and refresh
        closeModal("memory-panel");
        
        // Trigger page refresh to reset all AgentX states
        setTimeout(() => {
            location.reload();
        }, 500);
    }
}

function reOnboardAgent() {
    // Clear onboarding flags to force re-onboarding
    sessionStorage.removeItem("onboarding-prompted");
    localStorage.removeItem("agentx-onboarding-skipped");
    
    // Log re-onboard event
    if (typeof logAgentXEvent === 'function') {
        logAgentXEvent('re_onboard_requested', {
            trigger: 'memory_panel'
        });
    }
    
    // Close memory panel
    closeModal("memory-panel");
    
    // Open AgentX configuration modal
    if (typeof openModal === 'function') {
        openModal('agentx');
    } else {
        // Fallback: trigger onboarding manually
        if (typeof triggerOnboardingPrompt === 'function') {
            triggerOnboardingPrompt();
        } else {
            alert("Please refresh the page to re-configure your agent.");
        }
    }
}

function exportMemorySnapshot() {
    const profile = JSON.parse(localStorage.getItem("agentx-profile") || "{}");
    const analytics = JSON.parse(localStorage.getItem("agentx-analytics") || "[]");
    
    const snapshot = {
        export_type: "memory_snapshot",
        timestamp: new Date().toISOString(),
        agent_profile: profile,
        analytics_summary: {
            total_events: analytics.length,
            first_event: analytics[0]?.timestamp || null,
            last_event: analytics[analytics.length - 1]?.timestamp || null,
            event_types: [...new Set(analytics.map(a => a.event))]
        },
        system_info: {
            user_agent: navigator.userAgent.substring(0, 100),
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            language: navigator.language
        }
    };
    
    const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `agentx-memory-snapshot-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Log export
    if (typeof logAgentXEvent === 'function') {
        logAgentXEvent('memory_snapshot_exported', {
            events_count: analytics.length,
            agent: profile.name || 'Unconfigured'
        });
    }
}

// Initialize memory panel on DOM ready
document.addEventListener("DOMContentLoaded", () => {
    // Hook up memory panel launcher
    const memoryButton = document.querySelector('[data-launch="memory-panel"]');
    if (memoryButton) {
        memoryButton.addEventListener("click", () => {
            renderAgentXMemoryPanel();
            if (typeof openModal === 'function') {
                openModal("memory-panel");
            }
        });
    }
    
    // Hook up reset button if it exists
    const resetButton = document.getElementById('agentx-reset-btn');
    if (resetButton) {
        resetButton.addEventListener('click', resetAgentX);
    }
    
    // Hook up re-onboard button if it exists
    const reOnboardButton = document.getElementById('agentx-reonboard-btn');
    if (reOnboardButton) {
        reOnboardButton.addEventListener('click', reOnboardAgent);
    }
    
    // Hook up memory snapshot export
    const snapshotButton = document.getElementById('agentx-snapshot-btn');
    if (snapshotButton) {
        snapshotButton.addEventListener('click', exportMemorySnapshot);
    }
    
    console.log("🧠 AgentX Memory Sync Panel loaded");
});

// Global functions for external access
window.renderAgentXMemoryPanel = renderAgentXMemoryPanel;
window.resetAgentX = resetAgentX;
window.reOnboardAgent = reOnboardAgent;
window.exportMemorySnapshot = exportMemorySnapshot;
