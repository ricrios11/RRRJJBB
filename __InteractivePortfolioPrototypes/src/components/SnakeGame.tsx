import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Position = { x: number; y: number };

interface TimeTheme {
  name: string;
  mood: string;
  bgColor: string;
  snakeColor: string;
  foodColor: string;
  gridColor: string;
  textColor: string;
  accentColor: string;
  glowEffect: string;
}

interface SnakeGameProps {
  onAchievement?: (achievement: {
    type: 'snake_score';
    title: string;
    description: string;
    data: any;
  }) => void;
}

const getTimeTheme = (): TimeTheme => {
  const hour = new Date().getHours();
  
  if (hour >= 6 && hour < 18) {
    return {
      name: 'Dawn',
      mood: 'Fresh pixels grow\nIn morning light dancing\nSnake seeks the sun',
      bgColor: 'bg-emerald-50',
      snakeColor: 'bg-emerald-500',
      foodColor: 'bg-red-500',
      gridColor: 'border-emerald-200',
      textColor: 'text-emerald-700',
      accentColor: 'bg-emerald-100',
      glowEffect: 'shadow-emerald-200'
    };
  } else if (hour >= 18 && hour < 22) {
    return {
      name: 'Dusk',
      mood: 'Neon trails blaze\nEvening whispers of play\nGolden hour games',
      bgColor: 'bg-orange-50',
      snakeColor: 'bg-orange-500 shadow-orange-300 shadow-lg',
      foodColor: 'bg-pink-500 shadow-pink-300 shadow-lg',
      gridColor: 'border-orange-200',
      textColor: 'text-orange-700',
      accentColor: 'bg-orange-100',
      glowEffect: 'shadow-orange-300'
    };
  } else {
    return {
      name: 'Midnight',
      mood: 'Cyber dreams flow\nPixels dance in darkness\nNight serpent hunts',
      bgColor: 'bg-slate-800',
      snakeColor: 'bg-cyan-400 shadow-cyan-300 shadow-lg',
      foodColor: 'bg-violet-400 shadow-violet-300 shadow-lg',
      gridColor: 'border-slate-600',
      textColor: 'text-cyan-300',
      accentColor: 'bg-slate-700',
      glowEffect: 'shadow-cyan-300'
    };
  }
};

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_FOOD = { x: 15, y: 15 };
const MILESTONE_SCORES = [50, 100, 200, 350, 500];

