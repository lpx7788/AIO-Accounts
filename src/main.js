// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/'
import {httpClient} from '@/utils/httpClient'
import {projectConfig} from '@/utils/projectConfig'

import Vant from 'vant';
import 'vant/lib/index.css';
import './utils/rem'
let Base64 = require('js-base64').Base64;


Vue.prototype.httpClient = httpClient
Vue.prototype.projectConfig = projectConfig
Vue.config.productionTip = false
import {Lazyload} from 'vant';
Vue.use(Lazyload)
Vue.use(Vant)

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  router,
  template: '<App/>',
  el: '#app',
  components: {App}
})
