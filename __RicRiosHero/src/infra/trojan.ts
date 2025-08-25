// Centralized flags + safe event emitter (off by default)
export const TROJAN = {
  ANALYTICS_ENABLED: false,
  THEME_SWAP_ENABLED: false,
  AUTO_DIFF_ENABLED: false,
};

export type Payload = Record<string, unknown>;
export type EventName =
  | 'snake:eat'
  | 'snake:milestone'
  | 'snake:unlock'
  | 'snake:bypass'
  | 'snake:return'
  | 'snake:tod-change'     // legacy
  | 'snake:ToDChange'      // new, for acceptance harness
  | 'snake:seasonChange'   // new, seasonal hook
  | 'snake:seasonMilestone';

export function emit(name: EventName, payload: Payload = {}) {
  if (!TROJAN.ANALYTICS_ENABLED) return;
  try { (window as any).analytics?.emit?.(name, payload); } catch {}
}

// Optional theme swap stub
export function themeSwap(key: 'altLux'|'default') {
  if (!TROJAN.THEME_SWAP_ENABLED) return;
  document.documentElement.setAttribute('data-theme', key);
}

// Auto‑difficulty curve (tokenized)
export function difficultyAt(score: number) {
  if (!TROJAN.AUTO_DIFF_ENABLED) return 1.0;        // baseline
  // gentle ramp: +2% speed every 5 points, capped
  const factor = 1 + Math.min(Math.floor(score / 5) * 0.02, 0.12);
  return Number(factor.toFixed(3));
}
