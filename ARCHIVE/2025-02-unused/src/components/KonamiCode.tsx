import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { TimeAwareText, useTimeOfDay } from './TimeAwareContent';
import { MobileAnimation, TouchOptimized, useDeviceCapabilities } from './MobileOptimization';
import { SnakeGame } from './SnakeGame';
import { useKonamiCode } from './KonamiCodeContext';
import { X, RotateCcw } from 'lucide-react';

const KONAMI_SEQUENCE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'KeyB', 'KeyA'
];

const TOUCH_SEQUENCE = ['↑', '↑', '↓', '↓', '←', '→', '←', '→', 'B', 'A'];

export function KonamiCode() {
  const [sequence, setSequence] = useState<string[]>([]);
  const [touchSequence, setTouchSequence] = useState<string[]>([]);
  const [showTouchInput, setShowTouchInput] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const timeOfDay = useTimeOfDay();
  const capabilities = useDeviceCapabilities();
  
  // Enhanced context with graceful state management
  const { 
    isUnlocked, 
    showSnakeGame, 
    isTransitioning,
    triggerUnlock, 
    hideGame, 
    resetSequence, 
    resetToLocked 
  } = useKonamiCode();

  // Handle keyboard input with ESC key support
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // ESC key to close game
      if (event.code === 'Escape' && (isUnlocked || showSnakeGame)) {
        event.preventDefault();
        hideGame();
        return;
      }

      if (showSnakeGame) return; // Don't interfere with game controls
      
      // Check if this key is part of the Konami sequence
      const isKonamiKey = KONAMI_SEQUENCE.includes(event.code);
      
      // For arrow keys and B/A keys, prevent default behavior to avoid scrolling
      if (isKonamiKey && (
        event.code.startsWith('Arrow') || 
        event.code === 'KeyB' || 
        event.code === 'KeyA'
      )) {
        event.preventDefault();
        event.stopPropagation();
      }
      
      // Clear any existing timeout
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      
      setSequence(prev => {
        const newSequence = [...prev, event.code];
        
        // Keep only the last 10 keys
        if (newSequence.length > KONAMI_SEQUENCE.length) {
          newSequence.shift();
        }
        
        // Check if sequence matches
        if (newSequence.length === KONAMI_SEQUENCE.length &&
            newSequence.every((key, index) => key === KONAMI_SEQUENCE[index])) {
          triggerUnlock();
          return [];
        }
        
        // Check if we're on the right track
        const isCorrectSoFar = newSequence.every((key, index) => key === KONAMI_SEQUENCE[index]);
        
        if (!isCorrectSoFar) {
          // Reset sequence if wrong key is pressed
          return [];
        }
        
        // Set timeout to reset sequence if user doesn't continue
        const newTimeoutId = setTimeout(() => {
          setSequence([]);
          setTimeoutId(null);
        }, 5000); // 5 second timeout
        
        setTimeoutId(newTimeoutId);
        
        return newSequence;
      });
    };

    // Use capture phase to intercept events before they reach other handlers
    window.addEventListener('keydown', handleKeyDown, { capture: true });
    return () => window.removeEventListener('keydown', handleKeyDown, { capture: true });
  }, [showSnakeGame, timeoutId, triggerUnlock, isUnlocked, hideGame]);

  // Handle touch input
  const handleTouchInput = (input: string) => {
    if (showSnakeGame) return;
    
    setTouchSequence(prev => {
      const newSequence = [...prev, input];
      
      // Keep only the last 10 inputs
      if (newSequence.length > TOUCH_SEQUENCE.length) {
        newSequence.shift();
      }
      
      // Check if sequence matches
      if (newSequence.length === TOUCH_SEQUENCE.length &&
          newSequence.every((symbol, index) => symbol === TOUCH_SEQUENCE[index])) {
        triggerUnlock();
        return [];
      }
      
      return newSequence;
    });
  };

  const resetTouchSequence = () => {
    setTouchSequence([]);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  // Active Snake Game State
  if (isUnlocked && showSnakeGame) {
    return (
      <MobileAnimation 
        animation="fadeIn" 
        className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
      >
        <div className="text-center py-8 sm:py-12 border border-border rounded-lg bg-muted relative">
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg sm:text-xl text-foreground">
                <TimeAwareText
                  morning="Morning Innovation Laboratory"
                  afternoon="Strategic Prototype Space"
                  evening="Evening Experimental Archive"
                />
              </h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto px-4">
                A minimalist Snake game—where systematic precision meets playful discovery.
              </p>
            </div>
            
            <SnakeGame />
            
            {/* Enhanced control buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center items-center pt-2">
              <Button 
                onClick={hideGame}
                variant="ghost" 
                size="sm"
                className="text-xs hover:bg-accent group"
                title="Close game and return to portfolio (ESC)"
              >
                <X className="w-3 h-3 mr-1 group-hover:rotate-90 transition-transform duration-200" />
                Close Game
              </Button>
              
              <Button 
                onClick={resetSequence}
                variant="ghost" 
                size="sm"
                className="text-xs hover:bg-accent group"
                title="Reset game state"
              >
                <RotateCcw className="w-3 h-3 mr-1 group-hover:rotate-180 transition-transform duration-200" />
                Reset
              </Button>
            </div>
            
            <div className="text-xs text-muted-foreground/70">
              Press ESC or click Close Game to return to portfolio
            </div>
          </div>
        </div>
      </MobileAnimation>
    );
  }

  // Unlocked State (Loading Game)
  if (isUnlocked) {
    return (
      <MobileAnimation 
        animation="fadeIn"
        className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
      >
        <div className="text-center py-8 sm:py-12 border border-green-200 dark:border-green-800 rounded-lg bg-green-50 dark:bg-green-950/30">
          <div className="text-4xl sm:text-5xl mb-4">🎮</div>
          <h3 className="text-lg sm:text-xl mb-3 sm:mb-4 text-green-800 dark:text-green-200">
            <TimeAwareText
              morning="Morning Laboratory Access Granted"
              afternoon="Strategic Innovation Space Unlocked"
              evening="Evening Archive Access Granted"
            />
          </h3>
          <p className="text-sm sm:text-base text-green-700 dark:text-green-300 mb-6 max-w-2xl mx-auto leading-relaxed px-4">
            Welcome to my private innovation space. Here, strategic design thinking meets 
            playful experimentation—bridging the systematic with the unexpected.
          </p>
          <div className="text-sm text-green-600 dark:text-green-400 animate-pulse">
            <TimeAwareText
              morning="Loading morning experimental prototype..."
              afternoon="Initializing strategic prototype..."
              evening="Accessing evening innovation archive..."
            />
          </div>
          
          {/* Quick exit option during loading */}
          <div className="mt-4">
            <Button 
              onClick={resetToLocked}
              variant="ghost" 
              size="sm"
              className="text-xs text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30"
            >
              Cancel
            </Button>
          </div>
        </div>
      </MobileAnimation>
    );
  }

  // Default Locked State
  return (
    <MobileAnimation animation="fadeUp" delay={100}>
      <div className="text-center py-8 sm:py-12 border border-border rounded-lg bg-muted">
        <h3 className="text-lg sm:text-xl mb-3 sm:mb-4 text-foreground">
          <TimeAwareText
            morning="Morning Innovation Laboratory"
            afternoon="Strategic Prototype Laboratory"
            evening="Evening Innovation Archive"
          />
        </h3>
        <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 max-w-2xl mx-auto leading-relaxed px-4">
          <TimeAwareText
            morning="Where I prototype the next 5 years of design innovation—morning experiments that bridge timeless craft with emerging possibility."
            afternoon="This is where strategic design thinking meets systematic experimentation—prototypes that define tomorrow's standards."
            evening="Evening wisdom meets forward-looking innovation—three decades of mastery applied to future-state prototyping."
          />
        </p>
        
        {/* Desktop: Keyboard instruction */}
        {!capabilities.isTouch && (
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground font-mono">
              ↑↑↓↓←→←→BA
            </div>
            <div className="text-xs text-muted-foreground/70">
              Classic sequence unlocks the laboratory
            </div>
            {/* Progress indicator for keyboard input */}
            {sequence.length > 0 && (
              <div className="flex justify-center gap-1 mt-3">
                {KONAMI_SEQUENCE.map((expectedKey, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                      sequence[index] === expectedKey
                        ? 'bg-green-500'
                        : sequence.length > index
                        ? 'bg-red-500'
                        : 'bg-muted-foreground/30'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
        
        {/* Mobile: Touch interface */}
        {capabilities.isTouch && (
          <div className="space-y-4">
            {!showTouchInput ? (
              <TouchOptimized onTap={() => setShowTouchInput(true)}>
                <Button variant="outline" size="sm" className="border-border">
                  <TimeAwareText
                    morning="Access morning laboratory"
                    afternoon="Unlock prototype space"
                    evening="Access evening archive"
                  />
                </Button>
              </TouchOptimized>
            ) : (
              <div className="space-y-4 px-4">
                {/* Touch sequence display */}
                <div className="flex flex-wrap justify-center gap-1 mb-4">
                  {TOUCH_SEQUENCE.map((symbol, index) => (
                    <div
                      key={index}
                      className={`w-8 h-8 flex items-center justify-center text-xs border rounded transition-colors duration-200 ${
                        touchSequence[index] === symbol
                          ? 'bg-green-100 border-green-300 dark:bg-green-900/30 dark:border-green-700'
                          : touchSequence.length > index
                          ? 'bg-red-100 border-red-300 dark:bg-red-900/30 dark:border-red-700'
                          : 'bg-secondary border-border'
                      }`}
                    >
                      {symbol}
                    </div>
                  ))}
                </div>
                
                {/* Touch input grid */}
                <div className="grid grid-cols-3 gap-2 max-w-48 mx-auto">
                  <div></div>
                  <TouchOptimized onTap={() => handleTouchInput('↑')}>
                    <button className="w-12 h-12 bg-secondary hover:bg-accent rounded flex items-center justify-center text-lg transition-colors touch-manipulation">
                      ↑
                    </button>
                  </TouchOptimized>
                  <div></div>
                  
                  <TouchOptimized onTap={() => handleTouchInput('←')}>
                    <button className="w-12 h-12 bg-secondary hover:bg-accent rounded flex items-center justify-center text-lg transition-colors touch-manipulation">
                      ←
                    </button>
                  </TouchOptimized>
                  <TouchOptimized onTap={() => handleTouchInput('↓')}>
                    <button className="w-12 h-12 bg-secondary hover:bg-accent rounded flex items-center justify-center text-lg transition-colors touch-manipulation">
                      ↓
                    </button>
                  </TouchOptimized>
                  <TouchOptimized onTap={() => handleTouchInput('→')}>
                    <button className="w-12 h-12 bg-secondary hover:bg-accent rounded flex items-center justify-center text-lg transition-colors touch-manipulation">
                      →
                    </button>
                  </TouchOptimized>
                </div>
                
                {/* B and A buttons */}
                <div className="flex justify-center gap-4 mt-4">
                  <TouchOptimized onTap={() => handleTouchInput('B')}>
                    <button className="w-12 h-12 bg-blue-200 dark:bg-blue-800 rounded flex items-center justify-center text-lg hover:bg-blue-300 dark:hover:bg-blue-700 transition-colors touch-manipulation">
                      B
                    </button>
                  </TouchOptimized>
                  <TouchOptimized onTap={() => handleTouchInput('A')}>
                    <button className="w-12 h-12 bg-red-200 dark:bg-red-800 rounded flex items-center justify-center text-lg hover:bg-red-300 dark:hover:bg-red-700 transition-colors touch-manipulation">
                      A
                    </button>
                  </TouchOptimized>
                </div>
                
                <TouchOptimized onTap={resetTouchSequence}>
                  <Button variant="ghost" size="sm" className="text-xs">
                    Reset Sequence
                  </Button>
                </TouchOptimized>
              </div>
            )}
          </div>
        )}
      </div>
    </MobileAnimation>
  );
}