// hero-transitions.js - Smooth hero loading animation
document.addEventListener("DOMContentLoaded", () => {
  const hero = document.getElementById("hero");
  if (hero) {
    // Ensure hero starts in hidden state
    hero.style.opacity = "0";
    hero.style.transform = "translateY(24px)";
    hero.style.transition = "all 0.8s ease-in-out";
    
    // Soft load-in delay for smooth appearance
    setTimeout(() => {
      hero.classList.add("loaded");
      hero.style.opacity = "1";
      hero.style.transform = "translateY(0)";
    }, 250);
    
    console.log("💫 HERO ANIMATION: Load transition initiated");
  }
});
