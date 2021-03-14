import Vue from 'vue'
import VueRouter from 'vue-router'

//Views Import
import Home from '../views/Home.vue';
import CreateUser from  '../views/CreateUser.vue'

Vue.use(VueRouter)

const routes = [
  //Homepage
  { path: '/', name: 'home', component: Home },

  //Create User
  { path: '/create-users', name: 'create-user', component: CreateUser },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router