/**
 * Snake Engine — pure logic (no DOM). Deterministic, grid-based.
 * The view layer should drive time via a RAF loop and call engine.advance(dtMs).
 *
 * Public API:
 * - createSnakeEngine(opts, events)
 * - engine.start(), engine.stop()
 * - engine.setDirection(dir)
 * - engine.setSpeedMs(ms)
 * - engine.state()
 * - engine.advance(dtMs)  // called by the view's RAF
 */

export type EngineOptions = { cols: number; rows: number; baseSpeedMs: number; seed?: number };

export type Direction = 'up' | 'down' | 'left' | 'right';

export type Vec = { x: number; y: number };

export type EngineState = {
  cols: number;
  rows: number;
  snake: Vec[]; // head is index 0
  dir: Vec;
  fruit: Vec;
  score: number;
  alive: boolean;
  speedMs: number;
  moves: number;
};

export type SnakeEvents = {
  onTick?(state: EngineState): void;
  onEat?(state: EngineState): void;
  onGameOver?(state: EngineState): void;
  onMilestone?(score: number): void;
};

export type SnakeEngine = {
  start(): void;
  stop(): void;
  setDirection(dir: Direction): void;
  setSpeedMs(ms: number): void;
  state(): EngineState;
  advance(dtMs: number): void;
};

/** Tiny seeded RNG (LCG) for determinism */
export function makeRng(seed = 0x2F6E2B1): () => number {
  let s = seed >>> 0;
  return () => {
    // LCG constants from Numerical Recipes
    s = (1664525 * s + 1013904223) >>> 0;
    return (s / 0x100000000);
  };
}

function dirToVec(d: Direction): Vec {
  switch (d) {
    case 'up': return { x: 0, y: -1 };
    case 'down': return { x: 0, y: 1 };
    case 'left': return { x: -1, y: 0 };
    case 'right': return { x: 1, y: 0 };
  }
}

function equal(a: Vec, b: Vec): boolean { return a.x === b.x && a.y === b.y; }

function randomFruit(cols: number, rows: number, occupied: Vec[], rnd: () => number): Vec {
  // simple retry; deterministic grid but not seeded RNG
  let tries = 0;
  while (tries++ < 10000) {
    const v = { x: Math.floor(rnd() * cols), y: Math.floor(rnd() * rows) };
    if (!occupied.some(o => equal(o, v))) return v;
  }
  // fallback: first free slot
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const v = { x, y };
      if (!occupied.some(o => equal(o, v))) return v;
    }
  }
  return { x: 0, y: 0 };
}

export function createSnakeEngine(opts: EngineOptions, events: SnakeEvents = {}): SnakeEngine {
  const { cols, rows, baseSpeedMs } = opts;
  const rnd = makeRng(opts.seed ?? 0xC0FFEE);
  const ev = events;

  const initHead = { x: Math.floor(cols / 2), y: Math.floor(rows / 2) };
  let state: EngineState = {
    cols,
    rows,
    snake: [initHead, { x: initHead.x - 1, y: initHead.y }, { x: initHead.x - 2, y: initHead.y }],
    dir: { x: 1, y: 0 },
    fruit: { x: 0, y: 0 }, // will be placed below
    score: 0,
    alive: true,
    speedMs: baseSpeedMs,
    moves: 0,
  };
  state.fruit = randomFruit(cols, rows, state.snake, rnd);

  let running = false;
  let acc = 0; // ms accumulator
  let pendingDir: Vec | null = null;

  function setDirection(dir: Direction) {
    const v = dirToVec(dir);
    // Disallow reversing directly into itself
    const current = state.dir;
    if (current.x + v.x === 0 && current.y + v.y === 0) return;
    pendingDir = v;
  }

  function stepOnce(): void {
    if (!state.alive) return;

    // apply pending direction (at most once per step)
    if (pendingDir) {
      state.dir = pendingDir;
      pendingDir = null;
    }

    const head = state.snake[0];
    const next = { x: head.x + state.dir.x, y: head.y + state.dir.y };

    // collide with walls
    if (next.x < 0 || next.x >= state.cols || next.y < 0 || next.y >= state.rows) {
      state.alive = false;
      ev.onGameOver?.(state);
      return;
    }
    // collide with self
    if (state.snake.some((s) => equal(s, next))) {
      state.alive = false;
      ev.onGameOver?.(state);
      return;
    }

    // move
    state.snake.unshift(next);

    if (equal(next, state.fruit)) {
      state.score += 1;
      state.moves += 1;
      // do not pop tail (grow by 1)
      state.fruit = randomFruit(state.cols, state.rows, state.snake, rnd);
      ev.onEat?.(state);
      if (state.score > 0 && state.score % 5 === 0) ev.onMilestone?.(state.score);
    } else {
      // normal move, pop tail
      state.snake.pop();
      state.moves += 1;
    }

    ev.onTick?.(state);
  }

  return {
    start() { running = true; },
    stop() { running = false; },
    setDirection,
    setSpeedMs(ms: number) { state.speedMs = Math.max(40, ms); },
    state() { return state; },
    advance(dtMs: number) {
      if (!running || !state.alive) return;
      acc += dtMs;
      const step = state.speedMs;
      while (acc >= step) {
        acc -= step;
        stepOnce();
        if (!state.alive) break;
      }
    },
  };
}

export default createSnakeEngine;
