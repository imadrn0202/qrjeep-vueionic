import Vue from 'vue'
import Home from './components/Home.vue'
import LoginVerify from './components/auth/LoginVerify.vue'
import { IonicVueRouter } from '@ionic/vue'
import store from './store/index'
import User from './components/user/User.vue'


Vue.use(IonicVueRouter)

let router = new IonicVueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/loginverify',
      name: 'loginverify',
      component: LoginVerify,
      props: true
    },
    {
      path: '/user/',
      name: 'user',
      component: User,
      meta: { 
        requiresAuth: true
      }
    }

  ]
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/') 
  } else {
    if (store.getters.isLoggedIn) {
      next('/user/')
      return
    }
    next() 
  }
})

export default router
