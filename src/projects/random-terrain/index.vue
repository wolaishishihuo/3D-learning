<template>
  <div class="project-container">
    <div ref="containerRef" class="canvas-container"></div>
  </div>
</template>

<script setup lang="ts">
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const containerRef = ref<HTMLDivElement>();
let scene: THREE.Scene;
let mesh: THREE.Mesh;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;

const initScene = () => {
  if (!containerRef.value) return;

  scene = new THREE.Scene();

  const planeGeometry = new THREE.PlaneGeometry(100, 100, 10, 10);
  const planeMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color('orange'),
    wireframe: true
  });
  mesh = new THREE.Mesh(planeGeometry, planeMaterial);
  scene.add(mesh);

  const axesHelper = new THREE.AxesHelper(100);
  scene.add(axesHelper);

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.set(200, 200, 200);
  camera.lookAt(0, 0, 0);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  const renderLoop = () => {
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
