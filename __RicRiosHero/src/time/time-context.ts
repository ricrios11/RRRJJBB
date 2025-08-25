import { resolveTimeOfDay, type TimeOfDay } from "../tokens/timeos.js";

export type TimeContext = {
  timeOfDay: TimeOfDay;
  set(next: TimeOfDay): void;
  subscribe(fn: (t: TimeOfDay) => void): () => void;
};

let _tod: TimeOfDay = 'morning';
const subs = new Set<(t: TimeOfDay) => void>();

export const TimeCtx: TimeContext = {
  timeOfDay: resolve(),
  set(next) {
    _tod = next;
    subs.forEach(fn => fn(_tod));
  },
  subscribe(fn) { subs.add(fn); return () => subs.delete(fn); }
};

export function resolve(): TimeOfDay {
  return _tod = resolveTimeOfDay();
}
