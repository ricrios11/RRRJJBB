// Cinematic runner: orchestrates a short guided demo
import { createDirector } from './director-overlay.js';
import { TimeCtx, resolve as resolveTOD } from '/dist/src/time/time-context.js';
import { themeSwap } from '/dist/src/infra/trojan.js';

export function startCinematic({ enableThemeSwap = true } = {}) {
  const dbg = (window).heroSnakeDebug;
  const director = createDirector();
  let stopped = false;
  const steps = [];

  const play = async () => {
    try {
      // Act 1 — Morning Editorial
      if (stopped) return; director.show('Act 1: Editorial • Morning');
      TimeCtx.set('morning');
      dbg?.setVariant?.('Editorial');
      dbg?.setSpeedFactor?.(1.0);
      await wait(1400);

      // Act 2 — SteelGrid • Afternoon
      if (stopped) return; director.show('Act 2: SteelGrid • Afternoon');
      TimeCtx.set('afternoon');
      dbg?.setVariant?.('SteelGrid');
      dbg?.setSpeedFactor?.(1.1);
      await wait(1400);

      // Act 3 — LuxCyberpunk • Evening + Theme Swap (optional)
      if (stopped) return; director.show('Act 3: LuxCyberpunk • Evening');
      TimeCtx.set('evening');
      dbg?.setVariant?.('LuxCyberpunk');
      dbg?.setSpeedFactor?.(1.2);
      if (enableThemeSwap) themeSwap('altLux');
      await wait(1400);

      // Finale — Quick run to milestone
      if (stopped) return; director.show('Finale: Run to milestone');
      const until = Math.max(6, (dbg?.getScore?.()||0) + 3);
      const timer = setInterval(()=> { try { dbg?.feed?.(); dbg?.step?.(); dbg?.step?.(); } catch {} }, 90);
      await wait(1400);
      clearInterval(timer);
    } catch {}
  };

  play();

  function stop(){ stopped = true; director.clear(); }
  return stop;
}

function wait(ms){ return new Promise(r => setTimeout(r, ms)); }
