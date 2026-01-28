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
    gsap.fromTo(
      buttonRef.value,
      { autoAlpha: 0, y: 20 },
      {
        autoAlpha: 1,
        y: 0,
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
    class="w-full bg-theme-dark text-theme-light pt-page-margin pb-section-gap px-page-margin"
  >
    <div
      class="grid w-full grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-grid-gutter mb-16 lg:mb-32"
    >
      <div
        class="col-span-4 md:col-span-2 lg:col-span-3 flex items-center gap-x-3 h-fit mb-8 mt-4 md:mb-0"
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
        class="col-span-4 md:col-start-3 md:col-span-6 lg:col-start-4 lg:col-span-9"
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
      class="grid w-full grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-grid-gutter mt-12 lg:mt-24"
    >
      <div
        class="col-span-4 min-[450px]:col-span-1 mb-2 min-[450px]:mb-0 md:col-start-5 md:col-span-3 lg:col-start-5 lg:col-span-3 lg:mb-0 opacity-40"
      >
        <RevealText
          tag="span"
          class="text-body text-theme-light font-normal leading-[1.1]"
        >
          <span class="hidden md:inline">/ </span>What
          <br class="hidden min-[450px]:block md:hidden" />
          Drives Us
        </RevealText>
      </div>

      <div
        class="col-span-4 min-[450px]:col-span-3 md:col-start-5 md:col-span-3 lg:col-start-8 lg:col-span-3"
      >
        <RevealText
          tag="p"
          class="text-body font-light leading-tight"
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
      class="grid w-full grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-grid-gutter mt-8 lg:mt-8"
    >
      <div
        class="col-span-4 min-[450px]:col-span-1 mb-2 min-[450px]:mb-0 md:col-start-5 md:col-span-3 lg:col-start-5 lg:col-span-3 lg:mb-0 opacity-40"
      >
        <RevealText
          tag="span"
          class="text-body text-theme-light font-normal leading-[1.1]"
        >
          <span class="hidden md:inline">/ </span>Our
          <br class="hidden min-[450px]:block md:hidden" />
          Approach
        </RevealText>
      </div>

      <div
        class="col-span-4 min-[450px]:col-span-3 md:col-start-5 md:col-span-3 lg:col-start-8 lg:col-span-3"
      >
        <RevealText
          tag="p"
          class="text-body font-light leading-tight"
          :delay="0.1"
          :duration="1"
        >
          By combining creativity, technology, and strategic thinking, we
          deliver work that is not only visually compelling but also meaningful
          and effective, helping brands grow and resonate in an ever — changing
          digital landscape.
        </RevealText>

        <div ref="buttonRef" class="mt-16 lg:mt-24 opacity-0">
          <UiButton to="/approach" label="Explore the Method" mode="light" />
        </div>
      </div>
    </div>
  </section>
</template>
