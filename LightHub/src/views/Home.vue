<template>
  <ChannelNav></ChannelNav>
  <div class="home_layout">
    <main>
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
const userInfo: any = inject('userInfo')
</script>
<style scoped>
.home_layout {
  @apply w-1000 m-auto mt-4 flex;
}
</style>

