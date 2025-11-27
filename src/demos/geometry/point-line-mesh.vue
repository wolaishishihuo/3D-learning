<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const containerRef = ref<HTMLDivElement>();
let scene: THREE.Scene | null = null;
let camera: THREE.PerspectiveCamera | null = null;
let renderer: THREE.WebGLRenderer | null = null;
let controls: OrbitControls | null = null;

// - Points: 点模型
// function pointsMeshInit() {
//   const geometry = new THREE.BufferGeometry();

//   const vertices = new Float32Array([0, 0, 0, 100, 0, 0, 0, 100, 0, 0, 0, 100, 100, 100, 0]);
//   const attribute = new THREE.BufferAttribute(vertices, 3);
//   geometry.attributes.position = attribute;

//   const material = new THREE.PointsMaterial({
//     color: new THREE.Color('orange'),
//     size: 10
//   });
//   return new THREE.Points(geometry, material);
// }

// - Line: 线模型
// function lineMeshInit() {
//   const geometry = new THREE.BufferGeometry();

//   const vertices = new Float32Array([0, 0, 0, 100, 0, 0, 0, 100, 0, 0, 0, 100, 100, 100, 0]);
//   const attribute = new THREE.BufferAttribute(vertices, 3);
//   geometry.attributes.position = attribute;

//   const material = new THREE.LineBasicMaterial({
//     color: new THREE.Color('orange')
//   });
//   // return new THREE.LineLoop(geometry, material);
//   // return new THREE.Line(geometry, material);
//   return new THREE.LineSegments(geometry, material);
// }

// - Mesh: 网格模型
function meshMeshInit() {
  const geometry = new THREE.PlaneGeometry(100, 100, 2, 3);

  const material = new THREE.MeshBasicMaterial({
    color: new THREE.Color('orange'),
    wireframe: true
  });

  return new THREE.Mesh(geometry, material);
}

onMounted(() => {
  if (!containerRef.value) return;

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

  // - Points: 点模型
  // const points = pointsMeshInit();
  // scene.add(points);
  // - Line: 线模型
  // const line = lineMeshInit();
  // scene.add(line);
  // - Mesh: 网格模型
  const mesh = meshMeshInit();
  scene.add(mesh);
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
  controls?.dispose();
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
