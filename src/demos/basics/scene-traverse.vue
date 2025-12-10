<script setup lang="ts">
import type { CodeSnippet } from '@/components/CodeBlock/index.vue';
import * as THREE from 'three';

const sceneCardRef = ref();

const codeSnippets: CodeSnippet[] = [
  {
    title: '场景遍历',
    code: `// 遍历场景中的所有对象（深度优先、先序遍历）
scene.traverse((object) => {
  console.log(object.name, object.type);

  if (object instanceof THREE.Mesh) {
    // 处理网格对象
    object.material.color.set(0xff0000);
  }
});`,
    language: 'typescript'
  },
  {
    title: 'getObjectByName 遍历顺序',
    code: `// getObjectByName 使用深度优先、先序遍历
// 返回第一个匹配名字的对象

// 示例：两个同名对象
const cube1 = new THREE.Mesh(geometry, material);
cube1.name = 'cube';
scene.add(cube1); // 先添加到场景

const cube2 = new THREE.Mesh(geometry, material);
cube2.name = 'cube';
scene.add(cube2); // 后添加到场景

// 返回第一个被遍历到的对象（先添加的 cube1）
const found = scene.getObjectByName('cube');
console.log(found === cube1); // true

// 遍历顺序取决于：
// 1. 父子结构（先遍历父节点，再遍历子节点）
// 2. 添加顺序（同一层级中，先添加的先遍历）`,
    language: 'typescript'
  },
  {
    title: '世界坐标',
    code: `// 获取对象的世界坐标
const worldPosition = new THREE.Vector3();
mesh.getWorldPosition(worldPosition);
console.log('世界坐标:', worldPosition);

// 本地坐标 vs 世界坐标
console.log('本地坐标:', mesh.position);`,
    language: 'typescript'
  }
];

// 获取 SceneCard 内部容器的 ref
const containerRef = computed(() => sceneCardRef.value?.container);

useThreeScene(containerRef, {
  cameraPosition: [500, 500, 500],
  axesHelperSize: 1000,
  onReady: ({ scene }) => {
    const light = new THREE.DirectionalLight(0xffffff);
    light.position.set(3000, 2000, 1000);
    scene.add(light);

    const geometry = new THREE.BoxGeometry(100, 100, 100);
    const material1 = new THREE.MeshLambertMaterial({ color: new THREE.Color('orange') });
    const material2 = new THREE.MeshLambertMaterial({ color: new THREE.Color('lightblue') });
    const material3 = new THREE.MeshLambertMaterial({ color: new THREE.Color('lightgreen') });

    // 演示 getObjectByName 的遍历顺序
    // 创建两个同名的 cube
    const cube1 = new THREE.Mesh(geometry, material1);
    cube1.name = 'cube';
    cube1.position.set(-150, 0, 0);
    scene.add(cube1); // 先添加到场景

    const cube2 = new THREE.Mesh(geometry, material2);
    cube2.name = 'cube';
    cube2.position.set(150, 0, 0);
    scene.add(cube2); // 后添加到场景

    // 演示父子结构对遍历顺序的影响
    const group = new THREE.Group();
    group.position.set(0, 200, 0);
    scene.add(group);

    const mesh = new THREE.Mesh(geometry, material3);
    mesh.name = 'mesh';
    mesh.position.set(0, 0, 0);
    group.add(mesh);

    // 计算世界坐标
    const worldPosition = new THREE.Vector3();
    mesh.getWorldPosition(worldPosition);
    console.log('世界坐标:', worldPosition);

    const axesHelper = new THREE.AxesHelper(200);
    group.add(axesHelper);

    // 遍历场景，观察遍历顺序
    console.log('=== 遍历顺序 ===');
    scene.traverse((object: THREE.Object3D) => {
      if (object.name) {
        console.log(`遍历到: ${object.name} (${object.type})`);
      }
    });

    // getObjectByName 返回第一个匹配的对象（先添加的 cube1）
    const found = scene.getObjectByName('cube') as THREE.Mesh;
    console.log('getObjectByName("cube") 找到:', found === cube1 ? 'cube1 (橙色)' : 'cube2 (蓝色)');

    // 修改找到的对象颜色以验证
    if (found) {
      (found.material as THREE.MeshLambertMaterial).color.set(new THREE.Color('red'));
    }
  }
});
</script>

<template>
  <div class="demo-scene flex flex-col gap-6">
    <SceneCard ref="sceneCardRef" title="场景遍历和世界坐标" height="600px" />

    <Summary title="知识点总结">
      <SummaryItem title="scene.traverse()">
        使用 <Code>scene.traverse(callback)</Code> 遍历场景中的所有对象，包括子对象
      </SummaryItem>
      <SummaryItem title="本地坐标">
        <Code>object.position</Code> 表示相对于父对象的本地坐标
      </SummaryItem>
      <SummaryItem title="世界坐标">
        使用 <Code>getWorldPosition()</Code> 获取对象在世界坐标系中的绝对位置
      </SummaryItem>
      <SummaryItem title="对象查找 - getObjectByName">
        <Code>scene.getObjectByName(name)</Code>
        使用<strong>深度优先、先序遍历</strong>递归查找，返回第一个匹配名字的对象。如果多个对象同名，遍历顺序取决于场景图中的<strong>父子结构</strong>和<strong>添加顺序</strong>（谁先被
        <Code>scene.add()</Code>，就先被遍历到）
      </SummaryItem>
      <SummaryItem title="遍历顺序规则">
        <Code>traverse()</Code> 和
        <Code>getObjectByName()</Code>
        都遵循相同的遍历顺序：先遍历父节点，再遍历子节点；同一层级中，按照添加到父节点的顺序遍历
      </SummaryItem>

      <template #tip>
        <strong>提示：</strong>世界坐标 =
        所有父级变换的累积结果，修改父对象位置会影响子对象的世界坐标
      </template>
    </Summary>

    <CodeBlock title="关键代码" :snippets="codeSnippets" />
  </div>
</template>

<style lang="scss">
@use '@/demos/index.scss';
</style>
