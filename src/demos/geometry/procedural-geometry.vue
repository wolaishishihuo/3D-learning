<script setup lang="ts">
import type { CodeSnippet } from '@/components/CodeBlock/index.vue';
import ProceduralItem from './components/ProceduralItem.vue';
import * as THREE from 'three';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';

const codeSnippets: CodeSnippet[] = [
  {
    title: '按规律生成几何体',
    code: `// 使用循环按规律生成多个几何体
for (let i = 0; i < count; i++) {
  const geometry = new THREE.BoxGeometry(size, size, size);
  const material = new THREE.MeshStandardMaterial({ color });
  const mesh = new THREE.Mesh(geometry, material);

  // 按规律设置位置
  mesh.position.set(x, y, z);
  scene.add(mesh);
}`,
    language: 'typescript'
  },
  {
    title: '圆形排列',
    code: `// 圆形排列几何体
const radius = 50;
const count = 12;
for (let i = 0; i < count; i++) {
  const angle = (i / count) * Math.PI * 2;
  mesh.position.x = Math.cos(angle) * radius;
  mesh.position.z = Math.sin(angle) * radius;
}`,
    language: 'typescript'
  }
];

const demos = [
  {
    title: 'LatheGeometry ',
    create: () => {
      const points = [
        new THREE.Vector2(0, 0),
        new THREE.Vector2(5, 6),
        new THREE.Vector2(3, 8),
        new THREE.Vector2(0, 15)
      ];
      const geometry = new THREE.LatheGeometry(points);
      const material = new THREE.MeshLambertMaterial({
        color: new THREE.Color('pink'),
        side: THREE.DoubleSide
      });
      const mesh = new THREE.Mesh(geometry, material);

      const geometry2 = new THREE.BufferGeometry().setFromPoints(points);
      const material2 = new THREE.PointsMaterial({
        color: new THREE.Color('blue'),
        size: 2
      });
      const line = new THREE.Line(geometry2, material2);
      const pointsObj = new THREE.Points(geometry2, material2);

      return mesh.add(line, pointsObj);
    }
  },
  {
    title: 'TubeGeometry 生成管道',
    create: () => {
      const p1 = new THREE.Vector3(-10, 0, 0);
      const p2 = new THREE.Vector3(5, 10, 0);
      const p3 = new THREE.Vector3(10, 0, 10);
      const p4 = new THREE.Vector3(10, 0, 0);

      // 使用 CatmullRomCurve3 创建平滑曲线
      const curve = new THREE.CatmullRomCurve3([p1, p2, p3, p4]);

      // 创建管道几何体 new THREE.TubeGeometry(curve, tubularSegments, radius, radialSegments)
      // 参数说明：tubularSegments(沿曲线分段数，影响平滑度), radius(半径), radialSegments(圆周分段数，影响圆形效果)
      // 注意：tubularSegments 和 radialSegments 不能太小，否则管道会不平滑或不成圆形

      const tubeOptions = {
        tubularSegments: 30,
        radius: 2,
        radialSegments: 8
      };
      const gui = new GUI({ title: 'TubeGeometry Options' });

      function updateTubeGeometry() {
        mesh.geometry = new THREE.TubeGeometry(
          curve,
          tubeOptions.tubularSegments,
          tubeOptions.radius,
          tubeOptions.radialSegments
        );
      }
      gui.add(tubeOptions, 'tubularSegments').min(1).max(100).step(1).onChange(updateTubeGeometry);
      gui.add(tubeOptions, 'radius').min(0.1).max(10).step(0.1).onChange(updateTubeGeometry);
      gui.add(tubeOptions, 'radialSegments').min(1).max(100).step(1).onChange(updateTubeGeometry);

      const geometry = new THREE.TubeGeometry(
        curve,
        tubeOptions.tubularSegments,
        tubeOptions.radius,
        tubeOptions.radialSegments
      );
      const material = new THREE.MeshLambertMaterial({
        color: new THREE.Color('pink'),
        side: THREE.DoubleSide,
        wireframe: true
      });

      const mesh = new THREE.Mesh(geometry, material);

      const geometry2 = new THREE.BufferGeometry().setFromPoints([p1, p2, p3, p4]);
      const material2 = new THREE.PointsMaterial({
        color: new THREE.Color('blue'),
        size: 2
      });
      const line = new THREE.Line(geometry2, material2);
      const pointsObj = new THREE.Points(geometry2, material2);

      return mesh.add(line, pointsObj);
    }
  },
  {
    title: 'Shape + ShapeGeometry + Path',
    create: () => {
      const pointsArr = [
        new THREE.Vector2(10, 0),
        new THREE.Vector2(0, 0),
        new THREE.Vector2(0, 5),
        new THREE.Vector2(8, 10)
      ];
      const shape = new THREE.Shape(pointsArr);

      // 创建孔洞路径（必须是逆时针方向，且必须在 Shape 内部）
      const hole = new THREE.Path();
      // 中心在 (4, 2.5)，半径 1.5，确保在 Shape 内部
      // arc 默认是逆时针方向，符合 holes 的要求
      hole.arc(4, 2.5, 1.5, 0, Math.PI * 2);
      shape.holes.push(hole);

      const geometry = new THREE.ShapeGeometry(shape);
      const material = new THREE.MeshLambertMaterial({
        color: new THREE.Color('pink'),
        side: THREE.DoubleSide // 双面渲染，确保能看到孔洞
      });
      const mesh = new THREE.Mesh(geometry, material);
      return mesh;
    }
  },
  {
    title: 'Shape + ExtrudeGeometry',
    create: () => {
      const pointsArr = [
        new THREE.Vector2(10, 0),
        new THREE.Vector2(0, 0),
        new THREE.Vector2(0, 5),
        new THREE.Vector2(8, 10)
      ];
      const shape = new THREE.Shape(pointsArr);

      // 创建孔洞路径（必须是逆时针方向，且必须在 Shape 内部）
      const hole = new THREE.Path();
      // 中心在 (4, 2.5)，半径 1.5，确保在 Shape 内部
      // arc 默认是逆时针方向，符合 holes 的要求
      hole.arc(4, 2.5, 1.5, 0, Math.PI * 2);
      shape.holes.push(hole);

      const geometry = new THREE.ExtrudeGeometry(shape, {
        depth: 10
      });
      const material = new THREE.MeshLambertMaterial({
        color: new THREE.Color('pink'),
        side: THREE.DoubleSide
      });
      const mesh = new THREE.Mesh(geometry, material);
      return mesh;
    }
  }
];
</script>

<template>
  <div class="demo-scene flex flex-col gap-6">
    <!-- 场景展示 -->
    <div
      class="grid grid-cols-[repeat(auto-fit,minmax(500px,1fr))] gap-6 max-md:grid-cols-1 max-md:gap-4"
    >
      <ProceduralItem
        v-for="(item, index) in demos"
        :key="index"
        :title="item.title"
        :create="item.create"
      />
    </div>
    <Summary title="知识点总结">
      <SummaryItem title="循环生成">
        使用 <Code>for</Code> 循环按规律批量生成几何体，配合数学公式计算位置
      </SummaryItem>
      <SummaryItem title="圆形排列">
        使用 <Code>Math.cos</Code> 和 <Code>Math.sin</Code> 实现圆形排列
      </SummaryItem>
      <SummaryItem title="网格排列">
        使用双层循环实现网格状排列，通过索引计算 x、z 坐标
      </SummaryItem>
      <SummaryItem title="螺旋排列"> 结合角度递增和半径变化实现螺旋排列效果 </SummaryItem>
    </Summary>

    <CodeBlock title="关键代码" :snippets="codeSnippets" />
  </div>
</template>

<style lang="scss">
@use '@/demos/index.scss';
</style>
