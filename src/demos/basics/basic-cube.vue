<script setup lang="ts">
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const containerRef = ref<HTMLDivElement>();
let scene: THREE.Scene | null = null;
let camera: THREE.PerspectiveCamera | null = null;
let renderer: THREE.WebGLRenderer | null = null;
let mesh: THREE.Mesh | null = null;
let pointLight: THREE.PointLight | null = null;

const initScene = () => {
  if (!containerRef.value) return;

  // 创建场景
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x111111);

  // 创建物体
  const geometry = new THREE.BoxGeometry(100, 100, 100);
  const material = new THREE.MeshLambertMaterial({
    color: new THREE.Color('orange')
  });
  mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0, 0, 0);
  scene.add(mesh);

  // 创建 坐标轴辅助器
  const axesHelper = new THREE.AxesHelper(200);
  scene.add(axesHelper);

  // 创建 点光源
  pointLight = new THREE.PointLight(0xffffff, 10000);
  pointLight.position.set(80, 80, 80);
  scene.add(pointLight);

  // 创建 相机
  const width = containerRef.value.clientWidth;
  const height = containerRef.value.clientHeight;

  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.set(200, 200, 200);
  camera.lookAt(0, 0, 0);

  // 创建 渲染器
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);

  function render() {
    if (renderer && scene && camera) {
      renderer.render(scene, camera);
    }
    requestAnimationFrame(render);
  }
  render();
  // 渲染
  containerRef.value.appendChild(renderer.domElement);
  new OrbitControls(camera, renderer.domElement);
};

onMounted(() => {
  initScene();
});

onUnmounted(() => {
  renderer?.dispose();
});
</script>

<template>
  <div class="demo-scene">
    <div ref="containerRef" class="canvas-container"></div>
  </div>
</template>

<style lang="scss">
@use '@/demos/index.scss';
</style>
