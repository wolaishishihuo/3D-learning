<template>
  <div class="project-container relative">
    <div class="absolute top-0 left-0 p-4">
      <h1 class="text-2xl font-bold text-white">实战: 云雷纹</h1>
    </div>
    <div ref="containerRef" class="canvas-container"></div>
  </div>
</template>

<script setup lang="ts">
const containerRef = ref<HTMLDivElement>();
</script>
