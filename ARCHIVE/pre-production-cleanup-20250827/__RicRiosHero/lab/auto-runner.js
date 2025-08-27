// Auto-runner: programmatically feeds and steps the snake for demos
export function startAutoRunner({ intervalMs = 90, untilScore = 12 } = {}) {
  const dbg = (window).heroSnakeDebug;
  if (!dbg) {
    console.warn('[auto-runner] heroSnakeDebug not available');
    return () => {};
  }
  let timer;
  const tick = () => {
    try {
      if (dbg.getScore() >= untilScore) { stop(); return; }
      dbg.feed();
      // two steps to ensure head advances onto placed fruit
      dbg.step();
      dbg.step();
    } catch (e) { console.warn('[auto-runner] tick error', e); }
  };
  timer = setInterval(tick, Math.max(50, intervalMs));
  function stop(){ if (timer) { clearInterval(timer); timer = null; } }
  return stop;
}
