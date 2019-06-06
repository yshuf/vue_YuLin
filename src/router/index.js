import Vue from 'vue'
import Router from 'vue-router'
// import { Radio } from 'element-ui'
import login from '@/components/login'
import register from '@/components/register'
import index from '@/components/news/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/index',
      name: 'index',
      component: index

    }
  ]
})
