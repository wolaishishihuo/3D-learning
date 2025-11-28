<script setup lang="ts">
import * as THREE from 'three';
import { Line2, LineGeometry, LineMaterial } from 'three/addons';

const containerRef = ref<HTMLDivElement>();

// ============ 统一参数配置 ============
const config = {
  smallCircleRadius: 1.2, // 小圆半径
  distributionRadius: 11, // 小圆分布半径（圆心到原点的距离）
  gap: 0.3, // 小圆与边界线的间隙
  innerGap: 1.5, // 最内层圆与内边界的间隙
  circleSegments: 128, // 圆的采样点数（越大越平滑）
  smallCircleSegments: 64, // 小圆采样点数
  lineWidth: 3, // 粗线宽度
  circleCount: 24, // 小圆数量
  // 回纹配置
  // 第一层（内层）回纹
  innerHuiwenCount: 20, // 内层回纹数量
  innerHuiwenStep: 0.8, // 内层回纹基础步长
  innerHuiwenTurns: 2, // 内层回纹螺旋圈数
  innerHuiwenRadius: 16, // 内层回纹分布半径（在小圆和边界之间）
  // 第二层（外层）回纹
  outerHuiwenCount: 20, // 外层回纹数量
  outerHuiwenStep: 1, // 外层回纹基础步长
  outerHuiwenTurns: 2, // 外层回纹螺旋圈数
  outerHuiwenRadius: 20 // 外层回纹分布半径
};

// 根据配置自动计算边界半径
const innerBoundaryRadius = config.distributionRadius - config.smallCircleRadius - config.gap;
const outerBoundaryRadius = config.distributionRadius + config.smallCircleRadius + config.gap;
const innermostRadius = innerBoundaryRadius - config.innerGap; // 最内层圆半径

// 创建圆周上分布的小圆
function createSmallCircles() {
  const circleGroup = new THREE.Group();
  // 计算小圆角度间隔
  const angleStep = (Math.PI * 2) / config.circleCount;

  for (let i = 0; i < config.circleCount; i++) {
    // 计算小圆中心位置
    const angle = i * angleStep;
    const centerX = config.distributionRadius * Math.cos(angle);
    const centerY = config.distributionRadius * Math.sin(angle);

    const smallCircleCurve = new THREE.EllipseCurve(
      centerX,
      centerY,
      config.smallCircleRadius,
      config.smallCircleRadius,
      0,
      Math.PI * 2,
      false,
      0
    );

    const points = smallCircleCurve.getPoints(config.smallCircleSegments);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: 0xffffff });
    const line = new THREE.LineLoop(geometry, material);

    circleGroup.add(line);
  }

  return circleGroup;
}

/**
 * 创建单个回纹的点序列
 *
 * 📐 回纹绘制原理（以 step=1, turns=2 为例）：
 *
 * 想象你在画一个方形螺旋，从中心开始：
 *
 *     第1步: (0,0) 起点
 *     第2步: → 向右移动 1 → (1, 0)
 *     第3步: ↑ 向上移动 1 → (1, 1)
 *     第4步: ← 向左移动 2 → (-1, 1)  ← 步长变成2了！
 *     第5步: ↓ 向下移动 2 → (-1, -1)
 *     第6步: → 向右移动 3 → (2, -1)  ← 步长变成3了！
 *     第7步: ↑ 向上移动 3 → (2, 2)
 *     第8步: ← 向左移动 4 → (-2, 2)  ← 步长变成4了！
 *     第9步: ↓ 向下移动 4 → (-2, -2)
 *
 * 🔑 关键规律：
 *   1. 方向循环：右→上→左→下→右→上→左→下...
 *   2. 步长变化：每走2步，步长+1
 *      步长序列：1 → 1 → 2 → 2 → 3 → 3 → 4 → 4...
 *
 * @param step 基础步长（控制回纹大小，建议 0.5-2）
 * @param turns 螺旋圈数（2圈 = 8条边，3圈 = 12条边）
 */
function createHuiwenPoints(step: number, turns: number) {
  const points: THREE.Vector3[] = [];

  // ========== 步骤1：从中心开始 ==========
  let x = 0;
  let y = 0;
  points.push(new THREE.Vector3(x, y, 0));

  // ========== 步骤2：定义4个方向（按顺序循环）==========
  const directions = [
    [1, 0], // 右：x坐标增加
    [0, 1], // 上：y坐标增加
    [-1, 0], // 左：x坐标减少
    [0, -1] // 下：y坐标减少
  ];

  let directionIndex = 0; // 当前方向（0=右, 1=上, 2=左, 3=下）
  let currentStep = step; // 当前步长（会逐渐增加）

  // ========== 步骤3：绘制螺旋 ==========
  // 每圈有4条边，总共 turns 圈
  const totalSteps = turns * 4;

  for (let i = 0; i < totalSteps; i++) {
    // 获取当前方向 [dx, dy]
    const [dx, dy] = directions[directionIndex % 4];

    // 按照当前方向移动 currentStep 距离
    x += dx * currentStep;
    y += dy * currentStep;

    // 记录这个点
    points.push(new THREE.Vector3(x, y, 0));

    // 切换到下一个方向
    directionIndex++;

    // ========== 🔑 关键：每走2步，步长+1 ==========
    // 这样步长变化就是：step → step → 2*step → 2*step → 3*step → 3*step...
    if (directionIndex % 2 === 0) {
      currentStep += step;
    }
  }

  return points;
}

