import Vue from 'vue'
import Home from './components/Home.vue'
import Login from './components/auth/Login.vue'
import LoginVerify from './components/auth/LoginVerify.vue'
import { IonicVueRouter } from '@ionic/vue'


Vue.use(IonicVueRouter)

export default new IonicVueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      props: true
    },

    {
      path: '/login',
      name: 'login',
      component: Login,
      props: true
    },

    {
      path: '/loginverify',
      name: 'loginverify',
      component: LoginVerify,
      props: true
    },


  ]
})
