/**
 * Immersive Snake Hero (view + orchestration)
 *
 * Public API:
 *   mountHeroSnake(el, props) => SnakeHandle
 *
 * Non-blocking bypass mounts the Simple Hero overlay and keeps the game running.
 * Designed for vanilla ESM + TypeScript.
 *
 * TROJAN HOOKS (off by default; see `/src/infra/trojan.ts`)
 * - analytics: emit('snake:eat'|'snake:milestone'|'snake:unlock'|'snake:bypass'|'snake:return', payload)
 * - themeSwap('altLux'|'default'): optional alt theme on perfect score
 * - difficultyAt(score): gentle auto-difficulty ramp (+2%/5pts, cap +12%)
 * Enable via URL flags (?analytics=1&altLux=1&autoDiff=1) wired in `/scripts/init-hero.ts`.
 */

import { resolveTimeOfDay, type TimeOfDay } from '../tokens/timeos.js';
import tokens from '../tokens/style.js';
import { createRafLoop } from '../utils/rafLoop.js';
import { isReducedMotion, safeFocus } from '../utils/a11y.js';
import { createSnakeEngine, type EngineState } from '../game/snake-engine.js';
import { createSnakeSfx } from '../game/snake-sfx.js';
import { bindTimeOS } from '../time/applyTimeOS.js';
import { assertTokens } from '../utils/tokens-assert.js';
import { mountHeroContainer, type HeroProps as SimpleHeroProps } from './HeroContainer.js';
import { emit, themeSwap, difficultyAt } from '../infra/trojan.js';
import createEmotiveStack from '../snake/effects/emotive.js';

export type Variant = 'Editorial' | 'SteelGrid' | 'LuxCyberpunk';

export type SnakeProps = {
  timeOfDay?: TimeOfDay | 'auto';
  designVariant?: Variant;
  scoreGoal?: number; // default 5
  reducedMotion?: boolean;
  enableParallax?: boolean; // default true
  compressed?: boolean;
  bypassLabel?: string; // default "Enter site"
  onBypass?(score: number): void;
  onUnlock?(score: number): void; // fire exactly once when score >= scoreGoal
  onPerfectScore?(score: number): void;
};

export type SnakeHandle = { unmount(): void; getStatus(): { fpsThrottled: boolean; reducedMotion: boolean; timeOfDay: TimeOfDay; variant: Variant; scoreGoal: number } };

const BASE_SPEED_MS = 100; // baseline step speed (snappier)

function measureCssPxVar(varName: string, fallback: number): number {
  const probe = document.createElement('div');
  probe.style.position = 'absolute';
  probe.style.visibility = 'hidden';
  probe.style.width = `var(${varName})`;
  document.body.appendChild(probe);
  const w = probe.getBoundingClientRect().width;
  probe.remove();
  return w || fallback;
}

function seasonalBaseMsBias(): number {
  // Read seasonal bias from CSS variables; binder writes --season-base-ms-bias when enabled
  try {
    const raw = getComputedStyle(document.documentElement).getPropertyValue('--season-base-ms-bias').trim();
    const n = parseFloat(raw);
    return Number.isFinite(n) ? n : 0;
  } catch { return 0; }
}

function seasonalGlowAmp(): number {
  // Read glow amp from CSS variables; binder writes --season-glow-amp when enabled
  try {
    const raw = getComputedStyle(document.documentElement).getPropertyValue('--season-glow-amp').trim();
    const n = parseFloat(raw);
    return Number.isFinite(n) ? n : 1;
  } catch { return 1; }
}

function pickStroke(variant: Variant): number {
  switch (variant) {
    case 'Editorial': return 2;
    case 'SteelGrid': return 3;
    case 'LuxCyberpunk': return 2.5;
  }
}

function pickColors(ctx: CanvasRenderingContext2D, variant: Variant, time: TimeOfDay) {
  // Use CSS variables via computed styles where possible
  const root = document.documentElement;
  const icy = getComputedStyle(root).getPropertyValue('--color-accent-icyBlue').trim();
  const steel = getComputedStyle(root).getPropertyValue('--color-accent-steelBlue').trim();
  const white = getComputedStyle(root).getPropertyValue('--color-base-white').trim();

  const snakeColor = variant === 'Editorial' ? white : icy;
  const edgeColor = variant === 'SteelGrid' ? steel : icy;
  return { snakeColor, edgeColor };
}

