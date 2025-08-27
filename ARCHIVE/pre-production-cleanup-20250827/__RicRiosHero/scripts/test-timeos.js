// Minimal unit test for resolveTimeOfDay()
import { resolveTimeOfDay } from '../dist/src/tokens/timeos.js';

function t(h, m = 0) { const d = new Date('2025-01-01T00:00:00Z'); d.setUTCHours(h, m, 0, 0); return d; }

function assertEq(actual, expected, msg) {
  if (actual !== expected) {
    console.error(`FAIL: ${msg} — expected ${expected}, got ${actual}`);
    process.exit(1);
  }
}

// Boundaries (5-state fallback windows)
assertEq(resolveTimeOfDay(new Date('2025-01-01T04:59:00')), 'evening', '04:59 -> evening');
assertEq(resolveTimeOfDay(new Date('2025-01-01T05:00:00')), 'dawn', '05:00 -> dawn');
assertEq(resolveTimeOfDay(new Date('2025-01-01T06:59:00')), 'dawn', '06:59 -> dawn');
assertEq(resolveTimeOfDay(new Date('2025-01-01T07:00:00')), 'morning', '07:00 -> morning');
assertEq(resolveTimeOfDay(new Date('2025-01-01T11:59:00')), 'morning', '11:59 -> morning');
assertEq(resolveTimeOfDay(new Date('2025-01-01T12:00:00')), 'afternoon', '12:00 -> afternoon');
assertEq(resolveTimeOfDay(new Date('2025-01-01T16:59:00')), 'afternoon', '16:59 -> afternoon');
assertEq(resolveTimeOfDay(new Date('2025-01-01T17:00:00')), 'dusk', '17:00 -> dusk');
assertEq(resolveTimeOfDay(new Date('2025-01-01T18:59:00')), 'dusk', '18:59 -> dusk');
assertEq(resolveTimeOfDay(new Date('2025-01-01T19:00:00')), 'evening', '19:00 -> evening');

// Typical values
assertEq(resolveTimeOfDay(new Date('2025-01-01T06:00:00')), 'dawn', '06:00 -> dawn');
assertEq(resolveTimeOfDay(new Date('2025-01-01T08:00:00')), 'morning', '08:00 -> morning');
assertEq(resolveTimeOfDay(new Date('2025-01-01T15:00:00')), 'afternoon', '15:00 -> afternoon');
assertEq(resolveTimeOfDay(new Date('2025-01-01T18:00:00')), 'dusk', '18:00 -> dusk');
assertEq(resolveTimeOfDay(new Date('2025-01-01T22:00:00')), 'evening', '22:00 -> evening');

console.log('All resolveTimeOfDay tests passed.');
