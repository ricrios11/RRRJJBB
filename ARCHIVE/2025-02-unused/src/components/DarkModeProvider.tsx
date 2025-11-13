import { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { useOptimizedTimeOfDay } from './TimeAwareContent';

interface DarkModeContextType {
  isDark: boolean;
  toggleDarkMode: () => void;
  isAutoMode: boolean;
  setAutoMode: (auto: boolean) => void;
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

// Optimized localStorage utilities
const storage = {
  get: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set: (key: string, value: string): void => {
    try {
      localStorage.setItem(key, value);
    } catch {
      // Silently fail in environments without localStorage
    }
  }
};

export function DarkModeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  const [isAutoMode, setIsAutoMode] = useState(true);
  const [manualOverride, setManualOverride] = useState<boolean | null>(null);
  const [mounted, setMounted] = useState(false);
  const { shouldUseDarkMode } = useOptimizedTimeOfDay();

  // Initialize state on mount
  useEffect(() => {
    setMounted(true);
    
    // Check for saved preferences
    const savedMode = storage.get('darkMode');
    const savedAutoMode = storage.get('autoMode');
    
    if (savedAutoMode === 'false') {
      setIsAutoMode(false);
      setManualOverride(savedMode === 'true');
    } else {
      setIsAutoMode(true);
      setManualOverride(null);
    }
  }, []);

  // Handle theme changes - optimized with fewer dependencies
  useEffect(() => {
    if (!mounted) return;
    
    const newDarkState = isAutoMode && manualOverride === null 
      ? shouldUseDarkMode 
      : manualOverride ?? false;
    
    setIsDark(newDarkState);
  }, [shouldUseDarkMode, isAutoMode, manualOverride, mounted]);

  // Apply theme to document with optimized DOM manipulation
  useEffect(() => {
    if (!mounted) return;
    
    const root = document.documentElement;
    
    // Batch DOM updates
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    // Batch localStorage updates
    storage.set('darkMode', isDark.toString());
    storage.set('autoMode', isAutoMode.toString());
  }, [isDark, isAutoMode, mounted]);

  // Memoize callbacks to prevent unnecessary re-renders
  const toggleDarkMode = useCallback(() => {
    if (isAutoMode) {
      setIsAutoMode(false);
      setManualOverride(!isDark);
    } else {
      setManualOverride(!isDark);
    }
  }, [isAutoMode, isDark]);

  const setAutoMode = useCallback((auto: boolean) => {
    setIsAutoMode(auto);
    if (auto) {
      setManualOverride(null);
      setIsDark(shouldUseDarkMode);
    }
  }, [shouldUseDarkMode]);

  // Memoize context value with all dependencies
  const contextValue: DarkModeContextType = useMemo(() => ({
    isDark,
    toggleDarkMode,
    isAutoMode,
    setAutoMode
  }), [isDark, toggleDarkMode, isAutoMode, setAutoMode]);

  return (
    <DarkModeContext.Provider value={contextValue}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error(
      'useDarkMode must be used within a DarkModeProvider. ' +
      'Make sure your component is wrapped with <DarkModeProvider>.'
    );
  }
  return context;
}