export function mountHeroSnake(el: HTMLElement, props: SnakeProps): SnakeHandle {
  const time: TimeOfDay = props.timeOfDay === 'auto' || !props.timeOfDay ? resolveTimeOfDay() : props.timeOfDay;
  let variant: Variant = props.designVariant ?? 'LuxCyberpunk';
  const scoreGoal = props.scoreGoal ?? 5;
  const rm = props.reducedMotion ?? isReducedMotion();
  const enableParallax = props.enableParallax ?? true;
  const bypassLabel = props.bypassLabel ?? 'Enter site';
  const autoDiff = new URLSearchParams(location.search).get('autoDiff') === '1';

  // Shell
  const shell = document.createElement('section');
  shell.className = 'hero-shell';
  shell.dataset.variant = variant;
  shell.setAttribute('role', 'application');
  if (props.compressed) shell.classList.add('compressed');

  // Track live TimeOS (5-state) and mirror attribute via bindTimeOS
  let liveTOD: TimeOfDay = time;
  // Note: binder is initialized after timeFactor to avoid TDZ on first apply
  let unbindTime: () => void;

  // Skip pill (first in tab order)
  const skip = document.createElement('a');
  skip.className = 'skip-pill';
  skip.href = '#hero-overlay';
  skip.textContent = bypassLabel;
  skip.setAttribute('aria-label', bypassLabel);
  skip.setAttribute('data-role', 'skip-pill');
  skip.tabIndex = 0;
  shell.appendChild(skip);

  // Grid overlay
  const grid = document.createElement('div');
  grid.className = 'hero-grid';
  const gridLines = document.createElement('div');
  gridLines.className = 'grid-lines';
  grid.appendChild(gridLines);
  shell.appendChild(grid);

  // Canvas
  const wrap = document.createElement('div');
  wrap.className = 'hero-canvas-wrap glass-chip';
  const canvas = document.createElement('canvas');
  canvas.className = 'hero-canvas';
  wrap.appendChild(canvas);
  shell.appendChild(wrap);

  // HUD
  const hud = document.createElement('div');
  hud.className = 'glass-chip';
  Object.assign(hud.style, { position: 'absolute', left: '12px', top: '12px', padding: '8px 12px' }); // layout-only inline style allowed (no color/type)
  const hudLabel = document.createElement('span');
  hudLabel.className = 'hud-counter';
  hudLabel.setAttribute('aria-live', 'polite');
  hudLabel.setAttribute('role', 'status');
  hudLabel.textContent = 'Score: 0';
  hud.appendChild(hudLabel);
  shell.appendChild(hud);

  // Overlay container (hidden until bypass)
  const overlay = document.createElement('div');
  overlay.id = 'hero-overlay';
  overlay.className = 'hero-overlay';
  shell.appendChild(overlay);

  // Emotive Stack (effects + micro-UI)
  const emotive = createEmotiveStack({ shell, wrap, reducedMotion: rm });
  // Optional emoji debug via URL flag
  try {
    const emojiFlag = new URLSearchParams(location.search).get('emoji') === '1';
    emotive.setEmojiDebug(emojiFlag);
  } catch {}

  // Mount
  el.appendChild(shell);

  // Token assertion: shallow
  assertTokens(shell, 'HeroSnake', false);

  // Canvas sizing and engine grid sizing
  const root = document.documentElement;
  const cellPx = measureCssPxVar('--grid-cell-size', 20);

  function computeGrid() {
    const w = wrap.clientWidth;
    const h = wrap.clientHeight;
    const cols = Math.max(10, Math.floor(w / cellPx));
    const rows = Math.max(8, Math.floor(h / cellPx));
    return { cols, rows, w, h };
  }

  function resizeCanvas() {
    const { w, h } = computeGrid();
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  resizeCanvas();
  const ctx = canvas.getContext('2d')!;

  // Engine
  let { cols, rows } = computeGrid();
  function timeSpeedFactor(t: TimeOfDay): number {
    // 5‑state mapping; subtle differences to preserve feel
    switch (t) {
      case 'dawn': return 1.05;       // slightly slower
      case 'morning': return 1.0;     // baseline
      case 'afternoon': return 0.95;  // slightly faster
      case 'dusk': return 1.0;        // baseline
      case 'evening': return 1.08;    // slowest, cinematic
    }
  }
  let timeFactor = timeSpeedFactor(time);
  let seasonBiasMs = seasonalBaseMsBias();
  let speedMs = Math.max(60, Math.round(BASE_SPEED_MS * timeFactor) + seasonBiasMs);

  // Defer binder init until after engine exists (avoids TDZ in onChange)

  const sfx = createSnakeSfx();

  let unlockedFired = false;
  let perfectNotified = false;
  let lastLen = 0;

  const engine = createSnakeEngine({ cols, rows, baseSpeedMs: speedMs }, {
    onTick: (state) => {
      draw(state);
    },
    onEat: (state) => {
      // HUD pulse + edge sweep + tiny pop
      hud.classList.remove('sweep-glassEdge', 'eat-pop');
      // force reflow to restart animation
      void hud.offsetWidth;
      hud.classList.add('sweep-glassEdge');
      wrap.classList.remove('eat-pop'); void wrap.offsetWidth; wrap.classList.add('eat-pop');
      sfx.eat();

      // Emotive: happy + sparkle
      emotive.onEat();
      shell.classList.add('emote-happy');
      setTimeout(() => shell.classList.remove('emote-happy'), 350);

      // Trojan hook: analytics eat event (optional)
      emit('snake:eat', { score: state.score, tod: liveTOD, variant });

      // unlock check
      if (!unlockedFired && state.score >= scoreGoal) {
        unlockedFired = true;
        emit('snake:unlock', { score: state.score, tod: liveTOD });
        props.onUnlock?.(state.score);
      }

      // perfect score (fills grid)
      const cells = state.cols * state.rows;
      if (!perfectNotified && state.snake.length >= cells) {
        perfectNotified = true;
        // Trojan hook: optional theme swap
        themeSwap('altLux');
        props.onPerfectScore?.(state.score);
      }

      // auto-difficulty: ramp speed slightly
      if (autoDiff && state.score > 0) {
        const newSpeed = Math.max(60, Math.round(speedMs * 0.98));
        if (newSpeed !== speedMs) {
          speedMs = newSpeed;
          engine.setSpeedMs(speedMs);
        }
      }
    },
    onGameOver: (state) => {
      sfx.gameOver();
      emotive.onGameOver();
    },
    onMilestone: (score) => {
      props.onUnlock && !unlockedFired && score >= scoreGoal && props.onUnlock(score);
      // HUD heartbeat pulse
      hud.classList.add('pulse-heartbeat');
      setTimeout(() => hud.classList.remove('pulse-heartbeat'), 400);
      // Trojan hook: analytics milestone (optional)
      emit('snake:milestone', { score, tod: liveTOD });
      // Trojan hook: auto-difficulty curve (tokenized)
      const currentBias = seasonalBaseMsBias();
      if (currentBias !== seasonBiasMs) seasonBiasMs = currentBias;
      const desired = Math.max(60, Math.round((BASE_SPEED_MS * timeFactor) / difficultyAt(score)) + currentBias);
      if (desired !== speedMs) {
        speedMs = desired;
        engine.setSpeedMs(speedMs);
      }
      createSnakeSfx().milestone(score);
    },
  });

  // Initialize live TimeOS binding after engine exists
  unbindTime = bindTimeOS(shell, props.timeOfDay ?? 'auto', {
    onChange: (t) => {
      const old = timeFactor;
      liveTOD = t;
      timeFactor = timeSpeedFactor(liveTOD);
      // refresh seasonal bias (per-ToD)
      const prevBias = seasonBiasMs;
      seasonBiasMs = seasonalBaseMsBias();
      // preserve current difficulty by scaling by factor ratio and swap bias
      const adjusted = Math.max(60, Math.round(((speedMs - prevBias) / old) * timeFactor) + seasonBiasMs);
      if (adjusted !== speedMs) {
        speedMs = adjusted;
        engine.setSpeedMs(speedMs);
      }
      // Trojan hook: optional analytics for ToD changes
      emit('snake:tod-change', { tod: liveTOD });
    }
  });

  // Allow variant change at runtime (for cinematic/demo tooling)
  function setVariant(v: Variant) {
    if (v !== 'Editorial' && v !== 'SteelGrid' && v !== 'LuxCyberpunk') return;
    variant = v;
    shell.dataset.variant = v;
  }

  // Input
  function handleKey(e: KeyboardEvent) {
    const k = e.key;
    if (k === 'ArrowUp' || k === 'w' || k === 'W') engine.setDirection('up');
    else if (k === 'ArrowDown' || k === 's' || k === 'S') engine.setDirection('down');
    else if (k === 'ArrowLeft' || k === 'a' || k === 'A') engine.setDirection('left');
    else if (k === 'ArrowRight' || k === 'd' || k === 'D') engine.setDirection('right');
  }
  window.addEventListener('keydown', handleKey);

  // Minimal debug API for lab runners
  const debugApi = {
    step: () => {
      // force a full step worth of time to advance once
      engine.advance(engine.state().speedMs + 1);
    },
    feed: () => {
      // place fruit directly in front of head so next step eats it
      const st = engine.state();
      const head = st.snake[0];
      const next = { x: head.x + st.dir.x, y: head.y + st.dir.y };
      // clamp within bounds just in case
      next.x = Math.max(0, Math.min(st.cols - 1, next.x));
      next.y = Math.max(0, Math.min(st.rows - 1, next.y));
      st.fruit = next as any;
    },
    getScore: () => engine.state().score,
    setVariant: (v: Variant) => setVariant(v),
    setSpeedFactor: (f: number) => {
      const base = Math.round(BASE_SPEED_MS * timeFactor);
      const ms = Math.max(40, Math.round(base / Math.max(0.1, f)));
      speedMs = ms;
      engine.setSpeedMs(speedMs);
    },
  } as const;
  // Always available in demo; inert for production unless referenced
  (window as any).heroSnakeDebug = debugApi;

  // Optional external control via CustomEvent
  window.addEventListener('snake:test:setVariant', (e: any) => {
    const v = e?.detail as Variant;
    setVariant(v);
  });

  // Acceptance test hook: reach goal without pausing
  const testReachGoal = () => {
    const st = engine.state();
    const goal = scoreGoal;
    if (st.score < goal) {
      st.score = goal;
      hudLabel.textContent = `Score: ${st.score}`;
    }
    if (!unlockedFired) {
      unlockedFired = true;
      emit('snake:unlock', { score: st.score, tod: liveTOD });
      props.onUnlock?.(st.score);
    }
  };
  window.addEventListener('snake:test:reachGoal', testReachGoal as EventListener);

  // Variant turn sweep on direction change: wrap method
  const originalSetDir = engine.setDirection.bind(engine);
  engine.setDirection = (dir) => {
    originalSetDir(dir);
    if (variant === 'LuxCyberpunk') {
      wrap.classList.remove('sweep-glassEdge'); void wrap.offsetWidth; wrap.classList.add('sweep-glassEdge');
    }
    // Emotive: micro camera shake on turn
    emotive.onTurn();
  };

  // Bypass overlay behavior
  let overlayUnmount: { unmount(): void } | null = null;
  const backLink = document.createElement('a');
  backLink.href = '#';
  backLink.textContent = 'Back to Game';
  backLink.setAttribute('role', 'button');
  backLink.setAttribute('data-role', 'return-to-game');
  backLink.style.marginTop = '12px';

  skip.addEventListener('click', (e) => {
    e.preventDefault();
    emit('snake:bypass', { score: engine.state().score });
    props.onBypass?.(engine.state().score);
    if (!overlayUnmount) {
      overlay.innerHTML = '';
      const inner = document.createElement('div');
      inner.className = 'hero-content glass-chip';
      const heading = document.createElement('h1');
      heading.textContent = 'Designing precision into possibility.';
      const sub = document.createElement('p');
      sub.textContent = 'Time-aware gradient hero overlay';
      inner.append(heading, sub);
      const oHost = document.createElement('div');
      inner.append(oHost);
      backLink.addEventListener('click', (ev) => {
        ev.preventDefault();
        overlay.classList.remove('active');
        overlayUnmount?.unmount();
        overlayUnmount = null;
        emit('snake:return', { score: engine.state().score });
        safeFocus(skip);
      }, { once: true });
      inner.append(backLink);
      overlay.append(inner);

      overlayUnmount = mountHeroContainer(oHost, {
        timeOfDay: time,
        headline: 'Designing precision into possibility.',
        subheadline: 'Overlay is non-blocking; game runs behind.',
        primaryCta: { label: 'Explore', href: '#' },
        secondaryCta: { label: 'Contact', href: '#' },
        reducedMotion: rm,
      });
    }
    overlay.classList.add('active');
  });

  // Parallax
  const parallax = (ev: MouseEvent) => {
    if (!enableParallax || rm) return;
    const rect = shell.getBoundingClientRect();
    const nx = ((ev.clientX - rect.left) / rect.width) - 0.5;
    const ny = ((ev.clientY - rect.top) / rect.height) - 0.5;
    const dx = Math.max(-1, Math.min(1, nx)) * 6;
    const dy = Math.max(-1, Math.min(1, ny)) * 6;
    grid.style.transform = `translate(${dx}px, ${dy}px)`;
    hud.style.transform = `translate(${dx * 0.5}px, ${dy * 0.5}px)`;
  };
  shell.addEventListener('pointermove', parallax);

  // Drawing
  function draw(state: EngineState) {
    const { w, h } = computeGrid();
    // Resize canvas if layout changed significantly
    if (canvas.clientWidth !== w || canvas.clientHeight !== h) {
      resizeCanvas();
      ({ cols, rows } = computeGrid());
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const lw = pickStroke(variant);
    const { snakeColor, edgeColor } = pickColors(ctx, variant, liveTOD);

    // Fruit
    ctx.fillStyle = getComputedStyle(root).getPropertyValue('--color-accent-icyBlue').trim();
    const fx = state.fruit.x * cellPx + cellPx * 0.5;
    const fy = state.fruit.y * cellPx + cellPx * 0.5;
    const fr = Math.max(2, Math.floor(cellPx * 0.25));
    ctx.beginPath(); ctx.arc(fx, fy, fr, 0, Math.PI * 2); ctx.fill();

    // Snake
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = lw;

    const glowAmp = seasonalGlowAmp();
    if (!rm) {
      const baseBlur = liveTOD === 'evening' ? 8 : 3;
      ctx.shadowBlur = Math.max(0, Math.round(baseBlur * glowAmp));
      ctx.shadowColor = getComputedStyle(root).getPropertyValue('--color-accent-icyBlue').trim();
    } else {
      ctx.shadowBlur = 0;
    }

    ctx.strokeStyle = snakeColor;
    ctx.beginPath();
    for (let i = 0; i < state.snake.length; i++) {
      const s = state.snake[i];
      const cx = s.x * cellPx + cellPx / 2;
      const cy = s.y * cellPx + cellPx / 2;
      if (i === 0) ctx.moveTo(cx, cy); else ctx.lineTo(cx, cy);
    }
    ctx.stroke();

    // Edge highlight overlay
    ctx.shadowBlur = 0;
    ctx.strokeStyle = edgeColor;
    ctx.globalAlpha = 0.5;
    ctx.stroke();
    ctx.globalAlpha = 1;

    // HUD score update
    if (state.snake.length !== lastLen) {
      lastLen = state.snake.length;
      hudLabel.textContent = `Score: ${state.score}`;
    }
  }

  // RAF loop and FPS throttle
  let fpsThrottled = false;
  let lowFpsFrames = 0;
  const loop = createRafLoop({
    onFrame: (dt) => {
      engine.advance(dt);
      if (fpsThrottled) {
        // Optionally degrade visuals further if needed
      }
    },
    onFps: (fps) => {
      if (fps < 50) lowFpsFrames++; else lowFpsFrames = 0;
      fpsThrottled = lowFpsFrames > 60; // ~1s of low fps
      if (fpsThrottled) {
        gridLines.style.opacity = '0.25';
        wrap.classList.remove('sweep-glassEdge', 'eat-pop');
      } else {
        gridLines.style.opacity = '';
      }
    },
  });

  // Start
  engine.start();
  loop.start();

  // Resize observer to re-init engine grid if size changed significantly
  const ro = new ResizeObserver(() => {
    const g = computeGrid();
    if (g.cols !== cols || g.rows !== rows) {
      // Recreate engine to change grid dimension, preserving score
      const prev = engine.state();
      // Stop old: we can't rebuild engine internals without exposing setter; simple approach: stop and new engine
      // For simplicity in this version we won't hot-swap engine; rely on frequent recalculation of drawing only.
      // Future improvement: engine.resize(cols, rows)
    }
    resizeCanvas();
  });
  ro.observe(wrap);

  return {
    unmount() {
      loop.stop();
      engine.stop();
      window.removeEventListener('keydown', handleKey);
      window.removeEventListener('snake:test:reachGoal', testReachGoal as EventListener);
      shell.removeEventListener('pointermove', parallax);
      ro.disconnect();
      overlayUnmount?.unmount();
      unbindTime();
      emotive.destroy();
      shell.remove();
    },
    getStatus() {
      return { fpsThrottled, reducedMotion: rm, timeOfDay: liveTOD, variant, scoreGoal };
    }
  };
}

export default mountHeroSnake;
