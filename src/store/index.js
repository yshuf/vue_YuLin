import Vue from 'vue' //引入 vue
import Vuex from 'vuex' // 引入 vuex
// 使用 vuex
Vue.use(Vuex);


// 创建 vuex 实例
const store = new Vuex.Store({
  state: {
    value: '',
    user: {} // 存放用户信息
  },
  getters: {
    getStateValue(state) {
      return state.value;
    },
    setUser(state) {
      return state.user
    }

  },
  mutations: {
    handleValue(state, n) {
      state.value = n
    },
    setUser(state, user) {
      state.user = user
    }
  },
  actions: {
    handleValue(context, n) {
      context.commit('handleValue', n);
    },
    setUser(context,user){
      context.commit('setUser',user);
    }
  }
})

export default store 