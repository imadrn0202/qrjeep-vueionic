<template>
    <div class="ion-page">
        <ion-header>
            <ion-toolbar>
                <ion-title>QR Jeep - Fare Logs</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <ion-grid>

                <ion-spinner v-if="$store.state.user.userFareLogsStatus === 'loading'" name="circles"></ion-spinner>

                <ion-card
                v-for="(item, index) in $store.state.user.userFareLogs" :key="index" >
                    <ion-card-header>
                        <ion-card-subtitle>Fare Payment ID: {{item.id}}</ion-card-subtitle>
                    </ion-card-header>

                     <ion-card-content>
                        <ion-label>From: {{item.origin}}</ion-label>
                        <br>
                        <ion-label>To: {{item.destination}}</ion-label>
                        <br>
                        <ion-text color="success">Fare: PHP: {{item.fare}}</ion-text>
                        <br>
                        <ion-text>Quantity: {{item.quantity}}</ion-text>
                        <br>
                        <ion-text color="primary">Discounted Amount: PHP: {{item.initial_amount}}</ion-text>
                        <br>
                        <ion-text color="danger">Final Amount: PHP: {{item.final_amount}}</ion-text>
                        <br>
                        <ion-text>Date: {{item.created_at}}</ion-text>
                    </ion-card-content>


     
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

        name: 'FareLogs',
        methods: {
            ...mapActions([
                'onUserFareLogs',
            ]),

            getUserFareLogs() {
                this.onUserFareLogs()
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
            this.getUserFareLogs()
        },

    }
</script>