export function SnakeGame({ onAchievement }: SnakeGameProps) {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameOver'>('idle');
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Position>(INITIAL_FOOD);
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [score, setScore] = useState(0);
  const [theme, setTheme] = useState(getTimeTheme());
  const [showMilestone, setShowMilestone] = useState(false);
  const [isGoldenApple, setIsGoldenApple] = useState(false);
  const [snakeBlinking, setSnakeBlinking] = useState(false);
  const [showArrowDance, setShowArrowDance] = useState(false);

  // Blink effect for idle snake
  useEffect(() => {
    if (gameState === 'idle') {
      const blinkInterval = setInterval(() => {
        setSnakeBlinking(true);
        setTimeout(() => setSnakeBlinking(false), 200);
      }, 3000);
      return () => clearInterval(blinkInterval);
    }
  }, [gameState]);

  // Update theme every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setTheme(getTimeTheme());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const generateFood = useCallback((snakeBody: Position[]): Position => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      };
    } while (snakeBody.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    
    // Check if this should be a golden apple (rare occurrence or milestone approach)
    const nearMilestone = MILESTONE_SCORES.some(milestone => 
      score >= milestone - 20 && score < milestone
    );
    setIsGoldenApple(nearMilestone && Math.random() < 0.3);
    
    return newFood;
  }, [score]);

  const checkMilestone = useCallback((newScore: number) => {
    const reachedMilestone = MILESTONE_SCORES.find(milestone => 
      score < milestone && newScore >= milestone
    );
    
    if (reachedMilestone) {
      setShowMilestone(true);
      setTimeout(() => setShowMilestone(false), 2000);
      
      // Trigger achievement
      if (onAchievement) {
        let title = '';
        let description = '';
        
        if (reachedMilestone === 50) {
          title = 'First Hunt Complete';
          description = 'Scored 50+ points in Snake!';
        } else if (reachedMilestone === 100) {
          title = 'Snake Apprentice';
          description = 'Mastered the basics with 100+ points';
        } else if (reachedMilestone === 200) {
          title = 'Serpent Master';
          description = 'Legendary 200+ point achievement';
        } else if (reachedMilestone >= 350) {
          title = 'Pixel Legend';
          description = `Incredible ${reachedMilestone}+ point mastery`;
        }
        
        onAchievement({
          type: 'snake_score',
          title,
          description,
          data: { score: reachedMilestone, theme: theme.name }
        });
      }
    }
  }, [score, onAchievement, theme.name]);

  const moveSnake = useCallback(() => {
    if (gameState !== 'playing') return;

    setSnake(currentSnake => {
      const newSnake = [...currentSnake];
      const head = { ...newSnake[0] };

      switch (direction) {
        case 'UP': head.y -= 1; break;
        case 'DOWN': head.y += 1; break;
        case 'LEFT': head.x -= 1; break;
        case 'RIGHT': head.x += 1; break;
      }

      // Check collision with walls
      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        setGameState('gameOver');
        return currentSnake;
      }

      // Check collision with self
      if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameState('gameOver');
        return currentSnake;
      }

      newSnake.unshift(head);

      // Check if food is eaten
      if (head.x === food.x && head.y === food.y) {
        const points = isGoldenApple ? 25 : 10;
        const newScore = score + points;
        setScore(newScore);
        checkMilestone(newScore);
        setFood(generateFood(newSnake));
        
        // Golden apple achievement
        if (isGoldenApple && onAchievement) {
          onAchievement({
            type: 'snake_score',
            title: 'Golden Feast',
            description: 'Caught a rare golden apple!',
            data: { type: 'golden_apple', theme: theme.name }
          });
        }
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameState, generateFood, score, isGoldenApple, checkMilestone, onAchievement, theme.name]);

  // Game loop
  useEffect(() => {
    if (gameState === 'playing') {
      const speed = score > 100 ? 120 : score > 50 ? 130 : 150; // Speed increases with score
      const interval = setInterval(moveSnake, speed);
      return () => clearInterval(interval);
    }
  }, [moveSnake, gameState, score]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameState !== 'playing') return;

      switch (e.key) {
        case 'ArrowUp': if (direction !== 'DOWN') setDirection('UP'); break;
        case 'ArrowDown': if (direction !== 'UP') setDirection('DOWN'); break;
        case 'ArrowLeft': if (direction !== 'RIGHT') setDirection('LEFT'); break;
        case 'ArrowRight': if (direction !== 'LEFT') setDirection('RIGHT'); break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction, gameState]);

  const startGame = () => {
    setGameState('playing');
    setSnake(INITIAL_SNAKE);
    setFood(INITIAL_FOOD);
    setDirection('RIGHT');
    setScore(0);
    setIsGoldenApple(false);
  };

  const resetGame = () => {
    setGameState('idle');
    setSnake(INITIAL_SNAKE);
    setFood(INITIAL_FOOD);
    setDirection('RIGHT');
    setScore(0);
    setIsGoldenApple(false);
  };

  const getGameOverMessage = () => {
    if (score >= 200) return { title: "Serpent Legend!", msg: "You've mastered the ancient art" };
    if (score >= 100) return { title: "Snake Master!", msg: "The pixels bow to your skill" };
    if (score >= 50) return { title: "Getting Warmer!", msg: "The snake spirit awakens" };
    return { title: "First Hunt", msg: "Every master started here" };
  };

  return (
    <div className={`${theme.bgColor} rounded-xl p-6 transition-all duration-1000 relative overflow-hidden`}>
      {/* Milestone Celebration */}
      <AnimatePresence>
        {showMilestone && (
          <motion.div
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0, rotate: 180 }}
            className="absolute inset-0 z-50 flex items-center justify-center"
          >
            <div className={`${theme.accentColor} p-6 rounded-2xl border-4 border-dashed ${theme.textColor} text-center`}>
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="text-4xl mb-2"
              >
                🏆
              </motion.div>
              <div className={`font-mono ${theme.textColor}`}>
                Achievement Unlocked!
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <motion.h2 
            animate={{ 
              textShadow: gameState === 'playing' 
                ? `0 0 10px ${theme.glowEffect}` 
                : 'none' 
            }}
            className={`text-2xl font-mono font-bold ${theme.textColor}`}
          >
            Snake On
          </motion.h2>
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: gameState === 'playing' ? [0, 5, -5, 0] : 0
            }}
            transition={{ 
              scale: { repeat: Infinity, duration: 2 },
              rotate: { repeat: Infinity, duration: 3 }
            }}
            className={`px-3 py-1 rounded-full text-sm font-mono ${theme.accentColor} ${theme.textColor} border border-current`}
          >
            {theme.name} Mode
          </motion.div>
        </div>
        
        <div className={`text-xl font-mono ${theme.textColor} flex items-center gap-2`}>
          <span>Feast Score:</span>
          <motion.span 
            key={score}
            initial={{ scale: 1.5, color: isGoldenApple ? '#FFD700' : 'inherit' }}
            animate={{ scale: 1, color: 'inherit' }}
            className="font-bold"
          >
            {score}
          </motion.span>
          {isGoldenApple && <span className="text-yellow-500">✨</span>}
        </div>
      </div>

      {/* Game Area */}
      <div className="flex flex-col lg:flex-row gap-6 items-center">
        {/* Grid */}
        <div className={`relative ${theme.accentColor} p-4 rounded-lg`}>
          <motion.div 
            animate={{ 
              boxShadow: gameState === 'playing' 
                ? `inset 0 0 20px ${theme.glowEffect}` 
                : 'none' 
            }}
            className="grid grid-cols-20 gap-px w-80 h-80 md:w-96 md:h-96 rounded-lg overflow-hidden"
          >
            {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
              const x = index % GRID_SIZE;
              const y = Math.floor(index / GRID_SIZE);
              const isSnake = snake.some(segment => segment.x === x && segment.y === y);
              const isHead = snake[0]?.x === x && snake[0]?.y === y;
              const isFood = food.x === x && food.y === y;

              return (
                <motion.div
                  key={index}
                  className={`w-4 h-4 border ${theme.gridColor} relative ${
                    isSnake
                      ? `${theme.snakeColor} ${isHead ? 'rounded-md' : 'rounded-sm'}`
                      : isFood
                      ? `${isGoldenApple ? 'bg-yellow-400' : theme.foodColor} rounded-full`
                      : 'bg-transparent'
                  }`}
                  initial={isFood ? { scale: 0 } : {}}
                  animate={isFood ? { 
                    scale: 1,
                    rotate: isGoldenApple ? [0, 360] : 0
                  } : {}}
                  transition={{ 
                    type: 'spring', 
                    stiffness: 300,
                    rotate: { duration: 2, repeat: Infinity, ease: "linear" }
                  }}
                >
                  {/* Snake Eyes */}
                  {isHead && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div 
                        animate={{ 
                          scaleY: snakeBlinking ? 0.1 : 1 
                        }}
                        transition={{ duration: 0.1 }}
                        className="flex gap-1"
                      >
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                      </motion.div>
                    </div>
                  )}
                  
                  {/* Golden Apple Sparkle */}
                  {isFood && isGoldenApple && (
                    <motion.div
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="absolute -top-1 -right-1 text-xs"
                    >
                      ✨
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
          
          {/* Game Over Overlay */}
          {gameState === 'gameOver' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg"
            >
              <motion.div 
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                className={`${theme.accentColor} p-6 rounded-lg text-center border-2 ${theme.textColor}`}
              >
                <h3 className={`text-xl font-bold ${theme.textColor} mb-2`}>
                  {getGameOverMessage().title}
                </h3>
                <p className={`${theme.textColor} opacity-75 mb-4`}>
                  {getGameOverMessage().msg}
                </p>
                <p className={`text-sm ${theme.textColor} opacity-60 mb-4`}>
                  Final Feast: {score}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetGame}
                  className={`px-6 py-2 ${theme.snakeColor} text-white rounded-lg hover:opacity-90 transition-all font-mono`}
                >
                  Hunt Again
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-6">
          {gameState === 'idle' && (
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={startGame}
              className={`px-8 py-4 ${theme.snakeColor} text-white rounded-lg font-mono text-lg shadow-lg hover:shadow-xl transition-all duration-200 relative overflow-hidden`}
            >
              <motion.div
                animate={{ x: [-100, 100] }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              />
              🐍 Let's Snake
            </motion.button>
          )}

          {gameState === 'playing' && (
            <motion.div 
              onHoverStart={() => setShowArrowDance(true)}
              onHoverEnd={() => setShowArrowDance(false)}
              className={`${theme.accentColor} p-4 rounded-lg border border-current/20`}
            >
              <h4 className={`font-mono ${theme.textColor} mb-3`}>Dance Moves:</h4>
              <div className="grid grid-cols-3 gap-2 w-32">
                <div></div>
                <motion.kbd 
                  animate={{ 
                    y: showArrowDance ? [-2, 2, -2] : 0,
                    scale: showArrowDance ? [1, 1.1, 1] : 1
                  }}
                  transition={{ repeat: showArrowDance ? Infinity : 0, duration: 0.6 }}
                  className="p-2 bg-white rounded text-center text-sm shadow-sm"
                >
                  ↑
                </motion.kbd>
                <div></div>
                <motion.kbd 
                  animate={{ 
                    x: showArrowDance ? [-2, 2, -2] : 0,
                    scale: showArrowDance ? [1, 1.1, 1] : 1
                  }}
                  transition={{ repeat: showArrowDance ? Infinity : 0, duration: 0.6, delay: 0.1 }}
                  className="p-2 bg-white rounded text-center text-sm shadow-sm"
                >
                  ←
                </motion.kbd>
                <motion.kbd 
                  animate={{ 
                    y: showArrowDance ? [2, -2, 2] : 0,
                    scale: showArrowDance ? [1, 1.1, 1] : 1
                  }}
                  transition={{ repeat: showArrowDance ? Infinity : 0, duration: 0.6, delay: 0.2 }}
                  className="p-2 bg-white rounded text-center text-sm shadow-sm"
                >
                  ↓
                </motion.kbd>
                <motion.kbd 
                  animate={{ 
                    x: showArrowDance ? [2, -2, 2] : 0,
                    scale: showArrowDance ? [1, 1.1, 1] : 1
                  }}
                  transition={{ repeat: showArrowDance ? Infinity : 0, duration: 0.6, delay: 0.3 }}
                  className="p-2 bg-white rounded text-center text-sm shadow-sm"
                >
                  →
                </motion.kbd>
              </div>
            </motion.div>
          )}

          <motion.div 
            animate={{ 
              backgroundImage: gameState === 'playing' 
                ? `linear-gradient(45deg, ${theme.accentColor}, ${theme.accentColor})` 
                : 'none' 
            }}
            className={`${theme.accentColor} p-4 rounded-lg border border-current/10`}
          >
            <h4 className={`font-mono ${theme.textColor} mb-2`}>Current Vibe:</h4>
            <motion.p 
              key={theme.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-sm ${theme.textColor} opacity-75 whitespace-pre-line font-mono leading-relaxed`}
            >
              {theme.mood}
            </motion.p>
          </motion.div>

          {/* Hidden speed indicator for advanced players */}
          {score > 50 && gameState === 'playing' && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`${theme.accentColor} p-3 rounded-lg border border-current/20`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-sm font-mono ${theme.textColor}`}>Velocity:</span>
                <div className="flex gap-1">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        (score > 50 && i <= 1) || (score > 100 && i <= 2) || (score > 150 && i <= 3)
                          ? theme.snakeColor
                          : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}