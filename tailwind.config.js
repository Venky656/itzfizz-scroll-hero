/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: { stage: "#e9e9ec", asphalt: "#16171a", volt: "#b6ff00", ink: "#0b0b0c" },
      fontFamily: { display: ["var(--font-display)", "sans-serif"], body: ["var(--font-body)", "system-ui", "sans-serif"] },
    },
  },
  plugins: [],
};
