import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import store from '@/store/index'

const redirectIfVdom2fsIsNotSeted = (to, from, next) => {
  if (!store.getters['vdom2fs/pathIsValid']) {
    next({name: "Setup"});
    return;
  }
  next();
}

const redirecrIfVdom2fsIsCorrect = (to, from, next) => {
  if (store.getters['vdom2fs/pathIsValid']) {
    next({name: "Home"});
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
    path: '/config/:id',
    name: 'Config',
    component: () => import('@/views/Config.vue'),
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
    name: 'Setup',
    component: () => import('@/views/SetUp.vue'),
    beforeEnter: redirecrIfVdom2fsIsCorrect
  },

]

const router = createRouter({
  history: process.env.IS_ELECTRON ? createWebHashHistory() : createWebHistory(),
  routes
})

export default router
