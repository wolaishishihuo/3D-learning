<template>
  <div class="demo-scene space-y-4">
    <div ref="containerRef" class="canvas-container"></div>
    <div class="text-white text-3xl font-bold">test5Value: {{ test5Value }}</div>
  </div>
</template>

<script setup lang="ts">
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';

const containerRef = ref<HTMLDivElement>();
let scene: THREE.Scene | null = null;
let camera: THREE.PerspectiveCamera | null = null;
let renderer: THREE.WebGLRenderer | null = null;
let mesh: THREE.Mesh | null = null;
let pointLight: THREE.PointLight | null = null;

const test5Value = ref(0);

const createGui = (
  mesh: THREE.Mesh,
  material: THREE.MeshLambertMaterial,
  pointLight: THREE.PointLight
) => {
  const gui = new GUI();
  const meshFolder = gui.addFolder('立方体');
  meshFolder.addColor(material, 'color');
  meshFolder.add(mesh.position, 'x').step(10);
  meshFolder.add(mesh.position, 'y').step(10);
  meshFolder.add(mesh.position, 'z').step(10);

  const lightFolder = gui.addFolder('灯光');
  lightFolder.add(pointLight.position, 'x').step(10);
  lightFolder.add(pointLight.position, 'y').step(10);
  lightFolder.add(pointLight.position, 'z').step(10);
  lightFolder.add(pointLight, 'intensity').step(1000);

  const otherFolder = gui.addFolder('其他控件');

  const otherFolderMap = {
    test1: 'test1',
    test2: false,
    test3: 'test3',
    test4: 0,
    test5: () => {
      test5Value.value++;
    },
    resetTest5: () => {
      test5Value.value = 0;
    }
  };

  otherFolder.add(otherFolderMap, 'test1');
  otherFolder.add(otherFolderMap, 'test2');
  otherFolder.add(otherFolderMap, 'test3');
  otherFolder.add(otherFolderMap, 'test4', 0, 100, 10);
  otherFolder.add(otherFolderMap, 'test5');
  otherFolder.add(otherFolderMap, 'resetTest5');
};

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

  // 创建 GUI
  createGui(mesh, material, pointLight);

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

<style lang="scss">
@use '@/demos/index.scss';
</style>
