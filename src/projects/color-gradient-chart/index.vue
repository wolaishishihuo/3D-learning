<script setup lang="ts">
const containerRef = ref<HTMLDivElement>();

onMounted(() => {
  // TODO: 颜色渐变柱状图的代码
  // 1. 初始化 Three.js 场景、相机、渲染器
  //    import * as THREE from 'three';
  // 2. 创建柱状图数据（可以使用示例数据）
  // 3. 根据数据值计算颜色（使用顶点颜色渐变）
  // 4. 创建柱状图几何体并应用颜色
  // 5. 添加动画效果（可选）
  console.log('Container ref:', containerRef.value);
});

onUnmounted(() => {
  // TODO: 清理资源
});
</script>

<template>
  <div ref="containerRef" class="project-container">
    <div class="placeholder">
      <h2>实战: 颜色渐变柱状图</h2>
      <p>使用顶点颜色实现数据可视化的颜色渐变柱状图</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.project-container {
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
