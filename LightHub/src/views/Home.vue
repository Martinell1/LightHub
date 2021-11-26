<template>
  <ChannelNav></ChannelNav>
  <div class="home_layout">
    <main>
      <div>{{ userInfo }}</div>
      <TopicCard></TopicCard>
    </main>
    <HomeAside></HomeAside>
  </div>
</template>

<script setup lang="ts">
import ChannelNav from '../components/HoneCompoents/ChannelNav.vue';
import TopicCard from '../components/HoneCompoents/TopicCard.vue';
import HomeAside from '../components/HoneCompoents/HomeAside.vue';
import { inject } from 'vue';
const userInfo = inject('userInfo')
console.log("Inject接受", userInfo);
</script>
<style scoped>
.home_layout {
  @apply w-1000 m-auto mt-4 flex;
}
</style>

