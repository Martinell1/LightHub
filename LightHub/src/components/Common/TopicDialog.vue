<template>
  <div class="bg-cover flex">
    <div
      class="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-50 w-140 min-h-60 p-6 flex flex-col"
    >
      <div class="flex">
        <img class="w-10 h-10 rounded-full mr-2" src="../../assets/images/login-bg.jpg" />
        <input v-model="title" class="w-full h-10 pl-2" placeholder="写下你的问题，准确描述问题更方便他人解答" />
      </div>

      <editor
        class="my-4"
        v-model="content"
        :preview="false"
        :toolbars="toolBars"
        style="height:160px"
      ></editor>
      <ChannelAdd @collection="getChannelList"></ChannelAdd>
      <div class="flex justify-end">
        <div
          class="w-24 h-8 bg-blue-600 leading-8 text-center text-sm text-gray-50 rounded cursor-pointer"
          @click="publishTopicSubmit()"
        >发布问题</div>
      </div>
    </div>
    <div
      @click="closeDialog()"
      class="fixed top-1/3 right-1/3 text-3xl text-gray-50 transform -translate-y-5 cursor-pointer"
    >×</div>
  </div>
</template>

<script setup lang="ts">
import ChannelAdd from '../ChannelComponents/ChannelAdd.vue';
import { addTopic } from '../../api/axios';
import Editor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { ref, inject, onMounted, watch } from 'vue'

const emit = defineEmits(['close'])
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

//关闭对话框
const closeDialog = () => {
  emit('close')
}

//接受channelList
const currentChannelList: any = ref([])
const getChannelList = (channelList) => {
  currentChannelList.value = channelList;
}

//发表问题提交
const userInfo: any = inject('userInfo')
const title = ref('')
const content = ref('')
const publishTopicSubmit = async () => {
  const params = new FormData();
  params.append('title', title.value);
  params.append('initiator', userInfo.value._id);
  params.append('introduce', content.value)
  params.append('channel_list', JSON.stringify(currentChannelList.value))

  let { data: result } = await addTopic(params);
  if (result.code === 200) {
    alert('提问成功')
  }
}

</script>
<style scoped>
.bg-cover {
  @apply fixed top-0 h-screen w-full z-10;
  background: rgba(0, 0, 0, 0.3);
}
</style>