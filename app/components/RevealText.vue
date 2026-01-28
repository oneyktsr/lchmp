<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch, nextTick } from "vue";
import gsap from "~/lib/gsap/index.js";
import { SplitText } from "~/lib/gsap/SplitText.js";
import { ScrollTrigger } from "~/lib/gsap/ScrollTrigger.js";
import { useLoader } from "~/composables/useLoader";

const props = defineProps({
  tag: { type: String, default: "div" },
  // REVIZE: Süre 0.8sn (Hızlı ve akıcı)
  duration: { type: Number, default: 0.1 },
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

  // Sadece DOM güncellemesini bekle (Font yüklenmesini BEKLEME)
  await nextTick();

  // Temizlik
  if (ctx) ctx.revert();
  if (splitInstance) splitInstance.revert();

  ctx = gsap.context(() => {
    // 1. SPLITTEXT OLUŞTUR
    splitInstance = new SplitText(textRef.value, {
      type: "lines",
      linesClass: "reveal-line",
      mask: "lines",
    });

    if (!splitInstance.lines || splitInstance.lines.length === 0) return;

    // 2. BAŞLANGIÇ DURUMU
    gsap.set(splitInstance.lines, {
      yPercent: 100,
      rotation: 0, // REVIZE: 1 derecelik çok hafif eğim
      opacity: 1,
      force3D: true,
      transformOrigin: "0% 50%",
    });

    // Wrapper'ı görünür yap
    gsap.set(textRef.value, { autoAlpha: 1 });

    // 3. ANIMASYON
    gsap.to(splitInstance.lines, {
      yPercent: 0,
      rotation: 0,
      duration: props.duration,
      stagger: props.stagger,
      delay: props.delay,
      ease: "power3.out",

      scrollTrigger: {
        trigger: textRef.value,
        start: "top 95%",
        toggleActions: "play none none none",
        once: true,
      },

      onComplete: () => {
        gsap.set(splitInstance.lines, {
          clearProps: "willChange,force3D,rotation,transformOrigin",
        });
      },
    });
  }, textRef.value);
};

onMounted(() => {
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
  font-kerning: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

:deep(.reveal-line) {
  padding-bottom: 0.1em;
  margin-bottom: -0.1em;
  will-change: transform;
}
</style>
