<template>
  <router-view name="header"></router-view>
  <div class="main_layout">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { ref, provide, onMounted } from 'vue'
import { useStore } from 'vuex';
import { getOneById, getChannelList } from '../api/axios';
//提供用户信息
const store = useStore();
const id: String = store.state.userInfo.id;
const userInfo: any = ref({});

const loadUserInfo = async () => {
  let { data: result } = await getOneById(id);
  if (result.code === 200) {
    userInfo.value = result.data
    userInfo.value.id = userInfo.value._id;
  }
}
provide('userInfo', userInfo)

//提供channel信息
const channelList = ref([]);

const loadChannelList = async () => {
  let { data: result } = await getChannelList();
  if (result.code === 200) {
    channelList.value = result.data;
  }
}

provide('channelList', channelList)

onMounted(async () => {
  loadUserInfo()
  loadChannelList()

})


</script>
<style scoped>
</style>