import Vue from 'vue'
import axios from 'axios'
import config from './config'
import router from './route'
import App from './App.vue'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()
Vue.prototype.$http = axios.create({
  baseURL: config.host,
  withCredentials: true
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
