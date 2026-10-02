# ITZFIZZ Scroll-Driven Hero (Next.js + Tailwind + GSAP)

## Run
```bash
npm install
npm run dev     # http://localhost:3000
```

## How it works
- **Intro (on load):** GSAP timeline staggers the headline letters in, then the four stat cards one by one, with a count-up.
- **Scroll (core):** ScrollTrigger pins the hero (`pin: true`) and scrubs (`scrub: 1`) so the car's position is tied to scroll progress and smoothed.
- **Car:** `x` moves from 0 to `roadWidth - carWidth * 0.25`.
- **Trail:** `scaleX` grows from the left, following the car.
- **Headline:** letter centres are measured once (on `refreshInit`); letters light up when the car's front passes them.
- **Extras:** headlight beam, speed HUD, and a slight tilt driven by scroll velocity.

## Performance
- Only `transform` (x, rotation, scaleX, y) and opacity are animated.
- `gsap.quickSetter` avoids per-frame allocations; no layout reads inside scroll handlers.
- `gsap.context` cleans up on unmount. `prefers-reduced-motion` shows the finished scene.

## Customize
- Replace `public/car.svg` with a top-down car image that faces right.
- Edit `STATS` and `WORDS` in `components/Hero.js`.
