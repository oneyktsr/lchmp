<script setup lang="ts">
// Showreel scriptleri (Video player logic vs.) buraya gelecek.
</script>

<template>
  <section
    class="w-full h-[100dvh] relative bg-black overflow-hidden flex items-center justify-center"
  >
    <img
      src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2525&auto=format&fit=crop"
      alt="Showreel Cover"
      class="absolute inset-0 w-full h-full object-cover opacity-70"
    />

    <div class="relative z-10 text-center">
      <h2
        class="text-display font-normal text-white tracking-tighter mix-blend-overlay"
      >
        Showreel
      </h2>
      <div
        class="mt-4 text-white text-small uppercase tracking-widest border border-white/30 px-6 py-3 rounded-full inline-block backdrop-blur-sm"
      >
        Play Video
      </div>
    </div>
  </section>
</template>
