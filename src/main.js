import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import axios from 'axios';
import router from './router'
import Vuex from 'vuex'
//vue-mask


Vue.use(Vuex)
Vue.use(axios);
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
