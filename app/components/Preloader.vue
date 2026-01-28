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
const lineRef = ref(null);
const wrapperRef = ref(null);
const { isIntroDone } = useLoader();

onMounted(() => {
  // 1. SCROLL RESET & KİLİTLEME
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

  // 2. SETUP
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  const split = new SplitText(logoRef.value, { type: "chars" });

  // Başlangıç Değerleri
  gsap.set(logoRef.value, { autoAlpha: 1 });
  gsap.set(lineRef.value, { scaleX: 0, transformOrigin: "left center" });

  // --- ORTALAMA HESABI (WRAPPER) ---
  const rect = wrapperRef.value.getBoundingClientRect();
  const screenCenterY = window.innerHeight / 2;
  const elementCenterY = rect.top + rect.height / 2;
  const startY = screenCenterY - elementCenterY;

  // Tüm Wrapper'ı aşağı (ortaya) indir
  gsap.set(wrapperRef.value, { y: startY });

  // Logoyu büyüt
  gsap.set(logoRef.value, {
    scale: 2,
    transformOrigin: "left center",
    force3D: false,
  });

  const websiteReady = new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 100);
  });

  // --- ANİMASYON AKIŞI ---

  // 1. Logo Girişi (HIZLANDIRILMIŞ & 1PX BLUR)
  tl.from(split.chars, {
    duration: 1.0, // 3sn -> 1.8sn (Daha seri)
    opacity: 0, // İsteğin üzerine 1px
    stagger: {
      from: "random",
      amount: 0.8, // 1.5 -> 0.8 (Harfler daha hızlı tamamlanıyor)
    },
    ease: "power2.inOut",
  });

  // 2. Çizgi Girişi (Metin bitmek üzereyken girer)
  tl.to(
    lineRef.value,
    {
      scaleX: 1,
      duration: 1.5, // 1.8 -> 1.5 (Tempoya uyum sağladı)
      ease: "expo.inOut",
    },
    "-=0.5",
  ); // Bindirme payı ayarlandı

  // 3. Bekleme (Minimal)
  tl.to({}, { duration: 0.1 });

  // 4. Çizgi Çıkışı
  tl.to(lineRef.value, {
    scaleX: 0,
    transformOrigin: "right center",
    duration: 1.2, // Biraz hızlandırdık
    ease: "expo.inOut",
  });

  // 5. Perde Kalkışı
  tl.add(() => {
    websiteReady.then(() => {
      const outroTl = gsap.timeline({
        onComplete: () => {
          gsap.set(curtainRef.value, { display: "none" });
          isIntroDone.value = true;
          unlockScroll();
        },
      });

      // Perde yukarı
      outroTl.to(
        curtainRef.value,
        {
          yPercent: -100,
          duration: 1.5,
          ease: "expo.inOut",
        },
        "reveal",
      );

      // Wrapper (Yazı+Çizgi) yukarı yerine döner
      outroTl.to(
        wrapperRef.value,
        {
          y: 0,
          duration: 1.5,
          ease: "expo.inOut",
        },
        "reveal",
      );

      // Logo küçülür
      outroTl.to(
        logoRef.value,
        {
          scale: 1,
          duration: 1.5,
          ease: "expo.inOut",
          force3D: false,
        },
        "reveal",
      );
    });
  });
});
</script>

<template>
  <div
    ref="curtainRef"
    class="fixed inset-0 z-[10000] bg-theme-dark w-full h-[100dvh] pointer-events-none"
  ></div>

  <div
    ref="wrapperRef"
    class="fixed top-page-margin left-0 w-full px-page-margin z-[10001] pointer-events-none mix-blend-difference"
    style="perspective: 1000px; -webkit-perspective: 1000px"
  >
    <div
      class="w-full grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12 gap-grid-gutter relative items-center"
    >
      <div class="absolute left-0 origin-left flex items-center">
        <h1
          ref="logoRef"
          class="safari-render-fix text-h4 font-normal leading-[1.1] text-theme-light invisible origin-left"
        >
          Le Champ™
        </h1>
      </div>

      <div
        class="col-start-3 md:col-start-5 xl:col-start-7 col-end-[-1] flex items-center"
      >
        <div
          ref="lineRef"
          class="w-full h-[1px] bg-theme-light opacity-20"
        ></div>
      </div>
    </div>
  </div>
</template>
