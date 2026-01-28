<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps({
  error: Object as () => NuxtError,
});

const handleError = () => clearError({ redirect: "/" });
</script>

<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen text-center"
  >
    <h1 class="text-4xl font-bold">{{ error?.statusCode }}</h1>
    <p class="mt-4 text-xl">Sanırım kayboldun.</p>
    <button
      @click="handleError"
      class="mt-6 px-4 py-2 bg-black text-white rounded"
    >
      Ana Sayfaya Dön
    </button>
  </div>
</template>
