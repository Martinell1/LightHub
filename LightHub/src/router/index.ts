import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/',
    name: 'Main_Layout',
    component: () => import('../layout/Main_Layout.vue'),
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue'),
      },
      {
        path: '/user',
        name: 'User',
        component: () => import('../views/User.vue'),
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


export default router