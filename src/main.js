// 项目入口文件
import Vue from 'vue'
import App from './App'

import router from './router'
import vueAxios from 'vue-axios'
import axios from 'axios'

// 导入 elementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 导入 echarts
import echarts from 'echarts' // 引入echarts
import animate from 'animate.css'

Vue.config.productionTip = false

Vue.prototype.$echarts = echarts // 注册组件
// Vue.prototype.$axios = axios
Vue.use(ElementUI)
Vue.use(echarts)
Vue.use(animate)
Vue.use(vueAxios,axios)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
