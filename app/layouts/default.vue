<script setup lang="ts">
// GridDebugger otomatik import edilir.

useHead({
  // 1. HTML BODY AYARLARI
  // Arka plan rengini ve text rengini doğrudan body'ye işliyoruz.
  // Bu sayede iOS'ta "rubber-band" (esneme) efekti sırasında siyah yerine senin rengin görünür.
  bodyAttrs: {
    class:
      "bg-theme-light text-theme-dark selection:bg-theme-dark selection:text-theme-light",
  },

  // 2. MOBİL TARAYICI ÇUBUĞU (Safari/Chrome Status Bar)
  meta: [
    // LÜTFEN GÜNCELLE: Kendi açık tema renginin HEX kodunu buraya yaz.
    { name: "theme-color", content: "#e4e0db" },
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
