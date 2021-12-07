<template>
  <div class="mt-4 rounded relative shadow edit-wrap">
    <div class="w-40 h-40 bg-gray-50 rounded-lg ml-4 transform translate-y-3/4">
      <img class="p-1 w-full h-full rounded-full" src="../../assets/images/login-bg.jpg" />
    </div>
    <div class="flex flex-col px-8 ml-48">
      <div class="edit-item justshowy-between">
        <div v-show="!showFormItem.nickname" class="flex">
          <h1 class="font-semibold text-2xl mr-4">{{ userInfo.nickname }}</h1>
          <div class="btn-change" @click="showFormItem.nickname = true">修改</div>
        </div>
        <div v-show="showFormItem.nickname" class="flex">
          <h1 class="form-label">昵称</h1>
          <div>
            <input v-model="userInfo.nickname" type="text" class="outline-none border-2 w-100" />
            <div class="flex mt-4">
              s
              <div
                class="btn-primary-mini"
                @click="showFormItem.nickname = false; updateUserInfoSubmit()"
              >保存</div>
              <div @click="showFormItem.nickname = false" class="btn-plain-mini">取消</div>
            </div>
          </div>
        </div>
        <router-link :to="{ 'name': 'User' }" class="text-sm leading-8 text-orange-500">返回我的主页></router-link>
      </div>
      <div class="edit-item">
        <div class="form-label">性别</div>
        <div v-show="!showFormItem.gender" class="flex">
          <div>{{ userInfo.gender }}</div>
          <div class="btn-change" @click="showFormItem.gender = true">修改</div>
        </div>
        <div v-show="showFormItem.gender">
          <div>
            <input type="radio" v-model="userInfo.gender" v-bind:value="'男'" />男
            <input type="radio" v-model="userInfo.gender" v-bind:value="'女'" />女
          </div>
          <div class="flex mt-4">
            <div
              class="btn-primary-mini"
              @click="showFormItem.gender = false; updateUserInfoSubmit()"
            >保存</div>
            <div @click="showFormItem.gender = false" class="btn-plain-mini">取消</div>
          </div>
        </div>
      </div>
      <div class="edit-item">
        <div class="form-label">手机号码</div>
        <div v-show="!showFormItem.phone" class="flex">
          <div>{{ userInfo.phone }}</div>
          <div class="btn-change" @click="showFormItem.phone = true">修改</div>
        </div>
        <div v-show="showFormItem.phone">
          <input v-model="userInfo.phone" type="text" class="outline-none border-2 w-100" />
          <div class="flex mt-4">
            <div
              class="btn-primary-mini"
              @click="showFormItem.phone = false; updateUserInfoSubmit()"
            >保存</div>
            <div @click="showFormItem.phone = false" class="btn-plain-mini">取消</div>
          </div>
        </div>
      </div>
      <div class="edit-item">
        <div class="form-label">邮箱</div>
        <div v-show="!showFormItem.email" class="flex">
          <div>{{ userInfo.email }}</div>
          <div class="btn-change" @click="showFormItem.email = true">修改</div>
        </div>
        <div v-show="showFormItem.email">
          <input v-model="userInfo.email" type="text" class="outline-none border-2 w-100" />
          <div class="flex mt-4">
            <div
              class="btn-primary-mini"
              @click="showFormItem.email = false; updateUserInfoSubmit()"
            >保存</div>
            <div @click="showFormItem.email = false" class="btn-plain-mini">取消</div>
          </div>
        </div>
      </div>
      <div class="edit-item">
        <div class="form-label">教育经历</div>
        <div v-show="!showFormItem.education" class="flex justshowy-between">
          <div class="flex">
            <div>{{ userInfo.education.school }}</div>
            <span class="mx-2">·</span>
            <div>{{ userInfo.education.major }}</div>
            <span class="mx-2">·</span>
            <div>{{ userInfo.education.edu }}</div>
          </div>
          <div class="btn-change" @click="showFormItem.education = true">修改</div>
        </div>
        <div v-show="showFormItem.education">
          <input
            v-model="userInfo.education.school"
            type="text"
            class="form-education-input"
            placeholder="就读的学校"
          />
          <input
            v-model="userInfo.education.major"
            type="text"
            class="form-education-input"
            placeholder="专业方向"
          />
          <select
            v-model="userInfo.education.edu"
            placeholder="学历"
            class="form-education-input w-44"
          >
            <option class="form-education-option">高中及以下</option>
            <option class="form-education-option">专科</option>
            <option class="form-education-option">本科</option>
            <option class="form-education-option">硕士</option>
            <option class="form-education-option">博士及以上</option>
          </select>
          <div class="flex mt-4">
            <div
              class="btn-primary-mini"
              @click="showFormItem.education = false; updateUserInfoSubmit()"
            >保存</div>
            <div @click="showFormItem.education = false" class="btn-plain-mini">取消</div>
          </div>
        </div>
      </div>
      <div class="edit-item">
        <div class="form-label">一句话简介</div>
        <div v-show="!showFormItem.introduce" class="flex justshowy-between">
          <div>{{ userInfo.introduce }}</div>
          <div class="btn-change" @click="showFormItem.introduce = true">修改</div>
        </div>
        <div v-show="showFormItem.introduce">
          <input v-model="userInfo.introduce" type="text" class="outline-none border-2 w-100" />
          <div class="flex mt-4">
            <div
              class="btn-primary-mini"
              @click="showFormItem.introduce = false; updateUserInfoSubmit()"
            >保存</div>
            <div @click="showFormItem.introduce = false" class="btn-plain-mini">取消</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, inject } from 'vue'
import { updateUserInfo } from '@/api/user'
const userInfo: any = inject('userInfo');

const showFormItem: any = reactive({
  nickname: false,
  introduce: false,
  gender: false,
  phone: false,
  email: false,
  education: false,
})

const msg: any = inject('Message')
const updateUserInfoSubmit = async () => {
  const params = new FormData();
  params.append('_id', userInfo.value._id)
  params.append('nickname', userInfo.value.nickname)
  params.append('introduce', userInfo.value.introduce)
  params.append('gender', userInfo.value.gender)
  params.append('phone', userInfo.value.phone)
  params.append('email', userInfo.value.email)
  params.append('education', JSON.stringify(userInfo.value.education))

  let { data: result } = await updateUserInfo(params);
  if (result.code === 200) {
    userInfo.value = result.data;
    msg('success', '更新成功')
  }
}




</script>
<style scoped>
.edit-wrap::before {
  content: "";
  @apply absolute w-full h-40 bg-gray-300 rounded-t;
}
.edit-item {
  @apply flex  leading-8  py-8 border-b-2;
}

.form-label {
  @apply mr-10 w-20 text-sm font-semibold leading-8;
}

.form-education-input {
  @apply outline-none border-2 px-2 mr-2 rounded text-orange-500;
}

.form-education-option {
  @apply text-orange-500 bg-orange-50 hover:bg-gray-200;
}

.btn-change {
  @apply cursor-pointer leading-8 mx-2 text-orange-500 w-8 opacity-0;
}

.edit-item:hover .btn-change {
  @apply opacity-100 transition-all duration-500 ease-out;
}

.btn-primary-mini {
  @apply min-w-0 px-4 mr-4;
}
.btn-plain-mini {
  @apply min-w-0 px-4 ring-1 ring-orange-500;
}
</style>