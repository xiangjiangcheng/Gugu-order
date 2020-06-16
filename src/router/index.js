import Vue from 'vue'
import Router from 'vue-router'
import routes from './router'

Vue.use(Router)
const router = new Router({
  mode: 'hash',
  routes
})

router.beforeEach((to, from, next) => {
  next()
})

router.afterEach((to) => {

})

export default router
