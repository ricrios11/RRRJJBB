/**
 * Emotive Stack — minimal DOM + class orchestrations driven by Snake events.
 * - Tokens-only styling in CSS: src/snake/styles/effects.css
 * - Respects reduced motion (media query + .force-reduced-motion)
 */

export type EmotiveAPI = {
  onEat(): void;
  onTurn(): void;
  onGameOver(): void;
  setEmojiDebug(enabled: boolean): void;
  destroy(): void;
};

export function createEmotiveStack(opts: {
  shell: HTMLElement;
  wrap: HTMLElement;
  reducedMotion: boolean;
}): EmotiveAPI {
  const { shell, wrap, reducedMotion: rm } = opts;

  // Eyes overlay
  const eyes = document.createElement('div');
  eyes.className = 'emote-eyes';
  const eyeL = document.createElement('div'); eyeL.className = 'eye';
  const eyeR = document.createElement('div'); eyeR.className = 'eye';
  eyes.append(eyeL, eyeR);
  wrap.appendChild(eyes);

  // Emoji hint node (debug only)
  const emoji = document.createElement('div');
  emoji.className = 'emoji-hint';
  shell.appendChild(emoji);

  // Particles layer
  const particles = document.createElement('div');
  particles.className = 'particles';
  wrap.appendChild(particles);

  let blinkTimer: number | null = null;
  function scheduleBlink() {
    if (rm) return;
    const nextMs = 1800 + Math.random() * 2400; // 1.8–4.2s
    blinkTimer = window.setTimeout(() => {
      shell.classList.add('eyes-blink');
      setTimeout(() => shell.classList.remove('eyes-blink'), 260);
      scheduleBlink();
    }, nextMs) as unknown as number;
  }
  scheduleBlink();

  function ensureParticles() {
    if (rm) return;
    // Only active when html[data-particles="1"]
    if (document.documentElement.getAttribute('data-particles') !== '1') return;
    if (particles.childElementCount > 0) return;
    const count = 10; // small number to stay performant
    const w = wrap.clientWidth || 320;
    const h = wrap.clientHeight || 180;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'p';
      const x = Math.random() * w;
      const y = (Math.random() * h * 0.8) + h * 0.1;
      p.style.left = `${Math.round(x)}px`;
      p.style.top = `${Math.round(y)}px`;
      // stagger using custom property consumed by CSS
      p.style.setProperty('--p-delay', `${(Math.random() * 2).toFixed(2)}s`);
      particles.appendChild(p);
    }
  }
  ensureParticles();

  function onEat() {
    // Teeth sparkle (short-lived class)
    wrap.classList.add('teeth-spark');
    setTimeout(() => wrap.classList.remove('teeth-spark'), 420);
  }

  function onTurn() {
    if (rm) return;
    wrap.classList.add('cam-shake');
    setTimeout(() => wrap.classList.remove('cam-shake'), 260);
  }

  function onGameOver() {
    if (rm) return;
    // brief stronger shake by chaining twice
    onTurn();
    setTimeout(onTurn, 120);
  }

  function setEmojiDebug(enabled: boolean) {
    if (enabled) shell.setAttribute('data-emoji', '1'); else shell.removeAttribute('data-emoji');
  }

  function destroy() {
    if (blinkTimer) { clearTimeout(blinkTimer); blinkTimer = null; }
    eyes.remove();
    particles.remove();
    emoji.remove();
  }

  return { onEat, onTurn, onGameOver, setEmojiDebug, destroy };
}

export default createEmotiveStack;
