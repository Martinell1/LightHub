import { createRouter, createWebHistory } from 'vue-router'

const routes: Array<any> = [
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
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


export default router