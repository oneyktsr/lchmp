<script setup lang="ts">
// Nuxt 'components' klasöründeki bileşenleri otomatik import eder.
// Preloader.vue otomatik tanınır.

useHead({
  // Dinamik olarak her sayfada başlık şablonu oluşturur
  titleTemplate: (titleChunk) => {
    return titleChunk
      ? `${titleChunk} - Le Champ™`
      : "Le Champ™ | Interactive Development Studio";
  },
});
</script>

<template>
  <div>
    <Preloader />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <SpeedInsights />
    <Analytics />
  </div>
</template>
