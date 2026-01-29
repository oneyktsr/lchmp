<script setup lang="ts">
import { ref, onMounted } from "vue";
import gsap from "~/lib/gsap/index.js";
import { ScrollTrigger } from "~/lib/gsap/ScrollTrigger.js";

if (process.client) {
  gsap.registerPlugin(ScrollTrigger);
}

const sectionRef = ref(null);
const buttonRef = ref(null);

onMounted(() => {
  if (buttonRef.value) {
    // REVIZE: y (dikey hareket) parametreleri kaldırıldı.
    // Sadece autoAlpha (opacity + visibility) geçişi kaldı.
    gsap.fromTo(
      buttonRef.value,
      { autoAlpha: 0 }, // Başlangıç: Sadece görünmez
      {
        autoAlpha: 1, // Bitiş: Görünür
        duration: 1,
        ease: "power3.out",
        delay: 0.4,
        scrollTrigger: {
          trigger: buttonRef.value,
          start: "top 95%",
          toggleActions: "play none none none",
          once: true,
        },
      },
    );
  }
});
</script>

<template>
  <section
    ref="sectionRef"
    class="w-full bg-theme-dark text-theme-light pt-[var(--page-margin)] pb-[var(--page-margin)] lg:pb-[var(--section-gap)] px-[var(--page-margin)]"
  >
    <div
      class="grid w-full grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-grid-gutter mb-[calc(var(--page-margin)*4)] lg:mb-[calc(var(--page-margin)*4)]"
    >
      <div
        class="col-span-4 md:col-span-2 lg:col-span-3 flex items-center gap-x-3 h-fit mb-[calc(var(--page-margin)*2)] mt-[var(--page-margin)] md:mb-0"
      >
        <div class="w-2 h-2 rounded-full bg-theme-light shrink-0"></div>

        <RevealText
          tag="div"
          class="text-body leading-none font-normal w-fit"
          :duration="0.8"
        >
          Passion
        </RevealText>
      </div>

      <div
        class="col-span-4 md:col-start-3 md:col-span-6 lg:col-start-4 lg:col-span-9 mt-[var(--page-margin)]"
      >
        <RevealText
          tag="p"
          class="text-h1 font-normal leading-[1.1] tracking-tighter pb-2 text-theme-light"
          :duration="1.2"
          :stagger="0.05"
        >
          <span
            class="float-left h-[10px] hidden md:block md:w-[calc(100%/6)] lg:w-[calc((100%/9)*2)]"
            aria-hidden="true"
          ></span>

          We're a visionary team producing innovative work in design &
          technology. For us, this is more than just work.
        </RevealText>
      </div>
    </div>

    <div
      class="grid w-full grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-grid-gutter mt-[calc(var(--page-margin)*3)] lg:mt-[calc(var(--page-margin)*3)]"
    >
      <div
        class="col-span-4 mb-2 md:mb-0 md:col-start-5 md:col-span-3 lg:col-start-5 lg:col-span-3 lg:mb-0 opacity-40"
      >
        <RevealText
          tag="span"
          class="text-h6 text-theme-light font-normal leading-[1.1]"
        >
          / What Drives Us
        </RevealText>
      </div>

      <div
        class="col-span-4 md:col-start-5 md:col-span-3 lg:col-start-8 lg:col-span-3"
      >
        <RevealText
          tag="p"
          class="text-h6 font-light leading-tight"
          :delay="0.1"
          :duration="1"
        >
          It’s a passion for creating the next generation of digital
          experiences. Every project is an opportunity to explore new ideas,
          push boundaries, and create solutions that truly connect with
          audiences.
        </RevealText>
      </div>
    </div>

    <div
      class="grid w-full grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-grid-gutter mt-[calc(var(--page-margin)*2)] lg:mt-[var(--page-margin)]"
    >
      <div
        class="col-span-4 mb-2 md:mb-0 md:col-start-5 md:col-span-3 lg:col-start-5 lg:col-span-3 lg:mb-0 opacity-40"
      >
        <RevealText
          tag="span"
          class="text-h6 text-theme-light font-normal leading-[1.1]"
        >
          / Our Approach
        </RevealText>
      </div>

      <div
        class="col-span-4 md:col-start-5 md:col-span-3 lg:col-start-8 lg:col-span-3"
      >
        <RevealText
          tag="p"
          class="text-h6 font-light leading-tight"
          :delay="0.1"
          :duration="1"
        >
          By combining creativity, technology, and strategic thinking, we
          deliver work that is not only visually compelling but also meaningful
          and effective, helping brands grow and resonate in an ever — changing
          digital landscape.
        </RevealText>

        <div
          ref="buttonRef"
          class="mt-[calc(var(--page-margin)*4)] mb-[calc(var(--page-margin)*4)] lg:mt-[calc(var(--page-margin)*3)] lg:mb-0 opacity-0"
        >
          <UiButton to="/approach" label="Explore the Method" mode="light" />
        </div>
      </div>
    </div>
  </section>
</template>
