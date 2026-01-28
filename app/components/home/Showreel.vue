<script setup lang="ts">
import { onMounted, ref } from "vue";
import gsap from "~/lib/gsap/index.js";
import { ScrollTrigger } from "~/lib/gsap/ScrollTrigger.js";

if (process.client) {
  gsap.registerPlugin(ScrollTrigger);
}

const sectionRef = ref(null);
const videoRef = ref(null);

onMounted(() => {
  if (!sectionRef.value || !videoRef.value) return;

  // GÜÇLENDİRİLMİŞ PARALLAX
  // Hareket aralığını -15'ten -30'a çıkardık.
  // Video kapsayıcıdan çok daha hızlı hareket edecek.
  gsap.fromTo(
    videoRef.value,
    {
      yPercent: -30, // Başlangıç (Yukarıda)
    },
    {
      yPercent: 30, // Bitiş (Aşağıda)
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.value,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    },
  );
});
</script>

<template>
  <section
    ref="sectionRef"
    class="w-full h-[100dvh] relative bg-black overflow-hidden flex items-center justify-center"
  >
    <div class="absolute inset-0 w-full h-full overflow-hidden">
      <video
        ref="videoRef"
        src="/showreel.mp4"
        autoplay
        loop
        muted
        playsinline
        class="absolute w-full h-[150%] -top-[25%] object-cover opacity-70"
      ></video>
    </div>

    <div class="relative z-10 text-center">
      <h2
        class="text-display font-normal text-white tracking-tighter mix-blend-overlay"
      >
        Showreel
      </h2>
      <div
        class="mt-4 text-white text-small uppercase tracking-widest border border-white/30 px-6 py-3 rounded-full inline-block backdrop-blur-sm cursor-pointer hover:bg-white/10 transition-colors"
      >
        Play Video
      </div>
    </div>
  </section>
</template>
