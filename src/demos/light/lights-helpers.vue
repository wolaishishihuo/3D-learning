<script setup lang="ts">
import * as THREE from 'three';
import ScreenItem from '@/demos/components/ScreenItem.vue';
import type { CodeSnippet } from '@/components/CodeBlock/index.vue';

// 创建场景物体的辅助函数
const createSceneObjects = (scene: THREE.Scene) => {
  // 创建地面
  const planeGeometry = new THREE.PlaneGeometry(1000, 1000);
  const planeMaterial = new THREE.MeshLambertMaterial({
    color: new THREE.Color('skyblue')
  });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotateX(-Math.PI / 2);
  plane.position.y = -50;
  scene.add(plane);

  // 创建立方体组
  const group = new THREE.Group();
  const boxGeometry = new THREE.BoxGeometry(100, 100, 100);
  const boxMaterial = new THREE.MeshLambertMaterial({
    color: new THREE.Color('orange')
  });

  const box1 = new THREE.Mesh(boxGeometry, boxMaterial);
  const box2 = box1.clone();
  box2.position.x = 200;
  const box3 = box1.clone();
  box3.position.x = -200;

  group.add(box1);
  group.add(box2);
  group.add(box3);
  scene.add(group);
};

// 定义4种光源的配置
const demos = [
  {
    title: 'DirectionalLight 平行光',
    cameraPosition: [200, 400, 400] as [number, number, number],
    create: (scene: THREE.Scene) => {
      // 创建场景物体
      createSceneObjects(scene);

      // 创建平行光
      const light = new THREE.DirectionalLight(0xffffff, 1);
      light.position.set(400, 500, 300);
      scene.add(light);

      // 创建平行光辅助器
      const helper = new THREE.DirectionalLightHelper(light, 100);
      scene.add(helper);
    }
  },
  {
    title: 'PointLight 点光源',
    cameraPosition: [200, 400, 400] as [number, number, number],
    create: (scene: THREE.Scene) => {
      // 创建场景物体
      createSceneObjects(scene);

      // 创建点光源
      const light = new THREE.PointLight(0xff0000, 1, 500);
      light.position.set(0, 200, 0);
      scene.add(light);

      // 创建点光源辅助器
      const helper = new THREE.PointLightHelper(light, 50);
      scene.add(helper);
    }
  },
  {
    title: 'AmbientLight 环境光',
    cameraPosition: [200, 400, 400] as [number, number, number],
    create: (scene: THREE.Scene) => {
      // 创建场景物体
      createSceneObjects(scene);

      // 创建环境光（配合一个微弱的平行光以便观察）
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
      scene.add(ambientLight);

      // 添加一个微弱的平行光以便观察物体形状
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
      directionalLight.position.set(200, 300, 200);
      scene.add(directionalLight);
    }
  },
  {
    title: 'SpotLight 聚光灯',
    cameraPosition: [200, 400, 400] as [number, number, number],
    create: (scene: THREE.Scene) => {
      // 创建场景物体
      createSceneObjects(scene);

      // 创建聚光灯
      const light = new THREE.SpotLight(0x00ff00, 1);
      light.position.set(0, 400, 0);
      light.angle = Math.PI / 6;
      light.penumbra = 0.1;
      light.target.position.set(0, 0, 0);
      scene.add(light);
      scene.add(light.target);

      // 创建聚光灯辅助器
      const helper = new THREE.SpotLightHelper(light);
      scene.add(helper);
    }
  }
];

