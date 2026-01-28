// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },

  // 1. Proje Kaynak Dizini
  srcDir: "app/",

  // 2. CSS Dosyası
  css: ["~/assets/css/main.css"],

  // 3. KRİTİK GÖRSEL İYİLEŞTİRME (DÜZELTİLDİ)
  // 'type' satırı silindi, sadece 'innerHTML' yeterlidir.
  app: {
    head: {
      style: [
        {
          innerHTML: `
            html, body { background-color: #0d0e13; margin: 0; padding: 0; }
          `,
        },
      ],
    },
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  // 4. PERFORMANS & CACHE AYARLARI
  routeRules: {
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

  // 5. Vite Dosya İzinleri
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
