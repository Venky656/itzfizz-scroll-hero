"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const WORDS = ["WELCOME", "ITZFIZZ"];
const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";
// Stats sourced from itzfizz.com — "10x Your Growth", "10 Years of Proven
// Digital Marketing Excellence", "Across 200+ Projects".
const STATS = [
  { n: 10, s: "x", t: "Growth delivered for your business" },
  { n: 10, s: "+", t: "Years of digital marketing excellence" },
  { n: 200, s: "+", t: "Projects delivered across industries" },
  { n: 5, s: "+", t: "Core services: SEO, Web, SMM, Branding, UI/UX" },
];

export default function Hero() {
  const root = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root);
      const road = q("[data-road]")[0];
      const car = q("[data-car]")[0];
      const trail = q("[data-trail]")[0];
      const hud = q("[data-hud]")[0];
      const letters = q("[data-l]");
      const cards = q("[data-card]");
      const nums = q("[data-count]");

      // ---------- Reduced motion: show the finished scene ----------
      if (reduce) {
        gsap.set(letters, { opacity: 1 });
        letters.forEach((l) => l.setAttribute("data-lit", "true"));
        gsap.set(cards, { opacity: 1 });
        nums.forEach((n) => (n.textContent = n.dataset.count));
        gsap.set(trail, { scaleX: 1 });
        gsap.set(car, { x: road.clientWidth * 0.7, yPercent: -50 });
        return;
      }

      // ---------- Intro (on load): headline stagger only ----------
      // Cards are intentionally NOT shown here — like the reference, they reveal
      // one-by-one as scroll progress crosses their thresholds (see onUpdate).
      gsap.set(car, { yPercent: -50 });
      gsap.set(cards, { y: 24, scale: 0.97, opacity: 0 });
      gsap.fromTo(letters, { y: 48, opacity: 0 }, { y: 0, opacity: 1, duration: 1.0, stagger: 0.055, ease: "power4.out" });

      // ---------- Scroll: car drives, trail grows, letters light, cards reveal ----------
      let roadW = 0, carW = 0, maxX = 0, centres = [], lastLit = -1;
      const measure = () => {
        roadW = road.clientWidth;
        carW = car.getBoundingClientRect().width;
        maxX = roadW - carW * 0.25;
        const left = road.getBoundingClientRect().left;
        centres = letters.map((el) => {
          const b = el.getBoundingClientRect();
          return b.left - left + b.width / 2;
        });
      };
      ScrollTrigger.addEventListener("refreshInit", measure);
      measure();

      const setX = gsap.quickSetter(car, "x", "px");
      const setRot = gsap.quickSetter(car, "rotation", "deg");
      const setTrail = gsap.quickSetter(trail, "scaleX");

      // Cards reveal one-by-one at scroll-progress thresholds (mirrors the
      // reference demo's +400/+600/+800/+1000px windows), each over a ~10% window.
      const CARD_AT = [0.18, 0.36, 0.54, 0.72];
      const CARD_WIN = 0.1;
      const counted = cards.map(() => false);
      const cardSetters = cards.map((c) => ({
        y: gsap.quickSetter(c, "y", "px"),
        scale: gsap.quickSetter(c, "scale"),
        opacity: gsap.quickSetter(c, "opacity"),
      }));

      const countUp = (el) => {
        const target = +el.dataset.count;
        const o = { v: +el.textContent || 0 };
        gsap.to(o, {
          v: target, duration: 1.2, ease: "power3.out",
          onUpdate: () => (el.textContent = Math.round(o.v)),
        });
      };

      // Speed HUD + subtle tilt, smoothed on the ticker (no layout reads)
      let target = 0, cur = 0, shown = -1;
      const tick = () => {
        target *= 0.9;
        cur += (target - cur) * 0.12;
        const v = Math.round(cur);
        if (v !== shown) { hud.textContent = String(v).padStart(3, "0"); shown = v; }
        setRot((cur / 340) * 1.6);
      };
      gsap.ticker.add(tick);

      ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: "+=250%",
        pin: true,
        scrub: 1, // interpolates toward scroll position for fluid motion
        anticipatePin: 1,
        onUpdate: (self) => {
          const p = self.progress;
          const x = p * maxX;
          setX(x);
          setTrail(Math.min(1, (x + carW * 0.5) / roadW));
          target = Math.min(340, Math.abs(self.getVelocity()) / 6);

          const front = x + carW * 0.9;
          let lit = -1;
          for (let i = 0; i < centres.length; i++) { if (centres[i] < front) lit = i; else break; }
          if (lit !== lastLit) {
            letters.forEach((l, i) => l.setAttribute("data-lit", i <= lit ? "true" : "false"));
            lastLit = lit;
          }

          // Card reveal: eased window tied to scroll progress (reversible)
          for (let i = 0; i < cards.length; i++) {
            const t = (p - CARD_AT[i]) / CARD_WIN;
            const e = t <= 0 ? 0 : t >= 1 ? 1 : 1 - Math.pow(1 - t, 3); // power3.out
            cardSetters[i].y(24 * (1 - e));
            cardSetters[i].scale(0.97 + 0.03 * e);
            cardSetters[i].opacity(e);
            if (e >= 1 && !counted[i]) { counted[i] = true; countUp(nums[i]); }
            if (e <= 0 && counted[i]) { counted[i] = false; nums[i].textContent = "0"; } // fully rewound
          }
        },
      });

      return () => {
        gsap.ticker.remove(tick);
        ScrollTrigger.removeEventListener("refreshInit", measure);
      };
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative flex min-h-screen flex-col justify-center gap-8 bg-stage py-6 md:gap-10">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5">
        <span className="font-display text-sm tracking-[0.2em]">ITZFIZZ</span>
        <span className="text-xs font-semibold tabular-nums text-neutral-600">
          <span data-hud>000</span> km/h
        </span>
      </div>

      {/* Road */}
      <div
        data-road
        className="relative h-[140px] w-full overflow-hidden bg-asphalt shadow-[inset_0_3px_0_rgba(255,255,255,.08),inset_0_-3px_0_rgba(255,255,255,.08)] md:h-[220px]"
      >
        <div className="absolute left-0 right-0 top-1/2 h-[3px] -translate-y-1/2 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,.35)_0_36px,transparent_36px_84px)]" />
        <div data-trail className="absolute inset-0 origin-left scale-x-0 bg-volt shadow-[0_0_60px_rgba(182,255,0,.7)] will-change-transform" />

        <h1 aria-label="Welcome Itzfizz" className="absolute inset-0 z-20 m-0 flex items-center justify-center gap-[0.35em] whitespace-nowrap font-display text-[clamp(1.1rem,4.4vw,4rem)] leading-none">
          {WORDS.map((w) => (
            <span key={w} className="flex" aria-hidden="true">
              {w.split("").map((ch, i) => (
                <span
                  key={i}
                  data-l
                  data-lit="false"
                  className="inline-block px-[0.28em] text-white/20 opacity-0 transition-colors duration-200 will-change-transform data-[lit=true]:text-ink"
                >
                  {ch}
                </span>
              ))}
            </span>
          ))}
        </h1>

        {/* Car + headlight beam */}
        <div data-car className="absolute left-0 top-1/2 z-30 h-[62%] will-change-transform">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${BASE}/car.svg`} alt="" className="h-full w-auto drop-shadow-[0_12px_14px_rgba(0,0,0,.55)]" />
          <div className="pointer-events-none absolute left-[92%] top-1/2 h-[70%] w-[24vw] -translate-y-1/2 bg-gradient-to-r from-yellow-100/30 to-transparent [clip-path:polygon(0_35%,100%_0,100%_100%,0_65%)]" />
        </div>
      </div>

      {/* Stats */}
      <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-3 px-5 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <div key={i} data-card className="rounded-[20px] border border-black/10 bg-white/55 p-5 opacity-0 backdrop-blur-md">
            <div className="font-display text-[clamp(1.8rem,3.4vw,2.8rem)] leading-none">
              <span data-count={s.n}>0</span>{s.s}
            </div>
            <p className="mt-2 text-sm text-neutral-600">{s.t}</p>
          </div>
        ))}
      </div>

      <div className="self-center rounded-full bg-ink px-4 py-2 text-xs font-semibold text-white">
        Scroll to drive <span className="nudge inline-block">↓</span>
      </div>
    </section>
  );
}
