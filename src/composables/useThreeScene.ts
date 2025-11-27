import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export interface ThreeSceneOptions {
  cameraPosition?: [number, number, number];
  cameraLookAt?: [number, number, number];
  showAxesHelper?: boolean;
  showGridHelper?: boolean;
  backgroundColor?: number;
  fov?: number;
}

export const useThreeScene = (container: HTMLElement, options: ThreeSceneOptions = {}) => {
  const {
    cameraPosition = [0, 20, 50],
    cameraLookAt = [0, 0, 0],
    showAxesHelper = true,
    showGridHelper = true,
    backgroundColor = 0x000000,
    fov = 45
  } = options;

  const width = container.offsetWidth;
  const height = container.offsetHeight;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(backgroundColor);

  // 相机设置
  const camera = new THREE.PerspectiveCamera(fov, width / height, 0.1, 1000);
  camera.position.set(...cameraPosition);
  camera.lookAt(...cameraLookAt);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  // 辅助网格和坐标轴
  if (showAxesHelper) {
    scene.add(new THREE.AxesHelper(10));
  }
  if (showGridHelper) {
    scene.add(new THREE.GridHelper(50, 50, 0x444444, 0x222222));
  }

  // 渲染循环
  let animationId: number;
  const animate = () => {
    animationId = requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  };
  animate();

  // 清理函数
  const cleanup = () => {
    cancelAnimationFrame(animationId);
    renderer.dispose();
    controls.dispose();
    container.removeChild(renderer.domElement);
  };

  return { scene, camera, renderer, controls, cleanup };
};
