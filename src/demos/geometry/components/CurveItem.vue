<script setup lang="ts">
import * as THREE from 'three';

type CurveType = THREE.Curve<THREE.Vector2> | THREE.Curve<THREE.Vector3>;

const props = defineProps<{
  title: string;
  createCurve: () => CurveType;
}>();

const sceneCardRef = ref();
const containerRef = computed(() => sceneCardRef.value?.container);

useThreeScene(containerRef, {
  onReady: ({ scene }) => {
    const curve = props.createCurve();
    const points = curve.getPoints(50);

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color: 0xff0000,
      linewidth: 2
    });

    const curveObject = new THREE.Line(geometry, material);
    scene.add(curveObject);
  }
});
</script>

<template>
  <SceneCard ref="sceneCardRef" :title="title" height="400px" />
</template>
