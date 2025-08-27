/**
 * Design Tokens (LuxCyberpunk + Glass + Motion) expressed as CSS variable references.
 * All runtime styling should reference these tokens or CSS classes, never raw values.
 *
 * These tokens map to variables defined in `src/styles/lux-cyberpunk.css`.
 */

export type ColorTokens = {
  base: {
    white: string;
    grayLight: string;
    grayMid: string;
  };
  accent: {
    icyBlue: string;
    steelBlue: string;
  };
  alert: {
    deepCrimson: string;
  };
};

export type GlassTokens = {
  blur: { s: string };
  opacity: { m: string };
  edge: { light: string; shadow: string };
};

export type TypeScale = {
  family: string;
  size: string;
  tracking: string;
};

export type TypeTokens = {
  display: { h1: TypeScale };
  ui: { m: TypeScale };
  mono: { counter: TypeScale };
};

export type MotionPair = { duration: string; easing: string };

export type MotionTokens = {
  pulse: { heartbeat: MotionPair };
  transition: { standard: MotionPair };
  sweep: { glassEdge: MotionPair };
  snake: { turn: MotionPair; eat: MotionPair; milestone: MotionPair };
};

export type GridTokens = {
  stroke: { steelBlue: string };
  cell: { sizeBase: string };
};

export type ZTokens = {
  hero: {
    base: string;
    grid: string;
    canvas: string;
    hud: string;
    skip: string;
    overlay: string;
  };
};

export type StyleTokens = {
  color: ColorTokens;
  glass: GlassTokens;
  type: TypeTokens;
  motion: MotionTokens;
  grid: GridTokens;
  z: ZTokens;
};

/**
 * Token object exporting CSS variable references. Use these in TS where needed,
 * and pair them with classes from `lux-cyberpunk.css`.
 */
export const tokens: StyleTokens = {
  color: {
    base: {
      white: 'var(--color-base-white)',
      grayLight: 'var(--color-base-grayLight)',
      grayMid: 'var(--color-base-grayMid)',
    },
    accent: {
      icyBlue: 'var(--color-accent-icyBlue)',
      steelBlue: 'var(--color-accent-steelBlue)',
    },
    alert: {
      deepCrimson: 'var(--color-alert-deepCrimson)',
    },
  },
  glass: {
    blur: { s: 'var(--glass-blur-s)' },
    opacity: { m: 'var(--glass-opacity-m)' },
    edge: { light: 'var(--glass-edge-light)', shadow: 'var(--glass-edge-shadow)' },
  },
  type: {
    display: {
      h1: {
        family: 'var(--type-display-h1-family)',
        size: 'var(--type-display-h1-size)',
        tracking: 'var(--type-display-h1-tracking)',
      },
    },
    ui: {
      m: {
        family: 'var(--type-ui-m-family)',
        size: 'var(--type-ui-m-size)',
        tracking: 'var(--type-ui-m-tracking)',
      },
    },
    mono: {
      counter: {
        family: 'var(--type-mono-counter-family)',
        size: 'var(--type-mono-counter-size)',
        tracking: 'var(--type-mono-counter-tracking)',
      },
    },
  },
  motion: {
    pulse: { heartbeat: { duration: 'var(--motion-pulse-heartbeat-dur)', easing: 'var(--motion-pulse-heartbeat-ease)' } },
    transition: { standard: { duration: 'var(--motion-transition-standard-dur)', easing: 'var(--motion-transition-standard-ease)' } },
    sweep: { glassEdge: { duration: 'var(--motion-sweep-glassEdge-dur)', easing: 'var(--motion-sweep-glassEdge-ease)' } },
    snake: {
      turn: { duration: 'var(--motion-snake-turn-dur)', easing: 'var(--motion-snake-turn-ease)' },
      eat: { duration: 'var(--motion-snake-eat-dur)', easing: 'var(--motion-snake-eat-ease)' },
      milestone: { duration: 'var(--motion-snake-milestone-dur)', easing: 'var(--motion-snake-milestone-ease)' },
    },
  },
  grid: {
    stroke: { steelBlue: 'var(--grid-stroke-steelBlue)' },
    cell: { sizeBase: 'var(--grid-cell-size)' },
  },
  z: {
    hero: {
      base: 'var(--z-hero-base)',
      grid: 'var(--z-hero-grid)',
      canvas: 'var(--z-hero-canvas)',
      hud: 'var(--z-hero-hud)',
      skip: 'var(--z-hero-skip)',
      overlay: 'var(--z-hero-overlay)',
    },
  },
};

export default tokens;
