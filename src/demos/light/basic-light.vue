<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

const containerRef = ref<HTMLDivElement>();

onMounted(() => {
  // TODO: 在这里初始化 Three.js 场景
  // 1. 创建场景 (Scene)
  // 2. 创建相机 (Camera)
  // 3. 创建渲染器 (Renderer)
  // 4. 添加环境光 (AmbientLight)
  // 5. 添加方向光 (DirectionalLight)
  // 6. 创建物体来展示光照效果
});

onUnmounted(() => {
  // TODO: 清理资源
});
</script>

<template>
  <div ref="containerRef" class="demo-container">
    <div class="placeholder">
      <h2>Basic Light</h2>
      <p>基础光照示例 - 请添加 Three.js 代码</p>
    </div>
  </div>
</template>

<style scoped>
.demo-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #666;
}
</style>
