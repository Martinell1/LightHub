<template>
  <UserCard :userList="userList"></UserCard>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router';
import { getFollowList } from '@/api/user';
import UserCard from '@/components/UserComponents/UserCard.vue'

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