<template>
  <div class="card fixed w-260">
    <div class="my-6">
      <div class="flex items-center">
        <img class="w-12 h-12 rounded-full mr-2" src="@/assets/images/login-bg.jpg" />
        <div class="text-gray-700">{{ userInfo.nickname }}</div>
      </div>
      <div class="btn-primary mt-6">写文章</div>
    </div>
    <div>
      <div>首页</div>
      <div>文章管理</div>
      <div>话题管理</div>
      <div>评论管理</div>
      <div>收藏集管理</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
const userInfo: any = inject('userInfo')


</script>
<style scoped>
</style>