<template>
  <div class="project-container relative">
    <div class="absolute left-0 top-0 z-10 p-4">
      <h1 class="text-2xl font-bold text-white">无限时空隧道</h1>
      <p class="text-sm text-gray-500">UV 动画实战：使用纹理动画实现无限时空隧道效果</p>
    </div>
    <div ref="containerRef" class="canvas-container"></div>
  </div>
</template>

<script setup lang="ts">
const containerRef = ref<HTMLDivElement>();

useThreeScene(containerRef, {
  cameraPosition: [0, 0, 5],
  showGridHelper: false,
  showAxesHelper: false,
  backgroundColor: 0x000000,
  fov: 75,
  onReady: ({ scene }) => {
    // TODO: 无限时空隧道 UV 动画代码
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
