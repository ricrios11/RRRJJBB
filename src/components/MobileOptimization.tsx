import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useIsMobile } from './ui/use-mobile';

// Enhanced mobile detection with device capabilities
export function useDeviceCapabilities() {
  const [capabilities, setCapabilities] = useState(() => ({
    isMobile: false,
    isTablet: false,
    isTouch: false,
    isRetina: false,
    connectionSpeed: 'unknown' as 'slow' | 'fast' | 'unknown',
    reducedMotion: false,
    screenSize: { width: 0, height: 0 }
  }));

  // More aggressive debouncing for better performance
  const debouncedUpdate = useCallback(() => {
    let timeoutId: NodeJS.Timeout;
    
    const updateCapabilities = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setCapabilities(prev => {
        // Only update if values actually changed
        const newCapabilities = {
          isMobile: width < 768,
          isTablet: width >= 768 && width < 1024,
          isTouch: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
          isRetina: window.devicePixelRatio > 1,
          connectionSpeed: (navigator as any).connection?.effectiveType === '4g' ? 'fast' : 
                          (navigator as any).connection?.effectiveType === '3g' ? 'slow' : 'unknown',
          reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
          screenSize: { width, height }
        };
        
        // Deep comparison to prevent unnecessary updates
        if (JSON.stringify(prev) === JSON.stringify(newCapabilities)) {
          return prev;
        }
        
        return newCapabilities;
      });
    };

    return () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateCapabilities, 200); // Increased debounce time
    };
  }, []);

  useEffect(() => {
    const update = debouncedUpdate();
    update(); // Initial call
    
    window.addEventListener('resize', update, { passive: true });
    window.addEventListener('orientationchange', update, { passive: true });

    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('orientationchange', update);
    };
  }, [debouncedUpdate]);

  return capabilities;
}

// Optimized performance monitoring with reduced overhead
export function usePerformanceMonitor() {
  const [metrics, setMetrics] = useState({
    fps: 60,
    memoryUsage: 0,
    renderTime: 0
  });

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animationId: number;
    
    // Increased throttling for better performance
    let lastUpdate = 0;
    const UPDATE_INTERVAL = 2000; // Reduced frequency

    const measureFPS = (currentTime: number) => {
      frameCount++;
      
      if (currentTime >= lastTime + UPDATE_INTERVAL && currentTime >= lastUpdate + UPDATE_INTERVAL) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        frameCount = 0;
        lastTime = currentTime;
        lastUpdate = currentTime;
        
        setMetrics(prev => ({
          ...prev,
          fps,
          memoryUsage: (performance as any).memory?.usedJSHeapSize || 0,
          renderTime: currentTime
        }));
      }
      
      animationId = requestAnimationFrame(measureFPS);
    };

    // Only monitor performance in development
    if (process.env.NODE_ENV === 'development') {
      animationId = requestAnimationFrame(measureFPS);
    }
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return metrics;
}

// Scroll-aware intersection observer that prevents layout shifts
const intersectionObservers = new Map<string, IntersectionObserver>();
const intersectionCallbacks = new WeakMap<Element, (isVisible: boolean, scrollDirection: 'up' | 'down') => void>();

// Enhanced global throttling with scroll direction tracking
let isThrottling = false;
let pendingCallbacks: Array<() => void> = [];
let lastScrollY = 0;
let scrollDirection: 'up' | 'down' = 'down';

// Track scroll direction for better UX
const updateScrollDirection = () => {
  const currentScrollY = window.scrollY;
  scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
  lastScrollY = currentScrollY;
};

const flushThrottledCallbacks = () => {
  if (isThrottling) return;
  
  isThrottling = true;
  requestAnimationFrame(() => {
    updateScrollDirection();
    const callbacks = pendingCallbacks.splice(0);
    callbacks.forEach(callback => callback());
    isThrottling = false;
  });
};

