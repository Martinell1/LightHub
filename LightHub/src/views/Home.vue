<template>
  <SecondNav type="channelList"></SecondNav>
  <div class="home_layout">
    <main>
      <TopicCard></TopicCard>
    </main>
    <HomeAside></HomeAside>
  </div>
</template>

<script setup lang="ts">
import SecondNav from '../components/Common/SecondNav.vue';
import TopicCard from '../components/HoneCompoents/TopicCard.vue';
import HomeAside from '../components/HoneCompoents/HomeAside.vue';


</script>
<style scoped>
.home_layout {
  @apply w-1000 m-auto mt-4 flex;
}
</style>

