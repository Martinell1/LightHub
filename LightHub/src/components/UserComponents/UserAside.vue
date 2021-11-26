<template>
  <aside class="ml-20p w-280 flex-col">
    <div class="bg-gray-50 shadow">
      <div class="flex justify-between">
        <div class="follow-item border-r-2">
          <div>关注了</div>
          <div class="font-semibold">3</div>
        </div>
        <div class="follow-item">
          <div>关注者</div>
          <div class="font-semibold">4</div>
        </div>
      </div>
    </div>

    <div class="mx-2 ml-2">
      <ul class="text-sm leading-10">
        <li class="sidebar-item">
          收藏集
          <div>0</div>
        </li>
        <li class="sidebar-item">
          关注标签
          <div>0</div>
        </li>
        <li class="sidebar-item">
          加入于
          <div>0</div>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup lang="ts">

</script>
<style scoped>
.follow-item {
  @apply text-center w-full my-4 flex flex-col;
}

.sidebar-item {
  @apply flex justify-between border-b-2 py-1;
}
</style>