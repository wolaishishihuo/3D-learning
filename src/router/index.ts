import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home/index.vue')
  },
  {
    path: '/basic-scene',
    name: 'BasicScene',
    component: () => import('@/views/BasicScene/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
