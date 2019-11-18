<template>
    <div class="ion-page">

        <ion-content class="ion-padding">
              <ion-spinner v-if="$store.state.operator.getDriverListStatus === 'loading'" name="circles"></ion-spinner>
            <ion-grid v-if="$store.state.operator.getDriverListStatus === 'success'" >

              
                <ion-text v-if="$store.state.operator.getTotalEarningsStatus === 'success'" color="danger">Overall Earnings: {{$store.state.operator.totalEarnings.total_earnings}}</ion-text>
                <br>
                <ion-text v-if="$store.state.operator.getTotalEarningsStatus === 'success'" color="success">My Overall Earnings: {{$store.state.operator.totalEarnings.operator_earnings}}</ion-text>

            

                <ion-card
                v-for="(item, index) in $store.state.operator.drivers" :key="index" >
                    <router-link :to="{ path: '/driver/log', query: { driver_id: item.id}}">
                    <ion-card-header>
                        <ion-card-subtitle>Driver ID: {{item.id}}</ion-card-subtitle>
                        <ion-card-subtitle>{{item.first_name}} {{item.last_name}}</ion-card-subtitle>
                         <ion-card-subtitle>PN: {{item.plate_number}}</ion-card-subtitle>
                         <ion-card-subtitle>Balance: PHP {{item.balance}} </ion-card-subtitle>
                          <ion-card-subtitle>Balance with Cut : PHP {{item.balanceWithCut}} </ion-card-subtitle>
                    </ion-card-header>

       </router-link>
                    </ion-card>

              
            </ion-grid>
        </ion-content>
    </div>
</template>

<script>
    import {
        mapActions
    } from 'vuex';
    export default {

        name: 'DriverList',
        methods: {
            ...mapActions([
                'onDriverList',
                'onGetTotalEarnings',
                'onGetOperatorTodayEarnings'
            ]),

            getDriverList() {
                this.onDriverList()
            },
            getTotalEarnings() {
                this.onGetTotalEarnings()
            },
            getOperatorTodayEarnings() {
                this.onGetOperatorTodayEarnings()
            },
            doRefresh(event) {
                console.log('Begin async operation');

                setTimeout(() => {
                    console.log('Async operation has ended');
                    this.getBalance();
                    event.target.complete();
                }, 2000);
            },


        },
        beforeMount() {
            this.getDriverList()
            this.getTotalEarnings()
            this.getOperatorTodayEarnings()
        },

    }
</script>