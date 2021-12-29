<template>
  <div class="text-sm text-cyan-primary">
    <div>
      <ul class="flex flex-wrap">
        <li
          class="mr-2 my-1 py-2 px-4 rounded-full bg-cyan-light text-cyan-dark cursor-pointer flex items-center"
          v-for="tag in tag_list"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
            />
          </svg>
          {{ tag }}
          <span @click="delTag(tag)" class="font-semibold">×</span>
        </li>
        <div
          v-show="isShow.message"
          @click="isShow.message = false; isShow.input = true"
          class="font-semibold text-cyan-primary text-sm cursor-pointer my-auto mr-4 py-2"
        >+添加话题{{ tag_list.length }}/5</div>
        <div v-show="isShow.input" class="relative mr-4 z-10">
          <input
            v-model="tagKey"
            class="ring-1 outline-none ring-cyan-primary rounded-full w-48 h-7 my-2 px-4"
          />
          <div
            v-show="openSelect"
            class="shadow absolute outline-none mt-1 left-4 top-10 text-base max-h-40 overflow-y-scroll"
          >
            <li
              v-for="tag in tagList"
              @click="appendList(tag)"
              class="py-2 px-4 bg-white text-first w-40 hover:bg-bg"
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
const tag_list: any = inject('tag_list')

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

const appendList = (tag) => {
  let result = tag_list.value.find(element => element === tag)
  if (!result) {
    if (tag_list.value.length < 5) {
      tag_list.value.push(tag)
      tagKey.value = ''
      openSelect.value = false
      isShow.message = true
      isShow.input = false
    }
  }
}

//删除标签
const delTag = tag => {
  let index = tag_list.value.findIndex(element => element === tag);
  tag_list.value.splice(index, 1)
}

//监听currentTagList的长度
watch(() => [...tag_list.value], (newValue, oldValue) => {
  console.log(newValue.length);
  if (newValue.length === 5) {
    isShow.message = false
    isShow.input = false
  } else if (newValue.length === 4 && oldValue.length === 5) {
    isShow.message = true
  }
})


</script>
<style  scoped>
</style>