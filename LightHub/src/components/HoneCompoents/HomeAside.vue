<template>
  <aside class="ml-20p w-280 flex-col">
    <div class="card p-4">
      <div class="flex justify-between">
        <div class="inline-block">创作中心</div>
        <span class="text-gray-400 text-sm my-auto">草稿箱</span>
      </div>
      <div class="flex my-4 justify-between text-sm">
        <div>提出问题</div>
        <div>写文章</div>
        <div>回答问题</div>
      </div>
      <div class="ring-2 ring-blue-500 text-center text-sm text-blue-500 p-1">进入创作中心></div>
    </div>

    <div class="card py-2 mt-4">
      <ul class="text-sm leading-10">
        <li class="sidebar-item">
          我的收藏
          <div class="sidebar-item-count">0</div>
        </li>
        <li class="sidebar-item">
          我关注的问题
          <div class="sidebar-item-count">0</div>
        </li>
        <li class="sidebar-item">
          我关注的人
          <div class="sidebar-item-count">0</div>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup lang="ts">


</script>
<style scoped>
.card {
  @apply flex flex-col bg-gray-50 rounded shadow w-full;
}

.sidebar-item {
  @apply flex justify-between hover:bg-gray-200 px-2;
}

.sidebar-item-count {
  @apply w-8 h-8 leading-8 bg-gray-200 text-center rounded my-auto mr-2;
}
</style>