export function useOptimizedIntersection(
  options: IntersectionObserverInit = {}
) {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollDir, setScrollDir] = useState<'up' | 'down'>('down');
  const elementRef = useRef<HTMLElement>(null);
  const capabilities = useDeviceCapabilities();

  // Optimized root margins based on scroll direction and device
  const observerKey = useMemo(() => {
    return JSON.stringify({
      rootMargin: options.rootMargin || (capabilities.isMobile ? '50px 0px 150px 0px' : '100px 0px 200px 0px'),
      threshold: options.threshold || 0.1 // Slightly higher threshold for better control
    });
  }, [options.rootMargin, options.threshold, capabilities.isMobile]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Get or create shared observer
    let observer = intersectionObservers.get(observerKey);
    
    if (!observer) {
      const optimizedOptions = {
        ...options,
        rootMargin: options.rootMargin || (capabilities.isMobile ? '50px 0px 150px 0px' : '100px 0px 200px 0px'),
        threshold: options.threshold || 0.1
      };

      observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const callback = intersectionCallbacks.get(entry.target);
          if (callback) {
            // Enhanced throttling with scroll direction awareness
            pendingCallbacks.push(() => {
              callback(entry.isIntersecting, scrollDirection);
            });
            flushThrottledCallbacks();
          }
        });
      }, optimizedOptions);

      intersectionObservers.set(observerKey, observer);
    }

    // Enhanced callback with scroll direction
    const enhancedCallback = (visible: boolean, direction: 'up' | 'down') => {
      setIsVisible(visible);
      setScrollDir(direction);
    };

    intersectionCallbacks.set(element, enhancedCallback);
    observer.observe(element);

    return () => {
      if (observer && element) {
        observer.unobserve(element);
        intersectionCallbacks.delete(element);
      }
    };
  }, [observerKey, capabilities.isMobile, options]);

  return { elementRef, isVisible, scrollDirection: scrollDir };
}

// Touch-optimized components with memoization
interface TouchOptimizedProps {
  children: React.ReactNode;
  onTap?: () => void;
  className?: string;
  disabled?: boolean;
}

export const TouchOptimized = React.memo(React.forwardRef<HTMLDivElement, TouchOptimizedProps>(
  ({ children, onTap, className = '', disabled = false }, ref) => {
    const [isPressed, setIsPressed] = useState(false);
    const capabilities = useDeviceCapabilities();

    const handleTouchStart = useCallback(() => {
      if (!disabled && capabilities.isTouch) {
        setIsPressed(true);
      }
    }, [disabled, capabilities.isTouch]);

    const handleTouchEnd = useCallback(() => {
      setIsPressed(false);
      if (!disabled && onTap) {
        onTap();
      }
    }, [disabled, onTap]);

    const touchStyles = useMemo(() => 
      capabilities.isTouch ? {
        minHeight: '44px',
        minWidth: '44px',
        cursor: 'pointer',
        userSelect: 'none' as const,
        WebkitTapHighlightColor: 'transparent'
      } : {}, 
      [capabilities.isTouch]
    );

    return (
      <div
        ref={ref}
        className={`${className} ${isPressed ? 'scale-95' : ''} transition-transform duration-100`}
        style={touchStyles}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={() => !capabilities.isTouch && setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
      >
        {children}
      </div>
    );
  }
));

TouchOptimized.displayName = 'TouchOptimized';

// Scroll-aware lazy loading that prevents layout shifts
interface LazyComponentProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  threshold?: number;
  preserveHeight?: boolean;
}

export const LazyComponent = React.memo(React.forwardRef<HTMLDivElement, LazyComponentProps>(
  ({ children, fallback = null, threshold = 0.1, preserveHeight = true }, forwardedRef) => {
    const { elementRef, isVisible, scrollDirection } = useOptimizedIntersection({ threshold });
    const capabilities = useDeviceCapabilities();
    const [hasLoaded, setHasLoaded] = useState(false);
    const [estimatedHeight, setEstimatedHeight] = useState<number | null>(null);
    
    // Load content immediately if scrolling up (user going back)
    const shouldLoad = useMemo(() => {
      if (hasLoaded) return true;
      if (isVisible) {
        setHasLoaded(true);
        return true;
      }
      return false;
    }, [isVisible, hasLoaded]);

    // Measure content height when it loads to prevent layout shifts
    const contentRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
      if (shouldLoad && contentRef.current && !estimatedHeight) {
        const height = contentRef.current.scrollHeight;
        setEstimatedHeight(height);
      }
    }, [shouldLoad, estimatedHeight]);

    const combinedRef = useCallback((node: HTMLDivElement | null) => {
      elementRef.current = node;
      if (typeof forwardedRef === 'function') {
        forwardedRef(node);
      } else if (forwardedRef) {
        forwardedRef.current = node;
      }
    }, [elementRef, forwardedRef]);

    // Skeleton/placeholder with estimated height to prevent layout shifts
    const placeholder = useMemo(() => {
      if (fallback) return fallback;
      if (!preserveHeight) return null;
      
      return (
        <div 
          style={{ 
            height: estimatedHeight || 'auto',
            minHeight: estimatedHeight ? undefined : '100px'
          }}
          className="bg-muted/30 animate-pulse rounded"
        />
      );
    }, [fallback, preserveHeight, estimatedHeight]);

    return (
      <div ref={combinedRef}>
        {shouldLoad ? (
          <div ref={contentRef}>
            {children}
          </div>
        ) : placeholder}
      </div>
    );
  }
));

