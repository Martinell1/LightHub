<template>
  <div>
    <div
      v-for="channel in props.channelList"
      class="w-60 h-60 py-5 border-2 inline-block mx-5px mb-3"
    >
      <div class="flex flex-col justify-center items-center my-4">
        <img :src="channel.icon" class="w-12 h-12 rounded-full object-cover my-4" />
        <a class="text-lg">{{ channel.name }}</a>
        <div class="flex my-2">
          <div class="mx-2 text-gray-500 text-sm">{{ channel.fans.length }}人关注</div>
          <div class="mx-2 text-gray-500 text-sm">12篇文章</div>
        </div>

        <div
          class="bg-blue-500 text-gray-100 text-sm px-4 py-1 rounded my-2 cursor-pointer"
          :class="{ 'bg-red-400': isFollow(channel.name) }"
          @click="followSubmit(channel)"
        >
          <div v-if="!isFollow(channel.name)">未关注</div>
          <div v-if="isFollow(channel.name)">已关注</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue'
import { updateFollowTag } from '../../api/axios'
const props: any = defineProps({
  channelList: Array,
})

const userInfo: any = inject('userInfo')

const followSubmit = async (channel) => {
  let opt = isFollow(channel.name)
  if (opt) {
    //取关
    let index = getIndex(channel.name);
    userInfo.value.tag_list.splice(index, 1)
  } else {
    userInfo.value.tag_list.push(channel.name)
  }

  const params = new FormData();
  params.append('_id', userInfo.value._id);
  params.append('tag_list', JSON.stringify(userInfo.value.tag_list));
  let { data: result } = await updateFollowTag(params);
  if (result.code === 200) {
    console.log(result.data);
  }
}

//获取当前channel在用户关注中的下标，用于删除
const getIndex = (name) => {
  return userInfo.value.tag_list.indexOf(name);
}

const isFollow = (name) => {
  return getIndex(name) > -1 ? true : false
}


</script>
<style  scoped>
</style>
