<template>
  <div class="project-container relative">
    <div class="absolute top-0 left-0 p-4">
      <h1 class="text-2xl font-bold text-white">Random Terrain</h1>
      <p class="text-sm text-gray-500">
        使用 Three.js 和 Simplex Noise 算法生成动态随机地形，结合正弦波函数实现平滑的波浪动画效果。
      </p>
    </div>
    <div ref="containerRef" class="canvas-container"></div>
  </div>
</template>

<script setup lang="ts">
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createNoise2D } from 'simplex-noise';

const containerRef = ref<HTMLDivElement>();
let scene: THREE.Scene;
let mesh: THREE.Mesh;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let planeGeometry: THREE.PlaneGeometry;
const noise2D = createNoise2D();

function updatePosition() {
  const positions = planeGeometry.attributes.position;

  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i);
    const y = positions.getY(i);

    const z = noise2D(x / 300, y / 300) * 50;
    const sinNum = Math.sin(Date.now() * 0.002 + x * 0.05) * 10;

    positions.setZ(i, z + sinNum);
  }
  positions.needsUpdate = true;
}

const initScene = () => {
  if (!containerRef.value) return;

  scene = new THREE.Scene();

  planeGeometry = new THREE.PlaneGeometry(3000, 3000, 100, 100);

  const positions = planeGeometry.attributes.position;
  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i);
    const y = positions.getY(i);

    const z = noise2D(x / 300, y / 300) * 50;
    positions.setZ(i, z);
  }

  const planeMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color('orange'),
    wireframe: true
  });
  mesh = new THREE.Mesh(planeGeometry, planeMaterial);

  mesh.rotateX(Math.PI / 2);
  scene.add(mesh);

  // const axesHelper = new THREE.AxesHelper(100);
  // scene.add(axesHelper);

  camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.set(450, 150, 100);
  camera.lookAt(0, 0, 0);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  const renderLoop = () => {
    updatePosition();
    mesh.rotateZ(0.003);
    requestAnimationFrame(renderLoop);
    renderer.render(scene, camera);
  };
  renderLoop();
  containerRef.value.appendChild(renderer.domElement);
  new OrbitControls(camera, renderer.domElement);
};

onMounted(() => {
  initScene();
});
</script>
