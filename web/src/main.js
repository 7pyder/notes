import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Store from './store'
import config from './config'
import router from './route'
import App from './App.vue'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()
Vue.prototype.$http = axios.create({
  baseURL: config.host,
  withCredentials: true
})

Vue.use(Vuex)
const store = new Vuex.Store(Store)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
