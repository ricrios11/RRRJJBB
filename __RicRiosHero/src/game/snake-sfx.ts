/**
 * Snake SFX stub — silent by default. Hook points for future audio.
 */

export type SnakeSfxOptions = { enabled?: boolean };

export type SnakeSfx = {
  eat(): void;
  turn(): void;
  milestone(score: number): void;
  gameOver(): void;
};

export function createSnakeSfx(opts: SnakeSfxOptions = {}): SnakeSfx {
  const enabled = !!opts.enabled;
  const noop = () => {};
  if (!enabled) {
    return { eat: noop, turn: noop, milestone: noop, gameOver: noop };
  }
  // Example future wiring: WebAudio nodes, etc.
  return { eat: noop, turn: noop, milestone: noop, gameOver: noop };
}

export default createSnakeSfx;
