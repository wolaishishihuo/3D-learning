<script setup lang="ts">
import * as THREE from 'three';
import CurveItem from './components/CurveItem.vue';

// 定义5种曲线的配置
const demos = [
  {
    title: 'EllipseCurve (椭圆曲线)',
    create: () => new THREE.EllipseCurve(0, 0, 10, 5, 0, 2 * Math.PI, false, 0)
  },
  {
    title: 'SplineCurve (样条曲线 2D)',
    create: () =>
      new THREE.SplineCurve([
        new THREE.Vector2(-10, 0),
        new THREE.Vector2(-5, 5),
        new THREE.Vector2(0, 0),
        new THREE.Vector2(5, -5),
        new THREE.Vector2(10, 0)
      ])
  },
  {
    title: 'QuadraticBezierCurve (二次贝塞尔 2D)',
    create: () =>
      new THREE.QuadraticBezierCurve(
        new THREE.Vector2(-10, 0),
        new THREE.Vector2(0, 15),
        new THREE.Vector2(10, 0)
      )
  },
  {
    title: 'CubicBezierCurve3 (三次贝塞尔 3D)',
    create: () =>
      new THREE.CubicBezierCurve3(
        new THREE.Vector3(-10, 0, 0),
        new THREE.Vector3(-5, 15, 0),
        new THREE.Vector3(20, 15, 0),
        new THREE.Vector3(10, 0, 0)
      )
  },
  {
    title: 'CurvePath (组合路径)',
    create: () => {
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
      return path;
    }
  }
];
</script>

<template>
  <div
    class="mx-auto grid max-w-[1600px] grid-cols-[repeat(auto-fit,minmax(500px,1fr))] gap-6 p-6 max-md:grid-cols-1 max-md:gap-4 max-md:p-4"
  >
    <CurveItem
      v-for="(item, index) in demos"
      :key="index"
      :title="item.title"
      :create-curve="item.create"
    />
  </div>
</template>
