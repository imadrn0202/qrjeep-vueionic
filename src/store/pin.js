import axios from 'axios'
import router from '../router';
import {
    baseUrl
} from '../globalvariable'



const state = {
    status: '',
    locked_until: '',
    hasPinStatus: '',
    resetPinStatus: '',
    hasVerifiedEmailStatus: '',
};

const actions = {

    async onPinSubmit({
        commit
    }, data) {
        commit('validating', 'loading')

        await axios.post(baseUrl + '/api/checkPin', {
                data
            })
            .then(response => {
                if (response.data.message == 'wrong pin') {
                    commit('validating', 'wrongPin')
                } else if (response.data.message == 'locked') {
                    commit('validating', 'locked')
                    commit('lockedUntil', response.data.locked_until)
                } else if (response.data.message == 'locked_until') {
                    commit('validating', 'locked_until')
                } else if (response.data.message == 'success' && response.data.verified == true) {
                    commit('validating', 'success')
                    router.push('usertype')
                }

            })
            .catch(error => { //console
                console.log(error)
                commit('validating', 'error')
            })

    },

    async onCheckVerifiedEmailSubmit( {commit} ) {
        commit('hasVerifiedEmailStatus', 'loading')

        await axios.post(baseUrl + '/api/hasVerifiedEmail')
        .then(response => {
            if (response.data.verified == false) {
                commit('hasVerifiedEmailStatus', 'unverified')
            }
            else {
                commit('hasVerifiedEmailStatus', 'success')
                router.push('resetpin')
            }
        })
        .catch(error => { //console
            console.log(error)
            commit('hasVerifiedEmailStatus', 'error')
        })
    },


    async onPinVerificationSubmit( {commit}, data) {
        commit('resetPinStatus', 'loading')

        await axios.post(baseUrl + '/api/updatePin', {
            data
        })
        .then(response => {
            if (response.data.verified == false) {
                commit('resetPinStatus', 'invalid')
            }
            else {
                commit('resetPinStatus', 'success')
                router.push('pin')
            }
        })
        .catch(error => { //console
            console.log(error)
            commit('resetPinStatus', 'error')
        })
    },

    async hasPin( {commit} ) {
        commit('hasPinStatus', 'loading')

        await axios.post(baseUrl + '/api/hasPin')
        .then(response => {
            if (response.data.message == false) {
                commit('hasPinStatus', 'invalid')
            }
            else {
                commit('hasPinStatus', 'success')
            }
        })
        .catch(error => { //console
            console.log(error)
            commit('hasPinStatus', 'error')
        })
    }




};


const mutations = {

    validating: (state, message) => {
        state.status = message
    },

    lockedUntil: (state, message) => {
        state.locked_until = message
    },

    resetPinStatus: (state, message) => {
        state.resetPinStatus = message
    },

    hasPinStatus: (state, message) => {
        state.hasPinStatus = message
    },
    hasVerifiedEmailStatus: (state, message) => {
        state.hasVerifiedEmailStatus = message
    }

};


export default {
    state,
    actions,
    mutations
}