// theme-sync-validator.js - Gradient + Content Parity Validator
document.addEventListener("DOMContentLoaded", () => {
  const currentGradient = document.body.getAttribute("data-time-gradient");
  const heroText = document.getElementById("hero")?.innerText.toLowerCase();

  const expected = {
    morning: "chaos",
    afternoon: "strategy", 
    evening: "transformation",
    night: "vision"
  };

  if (heroText && expected[currentGradient] && !heroText.includes(expected[currentGradient])) {
    console.warn(`❌ THEME PARITY WARNING: Hero text may not match expected tone for ${currentGradient}`);
  } else {
    console.log("✅ THEME PARITY: Hero and gradient aligned.");
  }
});
