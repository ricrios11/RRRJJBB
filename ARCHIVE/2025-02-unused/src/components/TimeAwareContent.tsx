import { useState, useEffect, useMemo, useCallback } from 'react';

type TimeOfDay = 'morning' | 'afternoon' | 'evening';

// Optimized time calculation - memoized and cached
const getTimeOfDay = (): TimeOfDay => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 18) return 'afternoon';
  return 'evening';
};

// Singleton time manager to avoid multiple intervals
class TimeManager {
  private static instance: TimeManager;
  private listeners: Set<(timeOfDay: TimeOfDay) => void> = new Set();
  private currentTime: TimeOfDay = getTimeOfDay();
  private intervalId: NodeJS.Timeout | null = null;

  static getInstance(): TimeManager {
    if (!TimeManager.instance) {
      TimeManager.instance = new TimeManager();
    }
    return TimeManager.instance;
  }

  private constructor() {
    this.startInterval();
  }

  private startInterval = () => {
    if (this.intervalId) return;
    
    this.intervalId = setInterval(() => {
      const newTime = getTimeOfDay();
      if (newTime !== this.currentTime) {
        this.currentTime = newTime;
        this.notifyListeners();
      }
    }, 60000); // Check every minute
  };

  private stopInterval = () => {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  };

  private notifyListeners = () => {
    this.listeners.forEach(listener => listener(this.currentTime));
  };

  subscribe = (listener: (timeOfDay: TimeOfDay) => void): (() => void) => {
    this.listeners.add(listener);
    
    // Start interval when first listener is added
    if (this.listeners.size === 1) {
      this.startInterval();
    }
    
    // Return unsubscribe function
    return () => {
      this.listeners.delete(listener);
      // Stop interval when no listeners remain
      if (this.listeners.size === 0) {
        this.stopInterval();
      }
    };
  };

  getCurrentTime = (): TimeOfDay => this.currentTime;
}

export function useTimeOfDay(): TimeOfDay {
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>(() => getTimeOfDay());

  useEffect(() => {
    const manager = TimeManager.getInstance();
    
    // Set initial time
    setTimeOfDay(manager.getCurrentTime());
    
    // Subscribe to changes
    const unsubscribe = manager.subscribe(setTimeOfDay);
    
    return unsubscribe;
  }, []);

  return timeOfDay;
}

interface TimeAwareTextProps {
  morning: string;
  afternoon: string;
  evening: string;
  className?: string;
}

export const TimeAwareText = ({ morning, afternoon, evening, className }: TimeAwareTextProps) => {
  const timeOfDay = useTimeOfDay();
  
  // Memoize content selection to prevent unnecessary re-renders
  const content = useMemo(() => {
    const contentMap = { morning, afternoon, evening };
    return contentMap[timeOfDay];
  }, [timeOfDay, morning, afternoon, evening]);

  return <span className={className}>{content}</span>;
};

interface TimeAwareGreetingProps {
  name?: string;
  className?: string;
}

export const TimeAwareGreeting = ({ name, className }: TimeAwareGreetingProps) => {
  const timeOfDay = useTimeOfDay();
  
  // Memoize greeting generation
  const greeting = useMemo(() => {
    const greetings = {
      morning: `Good morning${name ? `, ${name}` : ''}.`,
      afternoon: `Good afternoon${name ? `, ${name}` : ''}.`,
      evening: `Good evening${name ? `, ${name}` : ''}.`
    };
    return greetings[timeOfDay];
  }, [timeOfDay, name]);

  return <span className={className}>{greeting}</span>;
};

// Export optimized time manager for other components
export const useOptimizedTimeOfDay = () => {
  const timeOfDay = useTimeOfDay();
  
  // Memoize time-based calculations
  const timeConfig = useMemo(() => ({
    timeOfDay,
    isDaytime: timeOfDay === 'morning' || timeOfDay === 'afternoon',
    isEvening: timeOfDay === 'evening',
    shouldUseDarkMode: timeOfDay === 'evening'
  }), [timeOfDay]);

  return timeConfig;
};