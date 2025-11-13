import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import {
  useDeviceCapabilities,
  TouchOptimized,
} from "./MobileOptimization";
import { Button } from "./ui/button";

interface Position {
  x: number;
  y: number;
}

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

const GRID_SIZE = 15;
const INITIAL_SNAKE = [{ x: 7, y: 7 }];
const INITIAL_DIRECTION: Direction = "RIGHT";
const GAME_SPEED = 150;

export const SnakeGame = React.memo(() => {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Position>({ x: 10, y: 10 });
  const [direction, setDirection] = useState<Direction>(
    INITIAL_DIRECTION,
  );
  const [gameState, setGameState] = useState<
    "playing" | "paused" | "gameOver" | "waiting"
  >("waiting");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    try {
      return parseInt(
        localStorage.getItem("snakeHighScore") || "0",
      );
    } catch {
      return 0;
    }
  });

  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);
  const capabilities = useDeviceCapabilities();

  // Generate random food position
  const generateFood = useCallback(
    (currentSnake: Position[]): Position => {
      let newFood: Position;
      do {
        newFood = {
          x: Math.floor(Math.random() * GRID_SIZE),
          y: Math.floor(Math.random() * GRID_SIZE),
        };
      } while (
        currentSnake.some(
          (segment) =>
            segment.x === newFood.x && segment.y === newFood.y,
        )
      );
      return newFood;
    },
    [],
  );

  // Check collision
  const checkCollision = useCallback(
    (head: Position, body: Position[]): boolean => {
      // Wall collision
      if (
        head.x < 0 ||
        head.x >= GRID_SIZE ||
        head.y < 0 ||
        head.y >= GRID_SIZE
      ) {
        return true;
      }
      // Self collision
      return body.some(
        (segment) =>
          segment.x === head.x && segment.y === head.y,
      );
    },
    [],
  );

  // Move snake
  const moveSnake = useCallback(() => {
    setSnake((currentSnake) => {
      if (currentSnake.length === 0) return currentSnake;

      const head = currentSnake[0];
      const newHead: Position = { ...head };

      switch (direction) {
        case "UP":
          newHead.y -= 1;
          break;
        case "DOWN":
          newHead.y += 1;
          break;
        case "LEFT":
          newHead.x -= 1;
          break;
        case "RIGHT":
          newHead.x += 1;
          break;
      }

      // Check collision
      if (checkCollision(newHead, currentSnake)) {
        setGameState("gameOver");
        return currentSnake;
      }

      const newSnake = [newHead, ...currentSnake];

      // Check food collision
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore((prev) => prev + 10);
        setFood(generateFood(newSnake));
        return newSnake;
      }

      return newSnake.slice(0, -1);
    });
  }, [direction, food, checkCollision, generateFood]);

  // Game loop
  useEffect(() => {
    if (gameState === "playing") {
      gameLoopRef.current = setInterval(moveSnake, GAME_SPEED);
    } else {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
        gameLoopRef.current = null;
      }
    }

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [gameState, moveSnake]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameState !== "playing") return;

      const key = e.key.toLowerCase();
      const code = e.code;

      // Check if this is a game control key
      const isGameKey =
        code === "ArrowUp" ||
        code === "ArrowDown" ||
        code === "ArrowLeft" ||
        code === "ArrowRight" ||
        key === "w" ||
        key === "a" ||
        key === "s" ||
        key === "d";

      if (!isGameKey) return;

      const newDirection: Direction | null =
        code === "ArrowUp" || key === "w"
          ? "UP"
          : code === "ArrowDown" || key === "s"
            ? "DOWN"
            : code === "ArrowLeft" || key === "a"
              ? "LEFT"
              : code === "ArrowRight" || key === "d"
                ? "RIGHT"
                : null;

      if (newDirection) {
        e.preventDefault();
        e.stopPropagation();

        setDirection((prev) => {
          // Prevent reverse direction
          if (
            (prev === "UP" && newDirection === "DOWN") ||
            (prev === "DOWN" && newDirection === "UP") ||
            (prev === "LEFT" && newDirection === "RIGHT") ||
            (prev === "RIGHT" && newDirection === "LEFT")
          ) {
            return prev;
          }
          return newDirection;
        });
      }
    };

    // Use capture phase to ensure game gets priority when playing
    window.addEventListener("keydown", handleKeyPress, {
      capture: true,
    });
    return () =>
      window.removeEventListener("keydown", handleKeyPress, {
        capture: true,
      });
  }, [gameState]);

  // Handle touch direction
  const handleTouchDirection = useCallback(
    (newDirection: Direction) => {
      if (gameState !== "playing") return;

      setDirection((prev) => {
        // Prevent reverse direction
        if (
          (prev === "UP" && newDirection === "DOWN") ||
          (prev === "DOWN" && newDirection === "UP") ||
          (prev === "LEFT" && newDirection === "RIGHT") ||
          (prev === "RIGHT" && newDirection === "LEFT")
        ) {
          return prev;
        }
        return newDirection;
      });
    },
    [gameState],
  );

  // Start game
  const startGame = useCallback(() => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(generateFood(INITIAL_SNAKE));
    setScore(0);
    setGameState("playing");
  }, [generateFood]);

  // Pause/Resume game
  const togglePause = useCallback(() => {
    setGameState((prev) =>
      prev === "playing" ? "paused" : "playing",
    );
  }, []);

  // Reset game
  const resetGame = useCallback(() => {
    setGameState("waiting");
    setScore(0);
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood({ x: 10, y: 10 });
  }, []);

  // Update high score
  useEffect(() => {
    if (gameState === "gameOver" && score > highScore) {
      setHighScore(score);
      try {
        localStorage.setItem(
          "snakeHighScore",
          score.toString(),
        );
      } catch {
        // Handle localStorage errors gracefully
      }
    }
  }, [gameState, score, highScore]);

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      {/* Game Info */}
      <div className="flex justify-between items-center text-sm">
        <div className="space-x-4">
          <span className="text-foreground">
            Score: {score}
          </span>
          <span className="text-muted-foreground">
            Best: {highScore}
          </span>
        </div>
        <div className="text-muted-foreground">
          {gameState === "waiting" && "Ready"}
          {gameState === "playing" && "Playing"}
          {gameState === "paused" && "Paused"}
          {gameState === "gameOver" && "Game Over"}
        </div>
      </div>

      {/* Game Grid */}
      <div className="relative">
        <div
          className="grid gap-px bg-foreground/10 dark:bg-foreground/20 p-2 rounded-lg"
          style={{
            gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
            aspectRatio: "1",
          }}
        >
          {Array.from({ length: GRID_SIZE * GRID_SIZE }).map(
            (_, index) => {
              const x = index % GRID_SIZE;
              const y = Math.floor(index / GRID_SIZE);

              const isSnakeHead =
                snake.length > 0 &&
                snake[0].x === x &&
                snake[0].y === y;
              const isSnakeBody = snake
                .slice(1)
                .some(
                  (segment) =>
                    segment.x === x && segment.y === y,
                );
              const isFood = food.x === x && food.y === y;

              return (
                <div
                  key={index}
                  className={`
                  aspect-square rounded-sm transition-all duration-75
                  ${
                    isSnakeHead
                      ? "bg-primary shadow-sm"
                      : isSnakeBody
                        ? "bg-primary/70"
                        : isFood
                          ? "bg-red-500 dark:bg-red-400 shadow-sm"
                          : "bg-background dark:bg-muted"
                  }
                `}
                />
              );
            },
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-3">
        {/* Game Controls */}
        <div className="flex justify-center gap-2">
          {gameState === "waiting" && (
            <Button
              onClick={startGame}
              size="sm"
              className="px-6"
            >
              Start Game
            </Button>
          )}

          {(gameState === "playing" ||
            gameState === "paused") && (
            <>
              <Button
                onClick={togglePause}
                variant="outline"
                size="sm"
              >
                {gameState === "playing" ? "Pause" : "Resume"}
              </Button>
              <Button
                onClick={resetGame}
                variant="ghost"
                size="sm"
              >
                Reset
              </Button>
            </>
          )}

          {gameState === "gameOver" && (
            <>
              <Button onClick={startGame} size="sm">
                Play Again
              </Button>
              <Button
                onClick={resetGame}
                variant="outline"
                size="sm"
              >
                Reset
              </Button>
            </>
          )}
        </div>

        {/* Touch Controls for Mobile */}
        {capabilities.isTouch &&
          (gameState === "playing" ||
            gameState === "paused") && (
            <div className="space-y-2">
              <div className="text-xs text-center text-muted-foreground">
                Touch controls
              </div>
              <div className="grid grid-cols-3 gap-1 max-w-32 mx-auto">
                <div></div>
                <TouchOptimized
                  onTap={() => handleTouchDirection("UP")}
                >
                  <button className="w-8 h-8 bg-secondary hover:bg-accent rounded flex items-center justify-center text-sm transition-colors">
                    ↑
                  </button>
                </TouchOptimized>
                <div></div>

                <TouchOptimized
                  onTap={() => handleTouchDirection("LEFT")}
                >
                  <button className="w-8 h-8 bg-secondary hover:bg-accent rounded flex items-center justify-center text-sm transition-colors">
                    ←
                  </button>
                </TouchOptimized>
                <div></div>
                <TouchOptimized
                  onTap={() => handleTouchDirection("RIGHT")}
                >
                  <button className="w-8 h-8 bg-secondary hover:bg-accent rounded flex items-center justify-center text-sm transition-colors">
                    →
                  </button>
                </TouchOptimized>

                <div></div>
                <TouchOptimized
                  onTap={() => handleTouchDirection("DOWN")}
                >
                  <button className="w-8 h-8 bg-secondary hover:bg-accent rounded flex items-center justify-center text-sm transition-colors">
                    ↓
                  </button>
                </TouchOptimized>
                <div></div>
              </div>
            </div>
          )}

        {/* Keyboard Instructions for Desktop */}
        {!capabilities.isTouch &&
          (gameState === "playing" ||
            gameState === "paused") && (
            <div className="text-xs text-center text-muted-foreground space-y-1">
              <div>Use arrow keys or WASD to control</div>
            </div>
          )}
      </div>
    </div>
  );
});

SnakeGame.displayName = "SnakeGame";