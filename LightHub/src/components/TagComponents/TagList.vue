<template>
  <div class="mt-4">
    <div v-if="route.path === '/tag/all'" class="flex my-4 pl-2">
      <input
        v-model="tagKey"
        type="text"
        class="outline-none rounded border-2 text-sm p-2"
        placeholder="搜索标签"
      />
    </div>
    <TagCard :tagList="filters()"></TagCard>
  </div>
</template>

<script setup lang="ts">
import { ref, inject, onMounted } from 'vue'
import { useRoute } from 'vue-router';
import TagCard from './TagCard.vue';
import { getTagList } from '@/api/tag'
let userInfo: any = inject('userInfo')
const route = useRoute();

const tagList: any = ref([])
const loadTagList = async () => {
  let { data: result } = await getTagList();
  if (result.code == 200) {
    tagList.value = result.data
  }
}

onMounted(async () => {
  await loadTagList()
})

const tagKey = ref('')
const filters = () => {
  if (route.path.indexOf('follow') > 0) {
    return tagList.value.filter(tag => { return userInfo.value.tag_list.includes(tag.name) });
  } else {
    if (tagKey.value === '') {
      return tagList.value;
    } else {
      return tagList.value.filter(tag => tag.name.indexOf(tagKey.value) > -1)
    }
  }
}


</script>
<style scoped>
</style>