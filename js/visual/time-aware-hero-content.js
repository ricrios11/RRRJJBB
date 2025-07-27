// time-aware-hero-content.js - Dynamic hero content based on time of day
(function() {
  'use strict';
  
  // Time-aware content configuration
  const timeAwareContent = {
    morning: {
      emoji: '🌅',
      title: 'Fresh vision drives transformation. We architect design systems that define tomorrow.',
      ctaText: 'Start with morning clarity',
      ctaSubtext: 'Begin the Ascent',
      subline: 'Built on proven foundations, energized by new possibilities, always moving forward.',
      keywords: 'Vision • Innovation • Fresh Start • Forward-Thinking',
      timeMessage: 'Morning brings clarity. Perfect time to explore transformative design leadership.',
      greeting: 'Good morning.'
    },
    afternoon: {
      emoji: '☀️',
      title: 'Peak performance meets strategic design. We build systems that scale with ambition.',
      ctaText: 'Engage with proven mastery',
      ctaSubtext: 'Peak Performance',
      subline: 'Forged in high-stakes environments, refined through global collaboration.',
      keywords: 'Performance • Strategy • Scale • Excellence',
      timeMessage: 'Afternoon energy. Ideal for diving deep into strategic design thinking.',
      greeting: 'Good afternoon.'
    },
    evening: {
      emoji: '🌆',
      title: 'Mastery moves when it matters. We build design systems for transformation.',
      ctaText: 'Begin with proven mastery',
      ctaSubtext: 'Begin the Descent',
      subline: 'Built on real-world wins, forged in global teams, and always moving forward.',
      keywords: 'Leadership • Innovation • Future-Aware • Authentically Mine',
      timeMessage: 'Evening brings reflection and clarity. Time to explore thoughtful design leadership.',
      greeting: 'Good evening.'
    },
    night: {
      emoji: '🌙',
      title: 'Deep thinking shapes tomorrow. We craft design systems that endure.',
      ctaText: 'Explore thoughtful mastery',
      ctaSubtext: 'Thoughtful Exploration',
      subline: 'Refined through contemplation, built for lasting impact, always evolving.',
      keywords: 'Depth • Contemplation • Endurance • Wisdom',
      timeMessage: 'Night hours for deep thinkers. Perfect time for contemplative design exploration.',
      greeting: 'Good evening.'
    }
  };
  
  function getTimeMode() {
    const hour = new Date().getHours();
    
    if (hour >= 5 && hour < 12) return 'morning';
    else if (hour >= 12 && hour < 17) return 'afternoon';
    else if (hour >= 17 && hour < 22) return 'evening';
    else return 'night';
  }
  
  function updateHeroContent() {
    const timeMode = getTimeMode();
    const content = timeAwareContent[timeMode];
    
    // Update emoji
    const emojiElement = document.querySelector('.ric-animate-float');
    if (emojiElement) {
      emojiElement.textContent = content.emoji;
    }
    
    // Update main title
    const titleElement = document.getElementById('hero-title-text');
    if (titleElement) {
      titleElement.textContent = content.title;
    }
    
    // Update CTA button text
    const ctaElement = document.getElementById('hero-cta-text');
    if (ctaElement) {
      ctaElement.textContent = content.ctaText;
    }
    
    // Update CTA subtext
    const ctaSubtextElement = document.querySelector('[style*="Begin the Descent"]');
    if (ctaSubtextElement) {
      ctaSubtextElement.textContent = content.ctaSubtext;
    }
    
    // Update subline
    const sublineElement = document.querySelector('p[style*="Built on real-world wins"]');
    if (sublineElement) {
      sublineElement.textContent = content.subline;
    }
    
    // Update keywords
    const keywordsElement = document.getElementById('hero-keywords');
    if (keywordsElement) {
      keywordsElement.textContent = content.keywords;
    }
    
    // Update time-aware message
    const timeMessageElement = document.getElementById('hero-time-message');
    if (timeMessageElement) {
      timeMessageElement.textContent = content.timeMessage;
    }
    
    // Update greeting in about section
    const greetingElement = document.getElementById('about-greeting');
    if (greetingElement) {
      greetingElement.textContent = content.greeting;
    }
    
    // Update mobile greeting
    const mobileGreetingElement = document.getElementById('mobile-greeting');
    if (mobileGreetingElement) {
      mobileGreetingElement.textContent = `${content.greeting} Ready for transformative mastery?`;
    }
    
    console.log(`🎭 TIME-AWARE HERO: Updated content for ${timeMode} mode`);
    console.log(`📝 Title: ${content.title.substring(0, 50)}...`);
    console.log(`🎯 CTA: ${content.ctaText}`);
  }
  
  function addSmoothTransitions() {
    // Add smooth transitions to all time-aware elements
    const elements = [
      '#hero-title-text',
      '#hero-cta-text', 
      '#hero-keywords',
      '#hero-time-message',
      '.ric-animate-float'
    ];
    
    elements.forEach(selector => {
      const element = document.querySelector(selector);
      if (element) {
        element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
      }
    });
  }
  
  // Initialize the system
  function init() {
    addSmoothTransitions();
    updateHeroContent();
    
    // Update content every minute to catch time changes
    setInterval(updateHeroContent, 60000);
  }
  
  // Apply immediately if DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  // Also apply on window load as backup
  window.addEventListener('load', init);
  
  // Expose for manual testing
  window.TimeAwareHeroContent = {
    update: updateHeroContent,
    getTimeMode: getTimeMode,
    content: timeAwareContent
  };
})();
