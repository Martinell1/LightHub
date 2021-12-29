<template>
  <div class="hidden card px-5 w-260 mr-5 xl:block" style="min-height:calc(100vh - 100px)">
    <div class="my-6">
      <div class="flex items-center">
        <img class="w-12 h-12 rounded-full mr-2 object-cover" :src="userInfo.avater" />
        <div class="text-gray-700">{{ userInfo.nickname }}</div>
      </div>
      <router-link :to="{ name: 'Editor' }">
        <div class="btn-primary mt-6">写文章</div>
      </router-link>
    </div>
    <div>
      <router-link
        class="side-item"
        active-class="bg-cyan-light text-cyan-dark"
        :to="{ name: 'CreatorHome' }"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
          />
        </svg>
        <div>首页</div>
      </router-link>
      <router-link
        class="side-item"
        active-class="bg-cyan-light text-cyan-dark"
        :to="{ name: 'CreatorArticle' }"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
            clip-rule="evenodd"
          />
        </svg>
        <div>文章管理</div>
      </router-link>
      <router-link
        class="side-item"
        active-class="bg-cyan-light text-cyan-dark"
        :to="{ name: 'CreatorTopic' }"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"
          />
        </svg>
        <div>话题管理</div>
      </router-link>
      <router-link
        class="side-item"
        active-class="bg-cyan-light text-cyan-dark"
        :to="{ name: 'CreatorComment' }"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
            clip-rule="evenodd"
          />
        </svg>
        <div>评论管理</div>
      </router-link>
      <router-link
        class="side-item"
        active-class="bg-cyan-light text-cyan-dark"
        :to="{ name: 'CreatorCollection' }"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"
          />
        </svg>
        <div>收藏集管理</div>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
const userInfo: any = inject('userInfo')


</script>
<style scoped>
.side-item {
  @apply flex py-3 px-2 text-second;
}

.side-item:hover {
  @apply bg-cyan-light text-cyan-dark;
}
</style>