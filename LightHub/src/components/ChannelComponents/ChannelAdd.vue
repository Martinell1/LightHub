<template>
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
        <div v-show="!showMessage" class="relative ml-1 z-10">
          <input
            v-model="channelKey"
            class="ring-1 outline-none ring-blue-500 rounded-full w-48 h-7 my-2 px-4"
          />
          <div
            v-show="openSelect"
            class="shadow absolute outline-none mt-1 left-4 top-10 text-base max-h-40 overflow-y-scroll"
          >
            <li
              v-for="channel in channelList"
              @click="appendList(channel); channelSubmit()"
              class="py-2 px-4 bg-gray-50 text-gray-800 w-40 hover:bg-gray-200"
            >{{ channel.name }}</li>
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, inject } from 'vue'
const showMessage = ref(true)

const openSelect = ref(false)

//加载所有的Channel
let allChannelList: any = inject('channelList')


//监听输入框变化
const channelKey = ref('');

const channelList: any = ref([])

watch(channelKey, () => {
  channelList.value = []
  if (channelKey.value) {
    openSelect.value = true
    allChannelList.value.forEach((item: Object) => {
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

//返回数据给上层组件
const emit = defineEmits(['collection'])
const channelSubmit = () => {
  //currentChannelList.value.map((item) => { return item._id })
  emit('collection', currentChannelList.value)
}

</script>
<style  scoped>
</style>