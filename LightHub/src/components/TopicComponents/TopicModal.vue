<template>
  <div v-if="isShow" class="bg-cover flex">
    <div
      class="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-50 w-140 min-h-60 p-6 flex flex-col"
    >
      <div class="flex">
        <img class="w-10 h-10 rounded-full mr-2" src="../../assets/images/login-bg.jpg" />
        <input v-model="topic.title" class="w-full h-10 pl-2" placeholder="写下你的问题，准确描述问题更方便他人解答" />
      </div>

      <editor
        class="my-4"
        v-model="topic.introduce"
        :preview="false"
        :toolbars="toolBars"
        style="height:160px"
      ></editor>
      <!-- <TagAdd @collection="getChannelList"></TagAdd> -->
      <TagAdd></TagAdd>
      <div class="flex justify-end">
        <div
          class="w-24 h-8 bg-orange-600 leading-8 text-center text-sm text-gray-50 rounded cursor-pointer"
          @click="publishTopicSubmit()"
        >发布问题</div>
      </div>
    </div>
    <div
      @click="closeDialog()"
      class="absolute top-1/3 right-1/3 text-3xl text-gray-50 transform -translate-y-5 cursor-pointer"
    >×</div>
  </div>
</template>

<script setup lang="ts">
import { addTopic } from '@/api/topic';
import { log } from 'console';
import Editor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { ref, reactive, provide } from 'vue'
import TagAdd from '../TagComponents/TagAdd.vue';

const topic: any = ref({
  title: '',
  introduce: '',
  isUpdate: false,
})

const tag_list: any = ref([])

const setTopic = (topicInfo) => {
  topic.value = topicInfo
  tag_list.value = topicInfo.tag_list
}

provide('tag_list', tag_list)

defineExpose({
  setTopic,
})

//编辑框的工具栏
const toolBars: any = [
  'bold',
  'underline',
  'italic',
  '-',
  'unorderedList',
  'orderedList',
  '-',
  'quote',
  'codeRow',
  'code',
  '-',
  'link',
  'image',
  'table',
]


//发表问题提交

const publishTopicSubmit = async () => {
  const params = new FormData();
  if (topic.value._id) {
    params.append('_id', topic.value._id);
  }
  params.append('title', topic.value.title);
  params.append('introduce', topic.value.introduce)
  params.append('tag_list', JSON.stringify(tag_list.value))

  let { data: result } = await addTopic(params);
  if (result.code === 200) {
    closeDialog()
  }
}

const isShow = ref(true)

//关闭对话框
const closeDialog = () => {
  isShow.value = false
}

</script>
<style scoped>
.bg-cover {
  @apply fixed top-0 h-screen w-full z-10;
  background: rgba(0, 0, 0, 0.3);
}
</style>