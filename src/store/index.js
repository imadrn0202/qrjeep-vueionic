import Vuex from 'vuex'
import Vue from 'vue'
import checknumber from './checknumber'
import axios from 'axios'
import router from '../router';


// Load vuex
Vue.use(Vuex);


const baseUrl = 'https://sleepy-thicket-43524.herokuapp.com'

//create store
export default new Vuex.Store({
    state: {
        status: '',
        token: localStorage.getItem('token') || '',
    },
    
    
    getters:  {
    
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
                .then(response => {
    
    
                    const token = response.data.access_token
                    localStorage.setItem('token', token)
                    //axios.defaults.headers.common['Authorization'] = token
                    
                    if (response.data.verified == true) {
                    commit('auth_success', token)
                    router.push('User')
                    }
                    else {
                        commit('auth_invalid')
                    }
    
                })
                .catch(error => {
                    commit('auth_error', error)
                    localStorage.removeItem('token')
                    console.log(error)
                })
    
        },
        
        async onLogout({commit}){
            return new Promise((resolve) => {
              commit('logout')
              localStorage.removeItem('token')
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
        logout(state){
            state.status = ''
            state.token = ''
        },
    },
    modules: {
        checknumber
    }
    
})