/**
 * 创建圆周分布的回纹层（通用函数）
 *
 * 🎯 原理：
 *   1. 在圆周上均匀分布 count 个回纹
 *   2. 每个回纹的中心放在圆周上
 *   3. 旋转回纹使其开口朝向圆周切线方向
 *
 * @param count 回纹数量
 * @param radius 分布半径
 * @param step 基础步长
 * @param turns 螺旋圈数
 */
function createHuiwenLayer(count: number, radius: number, step: number, turns: number) {
  const group = new THREE.Group();

  // 计算每个回纹之间的角度间隔
  const angleStep = (Math.PI * 2) / count;

  // 在圆周上均匀分布回纹
  for (let i = 0; i < count; i++) {
    // 计算当前回纹的角度（从0开始，顺时针）
    const angle = i * angleStep;

    // ========== 步骤1：计算回纹中心在圆周上的位置 ==========
    // 使用极坐标转直角坐标公式
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);

    // ========== 步骤2：创建单个回纹的点序列 ==========
    const points = createHuiwenPoints(step, turns);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: 0xffffff });
    const line = new THREE.Line(geometry, material);

    // ========== 步骤3：将回纹移动到圆周位置 ==========
    line.position.set(x, y, 0);

    // ========== 步骤4：旋转回纹使其开口朝向切线方向 ==========
    // angle 是回纹中心的角度，旋转 angle 度使回纹与圆周对齐
    line.rotation.z = angle;

    group.add(line);
  }

  return group;
}

/**
 * 创建第一层（内层）回纹
 * 位置：在小圆和边界线之间
 */
function createInnerHuiwen() {
  const { innerHuiwenCount, innerHuiwenRadius, innerHuiwenStep, innerHuiwenTurns } = config;
  return createHuiwenLayer(innerHuiwenCount, innerHuiwenRadius, innerHuiwenStep, innerHuiwenTurns);
}

/**
 * 创建第二层（外层）回纹
 * 位置：在边界线外面
 */
function createOuterHuiwen() {
  const { outerHuiwenCount, outerHuiwenRadius, outerHuiwenStep, outerHuiwenTurns } = config;
  return createHuiwenLayer(outerHuiwenCount, outerHuiwenRadius, outerHuiwenStep, outerHuiwenTurns);
}

// 创建粗边界线（使用 Line2 实现粗线）
function createBoundaryLine(radius: number, lineWidth: number) {
  const curve = new THREE.EllipseCurve(0, 0, radius, radius, 0, Math.PI * 2, false, 0);
  const points = curve.getPoints(config.circleSegments);

  const geometry = new LineGeometry();
  geometry.setFromPoints(points);

  const material = new LineMaterial({
    color: 0xffffff,
    linewidth: lineWidth
  });

  return new Line2(geometry, material);
}

// 创建细线圆（使用普通 Line）
function createThinCircle(radius: number) {
  const curve = new THREE.EllipseCurve(0, 0, radius, radius, 0, Math.PI * 2, false, 0);
  const points = curve.getPoints(config.circleSegments);
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({ color: 0xffffff });
  return new THREE.LineLoop(geometry, material);
}

let group: THREE.Group | null = null;

useThreeScene(containerRef, {
  showAxesHelper: false,
  fov: 50,
  onReady: ({ scene }) => {
    group = new THREE.Group();

    // 最内层细圆
    const innermostLine = createThinCircle(innermostRadius);
    group.add(innermostLine);

    // 内边界粗线
    const innerLine = createBoundaryLine(innerBoundaryRadius, config.lineWidth);
    group.add(innerLine);

    // 外边界粗线
    const outerLine = createBoundaryLine(outerBoundaryRadius, config.lineWidth);
    group.add(outerLine);

    // 小圆组
    const circleGroup = createSmallCircles();
    group.add(circleGroup);

    // 第一层（内层）回纹
    const innerHuiwenGroup = createInnerHuiwen();
    group.add(innerHuiwenGroup);

    // 第二层（外层）回纹
    const outerHuiwenGroup = createOuterHuiwen();
    group.add(outerHuiwenGroup);

    // 倾斜放置（绕 X 轴旋转 -60°，产生俯视效果）
    group.rotation.x = -Math.PI / 3;

    scene.add(group);
  },
  onAnimate: () => {
    if (group) {
      group.children.forEach((item, index: number) => {
        const flag = index % 2 === 0 ? 1 : -1;
        item.rotation.z += 0.001 * index * flag;
      });
    }
  }
});
</script>

<template>
  <div class="project-container relative">
    <div class="absolute left-0 top-0 z-10 p-4">
      <h1 class="text-2xl font-bold text-white">云雷纹</h1>
    </div>
    <div ref="containerRef" class="h-full w-full"></div>
  </div>
</template>
