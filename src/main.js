import Vue from 'vue'
import App from './App.vue'
import './quasar'
import router from './index';

import { RouterLink, RouterView } from 'vue-router'

Vue.component('router-view', RouterView);
Vue.component('router-link', RouterLink);

import {
  Quasar,
  QInput,
  QBtn
} from 'quasar'

Vue.use(Quasar, {
  components: {
    QInput,
    QBtn
  }
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
