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
</script>

<template>
  <div ref="containerRef" class="canvas-container"></div>
</template>

<style lang="scss">
@use '@/demos/index.scss';
</style>
