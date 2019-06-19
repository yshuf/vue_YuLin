import Vue from 'vue'  //引入 vue
import Vuex from 'vuex' // 引入 vuex
// 使用 vuex
Vue.use(Vuex);


// 创建 vuex 实例
const store =new Vuex.Store({
    state: {
        value: ''
    },
    getters: {  
        getStateValue(state){
            return state.value;
        }
    },
    mutations: {
        handleValue(state,n){
            state.value = n
        }
    },
    actions: { 
        handleValue(context, n) {
            context.commit('handleValue', n);
        }
    }
})

export default store  // 导出store




// const type = {
//     SET_AUTHENTICATED :'SET_AUTHENTICATED',
//     SET_USER: 'SET_USER'
//   }
  
//   const state ={
//     isAuthenticated: false,
//     user: {}
//   }
  
//   const getters = {
//     isAuthenticated: state=>state.isAuthenticated,
//     user: state => state.user
//   }
  
//   const mutations = {
//     // 设置是否授权
//     [type.SET_AUTHENTICATED](state,isAuthenticated){
//       if(isAuthenticated) state.isAuthenticated=isAuthenticated;
//       else state.isAuthenticated=false;
//     },
//     [type.SET_USER](state,user){
//       if(user)state.user=user;
//       else state.user={};
//     }
//   }
  
//   const actions = {
//     setAuthenticated: ({commit},isAuthenticated)=>{
//       commit(types.SET_AUTHENTICATED,isAuthenticated);
//     },
//     setUser: ({commit},user)=>{
//       commit(type.SET_USER,user);
//     }
//   }
  
//   const store = new Vuex.Store({
//     type,
//     state,
//     getters,
//     mutations,
//     actions
//   })