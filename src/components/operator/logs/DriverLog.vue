<template>
    <div class="ion-page">

        <ion-content class="ion-padding">
            <ion-spinner v-if="$store.state.operator.getSelectedDriverFareLogStatus === 'loading'" name="circles">
            </ion-spinner>
            <ion-grid v-if="$store.state.operator.getSelectedDriverFareLogStatus === 'success'">


                <ion-text v-if="$store.state.operator.getDriverTodayEarningsStatus === 'success'" color="danger">Today
                    Earnings: PHP {{$store.state.operator.driverTodayEarnings}}</ion-text>
                    
<br>
<br>
                  <ion-text v-for="(item, index) in $store.state.operator.driverLogs" :key="index">

                            {{item.date}}
                <ion-card v-for="(result, index) in item.result" :key="index">
                    <ion-card-header>
                        <ion-card-subtitle>Fare Payment ID: {{result.id}}</ion-card-subtitle>
                    </ion-card-header>

                    <ion-card-content>
                        <ion-label>From: {{result.origin}}</ion-label>
                        <br>
                        <ion-label>To: {{result.destination}}</ion-label>
                        <br>
                        <ion-text>Fare Type: {{result.user_type.toUpperCase()}}</ion-text>
                        <br>
                        <ion-text color="success">Fare: PHP: {{formatPrice(result.fare)}}</ion-text>
                        <br>
                        <ion-text>Quantity: {{result.quantity}}</ion-text>
                        <br>
                        <ion-text color="primary">Discounted Amount: PHP: {{formatPrice(result.discounted_amount)}}
                        </ion-text>
                        <br>
                        <ion-text color="danger">Final Amount: PHP: {{formatPrice(result.final_amount)}}</ion-text>
                        <br>
                        <ion-text>Date: {{result.created_at}}</ion-text>
                    </ion-card-content>



                </ion-card>
                </ion-text>
            </ion-grid>
        </ion-content>
    </div>
</template>

<script>

    import {
        mapActions
    } from 'vuex';
    export default {

        name: 'DriverLog',
        data() {
            return {
                driver_id: this.$route.query.driver_id
            }
        },
        methods: {
            ...mapActions([
                'onGetDriverTodayEarnings',
                'onGetSelectedDriverFareLog'
            ]),

            getDriverTodayEarnings() {
                this.onGetDriverTodayEarnings({
                    driver_id: this.driver_id
                })
            },

            formatPrice(value) {
                let val = (value/1).toFixed(2).replace('.', '.')
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            },

            getSelectedDriverFareLog() {
                this.onGetSelectedDriverFareLog({
                    driver_id: this.driver_id
                })
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
            this.getDriverTodayEarnings()
            this.getSelectedDriverFareLog()
        },

    }
</script>