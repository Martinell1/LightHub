<template>
  <div class="card">
    <div v-for="(user,index) in props.userList">
      <div class="flex justify-between items-center text-sm px-5 py-4">
        <router-link :to="{ name: 'User', params: { id: user._id } }">
          <div class="flex items-center">
            <img class="w-11 h-11 rounded-full mr-4 object-cover" :src="user.avater" />
            <!-- <div class="font-semibold mr-1">{{ user.nickname }}</div> -->
            <AuthorInfo :index="index" :author="user"></AuthorInfo>
          </div>
        </router-link>

        <div v-if="user.isFollow" class="btn-primary" @click="followSubmit(user._id)">取消关注</div>
        <div v-if="!user.isFollow" class="btn-plain" @click="followSubmit(user._id)">关注</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AuthorInfo from '../Common/AuthorInfo.vue'
import { followUser } from '@/util/useFollow'
const props: any = defineProps({
  userList: Array
})

setTimeout(() => {
  console.log(props.userList);

}, 2000);

const followSubmit = async (uid) => {
  await followUser(uid);
}


</script>
<style scoped>
</style>