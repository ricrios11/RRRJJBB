// agentx-preview.js - AI Agent Personalization Preview System
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector('[data-launch="agentx"]');
  if (!btn) return;

  btn.addEventListener("click", () => {
    console.log("🧠 AgentX: Preview launch triggered.");
    openModal("agentx");
    // Future: Load YAML dynamically, allow selection
  });
});
