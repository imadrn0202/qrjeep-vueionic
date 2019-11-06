<template>
    <div class="ion-page">
        <ion-header>
            <ion-toolbar>
                <ion-title>QR Jeep - My Fare Logs</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <ion-grid>

                <ion-spinner v-if="$store.state.operator.getDriverListStatus === 'loading'" name="circles"></ion-spinner>

                <ion-card
                v-for="(item, index) in $store.state.operator.drivers" :key="index" >
                    <ion-card-header>
                        <ion-card-subtitle>{{item.first_name}} {{item.last_name}}</ion-card-subtitle>
                         <ion-card-subtitle>PN: {{item.plate_number}}</ion-card-subtitle>
                          <ion-card-subtitle>Balance: PHP {{item.balance}} </ion-card-subtitle>
                    </ion-card-header>

     
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
                'onDriverList'
            ]),

            getDriverList() {
                this.onDriverList()
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
        },

    }
</script>