# ITZFIZZ Scroll-Driven Hero (Next.js + Tailwind + GSAP)

**Assignment:** Scroll-Driven Hero Section Animation — Itzfizz Web Development Internship

- **Live site:** https://venky656.github.io/itzfizz-scroll-hero/
- **Repository:** https://github.com/Venky656/itzfizz-scroll-hero

## Run
```bash
npm install
npm run dev     # http://localhost:3000
npm run lint    # ESLint (next/core-web-vitals)
npm run build   # static export to /out
```

## Structure
```
app/
  layout.js        # fonts, metadata, favicon (icon.svg)
  page.js          # hero + closing CTA
  globals.css      # Tailwind base + reduced-motion fallback
  icon.svg         # site icon
components/
  Hero.js          # all GSAP intro + scroll logic
public/
  car.svg          # top-down car facing right
.github/workflows/
  deploy.yml       # build + deploy to GitHub Pages on push
```

## How it works
- **Intro (on load):** GSAP staggers the headline letters in (fade + slide, `power4.out`).
- **Scroll (core):** ScrollTrigger pins the hero (`pin: true`) and scrubs (`scrub: 1`) so the car's position is tied to scroll progress and smoothed.
- **Car:** `x` moves from 0 to `roadWidth - carWidth * 0.25`.
- **Trail:** `scaleX` grows from the left, following the car.
- **Stat cards:** hidden at load; each reveals at a scroll-progress threshold (0.18 / 0.36 / 0.54 / 0.72) with an eased y/scale/opacity transition, then its number counts up. Fully reversible on scroll-up.
- **Headline:** letter centres are measured once (on `refreshInit`); letters light up when the car's front passes them.
- **Extras:** headlight beam, speed HUD, and a slight tilt driven by scroll velocity.

## Performance
- Only `transform` (x, rotation, scaleX, y) and opacity are animated.
- `gsap.quickSetter` avoids per-frame allocations; no layout reads inside scroll handlers.
- `gsap.context` cleans up on unmount. `prefers-reduced-motion` shows the finished scene.

## Customize
- Replace `public/car.svg` with a top-down car image that faces right.
- Edit `STATS` and `WORDS` in `components/Hero.js`.

## Deploy
Pushing to `main` triggers `.github/workflows/deploy.yml`, which runs `npm run build`
(static export to `/out`) and publishes to GitHub Pages.
