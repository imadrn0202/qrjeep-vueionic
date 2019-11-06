import axios from 'axios'
//import router from '../router';
import {baseUrl} from '../globalvariable'



const state = {
    createDriverStatus: '',
    getDriverListStatus: '',
    drivers: []
};

const actions = {

    async onCreateDriverSubmit({
        commit
    }, data) {
        commit('createDriverStatus', 'loading')

        await axios.post(baseUrl + '/api/createDriver', {
            data
            })
            .then(response => {
                commit('createDriverStatus', 'success')

                console.log(response)
                //router.push({ path: 'LoginVerify', query: { mobile_number: response.data.mobile_number['mobile_number'] } })

        
            })
            .catch(error => { //console
                console.log(error)
                commit('createDriverStatus', 'error')
            })

    },

    async onDriverList({
        commit
    }) {
        commit('getDriverListStatus', 'loading')

        await axios.get(baseUrl + '/api/getDriverList')
            .then(response => {
               
                let drivers = response.data;
                commit('setDrivers', drivers)
                commit('getDriverListStatus', 'success')

            })
            .catch(error => { //console
                console.log(error)
                commit('getDriverListStatus', 'error')
            })

    },

    


};


const mutations = {

    createDriverStatus: (state, message) => {
        state.createDriverStatus = message
    },

    getDriverListStatus: (state, message) => {
        state.getDriverListStatus = message
    },

    setDrivers (state, drivers) {
        state.drivers = drivers;
    },

};


export default {
    state,
    actions,
    mutations
}