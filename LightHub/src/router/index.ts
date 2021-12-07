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
        path: '',
        components: {
          default: () => import('../views/Home.vue'),
          header: () => import('../components/Common/MainHeader.vue')
        },
        redirect: to => {
          // 方法接收目标路由作为参数
          // return 重定向的字符串路径/路径对象
          return { name: 'Home', params: { 'tag': '' } }
        },
        children: [
          {
            path: '/:tag?',
            name: 'Home',
            component: () => import('../views/Home.vue'),
          }
        ]
      },
      {
        path: '/user/:id',
        components: {
          default: () => import('../views/User.vue'),
          header: () => import('../components/Common/MainHeader.vue')
        },
        children: [
          {
            path: '',
            name: 'User',
            component: () => import('../components/UserComponents/UserPage.vue'),
          },
          {
            path: 'edit',
            name: 'Edit',
            component: () => import('../components/UserComponents/UserEdit.vue'),
          }
        ]
      },
      {
        path: 'tag/',
        name: 'Tag',
        components: {
          default: () => import('../views/Tag.vue'),
          header: () => import('../components/Common/MainHeader.vue')
        },
        children: [
          {
            path: 'follow',
            component: () => import('../components/TagComponents/TagList.vue')
          },
          {
            path: 'all',
            component: () => import('../components/TagComponents/TagList.vue')
          },
        ]
      },
      {
        path: '/editor',
        name: 'Editor',
        components: {
          default: () => import('../views/Editor.vue'),
          header: () => import('../components/EditCompoents/EditorHeader.vue'),
        }
      },
      {
        path: '/article:id',
        name: 'Article',
        components: {
          default: () => import('../views/Article.vue'),
          header: () => import('../components/Common/MainHeader.vue')
        }
      },
      {
        path: '/forum',
        name: 'Forum',
        components: {
          default: () => import('../views/Forum.vue'),
          header: () => import('../components/Common/MainHeader.vue')
        }
      },
      {
        path: '/topic/:id',
        name: 'Topic',
        components: {
          default: () => import('../views/Topic.vue'),
          header: () => import('../components/Common/MainHeader.vue')
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