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

  modules: [
    "@nuxtjs/seo",
    "@nuxt/image",
    "@nuxt/fonts",
    "@nuxt/scripts",
    "@nuxt/content",
    // "nuxt-security", // SAFARI İÇİN GEÇİCİ KAPALI (Sorun kaynağı olabilir)
    "@nuxt/icon",
    "@vueuse/nuxt",
    "@pinia/nuxt",
  ],

  // 3. Vite Dosya İzinleri
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
