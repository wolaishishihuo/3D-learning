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
  { id: 'geometry', name: '几何', icon: '🔷' },
  { id: 'material', name: '材质', icon: '🎨' },
  { id: 'light', name: '光照', icon: '💡' },
  { id: 'animation', name: '动画', icon: '🔄' }
];

export const demos: DemoConfig[] = [
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
    id: 'sphere-geometry',
    name: 'Sphere Geometry',
    description: '球体几何体，理解几何体参数',
    category: 'geometry',
    level: '入门',
    icon: '🌐',
    component: () => import('./geometry/sphere-geometry.vue')
  },
  {
    id: 'basic-light',
    name: 'Basic Light',
    description: '基础光照设置，环境光和方向光',
    category: 'light',
    level: '入门',
    icon: '💡',
    component: () => import('./light/basic-light.vue')
  },
  {
    id: 'rotation-animation',
    name: 'Rotation Animation',
    description: '旋转动画，学习基础动画循环',
    category: 'animation',
    level: '入门',
    icon: '🔄',
    component: () => import('./animation/rotation-animation.vue')
  },
  {
    id: 'phong-material',
    name: 'Phong Material',
    description: 'Phong材质，理解材质和光照的关系',
    category: 'material',
    level: '进阶',
    icon: '🎨',
    component: () => import('./material/phong-material.vue')
  },
  {
    id: 'custom-geometry',
    name: 'Custom Geometry',
    description: '自定义几何体，手动创建顶点',
    category: 'geometry',
    level: '进阶',
    icon: '⚡',
    component: () => import('./geometry/custom-geometry.vue')
  }
];

export function getDemoById(id: string): DemoConfig | undefined {
  return demos.find(d => d.id === id);
}

export function getDemosByCategory(category: string): DemoConfig[] {
  if (category === 'all') return demos;
  return demos.filter(d => d.category === category);
}
