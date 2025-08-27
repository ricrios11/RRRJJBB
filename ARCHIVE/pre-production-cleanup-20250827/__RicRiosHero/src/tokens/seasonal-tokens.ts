/**
 * /src/tokens/seasonal-tokens.ts
 * Trojan Horse Seasonal Matrix Tokens for Snake Hero — Single Source of Truth (symbolic)
 * All values are symbolic token names — never raw hex, px, or curves.
 * Bind these via bindTimeOS + SeasonalMatrix utilities.
 */

export const SeasonalMatrix = {
  winter: {
    dawn: {
      glass: 'glass.coolBlue',
      pulse: 'pulse.slow',
      shimmer: 'shimmer.icy',
    },
    morning: {
      glass: 'glass.neutralCool',
      hudPulse: 'pulse.sunYellow',
    },
    afternoon: {
      glass: 'glass.crispBlue',
      animCurve: 'curve.tight',
    },
    dusk: {
      gradient: 'grad.pinkDeepPurple',
      pulse: 'pulse.medium',
    },
    evening: {
      accents: ['neon.purple', 'neon.mintGreen'],
      tailTrail: 'trail.long',
    },
  },
  spring: {
    dawn: {
      glass: 'glass.softPink',
      pulse: 'pulse.gentle',
    },
    morning: {
      glass: 'glass.warmYellowOrange',
      hudFade: 'fade.fast',
    },
    afternoon: {
      glass: 'glass.lightAqua',
      accents: ['blue.skyRich'],
    },
    dusk: {
      gradient: 'grad.roseMagenta',
    },
    evening: {
      accents: ['neon.pink', 'neon.cyan'],
      snakeSpeed: 'speed.slightlyFaster',
    },
  },
  summer: {
    dawn: {
      glass: 'glass.brightGold',
      pulse: 'pulse.vibrant',
    },
    morning: {
      gradient: 'grad.warmWhiteGold',
    },
    afternoon: {
      glass: 'glass.richCobalt',
      animCurve: 'curve.sharp',
    },
    dusk: {
      gradient: 'grad.peachPurple',
    },
    evening: {
      accents: ['neon.magenta', 'neon.lime'],
      particles: 'particles.sparkle',
    },
  },
  autumn: {
    dawn: {
      glass: 'glass.amber',
      pulse: 'pulse.slowWarm',
    },
    morning: {
      gradient: 'grad.burntOrangePaleYellow',
    },
    afternoon: {
      glass: 'glass.tealMutedNavy',
    },
    dusk: {
      gradient: 'grad.orangeDeepViolet',
    },
    evening: {
      accents: ['neon.orange', 'neon.teal'],
      animCurve: 'curve.smooth',
    },
  },
} as const;

// Seasonal motion, speed, and pulse bindings (symbolic)
export const SeasonalMotion = {
  pulse: {
    slow: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
    gentle: 'cubic-bezier(0.33, 1, 0.68, 1)',
    vibrant: 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
    medium: 'cubic-bezier(0.4, 0, 0.2, 1)',
    slowWarm: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  },
  speed: {
    slightlyFaster: 1.15,
  },
  curves: {
    tight: 'cubic-bezier(0.4, 0, 0.6, 1)',
    sharp: 'cubic-bezier(0.86, 0, 0.07, 1)',
    smooth: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
  },
} as const;

export type SeasonalMatrixType = typeof SeasonalMatrix;
export type SeasonalMotionType = typeof SeasonalMotion;
