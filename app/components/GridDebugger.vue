<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const isVisible = ref(false);

const handleKeydown = (e: KeyboardEvent) => {
  // Shift + G kombinasyonu
  if (e.shiftKey && (e.key === "G" || e.key === "g")) {
    isVisible.value = !isVisible.value;
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 z-[9999] pointer-events-none w-full h-full px-page-margin"
  >
    <div
      class="grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12 gap-grid-gutter h-full mx-auto w-full"
    >
      <div
        v-for="i in 4"
        :key="`col-${i}`"
        class="col-span-1 h-full bg-red-500/10 border-x border-red-500/20"
      ></div>

      <div
        v-for="i in 4"
        :key="`col-md-${i}`"
        class="hidden md:block col-span-1 h-full bg-red-500/10 border-x border-red-500/20"
      ></div>

      <div
        v-for="i in 4"
        :key="`col-xl-${i}`"
        class="hidden xl:block col-span-1 h-full bg-red-500/10 border-x border-red-500/20"
      ></div>
    </div>
  </div>
</template>
