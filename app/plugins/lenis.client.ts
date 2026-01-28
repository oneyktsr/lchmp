// app/plugins/lenis.client.ts
import Lenis from "lenis";
import gsap from "~/lib/gsap"; // index.js üzerinden
import ScrollTrigger from "~/lib/gsap/ScrollTrigger";

export default defineNuxtPlugin((nuxtApp) => {
  // 1. TARAYICI HAFIZASINI SIFIRLA
  if (import.meta.client && "scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  // 2. Lenis Ayarları
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: "vertical",
    gestureOrientation: "vertical",
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
  });

  // 3. GSAP & LENIS SENKRONİZASYONU

  // HATA ÇÖZÜMÜ 1: ScrollTrigger.update
  // Yerel dosyadan import edildiği için TS static metodları göremiyor olabilir.
  // 'as any' diyerek TS'e "buna güven, update metodu var" diyoruz.
  lenis.on("scroll", (ScrollTrigger as any).update);

  // HATA ÇÖZÜMÜ 2: time: number
  // GSAP ticker saniye bazlı bir sayı döndürür. Tipini 'number' olarak belirttik.
  gsap.ticker.add((time: number) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  // 4. Sayfa Geçişlerinde En Üste Işınla
  nuxtApp.hook("page:finish", () => {
    lenis.scrollTo(0, { immediate: true });
  });

  return {
    provide: {
      lenis,
    },
  };
});
