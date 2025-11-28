<script setup lang="ts">
import type { CodeSnippet } from '@/components/CodeBlock/index.vue';

const sceneCardRef = ref();

const codeSnippets: CodeSnippet[] = [
  {
    title: '按规律生成几何体',
    code: `// 使用循环按规律生成多个几何体
for (let i = 0; i < count; i++) {
  const geometry = new THREE.BoxGeometry(size, size, size);
  const material = new THREE.MeshStandardMaterial({ color });
  const mesh = new THREE.Mesh(geometry, material);

  // 按规律设置位置
  mesh.position.set(x, y, z);
  scene.add(mesh);
}`,
    language: 'typescript'
  },
  {
    title: '圆形排列',
    code: `// 圆形排列几何体
const radius = 50;
const count = 12;
for (let i = 0; i < count; i++) {
  const angle = (i / count) * Math.PI * 2;
  mesh.position.x = Math.cos(angle) * radius;
  mesh.position.z = Math.sin(angle) * radius;
}`,
    language: 'typescript'
  }
];

// 获取 SceneCard 内部容器的 ref
const containerRef = computed(() => sceneCardRef.value?.container);

useThreeScene(containerRef, {
  cameraPosition: [100, 100, 100],
  showGridHelper: true,
  showAxesHelper: true,
  onReady: ({ scene }) => {
    // TODO: 按照规律生成各种几何体的代码
    console.log('Scene ready:', scene);
  }
});
</script>

<template>
  <div class="demo-scene flex flex-col gap-6">
    <SceneCard ref="sceneCardRef" title="按照规律生成各种几何体" height="500px" />

    <Summary title="知识点总结">
      <SummaryItem title="循环生成">
        使用 <Code>for</Code> 循环按规律批量生成几何体，配合数学公式计算位置
      </SummaryItem>
      <SummaryItem title="圆形排列">
        使用 <Code>Math.cos</Code> 和 <Code>Math.sin</Code> 实现圆形排列
      </SummaryItem>
      <SummaryItem title="网格排列">
        使用双层循环实现网格状排列，通过索引计算 x、z 坐标
      </SummaryItem>
      <SummaryItem title="螺旋排列"> 结合角度递增和半径变化实现螺旋排列效果 </SummaryItem>
    </Summary>

    <CodeBlock title="关键代码" :snippets="codeSnippets" />
  </div>
</template>

<style lang="scss">
@use '@/demos/index.scss';
</style>
