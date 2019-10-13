import axios from 'axios'
import router from '../router';


const baseUrl = 'http://qrjeepapi.test'

const state = {
    validating: false,
    validated: false
};

const actions = {

    async onCheckMobileNumberSubmit({
        commit
    }, mobile_number) {
        commit('validating', true)

        await axios.post(baseUrl + '/api/checkMobileNumber', {
            mobile_number
            })
            .then(response => {
                commit('validated', true)
                commit('validating', false)

                router.push({ path: 'LoginVerify', query: { mobile_number: response.data.mobile_number['mobile_number'] } })
        
            })
            .catch(error => { //console
                console.log(error)
                commit('validating', false)
                commit('validated', false)
            })

    }


};


const mutations = {

    validating: (state, message) => {

        state.validating = message;

    },
    validated: (state, message) => {

        state.validated = message;
    }
};


export default {
    state,
    actions,
    mutations
}