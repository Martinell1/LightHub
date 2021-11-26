<template>
  <div class="w-1000 m-auto">
    <ProfileHeader></ProfileHeader>
    <div class="user_layout">
      <div>
        <ActivityList></ActivityList>
        <MomentCard></MomentCard>
      </div>
      <UserAside></UserAside>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProfileHeader from '../components/UserComponents/ProfileHeader.vue';
import ActivityList from '../components/UserComponents/ActivityList.vue';
import MomentCard from '../components/UserComponents/MomentCard.vue';
import UserAside from '../components/UserComponents/UserAside.vue';
</script>
<style scoped>
.user_layout {
  @apply w-1000 m-auto mt-4 flex;
}
</style>