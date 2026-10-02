import Hero from "../components/Hero";

export default function Home() {
  return (
    <main>
      <Hero />

      {/* Closing CTA — also gives the pinned hero room to unpin */}
      <section className="grid min-h-[60vh] place-items-center bg-ink px-6 py-16 text-center text-white">
        <div className="flex max-w-xl flex-col items-center gap-6">
          <span className="font-display text-xs tracking-[0.3em] text-volt">
            YOU MADE IT ACROSS
          </span>
          <h2 className="font-display text-2xl leading-tight md:text-4xl">
            Ready to rev up your growth?
          </h2>
          <p className="text-sm text-neutral-400 md:text-base">
            Scroll-driven hero built for the Itzfizz internship assignment —
            Next.js, Tailwind CSS and GSAP ScrollTrigger.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://itzfizz.com"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-volt px-6 py-3 text-sm font-semibold text-ink transition-transform duration-200 hover:scale-105"
            >
              Visit Itzfizz
            </a>
            <a
              href="https://github.com/Venky656/itzfizz-scroll-hero"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:border-white/60"
            >
              View source
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
