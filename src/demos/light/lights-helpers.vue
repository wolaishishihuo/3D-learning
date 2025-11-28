<script setup lang="ts">
import type { CodeSnippet } from '@/components/CodeBlock/index.vue';

const sceneCardRef = ref();

const codeSnippets: CodeSnippet[] = [
  {
    title: '各种灯光类型',
    code: `// 环境光 - 均匀照亮所有物体
const ambient = new THREE.AmbientLight(0xffffff, 0.5);

// 平行光 - 模拟太阳光
const directional = new THREE.DirectionalLight(0xffffff, 1);
directional.position.set(10, 10, 10);

// 点光源 - 从一点向四周发光
const point = new THREE.PointLight(0xff0000, 1, 100);

// 聚光灯 - 锥形光束
const spot = new THREE.SpotLight(0x00ff00, 1);
spot.angle = Math.PI / 6;`,
    language: 'typescript'
  },
  {
    title: '常用 Helper',
    code: `// 坐标轴辅助器
const axesHelper = new THREE.AxesHelper(10);

// 网格辅助器
const gridHelper = new THREE.GridHelper(100, 100);

// 平行光辅助器
const dirLightHelper = new THREE.DirectionalLightHelper(directional, 5);

// 点光源辅助器
const pointLightHelper = new THREE.PointLightHelper(point, 1);

// 聚光灯辅助器
const spotLightHelper = new THREE.SpotLightHelper(spot);`,
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
    // TODO: 各种灯光和常用 Helper 的代码
    console.log('Scene ready:', scene);
  }
});
</script>

<template>
  <div class="demo-scene flex flex-col gap-6">
    <SceneCard ref="sceneCardRef" title="各种灯光和常用 Helper" height="500px" />

    <Summary title="知识点总结">
      <SummaryItem title="AmbientLight">
        <Code>环境光</Code>：均匀照亮场景中的所有物体，没有方向，不产生阴影
      </SummaryItem>
      <SummaryItem title="DirectionalLight">
        <Code>平行光</Code>：模拟太阳光，光线平行，可以产生阴影
      </SummaryItem>
      <SummaryItem title="PointLight">
        <Code>点光源</Code>：从一个点向四周发射光线，类似灯泡
      </SummaryItem>
      <SummaryItem title="SpotLight"> <Code>聚光灯</Code>：锥形光束，可设置角度和衰减 </SummaryItem>
      <SummaryItem title="Helper 辅助器">
        使用 <Code>LightHelper</Code> 可视化灯光位置和方向，便于调试
      </SummaryItem>
      <SummaryItem title="阴影设置">
        需要设置 <Code>castShadow</Code> 和 <Code>receiveShadow</Code> 属性
      </SummaryItem>

      <template #tip>
        <strong>提示：</strong>环境光配合其他光源使用效果更好，避免场景过暗
      </template>
    </Summary>

    <CodeBlock title="关键代码" :snippets="codeSnippets" />
  </div>
</template>

<style lang="scss">
@use '@/demos/index.scss';
</style>
