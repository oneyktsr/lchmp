// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },

  // 1. Proje Kaynak Dizini
  srcDir: "app/",

  // 2. CSS Dosyası
  css: ["~/assets/css/main.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  // 3. PERFORMANS & CACHE AYARLARI (YENİ EKLENDİ)
  // TTFB süresini düşürmek için Vercel ISR (Incremental Static Regeneration) ayarı.
  routeRules: {
    // Ana sayfa ve tüm alt sayfalar 1 saat (3600sn) boyunca cache'ten sunulur.
    // Arka planda veri değişirse Vercel onu sessizce günceller (SWR).
    "/**": { isr: 3600 },
  },

  modules: [
    "@nuxtjs/seo",
    "@nuxt/image",
    "@nuxt/fonts",
    "@nuxt/scripts",
    "@nuxt/content",
    // "nuxt-security", // SAFARI İÇİN GEÇİCİ KAPALI
    "@nuxt/icon",
    "@vueuse/nuxt",
    "@pinia/nuxt",
  ],

  // 4. Vite Dosya İzinleri
  vite: {
    server: {
      fs: {
        allow: [".."],
      },
    },
  },

  site: {
    url: "https://le-champ.com",
    name: "Le Champ™",
    description: "Interactive Development Studio",
    defaultLocale: "en",
  },
});
