<script setup lang="ts">
// GridDebugger otomatik import edilir.

useHead({
  bodyAttrs: {
    // EKLENEN: 'overscroll-none'
    // Bu sınıf, sayfa bittiğinde tarayıcının esnemesini engeller.
    class:
      "bg-theme-light text-theme-dark selection:bg-theme-dark selection:text-theme-light overscroll-none",
  },
  meta: [{ name: "theme-color", content: "#e4e0db" }],
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
