import axios from 'axios'

const baseUrl = 'http://qrjeepapi.test'
const state = {
    verifying: false,
    verified: false
}

const actions = {

    async onLoginVerify({
        commit
    }, verification_code) {
        commit('setVerifying', true);
        await axios.post(baseUrl + '/api/validateLogin', {
                verification_code
            })
            .then(response => {
                commit('setVerifying', false);
                commit('setVerified', true)

                console.log(response.data);


            })
            .catch(error => {
                commit('setVerifying', false);
                commit('setVerified', false);
                console.log(error)
            })

    }
}

const mutations = {
    setVerifying: (state, message) => {
        state.verifying = message
    },
    setVerified: (state, message) => {
        state.verified = message 
    }
}

export default {
    state,
    actions,
    mutations
}