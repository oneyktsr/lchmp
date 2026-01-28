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

// --- ANİMASYONU OYNAT ---
const playAnimation = () => {
  if (!splitInstance || !splitInstance.lines) return;

  // SADECE YUKARI KAYDIR (Opaklık değişimi yok)
  gsap.to(splitInstance.lines, {
    yPercent: 0,
    // opacity satırını buradan sildik.
    duration: props.duration,
    stagger: props.stagger,
    delay: props.delay,
    ease: "power4.out",
    force3D: true,

    // Animasyon başlarken Parent container'ı görünür yap
    onStart: () => {
      if (textRef.value) gsap.set(textRef.value, { autoAlpha: 1 });
    },
  });
};

onMounted(() => {
  if (!textRef.value) return;

  // 1. Metni Parçala
  splitInstance = SplitText.create(textRef.value, {
    type: "lines",
    mask: "lines",
    linesClass: "reveal-line-child",
    autoSplit: true,
  });

  // 2. BAŞLANGIÇ POZİSYONU
  if (!isIntroDone.value) {
    // Intro bitmemişse:
    // A) Parent'ı komple gizle (Güvenlik önlemi)
    gsap.set(textRef.value, { autoAlpha: 0 });

    // B) Satırları aşağı it ama OPAKLIĞI KORU (Solid)
    if (splitInstance.lines) {
      gsap.set(splitInstance.lines, {
        yPercent: 100,
        opacity: 1, // <-- Önemli: Silik değil, tam görünür bekliyor.
      });
    }
  } else {
    // Intro çoktan bitmişse (Sayfa değişimi):
    if (splitInstance.lines) {
      // Başlamadan önce aşağı al
      gsap.set(splitInstance.lines, { yPercent: 100, opacity: 1 });
      playAnimation();
    }
  }
});

// 3. SİNYAL BEKLE
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
  <component :is="tag" ref="textRef" class="reveal-text-wrapper">
    <slot />
  </component>
</template>

<style scoped>
:deep(.reveal-line-child) {
  will-change: transform;
  font-kerning: none;
}

/* Maskeleme */
:deep(.reveal-line-child-mask) {
  padding-bottom: 0.15em;
  margin-bottom: -0.15em;
  display: block;
  overflow: hidden; /* Maskenin çalışması için şart */
}
</style>
