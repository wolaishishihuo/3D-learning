<script setup lang="ts">
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const containerRef = ref<HTMLDivElement>();
const containerRef2 = ref<HTMLDivElement>();

const initEarthScene = (container: HTMLDivElement) => {
  if (!container) return;

  const width = container.clientWidth;
  const height = container.clientHeight;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x111111);

  const textureLoad = new THREE.TextureLoader();
  const texture = textureLoad.load('/src/assets/earth.png');
  texture.colorSpace = THREE.SRGBColorSpace;

  const sphereGeometry = new THREE.SphereGeometry(100);
  const material = new THREE.MeshBasicMaterial({ map: texture });
  const mesh = new THREE.Mesh(sphereGeometry, material);
  scene.add(mesh);

  const camera = new THREE.PerspectiveCamera(65, width / height, 0.1, 10000);
  camera.position.setScalar(200);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);

  function render() {
    renderer?.render(scene!, camera!);
    requestAnimationFrame(render);
  }
  render();
  container.appendChild(renderer.domElement);

  new OrbitControls(camera, renderer.domElement);
};

// 墙体场景
const initWallScene = (container: HTMLDivElement) => {
  if (!container) return;

  const width = container.clientWidth;
  const height = container.clientHeight;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x111111);

  const textureLoad = new THREE.TextureLoader();
  const texture = textureLoad.load('/src/assets/wall.png');
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 3);

  const planeGeometry = new THREE.PlaneGeometry(300, 300, 100, 100);
  const material = new THREE.MeshBasicMaterial({ map: texture, aoMap: texture });
  const mesh = new THREE.Mesh(planeGeometry, material);
  scene.add(mesh);

  const camera = new THREE.PerspectiveCamera(65, width / height, 0.1, 10000);
  camera.position.set(-2, 24, 368);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);

  function render() {
    renderer?.render(scene!, camera!);
    requestAnimationFrame(render);
  }
  render();
  container.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.addEventListener('change', () => {
    console.log(camera.position);
  });
};

onMounted(() => {
  initEarthScene(containerRef.value!);
  initWallScene(containerRef2.value!);
});

const codeSnippets = [
  {
    title: '纹理加载与应用',
    code: `// 1. 加载纹理与设置颜色空间
const textureLoad = new THREE.TextureLoader();
const texture = textureLoad.load('/src/assets/earth.png');
texture.colorSpace = THREE.SRGBColorSpace;

// 2. 应用纹理到材质
const material = new THREE.MeshBasicMaterial({ map: texture });`
  },
  {
    title: '纹理重复与AO贴图',
    code: `// 1. 设置纹理重复方式
texture.wrapS = THREE.RepeatWrapping; // 水平方向重复
texture.wrapT = THREE.RepeatWrapping; // 垂直方向重复
texture.repeat.set(3, 3); // 设置重复次数 (x, y)

// 2. 设置 aoMap (环境光遮蔽贴图)
const material = new THREE.MeshBasicMaterial({
  map: texture,
  aoMap: texture
});`
  }
];
</script>

<template>
  <div class="demo-scene flex flex-col gap-6">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div ref="containerRef" class="canvas-container"></div>
      <div ref="containerRef2" class="canvas-container"></div>
    </div>

    <Summary title="材质属性总结">
      <SummaryItem title="模型材质分类"> 点模型、线模型、网格模型都有对应的专用材质。 </SummaryItem>
      <SummaryItem title="线模型与虚线">
        渲染几何体轮廓需用 <Code>EdgesGeometry</Code> 处理顶点。使用
        <Code>LineDashedMaterial</Code> 绘制虚线时，必须调用
        <Code>line.computeLineDistances()</Code> 计算距离。
      </SummaryItem>
      <SummaryItem title="网格模型属性">
        主要属性涉及光照与外观，如
        <Code>color</Code>、<Code>map</Code>、<Code>transparent</Code>、<Code>opacity</Code>
        等。启用透明效果需设置 <Code>transparent: true</Code> 配合 <Code>opacity</Code>。
      </SummaryItem>

      <SummaryItem title="纹理贴图 (Map)">
        通过 <Code>TextureLoader</Code>
        加载。支持设置水平/竖直重复次数（Repeat）。若颜色显示异常，请检查
        <Code>texture.colorSpace</Code> 设置。
      </SummaryItem>
      <SummaryItem title="环境遮挡 (aoMap)">
        <Code>aoMap</Code> 基于环境光遮蔽计算贴图阴影，为模型增加凹凸感和深度细节。
      </SummaryItem>

      <template #tip>
        <strong>常用提示：</strong><Code>color</Code> 和
        <Code>map</Code> 是开发中最高频使用的材质属性，建议熟练掌握。
      </template>
    </Summary>

    <CodeBlock title="关键代码" :snippets="codeSnippets" />
  </div>
</template>

<style lang="scss">
@use '@/demos/index.scss';
</style>
