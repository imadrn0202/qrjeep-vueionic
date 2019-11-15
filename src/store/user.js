import axios from 'axios'
//import router from '../router';
import {baseUrl} from '../globalvariable'



const state = {
    userFareLogsStatus: '',
    userTransactionLogsStatus: '',
    userFareLogs: [],
    userTransactionLogs: []
};

const actions = {


    async onUserFareLogs({
        commit
    }) {
        commit('userFareLogsStatus', 'loading')

        await axios.get(baseUrl + '/api/getUserPaymentLogs')
            .then(response => {
               
                let userFareLogs = response.data;
                commit('setUserFareLogs', userFareLogs)
                commit('userFareLogsStatus', 'success')

            })
            .catch(error => { //console
                console.log(error)
                commit('userFareLogsStatus', 'error')
            })

    },

    async onUserTransactionLogs({
        commit
    }) {
        commit('userTransactionLogsStatus', 'loading')

        await axios.get(baseUrl + '/api/getUserTransactionLogs')
            .then(response => {
               
                let userTransactionLogs = response.data;
                commit('setUserTransactionLogs', userTransactionLogs)
                commit('userTransactionLogsStatus', 'success')

            })
            .catch(error => { //console
                console.log(error)
                commit('userTransactionLogsStatus', 'error')
            })

    },


    


};


const mutations = {

    userFareLogsStatus: (state, message) => {
        state.userFareLogsStatus = message
    },

    userTransactionLogsStatus: (state, message) => {
        state.userTransactionLogsStatus = message
    },

    setUserFareLogs (state, userFareLogs) {
        state.userFareLogs = userFareLogs;
    },

    setUserTransactionLogs (state, userTransactionLogs) {
        state.userTransactionLogs = userTransactionLogs;
    },

};


export default {
    state,
    actions,
    mutations
}