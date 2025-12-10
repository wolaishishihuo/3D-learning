<script setup lang="ts">
import type { CodeSnippet } from '@/components/CodeBlock/index.vue';

const sceneCardRef = ref();

const codeSnippets: CodeSnippet[] = [
  {
    title: '加载外部模型',
    code: `// 使用 GLTFLoader 加载模型
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const loader = new GLTFLoader();
loader.load(
  '/path/to/model.gltf',
  (gltf) => {
    const model = gltf.scene;
    scene.add(model);
  },
  (progress) => {
    console.log('加载进度:', progress.loaded / progress.total);
  },
  (error) => {
    console.error('加载失败:', error);
  }
);`,
    language: 'typescript'
  },
  {
    title: 'GLTF 文件结构',
    code: `// GLTF 三种文件结构：
// 1. .gltf + .bin + 纹理文件（分离式）
// 2. .gltf + 纹理文件（.bin 嵌入 JSON）
// 3. .glb（二进制格式，所有资源打包）

// gltf.scene - 场景根节点
// gltf.scenes - 所有场景
// gltf.animations - 动画数组
// gltf.cameras - 相机数组
// gltf.asset - 资源元信息`,
    language: 'typescript'
  },
  {
    title: 'Draco 压缩加载',
    code: `// 配置 DRACOLoader
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/draco/'); // Draco 解码器路径
dracoLoader.setDecoderConfig({ type: 'js' });

// 将 DRACOLoader 设置给 GLTFLoader
const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

// 加载压缩后的模型
gltfLoader.load('/path/to/model.glb', (gltf) => {
  scene.add(gltf.scene);
});`,
    language: 'typescript'
  },
  {
    title: 'gltf-pipeline 使用',
    code: `# 安装 gltf-pipeline
npm install -g gltf-pipeline

# 压缩模型（Draco 压缩）
gltf-pipeline -i model.gltf -o model-compressed.glb -d

# 优化模型（移除未使用资源）
gltf-pipeline -i model.gltf -o model-optimized.gltf

# 组合优化
gltf-pipeline -i model.gltf -o model.glb -d --draco.compressionLevel 10`,
    language: 'bash'
  }
];

// 获取 SceneCard 内部容器的 ref
const containerRef = computed(() => sceneCardRef.value?.container);

useThreeScene(containerRef, {
  cameraPosition: [5, 5, 10],
  showGridHelper: true,
  showAxesHelper: true,
  onReady: ({ scene: _scene }) => {
    // TODO: 模型加载与优化的代码
    // 1. 使用 GLTFLoader 加载外部模型
    //    import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
    // 2. 配置 DRACOLoader（如果使用 Draco 压缩模型）
    //    import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
    // 3. 处理加载进度和错误回调
    // 4. 将加载的模型添加到场景
    console.log('Scene ready:', _scene);
  }
});
</script>

<template>
  <div class="demo-scene flex flex-col gap-6">
    <SceneCard ref="sceneCardRef" title="模型加载示例" height="500px" />

    <Summary title="知识点总结">
      <SummaryItem title="外部模型加载">
        使用 <Code>GLTFLoader</Code> 加载 GLTF/GLB 格式模型。
        <Code>loader.load()</Code>
        支持进度回调和错误处理。GLTF 是 Three.js 推荐的模型格式。
      </SummaryItem>
      <SummaryItem title="GLTF 文件结构">
        GLTF 有三种结构：分离式（.gltf + .bin +
        纹理）、部分嵌入（.bin嵌入JSON）、二进制（.glb）。<Code>gltf.scene</Code>
        是场景根节点，<Code>gltf.animations</Code> 包含动画数据。
      </SummaryItem>
      <SummaryItem title="gltf-pipeline 工具">
        用于优化和压缩 GLTF 模型。支持 Draco
        压缩、资源优化、格式转换等功能。命令行工具，适合构建流程集成。
      </SummaryItem>
      <SummaryItem title="Draco 压缩">
        Draco 是 Google 开发的几何压缩库，可大幅减小模型文件大小。使用
        <Code>DRACOLoader</Code> 配合 <Code>GLTFLoader</Code>
        加载压缩后的模型。需要配置解码器路径。
      </SummaryItem>
      <SummaryItem title="性能优化">
        压缩模型可减少加载时间和内存占用。使用 <Code>gltf-pipeline</Code> 的
        <Code>-d</Code> 参数启用 Draco 压缩，<Code>--draco.compressionLevel</Code>
        控制压缩级别（0-10）。
      </SummaryItem>

      <template #tip>
        <strong>提示：</strong>生产环境建议使用 .glb 格式（二进制），文件更小且加载更快。Draco
        压缩适合复杂模型，简单模型可能压缩后反而更大。
      </template>
    </Summary>

    <CodeBlock title="关键代码" :snippets="codeSnippets" />
  </div>
</template>

<style lang="scss">
@use '@/demos/index.scss';
</style>
