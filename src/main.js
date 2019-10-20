import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Ionic from '@ionic/vue'
import '@ionic/core/css/ionic.bundle.css';
import store from './store/'
import './registerServiceWorker'
import axios from 'axios'

Vue.use(Ionic);

Vue.config.productionTip = false

axios.interceptors.request.use(
  (config) => {

    let token = localStorage.getItem('token');

    if (token) {
      config.headers['Authorization'] = `Bearer ${ token }`;
    
    }

    return config;
  }, 

  (error) => {
    return Promise.reject(error);
  }
);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
