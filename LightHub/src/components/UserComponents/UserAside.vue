<template>
  <aside class="ml-20p w-280 flex-col">
    <div class="bg-gray-50 shadow">
      <div class="flex justify-between">
        <div class="follow-item border-r-2">
          <div>关注了</div>
          <div class="font-semibold">{{ userInfo.follows.length }}</div>
        </div>
        <div class="follow-item">
          <div>关注者</div>
          <div class="font-semibold">{{ userInfo.fans.length }}</div>
        </div>
      </div>
    </div>

    <div class="mx-2 ml-2">
      <ul class="text-sm leading-10">
        <li class="sidebar-item">
          收藏集
          <div>{{ userInfo.collection_list.length }}</div>
        </li>
        <li class="sidebar-item">
          关注标签
          <div>{{ userInfo.tag_list.length }}</div>
        </li>
        <li class="sidebar-item">
          加入于
          <div>{{ userInfo.create_time }}</div>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { inject } from 'vue'
const userInfo: any = inject('userInfo');

</script>
<style scoped>
.follow-item {
  @apply text-center w-full my-4 flex flex-col;
}

.sidebar-item {
  @apply flex justify-between border-b-2 py-1;
}
</style>