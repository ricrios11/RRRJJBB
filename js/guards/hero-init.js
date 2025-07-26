// hero-init.js - PROTECTION GUARD (NOT DESTROYER)
console.log("🔍 DEBUG: Hero guard script is loading...");
document.addEventListener("DOMContentLoaded", () => {
  console.log("🛡️ HERO GUARD: Initializing protection system...");
  
  const heroContainer = document.getElementById("hero");
  if (!heroContainer) {
    console.error("❌ HERO GUARD: #hero container not found.");
    return;
  }

  // Find the hero title text element (don't destroy the structure!)
  const heroTitleText = document.getElementById("hero-title-text") || 
                       document.querySelector("#hero .ric-hero-title") ||
                       document.querySelector("#hero h1");

  if (!heroTitleText) {
    console.warn("⚠️ HERO GUARD: Hero title element not found, hero structure may be corrupted");
    return;
  }

  // Time-aware message logic
  const hour = new Date().getHours();
  let message = "";

  if (hour >= 5 && hour < 12) {
    message = "Design clarity that cuts through chaos. Start aligned to what matters.";
  } else if (hour >= 12 && hour < 17) {
    message = "Systems-led strategy that scales. Stay sharp in pivotal design moments.";
  } else if (hour >= 17 && hour < 22) {
    message = "Mastery moves when it matters. We build design systems for transformation.";
  } else {
    message = "End your day where vision meets execution. Trojan-tested, Director-approved.";
  }

  // PROTECT: Only update the text content, preserve all structure
  heroTitleText.textContent = message;
  
  console.log("✅ HERO GUARD: Protection active, headline updated safely");
  console.log("🎯 HERO GUARD: Structure preserved, content protected");
});
