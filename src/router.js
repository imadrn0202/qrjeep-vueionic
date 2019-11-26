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
import ResetPin from './components/user/tabs/ResetPin'
import AddEmail from './components/user/tabs/AddEmail'
import FareMatrix from './components/user/tabs/fare/FareMatrix'
import FareUserType from './components/user/tabs/fare/FareUserType'
import AddBalancePaypal from './components/user/tabs/AddBalancePaypal'
import CreateDriver from './components/operator/CreateDriver'
import DriverList from './components/operator/DriverList'
import FareLogs from './components/user/logs/FareLogs'
import TransactionLogs from './components/user/logs/TransactionLogs'

import DriverLog from './components/operator/logs/DriverLog'
import DriverHome from './components/driver/tabs/DriverHome'
import Reports from './components/operator/Reports'
import DailyReport from './components/operator/DailyReport'
import EditDriver from './components/operator/EditDriver'

Vue.use(IonicVueRouter)

let router = new IonicVueRouter({
  mode: process.env.CORDOVA_PLATFORM ? 'hash' : 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { hideNavigation: true }
    },
    {
      path: '/loginverify',
      name: 'loginverify',
      component: LoginVerify,
      meta: { hideNavigation: true },
      props: true
    },
    /* pin */
    {
      path: '/pin',
      name: 'pin',
      component: Pin,
      props: true,
      meta: { 
        requiresAuth: true,
        hideNavigation: true
      }
    },
    {
      path: '/resetpin',
      name: 'resetpin',
      component: ResetPin,
      props: true,
      meta: { 
        requiresAuth: true,
        hideNavigation: true
      }
    },
    /* end pin */

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
    {
      path: '/user/addemail',
      name: 'addemail',
      component: AddEmail,
      meta: { 
        requiresAuth: true
      }
   
    },
    {
      path: '/user/paypal',
      name: 'paypal',
      component: AddBalancePaypal,
      meta: { 
        requiresAuth: true
      }
   
    },
    {
      path: '/user/farelogs',
      name: 'farelogs',
      component: FareLogs,
      meta: { 
        requiresAuth: true
      }
   
    },

    {
      path: '/user/transactionlogs',
      name: 'transactionlogs',
      component: TransactionLogs,
      meta: { 
        requiresAuth: true
      }
   
    },

    /* fare */
    {
      path: '/user/fare/pay',
      name: 'farematrix',
      component: FareMatrix,
      meta: { 
        requiresAuth: true
      }
   
    },
    {
      path: '/user/fare/type',
      name: 'fareusertype',
      component: FareUserType,
      meta: { 
        requiresAuth: true
      }
   
    },

    /* endfare */
    
    /* end user */
    /* operator */
    {
      path: '/operator',
      name: 'operator',
      component: Operator,
      meta: { 
        requiresAuth: true,
        operator: true
      }
   
    },
    {
      path: '/operator/addbalance',
      name: 'addbalance',
      component: AddBalance,
      meta: { 
        requiresAuth: true,
        operator: true
      }
   
    },
    {
      path: '/operator/createdriver',
      name: 'createdriver',
      component: CreateDriver,
      meta: { 
        requiresAuth: true,
        operator: true
      }
   
    },
    {
      path: '/operator/driverlist',
      name: 'driverlist',
      component: DriverList,
       meta: { 
        requiresAuth: true,
        operator: true
      }
    },
    {
      path: '/operator/reports',
      name: 'driverlist',
      component: Reports,
      meta: {
        requiresAuth: true,
        operator: true
      }
    },
    {
      path: '/operator/dailyreport',
      name: 'dailyreport',
      component: DailyReport,
      meta: {
        requiresAuth: true,
        operator: true
      }
    },
    {
      path: '/operator/editDriver',
      name: 'editdriver',
      component: EditDriver,
      meta: {
        requiresAuth: true,
        operator: true
      }
    },
    {
      path: '/driver/log',
      name: 'driverlog',
      component: DriverLog,
       meta: { 
        requiresAuth: true,
        operator: true
      }
    },
    /* end operator */
    /* driver */
    {
      path: '/driver/home',
      name: 'DriverHome',
      component: DriverHome,
       meta: { 
        requiresAuth: true,
      }
    },
    /* end driver */

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
