import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import(/* webpackChunkName: 'ImportFuncDemo' */ '@/components/Login')
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import(/* webpackChunkName: 'ImportFuncDemo' */ '@/components/Home')
    },
    {
      path: '/about',
      name: 'About',
      component: () => import(/* webpackChunkName: 'ImportFuncDemo' */ '@/components/About')
    }
  ],
  mode: 'history'  //url模式
})
