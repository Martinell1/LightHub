<template>
  <aside class="ml-20p w-280 flex-col">
    <div class="card px-5 p-4">
      <div class="flex justify-between">
        <div class="flex items-center text-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"
            />
          </svg>创作中心
        </div>
        <span class="text-gray-400 text-sm my-auto">草稿箱</span>
      </div>
      <div class="flex my-4 justify-between text-sm">
        <div class="item" @click="topicModal()">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="item-icon bg-blue-200 text-blue-500"
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
          </svg>
          提出问题
        </div>
        <div class="item">
          <router-link to="/editor">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="item-icon bg-orange-200 text-orange-500"
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
                stroke-width="{2}"
                d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
              />
            </svg>
            写文章
          </router-link>
        </div>
        <div class="item">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="item-icon bg-red-200 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>回答问题
        </div>
      </div>
      <a
        :href="'/creator/' + userInfo._id + '/home'"
        class="ring-1 ring-orange-500 text-center text-sm text-orange-500 p-1 cursor-pointer block"
      >进入创作中心></a>
    </div>

    <div class="card px-5 py-2 mt-4">
      <ul class="text-sm leading-10">
        <li class="sidebar-item">
          <div class="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              />
            </svg> 我关注的问题
          </div>

          <div class="sidebar-item-count">{{ userInfo.star_list.length }}</div>
        </li>
        <li class="sidebar-item">
          <div class="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
              />
            </svg> 我关注的人
          </div>

          <div class="sidebar-item-count">{{ userInfo.follows.length }}</div>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { inject } from 'vue'
const userInfo: any = inject('userInfo')
const topicModal: any = inject('TopicModal');

</script>
<style scoped>
.item {
  @apply flex flex-col items-center text-sm text-gray-500 cursor-pointer;
}

.item-icon {
  @apply h-10 w-10 p-2 rounded-full mb-2;
}

.sidebar-item {
  @apply flex justify-between text-gray-500 hover:bg-gray-100 px-2;
}

.sidebar-item-count {
  @apply w-8 h-8 leading-8 bg-gray-100 text-center rounded my-auto mr-2;
}
</style>
