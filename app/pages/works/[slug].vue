<script setup lang="ts">
const route = useRoute();
</script>

<template>
  <div>
    <h1>Works Detail Page</h1>
    <p>Current Slug: {{ route.params.slug }}</p>
  </div>
</template>
