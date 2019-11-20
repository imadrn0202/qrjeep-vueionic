<template>
    <div class="ion-page">
        <ion-content class="ion-padding">
            <ion-grid>

                <ion-spinner v-if="$store.state.user.userTransactionLogsStatus === 'loading'" name="circles"></ion-spinner>

                <ion-card
                v-for="(item, index) in $store.state.user.userTransactionLogs" :key="index" >
                    <ion-card-header>
                        <ion-card-subtitle>Transaction ID: {{item.id}}</ion-card-subtitle>
                
                    </ion-card-header>

                        <ion-card-content>
                        <ion-label>Amount: {{formatPrice(item.amount)}}</ion-label>
                        <br>
                        <ion-label>Date: {{formatPrice(item.created_at)}}</ion-label>
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

        name: 'TransactionLogs',
        methods: {
            ...mapActions([
                'onUserTransactionLogs'
            ]),

            formatPrice(value) {
                let val = (value/1).toFixed(2).replace('.', '.')
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            },

 
            getUserTransactionLogs() {
                this.onUserTransactionLogs()
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
            this.getUserTransactionLogs();
        },

    }
</script>