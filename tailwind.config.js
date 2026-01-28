// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/components/**/*.{js,vue,ts}",
    "./app/layouts/**/*.{js,vue,ts}",
    "./app/pages/**/*.{js,vue,ts}",
    "./app/plugins/**/*.{js,ts}",
    "./app/app.vue",
    "./app/error.vue",
    "./app/**/*.{js,vue,ts}", // Ekstra Garanti
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        // Zemin Renkleri
        "theme-dark": "var(--bg-dark)", // #0d0e13
        "theme-light": "var(--bg-light)", // #ffffff

        // Metin Renkleri
        "text-light": "var(--text-light)", // #e4e0db (Dark zemin üstüne)
        "text-dark": "var(--text-dark)", // #0d0e13 (Light zemin üstüne)
      },
      fontFamily: {
        sans: ["TWK Lausanne", "sans-serif"],
      },
      fontSize: {
        // Büyük başlıklar: Tighter tracking
        display: [
          "var(--text-display)",
          { lineHeight: "1.05", letterSpacing: "-0.03em" },
        ],
        h1: ["var(--text-h1)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        h2: [
          "var(--text-h2)",
          { lineHeight: "1.15", letterSpacing: "-0.02em" },
        ],

        // Orta başlıklar: Tight tracking
        h3: ["var(--text-h3)", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        h4: ["var(--text-h4)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],

        // Küçük başlıklar ve Body: Normal veya Tight
        h5: ["var(--text-h5)", { lineHeight: "1.3", letterSpacing: "0em" }],
        h6: ["var(--text-h6)", { lineHeight: "1.3", letterSpacing: "0em" }],

        body: ["var(--text-body)", { lineHeight: "1.6", letterSpacing: "0em" }],
        small: [
          "var(--text-small)",
          { lineHeight: "1.4", letterSpacing: "0.01em" },
        ],
        quote: [
          "var(--text-quote)",
          { lineHeight: "1.3", letterSpacing: "-0.01em" },
        ],
      },
      spacing: {
        "page-margin": "var(--page-margin)",
        "grid-gutter": "var(--grid-gutter)",
        "section-gap": "var(--section-gap)",
      },
    },
  },
  plugins: [],
};
