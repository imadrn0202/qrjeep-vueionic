import axios from 'axios'
import router from '../router';
import {baseUrl} from '../globalvariable'



const state = {
    createDriverStatus: '',
    getDriverListStatus: '',
    getTotalEarningsStatus: '',
    getOperatorTodayEarningsStatus: '',
    getDriverTodayEarningsStatus: '',
    getSelectedDriverFareLogStatus: '',
    driverLogs: [],
    drivers: [],
    totalEarnings: [],
    operatorTodayEarnings: '',
    driverTodayEarnings: '',
    getDailyReportStatus: '',
    dailyReport: [],
    deleteDriverStatus: '',
    updateDriverStatus: '',

    getDriverByDriverUserIdStatus: '',
    driverByUserId: [],



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
                if (response.data.success == false) {
                    commit('createDriverStatus', 'error')
                }
                else {
                    commit('createDriverStatus', 'success')
                    router.push('/operator/driverlist')
                }
       

        
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

    async onGetTotalEarnings({
        commit
    }) {
        commit('getTotalEarningsStatus', 'loading')

        await axios.get(baseUrl + '/api/getTotalEarnings')
            .then(response => {
                let totalEarnings = response.data;
                commit('setTotalEarnings', totalEarnings)
                commit('getTotalEarningsStatus', 'success')

            })
            .catch(error => { //console
                console.log(error)
                commit('getTotalEarningsStatus', 'error')
            })

    },

    async onGetOperatorTodayEarnings({
        commit
    }) {
        commit('getOperatorTodayEarningsStatus', 'loading')

        await axios.get(baseUrl + '/api/getOperatorTodayEarnings')
            .then(response => {
                commit('setOperatorTodayEarnings', response.data.operator_today_earnings)
                commit('getOperatorTodayEarningsStatus', 'success')

            })
            .catch(error => { //console
                console.log(error)
                commit('getOperatorTodayEarningsStatus', 'error')
            })

    },

    async onGetDriverTodayEarnings({
        commit
    }, data) {
        commit('getDriverTodayEarningsStatus', 'loading')

        await axios.post(baseUrl + '/api/getDriverTodayEarnings', {data})
            .then(response => {

                commit('setDriverTodayEarnings', response.data.driver_today_earnings)
                commit('getDriverTodayEarningsStatus', 'success')

            })
            .catch(error => { //console
                console.log(error)
                commit('getDriverTodayEarningsStatus', 'error')
            })

    },

    async onGetSelectedDriverFareLog({
        commit
    }, data) {
        commit('getSelectedDriverFareLogStatus', 'loading')

        await axios.post(baseUrl + '/api/getSelectedDriverFareLog', {data})
            .then(response => {
                commit('getSelectedDriverFareLogStatus', 'success')

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
                    return {
                        date,
                        result: groups[date]
                    };

                });

                console.log(groupArrays);

                commit('setDriverLogs', groupArrays)

            })
            .catch(error => { //console
                console.log(error)
                commit('getSelectedDriverFareLogStatus', 'error')
            })

    },

    async onGetDailyReport({
        commit
    }) {
        commit('getDailyReportStatus', 'loading')

        await axios.get(baseUrl + '/api/getDailyReport')
            .then(response => {


                commit('getDailyReportStatus', 'success')

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

                    const sum = groups[date].reduce((a, {earnings}) => a + earnings, 0);


                    return {
                        date,
                        result: groups[date],
                        sum
                    };

                });

                console.log(groupArrays);


                commit('setDailyReport', groupArrays)


            })
            .catch(error => { //console
                console.log(error)
                commit('getDailyReportStatus', 'error')
            })

    },

    async onDeleteDriver({
        commit
    }, data) {
        commit('deleteDriverStatus', 'loading')

        await axios.delete(baseUrl + '/api/deleteDriver', {data})
            .then(response => {
                commit('deleteDriverStatus', 'success')
                console.log(response);
            })
            .catch(error => { //console
                console.log(error)
                commit('deleteDriverStatus', 'error')
            })

    },

    async onUpdateDriver({
        commit
    }, data) {
        commit('updateDriverStatus', 'loading')

        await axios.delete(baseUrl + '/api/updateDriver', {data})
            .then(response => {
                commit('updateDriverStatus', 'success')
                console.log(response);
                router.push('/operator/driverlist')
            })
            .catch(error => { //console
                console.log(error)
                commit('updateDriverStatus', 'error')
            })

    },

    async onGetDriverByDriverUserId({
        commit
    }, data) {
        commit('getDriverByDriverUserIdStatus', 'loading')

        await axios.post(baseUrl + '/api/getDriverByDriverUserId', {data})
            .then(response => {
                commit('getDriverByDriverUserIdStatus', 'success')

                let drivers = response.data;
                commit('setDriverByUserId', drivers)


                console.log(this.driverByUserId);
            })
            .catch(error => { //console
                console.log(error)
                commit('getDriverByDriverUserIdStatus', 'error')
            })

    },


    


};


const mutations = {

    getDriverByDriverUserIdStatus: (state, message) => {
        state.getDriverByDriverUserIdStatus = message
    },


    updateDriverStatus: (state, message) => {
        state.updateDriverStatus = message
    },

    deleteDriverStatus: (state, message) => {
        state.deleteDriverStatus = message
    },


    getDailyReportStatus: (state, message) => {
        state.getDailyReportStatus = message
    },


    createDriverStatus: (state, message) => {
        state.createDriverStatus = message
    },

    getDriverListStatus: (state, message) => {
        state.getDriverListStatus = message
    },

    getTotalEarningsStatus: (state, message) => {
        state.getTotalEarningsStatus = message
    },


    getOperatorTodayEarningsStatus: (state, message) => {
        state.getOperatorTodayEarningsStatus = message
    },


    getDriverTodayEarningsStatus: (state, message) => {
        state.getDriverTodayEarningsStatus = message
    },


    getSelectedDriverFareLogStatus: (state, message) => {
        state.getSelectedDriverFareLogStatus = message
    },

    
    setDriverByUserId (state, drivers) {
        state.driverByUserId = drivers;
    },


    setDrivers (state, drivers) {
        state.drivers = drivers;
    },

    setDriverLogs (state, driverLogs) {
        state.driverLogs = driverLogs;
    },

    setTotalEarnings (state, totalEarnings) {
        state.totalEarnings = totalEarnings;
    },

    setOperatorTodayEarnings (state, operatorTodayEarnings) {
        state.operatorTodayEarnings = operatorTodayEarnings;
    },

    setDriverTodayEarnings (state, driverTodayEarnings) {
        state.driverTodayEarnings = driverTodayEarnings;
    },

    setDailyReport(state, dailyReport) {
        state.dailyReport = dailyReport;
    },



};


export default {
    state,
    actions,
    mutations
}