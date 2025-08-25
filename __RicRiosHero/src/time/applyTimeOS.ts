import { TimeCtx } from "./time-context.js";
import type { TimeOfDay } from "../tokens/timeos.js";
import { resolveTimeOfDay } from "../tokens/timeos.js";
import { SeasonConfig, resolveSeason, DEFAULT_SEASONAL_MATRIX, type Season, type TimeOfDay5 } from "../tokens/seasonal.js";
import { GeoConfig, setGeo } from "./geo-solar.js";
import { emit } from "../infra/trojan.js";

// One-time "No Mid Visuals" compliance scan
let __scannedMidVisuals = false;
function scanNoMidVisualsOnce() {
  if (__scannedMidVisuals) return; __scannedMidVisuals = true;
  try {
    requestAnimationFrame(() => {
      const imgs = Array.from(document.querySelectorAll('img[src^="data:"]')) as HTMLImageElement[];
      const styled = Array.from(document.querySelectorAll<HTMLElement>('[style]')).filter(el => /url\(\s*data:/i.test(el.getAttribute('style') || ''));
      if (imgs.length || styled.length) {
        console.warn('[DOS] Mid visual output detected — not permitted');
      }
    });
  } catch {}
}
scanNoMidVisualsOnce();

// Initialize seasonal + geo flags from URL (non-destructive; no-op if absent)
const __qp = new URLSearchParams(location.search);
const qpSeasonal = __qp.get('seasonal') === '1';
const qpHemi = __qp.get('hemi');
const qpGeo = __qp.get('geo') === '1';
const qpLat = __qp.get('lat');
const qpLon = __qp.get('lon');
const qpParticles = __qp.get('particles') === '1';
try { (SeasonConfig as any).ENABLED = qpSeasonal || SeasonConfig.ENABLED; } catch {}
try { if (qpHemi === 'south' || qpHemi === 'north') (SeasonConfig as any).HEMISPHERE = qpHemi; } catch {}
try { (GeoConfig as any).ENABLED = qpGeo || GeoConfig.ENABLED; } catch {}
if (qpGeo) {
  const lat = qpLat ? Number(qpLat) : NaN;
  const lon = qpLon ? Number(qpLon) : NaN;
  if (Number.isFinite(lat) && Number.isFinite(lon)) {
    setGeo(lat, lon);
  } else if (navigator.geolocation) {
    // Async geolocation; safe defaults if denied.
    navigator.geolocation.getCurrentPosition((pos) => {
      setGeo(pos.coords.latitude, pos.coords.longitude);
      // Re-resolve ToD with geo boundaries and propagate
      try { TimeCtx.set(resolveTimeOfDay()); } catch {}
    }, () => { /* ignore */ }, { enableHighAccuracy: false, maximumAge: 600000, timeout: 4000 });
  }
}
// Optional particles flag surfaces as a data attribute for CSS/JS consumers
try { if (qpParticles) document.documentElement.setAttribute('data-particles', '1'); } catch {}

/** Bind seasonal CSS variables for the given 5‑state ToD. */
export function bindSeasonalAdjustments(style: CSSStyleDeclaration, tod: TimeOfDay5, date = new Date()) {
  if (!SeasonConfig.ENABLED) return;
  const s: Season = resolveSeason(date);
  const adj = DEFAULT_SEASONAL_MATRIX[s][tod];

  const forceRm = document.documentElement.classList.contains('force-reduced-motion') || document.body.classList.contains('force-reduced-motion');

  style.setProperty('--season-sat', String(adj.sat));
  style.setProperty('--season-warm-shift', String(adj.warmShift));
  style.setProperty('--season-cool-shift', String(adj.coolShift));
  style.setProperty('--season-curve-bias', String(adj.curveBias));
  style.setProperty('--season-base-ms-bias', String(forceRm ? 0 : adj.baseSpeedBiasMs));
  style.setProperty('--season-pulse-amp-bias', String(forceRm ? 1 : adj.pulseAmpBias));
  style.setProperty('--season-glow-amp', String(adj.glowAmp));
  // Derived UI pulse scale for heartbeat animation: baseline 1.02 scaled by seasonal pulse amp bias
  try {
    const baseline = 1.02;
    const scale = forceRm ? 1 : (1 + (baseline - 1) * adj.pulseAmpBias);
    style.setProperty('--ui-heartbeat-scale', String(scale));
  } catch {}
}

let __lastToD: TimeOfDay | null = null;
let __lastSeason: Season | null = null;

/** Attach a data-timeofday attribute and keep it in sync. */
export function bindTimeOS(
  root: HTMLElement,
  initial?: TimeOfDay | 'auto',
  opts?: { mirrorDataTime?: boolean; onChange?: (t: TimeOfDay) => void }
) {
  const mirror = opts?.mirrorDataTime !== false; // default true for back-compat
  const apply = (t: TimeOfDay) => {
    root.setAttribute('data-timeofday', t);
    if (mirror) root.setAttribute('data-time', t);
    // Seasonal CSS vars
    try { bindSeasonalAdjustments(document.documentElement.style, t as unknown as TimeOfDay5); } catch {}
    // Emit ToD change once per change and log season if enabled
    if (__lastToD !== t) {
      __lastToD = t;
      try { emit('snake:ToDChange' as any, { to: t }); } catch {}
    }
    if (SeasonConfig.ENABLED) {
      try {
        const s = resolveSeason();
        if (__lastSeason !== s) {
          __lastSeason = s;
          console.log('[seasonal] season:', s, `(hemi=${SeasonConfig.HEMISPHERE})`);
          emit('snake:seasonChange' as any, { season: s, hemi: SeasonConfig.HEMISPHERE });
        }
      } catch {}
    }
    opts?.onChange?.(t);
  };
  if (initial === 'auto' || !initial) apply(TimeCtx.timeOfDay); else apply(initial);

  // live-sync on changes (e.g., demo toggle)
  const unsub = TimeCtx.subscribe(apply);
  return () => unsub();
}

export default bindTimeOS;
