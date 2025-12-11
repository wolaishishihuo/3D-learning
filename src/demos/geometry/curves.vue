<script setup lang="ts">
import * as THREE from 'three';
import ScreenItem from '@/demos/components/ScreenItem.vue';
import type { CodeSnippet } from '@/components/CodeBlock/index.vue';

// 定义5种曲线的配置
const demos = [
  {
    title: 'EllipseCurve (椭圆曲线)',
    create: (scene: THREE.Scene) => {
      const curve = new THREE.EllipseCurve(0, 0, 10, 10, 0, 2 * Math.PI, false, 0);
      const points = curve.getPoints(50);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color: 0xff0000,
        linewidth: 2
      });
      const curveObject = new THREE.Line(geometry, material);
      scene.add(curveObject);
    }
  },
  {
    title: 'SplineCurve (样条曲线 2D)',
    create: (scene: THREE.Scene) => {
      const curve = new THREE.SplineCurve([
        new THREE.Vector2(-10, 0),
        new THREE.Vector2(-5, 5),
        new THREE.Vector2(0, 0),
        new THREE.Vector2(5, -5),
        new THREE.Vector2(10, 0)
      ]);
      const points = curve.getPoints(50);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color: 0xff0000,
        linewidth: 2
      });
      const curveObject = new THREE.Line(geometry, material);
      scene.add(curveObject);
    }
  },
  {
    title: 'QuadraticBezierCurve (二次贝塞尔 2D)',
    create: (scene: THREE.Scene) => {
      const curve = new THREE.QuadraticBezierCurve(
        new THREE.Vector2(-10, 0),
        new THREE.Vector2(0, 15),
        new THREE.Vector2(10, 0)
      );
      const points = curve.getPoints(50);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color: 0xff0000,
        linewidth: 2
      });
      const curveObject = new THREE.Line(geometry, material);
      scene.add(curveObject);
    }
  },
  {
    title: 'CubicBezierCurve3 (三次贝塞尔 3D)',
    create: (scene: THREE.Scene) => {
      const curve = new THREE.CubicBezierCurve3(
        new THREE.Vector3(-10, 0, 0),
        new THREE.Vector3(-5, 15, 0),
        new THREE.Vector3(20, 15, 0),
        new THREE.Vector3(10, 0, 0)
      );
      const points = curve.getPoints(50);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color: 0xff0000,
        linewidth: 2
      });
      const curveObject = new THREE.Line(geometry, material);
      scene.add(curveObject);
    }
  },
  {
    title: 'CurvePath (组合路径)',
    create: (scene: THREE.Scene) => {
      const path = new THREE.CurvePath<THREE.Vector3>();
      path.add(new THREE.LineCurve3(new THREE.Vector3(-10, -10, 0), new THREE.Vector3(-10, 10, 0)));
      path.add(
        new THREE.QuadraticBezierCurve3(
          new THREE.Vector3(-10, 10, 0),
          new THREE.Vector3(0, 15, 0),
          new THREE.Vector3(10, 10, 0)
        )
      );
      path.add(new THREE.LineCurve3(new THREE.Vector3(10, 10, 0), new THREE.Vector3(10, -10, 0)));
      const points = path.getPoints(50);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color: 0xff0000,
        linewidth: 2
      });
      const curveObject = new THREE.Line(geometry, material);
      scene.add(curveObject);
    }
  }
];

