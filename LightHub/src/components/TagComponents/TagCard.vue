<template>
  <div>
    <div v-for="tag in props.tagList" class="w-60 h-60 py-5 border-2 inline-block mx-5px mb-3">
      <div class="flex flex-col justify-center items-center my-4">
        <img :src="tag.icon" class="w-12 h-12 rounded-full object-cover my-4" />
        <a class="text-lg">{{ tag.name }}</a>
        <div class="flex my-2">
          <div class="mx-2 text-gray-500 text-sm">{{ tag.fans_count }}人关注</div>
          <div class="mx-2 text-gray-500 text-sm">{{ tag.article_count }}篇文章</div>
          <div class="mx-2 text-gray-500 text-sm">{{ tag.topic_count }}个讨论</div>
        </div>

        <div @click="followSubmit(tag._id)" class="mt-2">
          <div v-if="!isFollow(tag.name)" class="btn-plain-mini ring-1 ring-indigo-800">未关注</div>
          <div v-if="isFollow(tag.name)" class="btn-primary-mini">已关注</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { followTag } from '@/util/useFollow'
const props: any = defineProps({
  tagList: Array,
})
const msg: any = inject('Message')
const userInfo: any = inject('userInfo')

//关注
const followSubmit = async (tid) => {
  const result = await followTag(tid);
  if (result.code === 200) {
    msg('success', result.message);
  } else {
    msg('fail', '出现错误' + result.code);
  }
}


//是否关注
const isFollow = (name) => {
  return userInfo.value.tag_list.indexOf(name) > -1 ? true : false
}



</script>
<style  scoped>
</style>
