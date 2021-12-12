<template>
  <div class="card flex-col flex">
    <div>
      <h1 class="text-xl py-2 text-gray-500">数据概览</h1>
    </div>
    <div class="flex flex-wrap">
      <div class="data-card">
        <div class="text-sm">关注数</div>
        <div class="text-4xl font-semibold">0</div>
      </div>
      <div class="data-card">
        <div class="text-sm">文章</div>
        <div class="text-4xl font-semibold">0</div>
      </div>
      <div class="data-card">
        <div class="text-sm">文章阅读数</div>
        <div class="text-4xl font-semibold">0</div>
      </div>
      <div class="data-card">
        <div class="text-sm">文章点赞数</div>
        <div class="text-4xl font-semibold">0</div>
      </div>
      <div class="data-card">
        <div class="text-sm">文章评论数</div>
        <div class="text-4xl font-semibold">0</div>
      </div>
      <div class="data-card">
        <div class="text-sm">文章收藏数</div>
        <div class="text-4xl font-semibold">0</div>
      </div>
      <div class="data-card">
        <div class="text-sm">讨论数</div>
        <div class="text-4xl font-semibold">0</div>
      </div>
      <div class="data-card">
        <div class="text-sm">讨论阅读数</div>
        <div class="text-4xl font-semibold">0</div>
      </div>
      <div class="data-card">
        <div class="text-sm">讨论回复数</div>
        <div class="text-4xl font-semibold">0</div>
      </div>
      <div class="data-card">
        <div class="text-sm">讨论点赞数</div>
        <div class="text-4xl font-semibold">0</div>
      </div>
      <div class="data-card">
        <div class="text-sm">讨论收藏数</div>
        <div class="text-4xl font-semibold">0</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">


</script>
<style scoped>
.data-card {
  @apply bg-gray-200 p-4 flex flex-col w-80 rounded-lg mb-5;
}

.data-card:nth-child(odd) {
  @apply mr-5;
}
</style>