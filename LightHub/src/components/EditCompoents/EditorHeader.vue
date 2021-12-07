<template>
  <div class="h-16 px-8 flex justify-between">
    <input
      v-model="title"
      class="w-900 h-12 my-2 text-2xl outline-none mr-8"
      placeholder="请输入标题..."
    />
    <div class="flex items-center">
      <TagAdd @collection="getTagList"></TagAdd>
      <div class="btn-plain ring-1 ring-orange-600 mx-4">草稿箱</div>
      <div class="btn-primary" @click="articleSubmit()">发布</div>
      <img class="w-8 h-8 rounded-full my-4 ml-4" src="../../assets/images/login-bg.jpg" />
    </div>
  </div>
</template>
 
<script setup lang="ts">
import { ref, inject } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { addArticle } from '@/api/article';
import TagAdd from '../TagComponents/TagAdd.vue';
const store = useStore();

const userInfo: any = inject('userInfo')


//接受tagList
const currentTagList: any = ref([])
const getTagList = (tagList) => {
  currentTagList.value = tagList
}
const msg: any = inject('Message')
const router = useRouter()
const title = ref('')
const articleSubmit = async () => {
  if (store.state.articleText === '') {
    msg('fail', '内容不可为空')
    return
  }
  const params = new FormData();
  params.append('title', title.value);
  params.append('content', store.state.articleText);
  params.append('author', userInfo.value._id);
  params.append('tag_list', JSON.stringify(currentTagList.value));

  let { data: result } = await addArticle(params);
  if (result.code === 200) {
    msg('success', '发布成功')
    router.push({
      path: '/'
    })
  }
}


</script>
<style scoped>
</style>