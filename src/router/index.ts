import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home/index.vue')
  },
  {
    path: '/demos',
    name: 'DemoList',
    component: () => import('@/views/demoList/index.vue')
  },
  {
    path: '/demos/:category/:id',
    name: 'DemoDetail',
    component: () => import('@/views/demoDetail/index.vue')
  },
  {
    path: '/projects',
    name: 'ProjectList',
    component: () => import('@/views/projectList/index.vue')
  },
  // 实战项目路由示例：
  {
    path: '/projects/urban-management',
    name: 'UrbanManagement',
    component: () => import('@/projects/urbanManagement/index.vue')
  },
  {
    path: '/projects/random-terrain',
    name: 'RandomTerrain',
    component: () => import('@/projects/random-terrain/index.vue')
  },
  {
    path: '/projects/cloud-thunder-pattern',
    name: 'CloudThunderPattern',
    component: () => import('@/projects/cloud-thunder-pattern/index.vue')
  },
  {
    path: '/projects/tunnel-shuttle',
    name: 'TunnelShuttle',
    component: () => import('@/projects/tunnel-shuttle/index.vue')
  },
  {
    path: '/projects/infinite-tunnel',
    name: 'InfiniteTunnel',
    component: () => import('@/projects/infinite-tunnel/index.vue')
  },
  {
    path: '/projects/build-house',
    name: 'BuildHouse',
    component: () => import('@/projects/build-house/index.vue')
  },
  {
    path: '/projects/color-gradient-chart',
    name: 'ColorGradientChart',
    component: () => import('@/projects/color-gradient-chart/index.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
