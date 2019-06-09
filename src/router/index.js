import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/news/index'
import Login from '@/components/login'
import Register from '@/components/register'
import History from '@/views/historyInfo/history'
import TodayInfo from '@/views/todayInfo/home'
import SystemWarn from '@/views/system/systemWarn'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/index',
      name: 'index',
      component: Index,      
      children:[
        {
          path: '/home',
          name: 'home',
          component: TodayInfo
        },
        {
          path: '/history',
          name: history,
          component: History
        },
        {
          path: '/warn',
          name: 'warn',
          component: SystemWarn
        }
      ]
    },

  ]

})
