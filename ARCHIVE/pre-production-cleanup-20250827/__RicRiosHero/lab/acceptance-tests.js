// Acceptance Test Harness for Snake Hero Demo
// Run when ?accept=1
import { TimeCtx, resolve as resolveTOD } from '/dist/src/time/time-context.js';
import { TROJAN } from '/dist/src/infra/trojan.js';
import { SeasonConfig, resolveSeason } from '/dist/src/tokens/seasonal.js';
import { GeoConfig, setGeo } from '/dist/src/time/geo-solar.js';
import mountHeroSnake from '/dist/src/hero/HeroSnake.js';

function wait(ms){ return new Promise(r => setTimeout(r, ms)); }
function nextTick(){ return new Promise(r => requestAnimationFrame(()=>requestAnimationFrame(r))); }

async function ensureSnakeMounted(){
  // Ensure the immersive Snake hero is mounted (not the Simple Hero).
  // Snake hero uses role="application" and contains a canvas with class .hero-canvas.
  // If snake already mounted, we're done
  if (document.querySelector('.hero-shell[role="application"] .hero-canvas')) return;
  // Remove Simple Hero if present
  const root = document.getElementById('hero-root');
  const simple = root?.querySelector('.hero-shell:not([role="application"])');
  if (simple) simple.remove();
  // Mount Snake hero directly via module import (decoupled from demo initializer)
  if (root) {
    mountHeroSnake(root, { timeOfDay: 'auto' });
    await nextTick();
  }
}

async function testViewport() {
  await nextTick();
  const root = document.getElementById('hero-root');
  const rect = root?.getBoundingClientRect();
  const ok = !!rect && rect.width <= window.innerWidth + 1 && rect.height <= Math.max(200, window.innerHeight) + 1 && document.documentElement.scrollWidth <= window.innerWidth + 1;
  return { name: 'Viewport Scaling', pass: !!ok };
}

async function testTimeOS() {
  const seq = ['dawn','morning','afternoon','dusk','evening'];
  let ok = true;
  for (const t of seq) {
    TimeCtx.set(t);
    await wait(60);
    const attr = document.body.getAttribute('data-timeofday');
    if (attr !== t) ok = false;
  }
  TimeCtx.set(resolveTOD());
  return { name: 'TimeOS Live Switch', pass: ok };
}

async function testReducedMotion() {
  const html = document.documentElement;
  html.classList.add('force-reduced-motion');
  await nextTick();
  const v = getComputedStyle(html).getPropertyValue('--motion-snake-eat-dur').trim();
  const pass = v === '1ms';
  html.classList.remove('force-reduced-motion');
  return { name: 'Reduced Motion Diff', pass };
}

async function testUnlockBypass() {
  // enable analytics collection to capture events
  const events = [];
  const prev = (window).analytics?.emit;
  (window).analytics = (window).analytics || {};
  (window).analytics.emit = (name, payload) => events.push({ name, payload });
  TROJAN.ANALYTICS_ENABLED = true;

  // trigger unlock
  window.dispatchEvent(new CustomEvent('snake:test:reachGoal'));
  await wait(50);
  const unlockOnce = events.filter(e=>e.name==='snake:unlock').length === 1;

  // trigger bypass and return
  const skip = document.querySelector('.skip-pill');
  skip?.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
  await wait(60);
  const overlay = document.querySelector('.hero-overlay');
  const bypassOnce = events.filter(e=>e.name==='snake:bypass').length === 1 && overlay?.classList.contains('active');
  const back = overlay?.querySelector('[data-role="return-to-game"]');
  back?.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
  await wait(60);
  const returned = events.filter(e=>e.name==='snake:return').length === 1;

  // restore
  if (prev) (window).analytics.emit = prev;

  return { name: 'Unlock + Bypass', pass: unlockOnce && bypassOnce && returned };
}

async function testTokensGuard() {
  // basic heuristic: capture warns during a brief redraw burst
  const warns = [];
  const orig = console.warn;
  console.warn = (...args) => { warns.push(args.join(' ')); orig.apply(console, args); };
  try {
    // nudge drawing
    window.dispatchEvent(new Event('resize'));
    await nextTick();
  } finally {
    console.warn = orig;
  }
  const pass = !warns.some(w => /token/i.test(w));
  return { name: 'Tokens Guard', pass };
}

