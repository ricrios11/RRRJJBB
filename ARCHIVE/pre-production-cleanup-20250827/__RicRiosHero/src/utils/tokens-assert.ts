/**
 * Token validator — warns if inline styles contain non-token color/type/motion properties.
 * Non-destructive: logs to console.warn, does not throw.
 */

const COLOR_PROPS = new Set(['color', 'background', 'backgroundColor', 'borderColor', 'fill', 'stroke']);
const TYPE_PROPS = new Set(['fontFamily', 'fontSize', 'letterSpacing']);
const MOTION_PROPS = new Set(['animationTimingFunction', 'transitionTimingFunction']);

/**
 * Scan inline styles on an element and warn if sensitive properties are set.
 */
export function assertTokensOnElement(el: HTMLElement, context: string): void {
  const style = el.style as CSSStyleDeclaration & Record<string, string>;
  for (const prop of COLOR_PROPS) {
    const v = style[prop as any];
    if (v && !v.includes('var(')) {
      console.warn(`[tokens] ${context}: inline color-like style '${prop}' without token var()`, { element: el, value: v });
    }
  }
  for (const prop of TYPE_PROPS) {
    const v = style[prop as any];
    if (v && !v.includes('var(')) {
      console.warn(`[tokens] ${context}: inline type-like style '${prop}' without token var()`, { element: el, value: v });
    }
  }
  for (const prop of MOTION_PROPS) {
    const v = style[prop as any];
    if (v && v.includes('cubic-bezier(')) {
      console.warn(`[tokens] ${context}: inline cubic-bezier detected; use token easing`, { element: el, value: v });
    }
  }
}

/**
 * Recursively scan children of root for inline violations (shallow by default).
 */
export function assertTokens(root: HTMLElement, context = 'component', deep = false): void {
  assertTokensOnElement(root, context);
  if (!deep) return;
  root.querySelectorAll<HTMLElement>('*').forEach((n) => assertTokensOnElement(n, context));
}

export default assertTokens;
