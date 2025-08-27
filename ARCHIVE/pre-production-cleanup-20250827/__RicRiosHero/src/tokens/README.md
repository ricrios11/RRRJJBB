# Tokens — LuxCyberpunk + TimeOS

Alignment Addendum v1 — Token Taxonomy and Usage

- color: base.*, accent.*, alert.* — reference via CSS vars only (no hex inline).
- glass: blur.*, opacity.*, edge.* — blur ≤ 6px on panes <800×400.
- type: display.h1, ui.m, mono.counter — font family/size/tracking.
- motion: pulse.heartbeat, sweep.glassEdge, snake.turn|eat|milestone — use `--motion-*` vars for durations/easings.
- grid: stroke.steelBlue, cell.sizeBase — gridlines and canvas scaling.
- z: hero.base|grid|canvas|hud|skip|overlay — layer composition.
- timeos: gradient.[morning|afternoon|evening], light.intensity.*, glassTemp.*, glass.temp.[warm|neutral|icy]

Do/Don’t
- Do: use `tokens` exported from `src/tokens/style.ts` in TS.
- Do: use `.glass-chip`, `.hud-counter`, `.skip-pill`, `.hero-shell`, `.hero-grid`, `.grid-lines` utilities.
- Don’t: inline any color hex/rgb or cubic-bezier values; use token variables.

Examples
- TypeScript
```ts
import tokens from '../tokens/style.js';
const steelStroke = tokens.grid.stroke.steelBlue;
```

- CSS
```css
.hero-shell[data-time="evening"] { background: var(--timeos-gradient-evening); }
.grid-lines { background-size: var(--grid-cell-size) var(--grid-cell-size); }
```
