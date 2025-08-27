/**
 * /src/time/geo-solar.ts
 * Lightweight solar time calculator to geo-adapt TimeOS 5-state resolver.
 *
 * - No external deps. Approx NOAA algorithm for sunrise/sunset + civil twilight.
 * - All effects remain token-driven; this only informs time bucket boundaries.
 */

import type { TimeOfDay } from "../tokens/timeos.js";

export const GeoConfig: { ENABLED: boolean; LAT?: number; LON?: number } = {
  ENABLED: false,
  LAT: undefined,
  LON: undefined,
};

export function setGeo(lat: number, lon: number) {
  if (Number.isFinite(lat) && Number.isFinite(lon)) {
    GeoConfig.LAT = lat;
    GeoConfig.LON = lon;
  }
}

// Degrees to radians
const D2R = Math.PI / 180;
const R2D = 180 / Math.PI;

// Zenith angles
const ZENITH = {
  official: 90.833, // sunrise/sunset
  civil: 96.0, // civil dawn/dusk
} as const;

function dayOfYear(d: Date): number {
  const start = new Date(Date.UTC(d.getUTCFullYear(), 0, 0));
  const diff = d.getTime() - start.getTime();
  return Math.floor(diff / 86400000);
}

/** Compute local Date for sunrise/sunset or civil dawn/dusk. Returns null if sun never rises/sets. */
function solarEvent(date: Date, lat: number, lon: number, zenith: number, isSunrise: boolean): Date | null {
  const N = dayOfYear(new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())));
  const lngHour = lon / 15;
  const t = N + ((isSunrise ? 6 : 18) - lngHour) / 24;
  const M = 0.9856 * t - 3.289;
  let L = M + 1.916 * Math.sin(M * D2R) + 0.02 * Math.sin(2 * M * D2R) + 282.634;
  L = ((L % 360) + 360) % 360;
  let RA = R2D * Math.atan(0.91764 * Math.tan(L * D2R));
  RA = ((RA % 360) + 360) % 360;
  const Lquadrant = Math.floor(L / 90) * 90;
  const RAquadrant = Math.floor(RA / 90) * 90;
  RA = RA + (Lquadrant - RAquadrant);
  RA /= 15; // hours
  const sinDec = 0.39782 * Math.sin(L * D2R);
  const cosDec = Math.cos(Math.asin(sinDec));
  const cosH = (Math.cos(zenith * D2R) - sinDec * Math.sin(lat * D2R)) / (cosDec * Math.cos(lat * D2R));
  if (cosH > 1) return null; // sun never rises
  if (cosH < -1) return null; // sun never sets
  let H = isSunrise ? 360 - R2D * Math.acos(cosH) : R2D * Math.acos(cosH);
  H /= 15; // hours
  const T = H + RA - 0.06571 * t - 6.622;
  let UT = T - lngHour;
  UT = ((UT % 24) + 24) % 24;
  const baseUTC = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0, 0);
  const ts = baseUTC + UT * 3600000;
  return new Date(ts);
}

export type SolarTimes = {
  civilDawn: Date | null;
  sunrise: Date | null;
  solarNoon: Date | null; // approx midpoint of sunrise/sunset
  sunset: Date | null;
  civilDusk: Date | null;
};

export function getSolarTimes(date: Date, lat: number, lon: number): SolarTimes {
  const civilDawn = solarEvent(date, lat, lon, ZENITH.civil, true);
  const sunrise = solarEvent(date, lat, lon, ZENITH.official, true);
  const sunset = solarEvent(date, lat, lon, ZENITH.official, false);
  const civilDusk = solarEvent(date, lat, lon, ZENITH.civil, false);
  const solarNoon = (sunrise && sunset)
    ? new Date((sunrise.getTime() + sunset.getTime()) / 2)
    : null;
  return { civilDawn, sunrise, solarNoon, sunset, civilDusk };
}

/** Geo-aware TimeOS resolver. Falls back to windowed mapping on edge cases. */
export function geoResolveTimeOfDay(now: Date = new Date()): TimeOfDay {
  const { LAT, LON } = GeoConfig;
  if (!Number.isFinite(LAT as number) || !Number.isFinite(LON as number)) {
    return fallbackResolve(now);
  }
  const times = getSolarTimes(now, LAT as number, LON as number);
  // If calculation failed (e.g., polar day/night), fallback
  if (!times.civilDawn || !times.sunrise || !times.sunset || !times.civilDusk) {
    return fallbackResolve(now);
  }
  const t = now.getTime();
  const { civilDawn, sunrise, solarNoon, sunset, civilDusk } = times;
  if (t >= (civilDawn as Date).getTime() && t < (sunrise as Date).getTime()) return 'dawn';
  if (t >= (sunrise as Date).getTime() && solarNoon && t < solarNoon.getTime()) return 'morning';
  if (solarNoon && t >= solarNoon.getTime() && t < (sunset as Date).getTime()) return 'afternoon';
  if (t >= (sunset as Date).getTime() && t < (civilDusk as Date).getTime()) return 'dusk';
  // Night: after civil dusk or before civil dawn
  return 'evening';
}

// Import fallback from timeos at runtime to avoid circular import in TS types.
function fallbackResolve(now: Date): TimeOfDay {
  // Duplicate the simple window logic from timeos.ts to avoid circular import.
  const h = now.getHours();
  if (h >= 5 && h < 7) return 'dawn';
  if (h >= 7 && h < 12) return 'morning';
  if (h >= 12 && h < 17) return 'afternoon';
  if (h >= 17 && h < 19) return 'dusk';
  return 'evening';
}
