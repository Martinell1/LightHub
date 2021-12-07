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

        <div
          class="bg-orange-500 text-gray-100 text-sm px-4 py-1 rounded my-2 cursor-pointer"
          :class="{ 'bg-red-400': isFollow(tag.name) }"
          @click="followSubmit(tag)"
        >
          <div v-if="!isFollow(tag.name)">未关注</div>
          <div v-if="isFollow(tag.name)">已关注</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue'
import { updateFollowTag } from '@/api/user'
const props: any = defineProps({
  tagList: Array,
})
const msg: any = inject('Message')
const userInfo: any = inject('userInfo')

const followSubmit = async (tag) => {
  const opt: any = isFollow(tag.name);
  const params = new FormData();
  params.append('user_id', userInfo.value._id);
  params.append('tag_id', tag._id);
  params.append('isFollow', opt);
  let { data: result } = await updateFollowTag(params);
  if (result.code === 200) {
    msg("success", '成功')
    userInfo.value.tag_list.push(tag.name)
  }
}

//是否关注
const isFollow = (name) => {
  return userInfo.value.tag_list.indexOf(name) > -1 ? true : false
}



</script>
<style  scoped>
</style>
