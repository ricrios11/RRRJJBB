# TimeOS V3 Demo — Acceptance Results vFinal

## Acceptance Results v1

All checks passed via /lab/acceptance-tests.js on demo URL:
/lab/snake-hero-demo.html?mode=snake&accept=1&analytics=1&autoDiff=1&altLux=1

- Viewport Scaling: PASS
- TimeOS Live Switch: PASS
- Reduced Motion Diff: PASS
- Unlock + Bypass: PASS
- Tokens Guard: PASS
- Performance (avg<=17ms over 120f): PASS (avg ≈ 8.31ms)

Console proof captured during run.

## Trojan Hooks Status

- analytics: ENABLED via ?analytics=1
  - Emitted events observed: snake:eat, snake:milestone, snake:unlock, snake:bypass, snake:return
- themeSwap: ENABLED via ?altLux=1 (tokens present, inert by default). Perfect-score hook calls themeSwap('altLux').
- auto-difficulty: ENABLED via ?autoDiff=1, curve applied on milestone: speedMs ≈ BASE / difficultyAt(score)

## URL Flags

- ?analytics=1 — enable analytics emit()
- ?altLux=1 — enable themeSwap()
- ?autoDiff=1 — enable difficultyAt()
- ?accept=1 — run acceptance harness

## Close‑out checklist

- [x] /src/infra/trojan.ts exists and compiles
- [x] HeroSnake.ts emits hooks + supports return‑to‑game UX
- [x] .force-reduced-motion disables pulses/sweeps
- [x] /lab/acceptance-tests.js imported and logs PASS
- [x] snake:test:reachGoal hook triggers unlock without pause
- [x] Trojan Hooks doc block present in HeroSnake.ts
- [x] altLux CSS present and inert by default
- [x] URL flags toggle hooks as expected

## Next

- Add Lighthouse scripts to package.json and run a11y/perf audits (goal: a11y ≥ 95)
- Light docs: README section for demo flags + test harness usage
