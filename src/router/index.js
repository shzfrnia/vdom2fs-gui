import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store/index'

const redirectIfVdom2fsIsNotSeted = (to, from, next) => {
  if (!store.getters['vdom2fs/pathIsSetted']) {
    next();
    return;
  }
  next('/setup')
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/About.vue'),
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
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
