import axios from 'axios'
import {baseUrl} from '../globalvariable'



const state = {
    status: '',
    balance: '',
    balanceStatus: ''
};

const actions = {

    async checkBalance({
        commit
    }) {
        commit('balanceStatus', 'loading')
        await axios.post(baseUrl + '/api/checkBalance')
        .then(response => {
            commit('balanceStatus', 'success')
            console.log(response);
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
            .then(response => {
                commit('validating', 'success')
                console.log(response.data);
            })
            .catch(error => { //console
                console.log(error)
                commit('validating', 'error')
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
};


export default {
    state,
    actions,
    mutations
}