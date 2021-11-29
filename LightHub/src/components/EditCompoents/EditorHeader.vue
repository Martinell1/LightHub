<template>
  <div class="h-16 px-8 flex justify-between">
    <input
      v-model="title"
      class="w-1200 h-12 my-2 text-2xl outline-none w-full mr-8"
      placeholder="请输入标题..."
    />
    <div class="flex">
      <div class="btn bg-gray-50 text-blue-500 ring-2">草稿箱</div>
      <div class="btn bg-blue-500 text-gray-50" @click="articleSubmit()">发布</div>
      <img class="w-8 h-8 rounded-full my-4 ml-4" src="../../assets/images/login-bg.jpg" />
    </div>
  </div>
</template>
 
<script setup lang="ts">
import { ref, inject } from 'vue';
import { useStore } from 'vuex';
import { addArticle } from '../../api/axios';
const store = useStore();

const userInfo: any = inject('userInfo')
console.log(userInfo.value);

const title = ref('')
const articleSubmit = async () => {
  const params = new FormData();
  params.append('title', title.value);
  params.append('content', store.state.articleText);
  params.append('author', userInfo.value._id);
  let { data: result } = await addArticle(params);
  if (result.code === 200) {
    alert('发布成功')
  }
}

</script>
<style scoped>
.btn {
  @apply rounded-sm w-20 h-8 my-auto mx-2 text-center leading-8 text-sm cursor-pointer;
}
</style>