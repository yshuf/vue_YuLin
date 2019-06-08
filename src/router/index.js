import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/news/index'
import login from '@/components/login'
import register from '@/components/register'
import history from '@/views/historyInfo/history'
import todayInfo from '@/views/todayInfo/home'
import systemWarn from '@/views/system/systemWarn'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      children: [
        {
            path: '/index/history',
            name: 'history',
            component: history
        }
      ]
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/home',
      name: 'home',
      component: todayInfo
    },
    {
      path: '/warn',
      name: 'warn',
      component: systemWarn
    }
  ]

})
