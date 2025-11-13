import { useCallback, useEffect } from 'react';

// Centralized navigation configuration - single source of truth
export const NAVIGATION_CONFIG = [
  { id: 'about', label: 'Operating System', href: '#about' },
  { id: 'philosophy', label: 'Philosophy', href: '#philosophy' },
  { id: 'focus', label: 'Innovation Lab', href: '#focus' },
  { id: 'toolkit', label: 'Toolkit', href: '#toolkit' },
  { id: 'case-studies', label: 'Case Studies', href: '#case-studies' },
  { id: 'hidden-lab', label: 'Laboratory', href: '#hidden-lab' }
] as const;

// Enhanced scroll utility with bulletproof implementation
export function useBulletproofNavigation() {
  // Add CSS scroll behavior if not present
  useEffect(() => {
    // Ensure smooth scrolling is enabled globally
    if (typeof document !== 'undefined') {
      const html = document.documentElement;
      if (!html.style.scrollBehavior) {
        html.style.scrollBehavior = 'smooth';
      }
    }
  }, []);

  const scrollToSection = useCallback((targetId: string, options?: {
    offset?: number;
    callback?: () => void;
    force?: boolean;
  }) => {
    return new Promise<void>((resolve) => {
      console.log(`🎯 TechOS: Attempting navigation to section "${targetId}"`);
      
      // Use requestAnimationFrame for better timing
      requestAnimationFrame(() => {
        let target = document.getElementById(targetId);
        
        if (target) {
          console.log(`✅ TechOS: Found target "${targetId}" immediately`);
          performScroll(target, options, resolve);
        } else {
          console.warn(`⚠️ TechOS: Target "${targetId}" not found, waiting for lazy load...`);
          
          // Enhanced fallback - try multiple times with different delays
          const attempts = [100, 300, 600, 1000];
          
          const tryFindTarget = (attemptIndex: number) => {
            if (attemptIndex >= attempts.length) {
              console.error(`❌ TechOS: Target "${targetId}" not found after all attempts`);
              fallbackScroll(targetId, options, resolve);
              return;
            }
            
            setTimeout(() => {
              target = document.getElementById(targetId);
              if (target) {
                console.log(`✅ TechOS: Found target "${targetId}" after ${attempts[attemptIndex]}ms delay`);
                performScroll(target, options, resolve);
              } else {
                tryFindTarget(attemptIndex + 1);
              }
            }, attempts[attemptIndex]);
          };
          
          tryFindTarget(0);
        }
      });
    });
  }, []);

  const performScroll = (target: HTMLElement, options?: {
    offset?: number;
    callback?: () => void;
  }, resolve?: () => void) => {
    const headerOffset = options?.offset ?? 100;
    const elementPosition = target.offsetTop;
    const offsetPosition = Math.max(0, elementPosition - headerOffset);
    
    // Get current scroll position
    const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
    const scrollDistance = Math.abs(offsetPosition - currentScrollY);
    
    console.log(`📍 TechOS: Scrolling to ${target.id} at position ${offsetPosition} (distance: ${scrollDistance}px)`);
    
    if (scrollDistance > 10) { // Reduced threshold for more responsive scrolling
      // Use multiple scroll methods for maximum compatibility
      try {
        // Method 1: Modern smooth scroll
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        // Method 2: Also try scrollIntoView for better browser support
        setTimeout(() => {
          if (Math.abs(window.scrollY - offsetPosition) > 50) {
            console.log(`🔄 TechOS: Backup scroll method for ${target.id}`);
            target.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'start',
              inline: 'nearest'
            });
          }
        }, 100);
        
      } catch (e) {
        console.warn(`⚠️ TechOS: Scroll error for ${target.id}, trying fallback`, e);
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      
      // Calculate timing based on distance
      const scrollDuration = Math.min(300 + (scrollDistance / 8), 600); // Faster scrolling
      
      setTimeout(() => {
        console.log(`✅ TechOS: Scroll to ${target.id} completed`);
        options?.callback?.();
        resolve?.();
      }, scrollDuration);
    } else {
      console.log(`📍 TechOS: Already near ${target.id}, triggering callback`);
      options?.callback?.();
      resolve?.();
    }
  };

  const fallbackScroll = (targetId: string, options?: {
    offset?: number;
    callback?: () => void;
  }, resolve?: () => void) => {
    console.log(`🔄 TechOS: Fallback scroll for ${targetId}`);
    
    // Intelligent fallback based on section order
    const sectionIndex = NAVIGATION_CONFIG.findIndex(section => section.id === targetId);
    let estimatedPosition = 0;
    
    if (sectionIndex >= 0) {
      // Calculate position based on typical section heights
      const sectionHeights = {
        'about': window.innerHeight * 0.8,
        'philosophy': window.innerHeight * 1.2,
        'focus': window.innerHeight * 0.8,
        'toolkit': window.innerHeight * 1.0,
        'case-studies': window.innerHeight * 2.0, // Larger section
        'hidden-lab': window.innerHeight * 0.8
      };
      
      for (let i = 0; i < sectionIndex; i++) {
        const sectionId = NAVIGATION_CONFIG[i].id as keyof typeof sectionHeights;
        estimatedPosition += sectionHeights[sectionId] || window.innerHeight;
      }
      
      // Add hero section height
      estimatedPosition += window.innerHeight * 1.2;
    }
    
    console.log(`📍 TechOS: Fallback scroll to estimated position ${estimatedPosition} for ${targetId}`);
    
    try {
      window.scrollTo({
        top: estimatedPosition,
        behavior: 'smooth'
      });
    } catch (e) {
      console.warn(`⚠️ TechOS: Fallback scroll error`, e);
      // Last resort - instant scroll
      window.scrollTo(0, estimatedPosition);
    }
    
    setTimeout(() => {
      options?.callback?.();
      resolve?.();
    }, 400);
  };

  return { scrollToSection, NAVIGATION_CONFIG };
}

