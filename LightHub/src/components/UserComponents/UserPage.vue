<template>
  <ProfileHeader :currentUserInfo="currentUserInfo"></ProfileHeader>
  <div class="user_layout">
    <div class="w-full">
      <nav class="bg-gray-50 shadow border-b-2 border-gray-100 h-12 w-full">
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
import { useRoute } from 'vue-router';
import ProfileHeader from './ProfileHeader.vue';
import UserAside from './UserAside.vue';
import { getOneById } from '@/api/user';
import { ref, onMounted, provide } from 'vue'

const route = useRoute()

const id = route.params.id

const currentUserInfo = ref({})
const loadUserInfo = async () => {
  const user = await getOneById(id);
  currentUserInfo.value = user
}

provide('loadUserInfo', loadUserInfo)



onMounted(async () => {
  loadUserInfo()
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
  @apply text-indigo-800 border-b-2 border-indigo-800;
}
</style>