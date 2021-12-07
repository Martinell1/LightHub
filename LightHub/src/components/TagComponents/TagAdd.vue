<template>
  <div class="text-sm text-orange-500">
    <div>
      <ul class="flex flex-wrap">
        <li
          class="mr-2 my-1 py-2 px-4 rounded-full bg-orange-100 text-orange-600 cursor-pointer"
          v-for="tag in currentTagList"
        >
          {{ tag }}
          <span @click="delTag(tag)" class="font-semibold">×</span>
        </li>
        <div
          v-show="isShow.message"
          @click="isShow.message = false; isShow.input = true"
          class="font-semibold text-orange-600 text-sm cursor-pointer my-auto mr-4 py-2"
        >+添加话题{{ currentTagList.length }}/5</div>
        <div v-show="isShow.input" class="relative mr-4 z-10">
          <input
            v-model="tagKey"
            class="ring-1 outline-none ring-orange-500 rounded-full w-48 h-7 my-2 px-4"
          />
          <div
            v-show="openSelect"
            class="shadow absolute outline-none mt-1 left-4 top-10 text-base max-h-40 overflow-y-scroll"
          >
            <li
              v-for="tag in tagList"
              @click="appendList(tag); tagSubmit()"
              class="py-2 px-4 bg-gray-50 text-gray-800 w-40 hover:bg-gray-200"
            >{{ tag }}</li>
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, inject, onMounted } from 'vue'
import { getTagList } from '@/api/tag'
const isShow = reactive({
  message: true,
  input: false
})

const openSelect = ref(false)


const allTagList: any = ref([])
//加载所有的Tag
const loadTagList = async () => {
  let { data: result } = await getTagList();
  if (result.code == 200) {
    allTagList.value = result.data
  }
}

onMounted(async () => {
  await loadTagList()
})


//监听输入框变化
const tagKey = ref('');


const tagList: any = ref([])  //待选TagList

watch(tagKey, () => {
  tagList.value = []
  if (tagKey.value) {
    openSelect.value = true
    allTagList.value.forEach((item: Object) => {
      if (item["name"].indexOf(tagKey.value) > -1) {
        tagList.value.push(item["name"])
      }
    });
  }
})

//将被选中的Tag加入当前List

const msg: any = inject('Message')
const currentTagList: any = ref([])

const appendList = (tag) => {
  let result = currentTagList.value.find(element => element === tag)
  if (!result) {
    if (currentTagList.value.length < 5) {
      currentTagList.value.push(tag)
      tagKey.value = ''
      openSelect.value = false
      isShow.message = true
      isShow.input = false
    }
  } else {

    msg('fail', '该分类您你已添加')
  }
}

//删除标签
const delTag = tag => {
  let index = currentTagList.value.findIndex(element => element === tag);
  currentTagList.value.splice(index, 1)
}

//监听currentTagList的长度
watch(() => [...currentTagList.value], (newValue, oldValue) => {
  console.log(newValue.length);
  if (newValue.length === 5) {
    isShow.message = false
    isShow.input = false
  } else if (newValue.length === 4 && oldValue.length === 5) {
    isShow.message = true
  }
})

//返回数据给上层组件
const emit = defineEmits(['collection'])
const tagSubmit = () => {
  emit('collection', currentTagList.value)
}

</script>
<style  scoped>
</style>