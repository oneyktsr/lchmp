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
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  window.scrollTo(0, 0);

  const lockScroll = () => {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.documentElement.style.height = "100%";
    document.body.style.height = "100%";
  };

  const unlockScroll = () => {
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    document.documentElement.style.height = "";
    document.body.style.height = "";
  };

  lockScroll();

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  const split = new SplitText(logoRef.value, { type: "chars" });

  gsap.set(logoRef.value, { autoAlpha: 1 });

  const rect = logoRef.value.getBoundingClientRect();
  const screenCenterY = window.innerHeight / 2;
  const computedStyle = window.getComputedStyle(logoRef.value);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const paddingTop = parseFloat(computedStyle.paddingTop);
  const elementCenterY = rect.top + rect.height / 2;
  const startY = screenCenterY - elementCenterY;

  // SAFARI FIX: force3D: false
  gsap.set(logoRef.value, {
    y: startY,
    scale: 2,
    transformOrigin: "left center",
    force3D: false,
  });

  // Fake Loader (2.5 Sn)
  const websiteLoaded = new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 2500);
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
        unlockScroll();
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
          force3D: false,
        },
        "reveal",
      );
  });
});
</script>

<template>
  <div
    ref="curtainRef"
    class="fixed inset-0 z-[10000] bg-theme-dark w-full h-[100dvh] pointer-events-none"
  ></div>

  <div
    class="fixed top-page-margin left-page-margin z-[10001] mix-blend-difference origin-left pointer-events-none"
    style="perspective: 1000px; -webkit-perspective: 1000px"
  >
    <h1
      ref="logoRef"
      class="safari-render-fix text-h4 font-normal leading-[1.1] text-theme-light invisible origin-left"
    >
      Le Champ™
    </h1>
  </div>
</template>
