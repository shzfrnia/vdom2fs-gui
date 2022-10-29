import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'
import routes from './routes'

export default createRouter({
  history: process.env.IS_ELECTRON
    ? createWebHashHistory()
    : createWebHistory(),
  routes,
})
