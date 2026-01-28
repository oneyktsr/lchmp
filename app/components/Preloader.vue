<script setup lang="ts">
import { onMounted, ref } from "vue";
import gsap from "~/lib/gsap/index.js";
import { SplitText } from "~/lib/gsap/SplitText.js";
import { useLoader } from "~/composables/useLoader";

if (process.client) {
  gsap.registerPlugin(SplitText);
}

const curtainRef = ref(null);
const logoRef = ref(null);
const { isIntroDone } = useLoader();

onMounted(() => {
  // --- SCROLL RESET (YENİ EKLENEN KISIM) ---
  // Tarayıcının sayfayı aşağıdan başlatmasını engelle
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  window.scrollTo(0, 0);
  // ----------------------------------------

  // ... (Geri kalan kodlar aynen devam eder)
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  const split = new SplitText(logoRef.value, { type: "chars" });

  gsap.set(logoRef.value, { autoAlpha: 1 });

  const rect = logoRef.value.getBoundingClientRect();
  const screenCenterY = window.innerHeight / 2;
  const computedStyle = window.getComputedStyle(logoRef.value);
  const paddingTop = parseFloat(computedStyle.paddingTop);
  const elementCenterY = rect.top + rect.height / 2;
  const startY = screenCenterY - elementCenterY;

  gsap.set(logoRef.value, {
    y: startY,
    scale: 2,
    transformOrigin: "left center",
  });

  const websiteLoaded = new Promise((resolve) => {
    if (document.readyState === "complete") {
      resolve(true);
    } else {
      window.addEventListener("load", () => resolve(true));
    }
  });

  let resolveAnimation: (value: unknown) => void;
  const introAnimationFinished = new Promise((resolve) => {
    resolveAnimation = resolve;
  });

  tl.from(split.chars, {
    duration: 1,
    opacity: 0,
    stagger: { from: "random", amount: 0.5 },
    ease: "power2.out",
    onComplete: () => resolveAnimation(true),
  });

  Promise.all([websiteLoaded, introAnimationFinished]).then(() => {
    const outroTl = gsap.timeline({
      onComplete: () => {
        gsap.set(curtainRef.value, { display: "none" });
        isIntroDone.value = true;
      },
    });

    outroTl
      .to(
        curtainRef.value,
        {
          yPercent: -100,
          duration: 1.5,
          ease: "expo.inOut",
        },
        "reveal",
      )

      .to(
        logoRef.value,
        {
          y: 0,
          scale: 1,
          duration: 1.5,
          ease: "expo.inOut",
        },
        "reveal",
      );
  });
});
</script>

<template>
  <div
    ref="curtainRef"
    class="fixed inset-0 z-[10000] bg-theme-dark w-full h-full pointer-events-none"
  ></div>

  <h1
    ref="logoRef"
    class="fixed top-page-margin left-page-margin z-[10001] text-h4 font-normal leading-[1.1] text-theme-light mix-blend-difference invisible origin-left"
  >
    Le Champ™
  </h1>
</template>
