<template>
  <div class="w-700 bg-gray-50 mt-4 shadow">
    <div class="text-sm px-4 py-2 border-b-2">
      <span class="text-gray-800">内秘心书</span>
      <span class="text-gray-500">赞了这篇文章</span>
    </div>
    <div class="flex px-4 py-2 mt-2 justify-between">
      <div class="flex">
        <img class="w-11 h-11 rounded-full" src="../assets/images/login-bg.jpg" />
        <div class="flex flex-col ml-4">
          <span class="font-semibold">Kaijin</span>
          <span class="text-gray-500 text-sm">某南极贱畜</span>
        </div>
      </div>
      <div class="my-auto text-sm px-2 py-1 ring-1 ring-blue-500 text-blue-500 cursor-pointer">已关注</div>
    </div>

    <div class="border-b-2">
      <div class="pl-19 text-lg font-semibold">MongoDB快速入门</div>
      <div class="pl-19 flex mt-2 mb-4">
        <div
          class="text-sm text-gray-500"
        >虽说现在关系型数据库还是主流，但是面对某些需求的时候，需要非关系型数据库来补充它，学习一个主流的NoSQL数据库还是很有必要的。MongoDB是一个功能丰富的NoSQL数据库，本文整理了它最常用的部分形成了这篇入门教程，</div>
        <img class="w-16 h-16 mx-4 rounded" src="../assets/images/login-bg.jpg" />
      </div>
    </div>

    <div class="flex justify-between">
      <div class="moment-item">点赞</div>
      <div class="moment-item border-l-2 border-r-2">点赞</div>
      <div class="moment-item">点赞</div>
    </div>
  </div>
</template>

<script setup lang="ts">


</script>
<style  scoped>
.moment-item {
  @apply w-full text-center text-sm my-2;
}
</style>
