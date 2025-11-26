<script setup lang="ts">
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const containerRef = ref<HTMLDivElement>();
let scene: THREE.Scene | null = null;
let camera: THREE.PerspectiveCamera | null = null;
let renderer: THREE.WebGLRenderer | null = null;
let controls: OrbitControls | null = null;

function meshInit() {
  const geometry = new THREE.BufferGeometry();

  // Float32Array: 32位浮点数数组，用于存储顶点坐标数据
  // 为什么用浮点数？因为3D坐标可以是小数（如 0.5, 100.7），浮点数能精确表示
  // 为什么用 Float32Array？性能优化，GPU 处理浮点数数组比普通数组快得多
  const vertices = new Float32Array([
    // 顶点坐标格式：每 3 个数字代表一个 3D 点的 (x, y, z) 坐标
    // 当前定义了两个三角形，共 6 个顶点：

    // 第一个三角形（3个顶点）：
    0,
    0,
    0, // 顶点1: (x=0, y=0, z=0) - 原点
    100,
    0,
    0, // 顶点2: (x=100, y=0, z=0) - X轴方向100单位
    0,
    100,
    0, // 顶点3: (x=0, y=100, z=0) - Y轴方向100单位

    // 第二个三角形（3个顶点）：
    0,
    100,
    0, // 顶点4: (x=0, y=100, z=0) - 与顶点3相同位置
    100,
    0,
    0, // 顶点5: (x=100, y=0, z=0) - 与顶点2相同位置
    100,
    100,
    0 // 顶点6: (x=100, y=100, z=0) - 右上角
    // 这两个三角形组成一个矩形（在 XY 平面上，z=0）
  ]);

  // BufferAttribute: 告诉 Three.js 如何解析这个数组
  // 参数2的 3 表示：每 3 个数字组成一个顶点坐标 (x, y, z)
  const attribute = new THREE.BufferAttribute(vertices, 3);
  geometry.attributes.position = attribute;
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
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

  // 学习 BufferGeometry 的顶点生成方法
  // 初始化网格
  const mesh = meshInit();
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
