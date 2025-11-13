// time-aware-content-system.js - Phase 2B: Extended time-aware content for all sections
(function() {
  'use strict';
  
  // Enhanced time-aware content configuration with section-specific adaptations
  const timeAwareContent = {
    morning: {
      // Hero Section
      hero: {
        emoji: '🌅',
        title: 'Fresh vision drives transformation. We architect design systems that define tomorrow.',
        ctaText: 'Start with morning clarity',
        ctaSubtext: 'Begin the Ascent',
        subline: 'Built on proven foundations, energized by new possibilities, always moving forward.',
        keywords: 'Vision • Innovation • Fresh Start • Forward-Thinking',
        timeMessage: 'Morning brings clarity. Perfect time to explore transformative design leadership.',
        greeting: 'Good morning.'
      },
      // About Section
      about: {
        description: 'As morning brings fresh perspective and energy, I bring thinking that connects design, technology, culture, and business outcomes into coherent strategies that define tomorrow\'s standards.',
        subtitle: 'For leaders who understand that exceptional design isn\'t decoration—it\'s competitive advantage. Fresh thinking earned through application, always with relentless curiosity about what\'s possible.',
        contextualMessage: 'Morning energy fuels strategic thinking and visionary planning.'
      },
      // Philosophy Section
      philosophy: {
        title: 'Foundation',
        contextualIntro: 'Morning clarity reveals the fundamental principles that guide transformative design leadership.',
        cards: {
          leadership: {
            title: 'Leadership Architecture',
            content: 'I see the architecture others miss—connecting design, technology, culture, and business outcomes into coherent strategies that create sustainable advantage. Morning clarity reveals the patterns that drive transformation.'
          },
          authority: {
            title: 'Earned Authority',
            content: 'Decades of real-world integration. Every major design book read and applied. Wisdom earned through transforming ambitious vision into measurable results. Fresh perspective guides every decision.'
          },
          innovation: {
            title: 'Future-State Innovation',
            content: 'While others optimize for yesterday\'s metrics, I architect tomorrow\'s realities. Emerging technologies guided by timeless principles, creating lasting impact through visionary thinking.'
          },
          excellence: {
            title: 'Disciplined Excellence',
            content: 'World-class quality through proven methodologies. Rigor that remains human and creatively inspiring. Results that speak louder than trends, energized by fresh possibilities.'
          }
        }
      }
    },
    
    afternoon: {
      // Hero Section
      hero: {
        emoji: '☀️',
        title: 'Peak performance meets strategic design. We build systems that scale with ambition.',
        ctaText: 'Engage with proven mastery',
        ctaSubtext: 'Peak Performance',
        subline: 'Forged in high-stakes environments, refined through global collaboration.',
        keywords: 'Performance • Strategy • Scale • Excellence',
        timeMessage: 'Afternoon energy. Ideal for diving deep into strategic design thinking.',
        greeting: 'Good afternoon.'
      },
      // About Section
      about: {
        description: 'As afternoon brings peak performance and strategic focus, I bring thinking that connects design, technology, culture, and business outcomes into coherent strategies that define tomorrow\'s standards.',
        subtitle: 'For leaders who understand that exceptional design isn\'t decoration—it\'s competitive advantage. Strategic authority earned through application, always with relentless curiosity about what\'s possible.',
        contextualMessage: 'Afternoon focus drives strategic execution and systematic innovation.'
      },
      // Philosophy Section
      philosophy: {
        title: 'Foundation',
        contextualIntro: 'Afternoon focus sharpens the strategic principles that drive systematic innovation.',
        cards: {
          leadership: {
            title: 'Leadership Architecture',
            content: 'I see the architecture others miss—connecting design, technology, culture, and business outcomes into coherent strategies that create sustainable advantage. Strategic focus reveals the systems that scale.'
          },
          authority: {
            title: 'Earned Authority',
            content: 'Decades of real-world integration. Every major design book read and applied. Wisdom earned through transforming ambitious vision into measurable results. Strategic execution guides every decision.'
          },
          innovation: {
            title: 'Future-State Innovation',
            content: 'While others optimize for yesterday\'s metrics, I architect tomorrow\'s realities. Emerging technologies guided by timeless principles, creating lasting impact through strategic innovation.'
          },
          excellence: {
            title: 'Disciplined Excellence',
            content: 'World-class quality through proven methodologies. Rigor that remains human and creatively inspiring. Results that speak louder than trends, driven by strategic performance.'
          }
        }
      }
    },
    
    evening: {
      // Hero Section
      hero: {
        emoji: '🌆',
        title: 'Mastery moves when it matters. We build design systems for transformation.',
        ctaText: 'Begin with proven mastery',
        ctaSubtext: 'Begin the Descent',
        subline: 'Built on real-world wins, forged in global teams, and always moving forward.',
        keywords: 'Leadership • Innovation • Future-Aware • Authentically Mine',
        timeMessage: 'Evening brings reflection and clarity. Time to explore thoughtful design leadership.',
        greeting: 'Good evening.'
      },
      // About Section
      about: {
        description: 'As evening brings reflection and clarity, I bring thinking that connects design, technology, culture, and business outcomes into coherent strategies that define tomorrow\'s standards.',
        subtitle: 'For leaders who understand that exceptional design isn\'t decoration—it\'s competitive advantage. Calm authority earned through application, always with relentless curiosity about what\'s possible.',
        contextualMessage: 'Evening reflection deepens understanding and reveals transformative insights.'
      },
      // Philosophy Section
      philosophy: {
        title: 'Foundation',
        contextualIntro: 'Evening reflection reveals the deeper principles that guide transformative design leadership.',
        cards: {
          leadership: {
            title: 'Leadership Architecture',
            content: 'I see the architecture others miss—connecting design, technology, culture, and business outcomes into coherent strategies that create sustainable advantage. Evening clarity reveals the deeper patterns.'
          },
          authority: {
            title: 'Earned Authority',
            content: 'Decades of real-world integration. Every major design book read and applied. Wisdom earned through transforming ambitious vision into measurable results. Reflective mastery guides every decision.'
          },
          innovation: {
            title: 'Future-State Innovation',
            content: 'While others optimize for yesterday\'s metrics, I architect tomorrow\'s realities. Emerging technologies guided by timeless principles, creating lasting impact through thoughtful innovation.'
          },
          excellence: {
            title: 'Disciplined Excellence',
            content: 'World-class quality through proven methodologies. Rigor that remains human and creatively inspiring. Results that speak louder than trends, refined through reflective practice.'
          }
        }
      }
    },
    
    night: {
      // Hero Section
      hero: {
        emoji: '🌙',
        title: 'Deep thinking shapes tomorrow. We craft design systems that endure.',
        ctaText: 'Explore thoughtful mastery',
        ctaSubtext: 'Thoughtful Exploration',
        subline: 'Refined through contemplation, built for lasting impact, always evolving.',
        keywords: 'Depth • Contemplation • Endurance • Wisdom',
        timeMessage: 'Night hours for deep thinkers. Perfect time for contemplative design exploration.',
        greeting: 'Good evening.'
      },
      // About Section
      about: {
        description: 'As night brings deep contemplation and wisdom, I bring thinking that connects design, technology, culture, and business outcomes into coherent strategies that define tomorrow\'s standards.',
        subtitle: 'For leaders who understand that exceptional design isn\'t decoration—it\'s competitive advantage. Contemplative authority earned through application, always with relentless curiosity about what\'s possible.',
        contextualMessage: 'Night contemplation reveals the profound insights that shape lasting transformation.'
      },
      // Philosophy Section
      philosophy: {
        title: 'Foundation',
        contextualIntro: 'Night contemplation unveils the profound principles that guide enduring design leadership.',
        cards: {
          leadership: {
            title: 'Leadership Architecture',
            content: 'I see the architecture others miss—connecting design, technology, culture, and business outcomes into coherent strategies that create sustainable advantage. Deep contemplation reveals the enduring structures.'
          },
          authority: {
            title: 'Earned Authority',
            content: 'Decades of real-world integration. Every major design book read and applied. Wisdom earned through transforming ambitious vision into measurable results. Contemplative wisdom guides every decision.'
          },
          innovation: {
            title: 'Future-State Innovation',
            content: 'While others optimize for yesterday\'s metrics, I architect tomorrow\'s realities. Emerging technologies guided by timeless principles, creating lasting impact through contemplative innovation.'
          },
          excellence: {
            title: 'Disciplined Excellence',
            content: 'World-class quality through proven methodologies. Rigor that remains human and creatively inspiring. Results that speak louder than trends, deepened through contemplative practice.'
          }
        }
      }
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
    const content = timeAwareContent[timeMode].hero;
    
    // Update emoji
    const emojiElement = document.querySelector('.ric-animate-float');
    if (emojiElement) {
      emojiElement.textContent = content.emoji;
    }
    
    // Update main title with STRICT selector protection
    const titleElement = document.getElementById('hero-title-text');
    if (titleElement && !titleElement.classList.contains('ric-nav-brand-title')) {
      titleElement.textContent = content.title;
    }
    
    // Update CTA button text
    const ctaElement = document.getElementById('hero-cta-text');
    if (ctaElement) {
      ctaElement.textContent = content.ctaText;
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
  }
  
  function updateAboutContent() {
    const timeMode = getTimeMode();
    const content = timeAwareContent[timeMode].about;
    
    // Update about description
    const descriptionElement = document.getElementById('about-description');
    if (descriptionElement) {
      descriptionElement.textContent = content.description;
    }
    
    // Update about subtitle
    const subtitleElement = document.getElementById('about-subtitle');
    if (subtitleElement) {
      subtitleElement.textContent = content.subtitle;
    }
    
    console.log(`📝 TIME-AWARE ABOUT: Updated content for ${timeMode} mode`);
  }
  
  function updatePhilosophyContent() {
    const timeMode = getTimeMode();
    const content = timeAwareContent[timeMode].philosophy;
    
    // Update philosophy title (optional enhancement)
    const titleElement = document.getElementById('philosophy-title');
    if (titleElement) {
      titleElement.textContent = content.title;
    }
    
    // Add contextual intro if element exists
    const introElement = document.getElementById('philosophy-intro');
    if (introElement) {
      introElement.textContent = content.contextualIntro;
    }
    
    // Update philosophy cards with time-aware content
    const cards = document.querySelectorAll('#philosophy .ric-card');
    const cardKeys = ['leadership', 'authority', 'innovation', 'excellence'];
    
    cards.forEach((card, index) => {
      if (cardKeys[index] && content.cards[cardKeys[index]]) {
        const cardContent = content.cards[cardKeys[index]];
        const contentElement = card.querySelector('p');
        if (contentElement) {
          contentElement.textContent = cardContent.content;
        }
      }
    });
    
    console.log(`🏛️ TIME-AWARE PHILOSOPHY: Updated content for ${timeMode} mode`);
  }
  
  function updateAllContent() {
    updateHeroContent();
    updateAboutContent();
    updatePhilosophyContent();
    
    const timeMode = getTimeMode();
    console.log(`🌟 TIME-AWARE SYSTEM: Full content update completed for ${timeMode} mode`);
  }
  
  function addSmoothTransitions() {
    // Add smooth transitions to all time-aware elements
    const elements = [
      '#hero-title-text',
      '#hero-cta-text', 
      '#hero-keywords',
      '#hero-time-message',
      '.ric-animate-float',
      '#about-description',
      '#about-subtitle',
      '#philosophy .ric-card p'
    ];
    
    elements.forEach(selector => {
      const elementList = document.querySelectorAll(selector);
      elementList.forEach(element => {
        if (element) {
          element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        }
      });
    });
  }
  
  // Initialize the enhanced system
  function init() {
    addSmoothTransitions();
    updateAllContent();
    
    // Update content every minute to catch time changes
    setInterval(updateAllContent, 60000);
    
    console.log('🚀 TIME-AWARE CONTENT SYSTEM: Phase 2B initialized - Hero, About, and Philosophy sections now time-aware');
  }
  
  // Apply immediately if DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  // Also apply on window load as backup
  window.addEventListener('load', init);
  
  // Expose enhanced API for manual testing
  window.TimeAwareContentSystem = {
    updateAll: updateAllContent,
    updateHero: updateHeroContent,
    updateAbout: updateAboutContent,
    updatePhilosophy: updatePhilosophyContent,
    getTimeMode: getTimeMode,
    content: timeAwareContent
  };
})();
