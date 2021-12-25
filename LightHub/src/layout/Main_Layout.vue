<template>
  <router-view name="header"></router-view>
  <div class="main_layout">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { ref, provide, onMounted } from 'vue'
import { getOneByToken } from '@/api/user';

const userInfo: any = ref({
  nickname: "",
  avater: "",
  introduce: "",
  follows: [],
  fans: [],
  tag_list: [],
  star_list: [],
  gender: "",
  phone: "",
  email: "",
  education: {
    school: "",
    major: "",
    edu: ""
  },
});
provide('userInfo', userInfo)

const loadUserInfo = async () => {
  const user = await getOneByToken();
  userInfo.value = user
}



onMounted(async () => {
  await loadUserInfo()
})


</script>
<style scoped>
</style>