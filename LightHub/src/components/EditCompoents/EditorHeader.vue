<template>
  <div class="h-16 px-8 flex justify-between">
    <input
      v-model="title"
      class="w-900 h-12 my-2 text-2xl outline-none mr-8"
      placeholder="请输入标题..."
    />
    <div class="flex items-center">
      <ChannelAdd @collection="getChannelList"></ChannelAdd>
      <div class="btn bg-gray-50 text-blue-500 ring-2">草稿箱</div>
      <div class="btn bg-blue-500 text-gray-50" @click="articleSubmit()">发布</div>
      <img class="w-8 h-8 rounded-full my-4 ml-4" src="../../assets/images/login-bg.jpg" />
    </div>
  </div>
</template>
 
<script setup lang="ts">
import { ref, inject } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { addArticle } from '../../api/axios';
import ChannelAdd from '../ChannelComponents/ChannelAdd.vue';
const store = useStore();

const userInfo: any = inject('userInfo')

//接受channelList
const currentChannelList: any = ref([])
const getChannelList = (channelList) => {
  currentChannelList.value = channelList
}

const router = useRouter()
const title = ref('')
const articleSubmit = async () => {
  if (store.state.articleText === '') {
    alert("内容不可为空")
    return
  }
  const params = new FormData();
  params.append('title', title.value);
  params.append('content', store.state.articleText);
  params.append('author_id', userInfo.value._id);
  params.append('author_nickname', userInfo.value.nickname);
  params.append('tag_list', currentChannelList.value);

  let { data: result } = await addArticle(params);
  if (result.code === 200) {
    alert('发布成功')
    router.push({
      path: '/'
    })
  }
}


</script>
<style scoped>
.btn {
  @apply rounded-sm w-20 h-8 my-auto mx-2 text-center leading-8 text-sm cursor-pointer;
}
</style>