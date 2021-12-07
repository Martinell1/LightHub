<template>
  <div @mouseenter="isShow = true" @mouseleave="isShow = false" class="max-h-9">
    <div v-if="props.type === 'topic'" class="flex items-center">
      <img class="w-6 h-6 rounded-full mr-2" src="@/assets/images/login-bg.jpg" />
      <div class="font-semibold mr-4">{{ currentUserInfo.nickname }}</div>
      <div class="text-sm text-gray-500">{{ currentUserInfo.introduce }}</div>
    </div>
    <div v-if="props.type === 'article'" class="flex items-center">
      <div class="font-semibold">{{ currentUserInfo.nickname }}</div>
    </div>
    <div v-if="props.type === 'comment'" class>
      <img class="w-9 h-9 rounded-full mr-2" src="@/assets/images/login-bg.jpg" />
    </div>
    <div v-if="props.type === 'reply'" class>
      <img class="w-6 h-6 rounded-full mr-2" src="@/assets/images/login-bg.jpg" />
    </div>

    <div
      v-show="isShow"
      class="bg-gray-50 absolute p-4 pt-6 shadow-lg ring-2 ring-gray-200 w-100 z-10 m-4 ml-0 hover-block"
    >
      <div class="flex -mt-10">
        <img class="w-16 h-16 rounded-md border-2" src="@/assets/images/login-bg.jpg" />
        <div class="flex flex-col text-sm transform ml-2 justify-end">
          <router-link
            :to="{ name: 'User', params: { 'id': props.id } }"
            class="mr-4 text-orange-600 font-semibold"
          >{{ currentUserInfo.nickname }}</router-link>
          <div class="text-sm text-gray-500">{{ currentUserInfo.introduce }}</div>
        </div>
      </div>
      <div class="flex justify-around my-4">
        <div class="item">
          <div class="item-text">文章数</div>
          <div class="item-count">{{ currentUserInfo.article_count }}</div>
        </div>
        <div class="item">
          <div class="item-text">回答数</div>
          <div class="item-count">{{ currentUserInfo.answer_count }}</div>
        </div>
        <div class="item">
          <div class="item-text">关注者</div>
          <div class="item-count">{{ fans_count }}</div>
        </div>
      </div>
      <div v-if="!identify">
        <div v-show="isFollow" @click="followSubmit()" class="btn-primary">取消关注</div>
        <div v-show="!isFollow" @click="followSubmit()" class="btn-primary">关注他</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject, computed, onMounted } from 'vue'
import { getOneById, updateFollowUser } from '@/api/user'
const props: any = defineProps({
  type: String,
  id: String,
})

//我的信息
const userInfo: any = inject('userInfo')

//当前需要加载的用户的信息
const currentUserInfo: any = ref({})
const loadUserInfo = async () => {
  let { data: result } = await getOneById(props.id);
  if (result.code === 200) {
    currentUserInfo.value = result.data
  }
}

//是否是本人
const identify = computed(() => {
  if (userInfo.value._id === currentUserInfo.value._id) {
    return true;
  }
  return false;
})

//控制显示
const isShow = ref(false)

const fans_count = computed(() => {
  let length = 0;
  try {
    length = currentUserInfo.value.fans.length;
  }
  finally {
    return length;
  }
})


//当前用户在我的关注列表里的位置
const index = computed(() => {
  return userInfo.value.follows.indexOf(currentUserInfo.value._id)
})

//判断当前用户是否已经被关注
const isFollow = computed(() => {
  return index.value > -1 ? true : false
})

//提交按钮
const msg: any = inject('Message')
const followSubmit = async () => {
  const params = new FormData();
  params.append('user_id', userInfo.value._id);
  params.append('followed_user_id', currentUserInfo.value._id);
  let { data: result } = await updateFollowUser(params);

  if (result.code === 200) {
    if (result.data === true) {
      msg("success", '取关成功');
      userInfo.value.follows.splice(index, 1);
      loadUserInfo()
    } else {
      msg("success", '关注成功');
      userInfo.value.follows.push(currentUserInfo.value._id);
      currentUserInfo.value.fans.push(userInfo.value._id)
    }
  }
}

onMounted(async () => {
  loadUserInfo()
})

</script>
<style scoped>
.hover_block::after {
  content: "";
  z-index: -10;
  @apply absolute -inset-5;
}

.item {
  @apply flex flex-col items-center;
}

.item-text {
  @apply text-sm text-gray-500;
}

.item-count {
  @apply font-semibold text-lg text-gray-700;
}
</style>