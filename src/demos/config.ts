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
    id: 'perspective-camera',
    name: 'Perspective Camera',
    description: '深入理解透视相机以及视椎体',
    category: 'basics',
    level: '入门',
    icon: '💡',
    component: () => import('./basics/perspective-camera.vue')
  }
];

export const demos: DemoConfig[] = [...basicsDemos];

export function getDemoById(id: string): DemoConfig | undefined {
  return demos.find(d => d.id === id);
}

export function getDemosByCategory(category: string): DemoConfig[] {
  if (category === 'all') return demos;
  return demos.filter(d => d.category === category);
}
