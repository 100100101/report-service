import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import authGuard from './guards/auth'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: authGuard,
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import(/* webpackChunkName: "auth" */ '../views/Auth.vue'),
    beforeEnter: authGuard,
  },
  {
    path: '/report',
    name: 'Report',
    component: () =>
      import(/* webpackChunkName: "report" */ '../views/Report.vue'),
    beforeEnter: authGuard,
  },
]

const router = new VueRouter({
  routes,
})

export default router
