import {
  redirecrIfVdom2fsIsCorrect,
  redirectIfVdom2fsIsNotSeted,
} from './utils'

export default [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
    beforeEnter: redirectIfVdom2fsIsNotSeted,
  },
  {
    path: '/config/:id',
    name: 'Config',
    component: () => import('@/views/config/ConfigView.vue'),
    beforeEnter: redirectIfVdom2fsIsNotSeted,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/AboutView.vue'),
    beforeEnter: redirectIfVdom2fsIsNotSeted,
  },
  {
    path: '/setup',
    name: 'Setup',
    component: () => import('@/views/SetupView.vue'),
    beforeEnter: redirecrIfVdom2fsIsCorrect,
  },
]
