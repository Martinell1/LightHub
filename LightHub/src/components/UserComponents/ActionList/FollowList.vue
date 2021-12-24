<template>
  <div class="card">
    <div v-for="user in userList">
      <div class="flex justify-between items-center text-sm px-5 py-4">
        <div class="flex items-center">
          <img class="w-11 h-11 rounded-full mr-4 object-cover" :src="user.avater" />
          <div class="font-semibold mr-1">{{ user.nickname }}</div>
        </div>
        <div v-if="user.isFollow" class="btn-primary" @click="followSubmit(user._id)">取消关注</div>
        <div v-if="!user.isFollow" class="btn-plain" @click="followSubmit(user._id)">关注</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router';
import { getFollowList } from '@/api/user';
import { followUser } from '@/util/useFollow'

const route = useRoute()

const userList: any = ref([])
let page = 0;
const loadUserList = async () => {
  if (page === -1) {
    return
  }
  let { data: result } = await getFollowList(route.params.id, ++page);

  if (result.code === 200) {
    if (result.data.length > 0) {
      userList.value = [...userList.value, ...result.data]
    } else {
      page = -1
    }

  }
}

const followSubmit = async (uid) => {
  await followUser(uid);
}


onMounted(async () => {
  loadUserList()

  window.onscroll = function () {

    if (document.documentElement.clientHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight) {
      loadUserList()
    }
  }
})

onBeforeUnmount(() => {
  window.onscroll = null
})
</script>
<style scoped>
</style>