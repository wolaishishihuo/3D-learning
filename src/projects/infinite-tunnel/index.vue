<script setup lang="ts">
import * as THREE from 'three';

const containerRef = ref<HTMLDivElement>();
let mesh: THREE.Mesh | null = null;
let H = 0;
useThreeScene(containerRef, {
  cameraPosition: [0.9, -520, 6.5],
  showAxesHelper: false,
  showGridHelper: false,
  fov: 60,
  controlsEnabled: false,
  onReady: ({ scene }) => {
    const pointLight = new THREE.PointLight(0xffffff, 200);
    pointLight.position.set(80, 80, 80);
    scene.add(pointLight);

    // 创建纹理
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('/src/assets/storm.png');
    texture.wrapT = THREE.RepeatWrapping;
    texture.colorSpace = THREE.SRGBColorSpace;
    // 设置纹理重复
    // 1：水平方向重复
    // 2：垂直方向重复
    texture.repeat.set(1, 2);

    // 创建圆柱几何体
    // 参数说明：半径1，半径2，高度，圆周分段数，圆柱分段数，是否为圆柱
    // 半径1：圆柱的底部半径
    // 半径2：圆柱的顶部半径
    // 高度：圆柱的高度
    // 圆周分段数：圆柱的圆周分段数
    // 圆柱分段数：圆柱的分段数
    // 是否为圆柱：是否为圆柱
    const geometry = new THREE.CylinderGeometry(30, 50, 1000, 32, 32, true);
    // map: 纹理
    // aoMap: 环境光遮蔽贴图，增加真实感
    // transparent: 透明
    // alphaMap: 透明贴图
    // DoubleSide: 双面渲染，使管道两侧都可见
    const material = new THREE.MeshBasicMaterial({
      // map: texture,
      // aoMap: texture, // 环境光遮蔽贴图，增加真实感
      transparent: true,
      alphaMap: texture,
      side: THREE.BackSide
    });
    mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);
  },
  onAnimate: ({ delta }) => {
    if (mesh) {
      // (mesh.material as THREE.MeshBasicMaterial).map!.offset.y += delta * 0.1;

      H += delta * 0.1;
      if (H > 1) {
        H = 0;
      }

      // setHSL: 设置颜色为HSL颜色
      // H: 色调
      // S: 饱和度
      // L: 亮度
      (mesh.material as THREE.MeshBasicMaterial).color.setHSL(H, 1, 0.5);
      (mesh.material as THREE.MeshBasicMaterial).alphaMap!.offset.y = H;
      mesh.rotation.y += delta * 0.5;
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
