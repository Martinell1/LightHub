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
      <div class="text-sm text-blue-500">
        <div>
          <ul class="flex flex-wrap">
            <li
              class="mr-4 my-1 py-2 px-4 rounded-full bg-blue-100 text-blue-600 cursor-pointer"
              v-for="channel in currentChannelList"
            >
              {{ channel.name }}
              <span @click="delChannel(channel)" class="font-semibold">×</span>
            </li>
            <div
              v-show="showMessage"
              @click="showMessage = false"
              class="font-semibold text-blue-600 text-sm cursor-pointer my-auto ml-4 py-2"
            >+添加话题{{ currentChannelList.length }}/5</div>
            <div v-show="!showMessage" class="relative ml-1">
              <input
                v-model="channelKey"
                class="ring-1 outline-none ring-blue-500 rounded-full w-44 h-7 my-2 px-4"
              />
              <div
                v-show="openSelect"
                class="shadow absolute outline-none mt-1 top-10 left-5 text-base max-h-40 overflow-y-scroll"
              >
                <li
                  v-for="channel in channelList"
                  @click="appendList(channel)"
                  class="py-2 px-4 bg-gray-50 text-gray-800 w-44 hover:bg-gray-200"
                >{{ channel.name }}</li>
              </div>
            </div>
          </ul>
        </div>
      </div>
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
import { getChannelList, addTopic } from '../../api/axios';
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


const showMessage = ref(true)

const openSelect = ref(false)

//加载所有的Channel
let allChannelList = []

const loadChannelList = async () => {
  let { data: result } = await getChannelList();
  if (result.code === 200) {
    allChannelList = result.data
  }
}

//监听输入框变化
const channelKey = ref('');

const channelList: any = ref([])

watch(channelKey, () => {
  channelList.value = []
  if (channelKey.value) {
    openSelect.value = true
    allChannelList.forEach((item: Object) => {
      if (item["name"].indexOf(channelKey.value) > -1) {
        channelList.value.push(item)
      }
    });
  }

})

//将被选中的Channel加入当前List

const currentChannelList: any = ref([])

const appendList = (channel) => {
  let result = currentChannelList.value.find(element => element === channel)
  if (!result) {
    if (currentChannelList.value.length < 5) {
      currentChannelList.value.push(channel)
      channelKey.value = ''
      openSelect.value = false
      showMessage.value = true
    }
  } else {
    alert('该分类您已添加过')
  }
}

//删除标签
const delChannel = channel => {
  let index = currentChannelList.value.findIndex(element => element === channel);
  currentChannelList.value.splice(index, 1)
}

//监听currentChannelList的长度
watch(() => [...currentChannelList.value], (newValue, oldValue) => {
  if (newValue.length === 5) {
    showMessage.value = false
  } else if (newValue.length === 4 && oldValue.length === 5) {
    showMessage.value = true
  }
})

//关闭对话框
const closeDialog = () => {
  emit('close')
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
  params.append('channel_array', currentChannelList.value.map((item) => { return item._id }))
  let { data: result } = await addTopic(params);
  if (result.code === 200) {
    alert('提问成功')
  }
}

onMounted(async () => {
  loadChannelList()
})

</script>
<style scoped>
.bg-cover {
  @apply fixed top-0 h-screen w-full z-10;
  background: rgba(0, 0, 0, 0.3);
}
</style>