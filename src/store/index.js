import Vuex from 'vuex'
import Vue from 'vue'
import checknumber from './checknumber'
import axios from 'axios'
import router from '../router';
import balance from './balance'
import {
    baseUrl
} from '../globalvariable'

import pin from './pin'
import addemail from './addemail'
import fare from './fare'
import operator from './operator'
import user from './user'
import driver from './driver'



// Load vuex
Vue.use(Vuex);


//create store
export default new Vuex.Store({
    state: {
        status: '',
        token: localStorage.getItem('token') || '',
    },


    getters: {

        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
    },

    actions: {
        async onLoginVerify({
            commit
        }, verification_code) {

            commit('auth_request')

            await axios.post(baseUrl + '/api/validateLogin', {
                    verification_code
                })
                // eslint-disable-next-line
                .then(response => {

                    const token = response.data.access_token
                    const mob = response.data.mobile_number
                    localStorage.setItem('token', token)
                    localStorage.setItem('mobile_number', mob)
                    //axios.defaults.headers.common['Authorization'] = token



                    if (response.data.verified == true) {
                        commit('auth_success', token)
                        router.push('pin')
                    } else {
                        commit('auth_invalid')
                    }

                })
                .catch(error => {
                    commit('auth_error', error)
                    localStorage.removeItem('token')
                    localStorage.removeItem('mobile_number')
                    console.log(error)
                })

        },

        async onLogout({
            commit
        }) {
            return new Promise((resolve) => {
                commit('logout')
                localStorage.removeItem('token')
                localStorage.removeItem('mobile_number')
                //delete axios.defaults.headers.common['Authorization']
                router.push('/')
                resolve()
            })
        }
    },

    mutations: {
        auth_request: (state) => {
            state.status = 'loading'
        },
        auth_success: (state, token) => {
            state.status = 'success'
            state.token = token
        },
        auth_invalid: (state) => {
            state.status = 'invalid'
        },
        auth_error: (state) => {
            state.status = 'error'
        },
        logout(state) {
            state.status = ''
            state.token = ''
        },
    },
    modules: {
        checknumber,
        balance,
        pin,
        addemail,
        fare,
        operator,
        user,
        driver
    }

})