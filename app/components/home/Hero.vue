<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue"; // onUnmounted eklendi
import gsap from "~/lib/gsap/index.js";
import { ScrollTrigger } from "~/lib/gsap/ScrollTrigger.js";
import { useLoader } from "~/composables/useLoader";

if (process.client) {
  gsap.registerPlugin(ScrollTrigger);
}

const buttonRef = ref(null);
const heroTitleRef = ref(null);
const sectionRef = ref(null);

const { isIntroDone } = useLoader();

// MatchMedia değişkenini dışarıda tanımlıyoruz ki temizleyebilelim
let mm: gsap.MatchMedia;

const playButtonAnimation = () => {
  if (!buttonRef.value) return;

  gsap.fromTo(
    buttonRef.value,
    { autoAlpha: 0 },
    {
      autoAlpha: 1,
      duration: 1,
      ease: "power3.out",
      delay: 0.6,
    },
  );
};

onMounted(() => {
  // 1. Buton Başlangıç
  gsap.set(buttonRef.value, { autoAlpha: 0 });
  if (isIntroDone.value) {
    playButtonAnimation();
  }

  // 2. RESPONSIVE PARALLAX (LAG EFFECT)
  if (heroTitleRef.value && sectionRef.value) {
    mm = gsap.matchMedia();

    // Breakpointleri tanımla (Tailwind 'md' = 768px)
    mm.add(
      {
        isMobile: "(max-width: 767px)",
        isDesktop: "(min-width: 768px)",
      },
      (context) => {
        const { isMobile } = context.conditions as { isMobile: boolean };

        gsap.to(heroTitleRef.value, {
          // İSTEĞİN: Mobilse 150, Değilse 100
          yPercent: isMobile ? 150 : 100,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.value,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      },
    );
  }
});

// Temizlik: Sayfa değişince event listener'ları sil
onUnmounted(() => {
  if (mm) mm.revert();
});

watch(isIntroDone, (newVal) => {
  if (newVal) {
    playButtonAnimation();
  }
});
</script>

<template>
  <section
    ref="sectionRef"
    class="w-full min-h-[80dvh] flex flex-col justify-between px-page-margin pb-[calc(var(--page-margin)*2)] md:pb-page-margin"
  >
    <div ref="heroTitleRef" class="w-full max-w-5xl hero-title-wrapper">
      <RevealText
        tag="h1"
        class="text-display font-normal leading-[1.1] tracking-tighter text-theme-dark"
        :duration="1.4"
        :stagger="0.1"
      >
        Create. Connect.<br />Cultivate.
      </RevealText>
    </div>

    <div
      class="w-full grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12 gap-grid-gutter mt-16 md:mt-0 items-end"
    >
      <div
        ref="buttonRef"
        class="col-span-4 md:col-span-3 xl:col-span-3 order-2 md:order-1 mt-8 md:mt-0 flex items-end pb-1 opacity-0"
      >
        <UiButton to="/about" label="Learn More About Us" mode="dark" />
      </div>

      <div
        class="col-span-4 md:col-start-5 md:col-span-4 xl:col-start-8 xl:col-span-5 order-1 md:order-2"
      >
        <RevealText
          tag="p"
          class="text-h4 text-theme-dark tracking-tight"
          :duration="1"
          :delay="0.3"
        >
          We create digital experiences that inspire engagement and deliver
          measurable impact for forward-thinking brands.
        </RevealText>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-title-wrapper {
  /* Mobil: x2.5 */
  padding-top: calc((var(--page-margin) * 2.5) + var(--text-h4) - 0.7em);
  margin-left: -0.08em;
  will-change: transform;
}

@media (min-width: 768px) {
  .hero-title-wrapper {
    /* Desktop: x2 */
    padding-top: calc((var(--page-margin) * 2) + var(--text-h4) - 0.7em);
  }
}
</style>
