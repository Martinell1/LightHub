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
import HomeAside from '../components/HomeAside.vue';
import ChannelNav from '../components/ChannelNav.vue';
import TopicCard from '../components/TopicCard.vue';

</script>
<style scoped>
.home_layout {
  @apply w-1000 m-auto mt-4 flex;
}
</style>

