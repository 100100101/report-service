import Vue from 'vue'
import App from '@/App.vue'
import '@/registerServiceWorker'
import router from '@/router'
import store from '@/store'

import vuetify from '@/plugins/vuetify'
import '@/plugins/axios'

Vue.config.productionTip = false

window.vm = new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
