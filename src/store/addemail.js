import axios from 'axios'
import {baseUrl} from '../globalvariable'



const state = {
    status: '',
    addEmailStatus: '',
    verifyEmailStatus: '',
    verify: false,
};

const actions = {

    async onAddEmailSubmit({
        commit
    }, data) {
        commit('addEmailStatus', 'loading')

        await axios.post(baseUrl + '/api/addEmail', {
            data
            })
            .then(response => {

                if (response.data.message == 'verify') {
                    commit('addEmailStatus', 'verify')
                    commit('verify')
                }
                else {
                    commit('addEmailStatus', 'existing')
                }

            })
            .catch(error => { //console
                console.log(error)
                commit('addEmailStatus', 'error')
            })

    },

    async onVerifyEmailSubmit({
        commit
    }, data) {
        commit('verifyEmailStatus', 'loading')

        await axios.post(baseUrl + '/api/verifyEmail', {
            data
            })
            .then(response => {

                if (response.data.verified == false) {
                    commit('verifyEmailStatus', 'invalid')
                }
                else {
                    commit('verifyEmailStatus', 'success')
                }

            })
            .catch(error => { //console
                console.log(error)
                commit('verifyEmailStatus', 'error')
            })

    }

    


};


const mutations = {

    validating: (state, message) => {
        state.status = message
    },
    addEmailStatus: (state, message) => {
        state.addEmailStatus = message
    },
    verifyEmailStatus: (state, message) => {
        state.verifyEmailStatus = message
    },
    verify: (state) => {
        state.verify = true
    }
};


export default {
    state,
    actions,
    mutations
}