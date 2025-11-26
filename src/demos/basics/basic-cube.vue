<template>
  <div class="demo-scene">
    <div ref="containerRef" class="canvas-container"></div>
    <div class="control-panel">
      <div class="control-header">
        <h3>Parameters</h3>
        <p>Adjust the scene parameters</p>
      </div>
      <div class="control-content">
        <div class="control-group">
          <label>Rotation Speed</label>
          <ASlider v-model:value="rotationSpeed" :min="0" :max="0.1" :step="0.001" />
          <span class="value">{{ rotationSpeed.toFixed(3) }}</span>
        </div>
        <div class="control-group">
          <label>Color</label>
          <input v-model="cubeColor" type="color" class="color-picker" />
        </div>
        <AButton @click="resetScene">Reset</AButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as THREE from 'three';

const containerRef = ref<HTMLDivElement>();
const rotationSpeed = ref(0.01);
const cubeColor = ref('#667eea');

let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let cube: THREE.Mesh;
let animationId: number;

const initScene = () => {
  if (!containerRef.value) return;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x111111);

  const width = containerRef.value.clientWidth;
  const height = containerRef.value.clientHeight;
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);
  containerRef.value.appendChild(renderer.domElement);

  const geometry = new THREE.BoxGeometry(2, 2, 2);
  const material = new THREE.MeshPhongMaterial({
    color: cubeColor.value,
    shininess: 100
  });
  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);

  const gridHelper = new THREE.GridHelper(10, 10, 0x333333, 0x222222);
  scene.add(gridHelper);

  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

  window.addEventListener('resize', handleResize);
  animate();
};

const animate = () => {
  animationId = requestAnimationFrame(animate);
  cube.rotation.x += rotationSpeed.value;
  cube.rotation.y += rotationSpeed.value;
  renderer.render(scene, camera);
};

const handleResize = () => {
  if (!containerRef.value) return;
  const width = containerRef.value.clientWidth;
  const height = containerRef.value.clientHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
};

const resetScene = () => {
  rotationSpeed.value = 0.01;
  cubeColor.value = '#667eea';
  if (cube) {
    (cube.material as THREE.MeshPhongMaterial).color.set(cubeColor.value);
  }
};

watch(cubeColor, newColor => {
  if (cube) {
    (cube.material as THREE.MeshPhongMaterial).color.set(newColor);
  }
});

onMounted(() => {
  initScene();
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  cancelAnimationFrame(animationId);
  renderer?.dispose();
  cube?.geometry.dispose();
  (cube?.material as THREE.Material)?.dispose();
});
</script>

<style lang="scss">
@use '@/demos/index.scss';
</style>