const codeSnippets: CodeSnippet[] = [
  {
    title: 'EllipseCurve - 椭圆曲线',
    code: `new THREE.EllipseCurve(
  aX,      // 椭圆中心 X 坐标
  aY,      // 椭圆中心 Y 坐标
  xRadius, // X 轴半径（椭圆宽度的一半）
  yRadius, // Y 轴半径（椭圆高度的一半）
  aStartAngle,  // 起始角度（弧度）
  aEndAngle,    // 结束角度（弧度）
  aClockwise,   // 是否顺时针绘制（默认 false）
  aRotation     // 椭圆旋转角度（弧度）
)

// 示例：绘制完整椭圆
new THREE.EllipseCurve(0, 0, 10, 5, 0, 2 * Math.PI, false, 0)`,
    language: 'typescript'
  },
  {
    title: 'SplineCurve - 样条曲线（2D）',
    code: `new THREE.SplineCurve(points)

// points: Vector2[] - 控制点数组
// 曲线会平滑地经过所有控制点

// 示例：创建平滑曲线
new THREE.SplineCurve([
  new THREE.Vector2(-10, 0),  // 起点
  new THREE.Vector2(-5, 5),   // 控制点1
  new THREE.Vector2(0, 0),     // 控制点2
  new THREE.Vector2(5, -5),    // 控制点3
  new THREE.Vector2(10, 0)     // 终点
])`,
    language: 'typescript'
  },
  {
    title: 'QuadraticBezierCurve - 二次贝塞尔曲线（2D）',
    code: `new THREE.QuadraticBezierCurve(
  v0,  // Vector2 - 起点
  v1,  // Vector2 - 控制点（曲线会向这个点弯曲）
  v2   // Vector2 - 终点
)

// 示例：创建抛物线形状
new THREE.QuadraticBezierCurve(
  new THREE.Vector2(-10, 0),  // 起点
  new THREE.Vector2(0, 15),   // 控制点（最高点）
  new THREE.Vector2(10, 0)     // 终点
)`,
    language: 'typescript'
  },
  {
    title: 'CubicBezierCurve3 - 三次贝塞尔曲线（3D）',
    code: `new THREE.CubicBezierCurve3(
  v0,  // Vector3 - 起点
  v1,  // Vector3 - 第一个控制点
  v2,  // Vector3 - 第二个控制点
  v3   // Vector3 - 终点
)

// 示例：创建 S 形曲线
new THREE.CubicBezierCurve3(
  new THREE.Vector3(-10, 0, 0),   // 起点
  new THREE.Vector3(-5, 15, 0),  // 控制点1（向上弯曲）
  new THREE.Vector3(20, 15, 0),  // 控制点2（保持高度）
  new THREE.Vector3(10, 0, 0)     // 终点
)`,
    language: 'typescript'
  },
  {
    title: 'CurvePath - 组合路径',
    code: `const path = new THREE.CurvePath<THREE.Vector3>();

// 使用 add() 方法添加多个曲线段
path.add(curve1);  // 添加第一条曲线
path.add(curve2);  // 添加第二条曲线
path.add(curve3);  // 添加第三条曲线

// 示例：组合直线和贝塞尔曲线
const path = new THREE.CurvePath<THREE.Vector3>();
// 添加直线段
path.add(new THREE.LineCurve3(
  new THREE.Vector3(-10, -10, 0),
  new THREE.Vector3(-10, 10, 0)
));
// 添加贝塞尔曲线段
path.add(new THREE.QuadraticBezierCurve3(
  new THREE.Vector3(-10, 10, 0),
  new THREE.Vector3(0, 15, 0),
  new THREE.Vector3(10, 10, 0)
));
// 再添加直线段
path.add(new THREE.LineCurve3(
  new THREE.Vector3(10, 10, 0),
  new THREE.Vector3(10, -10, 0)
));`,
    language: 'typescript'
  }
];
</script>

<template>
  <div class="flex flex-col gap-6">
    <!-- 场景展示 -->
    <div
      class="grid grid-cols-[repeat(auto-fit,minmax(500px,1fr))] gap-6 max-md:grid-cols-1 max-md:gap-4"
    >
      <ScreenItem
        v-for="(item, index) in demos"
        :key="index"
        :title="item.title"
        :create="item.create"
      />
    </div>
    <!-- 知识总结 -->
    <Summary title="曲线参数说明">
      <SummaryItem title="EllipseCurve - 椭圆曲线">
        用于创建椭圆或圆弧。参数包括：中心坐标 <Code>(aX, aY)</Code>、X/Y
        轴半径、起始/结束角度（弧度）、是否顺时针、旋转角度。常用于绘制圆形、椭圆或圆弧路径。
      </SummaryItem>
      <SummaryItem title="SplineCurve - 样条曲线（2D）">
        创建平滑的 2D 曲线，会经过所有给定的控制点。只需传入
        <Code>Vector2[]</Code> 数组，曲线会自动平滑连接这些点。适合需要曲线经过特定点的场景。
      </SummaryItem>
      <SummaryItem title="QuadraticBezierCurve - 二次贝塞尔曲线（2D）">
        需要 3 个点：起点、控制点、终点。控制点决定曲线的弯曲方向和程度，形成抛物线形状。使用
        <Code>Vector2</Code> 表示 2D 坐标。
      </SummaryItem>
      <SummaryItem title="CubicBezierCurve3 - 三次贝塞尔曲线（3D）">
        需要 4 个点：起点、两个控制点、终点。比二次贝塞尔更灵活，可以创建 S 形等复杂曲线。使用
        <Code>Vector3</Code> 表示 3D 坐标，支持 Z 轴方向。
      </SummaryItem>
      <SummaryItem title="CurvePath - 组合路径">
        可以将多个曲线段组合成一条完整路径。使用
        <Code>add()</Code> 方法依次添加曲线，会自动连接相邻曲线的端点。适合创建复杂的组合路径。
      </SummaryItem>
      <template #tip>
        <strong>提示：</strong>所有曲线都继承自 <Code>Curve</Code> 基类，可以使用
        <Code>getPoints(divisions)</Code> 方法获取曲线上的点数组，用于创建几何体或路径动画。
      </template>
    </Summary>

    <!-- 代码示例 -->
    <CodeBlock title="曲线创建代码示例" :snippets="codeSnippets" />
  </div>
</template>
