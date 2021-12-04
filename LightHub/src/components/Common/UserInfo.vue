<template>
  <div v-if="props.type === 'topic'">
    <div
      class="flex items-center relative"
      @mouseenter="isShow = true"
      @mouseleave="isShow = false"
    >
      <img class="w-6 h-6 rounded-full mr-2" src="../../assets/images/login-bg.jpg" />
      <div class="font-semibold mr-4">{{ currentUserInfo.nickname }}</div>
      <div class="text-sm text-gray-500">{{ currentUserInfo.introduce }}</div>
      <div v-show="isShow" class="absolute top-10 bg-gray-200">
        <img class="w-6 h-6 rounded-full mr-2" src="../../assets/images/login-bg.jpg" />
        <div class="font-semibold mr-4">{{ currentUserInfo.nickname }}</div>
        <div class="text-sm text-gray-500">{{ currentUserInfo.introduce }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject, onMounted } from 'vue'
import { getOneById } from '../../api/axios'
const props: any = defineProps({
  type: String,
  id: String,
})

const userInfo = inject('userInfo')

const currentUserInfo: any = ref({})
const loadUserInfo = async () => {
  let { data: result } = await getOneById(props.id);
  if (result.code === 200) {
    currentUserInfo.value = result.data
    console.log(currentUserInfo.value);

  }
}

const isShow = ref(false)

onMounted(async () => {
  loadUserInfo()
})

</script>
<style scoped>
</style>