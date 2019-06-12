import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/news/index'
import Login from '@/components/login'
import Register from '@/components/register'
import History from '@/views/historyInfo/history'
import Header from '@/views/Header/header'
import SystemWarn from '@/views/system/systemWarn'
import Weather from '@/views/todayInfo/weather'
import Yulin from '@/views/todayInfo/yulin'
import About from '@/views/About/about'
import Join from '@/views/About/join'
import HeaderSet from '@/views/Header/HeaderSet'
import WeatherSet from '@/views/Resource/weatherSet'
import YulinSet from '@/views/Resource/yulinSet'
import NotFound from '@/components/404.vue';
import {
  homedir
} from 'os';

Vue.use(Router)

const router = new Router({
  routes: [{
      path: '/',
      name: homedir,
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '*',
      name: '/404',
      component: NotFound
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      children: [{
          path: '/index/header',
          name: 'header',
          component: Header,
          children: [{
              path: '/index/header/weather',
              name: 'weather',
              component: Weather
            },
            {
              path: '/index/header/yulin',
              name: 'yulin',
              component: Yulin
            },
          ]
        },
        {
          path: '/index/headerSet',
          name: 'headerSet',
          component: HeaderSet,
          children: [{
              path: '/index/headerSet/weatherSet',
              name: 'weatherSet',
              component: WeatherSet
            },
            {
              path: '/index/headerSet/yulinSet',
              mame: 'yulinSet',
              component: YulinSet
            }
          ]
        },
        {
          path: '/index/history',
          name: history,
          component: History
        },
        {
          path: '/index/warn',
          name: 'warn',
          component: SystemWarn
        },
        {
          path: '/index/about',
          name: 'about',
          component: About
        },
        {
          path: '/index/join',
          name: 'join',
          component: Join
        }
      ]
    },

  ]

})

// 路由守卫
// router.beforeEach((to,from,next)=>{
//   const isLogin =localStorage.eleToken? true: false;
//   if(to.path=="/"||to.path=="/register"){
//     next();
//   }else {
//     isLogin ? next(): next('/login');
//   }
// })
export default router;
