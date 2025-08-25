import { GeoConfig, geoResolveTimeOfDay } from "../time/geo-solar.js";

/**
 * TimeOS tokens and helpers
 *
 * Provides gradient presets and glass temperature presets keyed by time-of-day,
 * plus a utility to resolve the current time-of-day.
 */

export type TimeOfDay = 'dawn' | 'morning' | 'afternoon' | 'dusk' | 'evening';

export type GradientTokens = {
  dawn: string;
  morning: string;
  afternoon: string;
  dusk: string;
  evening: string;
};

export type GlassTemp = {
  /** Depth of drop shadow around glass elements */
  shadowDepth: string;
  /** Opacity/intensity of highlight edge */
  highlight: string;
};

export type TimeOSTokens = {
  gradient: GradientTokens;
  glassTemp: Record<TimeOfDay, GlassTemp>;
  light: { intensity: Record<TimeOfDay, string> };
  glass: { temp: { warm: string; neutral: string; icy: string } };
};

/**
 * Gradients are stored as CSS variables and referenced here.
 */
export const timeos: TimeOSTokens = {
  gradient: {
    dawn: 'var(--timeos-gradient-dawn)',
    morning: 'var(--timeos-gradient-morning)',
    afternoon: 'var(--timeos-gradient-afternoon)',
    dusk: 'var(--timeos-gradient-dusk)',
    evening: 'var(--timeos-gradient-evening)',
  },
  glassTemp: {
    dawn: { shadowDepth: 'var(--timeos-glassTemp-dawn-shadowDepth)', highlight: 'var(--timeos-glassTemp-dawn-highlight)' },
    morning: { shadowDepth: 'var(--timeos-glassTemp-morning-shadowDepth)', highlight: 'var(--timeos-glassTemp-morning-highlight)' },
    afternoon: { shadowDepth: 'var(--timeos-glassTemp-afternoon-shadowDepth)', highlight: 'var(--timeos-glassTemp-afternoon-highlight)' },
    dusk: { shadowDepth: 'var(--timeos-glassTemp-dusk-shadowDepth)', highlight: 'var(--timeos-glassTemp-dusk-highlight)' },
    evening: { shadowDepth: 'var(--timeos-glassTemp-evening-shadowDepth)', highlight: 'var(--timeos-glassTemp-evening-highlight)' },
  },
  light: {
    intensity: {
      dawn: 'var(--timeos-light-intensity-dawn)',
      morning: 'var(--timeos-light-intensity-morning)',
      afternoon: 'var(--timeos-light-intensity-afternoon)',
      dusk: 'var(--timeos-light-intensity-dusk)',
      evening: 'var(--timeos-light-intensity-evening)',
    },
  },
  glass: {
    temp: {
      warm: 'var(--timeos-glass-temp-warm)',
      neutral: 'var(--timeos-glass-temp-neutral)',
      icy: 'var(--timeos-glass-temp-icy)',
    },
  },
};

/**
 * Resolve a time-of-day bucket for styling.
 * @param now Optional date; defaults to current time.
 */
export function resolveTimeOfDay(now?: Date): TimeOfDay {
  const d = now ?? new Date();
  // Geo-aware branch if enabled and coordinates available
  if (GeoConfig.ENABLED && Number.isFinite(GeoConfig.LAT as number) && Number.isFinite(GeoConfig.LON as number)) {
    try { return geoResolveTimeOfDay(d); } catch { /* fall through */ }
  }
  // Default, non-geo fallback windows:
  const h = d.getHours();
  // Dawn 05:00–07:00, Morning 07:00–12:00, Afternoon 12:00–17:00,
  // Dusk 17:00–19:00, Evening otherwise
  if (h >= 5 && h < 7) return 'dawn';
  if (h >= 7 && h < 12) return 'morning';
  if (h >= 12 && h < 17) return 'afternoon';
  if (h >= 17 && h < 19) return 'dusk';
  return 'evening';
}

export default timeos;

// Alignment Addendum v2 — TimeOS hard lock
// Provide explicit token objects for gradients, light intensity, glass edges, and neon accents.
// Note: Components must not use raw hex; these are tokens centralized here.

export const gradient = {
  dawn: 'var(--timeos-gradient-dawn)',
  morning: 'var(--timeos-gradient-morning)',
  afternoon: 'var(--timeos-gradient-afternoon)',
  dusk: 'var(--timeos-gradient-dusk)',
  evening: 'var(--timeos-gradient-evening)',
} as const;

export const light = {
  intensity: {
    dawn: 'var(--timeos-light-intensity-dawn)',
    morning: 'var(--timeos-light-intensity-morning)',
    afternoon: 'var(--timeos-light-intensity-afternoon)',
    dusk: 'var(--timeos-light-intensity-dusk)',
    evening: 'var(--timeos-light-intensity-evening)',
  },
} as const;

export const glass = {
  temp: {
    dawn: 'warm',
    morning: 'warm',
    afternoon: 'neutral',
    dusk: 'neutral',
    evening: 'icy',
  },
  edge: {
    dawn: { highlight: 'var(--timeos-glass-edge-dawn-highlight)', shadow: 'var(--timeos-glass-edge-dawn-shadow)' },
    morning: { highlight: 'var(--timeos-glass-edge-morning-highlight)', shadow: 'var(--timeos-glass-edge-morning-shadow)' },
    afternoon: { highlight: 'var(--timeos-glass-edge-afternoon-highlight)', shadow: 'var(--timeos-glass-edge-afternoon-shadow)' },
    dusk: { highlight: 'var(--timeos-glass-edge-dusk-highlight)', shadow: 'var(--timeos-glass-edge-dusk-shadow)' },
    evening: { highlight: 'var(--timeos-glass-edge-evening-highlight)', shadow: 'var(--timeos-glass-edge-evening-shadow)' },
  },
} as const;

export const neon = {
  evening: {
    purple: 'var(--neon-purple)',
    pink: 'var(--neon-pink)',
    green: 'var(--neon-green)',
  },
} as const;
