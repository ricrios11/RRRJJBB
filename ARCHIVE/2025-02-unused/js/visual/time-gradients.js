// time-gradients.js - BULLETPROOF Time-aware gradient system
(function() {
  'use strict';
  
  function applyTimeGradient() {
    const hour = new Date().getHours();
    let timeMode = "";

    // Determine time mode
    if (hour >= 5 && hour < 12) timeMode = "morning";
    else if (hour >= 12 && hour < 17) timeMode = "afternoon";
    else if (hour >= 17 && hour < 22) timeMode = "evening";
    else timeMode = "night";

    // Remove existing time classes
    document.body.classList.remove('time-morning', 'time-afternoon', 'time-evening', 'time-night');
    
    // Apply new time class
    document.body.classList.add(`time-${timeMode}`);
    
    console.log(`🌈 TIME GRADIENTS: Applied time-${timeMode} class at ${hour}:00`);
    console.log(`🎯 Body classes:`, document.body.className);
    
    // Force immediate application
    document.body.style.transition = "all 0.3s ease-in-out";
  }
  
  // Apply immediately if DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyTimeGradient);
  } else {
    applyTimeGradient();
  }
  
  // Also apply on window load as backup
  window.addEventListener('load', applyTimeGradient);
})();
