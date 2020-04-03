import Vue from 'vue'
import './plugins/axios'
import VueRouter from 'vue-router'
import App from './App.vue'
import vuetify from './plugins/vuetify'

import 'vuetify/dist/vuetify.min.css'
import router from './router'

import axios from 'axios'
import Vuebar from 'vuebar'


Vue.use(Vuebar)
Vue.use(VueRouter)
Vue.use(vuetify)
Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
