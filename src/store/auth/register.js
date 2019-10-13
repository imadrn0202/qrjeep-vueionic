import axios from 'axios'


const baseUrl = 'http://qrjeepapi.test';

const state = {
    data: [],
    registering: false,
}

const actions = {

    async onRegisterSubmit( {commit}, registrationData )
    {
        await axios.post( baseUrl + '/api/register', registrationData )
        .then(response => {
            commit('registering');
            commit('setData', response.data);
        })
        .catch(error => {
            console.log(error)
        })
    }
    

}

const mutations = {
    registering: state => state.registering = true,
    setData: (state, data) => {
        this.data = data;
    }
}


export default {
    state,
    actions,
    mutations
}