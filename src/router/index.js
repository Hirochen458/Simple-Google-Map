import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import UserLocation from '@/pages/UserLocation'
import CloseBuy from '@/pages/CloseBuy'
import DistanceCalc from '@/pages/DistanceCalc'
import MainPage from '@/pages/MainPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: MainPage

    },
    {
      path: '/user-location',
      name: 'UserLocation',
      component: UserLocation
    },
    {
      path:'/close-buy',
      name:'CloseBuy',
      component: CloseBuy
    },
    {
      path:'/distance-calcuator',
      name:'DistanceCalc',
      component:DistanceCalc
    }

  ]
})
