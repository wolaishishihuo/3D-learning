<script setup lang="ts">
import * as THREE from 'three';
import { useThreeScene } from '@/composables/useThreeScene';

const containerRefs = ref<HTMLDivElement[]>([]);
const cleanupFns: (() => void)[] = [];

// 定义5种曲线的配置
const demos = [
  {
    title: 'EllipseCurve (椭圆曲线)',
    create: () => {
      // 椭圆曲线: aX, aY, xRadius, yRadius, aStartAngle, aEndAngle, aClockwise, aRotation
      return new THREE.EllipseCurve(
        0,
        0, // ax, aY
        10,
        5, // xRadius, yRadius
        0,
        2 * Math.PI, // aStartAngle, aEndAngle
        false, // aClockwise
        0 // aRotation
      );
    }
  },
  {
    title: 'SplineCurve (样条曲线 2D)',
    create: () => {
      // 2D 样条曲线，通过一系列点
      return new THREE.SplineCurve([
        new THREE.Vector2(-10, 0),
        new THREE.Vector2(-5, 5),
        new THREE.Vector2(0, 0),
        new THREE.Vector2(5, -5),
        new THREE.Vector2(10, 0)
      ]);
    }
  },
  {
    title: 'QuadraticBezierCurve (二次贝塞尔 2D)',
    create: () => {
      // 二次贝塞尔: 起点，控制点，终点
      return new THREE.QuadraticBezierCurve(
        new THREE.Vector2(-10, 0), // start
        new THREE.Vector2(0, 15), // control
        new THREE.Vector2(10, 0) // end
      );
    }
  },
  {
    title: 'CubicBezierCurve3 (三次贝塞尔 3D)',
    create: () => {
      // 三次贝塞尔 3D: 起点，控制点1，控制点2，终点
      return new THREE.CubicBezierCurve3(
        new THREE.Vector3(-10, 0, 0), // start
        new THREE.Vector3(-5, 15, 0), // control 1
        new THREE.Vector3(20, 15, 0), // control 2
        new THREE.Vector3(10, 0, 0) // end
      );
    }
  },
  {
    title: 'CurvePath (组合路径)',
    create: () => {
      // 组合多个路径
      const path = new THREE.CurvePath<THREE.Vector3>();

      // 添加线段
      path.add(new THREE.LineCurve3(new THREE.Vector3(-10, -10, 0), new THREE.Vector3(-10, 10, 0)));

      // 添加半圆
      // 注意：CurvePath通常用于2D，但Three.js中CurvePath<T>是泛型。
      // 这里我们简单演示组合一段 3D 曲线
      path.add(
        new THREE.QuadraticBezierCurve3(
          new THREE.Vector3(-10, 10, 0),
          new THREE.Vector3(0, 15, 0),
          new THREE.Vector3(10, 10, 0)
        )
      );

      path.add(new THREE.LineCurve3(new THREE.Vector3(10, 10, 0), new THREE.Vector3(10, -10, 0)));

      return path;
    }
  }
];

onMounted(() => {
  containerRefs.value.forEach((container, index) => {
    if (!container) return;

    const { scene, cleanup } = useThreeScene(container);
    cleanupFns.push(cleanup);

    const demo = demos[index];
    const curve = demo.create();

    // 生成点并创建几何体
    const points = curve.getPoints(50);

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color: 0xff0000,
      linewidth: 2
    });

    const curveObject = new THREE.Line(geometry, material);
    scene.add(curveObject);
  });
});

onUnmounted(() => {
  cleanupFns.forEach(fn => fn());
});
</script>

<template>
  <div
    class="mx-auto grid max-w-[1600px] grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-6 p-6 max-md:grid-cols-1 max-md:gap-4 max-md:p-4"
  >
    <div
      v-for="(item, index) in demos"
      :key="index"
      class="border-white/10 hover:border-white/30 flex flex-col overflow-hidden rounded-xl border border-solid bg-[#1e1e1e] transition-colors duration-300"
    >
      <div class="bg-white/5 border-white/10 border-b border-solid p-4">
        <h3 class="m-0 text-base font-semibold text-white">{{ item.title }}</h3>
      </div>
      <div ref="containerRefs" class="relative h-[300px] w-full"></div>
    </div>
  </div>
</template>
