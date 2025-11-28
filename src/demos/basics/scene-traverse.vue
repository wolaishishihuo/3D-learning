<script setup lang="ts">
import type { CodeSnippet } from '@/components/CodeBlock/index.vue';

const sceneCardRef = ref();

const codeSnippets: CodeSnippet[] = [
  {
    title: '场景遍历',
    code: `// 遍历场景中的所有对象
scene.traverse((object) => {
  console.log(object.name, object.type);

  if (object instanceof THREE.Mesh) {
    // 处理网格对象
    object.material.color.set(0xff0000);
  }
});`,
    language: 'typescript'
  },
  {
    title: '世界坐标',
    code: `// 获取对象的世界坐标
const worldPosition = new THREE.Vector3();
mesh.getWorldPosition(worldPosition);
console.log('世界坐标:', worldPosition);

// 本地坐标 vs 世界坐标
console.log('本地坐标:', mesh.position);`,
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
    // TODO: 场景遍历和世界坐标的代码
    console.log('Scene ready:', scene);
  }
});
</script>

<template>
  <div class="demo-scene flex flex-col gap-6">
    <SceneCard ref="sceneCardRef" title="场景遍历和世界坐标" height="500px" />

    <Summary title="知识点总结">
      <SummaryItem title="scene.traverse()">
        使用 <Code>scene.traverse(callback)</Code> 遍历场景中的所有对象，包括子对象
      </SummaryItem>
      <SummaryItem title="本地坐标">
        <Code>object.position</Code> 表示相对于父对象的本地坐标
      </SummaryItem>
      <SummaryItem title="世界坐标">
        使用 <Code>getWorldPosition()</Code> 获取对象在世界坐标系中的绝对位置
      </SummaryItem>
      <SummaryItem title="对象查找">
        使用 <Code>scene.getObjectByName()</Code> 按名称查找对象
      </SummaryItem>

      <template #tip>
        <strong>提示：</strong>世界坐标 =
        所有父级变换的累积结果，修改父对象位置会影响子对象的世界坐标
      </template>
    </Summary>

    <CodeBlock title="关键代码" :snippets="codeSnippets" />
  </div>
</template>

<style lang="scss">
@use '@/demos/index.scss';
</style>
