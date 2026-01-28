<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch, nextTick } from "vue";
import gsap from "~/lib/gsap/index.js";
import { SplitText } from "~/lib/gsap/SplitText.js";
import { ScrollTrigger } from "~/lib/gsap/ScrollTrigger.js";
import { useLoader } from "~/composables/useLoader";

const props = defineProps({
  tag: { type: String, default: "div" },
  duration: { type: Number, default: 1.0 },
  stagger: { type: Number, default: 0.1 },
  delay: { type: Number, default: 0 },
});

const { isIntroDone } = useLoader();

if (process.client) {
  gsap.registerPlugin(SplitText, ScrollTrigger);
}

const textRef = ref(null);
let splitInstance: any = null;
let ctx: gsap.Context | null = null;

const initAnimation = async () => {
  if (!textRef.value) return;

  // DOM ve Fontların hazır olmasını bekle (Performans ve Layout için kritik)
  await nextTick();
  try {
    await document.fonts.ready;
  } catch (e) {
    // Font yükleme hatası olursa devam et
  }

  // Temizlik
  if (ctx) ctx.revert();
  if (splitInstance) splitInstance.revert();

  ctx = gsap.context(() => {
    // 1. SPLITTEXT OLUŞTUR
    splitInstance = new SplitText(textRef.value, {
      type: "lines",
      linesClass: "reveal-line",
      mask: "lines", // Maskeleme açık
    });

    if (!splitInstance.lines || splitInstance.lines.length === 0) return;

    // 2. BAŞLANGIÇ DURUMU (OPTIMIZE EDİLDİ)
    // Opacity animasyonu KALDIRILDI. Metinler solid (opacity: 1) başlar.
    // Sadece aşağı itiyoruz (yPercent: 100).
    gsap.set(splitInstance.lines, {
      yPercent: 100,
      opacity: 1, // <-- Silik gelmemesi için 1 yapıldı.
      force3D: true, // GPU katmanına al
      rotationZ: 0.01, // Safari/Chrome anti-aliasing titreşimini engeller
    });

    // Wrapper'ı görünür yap
    gsap.set(textRef.value, { autoAlpha: 1 });

    // 3. ANIMASYON (YÜKSEK PERFORMANS)
    gsap.to(splitInstance.lines, {
      yPercent: 0,
      duration: props.duration,
      stagger: props.stagger,
      delay: props.delay,
      ease: "power3.out", // "power4" yerine "power3" daha doğal ve akıcı hissettirir

      scrollTrigger: {
        trigger: textRef.value,
        start: "top 95%", // Biraz daha erken yakalaması için 95%
        toggleActions: "play none none none",
        once: true, // Sadece 1 kere çalışır ve bellekten silinir
      },

      // Animasyon bittiğinde GPU belleğini rahatlat
      onComplete: () => {
        gsap.set(splitInstance.lines, {
          clearProps: "willChange,force3D,rotationZ",
        });
      },
    });
  }, textRef.value);
};

onMounted(() => {
  // Başlangıçta gizli
  if (textRef.value) {
    gsap.set(textRef.value, { autoAlpha: 0 });
  }

  if (isIntroDone.value) {
    initAnimation();
  }
});

watch(isIntroDone, (done) => {
  if (done) {
    initAnimation();
  }
});

onUnmounted(() => {
  if (ctx) ctx.revert();
});
</script>

<template>
  <component :is="tag" ref="textRef" class="reveal-text-wrapper invisible">
    <slot />
  </component>
</template>

<style scoped>
.reveal-text-wrapper {
  /* Font render optimizasyonları */
  font-kerning: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

:deep(.reveal-line) {
  /* Kesilmeleri önlemek için minik padding */
  padding-bottom: 0.1em;
  margin-bottom: -0.1em;
  will-change: transform; /* Tarayıcıya ipucu ver */
}
</style>
