<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const containerRef = ref<HTMLDivElement>();
let scene: THREE.Scene | null = null;
let camera: THREE.PerspectiveCamera | null = null;
let renderer: THREE.WebGLRenderer | null = null;
let controls: OrbitControls | null = null;

onMounted(() => {
  if (!containerRef.value) return;

  // TODO: 在这里初始化 Three.js 场景
  // 1. 创建场景 (Scene)
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x111111);

  // 2. 创建相机 (Camera)
  const width = containerRef.value.clientWidth;
  const height = containerRef.value.clientHeight;
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.set(200, 200, 200);
  camera.lookAt(0, 0, 0);

  // 3. 创建渲染器 (Renderer)
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  containerRef.value.appendChild(renderer.domElement);

  // 4. 创建控制器
  controls = new OrbitControls(camera, renderer.domElement);

  // 5. 创建坐标轴辅助器
  const axesHelper = new THREE.AxesHelper(200);
  scene.add(axesHelper);

  // TODO: 学习点模型、线模型、网格模型
  // - Points: 点模型
  // - Line: 线模型
  // - Mesh: 网格模型

  // 6. 开始渲染循环
  function render() {
    if (renderer && scene && camera) {
      renderer.render(scene, camera);
    }
    requestAnimationFrame(render);
  }
  render();
});

onUnmounted(() => {
  // TODO: 清理资源
  controls?.dispose();
  renderer?.dispose();
});
</script>

<template>
  <div ref="containerRef" class="demo-container"></div>
</template>

<style lang="scss">
@use '@/demos/index.scss';
</style>


