// Lightweight FPS + frame-time overlay (no deps)
export function attachFpsOverlay({
  parent = document.body,
  warnMs = 14,     // >14ms avg over 120 frames = warn ( < ~72fps )
  dangerMs = 20    // >20ms avg over 120 frames = danger ( < ~50fps )
} = {}) {
  const el = document.createElement('div');
  el.setAttribute('data-fps', '');
  Object.assign(el.style, {
    position: 'fixed', right: '12px', bottom: '12px', zIndex: '99999',
    font: '12px/1.2 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    padding: '8px 10px', borderRadius: '10px', backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)', color: '#111', boxShadow: '0 2px 12px rgba(0,0,0,.12)',
    background: 'rgba(255,255,255,.75)', pointerEvents: 'none'
  });
  parent.appendChild(el);

  let last = performance.now();
  let samples = [];
  let anim;
  const tick = () => {
    const now = performance.now();
    const dt = now - last; last = now;
    samples.push(dt); if (samples.length > 120) samples.shift();

    const avg = samples.reduce((a,b)=>a+b,0)/samples.length;
    const fps = Math.round(1000/avg);
    const status = avg > dangerMs ? 'danger' : avg > warnMs ? 'warn' : 'ok';

    el.textContent = `FPS ${fps}  |  ${avg.toFixed(1)} ms`;
    if (status === 'ok')   el.style.background = 'rgba(240,255,240,.80)';
    if (status === 'warn') el.style.background = 'rgba(255,247,200,.85)';
    if (status === 'danger') el.style.background = 'rgba(255,225,225,.90)';

    anim = requestAnimationFrame(tick);
  };
  anim = requestAnimationFrame(tick);

  // Optional: Long task observer (debug hint)
  if ('PerformanceObserver' in window) {
    const po = new PerformanceObserver((list)=>{
      for (const e of list.getEntries()) {
        if (e.duration > 50) {
          el.textContent += `  • LONG ${Math.round(e.duration)}ms`;
          el.style.background = 'rgba(255,225,225,.95)';
        }
      }
    });
    try { po.observe({entryTypes:['longtask']}); } catch {}
  }

  return () => { cancelAnimationFrame(anim); el.remove(); };
}
