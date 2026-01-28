<script setup lang="ts">
// GridDebugger otomatik import edilir.
</script>

<template>
  <div
    class="main-layout min-h-screen w-full bg-theme-light text-theme-dark selection:bg-theme-dark selection:text-theme-light relative"
  >
    <GridDebugger />

    <main class="w-full">
      <div class="w-full">
        <slot />
      </div>
    </main>
  </div>
</template>
