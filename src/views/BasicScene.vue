<template>
  <div class="basic-scene">
    <h2>基础 Three.js 场景</h2>
    <p class="description">一个旋转的立方体示例</p>
    <div ref="containerRef" class="canvas-container"></div>
  </div>
</template>

<script setup lang="ts">
import * as THREE from 'three'

const containerRef = ref<HTMLDivElement>()
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let cube: THREE.Mesh
let animationId: number

const initScene = () => {
  if (!containerRef.value) return

  // 创建场景
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0xf0f0f0)

  // 创建相机
  const width = containerRef.value.clientWidth
  const height = containerRef.value.clientHeight
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
  camera.position.z = 5

  // 创建渲染器
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(width, height)
  renderer.setPixelRatio(window.devicePixelRatio)
  containerRef.value.appendChild(renderer.domElement)

  // 创建立方体
  const geometry = new THREE.BoxGeometry(2, 2, 2)
  const material = new THREE.MeshPhongMaterial({
    color: 0x667eea,
    shininess: 100
  })
  cube = new THREE.Mesh(geometry, material)
  scene.add(cube)

  // 添加光源
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
  directionalLight.position.set(5, 5, 5)
  scene.add(directionalLight)

  // 添加网格辅助线
  const gridHelper = new THREE.GridHelper(10, 10)
  scene.add(gridHelper)

  // 添加坐标轴辅助线
  const axesHelper = new THREE.AxesHelper(5)
  scene.add(axesHelper)

  // 监听窗口大小变化
  window.addEventListener('resize', handleResize)

  // 开始动画
  animate()
}

const animate = () => {
  animationId = requestAnimationFrame(animate)

  // 旋转立方体
  cube.rotation.x += 0.01
  cube.rotation.y += 0.01

  renderer.render(scene, camera)
}

const handleResize = () => {
  if (!containerRef.value) return

  const width = containerRef.value.clientWidth
  const height = containerRef.value.clientHeight

  camera.aspect = width / height
  camera.updateProjectionMatrix()

  renderer.setSize(width, height)
}

onMounted(() => {
  initScene()
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  cancelAnimationFrame(animationId)

  if (renderer) {
    renderer.dispose()
  }

  if (cube) {
    cube.geometry.dispose()
    ;(cube.material as THREE.Material).dispose()
  }
})
</script>

<style scoped lang="scss">
.basic-scene {
  max-width: 1200px;
  margin: 0 auto;

  h2 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
}

.description {
  color: #666;
  margin-bottom: 2rem;
}

.canvas-container {
  width: 100%;
  height: 600px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
