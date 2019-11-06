import axios from 'axios'
import {baseUrl} from '../globalvariable'



const state = {
    status: '',
    balance: '',
    balanceStatus: '',
    paypalStatus: ''
};

const actions = {

    async checkBalance({
        commit
    }) {
        commit('balanceStatus', 'loading')
        await axios.post(baseUrl + '/api/checkBalance')
        // eslint-disable-next-line        
        .then(response => {
            commit('balanceStatus', 'success')
            commit('balance', response.data.balance)
        })
        .catch(error => {
            console.log(error)
            commit('balanceStatus', 'error')
        })
    },

    async onAddBalanceSubmit({
        commit
    }, data) {
        commit('validating', 'loading')
        console.log(state.status);

        await axios.post(baseUrl + '/api/addBalance', {
            data
            })
            // eslint-disable-next-line  
            .then(response => {
                commit('validating', 'success')
            })
            .catch(error => { //console
                console.log(error)
                commit('validating', 'error')
            })

    },

    async onAddBalancePaypalSubmit({
        commit
    }, data) {
        commit('paypalStatus', 'loading')
        console.log(state.status);

        await axios.post(baseUrl + '/api/paypal', {
            data
            })
            // eslint-disable-next-line  
            .then(response => {
                commit('paypalStatus', 'success')
            })
            .catch(error => { //console
                console.log(error)
                commit('paypalStatus', 'error')
            })

    }


    


};


const mutations = {

    validating: (state, message) => {
        state.status = message
    },

    balance: (state, message) => {
        state.balance = message
    },

    balanceStatus: (state, message) => {
        state.balanceStatus = message
    },

    paypalStatus: (state, message) => {
        state.paypalStatus = message
    },
};


export default {
    state,
    actions,
    mutations
}