/**
 * Seasonal tokens for RicRios TimeOS (5×4 matrix) — SINGLE SOURCE OF TRUTH.
 * - No component may hardcode seasonal values. Consume through binders only.
 * - All numbers live in safe, subtle ranges to avoid visual whiplash.
 */

export type Season = 'winter' | 'spring' | 'summer' | 'fall';
export type TimeOfDay5 = 'dawn'|'morning'|'afternoon'|'dusk'|'evening';

export const SeasonConfig = {
  ENABLED: false, // toggle via ?seasonal=1
  HEMISPHERE: 'north' as 'north'|'south', // flip via ?hemi=south
} as const;

/** Month → season (north default; south inverts) */
export function resolveSeason(d = new Date()): Season {
  const m = d.getMonth(); // 0..11
  const north =
    (m === 11 || m < 2) ? 'winter' :
    (m < 5) ? 'spring' :
    (m < 8) ? 'summer' : 'fall';
  if (SeasonConfig.HEMISPHERE === 'north') return north as Season;
  // invert for south
  return ({ winter:'summer', spring:'fall', summer:'winter', fall:'spring' } as Record<Season,Season>)[north as Season];
}

/** Per‑season adjustments applied on top of TimeOS tokens. */
export type SeasonalAdj = {
  /** Color saturation multiplier for accents/particles (0.95–1.05) */
  sat: number;
  /** Warm/cool glass nudges for highlight/shadow mixes (−2..+2) */
  warmShift: number;
  coolShift: number;
  /** Small curve bias to shape ease (−0.03..+0.03) */
  curveBias: number;
  /** Base engine step ms delta (−5..+5; lower = faster) */
  baseSpeedBiasMs: number;
  /** Pulse amplitude multiplier (0.95–1.05) */
  pulseAmpBias: number;
  /** Glow radius multiplier (0.90–1.10) */
  glowAmp: number;
};

export type SeasonalMatrix = Record<Season, Record<TimeOfDay5, SeasonalAdj>>;

/** HARD RANGES: any value outside fails validation. */
const RANGES = {
  sat: [0.95, 1.05],
  warmShift: [-2, 2],
  coolShift: [-2, 2],
  curveBias: [-0.03, 0.03],
  baseSpeedBiasMs: [-5, 5],
  pulseAmpBias: [0.95, 1.05],
  glowAmp: [0.90, 1.10],
} as const;

function inRange(v: number, [min,max]: readonly [number,number]) { return v >= min && v <= max; }

/** Validate a SeasonalMatrix at runtime; throws on first error. */
export function validateSeasonalMatrix(mx: SeasonalMatrix): void {
  const seasons: Season[] = ['winter','spring','summer','fall'];
  const tods: TimeOfDay5[] = ['dawn','morning','afternoon','dusk','evening'];
  for (const s of seasons) {
    if (!mx[s]) throw new Error(`[seasonal] missing season ${s}`);
    for (const t of tods) {
      const a = mx[s][t];
      if (!a) throw new Error(`[seasonal] missing adj for ${s}.${t}`);
      const entries: Array<[keyof SeasonalAdj, number, readonly [number,number]]> = [
        ['sat', a.sat, RANGES.sat],
        ['warmShift', a.warmShift, RANGES.warmShift],
        ['coolShift', a.coolShift, RANGES.coolShift],
        ['curveBias', a.curveBias, RANGES.curveBias],
        ['baseSpeedBiasMs', a.baseSpeedBiasMs, RANGES.baseSpeedBiasMs],
        ['pulseAmpBias', a.pulseAmpBias, RANGES.pulseAmpBias],
        ['glowAmp', a.glowAmp, RANGES.glowAmp],
      ];
      for (const [k, v, r] of entries) {
        if (!inRange(v, r)) throw new Error(`[seasonal] ${s}.${t}.${k}=${v} out of range ${r[0]}..${r[1]}`);
      }
    }
  }
}

