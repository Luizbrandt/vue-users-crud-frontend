//Vue instance app.
import Vue from 'vue';
import App from './App.vue';

//Vuetify import
import vuetify from './plugins/vuetify';

//Axios and Router - API and pagination
import axios from 'axios';
import router from './router'

//Vuex import
import Vuex from 'vuex'

//CPF mask
import VueTheMask from 'vue-the-mask'


Vue.use(Vuex)
Vue.use(VueTheMask)
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
