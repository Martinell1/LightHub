<template>
  <ProfileHeader></ProfileHeader>
  <div class="user_layout">
    <div>
      <nav class="w-700 bg-gray-50 shadow border-b-2 border-gray-100 h-12">
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
        </div>
      </nav>
      <router-view></router-view>
    </div>
    <UserAside></UserAside>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import ProfileHeader from './ProfileHeader.vue';
import UserAside from './UserAside.vue';

const route = useRoute()

const id = route.params.id;


</script>

<style scoped>
.user_layout {
  @apply w-1000 m-auto mt-4 flex;
}

.item {
  @apply w-20 h-12 flex items-center justify-center;
}

.item-act {
  @apply text-orange-500 border-b-2 border-orange-500;
}
</style>