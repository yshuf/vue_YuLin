import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const type = {
  SET_AUTHENTICATED :'SET_AUTHENTICATED',
  SET_USER: 'SET_USER'
}
const state ={
  isAuthenticated: false,
  user: {}
}
const getters = {
  isAuthenticated: state=>state.isAuthenticated,
  user: state => state.user
}
const mutations = {
  // 设置是否授权
  [types.SET_AUTHENTICATED](state,isAuthenticated){
    if(isAuthenticated) state.isAuthenticated=isAuthenticated;
    else state.isAuthenticated=false;
  },
  [type.SET_USER](state,user){
    if(user)state.user=user;
    else state.user={};
  }
}
const actions = {
  setAuthenticated: ({commit},isAuthenticated)=>{
    commit(types.SET_AUTHENTICATED,isAuthenticated);
  },
  setUser: ({commit},user)=>{
    commit(type.SET_USER,user);
  }
}

const store = new Vuex.Store({
  type,
  state,
  getters,
  mutations,
  actions
})

// eslint-disable-next-line no-trailing-spaces
export default store
