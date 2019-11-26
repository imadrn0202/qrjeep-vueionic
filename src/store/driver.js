import axios from 'axios'
import {
    baseUrl
} from '../globalvariable'



const state = {
    getDriverEarningsStatus: '',
    getDriverFareLogStatus: '',
    getDailyReportStatus: '',
    dailyReport: [],
    driverLogs: [],
    todayEarnings: '',
    totalEarnings: ''

};

const actions = {


    async onGetDriverEarnings({
        commit
    }) {
        commit('getDriverEarningsStatus', 'loading')

        await axios.get(baseUrl + '/api/getDriverEarnings')
            .then(response => {
                let totalEarnings = response.data.driver_total_earnings
                let todayEarnings = response.data.driver_today_earnings
                commit('setTodayEarnings', todayEarnings)
                commit('setTotalEarnings', totalEarnings)
                commit('getDriverEarningsStatus', 'success')

            })
            .catch(error => { //console
                console.log(error)
                commit('getDriverEarningsStatus', 'error')
            })

    },



    async onGetDriverFareLog({
        commit
    }) {
        commit('getDriverFareLogStatus', 'loading')

        await axios.get(baseUrl + '/api/getDriverFareLog')
            .then(response => {


                commit('getDriverFareLogStatus', 'success')

                const data = response.data;

                // this gives an object with dates as keys
                const groups = data.reduce((groups, game) => {
                    const date = game.created_at.split(' ')[0];


                    if (!groups[date]) {
                        groups[date] = [];
                    }
                    groups[date].push(game);


                    return groups;
                }, {});





                // Edit: to add it in the array format instead
                const groupArrays = Object.keys(groups).map((date) => {

                    const sum = groups[date].reduce((a, {
                        final_amount
                    }) => a + final_amount, 0);

                    return {
                        date,
                        result: groups[date],
                        sum
                    };

                });

                console.log(groupArrays);


                commit('setDriverLogs', groupArrays)


            })
            .catch(error => { //console
                console.log(error)
                commit('getDriverFareLogStatus', 'error')
            })

    },

   



};


const mutations = {

    getDriverEarningsStatus: (state, message) => {
        state.getDriverEarningsStatus = message
    },


    getDriverFareLogStatus: (state, message) => {
        state.getDriverFareLogStatus = message
    },


    setDriverLogs(state, driverLogs) {
        state.driverLogs = driverLogs;
    },
   
    setTotalEarnings(state, totalEarnings) {
        state.totalEarnings = totalEarnings;
    },

    setTodayEarnings(state, todayEarnings) {
        state.todayEarnings = todayEarnings;
    },




};


export default {
    state,
    actions,
    mutations
}