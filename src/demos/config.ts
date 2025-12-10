import type { Component } from 'vue';

export interface DemoConfig {
  id: string;
  name: string;
  description: string;
  category: string;
  level: '入门' | '进阶' | '高级';
  icon: string;
  component: () => Promise<Component>;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export const categories: Category[] = [
  { id: 'all', name: '全部', icon: '📦' },
  { id: 'basics', name: '基础', icon: '🎯' },
  { id: 'camera', name: '相机', icon: '📷' },
  { id: 'geometry', name: '几何', icon: '🔷' },
  { id: 'material', name: '材质', icon: '🎨' },
  { id: 'light', name: '光照', icon: '💡' },
  { id: 'animation', name: '动画', icon: '🔄' },
  { id: 'model', name: '模型', icon: '🎭' }
];

const basicsDemos: DemoConfig[] = [
  {
    id: 'basic-cube',
    name: 'Basic Cube',
    description: '基础立方体示例，学习场景、相机和渲染器',
    category: 'basics',
    level: '入门',
    icon: '📦',
    component: () => import('./basics/basic-cube.vue')
  },
  {
    id: 'data-gui',
    name: 'Data GUI',
    description: '数据 GUI 示例，学习数据 GUI 的使用',
    category: 'basics',
    level: '入门',
    icon: '🔍',
    component: () => import('./basics/data-gui.vue')
  },
  {
    id: 'scene-traverse',
    name: '场景遍历和世界坐标',
    description: '学习场景遍历和世界坐标的使用',
    category: 'basics',
    level: '进阶',
    icon: '🌍',
    component: () => import('./basics/scene-traverse.vue')
  }
];

const cameraDemos: DemoConfig[] = [
  {
    id: 'perspective-camera',
    name: 'Perspective Camera',
    description: '理解透视相机以及视椎体',
    category: 'camera',
    level: '入门',
    icon: '📷',
    component: () => import('./camera/perspective-camera.vue')
  }
];

const geometryDemos: DemoConfig[] = [
  {
    id: 'buffer-geometry',
    name: 'BufferGeometry: 顶点生成各种几何体',
    description: '学习使用 BufferGeometry 通过顶点生成各种几何体',
    category: 'geometry',
    level: '进阶',
    icon: '🔷',
    component: () => import('./geometry/buffer-geometry.vue')
  },
  {
    id: 'point-line-mesh',
    name: '点模型、线模型、网格模型',
    description: '学习点模型、线模型、网格模型的使用',
    category: 'geometry',
    level: '进阶',
    icon: '🔷',
    component: () => import('./geometry/point-line-mesh.vue')
  },
  {
    id: 'curves',
    name: '如何画各种曲线',
    description: '学习如何画各种曲线',
    category: 'geometry',
    level: '进阶',
    icon: '📈',
    component: () => import('./geometry/curves.vue')
  },
  {
    id: 'procedural-geometry',
    name: '按照规律生成各种几何体',
    description: '学习按照规律生成各种几何体的方法',
    category: 'geometry',
    level: '进阶',
    icon: '🔷',
    component: () => import('./geometry/procedural-geometry.vue')
  }
];

const materialDemos: DemoConfig[] = [
  {
    id: 'phong-material',
    name: 'Phong Material',
    description: 'Phong 材质示例',
    category: 'material',
    level: '入门',
    icon: '🎨',
    component: () => import('./material/phong-material.vue')
  },
  {
    id: 'material-color-texture',
    name: '材质颜色和纹理贴图',
    description: '学习材质颜色和纹理贴图的使用',
    category: 'material',
    level: '进阶',
    icon: '🎨',
    component: () => import('./material/material-color-texture.vue')
  },
  {
    id: 'uv-coordinates-animation',
    name: 'UV 坐标和 UV 动画',
    description: '学习 UV 坐标和 UV 动画的使用',
    category: 'material',
    level: '进阶',
    icon: '🎨',
    component: () => import('./material/uv-coordinates-animation.vue')
  },
  {
    id: 'vertex-normals-gradient',
    name: '顶点法线、反射和颜色渐变',
    description: '学习顶点法线、反射原理和自定义顶点颜色实现渐变',
    category: 'material',
    level: '进阶',
    icon: '🎨',
    component: () => import('./material/vertex-normals-gradient.vue')
  }
];

const lightDemos: DemoConfig[] = [
  {
    id: 'basic-light',
    name: 'Basic Light',
    description: '基础光照示例，学习环境光和方向光',
    category: 'light',
    level: '入门',
    icon: '💡',
    component: () => import('./light/basic-light.vue')
  },
  {
    id: 'lights-helpers',
    name: '各种灯光和常用 Helper',
    description: '学习各种灯光类型和常用的 Helper 辅助工具',
    category: 'light',
    level: '进阶',
    icon: '💡',
    component: () => import('./light/lights-helpers.vue')
  }
];

const animationDemos: DemoConfig[] = [
  {
    id: 'rotation-animation',
    name: 'Rotation Animation',
    description: '旋转动画示例，学习使用 requestAnimationFrame 创建动画',
    category: 'animation',
    level: '入门',
    icon: '🔄',
    component: () => import('./animation/rotation-animation.vue')
  }
];

const modelDemos: DemoConfig[] = [
  {
    id: 'model-loading-optimization',
    name: '模型加载与优化',
    description: '学习如何加载外部模型、GLTF 文件结构、gltf-pipeline 工具和 Draco 压缩',
    category: 'model',
    level: '进阶',
    icon: '🎭',
    component: () => import('./model/model-loading-optimization.vue')
  }
];

export const demos: DemoConfig[] = [
  ...basicsDemos,
  ...cameraDemos,
  ...geometryDemos,
  ...materialDemos,
  ...lightDemos,
  ...animationDemos,
  ...modelDemos
];

export function getDemoById(id: string): DemoConfig | undefined {
  return demos.find(d => d.id === id);
}

// 难度等级排序权重：入门(0) → 进阶(1) → 高级(2)
const levelOrder: Record<'入门' | '进阶' | '高级', number> = {
  入门: 0,
  进阶: 1,
  高级: 2
};

export function getDemosByCategory(category: string): DemoConfig[] {
  let result: DemoConfig[];
  if (category === 'all') {
    result = demos;
  } else {
    result = demos.filter(d => d.category === category);
  }
  // 按照难度等级排序：入门 → 进阶 → 高级
  return result.sort((a, b) => levelOrder[a.level] - levelOrder[b.level]);
}
