import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'babel-polyfill'
import './assets/css/basicStyle.css'
import 'mint-ui/lib/style.css'
import './utils/rem'
import store from './store'
import './utils/filters'
import api from './api'
import Mint from 'mint-ui'
import Vant from 'vant'
import 'vant/lib/index.css'

Vue.prototype.$http = api

Vue.config.productionTip = false

Vue.use(Mint)

Vue.use(Vant)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
