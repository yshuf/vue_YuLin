// 项目入口文件
import Vue from 'vue'
import App from './App'

import router from './router' 

import store from './store/index' // 引入 store

import axios from 'axios'   // 引入 axios
axios.defaults.baseURL='http://10.168.14.55:8080/'


import ElementUI from 'element-ui' // 引入 elementUI
import 'element-ui/lib/theme-chalk/index.css'

import echarts from 'echarts' // 引入echarts

import animate from 'animate.css' // 引入动画

Vue.config.productionTip = false

Vue.prototype.$echarts = echarts // 注册组件
Vue.prototype.$axios = axios


Vue.use(ElementUI)
Vue.use(echarts)
Vue.use(animate)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
