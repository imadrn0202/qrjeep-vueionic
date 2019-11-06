import axios from 'axios'
import {baseUrl} from '../globalvariable'
import router from '../router';


const state = {
    fareMatrixStatus: '',
    onOriginStatus: '',
    onDestinationStatus: '',
    onPayFareStatus: '',
    destinations: [],
    origins: [],
    onGetFareStatus: '',
    fare: 0
};

const actions = {

    async onOriginSelect({
        commit
    }) {
        commit('onOriginStatus', 'loading')

        await axios.get(baseUrl + '/api/getOrigins')
            .then(response => {
               
                let origins = response.data;
                commit('setOrigins', origins)
                commit('onOriginStatus', 'success')

            })
            .catch(error => { //console
                console.log(error)
                commit('onOriginStatus', 'error')
            })

    },

    async onDestinationSelect({
        commit
    }, data) {
        commit('onDestinationStatus', 'loading')

        await axios.post(baseUrl + '/api/getDestinations', {
            data
            })
            .then(response => {

                let destinations = response.data;
                commit('setDestinations', destinations)
                console.log(state.destinations);
                commit('onDestinationStatus', 'success')


            })
            .catch(error => { //console
                console.log(error)
                commit('onDestinationStatus', 'error')
            })

    },

    async onGetFare({
        commit
    }, data) {
        commit('onGetFareStatus', 'loading')

        await axios.post(baseUrl + '/api/getFare', {
            data
            })
            .then(response => {

                commit('setFare', response.data.fare)
                commit('onGetFareStatus', 'success')


            })
            .catch(error => { //console
                console.log(error)
                commit('onGetFareStatus', 'error')
            })

    },

    async onPayFare({
        commit
    }, data) {
        commit('onPayFareStatus', 'loading')

        await axios.post(baseUrl + '/api/payFare', {
            data
            })
            .then(response => {

                commit('onPayFareStatus', 'success')
                console.log(response.data)
                router.push('/user/qrcode')

            })
            .catch(error => { //console
                console.log(error)
                commit('onPayFareStatus', 'error')
            })

    },


    


};

let getters = {

    getFare: state => state.fare,
};

const mutations = {


    onOriginStatus: (state, message) => {
        state.onOriginStatus = message
    },

    onDestinationStatus: (state, message) => {
        state.onDestinationStatus = message
    },

    onGetFareStatus: (state, message) => {
        state.onGetFareStatus = message
    },
    onPayFareStatus: (state, message) => {
        state.onPayFareStatus = message
    },

    fareMatrixStatus: (state, message) => {
        state.fareMatrixStatus = message
    },

    setOrigins (state, origins) {
        state.origins = origins;
    },

    setDestinations (state, destination) {
        state.destinations = destination;
    },

    setFare (state, fare) {
        state.fare= fare;
    }

    

};


export default {
    state,
    actions,
    mutations,
    getters
}