const codeSnippets: CodeSnippet[] = [
  {
    title: 'DirectionalLight - 平行光',
    code: `// 创建平行光（模拟太阳光）
const light = new THREE.DirectionalLight(color, intensity);

// 设置光源位置
light.position.set(x, y, z);

// 创建平行光辅助器（可视化光源方向）
const helper = new THREE.DirectionalLightHelper(light, size);
scene.add(helper);

// 示例
const directional = new THREE.DirectionalLight(0xffffff, 1);
directional.position.set(400, 500, 300);
const helper = new THREE.DirectionalLightHelper(directional, 100);`,
    language: 'typescript'
  },
  {
    title: 'PointLight - 点光源',
    code: `// 创建点光源（从一个点向四周发光）
const light = new THREE.PointLight(color, intensity, distance, decay);

// 设置光源位置
light.position.set(x, y, z);

// 创建点光源辅助器（可视化光源位置）
const helper = new THREE.PointLightHelper(light, sphereSize);
scene.add(helper);

// 示例
const point = new THREE.PointLight(0xff0000, 1, 500);
point.position.set(0, 200, 0);
const helper = new THREE.PointLightHelper(point, 50);`,
    language: 'typescript'
  },
  {
    title: 'AmbientLight - 环境光',
    code: `// 创建环境光（均匀照亮所有物体，无方向）
const light = new THREE.AmbientLight(color, intensity);

// 环境光没有位置，直接添加到场景
scene.add(light);

// 注意：环境光通常配合其他光源使用
// 单独使用环境光会导致物体缺乏立体感

// 示例
const ambient = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambient);`,
    language: 'typescript'
  },
  {
    title: 'SpotLight - 聚光灯',
    code: `// 创建聚光灯（锥形光束）
const light = new THREE.SpotLight(
  color,      // 颜色
  intensity,  // 强度
  distance,   // 照射距离
  angle,      // 锥形角度（弧度）
  penumbra,   // 边缘衰减（0-1）
  decay       // 距离衰减
);

// 设置光源位置和目标点
light.position.set(x, y, z);
light.target.position.set(targetX, targetY, targetZ);
scene.add(light);
scene.add(light.target);

// 创建聚光灯辅助器
const helper = new THREE.SpotLightHelper(light);
scene.add(helper);

// 示例
const spot = new THREE.SpotLight(0x00ff00, 1);
spot.position.set(0, 400, 0);
spot.angle = Math.PI / 6;  // 30度
spot.target.position.set(0, 0, 0);`,
    language: 'typescript'
  },
  {
    title: 'LightHelper - 光源辅助器',
    code: `// 平行光辅助器
const dirHelper = new THREE.DirectionalLightHelper(light, size);

// 点光源辅助器
const pointHelper = new THREE.PointLightHelper(light, sphereSize);

// 聚光灯辅助器
const spotHelper = new THREE.SpotLightHelper(light);

// 注意：环境光没有辅助器（因为没有位置和方向）

// 辅助器需要随光源更新（如果光源位置改变）
helper.update();`,
    language: 'typescript'
  }
];
</script>

<template>
  <div class="flex flex-col gap-6">
    <!-- 场景展示 -->
    <div class="grid grid-cols-2 gap-6 max-md:grid-cols-1 max-md:gap-4">
      <ScreenItem
        v-for="(item, index) in demos"
        :key="index"
        :title="item.title"
        :camera-position="item.cameraPosition"
        :create="item.create"
        height="500px"
      />
    </div>

    <!-- 知识总结 -->
    <Summary title="知识点总结">
      <SummaryItem title="DirectionalLight - 平行光">
        模拟太阳光，光线平行照射。可以产生阴影，适合模拟室外光照。使用
        <Code>DirectionalLightHelper</Code> 可视化光源方向。
      </SummaryItem>
      <SummaryItem title="PointLight - 点光源">
        从一个点向四周发射光线，类似灯泡。可以设置照射距离和衰减。使用
        <Code>PointLightHelper</Code> 可视化光源位置（显示为球体）。
      </SummaryItem>
      <SummaryItem title="AmbientLight - 环境光">
        均匀照亮场景中的所有物体，没有方向，不产生阴影。通常配合其他光源使用，避免场景过暗。注意：环境光没有辅助器。
      </SummaryItem>
      <SummaryItem title="SpotLight - 聚光灯">
        产生锥形光束，可设置角度、边缘衰减和照射距离。适合模拟手电筒、舞台灯光等效果。使用
        <Code>SpotLightHelper</Code> 可视化光束范围。
      </SummaryItem>
      <SummaryItem title="LightHelper - 光源辅助器">
        使用
        <Code>LightHelper</Code>
        可以可视化灯光的位置和方向，便于调试和观察光照效果。如果光源位置改变，需要调用
        <Code>helper.update()</Code> 更新辅助器。
      </SummaryItem>
      <SummaryItem title="材质要求">
        光源效果需要配合能够响应光照的材质，如 <Code>MeshLambertMaterial</Code> 或
        <Code>MeshPhongMaterial</Code>。使用 <Code>MeshBasicMaterial</Code> 不会显示光照效果。
      </SummaryItem>

      <template #tip>
        <strong>提示：</strong
        >环境光配合其他光源使用效果更好，可以避免场景过暗。如果光源位置改变，记得调用
        <Code>helper.update()</Code>
        更新辅助器显示。
      </template>
    </Summary>

    <!-- 代码示例 -->
    <CodeBlock title="光源创建代码示例" :snippets="codeSnippets" />
  </div>
</template>

<style lang="scss">
@use '@/demos/index.scss';
</style>
