/**
 * README — RicRios.com Hero Init
 *
 * Usage:
 * 1) Include CSS: <link rel="stylesheet" href="/src/styles/lux-cyberpunk.css" />
 * 2) Add a root: <div id="hero-root"></div>
 * 3) Load script: <script type="module" src="/dist/scripts/init-hero.js"></script>
 * 4) Configure via URL:
 *    - ?mode=snake or #snake to mount the immersive Snake hero
 *    - ?variant=Editorial|SteelGrid|LuxCyberpunk
 *    - ?time=auto|morning|afternoon|evening
 *    - ?goal=5 (score goal for unlock)
 *    - ?autoDiff=1 to enable auto-difficulty ramp (Trojan hook)
 *
 * Debug API (window.RicRiosHero):
 *    .mountSnake(props)
 *    .mountHero(props)
 *    .unmount()
 */

import { mountHeroSnake, type SnakeProps } from '../src/hero/HeroSnake.js';
import { mountHeroContainer, type HeroProps } from '../src/hero/HeroContainer.js';
import { resolveTimeOfDay } from '../src/tokens/timeos.js';
import { TROJAN, themeSwap } from '../src/infra/trojan.js';
import { isReducedMotion } from '../src/utils/a11y.js';

export type HeroController = {
  mountSnake: (props?: Partial<SnakeProps>) => void;
  mountHero: (props?: Partial<HeroProps>) => void;
  unmount: () => void;
};

declare global {
  interface Window { RicRiosHero: HeroController }
}

const root = ensureRoot();
let currentUnmount: (() => void) | null = null;

function ensureRoot(): HTMLElement {
  let r = document.getElementById('hero-root');
  if (!r) {
    r = document.createElement('div');
    r.id = 'hero-root';
    document.body.prepend(r);
  }
  return r;
}

function unmount() {
  if (currentUnmount) {
    currentUnmount();
    currentUnmount = null;
  }
}

function readParams() {
  const q = new URLSearchParams(location.search);
  const get = (k: string) => q.get(k) || undefined;
  return {
    modeSnake: q.get('mode') === 'snake' || location.hash.includes('snake'),
    variant: (get('variant') as SnakeProps['designVariant']) || 'LuxCyberpunk',
    time: (get('time') as NonNullable<SnakeProps['timeOfDay']>) || 'auto',
    goal: Number(get('goal') || 5) || 5,
  };
}

function configureTrojanFromUrl() {
  const q = new URLSearchParams(location.search);
  const analytics = q.get('analytics') === '1';
  const altLux = q.get('altLux') === '1';
  const autoDiff = q.get('autoDiff') === '1';
  const particles = q.get('particles') === '1';
  TROJAN.ANALYTICS_ENABLED = analytics;
  TROJAN.THEME_SWAP_ENABLED = altLux;
  TROJAN.AUTO_DIFF_ENABLED = autoDiff;
  if (altLux) themeSwap('altLux');
  // Surface particles flag for Emotive Stack/CSS consumers
  if (particles) document.documentElement.setAttribute('data-particles', '1');
}

function mountDefault() {
  const rm = isReducedMotion();
  const params = readParams();
  if (params.modeSnake) {
    mountSnake({ designVariant: params.variant, timeOfDay: params.time, scoreGoal: params.goal, reducedMotion: rm });
  } else {
    mountHero({ timeOfDay: 'auto', headline: 'Designing precision into possibility.', reducedMotion: rm });
  }
}

function mountSnake(props?: Partial<SnakeProps>) {
  unmount();
  const reducedMotion = props?.reducedMotion ?? isReducedMotion();
  const handle = mountHeroSnake(root, {
    designVariant: props?.designVariant ?? 'LuxCyberpunk',
    scoreGoal: props?.scoreGoal ?? 5,
    timeOfDay: props?.timeOfDay ?? 'auto',
    reducedMotion,
    enableParallax: props?.enableParallax ?? true,
    bypassLabel: props?.bypassLabel ?? 'Enter site',
    onUnlock: (score) => console.info('[HeroSnake] onUnlock', { score }),
    onBypass: (score) => console.info('[HeroSnake] onBypass', { score }),
    onPerfectScore: (score) => console.info('[HeroSnake] onPerfectScore', { score }),
  });
  currentUnmount = () => handle.unmount();

  const params = readParams();
  const status = handle.getStatus();
  console.table({
    variant: status.variant,
    timeOfDay: status.timeOfDay,
    scoreGoal: status.scoreGoal,
    reducedMotion: status.reducedMotion,
    fpsThrottled: status.fpsThrottled,
    autoDiff: new URLSearchParams(location.search).get('autoDiff') === '1',
  });
}

function mountHero(props?: Partial<HeroProps>) {
  unmount();
  const reducedMotion = props?.reducedMotion ?? isReducedMotion();
  const handle = mountHeroContainer(root, {
    timeOfDay: props?.timeOfDay ?? 'auto',
    headline: props?.headline ?? 'Designing precision into possibility.',
    subheadline: props?.subheadline,
    primaryCta: props?.primaryCta,
    secondaryCta: props?.secondaryCta,
    reducedMotion,
    compressed: props?.compressed,
  });
  currentUnmount = () => handle.unmount();

  console.table({
    variant: 'Simple',
    timeOfDay: props?.timeOfDay ?? 'auto',
    scoreGoal: '-',
    reducedMotion,
    fpsThrottled: '-',
    autoDiff: new URLSearchParams(location.search).get('autoDiff') === '1',
  });
}

window.RicRiosHero = { mountSnake, mountHero, unmount };

// Auto-mount
configureTrojanFromUrl();
mountDefault();
