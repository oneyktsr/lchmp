<script setup lang="ts">
interface Props {
  to: string;
  label?: string;
  /**
   * 'light': Koyu zemin üzerinde Açık renk metin (Ok rengi Koyu olur)
   * 'dark': Açık zemin üzerinde Koyu renk metin (Ok rengi Açık olur)
   */
  mode?: "light" | "dark";
}

const props = withDefaults(defineProps<Props>(), {
  mode: "dark", // Varsayılan: Siyah yazı (Açık zemin için)
});
</script>

<template>
  <NuxtLink
    :to="to"
    class="group inline-flex items-center gap-3 cursor-pointer select-none align-middle"
  >
    <div
      class="relative w-2 h-2 transition-all duration-500 ease-flow group-hover:w-8"
    >
      <span
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 block w-2 h-2 rounded-full border border-current opacity-40 transition-all duration-500 ease-flow group-hover:w-8 group-hover:h-8 group-hover:bg-current group-hover:opacity-100"
      ></span>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="3"
        stroke="currentColor"
        class="absolute top-1/2 left-1/2 w-3 h-3 -translate-y-1/2 -translate-x-[150%] opacity-0 transition-all duration-500 ease-flow group-hover:opacity-100 group-hover:-translate-x-1/2"
        :class="mode === 'dark' ? 'text-theme-light' : 'text-theme-dark'"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M8.25 4.5l7.5 7.5-7.5 7.5"
        />
      </svg>
    </div>

    <div class="relative overflow-hidden pb-[4px]">
      <span class="block text-body font-normal leading-none tracking-tight">
        <slot>{{ label }}</slot>
      </span>

      <span
        class="absolute bottom-0 left-0 h-[1.5px] w-full bg-current origin-right scale-x-100 transition-transform duration-500 ease-flow group-hover:scale-x-0"
      ></span>
    </div>
  </NuxtLink>
</template>

<style scoped>
/* Özel Easing: "Yavaşça başla, ortada hızlan, yavaşça bitir" */
.ease-flow {
  transition-timing-function: cubic-bezier(0.76, 0, 0.24, 1);
}
</style>
