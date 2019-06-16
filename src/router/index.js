import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/views/news/index'
import Login from '@/components/login'
import Register from '@/components/register'
import History from '@/views/historyInfo/history'
import HistoryMonth from '@/views/historyInfo/historyMonth'
import HistoryDay from '@/views/historyInfo/day/historyDay'
import Header from '@/views/Header/header'
import SystemWarn from '@/views/system/systemWarn'
import YulinWarn from '@/views/system/yulinWarn'
import Weather from '@/views/todayInfo/weather'
import weatherYear from "@/views/historyInfo/weatherYear";
import yulinYear from "@/views/historyInfo/yulinYear"
import WeatherMouth from '@/views/historyInfo/weatherMonth'
import YulinMouth from '@/views/historyInfo/yulinMonth'
import WeatherDay from '@/views/historyInfo/day/weatherDay'
import YulinDay from '@/views/historyInfo/day/yulinDay'
import Standard from '@/views/todayInfo/standard'
import Yulin from '@/views/todayInfo/yulin'
import About from '@/views/About/about'
import Join from '@/views/About/join'
import HeaderSet from '@/views/Header/HeaderSet'
import HeaderStard from '@/views/header/headerStard'
import WeatherSet from '@/views/Resource/weatherSet'
import YulinSet from '@/views/Resource/yulinSet'
import NotFound from '@/components/404.vue'


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
              path: '/index/header/standard',
              name: 'standard',
              component: Standard
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
