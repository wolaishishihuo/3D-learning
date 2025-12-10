<script setup lang="ts">
import * as THREE from 'three';

const containerRef = ref<HTMLDivElement>();

// 创建地基
const createFoundation = () => {
  const foundation = new THREE.Mesh(
    new THREE.BoxGeometry(4000, 300, 3000),
    new THREE.MeshBasicMaterial({ color: new THREE.Color('grey') })
  );
  foundation.translateY(10);
  return foundation;
};

// 创建墙壁 / 窗户
const createWall = () => {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.lineTo(0, 2000);
  shape.lineTo(-1500, 3000);
  shape.lineTo(-3000, 2000);
  shape.lineTo(-3000, 0);

  // 创建窗户（必须在创建 ExtrudeGeometry 之前添加到 holes）
  const windowPath = new THREE.Path();
  windowPath.moveTo(-600, 400);
  windowPath.lineTo(-600, 1600);
  windowPath.lineTo(-2400, 1600);
  windowPath.lineTo(-2400, 400);
  windowPath.closePath(); // 确保路径闭合

  shape.holes.push(windowPath);

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 100
  });
  const material = new THREE.MeshLambertMaterial({ color: new THREE.Color('lightgrey') });
  const wall = new THREE.Mesh(geometry, material);

  const sideWall = wall.clone();
  sideWall.rotateY(-Math.PI / 2);
  sideWall.translateZ(-2000);
  sideWall.translateX(1500);
  sideWall.translateY(150);

  wall.rotateY(Math.PI / 2);
  wall.translateZ(-2000);
  wall.translateX(1500);
  wall.translateY(150);

  return [wall, sideWall];
};

// 创建前后墙 / 门 / 窗
const createFrontAndBackWall = () => {
  // 后墙
  const behindWall = new THREE.Mesh(
    new THREE.BoxGeometry(4000, 2000, 100),
    new THREE.MeshLambertMaterial({ color: new THREE.Color('lightgrey') })
  );

  behindWall.translateY(1150);
  behindWall.translateZ(-1450);

  // 前墙
  const frontShape = new THREE.Shape();
  frontShape.moveTo(0, 0);
  frontShape.lineTo(4000, 0);
  frontShape.lineTo(4000, 2000);
  frontShape.lineTo(0, 2000);

  const door = new THREE.Path();
  door.moveTo(1000, 0);
  door.lineTo(2000, 0);
  door.lineTo(2000, 1500);
  door.lineTo(1000, 1500);
  frontShape.holes.push(door);

  const win = new THREE.Path();
  win.moveTo(2500, 500);
  win.lineTo(3500, 500);
  win.lineTo(3500, 1500);
  win.lineTo(2500, 1500);
  frontShape.holes.push(win);

  const geometry = new THREE.ExtrudeGeometry(frontShape, {
    depth: 100
  });
  const material = new THREE.MeshLambertMaterial({
    color: new THREE.Color('lightgrey')
  });

  const frontWall = new THREE.Mesh(geometry, material);
  frontWall.translateX(-2000);
  frontWall.translateZ(1400);
  frontWall.translateY(150);

  return [behindWall, frontWall];
};

// 创建屋顶
const createRoof = () => {
  const roof = new THREE.Mesh(
    new THREE.BoxGeometry(4010, 2000, 100),
    new THREE.MeshLambertMaterial({ color: new THREE.Color('red') })
  );

  roof.position.y = 2600;
  roof.position.z = -800;
  roof.rotation.x = (55 / 180) * Math.PI;

  const roof2 = roof.clone();
  roof2.rotateX((70 / 180) * Math.PI);
  roof2.position.z = -roof.position.z;

  return [roof, roof2];
};

// 创建阶梯
const createStairs = () => {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.lineTo(200, 0);
  shape.lineTo(200, -100);
  shape.lineTo(400, -100);
  shape.lineTo(400, -200);
  shape.lineTo(600, -200);
  shape.lineTo(600, -300);
  shape.lineTo(0, -300);

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 1000
  });
  const material = new THREE.MeshLambertMaterial({
    color: new THREE.Color('grey')
  });

  const doorstep = new THREE.Mesh(geometry, material);
  doorstep.rotateY(-Math.PI / 2);
  doorstep.position.z = 1500;
  doorstep.position.y = 150;

  return doorstep;
};
useThreeScene(containerRef, {
  cameraPosition: [139, 2359, 8000],
  fov: 60,
  showAxesHelper: true,
  axesHelperSize: 5000,

  onReady: ({ scene }) => {
    const directionLight = new THREE.DirectionalLight(0xffffff);
    directionLight.position.set(3000, 3000, 3000);
    scene.add(directionLight);

    const ambientLight = new THREE.AmbientLight();
    scene.add(ambientLight);

    const group = new THREE.Group();
    group.add(createFoundation());
    group.add(...createWall());
    group.add(...createFrontAndBackWall());
    group.add(...createRoof());
    group.add(createStairs());
    scene.add(group);
  }
});
</script>

<template>
  <div class="project-container relative">
    <div class="absolute left-0 top-0 z-10 p-4">
      <h1 class="text-2xl font-bold text-white">盖房子</h1>
      <p class="text-sm text-gray-500">使用 Three.js 几何体组合构建房屋模型</p>
    </div>
    <div ref="containerRef" class="canvas-container"></div>
  </div>
</template>
