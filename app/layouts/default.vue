<script setup lang="ts">
// GridDebugger otomatik import edilir.

useHead({
  // 1. HTML ETİKETİ AYARLARI (Mobildeki beyazlığı çözen kısım)
  htmlAttrs: {
    // 'bg-theme-light' ve 'overscroll-none' buraya da eklenmeli
    class: "bg-theme-light overscroll-none",
  },

  // 2. BODY ETİKETİ AYARLARI
  bodyAttrs: {
    class:
      "bg-theme-light text-theme-dark selection:bg-theme-dark selection:text-theme-light overscroll-none",
  },

  // 3. META AYARLARI
  meta: [
    { name: "theme-color", content: "#e4e0db" },
    // iOS için ek meta etiketleri (Status bar rengi için)
    { name: "apple-mobile-web-app-status-bar-style", content: "default" },
  ],
});
</script>

<template>
  <div class="main-layout min-h-screen w-full relative">
    <GridDebugger />

    <main class="w-full">
      <div class="w-full">
        <slot />
      </div>
    </main>
  </div>
</template>

<style>
html,
body {
  /* Yaylanmayı kapat */
  overscroll-behavior: none;
  overscroll-behavior-y: none;

  /* Kaydırma pürüzsüzlüğü */
  -webkit-overflow-scrolling: touch;

  /* Yükseklik sınırları (Bazen yaylanma yükseklik belirsizliğinden olur) */
  height: 100%;
}
</style>