LazyComponent.displayName = 'LazyComponent';

// Scroll-aware animation that prevents disorientation
interface MobileAnimationProps {
  children: React.ReactNode;
  animation?: 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight';
  delay?: number;
  className?: string;
}

export const MobileAnimation = React.memo(React.forwardRef<HTMLDivElement, MobileAnimationProps>(
  ({ children, animation = 'fadeUp', delay = 0, className = '' }, forwardedRef) => {
    const capabilities = useDeviceCapabilities();
    const { elementRef, isVisible, scrollDirection } = useOptimizedIntersection();
    const [hasAnimated, setHasAnimated] = useState(false);

    // Immediate animation for upward scrolling to prevent disorientation
    const shouldAnimate = useMemo(() => {
      if (capabilities.reducedMotion) return false;
      if (capabilities.connectionSpeed === 'slow' && capabilities.isMobile) return false;
      return true;
    }, [capabilities.reducedMotion, capabilities.connectionSpeed, capabilities.isMobile]);

    // Smart animation timing based on scroll direction
    const effectiveDelay = useMemo(() => {
      if (!shouldAnimate) return 0;
      if (scrollDirection === 'up') return Math.min(delay, 50); // Faster for upward scroll
      if (hasAnimated) return 0; // No delay for subsequent views
      return Math.min(delay, 200); // Cap delay for better UX
    }, [shouldAnimate, scrollDirection, hasAnimated, delay]);

    useEffect(() => {
      if (isVisible && !hasAnimated) {
        setHasAnimated(true);
      }
    }, [isVisible, hasAnimated]);

    // Simplified animation classes optimized for performance
    const animationClasses = useMemo(() => {
      if (!shouldAnimate) {
        return 'translate-y-0 opacity-100';
      }
      
      const isAnimated = isVisible || hasAnimated;
      const classes = {
        fadeUp: isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0',
        fadeIn: isAnimated ? 'opacity-100' : 'opacity-0',
        slideLeft: isAnimated ? 'translate-x-0 opacity-100' : 'translate-x-1 opacity-0',
        slideRight: isAnimated ? 'translate-x-0 opacity-100' : '-translate-x-1 opacity-0'
      };
      return classes[animation];
    }, [shouldAnimate, isVisible, hasAnimated, animation]);

    // Optimized duration based on device capabilities
    const duration = useMemo(() => {
      if (!shouldAnimate) return 'duration-0';
      if (capabilities.isMobile) return 'duration-150';
      if (scrollDirection === 'up') return 'duration-200';
      return 'duration-300';
    }, [shouldAnimate, capabilities.isMobile, scrollDirection]);

    const combinedRef = useCallback((node: HTMLDivElement | null) => {
      elementRef.current = node;
      if (typeof forwardedRef === 'function') {
        forwardedRef(node);
      } else if (forwardedRef) {
        forwardedRef.current = node;
      }
    }, [elementRef, forwardedRef]);

    return (
      <div
        ref={combinedRef}
        className={`transition-all ${duration} ease-out will-change-transform ${animationClasses} ${className}`}
        style={{ 
          transitionDelay: `${effectiveDelay}ms`,
          transform: 'translateZ(0)', // Force GPU acceleration
          contain: 'layout style paint' // Optimize rendering
        }}
      >
        {children}
      </div>
    );
  }
));

MobileAnimation.displayName = 'MobileAnimation';