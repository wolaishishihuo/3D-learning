<template>
  <div class="demo-scene">
    <div ref="containerRef" class="canvas-container"></div>

    <div class="text-white text-blod text-3xl">
      fov：影响可视范围角度、离物体远近
      <br />
      aspect：可视范围宽高比，一般设置网页宽高比
      <br />
      near：近裁截面距离，一般保持默认值 0.1，当你需要截掉一些特别近的物体的时候，把它加大
      <br />
      far：远裁截面距离，如果有的物体被裁截掉看不到了，就需要调大 far 把它们包含进来
    </div>
  </div>
</template>

<script setup lang="ts">
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';

const containerRef = ref<HTMLDivElement>();
let gui: GUI | null = null;

const initScene = () => {
  if (!containerRef.value) return;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x111111);

  const camera = new THREE.PerspectiveCamera(
    75,
    containerRef.value.clientWidth / containerRef.value.clientHeight,
    1,
    1000
  );

  camera.position.set(200, 200, 200);
  camera.lookAt(0, 0, 0);

  const camera2 = new THREE.PerspectiveCamera(10, 16 / 9, 100, 300);
  const cameraHelper = new THREE.CameraHelper(camera2);
  scene.add(cameraHelper);

  gui = new GUI({ container: containerRef.value });
  gui.domElement.style.position = 'absolute';

  function onChange() {
    camera2.updateProjectionMatrix();
    cameraHelper.update();
  }
  gui.add(camera2, 'fov', [30, 60, 10]).onChange(onChange);
  gui
    .add(camera2, 'aspect', {
      '16/9': 16 / 9,
      '4/3': 4 / 3
    })
    .onChange(onChange);
  gui.add(camera2, 'near', 0, 300).onChange(onChange);
  gui.add(camera2, 'far', 300, 800).onChange(onChange);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(containerRef.value.clientWidth, containerRef.value.clientHeight);

  function render() {
    if (renderer && scene && camera) {
      renderer.render(scene, camera);
    }
    requestAnimationFrame(render);
  }
  render();
  containerRef.value.appendChild(renderer.domElement);
  new OrbitControls(camera, renderer.domElement);
};

onMounted(() => {
  initScene();
});

onUnmounted(() => {
  gui?.destroy();
});
</script>

<style lang="scss">
@use '@/demos/index.scss';
</style>


