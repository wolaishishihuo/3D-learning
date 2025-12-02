<script setup lang="ts">
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const containerRef = ref<HTMLDivElement>();

const initScene = () => {
  if (!containerRef.value) return;

  const width = containerRef.value.offsetWidth;
  const height = containerRef.value.offsetHeight;

  const scene = new THREE.Scene();

  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load('/src/assets/jupiter.png');
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;

  const sphereGeometry = new THREE.SphereGeometry(50);
  const material = new THREE.MeshBasicMaterial({ map: texture });
  const mesh = new THREE.Mesh(sphereGeometry, material);
  scene.add(mesh);

  const camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000);
  camera.position.set(63, 8, 118);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);

  function render() {
    mesh.material.map!.offset.x += 0.001;
    renderer?.render(scene!, camera!);
    requestAnimationFrame(render);
  }
  render();
  containerRef.value.appendChild(renderer.domElement);

  new OrbitControls(camera, renderer.domElement);
};

onMounted(() => {
  initScene();
});

const codeSnippets = [
  {
    title: '纹理加载与颜色空间',
    code: `// 加载纹理并设置颜色空间
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('/src/assets/jupiter.png');
texture.colorSpace = THREE.SRGBColorSpace; // 确保颜色正确显示`
  },
  {
    title: '纹理重复设置',
    code: `// 设置纹理水平方向重复包裹
texture.wrapS = THREE.RepeatWrapping;
// 这样当 offset 超出 1.0 时，纹理会无缝循环

// 也可以设置垂直方向
texture.wrapT = THREE.RepeatWrapping;`
  },
  {
    title: '应用纹理到材质',
    code: `// 将纹理应用到材质
const material = new THREE.MeshBasicMaterial({ map: texture });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);`
  },
  {
    title: '水平方向动画',
    code: `// 在渲染循环中修改水平偏移
function render() {
  mesh.material.map!.offset.x += 0.001; // 每帧向右移动
  renderer?.render(scene!, camera!);
  requestAnimationFrame(render);
}`
  },
  {
    title: '垂直方向动画',
    code: `// 修改垂直偏移实现上下滚动
mesh.material.map!.offset.y += 0.001; // 每帧向上移动
// 负值则向下移动`
  },
  {
    title: '纹理重复次数',
    code: `// 设置纹理重复次数（放大/缩小纹理）
texture.repeat.set(2, 2); // 水平2次，垂直2次
// 小于1的值会放大纹理，大于1的值会缩小纹理`
  }
];
</script>

<template>
  <div class="demo-scene flex flex-col gap-6">
    <div ref="containerRef" class="canvas-container"></div>

    <Summary title="UV 坐标动画总结">
      <SummaryItem title="UV 坐标系统">
        UV 坐标是纹理映射到几何体表面的二维坐标系统，U 代表水平方向，V 代表垂直方向。坐标范围通常是
        0.0 到 1.0。
      </SummaryItem>
      <SummaryItem title="纹理偏移 (offset)">
        通过修改 <Code>texture.offset.x</Code> 或
        <Code>texture.offset.y</Code>
        可以移动纹理在模型表面的位置。正值向右/向上移动，负值向左/向下移动。
      </SummaryItem>
      <SummaryItem title="纹理重复 (RepeatWrapping)">
        设置 <Code>texture.wrapS = THREE.RepeatWrapping</Code> 后，当 offset 值超过 1.0
        时，纹理会无缝循环重复，实现无限滚动的视觉效果。
      </SummaryItem>
      <SummaryItem title="动画实现">
        在渲染循环中持续修改 <Code>offset</Code> 值，配合
        <Code>requestAnimationFrame</Code>
        可以实现流畅的纹理动画效果。调整增量值可以控制动画速度。
      </SummaryItem>

      <template #tip>
        <strong>提示：</strong>除了 <Code>offset</Code>，还可以使用
        <Code>texture.repeat</Code> 控制纹理重复次数，使用
        <Code>texture.rotation</Code> 旋转纹理方向。
      </template>
    </Summary>

    <CodeBlock title="关键代码" :snippets="codeSnippets" />
  </div>
</template>

<style lang="scss">
@use '@/demos/index.scss';
</style>
