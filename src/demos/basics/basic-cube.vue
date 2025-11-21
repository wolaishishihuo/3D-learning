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
        <AButton type="primary" block @click="resetScene">Reset</AButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as THREE from 'three'

const containerRef = ref<HTMLDivElement>()
const rotationSpeed = ref(0.01)
const cubeColor = ref('#667eea')

let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let cube: THREE.Mesh
let animationId: number

const initScene = () => {
  if (!containerRef.value) return

  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x111111)

  const width = containerRef.value.clientWidth
  const height = containerRef.value.clientHeight
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
  camera.position.z = 5

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(width, height)
  renderer.setPixelRatio(window.devicePixelRatio)
  containerRef.value.appendChild(renderer.domElement)

  const geometry = new THREE.BoxGeometry(2, 2, 2)
  const material = new THREE.MeshPhongMaterial({
    color: cubeColor.value,
    shininess: 100
  })
  cube = new THREE.Mesh(geometry, material)
  scene.add(cube)

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
  directionalLight.position.set(5, 5, 5)
  scene.add(directionalLight)

  const gridHelper = new THREE.GridHelper(10, 10, 0x333333, 0x222222)
  scene.add(gridHelper)

  const axesHelper = new THREE.AxesHelper(5)
  scene.add(axesHelper)

  window.addEventListener('resize', handleResize)
  animate()
}

const animate = () => {
  animationId = requestAnimationFrame(animate)
  cube.rotation.x += rotationSpeed.value
  cube.rotation.y += rotationSpeed.value
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

const resetScene = () => {
  rotationSpeed.value = 0.01
  cubeColor.value = '#667eea'
  if (cube) {
    ;(cube.material as THREE.MeshPhongMaterial).color.set(cubeColor.value)
  }
}

watch(cubeColor, newColor => {
  if (cube) {
    ;(cube.material as THREE.MeshPhongMaterial).color.set(newColor)
  }
})

onMounted(() => {
  initScene()
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  cancelAnimationFrame(animationId)
  renderer?.dispose()
  cube?.geometry.dispose()
  ;(cube?.material as THREE.Material)?.dispose()
})
</script>

<style scoped lang="scss">
.demo-scene {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 1.5rem;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
}

.canvas-container {
  width: 100%;
  height: 600px;
  background: #111;
  border-radius: 8px;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 400px;
  }
}

.control-panel {
  height: fit-content;
  padding: 20px;
  background: rgba(17, 17, 17, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  backdrop-filter: blur(8px);

  @media (max-width: 1024px) {
    position: relative;
  }
}

.control-header {
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 1rem;

  h3 {
    color: #fff;
    font-size: 18px;
    font-weight: 600;
    margin: 0;
  }

  p {
    color: rgba(255, 255, 255, 0.5);
    font-size: 14px;
    margin: 4px 0 0;
  }
}

.control-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    color: rgba(255, 255, 255, 0.8);
    font-size: 14px;
    font-weight: 500;
  }

  .value {
    color: rgba(255, 255, 255, 0.5);
    font-size: 12px;
  }
}

.color-picker {
  width: 100%;
  height: 40px;
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: transparent;
  cursor: pointer;

  &::-webkit-color-swatch-wrapper {
    padding: 4px;
  }

  &::-webkit-color-swatch {
    border-radius: 0.375rem;
    border: none;
  }
}
</style>
