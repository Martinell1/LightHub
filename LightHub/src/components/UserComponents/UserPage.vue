<template>
  <ProfileHeader></ProfileHeader>
  <div class="user_layout">
    <div>
      <ActivityList></ActivityList>
      <MomentCard></MomentCard>
    </div>
    <UserAside></UserAside>
  </div>
</template>

<script setup lang="ts">
import ProfileHeader from './ProfileHeader.vue';
import ActivityList from './ActivityList.vue';
import MomentCard from './MomentCard.vue';
import UserAside from './UserAside.vue';
</script>
<style scoped>
.user_layout {
  @apply w-1000 m-auto mt-4 flex;
}
</style>