// Bulletproof navigation link component
interface BulletproofNavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  offset?: number;
}

export function BulletproofNavLink({ 
  href, 
  children, 
  className = '', 
  onClick,
  offset 
}: BulletproofNavLinkProps) {
  const { scrollToSection } = useBulletproofNavigation();
  
  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    const targetId = href.replace('#', '');
    console.log(`🎯 TechOS: Navigation link clicked for "${targetId}"`);
    
    // Call onClick first (for menu closing, etc.)
    if (onClick) {
      console.log(`🎯 TechOS: Executing onClick callback first`);
      onClick();
    }
    
    // Small delay if onClick provided to allow UI updates
    const delay = onClick ? 150 : 50; // Slightly longer delay for menu close
    
    setTimeout(() => {
      console.log(`🎯 TechOS: Initiating scroll to "${targetId}" after ${delay}ms delay`);
      scrollToSection(targetId, { offset }).catch(error => {
        console.error(`❌ TechOS: Navigation failed for "${targetId}"`, error);
      });
    }, delay);
  }, [href, scrollToSection, onClick, offset]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const targetId = href.replace('#', '');
      console.log(`⌨️ TechOS: Keyboard navigation to "${targetId}"`);
      handleClick(e as any);
    }
  }, [handleClick, href]);

  return (
    <a 
      href={href} 
      onClick={handleClick} 
      className={className}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {children}
    </a>
  );
}

// Hook for button navigation (non-link elements)
export function useBulletproofButtonNavigation() {
  const { scrollToSection } = useBulletproofNavigation();
  
  const navigateToSection = useCallback((targetId: string, options?: {
    offset?: number;
    callback?: () => void;
  }) => {
    console.log(`🎯 TechOS: Button navigation to "${targetId}"`);
    return scrollToSection(targetId, options);
  }, [scrollToSection]);
  
  return { navigateToSection };
}