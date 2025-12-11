<script setup lang="ts">
import * as THREE from 'three';

const props = withDefaults(
  defineProps<{
    title: string;
    height?: string;
    cameraPosition?: [number, number, number];
    cameraLookAt?: [number, number, number];
    showAxesHelper?: boolean;
    showGridHelper?: boolean;
    fov?: number;
    create: (scene: THREE.Scene) => void;
  }>(),
  {
    height: '400px',
    cameraPosition: () => [100, 100, 100],
    cameraLookAt: () => [0, 0, 0],
    showAxesHelper: true,
    showGridHelper: true,
    fov: 45
  }
);

const sceneCardRef = ref();
const containerRef = computed(() => sceneCardRef.value?.container);

useThreeScene(containerRef, {
  cameraPosition: props.cameraPosition,
  cameraLookAt: props.cameraLookAt,
  showAxesHelper: props.showAxesHelper,
  showGridHelper: props.showGridHelper,
  fov: props.fov,
  onReady: ({ scene }) => {
    props.create(scene);
  }
});
</script>

<template>
  <SceneCard ref="sceneCardRef" :title="title" :height="height" />
</template>
