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
            redirect: to => {
              return { name: 'MonmentList', params: { id: to.params.id } }
            },
            children: [
              {
                path: 'monment',
                name: 'MonmentList',
                component: () => import('../components/UserComponents/ActionList/MomentList.vue'),
              },
              {
                path: 'article',
                name: 'ArticleList',
                component: () => import('../components/UserComponents/ActionList/ArticleList.vue'),
              },
              {
                path: 'topic',
                name: 'TopicList',
                component: () => import('../components/UserComponents/ActionList/TopicList.vue'),
              },
              {
                path: 'answer',
                name: 'AnswerList',
                component: () => import('../components/UserComponents/ActionList/AnswerList.vue'),
              },
              {
                path: 'follow',
                name: 'FollowList',
                component: () => import('../components/UserComponents/ActionList/FollowList.vue'),
              },
            ]
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
        path: 'editor/:aid?',
        name: 'Editor',
        components: {
          default: () => import('../views/Editor.vue'),
          header: () => import('../components/EditCompoents/EditorHeader.vue'),
        }
      },
      {
        path: 'article/:id',
        name: 'Article',
        components: {
          default: () => import('../views/Article.vue'),
          header: () => import('../components/Common/MainHeader.vue')
        }
      },
      {
        path: 'forum',
        name: 'Forum',
        components: {
          default: () => import('../views/Forum.vue'),
          header: () => import('../components/Common/MainHeader.vue')
        }
      },
      {
        path: 'topic/:id',
        name: 'Topic',
        components: {
          default: () => import('../views/Topic.vue'),
          header: () => import('../components/Common/MainHeader.vue')
        }
      },
      {
        path: 'creator/:id',
        components: {
          default: () => import('../views/Creator.vue'),
          header: () => import('../components/Common/MainHeader.vue')
        },
        children: [
          {
            path: 'home',
            name: 'CreatorHome',
            component: () => import('../components/CreatorComponents/CreatorHome.vue'),
          },
          {
            path: 'article',
            name: 'CreatorArticle',
            component: () => import('../components/CreatorComponents/CreatorArticle.vue'),
          },
          {
            path: 'topic',
            name: 'CreatorTopic',
            component: () => import('../components/CreatorComponents/CreatorTopic.vue'),
          },
          {
            path: 'comment',
            name: 'CreatorComment',
            component: () => import('../components/CreatorComponents/CreatorComment.vue'),
          },
          {
            path: 'collection',
            name: 'CreatorCollection',
            component: () => import('../components/CreatorComponents/CreatorCollection.vue'),
          },
        ]
      }
    ]
  },
]


const router = createRouter({
  history: createWebHistory(),
  routes
})


export default router