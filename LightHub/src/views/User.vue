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
import ProfileHeader from '../components/ProfileHeader.vue';
import ActivityList from '../components/ActivityList.vue';
import MomentCard from '../components/MomentCard.vue';
import UserAside from '../components/UserAside.vue';

</script>
<style scoped>
.user_layout {
  @apply w-1000 m-auto mt-4 flex;
}
</style>