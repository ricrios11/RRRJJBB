import React, { createContext, useContext, useState, useCallback } from 'react';

interface KonamiCodeContextType {
  triggerUnlock: () => void;
  hideGame: () => void;
  resetSequence: () => void;
  resetToLocked: () => void;
  isUnlocked: boolean;
  showSnakeGame: boolean;
  isTransitioning: boolean;
}

const KonamiCodeContext = createContext<KonamiCodeContextType | null>(null);

export function useKonamiCode() {
  const context = useContext(KonamiCodeContext);
  if (!context) {
    throw new Error('useKonamiCode must be used within a KonamiCodeProvider');
  }
  return context;
}

interface KonamiCodeProviderProps {
  children: React.ReactNode;
}

export function KonamiCodeProvider({ children }: KonamiCodeProviderProps) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showSnakeGame, setShowSnakeGame] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const triggerUnlock = useCallback(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("🎮 TechOS: Konami sequence unlocked!");
    }
    setIsUnlocked(true);
    // Use a shorter delay for better UX
    setTimeout(() => setShowSnakeGame(true), 600);
  }, []);

  const hideGame = useCallback(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("🎮 TechOS: Hiding Snake game gracefully");
    }
    setIsTransitioning(true);
    
    // Smooth transition: hide game first
    setShowSnakeGame(false);
    
    // Then fade out the unlocked state
    setTimeout(() => {
      setIsUnlocked(false);
      setIsTransitioning(false);
    }, 300);
  }, []);

  const resetSequence = useCallback(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("🎮 TechOS: Resetting game sequence");
    }
    setIsTransitioning(true);
    setShowSnakeGame(false);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  }, []);

  const resetToLocked = useCallback(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("🎮 TechOS: Full reset to locked state");
    }
    setIsTransitioning(true);
    setShowSnakeGame(false);
    
    setTimeout(() => {
      setIsUnlocked(false);
      setIsTransitioning(false);
    }, 400);
  }, []);

  const contextValue = {
    triggerUnlock,
    hideGame,
    resetSequence,
    resetToLocked,
    isUnlocked,
    showSnakeGame,
    isTransitioning
  };

  return (
    <KonamiCodeContext.Provider value={contextValue}>
      {children}
    </KonamiCodeContext.Provider>
  );
}