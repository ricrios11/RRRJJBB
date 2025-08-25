/**
 * requestAnimationFrame loop with delta time and FPS tracking.
 * View layers should use this to drive visual updates and pass time to pure engines.
 */

export type RafControls = {
  start(): void;
  stop(): void;
  isRunning(): boolean;
  getFps(): number;
};

export type RafOptions = {
  onFrame?: (dtMs: number) => void;
  /** Fixed step mode: when provided, run onFixedStep multiple times per frame using accumulator. */
  fixedStepMs?: number;
  onFixedStep?: (stepMs: number) => void;
  /** Optional callback receiving smoothed FPS once per second. */
  onFps?: (fps: number) => void;
  /** Optional callback receiving moving average frame time (ms) over last N frames. */
  onAvgFrame?: (avgMs: number) => void;
  avgWindow?: number; // default 120
};

export function createRafLoop(opts: RafOptions): RafControls {
  const { onFrame, onFps } = opts;
  let rafId: number | null = null;
  let running = false;
  let last = 0;
  let fps = 60;
  let frames = 0;
  let fpsLast = 0;
  const windowSize = opts.avgWindow ?? 120;
  const frameTimes: number[] = [];
  let acc = 0; // accumulator for fixed step

  const frame = (t: number) => {
    if (!running) return;
    if (!last) last = t;
    const dt = t - last;
    last = t;
    frames++;

    // Report FPS ~1/s
    if (t - fpsLast >= 1000) {
      fps = (frames * 1000) / (t - fpsLast);
      frames = 0;
      fpsLast = t;
      onFps?.(fps);
    }

    const clampedDt = Math.min(dt, 100);
    // moving average tracking
    frameTimes.push(clampedDt);
    if (frameTimes.length > windowSize) frameTimes.shift();
    if (opts.onAvgFrame && frameTimes.length === windowSize) {
      const sum = frameTimes.reduce((a, b) => a + b, 0);
      opts.onAvgFrame(sum / frameTimes.length);
    }

    if (opts.fixedStepMs && opts.onFixedStep) {
      acc += clampedDt;
      const step = opts.fixedStepMs;
      let safety = 0;
      while (acc >= step && safety++ < 10) {
        opts.onFixedStep(step);
        acc -= step;
      }
    }
    onFrame?.(clampedDt); // optional variable-step callback
    rafId = requestAnimationFrame(frame);
  };

  return {
    start() {
      if (running) return;
      running = true;
      last = 0;
      frames = 0;
      fpsLast = performance.now();
      rafId = requestAnimationFrame(frame);
    },
    stop() {
      running = false;
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = null;
    },
    isRunning() { return running; },
    getFps() { return fps; },
  };
}
