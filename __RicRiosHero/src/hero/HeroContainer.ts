/**
 * Simple Time‑Aware Hero (bypass target)
 *
 * Public API
 * - mountHeroContainer(el, props) => { unmount }
 */

import type { TimeOfDay } from '../tokens/timeos.js';
import tokens from '../tokens/style.js';
import { isReducedMotion } from '../utils/a11y.js';
import { bindTimeOS } from '../time/applyTimeOS.js';
import { assertTokens } from '../utils/tokens-assert.js';

export type HeroCTA = { label: string; href: string };

export type HeroProps = {
  timeOfDay?: TimeOfDay | 'auto';
  headline: string;
  subheadline?: string;
  primaryCta?: HeroCTA;
  secondaryCta?: HeroCTA;
  compressed?: boolean;
  reducedMotion?: boolean;
};

export type HeroHandle = { unmount(): void };

/**
 * Mount a full‑width hero with TimeOS gradient and glass content.
 * Gradient is driven by time‑of‑day; pulse disabled under reduced motion.
 */
export function mountHeroContainer(el: HTMLElement, props: HeroProps): HeroHandle {
  const rm = props.reducedMotion ?? isReducedMotion();

  const shell = document.createElement('section');
  shell.className = 'hero-shell';
  shell.setAttribute('role', 'region');
  shell.setAttribute('aria-label', 'Hero');
  if (props.compressed) shell.classList.add('compressed');

  const unbind = bindTimeOS(shell, props.timeOfDay ?? 'auto');

  const content = document.createElement('div');
  content.className = 'hero-content glass-chip';

  const h1 = document.createElement('h1');
  h1.textContent = props.headline;
  h1.classList.add('display-h1');

  const p = document.createElement('p');
  if (props.subheadline) p.textContent = props.subheadline;
  p.classList.add('ui-m');

  const ctas = document.createElement('div');
  ctas.className = 'hero-cta-row cta-row';

  function makeCta(c: HeroCTA | undefined) {
    if (!c) return null;
    const a = document.createElement('a');
    a.href = c.href;
    a.textContent = c.label;
    a.setAttribute('role', 'button');
    a.setAttribute('aria-label', c.label);
    // Apply button classes (primary for first, outline for second)
    if (!ctas.firstChild) a.className = 'btn btn-primary'; else a.className = 'btn btn-outline';
    return a;
  }

  const a1 = makeCta(props.primaryCta);
  const a2 = makeCta(props.secondaryCta);
  if (a1) ctas.appendChild(a1);
  if (a2) ctas.appendChild(a2);

  content.append(h1);
  if (props.subheadline) content.append(p);
  if (a1 || a2) content.append(ctas);

  if (!rm) content.classList.add('pulse-heartbeat');

  shell.append(content);
  el.append(shell);

  // Runtime token assertion (shallow)
  assertTokens(shell, 'HeroContainer', false);

  return {
    unmount() {
      unbind();
      shell.remove();
    },
  };
}

export default mountHeroContainer;
