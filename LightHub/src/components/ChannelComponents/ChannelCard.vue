<template>
  <div>
    <div
      v-for="channel: any in props.channelList"
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
          :class="{ 'bg-red-400': isFollow(channel._id) }"
          @click="followSubmit(channel)"
        >
          <div v-if="!isFollow(channel._id)">未关注</div>
          <div v-if="isFollow(channel._id)">已关注</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue'
import { updateFollows } from '../../api/axios'
const props: any = defineProps({
  channelList: Array,
})

const userInfo: any = inject('userInfo')

const followSubmit = async (channel) => {
  let opt = isFollow(channel._id)
  if (opt) {
    //取关
    let index = getIndex(channel._id);
    userInfo.value.follows.splice(index, 1)
  } else {
    userInfo.value.follows.push(channel)
  }

  const params = new FormData();
  params.append('_id', userInfo.value._id);
  params.append('follows', JSON.stringify(userInfo.value.follows));
  let { data: result } = await updateFollows(params);
  if (result.code === 200) {
    console.log(result.data);
  }
}

//获取当前channel在用户关注中的下标，用于删除
const getIndex = (id) => {
  return userInfo.value.follows.map((item) => { return item._id }).indexOf(id)
}

const isFollow = (id) => {
  return getIndex(id) > -1 ? true : false
}


</script>
<style  scoped>
</style>
