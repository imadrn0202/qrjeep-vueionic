<template>
    <div class="ion-page">
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
                        <ion-text color="success">Fare: PHP: {{formatPrice(item.fare)}}</ion-text>
                        <br>
                        <ion-text>Quantity: {{item.quantity}}</ion-text>
                        <br>
                        <ion-text color="primary">Discounted Amount: PHP: {{formatPrice(item.discounted_amount)}}</ion-text>
                        <br>
                        <ion-text color="danger">Final Amount: PHP: {{formatPrice(item.final_amount)}}</ion-text>
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

            formatPrice(value) {
                let val = (value/1).toFixed(2).replace('.', '.')
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
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