<template>
  <div class="h-16 px-8 flex justify-between">
    <input
      v-model="title"
      class="w-900 h-12 my-2 text-2xl outline-none mr-8"
      placeholder="请输入标题..."
    />
    <div class="flex items-center">
      <TagAdd></TagAdd>
      <div class="btn-plain mr-4" @click="articleSubmit(2)">保存</div>
      <div class="btn-plain" @click="articleSubmit(1)">发布</div>
      <AvaterOpt>
        <li class="user-opt-item">
          <router-link :to="{ name: 'Home' }">
            <div class="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="user-opt-item-icon"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
                />
              </svg>
              首页
            </div>
          </router-link>
        </li>
      </AvaterOpt>
    </div>
  </div>
</template>
 
<script setup lang="ts">
import { ref, inject, provide } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { addArticle } from '@/api/article';
import TagAdd from '../TagComponents/TagAdd.vue';
import AvaterOpt from '../Common/AvaterOpt.vue';
const store = useStore();
const route = useRoute();
const router = useRouter()

const msg: any = inject('Message')

const _id = ref('')

const title = ref('')

const tag_list: any = ref([])
provide('tag_list', tag_list)

if (route.params.aid) {
  _id.value = store.state.editArticle._id;
  title.value = store.state.editArticle.title;
  tag_list.value = store.state.editArticle.tag_list
}


const articleSubmit = async (status) => {
  if (title.value === '') {
    msg('fail', '标题不可为空')
    return
  }
  if (store.state.articleText === '') {
    msg('fail', '内容不可为空')
    return
  }
  if (title.value.length > 20) {
    msg('fail', '标题过长')
    return ''
  }
  const params: any = new FormData();
  if (_id.value) {
    params.append('_id', _id.value)
  }
  params.append('status', status);
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
.user-opt-item {
  @apply w-36 px-4 py-2 right-40 cursor-pointer;
}

.user-opt-item-icon {
  @apply w-5 h-5 mr-1;
}
</style>