import Vue from 'vue'
import Router from 'vue-router'

// 登录，注册，首页
import Index from '@/views/news/index'
import Login from '@/components/login'
import Register from '@/components/register'

import Header from '@/views/Header/header'
import SystemWarn from '@/views/system/systemWarn'
import YulinWarn from '@/views/system/yulinWarn'

// 年
import History from '@/views/historyInfo/year/history'
import weatherYear from "@/views/historyInfo/year/weatherYear";
import yulinYear from "@/views/historyInfo/year/yulinYear"

// 月
import HistoryMonth from '@/views/historyInfo/month/historyMonth'
import WeatherMouth from '@/views/historyInfo/month/weatherMonth'
import YulinMouth from '@/views/historyInfo/month/yulinMonth'

// 日
import HistoryDay from '@/views/historyInfo/day/historyDay'
import WeatherDay from '@/views/historyInfo/day/weatherDay'
import YulinDay from '@/views/historyInfo/day/yulinDay'

import HeaderStard from '@/views/header/headerStard'
import Yulin from '@/views/todayInfo/yulin'
import Weather from '@/views/todayInfo/weather'
import About from '@/views/About/about'

import Join from '@/views/About/join'
import HeaderSet from '@/views/Header/HeaderSet'
import WeatherSet from '@/views/Resource/weatherSet'
import YulinSet from '@/views/Resource/yulinSet'
// 404 
import NotFound from '@/components/404'


Vue.use(Router)

const router = new Router({
  routes: [{
      path: '/',
      name: 'home',
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
            }
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
          path: '/index/headerStard',
          name: 'stard',
          component: HeaderStard,
          children: [{
              path: '/index/headerStard/weatherWarn',
              name: 'weatherWarn',
              component: SystemWarn
            },
            {
              path: '/index/headerStard/yulinWarn',
              name: 'yulinWarn',
              component: YulinWarn
            }
          ]
        },
        {
          path: '/index/history',
          name: 'history',
          component: History,
          children:[
            {
              path: '/index/history/weatherYear',
              name: 'weatherYear',
              component: weatherYear
            },
            {
              path: '/index/history/yulinYear',
              name: 'yulinYear',
              component: yulinYear
            }
          ]
        },
        {
          path: '/index/historyMonth',
          name: 'historyMonth',
          component: HistoryMonth,
          children:[
            {
              path: '/index/historyMonth/weatherMonth',
              name: 'weatherMouth',
              component: WeatherMouth
            },
            {
              path: '/index/historyMonth/yulinMonth',
              name: 'yulinMouth',
              component: YulinMouth
            }
          ]
        },
        {
          path: '/index/historyDay',
          name: 'historyDay',
          component: HistoryDay,
          children: [
            {
              path: '/index/historyDay/weatherDay',
              name: 'weatherDay',
              component: WeatherDay
            },
            {
              path: '/index/historyDay/yulinDay',
              name: 'yulinDay',
              component: YulinDay
            }
          ]
        },
        // {
        //   path: '/index/warn',
        //   name: 'warn',
        //   component: SystemWarn
        // },
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
