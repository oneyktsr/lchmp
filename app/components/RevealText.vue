<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue";
import gsap from "~/lib/gsap/index.js";
import { SplitText } from "~/lib/gsap/SplitText.js";
import { useLoader } from "~/composables/useLoader";

const props = defineProps({
  tag: { type: String, default: "div" },
  duration: { type: Number, default: 1.2 },
  stagger: { type: Number, default: 0.1 },
  delay: { type: Number, default: 0 },
});

const { isIntroDone } = useLoader();

if (process.client) {
  gsap.registerPlugin(SplitText);
}

const textRef = ref(null);
let splitInstance: any = null;

const playAnimation = () => {
  if (!splitInstance || !splitInstance.lines) return;

  // Görünür yap ve animasyonu başlat
  if (textRef.value) {
    gsap.set(textRef.value, { autoAlpha: 1 }); // CSS'teki invisible'ı ezer
  }

  gsap.to(splitInstance.lines, {
    yPercent: 0,
    duration: props.duration,
    stagger: props.stagger,
    delay: props.delay,
    ease: "power4.out",
    // force3D: true, // Gereksiz GPU yükünü azalttık (CSS will-change yeterli)
  });
};

onMounted(() => {
  if (!textRef.value) return;

  // 1. Metni Parçala
  // invisible olsa bile SplitText boyut hesaplayabilir (display:none olmamalı)
  splitInstance = SplitText.create(textRef.value, {
    type: "lines",
    mask: "lines",
    linesClass: "reveal-line-child",
    autoSplit: true,
  });

  // 2. SATIRLARI HAZIRLA
  if (splitInstance.lines) {
    // Satırları maskenin altına it
    gsap.set(splitInstance.lines, { yPercent: 100 });
  }

  // 3. DURUMA GÖRE BAŞLAT
  if (isIntroDone.value) {
    // Intro zaten bittiyse (Sayfa değişimi) hemen oynat
    playAnimation();
  }
  // Intro bitmediyse watch bekleyecek (CSS sayesinde ekranda görünmüyor)
});

watch(isIntroDone, (newVal) => {
  if (newVal) {
    playAnimation();
  }
});

onUnmounted(() => {
  if (splitInstance) splitInstance.revert();
});
</script>

<template>
  <component :is="tag" ref="textRef" class="reveal-text-wrapper invisible">
    <slot />
  </component>
</template>

<style scoped>
:deep(.reveal-line-child) {
  will-change: transform;
  font-kerning: none;
}

:deep(.reveal-line-child-mask) {
  padding-bottom: 0.15em;
  margin-bottom: -0.15em;
  display: block;
  overflow: hidden;
}
</style>
