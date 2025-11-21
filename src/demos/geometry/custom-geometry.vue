<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const containerRef = ref<HTMLDivElement>()

onMounted(() => {
  // TODO: 在这里初始化 Three.js 场景
  // 1. 创建场景 (Scene)
  // 2. 创建相机 (Camera)
  // 3. 创建渲染器 (Renderer)
  // 4. 使用 BufferGeometry 创建自定义几何体
  // 5. 定义顶点位置 (position attribute)
  // 6. 可选：定义法线、UV、颜色等属性
})

onUnmounted(() => {
  // TODO: 清理资源
})
</script>

<template>
  <div ref="containerRef" class="demo-container">
    <div class="placeholder">
      <h2>Custom Geometry</h2>
      <p>自定义几何体示例 - 请添加 Three.js 代码</p>
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
