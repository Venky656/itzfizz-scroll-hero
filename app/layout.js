import "./globals.css";
import { Unbounded, Manrope } from "next/font/google";

const display = Unbounded({ subsets: ["latin"], weight: ["700"], variable: "--font-display" });
const body = Manrope({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-body" });

export const metadata = {
  title: "ITZFIZZ | Scroll-Driven Hero",
  description:
    "Scroll-driven car hero animation — Itzfizz internship assignment built with Next.js, Tailwind CSS and GSAP ScrollTrigger.",
  keywords: ["Itzfizz", "GSAP", "ScrollTrigger", "Next.js", "Tailwind", "animation"],
  openGraph: {
    title: "ITZFIZZ | Scroll-Driven Hero",
    description: "Scroll-driven hero animation built with Next.js, Tailwind and GSAP.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
