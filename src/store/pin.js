import axios from 'axios'
import router from '../router';
import {baseUrl} from '../globalvariable'



const state = {
    status: '',
    locked_until: '', 
};

const actions = {

    async onPinSubmit({
        commit
    }, data) {
        commit('validating', 'loading')
        console.log(state.status);

        await axios.post(baseUrl + '/api/checkPin', {data})
            .then(response => {
                if (response.data.message == 'wrong pin') {
                    commit('validating', 'wrongPin')
                }
                else if (response.data.message == 'locked') {
                    commit('validating', 'locked')
                    commit('lockedUntil', response.data.locked_until)
                }
                else if (response.data.message =='locked_until') {
                    commit('validating', 'locked_until')
                }
                else if (response.data.message == 'success' && response.data.verified == true) {
                    commit('validating', 'success')
                    router.push('usertype')
                }
                
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

    lockedUntil: (state, message) => {
        state.locked_until = message
    }
};


export default {
    state,
    actions,
    mutations
}