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
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
