<template>
  <div class="project-container relative">
    <div class="absolute left-0 top-0 z-10 p-4">
      <h1 class="text-2xl font-bold text-white">盖房子</h1>
      <p class="text-sm text-gray-500">使用 Three.js 几何体组合构建房屋模型</p>
    </div>
    <div ref="containerRef" class="canvas-container"></div>
  </div>
</template>

<script setup lang="ts">
const containerRef = ref<HTMLDivElement>();

useThreeScene(containerRef, {
  cameraPosition: [100, 100, 100],
  showGridHelper: true,
  showAxesHelper: true,
  backgroundColor: 0x111111,
  fov: 45,
  onReady: ({ scene }) => {
    // TODO: 盖房子代码
    console.log('Scene ready:', scene);
  }
});
</script>

<style scoped lang="scss">
.project-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.canvas-container {
  width: 100%;
  height: 100%;
}
</style>
