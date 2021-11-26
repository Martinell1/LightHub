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
        components: {
          default: () => import('../views/Home.vue'),
          header: () => import('../components/Common/MainHeader.vue')
        },
      },
      {
        path: '/user/:id',
        name: 'User',
        component: () => import('../views/User.vue'),
      },
      {
        path: '/editor',
        name: 'Editor',
        components: {
          default: () => import('../views/Editor.vue'),
          header: () => import('../components/EditCompoents/EditorHeader.vue'),
        }
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


export default router