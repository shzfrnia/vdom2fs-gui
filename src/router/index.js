import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import store from '@/store/index'

const redirectIfVdom2fsIsNotSeted = (to, from, next) => {
  if (!store.getters['vdom2fs/pathIsSetted']) {
    next('/setup');
    return;
  }
  next();
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    beforeEnter: redirectIfVdom2fsIsNotSeted
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue'),
    beforeEnter: redirectIfVdom2fsIsNotSeted
  },
  {
    path: '/setup',
    name: 'setup',
    component: () => import('@/views/SetUp.vue')
  },

]

const router = createRouter({
  history: process.env.IS_ELECTRON ? createWebHashHistory() : createWebHistory(),
  routes
})

export default router