/** DEFAULT MATRIX — matches what we aligned earlier (subtle, tasteful). */
export const DEFAULT_SEASONAL_MATRIX: SeasonalMatrix = {
  winter: {
    dawn:      { sat:0.97, warmShift:-1, coolShift:+1, curveBias:-0.02, baseSpeedBiasMs:+2, pulseAmpBias:0.98, glowAmp:0.95 },
    morning:   { sat:0.97, warmShift:-1, coolShift:+1, curveBias:-0.02, baseSpeedBiasMs:+2, pulseAmpBias:0.98, glowAmp:0.95 },
    afternoon: { sat:0.96, warmShift:-2, coolShift:+2, curveBias:-0.03, baseSpeedBiasMs:+3, pulseAmpBias:0.97, glowAmp:0.94 },
    dusk:      { sat:0.98, warmShift:-1, coolShift:+1, curveBias:-0.02, baseSpeedBiasMs:+1, pulseAmpBias:0.98, glowAmp:0.96 },
    evening:   { sat:0.98, warmShift:-1, coolShift:+1, curveBias:-0.02, baseSpeedBiasMs:+1, pulseAmpBias:0.98, glowAmp:0.96 },
  },
  spring: {
    dawn:      { sat:1.03, warmShift:+1, coolShift:0,  curveBias:+0.01, baseSpeedBiasMs:-1, pulseAmpBias:1.02, glowAmp:1.03 },
    morning:   { sat:1.03, warmShift:+1, coolShift:0,  curveBias:+0.01, baseSpeedBiasMs:-1, pulseAmpBias:1.02, glowAmp:1.03 },
    afternoon: { sat:1.02, warmShift:0,  coolShift:0,  curveBias:+0.01, baseSpeedBiasMs:-1, pulseAmpBias:1.02, glowAmp:1.02 },
    dusk:      { sat:1.02, warmShift:0,  coolShift:0,  curveBias:+0.01, baseSpeedBiasMs:-1, pulseAmpBias:1.01, glowAmp:1.02 },
    evening:   { sat:1.02, warmShift:0,  coolShift:0,  curveBias:+0.01, baseSpeedBiasMs:-1, pulseAmpBias:1.01, glowAmp:1.02 },
  },
  summer: {
    dawn:      { sat:1.05, warmShift:+2, coolShift:-1, curveBias:+0.02, baseSpeedBiasMs:-3, pulseAmpBias:1.04, glowAmp:1.06 },
    morning:   { sat:1.05, warmShift:+2, coolShift:-1, curveBias:+0.02, baseSpeedBiasMs:-3, pulseAmpBias:1.04, glowAmp:1.06 },
    afternoon: { sat:1.04, warmShift:+1, coolShift:-1, curveBias:+0.02, baseSpeedBiasMs:-4, pulseAmpBias:1.05, glowAmp:1.05 },
    dusk:      { sat:1.03, warmShift:+1, coolShift:0,  curveBias:+0.02, baseSpeedBiasMs:-2, pulseAmpBias:1.03, glowAmp:1.04 },
    evening:   { sat:1.03, warmShift:+1, coolShift:0,  curveBias:+0.02, baseSpeedBiasMs:-2, pulseAmpBias:1.03, glowAmp:1.04 },
  },
  fall: {
    dawn:      { sat:1.01, warmShift:+1, coolShift:0,  curveBias:0.00, baseSpeedBiasMs:0,  pulseAmpBias:1.00, glowAmp:1.00 },
    morning:   { sat:1.01, warmShift:+1, coolShift:0,  curveBias:0.00, baseSpeedBiasMs:0,  pulseAmpBias:1.00, glowAmp:1.00 },
    afternoon: { sat:1.00, warmShift:0,  coolShift:0,  curveBias:0.00, baseSpeedBiasMs:0,  pulseAmpBias:1.00, glowAmp:1.00 },
    dusk:      { sat:1.00, warmShift:0,  coolShift:0,  curveBias:0.00, baseSpeedBiasMs:0,  pulseAmpBias:1.00, glowAmp:1.00 },
    evening:   { sat:1.00, warmShift:0,  coolShift:0,  curveBias:0.00, baseSpeedBiasMs:0,  pulseAmpBias:1.00, glowAmp:1.00 },
  },
};

validateSeasonalMatrix(DEFAULT_SEASONAL_MATRIX); // throws in dev if drift
