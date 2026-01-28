<script setup lang="ts">
// Vercel Eklentileri
import { SpeedInsights } from "@vercel/speed-insights/nuxt";
import { Analytics } from "@vercel/analytics/nuxt";

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

    <ClientOnly>
      <SpeedInsights />
      <Analytics />
    </ClientOnly>
  </div>
</template>
