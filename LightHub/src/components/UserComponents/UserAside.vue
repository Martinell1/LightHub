<template>
  <aside class="hidden ml-20p w-280 flex-col xl:block">
    <div class="shadow">
      <div class="flex justify-between">
        <div class="follow-item border-r-2">
          <div class="text-second">关注了</div>
          <div class="font-semibold text-first">{{ userInfo.follow_count || 0 }}</div>
        </div>
        <div class="follow-item">
          <div class="text-second">关注者</div>
          <div class="font-semibold text-first">{{ userInfo.fans_count || 0 }}</div>
        </div>
      </div>
    </div>

    <div class="mx-2 ml-2">
      <ul class="text-sm leading-10">
        <li class="sidebar-item">
          关注标签
          <div>{{ (userInfo.tag_list || []).length }}</div>
        </li>
        <li v-if="userInfo" class="sidebar-item">
          加入于
          <div>{{ fmt4Time(userInfo.create_time) }}</div>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { fmt4Time } from '../../util/fmt4Time.js'
const userInfo: any = inject('userInfo');

</script>
<style scoped>
.follow-item {
  @apply text-center w-full my-4 flex flex-col;
}

.sidebar-item {
  @apply flex justify-between border-b-2 py-1 text-second;
}
</style>