async function testPerformance() {
  const samples = [];
  let last = performance.now();
  await new Promise(resolve => {
    function raf(){
      const now = performance.now();
      samples.push(now - last); last = now;
      if (samples.length >= 120) return resolve();
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  });
  const avg = samples.reduce((a,b)=>a+b,0)/samples.length;
  const pass = avg <= 17.0; // ~60fps budget
  return { name: 'Performance (avg<=17ms over 120f)', pass, meta: { avg: Number(avg.toFixed(2)) } };
}

async function testSeasonalGeo() {
  // Capture events
  const events = [];
  const prevEmit = (window).analytics?.emit;
  (window).analytics = (window).analytics || {};
  (window).analytics.emit = (name, payload) => events.push({ name, payload });
  TROJAN.ANALYTICS_ENABLED = true;

  // Save previous configs to restore after test
  const prevSeason = { en: SeasonConfig.ENABLED, hemi: SeasonConfig.HEMISPHERE };
  const prevGeo = { en: GeoConfig.ENABLED, lat: GeoConfig.LAT, lon: GeoConfig.LON };

  let pass = true;
  try {
    // Enable seasonal (north) and force a stable ToD
    SeasonConfig.ENABLED = true;
    SeasonConfig.HEMISPHERE = 'north';
    TimeCtx.set('morning');
    await wait(80);

    const cs1 = getComputedStyle(document.documentElement);
    const bias1s = cs1.getPropertyValue('--season-base-ms-bias').trim();
    const glow1s = cs1.getPropertyValue('--season-glow-amp').trim();
    const bias1 = parseFloat(bias1s);
    const glow1 = parseFloat(glow1s);
    const okVarsPresent = bias1s !== '' && glow1s !== '' && Number.isFinite(bias1) && Number.isFinite(glow1);

    // Hemisphere flip should emit a seasonChange and likely alter seasonal vars
    SeasonConfig.HEMISPHERE = 'south';
    // Trigger apply via ToD set
    TimeCtx.set('morning');
    await wait(100);
    const hadSeasonEvent = events.some(e => e.name === 'snake:seasonChange');

    const cs2 = getComputedStyle(document.documentElement);
    const bias2 = parseFloat(cs2.getPropertyValue('--season-base-ms-bias'));
    const glow2 = parseFloat(cs2.getPropertyValue('--season-glow-amp'));
    const varsChanged = (bias1 !== bias2) || (glow1 !== glow2);

    // Geo toggle should not break ToD events; just sanity-check ToD emits under geo
    GeoConfig.ENABLED = true;
    setGeo(37.7749, -122.4194);
    TimeCtx.set('dawn');
    await wait(40);
    TimeCtx.set('evening');
    await wait(40);
    const hadToDEvent = events.some(e => e.name === 'snake:ToDChange');

    pass = okVarsPresent && hadSeasonEvent && varsChanged && hadToDEvent;
  } finally {
    // restore
    SeasonConfig.ENABLED = prevSeason.en;
    SeasonConfig.HEMISPHERE = prevSeason.hemi;
    GeoConfig.ENABLED = prevGeo.en;
    if (Number.isFinite(prevGeo.lat) && Number.isFinite(prevGeo.lon)) setGeo(prevGeo.lat, prevGeo.lon);
    if (prevEmit) (window).analytics.emit = prevEmit;
  }

  return { name: 'Seasonal + Geo', pass };
}

async function runAcceptance() {
  await ensureSnakeMounted();
  const results = [];
  results.push(await testViewport());
  results.push(await testTimeOS());
  results.push(await testReducedMotion());
  results.push(await testUnlockBypass());
  results.push(await testSeasonalGeo());
  results.push(await testTokensGuard());
  results.push(await testPerformance());

  const summary = Object.fromEntries(results.map(r => [r.name, r.pass ? 'PASS' : 'FAIL']));
  console.groupCollapsed('%cAcceptance Results', 'background:#0a1220;color:#9fe7ff;padding:2px 6px;border-radius:8px;');
  console.table(summary);
  for (const r of results) if (r.meta) console.log(r.name, r.meta);
  console.groupEnd();
}

(function maybeRun(){
  const q = new URLSearchParams(location.search);
  if (q.get('accept') === '1') runAcceptance();
})();
