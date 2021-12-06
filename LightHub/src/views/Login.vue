<template>
  <div class="relative w-screen h-screen overflow-hidden">
    <div class="invisible xl:visible">
      <div
        class="absolute bottom-1/4 w-2000 h-2000 rounded-full bg-blue-500 z-10"
        :class="{ 'bg-login': isLogin, 'bg-register': !isLogin }"
      ></div>
      <img
        class="bg-pic"
        :class="{ 'bg-pic-login': isLogin, 'bg-pic-login-left': !isLogin }"
        src="../assets/log.svg"
      />
      <img
        class="bg-pic"
        :class="{ 'bg-pic-register': !isLogin, 'bg-pic-register-left': isLogin }"
        src="../assets/register.svg"
      />
    </div>

    <div class="realtive" :class="{ 'hide': isLogin, 'appear': !isLogin }">
      <div class="form-title left-1/4 ml-20">
        <p class="my-8 text-5xl">LightHub</p>
        <p class="text-3xl">注册</p>
      </div>
      <div class="form-wrap left-1/4">
        <form class="form">
          <input class="input" placeholder="请输入用户名" v-model="userInfo.account" />
          <input class="input" type="password" v-model="userInfo.password" />
          <input class="input" type="password" v-model="userInfo.password" />
          <div class="btn btn-primary" @click="registerSubmit()">注册</div>
          <div class="btn btn-second" @click="toLogin()">已有账号？请登录</div>
        </form>
      </div>
    </div>

    <div class="realtive" :class="{ 'hide': !isLogin, 'appear': isLogin }">
      <div class="form-title right-1/4 mr-20">
        <p class="my-8 text-5xl">LightHub</p>
        <p class="text-3xl">登录</p>
      </div>
      <div class="form-wrap right-1/4">
        <form class="form">
          <input class="input" placeholder="请输入用户名" v-model="userInfo.account" />
          <input class="input" type="password" v-model="userInfo.password" />
          <div class="btn btn-primary" @click="loginSubmit()">登录</div>
          <div class="btn btn-second" @click="toRegister()">尚未拥有账号？请注册</div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, inject } from 'vue';
import { useStore } from "vuex";
import { useRouter } from 'vue-router';
import { login, register, getOneByToken } from '@/api/user';
const store = useStore();
const router = useRouter();
const isLogin = ref(true);
const userInfo = reactive({
  account: ref("admin"),
  password: ref("123456"),
})

const msg: any = inject('Message');
const toLogin = () => {
  isLogin.value = true
}
const toRegister = () => {
  isLogin.value = false
}
const loginSubmit = async () => {
  let params = new FormData();
  params.append("account", userInfo.account);
  params.append("password", userInfo.password);
  let { data: result } = await login(params);
  if (result.code === 200) {
    const token = result.data;
    localStorage.setItem("token", token);
    let { data: res } = await getOneByToken(token);
    if (res.code === 200) {
      let userInfo = res.data;
      localStorage.setItem("id", userInfo._id);
      localStorage.setItem("nickname", userInfo.nickname);
      localStorage.setItem("avater", userInfo.avater);
      store.commit('updateUserInfo', { "id": userInfo._id, "nickname": userInfo.nickname, "avater": userInfo.avater })
      // store.commit('updateUserInfo', { userInfo })
      msg('success', '登录成功')
      router.push({
        name: 'Home',
        params: { 'tag': '' },
      })


    }
  } else {
    msg('fail', '登录失败')
  }
}

const registerSubmit = async () => {
  let params = new FormData();
  params.append("account", userInfo.account);
  params.append("password", userInfo.password);
  let { data: result } = await register(params);
  if (result.code === 200) {
    msg('success', '注册成功')
  } else {
    msg('fail', '注册失败')
  }
}



</script>
<style scoped>
.bg-login {
  @apply transition-transform duration-3600 ease-in-out transform -translate-x-1/2;
}

.bg-register {
  @apply transition-transform duration-3600 ease-in-out transform translate-x-1/2;
}

.bg-pic {
  @apply absolute w-96 top-1/2 z-20;
}
.bg-pic-login {
  @apply transform translate-x-80 transition-transform duration-1000 delay-700 ease-in-out;
}

.bg-pic-login-left {
  @apply transform -translate-x-60 transition-transform duration-1000 delay-700 ease-in-out;
}

.bg-pic-register-left {
  @apply transition-transform duration-1000 delay-700 ease-in-out;
  transform: translateX(calc(100vw - 10rem));
}
.bg-pic-register {
  @apply transition-transform duration-1000 delay-700 ease-in-out;
  transform: translateX(75rem);
}

.form-title {
  @apply text-blue-700 font-bold transform -translate-y-1/2 top-1/5 absolute;
}

.form-wrap {
  @apply absolute top-1/2 transform -translate-y-1/2;
}

.form {
  @apply w-96 rounded border-2 px-12 py-6;
}

.hide {
  @apply opacity-0 transition-opacity duration-1400 delay-1000 ease-in-out;
}

.appear {
  @apply opacity-100 transition-opacity duration-1400 delay-1000 ease-in-out;
}

.input {
  @apply mb-3 w-full h-10 leading-6 rounded-full border-2 bg-blue-800 text-blue-50;
  text-indent: 1rem;
}

.btn {
  @apply my-3 leading-8 text-center border-2 rounded cursor-pointer;
}

.btn-primary {
  @apply bg-blue-400 text-blue-100;
}

.btn-second {
  @apply bg-blue-100 text-blue-400 mb-0;
}
</style>