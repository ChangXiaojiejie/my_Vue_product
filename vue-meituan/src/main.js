// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueJsonp from 'vue-jsonp'
import store from './store'
// import jsonp from 'jsonp'
import './assets/css/index.css'
import './tools/index'
import axios from 'axios'
Vue.config.productionTip = false

Vue.prototype.$http = axios

// Vue.use(router)
Vue.use(VueJsonp)
// Vue.use(jsonp)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  store
})
