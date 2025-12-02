<script setup lang="ts">
import type { CodeSnippet } from '@/components/CodeBlock/index.vue';
import ProceduralItem from './components/ProceduralItem.vue';
import * as THREE from 'three';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';

const codeSnippets: CodeSnippet[] = [
  {
    title: 'LatheGeometry - 车削几何体',
    code: `// 通过 2D 点数组绕 Y 轴旋转生成 3D 几何体
const points = [
  new THREE.Vector2(0, 0),
  new THREE.Vector2(5, 6),
  new THREE.Vector2(3, 8),
  new THREE.Vector2(0, 15)
];
const geometry = new THREE.LatheGeometry(points);
// 常用于生成花瓶、杯子等旋转对称物体`,
    language: 'typescript'
  },
  {
    title: 'TubeGeometry - 管道几何体',
    code: `// 沿曲线生成管道
const curve = new THREE.CatmullRomCurve3([p1, p2, p3, p4]);
const geometry = new THREE.TubeGeometry(
  curve,
  30,  // tubularSegments: 沿曲线分段数（影响平滑度）
  2,   // radius: 管道半径
  8    // radialSegments: 圆周分段数（影响圆形效果）
);
// 注意：分段数不能太小，否则管道会不平滑`,
    language: 'typescript'
  },
  {
    title: 'Shape + ShapeGeometry - 2D 形状',
    code: `// 方式1：使用点数组创建（推荐，更简洁）
const pointsArr = [
  new THREE.Vector2(10, 0),
  new THREE.Vector2(0, 0),
  new THREE.Vector2(0, 5),
  new THREE.Vector2(8, 10)
];
const shape = new THREE.Shape(pointsArr); // 自动闭合

// 方式2：使用 moveTo/lineTo 创建
const shape2 = new THREE.Shape();
shape2.moveTo(10, 0);
shape2.lineTo(0, 0);
shape2.lineTo(0, 5);
shape2.lineTo(8, 10);

const geometry = new THREE.ShapeGeometry(shape);`,
    language: 'typescript'
  },
  {
    title: 'Shape 创建孔洞（holes）',
    code: `// 创建孔洞路径（重要注意事项）
const hole = new THREE.Path();
// 1. 路径必须是逆时针方向（与 Shape 外轮廓相反）
// 2. 路径必须在 Shape 内部，不能超出边界
// 3. arc() 默认是逆时针，符合要求
hole.arc(4, 2.5, 1.5, 0, Math.PI * 2); // 中心、半径要确保在 Shape 内
shape.holes.push(hole);

// 材质需要设置双面渲染才能看到孔洞
const material = new THREE.MeshLambertMaterial({
  side: THREE.DoubleSide
});`,
    language: 'typescript'
  },
  {
    title: 'ExtrudeGeometry - 挤出几何体',
    code: `// 将 2D Shape 挤出成 3D 几何体
const shape = new THREE.Shape(pointsArr);
const geometry = new THREE.ExtrudeGeometry(shape, {
  depth: 10,        // 挤出深度
  bevelEnabled: true,  // 是否启用倒角
  bevelThickness: 1,   // 倒角厚度
  bevelSize: 1,        // 倒角大小
  bevelSegments: 3     // 倒角分段数
});
// 常用于生成文字、复杂 2D 形状的 3D 模型`,
    language: 'typescript'
  }
];
let gui: GUI | null = null;
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
      gui = new GUI({ title: 'TubeGeometry Options' });

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

onUnmounted(() => {
  if (gui) {
    gui.destroy();
  }
});
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
      <SummaryItem title="LatheGeometry - 车削几何体">
        通过 2D 点数组绕 Y 轴旋转生成 3D 几何体，常用于创建花瓶、杯子等旋转对称物体。使用
        <Code>THREE.Vector2</Code> 数组定义轮廓点，<Code>LatheGeometry</Code> 会自动旋转生成 3D
        模型。
      </SummaryItem>
      <SummaryItem title="TubeGeometry - 管道几何体">
        沿曲线生成管道几何体，需要先创建曲线（如
        <Code>CatmullRomCurve3</Code>
        ）。关键参数：<Code>tubularSegments</Code>（沿曲线分段数，影响平滑度）、<Code>radius</Code>（管道半径）、<Code>radialSegments</Code>（圆周分段数，影响圆形效果）。分段数不能太小，否则管道会不平滑。
      </SummaryItem>
      <SummaryItem title="Shape - 2D 形状创建">
        创建 2D 形状有两种方式：1) 使用点数组
        <Code>new THREE.Shape(pointsArr)</Code>（推荐，更简洁，自动闭合）；2) 使用
        <Code>moveTo()</Code> 和 <Code>lineTo()</Code>
        手动绘制。点数组方式会自动将最后一个点连接到第一个点形成闭合路径。
      </SummaryItem>
      <SummaryItem title="ShapeGeometry - 2D 形状转几何体">
        将 <Code>THREE.Shape</Code> 转换为平面几何体，生成 2D 形状的网格。需要设置材质
        <Code>side: THREE.DoubleSide</Code> 才能看到双面效果。
      </SummaryItem>
      <SummaryItem title="Shape 创建孔洞（holes）">
        使用 <Code>THREE.Path</Code> 创建孔洞路径，添加到
        <Code>shape.holes</Code> 数组。重要注意事项：1) 路径必须是逆时针方向（与 Shape
        外轮廓相反）；2) 路径必须在 Shape 内部，不能超出边界；3)
        <Code>arc()</Code> 默认是逆时针，符合要求；4) 材质需要设置
        <Code>side: THREE.DoubleSide</Code> 才能看到孔洞效果。
      </SummaryItem>
      <SummaryItem title="ExtrudeGeometry - 挤出几何体">
        将 2D <Code>Shape</Code> 挤出成 3D 几何体，可以设置深度、倒角等参数。常用于生成文字、复杂 2D
        形状的 3D 模型。支持 <Code>bevelEnabled</Code>、<Code>bevelThickness</Code>、<Code
          >bevelSize</Code
        >
        等倒角参数。
      </SummaryItem>
      <template #tip>
        <strong>提示：</strong>程序化几何体适合创建规则形状和复杂曲线模型。Shape 的 holes
        如果看不到，检查路径方向、大小和材质设置。使用点数组创建 Shape 比手动绘制更简洁易维护。
      </template>
    </Summary>

    <CodeBlock title="关键代码" :snippets="codeSnippets" />
  </div>
</template>

<style lang="scss">
@use '@/demos/index.scss';
</style>
