<template>
  <ProfileHeader :currentUserInfo="currentUserInfo"></ProfileHeader>
  <div class="user_layout">
    <div class="w-full">
      <nav class="shadow border-b-2 h-12 w-full">
        <div class="flex">
          <router-link :to="{ name: 'MonmentList', params: { 'id': id } }" active-class="item-act">
            <div class="item">动态</div>
          </router-link>
          <router-link :to="{ name: 'ArticleList', params: { 'id': id } }" active-class="item-act">
            <div class="item">文章</div>
          </router-link>
          <router-link :to="{ name: 'TopicList', params: { 'id': id } }" active-class="item-act">
            <div class="item">话题</div>
          </router-link>
          <router-link :to="{ name: 'AnswerList', params: { 'id': id } }" active-class="item-act">
            <div class="item">回答</div>
          </router-link>
          <router-link :to="{ name: 'FollowList', params: { 'id': id } }" active-class="item-act">
            <div class="item">关注</div>
          </router-link>
        </div>
      </nav>
      <router-view class="w-full"></router-view>
    </div>

    <UserAside :currentUserInfo="currentUserInfo"></UserAside>
  </div>
</template>

<script setup lang="ts">
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
import ProfileHeader from './ProfileHeader.vue';
import UserAside from './UserAside.vue';
import { getOneById } from '@/api/user';
import { ref, onMounted, provide } from 'vue'
const route = useRoute()

const id: any = ref(route.params.id)

onBeforeRouteUpdate(async (to, from) => {
  //仅当 id 更改时才获取用户，例如仅 query 或 hash 值已更改
  if (to.params.id !== from.params.id) {

    id.value = to.params.id
    loadUserInfo(id.value);
  }
})



const currentUserInfo = ref({})
const loadUserInfo = async (uid) => {
  currentUserInfo.value = await getOneById(uid);
}

provide('loadUserInfo', loadUserInfo)



onMounted(async () => {
  loadUserInfo(id.value)
})



</script>

<style scoped>
.user_layout {
  @apply w-full m-auto mt-4 flex xl:w-1000;
}

.item {
  @apply flex items-center justify-between xl:justify-center w-14 h-12 xl:w-20;
}

.item-act {
  @apply text-cyan-primary border-b-2  border-cyan-primary;
}
</style>