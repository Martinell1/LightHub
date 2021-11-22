<template>
  <div class="relative w-screen h-screen overflow-hidden">
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
    <div class="form-wrap left-1/4" :class="{ 'hide': isLogin, 'appear': !isLogin }">
      <form class>
        <input class="input" placeholder="请输入用户名" />
        <input class="input" type="password" />
        <input class="input" type="password" />
        <div class="btn btn-primary">注册</div>
        <div class="btn btn-second" @click="toLogin()">登录</div>
      </form>
    </div>

    <div class="form-wrap right-1/4" :class="{ 'hide': !isLogin, 'appear': isLogin }">
      <form class>
        <input class="input" placeholder="请输入用户名" v-model="userInfo.account" />
        <input class="input" type="password" v-model="userInfo.password" />
        <div class="btn btn-primary">登录</div>
        <div class="btn btn-second" @click="toRegister()">注册</div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { login, register } from '../api/axios';
const isLogin = ref(true);
const userInfo = reactive({
  account: ref(),
  password: ref(),
})
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
  console.log(params);
  let { data: result } = await login(params);
  if (result.code === 200) {
    alert("登录成功")
    localStorage.setItem("token", result.token);
    localStorage.setItem("nickname", result.nickname);
    localStorage.setItem("avater", result.avater);
  } else {
    alert("登录失败")
  }

}
const registerSubmit = async () => {
  let params = new FormData();
  params.append("account", userInfo.account);
  params.append("password", userInfo.password);
  let { data: result } = await register(params);
  if (result.code === 200) {
    alert("注册成功")
  } else {
    alert("注册失败")
  }
}
onMounted(() => {
  console.log('Component is mounted!')
})
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

.form-wrap {
  @apply w-96 rounded border-2 absolute top-1/2 px-12 py-6 transform -translate-y-1/2;
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