// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },

  // 1. Proje Kaynak Dizini
  srcDir: "app/",

  // 2. CSS Dosyası
  css: ["~/assets/css/main.css"],

  // 3. HTML & HEAD OPTİMİZASYONLARI
  app: {
    head: {
      // (A) Fontları Önceden Yükle (CLS ve FCP'yi düzeltir)
      link: [
        {
          rel: "preload",
          href: "/fonts/TWKLausanne-Regular.woff2",
          as: "font",
          type: "font/woff2",
          crossorigin: "anonymous",
        },
        {
          rel: "preload",
          href: "/fonts/TWKLausanne-Light.woff2",
          as: "font",
          type: "font/woff2",
          crossorigin: "anonymous",
        },
      ],
      // (B) Beyaz ekran (Flash) engelleme
      style: [
        {
          innerHTML: `
            html, body { background-color: #0d0e13; margin: 0; padding: 0; }
          `,
        },
      ],
    },
  },

  // 4. DENEYSEL PERFORMANS AYARLARI (GÜNCELLENDİ)
  // 'inlineSSRStyles' hataya sebep olduğu için kaldırıldı.
  experimental: {
    // JS yükünü optimize eder, statik siteler için önemlidir.
    payloadExtraction: true,
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  // 5. PERFORMANS & CACHE AYARLARI
  routeRules: {
    // Siteni tamamen statik HTML olarak build eder ve CDN'den sunar.
    // TTFB süresi sunucu beklemeksizin minimuma iner.
    "/**": { prerender: true },
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

  // 6. Vite Dosya İzinleri
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
