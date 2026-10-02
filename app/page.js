import Hero from "../components/Hero";

export default function Home() {
  return (
    <main>
      <Hero />
      <section className="grid min-h-[60vh] place-items-center px-6 text-center">
        <h2 className="font-display text-2xl md:text-4xl">You made it across.</h2>
      </section>
    </main>
  );
}
