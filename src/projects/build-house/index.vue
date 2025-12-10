<script setup lang="ts">
import * as THREE from 'three';

const containerRef = ref<HTMLDivElement>();

// 相机旋转动画状态
let cameraAngle = 0; // 当前旋转角度（弧度）
let cameraRadius = 8000; // 相机距离中心的半径
let cameraHeight = 2359; // 相机高度
const cameraCenter = new THREE.Vector3(0, 0, 0); // 旋转中心点（房屋中心）
const rotationSpeed = 0.3; // 旋转速度（弧度/秒）

// 随机生成新的相机参数
const randomizeCameraParams = () => {
  // 半径范围：6000 - 10000
  cameraRadius = 6000 + Math.random() * 4000;
  // 高度范围：1500 - 3500
  cameraHeight = 1500 + Math.random() * 2000;
};

// 创建地基
const createFoundation = () => {
  const foundationLoader = new THREE.TextureLoader();
  const foundationTexture = foundationLoader.load('/src/assets/foundation.png');
  foundationTexture.colorSpace = THREE.SRGBColorSpace;

  const foundation = new THREE.Mesh(
    new THREE.BoxGeometry(4000, 300, 3000),
    new THREE.MeshBasicMaterial({ map: foundationTexture, aoMap: foundationTexture })
  );
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

  const wallTextureLoader = new THREE.TextureLoader();
  const wallTexture = wallTextureLoader.load('/src/assets/brickWall.png');
  wallTexture.colorSpace = THREE.SRGBColorSpace;
  wallTexture.wrapS = THREE.RepeatWrapping;
  wallTexture.wrapT = THREE.RepeatWrapping;
  wallTexture.repeat.set(0.0005, 0.0005);

  const material = new THREE.MeshLambertMaterial({ map: wallTexture, aoMap: wallTexture });
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
  const behindWallTextureLoader = new THREE.TextureLoader();
  const behindWallTexture = behindWallTextureLoader.load('/src/assets/brickWall.png');
  behindWallTexture.colorSpace = THREE.SRGBColorSpace;
  behindWallTexture.wrapS = THREE.RepeatWrapping;
  behindWallTexture.repeat.x = 2;

  const behindWall = new THREE.Mesh(
    new THREE.BoxGeometry(4000, 2000, 100),
    new THREE.MeshLambertMaterial({ map: behindWallTexture, aoMap: behindWallTexture })
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

  const frontWallTextureLoader = new THREE.TextureLoader();
  const frontWallTexture = frontWallTextureLoader.load('/src/assets/brickWall.png');
  frontWallTexture.colorSpace = THREE.SRGBColorSpace;
  frontWallTexture.wrapS = THREE.RepeatWrapping;
  frontWallTexture.wrapT = THREE.RepeatWrapping;
  frontWallTexture.repeat.set(0.0005, 0.0005);

  const material = new THREE.MeshLambertMaterial({
    map: frontWallTexture,
    aoMap: frontWallTexture
  });

  const frontWall = new THREE.Mesh(geometry, material);
  frontWall.translateX(-2000);
  frontWall.translateZ(1400);
  frontWall.translateY(150);

  return [behindWall, frontWall];
};

// 创建屋顶
const createRoof = () => {
  const roofTextureLoader = new THREE.TextureLoader();
  const roofTexture = roofTextureLoader.load('/src/assets/roof.png');
  roofTexture.colorSpace = THREE.SRGBColorSpace;
  roofTexture.wrapS = THREE.RepeatWrapping;
  roofTexture.repeat.x = 4;

  const roof = new THREE.Mesh(
    new THREE.BoxGeometry(4010, 2000, 100),
    new THREE.MeshLambertMaterial({ map: roofTexture, aoMap: roofTexture })
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
  const doorstepTextureLoader = new THREE.TextureLoader();
  const doorstepTexture = doorstepTextureLoader.load('/src/assets/foundation.png');
  doorstepTexture.colorSpace = THREE.SRGBColorSpace;
  doorstepTexture.wrapS = THREE.RepeatWrapping;
  doorstepTexture.wrapT = THREE.RepeatWrapping;
  doorstepTexture.repeat.set(0.001, 0.001);
  const material = new THREE.MeshLambertMaterial({
    map: doorstepTexture,
    aoMap: doorstepTexture
  });

  const doorstep = new THREE.Mesh(geometry, material);
  doorstep.rotateY(-Math.PI / 2);
  doorstep.position.z = 1500;
  doorstep.position.y = 150;

  return doorstep;
};

// 创建 草地
const createGrass = () => {
  const geometry = new THREE.PlaneGeometry(100000, 100000);
  const grassTextureLoader = new THREE.TextureLoader();
  const grassTexture = grassTextureLoader.load('/src/assets/grass.png');
  grassTexture.colorSpace = THREE.SRGBColorSpace;
  grassTexture.wrapS = THREE.RepeatWrapping;
  grassTexture.wrapT = THREE.RepeatWrapping;
  grassTexture.repeat.x = 20;
  grassTexture.repeat.y = 20;
  const material = new THREE.MeshLambertMaterial({
    map: grassTexture,
    aoMap: grassTexture
  });

  const grass = new THREE.Mesh(geometry, material);
  grass.rotateX(-Math.PI / 2);
  grass.position.y = -150;

  return grass;
};

useThreeScene(containerRef, {
  cameraPosition: [139, 2359, 8000],
  fov: 60,
  showAxesHelper: false,
  axesHelperSize: 5000,
  controlsEnabled: false,

  onReady: ({ scene, renderer }) => {
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
    group.add(createGrass());
    scene.add(group);

    // 添加雾效
    scene.fog = new THREE.Fog(0xcccccc, 1000, 40000);
    // 设置背景颜色
    renderer.setClearColor(new THREE.Color('skyblue'));
  },

  onAnimate: ({ camera, delta }) => {
    // 更新旋转角度
    cameraAngle += rotationSpeed * delta;

    // 检查是否完成一圈（2π 弧度）
    if (cameraAngle >= Math.PI * 2) {
      cameraAngle = cameraAngle % (Math.PI * 2); // 重置角度
      randomizeCameraParams(); // 随机生成新的半径和高度
    }

    // 更新相机位置
    updateCameraPosition(camera);
  }
});

// 根据角度、半径和高度更新相机位置
const updateCameraPosition = (camera: THREE.PerspectiveCamera) => {
  // 使用球坐标系计算相机位置
  const x = cameraCenter.x + cameraRadius * Math.cos(cameraAngle);
  const z = cameraCenter.z + cameraRadius * Math.sin(cameraAngle);
  const y = cameraHeight;

  camera.position.set(x, y, z);
  camera.lookAt(cameraCenter);
};
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
