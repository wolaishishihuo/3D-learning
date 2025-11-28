import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { useResizeObserver } from '@vueuse/core';
import type { Ref, ShallowRef } from 'vue';

export interface ThreeSceneContext {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  controls: OrbitControls;
}

export interface AnimateContext extends ThreeSceneContext {
  /** 距离上一帧的时间间隔（秒） */
  delta: number;
  /** 从动画开始到现在的总时间（秒） */
  elapsed: number;
}

export interface ThreeSceneOptions {
  cameraPosition?: [number, number, number];
  cameraLookAt?: [number, number, number];
  showAxesHelper?: boolean;
  showGridHelper?: boolean;
  backgroundColor?: number;
  fov?: number;
  /** 场景初始化完成后的回调 */
  onReady?: (context: ThreeSceneContext) => void;
  /** 每帧动画回调（在 controls.update 和 render 之前调用） */
  onAnimate?: (context: AnimateContext) => void;
}

export interface ThreeSceneReturn {
  sceneRef: ShallowRef<THREE.Scene | null>;
  cameraRef: ShallowRef<THREE.PerspectiveCamera | null>;
  rendererRef: ShallowRef<THREE.WebGLRenderer | null>;
  controlsRef: ShallowRef<OrbitControls | null>;
  /** 手动清理资源（传入 Ref 时会自动清理，通常不需要手动调用） */
  cleanup: () => void;
  /** 手动触发渲染一帧 */
  render: () => void;
}

/**
 * Three.js 场景初始化 composable
 *
 * @param containerRef - 容器元素的 Ref，支持响应式监听
 * @param options - 配置选项
 *
 * @example
 * ```ts
 * const containerRef = ref<HTMLElement>();
 * let cube: THREE.Mesh;
 *
 * useThreeScene(containerRef, {
 *   cameraPosition: [100, 100, 100],
 *   onReady: ({ scene }) => {
 *     cube = new THREE.Mesh(geometry, material);
 *     scene.add(cube);
 *   },
 *   onAnimate: ({ delta, elapsed }) => {
 *     // delta: 帧间隔（秒），elapsed: 总时间（秒）
 *     cube.rotation.y += delta;
 *   }
 * });
 * ```
 */
export const useThreeScene = (
  containerRef: Ref<HTMLElement | undefined | null>,
  options: ThreeSceneOptions = {}
): ThreeSceneReturn => {
  const {
    cameraPosition = [0, 20, 50],
    cameraLookAt = [0, 0, 0],
    showAxesHelper = true,
    showGridHelper = true,
    backgroundColor = 0x000000,
    fov = 45,
    onReady,
    onAnimate
  } = options;

  // 使用 shallowRef 避免深度响应式代理 Three.js 对象
  const sceneRef = shallowRef<THREE.Scene | null>(null);
  const cameraRef = shallowRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = shallowRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = shallowRef<OrbitControls | null>(null);

  let animationId: number | null = null;
  let stopResizeObserver: (() => void) | null = null;

  const cleanup = () => {
    if (animationId !== null) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
    stopResizeObserver?.();
    rendererRef.value?.dispose();
    controlsRef.value?.dispose();
    if (
      rendererRef.value?.domElement &&
      containerRef.value?.contains(rendererRef.value.domElement)
    ) {
      containerRef.value.removeChild(rendererRef.value.domElement);
    }
    sceneRef.value = null;
    cameraRef.value = null;
    rendererRef.value = null;
    controlsRef.value = null;
  };

  const render = () => {
    if (rendererRef.value && sceneRef.value && cameraRef.value) {
      rendererRef.value.render(sceneRef.value, cameraRef.value);
    }
  };

  const init = (container: HTMLElement) => {
    // 先清理之前的实例
    cleanup();

    const width = container.offsetWidth;
    const height = container.offsetHeight;

    // 防止无效尺寸导致问题
    if (width === 0 || height === 0) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(backgroundColor);

    const camera = new THREE.PerspectiveCamera(fov, width / height, 1, 10000);
    camera.position.set(...cameraPosition);
    camera.lookAt(...cameraLookAt);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    // 限制像素比，优化高分屏性能
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
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

    // 赋值给 ref
    sceneRef.value = scene;
    cameraRef.value = camera;
    rendererRef.value = renderer;
    controlsRef.value = controls;

    // 调用 onReady 回调
    onReady?.({ scene, camera, renderer, controls });

    // 创建时钟用于计算 delta 和 elapsed
    const clock = new THREE.Clock();

    // 响应容器尺寸变化
    const { stop } = useResizeObserver(container, entries => {
      const entry = entries[0];
      const { width, height } = entry.contentRect;
      if (width === 0 || height === 0) return;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });
    stopResizeObserver = stop;

    // 渲染循环
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // 计算时间
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // 调用用户的动画回调
      onAnimate?.({ scene, camera, renderer, controls, delta, elapsed });

      controls.update();
      renderer.render(scene, camera);
    };
    animate();
  };

  // 监听容器 ref 变化
  watch(
    containerRef,
    container => {
      if (container) {
        init(container);
      } else {
        cleanup();
      }
    },
    { immediate: true }
  );

  // 组件卸载时自动清理
  onUnmounted(cleanup);

  return { sceneRef, cameraRef, rendererRef, controlsRef, cleanup, render };
};
