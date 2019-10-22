import Vue from 'vue'
import Home from './components/Home.vue'
import LoginVerify from './components/auth/LoginVerify.vue'
import { IonicVueRouter } from '@ionic/vue'
import store from './store/index'
import User from './components/user/User.vue'
import MobileQrCode from './components/user/tabs/MobileQrCode'
import AddBalance from './components/operator/tabs/AddBalance'
import Operator from './components/operator/Operator.vue'
import UserType from './components/UserType.vue'
import Pin from './components/user/tabs/Pin.vue'



Vue.use(IonicVueRouter)

let router = new IonicVueRouter({
  mode: process.env.CORDOVA_PLATFORM ? 'hash' : 'history',
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
      path: '/pin',
      name: 'pin',
      component: Pin,
      props: true,
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/usertype',
      name: 'usertype',
      component: UserType,
      props: true,
      meta: { 
        requiresAuth: true
      }
    },

    {
      path: '/user',
      name: 'user',
      component: User,
      meta: { 
        requiresAuth: true
      }
    },
    /* user */
    {
      path: '/user/qrcode',
      name: 'mobileqrcode',
      component: MobileQrCode,
      meta: { 
        requiresAuth: true
      }
   
    },
    /* end user */
    /* operator */
    {
      path: '/operator',
      name: 'operator',
      component: Operator,
      meta: { 
        requiresAuth: true
      }
   
    },
    {
      path: '/operator/addbalance',
      name: 'addbalance',
      component: AddBalance,
      meta: { 
        requiresAuth: true
      }
   
    },
    /* end operator */

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
