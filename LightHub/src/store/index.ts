import { createStore } from 'vuex'


export default createStore({
  state: {
    userInfo: {
      id: localStorage.getItem("id"),
      nickname: localStorage.getItem("nickname"),
      avater: localStorage.getItem("avater"),
    }
  },
  mutations: {
    updateUserInfo(state, userInfo) {
      state.userInfo.id = userInfo.id;
      state.userInfo.nickname = userInfo.nickname;
      state.userInfo.avater = userInfo.avater;
    },

    logOut(state) {
      state.userInfo = {
        id: "",
        nickname: "",
        avater: '',
      }
    },

  },
  actions: {
    asyncUpdateUserInfo(context, userInfo) {
      context.commit("updateUserInfo", userInfo);
    }
  },
  modules: {
  }
})
