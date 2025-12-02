<script setup lang="ts">
import * as THREE from 'three';

const props = defineProps<{
  title: string;
  create: () => THREE.Mesh;
}>();

const sceneCardRef = ref();
const containerRef = computed(() => sceneCardRef.value?.container);

useThreeScene(containerRef, {
  onReady: ({ scene }) => {
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 20, 50);
    scene.add(directionalLight);

    const mesh = props.create();
    scene.add(mesh);
  }
});
</script>

<template>
  <SceneCard ref="sceneCardRef" :title="title" height="400px" />
</template>
