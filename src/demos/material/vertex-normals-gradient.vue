<script setup lang="ts">
import type { CodeSnippet } from '@/components/CodeBlock/index.vue';

const sceneCardRef = ref();
const sceneCardRef2 = ref();

const codeSnippets: CodeSnippet[] = [
  {
    title: '顶点法线计算',
    code: `// 计算顶点法线
geometry.computeVertexNormals();

// 手动设置法线
const normals = geometry.attributes.normal;
normals.setXYZ(vertexIndex, nx, ny, nz);
normals.needsUpdate = true;`,
    language: 'typescript'
  },
  {
    title: '反射原理',
    code: `// 使用 MeshPhongMaterial 或 MeshStandardMaterial 实现反射
const material = new THREE.MeshPhongMaterial({
  color: 0x00ff00,
  shininess: 100, // 高光强度
  specular: 0xffffff // 高光颜色
});

// 添加光源以产生反射效果
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);`,
    language: 'typescript'
  },
  {
    title: '自定义顶点颜色',
    code: `// 创建颜色属性
const colors = [];
const positions = geometry.attributes.position;

for (let i = 0; i < positions.count; i++) {
  // 根据位置计算颜色（渐变效果）
  const y = positions.getY(i);
  const normalizedY = (y + 1) / 2; // 归一化到 0-1

  colors.push(normalizedY, 0, 1 - normalizedY); // RGB
}

geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

// 启用顶点颜色
const material = new THREE.MeshBasicMaterial({
  vertexColors: true
});`,
    language: 'typescript'
  }
];

// 获取 SceneCard 内部容器的 ref
const containerRef = computed(() => sceneCardRef.value?.container);
const containerRef2 = computed(() => sceneCardRef2.value?.container);

// 场景1: 顶点法线和反射
useThreeScene(containerRef, {
  cameraPosition: [5, 5, 10],
  showGridHelper: true,
  showAxesHelper: true,
  onReady: ({ scene: _scene }) => {
    // TODO: 顶点法线和反射的代码
    // 1. 添加光源（环境光和平行光）
    // 2. 创建几何体并计算顶点法线
    // 3. 使用 MeshPhongMaterial 或 MeshStandardMaterial 实现反射效果
    // 4. 添加 VertexNormalsHelper 可视化法线
    console.log('Scene ready:', _scene);
  }
});

// 场景2: 顶点颜色渐变
useThreeScene(containerRef2, {
  cameraPosition: [5, 5, 10],
  showGridHelper: true,
  showAxesHelper: true,
  onReady: ({ scene: _scene }) => {
    // TODO: 顶点颜色渐变的代码
    // 1. 创建几何体
    // 2. 根据顶点位置计算颜色值（归一化）
    // 3. 使用 setAttribute 设置颜色属性
    // 4. 使用 MeshBasicMaterial 并启用 vertexColors
    console.log('Scene ready:', _scene);
  }
});
</script>

<template>
  <div class="demo-scene flex flex-col gap-6">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <SceneCard ref="sceneCardRef" title="顶点法线和反射" height="500px" />
      <SceneCard ref="sceneCardRef2" title="顶点颜色渐变" height="500px" />
    </div>

    <Summary title="知识点总结">
      <SummaryItem title="顶点法线 (Vertex Normal)">
        法线决定面的朝向，影响光照计算和反射效果。使用
        <Code>geometry.computeVertexNormals()</Code>
        自动计算，或通过 <Code>geometry.attributes.normal</Code> 手动设置。
      </SummaryItem>
      <SummaryItem title="反射原理">
        使用 <Code>MeshPhongMaterial</Code> 或 <Code>MeshStandardMaterial</Code> 实现反射效果。
        <Code>shininess</Code> 控制高光强度，<Code>specular</Code>
        设置高光颜色。需要添加光源才能看到反射效果。
      </SummaryItem>
      <SummaryItem title="顶点颜色属性">
        通过 <Code>geometry.setAttribute('color', ...)</Code>
        设置顶点颜色数组，每个顶点包含 RGB 三个值。启用
        <Code>vertexColors: true</Code> 后材质会使用顶点颜色而非统一颜色。
      </SummaryItem>
      <SummaryItem title="颜色渐变实现">
        根据顶点位置（如 Y 坐标）计算归一化值，映射到 RGB
        颜色空间，实现平滑的颜色过渡效果。常用于数据可视化。
      </SummaryItem>

      <template #tip>
        <strong>提示：</strong>顶点颜色和法线都是几何体的属性，修改后需要设置
        <Code>needsUpdate = true</Code> 才能生效。
      </template>
    </Summary>

    <CodeBlock title="关键代码" :snippets="codeSnippets" />
  </div>
</template>

<style lang="scss">
@use '@/demos/index.scss';
</style>
