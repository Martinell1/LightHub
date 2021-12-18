import { createStore } from 'vuex'


export default createStore({
  state: {
    userInfo: {
      id: localStorage.getItem("id"),
      nickname: localStorage.getItem("nickname"),
      avater: localStorage.getItem("avater"),
    },
    articleText: "",
    editArticle: {
      _id: '',
      title: '',
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

    updateArticleText(state, articleText) {
      state.articleText = articleText
    },

    updateEditArticle(state, editArticle) {
      state.editArticle = editArticle
    }

  },
  actions: {
    asyncUpdateUserInfo(context, userInfo) {
      context.commit("updateUserInfo", userInfo);
    }
  },
  modules: {
  }
})
