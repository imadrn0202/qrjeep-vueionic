import Vuex from 'vuex'
import Vue from 'vue'
import login from './auth/login'
import register from './auth/register'
import checknumber from './checknumber'
import loginverify from './auth/loginverify'


// Load vuex
Vue.use(Vuex);

//create store
export default new Vuex.Store({
    modules: {
        login,
        register,
        checknumber,
        loginverify
    }
})