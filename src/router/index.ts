import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
