<script setup lang="ts">
import * as THREE from 'three';

// 按照文档：管道分段 100，半径 5，圆分段 30
const config = {
  tubeSegments: 100,
  tubeRadius: 5,
  tubeRadialSegments: 30
};
const containerRef = ref<HTMLDivElement>();

let tubePoints: THREE.Vector3[] = [];
let i = 0;

useThreeScene(containerRef, {
  cameraPosition: [200, 200, 200],
  showAxesHelper: false,
  showGridHelper: false,
  controlsEnabled: false,
  fov: 60,
  onReady: ({ scene }) => {
    const pointLight = new THREE.PointLight(0xffffff, 200);
    pointLight.position.set(80, 80, 80);
    scene.add(pointLight);

    const path = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-100, 20, 90),
      new THREE.Vector3(-40, 80, 100),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(60, -60, 0),
      new THREE.Vector3(100, -40, 80),
      new THREE.Vector3(150, 60, 60)
    ]);

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('/src/assets/tunnel.png');
    texture.wrapS = THREE.RepeatWrapping;
    texture.repeat.x = 20;
    texture.colorSpace = THREE.SRGBColorSpace;

    const geometry = new THREE.TubeGeometry(
      path,
      config.tubeSegments,
      config.tubeRadius,
      config.tubeRadialSegments
    );
    // 按照文档：map + aoMap + DoubleSide
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      aoMap: texture, // 环境光遮蔽贴图，增加真实感
      side: THREE.DoubleSide
    });
    const mesh = new THREE.Mesh(geometry, material);
    tubePoints = path.getSpacedPoints(1000);

    scene.add(mesh);
  },
  onAnimate: ({ camera }) => {
    if (i < tubePoints.length - 1) {
      camera.position.copy(tubePoints[i]);
      camera.lookAt(tubePoints[i + 1]);
      i += 1;
    } else {
      i = 0;
    }
  }
});
</script>

<template>
  <div class="project-container relative">
    <div class="absolute left-0 top-0 z-10 p-4">
      <h1 class="text-2xl font-bold text-white">无限空间隧道</h1>
    </div>
    <div ref="containerRef" class="h-full w-full"></div>
  </div>
</template>
