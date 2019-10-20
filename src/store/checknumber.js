import axios from 'axios'
import router from '../router';
import {baseUrl} from '../globalvariable'



const state = {
    status: '',
};

const actions = {

    async onCheckMobileNumberSubmit({
        commit
    }, mobile_number) {
        commit('validating', 'loading')
        console.log(state.status);

        await axios.post(baseUrl + '/api/checkMobileNumber', {
            mobile_number
            })
            .then(response => {
                commit('validating', 'success')

                router.push({ path: 'LoginVerify', query: { mobile_number: response.data.mobile_number['mobile_number'] } })

        
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
};


export default {
    state,
    actions,
    mutations
}