<template>
  <div @mouseenter="clickAvater = true" @mouseleave="clickAvater = false" class="relative">
    <div v-if="userInfo.id">
      <img
        class="w-8 h-8 rounded-full m-3 cursor-pointer object-cover xl:w-10 xl:h-10"
        :src="userInfo.avater"
      />
      <ul
        v-show="clickAvater"
        class="absolute rounded bg-white -ml-24 text-second ring-2 ring-gray-200 text-sm z-50"
      >
        <slot></slot>

        <li class="user-opt-item">
          <router-link :to="{ name: 'User', params: { 'id': userInfo.id } }">
            <div class="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="user-opt-item-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              我的主页
            </div>
          </router-link>
        </li>
        <li class="user-opt-item">
          <router-link :to="{ name: 'CreatorHome', params: { 'id': userInfo.id } }">
            <div class="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="user-opt-item-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path
                  d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                />
              </svg>
              创作者中心
            </div>
          </router-link>
        </li>
        <li class="user-opt-item">
          <router-link to="/editor">
            <div class="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="user-opt-item-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>写文章
            </div>
          </router-link>
        </li>
        <li class="user-opt-item" @click="exit()">
          <div class="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="user-opt-item-icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            退出登录
          </div>
        </li>
      </ul>
    </div>
    <div v-if="!userInfo.id">
      <img
        class="w-10 h-10 rounded-full m-3 cursor-pointer object-cover"
        src="@/assets/images/login-bg.jpg"
      />
      <ul
        v-show="clickAvater"
        class="absolute rounded bg-gray-50 -ml-24 text-gray-500 ring-2 ring-gray-200 text-sm z-50"
      >
        <li class="user-opt-item">
          <router-link :to="{ name: 'Login' }">
            <div class="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="user-opt-item-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              登录
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
const store = useStore();
const userInfo = store.state.userInfo;
let clickAvater = ref(false);

const router = useRouter()
const exit = () => {
  store.commit('logOut')
  router.push({
    path: '/login'
  })
}

</script>
<style  scoped>
.user-opt-item {
  @apply w-36 px-4 py-2 right-40 cursor-pointer;
}

.user-opt-item-icon {
  @apply w-5 h-5 mr-1;
}
</style>