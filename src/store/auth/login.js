    import axios from 'axios'


    const baseUrl = 'https://1c39a18a.ngrok.io';

    const state = {
        accessToken: '',
        loggingIn: false,
        loginSuccess: false
    };

    const actions = {

        async onLoginSubmit({
            commit
        }, loginCredentials) {
            commit('loggingIn')

            await axios.post(baseUrl + '/api/login', {
                    loginCredentials
                })
                .then(response => {
                    localStorage.setItem('accessToken', response.data.access_token);
                    commit('loginSuccess', response.data.accessToken);
                })
                .catch(error => { //console
                    console.log(error)
                })

        }


    };


    const mutations = {
        loggingIn: state => state.loggingIn = true,
        loginSuccess: (state, accessToken) => {

            state.loggingIn = false;
            state.loginSuccess = true;
            state.accessToken = accessToken;

        }
    };


    export default {
        state,
        actions,
        mutations
    }