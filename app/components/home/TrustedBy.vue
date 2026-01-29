<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import gsap from "~/lib/gsap/index.js";

// Placeholder Logolar
const brands = [
  { name: "NEXUS", shape: "rect" },
  { name: "VORTEX", shape: "circle" },
  { name: "KINETIC", shape: "triangle" },
  { name: "AETHER", shape: "rect" },
  { name: "ECHO", shape: "circle" },
  { name: "PRISM", shape: "triangle" },
  { name: "FLUX", shape: "rect" },
  { name: "ORBIT", shape: "circle" },
  { name: "ZENITH", shape: "triangle" },
];

const marqueeInnerRef = ref(null);
let animation: gsap.core.Tween | null = null;

onMounted(() => {
  if (!marqueeInnerRef.value) return;

  // Sonsuz Kaydırma Animasyonu
  animation = gsap.to(marqueeInnerRef.value, {
    xPercent: -50,
    ease: "none",
    duration: 20,
    repeat: -1,
  });
});

onUnmounted(() => {
  if (animation) animation.kill();
});
</script>

<template>
  <section
    class="w-full bg-theme-dark text-theme-light pt-page-margin pb-section-gap px-page-margin overflow-hidden"
  >
    <div
      class="grid w-full grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-grid-gutter mb-10 lg:mb-12 items-baseline"
    >
      <div class="col-span-2 md:col-span-4 lg:col-span-6">
        <RevealText
          tag="h2"
          class="text-body font-normal text-theme-light"
          :duration="0.8"
        >
          Our Trusted Partners
        </RevealText>
      </div>

      <div
        class="col-span-2 md:col-span-4 lg:col-span-6 text-right md:text-right"
      >
        <div class="opacity-40 inline-block">
          <RevealText
            tag="span"
            class="text-body font-normal text-theme-light block"
            :duration="0.8"
            :delay="0.1"
          >
            (2018 — 2026)
          </RevealText>
        </div>
      </div>
    </div>

    <div class="w-full relative flex overflow-hidden mask-gradient">
      <div
        ref="marqueeInnerRef"
        class="flex items-center w-max gap-x-12 md:gap-x-24 lg:gap-x-32 pr-12 md:pr-24 lg:pr-32 will-change-transform"
      >
        <div
          v-for="set in 2"
          :key="`set-${set}`"
          class="flex items-center gap-x-12 md:gap-x-24 lg:gap-x-32 shrink-0"
        >
          <div
            v-for="(brand, i) in brands"
            :key="`brand-${set}-${i}`"
            class="group flex items-center gap-x-3 opacity-50 hover:opacity-100 transition-opacity duration-300"
          >
            <svg
              class="w-auto h-7 md:h-7 lg:h-7 fill-current text-theme-light"
              viewBox="0 0 30 30"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect v-if="brand.shape === 'rect'" width="30" height="30" />
              <circle
                v-else-if="brand.shape === 'circle'"
                cx="15"
                cy="15"
                r="15"
              />
              <path v-else d="M15 0 L30 30 L0 30 Z" />
            </svg>

            <span
              class="text-h6 font-bold tracking-tight text-theme-light hidden md:block"
            >
              {{ brand.name }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.mask-gradient {
  mask-image: linear-gradient(
    to right,
    transparent,
    black 10%,
    black 90%,
    transparent
  );
  -webkit-mask-image: linear-gradient(
    to right,
    transparent,
    black 10%,
    black 90%,
    transparent
  );
}
</style>
