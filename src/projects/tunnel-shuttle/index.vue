<template>
  <div class="project-container relative">
    <div class="absolute left-0 top-0 z-10 p-4">
      <h1 class="text-2xl font-bold text-white">隧道穿梭</h1>
      <p class="text-sm text-gray-500">使用 Three.js 实现隧道穿梭效果</p>
    </div>
    <div ref="containerRef" class="canvas-container"></div>
  </div>
</template>

<script setup lang="ts">
const containerRef = ref<HTMLDivElement>();

onMounted(() => {
  if (!containerRef.value) return;

  const { scene: _scene, cleanup } = useThreeScene(containerRef.value, {
    cameraPosition: [0, 0, 5],
    showGridHelper: false,
    showAxesHelper: false,
    backgroundColor: 0x000000,
    fov: 75
  });

  // TODO: 隧道穿梭效果代码

  onUnmounted(cleanup);
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
