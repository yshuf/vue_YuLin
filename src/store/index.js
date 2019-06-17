import vue from 'vue'  //引入 vue
import vuex from 'vuex' // 引入 vuex
// 使用 vuex
Vue.use(Vuex);


// 创建 vuex 实例
const store =new Vuex.store({
    state: {

    },
    getters: {  // 用于监听，state中的值的变化，返回计算后的结果，类似 computed
      
    },
    mutations: {

    },
    actions: {  // 注册 actions,相当于 vue 里的 methods


    }
})

export default store  // 导出store