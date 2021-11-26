<template>
  <div class="h-16 px-8 flex justify-between">
    <input class="w-1200 h-12 my-2 text-2xl" placeholder="请输入标题..." />
    <div class="flex">
      <div class="btn bg-gray-50 text-blue-500 ring-2">草稿箱</div>
      <div class="btn bg-blue-500 text-gray-50" @click="publish()">发布</div>
      <img class="w-8 h-8 rounded-full my-4 ml-4" src="../../assets/images/login-bg.jpg" />
    </div>
  </div>
</template>
 
<script setup lang="ts">

import { useStore } from 'vuex';
const store = useStore();

const publish = () => {
  const text = store.state.articleText;
  console.log(text);
}

</script>
<style scoped>
.btn {
  @apply rounded-sm w-20 h-8 my-auto mx-2 text-center leading-8 text-sm cursor-pointer;
}
</style>