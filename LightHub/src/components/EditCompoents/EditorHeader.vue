<template>
  <div class="h-16 px-8 flex justify-between">
    <input
      v-model="title"
      class="w-900 h-12 my-2 text-2xl outline-none mr-8"
      placeholder="请输入标题..."
    />
    <div class="flex items-center">
      <TagAdd></TagAdd>
      <div class="btn-plain ring-1 ring-orange-600" @click="saveSubmit()">保存</div>
      <div class="btn-plain ring-1 ring-orange-600 mx-4" @click="articleSubmit()">发布</div>
      <img class="w-8 h-8 rounded-full my-4 ml-4" src="../../assets/images/login-bg.jpg" />
    </div>
  </div>
</template>
 
<script setup lang="ts">
import { ref, inject, provide } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { addArticle, saveArticle } from '@/api/article';
import TagAdd from '../TagComponents/TagAdd.vue';
const store = useStore();
const route = useRoute();
const router = useRouter()

const msg: any = inject('Message')
const userInfo: any = inject('userInfo')

const _id = ref('')

const title = ref('')

const tag_list: any = ref([])
provide('tag_list', tag_list)

if (route.params.aid) {
  _id.value = store.state.editArticle._id;
  title.value = store.state.editArticle.title;
  tag_list.value = store.state.editArticle.tag_list
}

const saveSubmit = async () => {
  const params: any = new FormData();
  params.append('status', 2);
  params.append('title', title.value);
  params.append('content', store.state.articleText);
  params.append('tag_list', JSON.stringify(tag_list.value));

  let { data: result } = await saveArticle(params);
  if (result.code === 200) {
    msg('success', '保存成功')
    router.push({
      name: 'CreatorHome',
      params: { id: userInfo.value._id }
    })
  }
}


const articleSubmit = async () => {
  if (store.state.articleText === '') {
    msg('fail', '内容不可为空')
    return
  }
  const params: any = new FormData();
  if (_id.value) {
    params.append('_id', _id.value)
  }
  console.log(title.value);

  params.append('status', 1);
  params.append('title', title.value);
  params.append('content', store.state.articleText);
  params.append('tag_list', JSON.stringify(tag_list.value));

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