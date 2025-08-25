/**
 * Accessibility utilities for focus visibility, reduced motion detection, and skip-to-content.
 * These helpers avoid inline color/type styling and rely on CSS utility classes.
 */

export function isReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Apply a focus-visible friendly behavior on an element.
 * Adds a keydown listener to enable focus ring for keyboard users only.
 */
export function setupFocusVisibleScope(root: HTMLElement): () => void {
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Tab') root.classList.add('focus-visible-scope');
  };
  const onMouse = () => root.classList.remove('focus-visible-scope');
  window.addEventListener('keydown', onKey);
  window.addEventListener('mousedown', onMouse);
  return () => {
    window.removeEventListener('keydown', onKey);
    window.removeEventListener('mousedown', onMouse);
  };
}

/**
 * Create a Skip to Content link for accessibility.
 * The link is visually hidden until focused.
 * Returns the anchor element for further customization or removal.
 */
export function createSkipToContent(targetId: string, label = 'Skip to content'): HTMLAnchorElement {
  const a = document.createElement('a');
  a.className = 'skip-to-content';
  a.href = `#${targetId}`;
  a.textContent = label;
  a.addEventListener('click', () => {
    const target = document.getElementById(targetId);
    if (target) target.focus({ preventScroll: false });
  });
  document.body.prepend(a);
  return a;
}

/**
 * Set ARIA pressed state utility.
 */
export function setAriaPressed(el: HTMLElement, pressed: boolean): void {
  el.setAttribute('aria-pressed', pressed ? 'true' : 'false');
}

/**
 * Move focus safely back to an element if it still exists in the DOM.
 */
export function safeFocus(el: HTMLElement | null | undefined): void {
  if (!el) return;
  try { el.focus(); } catch { /* noop */ }
}
